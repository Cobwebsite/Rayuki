using System.Timers;
using AventusSharp.Data.Storage.Default;
using AventusSharp.Tools;
using AventusSharp.WebSocket;
using Core.App;
using Core.Tools;
using Core.Websocket;
using Core.Websocket.Events;

namespace Core.Logic
{
    /// <summary>
    /// The TransactionManager class is responsible for handling transactions within the application.
    /// It manages the initiation, commitment, and rollback of transactions, ensuring that operations
    /// are properly synchronized and timed.
    /// </summary>
    public class TransactionManager
    {
        private SemaphoreSlim locker = new SemaphoreSlim(1, 1);
        private string? guid;
        private TransactionContext? context;
        private string? sessionId;
        private System.Timers.Timer? timer;

        private TaskCompletionSource<object?>? tcs;


        /// <summary>
        /// Filters incoming HTTP requests based on the session ID.
        /// If the session ID matches the current transaction's session ID, the method will return immediately.
        /// Otherwise, it will wait until the current task completes.
        /// </summary>
        /// <param name="context">The HTTP context containing the session information.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        public async Task FilterQuery(HttpContext context)
        {
            if (tcs == null) return;
            if (sessionId == context.Session.Id)
            {
                return;
            }
            await tcs.Task;
        }

        /// <summary>
        /// Begins a new transaction. If successful, returns a unique GUID representing the transaction.
        /// A timer is set up to automatically cancel the transaction if it exceeds the specified duration.
        /// </summary>
        /// <param name="httpContext">The HTTP context containing the session information.</param>
        /// <param name="ms">The duration in milliseconds before the transaction is automatically cancelled.</param>
        /// <returns>A ResultWithError object containing the transaction GUID if successful, or errors if not.</returns>
        public ResultWithError<string> Begin(HttpContext httpContext, int ms)
        {
            ResultWithError<string> result = new ResultWithError<string>();
            try
            {
                locker.WaitAsync().GetAwaiter().GetResult();
                ResultWithError<TransactionContext> transactionQuery = AppManager.Storage.BeginTransaction();
                if (!transactionQuery.Success || transactionQuery.Result == null)
                {
                    result.Errors = transactionQuery.Errors;
                    return result;
                }

                string guid = Guid.NewGuid().ToString();
                this.guid = guid;
                string localSession = httpContext.Session.Id;
                sessionId = httpContext.Session.Id;
                tcs = new TaskCompletionSource<object?>();
                context = transactionQuery.Result;
                timer = new();
                timer.Elapsed += async delegate (object? source, ElapsedEventArgs e)
                {
                    if (this.guid == guid)
                    {
                        this.guid = null;
                        context = null;
                        timer = null;
                        sessionId = null;
                        if (tcs != null)
                        {
                            tcs.SetResult(null);
                            tcs = null;
                        }
                        // trop de temps on annule la transaction
                        transactionQuery.Result.Rollback();

                        WebSocketConnection? connection = WebSocketMiddleware.GetConnection<MainEndPoint>(localSession);
                        if (connection != null)
                            await new TransactionCancelledEvent(guid).EmitTo(connection);
                        locker.Release();
                    }
                };
                timer.Interval = ms; // ~ 5 seconds
                timer.AutoReset = false;
                timer.Enabled = true;

                result.Result = guid;
            }
            catch (Exception e)
            {
                result.Errors.Add(new CoreError(CoreErrorCode.UnknowError, e));
            }
            return result;
        }

        /// <summary>
        /// Commits the transaction associated with the specified GUID.
        /// If the GUID matches the current transaction's GUID, the transaction is committed and the resources are released.
        /// </summary>
        /// <param name="guid">The unique identifier of the transaction to be committed.</param>
        /// <returns>A VoidWithError object indicating success or containing errors if the commit failed.</returns>
        public VoidWithError Commit(string guid)
        {
            VoidWithError result = new VoidWithError();
            if (guid == this.guid)
            {
                if (timer != null)
                {
                    timer.Stop();
                }
                if (context != null)
                {
                    result.Run(context.Commit);
                    context = null;
                }
                if (tcs != null)
                {
                    tcs.SetResult(null);
                    tcs = null;
                }
                sessionId = null;
                this.guid = null;
                locker.Release();
            }
            else
            {
                result.Errors.Add(new CoreError(CoreErrorCode.TransactionGuidMissmatch, "Le GUID ne correspond pas"));
            }

            return result;
        }

        /// <summary>
        /// Rolls back the transaction associated with the specified GUID.
        /// If the GUID matches the current transaction's GUID, the transaction is rolled back and the resources are released.
        /// </summary>
        /// <param name="guid">The unique identifier of the transaction to be rolled back.</param>
        /// <returns>A VoidWithError object indicating success or containing errors if the rollback failed.</returns>
        public VoidWithError Rollback(string guid)
        {
            VoidWithError result = new VoidWithError();
            if (guid == this.guid)
            {
                if (timer != null)
                {
                    timer.Stop();
                }
                if (context != null)
                {
                    result.Run(context.Rollback);
                    context = null;
                }
                if (tcs != null)
                {
                    tcs.SetResult(null);
                    tcs = null;
                }
                sessionId = null;
                this.guid = null;
                locker.Release();
            }
            else
            {
                result.Errors.Add(new CoreError(CoreErrorCode.TransactionGuidMissmatch, "Le GUID ne correspond pas"));
            }

            return result;
        }
    }
}