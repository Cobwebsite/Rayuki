
var Donnee;
(Donnee||(Donnee = {}));
(function (Donnee) {
const moduleName = `Donnee`;
const _ = {};

let System = {};
_.System = Donnee.System ?? {};
let _n;
let AppInfo=class AppInfo extends AventusSharp.Data.SharpClass {
    static get Fullname() { return "Donnee.AppInfo, Donnee"; }
    static Version = 1;
}
AppInfo.Namespace=`Donnee`;
AppInfo.$schema={...(AventusSharp.Data.SharpClass?.$schema ?? {}), };
Aventus.Converter.register(AppInfo.Fullname, AppInfo);
_.AppInfo=AppInfo;

System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host{background-color:#5db4c3}:host rk-img{--img-stroke-color: transparent;--img-fill-color: #ffffff;max-height:100%;flex-grow:1;padding:10%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
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
        blocks: { 'default':`<rk-img src="/apps/Donnee/img/logo.svg"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
}
System.AppIcon.Namespace=`Donnee.System`;
System.AppIcon.Tag=`donnee-app-icon`;
_.System.AppIcon=System.AppIcon;
if(!window.customElements.get('donnee-app-icon')){window.customElements.define('donnee-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
_.Version=Version;


for(let key in _) { Donnee[key] = _[key] }
})(Donnee);


var Employes;
(Employes||(Employes = {}));
(function (Employes) {
const moduleName = `Employes`;
const _ = {};

let System = {};
_.System = Employes.System ?? {};
let _n;
let AppInfo=class AppInfo extends AventusSharp.Data.SharpClass {
    static get Fullname() { return "Employes.AppInfo, Employes"; }
    static Version = 1;
}
AppInfo.Namespace=`Employes`;
AppInfo.$schema={...(AventusSharp.Data.SharpClass?.$schema ?? {}), };
Aventus.Converter.register(AppInfo.Fullname, AppInfo);
_.AppInfo=AppInfo;

System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host{background-color:#f39800}:host rk-img{--img-stroke-color: transparent;--img-fill-color: white;max-height:100%;flex-grow:1;padding:10%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
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
        blocks: { 'default':`<rk-img src="/apps/Employes/img/logo.svg"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
}
System.AppIcon.Namespace=`Employes.System`;
System.AppIcon.Tag=`employes-app-icon`;
_.System.AppIcon=System.AppIcon;
if(!window.customElements.get('employes-app-icon')){window.customElements.define('employes-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
_.Version=Version;


for(let key in _) { Employes[key] = _[key] }
})(Employes);


var Horaire;
(Horaire||(Horaire = {}));
(function (Horaire) {
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
_.AppInfo=AppInfo;

System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host{background-color:#d2ac4c}:host rk-img{--img-fill-color: transparent;--img-stroke-color: white;flex-grow:1;max-height:100%;padding:10%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
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
_.System.AppIcon=System.AppIcon;
if(!window.customElements.get('horaire-app-icon')){window.customElements.define('horaire-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
_.Version=Version;


for(let key in _) { Horaire[key] = _[key] }
})(Horaire);


var Microspace;
(Microspace||(Microspace = {}));
(function (Microspace) {
const moduleName = `Microspace`;
const _ = {};

let System = {};
_.System = Microspace.System ?? {};
let _n;
let AppInfo=class AppInfo extends AventusSharp.Data.SharpClass {
    static get Fullname() { return "Microspace.AppInfo, Microspace"; }
    static Version = 1;
}
AppInfo.Namespace=`Microspace`;
AppInfo.$schema={...(AventusSharp.Data.SharpClass?.$schema ?? {}), };
Aventus.Converter.register(AppInfo.Fullname, AppInfo);
_.AppInfo=AppInfo;

System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host{background-color:#000;background-image:url("/apps/Microspace/img/bg_stars.jpg");background-position:center;background-size:cover;background-repeat:no-repeat}:host rk-img{flex-grow:1;max-height:100%;padding:20%;transform:rotate(90deg)}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
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
        blocks: { 'default':`<rk-img src="/apps/Microspace/img/icon.png"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
}
System.AppIcon.Namespace=`Microspace.System`;
System.AppIcon.Tag=`microspace-app-icon`;
_.System.AppIcon=System.AppIcon;
if(!window.customElements.get('microspace-app-icon')){window.customElements.define('microspace-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
_.Version=Version;


for(let key in _) { Microspace[key] = _[key] }
})(Microspace);


var Minisales;
(Minisales||(Minisales = {}));
(function (Minisales) {
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
_.AppInfo=AppInfo;

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
}
System.AppIcon.Namespace=`Minisales.System`;
System.AppIcon.Tag=`minisales-app-icon`;
_.System.AppIcon=System.AppIcon;
if(!window.customElements.get('minisales-app-icon')){window.customElements.define('minisales-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
_.Version=Version;


for(let key in _) { Minisales[key] = _[key] }
})(Minisales);


var Projet;
(Projet||(Projet = {}));
(function (Projet) {
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
_.AppInfo=AppInfo;

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
            "Univer"
        ];
    }
}
System.AppIcon.Namespace=`Projet.System`;
System.AppIcon.Tag=`projet-app-icon`;
_.System.AppIcon=System.AppIcon;
if(!window.customElements.get('projet-app-icon')){window.customElements.define('projet-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
_.Version=Version;


for(let key in _) { Projet[key] = _[key] }
})(Projet);


var Settings;
(Settings||(Settings = {}));
(function (Settings) {
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
_.AppInfo=AppInfo;

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
_.System.AppIcon=System.AppIcon;
if(!window.customElements.get('settings-app-icon')){window.customElements.define('settings-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
_.Version=Version;


for(let key in _) { Settings[key] = _[key] }
})(Settings);


var Stock;
(Stock||(Stock = {}));
(function (Stock) {
const moduleName = `Stock`;
const _ = {};

let System = {};
_.System = Stock.System ?? {};
let _n;
let AppInfo=class AppInfo extends AventusSharp.Data.SharpClass {
    static get Fullname() { return "Stock.AppInfo, Stock"; }
    static Version = 1;
}
AppInfo.Namespace=`Stock`;
AppInfo.$schema={...(AventusSharp.Data.SharpClass?.$schema ?? {}), };
Aventus.Converter.register(AppInfo.Fullname, AppInfo);
_.AppInfo=AppInfo;

System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host{background:#67adc9;background:radial-gradient(circle, #67ADC9 0%, #2A85A8 100%)}:host rk-img{--img-stroke-color: transparent;--img-fill-color: #ffffff;flex-grow:1;max-height:100%;padding:10%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
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
        blocks: { 'default':`<rk-img src="/apps/Stock/img/logo.svg"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
    defineAddons() {
        return ["QrCodeReader"];
    }
}
System.AppIcon.Namespace=`Stock.System`;
System.AppIcon.Tag=`stock-app-icon`;
_.System.AppIcon=System.AppIcon;
if(!window.customElements.get('stock-app-icon')){window.customElements.define('stock-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
_.Version=Version;


for(let key in _) { Stock[key] = _[key] }
})(Stock);


var Store;
(Store||(Store = {}));
(function (Store) {
const moduleName = `Store`;
const _ = {};

let System = {};
_.System = Store.System ?? {};
let _n;
let AppInfo=class AppInfo extends AventusSharp.Data.SharpClass {
    static get Fullname() { return "Store.AppInfo, Store"; }
    static Version = 1;
}
AppInfo.Namespace=`Store`;
AppInfo.$schema={...(AventusSharp.Data.SharpClass?.$schema ?? {}), };
Aventus.Converter.register(AppInfo.Fullname, AppInfo);
_.AppInfo=AppInfo;

System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host{background-color:#5eb4f6}:host rk-img{--img-stroke-color: transparent;--img-fill-color: #ffffff;flex-grow:1;max-height:100%;padding:10%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
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
        blocks: { 'default':`<rk-img src="/apps/Store/img/logo.svg"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
}
System.AppIcon.Namespace=`Store.System`;
System.AppIcon.Tag=`store-app-icon`;
_.System.AppIcon=System.AppIcon;
if(!window.customElements.get('store-app-icon')){window.customElements.define('store-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}

let Version= AppInfo.Version;
_.Version=Version;


for(let key in _) { Store[key] = _[key] }
})(Store);

