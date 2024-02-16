
var Core;
(Core||(Core = {}));
(function (Core) {
const moduleName = `Core`;
const _ = {};
Aventus.Style.store("@default", `:host{box-sizing:border-box;display:inline-block;--img-fill-color: var(--text-color)}:host *{box-sizing:border-box}.touch{cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}.touch.disable,.touch.disabled{cursor:default}.green{background-color:var(--green)}.red{background-color:var(--red)}.orange{background-color:var(--orange)}.blue{background-color:var(--blue)}`)
const Permissions = {};
_.Permissions = {};
const Errors = {};
_.Errors = {};
const Data = {};
_.Data = {};
const App = {};
_.App = {};
const Components = {};
_.Components = {};
const System = {};
_.System = {};
const Lib = {};
_.Lib = {};
const Websocket = {};
_.Websocket = {};
Websocket.Events = {};
_.Websocket.Events = {};
Websocket.Routes = {};
_.Websocket.Routes = {};
const Routes = {};
_.Routes = {};
const State = {};
_.State = {};
const RAM = {};
_.RAM = {};
let _n;
(function (DesktopPermission) {
    DesktopPermission[DesktopPermission["CanEdit"] = 0] = "CanEdit";
    DesktopPermission[DesktopPermission["CanDelete"] = 1] = "CanDelete";
    DesktopPermission[DesktopPermission["CanCreate"] = 2] = "CanCreate";
    DesktopPermission[DesktopPermission["CanTemplate"] = 3] = "CanTemplate";
})(Permissions.DesktopPermission || (Permissions.DesktopPermission = {}));

_.Permissions.DesktopPermission=Permissions.DesktopPermission;
(function (ApplicationPermission) {
    ApplicationPermission[ApplicationPermission["DenyAccess"] = 0] = "DenyAccess";
})(Permissions.ApplicationPermission || (Permissions.ApplicationPermission = {}));

_.Permissions.ApplicationPermission=Permissions.ApplicationPermission;
(function (DesktopErrorCode) {
    DesktopErrorCode[DesktopErrorCode["NoDefaultDesktop"] = 0] = "NoDefaultDesktop";
})(Errors.DesktopErrorCode || (Errors.DesktopErrorCode = {}));

_.Errors.DesktopErrorCode=Errors.DesktopErrorCode;
Data.Permission=class Permission extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.Permission, Core"; }
    EnumName;
    AdditionalInfo = "";
    EnumValue;
}
Data.Permission.$schema={"EnumName":"string","AdditionalInfo":"string","EnumValue":"Aventus.Enum"};Aventus.DataManager.register(Data.Permission.Fullname, Data.Permission);Data.Permission.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Permission.Fullname, Data.Permission);
_.Data.Permission=Data.Permission;
Data.Company=class Company extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.Company, Core"; }
    Name = "";
    Logo = "";
}
Data.Company.$schema={"Name":"string","Logo":"string"};Aventus.DataManager.register(Data.Company.Fullname, Data.Company);Data.Company.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Company.Fullname, Data.Company);
_.Data.Company=Data.Company;
(function (AppErrorCode) {
    AppErrorCode[AppErrorCode["AppFileNotFound"] = 0] = "AppFileNotFound";
    AppErrorCode[AppErrorCode["MoreThanOneAppFileFound"] = 1] = "MoreThanOneAppFileFound";
    AppErrorCode[AppErrorCode["NoAppFileFound"] = 2] = "NoAppFileFound";
    AppErrorCode[AppErrorCode["NoIconFileFound"] = 3] = "NoIconFileFound";
    AppErrorCode[AppErrorCode["WrongVersionFormat"] = 4] = "WrongVersionFormat";
    AppErrorCode[AppErrorCode["NoName"] = 5] = "NoName";
    AppErrorCode[AppErrorCode["UnknowError"] = 6] = "UnknowError";
})(App.AppErrorCode || (App.AppErrorCode = {}));

_.App.AppErrorCode=App.AppErrorCode;
Components.Row = class Row extends Aventus.WebComponent {
    static __style = `:host{display:flex;width:100%;flex-wrap:wrap;container-type:inline-size}`;
    __getStatic() {
        return Row;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Row.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Row";
    }
}
Components.Row.Namespace=`${moduleName}.Components`;
Components.Row.Tag=`rk-row`;
_.Components.Row=Components.Row;
if(!window.customElements.get('rk-row')){window.customElements.define('rk-row', Components.Row);Aventus.WebComponentInstance.registerDefinition(Components.Row);}

Components.Col = class Col extends Aventus.WebComponent {
    get 'size'() { return this.getNumberAttr('size') }
    set 'size'(val) { this.setNumberAttr('size', val) }get 'size_xs'() { return this.getNumberAttr('size_xs') }
    set 'size_xs'(val) { this.setNumberAttr('size_xs', val) }get 'size_sm'() { return this.getNumberAttr('size_sm') }
    set 'size_sm'(val) { this.setNumberAttr('size_sm', val) }get 'size_md'() { return this.getNumberAttr('size_md') }
    set 'size_md'(val) { this.setNumberAttr('size_md', val) }get 'size_lg'() { return this.getNumberAttr('size_lg') }
    set 'size_lg'(val) { this.setNumberAttr('size_lg', val) }get 'size_xl'() { return this.getNumberAttr('size_xl') }
    set 'size_xl'(val) { this.setNumberAttr('size_xl', val) }get 'offset'() { return this.getNumberAttr('offset') }
    set 'offset'(val) { this.setNumberAttr('offset', val) }get 'offset_xs'() { return this.getNumberAttr('offset_xs') }
    set 'offset_xs'(val) { this.setNumberAttr('offset_xs', val) }get 'offset_sm'() { return this.getNumberAttr('offset_sm') }
    set 'offset_sm'(val) { this.setNumberAttr('offset_sm', val) }get 'offset_md'() { return this.getNumberAttr('offset_md') }
    set 'offset_md'(val) { this.setNumberAttr('offset_md', val) }get 'offset_lg'() { return this.getNumberAttr('offset_lg') }
    set 'offset_lg'(val) { this.setNumberAttr('offset_lg', val) }get 'offset_xl'() { return this.getNumberAttr('offset_xl') }
    set 'offset_xl'(val) { this.setNumberAttr('offset_xl', val) }get 'offset_right'() { return this.getNumberAttr('offset_right') }
    set 'offset_right'(val) { this.setNumberAttr('offset_right', val) }get 'offset_right_xs'() { return this.getNumberAttr('offset_right_xs') }
    set 'offset_right_xs'(val) { this.setNumberAttr('offset_right_xs', val) }get 'offset_right_sm'() { return this.getNumberAttr('offset_right_sm') }
    set 'offset_right_sm'(val) { this.setNumberAttr('offset_right_sm', val) }get 'offset_right_md'() { return this.getNumberAttr('offset_right_md') }
    set 'offset_right_md'(val) { this.setNumberAttr('offset_right_md', val) }get 'offset_right_lg'() { return this.getNumberAttr('offset_right_lg') }
    set 'offset_right_lg'(val) { this.setNumberAttr('offset_right_lg', val) }get 'offset_right_xl'() { return this.getNumberAttr('offset_right_xl') }
    set 'offset_right_xl'(val) { this.setNumberAttr('offset_right_xl', val) }    static __style = `:host{--internal-col-padding:var(--col-padding, 8px)}:host{padding:var(--internal-col-padding)}:host([size="0"]){display:flex;width:0%}:host([offset="0"]){margin-left:0%}:host([offset_right="0"]){margin-right:0%}:host([size="1"]){display:flex;width:8.3333333333%}:host([offset="1"]){margin-left:8.3333333333%}:host([offset_right="1"]){margin-right:8.3333333333%}:host([size="2"]){display:flex;width:16.6666666667%}:host([offset="2"]){margin-left:16.6666666667%}:host([offset_right="2"]){margin-right:16.6666666667%}:host([size="3"]){display:flex;width:25%}:host([offset="3"]){margin-left:25%}:host([offset_right="3"]){margin-right:25%}:host([size="4"]){display:flex;width:33.3333333333%}:host([offset="4"]){margin-left:33.3333333333%}:host([offset_right="4"]){margin-right:33.3333333333%}:host([size="5"]){display:flex;width:41.6666666667%}:host([offset="5"]){margin-left:41.6666666667%}:host([offset_right="5"]){margin-right:41.6666666667%}:host([size="6"]){display:flex;width:50%}:host([offset="6"]){margin-left:50%}:host([offset_right="6"]){margin-right:50%}:host([size="7"]){display:flex;width:58.3333333333%}:host([offset="7"]){margin-left:58.3333333333%}:host([offset_right="7"]){margin-right:58.3333333333%}:host([size="8"]){display:flex;width:66.6666666667%}:host([offset="8"]){margin-left:66.6666666667%}:host([offset_right="8"]){margin-right:66.6666666667%}:host([size="9"]){display:flex;width:75%}:host([offset="9"]){margin-left:75%}:host([offset_right="9"]){margin-right:75%}:host([size="10"]){display:flex;width:83.3333333333%}:host([offset="10"]){margin-left:83.3333333333%}:host([offset_right="10"]){margin-right:83.3333333333%}:host([size="11"]){display:flex;width:91.6666666667%}:host([offset="11"]){margin-left:91.6666666667%}:host([offset_right="11"]){margin-right:91.6666666667%}:host([size="12"]){display:flex;width:100%}:host([offset="12"]){margin-left:100%}:host([offset_right="12"]){margin-right:100%}@container (min-width: 300px){:host([size_xs="0"]){display:flex;width:0%}:host([offset_xs="0"]){margin-left:0%}:host([offset_right_xs="0"]){margin-right:0%}:host([size_xs="1"]){display:flex;width:8.3333333333%}:host([offset_xs="1"]){margin-left:8.3333333333%}:host([offset_right_xs="1"]){margin-right:8.3333333333%}:host([size_xs="2"]){display:flex;width:16.6666666667%}:host([offset_xs="2"]){margin-left:16.6666666667%}:host([offset_right_xs="2"]){margin-right:16.6666666667%}:host([size_xs="3"]){display:flex;width:25%}:host([offset_xs="3"]){margin-left:25%}:host([offset_right_xs="3"]){margin-right:25%}:host([size_xs="4"]){display:flex;width:33.3333333333%}:host([offset_xs="4"]){margin-left:33.3333333333%}:host([offset_right_xs="4"]){margin-right:33.3333333333%}:host([size_xs="5"]){display:flex;width:41.6666666667%}:host([offset_xs="5"]){margin-left:41.6666666667%}:host([offset_right_xs="5"]){margin-right:41.6666666667%}:host([size_xs="6"]){display:flex;width:50%}:host([offset_xs="6"]){margin-left:50%}:host([offset_right_xs="6"]){margin-right:50%}:host([size_xs="7"]){display:flex;width:58.3333333333%}:host([offset_xs="7"]){margin-left:58.3333333333%}:host([offset_right_xs="7"]){margin-right:58.3333333333%}:host([size_xs="8"]){display:flex;width:66.6666666667%}:host([offset_xs="8"]){margin-left:66.6666666667%}:host([offset_right_xs="8"]){margin-right:66.6666666667%}:host([size_xs="9"]){display:flex;width:75%}:host([offset_xs="9"]){margin-left:75%}:host([offset_right_xs="9"]){margin-right:75%}:host([size_xs="10"]){display:flex;width:83.3333333333%}:host([offset_xs="10"]){margin-left:83.3333333333%}:host([offset_right_xs="10"]){margin-right:83.3333333333%}:host([size_xs="11"]){display:flex;width:91.6666666667%}:host([offset_xs="11"]){margin-left:91.6666666667%}:host([offset_right_xs="11"]){margin-right:91.6666666667%}:host([size_xs="12"]){display:flex;width:100%}:host([offset_xs="12"]){margin-left:100%}:host([offset_right_xs="12"]){margin-right:100%}}@container (min-width: 540px){:host([size_sm="0"]){display:flex;width:0%}:host([offset_sm="0"]){margin-left:0%}:host([offset_right_sm="0"]){margin-right:0%}:host([size_sm="1"]){display:flex;width:8.3333333333%}:host([offset_sm="1"]){margin-left:8.3333333333%}:host([offset_right_sm="1"]){margin-right:8.3333333333%}:host([size_sm="2"]){display:flex;width:16.6666666667%}:host([offset_sm="2"]){margin-left:16.6666666667%}:host([offset_right_sm="2"]){margin-right:16.6666666667%}:host([size_sm="3"]){display:flex;width:25%}:host([offset_sm="3"]){margin-left:25%}:host([offset_right_sm="3"]){margin-right:25%}:host([size_sm="4"]){display:flex;width:33.3333333333%}:host([offset_sm="4"]){margin-left:33.3333333333%}:host([offset_right_sm="4"]){margin-right:33.3333333333%}:host([size_sm="5"]){display:flex;width:41.6666666667%}:host([offset_sm="5"]){margin-left:41.6666666667%}:host([offset_right_sm="5"]){margin-right:41.6666666667%}:host([size_sm="6"]){display:flex;width:50%}:host([offset_sm="6"]){margin-left:50%}:host([offset_right_sm="6"]){margin-right:50%}:host([size_sm="7"]){display:flex;width:58.3333333333%}:host([offset_sm="7"]){margin-left:58.3333333333%}:host([offset_right_sm="7"]){margin-right:58.3333333333%}:host([size_sm="8"]){display:flex;width:66.6666666667%}:host([offset_sm="8"]){margin-left:66.6666666667%}:host([offset_right_sm="8"]){margin-right:66.6666666667%}:host([size_sm="9"]){display:flex;width:75%}:host([offset_sm="9"]){margin-left:75%}:host([offset_right_sm="9"]){margin-right:75%}:host([size_sm="10"]){display:flex;width:83.3333333333%}:host([offset_sm="10"]){margin-left:83.3333333333%}:host([offset_right_sm="10"]){margin-right:83.3333333333%}:host([size_sm="11"]){display:flex;width:91.6666666667%}:host([offset_sm="11"]){margin-left:91.6666666667%}:host([offset_right_sm="11"]){margin-right:91.6666666667%}:host([size_sm="12"]){display:flex;width:100%}:host([offset_sm="12"]){margin-left:100%}:host([offset_right_sm="12"]){margin-right:100%}}@container (min-width: 720px){:host([size_md="0"]){display:flex;width:0%}:host([offset_md="0"]){margin-left:0%}:host([offset_right_md="0"]){margin-right:0%}:host([size_md="1"]){display:flex;width:8.3333333333%}:host([offset_md="1"]){margin-left:8.3333333333%}:host([offset_right_md="1"]){margin-right:8.3333333333%}:host([size_md="2"]){display:flex;width:16.6666666667%}:host([offset_md="2"]){margin-left:16.6666666667%}:host([offset_right_md="2"]){margin-right:16.6666666667%}:host([size_md="3"]){display:flex;width:25%}:host([offset_md="3"]){margin-left:25%}:host([offset_right_md="3"]){margin-right:25%}:host([size_md="4"]){display:flex;width:33.3333333333%}:host([offset_md="4"]){margin-left:33.3333333333%}:host([offset_right_md="4"]){margin-right:33.3333333333%}:host([size_md="5"]){display:flex;width:41.6666666667%}:host([offset_md="5"]){margin-left:41.6666666667%}:host([offset_right_md="5"]){margin-right:41.6666666667%}:host([size_md="6"]){display:flex;width:50%}:host([offset_md="6"]){margin-left:50%}:host([offset_right_md="6"]){margin-right:50%}:host([size_md="7"]){display:flex;width:58.3333333333%}:host([offset_md="7"]){margin-left:58.3333333333%}:host([offset_right_md="7"]){margin-right:58.3333333333%}:host([size_md="8"]){display:flex;width:66.6666666667%}:host([offset_md="8"]){margin-left:66.6666666667%}:host([offset_right_md="8"]){margin-right:66.6666666667%}:host([size_md="9"]){display:flex;width:75%}:host([offset_md="9"]){margin-left:75%}:host([offset_right_md="9"]){margin-right:75%}:host([size_md="10"]){display:flex;width:83.3333333333%}:host([offset_md="10"]){margin-left:83.3333333333%}:host([offset_right_md="10"]){margin-right:83.3333333333%}:host([size_md="11"]){display:flex;width:91.6666666667%}:host([offset_md="11"]){margin-left:91.6666666667%}:host([offset_right_md="11"]){margin-right:91.6666666667%}:host([size_md="12"]){display:flex;width:100%}:host([offset_md="12"]){margin-left:100%}:host([offset_right_md="12"]){margin-right:100%}}@container (min-width: 960px){:host([size_lg="0"]){display:flex;width:0%}:host([offset_lg="0"]){margin-left:0%}:host([offset_right_lg="0"]){margin-right:0%}:host([size_lg="1"]){display:flex;width:8.3333333333%}:host([offset_lg="1"]){margin-left:8.3333333333%}:host([offset_right_lg="1"]){margin-right:8.3333333333%}:host([size_lg="2"]){display:flex;width:16.6666666667%}:host([offset_lg="2"]){margin-left:16.6666666667%}:host([offset_right_lg="2"]){margin-right:16.6666666667%}:host([size_lg="3"]){display:flex;width:25%}:host([offset_lg="3"]){margin-left:25%}:host([offset_right_lg="3"]){margin-right:25%}:host([size_lg="4"]){display:flex;width:33.3333333333%}:host([offset_lg="4"]){margin-left:33.3333333333%}:host([offset_right_lg="4"]){margin-right:33.3333333333%}:host([size_lg="5"]){display:flex;width:41.6666666667%}:host([offset_lg="5"]){margin-left:41.6666666667%}:host([offset_right_lg="5"]){margin-right:41.6666666667%}:host([size_lg="6"]){display:flex;width:50%}:host([offset_lg="6"]){margin-left:50%}:host([offset_right_lg="6"]){margin-right:50%}:host([size_lg="7"]){display:flex;width:58.3333333333%}:host([offset_lg="7"]){margin-left:58.3333333333%}:host([offset_right_lg="7"]){margin-right:58.3333333333%}:host([size_lg="8"]){display:flex;width:66.6666666667%}:host([offset_lg="8"]){margin-left:66.6666666667%}:host([offset_right_lg="8"]){margin-right:66.6666666667%}:host([size_lg="9"]){display:flex;width:75%}:host([offset_lg="9"]){margin-left:75%}:host([offset_right_lg="9"]){margin-right:75%}:host([size_lg="10"]){display:flex;width:83.3333333333%}:host([offset_lg="10"]){margin-left:83.3333333333%}:host([offset_right_lg="10"]){margin-right:83.3333333333%}:host([size_lg="11"]){display:flex;width:91.6666666667%}:host([offset_lg="11"]){margin-left:91.6666666667%}:host([offset_right_lg="11"]){margin-right:91.6666666667%}:host([size_lg="12"]){display:flex;width:100%}:host([offset_lg="12"]){margin-left:100%}:host([offset_right_lg="12"]){margin-right:100%}}@container (min-width: 1140px){:host([size_xl="0"]){display:flex;width:0%}:host([offset_xl="0"]){margin-left:0%}:host([offset_right_xl="0"]){margin-right:0%}:host([size_xl="1"]){display:flex;width:8.3333333333%}:host([offset_xl="1"]){margin-left:8.3333333333%}:host([offset_right_xl="1"]){margin-right:8.3333333333%}:host([size_xl="2"]){display:flex;width:16.6666666667%}:host([offset_xl="2"]){margin-left:16.6666666667%}:host([offset_right_xl="2"]){margin-right:16.6666666667%}:host([size_xl="3"]){display:flex;width:25%}:host([offset_xl="3"]){margin-left:25%}:host([offset_right_xl="3"]){margin-right:25%}:host([size_xl="4"]){display:flex;width:33.3333333333%}:host([offset_xl="4"]){margin-left:33.3333333333%}:host([offset_right_xl="4"]){margin-right:33.3333333333%}:host([size_xl="5"]){display:flex;width:41.6666666667%}:host([offset_xl="5"]){margin-left:41.6666666667%}:host([offset_right_xl="5"]){margin-right:41.6666666667%}:host([size_xl="6"]){display:flex;width:50%}:host([offset_xl="6"]){margin-left:50%}:host([offset_right_xl="6"]){margin-right:50%}:host([size_xl="7"]){display:flex;width:58.3333333333%}:host([offset_xl="7"]){margin-left:58.3333333333%}:host([offset_right_xl="7"]){margin-right:58.3333333333%}:host([size_xl="8"]){display:flex;width:66.6666666667%}:host([offset_xl="8"]){margin-left:66.6666666667%}:host([offset_right_xl="8"]){margin-right:66.6666666667%}:host([size_xl="9"]){display:flex;width:75%}:host([offset_xl="9"]){margin-left:75%}:host([offset_right_xl="9"]){margin-right:75%}:host([size_xl="10"]){display:flex;width:83.3333333333%}:host([offset_xl="10"]){margin-left:83.3333333333%}:host([offset_right_xl="10"]){margin-right:83.3333333333%}:host([size_xl="11"]){display:flex;width:91.6666666667%}:host([offset_xl="11"]){margin-left:91.6666666667%}:host([offset_right_xl="11"]){margin-right:91.6666666667%}:host([size_xl="12"]){display:flex;width:100%}:host([offset_xl="12"]){margin-left:100%}:host([offset_right_xl="12"]){margin-right:100%}}`;
    __getStatic() {
        return Col;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Col.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Col";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('size')){ this['size'] = undefined; }if(!this.hasAttribute('size_xs')){ this['size_xs'] = undefined; }if(!this.hasAttribute('size_sm')){ this['size_sm'] = undefined; }if(!this.hasAttribute('size_md')){ this['size_md'] = undefined; }if(!this.hasAttribute('size_lg')){ this['size_lg'] = undefined; }if(!this.hasAttribute('size_xl')){ this['size_xl'] = undefined; }if(!this.hasAttribute('offset')){ this['offset'] = undefined; }if(!this.hasAttribute('offset_xs')){ this['offset_xs'] = undefined; }if(!this.hasAttribute('offset_sm')){ this['offset_sm'] = undefined; }if(!this.hasAttribute('offset_md')){ this['offset_md'] = undefined; }if(!this.hasAttribute('offset_lg')){ this['offset_lg'] = undefined; }if(!this.hasAttribute('offset_xl')){ this['offset_xl'] = undefined; }if(!this.hasAttribute('offset_right')){ this['offset_right'] = undefined; }if(!this.hasAttribute('offset_right_xs')){ this['offset_right_xs'] = undefined; }if(!this.hasAttribute('offset_right_sm')){ this['offset_right_sm'] = undefined; }if(!this.hasAttribute('offset_right_md')){ this['offset_right_md'] = undefined; }if(!this.hasAttribute('offset_right_lg')){ this['offset_right_lg'] = undefined; }if(!this.hasAttribute('offset_right_xl')){ this['offset_right_xl'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('size');this.__upgradeProperty('size_xs');this.__upgradeProperty('size_sm');this.__upgradeProperty('size_md');this.__upgradeProperty('size_lg');this.__upgradeProperty('size_xl');this.__upgradeProperty('offset');this.__upgradeProperty('offset_xs');this.__upgradeProperty('offset_sm');this.__upgradeProperty('offset_md');this.__upgradeProperty('offset_lg');this.__upgradeProperty('offset_xl');this.__upgradeProperty('offset_right');this.__upgradeProperty('offset_right_xs');this.__upgradeProperty('offset_right_sm');this.__upgradeProperty('offset_right_md');this.__upgradeProperty('offset_right_lg');this.__upgradeProperty('offset_right_xl'); }
}
Components.Col.Namespace=`${moduleName}.Components`;
Components.Col.Tag=`rk-col`;
_.Components.Col=Components.Col;
if(!window.customElements.get('rk-col')){window.customElements.define('rk-col', Components.Col);Aventus.WebComponentInstance.registerDefinition(Components.Col);}

Components.Card = class Card extends Aventus.WebComponent {
    static __style = `:host{--internal-card-background-color: var(--card-background-color, white)}:host{border-color:rgba(47,43,61,.16);background-color:var(--internal-card-background-color);border-radius:6px;border-style:solid;border-width:0;box-shadow:var(--elevation-2);display:block;overflow:hidden;overflow-wrap:break-word;padding:24px;position:relative;text-decoration:none;transition-duration:.28s;transition-property:box-shadow,opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);z-index:0}`;
    __getStatic() {
        return Card;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Card.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Card";
    }
}
Components.Card.Namespace=`${moduleName}.Components`;
Components.Card.Tag=`rk-card`;
_.Components.Card=Components.Card;
if(!window.customElements.get('rk-card')){window.customElements.define('rk-card', Components.Card);Aventus.WebComponentInstance.registerDefinition(Components.Card);}

Components.Img = class Img extends Aventus.WebComponent {
    static get observedAttributes() {return ["src", "mode"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'cache'() { return this.getBoolAttr('cache') }
    set 'cache'(val) { this.setBoolAttr('cache', val) }    get 'src'() { return this.getStringProp('src') }
    set 'src'(val) { this.setStringAttr('src', val) }get 'mode'() { return this.getStringProp('mode') }
    set 'mode'(val) { this.setStringAttr('mode', val) }    isCalculing;
    maxCalculateSize = 10;
    ratio = 1;
    resizeObserver;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("src", ((target) => {
    target.onSrcChanged();
}));this.__addPropertyActions("mode", ((target) => {
    if (target.src != "") {
        target.calculateSize();
    }
})); }
    static __style = `:host{--_img-color: var(--img-color);--_img-stroke-color: var(--img-stroke-color, var(--_img-color));--_img-fill-color: var(--img-fill-color, var(--_img-color));--_img-color-transition: var(--img-color-transition, none);--_img-stroke-width: var(--img-stroke-width, 1px)}:host{display:inline-block;font-size:0;overflow:hidden}:host *{box-sizing:border-box}:host img{opacity:0;transition:filter .3s linear}:host .svg{display:none;height:100%;width:100%}:host .svg svg{height:100%;width:100%}:host([src$=".svg"]) img{display:none}:host([src$=".svg"]) .svg{display:flex}:host([src$=".svg"]) .svg svg{fill:var(--_img-fill-color);stroke:var(--_img-stroke-color);stroke-width:var(--_img-stroke-width);transition:var(--_img-color-transition)}:host([display_bigger]) img{cursor:pointer}:host([display_bigger]) img:hover{filter:brightness(50%)}`;
    __getStatic() {
        return Img;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Img.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<img _id="img_0" /><div class="svg" _id="img_1"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "imgEl",
      "ids": [
        "img_0"
      ]
    },
    {
      "name": "svgEl",
      "ids": [
        "img_1"
      ]
    }
  ]
}); }
    getClassName() {
        return "Img";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('cache')) { this.attributeChangedCallback('cache', false, false); }if(!this.hasAttribute('src')){ this['src'] = undefined; }if(!this.hasAttribute('mode')){ this['mode'] = "contains"; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('cache');this.__upgradeProperty('src');this.__upgradeProperty('mode'); }
    __listBoolProps() { return ["cache"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    calculateSize(attempt = 0) {
        if (this.isCalculing || !this.imgEl || !this.svgEl) {
            return;
        }
        if (this.src == "") {
            return;
        }
        this.isCalculing = true;
        if (getComputedStyle(this).display == 'none') {
            return;
        }
        if (attempt == this.maxCalculateSize) {
            this.isCalculing = false;
            return;
        }
        let element = this.imgEl;
        if (this.src?.endsWith(".svg")) {
            element = this.svgEl;
        }
        this.style.width = '';
        this.style.height = '';
        element.style.width = '';
        element.style.height = '';
        if (element.offsetWidth == 0 && element.offsetHeight == 0) {
            setTimeout(() => {
                this.isCalculing = false;
                this.calculateSize(attempt + 1);
            }, 100);
            return;
        }
        let style = getComputedStyle(this);
        let addedY = Number(style.paddingTop.replace("px", "")) + Number(style.paddingBottom.replace("px", "")) + Number(style.borderTopWidth.replace("px", "")) + Number(style.borderBottomWidth.replace("px", ""));
        let addedX = Number(style.paddingLeft.replace("px", "")) + Number(style.paddingRight.replace("px", "")) + Number(style.borderLeftWidth.replace("px", "")) + Number(style.borderRightWidth.replace("px", ""));
        let availableHeight = this.offsetHeight - addedY;
        let availableWidth = this.offsetWidth - addedX;
        let sameWidth = (element.offsetWidth == availableWidth);
        let sameHeight = (element.offsetHeight == availableHeight);
        this.ratio = element.offsetWidth / element.offsetHeight;
        if (sameWidth && !sameHeight) {
            // height is set
            element.style.width = (availableHeight * this.ratio) + 'px';
            element.style.height = availableHeight + 'px';
        }
        else if (!sameWidth && sameHeight) {
            // width is set
            element.style.width = availableWidth + 'px';
            element.style.height = (availableWidth / this.ratio) + 'px';
        }
        else if (!sameWidth && !sameHeight) {
            if (this.mode == "stretch") {
                element.style.width = '100%';
                element.style.height = '100%';
            }
            else if (this.mode == "contains") {
                // suppose this height is max
                let newWidth = (availableHeight * this.ratio);
                if (newWidth <= availableWidth) {
                    //we can apply this value
                    element.style.width = newWidth + 'px';
                    element.style.height = availableHeight + 'px';
                }
                else {
                    element.style.width = availableWidth + 'px';
                    element.style.height = (availableWidth / this.ratio) + 'px';
                }
            }
            else if (this.mode == "cover") {
                // suppose this height is min
                let newWidth = (availableHeight * this.ratio);
                if (newWidth >= availableWidth) {
                    //we can apply this value
                    element.style.width = newWidth + 'px';
                    element.style.height = availableHeight + 'px';
                }
                else {
                    element.style.width = availableWidth + 'px';
                    element.style.height = (availableWidth / this.ratio) + 'px';
                }
            }
        }
        //center img
        let diffTop = (this.offsetHeight - element.offsetHeight - addedY) / 2;
        let diffLeft = (this.offsetWidth - element.offsetWidth - addedX) / 2;
        element.style.transform = "translate(" + diffLeft + "px, " + diffTop + "px)";
        element.style.opacity = '1';
        this.isCalculing = false;
    }
    async onSrcChanged() {
        if (!this.src || !this.svgEl || !this.imgEl) {
            return;
        }
        if (this.src.endsWith(".svg")) {
            let svgContent = await Aventus.ResourceLoader.load(this.src);
            this.svgEl.innerHTML = svgContent;
            this.calculateSize();
        }
        else if (this.cache) {
            let base64 = await Aventus.ResourceLoader.load({
                url: this.src,
                type: 'img'
            });
            this.imgEl.setAttribute("src", base64);
            this.calculateSize();
        }
        else {
            this.imgEl.setAttribute("src", this.src);
            this.calculateSize();
        }
    }
    postDestruction() {
        this.resizeObserver?.disconnect();
        this.resizeObserver = undefined;
    }
    postCreation() {
        this.resizeObserver = new Aventus.ResizeObserver({
            fps: 10,
            callback: () => {
                this.calculateSize();
            }
        });
        this.resizeObserver.observe(this);
    }
}
Components.Img.Namespace=`${moduleName}.Components`;
Components.Img.Tag=`rk-img`;
_.Components.Img=Components.Img;
if(!window.customElements.get('rk-img')){window.customElements.define('rk-img', Components.Img);Aventus.WebComponentInstance.registerDefinition(Components.Img);}

Components.Switch = class Switch extends Aventus.WebComponent {
    static get observedAttributes() {return ["label", "disabled"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'label_end'() { return this.getBoolAttr('label_end') }
    set 'label_end'(val) { this.setBoolAttr('label_end', val) }    get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }get 'disabled'() { return this.getBoolProp('disabled') }
    set 'disabled'(val) { this.setBoolAttr('disabled', val) }    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("disabled", ((target) => {
    if (target.checkboxEl) {
        if (target.disabled === undefined) {
            target.checkboxEl.disabled = false;
        }
        else {
            target.checkboxEl.disabled = target.disabled;
        }
    }
})); }
    static __style = `:host{--_switch-background-color: var(--switch-background-color, var(--form-element-background, white));--_switch-dot-size: var(--switch-dot-size, 20px);--_switch-dot-color: var(--switch-dot-color, var(--secondary-color));--_switch-active-dot-color: var(--switch-active-dot-color, var(--secondary-color-active));--_switch-active-background-color: var(--switch-active-background-color, var(--secondary-color));--_switch-font-size: var(--switch-font-size, var(--form-element-font-size, 16px));--_switch-font-size-label: var(--switch-font-size-label, var(--form-element-font-size-label, calc(var(--_input-font-size) * 0.95)))}:host{align-items:center;display:flex;font-size:var(--_switch-font-size);width:100%;min-height:var(--_switch-dot-size)}:host .label:not(:empty){cursor:pointer;margin-right:30px;transition:filter .3s var(--bezier-curve);font-size:var(--_switch-font-size-label)}:host .bar{align-items:center;background-color:var(--_switch-background-color);border-radius:10px;cursor:pointer;display:flex;height:10px;position:relative;transition:filter .3s var(--bezier-curve);width:30px}:host .bar input{appearance:none;background-color:rgba(0,0,0,0);border:0;cursor:pointer;height:100%;left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:100%}:host .bar .bar-content{align-items:center;background-color:rgba(0,0,0,0);display:flex;height:100%;pointer-events:none;position:relative;width:100%}:host .bar .bar-content .dot{background-color:var(--_switch-dot-color);border-radius:50%;box-shadow:none;cursor:pointer;height:var(--_switch-dot-size);left:0%;pointer-events:all;position:absolute;transform:translateX(-50%);transition:left var(--bezier-curve) .3s,box-shadow var(--bezier-curve) .3s,background-color var(--bezier-curve) .3s;width:var(--_switch-dot-size)}:host .bar .bar-content .bar-fill{background-color:var(--_switch-active-background-color);border-radius:100px;height:100%;left:0;pointer-events:all;position:absolute;top:0;transition:width var(--bezier-curve) .3s;width:0%}:host .bar input:checked+.bar-content .dot{background-color:var(--_switch-active-dot-color);box-shadow:0 0 5px var(--emphasize);left:100%}:host .bar input:checked+.bar-content .bar-fill{width:100%}:host([label_end]) .label:not(:empty){margin-left:30px;margin-right:0px;order:2}:host([disabled]) .bar{cursor:not-allowed;filter:brightness(0.75)}:host([disabled]) .bar input{cursor:not-allowed}:host([disabled]) .bar .bar-content .dot{cursor:not-allowed}:host([disabled]) .label{cursor:default;filter:brightness(0.75)}`;
    __getStatic() {
        return Switch;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Switch.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<label for="element" class="label" _id="switch_0"></label><div class="bar">    <input id="element" type="checkbox" _id="switch_1" />    <div class="bar-content">        <div class="bar-fill"></div>        <div class="dot" _id="switch_2"></div>    </div></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "checkboxEl",
      "ids": [
        "switch_1"
      ]
    }
  ],
  "content": {
    "switch_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__0c8ab707a91de23d54bc9c39ebe1aeafmethod0())}`,
      "once": true
    }
  },
  "pressEvents": [
    {
      "id": "switch_2",
      "onPress": (e, pressInstance, c) => { c.comp.toggleActive(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "Switch";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('label_end')) { this.attributeChangedCallback('label_end', false, false); }if(!this.hasAttribute('label')){ this['label'] = undefined; }if(!this.hasAttribute('disabled')) { this.attributeChangedCallback('disabled', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('label_end');this.__upgradeProperty('label');this.__upgradeProperty('disabled'); }
    __listBoolProps() { return ["label_end","disabled"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    toggleActive() {
        if (this.disabled)
            return;
        if (this.checkboxEl)
            this.checkboxEl.checked = !this.checkboxEl.checked;
    }
    __0c8ab707a91de23d54bc9c39ebe1aeafmethod0() {
        return this.label;
    }
}
Components.Switch.Namespace=`${moduleName}.Components`;
Components.Switch.Tag=`rk-switch`;
_.Components.Switch=Components.Switch;
if(!window.customElements.get('rk-switch')){window.customElements.define('rk-switch', Components.Switch);Aventus.WebComponentInstance.registerDefinition(Components.Switch);}

const Slider = class Slider extends Aventus.WebComponent {
    static __style = ``;
    __getStatic() {
        return Slider;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Slider.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Slider";
    }
}
Slider.Namespace=`${moduleName}`;
Slider.Tag=`rk-slider`;
_.Slider=Slider;
if(!window.customElements.get('rk-slider')){window.customElements.define('rk-slider', Slider);Aventus.WebComponentInstance.registerDefinition(Slider);}

const OptionsContainer = class OptionsContainer extends Aventus.WebComponent {
    get 'open'() { return this.getBoolAttr('open') }
    set 'open'(val) { this.setBoolAttr('open', val) }    select;
    onOpen = new Aventus.Callback();
    isAnimating = false;
    static __style = `:host{--_options-container-background: var(--options-container-background, var(--form-element-background, white));--_options-container-border-radius: var(--options-container-border-radius, var(--form-element-border-radius, 0));--_options-container-box-shadow: var(--options-container-box-shadow, var(--elevation-2))}:host{background-color:var(--_options-container-background);border-radius:var(--_options-container-border-radius);box-shadow:var(--_options-container-box-shadow);display:grid;grid-template-rows:0fr;left:0;overflow:hidden;position:absolute;top:0;transition:.3s var(--bezier-curve) grid-template-rows;z-index:800}:host rk-scrollable .container{display:flex;flex-direction:column}:host([open]){grid-template-rows:1fr}`;
    __getStatic() {
        return OptionsContainer;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(OptionsContainer.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<rk-scrollable floating_scroll>    <div class="container">        <slot></slot>    </div></rk-scrollable>` }
    });
}
    getClassName() {
        return "OptionsContainer";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('open')) { this.attributeChangedCallback('open', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('open'); }
    __listBoolProps() { return ["open"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    init(select) {
        this.select = select;
    }
    async show(container) {
        if (!container) {
            container = document.body;
        }
        let box = this.select.getBoundingClientRect();
        let contBox = container.getBoundingClientRect();
        let newTop = box.top + box.height + 2;
        let maxHeight = contBox.height - newTop - 10;
        this.style.width = box.width + 'px';
        this.style.top = newTop + 'px';
        this.style.left = box.left + 'px';
        this.style.maxHeight = maxHeight + 'px';
        container.appendChild(this);
        await Aventus.sleep(10);
        this.open = true;
        this.onOpen.trigger([true]);
    }
    hide() {
        this.open = false;
        this.onOpen.trigger([false]);
    }
    addAnimationEnd() {
        this.addEventListener("transitionstart", (event) => {
            this.isAnimating = true;
        });
        this.addEventListener("transitionend", (event) => {
            this.isAnimating = false;
        });
    }
    postCreation() {
        this.addAnimationEnd();
        this.setAttribute("tabindex", "-1");
    }
}
OptionsContainer.Namespace=`${moduleName}`;
OptionsContainer.Tag=`rk-options-container`;
_.OptionsContainer=OptionsContainer;
if(!window.customElements.get('rk-options-container')){window.customElements.define('rk-options-container', OptionsContainer);Aventus.WebComponentInstance.registerDefinition(OptionsContainer);}

const InputFile = class InputFile extends Aventus.WebComponent {
    static __style = ``;
    __getStatic() {
        return InputFile;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(InputFile.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "InputFile";
    }
}
InputFile.Namespace=`${moduleName}`;
InputFile.Tag=`rk-input-file`;
_.InputFile=InputFile;
if(!window.customElements.get('rk-input-file')){window.customElements.define('rk-input-file', InputFile);Aventus.WebComponentInstance.registerDefinition(InputFile);}

Components.Input = class Input extends Aventus.WebComponent {
    static get observedAttributes() {return ["label", "placeholder", "icon", "value"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'has_errors'() { return this.getBoolAttr('has_errors') }
    set 'has_errors'(val) { this.setBoolAttr('has_errors', val) }    get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }get 'placeholder'() { return this.getStringProp('placeholder') }
    set 'placeholder'(val) { this.setStringAttr('placeholder', val) }get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }get 'value'() { return this.getStringProp('value') }
    set 'value'(val) { this.setStringAttr('value', val) }    get 'errors'() {
						return this.__watch["errors"];
					}
					set 'errors'(val) {
						this.__watch["errors"] = val;
					}    change = new Aventus.Callback();
    __registerWatchesActions() {
    this.__addWatchesActions("errors", ((target) => {
    target.has_errors = target.errors.length > 0;
}));    super.__registerWatchesActions();
}
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("value", ((target) => {
    target.inputEl.value = target.value;
})); }
    static __style = `:host{--_input-height: var(--input-height, 30px);--_input-background-color: var(--input-background-color, var(--form-element-background, white));--_input-icon-height: var(--input-icon-height, calc(var(--_input-height) / 2));--_input-error-logo-size: var(--input-error-logo-size, calc(var(--_input-height) / 2));--_input-font-size: var(--input-font-size, var(--form-element-font-size, 16px));--_input-font-size-label: var(--input-font-size-label, var(--form-element-font-size-label, calc(var(--_input-font-size) * 0.95)));--_input-input-border: var(--input-input-border, var(--form-element-border, 1px solid var(--lighter-active)));--_input-border-radius: var(--input-border-radius, var(--form-element-border-radius, 0))}:host{min-width:100px;width:100%}:host label{display:none;font-size:var(--_input-font-size-label);margin-bottom:5px;margin-left:3px}:host .input{align-items:center;background-color:var(--_input-background-color);border:var(--_input-input-border);border-radius:var(--_input-border-radius);display:flex;height:var(--_input-height);padding:0 10px;width:100%}:host .input .icon{display:none;height:var(--_input-icon-height);margin-right:10px}:host .input input{background-color:rgba(0,0,0,0);border:none;color:var(--text-color);display:block;flex-grow:1;font-size:var(--_input-font-size);height:100%;margin:0;outline:none;padding:5px 0;padding-right:10px}:host .input .error-logo{align-items:center;background-color:var(--red);border-radius:50%;color:#fff;display:none;font-size:calc(var(--_input-error-logo-size) - 5px);height:var(--_input-error-logo-size);justify-content:center;width:var(--_input-error-logo-size)}:host .errors{color:var(--red);display:none;font-size:var(--font-size-sm);line-height:1.1;margin:10px;margin-bottom:0px}:host .errors div{margin:5px 0;text-align:justify}:host([has_errors]) .input{border:1px solid var(--red)}:host([has_errors]) .input .error-logo{display:flex}:host([has_errors]) .errors{display:block}:host([icon]:not([icon=""])) .input .icon{display:block}:host([label]:not([label=""])) label{display:flex}`;
    __getStatic() {
        return Input;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Input.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<label for="input" _id="input_0"></label><div class="input">    <rk-img class="icon" _id="input_1"></rk-img>    <input id="input" _id="input_2" />    <div class="error-logo">!</div></div><div class="errors">    <template _id="input_3"></template></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "inputEl",
      "ids": [
        "input_2"
      ]
    }
  ],
  "content": {
    "input_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__7b4688f1d13a935f88db2286094e0088method1())}`,
      "once": true
    },
    "input_1°src": {
      "fct": (c) => `${c.print(c.comp.__7b4688f1d13a935f88db2286094e0088method2())}`,
      "once": true
    },
    "input_2°placeholder": {
      "fct": (c) => `${c.print(c.comp.__7b4688f1d13a935f88db2286094e0088method3())}`,
      "once": true
    }
  },
  "events": [
    {
      "eventName": "focus",
      "id": "input_2",
      "fct": (e, c) => c.comp.removeErrors(e)
    },
    {
      "eventName": "input",
      "id": "input_2",
      "fct": (e, c) => c.comp.onValueChange(e)
    }
  ]
});const templ0 = new Aventus.Template(this);templ0.setTemplate(`         <div _id="input_4"></div>    `);templ0.setActions({
  "content": {
    "input_4°@HTML": {
      "fct": (c) => `${c.print(c.comp.__7b4688f1d13a935f88db2286094e0088method4(c.data.error))}`,
      "once": true
    }
  }
});this.__getStatic().__template.addLoop({
                    anchorId: 'input_3',
                    template: templ0,
                simple:{data: "this.errors",item:"error"}}); }
    getClassName() {
        return "Input";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('has_errors')) { this.attributeChangedCallback('has_errors', false, false); }if(!this.hasAttribute('label')){ this['label'] = undefined; }if(!this.hasAttribute('placeholder')){ this['placeholder'] = undefined; }if(!this.hasAttribute('icon')){ this['icon'] = undefined; }if(!this.hasAttribute('value')){ this['value'] = ""; } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["errors"] = []; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('has_errors');this.__upgradeProperty('label');this.__upgradeProperty('placeholder');this.__upgradeProperty('icon');this.__upgradeProperty('value'); }
    __listBoolProps() { return ["has_errors"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    removeErrors() {
        this.errors = [];
    }
    onValueChange() {
        this.value = this.inputEl.value;
        this.change.trigger([this.value]);
    }
    __7b4688f1d13a935f88db2286094e0088method1() {
        return this.label;
    }
    __7b4688f1d13a935f88db2286094e0088method2() {
        return this.icon;
    }
    __7b4688f1d13a935f88db2286094e0088method3() {
        return this.placeholder;
    }
    __7b4688f1d13a935f88db2286094e0088method4(error) {
        return error;
    }
}
Components.Input.Namespace=`${moduleName}.Components`;
Components.Input.Tag=`rk-input`;
_.Components.Input=Components.Input;
if(!window.customElements.get('rk-input')){window.customElements.define('rk-input', Components.Input);Aventus.WebComponentInstance.registerDefinition(Components.Input);}

Components.Form = class Form extends Aventus.WebComponent {
    static __style = `:host{padding:15px;width:100%}`;
    __getStatic() {
        return Form;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Form.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Form";
    }
}
Components.Form.Namespace=`${moduleName}.Components`;
Components.Form.Tag=`rk-form`;
_.Components.Form=Components.Form;
if(!window.customElements.get('rk-form')){window.customElements.define('rk-form', Components.Form);Aventus.WebComponentInstance.registerDefinition(Components.Form);}

const Checkbox = class Checkbox extends Aventus.WebComponent {
    static get observedAttributes() {return ["label", "placeholder", "icon", "checked"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'has_errors'() { return this.getBoolAttr('has_errors') }
    set 'has_errors'(val) { this.setBoolAttr('has_errors', val) }get 'left_label'() { return this.getBoolAttr('left_label') }
    set 'left_label'(val) { this.setBoolAttr('left_label', val) }    get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }get 'placeholder'() { return this.getStringProp('placeholder') }
    set 'placeholder'(val) { this.setStringAttr('placeholder', val) }get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }get 'checked'() { return this.getBoolProp('checked') }
    set 'checked'(val) { this.setBoolAttr('checked', val) }    get 'errors'() {
						return this.__watch["errors"];
					}
					set 'errors'(val) {
						this.__watch["errors"] = val;
					}    change = new Aventus.Callback();
    value = false;
    __registerWatchesActions() {
    this.__addWatchesActions("errors", ((target) => {
    target.has_errors = target.errors.length > 0;
}));    super.__registerWatchesActions();
}
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("checked", ((target) => {
    target.value = target.checked;
})); }
    static __style = `:host{--_checkbox-size: var(--checkbox-size, 18px);--_checkbox-height: var(--checkbox-height, var(--_checkbox-size));--_checkbox-width: var(--checkbox-width, var(--_checkbox-size));--_checkbox-size: 20px;--_checkbox-border-radius: var(--checkbox-border-radius, 2px);--_checkbox-border: var(--checkbox-border, var(--form-element-border));--_checkbox-border-active: var(--checkbox-border-active, var(--form-element-border-active, var(--_checkbox-border)));--_checkbox-background: var(--checkbox-background, var(--form-element-background, white));--_checkbox-background-active: var(--checkbox-background-active, var(--form-element-background-active, white));--_checkbox-tick-color: var(--checkbox-tick-color, var(--_checkbox-background));--_checkbox-tick-size: var(--checkbox-tick-size, 2px);--_checkbox-tick-padding: var(--checkbox-tick-padding, 10%);--_checkbox-font-size-label: var(--checkbox-font-size-label, var(--form-element-font-size-label, calc(var(--_input-font-size) * 0.95)));--_checkbox-margin-label: var(--checkbox-margin-label, 5px)}:host{align-items:center;display:flex}:host .label:not(:empty){cursor:pointer;font-size:var(--_checkbox-font-size-label);margin-left:var(--_checkbox-margin-label)}:host .square{background-color:var(--_checkbox-background);border:var(--_checkbox-border);border-radius:var(--_checkbox-border-radius);cursor:pointer;flex-shrink:0;height:var(--_checkbox-height);position:relative;transition:border .4s var(--bezier-curve),background-color .4s var(--bezier-curve);width:var(--_checkbox-width);display:flex;align-items:center;justify-content:center}:host .square rk-img{--img-stroke-color: var(--_checkbox-tick-color);--img-stroke-width: var(--_checkbox-tick-size);height:calc(100% - var(--_checkbox-tick-padding));opacity:0;visibility:hidden;width:calc(100% - var(--_checkbox-tick-padding))}:host([checked]) .square{background-color:var(--_checkbox-background-active);border:var(--_checkbox-border-active)}:host([checked]) .square rk-img{opacity:1;visibility:visible}:host([checked]) .square rk-img::part(tick){animation:dash .3s linear forwards;animation-delay:.2s;stroke-dasharray:100;stroke-dashoffset:100}:host([left_label]) .label:not(:empty){margin-left:0;margin-right:var(--_checkbox-margin-label);order:1}:host([left_label]) .square{order:2}`;
    __getStatic() {
        return Checkbox;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Checkbox.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="square">    <rk-img src="/img/icons/tick.svg"></rk-img></div><div class="label" _id="checkbox_0"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "checkbox_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__2cfdf8fd10120aa1e4ec39d8ec2b0151method0())}`,
      "once": true
    }
  }
}); }
    getClassName() {
        return "Checkbox";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('has_errors')) { this.attributeChangedCallback('has_errors', false, false); }if(!this.hasAttribute('left_label')) { this.attributeChangedCallback('left_label', false, false); }if(!this.hasAttribute('label')){ this['label'] = undefined; }if(!this.hasAttribute('placeholder')){ this['placeholder'] = undefined; }if(!this.hasAttribute('icon')){ this['icon'] = undefined; }if(!this.hasAttribute('checked')) { this.attributeChangedCallback('checked', false, false); } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["errors"] = []; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('has_errors');this.__upgradeProperty('left_label');this.__upgradeProperty('label');this.__upgradeProperty('placeholder');this.__upgradeProperty('icon');this.__upgradeProperty('checked'); }
    __listBoolProps() { return ["has_errors","left_label","checked"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    removeErrors() {
        this.errors = [];
    }
    postCreation() {
        new Aventus.PressManager({
            element: this,
            onPress: () => {
                this.removeErrors();
                this.checked = !this.checked;
                this.change.trigger([this.checked]);
            }
        });
    }
    __2cfdf8fd10120aa1e4ec39d8ec2b0151method0() {
        return this.label;
    }
}
Checkbox.Namespace=`${moduleName}`;
Checkbox.Tag=`rk-checkbox`;
_.Checkbox=Checkbox;
if(!window.customElements.get('rk-checkbox')){window.customElements.define('rk-checkbox', Checkbox);Aventus.WebComponentInstance.registerDefinition(Checkbox);}

Components.ButtonIcon = class ButtonIcon extends Aventus.WebComponent {
    static get observedAttributes() {return ["icon"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'color'() { return this.getStringAttr('color') }
    set 'color'(val) { this.setStringAttr('color', val) }get 'outline'() { return this.getBoolAttr('outline') }
    set 'outline'(val) { this.setBoolAttr('outline', val) }    get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }    static __style = `:host{--internal-button-background-color: var(--button-background-color);--internal-button-color: var(--button-color);--internal-button-box-shadow: var(--button-box-shadow);--internal-button-box-shadow-hover: var(--button-box-shadow-hover)}:host{aspect-ratio:1/1;background-color:var(--internal-button-background-color);border-radius:50000px;box-shadow:var(--internal-button-box-shadow);color:var(--internal-button-color);cursor:pointer;height:36px;overflow:hidden;position:relative}:host .hider{background-color:var(--darker);inset:0;opacity:0;position:absolute;transform:opacity .3 var(--bezier-curve);z-index:1}:host .content{align-items:center;display:flex;height:100%;justify-content:center;position:relative;z-index:2}:host .content .icon{--img-fill-color: var(--internal-button-color);height:100%;padding:10px 0}:host([outline]){background-color:rgba(0,0,0,0);border:1px solid var(--button-background-color);color:var(--text-color)}:host([color=green]){background-color:var(--green);color:var(--text-color-green)}:host([outline][color=green]){background-color:rgba(0,0,0,0);border:1px solid var(--green);color:var(--text-color)}:host([color=red]){background-color:var(--red);color:var(--text-color-red)}:host([outline][color=red]){background-color:rgba(0,0,0,0);border:1px solid var(--red);color:var(--text-color)}:host([color=orange]){background-color:var(--orange);color:var(--text-color-orange)}:host([outline][color=orange]){background-color:rgba(0,0,0,0);border:1px solid var(--orange);color:var(--text-color)}:host([color=blue]){background-color:var(--blue);color:var(--text-color-blue)}:host([outline][color=blue]){background-color:rgba(0,0,0,0);border:1px solid var(--blue);color:var(--text-color)}@media screen and (min-width: 1225px){:host(:hover){box-shadow:var(--internal-button-box-shadow-hover)}:host(:hover) .hider{opacity:1}}`;
    __getStatic() {
        return ButtonIcon;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(ButtonIcon.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="hider"></div><div class="content">    <rk-img class="icon" _id="buttonicon_0"></rk-img></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "buttonicon_0°src": {
      "fct": (c) => `${c.print(c.comp.__86a55d8d752358ce167fd0da93753a9emethod0())}`,
      "once": true
    }
  }
}); }
    getClassName() {
        return "ButtonIcon";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('color')){ this['color'] = undefined; }if(!this.hasAttribute('outline')) { this.attributeChangedCallback('outline', false, false); }if(!this.hasAttribute('icon')){ this['icon'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('color');this.__upgradeProperty('outline');this.__upgradeProperty('icon'); }
    __listBoolProps() { return ["outline"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    __86a55d8d752358ce167fd0da93753a9emethod0() {
        return this.icon;
    }
}
Components.ButtonIcon.Namespace=`${moduleName}.Components`;
Components.ButtonIcon.Tag=`rk-button-icon`;
_.Components.ButtonIcon=Components.ButtonIcon;
if(!window.customElements.get('rk-button-icon')){window.customElements.define('rk-button-icon', Components.ButtonIcon);Aventus.WebComponentInstance.registerDefinition(Components.ButtonIcon);}

Components.Button = class Button extends Aventus.WebComponent {
    static get observedAttributes() {return ["icon_before", "icon_after", "icon"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'color'() { return this.getStringAttr('color') }
    set 'color'(val) { this.setStringAttr('color', val) }get 'outline'() { return this.getBoolAttr('outline') }
    set 'outline'(val) { this.setBoolAttr('outline', val) }    get 'icon_before'() { return this.getStringProp('icon_before') }
    set 'icon_before'(val) { this.setStringAttr('icon_before', val) }get 'icon_after'() { return this.getStringProp('icon_after') }
    set 'icon_after'(val) { this.setStringAttr('icon_after', val) }get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("icon", ((target) => {
    target.icon_before = target.icon;
})); }
    static __style = `:host{--internal-button-background-color: var(--button-background-color);--internal-button-color: var(--button-color);--internal-button-box-shadow: var(--button-box-shadow);--internal-button-box-shadow-hover: var(--button-box-shadow-hover);--_button-padding: var(--button-padding, 0 16px);--_button-icon-fill-color: var(--button-icon-fill-color, --internal-button-color);--_button-icon-stroke-color: var(--button-icon-stroke-color, transparent)}:host{background-color:var(--internal-button-background-color);border-radius:5px;box-shadow:var(--internal-button-box-shadow);color:var(--internal-button-color);cursor:pointer;height:36px;min-width:64px;overflow:hidden;position:relative}:host .hider{background-color:var(--darker);inset:0;opacity:0;position:absolute;transform:opacity .3 var(--bezier-curve);z-index:1}:host .content{align-items:center;display:flex;height:100%;justify-content:center;padding:var(--_button-padding);position:relative;z-index:2}:host .content .icon-before,:host .content .icon-after{--img-stroke-color: var(--_button-icon-stroke-color);--img-fill-color: var(--_button-icon-fill-color);display:none;height:100%;padding:10px 0}:host([icon_before]) .icon-before{display:block;margin-right:10px}:host([icon_after]) .icon-after{display:block;margin-left:10px}:host([icon]) .icon-before{margin-right:0px}:host([outline]){background-color:rgba(0,0,0,0);border:1px solid var(--button-background-color);color:var(--text-color)}:host([color=green]){background-color:var(--green);color:var(--text-color-green)}:host([outline][color=green]){background-color:rgba(0,0,0,0);border:1px solid var(--green);color:var(--text-color)}:host([color=red]){background-color:var(--red);color:var(--text-color-red)}:host([outline][color=red]){background-color:rgba(0,0,0,0);border:1px solid var(--red);color:var(--text-color)}:host([color=orange]){background-color:var(--orange);color:var(--text-color-orange)}:host([outline][color=orange]){background-color:rgba(0,0,0,0);border:1px solid var(--orange);color:var(--text-color)}:host([color=blue]){background-color:var(--blue);color:var(--text-color-blue)}:host([outline][color=blue]){background-color:rgba(0,0,0,0);border:1px solid var(--blue);color:var(--text-color)}@media screen and (min-width: 1225px){:host(:hover){box-shadow:var(--internal-button-box-shadow-hover)}:host(:hover) .hider{opacity:1}}`;
    __getStatic() {
        return Button;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Button.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="hider"></div><div class="content">    <rk-img class="icon-before" _id="button_0"></rk-img>    <slot></slot>    <rk-img class="icon-after" _id="button_1"></rk-img></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "button_0°src": {
      "fct": (c) => `${c.print(c.comp.__e17753be66eb8c36ad73f4b01845474bmethod0())}`,
      "once": true
    },
    "button_1°src": {
      "fct": (c) => `${c.print(c.comp.__e17753be66eb8c36ad73f4b01845474bmethod1())}`,
      "once": true
    }
  }
}); }
    getClassName() {
        return "Button";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('color')){ this['color'] = undefined; }if(!this.hasAttribute('outline')) { this.attributeChangedCallback('outline', false, false); }if(!this.hasAttribute('icon_before')){ this['icon_before'] = undefined; }if(!this.hasAttribute('icon_after')){ this['icon_after'] = undefined; }if(!this.hasAttribute('icon')){ this['icon'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('color');this.__upgradeProperty('outline');this.__upgradeProperty('icon_before');this.__upgradeProperty('icon_after');this.__upgradeProperty('icon'); }
    __listBoolProps() { return ["outline"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    __e17753be66eb8c36ad73f4b01845474bmethod0() {
        return this.icon_before;
    }
    __e17753be66eb8c36ad73f4b01845474bmethod1() {
        return this.icon_after;
    }
}
Components.Button.Namespace=`${moduleName}.Components`;
Components.Button.Tag=`rk-button`;
_.Components.Button=Components.Button;
if(!window.customElements.get('rk-button')){window.customElements.define('rk-button', Components.Button);Aventus.WebComponentInstance.registerDefinition(Components.Button);}

System.Loading = class Loading extends Aventus.WebComponent {
    static get observedAttributes() {return ["text"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'background'() { return this.getBoolAttr('background') }
    set 'background'(val) { this.setBoolAttr('background', val) }    get 'text'() { return this.getStringProp('text') }
    set 'text'(val) { this.setStringAttr('text', val) }    static __style = `:host{--internal-dot-size: var(--dot-size, 12px);--internal-radius: var(--radius, 50px);--internal-loading-color: var(--loading-color, var(--primary-color, white));--internal-loading-background-color: var(--loading-background-color, var(--emphasize, rgba(0, 0, 0, 0.5)))}:host{align-items:center;background-color:var(--internal-loading-background-color);display:flex;flex-direction:column;height:100%;justify-content:center;left:0;position:absolute;top:0;width:100%;z-index:999}:host .dot-container{--center: (var(--internal-radius) - (var(--internal-dot-size) / 2));display:inline-block;height:calc(var(--internal-radius)*2);position:relative;width:calc(var(--internal-radius)*2);z-index:10}:host .dot-container .dot{animation:lds-default 1.2s linear infinite;background:var(--internal-loading-color);border-radius:50%;height:var(--internal-dot-size);position:absolute;width:var(--internal-dot-size)}:host .dot-container .dot:nth-child(1){--angle: 0deg;animation-delay:0s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(2){--angle: -30deg;animation-delay:-0.1s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(3){--angle: -60deg;animation-delay:-0.2s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(4){--angle: -90deg;animation-delay:-0.3s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(5){--angle: -120deg;animation-delay:-0.4s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(6){--angle: -150deg;animation-delay:-0.5s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(7){--angle: 180deg;animation-delay:-0.6s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(8){--angle: 150deg;animation-delay:-0.7s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(9){--angle: 120deg;animation-delay:-0.8s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(10){--angle: 90deg;animation-delay:-0.9s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(11){--angle: 60deg;animation-delay:-1s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(12){--angle: 30deg;animation-delay:-1.1s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .text{color:var(--internal-loading-color);font-size:var(--font-size-lg);font-weight:bold;letter-spacing:1px;margin-top:25px;padding:0 15px;text-align:center;z-index:10}@keyframes lds-default{0%,20%,80%,100%{transform:scale(1)}50%{transform:scale(1.5)}}:host([background]){background-color:#08162e;background-image:url('data:image/svg+xml;utf8,<svg version="1.1" viewBox="0 0 65.98 57.373" xmlns="http://www.w3.org/2000/svg"><g fill="%23acf4d6"><path d="M 33.949 5.731 L 22.7 5.731 L 22.7 0.001 L 33.788 0.001 C 45.619 0.001 46.363 17.934 36.124 20.216 C 35.379 20.428 34.637 20.48 33.788 20.48 L 28.483 20.48 L 28.483 20.534 L 28.483 34.433 L 22.7 34.433 L 22.7 14.697 L 28.483 20.534 L 42.491 34.433 L 50.342 34.433 L 30.605 14.697 L 33.949 14.697 C 38.883 14.697 38.883 5.731 33.949 5.731 Z" style="" /></g><g fill="%23FFF"><path d="M 7.8 53.573 L 4.94 48.993 L 3.22 48.993 L 3.22 53.573 L 0 53.573 L 0 39.573 L 4.98 39.573 C 8.12 39.573 10.2 41.473 10.2 44.393 C 10.2 46.253 9.32 47.653 7.84 48.373 L 11.2 53.573 L 7.8 53.573 Z M 3.22 42.533 L 3.22 46.253 L 4.78 46.253 C 6.08 46.253 6.98 45.793 6.98 44.393 C 6.98 43.013 6.08 42.533 4.78 42.533 L 3.22 42.533 Z M 20.3 43.173 L 23.46 43.173 L 23.46 53.573 L 20.3 53.573 L 20.3 52.533 C 20.16 52.893 19.22 53.773 17.62 53.773 C 15.24 53.773 12.5 52.073 12.5 48.353 C 12.5 44.773 15.24 42.993 17.62 42.993 C 19.22 42.993 20.16 43.913 20.3 44.133 L 20.3 43.173 Z M 18.08 50.993 C 19.38 50.993 20.44 50.093 20.44 48.353 C 20.44 46.673 19.38 45.773 18.08 45.773 C 16.72 45.773 15.56 46.693 15.56 48.353 C 15.56 50.073 16.72 50.993 18.08 50.993 Z M 33.94 43.133 L 37.08 43.133 L 30.72 57.373 L 27.56 57.373 L 29.48 53.213 L 24.98 43.133 L 28.12 43.133 L 31.04 49.813 L 33.94 43.133 Z M 42.58 53.733 C 40.64 53.733 38.66 52.433 38.66 49.133 L 38.66 43.173 L 41.82 43.173 L 41.82 48.913 C 41.82 50.493 42.36 50.993 43.36 50.993 C 44.78 50.993 45.6 49.613 45.8 49.013 L 45.8 43.173 L 48.96 43.173 L 48.96 53.573 L 45.8 53.573 L 45.8 51.773 C 45.6 52.273 44.54 53.733 42.58 53.733 Z M 58.2 53.573 L 54.82 49.533 L 54.16 50.233 L 54.16 53.573 L 51 53.573 L 51 49.793 L 51 39.433 L 54.16 39.433 L 54.16 46.373 L 57.1 43.173 L 60.88 43.173 L 56.76 47.513 L 61.8 53.573 L 58.2 53.573 Z M 65.98 39.433 L 65.98 42.093 L 62.82 42.093 L 62.82 39.433 L 65.98 39.433 Z M 65.98 43.173 L 65.98 53.573 L 62.82 53.573 L 62.82 43.173 L 65.98 43.173 Z" /></g></svg>');background-position:center center;background-repeat:no-repeat;background-size:50% 50%}:host([background])::after{content:"";position:absolute;inset:0;background-color:rgba(0,0,0,.5);z-index:1}`;
    __getStatic() {
        return Loading;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Loading.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="dot-container">    <div class="dot"></div>    <div class="dot"></div>    <div class="dot"></div>    <div class="dot"></div>    <div class="dot"></div>    <div class="dot"></div>    <div class="dot"></div>    <div class="dot"></div>    <div class="dot"></div>    <div class="dot"></div>    <div class="dot"></div>    <div class="dot"></div></div><div class="text" _id="loading_0"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "loading_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__f449123065aa1f6c0a81c7fbf3673938method0())}`,
      "once": true
    }
  }
}); }
    getClassName() {
        return "Loading";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('background')) { this.attributeChangedCallback('background', false, false); }if(!this.hasAttribute('text')){ this['text'] = ""; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('background');this.__upgradeProperty('text'); }
    __listBoolProps() { return ["background"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    __f449123065aa1f6c0a81c7fbf3673938method0() {
        return this.text;
    }
}
System.Loading.Namespace=`${moduleName}.System`;
System.Loading.Tag=`rk-loading`;
_.System.Loading=System.Loading;
if(!window.customElements.get('rk-loading')){window.customElements.define('rk-loading', System.Loading);Aventus.WebComponentInstance.registerDefinition(System.Loading);}

(function (LoginCode) {
    LoginCode[LoginCode["OK"] = 0] = "OK";
    LoginCode[LoginCode["WrongCredentials"] = 1] = "WrongCredentials";
    LoginCode[LoginCode["Unknown"] = 2] = "Unknown";
    LoginCode[LoginCode["NotConnected"] = 3] = "NotConnected";
})(Errors.LoginCode || (Errors.LoginCode = {}));

_.Errors.LoginCode=Errors.LoginCode;
Errors.LoginError=class LoginError extends Aventus.GenericError {
    static get Fullname() { return "Core.Logic.LoginError, Core"; }
}
Errors.LoginError.Namespace=`${moduleName}.Errors`;Aventus.Converter.register(Errors.LoginError.Fullname, Errors.LoginError);
_.Errors.LoginError=Errors.LoginError;
System.Panel = class Panel extends Aventus.WebComponent {
    static __style = `:host{background-color:var(--primary-color-opacity);border-radius:10px}@media screen and (max-width: 768px){:host{background-color:var(--primary-color)}}`;
    __getStatic() {
        return Panel;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Panel.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Panel";
    }
}
System.Panel.Namespace=`${moduleName}.System`;
System.Panel.Tag=`rk-panel`;
_.System.Panel=System.Panel;
if(!window.customElements.get('rk-panel')){window.customElements.define('rk-panel', System.Panel);Aventus.WebComponentInstance.registerDefinition(System.Panel);}

System.AddOnTime = class AddOnTime extends Aventus.WebComponent {
    days = [
        'Dim.',
        'Lun.',
        'Mar.',
        'Mer.',
        'Jeu.',
        'Ven.',
        'Sam.'
    ];
    months = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ];
    static __style = `:host{align-items:center;border-radius:5px;cursor:pointer;display:flex;margin-right:10px;padding:10px;transition:background-color linear .2s}:host .date{font-size:var(--font-size-sm)}:host .hour{font-size:var(--font-size-sm);margin-left:5px}@media screen and (min-width: 1225px){:host(:hover){background-color:var(--lighter-active)}}`;
    constructor() {
            super();
            this.classList.add("touch");
        }
    __getStatic() {
        return AddOnTime;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(AddOnTime.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="date" _id="addontime_0">Dim. 17 juillet</div><div class="hour" _id="addontime_1">10:33</div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "date",
      "ids": [
        "addontime_0"
      ]
    },
    {
      "name": "hour",
      "ids": [
        "addontime_1"
      ]
    }
  ]
}); }
    getClassName() {
        return "AddOnTime";
    }
    firstLoading() {
        let missingSec = 60 - new Date().getSeconds();
        if (missingSec == 0) {
            this.displayDate(true);
            this.normalLoading();
        }
        else {
            this.displayDate(true);
            setTimeout(() => {
                this.normalLoading();
            }, missingSec * 1000);
        }
    }
    displayDate(force = false) {
        if (!this.hour || !this.date) {
            return;
        }
        let date = new Date();
        let minutes = date.getMinutes();
        let hours = date.getHours();
        this.hour.innerHTML = this.prettyNumber(hours) + ":" + this.prettyNumber(minutes);
        if (force || (minutes == 0 && hours == 0)) {
            let day = this.days[date.getDay()];
            let month = this.months[date.getMonth()];
            let nb = date.getDate();
            let txt = day + ' ' + this.prettyNumber(nb) + ' ' + month;
            this.date.innerHTML = txt;
        }
    }
    prettyNumber(nb) {
        if (nb < 10) {
            return '0' + nb;
        }
        return nb + '';
    }
    normalLoading() {
        setInterval(() => {
            this.displayDate();
        }, 1000 * 60);
    }
    postCreation() {
        this.firstLoading();
    }
}
System.AddOnTime.Namespace=`${moduleName}.System`;
System.AddOnTime.Tag=`rk-add-on-time`;
_.System.AddOnTime=System.AddOnTime;
if(!window.customElements.get('rk-add-on-time')){window.customElements.define('rk-add-on-time', System.AddOnTime);Aventus.WebComponentInstance.registerDefinition(System.AddOnTime);}

Lib.Pointer=class Pointer {
    static isTouch(e) {
        if (e instanceof TouchEvent) {
            return true;
        }
        if (e instanceof PointerEvent && (e.pointerType == "touch" || e.pointerType == "pen")) {
            return true;
        }
        return false;
    }
}
Lib.Pointer.Namespace=`${moduleName}.Lib`;
_.Lib.Pointer=Lib.Pointer;
Components.Tracker=class Tracker {
    velocityMultiplier = window.devicePixelRatio;
    updateTime = Date.now();
    delta = { x: 0, y: 0 };
    velocity = { x: 0, y: 0 };
    lastPosition = { x: 0, y: 0 };
    constructor(touch) {
        this.lastPosition = this.getPosition(touch);
    }
    update(touch) {
        const { velocity, updateTime, lastPosition, } = this;
        const now = Date.now();
        const position = this.getPosition(touch);
        const delta = {
            x: -(position.x - lastPosition.x),
            y: -(position.y - lastPosition.y),
        };
        const duration = (now - updateTime) || 16.7;
        const vx = delta.x / duration * 16.7;
        const vy = delta.y / duration * 16.7;
        velocity.x = vx * this.velocityMultiplier;
        velocity.y = vy * this.velocityMultiplier;
        this.delta = delta;
        this.updateTime = now;
        this.lastPosition = position;
    }
    getPointerData(evt) {
        return evt.touches ? evt.touches[evt.touches.length - 1] : evt;
    }
    getPosition(evt) {
        const data = this.getPointerData(evt);
        return {
            x: data.clientX,
            y: data.clientY,
        };
    }
}
Components.Tracker.Namespace=`${moduleName}.Components`;
_.Components.Tracker=Components.Tracker;
Lib.HttpRouter=class HttpRouter extends Aventus.HttpRouter {
}
Lib.HttpRouter.Namespace=`${moduleName}.Lib`;
_.Lib.HttpRouter=Lib.HttpRouter;
System.HomeBtn = class HomeBtn extends Aventus.WebComponent {
    get 'active'() { return this.getBoolAttr('active') }
    set 'active'(val) { this.setBoolAttr('active', val) }    static __style = `:host{position:relative}:host .icon{border-radius:5px;cursor:pointer;margin:0 3px;max-height:calc(100% - 16px);max-width:34px;padding:7px;transition:background-color .2s var(--bezier-curve)}:host rk-home-panel{bottom:calc(100% + 5px);height:0;overflow:hidden;transition:bottom var(--bezier-curve) .7s,height var(--bezier-curve) .7s}:host([active]) .icon{background-color:var(--text-color)}:host([active]) .icon rk-img{--img-fill-color: var(--primary-color-opacity)}:host([active]) rk-home-panel{bottom:calc(100% + 10px);height:400px}@media screen and (min-width: 1225px){:host(:not([active])) .icon:hover{background-color:var(--lighter-active)}}`;
    __getStatic() {
        return HomeBtn;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(HomeBtn.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="icon" _id="homebtn_0">    <rk-img mode="contains" src="/img/icons/house.svg" class="touch"></rk-img></div><rk-home-panel></rk-home-panel>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "homebtn_0",
      "onPress": (e, pressInstance, c) => { c.comp.toggleActive(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "HomeBtn";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('active')) { this.attributeChangedCallback('active', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('active'); }
    __listBoolProps() { return ["active"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    toggleActive() {
        this.active = !this.active;
    }
    postCreation() {
    }
}
System.HomeBtn.Namespace=`${moduleName}.System`;
System.HomeBtn.Tag=`rk-home-btn`;
_.System.HomeBtn=System.HomeBtn;
if(!window.customElements.get('rk-home-btn')){window.customElements.define('rk-home-btn', System.HomeBtn);Aventus.WebComponentInstance.registerDefinition(System.HomeBtn);}

Components.Popup = class Popup extends Aventus.WebComponent {
    cb;
    static __style = `:host{background-color:rgba(0,0,0,.2);inset:0;position:absolute;display:flex;align-items:center;justify-content:center;z-index:999}:host .popup{padding:20px;border-radius:20px;background-color:#fff;box-shadow:var(--elevation-5);max-width:calc(100% - 50px);max-height:calc(100% - 50px);display:flex;flex-direction:column}`;
    __getStatic() {
        return Popup;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Popup.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="popup">    <slot></slot></div>` }
    });
}
    getClassName() {
        return "Popup";
    }
    init(cb) {
        this.cb = cb;
    }
}
Components.Popup.Namespace=`${moduleName}.Components`;
Components.Popup.Tag=`rk-popup`;
_.Components.Popup=Components.Popup;
if(!window.customElements.get('rk-popup')){window.customElements.define('rk-popup', Components.Popup);Aventus.WebComponentInstance.registerDefinition(Components.Popup);}

Components.Confirm = class Confirm extends Components.Popup {
    static get observedAttributes() {return ["subject", "body", "btn_yes_txt", "btn_no_txt"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'subject'() { return this.getStringProp('subject') }
    set 'subject'(val) { this.setStringAttr('subject', val) }get 'body'() { return this.getStringProp('body') }
    set 'body'(val) { this.setStringAttr('body', val) }get 'btn_yes_txt'() { return this.getStringProp('btn_yes_txt') }
    set 'btn_yes_txt'(val) { this.setStringAttr('btn_yes_txt', val) }get 'btn_no_txt'() { return this.getStringProp('btn_no_txt') }
    set 'btn_no_txt'(val) { this.setStringAttr('btn_no_txt', val) }    static __style = `:host .popup .title{font-size:var(--font-size-lg);font-weight:bold;margin-bottom:15px}:host .popup .action{display:flex;align-items:center;justify-content:center;gap:20px;margin-top:30px}`;
    __getStatic() {
        return Confirm;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Confirm.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="title" _id="confirm_0"></div><rk-scrollable class="body" _id="confirm_1"></rk-scrollable><div class="action">    <rk-button color="red" _id="confirm_2"></rk-button>    <rk-button color="green" _id="confirm_3"></rk-button></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "confirm_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__caa2fd56843944180566fbe49a4bb311method0())}`,
      "once": true
    },
    "confirm_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__caa2fd56843944180566fbe49a4bb311method1())}`,
      "once": true
    },
    "confirm_2°@HTML": {
      "fct": (c) => `${c.print(c.comp.__caa2fd56843944180566fbe49a4bb311method2())}`,
      "once": true
    },
    "confirm_3°@HTML": {
      "fct": (c) => `${c.print(c.comp.__caa2fd56843944180566fbe49a4bb311method3())}`,
      "once": true
    }
  },
  "pressEvents": [
    {
      "id": "confirm_2",
      "onPress": (e, pressInstance, c) => { c.comp.cancel(e, pressInstance); }
    },
    {
      "id": "confirm_3",
      "onPress": (e, pressInstance, c) => { c.comp.validate(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "Confirm";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('subject')){ this['subject'] = undefined; }if(!this.hasAttribute('body')){ this['body'] = undefined; }if(!this.hasAttribute('btn_yes_txt')){ this['btn_yes_txt'] = "yes"; }if(!this.hasAttribute('btn_no_txt')){ this['btn_no_txt'] = "no"; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('subject');this.__upgradeProperty('body');this.__upgradeProperty('btn_yes_txt');this.__upgradeProperty('btn_no_txt'); }
    cancel() {
        if (this.cb) {
            this.cb(false);
        }
        this.remove();
    }
    validate() {
        if (this.cb) {
            this.cb(true);
        }
        this.remove();
    }
    __caa2fd56843944180566fbe49a4bb311method0() {
        return this.subject;
    }
    __caa2fd56843944180566fbe49a4bb311method1() {
        return this.body;
    }
    __caa2fd56843944180566fbe49a4bb311method2() {
        return this.btn_no_txt;
    }
    __caa2fd56843944180566fbe49a4bb311method3() {
        return this.btn_yes_txt;
    }
}
Components.Confirm.Namespace=`${moduleName}.Components`;
Components.Confirm.Tag=`rk-confirm`;
_.Components.Confirm=Components.Confirm;
if(!window.customElements.get('rk-confirm')){window.customElements.define('rk-confirm', Components.Confirm);Aventus.WebComponentInstance.registerDefinition(Components.Confirm);}

Components.Alert = class Alert extends Components.Popup {
    static get observedAttributes() {return ["subject", "body", "btn_txt"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'subject'() { return this.getStringProp('subject') }
    set 'subject'(val) { this.setStringAttr('subject', val) }get 'body'() { return this.getStringProp('body') }
    set 'body'(val) { this.setStringAttr('body', val) }get 'btn_txt'() { return this.getStringProp('btn_txt') }
    set 'btn_txt'(val) { this.setStringAttr('btn_txt', val) }    static __style = `:host .popup .title{font-size:var(--font-size-lg);font-weight:bold;margin-bottom:15px}:host .popup .action{display:flex;align-items:center;justify-content:center;gap:20px;margin-top:30px}`;
    __getStatic() {
        return Alert;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Alert.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="title" _id="alert_0"></div><rk-scrollable class="body" _id="alert_1"></rk-scrollable><div class="action">    <rk-button color="blue" _id="alert_2"></rk-button></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "alert_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__d0561a7aa91ff42b328166316d099970method0())}`,
      "once": true
    },
    "alert_1°@HTML": {
      "fct": (c) => `\r\n    ${c.print(c.comp.__d0561a7aa91ff42b328166316d099970method1())}\r\n`,
      "once": true
    },
    "alert_2°@HTML": {
      "fct": (c) => `${c.print(c.comp.__d0561a7aa91ff42b328166316d099970method2())}`,
      "once": true
    }
  },
  "events": [
    {
      "eventName": "click",
      "id": "alert_2",
      "fct": (e, c) => c.comp.close(e)
    }
  ]
}); }
    getClassName() {
        return "Alert";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('subject')){ this['subject'] = undefined; }if(!this.hasAttribute('body')){ this['body'] = undefined; }if(!this.hasAttribute('btn_txt')){ this['btn_txt'] = "Ok"; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('subject');this.__upgradeProperty('body');this.__upgradeProperty('btn_txt'); }
    close() {
        if (this.cb) {
            this.cb();
        }
        this.remove();
    }
    __d0561a7aa91ff42b328166316d099970method0() {
        return this.subject;
    }
    __d0561a7aa91ff42b328166316d099970method1() {
        return this.body;
    }
    __d0561a7aa91ff42b328166316d099970method2() {
        return this.btn_txt;
    }
}
Components.Alert.Namespace=`${moduleName}.Components`;
Components.Alert.Tag=`rk-alert`;
_.Components.Alert=Components.Alert;
if(!window.customElements.get('rk-alert')){window.customElements.define('rk-alert', Components.Alert);Aventus.WebComponentInstance.registerDefinition(Components.Alert);}

Lib.Geometry=class Geometry {
    static getIntersectingRectangle(rect1, rect2) {
        const [r1, r2] = [rect1, rect2].map(r => {
            return {
                x: [r.x1, r.x2].sort((a, b) => a - b),
                y: [r.y1, r.y2].sort((a, b) => a - b)
            };
        });
        const noIntersect = r2.x[0] > r1.x[1] || r2.x[1] < r1.x[0] ||
            r2.y[0] > r1.y[1] || r2.y[1] < r1.y[0];
        return noIntersect ? false : {
            x1: Math.max(r1.x[0], r2.x[0]),
            y1: Math.max(r1.y[0], r2.y[0]),
            x2: Math.min(r1.x[1], r2.x[1]),
            y2: Math.min(r1.y[1], r2.y[1])
        };
    }
    static getRectangleArea(rect1) {
        const w = Math.abs(rect1.x1 - rect1.x2);
        const h = Math.abs(rect1.y1 - rect1.y2);
        return w * h;
    }
}
Lib.Geometry.Namespace=`${moduleName}.Lib`;
_.Lib.Geometry=Lib.Geometry;
Websocket.Events.ApplicationTestEvent2=class ApplicationTestEvent2 extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `/application/test/2`;
    }
}
Websocket.Events.ApplicationTestEvent2.Namespace=`${moduleName}.Websocket.Events`;
_.Websocket.Events.ApplicationTestEvent2=Websocket.Events.ApplicationTestEvent2;
Websocket.Routes.DesktopRouter_RemoveDesktopIcon=class DesktopRouter_RemoveDesktopIcon extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `/desktop/RemoveDesktopIcon`;
    }
    /**
     * @inheritdoc
     */
    listenOnBoot() {
        return true;
    }
}
Websocket.Routes.DesktopRouter_RemoveDesktopIcon.Namespace=`${moduleName}.Websocket.Routes`;
_.Websocket.Routes.DesktopRouter_RemoveDesktopIcon=Websocket.Routes.DesktopRouter_RemoveDesktopIcon;
Websocket.Events.Body=class Body {
    static get Fullname() { return "Core.Websocket.Events.ApplicationTestEvent+Body, Core"; }
    id;
    name;
}
Websocket.Events.Body.Namespace=`${moduleName}.Websocket.Events`;Aventus.Converter.register(Websocket.Events.Body.Fullname, Websocket.Events.Body);
_.Websocket.Events.Body=Websocket.Events.Body;
Websocket.Events.ApplicationTestEvent=class ApplicationTestEvent extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `Core.Websocket.Events.ApplicationTestEvent`;
    }
}
Websocket.Events.ApplicationTestEvent.Namespace=`${moduleName}.Websocket.Events`;
_.Websocket.Events.ApplicationTestEvent=Websocket.Events.ApplicationTestEvent;
Lib.ApplicationState=class ApplicationState extends Aventus.State {
    /**
     * The current namespace
     */
    static Namespace = "";
    /**
     * Get the unique type for the data. Define it as the namespace + class name
     */
    static get Fullname() { return this.Namespace + "." + this.name; }
    $type;
    __manager;
    __canSaveState = true;
    enableSaveState() {
        this.__canSaveState = true;
    }
    disableSaveState() {
        this.__canSaveState = false;
    }
    canSync() {
        if (!this.__canSaveState)
            return false;
        if (!System.Os.instance.activeDesktop.data.SyncDesktop)
            return false;
        return true;
    }
    constructor() {
        super();
        this.$type = this.constructor['Fullname'];
    }
    setManager(manager) {
        this.__manager = manager;
    }
    saveState() {
        if (!this.canSync())
            return;
        this.__manager.save();
    }
    async activate() {
        return super.activate(this.__manager);
    }
    /**
     * Override this method to remove keys when converting to json
     */
    avoidJSONKeys() {
        return ['name'];
    }
    toJSON() {
        let avoidKeys = this.avoidJSONKeys();
        return Aventus.Json.classToJson(this, {
            isValidKey: (key) => {
                if (key.startsWith("__"))
                    return false;
                if (avoidKeys.includes(key))
                    return false;
                return true;
            }
        });
    }
    /**
    * Override this method to remove keys when converting to json
    */
    avoidCopyValuesKeys() {
        return ['name'];
    }
    copyValues(src) {
        let avoidKeys = this.avoidCopyValuesKeys();
        Aventus.Converter.copyValuesClass(this, src, {
            isValidKey: (key) => {
                if (key.startsWith("__"))
                    return false;
                if (avoidKeys.includes(key))
                    return false;
                return true;
            }
        });
    }
}
Lib.ApplicationState.Namespace=`${moduleName}.Lib`;Aventus.Converter.register(Lib.ApplicationState.Fullname, Lib.ApplicationState);
_.Lib.ApplicationState=Lib.ApplicationState;
Lib.ApplicationStorableState=class ApplicationStorableState extends Lib.ApplicationState {
    __item;
    get item() {
        return this.__item;
    }
    set item(value) {
        if (!this.__item) {
            this.__item = Aventus.Watcher.get(value, () => {
                this.saveState();
            });
        }
        try {
            for (let key in value) {
                this.__item[key] = value[key];
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    constructor(item) {
        super();
        if (item) {
            this.item = item;
        }
        else {
            this.item = this.newElement();
        }
    }
}
Lib.ApplicationStorableState.Namespace=`${moduleName}.Lib`;Aventus.Converter.register(Lib.ApplicationStorableState.Fullname, Lib.ApplicationStorableState);
_.Lib.ApplicationStorableState=Lib.ApplicationStorableState;
System.Frame = class Frame extends Aventus.WebComponent {
    static get observedAttributes() {return ["visible"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'visible'() { return this.getBoolProp('visible') }
    set 'visible'(val) { this.setBoolAttr('visible', val) }    application;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("visible", ((target) => {
    if (target.visible) {
        target.onShow();
    }
    else {
        target.onHide();
    }
})); }
    static __style = `:host{width:100%;height:100%;display:none}:host([visible]){display:block}`;
    constructor() { super(); if (this.constructor == Frame) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return Frame;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Frame.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Frame";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('visible')) { this.attributeChangedCallback('visible', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('visible'); }
    __listBoolProps() { return ["visible"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    async show() {
        this.visible = true;
    }
    async hide() {
        this.visible = false;
    }
}
System.Frame.Namespace=`${moduleName}.System`;
_.System.Frame=System.Frame;

System.Frame404 = class Frame404 extends System.Frame {
    static __style = ``;
    __getStatic() {
        return Frame404;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Frame404.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<p>Erreur 404</p>` }
    });
}
    getClassName() {
        return "Frame404";
    }
    pageTitle() {
        return "Page not found";
    }
    onShow() {
    }
    onHide() {
    }
}
System.Frame404.Namespace=`${moduleName}.System`;
System.Frame404.Tag=`rk-frame-404`;
_.System.Frame404=System.Frame404;
if(!window.customElements.get('rk-frame-404')){window.customElements.define('rk-frame-404', System.Frame404);Aventus.WebComponentInstance.registerDefinition(System.Frame404);}

(function (ResizeDirection) {
    ResizeDirection[ResizeDirection["Top"] = 0] = "Top";
    ResizeDirection[ResizeDirection["TopLeft"] = 1] = "TopLeft";
    ResizeDirection[ResizeDirection["Left"] = 2] = "Left";
    ResizeDirection[ResizeDirection["BottomLeft"] = 3] = "BottomLeft";
    ResizeDirection[ResizeDirection["Bottom"] = 4] = "Bottom";
    ResizeDirection[ResizeDirection["BottomRight"] = 5] = "BottomRight";
    ResizeDirection[ResizeDirection["Right"] = 6] = "Right";
    ResizeDirection[ResizeDirection["TopRight"] = 7] = "TopRight";
})(Components.ResizeDirection || (Components.ResizeDirection = {}));

_.Components.ResizeDirection=Components.ResizeDirection;
Data.User=class User extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.User, Core"; }
    Firstname = "";
    Lastname = "";
    Username = "";
    Password = "";
    Token = "";
    Picture = "";
    IsSuperAdmin = false;
}
Data.User.$schema={"Firstname":"string","Lastname":"string","Username":"string","Password":"string","Token":"string","Picture":"string","IsSuperAdmin":"boolean"};Aventus.DataManager.register(Data.User.Fullname, Data.User);Data.User.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.User.Fullname, Data.User);
_.Data.User=Data.User;
Data.PermissionUser=class PermissionUser extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.PermissionUser, Core"; }
    Data;
    Permission;
    Data;
    User;
}
Data.PermissionUser.$schema={"Permission":""+moduleName+".Data.Permission","User":""+moduleName+".Data.User"};Aventus.DataManager.register(Data.PermissionUser.Fullname, Data.PermissionUser);Data.PermissionUser.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.PermissionUser.Fullname, Data.PermissionUser);
_.Data.PermissionUser=Data.PermissionUser;
Data.Group=class Group extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.Group, Core"; }
    Name = "";
    Description = "";
    Users = [];
    parentGroup = undefined;
}
Data.Group.$schema={"Name":"string","Description":"string","Users":""+moduleName+".Data.User","parentGroup":"Group"};Aventus.DataManager.register(Data.Group.Fullname, Data.Group);Data.Group.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Group.Fullname, Data.Group);
_.Data.Group=Data.Group;
Data.PermissionGroup=class PermissionGroup extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.PermissionGroup, Core"; }
    Data;
    Permission;
    Data;
    Group;
}
Data.PermissionGroup.$schema={"Permission":""+moduleName+".Data.Permission","Group":""+moduleName+".Data.Group"};Aventus.DataManager.register(Data.PermissionGroup.Fullname, Data.PermissionGroup);Data.PermissionGroup.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.PermissionGroup.Fullname, Data.PermissionGroup);
_.Data.PermissionGroup=Data.PermissionGroup;
Routes.MainRouter=class MainRouter extends Aventus.HttpRoute {
    async LoginAction(body) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/login`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryVoid(this.router);
    }
    async Logout() {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/logout`, Aventus.HttpMethod.POST);
        return await request.queryVoid(this.router);
    }
    async VapidPublicKey() {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/vapidPublicKey`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    async Register(body) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/register`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryVoid(this.router);
    }
    async SendNotification() {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/sendNotification`, Aventus.HttpMethod.GET);
        return await request.queryVoid(this.router);
    }
    async Restart() {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/restart`, Aventus.HttpMethod.GET);
        return await request.queryVoid(this.router);
    }
}
Routes.MainRouter.Namespace=`${moduleName}.Routes`;
_.Routes.MainRouter=Routes.MainRouter;
App.AppConfiguration=class AppConfiguration {
    static get Fullname() { return "Core.App.AppConfiguration, Core"; }
    appsInstalled = [];
    allApps = new Map();
}
App.AppConfiguration.Namespace=`${moduleName}.App`;Aventus.Converter.register(App.AppConfiguration.Fullname, App.AppConfiguration);
Data.ApplicationData=class ApplicationData extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.ApplicationData, Core"; }
    Name = "";
    DisplayName = "";
    Version = 0;
    LogoClassName = "";
    LogoTagName = "";
    Extension;
}
Data.ApplicationData.$schema={"Name":"string","DisplayName":"string","Version":"number","LogoClassName":"string","LogoTagName":"string","Extension":"string"};Aventus.DataManager.register(Data.ApplicationData.Fullname, Data.ApplicationData);Data.ApplicationData.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.ApplicationData.Fullname, Data.ApplicationData);
_.Data.ApplicationData=Data.ApplicationData;
Websocket.Routes.ApplicationRouter_GetAll3=class ApplicationRouter_GetAll3 extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `/application3`;
    }
}
Websocket.Routes.ApplicationRouter_GetAll3.Namespace=`${moduleName}.Websocket.Routes`;
_.Websocket.Routes.ApplicationRouter_GetAll3=Websocket.Routes.ApplicationRouter_GetAll3;
Websocket.Routes.ApplicationRouter_GetAll2=class ApplicationRouter_GetAll2 extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `/application2`;
    }
    /**
     * @inheritdoc
     */
    listenOnBoot() {
        return true;
    }
}
Websocket.Routes.ApplicationRouter_GetAll2.Namespace=`${moduleName}.Websocket.Routes`;
_.Websocket.Routes.ApplicationRouter_GetAll2=Websocket.Routes.ApplicationRouter_GetAll2;
Components.PageCaseContainer = class PageCaseContainer extends Aventus.WebComponent {
    static __style = `:host{display:block;float:left;height:100%;box-sizing:border-box;border-right:5px #000}`;
    __getStatic() {
        return PageCaseContainer;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(PageCaseContainer.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "PageCaseContainer";
    }
}
Components.PageCaseContainer.Namespace=`${moduleName}.Components`;
Components.PageCaseContainer.Tag=`rk-page-case-container`;
_.Components.PageCaseContainer=Components.PageCaseContainer;
if(!window.customElements.get('rk-page-case-container')){window.customElements.define('rk-page-case-container', Components.PageCaseContainer);Aventus.WebComponentInstance.registerDefinition(Components.PageCaseContainer);}

Components.PageCaseSlot = class PageCaseSlot extends Aventus.WebComponent {
    get 'no'() { return this.getNumberAttr('no') }
    set 'no'(val) { this.setNumberAttr('no', val) }    item;
    static __style = `:host{--internal-page-case-background: var(--page-case-background, transparent);--internal-page-case-background-active: var(--page-case-background-active, transparent);--internal-page-case-border-active: var(--page-case-border-active, none);--internal-page-case-border-radius:var(--page-case-border-radius, 0)}:host{display:block;width:var(--local-page-case-width);height:var(--local-page-case-height);background-color:var(--internal-page-case-background);border-radius:var(--internal-page-case-border-radius);margin:calc(var(--local-page-case-margin-top)/2) calc(var(--local-page-case-margin-left)/2);float:left;position:relative;box-sizing:border-box}:host ::slotted(*){position:absolute;top:0;left:0;width:var(--local-page-case-width);height:var(--local-page-case-height)}:host(.active){background-color:var(--internal-page-case-background-active);border:var(--internal-page-case-border-active)}`;
    __getStatic() {
        return PageCaseSlot;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(PageCaseSlot.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "PageCaseSlot";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('no')){ this['no'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('no'); }
}
Components.PageCaseSlot.Namespace=`${moduleName}.Components`;
Components.PageCaseSlot.Tag=`rk-page-case-slot`;
_.Components.PageCaseSlot=Components.PageCaseSlot;
if(!window.customElements.get('rk-page-case-slot')){window.customElements.define('rk-page-case-slot', Components.PageCaseSlot);Aventus.WebComponentInstance.registerDefinition(Components.PageCaseSlot);}

Data.ApplicationOpen=class ApplicationOpen {
    static get Fullname() { return "Core.Data.ApplicationOpen, Core"; }
    id;
    applicationName;
    number;
    history;
    isHidden;
}
Data.ApplicationOpen.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.ApplicationOpen.Fullname, Data.ApplicationOpen);
_.Data.ApplicationOpen=Data.ApplicationOpen;
Data.ApplicationOpenInfo=class ApplicationOpenInfo {
    static get Fullname() { return "Core.Data.ApplicationOpenInfo, Core"; }
    DesktopId;
    Info;
}
Data.ApplicationOpenInfo.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.ApplicationOpenInfo.Fullname, Data.ApplicationOpenInfo);
_.Data.ApplicationOpenInfo=Data.ApplicationOpenInfo;
Websocket.Routes.DesktopRouter_RemoveApp=class DesktopRouter_RemoveApp extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `/desktop/RemoveApp`;
    }
    /**
     * @inheritdoc
     */
    listenOnBoot() {
        return true;
    }
}
Websocket.Routes.DesktopRouter_RemoveApp.Namespace=`${moduleName}.Websocket.Routes`;
_.Websocket.Routes.DesktopRouter_RemoveApp=Websocket.Routes.DesktopRouter_RemoveApp;
Websocket.Routes.DesktopRouter_RegisterOpenApp=class DesktopRouter_RegisterOpenApp extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `/desktop/RegisterOpenApp`;
    }
    /**
     * @inheritdoc
     */
    listenOnBoot() {
        return true;
    }
}
Websocket.Routes.DesktopRouter_RegisterOpenApp.Namespace=`${moduleName}.Websocket.Routes`;
_.Websocket.Routes.DesktopRouter_RegisterOpenApp=Websocket.Routes.DesktopRouter_RegisterOpenApp;
(function (DesktopLocation) {
    DesktopLocation[DesktopLocation["Desktop"] = 0] = "Desktop";
    DesktopLocation[DesktopLocation["BottomBar"] = 1] = "BottomBar";
    DesktopLocation[DesktopLocation["HomeFav"] = 2] = "HomeFav";
})(Data.DesktopLocation || (Data.DesktopLocation = {}));

_.Data.DesktopLocation=Data.DesktopLocation;
State.DesktopStateManager=class DesktopStateManager extends Aventus.StateManager {
    /**
     * Get the instance of the StateManager
     */
    static getInstance() {
        return Aventus.Instance.get(State.DesktopStateManager);
    }
}
State.DesktopStateManager.Namespace=`${moduleName}.State`;
_.State.DesktopStateManager=State.DesktopStateManager;
(function (SpecialTouch) {
    SpecialTouch[SpecialTouch["Backspace"] = 0] = "Backspace";
    SpecialTouch[SpecialTouch["Insert"] = 1] = "Insert";
    SpecialTouch[SpecialTouch["End"] = 2] = "End";
    SpecialTouch[SpecialTouch["PageDown"] = 3] = "PageDown";
    SpecialTouch[SpecialTouch["PageUp"] = 4] = "PageUp";
    SpecialTouch[SpecialTouch["Escape"] = 5] = "Escape";
    SpecialTouch[SpecialTouch["AltGraph"] = 6] = "AltGraph";
    SpecialTouch[SpecialTouch["Control"] = 7] = "Control";
    SpecialTouch[SpecialTouch["Alt"] = 8] = "Alt";
    SpecialTouch[SpecialTouch["Shift"] = 9] = "Shift";
    SpecialTouch[SpecialTouch["CapsLock"] = 10] = "CapsLock";
    SpecialTouch[SpecialTouch["Tab"] = 11] = "Tab";
    SpecialTouch[SpecialTouch["Delete"] = 12] = "Delete";
    SpecialTouch[SpecialTouch["ArrowRight"] = 13] = "ArrowRight";
    SpecialTouch[SpecialTouch["ArrowLeft"] = 14] = "ArrowLeft";
    SpecialTouch[SpecialTouch["ArrowUp"] = 15] = "ArrowUp";
    SpecialTouch[SpecialTouch["ArrowDown"] = 16] = "ArrowDown";
    SpecialTouch[SpecialTouch["Enter"] = 17] = "Enter";
})(Lib.SpecialTouch || (Lib.SpecialTouch = {}));

_.Lib.SpecialTouch=Lib.SpecialTouch;
Components.ContextMenuSeparator = class ContextMenuSeparator extends Aventus.WebComponent {
    priority = 0;
    menu;
    canBeRendered = () => true;
    static __style = `:host{margin:5px 0px;background-color:var(--text-color);height:1px}`;
    __getStatic() {
        return ContextMenuSeparator;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(ContextMenuSeparator.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "ContextMenuSeparator";
    }
}
Components.ContextMenuSeparator.Namespace=`${moduleName}.Components`;
Components.ContextMenuSeparator.Tag=`rk-context-menu-separator`;
_.Components.ContextMenuSeparator=Components.ContextMenuSeparator;
if(!window.customElements.get('rk-context-menu-separator')){window.customElements.define('rk-context-menu-separator', Components.ContextMenuSeparator);Aventus.WebComponentInstance.registerDefinition(Components.ContextMenuSeparator);}

Components.Collapse = class Collapse extends Aventus.WebComponent {
    get 'open'() { return this.getBoolAttr('open') }
    set 'open'(val) { this.setBoolAttr('open', val) }get 'no_animation'() { return this.getBoolAttr('no_animation') }
    set 'no_animation'(val) { this.setBoolAttr('no_animation', val) }    static __style = `:host .title{cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host .collapse{display:grid;grid-template-rows:0fr;transition:.5s var(--bezier-curve) grid-template-rows}:host .collapse .content{overflow:hidden}:host([open]) .collapse{grid-template-rows:1fr}:host([no_animation]) .collapse{transition:none}`;
    __getStatic() {
        return Collapse;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Collapse.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'header':`<slot name="header"></slot>`,'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="title" _id="collapse_0">    <slot name="header"></slot></div><div class="collapse" _id="collapse_1">    <div class="content">        <slot></slot>    </div></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "events": [
    {
      "eventName": "transitionend",
      "id": "collapse_1",
      "fct": (e, c) => c.comp.transitionEnd(e)
    }
  ],
  "pressEvents": [
    {
      "id": "collapse_0",
      "onPress": (e, pressInstance, c) => { c.comp.toggleOpen(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "Collapse";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('open')) { this.attributeChangedCallback('open', false, false); }if(!this.hasAttribute('no_animation')) { this.attributeChangedCallback('no_animation', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('open');this.__upgradeProperty('no_animation'); }
    __listBoolProps() { return ["open","no_animation"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    transitionEnd(e) {
        let cst = e.constructor;
        const new_e = new cst(e.type, e);
        this.dispatchEvent(new_e);
    }
    toggleOpen() {
        this.open = !this.open;
    }
}
Components.Collapse.Namespace=`${moduleName}.Components`;
Components.Collapse.Tag=`rk-collapse`;
_.Components.Collapse=Components.Collapse;
if(!window.customElements.get('rk-collapse')){window.customElements.define('rk-collapse', Components.Collapse);Aventus.WebComponentInstance.registerDefinition(Components.Collapse);}

Components.ContextMenuItem = class ContextMenuItem extends Aventus.WebComponent {
    static get observedAttributes() {return ["text", "icon"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'text'() { return this.getStringProp('text') }
    set 'text'(val) { this.setStringAttr('text', val) }get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }    priority = 0;
    action = () => { };
    menu;
    canBeRendered = () => true;
    static __style = `:host{align-items:center;border-radius:5px;cursor:pointer;display:flex;font-size:var(--font-size-sm);margin:0 5px;padding:5px 10px}:host .title{margin-left:30px}:host .icon{display:none;font-size:var(--font-size-sm);margin-right:10px;width:20px}:host([icon]) .title{margin-left:0px}:host([icon]) .icon{display:inline-block}@media screen and (min-width: 1225px){:host{font-size:var(--font-size)}:host .icon{font-size:var(--font-size)}:host(:hover){background-color:var(--darker)}}`;
    constructor() { super(); this.onPress=this.onPress.bind(this) }
    __getStatic() {
        return ContextMenuItem;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(ContextMenuItem.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<template _id="contextmenuitem_0"></template><div class="title" _id="contextmenuitem_3"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "contextmenuitem_3°@HTML": {
      "fct": (c) => `${c.print(c.comp.__75e8d9b88cdfe8a028412b25f4042b69method3())}`,
      "once": true
    }
  }
});const templ0 = new Aventus.Template(this);templ0.setTemplate(`    <mi-icon class="icon" _id="contextmenuitem_1"></mi-icon>`);templ0.setActions({
  "content": {
    "contextmenuitem_1°icon": {
      "fct": (c) => `${c.print(c.comp.__75e8d9b88cdfe8a028412b25f4042b69method1())}`
    }
  }
});const templ1 = new Aventus.Template(this);templ1.setTemplate(`    <rk-img class="icon" _id="contextmenuitem_2"></rk-img>`);templ1.setActions({
  "content": {
    "contextmenuitem_2°src": {
      "fct": (c) => `${c.print(c.comp.__75e8d9b88cdfe8a028412b25f4042b69method2())}`,
      "once": true
    }
  }
});this.__getStatic().__template.addIf({
                    anchorId: 'contextmenuitem_0',
                    parts: [{
                    condition: (c) => c.comp.__75e8d9b88cdfe8a028412b25f4042b69method0(),
                    template: templ0
                },{once: true,
                    condition: (c) => true,
                    template: templ1
                }]
            }); }
    getClassName() {
        return "ContextMenuItem";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('text')){ this['text'] = ""; }if(!this.hasAttribute('icon')){ this['icon'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('text');this.__upgradeProperty('icon'); }
    onPress() {
        this.action();
        this.menu.close();
    }
    postCreation() {
        new Aventus.PressManager({
            element: this,
            onPress: () => {
                this.onPress();
            }
        });
    }
    __75e8d9b88cdfe8a028412b25f4042b69method1() {
        return this.icon?.replace('@mi:', '');
    }
    __75e8d9b88cdfe8a028412b25f4042b69method2() {
        return this.icon;
    }
    __75e8d9b88cdfe8a028412b25f4042b69method3() {
        return this.text;
    }
    __75e8d9b88cdfe8a028412b25f4042b69method0() {
        return this.icon?.startsWith("@mi:");
    }
}
Components.ContextMenuItem.Namespace=`${moduleName}.Components`;
Components.ContextMenuItem.Tag=`rk-context-menu-item`;
_.Components.ContextMenuItem=Components.ContextMenuItem;
if(!window.customElements.get('rk-context-menu-item')){window.customElements.define('rk-context-menu-item', Components.ContextMenuItem);Aventus.WebComponentInstance.registerDefinition(Components.ContextMenuItem);}

Components.ContextMenu = class ContextMenu extends Aventus.WebComponent {
    static instance;
    _items = [];
    isTouch = false;
    static __style = `:host{--scrollbar-container-display: flex;background-color:#fff;border-radius:5px;box-shadow:var(--elevation-3);display:flex;flex-direction:column;outline:none;overflow:hidden;position:absolute;z-index:502}:host .container{display:flex;flex-direction:column;padding:5px 0}`;
    __getStatic() {
        return ContextMenu;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(ContextMenu.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<rk-scrollable floating_scroll>    <rk-collapse _id="contextmenu_0">        <div class="container" _id="contextmenu_1">        </div>    </rk-collapse></rk-scrollable>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "collapseEl",
      "ids": [
        "contextmenu_0"
      ]
    },
    {
      "name": "containerEl",
      "ids": [
        "contextmenu_1"
      ]
    }
  ]
}); }
    getClassName() {
        return "ContextMenu";
    }
    init(pageX, pageY, isTouch, element) {
        let el = Aventus.ElementExtension.getElementAtPosition(pageX, pageY, element);
        this.isTouch = isTouch;
        while (el) {
            let temp = el;
            if (temp.onContextMenu) {
                let stop = false;
                temp.onContextMenu(this, () => {
                    stop = true;
                });
                if (stop) {
                    break;
                }
            }
            if (el == element) {
                break;
            }
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
        }
        if (this._items.length == 0) {
            return;
        }
        this._items.sort((a, b) => b.priority - a.priority);
        for (let i = 0; i < this._items.length; i++) {
            if (!this._items[i].canBeRendered(this._items, this._items[i])) {
                this._items.splice(i, 1);
                i--;
            }
        }
        // remove first separator
        if (this._items[0] instanceof Components.ContextMenuSeparator) {
            this._items.splice(0, 1);
            if (this._items.length == 0) {
                return;
            }
        }
        // remove last separator
        let lastIndex = this._items.length - 1;
        if (this._items[lastIndex] instanceof Components.ContextMenuSeparator) {
            this._items.splice(lastIndex, 1);
            if (this._items.length == 0) {
                return;
            }
        }
        for (let item of this._items) {
            item.menu = this;
            this.containerEl.appendChild(item);
        }
        this.calculatePosition(pageX, pageY, element);
        element.shadowRoot.appendChild(this);
    }
    calculatePosition(pageX, pageY, element) {
        this.style.left = -1000 + 'px';
        this.style.top = '0';
        this.collapseEl.no_animation = true;
        this.collapseEl.open = true;
        document.body.appendChild(this);
        let height = this.offsetHeight;
        let width = this.offsetWidth;
        this.collapseEl.open = false;
        this.collapseEl.no_animation = false;
        document.body.removeChild(this);
        let top = '';
        let left = '';
        let bottom = '';
        let right = '';
        let maxHeight = element.offsetHeight;
        if (height > element.offsetHeight) {
            if (pageY > element.offsetHeight / 2) {
                let bottomNb = element.offsetHeight - pageY;
                bottom = bottomNb + 'px';
                maxHeight = element.offsetHeight - bottomNb;
            }
            else {
                top = pageY + 'px';
                maxHeight = element.offsetHeight - pageY;
            }
        }
        else {
            if (pageY + height > element.offsetHeight) {
                let bottomNb = element.offsetHeight - pageY;
                bottom = bottomNb + 'px';
                maxHeight = element.offsetHeight - bottomNb;
            }
            else {
                top = pageY + 'px';
                // maxHeight = element.offsetHeight - pageY;
            }
        }
        if (pageX + width > element.offsetWidth) {
            right = element.offsetWidth - pageX + 'px';
        }
        else {
            left = pageX + 'px';
        }
        this.style.top = top;
        this.style.left = left;
        this.style.bottom = bottom;
        this.style.right = right;
        this.style.maxHeight = (maxHeight - 20) + 'px';
    }
    addItem(item) {
        let converted;
        if (!(item instanceof Components.ContextMenuItem)) {
            let temp = new Components.ContextMenuItem();
            temp.priority = item.priority ?? 0;
            if (item.icon) {
                temp.icon = item.icon;
            }
            else if (item.materialIcon) {
                temp.icon = "@mi:" + item.materialIcon;
            }
            temp.text = item.text;
            temp.action = item.action;
            if (item.canBeRendered)
                temp.canBeRendered = item.canBeRendered;
            converted = temp;
        }
        else {
            converted = item;
        }
        this._items.push(converted);
    }
    addSeparator(item) {
        let converted;
        if (!(item instanceof Components.ContextMenuSeparator)) {
            let temp = new Components.ContextMenuSeparator();
            temp.priority = item?.priority ?? 0;
            if (item?.canBeRendered)
                temp.canBeRendered = item.canBeRendered;
            converted = temp;
        }
        else {
            converted = item;
        }
        this._items.push(converted);
    }
    addFocus() {
        this.setAttribute("tabindex", "-1");
        this.collapseEl.addEventListener("transitionend", (event) => {
            if (this.collapseEl.open) {
                this.focus({ preventScroll: true });
            }
            else {
                this.remove();
            }
        });
        this.addEventListener("blur", (e) => {
            e.stopPropagation();
            this.collapseEl.open = false;
            Components.ContextMenu.instance = undefined;
        });
    }
    close() {
        this.collapseEl.open = false;
        Components.ContextMenu.instance = undefined;
    }
    postCreation() {
        if (Components.ContextMenu.instance) {
            Components.ContextMenu.instance.collapseEl.open = false;
        }
        Components.ContextMenu.instance = this;
        this.collapseEl.open = true;
        this.addFocus();
    }
}
Components.ContextMenu.Namespace=`${moduleName}.Components`;
Components.ContextMenu.Tag=`rk-context-menu`;
_.Components.ContextMenu=Components.ContextMenu;
if(!window.customElements.get('rk-context-menu')){window.customElements.define('rk-context-menu', Components.ContextMenu);Aventus.WebComponentInstance.registerDefinition(Components.ContextMenu);}

Lib.ShortcutManager=class ShortcutManager {
    static memory = {};
    static isInit = false;
    static arrayKeys = [];
    static getText(combinaison) {
        let allTouches = [];
        for (let touch of combinaison) {
            let realTouch = "";
            if (typeof touch == "number" && Lib.SpecialTouch[touch] !== undefined) {
                realTouch = Lib.SpecialTouch[touch];
            }
            else if (touch.match(/[a-zA-Z0-9]/g)) {
                realTouch = touch;
            }
            else {
                throw "I can't use " + touch + " to add a shortcut";
            }
            allTouches.push(realTouch);
        }
        allTouches.sort();
        return allTouches.join("+");
    }
    static subscribe(combinaison, cb) {
        let key = this.getText(combinaison);
        if (!Lib.ShortcutManager.memory[key]) {
            Lib.ShortcutManager.memory[key] = [];
        }
        if (!Lib.ShortcutManager.memory[key].includes(cb)) {
            Lib.ShortcutManager.memory[key].push(cb);
        }
        if (!Lib.ShortcutManager.isInit) {
            Lib.ShortcutManager.init();
        }
    }
    static unsubscribe(combinaison, cb) {
        let key = this.getText(combinaison);
        if (Lib.ShortcutManager.memory[key]) {
            let index = Lib.ShortcutManager.memory[key].indexOf(cb);
            if (index != -1) {
                Lib.ShortcutManager.memory[key].splice(index, 1);
                if (Lib.ShortcutManager.memory[key].length == 0) {
                    delete Lib.ShortcutManager.memory[key];
                }
                if (Object.keys(Lib.ShortcutManager.memory).length == 0 && Lib.ShortcutManager.isInit) {
                    Lib.ShortcutManager.uninit();
                }
            }
        }
    }
    static onKeyDown(e) {
        if (e.ctrlKey) {
            let txt = Lib.SpecialTouch[Lib.SpecialTouch.Control];
            if (!this.arrayKeys.includes(txt)) {
                this.arrayKeys.push(txt);
            }
        }
        if (e.altKey) {
            let txt = Lib.SpecialTouch[Lib.SpecialTouch.Alt];
            if (!this.arrayKeys.includes(txt)) {
                this.arrayKeys.push(txt);
            }
        }
        if (e.shiftKey) {
            let txt = Lib.SpecialTouch[Lib.SpecialTouch.Shift];
            if (!this.arrayKeys.includes(txt)) {
                this.arrayKeys.push(txt);
            }
        }
        if (e.key.match(/[a-zA-Z0-9]/g) && !this.arrayKeys.includes(e.key)) {
            this.arrayKeys.push(e.key);
        }
        else if (Lib.SpecialTouch[e.key] !== undefined && !this.arrayKeys.includes(e.key)) {
            this.arrayKeys.push(e.key);
        }
        this.arrayKeys.sort();
        let key = this.arrayKeys.join("+");
        if (Lib.ShortcutManager.memory[key]) {
            e.preventDefault();
            this.arrayKeys = [];
            for (let cb of Lib.ShortcutManager.memory[key]) {
                cb();
            }
        }
    }
    static onKeyUp(e) {
        let index = this.arrayKeys.indexOf(e.key);
        if (index != -1) {
            this.arrayKeys.splice(index, 1);
        }
    }
    static init() {
        Lib.ShortcutManager.isInit = true;
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        window.addEventListener("blur", () => {
            this.arrayKeys = [];
        });
        document.body.addEventListener("keydown", this.onKeyDown);
        document.body.addEventListener("keyup", this.onKeyUp);
    }
    static uninit() {
        document.body.removeEventListener("keydown", this.onKeyDown);
        document.body.removeEventListener("keyup", this.onKeyUp);
        this.arrayKeys = [];
        Lib.ShortcutManager.isInit = false;
    }
}
Lib.ShortcutManager.Namespace=`${moduleName}.Lib`;
_.Lib.ShortcutManager=Lib.ShortcutManager;
State.MoveApplication=class MoveApplication extends Aventus.State {
    static state = "/application/move";
    providers = [];
    selectedProvider;
    _lastX = 0;
    _lastY = 0;
    get lastX() {
        return this._lastX;
    }
    get lastY() {
        return this._lastY;
    }
    /**
     * @inheritdoc
     */
    get name() {
        return State.MoveApplication.state;
    }
    constructor() {
        super();
        this.resetState = this.resetState.bind(this);
    }
    resetState() {
        Lib.ShortcutManager.unsubscribe([Lib.SpecialTouch.Escape], this.resetState);
        State.DesktopStateManager.getInstance().setState("/");
    }
    async activate(manager) {
        let result = await super.activate(manager);
        if (result) {
            Lib.ShortcutManager.subscribe([Lib.SpecialTouch.Escape], this.resetState);
        }
        return result;
    }
    registerProvider(provider) {
        this.providers.push(provider);
    }
    onMove(icon, x, y) {
        this._lastX = x;
        this._lastY = y;
        this.selectedProvider = undefined;
        for (let provider of this.providers) {
            if (provider.setAppPositionTemp(icon, x, y, this)) {
                this.selectedProvider = provider;
                break;
            }
        }
        for (let provider of this.providers) {
            if (provider != this.selectedProvider) {
                provider.clearAppPositionTemp(this);
            }
        }
    }
    async onDrop(icon, x, y, reset) {
        icon.style.width = '';
        icon.style.height = '';
        icon.style.top = '';
        icon.style.left = '';
        icon.style.zIndex = '';
        icon.style.opacity = '';
        icon.style.pointerEvents = '';
        icon.style.position = '';
        if (this.selectedProvider) {
            await this.selectedProvider.setAppPosition(icon, x, y, this);
        }
        else {
            reset();
        }
    }
}
State.MoveApplication.Namespace=`${moduleName}.State`;
_.State.MoveApplication=State.MoveApplication;
Data.DesktopAppIcon=class DesktopAppIcon extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.DesktopAppIcon, Core"; }
    Position;
    DesktopId;
    IconTag;
    Location;
}
Data.DesktopAppIcon.$schema={"Position":"number","DesktopId":"number","IconTag":"string","Location":"DesktopLocation"};Aventus.DataManager.register(Data.DesktopAppIcon.Fullname, Data.DesktopAppIcon);Data.DesktopAppIcon.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.DesktopAppIcon.Fullname, Data.DesktopAppIcon);
_.Data.DesktopAppIcon=Data.DesktopAppIcon;
Websocket.Routes.DesktopRouter_SetDesktopIcon=class DesktopRouter_SetDesktopIcon extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `/desktop/SetDesktopIcon`;
    }
    /**
     * @inheritdoc
     */
    listenOnBoot() {
        return true;
    }
}
Websocket.Routes.DesktopRouter_SetDesktopIcon.Namespace=`${moduleName}.Websocket.Routes`;
_.Websocket.Routes.DesktopRouter_SetDesktopIcon=Websocket.Routes.DesktopRouter_SetDesktopIcon;
Data.Desktop=class Desktop extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.Desktop, Core"; }
    Name;
    Background;
    UserId = undefined;
    SyncDesktop = false;
    Icons = [];
    Applications = [];
}
Data.Desktop.$schema={"Name":"string","Background":"string","UserId":"number","SyncDesktop":"boolean","Icons":"DesktopAppIcon","Applications":""+moduleName+".Data.ApplicationOpen"};Aventus.DataManager.register(Data.Desktop.Fullname, Data.Desktop);Data.Desktop.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Desktop.Fullname, Data.Desktop);
_.Data.Desktop=Data.Desktop;
Routes.DesktopRouter=class DesktopRouter extends AventusSharp.Routes.StorableRoute {
    StorableName() {
        return "Desktop";
    }
}
Routes.DesktopRouter.Namespace=`${moduleName}.Routes`;
_.Routes.DesktopRouter=Routes.DesktopRouter;
Components.PageCase = class PageCase extends Aventus.WebComponent {
    static get observedAttributes() {return ["case_width", "case_height"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'min_case_margin_left'() { return this.getNumberAttr('min_case_margin_left') }
    set 'min_case_margin_left'(val) { this.setNumberAttr('min_case_margin_left', val) }get 'min_case_margin_top'() { return this.getNumberAttr('min_case_margin_top') }
    set 'min_case_margin_top'(val) { this.setNumberAttr('min_case_margin_top', val) }get 'move_content'() { return this.getBoolAttr('move_content') }
    set 'move_content'(val) { this.setBoolAttr('move_content', val) }get 'order_position'() { return this.getBoolAttr('order_position') }
    set 'order_position'(val) { this.setBoolAttr('order_position', val) }get 'inverse'() { return this.getBoolAttr('inverse') }
    set 'inverse'(val) { this.setBoolAttr('inverse', val) }get 'allow_scroll_outside'() { return this.getBoolAttr('allow_scroll_outside') }
    set 'allow_scroll_outside'(val) { this.setBoolAttr('allow_scroll_outside', val) }get 'lock'() { return this.getBoolAttr('lock') }
    set 'lock'(val) { this.setBoolAttr('lock', val) }get 'min_page_number'() { return this.getNumberAttr('min_page_number') }
    set 'min_page_number'(val) { this.setNumberAttr('min_page_number', val) }    get 'case_width'() { return this.getNumberProp('case_width') }
    set 'case_width'(val) { this.setNumberAttr('case_width', val) }get 'case_height'() { return this.getNumberProp('case_height') }
    set 'case_height'(val) { this.setNumberAttr('case_height', val) }    casesEl = [];
    pagesEl = [];
    contentsEl = {};
    nbCasePerPage = 0;
    currentPageNumber = 0;
    resizeObserver;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("case_width", ((target) => {
    target.style.setProperty("--local-page-case-width", target.case_width + 'px');
}));this.__addPropertyActions("case_height", ((target) => {
    target.style.setProperty("--local-page-case-height", target.case_height + 'px');
})); }
    static __style = `:host{display:block;width:100%;height:100%;position:relative;overflow:hidden}:host .page-hider{width:100%;height:100%;position:absolute;top:0;left:0}:host .slot-hider ::slotted(*){position:absolute;top:0;left:0;width:var(--local-page-case-width);height:var(--local-page-case-height)}:host([move_content]) .slot-hider{display:none}`;
    __getStatic() {
        return PageCase;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(PageCase.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="page-hider" _id="pagecase_0"></div><div class="slot-hider">    <slot></slot></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "pageHider",
      "ids": [
        "pagecase_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "PageCase";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('min_case_margin_left')){ this['min_case_margin_left'] = 30; }if(!this.hasAttribute('min_case_margin_top')){ this['min_case_margin_top'] = 30; }if(!this.hasAttribute('move_content')) {this.setAttribute('move_content' ,'true'); }if(!this.hasAttribute('order_position')) { this.attributeChangedCallback('order_position', false, false); }if(!this.hasAttribute('inverse')) { this.attributeChangedCallback('inverse', false, false); }if(!this.hasAttribute('allow_scroll_outside')) { this.attributeChangedCallback('allow_scroll_outside', false, false); }if(!this.hasAttribute('lock')) { this.attributeChangedCallback('lock', false, false); }if(!this.hasAttribute('min_page_number')){ this['min_page_number'] = undefined; }if(!this.hasAttribute('case_width')){ this['case_width'] = 50; }if(!this.hasAttribute('case_height')){ this['case_height'] = 50; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('min_case_margin_left');this.__upgradeProperty('min_case_margin_top');this.__upgradeProperty('move_content');this.__upgradeProperty('order_position');this.__upgradeProperty('inverse');this.__upgradeProperty('allow_scroll_outside');this.__upgradeProperty('lock');this.__upgradeProperty('min_page_number');this.__upgradeProperty('case_width');this.__upgradeProperty('case_height'); }
    __listBoolProps() { return ["move_content","order_position","inverse","allow_scroll_outside","lock"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    addResizeObserver() {
        this.resizeObserver = new Aventus.ResizeObserver(() => {
            this.calculateGrid();
        });
        this.resizeObserver.observe(this);
    }
    calculateGrid() {
        let width = (this.offsetWidth - 1);
        let height = this.offsetHeight;
        if (width < 0) {
            width = 0;
        }
        let columns = Math.floor(width / this.case_width);
        let marginLeft = width - (this.case_width * columns);
        marginLeft = Math.floor(marginLeft / columns);
        while (marginLeft < this.min_case_margin_left) {
            columns--;
            marginLeft = width - (this.case_width * columns);
            marginLeft = Math.floor(marginLeft / columns);
            // if(marginLeft % 2 == 1) {
            //     marginLeft--;
            // }
        }
        let rows = Math.floor(height / this.case_height);
        let marginTop = height - (this.case_height * rows);
        marginTop = Math.floor(marginTop / rows);
        while (marginTop < this.min_case_margin_top) {
            rows--;
            marginTop = height - (this.case_height * rows);
            marginTop = Math.floor(marginTop / rows);
            // if(marginTop % 2 == 1) {
            //     marginTop--;
            // }
        }
        this.style.setProperty("--local-page-case-margin-top", marginTop + 'px');
        this.style.setProperty("--local-page-case-margin-left", marginLeft + 'px');
        let nbCasePerPage = columns * rows;
        this.nbCasePerPage = nbCasePerPage;
        if (nbCasePerPage == 0) {
            return;
        }
        let listInSlot = this.getElements();
        let listInSlotLength = Object.keys(listInSlot).length;
        let nbPage = Math.ceil(listInSlotLength / nbCasePerPage);
        let min_page_number = this.min_page_number ?? 0;
        if (nbPage < min_page_number) {
            nbPage = min_page_number;
        }
        if (this.pageHider) {
            this.pageHider.style.width = nbPage * 100 + '%';
        }
        let k = 0;
        let maxRealCaseNumber = 0;
        for (; k < nbPage; k++) {
            var pageContainer;
            if (k < this.pagesEl.length) {
                pageContainer = this.pagesEl[k];
                pageContainer.style.display = "";
            }
            else {
                pageContainer = new Components.PageCaseContainer();
                this.pageHider?.appendChild(pageContainer);
                this.pagesEl.push(pageContainer);
            }
            pageContainer.style.width = (100 / nbPage) + '%';
            for (var i = 0; i < nbCasePerPage; i++) {
                var realCaseNumber = k * nbCasePerPage + i;
                var realPosition = realCaseNumber;
                if (this.inverse) {
                    var tempRow = Math.floor(i / columns);
                    var tempCol = i % columns;
                    realPosition = tempCol * rows + tempRow;
                    realPosition += k * nbCasePerPage;
                }
                if (realCaseNumber > maxRealCaseNumber) {
                    maxRealCaseNumber = realCaseNumber;
                }
                var el;
                if (realCaseNumber < this.casesEl.length) {
                    el = this.casesEl[realCaseNumber];
                }
                else {
                    el = new Components.PageCaseSlot();
                    this.casesEl.push(el);
                }
                el.no = realPosition;
                el.setAttribute("row", Math.floor(i / columns) + "");
                el.setAttribute("col", i % columns + "");
                pageContainer.appendChild(el);
                if (listInSlot.hasOwnProperty(realPosition)) {
                    el.item = listInSlot[realPosition];
                    if (this.move_content) {
                        el.appendChild(listInSlot[realPosition]);
                    }
                    else {
                        el.item.style.transform = 'translateX(var(--page-container-scroll, 0))';
                    }
                }
            }
        }
        for (; k < this.pagesEl.length; k++) {
            this.pagesEl[k].style.display = 'none';
        }
        for (; maxRealCaseNumber + 1 < this.casesEl.length; maxRealCaseNumber++) {
            this.casesEl[maxRealCaseNumber + 1].remove();
        }
        if (!this.move_content) {
            this.recalculatePosition();
        }
    }
    getElements() {
        let listChild = this.getElementsInSlot();
        listChild = [...Object.values(this.contentsEl), ...listChild];
        const result = {};
        if (this.order_position) {
            for (var i = 0; i < listChild.length; i++) {
                var position = Number(listChild[i].position ?? listChild[i].getAttribute("position"));
                if (isNaN(position)) {
                    console.error("error position attribute isn't a number");
                }
                else if (listChild[i].parentNode != null) {
                    result[position] = listChild[i];
                }
            }
        }
        else {
            for (var i = 0; i < listChild.length; i++) {
                if (listChild[i].parentNode != null) {
                    result[i] = listChild[i];
                }
            }
        }
        this.contentsEl = result;
        return result;
    }
    recalculatePosition() {
        for (var i = 0; i < this.casesEl.length; i++) {
            var el = this.casesEl[i].item;
            if (el) {
                el.style.top = this.casesEl[i].offsetTop + 'px';
                el.style.left = this.casesEl[i].offsetLeft + 'px';
            }
        }
    }
    addMoveAction() {
        let max = 0;
        let lastPosition = 0;
        let firstPosition = 0;
        if (!this.pageHider) {
            return;
        }
        let pageHider = this.pageHider;
        let stopProp = false;
        let canApply = false;
        new Aventus.DragAndDrop({
            element: this.pageHider,
            applyDrag: false,
            stopPropagation: false,
            isDragEnable: () => !this.lock,
            onStart: () => {
                max = (this.pagesEl.length - 1) * this.offsetWidth * -1;
                firstPosition = pageHider.offsetLeft;
                canApply = false;
            },
            onMove: (e, position) => {
                if (!stopProp && (position.y > 20 || position.y < -20)) {
                    canApply = true;
                }
                if (!canApply && (position.x > 20 || position.x < -20)) {
                    stopProp = true;
                }
                if (canApply) {
                    if (!this.allow_scroll_outside) {
                        if (position.x > 0) {
                            position.x = 0;
                        }
                        else if (position.x < max) {
                            position.x = max;
                        }
                    }
                    lastPosition = position.x;
                    pageHider.style.left = position.x + 'px';
                    this.style.setProperty("--page-container-scroll", position.x + 'px');
                }
                if (stopProp) {
                    e.stopImmediatePropagation();
                }
            },
            onStop: () => {
                stopProp = false;
                var width = this.offsetWidth;
                let diff = lastPosition - firstPosition;
                if (diff < -300 || diff < (width / -4)) {
                    //next page
                    this.currentPageNumber += 1;
                }
                else if (diff > 300 || diff > (width / 4)) {
                    this.currentPageNumber -= 1;
                }
                if (this.currentPageNumber < 0) {
                    this.currentPageNumber = 0;
                }
                else if (this.currentPageNumber > this.pagesEl.length - 1) {
                    this.currentPageNumber = this.pagesEl.length - 1;
                }
                this.displayCurrentPage();
            }
        });
    }
    displayCurrentPage() {
        if (!this.pageHider) {
            return;
        }
        let pageHider = this.pageHider;
        var leftToGo = this.offsetWidth * this.currentPageNumber * -1;
        var currentLeft = this.pageHider.offsetLeft;
        var diff = leftToGo - currentLeft;
        var step = diff / 50;
        var i = 0;
        if (!this.move_content) {
            var interval = setInterval(() => {
                currentLeft += step;
                i++;
                if (i == 50) {
                    clearInterval(interval);
                    pageHider.style.left = leftToGo + 'px';
                    this.style.setProperty("--page-container-scroll", leftToGo + 'px');
                }
                else {
                    pageHider.style.left = currentLeft + 'px';
                    this.style.setProperty("--page-container-scroll", currentLeft + 'px');
                }
            }, 10);
        }
        else {
            this.pageHider.style.transition = "left 0.5s linear";
            setTimeout(() => {
                pageHider.style.left = leftToGo + 'px';
                setTimeout(() => {
                    pageHider.style.transition = "";
                }, 550);
            });
        }
    }
    reset() {
        this.casesEl = [];
        this.pagesEl = [];
        this.contentsEl = {};
        this.currentPageNumber = 0;
        if (this.pageHider) {
            this.pageHider.innerHTML = '';
            this.pageHider.style.left = '';
        }
        this.style.removeProperty("--page-container-scroll");
        this.calculateGrid();
    }
    getElementAt(no) {
        return this.contentsEl[no];
    }
    postCreation() {
        this.addResizeObserver();
        this.addMoveAction();
    }
}
Components.PageCase.Namespace=`${moduleName}.Components`;
Components.PageCase.Tag=`rk-page-case`;
_.Components.PageCase=Components.PageCase;
if(!window.customElements.get('rk-page-case')){window.customElements.define('rk-page-case', Components.PageCase);Aventus.WebComponentInstance.registerDefinition(Components.PageCase);}

Routes.ApplicationRouter=class ApplicationRouter extends Aventus.HttpRoute {
    async GetAll() {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/application`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    async ConfigureAppData() {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/configureApp/data`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    async InstallDevApp(body) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/configureApp/install`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
    async UninstallDevApp(body) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/configureApp/uninstall`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryVoid(this.router);
    }
}
Routes.ApplicationRouter.Namespace=`${moduleName}.Routes`;
_.Routes.ApplicationRouter=Routes.ApplicationRouter;
Routes.PermissionRouter=class PermissionRouter extends Aventus.HttpRoute {
    async Can(body) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/can`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
}
Routes.PermissionRouter.Namespace=`${moduleName}.Routes`;
_.Routes.PermissionRouter=Routes.PermissionRouter;
Routes.UserRouter=class UserRouter extends AventusSharp.Routes.StorableRoute {
    async GetConnected() {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/getconnected`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    StorableName() {
        return "User";
    }
}
Routes.UserRouter.Namespace=`${moduleName}.Routes`;
_.Routes.UserRouter=Routes.UserRouter;
Routes.CoreHttpRoutes= [
    { type: Routes.ApplicationRouter, path: "Application" },
    { type: Routes.DesktopRouter, path: "Desktop" },
    { type: Routes.MainRouter, path: "" },
    { type: Routes.PermissionRouter, path: "Permission" },
    { type: Routes.UserRouter, path: "User" },
];

_.Routes.CoreHttpRoutes=Routes.CoreHttpRoutes;
Routes.CoreRouter=class CoreRouter extends Aventus.HttpRouter.WithRoute(Routes.CoreHttpRoutes) {
    defineOptions(options) {
        options.url = location.protocol + "//" + location.host + "";
        return options;
    }
}
Routes.CoreRouter.Namespace=`${moduleName}.Routes`;
_.Routes.CoreRouter=Routes.CoreRouter;
Lib.ServiceWorker=class ServiceWorker {
    static getInstance() {
        return AvInstance.get(Lib.ServiceWorker);
    }
    subscription;
    async init(registration) {
        if (await this.getSubscription(registration)) {
            this.subscribe();
        }
    }
    async getSubscription(registration) {
        try {
            let subscription = await registration.pushManager.getSubscription();
            if (subscription) {
                this.subscription = subscription;
                return false;
            }
            let response = await new Routes.CoreRouter().routes.VapidPublicKey();
            if (response.success && response.result) {
                const vapidPublicKey = response.result;
                // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
                // urlBase64ToUint8Array() is defined in /tools.js
                const convertedVapidKey = this.urlBase64ToUint8Array(vapidPublicKey);
                // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
                // send notifications that don't have a visible effect for the user).
                this.subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidKey
                });
                return true;
            }
        }
        catch (e) {
            alert(e);
        }
        return false;
    }
    async subscribe() {
        if (!this.subscription) {
            return;
        }
        await new Routes.CoreRouter().routes.Register({
            subscription: this.subscription
        });
    }
    async unsubscribe() {
        if (!this.subscription) {
            return;
        }
        await this.subscription.unsubscribe();
    }
    urlBase64ToUint8Array(base64String) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);
        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}
Lib.ServiceWorker.Namespace=`${moduleName}.Lib`;
_.Lib.ServiceWorker=Lib.ServiceWorker;
Permissions.Permission=class Permission {
    static saved = {};
    static async can(query) {
        if (!query.additionalInfo) {
            query.additionalInfo = "";
        }
        let key = query.enumName + "$" + query.value + "$" + query.additionalInfo;
        if (Object.keys(this.saved).includes(key)) {
            return this.saved[key];
        }
        let response = await new Routes.CoreRouter().routes.Permission.Can({ permissionQuery: query });
        if (response.success && response.result !== undefined) {
            this.saved[key] = response.result;
            return this.saved[key];
        }
        else {
            console.log(response.errors);
        }
        return false;
    }
}
Permissions.Permission.Namespace=`${moduleName}.Permissions`;
_.Permissions.Permission=Permissions.Permission;
RAM.ApplicationRAM=class ApplicationRAM extends Aventus.Ram {
    getAllDone = false;
    /**
     * Create a singleton to store data
     */
    static getInstance() {
        return Aventus.Instance.get(RAM.ApplicationRAM);
    }
    /**
     * @inheritdoc
     */
    defineIndexKey() {
        return 'Id';
    }
    /**
     * @inheritdoc
     */
    getTypeForData(objJson) {
        return Data.ApplicationData;
    }
    getAllProms = [];
    async wait() {
        return new Promise((resolve) => {
            this.getAllProms.push(() => {
                resolve();
            });
        });
    }
    isLoading = false;
    async beforeGetAll(result) {
        if (!this.getAllDone) {
            if (this.isLoading) {
                await this.wait();
            }
            else {
                this.isLoading = true;
                let apps = await new Routes.CoreRouter().routes.Application.GetAll();
                if (apps.success && apps.result) {
                    for (let app of apps.result) {
                        let resultTemp = new Aventus.ResultRamWithError();
                        this.addOrUpdateData(app, resultTemp);
                        if (!resultTemp.success) {
                            result.errors = [...result.errors, ...resultTemp.errors];
                        }
                    }
                    this.getAllDone = true;
                }
                else {
                    result.errors = [...result.errors, ...apps.errors];
                }
                this.isLoading = false;
                for (let cb of this.getAllProms) {
                    cb();
                }
            }
        }
    }
    async getApplicationByName(name) {
        let items = await this.getList();
        for (let item of items) {
            if (item.Name == name) {
                return item;
            }
        }
        return null;
    }
}
RAM.ApplicationRAM.Namespace=`${moduleName}.RAM`;
_.RAM.ApplicationRAM=RAM.ApplicationRAM;
System.AppList = class AppList extends Aventus.WebComponent {
    static get observedAttributes() {return ["show"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'no_transition'() { return this.getBoolAttr('no_transition') }
    set 'no_transition'(val) { this.setBoolAttr('no_transition', val) }    get 'show'() { return this.getBoolProp('show') }
    set 'show'(val) { this.setBoolAttr('show', val) }    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("show", ((target) => {
    target.onShowChange();
})); }
    static __style = `:host{--internal-app-list-case-border-radius: var(--app-list-case-border-radius, var(--app-icon-border-radius, 10px));--internal-app-list-case-border: var(--app-list-case-border, none);--internal-app-list-case-background-color: var(--app-list-case-background-color, transparent);--internal-app-list-case-border-selected: var(--app-list-case-border-selected, 2px solid red);--internal-app-list-case-background-color-selected: var(--app-list-case-background-color-selected, transparent)}:host{align-items:center;background-color:var(--lighter-active);display:flex;flex-direction:column;inset:0;position:absolute;top:100%;transition:top .5s var(--bezier-curve);z-index:5}:host .search{align-items:center;display:flex;height:100px;justify-content:center;width:100%}:host .search input{background-color:var(--form-element-background);border:none;border-radius:100px;box-shadow:none;font-size:var(--form-element-font-size);line-height:var(--form-element-font-size);max-width:400px;outline:none;padding:10px 20px;width:calc(100% - 20px)}:host .app-list{--page-case-background: var(--internal-app-list-case-background-color);--page-case-background-active: var(--internal-app-list-case-background-color-selected);--page-case-border-active: var(--internal-app-list-case-border-selected);--page-case-border-radius: var(--internal-app-list-case-border-radius);flex-grow:1;max-width:1000px;width:100%}:host([show]){top:0}:host([no_transition]){transition:none}`;
    constructor() { super(); this.closeAppList=this.closeAppList.bind(this) }
    __getStatic() {
        return AppList;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(AppList.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="search" _id="applist_0">    <input type="text" placeholder="search" /></div><div class="app-list">    <rk-page-case case_width="100" case_height="100" min_case_margin_left="20" min_case_margin_top="20" min_page_number="1" _id="applist_1">    </rk-page-case></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "searchContainer",
      "ids": [
        "applist_0"
      ]
    },
    {
      "name": "pageCaseEl",
      "ids": [
        "applist_1"
      ]
    }
  ]
}); }
    getClassName() {
        return "AppList";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('no_transition')) { this.attributeChangedCallback('no_transition', false, false); }if(!this.hasAttribute('show')) { this.attributeChangedCallback('show', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('no_transition');this.__upgradeProperty('show'); }
    __listBoolProps() { return ["no_transition","show"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    closeAppList() {
        System.Os.instance.show_application_list = false;
    }
    onShowChange() {
        if (this.show) {
            Lib.ShortcutManager.subscribe([Lib.SpecialTouch.Escape], this.closeAppList);
        }
        else {
            Lib.ShortcutManager.unsubscribe([Lib.SpecialTouch.Escape], this.closeAppList);
        }
    }
    async loadApps() {
        let apps = await RAM.ApplicationRAM.getInstance().getList();
        apps.sort((a, b) => a.Name < b.Name ? -1 : 1);
        for (let app of apps) {
            let icon = Aventus.WebComponentInstance.create(app.LogoTagName);
            if (icon) {
                this.pageCaseEl?.appendChild(icon);
            }
        }
        this.pageCaseEl?.reset();
    }
    addClose() {
        let apply = true;
        new Aventus.DragAndDrop({
            element: this,
            offsetDrag: 20,
            isDragEnable: () => apply,
            correctPosition: (position) => {
                position.x = 0;
                return position;
            },
            onStart: () => {
                this.no_transition = true;
            },
            onMove: (e, position) => {
                if (position.y > 200) {
                    this.no_transition = false;
                    System.Os.instance.show_application_list = false;
                    this.style.top = "";
                    this.style.left = "";
                    apply = false;
                }
            },
            onStop: () => {
                apply = true;
                this.no_transition = false;
                this.removeAttribute("style");
            }
        });
    }
    postCreation() {
        this.loadApps();
        this.addClose();
    }
}
System.AppList.Namespace=`${moduleName}.System`;
System.AppList.Tag=`rk-app-list`;
_.System.AppList=System.AppList;
if(!window.customElements.get('rk-app-list')){window.customElements.define('rk-app-list', System.AppList);Aventus.WebComponentInstance.registerDefinition(System.AppList);}

Components.Resize = class Resize extends Aventus.WebComponent {
    get 'min_width'() { return this.getNumberAttr('min_width') }
    set 'min_width'(val) { this.setNumberAttr('min_width', val) }get 'min_height'() { return this.getNumberAttr('min_height') }
    set 'min_height'(val) { this.setNumberAttr('min_height', val) }get 'max_width'() { return this.getNumberAttr('max_width') }
    set 'max_width'(val) { this.setNumberAttr('max_width', val) }get 'max_height'() { return this.getNumberAttr('max_height') }
    set 'max_height'(val) { this.setNumberAttr('max_height', val) }    _target;
    get target() {
        if (this._target)
            return this._target;
        throw 'no target defined';
    }
    onPointerDown = new Aventus.Callback();
    onStart = new Aventus.Callback();
    onMove = new Aventus.Callback();
    onStop = new Aventus.Callback();
    onPointerUp = new Aventus.Callback();
    static __style = `:host{--_resize-z-index:var(--resize-z-index, 1)}:host{--width: 10px;--space: 10px}:host div{position:absolute;z-index:var(--_resize-z-index)}:host .top{height:var(--width);left:var(--space);right:var(--space);top:calc(var(--width)/-2);cursor:ns-resize}:host .top-left{top:calc(var(--width)/-2);left:calc(var(--width)/-2);width:calc(var(--width)/2 + var(--space));height:calc(var(--width)/2 + var(--space));cursor:se-resize}:host .left{bottom:var(--space);top:var(--space);width:var(--width);left:calc(var(--width)/-2);cursor:ew-resize}:host .bottom-left{bottom:calc(var(--width)/-2);left:calc(var(--width)/-2);width:calc(var(--width)/2 + var(--space));height:calc(var(--width)/2 + var(--space));cursor:ne-resize}:host .bottom{height:var(--width);left:var(--space);right:var(--space);bottom:calc(var(--width)/-2);cursor:ns-resize}:host .bottom-right{bottom:calc(var(--width)/-2);right:calc(var(--width)/-2);width:calc(var(--width)/2 + var(--space));height:calc(var(--width)/2 + var(--space));cursor:se-resize}:host .right{bottom:var(--space);top:var(--space);width:var(--width);right:calc(var(--width)/-2);cursor:ew-resize}:host .top-right{top:calc(var(--width)/-2);right:calc(var(--width)/-2);width:calc(var(--width)/2 + var(--space));height:calc(var(--width)/2 + var(--space));cursor:ne-resize}`;
    __getStatic() {
        return Resize;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Resize.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="top" _id="resize_0"></div><div class="top-left" _id="resize_1"></div><div class="left" _id="resize_2"></div><div class="bottom-left" _id="resize_3"></div><div class="bottom" _id="resize_4"></div><div class="bottom-right" _id="resize_5"></div><div class="right" _id="resize_6"></div><div class="top-right" _id="resize_7"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "top",
      "ids": [
        "resize_0"
      ]
    },
    {
      "name": "top_left",
      "ids": [
        "resize_1"
      ]
    },
    {
      "name": "left",
      "ids": [
        "resize_2"
      ]
    },
    {
      "name": "bottom_left",
      "ids": [
        "resize_3"
      ]
    },
    {
      "name": "bottom",
      "ids": [
        "resize_4"
      ]
    },
    {
      "name": "bottom_right",
      "ids": [
        "resize_5"
      ]
    },
    {
      "name": "right",
      "ids": [
        "resize_6"
      ]
    },
    {
      "name": "top_right",
      "ids": [
        "resize_7"
      ]
    }
  ]
}); }
    getClassName() {
        return "Resize";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('min_width')){ this['min_width'] = undefined; }if(!this.hasAttribute('min_height')){ this['min_height'] = undefined; }if(!this.hasAttribute('max_width')){ this['max_width'] = undefined; }if(!this.hasAttribute('max_height')){ this['max_height'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('min_width');this.__upgradeProperty('min_height');this.__upgradeProperty('max_width');this.__upgradeProperty('max_height'); }
    styleBefore(addStyle) {
    }
    transformWidth(w) {
        let outbound = false;
        if (this.max_width && this.max_width > 0) {
            if (w > this.max_width) {
                w = this.max_width;
                outbound = true;
            }
        }
        let min_width = this.min_width ?? 0;
        if (w < min_width) {
            w = min_width;
            outbound = true;
        }
        return {
            w,
            outbound
        };
    }
    transformHeight(h) {
        let outbound = false;
        if (this.max_height && this.max_height > 0) {
            if (h > this.max_height) {
                h = this.max_height;
                outbound = true;
            }
        }
        let min_height = this.min_height ?? 0;
        if (h < min_height) {
            h = min_height;
            outbound = true;
        }
        return {
            h,
            outbound
        };
    }
    resizeRight() {
        if (!this.right) {
            return;
        }
        let width;
        let startX;
        let direction = Components.ResizeDirection.Right;
        new Aventus.DragAndDrop({
            element: this.right,
            applyDrag: false,
            offsetDrag: 0,
            onPointerDown: () => {
                this.onPointerDown.trigger([direction]);
            },
            onStart: (e) => {
                width = this.target.offsetWidth;
                startX = e.pageX;
                this.onStart.trigger([direction]);
            },
            onMove: (e) => {
                let transform = this.transformWidth(width + (e.pageX - startX));
                if (!transform.outbound) {
                    this.target.style.width = transform.w + "px";
                    this.onMove.trigger([direction]);
                }
            },
            onStop: () => {
                this.onStop.trigger([direction]);
            },
            onPointerUp: () => {
                this.onPointerUp.trigger([direction]);
            }
        });
    }
    resizeLeft() {
        if (!this.left) {
            return;
        }
        let width;
        let left;
        let startX;
        let direction = Components.ResizeDirection.Left;
        new Aventus.DragAndDrop({
            element: this.left,
            applyDrag: false,
            offsetDrag: 0,
            onPointerDown: () => {
                this.onPointerDown.trigger([direction]);
            },
            onStart: (e) => {
                width = this.target.offsetWidth;
                left = this.target.offsetLeft;
                startX = e.pageX;
                this.onStart.trigger([direction]);
            },
            onMove: (e) => {
                let transform = this.transformWidth(width - (e.pageX - startX));
                if (!transform.outbound) {
                    this.target.style.width = transform.w + "px";
                    this.target.style.left = left + (e.pageX - startX) + "px";
                    this.onMove.trigger([direction]);
                }
            },
            onStop: () => {
                this.onStop.trigger([direction]);
            },
            onPointerUp: () => {
                this.onPointerUp.trigger([direction]);
            }
        });
    }
    resizeBottom() {
        if (!this.bottom) {
            return;
        }
        let height;
        let startY;
        let direction = Components.ResizeDirection.Bottom;
        new Aventus.DragAndDrop({
            element: this.bottom,
            applyDrag: false,
            offsetDrag: 0,
            onPointerDown: () => {
                this.onPointerDown.trigger([direction]);
            },
            onStart: (e) => {
                height = this.target.offsetHeight;
                startY = e.pageY;
                this.onStart.trigger([direction]);
            },
            onMove: (e) => {
                let transform = this.transformHeight(height + (e.pageY - startY));
                if (!transform.outbound) {
                    this.target.style.height = transform.h + "px";
                    this.onMove.trigger([direction]);
                }
            },
            onStop: () => {
                this.onStop.trigger([direction]);
            },
            onPointerUp: () => {
                this.onPointerUp.trigger([direction]);
            }
        });
    }
    resizeBottomLeft() {
        if (!this.bottom_left) {
            return;
        }
        let height;
        let width;
        let left;
        let startX;
        let startY;
        let direction = Components.ResizeDirection.BottomLeft;
        new Aventus.DragAndDrop({
            element: this.bottom_left,
            applyDrag: false,
            offsetDrag: 0,
            onPointerDown: () => {
                this.onPointerDown.trigger([direction]);
            },
            onStart: (e) => {
                height = this.target.offsetHeight;
                startY = e.pageY;
                width = this.target.offsetWidth;
                left = this.target.offsetLeft;
                startX = e.pageX;
                this.onStart.trigger([direction]);
            },
            onMove: (e) => {
                let transformH = this.transformHeight(height + (e.pageY - startY));
                if (!transformH.outbound) {
                    this.target.style.height = transformH.h + "px";
                }
                let transformW = this.transformWidth(width - (e.pageX - startX));
                if (!transformW.outbound) {
                    this.target.style.width = transformW.w + "px";
                    this.target.style.left = left + (e.pageX - startX) + "px";
                }
                if (!transformH.outbound || !transformW.outbound) {
                    this.onMove.trigger([direction]);
                }
            },
            onStop: () => {
                this.onStop.trigger([direction]);
            },
            onPointerUp: () => {
                this.onPointerUp.trigger([direction]);
            }
        });
    }
    resizeBottomRight() {
        if (!this.bottom_right) {
            return;
        }
        let height;
        let width;
        let startX;
        let startY;
        let direction = Components.ResizeDirection.BottomRight;
        new Aventus.DragAndDrop({
            element: this.bottom_right,
            applyDrag: false,
            offsetDrag: 0,
            onPointerDown: () => {
                this.onPointerDown.trigger([direction]);
            },
            onStart: (e) => {
                height = this.target.offsetHeight;
                startY = e.pageY;
                width = this.target.offsetWidth;
                startX = e.pageX;
                this.onStart.trigger([direction]);
            },
            onMove: (e) => {
                let transformH = this.transformHeight(height + (e.pageY - startY));
                if (!transformH.outbound) {
                    this.target.style.height = transformH.h + "px";
                }
                let transformW = this.transformWidth(width + (e.pageX - startX));
                if (!transformW.outbound) {
                    this.target.style.width = transformW.w + "px";
                }
                if (!transformW.outbound || !transformH.outbound) {
                    this.onMove.trigger([direction]);
                }
            },
            onStop: () => {
                this.onStop.trigger([direction]);
            },
            onPointerUp: () => {
                this.onPointerUp.trigger([direction]);
            }
        });
    }
    resizeTop() {
        if (!this.top) {
            return;
        }
        let height;
        let top;
        let startY;
        let direction = Components.ResizeDirection.Top;
        new Aventus.DragAndDrop({
            element: this.top,
            applyDrag: false,
            offsetDrag: 0,
            onPointerDown: () => {
                this.onPointerDown.trigger([direction]);
            },
            onStart: (e) => {
                height = this.target.offsetHeight;
                top = this.target.offsetTop;
                startY = e.pageY;
                this.onStart.trigger([direction]);
            },
            onMove: (e) => {
                let transformH = this.transformHeight(height - (e.pageY - startY));
                if (!transformH.outbound) {
                    this.target.style.height = transformH.h + "px";
                    this.target.style.top = top + (e.pageY - startY) + "px";
                    this.onMove.trigger([direction]);
                }
            },
            onStop: () => {
                this.onStop.trigger([direction]);
            },
            onPointerUp: () => {
                this.onPointerUp.trigger([direction]);
            }
        });
    }
    resizeTopLeft() {
        if (!this.top_left) {
            return;
        }
        let height;
        let top;
        let width;
        let left;
        let startX;
        let startY;
        let direction = Components.ResizeDirection.TopLeft;
        new Aventus.DragAndDrop({
            element: this.top_left,
            applyDrag: false,
            offsetDrag: 0,
            onPointerDown: () => {
                this.onPointerDown.trigger([direction]);
            },
            onStart: (e) => {
                height = this.target.offsetHeight;
                top = this.target.offsetTop;
                startY = e.pageY;
                width = this.target.offsetWidth;
                left = this.target.offsetLeft;
                startX = e.pageX;
                this.onStart.trigger([direction]);
            },
            onMove: (e) => {
                let transformH = this.transformHeight(height - (e.pageY - startY));
                if (!transformH.outbound) {
                    this.target.style.height = transformH.h + "px";
                    this.target.style.top = top + (e.pageY - startY) + "px";
                }
                let transformW = this.transformWidth(width - (e.pageX - startX));
                if (!transformW.outbound) {
                    this.target.style.width = transformW.w + "px";
                    this.target.style.left = left + (e.pageX - startX) + "px";
                }
                if (!transformH.outbound || !transformW.outbound) {
                    this.onMove.trigger([direction]);
                }
            },
            onStop: () => {
                this.onStop.trigger([direction]);
            },
            onPointerUp: () => {
                this.onPointerUp.trigger([direction]);
            }
        });
    }
    resizeTopRight() {
        if (!this.top_right) {
            return;
        }
        let height;
        let top;
        let width;
        let startX;
        let startY;
        let direction = Components.ResizeDirection.TopRight;
        new Aventus.DragAndDrop({
            element: this.top_right,
            applyDrag: false,
            offsetDrag: 0,
            onPointerDown: () => {
                this.onPointerDown.trigger([direction]);
            },
            onStart: (e) => {
                height = this.target.offsetHeight;
                top = this.target.offsetTop;
                startY = e.pageY;
                width = this.target.offsetWidth;
                startX = e.pageX;
                this.onStart.trigger([direction]);
            },
            onMove: (e) => {
                let transformH = this.transformHeight(height - (e.pageY - startY));
                if (!transformH.outbound) {
                    this.target.style.height = transformH.h + "px";
                    this.target.style.top = top + (e.pageY - startY) + "px";
                }
                let transformW = this.transformWidth(width + (e.pageX - startX));
                if (!transformW.outbound) {
                    this.target.style.width = transformW.w + "px";
                }
                if (!transformH.outbound || !transformW.outbound) {
                    this.onMove.trigger([direction]);
                }
            },
            onStop: () => {
                this.onStop.trigger([direction]);
            },
            onPointerUp: () => {
                this.onPointerUp.trigger([direction]);
            }
        });
    }
    init(target) {
        this._target = target;
        this.resizeRight();
        this.resizeLeft();
        this.resizeBottom();
        this.resizeTop();
        this.resizeTopLeft();
        this.resizeTopRight();
        this.resizeBottomLeft();
        this.resizeBottomRight();
    }
}
Components.Resize.Namespace=`${moduleName}.Components`;
Components.Resize.Tag=`rk-resize`;
_.Components.Resize=Components.Resize;
if(!window.customElements.get('rk-resize')){window.customElements.define('rk-resize', Components.Resize);Aventus.WebComponentInstance.registerDefinition(Components.Resize);}

Lib.ApplicationEmptyState=class ApplicationEmptyState extends Lib.ApplicationState {
    localName;
    constructor(stateName) {
        super();
        this.localName = stateName;
    }
    /**
     * @inheritdoc
     */
    get name() {
        return this.localName;
    }
}
Lib.ApplicationEmptyState.Namespace=`${moduleName}.Lib`;Aventus.Converter.register(Lib.ApplicationEmptyState.Fullname, Lib.ApplicationEmptyState);
_.Lib.ApplicationEmptyState=Lib.ApplicationEmptyState;
Lib.ApplicationStateManager=class ApplicationStateManager extends Aventus.StateManager {
    save;
    constructor(save) {
        super();
        this.save = save;
    }
    assignDefaultState(stateName) {
        let el = new Lib.ApplicationEmptyState(stateName);
        el.setManager(this);
        return el;
    }
    setState(state) {
        if (state instanceof Lib.ApplicationState) {
            state.setManager(this);
        }
        return super.setState(state);
    }
}
Lib.ApplicationStateManager.Namespace=`${moduleName}.Lib`;
_.Lib.ApplicationStateManager=Lib.ApplicationStateManager;
System.ApplicationHistoryConvert=class ApplicationHistoryConvert extends Aventus.ConverterTransform {
    manager;
    constructor(manager) {
        super();
        this.manager = manager;
    }
    beforeTransformObject(obj) {
        if (obj instanceof Lib.ApplicationState) {
            obj.setManager(this.manager);
            obj.disableSaveState();
        }
    }
    afterTransformObject(obj) {
        if (obj instanceof Lib.ApplicationState) {
            obj.enableSaveState();
        }
    }
}
System.ApplicationHistoryConvert.Namespace=`${moduleName}.System`;
_.System.ApplicationHistoryConvert=System.ApplicationHistoryConvert;
System.ApplicationHistory=class ApplicationHistory {
    static Fullname = "Core.System.ApplicationHistory";
    $type = System.ApplicationHistory.Fullname;
    memory = [];
    currentPosition = -1;
    push(history) {
        if (this.currentPosition != this.memory.length - 1) {
            let nb = this.memory.length - (this.currentPosition + 1);
            this.memory.splice(this.currentPosition + 1, nb);
        }
        this.memory.push(history);
        this.currentPosition = this.memory.length - 1;
    }
    replace(history) {
        if (this.memory.length == 0) {
            this.memory.push(history);
            return;
        }
        const last = this.memory.length - 1;
        this.memory.splice(last, 1, history);
    }
    replaceAt(history, index) {
        if (this.memory.length <= index) {
            throw "index is too short";
        }
        this.memory.splice(index - 1, 1, history);
    }
    clear() {
        if (this.memory.length == 0) {
            return;
        }
        const last = this.memory.length - 1;
        const lastHistory = this.memory[last];
        this.memory = [lastHistory];
    }
    next() {
        if (this.nextAvailable) {
            this.currentPosition++;
            return this.memory[this.currentPosition];
        }
        return null;
    }
    current() {
        return this.memory[this.currentPosition];
    }
    get nextAvailable() {
        return this.currentPosition < this.memory.length - 1;
    }
    previous() {
        if (this.previousAvailable) {
            this.currentPosition--;
            return this.memory[this.currentPosition];
        }
        return null;
    }
    get previousAvailable() {
        return this.currentPosition > 0;
    }
    toText() {
        let txt = JSON.stringify(this);
        return txt;
    }
    static fromText(manager, txt) {
        if (!txt) {
            return new System.ApplicationHistory();
        }
        try {
            const converter = new System.ApplicationHistoryConvert(manager);
            return Aventus.Converter.transform(JSON.parse(txt), converter);
        }
        catch (e) {
        }
        return new System.ApplicationHistory();
    }
}
System.ApplicationHistory.Namespace=`${moduleName}.System`;Aventus.Converter.register(System.ApplicationHistory.Fullname, System.ApplicationHistory);
_.System.ApplicationHistory=System.ApplicationHistory;
System.ApplicationSizeStorage=class ApplicationSizeStorage {
    memoryPrefered = {};
    memory = {};
    keyPrefered = "ApplicationSizeStoragePrefered";
    keySave = "ApplicationSizeStorage";
    constructor() {
        this.memoryPrefered = JSON.parse(sessionStorage.getItem(this.keyPrefered) ?? "{}");
        this.memory = JSON.parse(sessionStorage.getItem(this.keySave) ?? "{}");
    }
    getInfoPrefered(appName) {
        return this.memoryPrefered[appName];
    }
    setInfoPrefered(appName, value) {
        this.memoryPrefered[appName] = value;
        sessionStorage.setItem(this.keyPrefered, JSON.stringify(this.memoryPrefered));
    }
    getInfo(desktopId, appName, appNumber) {
        const key = this.getKey(desktopId, appName, appNumber);
        return this.memory[key];
    }
    setInfo(desktopId, appName, appNumber, value) {
        const key = this.getKey(desktopId, appName, appNumber);
        this.memory[key] = value;
        sessionStorage.setItem(this.keySave, JSON.stringify(this.memory));
    }
    removeInfo(desktopId, appName, appNumber) {
        const key = this.getKey(desktopId, appName, appNumber);
        delete this.memory[key];
    }
    clearAll() {
        this.memory = {};
        sessionStorage.setItem(this.keySave, JSON.stringify(this.memory));
    }
    getKey(desktopId, appName, appNumber) {
        return desktopId + ":" + appName + "$" + appNumber;
    }
}
System.ApplicationSizeStorage.Namespace=`${moduleName}.System`;
System.ApplicationSize=class ApplicationSize {
    application;
    storage;
    constructor(application) {
        this.application = application;
        this.storage = Aventus.Instance.get(System.ApplicationSizeStorage);
    }
    load() {
        const cst = this.application.constructor;
        let desktopId = this.application.options?.desktopId ?? 0;
        let applicationNumber = this.application.options?.applicationNumber ?? 0;
        let info = this.storage.getInfo(desktopId, cst.Fullname, applicationNumber);
        if (!info) {
            return this.getPrefered();
        }
        return info;
    }
    save() {
        if (!this.application.isReady)
            return;
        const cst = this.application.constructor;
        let desktopId = this.application.options?.desktopId ?? 0;
        let applicationNumber = this.application.options?.applicationNumber ?? 0;
        let info;
        if (this.application.full) {
            let oldValues = this.load();
            info = {
                isFullScreen: true,
                height: oldValues.height,
                width: oldValues.width,
                left: oldValues.left,
                top: oldValues.top
            };
        }
        else {
            if (this.application.offsetHeight == 0 || this.application.offsetWidth == 0) {
                return;
            }
            info = {
                isFullScreen: false,
                height: this.application.offsetHeight,
                width: this.application.offsetWidth,
                left: this.application.offsetLeft,
                top: this.application.offsetTop
            };
        }
        this.storage.setInfo(desktopId, cst.Fullname, applicationNumber, info);
        this.storage.setInfoPrefered(cst.Fullname, info);
    }
    remove() {
        const cst = this.application.constructor;
        let desktopId = this.application.options?.desktopId ?? 0;
        let applicationNumber = this.application.options?.applicationNumber ?? 0;
        this.storage.removeInfo(desktopId, cst.Fullname, applicationNumber);
    }
    getPrefered() {
        const cst = this.application.constructor;
        const info = this.storage.getInfoPrefered(cst.Fullname);
        if (!info) {
            return System.ApplicationSize.getBasicSize();
        }
        return info;
    }
    static getBasicSize() {
        let height = document.body.offsetHeight * 0.8;
        if (height < 500) {
            height = document.body.offsetHeight;
        }
        let width = height / 5 * 8;
        if (width > document.body.offsetWidth) {
            width = document.body.offsetWidth;
        }
        let top = (document.body.offsetHeight - height) / 2 - 40;
        if (top < 0) {
            top = 0;
        }
        let left = (document.body.offsetWidth - width) / 2;
        if (left < 0) {
            left = 0;
        }
        return {
            isFullScreen: false,
            height,
            width,
            top, left
        };
    }
}
System.ApplicationSize.Namespace=`${moduleName}.System`;
_.System.ApplicationSize=System.ApplicationSize;
Websocket.Routes.ApplicationRouter=class ApplicationRouter extends AventusSharp.WebSocket.Route {
    events;
    constructor(endpoint) {
        super(endpoint);
        this.events = {
            GetAll2: new Websocket.Routes.ApplicationRouter_GetAll2(endpoint),
            GetAll3: new Websocket.Routes.ApplicationRouter_GetAll3(endpoint),
        };
    }
    async GetAll2(options = {}) {
        const info = {
            channel: `/application2`,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async GetAll3(body, options = {}) {
        const info = {
            channel: `/application3`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    GetAll4(options = {}) {
        const info = {
            channel: `/application4`,
            ...options,
        };
        return this.endpoint.sendMessage(info);
    }
    async GetAll5(options = {}) {
        const info = {
            channel: `/getall5`,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
}
Websocket.Routes.ApplicationRouter.Namespace=`${moduleName}.Websocket.Routes`;
_.Websocket.Routes.ApplicationRouter=Websocket.Routes.ApplicationRouter;
Websocket.Routes.DesktopRouter=class DesktopRouter extends AventusSharp.WebSocket.Route {
    events;
    constructor(endpoint) {
        super(endpoint);
        this.events = {
            RegisterOpenApp: new Websocket.Routes.DesktopRouter_RegisterOpenApp(endpoint),
            RemoveApp: new Websocket.Routes.DesktopRouter_RemoveApp(endpoint),
            SetDesktopIcon: new Websocket.Routes.DesktopRouter_SetDesktopIcon(endpoint),
            RemoveDesktopIcon: new Websocket.Routes.DesktopRouter_RemoveDesktopIcon(endpoint),
        };
    }
    async RegisterOpenApp(body, options = {}) {
        const info = {
            channel: `/desktop/RegisterOpenApp`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async RemoveApp(body, options = {}) {
        const info = {
            channel: `/desktop/RemoveApp`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async SetDesktopIcon(body, options = {}) {
        const info = {
            channel: `/desktop/SetDesktopIcon`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async RemoveDesktopIcon(body, options = {}) {
        const info = {
            channel: `/desktop/RemoveDesktopIcon`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
}
Websocket.Routes.DesktopRouter.Namespace=`${moduleName}.Websocket.Routes`;
_.Websocket.Routes.DesktopRouter=Websocket.Routes.DesktopRouter;
Websocket.MainEndPointRoutes= [
    { type: Websocket.Routes.ApplicationRouter, path: "application" },
    { type: Websocket.Routes.DesktopRouter, path: "desktop" },
];

_.Websocket.MainEndPointRoutes=Websocket.MainEndPointRoutes;
Websocket.MainEndPointEvents= [
    { type: Websocket.Events.ApplicationTestEvent, path: "application.ApplicationTestEvent" },
    { type: Websocket.Events.ApplicationTestEvent2, path: "ApplicationTestEvent2" },
];

_.Websocket.MainEndPointEvents=Websocket.MainEndPointEvents;
Websocket.endPointInfo= {
    routes: Websocket.MainEndPointRoutes,
    events: Websocket.MainEndPointEvents
};

Websocket.MainEndPoint=class MainEndPoint extends AventusSharp.WebSocket.EndPoint.With(Websocket.endPointInfo) {
    get path() {
        return "/ws";
    }
}
Websocket.MainEndPoint.Namespace=`${moduleName}.Websocket`;
_.Websocket.MainEndPoint=Websocket.MainEndPoint;
Lib.MainSocket=class MainSocket extends Websocket.MainEndPoint {
    static _instance;
    static get instance() {
        return this._instance;
    }
    static async open() {
        if (!this._instance) {
            this._instance = new Lib.MainSocket();
        }
        await this._instance.open();
    }
    configure(options) {
        options = super.configure(options);
        options.log = true;
        return options;
    }
}
Lib.MainSocket.Namespace=`${moduleName}.Lib`;
_.Lib.MainSocket=Lib.MainSocket;
Lib.ApplicationManager=class ApplicationManager {
    static waitingDelay = 1000;
    static waitings = {};
    static processing = {};
    static mutex = new Aventus.Mutex();
    static openApplications = {};
    static openApplicationsKey = "openApplications";
    static async save(appInfo) {
        if (System.Os.instance.activeDesktop.data.SyncDesktop) {
            await this.uniqueAction(appInfo, async (appInfo) => {
                await Lib.MainSocket.instance.routes.desktop.RegisterOpenApp({
                    appInfo
                });
            });
        }
        else {
            const { DesktopId, Info } = appInfo;
            if (!this.openApplications[DesktopId]) {
                this.openApplications[DesktopId] = [];
            }
            let mustAdd = true;
            for (let i = 0; i < this.openApplications[DesktopId].length; i++) {
                let current = this.openApplications[DesktopId][i];
                if (current.id == Info.id) {
                    this.openApplications[DesktopId][i] = Info;
                    mustAdd = false;
                    break;
                }
            }
            if (mustAdd) {
                this.openApplications[DesktopId].push(Info);
            }
            sessionStorage.setItem(this.openApplicationsKey, JSON.stringify(this.openApplications));
        }
    }
    static async remove(appInfo) {
        if (System.Os.instance.activeDesktop.data.SyncDesktop) {
            await this.uniqueAction(appInfo, async (appInfo) => {
                await Lib.MainSocket.instance.routes.desktop.RemoveApp({
                    appInfo
                });
            });
        }
        else {
            const { DesktopId, Info } = appInfo;
            if (!this.openApplications[DesktopId]) {
                return;
            }
            for (let i = 0; i < this.openApplications[DesktopId].length; i++) {
                let current = this.openApplications[DesktopId][i];
                if (current.id == Info.id) {
                    this.openApplications[DesktopId].splice(i, 1);
                    if (this.openApplications[DesktopId].length == 0) {
                        delete this.openApplications[DesktopId];
                    }
                    sessionStorage.setItem(this.openApplicationsKey, JSON.stringify(this.openApplications));
                    return;
                }
            }
        }
    }
    static getOpenApps(desktopId) {
        return this.openApplications[desktopId] ?? [];
    }
    static uniqueAction(appInfo, action) {
        this.mutex.safeRun(() => {
            let key = this.getKey(appInfo);
            if (this.waitings[key]) {
                clearTimeout(this.waitings[key].timeout);
            }
            if (this.processing[key]) {
                this.waitings[key] = {
                    data: appInfo,
                    timeout: 0
                };
                return;
            }
            this.waitings[key] = {
                data: appInfo,
                timeout: setTimeout(async () => {
                    let appInfo;
                    await this.mutex.safeRun(() => {
                        appInfo = this.waitings[key].data;
                        this.processing[key] = true;
                        delete this.waitings[key];
                    });
                    await action(appInfo);
                    await this.mutex.safeRun(() => {
                        delete this.processing[key];
                    });
                    if (this.waitings[key]) {
                        this.save(this.waitings[key].data);
                    }
                }, Lib.ApplicationManager.waitingDelay)
            };
        });
    }
    static reloadData() {
        let savedValues = sessionStorage.getItem(this.openApplicationsKey) ?? '[]';
        this.openApplications = Aventus.Converter.transform(JSON.parse(savedValues));
    }
    static init() {
        this.onRegisterInfo = this.onRegisterInfo.bind(this);
        this.onRemoveApp = this.onRemoveApp.bind(this);
        Lib.MainSocket.instance.routes.desktop.events.RegisterOpenApp.onTrigger.add(this.onRegisterInfo);
        Lib.MainSocket.instance.routes.desktop.events.RemoveApp.onTrigger.add(this.onRemoveApp);
    }
    static async onRegisterInfo(item, params) {
        let key = this.getKey(item);
        if (this.processing[key]) {
            return;
        }
        if (!item.Info) {
            return;
        }
        let info = item.Info;
        if (info.number === undefined || info.history === undefined) {
            return;
        }
        for (let desktopEl of System.Os.instance.desktopsEl) {
            if (desktopEl.desktop_id == item.DesktopId) {
                let found = false;
                for (let appName in desktopEl.applications) {
                    if (appName == info.applicationName) {
                        let app = desktopEl.applications[appName][info.number];
                        if (app) {
                            found = true;
                            app.setHistory(System.ApplicationHistory.fromText(app.navigator, info.history));
                            app.is_hidden = info.isHidden ?? false;
                            break;
                        }
                    }
                }
                if (!found) {
                    this.processing[key] = true;
                    await desktopEl.recreateApplication(info);
                    delete this.processing[key];
                }
            }
        }
    }
    static async onRemoveApp(item, params) {
        if (!item.Info) {
            return;
        }
        let info = item.Info;
        if (info.number === undefined || info.history === undefined) {
            return;
        }
        for (let desktopEl of System.Os.instance.desktopsEl) {
            if (desktopEl.desktop_id == item.DesktopId) {
                for (let appName in desktopEl.applications) {
                    if (appName == info.applicationName) {
                        let app = desktopEl.applications[appName][info.number];
                        app.mustRemoveApplicationHistory = false;
                        app.kill();
                        if (app) {
                            break;
                        }
                    }
                }
            }
        }
    }
    static getKey(appInfo) {
        return appInfo.DesktopId + ":" + appInfo.Info?.applicationName + "$" + appInfo.Info?.number;
    }
}
Lib.ApplicationManager.Namespace=`${moduleName}.Lib`;
_.Lib.ApplicationManager=Lib.ApplicationManager;
System.Application = class Application extends Aventus.WebComponent {
    static get observedAttributes() {return ["app_title", "full", "is_hidden"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'moving'() { return this.getBoolAttr('moving') }
    set 'moving'(val) { this.setBoolAttr('moving', val) }get 'is_active'() { return this.getBoolAttr('is_active') }
    set 'is_active'(val) { this.setBoolAttr('is_active', val) }get 'loading'() { return this.getBoolAttr('loading') }
    set 'loading'(val) { this.setBoolAttr('loading', val) }    get 'app_title'() { return this.getStringProp('app_title') }
    set 'app_title'(val) { this.setStringAttr('app_title', val) }get 'full'() { return this.getBoolProp('full') }
    set 'full'(val) { this.setBoolAttr('full', val) }get 'is_hidden'() { return this.getBoolProp('is_hidden') }
    set 'is_hidden'(val) { this.setBoolAttr('is_hidden', val) }    static activeApplication = null;
    oldFrame;
    allRoutes = {};
    activePath = "";
    showPageMutex = new Aventus.Mutex();
    router;
    options;
    history;
    mustRemoveApplicationHistory = true;
    oneStateActive = false;
    page404;
    sizeManager;
    isAnimating = false;
    afterTransitionCb = [];
    get navigator() {
        if (!this.router) {
            this.router = new Lib.ApplicationStateManager(this.saveApplicationHistory);
        }
        return this.router;
    }
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("full", ((target) => {
    target.saveSize();
}));this.__addPropertyActions("is_hidden", ((target) => {
    target.onIsHiddenChange();
})); }
    static __style = `:host{--internal-application-box-shadow: var(--application-box-shadow);--internal-application-header-background-color: var(--application-header-background-color, var(--darker-active))}:host{background-color:var(--primary-color-opacity);border-radius:10px;box-shadow:var(--internal-application-box-shadow);container-name:application;container-type:inline-size;outline:none;position:absolute;z-index:50}:host .header{align-items:center;border-top-left-radius:10px;border-top-right-radius:10px;cursor:grab;display:flex;height:30px;overflow:hidden;position:relative;width:100%;z-index:3}:host .header .background{background-color:var(--internal-application-header-background-color);inset:0;position:absolute;z-index:1}:host .header .navigation-actions{align-items:center;display:flex;height:100%;margin-left:15px;margin-right:15px;z-index:2}:host .header .navigation-actions .action{border-radius:2px;height:calc(100% - 6px);padding:0px;padding:1px 5px;transition:background-color var(--bezier-curve) .2s;width:22px}:host .header .navigation-actions .action rk-img{height:100%;width:100%}:host .header .navigation-actions .action.disable rk-img{--img-fill-color: var(--text-disable)}:host .header .title{flex-grow:1;margin-right:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;z-index:2}:host .header .application-actions{align-items:center;display:flex;gap:5px;justify-content:end;margin-right:15px;z-index:2}:host .header .application-actions .btn{border-radius:10px;height:15px;width:15px}:host .content{border-bottom-left-radius:10px;border-bottom-right-radius:10px;height:calc(100% - 35px);margin:5px;margin-top:0;overflow:hidden;width:calc(100% - 10px);z-index:1}:host .loading{display:none;z-index:10}:host rk-resize{--resize-z-index: 4}:host(:not([moving])){transition:height .5s var(--bezier-curve),width .5s var(--bezier-curve),top .5s var(--bezier-curve),left .5s var(--bezier-curve),border-radius .5s var(--bezier-curve),opacity var(--bezier-curve) .5s,visibility var(--bezier-curve) .5s}:host(:not([moving])) .header{transition:border-radius .5s var(--bezier-curve)}:host([moving]) .header{cursor:grabbing}:host([full]){border-radius:0;height:100% !important;left:0 !important;top:0 !important;width:100% !important;z-index:500}:host([full]) .header{border-top-left-radius:0;border-top-right-radius:0;cursor:default}:host([full]) .content{border-bottom-left-radius:0;border-bottom-right-radius:0}:host([is_active]){z-index:501}:host([is_hidden]){height:0 !important;left:calc(50% - 100px) !important;overflow:hidden;top:calc(100% - 50px) !important;width:200px !important}:host([loading]) .loading{display:flex}@media screen and (min-width: 1225px){:host .header .navigation-actions .action:not(.disable):hover{background-color:var(--lighter)}:host .header .application-actions .btn:hover{box-shadow:0 0 4px var(--darker-active) inset}}@media screen and (max-width: 768px){:host{border-radius:0;height:100% !important;left:0 !important;top:0 !important;width:100% !important;z-index:502}:host .header{height:40px}:host .header .application-actions{gap:10px}:host .header .application-actions .btn{height:20px;width:20px}:host .header .application-actions .orange{display:none}:host .content{height:calc(100% - 45px)}:host rk-resize{display:none}:host([is_hidden]){left:0 !important;width:100% !important}}`;
    constructor() {
            super();
            this.history = new System.ApplicationHistory();
            this.sizeManager = new System.ApplicationSize(this);
if (this.constructor == Application) { throw "can't instanciate an abstract class"; } this.validError404=this.validError404.bind(this)this.saveApplicationHistory=this.saveApplicationHistory.bind(this)this.onResizeStart=this.onResizeStart.bind(this)this.onResizeStop=this.onResizeStop.bind(this) }
    __getStatic() {
        return Application;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Application.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="header" _id="application_0">    <div class="background"></div>    <div class="navigation-actions">        <div class="previous action touch disable" _id="application_1">            <rk-img src="/img/icons/angle-left.svg"></rk-img>        </div>        <div class="next action touch disable" _id="application_2">            <rk-img src="/img/icons/angle-right.svg"></rk-img>        </div>    </div>    <div class="title" _id="application_3"></div>    <div class="application-actions">        <div class="btn green touch" _id="application_4"></div>        <div class="btn orange touch" _id="application_5"></div>        <div class="btn red touch" _id="application_6"></div>    </div></div><div class="content" _id="application_7"></div><rk-resize min_width="200" min_height="200" _id="application_8"></rk-resize><rk-loading class="loading"></rk-loading><slot></slot>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "header",
      "ids": [
        "application_0"
      ]
    },
    {
      "name": "navigatePreviousEl",
      "ids": [
        "application_1"
      ]
    },
    {
      "name": "navigateNextEl",
      "ids": [
        "application_2"
      ]
    },
    {
      "name": "contentEl",
      "ids": [
        "application_7"
      ]
    },
    {
      "name": "resizeEl",
      "ids": [
        "application_8"
      ]
    }
  ],
  "content": {
    "application_3°@HTML": {
      "fct": (c) => `${c.print(c.comp.__b8adb9845de45194ca3aae9322a8888cmethod0())}`,
      "once": true
    }
  },
  "pressEvents": [
    {
      "id": "application_1",
      "onPress": (e, pressInstance, c) => { c.comp.navigatePrevious(e, pressInstance); }
    },
    {
      "id": "application_2",
      "onPress": (e, pressInstance, c) => { c.comp.navigateNext(e, pressInstance); }
    },
    {
      "id": "application_4",
      "onPress": (e, pressInstance, c) => { c.comp.hide(e, pressInstance); }
    },
    {
      "id": "application_5",
      "onPress": (e, pressInstance, c) => { c.comp.toggleFull(e, pressInstance); }
    },
    {
      "id": "application_6",
      "onPress": (e, pressInstance, c) => { c.comp.kill(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "Application";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('moving')) { this.attributeChangedCallback('moving', false, false); }if(!this.hasAttribute('is_active')) { this.attributeChangedCallback('is_active', false, false); }if(!this.hasAttribute('loading')) { this.attributeChangedCallback('loading', false, false); }if(!this.hasAttribute('app_title')){ this['app_title'] = "Page title"; }if(!this.hasAttribute('full')) { this.attributeChangedCallback('full', false, false); }if(!this.hasAttribute('is_hidden')) { this.attributeChangedCallback('is_hidden', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('moving');this.__upgradeProperty('is_active');this.__upgradeProperty('loading');this.__upgradeProperty('app_title');this.__upgradeProperty('full');this.__upgradeProperty('is_hidden'); }
    __listBoolProps() { return ["moving","is_active","loading","full","is_hidden"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    static setActive(app) {
        if (this.activeApplication == app) {
            return;
        }
        if (this.activeApplication) {
            this.activeApplication.is_active = false;
        }
        if (app) {
            app.is_active = true;
        }
        this.activeApplication = app;
    }
    onContextMenu(contextMenu, stop) {
        stop();
    }
    async navigate(to) {
        let hasChanged = await this.navigator.setState(to);
        let state = this.navigator.getState();
        if (state) {
            this.history.push({
                state: state
            });
            this.checkNavigationState();
            this.saveApplicationHistory();
        }
        return hasChanged;
    }
    addRouteAsync(options) {
        this.allRoutes[options.route] = options;
    }
    addRoute(route, elementCtr) {
        this.allRoutes[route] = {
            route: route,
            scriptUrl: '',
            render: () => elementCtr
        };
    }
    register() {
        try {
            this.defineRoutes();
            this.navigator.onAfterStateChanged(this.validError404);
            for (let key in this.allRoutes) {
                this.initRoute(key);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    initRoute(path) {
        let element;
        let allRoutes = this.allRoutes;
        this.navigator.subscribe(path, {
            active: (currentState) => {
                this.oneStateActive = true;
                this.showPageMutex.safeRunLastAsync(async () => {
                    try {
                        if (!element) {
                            let options = allRoutes[path];
                            if (options.scriptUrl != "") {
                                await Aventus.ResourceLoader.loadInHead(options.scriptUrl);
                            }
                            let cst = options.render();
                            element = new cst;
                            element.application = this;
                            this.contentEl?.appendChild(element);
                        }
                        if (this.oldFrame && this.oldFrame != element) {
                            await this.oldFrame.hide();
                        }
                        let oldPage = this.oldFrame;
                        let oldUrl = this.activePath;
                        await element.show();
                        this.oldFrame = element;
                        this.activePath = path;
                        this.app_title = element.pageTitle();
                        this.onNewPage(oldUrl, oldPage, path, element);
                    }
                    catch (e) {
                        console.error(e);
                    }
                });
            },
            inactive: () => {
                this.oneStateActive = false;
            }
        });
    }
    async validError404() {
        if (!this.oneStateActive) {
            let frameError = this.error404(this.navigator.getState());
            if (!this.page404) {
                this.page404 = new frameError();
                this.page404.application = this;
                this.contentEl.appendChild(this.page404);
            }
            if (this.oldFrame && this.oldFrame != this.page404) {
                await this.oldFrame.hide();
            }
            await this.page404.show();
            this.oldFrame = this.page404;
            this.activePath = '';
        }
    }
    error404(state) {
        return System.Frame404;
    }
    onNewPage(oldUrl, oldFrame, newUrl, newFrame) { }
    getSlugs() {
        return this.navigator.getStateSlugs(this.activePath);
    }
    checkNavigationState() {
        if (this.history.previousAvailable) {
            this.navigatePreviousEl.classList.remove("disable");
        }
        else {
            this.navigatePreviousEl.classList.add("disable");
        }
        if (this.history.nextAvailable) {
            this.navigateNextEl.classList.remove("disable");
        }
        else {
            this.navigateNextEl.classList.add("disable");
        }
    }
    async navigatePrevious() {
        let history = this.history.previous();
        if (history) {
            await this.navigator.setState(history.state);
            this.checkNavigationState();
            this.saveApplicationHistory();
        }
    }
    async navigateNext() {
        let history = this.history.next();
        if (history) {
            await this.navigator.setState(history.state);
            this.checkNavigationState();
            this.saveApplicationHistory();
        }
    }
    subscribeNavigationChange(statePatterns, callbacks) {
        this.navigator.subscribe(statePatterns, callbacks);
    }
    unsubscribeNavigationChange(statePatterns, callbacks) {
        this.navigator.unsubscribe(statePatterns, callbacks);
    }
    async setHistory(history) {
        this.history = history;
        let current = this.history.current();
        if (current) {
            if (this.navigator.isStateActive(current.state.name)) {
                let state = this.navigator.getState();
                if (state?.constructor == current.state.constructor && state instanceof Lib.ApplicationState && current.state instanceof Lib.ApplicationState) {
                    state.disableSaveState();
                    state.copyValues(current.state);
                    this.history.replace({ state });
                    state.enableSaveState();
                }
                else {
                    await this.navigator.setState("");
                    await this.navigator.setState(current.state);
                }
            }
            else {
                await this.navigator.setState(current.state);
            }
            this.checkNavigationState();
        }
    }
    async saveApplicationHistory() {
        if (!this.options) {
            return;
        }
        let app = new Data.ApplicationOpen();
        app.applicationName = this.$type;
        app.number = Number(this.options.applicationNumber);
        app.history = this.history.toText();
        app.isHidden = this.is_hidden;
        let appInfo = new Data.ApplicationOpenInfo();
        appInfo.DesktopId = this.options.desktopId;
        appInfo.Info = app;
        await Lib.ApplicationManager.save(appInfo);
    }
    async removeApplicationHistory() {
        if (!this.options) {
            return;
        }
        if (!this.mustRemoveApplicationHistory) {
            return;
        }
        let app = new Data.ApplicationOpen();
        app.applicationName = this.$type;
        app.number = Number(this.options.applicationNumber);
        app.isHidden = this.is_hidden;
        app.history = '{}';
        let appInfo = new Data.ApplicationOpenInfo();
        appInfo.DesktopId = this.options.desktopId;
        appInfo.Info = app;
        await Lib.ApplicationManager.remove(appInfo);
    }
    onResizeStart(direction) {
        this.moving = true;
    }
    onResizeStop(direction) {
        this.moving = false;
        this.saveSize();
    }
    onIsHiddenChange() {
        if (!this.checkIfSizeCorrect()) {
            this.resetSize();
        }
    }
    saveSize() {
        this.afterTransition(() => {
            this.sizeManager.save();
        });
    }
    resetSize() {
        this.setSizeInfo(System.ApplicationSize.getBasicSize());
        this.saveSize();
    }
    checkIfSizeCorrect() {
        if (this.is_hidden) {
            return true;
        }
        let stylePart = {};
        let style = this.getAttribute("style")?.split(";");
        if (style) {
            for (let part of style) {
                part = part.trim();
                if (part != "") {
                    let splitted = part.split(":");
                    stylePart[splitted[0]] = splitted[1].trim();
                }
            }
        }
        let left = Number(stylePart.left?.replace("px", ""));
        let width = Number(stylePart.width?.replace("px", ""));
        let top = Number(stylePart.top?.replace("px", ""));
        let height = Number(stylePart.height?.replace("px", ""));
        let frameRect = {
            x1: left,
            x2: left + width,
            y1: top,
            y2: top + height
        };
        let bodyRect = {
            x1: 0,
            x2: document.body.offsetWidth,
            y1: 0,
            y2: document.body.offsetHeight
        };
        let intersection = Lib.Geometry.getIntersectingRectangle(frameRect, bodyRect);
        if (intersection) {
            if (Math.abs(intersection.x2 - intersection.x1) < 100) {
                return false;
            }
            if (Math.abs(intersection.y2 - intersection.y1) < 100) {
                return false;
            }
            let areaIntersection = Lib.Geometry.getRectangleArea(intersection);
            if (areaIntersection < 10000) {
                return false;
            }
            return true;
        }
        return false;
    }
    setSizeInfo(info) {
        this.style.left = info.left + 'px';
        this.style.top = info.top + 'px';
        this.style.width = info.width + 'px';
        this.style.height = info.height + 'px';
        this.full = info.isFullScreen;
    }
    addMoveDragAndDrop() {
        let hasMove = false;
        new Aventus.DragAndDrop({
            element: this,
            elementTrigger: this.header,
            offsetDrag: 5,
            isDragEnable: () => {
                return !this.full;
            },
            onPointerDown: () => {
                hasMove = false;
            },
            onStart: (e) => {
                this.moving = true;
            },
            onMove: () => {
                hasMove = true;
            },
            onPointerUp: () => {
                this.moving = false;
                if (hasMove)
                    this.saveSize();
            }
        });
        this.header.addEventListener("dblclick", () => {
            this.toggleFull();
        });
    }
    addResize() {
        this.resizeEl.init(this);
        this.resizeEl.onPointerDown.add(this.onResizeStart);
        this.resizeEl.onPointerUp.add(this.onResizeStop);
    }
    afterTransition(cb) {
        setTimeout(() => {
            if (this.isAnimating) {
                this.afterTransitionCb.push(cb);
                return;
            }
            cb();
        }, 100);
    }
    watchTransition() {
        this.addEventListener("transitionstart", () => {
            this.isAnimating = true;
        });
        this.addEventListener("transitionend", () => {
            this.isAnimating = false;
            let cbs = [...this.afterTransitionCb];
            for (let cb of cbs) {
                cb();
            }
            this.afterTransitionCb = [];
        });
    }
    toggleFull() {
        this.full = !this.full;
    }
    hide() {
        this.is_hidden = true;
        this.saveApplicationHistory();
    }
    show() {
        this.is_hidden = false;
        this.saveApplicationHistory();
    }
    kill() {
        this.remove();
    }
    popup(p) {
        return new Promise((resolve) => {
            p.init((response) => {
                resolve(response);
            });
            this.shadowRoot.appendChild(p);
        });
    }
    async alert(title, message, okBtnTxt) {
        const a = new Components.Alert();
        a.subject = title;
        a.body = message;
        if (okBtnTxt) {
            a.btn_txt = okBtnTxt;
        }
        await this.popup(a);
    }
    async confirm(title, message, yesBtnTxt, noBtnTxt) {
        const c = new Components.Confirm();
        c.subject = title;
        c.body = message;
        if (yesBtnTxt) {
            c.btn_yes_txt = yesBtnTxt;
        }
        if (noBtnTxt) {
            c.btn_no_txt = noBtnTxt;
        }
        return await this.popup(c);
    }
    addFocus() {
        this.setAttribute("tabindex", "-1");
        this.addEventListener("focus", (e) => {
            e.stopPropagation();
            System.Application.setActive(this);
        });
        System.Application.setActive(this);
    }
    rightClick() {
        this.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    }
    init(options) {
        this.options = options;
        this.setSizeInfo(this.sizeManager.load());
    }
    postCreation() {
        this.register();
        this.rightClick();
        this.addResize();
        this.addFocus();
        this.addMoveDragAndDrop();
        this.watchTransition();
    }
    postDestruction() {
        this.options?.desktop.removeApp(this);
        this.removeApplicationHistory();
        this.sizeManager.remove();
    }
    __b8adb9845de45194ca3aae9322a8888cmethod0() {
        return this.app_title;
    }
}
System.Application.Namespace=`${moduleName}.System`;
_.System.Application=System.Application;

Components.Link = class Link extends Aventus.WebComponent {
    static get observedAttributes() {return ["to", "active_pattern", "active"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'to'() { return this.getStringProp('to') }
    set 'to'(val) { this.setStringAttr('to', val) }get 'active_pattern'() { return this.getStringProp('active_pattern') }
    set 'active_pattern'(val) { this.setStringAttr('active_pattern', val) }get 'active'() { return this.getBoolProp('active') }
    set 'active'(val) { this.setBoolAttr('active', val) }    pressManager;
    oldTo;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("to", ((target) => {
    target.changeActiveSub();
}));this.__addPropertyActions("active_pattern", ((target) => {
    target.changeActiveSub();
}));this.__addPropertyActions("active", ((target) => {
    target.onActiveChange();
})); }
    static __style = ``;
    constructor() { super(); this.setActive=this.setActive.bind(this)this.setInactive=this.setInactive.bind(this) }
    __getStatic() {
        return Link;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Link.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Link";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('to')){ this['to'] = undefined; }if(!this.hasAttribute('active_pattern')){ this['active_pattern'] = undefined; }if(!this.hasAttribute('active')) { this.attributeChangedCallback('active', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('to');this.__upgradeProperty('active_pattern');this.__upgradeProperty('active'); }
    __listBoolProps() { return ["active"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    changeActiveSub() {
        let app = this.findParentByType(System.Application);
        if (this.oldTo) {
            app?.unsubscribeNavigationChange(this.oldTo, {
                active: this.setActive,
                inactive: this.setInactive
            });
        }
        this.oldTo = this.active_pattern ?? this.to;
        if (this.oldTo) {
            app?.subscribeNavigationChange(this.oldTo, {
                active: this.setActive,
                inactive: this.setInactive
            });
        }
    }
    setActive() {
        this.active = true;
    }
    setInactive() {
        this.active = false;
    }
    onActiveChange() {
    }
    setOnPress() {
        this.pressManager = new Aventus.PressManager({
            element: this,
            onPress: (e) => {
                let app = this.findParentByType(System.Application);
                if (app && this.to) {
                    app.navigate(this.to);
                }
            }
        });
    }
    postDestruction() {
        this.pressManager?.destroy();
        this.pressManager = undefined;
    }
    postCreation() {
        this.setOnPress();
    }
}
Components.Link.Namespace=`${moduleName}.Components`;
Components.Link.Tag=`rk-link`;
_.Components.Link=Components.Link;
if(!window.customElements.get('rk-link')){window.customElements.define('rk-link', Components.Link);Aventus.WebComponentInstance.registerDefinition(Components.Link);}

System.BottomBar = class BottomBar extends Aventus.WebComponent {
    get desktop() {
        if (this.parentNode instanceof ShadowRoot) {
            if (this.parentNode.host instanceof System.Desktop) {
                return this.parentNode.host;
            }
        }
        throw "impossible";
    }
    timeoutOverHome = 0;
    emptyIcon;
    static __style = `:host{align-items:center;background-color:var(--primary-color-opacity);box-shadow:var(--elevation-3);border-radius:10px;bottom:10px;color:var(--text-color);display:flex;font-size:var(--font-size);height:50px;left:100px;outline:none;padding:0 10px;position:absolute;transition:opacity var(--bezier-curve) .5s,visibility var(--bezier-curve) .5s,transform 1s var(--bezier-curve);width:calc(100% - 200px);z-index:100}:host .section{align-items:center;display:flex;height:100%}:host .section .icon{--img-stroke-color: transparent;--img-fill-color: var(--text-color);border-radius:5px;cursor:pointer;margin:0 3px;max-height:calc(100% - 16px);max-width:34px;padding:7px;transition:background-color .2s var(--bezier-curve)}:host .section rk-app-icon{margin:0 5px}:host .separator{background-color:var(--text-color);display:inline-block;height:50%;margin:0 13px;width:1px}:host .applications{flex-grow:1;gap:10px;position:relative}:host .applications .empty-icon{background-color:var(--darker-active);border-radius:5px;height:30px;width:30px}:host .nb-notifications{align-items:center;background-color:var(--text-color);border-radius:50%;color:var(--primary-color-opacity);display:flex;font-size:14px;font-weight:bold;height:25px;justify-content:center;letter-spacing:-1px;padding-right:1px;width:25px}@media screen and (min-width: 1225px){:host .section .icon:hover{background-color:var(--lighter-active)}}@media screen and (max-width: 1224px){:host{border-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0;bottom:0px;left:0px;padding:0 10px;width:100%}}@media screen and (max-width: 768px){:host{height:70px}:host .basic-action{display:none}:host .addons{display:none}:host .separator{display:none}:host .applications .empty-icon{height:50px;width:50px}}`;
    constructor() { super(); this.setAppPositionTemp=this.setAppPositionTemp.bind(this)this.clearAppPositionTemp=this.clearAppPositionTemp.bind(this)this.setAppPosition=this.setAppPosition.bind(this) }
    __getStatic() {
        return BottomBar;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(BottomBar.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="section basic-action">    <rk-home-btn></rk-home-btn>    <rk-img mode="contains" src="/img/icons/application-panel.svg" class="touch icon" _id="bottombar_0"></rk-img>    <rk-img mode="contains" src="/img/icons/search.svg" class="touch icon"></rk-img>    <rk-img mode="contains" src="/img/icons/layout-fluid.svg" class="touch icon" _id="bottombar_1"></rk-img></div><div class="separator"></div><div class="section applications" _id="bottombar_2"></div><div class="separator"></div><div class="section addons">    <rk-add-on-time></rk-add-on-time></div>` }
    });
}
    __createStates() { super.__createStates(); let that = this;  this.__createStatesList(State.MoveApplication.state, State.DesktopStateManager);this.__addActiveState(State.MoveApplication.state, State.DesktopStateManager, (state, slugs) => { that.__inactiveDefaultState(State.DesktopStateManager); that.onMoveApplication(state, slugs);})this.__addInactiveState(State.MoveApplication.state, State.DesktopStateManager, (state, nextState, slugs) => { that.onStopMovingApplication(state, nextState, slugs);that.__activeDefaultState(nextState, State.DesktopStateManager);}) }
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "applicationsContainer",
      "ids": [
        "bottombar_2"
      ]
    }
  ],
  "pressEvents": [
    {
      "id": "bottombar_0",
      "onPress": (e, pressInstance, c) => { c.comp.showAppList(e, pressInstance); }
    },
    {
      "id": "bottombar_1",
      "onPress": (e, pressInstance, c) => { c.comp.showDesktops(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "BottomBar";
    }
    addSwipe() {
        let enable = true;
        let startY = 0;
        new Aventus.DragAndDrop({
            element: this,
            applyDrag: false,
            offsetDrag: 50,
            isDragEnable: () => enable,
            onStart: (e) => {
                startY = e.pageY;
            },
            onMove: (e) => {
                let positionY = startY - e.pageY;
                if (positionY > 50) {
                    enable = false;
                    this.showAppList();
                }
            },
            onStop: () => {
                enable = true;
            }
        });
    }
    showAppList() {
        System.Os.instance.show_application_list = true;
    }
    showDesktops() {
        System.Os.instance.desktop_list = true;
    }
    addFocus() {
        this.setAttribute("tabindex", "-1");
        this.addEventListener("focus", (e) => {
            e.stopPropagation();
            System.Application.setActive(null);
        });
    }
    setAppPositionTemp(shadow, x, y, state) {
        let caseEl = this.shadowRoot.elementFromPoint(x, y);
        if (caseEl && this.shadowRoot.contains(caseEl)) {
            shadow.style.width = "";
            shadow.style.height = "";
            if (caseEl instanceof System.HomeBtn) {
                if (!this.timeoutOverHome && !caseEl.active) {
                    this.timeoutOverHome = setTimeout(() => {
                        let caseEl = this.shadowRoot.elementFromPoint(state.lastX, state.lastY);
                        if (caseEl instanceof System.HomeBtn) {
                            caseEl.active = true;
                        }
                    }, 2000);
                }
                return false;
            }
            if (this.timeoutOverHome) {
                clearTimeout(this.timeoutOverHome);
                this.timeoutOverHome = 0;
            }
            let rect = this.applicationsContainer.getBoundingClientRect();
            if (x >= rect.x && x <= rect.x + rect.width) {
                if (!this.emptyIcon) {
                    this.emptyIcon = document.createElement("DIV");
                    this.emptyIcon.classList.add("empty-icon");
                }
                let children = Array.from(this.applicationsContainer.children);
                let found = false;
                for (let i = 0; i < children.length; i++) {
                    let child = children[i];
                    if (child instanceof System.AppIcon) {
                        if (x < rect.x + child.offsetLeft + (child.offsetWidth / 2)) {
                            this.applicationsContainer.insertBefore(this.emptyIcon, child);
                            found = true;
                            break;
                        }
                    }
                }
                if (!found) {
                    this.applicationsContainer.appendChild(this.emptyIcon);
                }
                return true;
            }
        }
        return false;
    }
    clearAppPositionTemp(state) {
        if (this.timeoutOverHome) {
            let caseEl = this.shadowRoot.elementFromPoint(state.lastX, state.lastY);
            if (!(caseEl instanceof System.HomeBtn)) {
                clearTimeout(this.timeoutOverHome);
                this.timeoutOverHome = 0;
            }
        }
        if (this.emptyIcon?.parentNode) {
            this.emptyIcon.remove();
        }
    }
    async setAppPosition(icon, x, y) {
        if (this.emptyIcon?.parentNode) {
            let children = this.emptyIcon.parentNode?.children ?? [];
            let no = Array.from(children).indexOf(this.emptyIcon);
            if (no == -1)
                return;
            this.applicationsContainer.insertBefore(icon, this.emptyIcon);
            this.emptyIcon.remove();
            let desktopIcon = new Data.DesktopAppIcon();
            desktopIcon.DesktopId = this.desktop.desktop_id;
            desktopIcon.Position = no;
            desktopIcon.IconTag = icon.tag;
            desktopIcon.Location = Data.DesktopLocation.BottomBar;
            desktopIcon.Id = icon.iconId;
            let result = await Lib.MainSocket.instance.routes.desktop.SetDesktopIcon({
                icon: desktopIcon
            });
            if (result.success && result.result) {
                icon.iconId = result.result.Id;
                icon.position = result.result.Position;
            }
            no++;
            for (; no < children.length; no++) {
                let child = children[no];
                if (child instanceof System.AppIcon) {
                    let desktopIcon = new Data.DesktopAppIcon();
                    desktopIcon.DesktopId = this.desktop.desktop_id;
                    desktopIcon.Position = no;
                    desktopIcon.IconTag = child.tag;
                    desktopIcon.Location = Data.DesktopLocation.BottomBar;
                    desktopIcon.Id = child.iconId;
                    let result = await Lib.MainSocket.instance.routes.desktop.SetDesktopIcon({
                        icon: desktopIcon
                    });
                }
            }
        }
    }
    onMoveApplication(state, slugs) {
        if (!this.desktop?.is_active) {
            return;
        }
        if (state instanceof State.MoveApplication) {
            state.registerProvider(this);
        }
    }
    onStopMovingApplication(state, nextState, slugs) {
        if (!this.desktop?.is_active) {
            return;
        }
    }
    setApplication(el) {
        this.applicationsContainer.appendChild(el);
    }
    postCreation() {
        this.addSwipe();
        this.addFocus();
    }
}
System.BottomBar.Namespace=`${moduleName}.System`;
System.BottomBar.Tag=`rk-bottom-bar`;
_.System.BottomBar=System.BottomBar;
if(!window.customElements.get('rk-bottom-bar')){window.customElements.define('rk-bottom-bar', System.BottomBar);Aventus.WebComponentInstance.registerDefinition(System.BottomBar);}

Lib.AppIconManager=class AppIconManager {
    static loaded = [];
    static dico = {};
    static tags = {};
    static waiting = [];
    static async register(appIcon, componentUrl = "/") {
        let cst = appIcon.constructor;
        let key = cst.Fullname + "$" + componentUrl;
        if (this.loaded.includes(key)) {
            return;
        }
        this.loaded.push(key);
        let application = cst.Fullname.split(".")[0];
        let code = await (await fetch("/" + application + componentUrl)).text();
        let match = code.match("<(.*?)>");
        if (!match) {
            return;
        }
        let tagName = match[0].replace("<", "").replace(">", "");
        this.dico[tagName] = cst;
        this.tags[application + "$" + componentUrl] = tagName;
        let cbs = [...this.waiting];
        for (let cb of cbs) {
            cb();
        }
    }
    static getIcon(tagName) {
        return this.dico[tagName];
    }
    static getTagName(application, componentUrl) {
        return new Promise((resolve) => {
            let key = application + "$" + componentUrl;
            if (this.tags[key]) {
                resolve(this.tags[key]);
            }
            else {
                let cb = () => {
                    if (this.tags[key]) {
                        let index = this.waiting.indexOf(cb);
                        this.waiting.splice(index, 1);
                        resolve(this.tags[key]);
                    }
                };
                this.waiting.push(cb);
            }
        });
    }
}
Lib.AppIconManager.Namespace=`${moduleName}.Lib`;
_.Lib.AppIconManager=Lib.AppIconManager;
RAM.DesktopRAM=class DesktopRAM extends AventusSharp.RAM.RamHttp {
    /**
     * @inheritdoc
     */
    defineRoutes() {
        return new Routes.DesktopRouter(new Lib.HttpRouter());
    }
    /**
     * Create a singleton to store data
     */
    static getInstance() {
        return Aventus.Instance.get(RAM.DesktopRAM);
    }
    /**
     * @inheritdoc
     */
    defineIndexKey() {
        return 'Id';
    }
    /**
     * @inheritdoc
     */
    getTypeForData(objJson) {
        return Data.Desktop;
    }
}
RAM.DesktopRAM.Namespace=`${moduleName}.RAM`;
_.RAM.DesktopRAM=RAM.DesktopRAM;
System.Desktop = class Desktop extends Aventus.WebComponent {
    static get observedAttributes() {return ["desktop_id"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'show_application_list'() { return this.getBoolAttr('show_application_list') }
    set 'show_application_list'(val) { this.setBoolAttr('show_application_list', val) }get 'is_active'() { return this.getBoolAttr('is_active') }
    set 'is_active'(val) { this.setBoolAttr('is_active', val) }    get 'desktop_id'() { return this.getNumberProp('desktop_id') }
    set 'desktop_id'(val) { this.setNumberAttr('desktop_id', val) }    applications = {};
    data;
    oldActiveCase;
    pressManagerStopMoveApp;
    static __style = `:host{background-position:center;background-repeat:no-repeat;background-size:cover;flex-shrink:0;height:100%;overflow:hidden;position:relative;width:100%}:host .icons{--page-case-border-radius: 5px;--page-case-border-active: 1px solid var(--darker-active);--page-case-background-active: var(--lighter-active);height:calc(100% - 70px);width:100%;z-index:2;transition:opacity var(--bezier-curve) .5s,visibility var(--bezier-curve) .5s}:host .app-container{transition:opacity var(--bezier-curve) .5s,visibility var(--bezier-curve) .5s}:host([show_application_list])>*{opacity:0 !important;visibility:hidden !important}`;
    constructor() { super(); this.setAppPositionTemp=this.setAppPositionTemp.bind(this)this.clearAppPositionTemp=this.clearAppPositionTemp.bind(this)this.setAppPosition=this.setAppPosition.bind(this) }
    __getStatic() {
        return Desktop;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Desktop.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="icons">    <rk-page-case case_width="75" case_height="75" min_case_margin_left="20" min_case_margin_top="20" min_page_number="1" order_position inverse _id="desktop_0">    </rk-page-case></div><rk-bottom-bar _id="desktop_1"></rk-bottom-bar><div class="app-container" _id="desktop_2"></div>` }
    });
}
    __createStates() { super.__createStates(); let that = this;  this.__createStatesList(State.MoveApplication.state, State.DesktopStateManager);this.__addActiveState(State.MoveApplication.state, State.DesktopStateManager, (state, slugs) => { that.__inactiveDefaultState(State.DesktopStateManager); that.onMoveApplication(state, slugs);})this.__addInactiveState(State.MoveApplication.state, State.DesktopStateManager, (state, nextState, slugs) => { that.onStopMovingApplication(state, nextState, slugs);that.__activeDefaultState(nextState, State.DesktopStateManager);}) }
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "pageCaseEl",
      "ids": [
        "desktop_0"
      ]
    },
    {
      "name": "bottomBar",
      "ids": [
        "desktop_1"
      ]
    },
    {
      "name": "appContainer",
      "ids": [
        "desktop_2"
      ]
    }
  ]
}); }
    getClassName() {
        return "Desktop";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('show_application_list')) { this.attributeChangedCallback('show_application_list', false, false); }if(!this.hasAttribute('is_active')) { this.attributeChangedCallback('is_active', false, false); }if(!this.hasAttribute('desktop_id')){ this['desktop_id'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('show_application_list');this.__upgradeProperty('is_active');this.__upgradeProperty('desktop_id'); }
    __listBoolProps() { return ["show_application_list","is_active"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    onContextMenu(contextMenu, stop) {
        if (Object.keys(this.applications).length > 0) {
            contextMenu.addItem({
                text: "Recentrer les fenetres",
                icon: "/img/icons/window-restore.svg",
                priority: 2,
                action: () => {
                    for (let name in this.applications) {
                        for (let id in this.applications[name]) {
                            this.applications[name][id].resetSize();
                        }
                    }
                }
            });
        }
        if (this.data.SyncDesktop) {
            contextMenu.addItem({
                text: "Bureau non partagé",
                materialIcon: "sync_disabled",
                action: () => {
                    this.data.update({ SyncDesktop: false });
                }
            });
        }
        else {
            contextMenu.addItem({
                text: "Bureau partagé",
                materialIcon: "sync",
                action: () => {
                    this.data.update({ SyncDesktop: true });
                }
            });
        }
    }
    async loadApp(application) {
        await Aventus.ResourceLoader.loadInHead({
            type: "js",
            url: "/apps/" + application + "/index.js"
        });
        await Aventus.ResourceLoader.loadInHead({
            type: "css",
            url: "/apps/" + application + "/default.css"
        });
    }
    async openUrl(application, componentUrl = "/", url = "/") {
        System.Os.instance.show_application_list = false;
        await this.loadApp(application);
        let tagName = await Lib.AppIconManager.getTagName(application, componentUrl);
        let comp = Aventus.WebComponentInstance.create(tagName);
        if (comp) {
            if (!this.applications[comp.$type]) {
                this.applications[comp.$type] = {};
            }
            let i = 0;
            while (this.applications[comp.$type][i]) {
                i++;
            }
            comp.init({
                applicationNumber: i,
                desktopId: this.desktop_id,
                desktop: this,
            });
            this.appContainer.appendChild(comp);
            comp.focus();
            await comp.navigate(url);
            this.applications[comp.$type][i] = comp;
            this.manageAppBottomBar(comp.$type);
        }
    }
    async unHideApplication(application, componentUrl = "/") {
        let tagName = await Lib.AppIconManager.getTagName(application, componentUrl);
        let comp = Aventus.WebComponentInstance.create(tagName);
        if (!comp || !this.applications[comp.$type]) {
            return;
        }
        let allHidden = true;
        for (let nb in this.applications[comp.$type]) {
            if (!this.applications[comp.$type][nb].is_hidden) {
                allHidden = false;
                break;
            }
        }
        if (allHidden) {
            for (let nb in this.applications[comp.$type]) {
                this.applications[comp.$type][nb].show();
            }
        }
        else {
            for (let nb in this.applications[comp.$type]) {
                this.applications[comp.$type][nb].hide();
            }
        }
    }
    async recreateApplications(applications) {
        if (!applications) {
            return;
        }
        for (let application of applications) {
            this.recreateApplication(application);
        }
    }
    async recreateApplication(application) {
        let applicationName = application.applicationName;
        if (!applicationName) {
            return;
        }
        let appName = applicationName?.split(".")[0];
        await this.loadApp(appName);
        let comp = Aventus.WebComponentInstance.create(applicationName);
        if (comp) {
            if (!this.applications[applicationName]) {
                this.applications[applicationName] = {};
            }
            let i = application.number;
            comp.init({
                applicationNumber: i,
                desktopId: this.desktop_id,
                desktop: this
            });
            comp.focus();
            comp.is_hidden = application.isHidden;
            this.appContainer.appendChild(comp);
            await comp.setHistory(System.ApplicationHistory.fromText(comp.navigator, application.history));
            this.applications[comp.$type][i] = comp;
            this.manageAppBottomBar(comp.$type);
        }
    }
    removeApp(application) {
        const appNumber = application.options?.applicationNumber ?? -1;
        const type = application.$type;
        delete this.applications[type][appNumber];
        if (Object.keys(this.applications[type]).length == 0) {
            delete this.applications[type];
        }
        this.manageAppBottomBar(type);
    }
    manageAppBottomBar(type) {
        let splitted = type.split(".");
        let current = window;
        for (let part of splitted) {
            current = current[part];
        }
        if (current && current.prototype instanceof Aventus.WebComponent) {
            let icon = Lib.AppIconManager.getIcon(current.Tag);
            if (!icon) {
                return;
            }
            const appContainer = this.bottomBar.applicationsContainer;
            if (!this.applications[type] || Object.keys(this.applications[type]).length == 0) {
                let children = Array.from(appContainer.children);
                for (let child of children) {
                    if (child instanceof icon) {
                        child.is_open = false;
                        if (child.classList.contains("remove-close")) {
                            child.remove();
                        }
                    }
                }
            }
            else {
                let children = Array.from(appContainer.children);
                let found = false;
                for (let child of children) {
                    if (child instanceof icon) {
                        child.is_open = true;
                        found = true;
                    }
                }
                if (found) {
                    return;
                }
                let iconTemp = new icon();
                iconTemp.is_open = true;
                iconTemp.classList.add("remove-close");
                appContainer.append(iconTemp);
            }
        }
    }
    setAppPositionTemp(shadow, x, y) {
        let caseEl = this.pageCaseEl.shadowRoot.elementFromPoint(x, y);
        if (caseEl && this.pageCaseEl.shadowRoot.contains(caseEl)) {
            let pageCase = caseEl instanceof Components.PageCaseSlot ? caseEl : Aventus.ElementExtension.findParentByType(caseEl, Components.PageCaseSlot);
            if (this.oldActiveCase != caseEl) {
                this.oldActiveCase?.classList.remove("active");
                if (pageCase) {
                    if (this.pageCaseEl.getElementAt(pageCase.no) == null) {
                        this.oldActiveCase = pageCase;
                        pageCase.classList.add("active");
                        shadow.style.width = '75px';
                        shadow.style.height = '75px';
                    }
                }
                else {
                    this.oldActiveCase = undefined;
                }
            }
        }
        return this.oldActiveCase ? true : false;
    }
    clearAppPositionTemp() {
        this.oldActiveCase?.classList.remove("active");
    }
    async setAppPosition(icon, x, y) {
        this.setAppPositionTemp(icon, x, y);
        if (this.oldActiveCase) {
            let no = this.oldActiveCase.no;
            icon.position = no;
            this.pageCaseEl.appendChild(icon);
            this.pageCaseEl.calculateGrid();
            let desktopIcon = new Data.DesktopAppIcon();
            desktopIcon.DesktopId = this.desktop_id;
            desktopIcon.Position = no;
            desktopIcon.IconTag = icon.tag;
            desktopIcon.Location = Data.DesktopLocation.Desktop;
            desktopIcon.Id = icon.iconId;
            let result = await Lib.MainSocket.instance.routes.desktop.SetDesktopIcon({
                icon: desktopIcon
            });
            if (result.success && result.result) {
                icon.iconId = result.result.Id;
            }
        }
    }
    onMoveApplication(state, slugs) {
        if (!this.is_active) {
            return;
        }
        if (state instanceof State.MoveApplication) {
            state.registerProvider(this);
            this.pressManagerStopMoveApp?.destroy();
            this.pressManagerStopMoveApp = new Aventus.PressManager({
                element: this,
                onPress: () => {
                    state.resetState();
                }
            });
        }
    }
    onStopMovingApplication(state, nextState, slugs) {
        if (!this.is_active) {
            return;
        }
        this.oldActiveCase?.classList.remove("active");
        this.oldActiveCase = undefined;
        this.pressManagerStopMoveApp?.destroy();
    }
    async loadData() {
        let data = await RAM.DesktopRAM.getInstance().getById(this.desktop_id);
        if (data) {
            this.data = data;
            this.style.backgroundImage = 'url("' + data.Background + '")';
            if (data.SyncDesktop) {
                this.recreateApplications(data.Applications);
            }
            else {
                this.recreateApplications(Lib.ApplicationManager.getOpenApps(data.Id));
            }
            for (let icon of data.Icons) {
                let el = Aventus.WebComponentInstance.create(icon.IconTag);
                if (el) {
                    el.iconId = icon.Id;
                    el.position = icon.Position;
                    if (icon.Location == Data.DesktopLocation.Desktop) {
                        this.pageCaseEl.appendChild(el);
                    }
                    else if (icon.Location == Data.DesktopLocation.BottomBar) {
                        this.bottomBar.setApplication(el);
                    }
                }
            }
            this.pageCaseEl.calculateGrid();
        }
    }
    postCreation() {
        this.loadData();
    }
}
System.Desktop.Namespace=`${moduleName}.System`;
System.Desktop.Tag=`rk-desktop`;
_.System.Desktop=System.Desktop;
if(!window.customElements.get('rk-desktop')){window.customElements.define('rk-desktop', System.Desktop);Aventus.WebComponentInstance.registerDefinition(System.Desktop);}

Components.TouchRecord=class TouchRecord {
    _activeTouchID;
    _touchList = {};
    get _primitiveValue() {
        return { x: 0, y: 0 };
    }
    isActive() {
        return this._activeTouchID !== undefined;
    }
    getDelta() {
        const tracker = this._getActiveTracker();
        if (!tracker) {
            return this._primitiveValue;
        }
        return { ...tracker.delta };
    }
    getVelocity() {
        const tracker = this._getActiveTracker();
        if (!tracker) {
            return this._primitiveValue;
        }
        return { ...tracker.velocity };
    }
    getEasingDistance(damping) {
        const deAcceleration = 1 - damping;
        let distance = {
            x: 0,
            y: 0,
        };
        const vel = this.getVelocity();
        Object.keys(vel).forEach(dir => {
            let v = Math.abs(vel[dir]) <= 10 ? 0 : vel[dir];
            while (v !== 0) {
                distance[dir] += v;
                v = (v * deAcceleration) | 0;
            }
        });
        return distance;
    }
    track(evt) {
        const { targetTouches, } = evt;
        Array.from(targetTouches).forEach(touch => {
            this._add(touch);
        });
        return this._touchList;
    }
    update(evt) {
        const { touches, changedTouches, } = evt;
        Array.from(touches).forEach(touch => {
            this._renew(touch);
        });
        this._setActiveID(changedTouches);
        return this._touchList;
    }
    release(evt) {
        delete this._activeTouchID;
        Array.from(evt.changedTouches).forEach(touch => {
            this._delete(touch);
        });
    }
    _add(touch) {
        if (this._has(touch)) {
            this._delete(touch);
        }
        const tracker = new Components.Tracker(touch);
        this._touchList[touch.identifier] = tracker;
    }
    _renew(touch) {
        if (!this._has(touch)) {
            return;
        }
        const tracker = this._touchList[touch.identifier];
        tracker.update(touch);
    }
    _delete(touch) {
        delete this._touchList[touch.identifier];
    }
    _has(touch) {
        return this._touchList.hasOwnProperty(touch.identifier);
    }
    _setActiveID(touches) {
        this._activeTouchID = touches[touches.length - 1].identifier;
    }
    _getActiveTracker() {
        const { _touchList, _activeTouchID, } = this;
        if (_activeTouchID !== undefined) {
            return _touchList[_activeTouchID];
        }
        return undefined;
    }
}
Components.TouchRecord.Namespace=`${moduleName}.Components`;
_.Components.TouchRecord=Components.TouchRecord;
Components.Scrollable = class Scrollable extends Aventus.WebComponent {
    static get observedAttributes() {return ["zoom"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'y_scroll_visible'() { return this.getBoolAttr('y_scroll_visible') }
    set 'y_scroll_visible'(val) { this.setBoolAttr('y_scroll_visible', val) }get 'x_scroll_visible'() { return this.getBoolAttr('x_scroll_visible') }
    set 'x_scroll_visible'(val) { this.setBoolAttr('x_scroll_visible', val) }get 'floating_scroll'() { return this.getBoolAttr('floating_scroll') }
    set 'floating_scroll'(val) { this.setBoolAttr('floating_scroll', val) }get 'x_scroll'() { return this.getBoolAttr('x_scroll') }
    set 'x_scroll'(val) { this.setBoolAttr('x_scroll', val) }get 'y_scroll'() { return this.getBoolAttr('y_scroll') }
    set 'y_scroll'(val) { this.setBoolAttr('y_scroll', val) }get 'auto_hide'() { return this.getBoolAttr('auto_hide') }
    set 'auto_hide'(val) { this.setBoolAttr('auto_hide', val) }get 'break'() { return this.getNumberAttr('break') }
    set 'break'(val) { this.setNumberAttr('break', val) }get 'disable'() { return this.getBoolAttr('disable') }
    set 'disable'(val) { this.setBoolAttr('disable', val) }get 'no_user_select'() { return this.getBoolAttr('no_user_select') }
    set 'no_user_select'(val) { this.setBoolAttr('no_user_select', val) }    get 'zoom'() { return this.getNumberProp('zoom') }
    set 'zoom'(val) { this.setNumberAttr('zoom', val) }    observer;
    display = { x: 0, y: 0 };
    max = {
        x: 0,
        y: 0
    };
    margin = {
        x: 0,
        y: 0
    };
    position = {
        x: 0,
        y: 0
    };
    momentum = { x: 0, y: 0 };
    contentWrapperSize = { x: 0, y: 0 };
    scroller = {
        x: () => {
            if (!this.horizontalScroller) {
                throw 'can\'t find the horizontalScroller';
            }
            return this.horizontalScroller;
        },
        y: () => {
            if (!this.verticalScroller) {
                throw 'can\'t find the verticalScroller';
            }
            return this.verticalScroller;
        }
    };
    scrollerContainer = {
        x: () => {
            if (!this.horizontalScrollerContainer) {
                throw 'can\'t find the horizontalScrollerContainer';
            }
            return this.horizontalScrollerContainer;
        },
        y: () => {
            if (!this.verticalScrollerContainer) {
                throw 'can\'t find the verticalScrollerContainer';
            }
            return this.verticalScrollerContainer;
        }
    };
    hideDelay = { x: 0, y: 0 };
    touchRecord;
    pointerCount = 0;
    savedBreak = 1;
    get x() {
        return this.position.x;
    }
    get y() {
        return this.position.y;
    }
    onScrollChange = new Aventus.Callback();
    renderAnimation;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("zoom", ((target) => {
    target.changeZoom();
})); }
    static __style = `:host{--internal-scrollbar-container-color: var(--scrollbar-container-color, transparent);--internal-scrollbar-color: var(--scrollbar-color, #757575);--internal-scrollbar-active-color: var(--scrollbar-active-color, #858585);--internal-scroller-width: var(--scroller-width, 6px);--internal-scroller-top: var(--scroller-top, 3px);--internal-scroller-bottom: var(--scroller-bottom, 3px);--internal-scroller-right: var(--scroller-right, 3px);--internal-scroller-left: var(--scroller-left, 3px);--internal-scrollbar-container-display: var(--scrollbar-container-display, inline-block)}:host{display:flex;height:100%;overflow:hidden;position:relative;-webkit-user-drag:none;-khtml-user-drag:none;-moz-user-drag:none;-o-user-drag:none;width:100%}:host .scroll-main-container{display:flex;flex-grow:1;position:relative;width:100%}:host .scroll-main-container .content-zoom{display:flex;position:relative;transform-origin:0 0;width:100%;z-index:4}:host .scroll-main-container .content-zoom .content-hidder{display:block;height:100%;overflow:hidden;position:relative;width:100%}:host .scroll-main-container .content-zoom .content-hidder .content-wrapper{display:var(--internal-scrollbar-container-display);height:100%;min-height:100%;min-width:100%;position:relative;width:100%}:host .scroll-main-container .scroller-wrapper .container-scroller{display:none;overflow:hidden;position:absolute;transition:transform .2s linear;z-index:5}:host .scroll-main-container .scroller-wrapper .container-scroller .shadow-scroller{background-color:var(--internal-scrollbar-container-color);border-radius:5px}:host .scroll-main-container .scroller-wrapper .container-scroller .shadow-scroller .scroller{background-color:var(--internal-scrollbar-color);border-radius:5px;cursor:pointer;position:absolute;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;z-index:5}:host .scroll-main-container .scroller-wrapper .container-scroller .scroller.active{background-color:var(--internal-scrollbar-active-color)}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical{height:calc(100% - var(--internal-scroller-bottom)*2 - var(--internal-scroller-width));padding-left:var(--internal-scroller-left);right:var(--internal-scroller-right);top:var(--internal-scroller-bottom);transform:0;width:calc(var(--internal-scroller-width) + var(--internal-scroller-left))}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical.hide{transform:translateX(calc(var(--internal-scroller-width) + var(--internal-scroller-left)))}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical .shadow-scroller{height:100%}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical .shadow-scroller .scroller{width:calc(100% - var(--internal-scroller-left))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal{bottom:var(--internal-scroller-bottom);height:calc(var(--internal-scroller-width) + var(--internal-scroller-top));left:var(--internal-scroller-right);padding-top:var(--internal-scroller-top);transform:0;width:calc(100% - var(--internal-scroller-right)*2 - var(--internal-scroller-width))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal.hide{transform:translateY(calc(var(--internal-scroller-width) + var(--internal-scroller-top)))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal .shadow-scroller{height:100%}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal .shadow-scroller .scroller{height:calc(100% - var(--internal-scroller-top))}:host([y_scroll]) .scroll-main-container .content-zoom .content-hidder .content-wrapper{height:auto}:host([x_scroll]) .scroll-main-container .content-zoom .content-hidder .content-wrapper{width:auto}:host([y_scroll_visible]) .scroll-main-container .scroller-wrapper .container-scroller.vertical{display:block}:host([x_scroll_visible]) .scroll-main-container .scroller-wrapper .container-scroller.horizontal{display:block}:host([no_user_select]) .content-wrapper *{user-select:none}:host([no_user_select]) ::slotted{user-select:none}`;
    constructor() {            super();            this.renderAnimation = this.createAnimation();            this.onWheel = this.onWheel.bind(this);            this.onTouchStart = this.onTouchStart.bind(this);            this.onTouchMove = this.onTouchMove.bind(this);            this.onTouchEnd = this.onTouchEnd.bind(this);            this.touchRecord = new Components.TouchRecord();        }
    __getStatic() {
        return Scrollable;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Scrollable.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="scroll-main-container" _id="scrollable_0">    <div class="content-zoom" _id="scrollable_1">        <div class="content-hidder" _id="scrollable_2">            <div class="content-wrapper" _id="scrollable_3">                <slot></slot>            </div>        </div>    </div>    <div class="scroller-wrapper">        <div class="container-scroller vertical" _id="scrollable_4">            <div class="shadow-scroller">                <div class="scroller" _id="scrollable_5"></div>            </div>        </div>        <div class="container-scroller horizontal" _id="scrollable_6">            <div class="shadow-scroller">                <div class="scroller" _id="scrollable_7"></div>            </div>        </div>    </div></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "mainContainer",
      "ids": [
        "scrollable_0"
      ]
    },
    {
      "name": "contentZoom",
      "ids": [
        "scrollable_1"
      ]
    },
    {
      "name": "contentHidder",
      "ids": [
        "scrollable_2"
      ]
    },
    {
      "name": "contentWrapper",
      "ids": [
        "scrollable_3"
      ]
    },
    {
      "name": "verticalScrollerContainer",
      "ids": [
        "scrollable_4"
      ]
    },
    {
      "name": "verticalScroller",
      "ids": [
        "scrollable_5"
      ]
    },
    {
      "name": "horizontalScrollerContainer",
      "ids": [
        "scrollable_6"
      ]
    },
    {
      "name": "horizontalScroller",
      "ids": [
        "scrollable_7"
      ]
    }
  ]
}); }
    getClassName() {
        return "Scrollable";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('y_scroll_visible')) { this.attributeChangedCallback('y_scroll_visible', false, false); }if(!this.hasAttribute('x_scroll_visible')) { this.attributeChangedCallback('x_scroll_visible', false, false); }if(!this.hasAttribute('floating_scroll')) { this.attributeChangedCallback('floating_scroll', false, false); }if(!this.hasAttribute('x_scroll')) { this.attributeChangedCallback('x_scroll', false, false); }if(!this.hasAttribute('y_scroll')) {this.setAttribute('y_scroll' ,'true'); }if(!this.hasAttribute('auto_hide')) { this.attributeChangedCallback('auto_hide', false, false); }if(!this.hasAttribute('break')){ this['break'] = 0.1; }if(!this.hasAttribute('disable')) { this.attributeChangedCallback('disable', false, false); }if(!this.hasAttribute('no_user_select')) { this.attributeChangedCallback('no_user_select', false, false); }if(!this.hasAttribute('zoom')){ this['zoom'] = 1; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('y_scroll_visible');this.__upgradeProperty('x_scroll_visible');this.__upgradeProperty('floating_scroll');this.__upgradeProperty('x_scroll');this.__upgradeProperty('y_scroll');this.__upgradeProperty('auto_hide');this.__upgradeProperty('break');this.__upgradeProperty('disable');this.__upgradeProperty('no_user_select');this.__upgradeProperty('zoom'); }
    __listBoolProps() { return ["y_scroll_visible","x_scroll_visible","floating_scroll","x_scroll","y_scroll","auto_hide","disable","no_user_select"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    createAnimation() {
        return new Aventus.Animation({
            fps: 60,
            animate: () => {
                const nextX = this.nextPosition('x');
                const nextY = this.nextPosition('y');
                this.momentum.x = nextX.momentum;
                this.momentum.y = nextY.momentum;
                this.scrollDirection('x', nextX.position);
                this.scrollDirection('y', nextY.position);
                if (!this.momentum.x && !this.momentum.y) {
                    this.renderAnimation.stop();
                }
            },
            stopped: () => {
                if (this.momentum.x || this.momentum.y) {
                    this.renderAnimation.start();
                }
            }
        });
    }
    nextPosition(direction) {
        const current = this.position[direction];
        const remain = this.momentum[direction];
        let result = {
            momentum: 0,
            position: 0,
        };
        if (Math.abs(remain) <= 0.1) {
            result.position = current + remain;
        }
        else {
            let nextMomentum = remain * (1 - this.break);
            nextMomentum |= 0;
            result.momentum = nextMomentum;
            result.position = current + remain - nextMomentum;
        }
        let correctPosition = this.correctScrollValue(result.position, direction);
        if (correctPosition != result.position) {
            result.position = correctPosition;
            result.momentum = 0;
        }
        return result;
    }
    scrollDirection(direction, value) {
        const max = this.max[direction];
        if (max != 0) {
            this.position[direction] = this.correctScrollValue(value, direction);
        }
        else {
            this.position[direction] = 0;
        }
        let container = this.scrollerContainer[direction]();
        let scroller = this.scroller[direction]();
        if (this.auto_hide) {
            container.classList.remove("hide");
            clearTimeout(this.hideDelay[direction]);
            this.hideDelay[direction] = setTimeout(() => {
                container.classList.add("hide");
            }, 1000);
        }
        let containerSize = direction == 'y' ? container.offsetHeight : container.offsetWidth;
        if (this.contentWrapperSize[direction] != 0) {
            let scrollPosition = this.position[direction] / this.contentWrapperSize[direction] * containerSize;
            scroller.style.transform = `translate${direction.toUpperCase()}(${scrollPosition}px)`;
            this.contentWrapper.style.transform = `translate3d(${-1 * this.x}px, ${-1 * this.y}px, 0)`;
        }
        this.triggerScrollChange();
    }
    correctScrollValue(value, direction) {
        if (value < 0) {
            value = 0;
        }
        else if (value > this.max[direction]) {
            value = this.max[direction];
        }
        return value;
    }
    triggerScrollChange() {
        this.onScrollChange.trigger([this.x, this.y]);
    }
    scrollToPosition(x, y) {
        this.scrollDirection('x', x);
        this.scrollDirection('y', y);
    }
    scrollX(x) {
        this.scrollDirection('x', x);
    }
    scrollY(y) {
        this.scrollDirection('y', y);
    }
    addAction() {
        this.addEventListener("wheel", this.onWheel);
        this.addEventListener("touchstart", this.onTouchStart);
        this.addEventListener("touchmove", this.onTouchMove);
        this.addEventListener("touchcancel", this.onTouchEnd);
        this.addEventListener("touchend", this.onTouchEnd);
        this.addScrollDrag('x');
        this.addScrollDrag('y');
    }
    addScrollDrag(direction) {
        let scroller = this.scroller[direction]();
        scroller.addEventListener("touchstart", (e) => {
            e.stopPropagation();
        });
        let startPosition = 0;
        new Aventus.DragAndDrop({
            element: scroller,
            applyDrag: false,
            usePercent: true,
            offsetDrag: 0,
            isDragEnable: () => !this.disable,
            onStart: (e) => {
                this.no_user_select = true;
                scroller.classList.add("active");
                startPosition = this.position[direction];
            },
            onMove: (e, position) => {
                let delta = position[direction] / 100 * this.contentWrapperSize[direction];
                let value = startPosition + delta;
                this.scrollDirection(direction, value);
            },
            onStop: () => {
                this.no_user_select = false;
                scroller.classList.remove("active");
            }
        });
    }
    addDelta(delta) {
        if (this.disable) {
            return;
        }
        this.momentum.x += delta.x;
        this.momentum.y += delta.y;
        this.renderAnimation?.start();
    }
    onWheel(e) {
        const DELTA_MODE = [1.0, 28.0, 500.0];
        const mode = DELTA_MODE[e.deltaMode] || DELTA_MODE[0];
        this.addDelta({
            x: e.deltaX * mode,
            y: e.deltaY * mode,
        });
    }
    onTouchStart(e) {
        this.touchRecord.track(e);
        this.momentum = {
            x: 0,
            y: 0
        };
        if (this.pointerCount === 0) {
            this.savedBreak = this.break;
            this.break = Math.max(this.break, 0.5); // less frames on touchmove
        }
        this.pointerCount++;
    }
    onTouchMove(e) {
        this.touchRecord.update(e);
        const delta = this.touchRecord.getDelta();
        this.addDelta(delta);
    }
    onTouchEnd(e) {
        const delta = this.touchRecord.getEasingDistance(this.savedBreak);
        this.addDelta(delta);
        this.pointerCount--;
        if (this.pointerCount === 0) {
            this.break = this.savedBreak;
        }
        this.touchRecord.release(e);
    }
    calculateRealSize() {
        if (!this.contentZoom || !this.mainContainer || !this.contentWrapper) {
            return;
        }
        const currentOffsetWidth = this.contentZoom.offsetWidth;
        const currentOffsetHeight = this.contentZoom.offsetHeight;
        this.contentWrapperSize.x = this.contentWrapper.offsetWidth;
        this.contentWrapperSize.y = this.contentWrapper.offsetHeight;
        if (this.zoom < 1) {
            // scale the container for zoom
            this.contentZoom.style.width = this.mainContainer.offsetWidth / this.zoom + 'px';
            this.contentZoom.style.height = this.mainContainer.offsetHeight / this.zoom + 'px';
            this.display.y = currentOffsetHeight;
            this.display.x = currentOffsetWidth;
        }
        else {
            this.display.y = currentOffsetHeight / this.zoom;
            this.display.x = currentOffsetWidth / this.zoom;
        }
    }
    calculatePositionScrollerContainer(direction) {
        if (direction == 'y') {
            this.calculatePositionScrollerContainerY();
        }
        else {
            this.calculatePositionScrollerContainerX();
        }
    }
    calculatePositionScrollerContainerY() {
        const leftMissing = this.mainContainer.offsetWidth - this.verticalScrollerContainer.offsetLeft;
        if (leftMissing > 0 && this.y_scroll_visible && !this.floating_scroll) {
            this.contentHidder.style.width = 'calc(100% - ' + leftMissing + 'px)';
            this.contentHidder.style.marginRight = leftMissing + 'px';
            this.margin.x = leftMissing;
        }
        else {
            this.contentHidder.style.width = '';
            this.contentHidder.style.marginRight = '';
            this.margin.x = 0;
        }
    }
    calculatePositionScrollerContainerX() {
        const topMissing = this.mainContainer.offsetHeight - this.horizontalScrollerContainer.offsetTop;
        if (topMissing > 0 && this.x_scroll_visible && !this.floating_scroll) {
            this.contentHidder.style.height = 'calc(100% - ' + topMissing + 'px)';
            this.contentHidder.style.marginBottom = topMissing + 'px';
            this.margin.y = topMissing;
        }
        else {
            this.contentHidder.style.height = '';
            this.contentHidder.style.marginBottom = '';
            this.margin.y = 0;
        }
    }
    calculateSizeScroller(direction) {
        const scrollerSize = ((this.display[direction] - this.margin[direction]) / this.contentWrapperSize[direction] * 100);
        if (direction == "y") {
            this.scroller[direction]().style.height = scrollerSize + '%';
        }
        else {
            this.scroller[direction]().style.width = scrollerSize + '%';
        }
        let maxScrollContent = this.contentWrapperSize[direction] - this.display[direction];
        if (maxScrollContent < 0) {
            maxScrollContent = 0;
        }
        this.max[direction] = maxScrollContent + this.margin[direction];
    }
    changeZoom() {
        this.contentZoom.style.transform = 'scale(' + this.zoom + ')';
        this.dimensionRefreshed();
    }
    dimensionRefreshed() {
        this.calculateRealSize();
        if (this.contentWrapperSize.y - this.display.y > 0) {
            if (!this.y_scroll_visible) {
                this.y_scroll_visible = true;
                this.calculatePositionScrollerContainer('y');
            }
            this.calculateSizeScroller('y');
            this.scrollDirection('y', this.y);
        }
        else if (this.y_scroll_visible) {
            this.y_scroll_visible = false;
            this.calculatePositionScrollerContainer('y');
            this.calculateSizeScroller('y');
            this.scrollDirection('y', 0);
        }
        if (this.contentWrapperSize.x - this.display.x > 0) {
            if (!this.x_scroll_visible) {
                this.x_scroll_visible = true;
                this.calculatePositionScrollerContainer('x');
            }
            this.calculateSizeScroller('x');
            this.scrollDirection('x', this.x);
        }
        else if (this.x_scroll_visible) {
            this.x_scroll_visible = false;
            this.calculatePositionScrollerContainer('x');
            this.calculateSizeScroller('x');
            this.scrollDirection('x', 0);
        }
    }
    createResizeObserver() {
        let inProgress = false;
        return new Aventus.ResizeObserver({
            callback: entries => {
                if (inProgress) {
                    return;
                }
                inProgress = true;
                this.dimensionRefreshed();
                inProgress = false;
            },
            fps: 30
        });
    }
    addResizeObserver() {
        if (this.observer == undefined) {
            this.observer = this.createResizeObserver();
        }
        this.observer.observe(this.contentWrapper);
        this.observer.observe(this);
    }
    postCreation() {
        this.addResizeObserver();
        this.addAction();
    }
}
Components.Scrollable.Namespace=`${moduleName}.Components`;
Components.Scrollable.Tag=`rk-scrollable`;
_.Components.Scrollable=Components.Scrollable;
if(!window.customElements.get('rk-scrollable')){window.customElements.define('rk-scrollable', Components.Scrollable);Aventus.WebComponentInstance.registerDefinition(Components.Scrollable);}

System.Notification = class Notification extends Aventus.WebComponent {
    static get observedAttributes() {return ["icon", "subject"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'position'() { return this.getStringAttr('position') }
    set 'position'(val) { this.setStringAttr('position', val) }get 'is_active'() { return this.getBoolAttr('is_active') }
    set 'is_active'(val) { this.setBoolAttr('is_active', val) }    get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }get 'subject'() { return this.getStringProp('subject') }
    set 'subject'(val) { this.setStringAttr('subject', val) }    showAsked = false;
    onHide = () => { };
    static __style = `:host{--internal-notification-box-shadow: var(--notification-box-shadow);--internal-notification-logo-fill-color: var(--notification-logo-fill-color, var(--text-color));--internal-notification-logo-stroke-color: var(--notification-logo-stroke-color, transparent);--local-notification-transition-delay: 0.4s}:host{background-color:var(--secondary-color);border-radius:10px;box-shadow:var(--internal-notification-box-shadow);color:var(--text-color);display:flex;max-width:calc(100% - 20px);min-height:40px;padding:10px;position:absolute;width:400px;z-index:600}:host .logo{--img-fill-color: var(--internal-notification-logo-fill-color);--img-stroke-color: var(--internal-notification-logo-stroke-color);flex-shrink:0;order:1;width:30px}:host .logo[src=""]{display:none}:host .content{display:flex;flex-direction:column;order:2}:host .content .title{font-size:20px;font-weight:bold;margin-bottom:5px}:host .content .title:empty{display:none}:host .content .text{flex-grow:1;overflow:hidden}:host .content .text:empty{display:none}:host .close{cursor:pointer;flex-grow:0;height:30px;position:absolute;width:30px}:host([position=left]){bottom:80px;left:0px;opacity:0;transform:translateX(-100%);transition:left var(--local-notification-transition-delay) var(--bezier-curve),bottom var(--local-notification-transition-delay) var(--bezier-curve),transform var(--local-notification-transition-delay) var(--bezier-curve),opacity var(--local-notification-transition-delay) var(--bezier-curve)}:host([position=left]) .logo{order:2}:host([position=left]) .content{margin-left:30px;margin-right:0px;order:1}:host([position=left]) .close{left:5px;top:5px}:host([position=left][is_active]){left:10px;opacity:1;transform:translateX(0)}:host([position=right]){bottom:80px;opacity:0;right:0px;transform:translateX(100%);transition:right var(--local-notification-transition-delay) var(--bezier-curve),bottom var(--local-notification-transition-delay) var(--bezier-curve),transform var(--local-notification-transition-delay) var(--bezier-curve),opacity var(--local-notification-transition-delay) var(--bezier-curve)}:host([position=right]) .content{margin-left:10px;margin-right:30px}:host([position=right]) .close{right:5px;top:5px}:host([position=right][is_active]){opacity:1;right:10px;transform:translateX(0)}:host([position=top]){left:10%;opacity:0;transform:translateY(-100%);transition:top var(--local-notification-transition-delay) var(--bezier-curve),transform var(--local-notification-transition-delay) var(--bezier-curve),opacity var(--local-notification-transition-delay) var(--bezier-curve);width:80%}:host([position=top]) .content{margin-left:10px;margin-right:30px}:host([position=top]) .close{right:5px;top:5px}:host([position=top]:not([is_active])){top:0px !important}:host([position=top][is_active]){opacity:1;top:10px;transform:translateY(0)}:host([position=bottom]){left:10%;transform:translateY(100%);transition:bottom var(--local-notification-transition-delay) var(--bezier-curve),transform var(--local-notification-transition-delay) var(--bezier-curve),opacity var(--local-notification-transition-delay) var(--bezier-curve);width:80%}:host([position=bottom]) .content{margin-left:10px;margin-right:30px}:host([position=bottom]) .close{right:5px;top:5px}:host([position=bottom]:not([is_active])){bottom:0px !important}:host([position=bottom][is_active]){bottom:80px;opacity:1;transform:translateY(0)}`;
    __getStatic() {
        return Notification;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Notification.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<rk-img class="logo" _id="notification_0"></rk-img><div class="content" _id="notification_1">    <div class="title" _id="notification_2"></div>    <div class="text"><slot></slot></div></div><rk-img class="close" src="/img/icons/close.svg" _id="notification_3"></rk-img>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "notification_0°src": {
      "fct": (c) => `${c.print(c.comp.__a84b39ff3d24d67167f2e8388c48a763method0())}`,
      "once": true
    },
    "notification_2°@HTML": {
      "fct": (c) => `${c.print(c.comp.__a84b39ff3d24d67167f2e8388c48a763method1())}`,
      "once": true
    }
  },
  "pressEvents": [
    {
      "id": "notification_0",
      "onPress": (e, pressInstance, c) => { c.comp.clicked(e, pressInstance); }
    },
    {
      "id": "notification_1",
      "onPress": (e, pressInstance, c) => { c.comp.clicked(e, pressInstance); }
    },
    {
      "id": "notification_3",
      "onPress": (e, pressInstance, c) => { c.comp.close(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "Notification";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('position')){ this['position'] = 'right'; }if(!this.hasAttribute('is_active')) { this.attributeChangedCallback('is_active', false, false); }if(!this.hasAttribute('icon')){ this['icon'] = undefined; }if(!this.hasAttribute('subject')){ this['subject'] = ""; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('position');this.__upgradeProperty('is_active');this.__upgradeProperty('icon');this.__upgradeProperty('subject'); }
    __listBoolProps() { return ["is_active"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    show(onHide) {
        this.onHide = onHide;
        if (this.isReady) {
            this.is_active = true;
        }
        else {
            this.showAsked = true;
        }
    }
    async clicked() {
        if (this.onHide) {
            this.is_active = false;
            this.onHide(true);
            await Aventus.sleep(420);
            this.remove();
        }
    }
    async close() {
        if (this.onHide) {
            this.is_active = false;
            this.onHide(false);
            await Aventus.sleep(420);
            this.remove();
        }
    }
    postCreation() {
        if (this.showAsked) {
            this.is_active = true;
        }
    }
    __a84b39ff3d24d67167f2e8388c48a763method0() {
        return this.icon;
    }
    __a84b39ff3d24d67167f2e8388c48a763method1() {
        return this.subject;
    }
}
System.Notification.Namespace=`${moduleName}.System`;
System.Notification.Tag=`rk-notification`;
_.System.Notification=System.Notification;
if(!window.customElements.get('rk-notification')){window.customElements.define('rk-notification', System.Notification);Aventus.WebComponentInstance.registerDefinition(System.Notification);}

System.NotificationManager=class NotificationManager {
    activeNotifications = {
        top: [],
        left: [],
        bottom: [],
        right: [],
    };
    waitingNotifications = {
        top: [],
        left: [],
        bottom: [],
        right: [],
    };
    os;
    constructor(os) {
        this.os = os;
    }
    async notify(notification) {
        this.os.shadowRoot.appendChild(notification);
        if (notification.position == "bottom") {
            return this._notifyBottom(notification, true);
        }
        else if (notification.position == "left") {
            return this._notifyLeft(notification, true);
        }
        else if (notification.position == "right") {
            return this._notifyRight(notification, true);
        }
        else if (notification.position == "top") {
            return this._notifyTop(notification, true);
        }
        return false;
    }
    _notifyRight(notification, firstTime, from = 0) {
        return new Promise((resolve) => {
            let height = notification.offsetHeight;
            let position = "right";
            const _remove = (result) => {
                let index = this.activeNotifications[position].indexOf(notification);
                if (index > -1) {
                    this.activeNotifications[position].splice(index, 1);
                }
                if (this.waitingNotifications[position].length > 0) {
                    let nextNotif = this.waitingNotifications[position].splice(0, 1)[0];
                    this._notifyRight(nextNotif, false, index);
                }
                else {
                    let bodyHeight = document.body.offsetHeight;
                    for (let i = 0; i < index; i++) {
                        let notif = this.activeNotifications[position][i];
                        let bottom = bodyHeight - (notif.offsetTop + notif.offsetHeight);
                        notif.style.bottom = bottom - height - 20 + 'px';
                    }
                }
                resolve(result);
            };
            let length = this.activeNotifications[position].length;
            if (length == 0) {
                this.activeNotifications[position].push(notification);
                notification.show(_remove);
            }
            else {
                let bodyHeight = document.body.offsetHeight;
                let totHeight = 0;
                for (let notif of this.activeNotifications[position]) {
                    totHeight += notif.offsetHeight + 20;
                }
                if (totHeight + height < bodyHeight / 2) {
                    for (let i = from; i < this.activeNotifications[position].length; i++) {
                        let notif = this.activeNotifications[position][i];
                        let bottom = bodyHeight - (notif.offsetTop + notif.offsetHeight);
                        notif.style.bottom = bottom + height + 20 + 'px';
                    }
                    this.activeNotifications[position].push(notification);
                    notification.show(_remove);
                }
                else if (firstTime) {
                    this.waitingNotifications[position].push(notification);
                }
            }
        });
    }
    _notifyLeft(notification, firstTime, from = 0) {
        return new Promise((resolve) => {
            let height = notification.offsetHeight;
            let position = "left";
            const _remove = (result) => {
                let index = this.activeNotifications[position].indexOf(notification);
                if (index > -1) {
                    this.activeNotifications[position].splice(index, 1);
                }
                if (this.waitingNotifications[position].length > 0) {
                    let nextNotif = this.waitingNotifications[position].splice(0, 1)[0];
                    this._notifyLeft(nextNotif, false, index);
                }
                else {
                    let bodyHeight = document.body.offsetHeight;
                    for (let i = 0; i < index; i++) {
                        let notif = this.activeNotifications[position][i];
                        let bottom = bodyHeight - (notif.offsetTop + notif.offsetHeight);
                        notif.style.bottom = bottom - height - 20 + 'px';
                    }
                }
                resolve(result);
            };
            let length = this.activeNotifications[position].length;
            if (length == 0) {
                this.activeNotifications[position].push(notification);
                notification.show(_remove);
            }
            else {
                let bodyHeight = document.body.offsetHeight;
                let totHeight = 0;
                for (let notif of this.activeNotifications[position]) {
                    totHeight += notif.offsetHeight + 20;
                }
                if (totHeight + height < bodyHeight / 2) {
                    for (let i = from; i < this.activeNotifications[position].length; i++) {
                        let notif = this.activeNotifications[position][i];
                        let bottom = bodyHeight - (notif.offsetTop + notif.offsetHeight);
                        notif.style.bottom = bottom + height + 20 + 'px';
                    }
                    this.activeNotifications[position].push(notification);
                    notification.show(_remove);
                }
                else if (firstTime) {
                    this.waitingNotifications[position].push(notification);
                }
            }
        });
    }
    _notifyTop(notification, firstTime, from = 0) {
        return new Promise((resolve) => {
            let height = notification.offsetHeight;
            let position = "top";
            const _remove = (result) => {
                let index = this.activeNotifications[position].indexOf(notification);
                if (index > -1) {
                    this.activeNotifications[position].splice(index, 1);
                }
                if (this.waitingNotifications[position].length > 0) {
                    let nextNotif = this.waitingNotifications[position].splice(0, 1)[0];
                    this._notifyTop(nextNotif, false, index);
                }
                else {
                    for (let i = 0; i < index; i++) {
                        let notif = this.activeNotifications[position][i];
                        let top = notif.offsetTop;
                        notif.style.top = top - height - 20 + 'px';
                    }
                }
                resolve(result);
            };
            let length = this.activeNotifications[position].length;
            if (length == 0) {
                this.activeNotifications[position].push(notification);
                notification.show(_remove);
            }
            else {
                let bodyHeight = document.body.offsetHeight;
                let totHeight = 0;
                for (let notif of this.activeNotifications[position]) {
                    totHeight += notif.offsetHeight + 20;
                }
                if (totHeight + height < bodyHeight / 3) {
                    for (let i = from; i < this.activeNotifications[position].length; i++) {
                        let notif = this.activeNotifications[position][i];
                        let top = notif.offsetTop;
                        notif.style.top = top + height + 20 + 'px';
                    }
                    this.activeNotifications[position].push(notification);
                    notification.show(_remove);
                }
                else if (firstTime) {
                    this.waitingNotifications[position].push(notification);
                }
            }
        });
    }
    _notifyBottom(notification, firstTime, from = 0) {
        return new Promise((resolve) => {
            let height = notification.offsetHeight;
            let position = "bottom";
            const _remove = (result) => {
                let index = this.activeNotifications[position].indexOf(notification);
                if (index > -1) {
                    this.activeNotifications[position].splice(index, 1);
                }
                if (this.waitingNotifications[position].length > 0) {
                    let nextNotif = this.waitingNotifications[position].splice(0, 1)[0];
                    this._notifyBottom(nextNotif, false, index);
                }
                else {
                    let bodyHeight = document.body.offsetHeight;
                    for (let i = 0; i < index; i++) {
                        let notif = this.activeNotifications[position][i];
                        let bottom = bodyHeight - (notif.offsetTop + notif.offsetHeight);
                        notif.style.bottom = bottom - height - 20 + 'px';
                    }
                }
                resolve(result);
            };
            let length = this.activeNotifications[position].length;
            if (length == 0) {
                this.activeNotifications[position].push(notification);
                notification.show(_remove);
            }
            else {
                let bodyHeight = document.body.offsetHeight;
                let totHeight = 0;
                for (let notif of this.activeNotifications[position]) {
                    totHeight += notif.offsetHeight + 20;
                }
                if (totHeight + height < bodyHeight / 3) {
                    for (let i = from; i < this.activeNotifications[position].length; i++) {
                        let notif = this.activeNotifications[position][i];
                        let bottom = bodyHeight - (notif.offsetTop + notif.offsetHeight);
                        notif.style.bottom = bottom + height + 20 + 'px';
                    }
                    this.activeNotifications[position].push(notification);
                    notification.show(_remove);
                }
                else if (firstTime) {
                    this.waitingNotifications[position].push(notification);
                }
            }
        });
    }
}
System.NotificationManager.Namespace=`${moduleName}.System`;
_.System.NotificationManager=System.NotificationManager;
System.Os = class Os extends Aventus.WebComponent {
    static get observedAttributes() {return ["desktop_list", "show_application_list", "active_desktop"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'loading'() { return this.getBoolAttr('loading') }
    set 'loading'(val) { this.setBoolAttr('loading', val) }get 'ready'() { return this.getBoolAttr('ready') }
    set 'ready'(val) { this.setBoolAttr('ready', val) }    get 'desktop_list'() { return this.getBoolProp('desktop_list') }
    set 'desktop_list'(val) { this.setBoolAttr('desktop_list', val) }get 'show_application_list'() { return this.getBoolProp('show_application_list') }
    set 'show_application_list'(val) { this.setBoolAttr('show_application_list', val) }get 'active_desktop'() { return this.getNumberProp('active_desktop') }
    set 'active_desktop'(val) { this.setNumberAttr('active_desktop', val) }    get 'desktops'() {
						return this.__watch["desktops"];
					}
					set 'desktops'(val) {
						this.__watch["desktops"] = val;
					}    static instance;
    notificationManager;
    activeDesktopEl;
    get activeDesktop() {
        return this.activeDesktopEl;
    }
    contextMenuCst = Components.ContextMenu;
    __registerWatchesActions() {
    this.__addWatchesActions("desktops");    super.__registerWatchesActions();
}
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("desktop_list", ((target) => {
    target.onShowDesktopList();
}));this.__addPropertyActions("show_application_list", ((target) => {
    if (target.appList)
        target.appList.show = target.show_application_list;
    for (let desktop of target.desktopsEl) {
        desktop.show_application_list = target.show_application_list;
    }
}));this.__addPropertyActions("active_desktop", ((target) => {
    target.onActiveDesktop();
})); }
    static __style = `:host{--_active-desktop: var(_active-desktop, 0)}:host{height:100%;position:relative;width:100%;z-index:1}:host .desktop-container{display:flex;height:100%;position:relative;width:100%;z-index:1}:host .desktop-container .desktop-case{flex-shrink:0;height:100%;position:relative;width:100%}:host .desktop-container .desktop-case .delete-desktop{--img-stroke-color: var(--red);background-color:var(--lighter-active);border-radius:50px;cursor:pointer;display:none;height:40px;position:absolute;right:5px;top:5px;z-index:5556}:host .desktop-container .desktop-case .desktop-hider{display:none;inset:0;position:absolute;z-index:5555}:host .desktop-container .desktop-case:first-child{margin-left:calc(var(--_active-desktop)*-100%)}:host .add-desktop{--img-stroke-color: white;bottom:30px;height:50px;min-width:auto;position:absolute;right:10px;z-index:6;display:none}:host rk-loading{opacity:0;visibility:hidden}:host(:not([ready])) *{opacity:0;visibility:hidden}:host(:not([loading])) rk-loading{transition:opacity 1s var(--bezier-curve),visibility 1s var(--bezier-curve)}:host([loading]) rk-loading{opacity:1;visibility:visible}:host([desktop_list]) .desktop-container{flex-wrap:wrap;height:auto;justify-content:center}:host([desktop_list]) .desktop-container .desktop-case{--nb: 3;aspect-ratio:var(--ration);box-shadow:var(--elevation-10);height:auto;margin:15px !important;overflow:hidden;width:calc(100%/var(--nb) - 30px)}:host([desktop_list]) .desktop-container .desktop-case .desktop-hider,:host([desktop_list]) .desktop-container .desktop-case .delete-desktop{display:block}:host([desktop_list]) .desktop-container .desktop-case rk-desktop{height:calc(100%*var(--nb));margin-left:calc(-50%*(var(--nb) - 1));top:calc(-50%*(var(--nb) - 1));transform:scale(calc(1 / var(--nb)));width:calc(100%*var(--nb))}:host([desktop_list]) .desktop-container .desktop-case.active{border:solid 5px var(--blue);border-radius:5px}:host([desktop_list]) .add-desktop{display:block}`;
    constructor() {
            super();
            System.Os.instance = this;
            this.notificationManager = new System.NotificationManager(this);
            Lib.ApplicationManager.reloadData();
this.desktopMoveLeft=this.desktopMoveLeft.bind(this)this.desktopMoveRight=this.desktopMoveRight.bind(this)this.desktopMoveValidate=this.desktopMoveValidate.bind(this) }
    __getStatic() {
        return Os;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Os.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<rk-app-list _id="os_0"></rk-app-list><rk-loading text="Chargement du système" background></rk-loading><rk-scrollable y_scroll="false" disable _id="os_1">    <div class="desktop-container">        <template _id="os_2"></template>    </div></rk-scrollable><rk-button-icon class="add-desktop" icon="/img/icons/add.svg" color="blue"></rk-button-icon><rk-pwa-prompt></rk-pwa-prompt>` }
    });
}
    get desktopsEl () { var list = Array.from(this.shadowRoot.querySelectorAll('[_id="os_5"]')); return list; }    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "appList",
      "ids": [
        "os_0"
      ]
    },
    {
      "name": "desktopContainerScroll",
      "ids": [
        "os_1"
      ]
    }
  ]
});const templ0 = new Aventus.Template(this);templ0.setTemplate(`             <div class="desktop-case">                <rk-img class="delete-desktop" src="/img/icons/close.svg" _id="os_3"></rk-img>                <div class="desktop-hider" _id="os_4"></div>                <rk-desktop _id="os_5"></rk-desktop>            </div>        `);templ0.setActions({
  "content": {
    "os_3°data-id": {
      "fct": (c) => `${c.print(c.comp.__1ce90dbdb85fa41f02d47acb05511f03method2(c.data.desktop))}`,
      "once": true
    },
    "os_4°index": {
      "fct": (c) => `${c.print(c.comp.__1ce90dbdb85fa41f02d47acb05511f03method3(c.data.index))}`,
      "once": true
    },
    "os_5°desktop_id": {
      "fct": (c) => `${c.print(c.comp.__1ce90dbdb85fa41f02d47acb05511f03method2(c.data.desktop))}`,
      "once": true
    }
  },
  "pressEvents": [
    {
      "id": "os_3",
      "onPress": (e, pressInstance, c) => { c.comp.deleteDesktop(e, pressInstance); }
    },
    {
      "id": "os_4",
      "onPress": (e, pressInstance, c) => { c.comp.selectDesktop(e, pressInstance); }
    }
  ],
  "contextEdits": [
    {
      "fct": (c) => c.comp.__1ce90dbdb85fa41f02d47acb05511f03method1(c.data.index)
    }
  ]
});this.__getStatic().__template.addLoop({
                    anchorId: 'os_2',
                    template: templ0,
                simple:{data: "this.desktops",index:"index"}}); }
    getClassName() {
        return "Os";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('loading')) { this.attributeChangedCallback('loading', false, false); }if(!this.hasAttribute('ready')) { this.attributeChangedCallback('ready', false, false); }if(!this.hasAttribute('desktop_list')) { this.attributeChangedCallback('desktop_list', false, false); }if(!this.hasAttribute('show_application_list')) { this.attributeChangedCallback('show_application_list', false, false); }if(!this.hasAttribute('active_desktop')){ this['active_desktop'] = 0; } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["desktops"] = []; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('loading');this.__upgradeProperty('ready');this.__upgradeProperty('desktop_list');this.__upgradeProperty('show_application_list');this.__upgradeProperty('active_desktop'); }
    __listBoolProps() { return ["loading","ready","desktop_list","show_application_list"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    onActiveDesktop() {
        this.style.setProperty("--_active-desktop", this.active_desktop + "");
        if (this.activeDesktopEl) {
            this.activeDesktopEl.is_active = false;
            this.activeDesktopEl.parentElement?.classList.remove("active");
        }
        this.activeDesktopEl = this.desktopsEl[this.active_desktop];
        if (this.activeDesktopEl) {
            this.activeDesktopEl.is_active = true;
            this.activeDesktopEl.parentElement?.classList.add("active");
        }
    }
    desktopMoveLeft() {
        if (this.active_desktop - 1 < 0) {
            this.active_desktop = this.desktops.length - 1;
        }
        else {
            this.active_desktop--;
        }
    }
    desktopMoveRight() {
        if (this.active_desktop + 1 == this.desktops.length) {
            this.active_desktop = 0;
        }
        else {
            this.active_desktop++;
        }
    }
    desktopMoveValidate() {
        this.desktop_list = false;
    }
    onShowDesktopList() {
        if (this.isReady) {
            this.desktopContainerScroll.y_scroll = this.desktop_list;
            this.desktopContainerScroll.disable = !this.desktop_list;
        }
        State.DesktopStateManager.getInstance().setState("/");
        if (this.desktop_list) {
            Lib.ShortcutManager.subscribe([Lib.SpecialTouch.ArrowRight], this.desktopMoveRight);
            Lib.ShortcutManager.subscribe([Lib.SpecialTouch.ArrowLeft], this.desktopMoveLeft);
            Lib.ShortcutManager.subscribe([Lib.SpecialTouch.Enter], this.desktopMoveValidate);
            Lib.ShortcutManager.subscribe([Lib.SpecialTouch.Escape], this.desktopMoveValidate);
        }
        else {
            Lib.ShortcutManager.unsubscribe([Lib.SpecialTouch.ArrowRight], this.desktopMoveRight);
            Lib.ShortcutManager.unsubscribe([Lib.SpecialTouch.ArrowLeft], this.desktopMoveLeft);
            Lib.ShortcutManager.unsubscribe([Lib.SpecialTouch.Enter], this.desktopMoveValidate);
            Lib.ShortcutManager.unsubscribe([Lib.SpecialTouch.Escape], this.desktopMoveValidate);
        }
    }
    addSwitchDesktop() {
        Lib.ShortcutManager.subscribe([Lib.SpecialTouch.Shift, Lib.SpecialTouch.Tab], () => {
            this.desktop_list = true;
        });
    }
    async deleteDesktop(e, instance) {
        if (this.desktops.length <= 1) {
            await this.alert("Impossible de supprimer le bureau", "Il vous faut au minimum un bureau actif");
        }
        else if (await this.confirm("Suppression d'un bureau", "Etes-vous sûr de vouloir supprimer ce bureau?", "Oui", "Non")) {
            let id = Number(instance.getElement().dataset.id);
            await RAM.DesktopRAM.getInstance().deleteById(id);
        }
    }
    async syncDesktopData() {
        this.desktops = await RAM.DesktopRAM.getInstance().getList();
        this.onActiveDesktop();
        RAM.DesktopRAM.getInstance().onDeleted((el) => {
            for (let i = 0; i < this.desktops.length; i++) {
                if (this.desktops[i].Id == el.Id) {
                    this.desktops.splice(i, 1);
                    if (this.active_desktop == i) {
                        this.active_desktop = 0;
                        if (i == 0) {
                            this.onActiveDesktop();
                        }
                    }
                    else if (this.active_desktop > i) {
                        this.active_desktop--;
                    }
                    return;
                }
            }
        });
        RAM.DesktopRAM.getInstance().onCreated((el) => {
            this.desktops.push(el);
        });
    }
    async systemLoading() {
        const minDelay = 3000;
        let start;
        let timeout = setTimeout(() => {
            start = new Date();
            this.loading = true;
        }, 200);
        await RAM.ApplicationRAM.getInstance().getAll();
        await this.syncDesktopData();
        clearTimeout(timeout);
        if (start) {
            let now = new Date();
            let diffMs = now.getTime() - start.getTime();
            if (diffMs < minDelay) {
                await Aventus.sleep(minDelay - diffMs);
            }
        }
        this.loading = false;
        this.ready = true;
    }
    async openUrl(application, componentUrl = "/", url = "/") {
        this.activeDesktopEl.openUrl(application, componentUrl, url);
    }
    async unHideApplication(application, componentUrl = "/") {
        await this.activeDesktopEl.unHideApplication(application, componentUrl);
    }
    notify(notification) {
        return this.notificationManager.notify(notification);
    }
    rightClick() {
        this.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            const isTouch = Lib.Pointer.isTouch(e);
            const menu = new this.contextMenuCst();
            menu.init(e.pageX, e.pageY, isTouch, this);
        });
    }
    preventScroll() {
        document.body.addEventListener("scroll", (e) => {
            document.body.scrollTop = 0;
            document.body.scrollLeft = 0;
        });
    }
    setContextMenu(contextMenuCst) {
        this.contextMenuCst = contextMenuCst;
    }
    setDefaultContextMenu() {
        this.contextMenuCst = Components.ContextMenu;
    }
    popup(p) {
        return new Promise((resolve) => {
            p.init((response) => {
                resolve(response);
            });
            this.shadowRoot.appendChild(p);
        });
    }
    async alert(title, message, okBtnTxt) {
        const a = new Components.Alert();
        a.subject = title;
        a.body = message;
        if (okBtnTxt) {
            a.btn_txt = okBtnTxt;
        }
        await this.popup(a);
    }
    async confirm(title, message, yesBtnTxt, noBtnTxt) {
        const c = new Components.Confirm();
        c.subject = title;
        c.body = message;
        if (yesBtnTxt) {
            c.btn_yes_txt = yesBtnTxt;
        }
        if (noBtnTxt) {
            c.btn_no_txt = noBtnTxt;
        }
        return await this.popup(c);
    }
    selectDesktop(e, pressInstance) {
        let el = pressInstance.getElement();
        let index = Number(el.getAttribute("index"));
        this.active_desktop = index;
        setTimeout(() => {
            this.desktop_list = false;
        }, 100);
    }
    addResizeObserver() {
        new Aventus.ResizeObserver(() => {
            this.style.setProperty("--ration", this.offsetWidth + " / " + this.offsetHeight);
        }).observe(this);
    }
    async startSocket() {
        await Lib.MainSocket.open();
        Lib.ApplicationManager.init();
    }
    postCreation() {
        this.addResizeObserver();
        this.systemLoading();
        this.rightClick();
        this.preventScroll();
        this.addSwitchDesktop();
        this.startSocket();
    }
    __1ce90dbdb85fa41f02d47acb05511f03method2(desktop) {
        return desktop.Id;
    }
    __1ce90dbdb85fa41f02d47acb05511f03method3(index) {
        return index;
    }
    __1ce90dbdb85fa41f02d47acb05511f03method1(index) {
        return { 'desktop': this.desktops[index] };
    }
}
System.Os.Namespace=`${moduleName}.System`;
System.Os.Tag=`rk-os`;
_.System.Os=System.Os;
if(!window.customElements.get('rk-os')){window.customElements.define('rk-os', System.Os);Aventus.WebComponentInstance.registerDefinition(System.Os);}

System.AppIcon = class AppIcon extends Aventus.WebComponent {
    get 'shaking'() { return this.getBoolAttr('shaking') }
    set 'shaking'(val) { this.setBoolAttr('shaking', val) }get 'can_remove'() { return this.getBoolAttr('can_remove') }
    set 'can_remove'(val) { this.setBoolAttr('can_remove', val) }get 'is_open'() { return this.getBoolAttr('is_open') }
    set 'is_open'(val) { this.setBoolAttr('is_open', val) }get 'position'() { return this.getNumberAttr('position') }
    set 'position'(val) { this.setNumberAttr('position', val) }    pressManager;
    dragAndDrop;
    iconId = 0;
    static __style = `:host{align-items:center;background-color:#0c2247;border-radius:5px;box-shadow:var(--elevation-5);cursor:pointer;display:flex;height:30px;justify-content:center;position:relative;transition:box-shadow var(--bezier-curve) .3s,transform var(--bezier-curve) .3s;width:30px;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host::after{background-color:var(--text-color);border-radius:5px;bottom:-7px;content:"";height:4px;opacity:0;position:absolute;transition:visibility var(--bezier-curve) .3s,opacity var(--bezier-curve) .3s;visibility:hidden;width:4px}:host .remove{background-color:var(--primary-color);border-radius:10px;display:none;height:20px;position:absolute;right:-10px;top:-10px;width:20px}:host .remove rk-img{--img-stroke-color: var(--text-color);height:100%;padding:0;width:100%}:host([shaking]){animation:shake linear .4s infinite}:host([can_remove]) .remove{display:block}:host([is_open]){transform:translateY(-3px)}:host([is_open])::after{visibility:visible;opacity:1}@media screen and (min-width: 1225px){:host(:hover){box-shadow:var(--elevation-1)}}@media screen and (max-width: 768px){:host{height:50px;width:50px}}@keyframes shake{0%{transform:rotateZ(0) rotateX(-13deg)}25%{transform:rotateZ(2deg) rotateX(-13deg)}50%{transform:rotateZ(0) rotateX(-13deg)}75%{transform:rotateZ(-2deg) rotateX(-13deg)}100%{transform:rotateZ(0) rotateX(-13deg)}}`;
    constructor() {
            super();
            this.classList.add("touch");
if (this.constructor == AppIcon) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return AppIcon;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(AppIcon.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="remove"><rk-img src="/img/icons/close.svg"></rk-img></div><slot></slot>` }
    });
}
    __createStates() { super.__createStates(); let that = this;  this.__createStatesList(State.MoveApplication.state, State.DesktopStateManager);this.__addActiveState(State.MoveApplication.state, State.DesktopStateManager, (state, slugs) => { that.__inactiveDefaultState(State.DesktopStateManager); that.onMoveApplication(state, slugs);})this.__addInactiveState(State.MoveApplication.state, State.DesktopStateManager, (state, nextState, slugs) => { that.onStopMovingApplication(state, nextState, slugs);that.__activeDefaultState(nextState, State.DesktopStateManager);}) }
    getClassName() {
        return "AppIcon";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('shaking')) { this.attributeChangedCallback('shaking', false, false); }if(!this.hasAttribute('can_remove')) { this.attributeChangedCallback('can_remove', false, false); }if(!this.hasAttribute('is_open')) { this.attributeChangedCallback('is_open', false, false); }if(!this.hasAttribute('position')){ this['position'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('shaking');this.__upgradeProperty('can_remove');this.__upgradeProperty('is_open');this.__upgradeProperty('position'); }
    __listBoolProps() { return ["shaking","can_remove","is_open"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    onContextMenu(contextMenu, stop) {
        if (contextMenu.isTouch) {
            contextMenu.addItem({
                text: "Organiser les applications",
                icon: "/img/icons/organize-app.svg",
                priority: 1,
                action: () => {
                    new State.MoveApplication().activate(State.DesktopStateManager.getInstance());
                }
            });
        }
        contextMenu.addSeparator({
            priority: 1
        });
        contextMenu.addItem({
            text: "test",
            priority: 1,
            action: () => {
            }
        });
    }
    componentUrl() {
        return "/";
    }
    url() {
        return "/";
    }
    openApp() {
        if (this.shaking) {
            return;
        }
        let cst = this.constructor;
        let application = cst.Fullname.split(".")[0];
        if (this.is_open) {
            System.Os.instance.unHideApplication(application, this.componentUrl());
        }
        else {
            System.Os.instance.openUrl(application, this.componentUrl(), this.url());
        }
    }
    onMoveApplication() {
        this.shaking = true;
        this.destroyPressManager();
        this.createDragAndDrop();
    }
    onStopMovingApplication() {
        this.shaking = false;
        this.destroyDragAndDrop();
        this.createPressManager();
    }
    createPressManager() {
        this.destroyPressManager();
        this.pressManager = new Aventus.PressManager({
            element: this,
            onPress: () => {
                this.openApp();
            },
            onLongPress: (e) => {
                if (e.pointerType == "mouse") {
                    new State.MoveApplication().activate(State.DesktopStateManager.getInstance());
                }
                else {
                    // e.pointerType == touch | pen
                }
            }
        });
    }
    destroyPressManager() {
        this.pressManager?.destroy();
        this.pressManager = undefined;
    }
    createDragAndDrop() {
        let state = State.DesktopStateManager.getInstance().getState();
        if (!(state instanceof State.MoveApplication)) {
            return;
        }
        let moveApplication = state;
        let shadow = this;
        let startW = 0;
        let startH = 0;
        let baseOffsetX = 0;
        let baseOffsetY = 0;
        let createShadow = false;
        let parent = this.parentNode;
        let reset = () => {
            parent?.appendChild(this);
        };
        if (this.findParentByType(System.AppList)) {
            createShadow = true;
        }
        this.dragAndDrop = new Aventus.DragAndDrop({
            element: this,
            onMove: (e, position) => {
                moveApplication.onMove(shadow, e.pageX, e.pageY);
            },
            getOffsetY: () => {
                return baseOffsetY + (startH - shadow.offsetHeight) / 2;
            },
            getOffsetX: () => {
                return baseOffsetX + (startW - shadow.offsetWidth) / 2;
            },
            onStart: (e) => {
                startW = this.offsetWidth;
                startH = this.offsetHeight;
                if (shadow == this) {
                    let elBox = this.getBoundingClientRect();
                    // add offset to counter the default drag&drop behaviour
                    baseOffsetX = elBox.x - this.offsetLeft;
                    baseOffsetY = elBox.y - this.offsetTop;
                    document.body.appendChild(this);
                }
                shadow.style.zIndex = '505';
                shadow.style.opacity = '0.6';
                shadow.style.pointerEvents = 'none';
                shadow.style.position = 'absolute';
                shadow.style.width = startW + 'px';
                shadow.style.height = startH + 'px';
            },
            shadow: {
                enable: createShadow,
                transform: (el) => {
                    shadow = el;
                    System.Os.instance.show_application_list = false;
                }
            },
            onStop: (e) => {
                moveApplication.onDrop(shadow, e.pageX, e.pageY, reset);
            }
        });
    }
    destroyDragAndDrop() {
        this.dragAndDrop?.destroy();
        this.dragAndDrop = undefined;
    }
    postCreation() {
        Lib.AppIconManager.register(this, this.componentUrl());
        this.createPressManager();
    }
}
System.AppIcon.Namespace=`${moduleName}.System`;
_.System.AppIcon=System.AppIcon;

System.AppIconInline = class AppIconInline extends Aventus.WebComponent {
    static get observedAttributes() {return ["text"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'text'() { return this.getStringProp('text') }
    set 'text'(val) { this.setStringAttr('text', val) }    static __style = `:host{align-items:center;display:flex;gap:10px;box-shadow:var(--elevation-3);cursor:pointer}:host .icon-container{height:30px;position:relative;width:30px}:host .icon-container .hider{inset:0;position:absolute}:host .icon-container .icon{height:100%;width:100%}:host .icon-container .icon *{box-shadow:none !important;animation:none !important;pointer-events:none}:host .text{flex-grow:1;flex-wrap:nowrap;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}`;
    __getStatic() {
        return AppIconInline;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(AppIconInline.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="icon-container">    <div class="hider"></div>    <div class="icon" _id="appiconinline_0"></div></div><div class="text" _id="appiconinline_1"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "iconEl",
      "ids": [
        "appiconinline_0"
      ]
    }
  ],
  "content": {
    "appiconinline_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__19c78f75be261ad427a444f38f56b227method0())}`,
      "once": true
    }
  }
}); }
    getClassName() {
        return "AppIconInline";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('text')){ this['text'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('text'); }
    setIcon(element) {
        this.iconEl.innerHTML = "";
        this.iconEl.appendChild(element);
    }
    postCreation() {
        new Aventus.PressManager({
            element: this,
            onPress: () => {
                if (this.iconEl.children.length > 0 && this.iconEl.children[0] instanceof System.AppIcon) {
                    this.iconEl.children[0].openApp();
                }
            }
        });
    }
    __19c78f75be261ad427a444f38f56b227method0() {
        return this.text;
    }
}
System.AppIconInline.Namespace=`${moduleName}.System`;
System.AppIconInline.Tag=`rk-app-icon-inline`;
_.System.AppIconInline=System.AppIconInline;
if(!window.customElements.get('rk-app-icon-inline')){window.customElements.define('rk-app-icon-inline', System.AppIconInline);Aventus.WebComponentInstance.registerDefinition(System.AppIconInline);}

System.ApplicationSidnav = class ApplicationSidnav extends System.Application {
    get 'hide_menu_size'() { return this.getStringAttr('hide_menu_size') }
    set 'hide_menu_size'(val) { this.setStringAttr('hide_menu_size', val) }    get 'sidnavItems'() {
						return this.__watch["sidnavItems"];
					}
					set 'sidnavItems'(val) {
						this.__watch["sidnavItems"] = val;
					}    __registerWatchesActions() {
    this.__addWatchesActions("sidnavItems");    super.__registerWatchesActions();
}
    static __style = `:host .content{display:flex;height:calc(100% - 30px);margin:0;position:relative;width:100%}:host .content .sidenav{background-color:var(--secondary-color);box-shadow:var(--elevation-4);height:100%;width:200px}:host .content .sidenav .sidenav-item{align-items:center;border-bottom:1px solid var(--lighter-active);cursor:pointer;display:flex;flex-wrap:nowrap;height:51px;padding:10px;transition:linear background-color .3s}:host .content .sidenav .sidenav-item rk-img{--img-fill-color: var(--text-color);flex-grow:0;flex-shrink:0;height:30px;width:30px}:host .content .sidenav .sidenav-item rk-img[src=""]{display:none}:host .content .sidenav .sidenav-item span{color:var(--text-color);flex-grow:1;flex-shrink:0;margin-left:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:calc(100% - 45px)}:host .content .sidenav .sidenav-item rk-img[src=""]~span{margin-left:0}:host .content .sidenav .sidenav-item[active]{background-color:var(--lighter-active)}:host .content .container{height:100%;width:calc(100% - 200px)}@media screen and (min-width: 1225px){:host .content .sidenav .sidenav-item:hover{background-color:var(--lighter-active)}}@container application (max-width: 300px){:host([hide_menu_size=xs]) .content .sidenav{position:absolute;transform:translateX(-100%)}:host([hide_menu_size=xs]) .content .container{width:100%}}@container application (max-width: 540px){:host([hide_menu_size=sm]) .content .sidenav{position:absolute;transform:translateX(-100%)}:host([hide_menu_size=sm]) .content .container{width:100%}}@container application (max-width: 720px){:host([hide_menu_size=md]) .content .sidenav{position:absolute;transform:translateX(-100%)}:host([hide_menu_size=md]) .content .container{width:100%}}@container application (max-width: 960px){:host([hide_menu_size=lg]) .content .sidenav{position:absolute;transform:translateX(-100%)}:host([hide_menu_size=lg]) .content .container{width:100%}}@container application (max-width: 1140px){:host([hide_menu_size=xl]) .content .sidenav{position:absolute;transform:translateX(-100%)}:host([hide_menu_size=xl]) .content .container{width:100%}}`;
    constructor() { super(); if (this.constructor == ApplicationSidnav) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return ApplicationSidnav;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(ApplicationSidnav.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="header" _id="applicationsidnav_0">    <div class="background"></div>    <div class="navigation-actions">        <div class="previous action touch disable" _id="applicationsidnav_1">            <rk-img src="/img/icons/angle-left.svg"></rk-img>        </div>        <div class="next action touch disable" _id="applicationsidnav_2">            <rk-img src="/img/icons/angle-right.svg"></rk-img>        </div>    </div>    <div class="title" _id="applicationsidnav_3"></div>    <div class="application-actions">        <div class="btn green touch" _id="applicationsidnav_4"></div>        <div class="btn orange touch" _id="applicationsidnav_5"></div>        <div class="btn red touch" _id="applicationsidnav_6"></div>    </div></div><div class="content">    <div class="sidenav">        <rk-scrollable auto_hide _id="applicationsidnav_7">            <template _id="applicationsidnav_8"></template>        </rk-scrollable>    </div>    <div class="container" _id="applicationsidnav_12">    </div></div><rk-resize min_width="200" min_height="200" _id="applicationsidnav_13"></rk-resize><rk-loading class="loading"></rk-loading><slot></slot>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "header",
      "ids": [
        "applicationsidnav_0"
      ]
    },
    {
      "name": "navigatePreviousEl",
      "ids": [
        "applicationsidnav_1"
      ]
    },
    {
      "name": "navigateNextEl",
      "ids": [
        "applicationsidnav_2"
      ]
    },
    {
      "name": "navEl",
      "ids": [
        "applicationsidnav_7"
      ]
    },
    {
      "name": "contentEl",
      "ids": [
        "applicationsidnav_12"
      ]
    },
    {
      "name": "resizeEl",
      "ids": [
        "applicationsidnav_13"
      ]
    }
  ],
  "content": {
    "applicationsidnav_3°@HTML": {
      "fct": (c) => `${c.print(c.comp.__564ed14a7e807cc2bd8ebdf7d29b1c4fmethod1())}`,
      "once": true
    }
  },
  "pressEvents": [
    {
      "id": "applicationsidnav_1",
      "onPress": (e, pressInstance, c) => { c.comp.navigatePrevious(e, pressInstance); }
    },
    {
      "id": "applicationsidnav_2",
      "onPress": (e, pressInstance, c) => { c.comp.navigateNext(e, pressInstance); }
    },
    {
      "id": "applicationsidnav_4",
      "onPress": (e, pressInstance, c) => { c.comp.hide(e, pressInstance); }
    },
    {
      "id": "applicationsidnav_5",
      "onPress": (e, pressInstance, c) => { c.comp.toggleFull(e, pressInstance); }
    },
    {
      "id": "applicationsidnav_6",
      "onPress": (e, pressInstance, c) => { c.comp.kill(e, pressInstance); }
    }
  ]
});const templ0 = new Aventus.Template(this);templ0.setTemplate(`                 <rk-link class="sidenav-item" _id="applicationsidnav_9">                    <rk-img _id="applicationsidnav_10"></rk-img>                    <span _id="applicationsidnav_11"></span>                </rk-link>            `);templ0.setActions({
  "content": {
    "applicationsidnav_9°to": {
      "fct": (c) => `${c.print(c.comp.__564ed14a7e807cc2bd8ebdf7d29b1c4fmethod2(c.data.item))}`,
      "once": true
    },
    "applicationsidnav_9°active_pattern": {
      "fct": (c) => `${c.print(c.comp.__564ed14a7e807cc2bd8ebdf7d29b1c4fmethod3(c.data.item))}`,
      "once": true
    },
    "applicationsidnav_10°src": {
      "fct": (c) => `${c.print(c.comp.__564ed14a7e807cc2bd8ebdf7d29b1c4fmethod4(c.data.item))}`,
      "once": true
    },
    "applicationsidnav_11°@HTML": {
      "fct": (c) => `${c.print(c.comp.__564ed14a7e807cc2bd8ebdf7d29b1c4fmethod5(c.data.item))}`,
      "once": true
    }
  }
});this.__getStatic().__template.addLoop({
                    anchorId: 'applicationsidnav_8',
                    template: templ0,
                simple:{data: "this.sidnavItems",item:"item"}}); }
    getClassName() {
        return "ApplicationSidnav";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('hide_menu_size')){ this['hide_menu_size'] = "sm"; } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["sidnavItems"] = []; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('hide_menu_size'); }
    addRouteSidenav(options) {
        let route = options.route;
        this.allRoutes[route] = {
            route: route,
            scriptUrl: '',
            render: () => options.elementCtr
        };
        this.sidnavItems.push({
            name: options.name,
            icon: options.icon ?? "",
            route: route,
            active: options.activeRoute ?? route
        });
    }
    __564ed14a7e807cc2bd8ebdf7d29b1c4fmethod1() {
        return this.app_title;
    }
    __564ed14a7e807cc2bd8ebdf7d29b1c4fmethod2(item) {
        return item.route;
    }
    __564ed14a7e807cc2bd8ebdf7d29b1c4fmethod3(item) {
        return item.active;
    }
    __564ed14a7e807cc2bd8ebdf7d29b1c4fmethod4(item) {
        return item.icon;
    }
    __564ed14a7e807cc2bd8ebdf7d29b1c4fmethod5(item) {
        return item.name;
    }
}
System.ApplicationSidnav.Namespace=`${moduleName}.System`;
_.System.ApplicationSidnav=System.ApplicationSidnav;

RAM.UserRAM=class UserRAM extends AventusSharp.RAM.RamHttp {
    connectedUserId;
    /**
     * Create a singleton to store data
     */
    static getInstance() {
        return Aventus.Instance.get(RAM.UserRAM);
    }
    /**
     * @inheritdoc
     */
    defineIndexKey() {
        return 'Id';
    }
    /**
     * @inheritdoc
     */
    getTypeForData(objJson) {
        return this.addUserMethod(Data.User);
    }
    /**
     * @inheritdoc
     */
    defineRoutes() {
        return new Routes.UserRouter(new Lib.HttpRouter());
    }
    async getConnected() {
        return this.actionGuard.run(["getConnected"], async () => {
            let result = new Aventus.ResultWithError();
            if (!this.connectedUserId) {
                let query = await new Routes.CoreRouter().routes.User.GetConnected();
                if (!query.success || !query.result) {
                    result.errors = query.errors;
                    return result;
                }
                this.connectedUserId = query.result.Id;
                this.addOrUpdateData(query.result, result);
                if (!result.success) {
                    return result;
                }
            }
            return this.getByIdWithError(this.connectedUserId);
        });
    }
    /**
     * Mixin pattern to add methods
     */
    addUserMethod(Base) {
        return class Extension extends Base {
            static get className() {
                return Base.className || Base.name;
            }
            get className() {
                return Base.className || Base.name;
            }
        };
    }
}
RAM.UserRAM.Namespace=`${moduleName}.RAM`;
_.RAM.UserRAM=RAM.UserRAM;
Lib.SessionManager=class SessionManager {
    static async logout() {
        try {
            await new Routes.CoreRouter().routes.Logout();
        }
        catch { }
        window.location.reload();
    }
    static async getUser() {
        let result = await RAM.UserRAM.getInstance().getConnected();
        if (result.containsCode(Errors.LoginCode.NotConnected, Errors.LoginError)) {
            this.logout();
        }
        else if (!result.success) {
        }
        return result.result;
    }
}
Lib.SessionManager.Namespace=`${moduleName}.Lib`;
_.Lib.SessionManager=Lib.SessionManager;
System.HomePanel = class HomePanel extends System.Panel {
    get 'currentUser'() {
						return this.__watch["currentUser"];
					}
					set 'currentUser'(val) {
						this.__watch["currentUser"] = val;
					}    __registerWatchesActions() {
    this.__addWatchesActions("currentUser");    super.__registerWatchesActions();
}
    static __style = `:host{display:flex;flex-direction:column;left:-9px;position:absolute;width:500px}:host .content{flex-grow:1;max-height:calc(100% - 57px)}:host .content rk-row{height:100%}:host .content rk-row rk-col{height:100%}:host .content rk-row rk-col .title{font-weight:700;height:30px;padding:5px}:host .content rk-row rk-col .scrollable{--scroller-right: 0;height:calc(100% - 30px);width:100%}:host .content rk-row rk-col .recent{width:100%}:host .content rk-row rk-col .recent .recent-container *{background-color:var(--primary-color);border-radius:5px;margin:10px;overflow:hidden}:host .content rk-row rk-col .favoris{width:100%}:host .content rk-row rk-col .favoris .favoris-container .grid{display:flex;flex-wrap:wrap;gap:10px;padding:10px}:host .content rk-row rk-col .favoris .favoris-container .grid *{width:calc(33.3333333333% - 6.6666666667px);flex-shrink:0;aspect-ratio:1/1;height:auto}:host .footer{align-items:center;border-top:1px solid var(--lighter-active);display:flex;gap:10px;height:57px;padding:10px 10px;width:100%}:host .footer rk-img{height:25px}:host .footer .nom{flex-grow:1}:host .footer rk-button{--button-padding: 0px 8px;--button-icon-stroke-color: red;--button-icon-fill-color: transparent;--button-background-color: var(--darker-active);box-shadow:none;min-width:auto}`;
    __getStatic() {
        return HomePanel;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(HomePanel.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="content">    <rk-row>        <rk-col size="6">            <div class="recent">                <div class="title">                    Récents                </div>                <rk-scrollable class="scrollable recent-container" floating_scroll _id="homepanel_0">                </rk-scrollable>            </div>        </rk-col>        <rk-col size="6">            <div class="favoris">                <div class="title">                    Mes favoris                </div>                <rk-scrollable class="scrollable favoris-container" floating_scroll>                    <div class="grid" _id="homepanel_1"></div>                </rk-scrollable>            </div>        </rk-col>    </rk-row></div><div class="footer">    <div class="icon">        <rk-img src="/img/avatar.png"></rk-img>    </div>    <div class="nom" _id="homepanel_2"></div>    <rk-button outline icon="/img/icons/power-off.svg" _id="homepanel_3"></rk-button></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "recentContainer",
      "ids": [
        "homepanel_0"
      ]
    },
    {
      "name": "favorisContainer",
      "ids": [
        "homepanel_1"
      ]
    }
  ],
  "content": {
    "homepanel_2°@HTML": {
      "fct": (c) => `${c.print(c.comp.__71121dd8c2837747a91ecf75da806c7amethod0())} ${c.print(c.comp.__71121dd8c2837747a91ecf75da806c7amethod1())}`
    }
  },
  "pressEvents": [
    {
      "id": "homepanel_3",
      "onPress": (e, pressInstance, c) => { c.comp.logout(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "HomePanel";
    }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["currentUser"] = undefined; }
    async logout() {
        Lib.SessionManager.logout();
    }
    async displayRecent() {
        for (let i = 0; i < 20; i++) {
            let test = new System.AppIconInline();
            let icon = Aventus.WebComponentInstance.create("Cave.System.AppIcon");
            let app = await RAM.ApplicationRAM.getInstance().getApplicationByName("Cave");
            if (icon && app) {
                test.setIcon(icon);
                test.text = app.DisplayName;
            }
            this.recentContainer.appendChild(test);
        }
    }
    async displayFavoris() {
        for (let i = 0; i < 20; i++) {
            let icon = Aventus.WebComponentInstance.create("Cave.System.AppIcon");
            if (icon) {
                this.favorisContainer.appendChild(icon);
            }
        }
    }
    async getUser() {
        this.currentUser = await Lib.SessionManager.getUser();
    }
    postCreation() {
        this.getUser();
        this.displayRecent();
        this.displayFavoris();
        new Aventus.PressManager({
            element: this,
            onPress: () => { },
            onDrag: () => { },
        });
    }
    __71121dd8c2837747a91ecf75da806c7amethod0() {
        return this.currentUser?.Firstname;
    }
    __71121dd8c2837747a91ecf75da806c7amethod1() {
        return this.currentUser?.Lastname;
    }
}
System.HomePanel.Namespace=`${moduleName}.System`;
System.HomePanel.Tag=`rk-home-panel`;
_.System.HomePanel=System.HomePanel;
if(!window.customElements.get('rk-home-panel')){window.customElements.define('rk-home-panel', System.HomePanel);Aventus.WebComponentInstance.registerDefinition(System.HomePanel);}

Lib.Platform=class Platform {
    static get device() {
        if (document.body.offsetWidth > 1224) {
            return "pc";
        }
        else if (document.body.offsetWidth > 768) {
            return "tablet";
        }
        return "mobile";
    }
    static get isStandalone() {
        if ("standalone" in window.navigator && window.navigator.standalone) {
            return true;
        }
        return false;
    }
    static get isiOS() {
        let test1 = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
        let test2 = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
        return test1 || test2;
    }
}
Lib.Platform.Namespace=`${moduleName}.Lib`;
_.Lib.Platform=Lib.Platform;
System.PwaPromptIos = class PwaPromptIos extends Aventus.WebComponent {
    get 'ready'() { return this.getBoolAttr('ready') }
    set 'ready'(val) { this.setBoolAttr('ready', val) }    static get isAvailable() {
        return Lib.Platform.isiOS && !Lib.Platform.isStandalone;
    }
    static __style = `:host .noScroll{overflow:hidden}:host .pwaPromptOverlay{background-color:rgba(0,0,0,.8);left:0;min-height:100vh;min-height:-webkit-fill-available;opacity:0;pointer-events:none;position:fixed;top:0;touch-action:none;visibility:hidden;width:100vw;z-index:999999}:host .pwaPromptOverlay.visible{display:block;opacity:1;pointer-events:initial;touch-action:initial;visibility:visible}:host .pwaPromptOverlay.modern{background:rgba(10,10,10,.5);color:rgba(235,235,245,.6)}:host .pwaPrompt{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background-color:rgba(250,250,250,.8);border-radius:10px;bottom:0;color:#000;filter:brightness(1.1);left:0;margin:0 8px 10px;overflow:hidden;pointer-events:none;position:fixed;touch-action:none;transform:translateY(calc(100% + 10px));width:calc(100vw - 16px);z-index:999999}:host .pwaPrompt.visible{display:block;pointer-events:initial;touch-action:initial;transform:translateY(0)}:host .pwaPrompt.modern{background:rgba(65,65,65,.7);filter:brightness(1.1)}:host .pwaPromptHeader{align-items:center;border-bottom:1px solid rgba(0,0,0,.1);border-left:0px;border-right:0px;border-top:0px;border-width:.5px;display:flex;flex-flow:row nowrap;justify-content:space-between;padding:13px 16px}:host .modern .pwaPromptHeader{border-color:rgba(140,140,140,.7)}:host .pwaPromptHeader .pwaPromptTitle{color:#333;font-family:-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-size:18px;font-weight:500;line-height:1.125;margin:0;padding:0}:host .modern .pwaPromptHeader .pwaPromptTitle{color:#fff}:host .pwaPromptHeader .pwaPromptCancel{background:rgba(0,0,0,0);border:0;color:#2d7cf6;font-size:16px;margin:0;padding:0}:host .modern .pwaPromptHeader .pwaPromptCancel{color:#0984ff}:host .pwaPromptBody{display:flex;width:100%}:host .pwaPromptBody .pwaPromptDescription{border-bottom:1px solid rgba(0,0,0,.1);border-left:0px;border-right:0px;border-top:0px;border-width:.5px;color:inherit;margin:0 16px;padding:16px;width:100%}:host .modern .pwaPromptBody .pwaPromptDescription{border-color:rgba(140,140,140,.7)}:host .pwaPromptCopy{color:#7b7b7a;font-family:-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-size:13px;line-height:17px;margin:0;padding:0}:host .pwaPromptCopy.bold{font-weight:600}:host .modern .pwaPromptCopy{border-color:rgba(235,235,245,.6);color:rgba(235,235,245,.6)}:host .pwaPromptInstruction{color:inherit;margin:0 16px;padding:16px}:host .pwaPromptInstruction .pwaPromptInstructionStep{align-items:center;display:flex;flex-flow:row nowrap;justify-content:flex-start;margin-bottom:16px;text-align:left}:host .pwaPromptInstruction .pwaPromptInstructionStep:last-of-type{margin-bottom:0}:host .pwaPromptInstruction .pwaPromptShareIcon,:host .pwaPromptInstruction .pwaPromptHomeIcon{flex:0 0 auto;height:30px;margin-right:32px;width:25px}:host .pwaPromptInstruction .pwaPromptHomeIcon{color:#2d7cf6}:host .modern .pwaPromptInstruction .pwaPromptHomeIcon{color:#fff;fill:#fff}:host .pwaPromptInstruction .pwaPromptShareIcon{color:#2d7cf6;fill:#2d7cf6}:host .modern .pwaPromptInstruction .pwaPromptShareIcon{color:#0984ff;fill:#0984ff}:host([ready]) .pwaPromptOverlay{transition:opacity .2s ease-in}:host([ready]) .pwaPrompt{transition:transform .4s cubic-bezier(0.4, 0.24, 0.3, 1)}`;
    __getStatic() {
        return PwaPromptIos;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(PwaPromptIos.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div aria-label="Close" role="button" class="pwaPromptOverlay modern iOSPWA-overlay" _id="pwapromptios_0"></div><div class="pwaPrompt iOSPWA-container modern" aria-describedby="description" aria-labelledby="homescreen" role="dialog" _id="pwapromptios_1">    <div class="pwaPromptHeader iOSPWA-header">        <p class="pwaPromptTitle iOSPWA-title">            Ajouter à la page d'accueil        </p>        <button class="pwaPromptCancel iOSPWA-cancel" _id="pwapromptios_2">            Annuler        </button>    </div>    <div class="pwaPromptBody iOSPWA-body">        <div class="pwaPromptDescription iOSPWA-description">            <p class="pwaPromptCopy iOSPWA-description-copy">                Ce site web est doté d'une fonctionnalité d'application. Ajoutez-le à votre écran d'accueil pour l'utiliser en plein écran            </p>        </div>    </div>    <div class="pwaPromptInstruction iOSPWA-steps">        <div class="pwaPromptInstructionStep iOSPWA-step1">            <svg class="pwaPromptShareIcon iOSPWA-step1-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 566 670">                <path d="M255 12c4-4 10-8 16-8s12 3 16 8l94 89c3 4 6 7 8 12 2 6 0 14-5 19-7 8-20 9-28 2l-7-7-57-60 2 54v276c0 12-10 22-22 22-12 1-24-10-23-22V110l1-43-60 65c-5 5-13 8-21 6a19 19 0 0 1-16-17c-1-7 2-13 7-18l95-91z"></path>                <path d="M43 207c16-17 40-23 63-23h83v46h-79c-12 0-25 3-33 13-8 9-10 21-10 33v260c0 13 0 27 6 38 5 12 18 18 30 19l14 1h302c14 0 28 0 40-8 11-7 16-21 16-34V276c0-11-2-24-9-33-8-10-22-13-34-13h-78v-46h75c13 0 25 1 37 4 16 4 31 13 41 27 11 17 14 37 14 57v280c0 20-3 41-15 58a71 71 0 0 1-45 27c-11 2-23 3-34 3H109c-19-1-40-4-56-15-14-9-23-23-27-38-4-12-5-25-5-38V270c1-22 6-47 22-63z"></path>            </svg>            <p class="pwaPromptCopy bold iOSPWA-step1-copy">                1) Appuyez sur le bouton "Partager" dans la barre de menu.            </p>        </div>        <div class="pwaPromptInstructionStep iOSPWA-step2">            <svg class="pwaPromptHomeIcon iOSPWA-step2-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 578 584">                <path d="M101 35l19-1h333c12 0 23 0 35 3 17 3 34 12 44 27 13 16 16 38 16 58v329c0 19 0 39-8 57a65 65 0 0 1-37 37c-18 7-38 7-57 7H130c-21 1-44 0-63-10-14-7-25-20-30-34-6-15-8-30-8-45V121c1-21 5-44 19-61 13-16 33-23 53-25m7 46c-10 1-19 6-24 14-7 8-9 20-9 31v334c0 12 2 25 10 34 9 10 23 12 35 12h336c14 1 30-3 38-15 6-9 8-20 8-31V125c0-12-2-24-10-33-9-9-22-12-35-12H121l-13 1z"></path>                <path d="M271 161c9-11 31-10 38 4 3 5 3 11 3 17v87h88c7 0 16 1 21 7 6 6 7 14 6 22a21 21 0 0 1-10 14c-5 4-11 5-17 5h-88v82c0 7-1 15-6 20-10 10-29 10-37-2-3-6-4-13-4-19v-81h-87c-8-1-17-3-23-9-5-6-6-15-4-22a21 21 0 0 1 11-14c6-3 13-3 19-3h84v-88c0-7 1-14 6-20z"></path>            </svg>            <p class="pwaPromptCopy bold iOSPWA-step2-copy">                2) Appuyez sur "Ajouter à l'écran d'accueil".            </p>        </div>    </div></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "overlay",
      "ids": [
        "pwapromptios_0"
      ]
    },
    {
      "name": "prompt",
      "ids": [
        "pwapromptios_1"
      ]
    }
  ],
  "pressEvents": [
    {
      "id": "pwapromptios_2",
      "onPress": (e, pressInstance, c) => { c.comp.close(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "PwaPromptIos";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('ready')) { this.attributeChangedCallback('ready', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('ready'); }
    __listBoolProps() { return ["ready"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    show() {
        this.overlay?.classList.add("visible");
        this.prompt?.classList.add("visible");
    }
    close() {
        this.overlay?.classList.remove("visible");
        this.prompt?.classList.remove("visible");
    }
    postCreation() {
        this.ready = true;
    }
}
System.PwaPromptIos.Namespace=`${moduleName}.System`;
System.PwaPromptIos.Tag=`rk-pwa-prompt-ios`;
_.System.PwaPromptIos=System.PwaPromptIos;
if(!window.customElements.get('rk-pwa-prompt-ios')){window.customElements.define('rk-pwa-prompt-ios', System.PwaPromptIos);Aventus.WebComponentInstance.registerDefinition(System.PwaPromptIos);}

System.PwaPrompt = class PwaPrompt extends Aventus.WebComponent {
    static instance;
    static get isAvailable() {
        if (window['deferredPrompt']) {
            return true;
        }
        return false;
    }
    e;
    isInit = false;
    static __style = ``;
    constructor() {
            super();
            System.PwaPrompt.instance = this;
            this.init();
        }
    __getStatic() {
        return PwaPrompt;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(PwaPrompt.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "PwaPrompt";
    }
    async prompt() {
        let notification = new System.Notification();
        notification.subject = "Installer l'application?";
        notification.innerHTML = "Voulez-vous installer l'application";
        return await System.Os.instance.notify(notification);
    }
    async init() {
        if (this.isInit) {
            return;
        }
        if (!this.e && System.PwaPrompt.isAvailable) {
            this.e = window['deferredPrompt'];
            this.isInit = true;
            if (await this.prompt()) {
                this.e?.prompt();
            }
        }
        else if (System.PwaPromptIos.isAvailable) {
            this.isInit = true;
        }
    }
}
System.PwaPrompt.Namespace=`${moduleName}.System`;
System.PwaPrompt.Tag=`rk-pwa-prompt`;
_.System.PwaPrompt=System.PwaPrompt;
if(!window.customElements.get('rk-pwa-prompt')){window.customElements.define('rk-pwa-prompt', System.PwaPrompt);Aventus.WebComponentInstance.registerDefinition(System.PwaPrompt);}

const GenericSelect = class GenericSelect extends Aventus.WebComponent {
    static get observedAttributes() {return ["label", "placeholder", "icon", "searchable"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'has_errors'() { return this.getBoolAttr('has_errors') }
    set 'has_errors'(val) { this.setBoolAttr('has_errors', val) }get 'open'() { return this.getBoolAttr('open') }
    set 'open'(val) { this.setBoolAttr('open', val) }    get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }get 'placeholder'() { return this.getStringProp('placeholder') }
    set 'placeholder'(val) { this.setStringAttr('placeholder', val) }get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }get 'searchable'() { return this.getBoolProp('searchable') }
    set 'searchable'(val) { this.setBoolAttr('searchable', val) }    get 'errors'() {
						return this.__watch["errors"];
					}
					set 'errors'(val) {
						this.__watch["errors"] = val;
					}get 'displayValue'() {
						return this.__watch["displayValue"];
					}
					set 'displayValue'(val) {
						this.__watch["displayValue"] = val;
					}    change = new Aventus.Callback();
    selectedOption;
    value;
    options = [];
    __registerWatchesActions() {
    this.__addWatchesActions("errors", ((target) => {
    target.has_errors = target.errors.length > 0;
}));this.__addWatchesActions("displayValue", ((target, action, path, value) => {
    target.inputEl.value = target.displayValue;
}));    super.__registerWatchesActions();
}
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("searchable", ((target) => {
    if (target.searchable) {
        target.inputEl.removeAttribute("disabled");
    }
    else {
        target.inputEl.setAttribute("disabled", "disabled");
    }
})); }
    static __style = `:host{--_select-height: var(--select-height, 30px);--_select-background-color: var(--select-background-color, var(--form-element-background, white));--_select-icon-height: var(--select-icon-height, calc(var(--_select-height) / 2));--_select-error-logo-size: var(--select-error-logo-size, calc(var(--_select-height) / 2));--_select-font-size: var(--select-font-size, var(--form-element-font-size, 16px));--_select-font-size-label: var(--select-font-size-label, var(--form-element-font-size-label, calc(var(--_select-font-size) * 0.95)));--_select-select-border: var(--select-select-border, var(--form-element-border, 1px solid var(--lighter-active)));--_generic-select-border-radius: var(--generic-select-border-radius, var(--form-element-border-radius, 0));--_select-caret-height: var(--select-caret-height, calc(var(--_select-height) / 2));--_select-caret-color: var(--select-caret-color, var(--form-element-color))}:host{min-width:100px;width:100%}:host label{display:none;font-size:var(--_select-font-size-label);margin-bottom:5px;margin-left:3px}:host .input{align-items:center;background-color:var(--_select-background-color);border:var(--_select-select-border);border-radius:var(--_generic-select-border-radius);display:flex;height:var(--_select-height);padding:0 10px;width:100%;cursor:pointer}:host .input .icon{display:none;height:var(--_select-icon-height);margin-right:10px}:host .input rk-img.caret{--img-fill-color: var(--_select-caret-color);--img-stroke-width: 0;height:var(--_select-caret-height);transform:rotate(-90deg);transition:transform .5s var(--bezier-curve)}:host .input input{background-color:rgba(0,0,0,0);border:none;color:var(--text-color);display:block;flex-grow:1;font-size:var(--_select-font-size);height:100%;margin:0;outline:none;padding:5px 0;padding-right:10px}:host .input .error-logo{align-items:center;background-color:var(--red);border-radius:50%;color:#fff;display:none;font-size:calc(var(--_select-error-logo-size) - 5px);height:var(--_select-error-logo-size);justify-content:center;width:var(--_select-error-logo-size)}:host .errors{color:var(--red);display:none;font-size:var(--font-size-sm);line-height:1.1;margin:10px;margin-bottom:0px}:host .errors div{margin:5px 0;text-align:justify}:host .hidden{display:none}:host([has_errors]) .input{border:1px solid var(--red)}:host([has_errors]) .input .error-logo{display:flex}:host([has_errors]) .errors{display:block}:host([icon]:not([icon=""])) .input .icon{display:block}:host([label]:not([label=""])) label{display:flex}:host([open]) .input .caret{transform:rotate(-270deg)}`;
    constructor() { super(); if (this.constructor == GenericSelect) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return GenericSelect;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(GenericSelect.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<label for="input" _id="genericselect_0"></label><div class="input" _id="genericselect_1">    <rk-img class="icon" _id="genericselect_2"></rk-img>    <input id="input" _id="genericselect_3" />    <div class="error-logo">!</div>    <rk-img src="/img/icons/angle-left.svg" class="caret"></rk-img></div><div class="errors">    <template _id="genericselect_4"></template></div><div class="hidden">    <slot></slot></div><rk-options-container class="options-container" _id="genericselect_6"></rk-options-container>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "inputEl",
      "ids": [
        "genericselect_3"
      ]
    },
    {
      "name": "optionsContainer",
      "ids": [
        "genericselect_6"
      ]
    }
  ],
  "content": {
    "genericselect_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__1d7a7aed56d2c056ade214b2e2c331b0method1())}`,
      "once": true
    },
    "genericselect_2°src": {
      "fct": (c) => `${c.print(c.comp.__1d7a7aed56d2c056ade214b2e2c331b0method2())}`,
      "once": true
    },
    "genericselect_3°placeholder": {
      "fct": (c) => `${c.print(c.comp.__1d7a7aed56d2c056ade214b2e2c331b0method3())}`,
      "once": true
    }
  },
  "events": [
    {
      "eventName": "input",
      "id": "genericselect_3",
      "fct": (e, c) => c.comp.filter(e)
    },
    {
      "eventName": "onOpen",
      "id": "genericselect_6",
      "fct": (c, ...args) => c.comp.syncCaret.apply(c.comp, ...args),
      "isCallback": true
    }
  ],
  "pressEvents": [
    {
      "id": "genericselect_0",
      "onPress": (e, pressInstance, c) => { c.comp.showOptions(e, pressInstance); }
    },
    {
      "id": "genericselect_1",
      "onPress": (e, pressInstance, c) => { c.comp.showOptions(e, pressInstance); }
    }
  ]
});const templ0 = new Aventus.Template(this);templ0.setTemplate(`         <div _id="genericselect_5"></div>    `);templ0.setActions({
  "content": {
    "genericselect_5°@HTML": {
      "fct": (c) => `${c.print(c.comp.__1d7a7aed56d2c056ade214b2e2c331b0method4(c.data.error))}`,
      "once": true
    }
  }
});this.__getStatic().__template.addLoop({
                    anchorId: 'genericselect_4',
                    template: templ0,
                simple:{data: "this.errors",item:"error"}}); }
    getClassName() {
        return "GenericSelect";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('has_errors')) { this.attributeChangedCallback('has_errors', false, false); }if(!this.hasAttribute('open')) { this.attributeChangedCallback('open', false, false); }if(!this.hasAttribute('label')){ this['label'] = undefined; }if(!this.hasAttribute('placeholder')){ this['placeholder'] = undefined; }if(!this.hasAttribute('icon')){ this['icon'] = undefined; }if(!this.hasAttribute('searchable')) { this.attributeChangedCallback('searchable', false, false); } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["errors"] = [];w["displayValue"] = ""; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('has_errors');this.__upgradeProperty('open');this.__upgradeProperty('label');this.__upgradeProperty('placeholder');this.__upgradeProperty('icon');this.__upgradeProperty('searchable'); }
    __listBoolProps() { return ["has_errors","open","searchable"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    setValueFromOption(option) {
        this.selectedOption = option;
        this.value = option.value;
        this.displayValue = this.itemToText(option);
        this.hideOptions();
        this.change.trigger([this.value]);
        this.filter();
    }
    removeErrors() {
        this.errors = [];
    }
    loadElementsFromSlot() {
        let elements = this.getElementsInSlot();
        for (let element of elements) {
            if (element instanceof GenericOption) {
                this.options.push(element);
                element.init(this);
                this.optionsContainer.appendChild(element);
            }
        }
    }
    showOptions() {
        if (!this.open) {
            this.removeErrors();
            this.optionsContainer.show();
            //this.optionsContainer.focus({ preventScroll: true });
        }
    }
    hideOptions() {
        this.optionsContainer.blur();
    }
    syncCaret(open) {
        this.open = open;
    }
    filter() {
        if (this.searchable) {
            let value = this.inputEl.value.toLowerCase();
            for (let option of this.options) {
                option.filter(value);
            }
        }
    }
    manageFocus() {
        let blurTimeout = 0;
        ;
        let blur = () => {
            blurTimeout = setTimeout(() => {
                this.optionsContainer.hide();
            }, 40);
        };
        this.inputEl.addEventListener("blur", () => {
            blur();
        });
        this.optionsContainer.addEventListener("blur", () => {
            blur();
        });
        this.inputEl.addEventListener("focus", () => {
            clearTimeout(blurTimeout);
        });
        this.optionsContainer.addEventListener("focus", () => {
            clearTimeout(blurTimeout);
        });
    }
    postCreation() {
        this.manageFocus();
        this.optionsContainer.init(this);
        this.loadElementsFromSlot();
    }
    __1d7a7aed56d2c056ade214b2e2c331b0method1() {
        return this.label;
    }
    __1d7a7aed56d2c056ade214b2e2c331b0method2() {
        return this.icon;
    }
    __1d7a7aed56d2c056ade214b2e2c331b0method3() {
        return this.placeholder;
    }
    __1d7a7aed56d2c056ade214b2e2c331b0method4(error) {
        return error;
    }
}
GenericSelect.Namespace=`${moduleName}`;
_.GenericSelect=GenericSelect;

const GenericOption = class GenericOption extends Aventus.WebComponent {
    value;
    select;
    static __style = `:host{--_option-font-size: var(--option-font-size, var(--form-element-font-size, 16px))}:host{padding:5px 10px;font-size:var(--_option-font-size);cursor:pointer;transition:background-color .2s linear}:host(:hover){background-color:var(--form-element-background-active)}`;
    __getStatic() {
        return GenericOption;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(GenericOption.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "GenericOption";
    }
    init(select) {
        this.select = select;
    }
    filter(text) {
        if (this.innerText.toLowerCase().includes(text)) {
            this.style.display = "";
        }
        else {
            this.style.display = "none";
        }
    }
    postCreation() {
        new Aventus.PressManager({
            element: this,
            onPress: () => {
                this.select.setValueFromOption(this);
            }
        });
    }
}
GenericOption.Namespace=`${moduleName}`;
GenericOption.Tag=`rk-generic-option`;
_.GenericOption=GenericOption;
if(!window.customElements.get('rk-generic-option')){window.customElements.define('rk-generic-option', GenericOption);Aventus.WebComponentInstance.registerDefinition(GenericOption);}

const Option = class Option extends GenericOption {
    static __style = ``;
    __getStatic() {
        return Option;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Option.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Option";
    }
}
Option.Namespace=`${moduleName}`;
Option.Tag=`rk-option`;
_.Option=Option;
if(!window.customElements.get('rk-option')){window.customElements.define('rk-option', Option);Aventus.WebComponentInstance.registerDefinition(Option);}

const Select = class Select extends GenericSelect {
    static __style = ``;
    __getStatic() {
        return Select;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Select.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Select";
    }
    itemToText(option) {
        if (option.value !== undefined) {
            return option.value;
        }
        return option.innerHTML;
    }
}
Select.Namespace=`${moduleName}`;
Select.Tag=`rk-select`;
_.Select=Select;
if(!window.customElements.get('rk-select')){window.customElements.define('rk-select', Select);Aventus.WebComponentInstance.registerDefinition(Select);}

Components.Table = class Table extends Aventus.WebComponent {
    get 'col_resize'() { return this.getBoolAttr('col_resize') }
    set 'col_resize'(val) { this.setBoolAttr('col_resize', val) }    get 'data'() {
						return this.__watch["data"];
					}
					set 'data'(val) {
						this.__watch["data"] = val;
					}    options;
    __registerWatchesActions() {
    this.__addWatchesActions("data", ((target, action, path, value) => {
    target.render();
}));    super.__registerWatchesActions();
}
    static __style = `:host{--internal-table-header-height: var(--table-header-height, 50px);--internal-table-header-backgroud-color: var(--table-header-backgroud-color, #1d4893);--internal-table-header-color: var(--table-header-color, white);--internal-table-header-vertical-border: var(--table-header-vertical-border, 1px solid var(--darker-active));--internal-table-header-horizontal-border: var(--table-header-vertical-border, 1px solid var(--darker-active));--internal-table-cell-vertical-border: var(--table-cell-vertical-border, 1px solid var(--darker-active));--internal-table-cell-horizontal-border: var(--table-cell-vertical-border, 1px solid var(--darker-active));--internal-table-cell-padding: var(--table-cell-padding, 10px);--local-table-cell-resize-display: none}:host{background-color:#fff;border-radius:5px;box-shadow:var(--elevation-2);display:flex;flex-direction:column;height:100%;overflow:hidden;width:100%}:host .style-wrapper{width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column}:host .style-wrapper .header{--scrollbar-color: transparent;--scrollbar-active-color: transparent;--scroller-width: 0;height:var(--internal-table-header-height);width:100%}:host .style-wrapper .body{display:flex;flex-direction:column;height:calc(100% - var(--internal-table-header-height));width:100%}:host([col_resize]){--local-table-cell-resize-display: block}`;
    constructor() {
            super();
            this.options = this.configure(this.defaultOptions());
            this.normalizeSchema();
if (this.constructor == Table) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return Table;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Table.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="style-wrapper" _id="table_0">    <div class="header">        <rk-scrollable y_scroll="false" x_scroll floating_scroll _id="table_1">        </rk-scrollable>    </div>    <div class="body">        <rk-scrollable x_scroll floating_scroll auto_hide _id="table_2">        </rk-scrollable>    </div></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "styleWrapper",
      "ids": [
        "table_0"
      ]
    },
    {
      "name": "headerContainer",
      "ids": [
        "table_1"
      ]
    },
    {
      "name": "bodyContainer",
      "ids": [
        "table_2"
      ]
    }
  ]
}); }
    getClassName() {
        return "Table";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('col_resize')) { this.attributeChangedCallback('col_resize', false, false); } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["data"] = []; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('col_resize'); }
    __listBoolProps() { return ["col_resize"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    syncScroll() {
        this.headerContainer?.onScrollChange.add((x, y) => {
            if (this.bodyContainer?.x != x) {
                this.bodyContainer?.scrollX(x);
            }
        });
        this.bodyContainer?.onScrollChange.add((x, y) => {
            if (this.headerContainer?.x != x) {
                this.headerContainer?.scrollX(x);
            }
        });
    }
    normalizeSchema() {
        for (let cellConfig of this.options.schema) {
            if (!cellConfig.cell) {
                if (cellConfig.type == "boolean")
                    cellConfig.cell = Components.TableCellBoolean;
                else if (cellConfig.type == "date")
                    cellConfig.cell = Components.TableCellDate;
                else if (cellConfig.type == "number")
                    cellConfig.cell = Components.TableCellNumber;
                else if (cellConfig.type == "picture")
                    cellConfig.cell = Components.TableCellPicture;
                else if (cellConfig.type == "string")
                    cellConfig.cell = Components.TableCellString;
                else if (cellConfig.type == "custom")
                    cellConfig.cell = Components.TableCellString;
            }
        }
    }
    defaultOptions() {
        return {
            schema: [],
            header: Components.TableRowHeader,
            row: Components.TableRow
        };
    }
    setColWidth(width, i) {
        this.styleWrapper?.style.setProperty("--internal-table-cell-width-" + (i + 1), width + "px");
        this.styleWrapper?.style.setProperty("--internal-table-cell-weight-" + (i + 1), "0");
    }
    render() {
        if (!this.headerContainer || !this.bodyContainer) {
            return;
        }
        for (let i = 0; i < this.options.schema.length; i++) {
            let width = this.options.schema[i].width;
            if (width) {
                this.setColWidth(width, i);
            }
        }
        let nbCol = this.options.schema.length ? this.options.schema.length : 1;
        this.styleWrapper?.style.setProperty("--internal-table-nb-column", nbCol + "");
        let header = new this.options.header();
        header.table = this;
        header.init(this.options);
        this.headerContainer.innerHTML = "";
        this.headerContainer.appendChild(header);
        this.bodyContainer.innerHTML = " ";
        for (let item of this.data) {
            let row = new this.options.row();
            row.table = this;
            row.init(this.options, item);
            this.bodyContainer.appendChild(row);
        }
    }
    postCreation() {
        this.syncScroll();
        this.render();
    }
}
Components.Table.Namespace=`${moduleName}.Components`;
_.Components.Table=Components.Table;

Components.TableRow = class TableRow extends Aventus.WebComponent {
    table;
    static __style = `:host{align-items:stretch;border-bottom:1px solid var(--darker-active);display:flex;flex-direction:row;width:100%}`;
    __getStatic() {
        return TableRow;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableRow.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`` }
    });
}
    getClassName() {
        return "TableRow";
    }
    init(options, data) {
        let i = 0;
        for (let cellConfig of options.schema) {
            let cst = cellConfig.cell ?? Components.TableCellString;
            let cell = new cst();
            cell.index = i;
            cell.row = this;
            cell.setContent(data[cellConfig.name], data);
            this.shadowRoot?.appendChild(cell);
            i++;
        }
    }
}
Components.TableRow.Namespace=`${moduleName}.Components`;
Components.TableRow.Tag=`rk-table-row`;
_.Components.TableRow=Components.TableRow;
if(!window.customElements.get('rk-table-row')){window.customElements.define('rk-table-row', Components.TableRow);Aventus.WebComponentInstance.registerDefinition(Components.TableRow);}

Components.TableCell = class TableCell extends Aventus.WebComponent {
    row;
    index = 0;
    get table() {
        if (this.row && this.row.table) {
            return this.row.table;
        }
        throw 'Table can\'t be found for the cell';
    }
    static __style = `:host{align-items:center;display:flex;justify-content:center;padding:var(--internal-table-cell-padding);position:relative;text-align:center;flex-shrink:0;border-right:var(--internal-table-cell-vertical-border)}:host .resize{background-color:rgba(0,0,0,0);bottom:0;cursor:col-resize;position:absolute;right:0;top:0;width:5px;display:var(--local-table-cell-resize-display)}:host(:nth-child(1)){flex-grow:var(--internal-table-cell-weight-1, 1);width:var(--internal-table-cell-width-1, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(2)){flex-grow:var(--internal-table-cell-weight-2, 1);width:var(--internal-table-cell-width-2, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(3)){flex-grow:var(--internal-table-cell-weight-3, 1);width:var(--internal-table-cell-width-3, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(4)){flex-grow:var(--internal-table-cell-weight-4, 1);width:var(--internal-table-cell-width-4, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(5)){flex-grow:var(--internal-table-cell-weight-5, 1);width:var(--internal-table-cell-width-5, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(6)){flex-grow:var(--internal-table-cell-weight-6, 1);width:var(--internal-table-cell-width-6, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(7)){flex-grow:var(--internal-table-cell-weight-7, 1);width:var(--internal-table-cell-width-7, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(8)){flex-grow:var(--internal-table-cell-weight-8, 1);width:var(--internal-table-cell-width-8, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(9)){flex-grow:var(--internal-table-cell-weight-9, 1);width:var(--internal-table-cell-width-9, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(10)){flex-grow:var(--internal-table-cell-weight-10, 1);width:var(--internal-table-cell-width-10, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(11)){flex-grow:var(--internal-table-cell-weight-11, 1);width:var(--internal-table-cell-width-11, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(12)){flex-grow:var(--internal-table-cell-weight-12, 1);width:var(--internal-table-cell-width-12, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(13)){flex-grow:var(--internal-table-cell-weight-13, 1);width:var(--internal-table-cell-width-13, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(14)){flex-grow:var(--internal-table-cell-weight-14, 1);width:var(--internal-table-cell-width-14, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(15)){flex-grow:var(--internal-table-cell-weight-15, 1);width:var(--internal-table-cell-width-15, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(16)){flex-grow:var(--internal-table-cell-weight-16, 1);width:var(--internal-table-cell-width-16, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(17)){flex-grow:var(--internal-table-cell-weight-17, 1);width:var(--internal-table-cell-width-17, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(18)){flex-grow:var(--internal-table-cell-weight-18, 1);width:var(--internal-table-cell-width-18, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(19)){flex-grow:var(--internal-table-cell-weight-19, 1);width:var(--internal-table-cell-width-19, calc(100% / var(--internal-table-nb-column)))}:host(:nth-child(20)){flex-grow:var(--internal-table-cell-weight-20, 1);width:var(--internal-table-cell-width-20, calc(100% / var(--internal-table-nb-column)))}`;
    constructor() { super(); if (this.constructor == TableCell) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return TableCell;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableCell.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<span _id="tablecell_0">    <slot></slot></span><div class="resize" _id="tablecell_1"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "contentEl",
      "ids": [
        "tablecell_0"
      ]
    },
    {
      "name": "resizeEl",
      "ids": [
        "tablecell_1"
      ]
    }
  ]
}); }
    getClassName() {
        return "TableCell";
    }
    addResize() {
        if (!this.resizeEl) {
            return;
        }
        let resizeEl = this.resizeEl;
        new Aventus.DragAndDrop({
            element: this.resizeEl,
            applyDrag: false,
            isDragEnable: () => this.table.col_resize ?? false,
            offsetDrag: 0,
            onMove: (e, position) => {
                let newSize = position.x + resizeEl.offsetWidth;
                this.table.setColWidth(newSize, this.index);
            }
        });
    }
    postCreation() {
        this.addResize();
    }
}
Components.TableCell.Namespace=`${moduleName}.Components`;
_.Components.TableCell=Components.TableCell;

Components.TableCellString = class TableCellString extends Components.TableCell {
    static __style = ``;
    __getStatic() {
        return TableCellString;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableCellString.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`` }
    });
}
    getClassName() {
        return "TableCellString";
    }
    setContent(data, rowData) {
        if (!this.contentEl)
            return;
        let txt = data ? data + "" : "";
        this.contentEl.innerHTML = txt;
    }
}
Components.TableCellString.Namespace=`${moduleName}.Components`;
Components.TableCellString.Tag=`rk-table-cell-string`;
_.Components.TableCellString=Components.TableCellString;
if(!window.customElements.get('rk-table-cell-string')){window.customElements.define('rk-table-cell-string', Components.TableCellString);Aventus.WebComponentInstance.registerDefinition(Components.TableCellString);}

Components.TableRowHeader = class TableRowHeader extends Components.TableRow {
    static __style = `:host{--table-cell-padding: 0;--table-cell-vertical-border: var(--internal-table-header-vertical-border);background-color:var(--internal-table-header-backgroud-color);border-bottom:var(--internal-table-header-horizontal-border);color:var(--internal-table-header-color);display:flex;flex-direction:row;height:var(--internal-table-header-height);width:100%}`;
    __getStatic() {
        return TableRowHeader;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableRowHeader.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`` }
    });
}
    getClassName() {
        return "TableRowHeader";
    }
    init(options, data = null) {
        let i = 0;
        for (let cellConfig of options.schema) {
            let cell = new Components.TableCellString();
            cell.row = this;
            cell.index = i;
            cell.setContent(cellConfig.displayName, data);
            this.shadowRoot?.appendChild(cell);
            i++;
        }
    }
}
Components.TableRowHeader.Namespace=`${moduleName}.Components`;
Components.TableRowHeader.Tag=`rk-table-row-header`;
_.Components.TableRowHeader=Components.TableRowHeader;
if(!window.customElements.get('rk-table-row-header')){window.customElements.define('rk-table-row-header', Components.TableRowHeader);Aventus.WebComponentInstance.registerDefinition(Components.TableRowHeader);}

Components.TableCellPicture = class TableCellPicture extends Components.TableCell {
    static get observedAttributes() {return ["src"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'src'() { return this.getStringProp('src') }
    set 'src'(val) { this.setStringAttr('src', val) }    static __style = `.img{background-position:center;background-size:cover;border-radius:25px;height:50px;margin:auto;width:50px}`;
    __getStatic() {
        return TableCellPicture;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableCellPicture.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="img" _id="tablecellpicture_0"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "tablecellpicture_0°style": {
      "fct": (c) => `background-image:url('${c.print(c.comp.__5c25ad747ea3a14316fd5b29073319bemethod0())}')`,
      "once": true
    }
  }
}); }
    getClassName() {
        return "TableCellPicture";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('src')){ this['src'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('src'); }
    setContent(data, rowData) {
        this.src = data + "";
    }
    __5c25ad747ea3a14316fd5b29073319bemethod0() {
        return this.src;
    }
}
Components.TableCellPicture.Namespace=`${moduleName}.Components`;
Components.TableCellPicture.Tag=`rk-table-cell-picture`;
_.Components.TableCellPicture=Components.TableCellPicture;
if(!window.customElements.get('rk-table-cell-picture')){window.customElements.define('rk-table-cell-picture', Components.TableCellPicture);Aventus.WebComponentInstance.registerDefinition(Components.TableCellPicture);}

Components.TableCellNumber = class TableCellNumber extends Components.TableCell {
    static __style = ``;
    __getStatic() {
        return TableCellNumber;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableCellNumber.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`` }
    });
}
    getClassName() {
        return "TableCellNumber";
    }
    setContent(data, rowData) {
        if (!this.contentEl)
            return;
        this.contentEl.innerHTML = Number(data) + "";
    }
}
Components.TableCellNumber.Namespace=`${moduleName}.Components`;
Components.TableCellNumber.Tag=`rk-table-cell-number`;
_.Components.TableCellNumber=Components.TableCellNumber;
if(!window.customElements.get('rk-table-cell-number')){window.customElements.define('rk-table-cell-number', Components.TableCellNumber);Aventus.WebComponentInstance.registerDefinition(Components.TableCellNumber);}

Components.TableCellDate = class TableCellDate extends Components.TableCell {
    static __style = ``;
    __getStatic() {
        return TableCellDate;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableCellDate.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`` }
    });
}
    getClassName() {
        return "TableCellDate";
    }
    setContent(data, rowData) {
        if (!this.contentEl)
            return;
        if (data instanceof Date) {
            this.contentEl.innerHTML = data.toISOString();
        }
        else {
            this.contentEl.innerHTML = '';
        }
    }
}
Components.TableCellDate.Namespace=`${moduleName}.Components`;
Components.TableCellDate.Tag=`rk-table-cell-date`;
_.Components.TableCellDate=Components.TableCellDate;
if(!window.customElements.get('rk-table-cell-date')){window.customElements.define('rk-table-cell-date', Components.TableCellDate);Aventus.WebComponentInstance.registerDefinition(Components.TableCellDate);}

Components.TableCellBoolean = class TableCellBoolean extends Components.TableCell {
    static __style = ``;
    __getStatic() {
        return TableCellBoolean;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableCellBoolean.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`` }
    });
}
    getClassName() {
        return "TableCellBoolean";
    }
    setContent(data, rowData) {
        if (!this.contentEl)
            return;
        if (data === true || data === 1 || data === 'true') {
            this.contentEl.innerHTML = 'true';
        }
        else {
            this.contentEl.innerHTML = 'false';
        }
    }
}
Components.TableCellBoolean.Namespace=`${moduleName}.Components`;
Components.TableCellBoolean.Tag=`rk-table-cell-boolean`;
_.Components.TableCellBoolean=Components.TableCellBoolean;
if(!window.customElements.get('rk-table-cell-boolean')){window.customElements.define('rk-table-cell-boolean', Components.TableCellBoolean);Aventus.WebComponentInstance.registerDefinition(Components.TableCellBoolean);}

App.AppError=class AppError extends Aventus.GenericError {
    static get Fullname() { return "Core.App.AppError, Core"; }
}
App.AppError.Namespace=`${moduleName}.App`;Aventus.Converter.register(App.AppError.Fullname, App.AppError);
_.App.AppError=App.AppError;
Errors.DesktopError=class DesktopError extends Aventus.GenericError {
    static get Fullname() { return "Core.Logic.DesktopError, Core"; }
}
Errors.DesktopError.Namespace=`${moduleName}.Errors`;Aventus.Converter.register(Errors.DesktopError.Fullname, Errors.DesktopError);
_.Errors.DesktopError=Errors.DesktopError;
Permissions.PermissionQuery=class PermissionQuery {
    $type;
    value;
    additionalInfo;
    can(value, additionalInfo) {
        this.$type = this.constructor['Fullname'];
        this.value = value;
        this.additionalInfo = additionalInfo;
        return Permissions.Permission.can(this);
    }
}
Permissions.PermissionQuery.Namespace=`${moduleName}.Permissions`;
_.Permissions.PermissionQuery=Permissions.PermissionQuery;
Permissions.ApplicationPermissionQuery=class ApplicationPermissionQuery extends Permissions.PermissionQuery {
    static get Fullname() { return "Core.Permissions.ApplicationPermissionQuery, Core"; }
}
Permissions.ApplicationPermissionQuery.Namespace=`${moduleName}.Permissions`;Aventus.Converter.register(Permissions.ApplicationPermissionQuery.Fullname, Permissions.ApplicationPermissionQuery);
_.Permissions.ApplicationPermissionQuery=Permissions.ApplicationPermissionQuery;
Permissions.DesktopPermissionQuery=class DesktopPermissionQuery extends Permissions.PermissionQuery {
    static get Fullname() { return "Core.Permissions.DesktopPermissionQuery, Core"; }
}
Permissions.DesktopPermissionQuery.Namespace=`${moduleName}.Permissions`;Aventus.Converter.register(Permissions.DesktopPermissionQuery.Fullname, Permissions.DesktopPermissionQuery);
_.Permissions.DesktopPermissionQuery=Permissions.DesktopPermissionQuery;

for(let key in _) { Core[key] = _[key] }
})(Core);
