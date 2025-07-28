
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
    static __style = `:host lucide-icon{color:#fff;height:100%;width:100%;padding:20%}@media screen and (max-width: 768px){:host lucide-icon{padding:7px}}`;
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
        blocks: { 'default':`<lucide-icon icon="Clock"></lucide-icon>` }
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

