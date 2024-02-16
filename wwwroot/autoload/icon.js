
var Cave;
(Cave||(Cave = {}));
(function (Cave) {
const moduleName = `Cave`;
const _ = {};

const System = {};
_.System = {};
let _n;
System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host{background-color:#6d071a}:host rk-img{--img-stroke-color: transparent;--img-fill-color: white;flex-grow:1;height:100%;max-height:100%;padding:10%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
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
        blocks: { 'default':`<rk-img src="/apps/Cave/img/grape.svg"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
    url() {
        return "/gamme";
    }
}
System.AppIcon.Namespace=`${moduleName}.System`;
System.AppIcon.Tag=`cave-app-icon`;
_.System.AppIcon=System.AppIcon;
if(!window.customElements.get('cave-app-icon')){window.customElements.define('cave-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}


for(let key in _) { Cave[key] = _[key] }
})(Cave);


var Settings;
(Settings||(Settings = {}));
(function (Settings) {
const moduleName = `Settings`;
const _ = {};

const System = {};
_.System = {};
let _n;
System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = `:host{background-color:#7a7a7a}:host rk-img{--img-stroke-color: transparent;--img-fill-color: #dcdcdc;flex-grow:1;max-height:100%;padding:10%}@media screen and (max-width: 768px){:host rk-img{padding:7px}}`;
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
System.AppIcon.Namespace=`${moduleName}.System`;
System.AppIcon.Tag=`settings-app-icon`;
_.System.AppIcon=System.AppIcon;
if(!window.customElements.get('settings-app-icon')){window.customElements.define('settings-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}


for(let key in _) { Settings[key] = _[key] }
})(Settings);

