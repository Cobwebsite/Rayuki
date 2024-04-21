if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
        // Registration was successful
        Core.Lib.ServiceWorker.getInstance().init(registration);
    }, function (err) {
        // registration failed :(
        console.log(err);

    });

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        // Stash the event so it can be triggered later.
        window.deferredPrompt = e;
        Core?.PwaButton?.instance?.init();
    });

}