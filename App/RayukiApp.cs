﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.App
{
    public abstract class RayukiApp
    {
        internal Action<Type> action;
        public virtual Task OnStart()
        {
            return Task.CompletedTask;
        }

        public virtual Task OnStop()
        {
            return Task.CompletedTask;
        }

        public abstract int Version();
        public abstract string DisplayName();
        public virtual void DefinePermissions()
        {
            
        }
        protected void RegisterPermissions<T>() where T : Enum
        {
            action(typeof(T));
        }
    }
}
