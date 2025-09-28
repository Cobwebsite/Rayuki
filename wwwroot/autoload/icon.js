
var Horaire;
(Horaire||(Horaire = {}));
(function (Horaire) {
const __as1 = (o, k, c) => { if (o[k] !== undefined) for (let w in o[k]) { c[w] = o[k][w] } o[k] = c; }
const moduleName = `Horaire`;
const _ = {};

let System = {};
_.System = Horaire.System ?? {};
let _n;
let AppInfo=class AppInfo extends AventusSharp.Data.SharpClass {
    static get Fullname() { return "Horaire.AppInfo, Horaire"; }
    static Version = 1;
}
AppInfo.Namespace=`Horaire`;
AppInfo.$schema={...(AventusSharp.Data.SharpClass?.$schema ?? {}), };
Aventus.Converter.register(AppInfo.Fullname, AppInfo);
__as1(_, 'AppInfo', AppInfo);

System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host rk-img{--img-stroke-color: white;--img-fill-color: transparent;max-height:100%;flex-grow:1;padding:10%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
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
        blocks: { 'default':`<rk-img src="/apps/Horaire/img/logo.svg"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
}
System.AppIcon.Namespace=`Horaire.System`;
System.AppIcon.Tag=`horaire-app-icon`;
__as1(_.System, 'AppIcon', System.AppIcon);
if(!window.customElements.get('horaire-app-icon')){window.customElements.define('horaire-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
__as1(_, 'Version', Version);


for(let key in _) { Horaire[key] = _[key] }
})(Horaire);


var Light;
(Light||(Light = {}));
(function (Light) {
const __as1 = (o, k, c) => { if (o[k] !== undefined) for (let w in o[k]) { c[w] = o[k][w] } o[k] = c; }
const moduleName = `Light`;
const _ = {};

let System = {};
_.System = Light.System ?? {};
let _n;
let AppInfo=class AppInfo extends AventusSharp.Data.SharpClass {
    static get Fullname() { return "Light.AppInfo, Light"; }
    static Version = 1;
}
AppInfo.Namespace=`Light`;
AppInfo.$schema={...(AventusSharp.Data.SharpClass?.$schema ?? {}), };
Aventus.Converter.register(AppInfo.Fullname, AppInfo);
__as1(_, 'AppInfo', AppInfo);

System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host rk-img{--img-stroke-color: transparent;--img-fill-color: white;max-height:100%;flex-grow:1;padding:10%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
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
        blocks: { 'default':`<rk-img src="/apps/Light/img/logo.svg"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
}
System.AppIcon.Namespace=`Light.System`;
System.AppIcon.Tag=`light-app-icon`;
__as1(_.System, 'AppIcon', System.AppIcon);
if(!window.customElements.get('light-app-icon')){window.customElements.define('light-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
__as1(_, 'Version', Version);


for(let key in _) { Light[key] = _[key] }
})(Light);


var Minisales;
(Minisales||(Minisales = {}));
(function (Minisales) {
const __as1 = (o, k, c) => { if (o[k] !== undefined) for (let w in o[k]) { c[w] = o[k][w] } o[k] = c; }
const moduleName = `Minisales`;
const _ = {};

let System = {};
_.System = Minisales.System ?? {};
let _n;
let AppInfo=class AppInfo extends AventusSharp.Data.SharpClass {
    static get Fullname() { return "Minisales.AppInfo, Minisales"; }
    static Version = 1;
}
AppInfo.Namespace=`Minisales`;
AppInfo.$schema={...(AventusSharp.Data.SharpClass?.$schema ?? {}), };
Aventus.Converter.register(AppInfo.Fullname, AppInfo);
__as1(_, 'AppInfo', AppInfo);

System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host{background:#174499;background:radial-gradient(circle, rgb(23, 68, 153) 0%, rgb(12, 34, 71) 100%)}:host rk-img{--img-stroke-color: transparent;--img-fill-color: #acf4d6;flex-grow:1;max-height:100%;padding:15%;pointer-events:none}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
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
        blocks: { 'default':`<rk-img src="/apps/Minisales/img/logo.png"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
    defineAddons() {
        return ["QrCodeGenerator"];
    }
}
System.AppIcon.Namespace=`Minisales.System`;
System.AppIcon.Tag=`minisales-app-icon`;
__as1(_.System, 'AppIcon', System.AppIcon);
if(!window.customElements.get('minisales-app-icon')){window.customElements.define('minisales-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
__as1(_, 'Version', Version);


for(let key in _) { Minisales[key] = _[key] }
})(Minisales);


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
    static __style = `:host{background-color:#7a7a7a}:host rk-img{--img-stroke-color: transparent;--img-fill-color: #ffffff;flex-grow:1;max-height:100%;padding:10%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
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

