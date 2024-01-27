
var Utilisateur;
(Utilisateur||(Utilisateur = {}));
(function (Utilisateur) {
const moduleName = `Utilisateur`;
const _ = {};

const System = {};
_.System = {};
let _n;
System.AppIcon = class AppIcon extends Core.System.AppIcon {
    static __style = ``;
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
        blocks: { 'default':`<rk-img src="/img/logo.svg"></rk-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
}
System.AppIcon.Namespace=`${moduleName}.System`;
System.AppIcon.Tag=`utilisateur-app-icon`;
_.System.AppIcon=System.AppIcon;
if(!window.customElements.get('utilisateur-app-icon')){window.customElements.define('utilisateur-app-icon', System.AppIcon);Aventus.WebComponentInstance.registerDefinition(System.AppIcon);}


for(let key in _) { Utilisateur[key] = _[key] }
})(Utilisateur);
