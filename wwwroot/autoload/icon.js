var CarteCommande;
(CarteCommande||(CarteCommande = {}));
(function (CarteCommande) {
const __as1 = (o, k, c) => { if (o[k] !== undefined) for (let w in o[k]) { c[w] = o[k][w] } o[k] = c; }
const moduleName = `CarteCommande`;
const _ = {};

let System = {};
_.System = CarteCommande.System ?? {};
let _n;
let AppInfo=class AppInfo extends AventusSharp.Data.SharpClass {
    static get Fullname() { return "CarteCommande.AppInfo, CarteCommande"; }
    static Version = 5;
}
AppInfo.Namespace=`CarteCommande`;
AppInfo.$schema={...(AventusSharp.Data.SharpClass?.$schema ?? {}), };
Aventus.Converter.register(AppInfo.Fullname, AppInfo);
__as1(_, 'AppInfo', AppInfo);

System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host{background:#b76633;background:radial-gradient(circle, #dfa37e 0%, #b76633 100%)}:host rk-img{--img-stroke-color: white;--img-fill-color: transparent;max-height:100%;flex-grow:1;padding:10%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
    __getStatic() {
        return AppIcon;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(AppIcon.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<rk-img src="/apps/CarteCommande/img/logo.svg"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
    state() {
        return "/";
    }
}
System.AppIcon.Namespace=`CarteCommande.System`;
System.AppIcon.Tag=`carte-commande-app-icon`;
__as1(_.System, 'AppIcon', System.AppIcon);
if(!window.customElements.get('carte-commande-app-icon')){window.customElements.define('carte-commande-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
__as1(_, 'Version', Version);


for(let key in _) { CarteCommande[key] = _[key] }
})(CarteCommande);

var Cave;
(Cave||(Cave = {}));
(function (Cave) {
const __as1 = (o, k, c) => { if (o[k] !== undefined) for (let w in o[k]) { c[w] = o[k][w] } o[k] = c; }
const moduleName = `Cave`;
const _ = {};

let System = {};
_.System = Cave.System ?? {};
let _n;
let AppInfo=class AppInfo extends AventusSharp.Data.SharpClass {
    static get Fullname() { return "Cave.AppInfo, Cave"; }
    static Version = 6;
}
AppInfo.Namespace=`Cave`;
AppInfo.$schema={...(AventusSharp.Data.SharpClass?.$schema ?? {}), };
Aventus.Converter.register(AppInfo.Fullname, AppInfo);
__as1(_, 'AppInfo', AppInfo);

System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host{background:#6d071a;background:radial-gradient(circle, #da3c59 0%, #6d071a 100%)}:host rk-img{--img-stroke-color: transparent;--img-fill-color: white;flex-grow:1;height:100%;max-height:100%;padding:20%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
    __getStatic() {
        return AppIcon;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(AppIcon.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<rk-img src="/apps/Cave/img/configuration.svg"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
    state() {
        return "/cepage";
    }
}
System.AppIcon.Namespace=`Cave.System`;
System.AppIcon.Tag=`cave-app-icon`;
__as1(_.System, 'AppIcon', System.AppIcon);
if(!window.customElements.get('cave-app-icon')){window.customElements.define('cave-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
__as1(_, 'Version', Version);


for(let key in _) { Cave[key] = _[key] }
})(Cave);

var Projet;
(Projet||(Projet = {}));
(function (Projet) {
const __as1 = (o, k, c) => { if (o[k] !== undefined) for (let w in o[k]) { c[w] = o[k][w] } o[k] = c; }
const moduleName = `Projet`;
const _ = {};

let System = {};
_.System = Projet.System ?? {};
let _n;
let AppInfo=class AppInfo extends AventusSharp.Data.SharpClass {
    static get Fullname() { return "Projet.AppInfo, Projet"; }
    static Version = 1;
}
AppInfo.Namespace=`Projet`;
AppInfo.$schema={...(AventusSharp.Data.SharpClass?.$schema ?? {}), };
Aventus.Converter.register(AppInfo.Fullname, AppInfo);
__as1(_, 'AppInfo', AppInfo);

System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host{background-color:#177192}:host rk-img{--img-stroke-color: transparent;--img-fill-color: #ffffff;max-height:100%;flex-grow:1;padding:10%;padding-right:15%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
    __getStatic() {
        return AppIcon;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(AppIcon.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<rk-img src="/apps/Projet/img/icon.svg"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
    defineAddons() {
        return [
            "Univer",
            "QrCodeGenerator"
        ];
    }
}
System.AppIcon.Namespace=`Projet.System`;
System.AppIcon.Tag=`projet-app-icon`;
__as1(_.System, 'AppIcon', System.AppIcon);
if(!window.customElements.get('projet-app-icon')){window.customElements.define('projet-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
__as1(_, 'Version', Version);


for(let key in _) { Projet[key] = _[key] }
})(Projet);



var Reservation;
(Reservation||(Reservation = {}));
(function (Reservation) {
const __as1 = (o, k, c) => { if (o[k] !== undefined) for (let w in o[k]) { c[w] = o[k][w] } o[k] = c; }
const moduleName = `Reservation`;
const _ = {};

let System = {};
_.System = Reservation.System ?? {};
let _n;
System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host{background-color:#365079}:host rk-img{--img-stroke-color: transparent;--img-fill-color: #fff;max-height:100%;flex-grow:1;padding:10%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
    __getStatic() {
        return AppIcon;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(AppIcon.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<rk-img src="/apps/Reservation/img/logo.svg"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
}
System.AppIcon.Namespace=`Reservation.System`;
System.AppIcon.Tag=`reservation-app-icon`;
__as1(_.System, 'AppIcon', System.AppIcon);
if(!window.customElements.get('reservation-app-icon')){window.customElements.define('reservation-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}


for(let key in _) { Reservation[key] = _[key] }
})(Reservation);

var Settings;
(Settings||(Settings = {}));
(function (Settings) {
const __as1 = (o, k, c) => { if (o[k] !== undefined) for (let w in o[k]) { c[w] = o[k][w] } o[k] = c; }
const moduleName = `Settings`;
const _ = {};

let System = {};
_.System = Settings.System ?? {};
let _n;
let AppInfo=class AppInfo extends AventusSharp.Data.SharpClass {
    static get Fullname() { return "Settings.AppInfo, Settings"; }
    static Version = 1;
}
AppInfo.Namespace=`Settings`;
AppInfo.$schema={...(AventusSharp.Data.SharpClass?.$schema ?? {}), };
Aventus.Converter.register(AppInfo.Fullname, AppInfo);
__as1(_, 'AppInfo', AppInfo);

System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host{background:#7a7a7a;background:radial-gradient(circle, #a9a9a9 0%, #666666 100%)}:host rk-img{--img-stroke-color: transparent;--img-fill-color: #ffffff;flex-grow:1;max-height:100%;padding:10%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
    __getStatic() {
        return AppIcon;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(AppIcon.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<rk-img src="/apps/Settings/img/logo.svg"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
}
System.AppIcon.Namespace=`Settings.System`;
System.AppIcon.Tag=`settings-app-icon`;
__as1(_.System, 'AppIcon', System.AppIcon);
if(!window.customElements.get('settings-app-icon')){window.customElements.define('settings-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
__as1(_, 'Version', Version);


for(let key in _) { Settings[key] = _[key] }
})(Settings);

var Suivi;
(Suivi||(Suivi = {}));
(function (Suivi) {
const __as1 = (o, k, c) => { if (o[k] !== undefined) for (let w in o[k]) { c[w] = o[k][w] } o[k] = c; }
const moduleName = `Suivi`;
const _ = {};

let System = {};
_.System = Suivi.System ?? {};
let _n;
let AppInfo=class AppInfo extends AventusSharp.Data.SharpClass {
    static get Fullname() { return "Suivi.AppInfo, Suivi"; }
    static Version = 6;
}
AppInfo.Namespace=`Suivi`;
AppInfo.$schema={...(AventusSharp.Data.SharpClass?.$schema ?? {}), };
Aventus.Converter.register(AppInfo.Fullname, AppInfo);
__as1(_, 'AppInfo', AppInfo);

System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host{background:#6d071a;background:radial-gradient(circle, #da3c59 0%, #6d071a 100%)}:host rk-img{--img-stroke-color: transparent;--img-fill-color: white;flex-grow:1;max-height:100%;padding:10%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
    __getStatic() {
        return AppIcon;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(AppIcon.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<rk-img src="/apps/Suivi/img/logo.svg"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
}
System.AppIcon.Namespace=`Suivi.System`;
System.AppIcon.Tag=`suivi-app-icon`;
__as1(_.System, 'AppIcon', System.AppIcon);
if(!window.customElements.get('suivi-app-icon')){window.customElements.define('suivi-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
__as1(_, 'Version', Version);


for(let key in _) { Suivi[key] = _[key] }
})(Suivi);

