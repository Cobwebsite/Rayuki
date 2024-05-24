Object.defineProperty(window, "can", {
    get() { return Core.Permissions.Permission.can.bind(Core.Permissions.Permission); }
})