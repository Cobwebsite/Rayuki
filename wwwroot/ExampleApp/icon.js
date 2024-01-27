
var ExampleApp;
(ExampleApp||(ExampleApp = {}));
(function (ExampleApp) {
const moduleName = `ExampleApp`;
const _ = {};


let _n;
const AppIcon = class AppIcon extends RayukiCore.AppIcon {
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
        blocks: { 'default':`<av-img src="/apps/ExampleApp/img/house.svg"></av-img>` }
    });
}
    getClassName() {
        return "AppIcon";
    }
}
AppIcon.Namespace=`${moduleName}`;
AppIcon.Tag=`example-app-app-icon`;
_.AppIcon=AppIcon;
if(!window.customElements.get('example-app-app-icon')){window.customElements.define('example-app-app-icon', AppIcon);Aventus.WebComponentInstance.registerDefinition(AppIcon);}


for(let key in _) { ExampleApp[key] = _[key] }
})(ExampleApp);
