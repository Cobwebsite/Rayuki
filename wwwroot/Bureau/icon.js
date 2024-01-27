
var Bureau;
(Bureau||(Bureau = {}));
(function (Bureau) {
const moduleName = `Bureau`;
const _ = {};


let _n;
const AppIcon = class AppIcon extends Core.AppIcon {
    static __style = `:host{background-color:#e47d4b}:host av-img{--img-fill-color: white;padding-right:15%}`;
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
        blocks: { 'default':`<av-img src="/apps/Bureau/img/logo.svg"></av-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
}
AppIcon.Namespace=`${moduleName}`;
AppIcon.Tag=`bureau-app-icon`;
_.AppIcon=AppIcon;
if(!window.customElements.get('bureau-app-icon')){window.customElements.define('bureau-app-icon', AppIcon);Aventus.WebComponentInstance.registerDefinition(AppIcon);}


for(let key in _) { Bureau[key] = _[key] }
})(Bureau);
