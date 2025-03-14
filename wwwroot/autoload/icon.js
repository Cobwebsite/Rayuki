
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

