

using System.Collections;
using System.Linq.Expressions;
using System.Reflection;
using AventusSharp.Data;
using AventusSharp.Data.Attributes;
using AventusSharp.Data.Manager;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.App;

namespace Core.Data.Validators;

[AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
public class AtLeast : ValidationAttribute
{
    protected MethodInfo? setVariable;
    protected MethodInfo? runWithError;
    protected object? query;
    protected string? message;
    private int nb;
    private object value;
    public AtLeast(int nb, object value, string? message = null)
    {
        this.nb = nb;
        this.value = value;
        this.message = message;
    }

    public override ValidationResult IsValid(object? value, ValidationContext context)
    {
        Console.WriteLine(context.Action + " AtLeast");
        if (context.Action != StorableAction.Delete) return ValidationResult.Success;

        AppManager.Storage.Debug = true;
        if (query == null && context.TableInfo.DM != null && context.ReflectedType != null)
        {
            MethodInfo? m = GetType().GetMethod("LoadQuery", BindingFlags.NonPublic | BindingFlags.Instance);
            if (m == null)
            {
                throw new Exception("Impossible");
            }
            m = m.MakeGenericMethod(context.FieldType);
            m.Invoke(this, new object?[] { context.TableInfo.DM, context.ReflectedType, context, this.value });
        }

        if (setVariable != null && runWithError != null && query != null && context.Item != null)
        {
            setVariable.Invoke(query, new object?[] { "value", this.value });
            setVariable.Invoke(query, new object?[] { "id", context.Item.Id });
            IResultWithError? resultWithError = (IResultWithError?)runWithError.Invoke(query, null);
            if (resultWithError != null)
            {
                if (resultWithError.Errors.Count > 0)
                {
                    ValidationResult validationResult = new ValidationResult();
                    validationResult.Errors.AddRange(resultWithError.Errors);
                    AppManager.Storage.Debug = false;
                    return validationResult;
                }
                if (resultWithError.Result is IList list)
                {
                    Console.WriteLine(list.Count + " obj");
                    Console.WriteLine(nb + " reuqired");
                    if (list.Count - 1 >= nb)
                    {
                        string message = this.message ?? "Il doit y avoir au moins " + nb + " " + context.ReflectedType?.Name;
                        AppManager.Storage.Debug = false;
                        return new ValidationResult(message, context.FieldName);
                    }
                }
            }
        }

        AppManager.Storage.Debug = false;
        return ValidationResult.Success;
    }

    private void LoadQuery<T>(IGenericDM dm, Type type, ValidationContext context, T? value)
    {
        query = dm.GetType().GetMethod("CreateQuery")?.MakeGenericMethod(type).Invoke(dm, null);
        if (query == null)
        {
            DataError error = new DataError(DataErrorCode.ErrorCreatingReverseQuery, "Can't create the query");
            throw error.GetException();
        }
        setVariable = query.GetType().GetMethod("SetVariable");
        if (setVariable == null)
        {
            DataError error = new DataError(DataErrorCode.ErrorCreatingReverseQuery, "Can't get the function setVariable");
            throw error.GetException();

        }
        runWithError = query.GetType().GetMethod("RunWithError");
        if (runWithError == null)
        {
            DataError error = new DataError(DataErrorCode.ErrorCreatingReverseQuery, "Can't get the function runWithError");
            throw error.GetException();

        }
        MethodInfo? whereWithParam = query.GetType().GetMethod("WhereWithParameters");
        if (whereWithParam == null)
        {
            DataError error = new DataError(DataErrorCode.ErrorCreatingReverseQuery, "Can't get the function whereWithParam");
            throw error.GetException();
        }

        // t
        ParameterExpression argParam = Expression.Parameter(context.TableInfo.Type, "t");

        // t.$FieldName
        Expression nameProperty = Expression.PropertyOrField(argParam, context.FieldName);

        // value
        Expression<Func<T?>> propLambda = () => value;

        Type? typeIfNullable = System.Nullable.GetUnderlyingType(nameProperty.Type);
        if (typeIfNullable != null)
        {
            nameProperty = Expression.Call(nameProperty, "GetValueOrDefault", Type.EmptyTypes);
        }
        // t.$FieldName == value
        Expression e1 = Expression.Equal(nameProperty, propLambda.Body);

        // t.Id
        Expression idProperty = Expression.PropertyOrField(argParam, Storable.Id);
        int id = 0;
        Expression<Func<int>> idLambda = () => id;
        // t.Id != id
        Expression e2 = Expression.NotEqual(idProperty, idLambda.Body);

        // t.$FieldName == value && t.Id != id
        Expression e3 = Expression.AndAlso(e1, e2);

        // t => t.$FieldName == value && t.Id != id
        LambdaExpression lambda = Expression.Lambda(e3, argParam);
        whereWithParam.Invoke(query, new object[] { lambda });
    }

}