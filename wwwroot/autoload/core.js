
var Core;
(Core||(Core = {}));
(function (Core) {
const moduleName = `Core`;
const _ = {};
Aventus.Style.store("@default", `:host{--img-fill-color: var(--text-color);box-sizing:border-box;display:inline-block}:host *{box-sizing:border-box}.touch{cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}.touch.disable,.touch.disabled{cursor:default}.green{background-color:var(--green)}.red{background-color:var(--red)}.orange{background-color:var(--orange)}.blue{background-color:var(--blue)}`)
const Websocket = {};
_.Websocket = {};
const Errors = {};
_.Errors = {};
const Permissions = {};
_.Permissions = {};
const Data = {};
_.Data = {};
const App = {};
_.App = {};
const Components = {};
_.Components = {};
const Lib = {};
_.Lib = {};
const System = {};
_.System = {};
Websocket.Events = {};
_.Websocket.Events = {};
Websocket.Routes = {};
_.Websocket.Routes = {};
Data.DataTypes = {};
_.Data.DataTypes = {};
const Routes = {};
_.Routes = {};
const State = {};
_.State = {};
const RAM = {};
_.RAM = {};
const Tools = {};
_.Tools = {};
let _n;
Websocket.RayukiEndPointEvents= [];

_.Websocket.RayukiEndPointEvents=Websocket.RayukiEndPointEvents;
Websocket.RayukiEndPointRoutes= [];

_.Websocket.RayukiEndPointRoutes=Websocket.RayukiEndPointRoutes;
(function (PdfErrorCode) {
    PdfErrorCode[PdfErrorCode["UnknowError"] = 0] = "UnknowError";
    PdfErrorCode[PdfErrorCode["NoNameProvided"] = 1] = "NoNameProvided";
})(Errors.PdfErrorCode || (Errors.PdfErrorCode = {}));

_.Errors.PdfErrorCode=Errors.PdfErrorCode;
(function (ImageFileErrorCode) {
    ImageFileErrorCode[ImageFileErrorCode["UnknowError"] = 0] = "UnknowError";
    ImageFileErrorCode[ImageFileErrorCode["NotValidImage"] = 1] = "NotValidImage";
})(Errors.ImageFileErrorCode || (Errors.ImageFileErrorCode = {}));

_.Errors.ImageFileErrorCode=Errors.ImageFileErrorCode;
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
(function (DemoEnum) {
    DemoEnum[DemoEnum["Value1"] = 0] = "Value1";
    DemoEnum[DemoEnum["Value2"] = 1] = "Value2";
})(Data.DemoEnum || (Data.DemoEnum = {}));

_.Data.DemoEnum=Data.DemoEnum;
Data.Permission=class Permission extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.Permission, Core"; }
    EnumName;
    AdditionalInfo = "";
    EnumValue;
}
Data.Permission.Namespace=`${moduleName}.Data`;
Data.Permission.$schema={...(AventusSharp.Data.Storable?.$schema ?? {}), "EnumName":"string","AdditionalInfo":"string","EnumValue":"Aventus.Enum"};
Aventus.Converter.register(Data.Permission.Fullname, Data.Permission);

_.Data.Permission=Data.Permission;
Data.Pdf=class Pdf {
    static get Fullname() { return "Core.Data.Pdf, Core"; }
    Name = "";
    Html = "";
}
Data.Pdf.Namespace=`${moduleName}.Data`;
Data.Pdf.$schema={"Name":"string","Html":"string"};
Aventus.Converter.register(Data.Pdf.Fullname, Data.Pdf);

_.Data.Pdf=Data.Pdf;
Data.Company=class Company extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.Company, Core"; }
    Name = "";
    Logo = "";
}
Data.Company.Namespace=`${moduleName}.Data`;
Data.Company.$schema={...(AventusSharp.Data.Storable?.$schema ?? {}), "Name":"string","Logo":"string"};
Aventus.Converter.register(Data.Company.Fullname, Data.Company);

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
Components.UserProfilPicture = class UserProfilPicture extends Aventus.WebComponent {
    static get observedAttributes() {return ["uri"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'uri'() { return this.getStringProp('uri') }
    set 'uri'(val) { this.setStringAttr('uri', val) }    static __style = `:host{border-radius:1000px;flex-shrink:0;height:100px;overflow:hidden;width:100px}:host rk-img{height:100%;width:100%}:host .bg-default{align-items:center;background-color:var(--secondary-color);border-radius:1000px;box-shadow:var(--elevation-4);color:var(--text-color-reverse);display:flex;flex-shrink:0;height:100%;justify-content:center;width:100%}:host .bg-default svg{fill:var(--text-color-reverse);height:70%;width:70%}`;
    __getStatic() {
        return UserProfilPicture;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(UserProfilPicture.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<template _id="userprofilpicture_0"></template>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();const templ0 = new Aventus.Template(this);templ0.setTemplate(`    <rk-img _id="userprofilpicture_1"></rk-img>`);templ0.setActions({
  "content": {
    "userprofilpicture_1°src": {
      "fct": (c) => `${c.print(c.comp.__4c9a0566bd04f8ca158657ccaa880d94method1())}`,
      "once": true
    }
  }
});const templ1 = new Aventus.Template(this);templ1.setTemplate(`    <div class="bg-default">        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"></path></svg>    </div>`);this.__getStatic().__template.addIf({
                    anchorId: 'userprofilpicture_0',
                    parts: [{once: true,
                    condition: (c) => c.comp.__4c9a0566bd04f8ca158657ccaa880d94method0(),
                    template: templ0
                },{once: true,
                    condition: (c) => true,
                    template: templ1
                }]
            }); }
    getClassName() {
        return "UserProfilPicture";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('uri')){ this['uri'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('uri'); }
    __4c9a0566bd04f8ca158657ccaa880d94method1() {
        return this.uri;
    }
    __4c9a0566bd04f8ca158657ccaa880d94method0() {
        return this.uri;
    }
}
Components.UserProfilPicture.Namespace=`${moduleName}.Components`;
Components.UserProfilPicture.Tag=`rk-user-profil-picture`;
_.Components.UserProfilPicture=Components.UserProfilPicture;
if(!window.customElements.get('rk-user-profil-picture')){window.customElements.define('rk-user-profil-picture', Components.UserProfilPicture);Aventus.WebComponentInstance.registerDefinition(Components.UserProfilPicture);}

const Tooltip = class Tooltip extends Aventus.WebComponent {
    get 'visible'() { return this.getBoolAttr('visible') }
    set 'visible'(val) { this.setBoolAttr('visible', val) }get 'position'() { return this.getStringAttr('position') }
    set 'position'(val) { this.setStringAttr('position', val) }get 'color'() { return this.getStringAttr('color') }
    set 'color'(val) { this.setStringAttr('color', val) }get 'use_absolute'() { return this.getBoolAttr('use_absolute') }
    set 'use_absolute'(val) { this.setBoolAttr('use_absolute', val) }    parent = null;
    isDestroyed = false;
    timeoutEnter = false;
    timeout = 0;
    static __style = `:host{--local-tooltip-from-y: 0;--local-tooltip-from-x: 0;--local-tooltip-to-y: 0;--local-tooltip-to-x: 0;--_tooltip-background-color: var(--tooltip-background-color, var(--primary-color));--_tooltip-elevation: var(--tooltip-elevation, var(--elevation-4));--_tooltip-color: var(--tooltip-color, var(--text-color))}:host{background-color:var(--_tooltip-background-color);border-radius:5px;box-shadow:var(--elevation-4);color:var(--_tooltip-color);opacity:0;padding:5px 15px;pointer-events:none;position:absolute;transition:.5s opacity var(--bezier-curve),.5s visibility var(--bezier-curve),.5s top var(--bezier-curve),.5s bottom var(--bezier-curve),.5s right var(--bezier-curve),.5s left var(--bezier-curve),.5s transform var(--bezier-curve);visibility:hidden;width:max-content;z-index:1}:host::after{content:"";position:absolute}:host([visible]){opacity:1;visibility:visible}:host([position=bottom]){transform:translateX(-50%)}:host([position=bottom])::after{border-bottom:9px solid var(--_tooltip-background-color);border-left:6px solid rgba(0,0,0,0);border-right:6px solid rgba(0,0,0,0);left:50%;top:-8px;transform:translateX(-50%)}:host([use_absolute][position=bottom]){left:var(--local-tooltip-from-x);top:var(--local-tooltip-from-y)}:host([use_absolute][visible][position=bottom]){top:var(--local-tooltip-to-y)}:host([position=bottom]:not([use_absolute])){left:50%;bottom:0px;transform:translateX(-50%) translateY(calc(100% - 10px))}:host([position=bottom][visible]:not([use_absolute])){transform:translateX(-50%) translateY(calc(100% + 10px))}:host([position=top]){transform:translateX(-50%)}:host([position=top])::after{border-left:6px solid rgba(0,0,0,0);border-right:6px solid rgba(0,0,0,0);border-top:9px solid var(--_tooltip-background-color);bottom:-8px;left:50%;transform:translateX(-50%)}:host([use_absolute][position=top]){bottom:var(--local-tooltip-from-y);left:var(--local-tooltip-from-x)}:host([use_absolute][visible][position=top]){bottom:var(--local-tooltip-to-y)}:host([position=top]:not([use_absolute])){left:50%;top:0px;transform:translateX(-50%) translateY(calc(-100% + 10px))}:host([position=top][visible]:not([use_absolute])){transform:translateX(-50%) translateY(calc(-100% - 10px))}:host([position=right]){transform:translateY(-50%)}:host([position=right])::after{border-bottom:6px solid rgba(0,0,0,0);border-right:9px solid var(--_tooltip-background-color);border-top:6px solid rgba(0,0,0,0);left:-8px;top:50%;transform:translateY(-50%)}:host([use_absolute][position=right]){left:var(--local-tooltip-from-x);top:var(--local-tooltip-from-y)}:host([use_absolute][visible][position=right]){left:var(--local-tooltip-to-x)}:host([position=right]:not([use_absolute])){right:0;top:50%;transform:translateX(calc(100% - 10px)) translateY(-50%)}:host([visible][position=right]:not([use_absolute])){transform:translateX(calc(100% + 10px)) translateY(-50%)}:host([position=left]){right:var(--local-tooltip-from-x);top:var(--local-tooltip-from-y);transform:translateY(-50%)}:host([position=left])::after{border-bottom:6px solid rgba(0,0,0,0);border-left:9px solid var(--_tooltip-background-color);border-top:6px solid rgba(0,0,0,0);right:-8px;top:50%;transform:translateY(-50%)}:host([use_absolute][position=left]){right:var(--local-tooltip-from-x);top:var(--local-tooltip-from-y)}:host([use_absolute][visible][position=left]){right:var(--local-tooltip-to-x)}:host([position=left]:not([use_absolute])){left:0;top:50%;transform:translateX(calc(-100% + 10px)) translateY(-50%)}:host([visible][position=left]:not([use_absolute])){transform:translateX(calc(-100% - 10px)) translateY(-50%)}:host([color=primary]){--_tooltip-background-color: var(--primary-color);--_tooltip-color: var(--text-color)}:host([color=green]){--_tooltip-background-color: var(--green);--_tooltip-color: var(--text-color-green)}:host([color=red]){--_tooltip-background-color: var(--red);--_tooltip-color: var(--text-color-red)}:host([color=orange]){--_tooltip-background-color: var(--orange);--_tooltip-color: var(--text-color-orange)}:host([color=blue]){--_tooltip-background-color: var(--blue);--_tooltip-color: var(--text-color-blue)}`;
    constructor() { super(); this.onMouseEnter=this.onMouseEnter.bind(this)this.onMouseLeave=this.onMouseLeave.bind(this)this.onTransitionEnd=this.onTransitionEnd.bind(this) }
    __getStatic() {
        return Tooltip;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Tooltip.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Tooltip";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('visible')) { this.attributeChangedCallback('visible', false, false); }if(!this.hasAttribute('position')){ this['position'] = 'left'; }if(!this.hasAttribute('color')){ this['color'] = undefined; }if(!this.hasAttribute('use_absolute')) { this.attributeChangedCallback('use_absolute', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('visible');this.__upgradeProperty('position');this.__upgradeProperty('color');this.__upgradeProperty('use_absolute'); }
    __listBoolProps() { return ["visible","use_absolute"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    calculatePosition() {
        if (!this.parent || !this.use_absolute)
            return;
        let rect = this.parent.getBoundingClientRect();
        let center = {
            x: rect.left + rect.width / 2,
            y: rect.y + rect.height / 2
        };
        if (this.position == 'bottom') {
            let bottom = rect.y + rect.height;
            this.style.setProperty("--local-tooltip-from-y", bottom - 10 + 'px');
            this.style.setProperty("--local-tooltip-from-x", center.x + 'px');
            this.style.setProperty("--local-tooltip-to-x", center.x + 'px');
            this.style.setProperty("--local-tooltip-to-y", bottom + 10 + 'px');
        }
        else if (this.position == 'top') {
            let bottom = document.body.offsetHeight - rect.top;
            this.style.setProperty("--local-tooltip-from-y", bottom - 10 + 'px');
            this.style.setProperty("--local-tooltip-from-x", center.x + 'px');
            this.style.setProperty("--local-tooltip-to-x", center.x + 'px');
            this.style.setProperty("--local-tooltip-to-y", bottom + 10 + 'px');
        }
        else if (this.position == 'right') {
            let left = rect.x + rect.width;
            this.style.setProperty("--local-tooltip-from-y", center.y + 'px');
            this.style.setProperty("--local-tooltip-from-x", left - 10 + 'px');
            this.style.setProperty("--local-tooltip-to-x", left + 10 + 'px');
            this.style.setProperty("--local-tooltip-to-y", center.y + 10 + 'px');
        }
        else if (this.position == 'left') {
            let left = document.body.offsetWidth - rect.left;
            this.style.setProperty("--local-tooltip-from-y", center.y + 'px');
            this.style.setProperty("--local-tooltip-from-x", left - 10 + 'px');
            this.style.setProperty("--local-tooltip-to-x", left + 10 + 'px');
            this.style.setProperty("--local-tooltip-to-y", center.y + 'px');
        }
    }
    onMouseEnter() {
        this.calculatePosition();
        if (this.use_absolute) {
            document.body.appendChild(this);
            this.timeoutEnter = false;
            this.timeout = setTimeout(() => {
                this.timeoutEnter = true;
                this.visible = true;
            }, 50);
        }
        else {
            this.visible = true;
        }
    }
    onMouseLeave() {
        this.visible = false;
        if (this.use_absolute) {
            if (!this.timeoutEnter) {
                clearTimeout(this.timeout);
                this.onTransitionEnd();
            }
        }
    }
    onTransitionEnd() {
        if (!this.use_absolute || this.visible)
            return;
        if (this.parent && !this.isDestroyed)
            this.parent?.appendChild(this);
        else
            this.remove();
    }
    registerAction() {
        if (!this.parent)
            return;
        this.parent.addEventListener("mouseenter", this.onMouseEnter);
        this.parent.addEventListener("mouseleave", this.onMouseLeave);
        this.addEventListener("transitionend", this.onTransitionEnd);
    }
    postCreation() {
        this.parent = this.parentElement;
        this.registerAction();
    }
    postDestruction() {
        this.isDestroyed = true;
        super.postDestruction();
        if (!this.parent)
            return;
        this.parent.removeEventListener("mouseenter", this.onMouseEnter);
        this.parent.removeEventListener("mouseleave", this.onMouseLeave);
    }
}
Tooltip.Namespace=`${moduleName}`;
Tooltip.Tag=`rk-tooltip`;
_.Tooltip=Tooltip;
if(!window.customElements.get('rk-tooltip')){window.customElements.define('rk-tooltip', Tooltip);Aventus.WebComponentInstance.registerDefinition(Tooltip);}

const Tab = class Tab extends Aventus.WebComponent {
    get 'label'() { return this.getStringAttr('label') }
    set 'label'(val) { this.setStringAttr('label', val) }    static __style = ``;
    __getStatic() {
        return Tab;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Tab.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Tab";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('label')){ this['label'] = ""; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('label'); }
}
Tab.Namespace=`${moduleName}`;
Tab.Tag=`rk-tab`;
_.Tab=Tab;
if(!window.customElements.get('rk-tab')){window.customElements.define('rk-tab', Tab);Aventus.WebComponentInstance.registerDefinition(Tab);}

const TabHeader = class TabHeader extends Aventus.WebComponent {
    static get observedAttributes() {return ["label"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'active'() { return this.getBoolAttr('active') }
    set 'active'(val) { this.setBoolAttr('active', val) }    get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }    _tab;
    get tab() {
        return this._tab;
    }
    static __style = ``;
    __getStatic() {
        return TabHeader;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TabHeader.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="label" _id="tabheader_0"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "tabheader_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__86516f88c19f54ff51b6b23ce30be60emethod0())}`,
      "once": true
    }
  }
}); }
    getClassName() {
        return "TabHeader";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('active')) { this.attributeChangedCallback('active', false, false); }if(!this.hasAttribute('label')){ this['label'] = ""; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('tab');this.__upgradeProperty('active');this.__upgradeProperty('label'); }
    __listBoolProps() { return ["active"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    init(tab) {
        this.label = tab.label;
        this._tab = tab;
    }
    __86516f88c19f54ff51b6b23ce30be60emethod0() {
        return this.label;
    }
}
TabHeader.Namespace=`${moduleName}`;
TabHeader.Tag=`rk-tab-header`;
_.TabHeader=TabHeader;
if(!window.customElements.get('rk-tab-header')){window.customElements.define('rk-tab-header', TabHeader);Aventus.WebComponentInstance.registerDefinition(TabHeader);}

const Tabs = class Tabs extends Aventus.WebComponent {
    tabs = {};
    activeHeader;
    static __style = `:host .hidden{display:none}`;
    __getStatic() {
        return Tabs;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Tabs.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<rk-scrollable y_scroll="false" x_scroll class="header" _id="tabs_0"></rk-scrollable><rk-scrollable y_scroll x_scroll="false" class="body" _id="tabs_1"></rk-scrollable><div class="hidden">    <slot></slot></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "headerEl",
      "ids": [
        "tabs_0"
      ]
    },
    {
      "name": "bodyEl",
      "ids": [
        "tabs_1"
      ]
    }
  ]
}); }
    getClassName() {
        return "Tabs";
    }
    loadTabs() {
        let elements = this.getElementsInSlot();
        let first = null;
        for (let element of elements) {
            if (element instanceof Tab) {
                this.tabs[element.label] = element;
                let header = new (this.defineTabHeader())();
                this.headerEl.appendChild(header);
                header.init(element);
                if (first == null) {
                    first = header;
                }
            }
        }
        if (first) {
            this.displayActive(first);
        }
    }
    displayActive(tabHeader) {
        if (this.activeHeader) {
            this.activeHeader.active = false;
            this.activeHeader.tab.parentNode?.removeChild(this.activeHeader.tab);
        }
        this.activeHeader = tabHeader;
        this.activeHeader.active = true;
        this.bodyEl.appendChild(this.activeHeader);
    }
    defineTabHeader() {
        return TabHeader;
    }
    postCreation() {
        super.postCreation();
    }
}
Tabs.Namespace=`${moduleName}`;
Tabs.Tag=`rk-tabs`;
_.Tabs=Tabs;
if(!window.customElements.get('rk-tabs')){window.customElements.define('rk-tabs', Tabs);Aventus.WebComponentInstance.registerDefinition(Tabs);}

Components.Separator = class Separator extends Aventus.WebComponent {
    static __style = `:host{--_separator-color: var(--separator-color, var(--text-color))}:host{background:linear-gradient(90deg, transparent 0%, var(--_separator-color) 50%, transparent 100%);height:1px;margin:20px auto;width:100%;display:flex}`;
    __getStatic() {
        return Separator;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Separator.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Separator";
    }
}
Components.Separator.Namespace=`${moduleName}.Components`;
Components.Separator.Tag=`rk-separator`;
_.Components.Separator=Components.Separator;
if(!window.customElements.get('rk-separator')){window.customElements.define('rk-separator', Components.Separator);Aventus.WebComponentInstance.registerDefinition(Components.Separator);}

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
    set 'offset_right_xl'(val) { this.setNumberAttr('offset_right_xl', val) }get 'center'() { return this.getBoolAttr('center') }
    set 'center'(val) { this.setBoolAttr('center', val) }    static __style = `:host{--internal-col-padding:var(--col-padding, 8px)}:host{padding:var(--internal-col-padding)}:host([center]){justify-content:center}:host([size="0"]){display:flex;width:0%}:host([offset="0"]){margin-left:0%}:host([offset_right="0"]){margin-right:0%}:host([size="1"]){display:flex;width:8.3333333333%}:host([offset="1"]){margin-left:8.3333333333%}:host([offset_right="1"]){margin-right:8.3333333333%}:host([size="2"]){display:flex;width:16.6666666667%}:host([offset="2"]){margin-left:16.6666666667%}:host([offset_right="2"]){margin-right:16.6666666667%}:host([size="3"]){display:flex;width:25%}:host([offset="3"]){margin-left:25%}:host([offset_right="3"]){margin-right:25%}:host([size="4"]){display:flex;width:33.3333333333%}:host([offset="4"]){margin-left:33.3333333333%}:host([offset_right="4"]){margin-right:33.3333333333%}:host([size="5"]){display:flex;width:41.6666666667%}:host([offset="5"]){margin-left:41.6666666667%}:host([offset_right="5"]){margin-right:41.6666666667%}:host([size="6"]){display:flex;width:50%}:host([offset="6"]){margin-left:50%}:host([offset_right="6"]){margin-right:50%}:host([size="7"]){display:flex;width:58.3333333333%}:host([offset="7"]){margin-left:58.3333333333%}:host([offset_right="7"]){margin-right:58.3333333333%}:host([size="8"]){display:flex;width:66.6666666667%}:host([offset="8"]){margin-left:66.6666666667%}:host([offset_right="8"]){margin-right:66.6666666667%}:host([size="9"]){display:flex;width:75%}:host([offset="9"]){margin-left:75%}:host([offset_right="9"]){margin-right:75%}:host([size="10"]){display:flex;width:83.3333333333%}:host([offset="10"]){margin-left:83.3333333333%}:host([offset_right="10"]){margin-right:83.3333333333%}:host([size="11"]){display:flex;width:91.6666666667%}:host([offset="11"]){margin-left:91.6666666667%}:host([offset_right="11"]){margin-right:91.6666666667%}:host([size="12"]){display:flex;width:100%}:host([offset="12"]){margin-left:100%}:host([offset_right="12"]){margin-right:100%}@container application (min-width: 300px){:host([size_xs="0"]){display:flex;width:0%}:host([offset_xs="0"]){margin-left:0%}:host([offset_right_xs="0"]){margin-right:0%}:host([size_xs="1"]){display:flex;width:8.3333333333%}:host([offset_xs="1"]){margin-left:8.3333333333%}:host([offset_right_xs="1"]){margin-right:8.3333333333%}:host([size_xs="2"]){display:flex;width:16.6666666667%}:host([offset_xs="2"]){margin-left:16.6666666667%}:host([offset_right_xs="2"]){margin-right:16.6666666667%}:host([size_xs="3"]){display:flex;width:25%}:host([offset_xs="3"]){margin-left:25%}:host([offset_right_xs="3"]){margin-right:25%}:host([size_xs="4"]){display:flex;width:33.3333333333%}:host([offset_xs="4"]){margin-left:33.3333333333%}:host([offset_right_xs="4"]){margin-right:33.3333333333%}:host([size_xs="5"]){display:flex;width:41.6666666667%}:host([offset_xs="5"]){margin-left:41.6666666667%}:host([offset_right_xs="5"]){margin-right:41.6666666667%}:host([size_xs="6"]){display:flex;width:50%}:host([offset_xs="6"]){margin-left:50%}:host([offset_right_xs="6"]){margin-right:50%}:host([size_xs="7"]){display:flex;width:58.3333333333%}:host([offset_xs="7"]){margin-left:58.3333333333%}:host([offset_right_xs="7"]){margin-right:58.3333333333%}:host([size_xs="8"]){display:flex;width:66.6666666667%}:host([offset_xs="8"]){margin-left:66.6666666667%}:host([offset_right_xs="8"]){margin-right:66.6666666667%}:host([size_xs="9"]){display:flex;width:75%}:host([offset_xs="9"]){margin-left:75%}:host([offset_right_xs="9"]){margin-right:75%}:host([size_xs="10"]){display:flex;width:83.3333333333%}:host([offset_xs="10"]){margin-left:83.3333333333%}:host([offset_right_xs="10"]){margin-right:83.3333333333%}:host([size_xs="11"]){display:flex;width:91.6666666667%}:host([offset_xs="11"]){margin-left:91.6666666667%}:host([offset_right_xs="11"]){margin-right:91.6666666667%}:host([size_xs="12"]){display:flex;width:100%}:host([offset_xs="12"]){margin-left:100%}:host([offset_right_xs="12"]){margin-right:100%}}@container application (min-width: 540px){:host([size_sm="0"]){display:flex;width:0%}:host([offset_sm="0"]){margin-left:0%}:host([offset_right_sm="0"]){margin-right:0%}:host([size_sm="1"]){display:flex;width:8.3333333333%}:host([offset_sm="1"]){margin-left:8.3333333333%}:host([offset_right_sm="1"]){margin-right:8.3333333333%}:host([size_sm="2"]){display:flex;width:16.6666666667%}:host([offset_sm="2"]){margin-left:16.6666666667%}:host([offset_right_sm="2"]){margin-right:16.6666666667%}:host([size_sm="3"]){display:flex;width:25%}:host([offset_sm="3"]){margin-left:25%}:host([offset_right_sm="3"]){margin-right:25%}:host([size_sm="4"]){display:flex;width:33.3333333333%}:host([offset_sm="4"]){margin-left:33.3333333333%}:host([offset_right_sm="4"]){margin-right:33.3333333333%}:host([size_sm="5"]){display:flex;width:41.6666666667%}:host([offset_sm="5"]){margin-left:41.6666666667%}:host([offset_right_sm="5"]){margin-right:41.6666666667%}:host([size_sm="6"]){display:flex;width:50%}:host([offset_sm="6"]){margin-left:50%}:host([offset_right_sm="6"]){margin-right:50%}:host([size_sm="7"]){display:flex;width:58.3333333333%}:host([offset_sm="7"]){margin-left:58.3333333333%}:host([offset_right_sm="7"]){margin-right:58.3333333333%}:host([size_sm="8"]){display:flex;width:66.6666666667%}:host([offset_sm="8"]){margin-left:66.6666666667%}:host([offset_right_sm="8"]){margin-right:66.6666666667%}:host([size_sm="9"]){display:flex;width:75%}:host([offset_sm="9"]){margin-left:75%}:host([offset_right_sm="9"]){margin-right:75%}:host([size_sm="10"]){display:flex;width:83.3333333333%}:host([offset_sm="10"]){margin-left:83.3333333333%}:host([offset_right_sm="10"]){margin-right:83.3333333333%}:host([size_sm="11"]){display:flex;width:91.6666666667%}:host([offset_sm="11"]){margin-left:91.6666666667%}:host([offset_right_sm="11"]){margin-right:91.6666666667%}:host([size_sm="12"]){display:flex;width:100%}:host([offset_sm="12"]){margin-left:100%}:host([offset_right_sm="12"]){margin-right:100%}}@container application (min-width: 720px){:host([size_md="0"]){display:flex;width:0%}:host([offset_md="0"]){margin-left:0%}:host([offset_right_md="0"]){margin-right:0%}:host([size_md="1"]){display:flex;width:8.3333333333%}:host([offset_md="1"]){margin-left:8.3333333333%}:host([offset_right_md="1"]){margin-right:8.3333333333%}:host([size_md="2"]){display:flex;width:16.6666666667%}:host([offset_md="2"]){margin-left:16.6666666667%}:host([offset_right_md="2"]){margin-right:16.6666666667%}:host([size_md="3"]){display:flex;width:25%}:host([offset_md="3"]){margin-left:25%}:host([offset_right_md="3"]){margin-right:25%}:host([size_md="4"]){display:flex;width:33.3333333333%}:host([offset_md="4"]){margin-left:33.3333333333%}:host([offset_right_md="4"]){margin-right:33.3333333333%}:host([size_md="5"]){display:flex;width:41.6666666667%}:host([offset_md="5"]){margin-left:41.6666666667%}:host([offset_right_md="5"]){margin-right:41.6666666667%}:host([size_md="6"]){display:flex;width:50%}:host([offset_md="6"]){margin-left:50%}:host([offset_right_md="6"]){margin-right:50%}:host([size_md="7"]){display:flex;width:58.3333333333%}:host([offset_md="7"]){margin-left:58.3333333333%}:host([offset_right_md="7"]){margin-right:58.3333333333%}:host([size_md="8"]){display:flex;width:66.6666666667%}:host([offset_md="8"]){margin-left:66.6666666667%}:host([offset_right_md="8"]){margin-right:66.6666666667%}:host([size_md="9"]){display:flex;width:75%}:host([offset_md="9"]){margin-left:75%}:host([offset_right_md="9"]){margin-right:75%}:host([size_md="10"]){display:flex;width:83.3333333333%}:host([offset_md="10"]){margin-left:83.3333333333%}:host([offset_right_md="10"]){margin-right:83.3333333333%}:host([size_md="11"]){display:flex;width:91.6666666667%}:host([offset_md="11"]){margin-left:91.6666666667%}:host([offset_right_md="11"]){margin-right:91.6666666667%}:host([size_md="12"]){display:flex;width:100%}:host([offset_md="12"]){margin-left:100%}:host([offset_right_md="12"]){margin-right:100%}}@container application (min-width: 960px){:host([size_lg="0"]){display:flex;width:0%}:host([offset_lg="0"]){margin-left:0%}:host([offset_right_lg="0"]){margin-right:0%}:host([size_lg="1"]){display:flex;width:8.3333333333%}:host([offset_lg="1"]){margin-left:8.3333333333%}:host([offset_right_lg="1"]){margin-right:8.3333333333%}:host([size_lg="2"]){display:flex;width:16.6666666667%}:host([offset_lg="2"]){margin-left:16.6666666667%}:host([offset_right_lg="2"]){margin-right:16.6666666667%}:host([size_lg="3"]){display:flex;width:25%}:host([offset_lg="3"]){margin-left:25%}:host([offset_right_lg="3"]){margin-right:25%}:host([size_lg="4"]){display:flex;width:33.3333333333%}:host([offset_lg="4"]){margin-left:33.3333333333%}:host([offset_right_lg="4"]){margin-right:33.3333333333%}:host([size_lg="5"]){display:flex;width:41.6666666667%}:host([offset_lg="5"]){margin-left:41.6666666667%}:host([offset_right_lg="5"]){margin-right:41.6666666667%}:host([size_lg="6"]){display:flex;width:50%}:host([offset_lg="6"]){margin-left:50%}:host([offset_right_lg="6"]){margin-right:50%}:host([size_lg="7"]){display:flex;width:58.3333333333%}:host([offset_lg="7"]){margin-left:58.3333333333%}:host([offset_right_lg="7"]){margin-right:58.3333333333%}:host([size_lg="8"]){display:flex;width:66.6666666667%}:host([offset_lg="8"]){margin-left:66.6666666667%}:host([offset_right_lg="8"]){margin-right:66.6666666667%}:host([size_lg="9"]){display:flex;width:75%}:host([offset_lg="9"]){margin-left:75%}:host([offset_right_lg="9"]){margin-right:75%}:host([size_lg="10"]){display:flex;width:83.3333333333%}:host([offset_lg="10"]){margin-left:83.3333333333%}:host([offset_right_lg="10"]){margin-right:83.3333333333%}:host([size_lg="11"]){display:flex;width:91.6666666667%}:host([offset_lg="11"]){margin-left:91.6666666667%}:host([offset_right_lg="11"]){margin-right:91.6666666667%}:host([size_lg="12"]){display:flex;width:100%}:host([offset_lg="12"]){margin-left:100%}:host([offset_right_lg="12"]){margin-right:100%}}@container application (min-width: 1140px){:host([size_xl="0"]){display:flex;width:0%}:host([offset_xl="0"]){margin-left:0%}:host([offset_right_xl="0"]){margin-right:0%}:host([size_xl="1"]){display:flex;width:8.3333333333%}:host([offset_xl="1"]){margin-left:8.3333333333%}:host([offset_right_xl="1"]){margin-right:8.3333333333%}:host([size_xl="2"]){display:flex;width:16.6666666667%}:host([offset_xl="2"]){margin-left:16.6666666667%}:host([offset_right_xl="2"]){margin-right:16.6666666667%}:host([size_xl="3"]){display:flex;width:25%}:host([offset_xl="3"]){margin-left:25%}:host([offset_right_xl="3"]){margin-right:25%}:host([size_xl="4"]){display:flex;width:33.3333333333%}:host([offset_xl="4"]){margin-left:33.3333333333%}:host([offset_right_xl="4"]){margin-right:33.3333333333%}:host([size_xl="5"]){display:flex;width:41.6666666667%}:host([offset_xl="5"]){margin-left:41.6666666667%}:host([offset_right_xl="5"]){margin-right:41.6666666667%}:host([size_xl="6"]){display:flex;width:50%}:host([offset_xl="6"]){margin-left:50%}:host([offset_right_xl="6"]){margin-right:50%}:host([size_xl="7"]){display:flex;width:58.3333333333%}:host([offset_xl="7"]){margin-left:58.3333333333%}:host([offset_right_xl="7"]){margin-right:58.3333333333%}:host([size_xl="8"]){display:flex;width:66.6666666667%}:host([offset_xl="8"]){margin-left:66.6666666667%}:host([offset_right_xl="8"]){margin-right:66.6666666667%}:host([size_xl="9"]){display:flex;width:75%}:host([offset_xl="9"]){margin-left:75%}:host([offset_right_xl="9"]){margin-right:75%}:host([size_xl="10"]){display:flex;width:83.3333333333%}:host([offset_xl="10"]){margin-left:83.3333333333%}:host([offset_right_xl="10"]){margin-right:83.3333333333%}:host([size_xl="11"]){display:flex;width:91.6666666667%}:host([offset_xl="11"]){margin-left:91.6666666667%}:host([offset_right_xl="11"]){margin-right:91.6666666667%}:host([size_xl="12"]){display:flex;width:100%}:host([offset_xl="12"]){margin-left:100%}:host([offset_right_xl="12"]){margin-right:100%}}`;
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('size')){ this['size'] = undefined; }if(!this.hasAttribute('size_xs')){ this['size_xs'] = undefined; }if(!this.hasAttribute('size_sm')){ this['size_sm'] = undefined; }if(!this.hasAttribute('size_md')){ this['size_md'] = undefined; }if(!this.hasAttribute('size_lg')){ this['size_lg'] = undefined; }if(!this.hasAttribute('size_xl')){ this['size_xl'] = undefined; }if(!this.hasAttribute('offset')){ this['offset'] = undefined; }if(!this.hasAttribute('offset_xs')){ this['offset_xs'] = undefined; }if(!this.hasAttribute('offset_sm')){ this['offset_sm'] = undefined; }if(!this.hasAttribute('offset_md')){ this['offset_md'] = undefined; }if(!this.hasAttribute('offset_lg')){ this['offset_lg'] = undefined; }if(!this.hasAttribute('offset_xl')){ this['offset_xl'] = undefined; }if(!this.hasAttribute('offset_right')){ this['offset_right'] = undefined; }if(!this.hasAttribute('offset_right_xs')){ this['offset_right_xs'] = undefined; }if(!this.hasAttribute('offset_right_sm')){ this['offset_right_sm'] = undefined; }if(!this.hasAttribute('offset_right_md')){ this['offset_right_md'] = undefined; }if(!this.hasAttribute('offset_right_lg')){ this['offset_right_lg'] = undefined; }if(!this.hasAttribute('offset_right_xl')){ this['offset_right_xl'] = undefined; }if(!this.hasAttribute('center')) { this.attributeChangedCallback('center', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('size');this.__upgradeProperty('size_xs');this.__upgradeProperty('size_sm');this.__upgradeProperty('size_md');this.__upgradeProperty('size_lg');this.__upgradeProperty('size_xl');this.__upgradeProperty('offset');this.__upgradeProperty('offset_xs');this.__upgradeProperty('offset_sm');this.__upgradeProperty('offset_md');this.__upgradeProperty('offset_lg');this.__upgradeProperty('offset_xl');this.__upgradeProperty('offset_right');this.__upgradeProperty('offset_right_xs');this.__upgradeProperty('offset_right_sm');this.__upgradeProperty('offset_right_md');this.__upgradeProperty('offset_right_lg');this.__upgradeProperty('offset_right_xl');this.__upgradeProperty('center'); }
    __listBoolProps() { return ["center"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
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
        super.postDestruction();
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

Components.BoxContainer = class BoxContainer extends Aventus.WebComponent {
    static get observedAttributes() {return ["space"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'space'() { return this.getNumberProp('space') }
    set 'space'(val) { this.setNumberAttr('space', val) }    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("space", ((target) => {
    target.style.setProperty("--item-box-margin", target.space + 'px');
})); }
    static __style = `:host{--_item-box-box-size: var(--item-box-box-size, 16px);--_item-box-border-radius: var(--item-box-border-radius, 4px);--_item-box-border-color: var(--item-box-border-color, var(--secondary-color, #afafaf))}:host{align-items:center;box-sizing:border-box;display:flex;flex-direction:row;height:var(--_item-box-box-size);justify-content:center}:host ::slotted(*){border:1px solid var(--_item-box-border-color);border-radius:4px;width:var(--_item-box-box-size);max-height:var(--_item-box-box-size);max-width:var(--_item-box-box-size)}:host ::slotted(*:first-child){margin-left:0}:host ::slotted(*:last-child){margin-right:0}:host([space="0"]){border:1px solid var(--_item-box-border-color);border-radius:var(--_item-box-border-radius)}:host([space="0"]) ::slotted(*){border:none;border-radius:0px;border-right:1px solid var(--_item-box-border-color);width:var(--_item-box-box-size)}:host([space="0"]) ::slotted(*:first-child){border-bottom-left-radius:var(--_item-box-border-radius);border-top-left-radius:var(--_item-box-border-radius)}:host([space="0"]) ::slotted(*:last-child){border-bottom-right-radius:var(--_item-box-border-radius);border-right:none;border-top-right-radius:var(--_item-box-border-radius)}`;
    __getStatic() {
        return BoxContainer;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(BoxContainer.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "BoxContainer";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('space')){ this['space'] = 0; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('space'); }
}
Components.BoxContainer.Namespace=`${moduleName}.Components`;
Components.BoxContainer.Tag=`rk-box-container`;
_.Components.BoxContainer=Components.BoxContainer;
if(!window.customElements.get('rk-box-container')){window.customElements.define('rk-box-container', Components.BoxContainer);Aventus.WebComponentInstance.registerDefinition(Components.BoxContainer);}

Components.ItemBox = class ItemBox extends Aventus.WebComponent {
    static __style = `:host{--_item-box-margin: var(--item-box-margin, 0)}:host{display:flex;height:100%;align-items:center;justify-content:center;flex-direction:row;box-sizing:border-box;overflow:hidden;margin-left:var(--_item-box-margin);margin-right:var(--_item-box-margin)}:host ::slotted(*){max-height:var(--_item-box-box-size);max-width:var(--_item-box-box-size)}`;
    __getStatic() {
        return ItemBox;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(ItemBox.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "ItemBox";
    }
}
Components.ItemBox.Namespace=`${moduleName}.Components`;
Components.ItemBox.Tag=`rk-item-box`;
_.Components.ItemBox=Components.ItemBox;
if(!window.customElements.get('rk-item-box')){window.customElements.define('rk-item-box', Components.ItemBox);Aventus.WebComponentInstance.registerDefinition(Components.ItemBox);}

Components.OptionsContainer = class OptionsContainer extends Aventus.WebComponent {
    get 'open'() { return this.getBoolAttr('open') }
    set 'open'(val) { this.setBoolAttr('open', val) }    select;
    onOpen = new Aventus.Callback();
    isAnimating = false;
    static __style = `:host{--_options-container-background: var(--options-container-background, var(--form-element-background, white));--_options-container-border-radius: var(--options-container-border-radius, var(--form-element-border-radius, 0));--_options-container-box-shadow: var(--options-container-box-shadow, var(--elevation-2))}:host{background-color:var(--_options-container-background);border-radius:var(--_options-container-border-radius);box-shadow:var(--_options-container-box-shadow);display:grid;grid-template-rows:0fr;left:0;overflow:hidden;position:absolute;top:0;transition:.2s var(--bezier-curve) grid-template-rows;z-index:800}:host rk-scrollable .container{display:flex;flex-direction:column}:host([open]){grid-template-rows:1fr}`;
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
        let boxInput = this.select.inputEl.getBoundingClientRect();
        let contBox = container.getBoundingClientRect();
        let newTop = boxInput.top + boxInput.height + 2;
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
            if (!this.open) {
                this.parentElement?.removeChild(this);
            }
        });
    }
    postCreation() {
        this.addAnimationEnd();
        this.setAttribute("tabindex", "-1");
    }
}
Components.OptionsContainer.Namespace=`${moduleName}.Components`;
Components.OptionsContainer.Tag=`rk-options-container`;
_.Components.OptionsContainer=Components.OptionsContainer;
if(!window.customElements.get('rk-options-container')){window.customElements.define('rk-options-container', Components.OptionsContainer);Aventus.WebComponentInstance.registerDefinition(Components.OptionsContainer);}

Components.InputFile = class InputFile extends Aventus.WebComponent {
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
Components.InputFile.Namespace=`${moduleName}.Components`;
Components.InputFile.Tag=`rk-input-file`;
_.Components.InputFile=Components.InputFile;
if(!window.customElements.get('rk-input-file')){window.customElements.define('rk-input-file', Components.InputFile);Aventus.WebComponentInstance.registerDefinition(Components.InputFile);}

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

Components.ButtonIconMi = class ButtonIconMi extends Components.ButtonIcon {
    static get observedAttributes() {return ["icon"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }    static __style = `:host .content .icon{height:auto;padding:0}`;
    __getStatic() {
        return ButtonIconMi;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(ButtonIconMi.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="hider"></div><div class="content">    <mi-icon class="icon" _id="buttoniconmi_0"></mi-icon></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "buttoniconmi_0°icon": {
      "fct": (c) => `${c.print(c.comp.__6bf11e2b799d6cfde945f27815605c6bmethod0())}`,
      "once": true
    }
  }
}); }
    getClassName() {
        return "ButtonIconMi";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('icon')){ this['icon'] = "square"; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('icon'); }
    __6bf11e2b799d6cfde945f27815605c6bmethod0() {
        return this.icon;
    }
}
Components.ButtonIconMi.Namespace=`${moduleName}.Components`;
Components.ButtonIconMi.Tag=`rk-button-icon-mi`;
_.Components.ButtonIconMi=Components.ButtonIconMi;
if(!window.customElements.get('rk-button-icon-mi')){window.customElements.define('rk-button-icon-mi', Components.ButtonIconMi);Aventus.WebComponentInstance.registerDefinition(Components.ButtonIconMi);}

Lib.DomTools=class DomTools {
    static clearElement(element) {
        const children = Array.from(element.children);
        for (let child of children) {
            child.remove();
        }
    }
}
Lib.DomTools.Namespace=`${moduleName}.Lib`;

_.Lib.DomTools=Lib.DomTools;
Lib.DateTools=class DateTools {
    static isSameDate(date1, date2) {
        if (date1 == null && date2 == null)
            return true;
        if (date1 == null || date2 == null)
            return false;
        return date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();
    }
    static print(date, options, locale) {
        if (!options) {
            options = {
                year: "numeric",
                month: "long",
                day: "2-digit"
            };
        }
        return date.toLocaleDateString(locale, options);
    }
}
Lib.DateTools.Namespace=`${moduleName}.Lib`;

_.Lib.DateTools=Lib.DateTools;
const PwaPromptIos = class PwaPromptIos extends Aventus.WebComponent {
    get 'visible'() { return this.getBoolAttr('visible') }
    set 'visible'(val) { this.setBoolAttr('visible', val) }    static get isStandalone() {
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
    static get isAvailable() {
        return this.isiOS && !this.isStandalone;
    }
    static __style = `:host .noScroll{overflow:hidden}:host .pwaPromptOverlay{background-color:rgba(0,0,0,.8);left:0;min-height:100vh;min-height:-webkit-fill-available;opacity:0;pointer-events:none;position:fixed;top:0;touch-action:none;transition:opacity .2s ease-in;visibility:hidden;width:100vw;z-index:999999}:host .pwaPromptOverlay.modern{background:rgba(10,10,10,.5);color:rgba(235,235,245,.6)}:host .pwaPrompt{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background-color:rgba(250,250,250,.8);border-radius:10px;bottom:0;color:#000;filter:brightness(1.1);left:0;margin:0 8px 10px;overflow:hidden;pointer-events:none;position:fixed;touch-action:none;transform:translateY(calc(100% + 10px));transition:transform .4s cubic-bezier(0.4, 0.24, 0.3, 1);width:calc(100vw - 16px);z-index:999999}:host .pwaPrompt.modern{background:rgba(65,65,65,.7);filter:brightness(1.1)}:host .pwaPromptHeader{align-items:center;border-bottom:1px solid rgba(0,0,0,.1);border-left:0px;border-right:0px;border-top:0px;border-width:.5px;display:flex;flex-flow:row nowrap;justify-content:space-between;padding:13px 16px}:host .modern .pwaPromptHeader{border-color:rgba(140,140,140,.7)}:host .pwaPromptHeader .pwaPromptTitle{color:#333;font-family:-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-size:18px;font-weight:500;line-height:1.125;margin:0;padding:0}:host .modern .pwaPromptHeader .pwaPromptTitle{color:#fff}:host .pwaPromptHeader .pwaPromptCancel{background:rgba(0,0,0,0);border:0;color:#2d7cf6;font-size:16px;margin:0;padding:0}:host .modern .pwaPromptHeader .pwaPromptCancel{color:#0984ff}:host .pwaPromptBody{display:flex;width:100%}:host .pwaPromptBody .pwaPromptDescription{border-bottom:1px solid rgba(0,0,0,.1);border-left:0px;border-right:0px;border-top:0px;border-width:.5px;color:inherit;margin:0 16px;padding:16px;width:100%}:host .modern .pwaPromptBody .pwaPromptDescription{border-color:rgba(140,140,140,.7)}:host .pwaPromptCopy{color:#7b7b7a;font-family:-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-size:13px;line-height:17px;margin:0;padding:0}:host .pwaPromptCopy.bold{font-weight:600}:host .modern .pwaPromptCopy{border-color:rgba(235,235,245,.6);color:rgba(235,235,245,.6)}:host .pwaPromptInstruction{color:inherit;margin:0 16px;padding:16px}:host .pwaPromptInstruction .pwaPromptInstructionStep{align-items:center;display:flex;flex-flow:row nowrap;justify-content:flex-start;margin-bottom:16px;text-align:left}:host .pwaPromptInstruction .pwaPromptInstructionStep:last-of-type{margin-bottom:0}:host .pwaPromptInstruction .pwaPromptShareIcon,:host .pwaPromptInstruction .pwaPromptHomeIcon{flex:0 0 auto;height:30px;margin-right:32px;width:25px}:host .pwaPromptInstruction .pwaPromptHomeIcon{color:#2d7cf6}:host .modern .pwaPromptInstruction .pwaPromptHomeIcon{color:#fff;fill:#fff}:host .pwaPromptInstruction .pwaPromptShareIcon{color:#2d7cf6;fill:#2d7cf6}:host .modern .pwaPromptInstruction .pwaPromptShareIcon{color:#0984ff;fill:#0984ff}:host([visible]) .pwaPromptOverlay{display:block;opacity:1;pointer-events:initial;touch-action:initial;visibility:visible}:host([visible]) .pwaPrompt{display:block;pointer-events:initial;touch-action:initial;transform:translateY(0)}`;
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
        blocks: { 'default':`<div aria-label="Close" role="button" class="pwaPromptOverlay modern iOSPWA-overlay" _id="pwapromptios_0"></div><div class="pwaPrompt iOSPWA-container modern" aria-describedby="description" aria-labelledby="homescreen" role="dialog" _id="pwapromptios_1">    <div class="pwaPromptHeader iOSPWA-header">        <p class="pwaPromptTitle iOSPWA-title">            Ajouter à la page d'accueil        </p>        <button class="pwaPromptCancel iOSPWA-cancel" _id="pwapromptios_2">            Fermer        </button>    </div>    <div class="pwaPromptBody iOSPWA-body">        <div class="pwaPromptDescription iOSPWA-description">            <p class="pwaPromptCopy iOSPWA-description-copy">                Ce site web est doté d'une fonctionnalité d'application. Ajoutez-le à votre écran d'accueil pour l'utiliser en plein écran            </p>        </div>    </div>    <div class="pwaPromptInstruction iOSPWA-steps">        <div class="pwaPromptInstructionStep iOSPWA-step1">            <svg class="pwaPromptShareIcon iOSPWA-step1-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 566 670">                <path d="M255 12c4-4 10-8 16-8s12 3 16 8l94 89c3 4 6 7 8 12 2 6 0 14-5 19-7 8-20 9-28 2l-7-7-57-60 2 54v276c0 12-10 22-22 22-12 1-24-10-23-22V110l1-43-60 65c-5 5-13 8-21 6a19 19 0 0 1-16-17c-1-7 2-13 7-18l95-91z"></path>                <path d="M43 207c16-17 40-23 63-23h83v46h-79c-12 0-25 3-33 13-8 9-10 21-10 33v260c0 13 0 27 6 38 5 12 18 18 30 19l14 1h302c14 0 28 0 40-8 11-7 16-21 16-34V276c0-11-2-24-9-33-8-10-22-13-34-13h-78v-46h75c13 0 25 1 37 4 16 4 31 13 41 27 11 17 14 37 14 57v280c0 20-3 41-15 58a71 71 0 0 1-45 27c-11 2-23 3-34 3H109c-19-1-40-4-56-15-14-9-23-23-27-38-4-12-5-25-5-38V270c1-22 6-47 22-63z"></path>            </svg>            <p class="pwaPromptCopy bold iOSPWA-step1-copy">                1) Appuyez sur le bouton "Partager" dans la barre de menu.            </p>        </div>        <div class="pwaPromptInstructionStep iOSPWA-step2">            <svg class="pwaPromptHomeIcon iOSPWA-step2-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 578 584">                <path d="M101 35l19-1h333c12 0 23 0 35 3 17 3 34 12 44 27 13 16 16 38 16 58v329c0 19 0 39-8 57a65 65 0 0 1-37 37c-18 7-38 7-57 7H130c-21 1-44 0-63-10-14-7-25-20-30-34-6-15-8-30-8-45V121c1-21 5-44 19-61 13-16 33-23 53-25m7 46c-10 1-19 6-24 14-7 8-9 20-9 31v334c0 12 2 25 10 34 9 10 23 12 35 12h336c14 1 30-3 38-15 6-9 8-20 8-31V125c0-12-2-24-10-33-9-9-22-12-35-12H121l-13 1z"></path>                <path d="M271 161c9-11 31-10 38 4 3 5 3 11 3 17v87h88c7 0 16 1 21 7 6 6 7 14 6 22a21 21 0 0 1-10 14c-5 4-11 5-17 5h-88v82c0 7-1 15-6 20-10 10-29 10-37-2-3-6-4-13-4-19v-81h-87c-8-1-17-3-23-9-5-6-6-15-4-22a21 21 0 0 1 11-14c6-3 13-3 19-3h84v-88c0-7 1-14 6-20z"></path>            </svg>            <p class="pwaPromptCopy bold iOSPWA-step2-copy">                2) Appuyez sur "Ajouter à l'écran d'accueil".            </p>        </div>    </div></div>` }
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('visible')) { this.attributeChangedCallback('visible', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('visible'); }
    __listBoolProps() { return ["visible"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    close() {
        this.addEventListener("transitionend", () => {
            this.remove();
        });
        this.visible = false;
    }
    postCreation() {
        this.visible = true;
    }
}
PwaPromptIos.Namespace=`${moduleName}`;
PwaPromptIos.Tag=`rk-pwa-prompt-ios`;
_.PwaPromptIos=PwaPromptIos;
if(!window.customElements.get('rk-pwa-prompt-ios')){window.customElements.define('rk-pwa-prompt-ios', PwaPromptIos);Aventus.WebComponentInstance.registerDefinition(PwaPromptIos);}

System.Loading = class Loading extends Aventus.WebComponent {
    static get observedAttributes() {return ["text"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'background'() { return this.getBoolAttr('background') }
    set 'background'(val) { this.setBoolAttr('background', val) }    get 'text'() { return this.getStringProp('text') }
    set 'text'(val) { this.setStringAttr('text', val) }    static __style = `:host{--internal-dot-size: var(--dot-size, 12px);--internal-radius: var(--radius, 50px);--internal-loading-color: var(--loading-color, var(--primary-color, white));--internal-loading-background-color: var(--loading-background-color, var(--emphasize, rgba(0, 0, 0, 0.5)))}:host{align-items:center;background-color:var(--internal-loading-background-color);display:flex;flex-direction:column;height:100%;justify-content:center;left:0;position:absolute;top:0;width:100%;z-index:600}:host .dot-container{--center: (var(--internal-radius) - (var(--internal-dot-size) / 2));display:inline-block;height:calc(var(--internal-radius)*2);position:relative;width:calc(var(--internal-radius)*2);z-index:10}:host .dot-container .dot{animation:lds-default 1.2s linear infinite;background:var(--internal-loading-color);border-radius:50%;height:var(--internal-dot-size);position:absolute;width:var(--internal-dot-size)}:host .dot-container .dot:nth-child(1){--angle: 0deg;animation-delay:0s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(2){--angle: -30deg;animation-delay:-0.1s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(3){--angle: -60deg;animation-delay:-0.2s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(4){--angle: -90deg;animation-delay:-0.3s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(5){--angle: -120deg;animation-delay:-0.4s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(6){--angle: -150deg;animation-delay:-0.5s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(7){--angle: 180deg;animation-delay:-0.6s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(8){--angle: 150deg;animation-delay:-0.7s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(9){--angle: 120deg;animation-delay:-0.8s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(10){--angle: 90deg;animation-delay:-0.9s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(11){--angle: 60deg;animation-delay:-1s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .dot-container .dot:nth-child(12){--angle: 30deg;animation-delay:-1.1s;left:calc(cos(var(--angle))*var(--internal-radius) + var(--center));top:calc(sin(var(--angle))*var(--internal-radius) + var(--center))}:host .text{color:var(--internal-loading-color);font-size:var(--font-size-lg);font-weight:bold;letter-spacing:1px;margin-top:25px;padding:0 15px;text-align:center;z-index:10}@keyframes lds-default{0%,20%,80%,100%{transform:scale(1)}50%{transform:scale(1.5)}}:host([background]){background-color:#08162e;background-image:url('data:image/svg+xml;utf8,<svg version="1.1" viewBox="0 0 65.98 57.373" xmlns="http://www.w3.org/2000/svg"><g fill="%23acf4d6"><path d="M 33.949 5.731 L 22.7 5.731 L 22.7 0.001 L 33.788 0.001 C 45.619 0.001 46.363 17.934 36.124 20.216 C 35.379 20.428 34.637 20.48 33.788 20.48 L 28.483 20.48 L 28.483 20.534 L 28.483 34.433 L 22.7 34.433 L 22.7 14.697 L 28.483 20.534 L 42.491 34.433 L 50.342 34.433 L 30.605 14.697 L 33.949 14.697 C 38.883 14.697 38.883 5.731 33.949 5.731 Z" style="" /></g><g fill="%23FFF"><path d="M 7.8 53.573 L 4.94 48.993 L 3.22 48.993 L 3.22 53.573 L 0 53.573 L 0 39.573 L 4.98 39.573 C 8.12 39.573 10.2 41.473 10.2 44.393 C 10.2 46.253 9.32 47.653 7.84 48.373 L 11.2 53.573 L 7.8 53.573 Z M 3.22 42.533 L 3.22 46.253 L 4.78 46.253 C 6.08 46.253 6.98 45.793 6.98 44.393 C 6.98 43.013 6.08 42.533 4.78 42.533 L 3.22 42.533 Z M 20.3 43.173 L 23.46 43.173 L 23.46 53.573 L 20.3 53.573 L 20.3 52.533 C 20.16 52.893 19.22 53.773 17.62 53.773 C 15.24 53.773 12.5 52.073 12.5 48.353 C 12.5 44.773 15.24 42.993 17.62 42.993 C 19.22 42.993 20.16 43.913 20.3 44.133 L 20.3 43.173 Z M 18.08 50.993 C 19.38 50.993 20.44 50.093 20.44 48.353 C 20.44 46.673 19.38 45.773 18.08 45.773 C 16.72 45.773 15.56 46.693 15.56 48.353 C 15.56 50.073 16.72 50.993 18.08 50.993 Z M 33.94 43.133 L 37.08 43.133 L 30.72 57.373 L 27.56 57.373 L 29.48 53.213 L 24.98 43.133 L 28.12 43.133 L 31.04 49.813 L 33.94 43.133 Z M 42.58 53.733 C 40.64 53.733 38.66 52.433 38.66 49.133 L 38.66 43.173 L 41.82 43.173 L 41.82 48.913 C 41.82 50.493 42.36 50.993 43.36 50.993 C 44.78 50.993 45.6 49.613 45.8 49.013 L 45.8 43.173 L 48.96 43.173 L 48.96 53.573 L 45.8 53.573 L 45.8 51.773 C 45.6 52.273 44.54 53.733 42.58 53.733 Z M 58.2 53.573 L 54.82 49.533 L 54.16 50.233 L 54.16 53.573 L 51 53.573 L 51 49.793 L 51 39.433 L 54.16 39.433 L 54.16 46.373 L 57.1 43.173 L 60.88 43.173 L 56.76 47.513 L 61.8 53.573 L 58.2 53.573 Z M 65.98 39.433 L 65.98 42.093 L 62.82 42.093 L 62.82 39.433 L 65.98 39.433 Z M 65.98 43.173 L 65.98 53.573 L 62.82 53.573 L 62.82 43.173 L 65.98 43.173 Z" /></g></svg>');background-position:center center;background-repeat:no-repeat;background-size:50% 50%}:host([background])::after{content:"";position:absolute;inset:0;background-color:rgba(0,0,0,.5);z-index:1}`;
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

System.ApplicationBreakPoint=class ApplicationBreakPoint {
    static xs = 300;
    static sm = 540;
    static md = 720;
    static lg = 960;
    static xl = 1140;
}
System.ApplicationBreakPoint.Namespace=`${moduleName}.System`;

_.System.ApplicationBreakPoint=System.ApplicationBreakPoint;
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
Websocket.Events.ApplicationTestEvent2=class ApplicationTestEvent2 extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/application/test/2`;
    }
}
Websocket.Events.ApplicationTestEvent2.Namespace=`${moduleName}.Websocket.Events`;

_.Websocket.Events.ApplicationTestEvent2=Websocket.Events.ApplicationTestEvent2;
Websocket.Routes.DesktopRouter_RemoveDesktopIcon=class DesktopRouter_RemoveDesktopIcon extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/desktop/RemoveDesktopIcon`;
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
Websocket.Events.Body.Namespace=`${moduleName}.Websocket.Events`;
Websocket.Events.Body.$schema={"id":"number","name":"string"};
Aventus.Converter.register(Websocket.Events.Body.Fullname, Websocket.Events.Body);

_.Websocket.Events.Body=Websocket.Events.Body;
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
Errors.LoginError.Namespace=`${moduleName}.Errors`;
Errors.LoginError.$schema={...(Aventus.GenericError?.$schema ?? {}), };
Aventus.Converter.register(Errors.LoginError.Fullname, Errors.LoginError);

_.Errors.LoginError=Errors.LoginError;
Lib.HttpRouter=class HttpRouter extends Aventus.HttpRouter {
}
Lib.HttpRouter.Namespace=`${moduleName}.Lib`;

_.Lib.HttpRouter=Lib.HttpRouter;
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
System.Panel = class Panel extends Aventus.WebComponent {
    static __style = `:host{background-color:var(--primary-color-opacity);border-radius:10px}@media screen and (max-width: 768px){:host{background-color:var(--primary-color)}}@media screen and (max-width: 1224px){:host{border-radius:0px}}`;
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

System.DesktopActivableLogic=class DesktopActivableLogic {
    static findDeskstop(el, desktop) {
        if (desktop) {
            return desktop;
        }
        else if (el instanceof HTMLElement) {
            let desktopTemp = Aventus.ElementExtension.findParentByType(el, System.Desktop);
            return desktopTemp;
        }
        return null;
    }
    static set(el, desktop) {
        this.findDeskstop(el, desktop)?.setElementToActive(el);
    }
    static remove(el, desktop) {
        this.findDeskstop(el, desktop)?.removeElementFromActive(el);
    }
}
System.DesktopActivableLogic.Namespace=`${moduleName}.System`;

_.System.DesktopActivableLogic=System.DesktopActivableLogic;
Data.DataTypes.Pdf=class Pdf extends AventusSharp.Data.AventusFile {
    static get Fullname() { return "Core.Data.DataTypes.Pdf, Core"; }
    Name = "";
    Html = "";
    Debug = false;
}
Data.DataTypes.Pdf.Namespace=`${moduleName}.Data.DataTypes`;
Data.DataTypes.Pdf.$schema={...(AventusSharp.Data.AventusFile?.$schema ?? {}), "Name":"string","Html":"string","Debug":"boolean"};
Aventus.Converter.register(Data.DataTypes.Pdf.Fullname, Data.DataTypes.Pdf);

_.Data.DataTypes.Pdf=Data.DataTypes.Pdf;
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
App.AppConfiguration.Namespace=`${moduleName}.App`;
App.AppConfiguration.$schema={"appsInstalled":"string","allApps":"Map"};
Aventus.Converter.register(App.AppConfiguration.Fullname, App.AppConfiguration);

Data.ApplicationData=class ApplicationData extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.ApplicationData, Core"; }
    Name = "";
    DisplayName = "";
    Version = 0;
    LogoClassName = "";
    LogoTagName = "";
    Extension;
}
Data.ApplicationData.Namespace=`${moduleName}.Data`;
Data.ApplicationData.$schema={...(AventusSharp.Data.Storable?.$schema ?? {}), "Name":"string","DisplayName":"string","Version":"number","LogoClassName":"string","LogoTagName":"string","Extension":"string"};
Aventus.Converter.register(Data.ApplicationData.Fullname, Data.ApplicationData);

_.Data.ApplicationData=Data.ApplicationData;
Websocket.Routes.ApplicationRouter_GetAll3=class ApplicationRouter_GetAll3 extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/application3`;
    }
}
Websocket.Routes.ApplicationRouter_GetAll3.Namespace=`${moduleName}.Websocket.Routes`;

_.Websocket.Routes.ApplicationRouter_GetAll3=Websocket.Routes.ApplicationRouter_GetAll3;
Websocket.Routes.ApplicationRouter_GetAll2=class ApplicationRouter_GetAll2 extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/application2`;
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
Data.ApplicationOpen.Namespace=`${moduleName}.Data`;
Data.ApplicationOpen.$schema={"id":"string","applicationName":"string","number":"number","history":"string","isHidden":"boolean"};
Aventus.Converter.register(Data.ApplicationOpen.Fullname, Data.ApplicationOpen);

_.Data.ApplicationOpen=Data.ApplicationOpen;
Data.ApplicationOpenInfo=class ApplicationOpenInfo {
    static get Fullname() { return "Core.Data.ApplicationOpenInfo, Core"; }
    DesktopId;
    Info;
}
Data.ApplicationOpenInfo.Namespace=`${moduleName}.Data`;
Data.ApplicationOpenInfo.$schema={"DesktopId":"number","Info":"ApplicationOpen"};
Aventus.Converter.register(Data.ApplicationOpenInfo.Fullname, Data.ApplicationOpenInfo);

_.Data.ApplicationOpenInfo=Data.ApplicationOpenInfo;
Websocket.Routes.DesktopRouter_RemoveApp=class DesktopRouter_RemoveApp extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/desktop/RemoveApp`;
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
(function (DesktopLocation) {
    DesktopLocation[DesktopLocation["Desktop"] = 0] = "Desktop";
    DesktopLocation[DesktopLocation["BottomBar"] = 1] = "BottomBar";
    DesktopLocation[DesktopLocation["HomeFav"] = 2] = "HomeFav";
})(Data.DesktopLocation || (Data.DesktopLocation = {}));

_.Data.DesktopLocation=Data.DesktopLocation;
(function (BackgroundSize) {
    BackgroundSize[BackgroundSize["Cover"] = 0] = "Cover";
    BackgroundSize[BackgroundSize["Contain"] = 1] = "Contain";
    BackgroundSize[BackgroundSize["Stretch"] = 2] = "Stretch";
})(Data.BackgroundSize || (Data.BackgroundSize = {}));

_.Data.BackgroundSize=Data.BackgroundSize;
Data.DataTypes.ImageFile=class ImageFile extends AventusSharp.Data.AventusFile {
    static get Fullname() { return "Core.Data.DataTypes.ImageFile, Core"; }
}
Data.DataTypes.ImageFile.Namespace=`${moduleName}.Data.DataTypes`;
Data.DataTypes.ImageFile.$schema={...(AventusSharp.Data.AventusFile?.$schema ?? {}), };
Aventus.Converter.register(Data.DataTypes.ImageFile.Fullname, Data.DataTypes.ImageFile);

_.Data.DataTypes.ImageFile=Data.DataTypes.ImageFile;
Data.DataTypes.UserPPFile=class UserPPFile extends Data.DataTypes.ImageFile {
    static get Fullname() { return "Core.Data.DataTypes.UserPPFile, Core"; }
}
Data.DataTypes.UserPPFile.Namespace=`${moduleName}.Data.DataTypes`;
Data.DataTypes.UserPPFile.$schema={...(Data.DataTypes.ImageFile?.$schema ?? {}), };
Aventus.Converter.register(Data.DataTypes.UserPPFile.Fullname, Data.DataTypes.UserPPFile);

_.Data.DataTypes.UserPPFile=Data.DataTypes.UserPPFile;
Data.User=class User extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.User, Core"; }
    Firstname = "";
    Lastname = "";
    Username = "";
    Password = "";
    Token = "";
    Picture = new Data.DataTypes.ImageFile();
    IsSuperAdmin = false;
}
Data.User.Namespace=`${moduleName}.Data`;
Data.User.$schema={...(AventusSharp.Data.Storable?.$schema ?? {}), "Firstname":"string","Lastname":"string","Username":"string","Password":"string","Token":"string","Picture":""+moduleName+".Data.DataTypes.ImageFile","IsSuperAdmin":"boolean"};
Aventus.Converter.register(Data.User.Fullname, Data.User);

_.Data.User=Data.User;
Data.PermissionUser=class PermissionUser extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.PermissionUser, Core"; }
    Data;
    Permission;
    Data;
    User;
}
Data.PermissionUser.Namespace=`${moduleName}.Data`;
Data.PermissionUser.$schema={...(AventusSharp.Data.Storable?.$schema ?? {}), "Permission":""+moduleName+".Data.Permission","User":""+moduleName+".Data.User"};
Aventus.Converter.register(Data.PermissionUser.Fullname, Data.PermissionUser);

_.Data.PermissionUser=Data.PermissionUser;
Data.Group=class Group extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.Group, Core"; }
    Name = "";
    Description = "";
    Users = [];
    parentGroup = undefined;
}
Data.Group.Namespace=`${moduleName}.Data`;
Data.Group.$schema={...(AventusSharp.Data.Storable?.$schema ?? {}), "Name":"string","Description":"string","Users":""+moduleName+".Data.User","parentGroup":"Group"};
Aventus.Converter.register(Data.Group.Fullname, Data.Group);

_.Data.Group=Data.Group;
Data.PermissionGroup=class PermissionGroup extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.PermissionGroup, Core"; }
    Data;
    Permission;
    Data;
    Group;
}
Data.PermissionGroup.Namespace=`${moduleName}.Data`;
Data.PermissionGroup.$schema={...(AventusSharp.Data.Storable?.$schema ?? {}), "Permission":""+moduleName+".Data.Permission","Group":""+moduleName+".Data.Group"};
Aventus.Converter.register(Data.PermissionGroup.Fullname, Data.PermissionGroup);

_.Data.PermissionGroup=Data.PermissionGroup;
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
    static __style = `:host{align-items:center;border-radius:5px;cursor:pointer;display:flex;font-size:var(--font-size);margin:0 5px;padding:5px 10px;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host .title{margin-left:30px}:host .icon{display:none;font-size:var(--font-size-sm);margin-right:10px;width:20px}:host([icon]) .title{margin-left:0px}:host([icon]) .icon{display:inline-block}@media screen and (min-width: 1225px){:host{font-size:var(--font-size)}:host .icon{font-size:var(--font-size)}:host(:hover){background-color:var(--darker)}}`;
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
    static __style = `:host{--scrollbar-container-display: flex;background-color:#fff;border-radius:5px;box-shadow:var(--elevation-3);cursor:pointer;display:flex;flex-direction:column;outline:none;overflow:hidden;position:absolute;-webkit-tap-highlight-color:rgba(0,0,0,0);z-index:502}:host .container{display:flex;flex-direction:column;padding:5px 0}`;
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
        setTimeout(() => {
            this.collapseEl.open = true;
        }, 100);
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
    onRemove(icon, x, y) {
        for (let provider of this.providers) {
            provider.removeAppPosition(icon, x, y, this);
        }
    }
}
State.MoveApplication.Namespace=`${moduleName}.State`;

_.State.MoveApplication=State.MoveApplication;
Data.DekstopConfiguration=class DekstopConfiguration extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.DekstopConfiguration, Core"; }
    Background;
    Data;
    BackgroundSize = Data.BackgroundSize.Cover;
    SyncDesktop = false;
    SizeMobile = 85;
    SizeTablet = 75;
    SizeDesktop = 65;
    BackgroundColor = undefined;
}
Data.DekstopConfiguration.Namespace=`${moduleName}.Data`;
Data.DekstopConfiguration.$schema={...(AventusSharp.Data.Storable?.$schema ?? {}), "Background":""+moduleName+".Data.DataTypes.ImageFile","BackgroundSize":"BackgroundSize","SyncDesktop":"boolean","SizeMobile":"number","SizeTablet":"number","SizeDesktop":"number","BackgroundColor":"string"};
Aventus.Converter.register(Data.DekstopConfiguration.Fullname, Data.DekstopConfiguration);

_.Data.DekstopConfiguration=Data.DekstopConfiguration;
Data.DesktopAppIcon=class DesktopAppIcon extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.DesktopAppIcon, Core"; }
    Position;
    DesktopId;
    IconTag;
    Location;
}
Data.DesktopAppIcon.Namespace=`${moduleName}.Data`;
Data.DesktopAppIcon.$schema={...(AventusSharp.Data.Storable?.$schema ?? {}), "Position":"number","DesktopId":"number","IconTag":"string","Location":"DesktopLocation"};
Aventus.Converter.register(Data.DesktopAppIcon.Fullname, Data.DesktopAppIcon);

_.Data.DesktopAppIcon=Data.DesktopAppIcon;
Websocket.Routes.DesktopRouter_SetDesktopIcon=class DesktopRouter_SetDesktopIcon extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/desktop/SetDesktopIcon`;
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
    Token;
    UserId = undefined;
    Configuration = new Data.DekstopConfiguration();
    Icons = [];
    Applications = [];
}
Data.Desktop.Namespace=`${moduleName}.Data`;
Data.Desktop.$schema={...(AventusSharp.Data.Storable?.$schema ?? {}), "Name":"string","Token":"string","UserId":"number","Configuration":"DekstopConfiguration","Icons":"DesktopAppIcon","Applications":""+moduleName+".Data.ApplicationOpen"};
Aventus.Converter.register(Data.Desktop.Fullname, Data.Desktop);

_.Data.Desktop=Data.Desktop;
Routes.DesktopRouter=class DesktopRouter extends AventusSharp.Routes.StorableRoute {
    StorableName() {
        return "Desktop";
    }
}
Routes.DesktopRouter.Namespace=`${moduleName}.Routes`;

_.Routes.DesktopRouter=Routes.DesktopRouter;
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
    async beforeUpdateItem(item, fromList, result) {
        const savedApps = item.Applications;
        item.Applications = [];
        await super.beforeUpdateItem(item, fromList, result);
        item.Applications = savedApps;
    }
}
RAM.DesktopRAM.Namespace=`${moduleName}.RAM`;

_.RAM.DesktopRAM=RAM.DesktopRAM;
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
    if (target.inverse) {
        target.calculateGrid();
    }
}));this.__addPropertyActions("case_height", ((target) => {
    target.style.setProperty("--local-page-case-height", target.case_height + 'px');
    if (target.inverse) {
        target.calculateGrid();
    }
})); }
    static __style = `:host{--internal-page-case-background: var(--page-case-background, transparent);--internal-page-case-background-active: var(--page-case-background-active, transparent);--internal-page-case-border-active: var(--page-case-border-active, none);--internal-page-case-border-radius:var(--page-case-border-radius, 0)}:host{display:block;width:100%;height:100%;position:relative;overflow:hidden}:host .page-hider{width:100%;height:100%;position:absolute;top:0;left:0}:host .slot-hider ::slotted(*){position:absolute;top:0;left:0;width:var(--local-page-case-width);height:var(--local-page-case-height)}:host([move_content]) .slot-hider{display:none}`;
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
    removeElementAt(no) {
        const element = this.contentsEl[no];
        if (element) {
            delete this.contentsEl[no];
            if (element.parentElement) {
                element.remove();
            }
        }
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
Routes.PdfRouter=class PdfRouter extends Aventus.HttpRoute {
    async Generate(body) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/generate`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryVoid(this.router);
    }
}
Routes.PdfRouter.Namespace=`${moduleName}.Routes`;

_.Routes.PdfRouter=Routes.PdfRouter;
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
    { type: Routes.PdfRouter, path: "Pdf" },
    { type: Routes.PermissionRouter, path: "Permission" },
    { type: Routes.UserRouter, path: "User" },
];

_.Routes.CoreHttpRoutes=Routes.CoreHttpRoutes;
Routes.CoreRouterType= Aventus.HttpRouter.WithRoute(Routes.CoreHttpRoutes);

_.Routes.CoreRouterType=Routes.CoreRouterType;
Routes.CoreRouter=class CoreRouter extends Routes.CoreRouterType {
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
    static __style = `:host{--internal-app-list-case-border-radius: var(--app-list-case-border-radius, var(--app-icon-border-radius, 10px));--internal-app-list-case-border: var(--app-list-case-border, none);--internal-app-list-case-background-color: var(--app-list-case-background-color, transparent);--internal-app-list-case-border-selected: var(--app-list-case-border-selected, 2px solid red);--internal-app-list-case-background-color-selected: var(--app-list-case-background-color-selected, transparent)}:host{align-items:center;background-color:var(--lighter-active);display:flex;flex-direction:column;inset:0;position:absolute;top:100%;transition:top .5s var(--bezier-curve);z-index:5}:host .search{align-items:center;display:flex;height:100px;justify-content:center;width:100%}:host .search input{background-color:var(--form-element-background);border:none;border-radius:100px;box-shadow:var(--elevation-3);font-size:var(--form-element-font-size);line-height:var(--form-element-font-size);max-width:400px;outline:none;padding:10px 20px;width:calc(100% - 20px)}:host .app-list{--page-case-background: var(--internal-app-list-case-background-color);--page-case-background-active: var(--internal-app-list-case-background-color-selected);--page-case-border-active: var(--internal-app-list-case-border-selected);--page-case-border-radius: var(--internal-app-list-case-border-radius);flex-grow:1;max-width:1000px;width:100%}:host([show]){top:0}:host([no_transition]){transition:none}`;
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
        blocks: { 'default':`<div class="search" _id="applist_0">    <input type="text" placeholder="Rechercher" /></div><div class="app-list">    <rk-page-case case_width="100" case_height="100" min_case_margin_left="20" min_case_margin_top="20" min_page_number="1" _id="applist_1">    </rk-page-case></div>` }
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
    setIconSize(size) {
        this.pageCaseEl.case_height = size;
        this.pageCaseEl.case_width = size;
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
    autoScrollInterval = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    autoScrollSpeed = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("zoom", ((target) => {
    target.changeZoom();
})); }
    static __style = `:host{--_scrollbar-container-color: var(--scrollbar-container-color, transparent);--_scrollbar-color: var(--scrollbar-color, #757575);--_scrollbar-active-color: var(--scrollbar-active-color, #858585);--_scrollbar-max-height: var(--scrollbar-max-height, 100%);--_scroller-width: var(--scroller-width, 6px);--_scroller-top: var(--scroller-top, 3px);--_scroller-bottom: var(--scroller-bottom, 3px);--_scroller-right: var(--scroller-right, 3px);--_scroller-left: var(--scroller-left, 3px);--_scrollbar-content-padding: var(--scrollbar-content-padding, 0);--_scrollbar-container-display: var(--scrollbar-container-display, inline-block)}:host{display:block;height:100%;min-height:inherit;min-width:inherit;overflow:hidden;position:relative;-webkit-user-drag:none;-khtml-user-drag:none;-moz-user-drag:none;-o-user-drag:none;width:100%}:host .scroll-main-container{display:block;height:100%;max-height:var(--_scrollbar-max-height);min-height:inherit;min-width:inherit;position:relative;width:100%}:host .scroll-main-container .content-zoom{display:block;height:100%;max-height:var(--_scrollbar-max-height);min-height:inherit;min-width:inherit;position:relative;transform-origin:0 0;width:100%;z-index:4}:host .scroll-main-container .content-zoom .content-hidder{display:block;height:100%;max-height:var(--_scrollbar-max-height);min-height:inherit;min-width:inherit;overflow:hidden;position:relative;width:100%}:host .scroll-main-container .content-zoom .content-hidder .content-wrapper{display:var(--_scrollbar-container-display);height:100%;min-height:inherit;min-width:inherit;padding:var(--_scrollbar-content-padding);position:relative;width:100%}:host .scroll-main-container .scroller-wrapper .container-scroller{display:none;overflow:hidden;position:absolute;transition:transform .2s linear;z-index:5}:host .scroll-main-container .scroller-wrapper .container-scroller .shadow-scroller{background-color:var(--_scrollbar-container-color);border-radius:5px}:host .scroll-main-container .scroller-wrapper .container-scroller .shadow-scroller .scroller{background-color:var(--_scrollbar-color);border-radius:5px;cursor:pointer;position:absolute;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;z-index:5}:host .scroll-main-container .scroller-wrapper .container-scroller .scroller.active{background-color:var(--_scrollbar-active-color)}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical{height:calc(100% - var(--_scroller-bottom)*2 - var(--_scroller-width));padding-left:var(--_scroller-left);right:var(--_scroller-right);top:var(--_scroller-bottom);transform:0;width:calc(var(--_scroller-width) + var(--_scroller-left))}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical.hide{transform:translateX(calc(var(--_scroller-width) + var(--_scroller-left)))}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical .shadow-scroller{height:100%}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical .shadow-scroller .scroller{width:calc(100% - var(--_scroller-left))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal{bottom:var(--_scroller-bottom);height:calc(var(--_scroller-width) + var(--_scroller-top));left:var(--_scroller-right);padding-top:var(--_scroller-top);transform:0;width:calc(100% - var(--_scroller-right)*2 - var(--_scroller-width))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal.hide{transform:translateY(calc(var(--_scroller-width) + var(--_scroller-top)))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal .shadow-scroller{height:100%}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal .shadow-scroller .scroller{height:calc(100% - var(--_scroller-top))}:host([y_scroll]) .scroll-main-container .content-zoom .content-hidder .content-wrapper{height:auto}:host([x_scroll]) .scroll-main-container .content-zoom .content-hidder .content-wrapper{width:auto}:host([y_scroll_visible]) .scroll-main-container .scroller-wrapper .container-scroller.vertical{display:block}:host([x_scroll_visible]) .scroll-main-container .scroller-wrapper .container-scroller.horizontal{display:block}:host([no_user_select]) .content-wrapper *{user-select:none}:host([no_user_select]) ::slotted{user-select:none}`;
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
        blocks: { 'default':`<div class="scroll-main-container" _id="scrollable_0">    <div class="content-zoom" _id="scrollable_1">        <div class="content-hidder" _id="scrollable_2">            <div class="content-wrapper" part="content-wrapper" _id="scrollable_3">                <slot></slot>            </div>        </div>    </div>    <div class="scroller-wrapper">        <div class="container-scroller vertical" _id="scrollable_4">            <div class="shadow-scroller">                <div class="scroller" _id="scrollable_5"></div>            </div>        </div>        <div class="container-scroller horizontal" _id="scrollable_6">            <div class="shadow-scroller">                <div class="scroller" _id="scrollable_7"></div>            </div>        </div>    </div></div>` }
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
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('x');this.__correctGetter('y');this.__upgradeProperty('y_scroll_visible');this.__upgradeProperty('x_scroll_visible');this.__upgradeProperty('floating_scroll');this.__upgradeProperty('x_scroll');this.__upgradeProperty('y_scroll');this.__upgradeProperty('auto_hide');this.__upgradeProperty('break');this.__upgradeProperty('disable');this.__upgradeProperty('no_user_select');this.__upgradeProperty('zoom'); }
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
    startAutoScrollRight() {
        if (!this.autoScrollInterval.right) {
            this.stopAutoScrollLeft();
            this.autoScrollInterval.right = setInterval(() => {
                if (this.x == this.max.x) {
                    this.stopAutoScrollRight();
                    return;
                }
                this.addDelta({
                    x: this.autoScrollSpeed.right,
                    y: 0
                });
            }, 100);
        }
    }
    autoScrollRight(percent = 50) {
        let slow = 10;
        let fast = 200;
        this.autoScrollSpeed.right = (fast - slow) * (percent / 100) + slow;
        this.startAutoScrollRight();
    }
    stopAutoScrollRight() {
        if (this.autoScrollInterval.right) {
            clearInterval(this.autoScrollInterval.right);
            this.autoScrollInterval.right = 0;
        }
    }
    startAutoScrollLeft() {
        if (!this.autoScrollInterval.left) {
            this.stopAutoScrollRight();
            this.autoScrollInterval.left = setInterval(() => {
                if (this.x == 0) {
                    this.stopAutoScrollLeft();
                    return;
                }
                this.addDelta({
                    x: this.autoScrollSpeed.left * -1,
                    y: 0
                });
            }, 100);
        }
    }
    autoScrollLeft(percent = 50) {
        let slow = 10;
        let fast = 200;
        this.autoScrollSpeed.left = (fast - slow) * (percent / 100) + slow;
        this.startAutoScrollLeft();
    }
    stopAutoScrollLeft() {
        if (this.autoScrollInterval.left) {
            clearInterval(this.autoScrollInterval.left);
            this.autoScrollInterval.left = 0;
        }
    }
    startAutoScrollTop() {
        if (!this.autoScrollInterval.top) {
            this.stopAutoScrollBottom();
            this.autoScrollInterval.top = setInterval(() => {
                if (this.y == 0) {
                    this.stopAutoScrollTop();
                    return;
                }
                this.addDelta({
                    x: 0,
                    y: this.autoScrollSpeed.top * -1
                });
            }, 100);
        }
    }
    autoScrollTop(percent = 50) {
        let slow = 10;
        let fast = 200;
        this.autoScrollSpeed.top = (fast - slow) * (percent / 100) + slow;
        this.startAutoScrollTop();
    }
    stopAutoScrollTop() {
        if (this.autoScrollInterval.top) {
            clearInterval(this.autoScrollInterval.top);
            this.autoScrollInterval.top = 0;
        }
    }
    startAutoScrollBottom() {
        if (!this.autoScrollInterval.bottom) {
            this.stopAutoScrollTop();
            this.autoScrollInterval.bottom = setInterval(() => {
                if (this.y == this.max.y) {
                    this.stopAutoScrollBottom();
                    return;
                }
                this.addDelta({
                    x: 0,
                    y: this.autoScrollSpeed.bottom
                });
            }, 100);
        }
    }
    autoScrollBottom(percent = 50) {
        let slow = 10;
        let fast = 200;
        this.autoScrollSpeed.bottom = (fast - slow) * (percent / 100) + slow;
        this.startAutoScrollBottom();
    }
    stopAutoScrollBottom() {
        if (this.autoScrollInterval.bottom) {
            clearInterval(this.autoScrollInterval.bottom);
            this.autoScrollInterval.bottom = 0;
        }
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
        let newValue = {
            x: 0,
            y: e.deltaY * mode,
        };
        if (!this.y_scroll && this.x_scroll) {
            newValue = {
                x: e.deltaY * mode,
                y: 0,
            };
            if ((newValue.x > 0 && this.x != this.max.x) ||
                (newValue.x <= 0 && this.x != 0)) {
                e.stopPropagation();
            }
        }
        else {
            if ((newValue.y > 0 && this.y != this.max.y) ||
                (newValue.y <= 0 && this.y != 0)) {
                e.stopPropagation();
            }
        }
        this.addDelta(newValue);
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
    static lock(element) {
        const container = element.findParentByType(Components.Scrollable);
        if (container) {
            container.disable = true;
        }
    }
    static unlock(element) {
        const container = element.findParentByType(Components.Scrollable);
        if (container) {
            container.disable = false;
        }
    }
}
Components.Scrollable.Namespace=`${moduleName}.Components`;
Components.Scrollable.Tag=`rk-scrollable`;
_.Components.Scrollable=Components.Scrollable;
if(!window.customElements.get('rk-scrollable')){window.customElements.define('rk-scrollable', Components.Scrollable);Aventus.WebComponentInstance.registerDefinition(Components.Scrollable);}

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
					}    btn;
    __registerWatchesActions() {
    this.__addWatchesActions("currentUser");    super.__registerWatchesActions();
}
    static __style = `:host{display:flex;flex-direction:column;left:-9px;position:absolute;width:500px}:host .content{flex-grow:1;max-height:calc(100% - 57px)}:host .content rk-row{height:100%}:host .content rk-row rk-col{height:100%}:host .content rk-row rk-col .title{font-weight:700;height:30px;padding:5px}:host .content rk-row rk-col .scrollable{--scroller-right: 0;height:calc(100% - 30px);width:100%}:host .content rk-row rk-col .recent{width:100%}:host .content rk-row rk-col .recent .recent-container *{background-color:var(--primary-color);border-radius:5px;margin:10px;overflow:hidden}:host .content rk-row rk-col .favoris{width:100%}:host .content rk-row rk-col .favoris .favoris-container .grid{display:flex;flex-wrap:wrap;gap:10px;padding:10px}:host .content rk-row rk-col .favoris .favoris-container .grid *{aspect-ratio:1/1;flex-shrink:0;height:auto;width:calc(33.3333333333% - 6.6666666667px)}:host .footer{align-items:center;border-top:1px solid var(--lighter-active);display:flex;gap:10px;height:57px;justify-content:space-between;width:100%}:host .footer .person{align-items:center;display:flex;padding:8px 10px;margin:10px 10px;border-radius:5px;transition:background-color .2s var(--bezier-curve)}:host .footer .person .icon{height:30px;width:30px}:host .footer .person .name{margin-left:10px}:host .footer .person:hover{background-color:var(--lighter)}:host .footer rk-button{--button-padding: 0px 8px;--button-icon-stroke-color: var(--text-color-red);--button-icon-fill-color: transparent;--button-background-color: var(--red);--button-background-color-hover: transparent;aspect-ratio:1;border:none;box-shadow:var(--elevation-2);min-width:auto;margin:10px 10px}`;
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
        blocks: { 'default':`<div class="content">    <rk-row>        <rk-col size="6">            <div class="recent">                <div class="title">                    Récents                </div>                <rk-scrollable class="scrollable recent-container" floating_scroll _id="homepanel_0">                </rk-scrollable>            </div>        </rk-col>        <rk-col size="6">            <div class="favoris">                <div class="title">                    Mes favoris                </div>                <rk-scrollable class="scrollable favoris-container" floating_scroll>                    <div class="grid" _id="homepanel_1"></div>                </rk-scrollable>            </div>        </rk-col>    </rk-row></div><div class="footer">    <div class="person touch" _id="homepanel_2">        <rk-user-profil-picture class="icon" _id="homepanel_3"></rk-user-profil-picture>        <div class="name" _id="homepanel_4"></div>    </div>    <rk-button icon="/img/icons/power-off.svg" _id="homepanel_5"></rk-button></div>` }
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
    "homepanel_3°uri": {
      "fct": (c) => `${c.print(c.comp.__71121dd8c2837747a91ecf75da806c7amethod0())}`
    },
    "homepanel_4°@HTML": {
      "fct": (c) => `${c.print(c.comp.__71121dd8c2837747a91ecf75da806c7amethod1())} ${c.print(c.comp.__71121dd8c2837747a91ecf75da806c7amethod2())}`
    }
  },
  "pressEvents": [
    {
      "id": "homepanel_2",
      "onPress": (e, pressInstance, c) => { c.comp.openProfil(e, pressInstance); }
    },
    {
      "id": "homepanel_5",
      "onPress": (e, pressInstance, c) => { c.comp.logout(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "HomePanel";
    }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["currentUser"] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('currentUser'); }
    openProfil() {
        let desktop = this.findParentByType(System.Desktop);
        if (desktop) {
            desktop.openUrl("Settings", "/", "/user");
            this.btn.active = false;
        }
    }
    async logout() {
        Lib.SessionManager.logout();
    }
    async displayRecent() {
        // for(let i = 0; i < 20; i++) {
        //     let test = new AppIconInline();
        //     let icon = Aventus.WebComponentInstance.create<AppIcon>("Cave.System.AppIcon");
        //     let app = await ApplicationRAM.getInstance().getApplicationByName("Cave");
        //     if(icon && app) {
        //         test.setIcon(icon);
        //         test.text = app.DisplayName;
        //     }
        //     this.recentContainer.appendChild(test);
        // }
    }
    async displayFavoris() {
        // for(let i = 0; i < 20; i++) {
        //     let icon = Aventus.WebComponentInstance.create<AppIcon>("Cave.System.AppIcon");
        //     if(icon) {
        //         this.favorisContainer.appendChild(icon);
        //     }
        // }
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
        return this.currentUser?.Picture.Uri;
    }
    __71121dd8c2837747a91ecf75da806c7amethod1() {
        return this.currentUser?.Firstname;
    }
    __71121dd8c2837747a91ecf75da806c7amethod2() {
        return this.currentUser?.Lastname;
    }
}
System.HomePanel.Namespace=`${moduleName}.System`;
System.HomePanel.Tag=`rk-home-panel`;
_.System.HomePanel=System.HomePanel;
if(!window.customElements.get('rk-home-panel')){window.customElements.define('rk-home-panel', System.HomePanel);Aventus.WebComponentInstance.registerDefinition(System.HomePanel);}

System.HomeBtn = class HomeBtn extends Aventus.WebComponent {
    get 'active'() { return this.getBoolAttr('active') }
    set 'active'(val) { this.setBoolAttr('active', val) }    static __style = `:host{position:relative}:host .icon{border-radius:5px;cursor:pointer;margin:0 3px;max-height:calc(100% - 16px);max-width:34px;padding:7px;transition:background-color .2s var(--bezier-curve)}:host rk-home-panel{bottom:calc(100% + 5px);height:0;overflow:hidden;transition:bottom var(--bezier-curve) .5s,height var(--bezier-curve) .5s}:host([active]) .icon{background-color:var(--text-color)}:host([active]) .icon rk-img{--img-fill-color: var(--primary-color-opacity)}:host([active]) rk-home-panel{bottom:calc(100% + 10px);height:400px}@media screen and (min-width: 1225px){:host(:not([active])) .icon:hover{background-color:var(--lighter-active)}}`;
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
        blocks: { 'default':`<div class="icon" _id="homebtn_0">    <rk-img mode="contains" src="/img/icons/house.svg" class="touch"></rk-img></div><rk-home-panel _id="homebtn_1"></rk-home-panel>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "homePanel",
      "ids": [
        "homebtn_1"
      ]
    }
  ],
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
        this.homePanel.btn = this;
    }
}
System.HomeBtn.Namespace=`${moduleName}.System`;
System.HomeBtn.Tag=`rk-home-btn`;
_.System.HomeBtn=System.HomeBtn;
if(!window.customElements.get('rk-home-btn')){window.customElements.define('rk-home-btn', System.HomeBtn);Aventus.WebComponentInstance.registerDefinition(System.HomeBtn);}

Websocket.Events.ApplicationTestEvent=class ApplicationTestEvent extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}Core.Websocket.Events.ApplicationTestEvent`;
    }
}
Websocket.Events.ApplicationTestEvent.Namespace=`${moduleName}.Websocket.Events`;

_.Websocket.Events.ApplicationTestEvent=Websocket.Events.ApplicationTestEvent;
Websocket.Routes.ApplicationRouter=class ApplicationRouter extends AventusSharp.WebSocket.Route {
    events;
    constructor(endpoint) {
        super(endpoint);
        this.events = {
            GetAll2: new Websocket.Routes.ApplicationRouter_GetAll2(endpoint, this.getPrefix),
            GetAll3: new Websocket.Routes.ApplicationRouter_GetAll3(endpoint, this.getPrefix),
            GetAll5: new Websocket.Events.ApplicationTestEvent(endpoint, this.getPrefix),
        };
        for (let key in this.events) {
            this.events[key].init();
        }
    }
    async GetAll2(options = {}) {
        const info = {
            channel: `${this.getPrefix()}/application2`,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async GetAll3(body, options = {}) {
        const info = {
            channel: `${this.getPrefix()}/application3`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async GetAll4(options = {}) {
        const info = {
            channel: `${this.getPrefix()}/application4`,
            ...options,
        };
        return await this.endpoint.sendMessage(info);
    }
    async GetAll5(options = {}) {
        const info = {
            channel: `${this.getPrefix()}/getall5`,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
}
Websocket.Routes.ApplicationRouter.Namespace=`${moduleName}.Websocket.Routes`;

_.Websocket.Routes.ApplicationRouter=Websocket.Routes.ApplicationRouter;
Websocket.Routes.DesktopRouter_RegisterOpenApp=class DesktopRouter_RegisterOpenApp extends AventusSharp.WebSocket.Event {
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/desktop/RegisterOpenApp`;
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
Websocket.Routes.DesktopRouter=class DesktopRouter extends AventusSharp.WebSocket.Route {
    events;
    constructor(endpoint) {
        super(endpoint);
        this.events = {
            RegisterOpenApp: new Websocket.Routes.DesktopRouter_RegisterOpenApp(endpoint, this.getPrefix),
            RemoveApp: new Websocket.Routes.DesktopRouter_RemoveApp(endpoint, this.getPrefix),
            SetDesktopIcon: new Websocket.Routes.DesktopRouter_SetDesktopIcon(endpoint, this.getPrefix),
            RemoveDesktopIcon: new Websocket.Routes.DesktopRouter_RemoveDesktopIcon(endpoint, this.getPrefix),
        };
        for (let key in this.events) {
            this.events[key].init();
        }
    }
    async RegisterOpenApp(body, options = {}) {
        const info = {
            channel: `${this.getPrefix()}/desktop/RegisterOpenApp`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async RemoveApp(body, options = {}) {
        const info = {
            channel: `${this.getPrefix()}/desktop/RemoveApp`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async SetDesktopIcon(body, options = {}) {
        const info = {
            channel: `${this.getPrefix()}/desktop/SetDesktopIcon`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async RemoveDesktopIcon(body, options = {}) {
        const info = {
            channel: `${this.getPrefix()}/desktop/RemoveDesktopIcon`,
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
Websocket.MainEndPointType= AventusSharp.WebSocket.EndPoint.WithRoute({
    routes: Websocket.MainEndPointRoutes,
    events: Websocket.MainEndPointEvents
});

_.Websocket.MainEndPointType=Websocket.MainEndPointType;
Websocket.MainEndPoint=class MainEndPoint extends Websocket.MainEndPointType {
    /**
     * Create a singleton
     */
    static getInstance() {
        return Aventus.Instance.get(Websocket.MainEndPoint);
    }
    get path() {
        return "/ws";
    }
}
Websocket.MainEndPoint.Namespace=`${moduleName}.Websocket`;

_.Websocket.MainEndPoint=Websocket.MainEndPoint;
System.BottomBar = class BottomBar extends Aventus.WebComponent {
    get desktop() {
        if (this.parentNode instanceof ShadowRoot) {
            if (this.parentNode.host instanceof System.Desktop) {
                return this.parentNode.host;
            }
        }
        throw "impossible";
    }
    is_desktop_active = false;
    timeoutOverHome = 0;
    emptyIcon;
    static __style = `:host{align-items:center;background-color:var(--primary-color-opacity);border-radius:10px;bottom:10px;box-shadow:var(--elevation-3);color:var(--text-color);display:flex;font-size:var(--font-size);height:50px;left:100px;outline:none;padding:0 10px;position:absolute;transition:opacity var(--bezier-curve) .5s,visibility var(--bezier-curve) .5s,transform 1s var(--bezier-curve);width:calc(100% - 200px);z-index:100}:host .section{align-items:center;display:flex;height:100%}:host .section .icon{--img-stroke-color: transparent;--img-fill-color: var(--text-color);border-radius:5px;cursor:pointer;margin:0 3px;max-height:calc(100% - 16px);max-width:34px;padding:7px;transition:background-color .2s var(--bezier-curve)}:host .section rk-app-icon{margin:0 5px}:host .separator{background-color:var(--text-color);display:inline-block;height:50%;margin:0 13px;width:1px}:host .applications{flex-grow:1;gap:10px;position:relative}:host .applications .empty-icon{background-color:var(--darker-active);border-radius:5px;height:30px;width:30px}:host .nb-notifications{align-items:center;background-color:var(--text-color);border-radius:50%;color:var(--primary-color-opacity);display:flex;font-size:14px;font-weight:bold;height:25px;justify-content:center;letter-spacing:-1px;padding-right:1px;width:25px}@media screen and (min-width: 1225px){:host .section .icon:hover{background-color:var(--lighter-active)}}@media screen and (max-width: 1224px){:host{border-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0;bottom:0px;left:0px;padding:0 10px;width:100%}}@media screen and (max-width: 768px){:host{height:70px}:host .basic-action{display:none}:host .addons>*{display:none}:host .separator{display:none}:host .applications .empty-icon{height:50px;width:50px}}`;
    constructor() { super(); this.setAppPositionTemp=this.setAppPositionTemp.bind(this)this.clearAppPositionTemp=this.clearAppPositionTemp.bind(this)this.setAppPosition=this.setAppPosition.bind(this)this.removeAppPosition=this.removeAppPosition.bind(this) }
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
        blocks: { 'default':`<div class="section basic-action">    <rk-home-btn></rk-home-btn>    <rk-img mode="contains" src="/img/icons/application-panel.svg" class="touch icon" _id="bottombar_0"></rk-img>    <rk-img mode="contains" src="/img/icons/search.svg" class="touch icon"></rk-img>    <rk-img mode="contains" src="/img/icons/layout-fluid.svg" class="touch icon" _id="bottombar_1"></rk-img></div><div class="separator"></div><div class="section applications" _id="bottombar_2"></div><div class="separator"></div><div class="section addons">    <rk-pwa-button></rk-pwa-button>    <rk-add-on-time></rk-add-on-time></div>` }
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
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('desktop'); }
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
            this.setDesktopActive();
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
            let result = await Websocket.MainEndPoint.getInstance().routes.desktop.SetDesktopIcon({
                icon: desktopIcon
            });
            if (result.success && result.result) {
                icon.iconId = result.result.Id;
                icon.position = result.result.Position;
                icon.can_remove = true;
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
                    let result = await Websocket.MainEndPoint.getInstance().routes.desktop.SetDesktopIcon({
                        icon: desktopIcon
                    });
                    if (result.success) {
                        child.position = no;
                    }
                }
            }
        }
    }
    async removeAppPosition(icon, x, y) {
        let caseEl = this.shadowRoot.elementFromPoint(x, y);
        if (caseEl && this.shadowRoot.contains(caseEl)) {
            let children = icon.parentNode?.children ?? [];
            let no = Array.from(children).indexOf(icon);
            let desktopIcon = new Data.DesktopAppIcon();
            desktopIcon.Id = icon.iconId;
            let result = await Websocket.MainEndPoint.getInstance().routes.desktop.RemoveDesktopIcon({
                icon: desktopIcon
            });
            if (result.success) {
                icon.remove();
                for (; no < children.length; no++) {
                    let child = children[no];
                    if (child instanceof System.AppIcon) {
                        let desktopIcon = new Data.DesktopAppIcon();
                        desktopIcon.DesktopId = this.desktop.desktop_id;
                        desktopIcon.Position = no;
                        desktopIcon.IconTag = child.tag;
                        desktopIcon.Location = Data.DesktopLocation.BottomBar;
                        desktopIcon.Id = child.iconId;
                        let result = await Websocket.MainEndPoint.getInstance().routes.desktop.SetDesktopIcon({
                            icon: desktopIcon
                        });
                        if (result.success) {
                            child.position = no;
                        }
                    }
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
    setDesktopActive() {
        System.DesktopActivableLogic.set(this);
    }
    removeDesktopActive() {
        System.DesktopActivableLogic.remove(this);
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
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('target');this.__upgradeProperty('min_width');this.__upgradeProperty('min_height');this.__upgradeProperty('max_width');this.__upgradeProperty('max_height'); }
    styleBefore(addStyle) {
    }
    applyWidth(value) {
        this.target.style.width = value + "px";
    }
    applyHeight(value) {
        this.target.style.height = value + "px";
    }
    applyTop(value) {
        this.target.style.top = value + "px";
    }
    applyLeft(value) {
        this.target.style.left = value + "px";
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
                    this.applyWidth(transform.w);
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
                    this.applyWidth(transform.w);
                    this.applyLeft(left + (e.pageX - startX));
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
                    this.applyHeight(transform.h);
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
                    this.applyHeight(transformH.h);
                }
                let transformW = this.transformWidth(width - (e.pageX - startX));
                if (!transformW.outbound) {
                    this.applyWidth(transformW.w);
                    this.applyLeft(left + (e.pageX - startX));
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
                    this.applyHeight(transformH.h);
                }
                let transformW = this.transformWidth(width + (e.pageX - startX));
                if (!transformW.outbound) {
                    this.applyWidth(transformW.w);
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
                    this.applyHeight(transformH.h);
                    this.applyTop(top + (e.pageY - startY));
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
                    this.applyHeight(transformH.h);
                    this.applyTop(top + (e.pageY - startY));
                }
                let transformW = this.transformWidth(width - (e.pageX - startX));
                if (!transformW.outbound) {
                    this.applyWidth(transformW.w);
                    this.applyLeft(left + (e.pageX - startX));
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
                    this.applyHeight(transformH.h);
                    this.applyTop(top + (e.pageY - startY));
                }
                let transformW = this.transformWidth(width + (e.pageX - startX));
                if (!transformW.outbound) {
                    this.applyWidth(transformW.w);
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
    init(target, config) {
        this._target = target;
        if (config) {
            if (config.applyWidth)
                this.applyWidth = config.applyWidth.bind(this);
            if (config.applyHeight)
                this.applyHeight = config.applyHeight.bind(this);
            if (config.applyLeft)
                this.applyLeft = config.applyLeft.bind(this);
            if (config.applyTop)
                this.applyTop = config.applyTop.bind(this);
        }
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

System.FrameNoScroll = class FrameNoScroll extends Aventus.WebComponent {
    static get observedAttributes() {return ["visible"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'visible'() { return this.getBoolProp('visible') }
    set 'visible'(val) { this.setBoolAttr('visible', val) }    state;
    application;
    resetNavElement;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("visible", ((target) => {
    if (target.visible) {
        target.onShow();
    }
    else {
        target.onHide();
    }
})); }
    static __style = `:host{animation-delay:var(--local-frame-animation-delay, 0ms);animation-duration:200ms;animation-name:fadeIn;animation-timing-function:var(--bezier-curve);animation-fill-mode:forwards;display:none;height:100%;opacity:0;visibility:hidden;width:100%}:host([visible]){display:block}@keyframes fadeIn{0%{opacity:0;visibility:hidden}100%{opacity:1;visibility:visible}}`;
    constructor() {
            super();
            this.addFadeIn();
if (this.constructor == FrameNoScroll) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return FrameNoScroll;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(FrameNoScroll.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "FrameNoScroll";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('visible')) { this.attributeChangedCallback('visible', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('visible'); }
    __listBoolProps() { return ["visible"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    addFadeIn() {
        this.style.setProperty("--local-frame-animation-delay", "200ms");
        this.addEventListener("animationend", (e) => {
            if (e.animationName == "fadeIn") {
                this.style.removeProperty("--local-frame-animation-delay");
            }
        });
    }
    async show(state) {
        this.state = state;
        this.visible = true;
    }
    async hide() {
        this.visible = false;
    }
    async askChange(newState) {
        return true;
    }
    async execute(prom) {
        return this.application.execute(prom);
    }
    async executeWithLoading(prom) {
        return this.application.executeWithLoading(prom);
    }
}
System.FrameNoScroll.Namespace=`${moduleName}.System`;
_.System.FrameNoScroll=System.FrameNoScroll;

System.Frame = class Frame extends System.FrameNoScroll {
    static __style = `:host .main-scroll{--scrollbar-content-padding: 0 15px}`;
    constructor() { super(); if (this.constructor == Frame) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return Frame;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Frame.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'before-scroll':`<slot name="before-scroll"></slot>`,'default':`<slot></slot>`,'after-scroll':`<slot name="after-scroll"></slot>` }, 
        blocks: { 'default':`<slot name="before-scroll"></slot><rk-scrollable floating_scroll class="main-scroll" _id="frame_0">    <slot></slot></rk-scrollable><slot name="after-scroll"></slot>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "mainScroll",
      "ids": [
        "frame_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "Frame";
    }
}
System.Frame.Namespace=`${moduleName}.System`;
_.System.Frame=System.Frame;

State.ApplicationState=class ApplicationState extends Aventus.State {
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
    get application() {
        return this.__manager.application;
    }
    ;
    __canSaveState = true;
    enableSaveState() {
        this.__canSaveState = true;
    }
    disableSaveState() {
        this.__canSaveState = false;
    }
    canSync() {
        if (!this.__canSaveState || !this.__manager)
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
     * Override this tell which field must by sync
     */
    syncField(addField) {
    }
    /**
     * Override this tell which field must by sync
     */
    syncFieldNoCheck(addField) {
    }
    runSyncField() {
        const result = ["$type"];
        const addField = (field) => {
            result.push(field);
        };
        this.syncField(addField);
        this.syncFieldNoCheck(addField);
        return result;
    }
    toJSON() {
        const fields = this.runSyncField();
        return Aventus.Json.classToJson(this, {
            isValidKey: (key) => {
                return fields.includes(key);
            }
        });
    }
    copyValues(src) {
        const fields = this.runSyncField();
        Aventus.Converter.copyValuesClass(this, src, {
            isValidKey: (key) => {
                return fields.includes(key);
            }
        });
    }
}
State.ApplicationState.Namespace=`${moduleName}.State`;
State.ApplicationState.$schema={...(Aventus.State?.$schema ?? {}), "$type":"string","__manager":""+moduleName+".Lib.ApplicationStateManager","application":""+moduleName+".System.Application","__canSaveState":"boolean"};
Aventus.Converter.register(State.ApplicationState.Fullname, State.ApplicationState);

_.State.ApplicationState=State.ApplicationState;
State.ApplicationStorableState=class ApplicationStorableState extends State.ApplicationState {
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
    syncField(addField) {
        super.syncField(addField);
        addField("item");
    }
}
State.ApplicationStorableState.Namespace=`${moduleName}.State`;
State.ApplicationStorableState.$schema={...(State.ApplicationState?.$schema ?? {}), "__item":"T","item":"T"};
Aventus.Converter.register(State.ApplicationStorableState.Fullname, State.ApplicationStorableState);

_.State.ApplicationStorableState=State.ApplicationStorableState;
State.ApplicationEmptyState=class ApplicationEmptyState extends State.ApplicationState {
    localName;
    constructor(stateName) {
        super();
        this.localName = stateName;
    }
    syncFieldNoCheck(addField) {
        addField("localName");
    }
    /**
     * @inheritdoc
     */
    get name() {
        return this.localName;
    }
}
State.ApplicationEmptyState.Namespace=`${moduleName}.State`;
State.ApplicationEmptyState.$schema={...(State.ApplicationState?.$schema ?? {}), "localName":"string","name":"string"};
Aventus.Converter.register(State.ApplicationEmptyState.Fullname, State.ApplicationEmptyState);

Lib.ApplicationStateManager=class ApplicationStateManager extends Aventus.StateManager {
    application;
    constructor(application) {
        super();
        this.application = application;
    }
    save() {
        return this.application.saveApplicationHistory();
    }
    assignDefaultState(stateName) {
        let el = new State.ApplicationEmptyState(stateName);
        el.setManager(this);
        return el;
    }
    setState(state) {
        if (state instanceof State.ApplicationState) {
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
        if (obj instanceof State.ApplicationState) {
            obj.setManager(this.manager);
            obj.disableSaveState();
        }
    }
    afterTransformObject(obj) {
        if (obj instanceof State.ApplicationState) {
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
    cancelNext() {
        this.currentPosition--;
    }
    current() {
        return this.memory[this.currentPosition];
    }
    get nextAvailable() {
        return this.currentPosition < this.memory.length - 1;
    }
    previous(destroy = false) {
        if (this.previousAvailable) {
            if (destroy) {
                delete this.memory[this.currentPosition];
            }
            this.currentPosition--;
            return this.memory[this.currentPosition];
        }
        return null;
    }
    cancelPrevious() {
        this.currentPosition++;
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
System.ApplicationHistory.Namespace=`${moduleName}.System`;
System.ApplicationHistory.$schema={"$type":"string","memory":"History","currentPosition":"number","nextAvailable":"boolean","previousAvailable":"boolean"};
Aventus.Converter.register(System.ApplicationHistory.Fullname, System.ApplicationHistory);

_.System.ApplicationHistory=System.ApplicationHistory;
Lib.ApplicationManager=class ApplicationManager {
    static waitingDelay = 1000;
    static waitings = {};
    static processing = {};
    static mutex = new Aventus.Mutex();
    static openApplications = {};
    static openApplicationsKey = "openApplications";
    static async save(appInfo) {
        if (System.Os.instance.activeDesktop.data.Configuration.SyncDesktop) {
            await this.uniqueAction(appInfo, async (appInfo) => {
                await Websocket.MainEndPoint.getInstance().routes.desktop.RegisterOpenApp({
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
                if (current.number == Info.number && current.applicationName == Info.applicationName) {
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
        if (System.Os.instance.activeDesktop.data.Configuration.SyncDesktop) {
            await this.uniqueAction(appInfo, async (appInfo) => {
                await Websocket.MainEndPoint.getInstance().routes.desktop.RemoveApp({
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
                if (current.number == Info.number && current.applicationName == Info.applicationName) {
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
        Websocket.MainEndPoint.getInstance().routes.desktop.events.RegisterOpenApp.onTrigger.add(this.onRegisterInfo);
        Websocket.MainEndPoint.getInstance().routes.desktop.events.RemoveApp.onTrigger.add(this.onRemoveApp);
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

Components.Popup = class Popup extends Aventus.WebComponent {
    get 'no_red_btn'() { return this.getBoolAttr('no_red_btn') }
    set 'no_red_btn'(val) { this.setBoolAttr('no_red_btn', val) }get 'behind'() { return this.getBoolAttr('behind') }
    set 'behind'(val) { this.setBoolAttr('behind', val) }get 'close_on_click'() { return this.getBoolAttr('close_on_click') }
    set 'close_on_click'(val) { this.setBoolAttr('close_on_click', val) }    get 'info'() {
						return this.__watch["info"];
					}
					set 'info'(val) {
						this.__watch["info"] = val;
					}    cb;
    pressManagerClose;
    pressManagerPopup;
    __registerWatchesActions() {
    this.__addWatchesActions("info", ((target, action, path, value) => {
    target.onOptionsChanged();
}));    super.__registerWatchesActions();
}
    static __style = `:host{--_popup-background-color: var(--popup-background-color, var(--application-background-color, var(--primary-color-opacity)));--_popup-border-radius: var(--popup-border-radius, var(--application-border-radius, 10px));--_popup-header-background-color: var(--popup-header-background-color, var(--application-header-background-color, var(--darker-active)));--_popup-content-padding: var(--popup-content-padding, 15px)}:host{align-items:center;animation-duration:.5s;animation-fill-mode:forwards;animation-name:fadeIn;animation-timing-function:var(--bezier-curve);background-color:rgba(48,48,48,.1);border-radius:var(--application-border-radius);display:flex;inset:0;justify-content:center;position:absolute;z-index:650}:host .popup{background-color:var(--_popup-background-color);border-radius:var(--_popup-border-radius);box-shadow:var(--elevation-5);container-name:application;container-type:inline-size;display:flex;flex-direction:column;max-height:calc(100% - 50px);max-width:calc(100% - 50px)}:host .popup .header{align-items:center;border-top-left-radius:var(--_popup-border-radius);border-top-right-radius:var(--_popup-border-radius);display:flex;flex-shrink:0;height:30px;overflow:hidden;position:relative;width:100%;z-index:3}:host .popup .header .background{background-color:var(--_popup-header-background-color);inset:0;position:absolute;z-index:1}:host .popup .header .title{flex-grow:1;margin-left:15px;margin-right:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;z-index:2}:host .popup .header .application-actions{align-items:center;display:flex;gap:5px;justify-content:end;margin-right:15px;z-index:2}:host .popup .header .application-actions .btn{border-radius:10px;height:15px;width:15px}:host .popup .content{--scrollbar-max-height: calc(var(--app-height) - 50px - 30px - var(--_popup-content-padding) - var(--_popup-content-padding));border-bottom-left-radius:var(--_application-border-radius);border-bottom-right-radius:var(--_application-border-radius);height:calc(100% - 30px);max-height:calc(var(--app-height) - 50px - 30px);min-width:auto;min-height:auto;overflow:hidden;padding:var(--_popup-content-padding);width:100%;z-index:1}:host .popup.shake{animation-duration:.3s;animation-iteration-count:1;animation-name:shake;animation-timing-function:var(--bezier-curve)}:host(.fade-out){animation-duration:.5s;animation-fill-mode:forwards;animation-name:fadeOut;animation-timing-function:var(--bezier-curve)}:host([no_red_btn]) .popup .header .application-actions .btn{display:none}:host([behind]){z-index:550}@media screen and (min-width: 1225px){:host .popup .header .application-actions .btn:hover{box-shadow:0 0 4px var(--darker-active) inset}}@keyframes fadeIn{0%{opacity:0;visibility:hidden}100%{opacity:1;visibility:visible}}@keyframes fadeOut{0%{opacity:1;visibility:visible}100%{opacity:0;visibility:hidden}}@keyframes shake{0%{transform:scale(1)}50%{transform:scale(1.03)}100%{transform:scale(1)}}`;
    constructor() {            super();            this.info = this.defaultOptions();if (this.constructor == Popup) { throw "can't instanciate an abstract class"; } }
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
        blocks: { 'default':`<div class="popup" _id="popup_0">    <div class="header">        <div class="background"></div>        <div class="title" _id="popup_1"></div>        <div class="application-actions">            <div class="btn red touch" _id="popup_2"></div>        </div>    </div>    <rk-scrollable class="content">        <slot></slot>    </rk-scrollable></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "popupEl",
      "ids": [
        "popup_0"
      ]
    }
  ],
  "content": {
    "popup_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__c6b222033048639bf6ac58d471520fbamethod0())}`,
      "once": true
    }
  },
  "pressEvents": [
    {
      "id": "popup_2",
      "onPress": (e, pressInstance, c) => { c.comp.cancel(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "Popup";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('no_red_btn')) { this.attributeChangedCallback('no_red_btn', false, false); }if(!this.hasAttribute('behind')) { this.attributeChangedCallback('behind', false, false); }if(!this.hasAttribute('close_on_click')) { this.attributeChangedCallback('close_on_click', false, false); } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["info"] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('no_red_btn');this.__upgradeProperty('behind');this.__upgradeProperty('close_on_click');this.__correctGetter('info'); }
    __listBoolProps() { return ["no_red_btn","behind","close_on_click"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    mergeInfo(info) {
        this.info = { ...this.info, ...info };
    }
    init(cb) {
        this.cb = cb;
    }
    onOptionsChanged() {
        this.no_red_btn = this.info.hide_red_btn == true;
        this.behind = this.info.behind == true;
        this.close_on_click = this.info.close_on_click == true;
        this.popupEl.style.maxWidth = this.info.max_width ?? '';
        this.popupEl.style.maxHeight = this.info.max_height ?? '';
        this.popupEl.style.minWidth = this.info.min_width ?? '';
        this.popupEl.style.minHeight = this.info.min_height ?? '';
    }
    close() {
        this.classList.add("fade-out");
    }
    addCloseWatcher() {
        this.addEventListener("animationend", (e) => {
            if (e.animationName == "fadeOut") {
                this.remove();
            }
        });
    }
    resolve(response, no_close) {
        if (this.cb) {
            this.cb(response);
        }
        if (!no_close) {
            this.close();
        }
    }
    addPress() {
        this.popupEl.addEventListener("animationend", (e) => {
            if (e.animationName == "shake") {
                this.popupEl.classList.remove("shake");
            }
        });
        this.pressManagerClose = new Aventus.PressManager({
            element: this,
            onPress: (e) => {
                if (this.close_on_click) {
                    this.close();
                }
                else {
                    this.popupEl.classList.add("shake");
                }
            }
        });
        this.pressManagerPopup = new Aventus.PressManager({
            element: this.popupEl,
            onPress: (e) => { }
        });
    }
    postDestruction() {
        this.pressManagerClose?.destroy();
        this.pressManagerPopup?.destroy();
    }
    postCreation() {
        this.addCloseWatcher();
        this.addPress();
        this.onOptionsChanged();
    }
    __c6b222033048639bf6ac58d471520fbamethod0() {
        return this.info.title;
    }
}
Components.Popup.Namespace=`${moduleName}.Components`;
_.Components.Popup=Components.Popup;

Components.Confirm = class Confirm extends Components.Popup {
    static __style = `:host .popup .body{align-items:center;display:flex;justify-content:center;line-height:1.5;padding:20px;padding-top:15px;text-align:center}:host .popup .action{align-items:center;display:flex;gap:20px;justify-content:center}`;
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
        blocks: { 'default':`<rk-scrollable class="body" _id="confirm_0"></rk-scrollable><div class="action">    <rk-button color="red" _id="confirm_1"></rk-button>    <rk-button color="green" _id="confirm_2"></rk-button></div>` }
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
    }
  },
  "pressEvents": [
    {
      "id": "confirm_1",
      "onPress": (e, pressInstance, c) => { c.comp.cancel(e, pressInstance); }
    },
    {
      "id": "confirm_2",
      "onPress": (e, pressInstance, c) => { c.comp.validate(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "Confirm";
    }
    defaultOptions() {
        return {
            title: "",
            description: "",
            true_txt: "Oui",
            false_txt: "Non",
        };
    }
    validate() {
        this.resolve(false);
    }
    cancel() {
        this.resolve(false);
    }
    __caa2fd56843944180566fbe49a4bb311method0() {
        return this.info.description;
    }
    __caa2fd56843944180566fbe49a4bb311method1() {
        return this.info.false_txt;
    }
    __caa2fd56843944180566fbe49a4bb311method2() {
        return this.info.true_txt;
    }
}
Components.Confirm.Namespace=`${moduleName}.Components`;
Components.Confirm.Tag=`rk-confirm`;
_.Components.Confirm=Components.Confirm;
if(!window.customElements.get('rk-confirm')){window.customElements.define('rk-confirm', Components.Confirm);Aventus.WebComponentInstance.registerDefinition(Components.Confirm);}

Components.Alert = class Alert extends Components.Popup {
    static __style = `:host .popup .body{align-items:center;display:flex;justify-content:center;line-height:1.5;padding:20px;padding-top:15px;text-align:center}:host .popup .action{align-items:center;display:flex;gap:20px;justify-content:center}`;
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
        blocks: { 'default':`<rk-scrollable class="body">    <p _id="alert_0"></p></rk-scrollable><div class="action">    <rk-button color="blue" _id="alert_1"></rk-button></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "alert_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__d0561a7aa91ff42b328166316d099970method0())}`,
      "once": true
    },
    "alert_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__d0561a7aa91ff42b328166316d099970method1())}`,
      "once": true
    }
  },
  "events": [
    {
      "eventName": "click",
      "id": "alert_1",
      "fct": (e, c) => c.comp.validate(e)
    }
  ]
}); }
    getClassName() {
        return "Alert";
    }
    defaultOptions() {
        return {
            title: "",
            description: "",
            btn_txt: "ok"
        };
    }
    validate() {
        this.resolve();
    }
    cancel() {
        this.resolve();
    }
    __d0561a7aa91ff42b328166316d099970method0() {
        return this.info.description;
    }
    __d0561a7aa91ff42b328166316d099970method1() {
        return this.info.btn_txt;
    }
}
Components.Alert.Namespace=`${moduleName}.Components`;
Components.Alert.Tag=`rk-alert`;
_.Components.Alert=Components.Alert;
if(!window.customElements.get('rk-alert')){window.customElements.define('rk-alert', Components.Alert);Aventus.WebComponentInstance.registerDefinition(Components.Alert);}

System.Application = class Application extends Aventus.WebComponent {
    static get observedAttributes() {return ["app_title", "full", "is_hidden"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'moving'() { return this.getBoolAttr('moving') }
    set 'moving'(val) { this.setBoolAttr('moving', val) }get 'loading'() { return this.getBoolAttr('loading') }
    set 'loading'(val) { this.setBoolAttr('loading', val) }    get 'app_title'() { return this.getStringProp('app_title') }
    set 'app_title'(val) { this.setStringAttr('app_title', val) }get 'full'() { return this.getBoolProp('full') }
    set 'full'(val) { this.setBoolAttr('full', val) }get 'is_hidden'() { return this.getBoolProp('is_hidden') }
    set 'is_hidden'(val) { this.setBoolAttr('is_hidden', val) }    get 'is_desktop_active'() {
						return this.__watch["is_desktop_active"];
					}
					set 'is_desktop_active'(val) {
						this.__watch["is_desktop_active"] = val;
					}    oldFrame;
    allRoutes = {};
    activePath = "";
    activeState;
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
            this.router = new Lib.ApplicationStateManager(this);
        }
        return this.router;
    }
    __registerWatchesActions() {
    this.__addWatchesActions("is_desktop_active", ((target) => {
    target.manageShortcut();
}));    super.__registerWatchesActions();
}
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("full", ((target) => {
    target.saveSize();
}));this.__addPropertyActions("is_hidden", ((target) => {
    target.onIsHiddenChange();
})); }
    static __style = `:host{--_application-box-shadow: var(--application-box-shadow);--_application-header-background-color: var(--application-header-background-color, var(--darker-active));--_application-background-color: var(--application-background-color, var(--primary-color-opacity));--_application-border-radius: var(--application-border-radius, 10px)}:host{background-color:var(--_application-background-color);border-radius:var(--_application-border-radius);box-shadow:var(--_application-box-shadow);container-name:application;container-type:inline-size;height:var(--app-height);outline:none;position:absolute;width:var(--app-width);z-index:50}:host .header{align-items:center;border-top-left-radius:var(--_application-border-radius);border-top-right-radius:var(--_application-border-radius);cursor:grab;display:flex;flex-shrink:0;height:30px;overflow:hidden;position:relative;width:100%;z-index:3}:host .header .background{background-color:var(--_application-header-background-color);inset:0;position:absolute;z-index:1}:host .header .navigation-actions{align-items:center;display:flex;flex-grow:0;height:100%;margin-left:15px;margin-right:15px;z-index:2}:host .header .navigation-actions .action{align-items:center;border-radius:2px;display:flex;height:calc(100% - 6px);justify-content:center;padding:0px;padding:1px 5px;transition:background-color var(--bezier-curve) .2s;width:22px}:host .header .navigation-actions .action rk-img{height:100%;width:100%}:host .header .navigation-actions .action.disable rk-img{--img-fill-color: var(--text-disable)}:host .header .title{flex-grow:1;margin-right:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;z-index:2}:host .header .application-actions{align-items:center;display:flex;gap:5px;justify-content:end;margin-right:15px;z-index:2}:host .header .application-actions .btn{border-radius:10px;height:15px;width:15px}:host .content{border-bottom-left-radius:var(--_application-border-radius);border-bottom-right-radius:var(--_application-border-radius);height:calc(100% - 35px);margin:5px;margin-top:0;overflow:hidden;width:calc(100% - 10px);z-index:1}:host .loading{border-radius:var(--_application-border-radius);display:none;z-index:600}:host rk-resize{--resize-z-index: 4}:host(:not([moving])){transition:height .5s var(--bezier-curve),width .5s var(--bezier-curve),top .5s var(--bezier-curve),left .5s var(--bezier-curve),border-radius .5s var(--bezier-curve),opacity var(--bezier-curve) .5s,visibility var(--bezier-curve) .5s}:host(:not([moving])) .header{transition:border-radius .5s var(--bezier-curve)}:host([moving]) .header{cursor:grabbing}:host([full]){border-radius:0;height:100% !important;left:0 !important;top:0 !important;width:100% !important;z-index:500}:host([full]) .header{border-top-left-radius:0;border-top-right-radius:0;cursor:default}:host([full]) .content{border-bottom-left-radius:0;border-bottom-right-radius:0}:host([is_hidden]){height:0 !important;left:calc(50% - 100px) !important;overflow:hidden;top:calc(100% - 50px) !important;width:200px !important}:host([loading]) .loading{display:flex}@media screen and (min-width: 1225px){:host .header .navigation-actions .action:not(.disable):hover{background-color:var(--lighter)}:host .header .application-actions .btn:hover{box-shadow:0 0 4px var(--darker-active) inset}}@media screen and (max-width: 1224px){:host .header{height:40px}:host .header .application-actions{gap:10px}:host .header .application-actions .btn{height:20px;width:20px}:host .content{height:calc(100% - 45px)}}@media screen and (max-width: 768px){:host{border-radius:0;height:100% !important;left:0 !important;top:0 !important;width:100% !important;z-index:502}:host .header{border-top-left-radius:0;border-top-right-radius:0;height:40px}:host .header .application-actions{gap:10px}:host .header .application-actions .btn{height:20px;width:20px}:host .header .application-actions .orange{display:none}:host .content{border-bottom-left-radius:0;border-bottom-right-radius:0;height:calc(100% - 45px)}:host rk-resize{display:none}:host([is_hidden]){left:0 !important;width:100% !important}}`;
    constructor() {            super();            this.history = new System.ApplicationHistory();            this.sizeManager = new System.ApplicationSize(this);            this.canChangeState = this.canChangeState.bind(this);            this.navigator.canChangeState(this.canChangeState);if (this.constructor == Application) { throw "can't instanciate an abstract class"; } this.validError404=this.validError404.bind(this)this.saveApplicationHistory=this.saveApplicationHistory.bind(this)this.onResizeStart=this.onResizeStart.bind(this)this.onResizeStop=this.onResizeStop.bind(this)this.moveApplicationToLeft=this.moveApplicationToLeft.bind(this)this.moveApplicationToRight=this.moveApplicationToRight.bind(this) }
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('moving')) { this.attributeChangedCallback('moving', false, false); }if(!this.hasAttribute('loading')) { this.attributeChangedCallback('loading', false, false); }if(!this.hasAttribute('app_title')){ this['app_title'] = "Page title"; }if(!this.hasAttribute('full')) { this.attributeChangedCallback('full', false, false); }if(!this.hasAttribute('is_hidden')) { this.attributeChangedCallback('is_hidden', false, false); } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["is_desktop_active"] = false; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('navigator');this.__upgradeProperty('moving');this.__upgradeProperty('loading');this.__upgradeProperty('app_title');this.__upgradeProperty('full');this.__upgradeProperty('is_hidden');this.__correctGetter('is_desktop_active'); }
    __listBoolProps() { return ["moving","loading","full","is_hidden"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    onContextMenu(contextMenu, stop) {
        stop();
    }
    async navigate(to) {
        let hasChanged = await this.navigator.setState(to);
        let state = this.navigator.getState();
        if (state && hasChanged) {
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
    addRoute(route, frame) {
        this.allRoutes[route] = {
            route: route,
            scriptUrl: '',
            render: () => frame
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
    defineShortcut() {
        return [
            [[Lib.SpecialTouch.Control, Lib.SpecialTouch.ArrowLeft], this.moveApplicationToLeft],
            [[Lib.SpecialTouch.Control, Lib.SpecialTouch.ArrowRight], this.moveApplicationToRight]
        ];
    }
    manageShortcut() {
        let shortcuts = this.defineShortcut();
        if (this.is_desktop_active) {
            for (let shortcut of shortcuts) {
                Lib.ShortcutManager.subscribe(shortcut[0], shortcut[1]);
            }
        }
        else {
            for (let shortcut of shortcuts) {
                Lib.ShortcutManager.unsubscribe(shortcut[0], shortcut[1]);
            }
        }
    }
    shouldDestroyFrame(frame) {
        return false;
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
                            element.resetNavElement = () => element = undefined;
                            this.contentEl?.appendChild(element);
                        }
                        if (this.oldFrame && this.oldFrame != element) {
                            await this.oldFrame.hide();
                            if (this.shouldDestroyFrame(this.oldFrame)) {
                                this.oldFrame.remove();
                                this.oldFrame.resetNavElement();
                            }
                        }
                        let oldPage = this.oldFrame;
                        let oldUrl = this.activePath;
                        this.oldFrame = element;
                        this.activePath = path;
                        this.activeState = currentState;
                        await element.show(currentState);
                        let titleTemp = element.pageTitle();
                        if (titleTemp !== undefined) {
                            this.app_title = titleTemp;
                        }
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
            await this.page404.show(undefined);
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
    async canChangeState(newState) {
        if (!this.oldFrame)
            return true;
        return await this.oldFrame.askChange(newState);
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
    async navigatePrevious(destroy = false) {
        let history = this.history.previous(destroy);
        if (history) {
            if (await this.navigator.setState(history.state)) {
                this.checkNavigationState();
                this.saveApplicationHistory();
            }
            else {
                this.history.cancelPrevious();
            }
        }
    }
    async navigateNext() {
        let history = this.history.next();
        if (history) {
            if (await this.navigator.setState(history.state)) {
                this.checkNavigationState();
                this.saveApplicationHistory();
            }
            else {
                this.history.cancelNext();
            }
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
                if (state?.constructor == current.state.constructor && state instanceof State.ApplicationState && current.state instanceof State.ApplicationState) {
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
        this.moveApplication(info);
        this.full = info.isFullScreen;
    }
    moveApplication(options) {
        if (options.left != undefined)
            this.style.left = options.left + 'px';
        if (options.top != undefined)
            this.style.top = options.top + 'px';
        if (options.width != undefined)
            this.style.setProperty("--app-width", options.width + "px");
        if (options.height != undefined)
            this.style.setProperty("--app-height", options.height + "px");
    }
    moveApplicationToLeft() {
        this.moveApplication({
            top: 5,
            left: 5,
            height: System.Os.instance.offsetHeight - 10,
            width: System.Os.instance.offsetWidth / 2 - 7,
        });
        this.saveSize();
    }
    moveApplicationToRight() {
        this.moveApplication({
            top: 5,
            left: System.Os.instance.offsetWidth / 2 + 2,
            height: System.Os.instance.offsetHeight - 10,
            width: System.Os.instance.offsetWidth / 2 - 7,
        });
        this.saveSize();
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
        this.resizeEl.init(this, {
            applyWidth: (value) => this.style.setProperty("--app-width", value + "px"),
            applyHeight: (value) => this.style.setProperty("--app-height", value + "px")
        });
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
    async alert(info) {
        const a = new Components.Alert();
        a.mergeInfo(info);
        await this.popup(a);
    }
    async confirm(info) {
        const c = new Components.Confirm();
        c.mergeInfo(info);
        return await this.popup(c);
    }
    async parseErrors(result) {
        if (result.errors.length > 0) {
            let msg = result.errors.map(p => p.message).join("<br/>");
            await this.alert({
                title: "Error",
                description: msg,
                behind: false,
                min_width: '300px',
            });
            return undefined;
        }
        if (result instanceof Aventus.ResultWithError)
            return result.result;
        return undefined;
    }
    async execute(prom) {
        const queryResult = await prom;
        return await this.parseErrors(queryResult);
    }
    async executeWithLoading(prom) {
        const queryResult = await this.showLoading(prom);
        return await this.parseErrors(queryResult);
    }
    async showLoading(fct) {
        const minDelay = 2000;
        let start;
        let timeout = setTimeout(() => {
            start = new Date();
            this.loading = true;
        }, 200);
        let result;
        if (fct instanceof Promise) {
            result = await fct;
        }
        else {
            result = await fct();
        }
        clearTimeout(timeout);
        if (start) {
            let now = new Date();
            let diffMs = now.getTime() - start.getTime();
            if (diffMs < minDelay) {
                await Aventus.sleep(minDelay - diffMs);
            }
        }
        this.loading = false;
        return result;
    }
    addFocus() {
        this.setAttribute("tabindex", "-1");
        this.addEventListener("focus", (e) => {
            e.stopPropagation();
            this.setDesktopActive();
        });
    }
    setDesktopActive() {
        System.DesktopActivableLogic.set(this);
    }
    removeDesktopActive() {
        System.DesktopActivableLogic.remove(this);
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
        super.postDestruction();
        this.options?.desktop.removeApp(this);
        this.removeDesktopActive();
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
        super.postDestruction();
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
    static getTagName(application, componentUrl, delay = 1000) {
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
                setTimeout(() => {
                    let index = this.waiting.indexOf(cb);
                    if (index != -1) {
                        this.waiting.splice(index, 1);
                    }
                    resolve("");
                }, delay);
                this.waiting.push(cb);
            }
        });
    }
}
Lib.AppIconManager.Namespace=`${moduleName}.Lib`;

_.Lib.AppIconManager=Lib.AppIconManager;
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
Lib.Platform=class Platform {
    static onScreenChange = new Aventus.Callback();
    static init() {
        let currentDevice = this.device;
        let screenObserver = new Aventus.ResizeObserver(() => {
            let newDevice = this.device;
            if (currentDevice != newDevice) {
                currentDevice = newDevice;
                this.onScreenChange.trigger([newDevice]);
            }
        });
        screenObserver.observe(document.body);
    }
    static onScreenChangeAndRun(cb) {
        this.onScreenChange.add(cb);
        cb(this.device);
    }
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
    static getRatio(element) {
        return element.offsetWidth + " / " + element.offsetHeight;
    }
}
Lib.Platform.Namespace=`${moduleName}.Lib`;

_.Lib.Platform=Lib.Platform;
System.Desktop = class Desktop extends Aventus.WebComponent {
    static get observedAttributes() {return ["desktop_id"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'show_application_list'() { return this.getBoolAttr('show_application_list') }
    set 'show_application_list'(val) { this.setBoolAttr('show_application_list', val) }get 'is_active'() { return this.getBoolAttr('is_active') }
    set 'is_active'(val) { this.setBoolAttr('is_active', val) }get 'background_size'() { return this.getStringAttr('background_size') }
    set 'background_size'(val) { this.setStringAttr('background_size', val) }    get 'desktop_id'() { return this.getNumberProp('desktop_id') }
    set 'desktop_id'(val) { this.setNumberAttr('desktop_id', val) }    applications = {};
    data;
    _iconSize = 0;
    get iconSize() {
        return this._iconSize;
    }
    activableOrder = [];
    oldActiveCase;
    pressManagerStopMoveApp;
    static __style = `:host{--_desktop-background-color: var(--desktop-background-color, var(--primary-color))}:host{background-color:var(--_desktop-background-color);background-position:center;background-repeat:no-repeat;background-size:cover;flex-shrink:0;height:100%;overflow:hidden;position:relative;width:100%}:host .icons{--page-case-border-radius: 5px;--page-case-border-active: 1px solid var(--darker-active);--page-case-background-active: var(--lighter-active);height:calc(100% - 70px);transition:opacity var(--bezier-curve) .5s,visibility var(--bezier-curve) .5s;width:100%;z-index:2}:host .app-container{transition:opacity var(--bezier-curve) .5s,visibility var(--bezier-curve) .5s}:host([show_application_list])>*{opacity:0 !important;visibility:hidden !important}:host([background_size=Cover]){background-size:cover}:host([background_size=Contain]){background-size:contain}:host([background_size=Stretch]){background-size:100% 100%}`;
    constructor() { super(); this.setAppPositionTemp=this.setAppPositionTemp.bind(this)this.clearAppPositionTemp=this.clearAppPositionTemp.bind(this)this.setAppPosition=this.setAppPosition.bind(this)this.removeAppPosition=this.removeAppPosition.bind(this) }
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('show_application_list')) { this.attributeChangedCallback('show_application_list', false, false); }if(!this.hasAttribute('is_active')) { this.attributeChangedCallback('is_active', false, false); }if(!this.hasAttribute('background_size')){ this['background_size'] = Data.BackgroundSize[Data.BackgroundSize.Cover]; }if(!this.hasAttribute('desktop_id')){ this['desktop_id'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('iconSize');this.__upgradeProperty('show_application_list');this.__upgradeProperty('is_active');this.__upgradeProperty('background_size');this.__upgradeProperty('desktop_id'); }
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
        contextMenu.addItem({
            text: "Paramètres",
            materialIcon: "display_settings",
            action: () => {
                this.openUrl("Settings", "/", "/display");
            }
        });
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
            this.setElementToActive(comp);
            await comp.navigate(url);
            this.applications[comp.$type][i] = comp;
            this.manageAppBottomBar(comp.$type);
        }
        else {
            let notif = new System.Notification();
            notif.subject = "Erreur";
            notif.innerHTML = "Impossible de trouver l'application " + application + " sur " + componentUrl;
            System.Os.instance.notify(notif);
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
        if (this.applications[type]) {
            delete this.applications[type][appNumber];
            if (Object.keys(this.applications[type]).length == 0) {
                delete this.applications[type];
            }
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
    calculateIconSize() {
        let type = Lib.Platform.device;
        let iconSize = 75;
        if (type == "pc") {
            iconSize = this.data.Configuration.SizeDesktop;
        }
        else if (type == "tablet") {
            iconSize = this.data.Configuration.SizeTablet;
        }
        else if (type == "mobile") {
            iconSize = this.data.Configuration.SizeMobile;
        }
        this.setIconSize(iconSize);
    }
    setIconSize(size) {
        this._iconSize = size;
        this.pageCaseEl.case_height = size;
        this.pageCaseEl.case_width = size;
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
                        shadow.style.width = this.iconSize + 'px';
                        shadow.style.height = this.iconSize + 'px';
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
            this.oldActiveCase?.classList.remove("active");
            this.oldActiveCase = undefined;
            let result = await Websocket.MainEndPoint.getInstance().routes.desktop.SetDesktopIcon({
                icon: desktopIcon
            });
            if (result.success && result.result) {
                icon.iconId = result.result.Id;
                icon.can_remove = true;
            }
        }
    }
    async removeAppPosition(icon, x, y) {
        let caseEl = this.pageCaseEl.shadowRoot.elementFromPoint(x, y);
        if (caseEl && this.pageCaseEl.shadowRoot.contains(caseEl)) {
            let desktopIcon = new Data.DesktopAppIcon();
            desktopIcon.Id = icon.iconId;
            let result = await Websocket.MainEndPoint.getInstance().routes.desktop.RemoveDesktopIcon({
                icon: desktopIcon
            });
            if (result.success) {
                this.pageCaseEl.removeElementAt(icon.position);
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
    watchDevice() {
        Lib.Platform.onScreenChange.add((type) => {
            this.calculateIconSize();
        });
    }
    async applyDataChange() {
        this.style.backgroundImage = 'url("' + this.data.Configuration.Background.Uri + '")';
        this.style.backgroundColor = this.data.Configuration.BackgroundColor ?? '';
        this.background_size = Data.BackgroundSize[this.data.Configuration.BackgroundSize];
        this.calculateIconSize();
    }
    async loadData() {
        let data = await RAM.DesktopRAM.getInstance().getById(this.desktop_id);
        if (data) {
            this.data = data;
            this.applyDataChange();
            if (this.data.Configuration.SyncDesktop) {
                this.recreateApplications(this.data.Applications);
            }
            else {
                this.recreateApplications(Lib.ApplicationManager.getOpenApps(data.Id));
            }
            for (let icon of data.Icons) {
                let el = Aventus.WebComponentInstance.create(icon.IconTag);
                if (el) {
                    el.iconId = icon.Id;
                    el.position = icon.Position;
                    el.can_remove = true;
                    if (icon.Location == Data.DesktopLocation.Desktop) {
                        this.pageCaseEl.appendChild(el);
                    }
                    else if (icon.Location == Data.DesktopLocation.BottomBar) {
                        this.bottomBar.setApplication(el);
                    }
                }
            }
            this.pageCaseEl.calculateGrid();
            this.watchDevice();
            data.onUpdate(() => {
                this.applyDataChange();
            });
        }
    }
    setElementToActive(el) {
        let index = this.activableOrder.indexOf(el);
        if (index != -1) {
            this.activableOrder.splice(index, 1);
        }
        this.activableOrder.splice(0, 0, el);
        this.applyActiveToElement();
    }
    removeElementFromActive(el) {
        let index = this.activableOrder.indexOf(el);
        if (index != -1) {
            this.activableOrder.splice(index, 1);
        }
        this.applyActiveToElement();
    }
    applyActiveToElement() {
        let total = 501 + this.activableOrder.length;
        let first = true;
        for (let el of this.activableOrder) {
            if (first) {
                first = false;
                el.is_desktop_active = true;
            }
            else {
                el.is_desktop_active = false;
            }
            el.style.zIndex = total + '';
            total--;
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
    static __style = `:host{--_active-desktop: var(_active-desktop, 0)}:host{height:100%;position:relative;width:100%;z-index:1}:host .desktop-container{display:flex;height:100%;position:relative;width:100%;z-index:1}:host .desktop-container .desktop-case{flex-shrink:0;height:100%;position:relative;width:100%}:host .desktop-container .desktop-case .delete-desktop{--img-stroke-color: var(--red);background-color:var(--lighter-active);border-radius:50px;cursor:pointer;display:none;height:40px;position:absolute;right:5px;top:5px;width:40px;z-index:5556}:host .desktop-container .desktop-case .desktop-hider{display:none;inset:0;position:absolute;z-index:5555}:host .desktop-container .desktop-case:first-child{margin-left:calc(var(--_active-desktop)*-100%)}:host .add-desktop{--img-stroke-color: white;bottom:30px;display:none;height:50px;min-width:auto;position:absolute;right:10px;z-index:6}:host rk-loading{opacity:0;visibility:hidden}:host(:not([ready])) *{opacity:0;visibility:hidden}:host(:not([loading])) rk-loading{transition:opacity 1s var(--bezier-curve),visibility 1s var(--bezier-curve)}:host([loading]) rk-loading{opacity:1;visibility:visible}:host([desktop_list]) .desktop-container{flex-wrap:wrap;height:auto;justify-content:center}:host([desktop_list]) .desktop-container .desktop-case{--nb: 3;aspect-ratio:var(--ration);box-shadow:var(--elevation-10);height:max-content;margin:15px !important;overflow:hidden;width:calc(100%/var(--nb) - 30px)}:host([desktop_list]) .desktop-container .desktop-case .desktop-hider,:host([desktop_list]) .desktop-container .desktop-case .delete-desktop{display:block}:host([desktop_list]) .desktop-container .desktop-case rk-desktop{height:calc(100%*var(--nb));margin-left:calc(-50%*(var(--nb) - 1));top:calc(-50%*(var(--nb) - 1));transform:scale(calc(1 / var(--nb)));width:calc(100%*var(--nb))}:host([desktop_list]) .desktop-container .desktop-case.active{border:solid 5px var(--blue);border-radius:5px}:host([desktop_list]) .add-desktop{display:block}`;
    constructor() {            super();            System.Os.instance = this;            Lib.Platform.init();            this.notificationManager = new System.NotificationManager(this);            Lib.ApplicationManager.reloadData();this.desktopMoveLeft=this.desktopMoveLeft.bind(this)this.desktopMoveRight=this.desktopMoveRight.bind(this)this.desktopMoveValidate=this.desktopMoveValidate.bind(this) }
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
        blocks: { 'default':`<rk-app-list _id="os_0"></rk-app-list><rk-loading text="Chargement du système" background></rk-loading><rk-scrollable y_scroll="false" disable _id="os_1">    <div class="desktop-container">        <template _id="os_2"></template>    </div></rk-scrollable><rk-button-icon class="add-desktop" icon="/img/icons/add.svg" color="blue"></rk-button-icon>` }
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
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('activeDesktop');this.__upgradeProperty('loading');this.__upgradeProperty('ready');this.__upgradeProperty('desktop_list');this.__upgradeProperty('show_application_list');this.__upgradeProperty('active_desktop');this.__correctGetter('desktops'); }
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
            await this.alert({
                title: "Impossible de supprimer le bureau",
                description: "Il vous faut au minimum un bureau actif"
            });
        }
        else if (await this.confirm({
            title: "Suppression d'un bureau",
            description: "Etes-vous sûr de vouloir supprimer ce bureau?"
        })) {
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
        if (Lib.Platform.isiOS) {
            let startX;
            let startY;
            let lastX;
            let lastY;
            let timeoutContext;
            Aventus.PressManager.setGlobalConfig({
                onEvent: (e) => {
                    if (e.type == "pointerdown") {
                        lastX = startX = e.pageX;
                        lastY = startY = e.pageY;
                        timeoutContext = setTimeout(() => {
                            let diffX = startX - lastX;
                            let diffY = startY - lastY;
                            if (diffX * diffX + diffY * diffY < 200) {
                                const menu = new this.contextMenuCst();
                                menu.init(e.pageX, e.pageY, true, this);
                            }
                        }, 700);
                    }
                    else if (e.type == "pointerup") {
                        clearTimeout(timeoutContext);
                    }
                    else if (e.type == "pointermove") {
                        lastX = e.pageX;
                        lastY = e.pageY;
                    }
                }
            });
            // new Aventus.PressManager({
            //     element: this,
            //     delayLongPress: 500,
            //     onLongPress: (e) => {
            //         const menu = new this.contextMenuCst();
            //         menu.init(e.pageX, e.pageY, true, this);
            //     }
            // });
        }
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
    async alert(info) {
        const a = new Components.Alert();
        a.mergeInfo(info);
        await this.popup(a);
    }
    async confirm(info) {
        const c = new Components.Confirm();
        c.mergeInfo(info);
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
            this.style.setProperty("--ration", Lib.Platform.getRatio(this));
        }).observe(this);
    }
    async startSocket() {
        AventusSharp.WebSocket.Connection.Debug = true;
        Websocket.MainEndPoint.getInstance().open();
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

Lib.Process=class Process {
    static async execute(component, prom) {
        const app = component.findParentByType(System.Application);
        if (app) {
            return app.execute(prom);
        }
        else {
            const queryResult = await prom;
            return await this.parseErrors(queryResult);
        }
    }
    static async executeWithLoading(component, prom) {
        const app = component.findParentByType(System.Application);
        if (app) {
            return app.executeWithLoading(prom);
        }
        return this.execute(component, prom);
    }
    static async parseErrors(result) {
        if (result.errors.length > 0) {
            let msg = result.errors.map(p => p.message).join("<br/>");
            await System.Os.instance.alert({
                title: "Error",
                description: msg,
                behind: false,
                min_width: '300px',
            });
            return undefined;
        }
        if (result instanceof Aventus.ResultWithError)
            return result.result;
        return undefined;
    }
}
Lib.Process.Namespace=`${moduleName}.Lib`;

_.Lib.Process=Lib.Process;
System.AppIcon = class AppIcon extends Aventus.WebComponent {
    get 'shaking'() { return this.getBoolAttr('shaking') }
    set 'shaking'(val) { this.setBoolAttr('shaking', val) }get 'can_remove'() { return this.getBoolAttr('can_remove') }
    set 'can_remove'(val) { this.setBoolAttr('can_remove', val) }get 'is_open'() { return this.getBoolAttr('is_open') }
    set 'is_open'(val) { this.setBoolAttr('is_open', val) }get 'position'() { return this.getNumberAttr('position') }
    set 'position'(val) { this.setNumberAttr('position', val) }    pressManager;
    pressManagerMove;
    dragAndDrop;
    moveApplicationState;
    iconId = 0;
    static __style = `:host{align-items:center;background-color:#0c2247;border-radius:5px;box-shadow:var(--elevation-5);cursor:pointer;display:flex;height:30px;justify-content:center;position:relative;transition:box-shadow var(--bezier-curve) .3s,transform var(--bezier-curve) .3s;width:30px;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host::after{background-color:var(--text-color);border-radius:5px;bottom:-7px;content:"";height:4px;opacity:0;position:absolute;transition:visibility var(--bezier-curve) .3s,opacity var(--bezier-curve) .3s;visibility:hidden;width:4px}:host .remove{background-color:var(--primary-color);border-radius:10px;display:none;height:20px;position:absolute;right:-10px;top:-10px;width:20px}:host .remove rk-img{--img-stroke-color: var(--text-color);height:100%;padding:0;width:100%}:host([shaking]){animation:shake linear .4s infinite}:host([shaking][can_remove]) .remove{display:block}:host([is_open]){transform:translateY(-3px)}:host([is_open])::after{visibility:visible;opacity:1}@media screen and (min-width: 1225px){:host(:hover){box-shadow:var(--elevation-1)}}@media screen and (max-width: 768px){:host{height:50px;width:50px}}@keyframes shake{0%{transform:rotateZ(0) rotateX(-13deg)}25%{transform:rotateZ(2deg) rotateX(-13deg)}50%{transform:rotateZ(0) rotateX(-13deg)}75%{transform:rotateZ(-2deg) rotateX(-13deg)}100%{transform:rotateZ(0) rotateX(-13deg)}}`;
    constructor() {            super();            this.classList.add("touch");if (this.constructor == AppIcon) { throw "can't instanciate an abstract class"; } }
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
        blocks: { 'default':`<div class="remove" _id="appicon_0"><rk-img src="/img/icons/close.svg"></rk-img></div><slot></slot>` }
    });
}
    __createStates() { super.__createStates(); let that = this;  this.__createStatesList(State.MoveApplication.state, State.DesktopStateManager);this.__addActiveState(State.MoveApplication.state, State.DesktopStateManager, (state, slugs) => { that.__inactiveDefaultState(State.DesktopStateManager); that.onMoveApplication(state, slugs);})this.__addInactiveState(State.MoveApplication.state, State.DesktopStateManager, (state, nextState, slugs) => { that.onStopMovingApplication(state, nextState, slugs);that.__activeDefaultState(nextState, State.DesktopStateManager);}) }
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "appicon_0",
      "onPress": (e, pressInstance, c) => { c.comp.removeApp(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "AppIcon";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('shaking')) { this.attributeChangedCallback('shaking', false, false); }if(!this.hasAttribute('can_remove')) { this.attributeChangedCallback('can_remove', false, false); }if(!this.hasAttribute('is_open')) { this.attributeChangedCallback('is_open', false, false); }if(!this.hasAttribute('position')){ this['position'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('shaking');this.__upgradeProperty('can_remove');this.__upgradeProperty('is_open');this.__upgradeProperty('position'); }
    __listBoolProps() { return ["shaking","can_remove","is_open"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    async removeApp(e, instance) {
        if (this.moveApplicationState) {
            this.moveApplicationState.onRemove(this, e.pageX, e.pageY);
        }
    }
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
    onMoveApplication(state, slugs) {
        if (state instanceof State.MoveApplication) {
            this.moveApplicationState = state;
            this.shaking = true;
            this.destroyPressManager();
            this.createDragAndDrop();
        }
    }
    onStopMovingApplication() {
        this.moveApplicationState = undefined;
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
        this.pressManagerMove = new Aventus.PressManager({
            element: this,
            onPress: () => {
                console.log("open menu");
            }
        });
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
        this.pressManagerMove?.destroy();
        this.pressManagerMove = undefined;
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
    set 'hide_menu_size'(val) { this.setStringAttr('hide_menu_size', val) }get 'open_sidenav'() { return this.getBoolAttr('open_sidenav') }
    set 'open_sidenav'(val) { this.setBoolAttr('open_sidenav', val) }get 'no_sidenav'() { return this.getBoolAttr('no_sidenav') }
    set 'no_sidenav'(val) { this.setBoolAttr('no_sidenav', val) }    get 'sidnavItems'() {
						return this.__watch["sidnavItems"];
					}
					set 'sidnavItems'(val) {
						this.__watch["sidnavItems"] = val;
					}    __registerWatchesActions() {
    this.__addWatchesActions("sidnavItems");    super.__registerWatchesActions();
}
    static __style = `:host{--_application-sidnav-sidenav-width: var(--application-sidnav-sidenav-width, 200px)}:host .header .navigation-actions .menu{align-items:center;border:1px solid var(--darker);border-radius:200px;display:none;height:24px;justify-content:center;transition:background-color var(--bezier-curve) .2s,border var(--bezier-curve) .2s;width:24px}:host .header .navigation-actions .menu mi-icon{font-size:18px}:host .content{display:flex;height:calc(100% - 30px);margin:0;position:relative;width:100%}:host .content .sidenav-hider{animation-duration:300ms;animation-fill-mode:forwards;animation-name:fadeIn;animation-timing-function:var(--bezier-curve);background-color:rgba(0,0,0,.2);display:none;inset:0;position:absolute;z-index:50}:host .content .sidenav{background-color:var(--secondary-color);box-shadow:var(--elevation-4);height:100%;transition:transform .3s var(--bezier-curve);width:var(--_application-sidnav-sidenav-width);z-index:50}:host .content .sidenav .sidenav-item{align-items:center;border-bottom:1px solid var(--lighter-active);cursor:pointer;display:flex;flex-wrap:nowrap;height:51px;padding:10px;transition:linear background-color .3s}:host .content .sidenav .sidenav-item rk-img{--img-fill-color: var(--text-color);flex-grow:0;flex-shrink:0;height:30px;width:30px}:host .content .sidenav .sidenav-item rk-img[src=""]{display:none}:host .content .sidenav .sidenav-item mi-icon{align-items:center;color:var(--text-color);display:flex;height:30px;justify-content:center;width:30px}:host .content .sidenav .sidenav-item span{color:var(--text-color);flex-grow:1;flex-shrink:0;margin-left:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:calc(100% - 45px)}:host .content .sidenav .sidenav-item rk-img[src=""]~span{margin-left:0}:host .content .sidenav .sidenav-item[active]{background-color:var(--lighter-active)}:host .content .container{flex-shrink:0;height:100%;transition:width .3s var(--bezier-curve),margin-left .3s var(--bezier-curve);width:calc(100% - var(--_application-sidnav-sidenav-width))}:host([open_sidenav]) .navigation-actions .menu{background-color:var(--darker) !important}:host([no_sidenav]) .header .navigation-actions .menu{display:none !important}:host([no_sidenav]) .content{display:flex;height:calc(100% - 30px);margin:0;position:relative;width:100%}:host([no_sidenav]) .content .sidenav{display:none}:host([no_sidenav]) .content .sidenav-hider{display:none !important}:host([no_sidenav]) .content .container{height:100%;width:100%}@media screen and (min-width: 1225px){:host .header .navigation-actions .menu:hover{background-color:var(--darker) !important;border:1px solid rgba(0,0,0,0)}:host .content .sidenav .sidenav-item:hover{background-color:var(--lighter-active)}}@media screen and (max-width: 1224px){:host .header .navigation-actions .menu{height:26px;width:26px}:host .header .navigation-actions .menu mi-icon{font-size:20px}:host .content{height:calc(100% - 40px)}}@container application (max-width: 300px){:host([hide_menu_size=xs]:not([no_sidenav])) .header .navigation-actions .menu{display:flex}:host([hide_menu_size=xs]:not([no_sidenav])) .header .navigation-actions .previous,:host([hide_menu_size=xs]:not([no_sidenav])) .header .navigation-actions .next{display:none}:host([hide_menu_size=xs]:not([no_sidenav])) .content .sidenav{transform:translateX(calc(-100% - 20px))}:host([hide_menu_size=xs]:not([no_sidenav])) .content .container{margin-left:calc(var(--_application-sidnav-sidenav-width)*-1);width:100%}}@container application (max-width: 300px){:host([hide_menu_size=xs][open_sidenav]) .content .sidenav-hider{display:block}:host([hide_menu_size=xs][open_sidenav]) .content .sidenav{transform:translateX(0%)}}@container application (max-width: 540px){:host([hide_menu_size=sm]:not([no_sidenav])) .header .navigation-actions .menu{display:flex}:host([hide_menu_size=sm]:not([no_sidenav])) .header .navigation-actions .previous,:host([hide_menu_size=sm]:not([no_sidenav])) .header .navigation-actions .next{display:none}:host([hide_menu_size=sm]:not([no_sidenav])) .content .sidenav{transform:translateX(calc(-100% - 20px))}:host([hide_menu_size=sm]:not([no_sidenav])) .content .container{margin-left:calc(var(--_application-sidnav-sidenav-width)*-1);width:100%}}@container application (max-width: 540px){:host([hide_menu_size=sm][open_sidenav]) .content .sidenav-hider{display:block}:host([hide_menu_size=sm][open_sidenav]) .content .sidenav{transform:translateX(0%)}}@container application (max-width: 720px){:host([hide_menu_size=md]:not([no_sidenav])) .header .navigation-actions .menu{display:flex}:host([hide_menu_size=md]:not([no_sidenav])) .header .navigation-actions .previous,:host([hide_menu_size=md]:not([no_sidenav])) .header .navigation-actions .next{display:none}:host([hide_menu_size=md]:not([no_sidenav])) .content .sidenav{transform:translateX(calc(-100% - 20px))}:host([hide_menu_size=md]:not([no_sidenav])) .content .container{margin-left:calc(var(--_application-sidnav-sidenav-width)*-1);width:100%}}@container application (max-width: 720px){:host([hide_menu_size=md][open_sidenav]) .content .sidenav-hider{display:block}:host([hide_menu_size=md][open_sidenav]) .content .sidenav{transform:translateX(0%)}}@container application (max-width: 960px){:host([hide_menu_size=lg]:not([no_sidenav])) .header .navigation-actions .menu{display:flex}:host([hide_menu_size=lg]:not([no_sidenav])) .header .navigation-actions .previous,:host([hide_menu_size=lg]:not([no_sidenav])) .header .navigation-actions .next{display:none}:host([hide_menu_size=lg]:not([no_sidenav])) .content .sidenav{transform:translateX(calc(-100% - 20px))}:host([hide_menu_size=lg]:not([no_sidenav])) .content .container{margin-left:calc(var(--_application-sidnav-sidenav-width)*-1);width:100%}}@container application (max-width: 960px){:host([hide_menu_size=lg][open_sidenav]) .content .sidenav-hider{display:block}:host([hide_menu_size=lg][open_sidenav]) .content .sidenav{transform:translateX(0%)}}@container application (max-width: 1140px){:host([hide_menu_size=xl]:not([no_sidenav])) .header .navigation-actions .menu{display:flex}:host([hide_menu_size=xl]:not([no_sidenav])) .header .navigation-actions .previous,:host([hide_menu_size=xl]:not([no_sidenav])) .header .navigation-actions .next{display:none}:host([hide_menu_size=xl]:not([no_sidenav])) .content .sidenav{transform:translateX(calc(-100% - 20px))}:host([hide_menu_size=xl]:not([no_sidenav])) .content .container{margin-left:calc(var(--_application-sidnav-sidenav-width)*-1);width:100%}}@container application (max-width: 1140px){:host([hide_menu_size=xl][open_sidenav]) .content .sidenav-hider{display:block}:host([hide_menu_size=xl][open_sidenav]) .content .sidenav{transform:translateX(0%)}}@keyframes fadeIn{0%{opacity:0;visibility:hidden}100%{visibility:100%;visibility:visible}}`;
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
        blocks: { 'default':`<div class="header" _id="applicationsidnav_0">    <div class="background"></div>    <div class="navigation-actions">        <div class="action menu touch" _id="applicationsidnav_1">            <mi-icon icon="menu"></mi-icon>        </div>        <div class="previous action touch disable" _id="applicationsidnav_2">            <rk-img src="/img/icons/angle-left.svg"></rk-img>        </div>        <div class="next action touch disable" _id="applicationsidnav_3">            <rk-img src="/img/icons/angle-right.svg"></rk-img>        </div>    </div>    <div class="title" _id="applicationsidnav_4"></div>    <div class="application-actions">        <div class="btn green touch" _id="applicationsidnav_5"></div>        <div class="btn orange touch" _id="applicationsidnav_6"></div>        <div class="btn red touch" _id="applicationsidnav_7"></div>    </div></div><div class="content">    <div class="sidenav-hider" _id="applicationsidnav_8"></div>    <div class="sidenav">        <rk-scrollable auto_hide _id="applicationsidnav_9">            <template _id="applicationsidnav_10"></template>        </rk-scrollable>    </div>    <div class="container" _id="applicationsidnav_16">    </div></div><rk-resize min_width="200" min_height="200" _id="applicationsidnav_17"></rk-resize><rk-loading class="loading"></rk-loading><slot></slot>` }
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
        "applicationsidnav_2"
      ]
    },
    {
      "name": "navigateNextEl",
      "ids": [
        "applicationsidnav_3"
      ]
    },
    {
      "name": "navEl",
      "ids": [
        "applicationsidnav_9"
      ]
    },
    {
      "name": "contentEl",
      "ids": [
        "applicationsidnav_16"
      ]
    },
    {
      "name": "resizeEl",
      "ids": [
        "applicationsidnav_17"
      ]
    }
  ],
  "content": {
    "applicationsidnav_4°@HTML": {
      "fct": (c) => `${c.print(c.comp.__564ed14a7e807cc2bd8ebdf7d29b1c4fmethod2())}`,
      "once": true
    }
  },
  "pressEvents": [
    {
      "id": "applicationsidnav_1",
      "onPress": (e, pressInstance, c) => { c.comp.toggleSidnav(e, pressInstance); }
    },
    {
      "id": "applicationsidnav_2",
      "onPress": (e, pressInstance, c) => { c.comp.navigatePrevious(e, pressInstance); }
    },
    {
      "id": "applicationsidnav_3",
      "onPress": (e, pressInstance, c) => { c.comp.navigateNext(e, pressInstance); }
    },
    {
      "id": "applicationsidnav_5",
      "onPress": (e, pressInstance, c) => { c.comp.hide(e, pressInstance); }
    },
    {
      "id": "applicationsidnav_6",
      "onPress": (e, pressInstance, c) => { c.comp.toggleFull(e, pressInstance); }
    },
    {
      "id": "applicationsidnav_7",
      "onPress": (e, pressInstance, c) => { c.comp.kill(e, pressInstance); }
    },
    {
      "id": "applicationsidnav_8",
      "onPress": (e, pressInstance, c) => { c.comp.closeSidenav(e, pressInstance); }
    }
  ]
});const templ0 = new Aventus.Template(this);templ0.setTemplate(`                 <rk-link class="sidenav-item" _id="applicationsidnav_11">                    <template _id="applicationsidnav_12"></template>                    <span _id="applicationsidnav_15"></span>                </rk-link>            `);templ0.setActions({
  "content": {
    "applicationsidnav_11°to": {
      "fct": (c) => `${c.print(c.comp.__564ed14a7e807cc2bd8ebdf7d29b1c4fmethod3(c.data.item))}`,
      "once": true
    },
    "applicationsidnav_11°active_pattern": {
      "fct": (c) => `${c.print(c.comp.__564ed14a7e807cc2bd8ebdf7d29b1c4fmethod4(c.data.item))}`,
      "once": true
    },
    "applicationsidnav_15°@HTML": {
      "fct": (c) => `${c.print(c.comp.__564ed14a7e807cc2bd8ebdf7d29b1c4fmethod6(c.data.item))}`,
      "once": true
    }
  }
});this.__getStatic().__template.addLoop({
                    anchorId: 'applicationsidnav_10',
                    template: templ0,
                simple:{data: "this.sidnavItems",item:"item"}});const templ1 = new Aventus.Template(this);templ1.setTemplate(`                        <mi-icon _id="applicationsidnav_13"></mi-icon>                    `);templ1.setActions({
  "content": {
    "applicationsidnav_13°icon": {
      "fct": (c) => `${c.print(c.comp.__564ed14a7e807cc2bd8ebdf7d29b1c4fmethod5(c.data.item))}`,
      "once": true
    }
  }
});const templ2 = new Aventus.Template(this);templ2.setTemplate(`                        <rk-img _id="applicationsidnav_14"></rk-img>                    `);templ2.setActions({
  "content": {
    "applicationsidnav_14°src": {
      "fct": (c) => `${c.print(c.comp.__564ed14a7e807cc2bd8ebdf7d29b1c4fmethod5(c.data.item))}`,
      "once": true
    }
  }
});templ0.addIf({
                    anchorId: 'applicationsidnav_12',
                    parts: [{once: true,
                    condition: (c) => c.comp.__564ed14a7e807cc2bd8ebdf7d29b1c4fmethod1(c.data.item),
                    template: templ1
                },{once: true,
                    condition: (c) => true,
                    template: templ2
                }]
            }); }
    getClassName() {
        return "ApplicationSidnav";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('hide_menu_size')){ this['hide_menu_size'] = "sm"; }if(!this.hasAttribute('open_sidenav')) { this.attributeChangedCallback('open_sidenav', false, false); }if(!this.hasAttribute('no_sidenav')) { this.attributeChangedCallback('no_sidenav', false, false); } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["sidnavItems"] = []; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('hide_menu_size');this.__upgradeProperty('open_sidenav');this.__upgradeProperty('no_sidenav');this.__correctGetter('sidnavItems'); }
    __listBoolProps() { return ["open_sidenav","no_sidenav"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    addRouteSidenav(options) {
        let route = options.route;
        this.allRoutes[route] = {
            route: route,
            scriptUrl: '',
            render: () => options.frame
        };
        let icon = "";
        let useMi = false;
        if (options.miIcon) {
            useMi = true;
            icon = options.miIcon;
        }
        else if (options.icon?.startsWith("mi-")) {
            useMi = true;
            icon = options.icon.replace("mi-", "");
        }
        else if (options.icon) {
            icon = options.icon;
        }
        this.sidnavItems.push({
            name: options.name,
            icon,
            useMi,
            route,
            active: options.activeRoute ?? route
        });
    }
    toggleSidnav() {
        this.open_sidenav = !this.open_sidenav;
    }
    closeSidenav() {
        this.open_sidenav = false;
    }
    __564ed14a7e807cc2bd8ebdf7d29b1c4fmethod2() {
        return this.app_title;
    }
    __564ed14a7e807cc2bd8ebdf7d29b1c4fmethod3(item) {
        return item.route;
    }
    __564ed14a7e807cc2bd8ebdf7d29b1c4fmethod4(item) {
        return item.active;
    }
    __564ed14a7e807cc2bd8ebdf7d29b1c4fmethod5(item) {
        return item.icon;
    }
    __564ed14a7e807cc2bd8ebdf7d29b1c4fmethod6(item) {
        return item.name;
    }
    __564ed14a7e807cc2bd8ebdf7d29b1c4fmethod1(item) {
        return item.useMi;
    }
}
System.ApplicationSidnav.Namespace=`${moduleName}.System`;
_.System.ApplicationSidnav=System.ApplicationSidnav;

Lib.PWA=class PWA {
    static get isAvailable() {
        if (window['deferredPrompt']) {
            return true;
        }
        return false;
    }
    static get isAvailableIOS() {
        return Lib.Platform.isiOS && !Lib.Platform.isStandalone;
    }
    static e;
    static isInit = false;
    static startInstall;
    static onInit = new Aventus.Callback();
    static onDownloading = new Aventus.Callback();
    static onDownloaded = new Aventus.Callback();
    static async init() {
        if (this.isInit) {
            return;
        }
        if (!this.e && Lib.PWA.isAvailable) {
            this.e = window['deferredPrompt'];
            let result = this.onInit.trigger([]);
            this.isInit = true;
        }
        else if (Lib.PWA.isAvailableIOS) {
            let result = this.onInit.trigger([]);
            this.isInit = true;
        }
        if (this.isInit) {
            window.addEventListener('appinstalled', async (evt) => {
                let now = new Date();
                let start = this.startInstall ?? new Date();
                let diffMs = now.getTime() - start.getTime();
                if (diffMs < 3000) {
                    await Aventus.sleep(3000 - diffMs);
                }
                this.onDownloaded.trigger([]);
            });
        }
    }
    static addOnInit(cb) {
        if (this.isInit) {
            cb();
        }
        else {
            this.onInit.add(cb);
        }
    }
    static async download() {
        if (this.isAvailable && this.e) {
            this.e.prompt();
            const choiceResult = await this.e.userChoice;
            if (choiceResult.outcome === 'accepted') {
                this.startInstall = new Date();
                this.onDownloading.trigger([]);
            }
        }
        else if (this.isAvailableIOS) {
            let pwaios = new PwaPromptIos();
            document.body.appendChild(pwaios);
        }
    }
}
Lib.PWA.Namespace=`${moduleName}.Lib`;

_.Lib.PWA=Lib.PWA;
System.PwaButton = class PwaButton extends Aventus.WebComponent {
    get 'visible'() { return this.getBoolAttr('visible') }
    set 'visible'(val) { this.setBoolAttr('visible', val) }get 'downloading'() { return this.getBoolAttr('downloading') }
    set 'downloading'(val) { this.setBoolAttr('downloading', val) }    static __style = `:host{align-items:center;background-color:var(--darker);border-radius:5px;box-shadow:var(--elevation-2);display:none;height:30px;justify-content:center;padding:5px;width:30px}:host .download{display:inline-block}:host .sync{display:none}:host .rotate{animation-name:rotate;animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:linear;animation-direction:reverse}:host([visible]){display:flex !important}:host([downloading]) .download{display:none}:host([downloading]) .sync{display:inline-block}@keyframes rotate{0%{transform:rotate(0)}50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}`;
    __getStatic() {
        return PwaButton;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(PwaButton.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<mi-icon icon="download" class="download"></mi-icon><mi-icon icon="sync" class="sync rotate"></mi-icon>` }
    });
}
    getClassName() {
        return "PwaButton";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('visible')) { this.attributeChangedCallback('visible', false, false); }if(!this.hasAttribute('downloading')) { this.attributeChangedCallback('downloading', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('visible');this.__upgradeProperty('downloading'); }
    __listBoolProps() { return ["visible","downloading"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    async init() {
        Lib.PWA.addOnInit(async () => {
            this.visible = true;
            new Aventus.PressManager({
                element: this,
                onPress: () => {
                    Lib.PWA.download();
                }
            });
        });
        Lib.PWA.onDownloading.add(async () => {
            this.downloading = true;
        });
        Lib.PWA.onDownloaded.add(async () => {
            this.remove();
        });
    }
    postCreation() {
        this.classList.add("touch");
        this.init();
    }
}
System.PwaButton.Namespace=`${moduleName}.System`;
System.PwaButton.Tag=`rk-pwa-button`;
_.System.PwaButton=System.PwaButton;
if(!window.customElements.get('rk-pwa-button')){window.customElements.define('rk-pwa-button', System.PwaButton);Aventus.WebComponentInstance.registerDefinition(System.PwaButton);}

const CalendarDay = class CalendarDay extends Aventus.WebComponent {
    get 'other'() { return this.getBoolAttr('other') }
    set 'other'(val) { this.setBoolAttr('other', val) }get 'today'() { return this.getBoolAttr('today') }
    set 'today'(val) { this.setBoolAttr('today', val) }    calendar;
    date = new Date();
    static __style = `:host{align-items:center;color:var(--_calendar-text-color-case);display:flex;height:30px;justify-content:center;width:30px;border-radius:5px;cursor:pointer;transition:color .2s var(--bezier-curve),background-color .2s var(--bezier-curve)}:host([other]){color:var(--_calendar-text-color-case-others)}:host([today]){color:var(--_calendar-text-color-case-today)}@media screen and (min-width: 1225px){:host(:hover){background-color:var(--_calendar-background-color-case-hover)}}`;
    constructor() { super(); if (this.constructor == CalendarDay) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return CalendarDay;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(CalendarDay.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "CalendarDay";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('other')) { this.attributeChangedCallback('other', false, false); }if(!this.hasAttribute('today')) { this.attributeChangedCallback('today', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('other');this.__upgradeProperty('today'); }
    __listBoolProps() { return ["other","today"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    init(dateDisplayed, dateDay, calendar) {
        this.shadowRoot.innerHTML = dateDay.getDate() + '';
        this.other = dateDisplayed.getMonth() != dateDay.getMonth();
        this.calendar = calendar;
        this.date.setTime(dateDay.getTime());
        this.today = Lib.DateTools.isSameDate(new Date(), dateDay);
    }
    postCreation() {
        new Aventus.PressManager({
            element: this,
            onPress: () => {
                this.calendar.onDateClicked.trigger([this.date, this]);
            }
        });
    }
}
CalendarDay.Namespace=`${moduleName}`;
_.CalendarDay=CalendarDay;

const CalendarDayDefault = class CalendarDayDefault extends CalendarDay {
    static __style = ``;
    __getStatic() {
        return CalendarDayDefault;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(CalendarDayDefault.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "CalendarDayDefault";
    }
}
CalendarDayDefault.Namespace=`${moduleName}`;
CalendarDayDefault.Tag=`rk-calendar-day-default`;
_.CalendarDayDefault=CalendarDayDefault;
if(!window.customElements.get('rk-calendar-day-default')){window.customElements.define('rk-calendar-day-default', CalendarDayDefault);Aventus.WebComponentInstance.registerDefinition(CalendarDayDefault);}

Components.Calendar = class Calendar extends Aventus.WebComponent {
    static get observedAttributes() {return ["date", "show_selector"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'selector'() { return this.getStringAttr('selector') }
    set 'selector'(val) { this.setStringAttr('selector', val) }    get 'date'() { return this.getDateProp('date') }
    set 'date'(val) { this.setDateAttr('date', val) }get 'show_selector'() { return this.getBoolProp('show_selector') }
    set 'show_selector'(val) { this.setBoolAttr('show_selector', val) }    get 'dateTemp'() {
						return this.__watch["dateTemp"];
					}
					set 'dateTemp'(val) {
						this.__watch["dateTemp"] = val;
					}get 'yearGroupPage'() {
						return this.__watch["yearGroupPage"];
					}
					set 'yearGroupPage'(val) {
						this.__watch["yearGroupPage"] = val;
					}get 'yearGroupTxt'() {
						return this.__watch["yearGroupTxt"];
					}
					set 'yearGroupTxt'(val) {
						this.__watch["yearGroupTxt"] = val;
					}    onDateClicked = new Aventus.Callback();
    __registerWatchesActions() {
    this.__addWatchesActions("dateTemp", ((target) => {
    target.renderDatesTemp();
    target.printYearRange();
}));this.__addWatchesActions("yearGroupPage", ((target) => {
    target.printYearRange();
}));this.__addWatchesActions("yearGroupTxt");    super.__registerWatchesActions();
}
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("date", ((target) => {
    target.renderDates();
}));this.__addPropertyActions("show_selector", ((target) => {
    if (target.show_selector) {
        target.dateTemp = target.date;
    }
})); }
    static __style = `:host{--_calendar-background-color: var(--calendar-background-color, white);--_calendar-background-color-case-hover: var(--calendar-background-color-case-hover, var(--lighter));--_calendar-background-color-case-active: var(--calendar-background-color-case-active, var(--lighter));--_calendar-background-color-selector: var(--calendar-background-color-selector, white);--_calendar-text-color-case: var(--calendar-text-color-case, var(--text-color));--_calendar-text-color-case-others: var(--calendar-text-color-case-others, var(--secondary-color));--_calendar-text-color-case-header: var(--calendar-text-color-case-header, var(--text-color-light));--_calendar-text-color-case-today: var(--calendar-text-color-case-today, var(--orange))}:host{background-color:var(--_calendar-background-color);border-radius:10px;box-shadow:var(--elevation-3);display:flex;flex-direction:column;padding:15px;position:relative;width:fit-content}:host .hover{transition:background-color .2s var(--bezier-curve)}:host .header{align-items:center;display:flex;flex-direction:row;font-size:var(--font-size-md);justify-content:space-between;position:relative}:host .header .current-info{align-items:center;display:flex;flex-direction:row;flex-grow:1;justify-content:center}:host .header .current-info .month-year{align-items:center;border-radius:5px;display:flex;flex-direction:row;padding:5px 10px}:host .header .current-info .month-year .month{margin-right:5px}:host .header .chevron{align-items:center;border-radius:5px;display:flex;height:30px;justify-content:center;text-align:center;width:30px}:host .header .selectors{background-color:var(--_calendar-background-color-selector);border-radius:10px;box-shadow:var(--elevation-3);left:50%;opacity:0;padding:10px;pointer-events:none;position:absolute;top:calc(100% + 12px);transform:translateX(-50%);transition:opacity .2s var(--bezier-curve),visibility .2s var(--bezier-curve);visibility:hidden;z-index:5}:host .header .selectors::after{border-bottom:10px solid var(--_calendar-background-color-selector);border-left:10px solid rgba(0,0,0,0);border-right:10px solid rgba(0,0,0,0);content:"";left:50%;position:absolute;top:-8px;transform:translateX(-50%)}:host .header .selectors .month-select{display:none}:host .header .selectors .month-select .month-select-header{align-items:center;display:flex}:host .header .selectors .month-select .month-select-header .current-info .temp-year{border-radius:5px;display:flex;font-size:var(--font-size);padding:5px 10px}:host .header .selectors .month-select .month-select-body{display:flex;flex-wrap:wrap;font-size:calc(var(--font-size)*.9);margin-top:0px;width:200px}:host .header .selectors .month-select .month-select-body .month-el{align-items:center;border-radius:5px;display:flex;height:30px;justify-content:center;margin:3px 5px;width:calc((100% - 30px)/3)}:host .header .selectors .month-select .month-select-body .month-el.active{background-color:var(--_calendar-background-color-case-active)}:host .header .selectors .year-select{display:none}:host .header .selectors .year-select .year-select-header{align-items:center;display:flex}:host .header .selectors .year-select .year-select-header .current-info .temp-year-range{border-radius:5px;display:flex;font-size:var(--font-size);padding:5px 10px}:host .header .selectors .year-select .year-select-body{display:flex;flex-wrap:wrap;font-size:calc(var(--font-size)*.9);margin-top:0px;width:200px}:host .header .selectors .year-select .year-select-body .year-el{align-items:center;border-radius:5px;display:flex;height:30px;justify-content:center;margin:3px 5px;width:calc((100% - 30px)/3)}:host .header .selectors .year-select .year-select-body .year-el.active{background-color:var(--_calendar-background-color-case-active)}:host .body{display:flex;flex-direction:column;margin-top:10px}:host .body .days-header{color:var(--_calendar-text-color-case-header);display:flex;flex-direction:row;gap:10px}:host .body .days-header .day-header{align-items:center;display:flex;height:30px;justify-content:center;width:30px}:host .body .days-body{flex-direction:column}:host .body .days-body .days-row{display:flex;flex-direction:row;gap:10px;margin:5px 0}:host .hider{display:none;inset:0;position:absolute;z-index:1}:host([show_selector]) .hider{display:block}:host([show_selector]) .header .selectors{opacity:1;pointer-events:auto;visibility:visible}:host([selector=month]) .header .selectors .month-select{display:block}:host([selector=year]) .header .selectors .year-select{display:block}@media screen and (min-width: 1225px){:host .hover:hover{background-color:var(--_calendar-background-color-case-hover)}}`;
    __getStatic() {
        return Calendar;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Calendar.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="header">    <mi-icon icon="chevron_left" class="chevron touch hover" _id="calendar_0"></mi-icon>    <div class="current-info" _id="calendar_1">        <div class="month-year touch hover">            <div class="month" _id="calendar_2"></div>            <div class="year" _id="calendar_3"></div>        </div>    </div>    <mi-icon icon="chevron_right" class="chevron touch hover" _id="calendar_4"></mi-icon>    <div class="selectors">        <div class="month-select">            <div class="month-select-header">                <mi-icon icon="chevron_left" class="chevron touch hover" _id="calendar_5"></mi-icon>                <div class="current-info" _id="calendar_6">                    <div class="temp-year touch hover" _id="calendar_7"></div>                </div>                <mi-icon icon="chevron_right" class="chevron touch hover" _id="calendar_8"></mi-icon>            </div>            <div class="month-select-body" _id="calendar_9">                <div class="month-el touch hover" _id="calendar_10">Janv.</div>                <div class="month-el touch hover" _id="calendar_11">Févr.</div>                <div class="month-el touch hover" _id="calendar_12">Mars</div>                <div class="month-el touch hover" _id="calendar_13">Avr.</div>                <div class="month-el touch hover" _id="calendar_14">Mai</div>                <div class="month-el touch hover" _id="calendar_15">Juin</div>                <div class="month-el touch hover" _id="calendar_16">Juil.</div>                <div class="month-el touch hover" _id="calendar_17">Août</div>                <div class="month-el touch hover" _id="calendar_18">Sept.</div>                <div class="month-el touch hover" _id="calendar_19">Oct.</div>                <div class="month-el touch hover" _id="calendar_20">Nov.</div>                <div class="month-el touch hover" _id="calendar_21">Déc.</div>            </div>        </div>        <div class="year-select">            <div class="year-select-header">                <mi-icon icon="chevron_left" class="chevron touch hover" _id="calendar_22"></mi-icon>                <div class="current-info">                    <div class="temp-year-range" _id="calendar_23"></div>                </div>                <mi-icon icon="chevron_right" class="chevron touch hover" _id="calendar_24"></mi-icon>            </div>            <div class="year-select-body" _id="calendar_25">            </div>        </div>    </div></div><div class="body">    <div class="days-header">        <div class="day-header">Lu</div>        <div class="day-header">Ma</div>        <div class="day-header">Me</div>        <div class="day-header">Je</div>        <div class="day-header">Ve</div>        <div class="day-header">Sa</div>        <div class="day-header">Di</div>    </div>    <div class="days-body" _id="calendar_26">    </div></div><div class="hider" _id="calendar_27"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "monthEl",
      "ids": [
        "calendar_2"
      ]
    },
    {
      "name": "yearEl",
      "ids": [
        "calendar_3"
      ]
    },
    {
      "name": "bodyMonthEl",
      "ids": [
        "calendar_9"
      ]
    },
    {
      "name": "bodyYearEl",
      "ids": [
        "calendar_25"
      ]
    },
    {
      "name": "bodyEl",
      "ids": [
        "calendar_26"
      ]
    }
  ],
  "content": {
    "calendar_7°@HTML": {
      "fct": (c) => `\r\n                        ${c.print(c.comp.__209c968d688f11ad02afc05e2a5220a2method0())}\r\n                    `,
      "once": true
    },
    "calendar_23°@HTML": {
      "fct": (c) => `\r\n                        ${c.print(c.comp.__209c968d688f11ad02afc05e2a5220a2method1())}\r\n                    `,
      "once": true
    }
  },
  "pressEvents": [
    {
      "id": "calendar_0",
      "onPress": (e, pressInstance, c) => { c.comp.previousMonth(e, pressInstance); }
    },
    {
      "id": "calendar_1",
      "onPress": (e, pressInstance, c) => { c.comp.showMonthSelect(e, pressInstance); }
    },
    {
      "id": "calendar_4",
      "onPress": (e, pressInstance, c) => { c.comp.nextMonth(e, pressInstance); }
    },
    {
      "id": "calendar_5",
      "onPress": (e, pressInstance, c) => { c.comp.previousYearTemp(e, pressInstance); }
    },
    {
      "id": "calendar_6",
      "onPress": (e, pressInstance, c) => { c.comp.showYearSelect(e, pressInstance); }
    },
    {
      "id": "calendar_8",
      "onPress": (e, pressInstance, c) => { c.comp.nextMonthYearTemp(e, pressInstance); }
    },
    {
      "id": "calendar_10",
      "onPress": (e, pressInstance, c) => { c.comp.selectMonthTemp(e, pressInstance); }
    },
    {
      "id": "calendar_11",
      "onPress": (e, pressInstance, c) => { c.comp.selectMonthTemp(e, pressInstance); }
    },
    {
      "id": "calendar_12",
      "onPress": (e, pressInstance, c) => { c.comp.selectMonthTemp(e, pressInstance); }
    },
    {
      "id": "calendar_13",
      "onPress": (e, pressInstance, c) => { c.comp.selectMonthTemp(e, pressInstance); }
    },
    {
      "id": "calendar_14",
      "onPress": (e, pressInstance, c) => { c.comp.selectMonthTemp(e, pressInstance); }
    },
    {
      "id": "calendar_15",
      "onPress": (e, pressInstance, c) => { c.comp.selectMonthTemp(e, pressInstance); }
    },
    {
      "id": "calendar_16",
      "onPress": (e, pressInstance, c) => { c.comp.selectMonthTemp(e, pressInstance); }
    },
    {
      "id": "calendar_17",
      "onPress": (e, pressInstance, c) => { c.comp.selectMonthTemp(e, pressInstance); }
    },
    {
      "id": "calendar_18",
      "onPress": (e, pressInstance, c) => { c.comp.selectMonthTemp(e, pressInstance); }
    },
    {
      "id": "calendar_19",
      "onPress": (e, pressInstance, c) => { c.comp.selectMonthTemp(e, pressInstance); }
    },
    {
      "id": "calendar_20",
      "onPress": (e, pressInstance, c) => { c.comp.selectMonthTemp(e, pressInstance); }
    },
    {
      "id": "calendar_21",
      "onPress": (e, pressInstance, c) => { c.comp.selectMonthTemp(e, pressInstance); }
    },
    {
      "id": "calendar_22",
      "onPress": (e, pressInstance, c) => { c.comp.previousYearGroupTemp(e, pressInstance); }
    },
    {
      "id": "calendar_24",
      "onPress": (e, pressInstance, c) => { c.comp.nextYearGroupTemp(e, pressInstance); }
    },
    {
      "id": "calendar_27",
      "onPress": (e, pressInstance, c) => { c.comp.hideSelector(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "Calendar";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('selector')){ this['selector'] = 'month'; }if(!this.hasAttribute('date')){ this['date'] = new Date(); }if(!this.hasAttribute('show_selector')) { this.attributeChangedCallback('show_selector', false, false); } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["dateTemp"] = new Date();w["yearGroupPage"] = 0;w["yearGroupTxt"] = ""; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('selector');this.__upgradeProperty('date');this.__upgradeProperty('show_selector');this.__correctGetter('dateTemp');this.__correctGetter('yearGroupPage');this.__correctGetter('yearGroupTxt'); }
    __listBoolProps() { return ["show_selector"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    monthsName() {
        return [
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
    }
    nextMonth() {
        let date = this.date;
        let newDate = new Date();
        newDate.setTime(date.getTime());
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() + 1);
        this.date = newDate;
    }
    previousMonth() {
        let date = this.date;
        let newDate = new Date();
        newDate.setTime(date.getTime());
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() - 1);
        this.date = newDate;
    }
    defineCalendarDay() {
        return CalendarDayDefault;
    }
    renderDates() {
        if (!this.isConnected)
            return;
        Lib.DomTools.clearElement(this.bodyEl);
        let date = this.date;
        this.yearEl.innerHTML = date.getFullYear() + '';
        this.monthEl.innerHTML = this.monthsName()[date.getMonth()];
        let maxDate = new Date();
        maxDate.setTime(date.getTime());
        maxDate.setDate(1);
        maxDate.setMonth(maxDate.getMonth() + 1);
        maxDate.setDate(0);
        maxDate.setHours(23);
        maxDate.setMinutes(59);
        maxDate.setSeconds(59);
        maxDate.setDate(maxDate.getDate() + (7 - maxDate.getDay()));
        let startDate = new Date();
        startDate.setTime(date.getTime());
        startDate.setDate(1);
        let diff = 1 - (startDate.getDay() - 1);
        if (diff < 0) {
            startDate.setDate(diff);
        }
        let i = 0;
        let row = document.createElement("div");
        row.classList.add("days-row");
        let CaseCst = this.defineCalendarDay();
        while (startDate < maxDate) {
            let caseEl = new CaseCst();
            caseEl.init(date, startDate, this);
            row.appendChild(caseEl);
            startDate.setDate(startDate.getDate() + 1);
            i++;
            if (i == 7) {
                i = 0;
                this.bodyEl.appendChild(row);
                row = document.createElement("div");
                row.classList.add("days-row");
            }
        }
    }
    renderDatesTemp() {
        let el = this.bodyMonthEl.querySelector(".active");
        if (el) {
            el.classList.remove("active");
        }
        if (this.dateTemp.getFullYear() == this.date.getFullYear())
            this.bodyMonthEl.children[this.dateTemp.getMonth()].classList.add("active");
        let now = new Date();
        this.yearGroupPage = Math.ceil((this.dateTemp.getFullYear() - now.getFullYear() - 5) / 12);
    }
    showMonthSelect() {
        this.selector = 'month';
        this.show_selector = true;
    }
    showYearSelect() {
        this.selector = 'year';
        this.show_selector = true;
    }
    hideSelector() {
        this.show_selector = false;
    }
    selectMonthTemp(e, instance) {
        let children = Array.from(this.bodyMonthEl.children);
        let index = children.indexOf(instance.getElement());
        if (index != -1) {
            let date = this.date;
            let newDate = new Date();
            newDate.setTime(date.getTime());
            newDate.setDate(1);
            newDate.setMonth(index);
            newDate.setFullYear(this.dateTemp.getFullYear());
            this.date = newDate;
        }
        this.hideSelector();
    }
    previousYearTemp() {
        let date = this.dateTemp ?? new Date();
        let newDate = new Date();
        newDate.setTime(date.getTime());
        newDate.setDate(1);
        newDate.setFullYear(newDate.getFullYear() - 1);
        this.dateTemp = newDate;
    }
    nextMonthYearTemp() {
        let date = this.dateTemp ?? new Date();
        let newDate = new Date();
        newDate.setTime(date.getTime());
        newDate.setDate(1);
        newDate.setFullYear(newDate.getFullYear() + 1);
        this.dateTemp = newDate;
    }
    previousYearGroupTemp() {
        this.yearGroupPage--;
    }
    nextYearGroupTemp() {
        this.yearGroupPage++;
    }
    printYearRange() {
        let currentYear = new Date().getFullYear();
        let basicRangeStart = (currentYear + this.yearGroupPage * 12) - 6;
        let basicRangeEnd = (currentYear + this.yearGroupPage * 12) + 6;
        this.yearGroupTxt = `${basicRangeStart} - ${basicRangeEnd - 1}`;
        this.bodyYearEl.innerHTML = "";
        for (let i = basicRangeStart; i < basicRangeEnd; i++) {
            this.createYearCase(i);
        }
    }
    createYearCase(year) {
        let div = document.createElement("div");
        div.classList.add("year-el");
        div.classList.add("touch");
        div.classList.add("hover");
        div.innerHTML = year + '';
        if (year == this.dateTemp.getFullYear()) {
            div.classList.add("active");
        }
        div.addEventListener("click", (e) => {
            let newDate = new Date();
            newDate.setTime(this.dateTemp.getTime());
            newDate.setFullYear(year);
            this.dateTemp = newDate;
            this.showMonthSelect();
        });
        this.bodyYearEl.appendChild(div);
    }
    postDisonnect() {
        this.show_selector = false;
    }
    postCreation() {
    }
    __209c968d688f11ad02afc05e2a5220a2method0() {
        return this.dateTemp.getFullYear();
    }
    __209c968d688f11ad02afc05e2a5220a2method1() {
        return this.yearGroupTxt;
    }
}
Components.Calendar.Namespace=`${moduleName}.Components`;
Components.Calendar.Tag=`rk-calendar`;
_.Components.Calendar=Components.Calendar;
if(!window.customElements.get('rk-calendar')){window.customElements.define('rk-calendar', Components.Calendar);Aventus.WebComponentInstance.registerDefinition(Components.Calendar);}

const DatePickerCalendarDay = class DatePickerCalendarDay extends CalendarDay {
    get 'selected'() { return this.getBoolAttr('selected') }
    set 'selected'(val) { this.setBoolAttr('selected', val) }    static __style = `:host([selected]){background-color:var(--primary-color)}`;
    constructor() { super(); this.checkIfSelected=this.checkIfSelected.bind(this) }
    __getStatic() {
        return DatePickerCalendarDay;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DatePickerCalendarDay.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`` }
    });
}
    getClassName() {
        return "DatePickerCalendarDay";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('selected')) { this.attributeChangedCallback('selected', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('selected'); }
    __listBoolProps() { return ["selected"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    init(dateDisplayed, dateDay, calendar) {
        super.init(dateDisplayed, dateDay, calendar);
        if (calendar instanceof DatePickerCalendar) {
            if (Lib.DateTools.isSameDate(calendar.picker.value, dateDay)) {
                this.selected = true;
            }
            calendar.onDateClicked.add(this.checkIfSelected);
        }
    }
    checkIfSelected(date, element) {
        this.selected = element == this;
    }
    postDestruction() {
        super.postDestruction();
        this.calendar.onDateClicked.remove(this.checkIfSelected);
    }
}
DatePickerCalendarDay.Namespace=`${moduleName}`;
DatePickerCalendarDay.Tag=`rk-date-picker-calendar-day`;
_.DatePickerCalendarDay=DatePickerCalendarDay;
if(!window.customElements.get('rk-date-picker-calendar-day')){window.customElements.define('rk-date-picker-calendar-day', DatePickerCalendarDay);Aventus.WebComponentInstance.registerDefinition(DatePickerCalendarDay);}

Components.FormElement = class FormElement extends Aventus.WebComponent {
    get 'has_errors'() { return this.getBoolAttr('has_errors') }
    set 'has_errors'(val) { this.setBoolAttr('has_errors', val) }    get 'errors'() {
						return this.__watch["errors"];
					}
					set 'errors'(val) {
						this.__watch["errors"] = val;
					}get 'value'() {
						return this.__watch["value"];
					}
					set 'value'(val) {
						this.__watch["value"] = val;
					}get 'formPart'() {
						return this.__watch["formPart"];
					}
					set 'formPart'(val) {
						this.__watch["formPart"] = val;
					}    form;
    onChange = new Aventus.Callback();
    __registerWatchesActions() {
    this.__addWatchesActions("errors", ((target) => {
    target.has_errors = target.errors.length > 0;
}));this.__addWatchesActions("value");this.__addWatchesActions("formPart", ((target, action, path, value) => {
    target.onFormPartChange(action, path, value);
}));    super.__registerWatchesActions();
}
    static __style = ``;
    __getStatic() {
        return FormElement;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(FormElement.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "FormElement";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('has_errors')) { this.attributeChangedCallback('has_errors', false, false); } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["errors"] = [];w["value"] = undefined;w["formPart"] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('has_errors');this.__correctGetter('errors');this.__correctGetter('value');this.__correctGetter('formPart'); }
    __listBoolProps() { return ["has_errors"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    validate() {
        return Components.FormElement.validate(this);
    }
    onFormPartChange(action, path, value) {
        Components.FormElement.onFormPartChange(this, path, value);
    }
    static async validate(element) {
        element.errors = [];
        if (element.formPart?.validate) {
            let result = element.formPart.validate(element.value);
            if (result instanceof Promise) {
                result = await result;
            }
            if (result === undefined || result === true || result === "") {
                element.errors = [];
                return true;
            }
            if (result === false) {
                element.errors.push("Le champs n'est pas valide");
                return false;
            }
            element.errors.push(result);
            return false;
        }
        return true;
    }
    static async setValue(part, value) {
        if (part.value === undefined)
            part.value = value;
        else if (typeof part.value === "object" && part.value && Object.hasOwn(part.value, 'get') && Object.hasOwn(part.value, 'set')) {
            part.value.set(value);
        }
        else {
            part.value = value;
        }
    }
    static getValue(part) {
        const realPart = Aventus.Watcher.extract(part);
        if (typeof realPart.value === "object" && realPart.value && Object.hasOwn(realPart.value, 'get') && Object.hasOwn(realPart.value, 'set')) {
            return realPart.value.get();
        }
        return realPart.value;
    }
    static onFormPartChange(element, path, value) {
        if (path == "formPart" && value !== undefined) {
            if (!element.form && element instanceof Aventus.WebComponent) {
                const form = element.findParentByType(Components.Form);
                if (form) {
                    element.form = form;
                    form.registerFormElement(element);
                }
            }
        }
        if (path == "formPart" || path == "formPart.value") {
            element.value = element.formPart ? Components.FormElement.getValue(element.formPart) : '';
            if (element.formPart && !element.formPart.elements?.includes(element)) {
                element.formPart.elements?.push(element);
            }
        }
    }
}
Components.FormElement.Namespace=`${moduleName}.Components`;
Components.FormElement.Tag=`rk-form-element`;
_.Components.FormElement=Components.FormElement;
if(!window.customElements.get('rk-form-element')){window.customElements.define('rk-form-element', Components.FormElement);Aventus.WebComponentInstance.registerDefinition(Components.FormElement);}

Components.Switch = class Switch extends Components.FormElement {
    static get observedAttributes() {return ["label", "disabled", "checked"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'label_end'() { return this.getBoolAttr('label_end') }
    set 'label_end'(val) { this.setBoolAttr('label_end', val) }    get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }get 'disabled'() { return this.getBoolProp('disabled') }
    set 'disabled'(val) { this.setBoolAttr('disabled', val) }get 'checked'() { return this.getBoolProp('checked') }
    set 'checked'(val) { this.setBoolAttr('checked', val) }    get 'value'() {
						return this.__watch["value"];
					}
					set 'value'(val) {
						this.__watch["value"] = val;
					}    __registerWatchesActions() {
    this.__addWatchesActions("value", ((target) => {
    target.checked = target.value;
}));    super.__registerWatchesActions();
}
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("disabled", ((target) => {
    if (target.checkboxEl) {
        if (target.disabled === undefined) {
            target.checkboxEl.disabled = false;
        }
        else {
            target.checkboxEl.disabled = target.disabled;
        }
    }
}));this.__addPropertyActions("checked", ((target) => {
    target.value = target.checked;
    target.checkboxEl.checked = target.checked;
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
    __getHtml() {super.__getHtml();
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('label_end')) { this.attributeChangedCallback('label_end', false, false); }if(!this.hasAttribute('label')){ this['label'] = undefined; }if(!this.hasAttribute('disabled')) { this.attributeChangedCallback('disabled', false, false); }if(!this.hasAttribute('checked')) { this.attributeChangedCallback('checked', false, false); } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["value"] = false; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('label_end');this.__upgradeProperty('label');this.__upgradeProperty('disabled');this.__upgradeProperty('checked');this.__correctGetter('value'); }
    __listBoolProps() { return ["label_end","disabled","checked"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    toggleActive() {
        if (this.disabled)
            return;
        this.checked = !this.checked;
        this.onChange.trigger([this.checked]);
        if (this.formPart) {
            Components.FormElement.setValue(this.formPart, this.value);
            if (this.formPart.validateOnChange !== false) {
                this.validate();
            }
        }
    }
    __0c8ab707a91de23d54bc9c39ebe1aeafmethod0() {
        return this.label;
    }
}
Components.Switch.Namespace=`${moduleName}.Components`;
Components.Switch.Tag=`rk-switch`;
_.Components.Switch=Components.Switch;
if(!window.customElements.get('rk-switch')){window.customElements.define('rk-switch', Components.Switch);Aventus.WebComponentInstance.registerDefinition(Components.Switch);}

Components.Slider = class Slider extends Components.FormElement {
    static get observedAttributes() {return ["label", "min", "max", "value", "step"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'popup'() { return this.getStringAttr('popup') }
    set 'popup'(val) { this.setStringAttr('popup', val) }get 'no_transition'() { return this.getBoolAttr('no_transition') }
    set 'no_transition'(val) { this.setBoolAttr('no_transition', val) }get 'popup_visible'() { return this.getBoolAttr('popup_visible') }
    set 'popup_visible'(val) { this.setBoolAttr('popup_visible', val) }    get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }get 'min'() { return this.getNumberProp('min') }
    set 'min'(val) { this.setNumberAttr('min', val) }get 'max'() { return this.getNumberProp('max') }
    set 'max'(val) { this.setNumberAttr('max', val) }get 'value'() { return this.getNumberProp('value') }
    set 'value'(val) { this.setNumberAttr('value', val) }get 'step'() { return this.getNumberProp('step') }
    set 'step'(val) { this.setNumberAttr('step', val) }    currentPercent = 0;
    timerPopup = 0;
    onDragStart = new Aventus.Callback();
    onDragStop = new Aventus.Callback();
    onValidateValue = new Aventus.Callback();
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("min", ((target) => {
    target.calculatePercent();
}));this.__addPropertyActions("max", ((target) => {
    target.calculatePercent();
}));this.__addPropertyActions("value", ((target) => {
    target.calculatePercent();
})); }
    static __style = `:host{--_slider-background-color: var(--slider-background-color, var(--form-element-background, white));--_slider-active-background-color: var(--slider-active-background-color, var(--secondary-color-active));--_slider-dot-color: var(--slider-dot-color, var(--secondary-color));--_slider-dot-size: var(--slider-dot-size, var(--form-element-font-size, 16px));--_slider-popup-font-size: var(--slider-popup-font-size, var(--font-size-sm));--_slider-font-size-label: var(--slider-font-size-label, var(--form-element-font-size-label));--local-slider-dot-percent: 0%}:host{align-items:center;display:flex;height:var(--_slider-dot-size);min-width:100px;width:100%;flex-direction:column}:host label{display:none;font-size:var(--_slider-font-size-label);margin-bottom:5px;margin-left:3px;width:100%;flex-shrink:0}:host .bar{align-items:center;background-color:var(--_slider-background-color);border-radius:10px;cursor:pointer;display:flex;flex-direction:row;height:5px;position:relative;width:100%;flex-shrink:0}:host .bar .bar-fill{background-color:var(--_slider-active-background-color);border-radius:100px;height:100%;left:0;pointer-events:all;position:absolute;top:0;transition:width var(--bezier-curve) .3s;width:var(--local-slider-dot-percent)}:host .bar .dot{background-color:var(--_slider-dot-color);border-radius:50%;box-shadow:var(--elevation-2);cursor:pointer;height:var(--_slider-dot-size);left:var(--local-slider-dot-percent);pointer-events:all;position:absolute;transform:translateX(-50%);transition:left var(--bezier-curve) .3s,box-shadow var(--bezier-curve) .3s,background-color var(--bezier-curve) .3s;width:var(--_slider-dot-size)}:host .bar .value{background-color:var(--_slider-dot-color);border-radius:5px;box-shadow:var(--elevation-2);font-size:var(--_slider-popup-font-size);left:var(--local-slider-dot-percent);opacity:0;padding:5px 10px;padding-bottom:2px;position:absolute;top:0;transform:translateY(calc(-100% - 12px)) translateX(-50%);transform-origin:center center;transition:left var(--bezier-curve) .3s,opacity var(--bezier-curve) .3s,visibility var(--bezier-curve) .3s;visibility:hidden}:host .bar .value::after{border-left:6px solid rgba(0,0,0,0);border-right:6px solid rgba(0,0,0,0);border-top:8px solid var(--_slider-dot-color);bottom:-7px;content:"";left:50%;position:absolute;transform:translateX(-50%)}:host([no_transition]) .bar .bar-fill{transition:none}:host([no_transition]) .bar .dot{transition:none}:host([no_transition]) .bar .value{transition:opacity var(--bezier-curve) .3s,visibility var(--bezier-curve) .3s}:host([popup_visible]) .bar .value{opacity:1;visibility:visible}:host([label]:not([label=""])) label{display:flex}`;
    __getStatic() {
        return Slider;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Slider.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<label for="element" class="label" _id="slider_0"></label><div class="bar" _id="slider_1">    <div class="value" part="popup" _id="slider_2"></div>    <div class="bar-fill"></div>    <div class="dot" _id="slider_3"></div></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "barEl",
      "ids": [
        "slider_1"
      ]
    },
    {
      "name": "dotEl",
      "ids": [
        "slider_3"
      ]
    }
  ],
  "content": {
    "slider_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__2a6eb0eb8efd251816e4040a1af5645dmethod0())}`,
      "once": true
    },
    "slider_2°@HTML": {
      "fct": (c) => `${c.print(c.comp.__2a6eb0eb8efd251816e4040a1af5645dmethod1())}`,
      "once": true
    }
  }
}); }
    getClassName() {
        return "Slider";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('popup')){ this['popup'] = 'never'; }if(!this.hasAttribute('no_transition')) { this.attributeChangedCallback('no_transition', false, false); }if(!this.hasAttribute('popup_visible')) { this.attributeChangedCallback('popup_visible', false, false); }if(!this.hasAttribute('label')){ this['label'] = undefined; }if(!this.hasAttribute('min')){ this['min'] = 0; }if(!this.hasAttribute('max')){ this['max'] = 100; }if(!this.hasAttribute('value')){ this['value'] = 0; }if(!this.hasAttribute('step')){ this['step'] = 1; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('popup');this.__upgradeProperty('no_transition');this.__upgradeProperty('popup_visible');this.__upgradeProperty('label');this.__upgradeProperty('min');this.__upgradeProperty('max');this.__upgradeProperty('value');this.__upgradeProperty('step'); }
    __listBoolProps() { return ["no_transition","popup_visible"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    addMoveDot() {
        let startX = 0;
        let currentPosition = 0;
        new Aventus.DragAndDrop({
            element: this.dotEl,
            applyDrag: false,
            offsetDrag: 0,
            stopPropagation: false,
            onPointerDown: (e) => {
                Components.Scrollable.lock(this);
                this.no_transition = true;
                if (this.popup == "onMove") {
                    clearTimeout(this.timerPopup);
                    this.popup_visible = true;
                }
                this.onDragStart.trigger([]);
            },
            onStart: (e) => {
                startX = e.pageX;
                currentPosition = this.dotEl.offsetLeft;
            },
            onMove: (e) => {
                let diff = startX - e.pageX;
                let newPosition = currentPosition - diff;
                let percent = newPosition / this.offsetWidth * 100;
                this.setPercent(percent);
                this.calculateValue();
            },
            onPointerUp: () => {
                Components.Scrollable.unlock(this);
                this.no_transition = false;
                if (this.popup == "onMove") {
                    this.timerPopup = setTimeout(() => {
                        this.popup_visible = false;
                    }, 1000);
                }
                this.onDragStop.trigger([]);
            }
        });
    }
    addClickBar() {
        new Aventus.PressManager({
            element: this.barEl,
            onPress: (e) => {
                let left = this.getBoundingClientRect().left;
                let newPosition = e.pageX - left;
                let percent = newPosition / this.offsetWidth * 100;
                this.setPercent(percent);
                this.calculateValue();
                if (this.popup == "onMove") {
                    clearTimeout(this.timerPopup);
                    this.timerPopup = setTimeout(() => {
                        this.popup_visible = false;
                    }, 1000);
                    this.popup_visible = true;
                }
            }
        });
    }
    calculatePercent(value) {
        if (!this.isConnected)
            return;
        if (value === undefined) {
            value = this.value;
        }
        let range = this.max - this.min;
        let percent = (value - this.min) / range * 100;
        this.setPercent(percent);
    }
    calculateValue(emit = true) {
        let range = this.max - this.min;
        let value = (range * this.currentPercent / 100) + this.min;
        let diff = value % this.step;
        if (diff > this.step / 2) {
            value += (this.step - diff);
        }
        else {
            value -= diff;
        }
        let result = this.onValidateValue.trigger([value]);
        if (result.length > 0) {
            if (result[0] != value) {
                // we correct the value so apply percent
                this.calculatePercent(result[0]);
                value = result[0];
            }
        }
        if (value != this.value) {
            this.value = value;
            if (emit) {
                this.onChange.trigger([value]);
                if (this.formPart) {
                    Components.FormElement.setValue(this.formPart, this.value);
                    if (this.formPart.validateOnChange !== false) {
                        this.validate();
                    }
                }
            }
        }
    }
    setPercent(percent) {
        if (percent < 0) {
            percent = 0;
        }
        else if (percent > 100) {
            percent = 100;
        }
        // correct step
        let range = this.max - this.min;
        let value = (range * percent / 100) + this.min;
        let diff = value % this.step;
        if (diff > this.step / 2) {
            value += (this.step - diff);
        }
        else {
            value -= diff;
        }
        percent = (value - this.min) / range * 100;
        this.currentPercent = percent;
        this.style.setProperty("--local-slider-dot-percent", percent + "%");
    }
    removeErrors() {
        this.errors = [];
    }
    postCreation() {
        super.postCreation();
        this.addMoveDot();
        this.addClickBar();
        this.calculatePercent();
        this.calculateValue(false);
        if (this.popup == 'always') {
            this.popup_visible = true;
        }
    }
    __2a6eb0eb8efd251816e4040a1af5645dmethod0() {
        return this.label;
    }
    __2a6eb0eb8efd251816e4040a1af5645dmethod1() {
        return this.value;
    }
}
Components.Slider.Namespace=`${moduleName}.Components`;
Components.Slider.Tag=`rk-slider`;
_.Components.Slider=Components.Slider;
if(!window.customElements.get('rk-slider')){window.customElements.define('rk-slider', Components.Slider);Aventus.WebComponentInstance.registerDefinition(Components.Slider);}

Components.InputNumber = class InputNumber extends Components.FormElement {
    static get observedAttributes() {return ["label", "placeholder", "icon", "value", "min", "max"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }get 'placeholder'() { return this.getStringProp('placeholder') }
    set 'placeholder'(val) { this.setStringAttr('placeholder', val) }get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }get 'value'() { return this.getNumberProp('value') }
    set 'value'(val) { this.setNumberAttr('value', val) }get 'min'() { return this.getNumberProp('min') }
    set 'min'(val) { this.setNumberAttr('min', val) }get 'max'() { return this.getNumberProp('max') }
    set 'max'(val) { this.setNumberAttr('max', val) }    errorsTxt = {};
    defaultErrorsTxt = {
        notNumber: "Le nombre n'est pas valide",
        lowerThanMin: "Le nombre n'est pas plus grand que " + this.min,
        biggerThanMax: "Le nombre n'est pas plus petit que " + this.max,
    };
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("value", ((target) => {
    target.inputEl.value = target.value + '';
})); }
    static __style = `:host{--_input-number-height: var(--input-number-height, 30px);--_input-number-background-color: var(--input-number-background-color, var(--form-element-background, white));--_input-number-icon-height: var(--input-number-icon-height, calc(var(--_input-number-height) / 2));--_input-number-error-logo-size: var(--input-number-error-logo-size, calc(var(--_input-number-height) / 2));--_input-number-font-size: var(--input-number-font-size, var(--form-element-font-size, 16px));--_input-number-font-size-label: var(--input-number-font-size-label, var(--form-element-font-size-label, calc(var(--_input-number-font-size) * 0.95)));--_input-number-input-border: var(--input-number-input-border, var(--form-element-border, 1px solid var(--lighter-active)));--_input-number-border-radius: var(--input-number-border-radius, var(--form-element-border-radius, 0))}:host{min-width:100px;width:100%}:host label{display:none;font-size:var(--_input-number-font-size-label);margin-bottom:5px;margin-left:3px}:host .input{align-items:center;background-color:var(--_input-number-background-color);border:var(--_input-number-input-border);border-radius:var(--_input-number-border-radius);display:flex;height:var(--_input-number-height);padding:0 10px;width:100%}:host .input .icon{display:none;flex-shrink:0;height:var(--_input-number-icon-height);margin-right:10px}:host .input input{background-color:rgba(0,0,0,0);border:none;color:var(--text-color);display:block;flex-grow:1;font-size:var(--_input-number-font-size);height:100%;margin:0;min-width:0;outline:none;padding:5px 0;padding-right:10px}:host .input .error-logo{align-items:center;background-color:var(--red);border-radius:50%;color:#fff;display:none;flex-shrink:0;font-size:calc(var(--_input-number-error-logo-size) - 5px);height:var(--_input-number-error-logo-size);justify-content:center;width:var(--_input-number-error-logo-size)}:host .errors{color:var(--red);display:none;font-size:var(--font-size-sm);line-height:1.1;margin:0 10px}:host .errors *>div{margin:5px 0}:host .errors *>div:first-child{margin-top:10px}:host([has_errors]) .input{border:1px solid var(--red)}:host([has_errors]) .input .error-logo{display:flex}:host([icon]:not([icon=""])) .input .icon{display:block}:host([label]:not([label=""])) label{display:flex}`;
    __getStatic() {
        return InputNumber;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(InputNumber.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<label for="input" _id="inputnumber_0"></label><div class="input">    <rk-img class="icon" _id="inputnumber_1"></rk-img>    <input id="input" _id="inputnumber_2" />    <div class="error-logo">!</div></div><div class="errors">    <template _id="inputnumber_3"></template></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "inputEl",
      "ids": [
        "inputnumber_2"
      ]
    }
  ],
  "content": {
    "inputnumber_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__181298e531eab1a15f907371f4223808method2())}`,
      "once": true
    },
    "inputnumber_1°src": {
      "fct": (c) => `${c.print(c.comp.__181298e531eab1a15f907371f4223808method3())}`,
      "once": true
    },
    "inputnumber_2°placeholder": {
      "fct": (c) => `${c.print(c.comp.__181298e531eab1a15f907371f4223808method4())}`,
      "once": true
    }
  },
  "events": [
    {
      "eventName": "focus",
      "id": "inputnumber_2",
      "fct": (e, c) => c.comp.removeErrors(e)
    },
    {
      "eventName": "change",
      "id": "inputnumber_2",
      "fct": (e, c) => c.comp.onValueChange(e)
    },
    {
      "eventName": "blur",
      "id": "inputnumber_2",
      "fct": (e, c) => c.comp.validate(e)
    }
  ]
});const templ0 = new Aventus.Template(this);templ0.setTemplate(`        <template _id="inputnumber_4"></template>    `);this.__getStatic().__template.addLoop({
                    anchorId: 'inputnumber_3',
                    template: templ0,
                simple:{data: "this.errors",item:"error"}});const templ1 = new Aventus.Template(this);templ1.setTemplate(`            <div _id="inputnumber_5"></div>        `);templ1.setActions({
  "content": {
    "inputnumber_5°@HTML": {
      "fct": (c) => `${c.print(c.comp.__181298e531eab1a15f907371f4223808method5(c.data.error))}`,
      "once": true
    }
  }
});templ0.addIf({
                    anchorId: 'inputnumber_4',
                    parts: [{once: true,
                    condition: (c) => c.comp.__181298e531eab1a15f907371f4223808method1(c.data.error),
                    template: templ1
                }]
            }); }
    getClassName() {
        return "InputNumber";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('label')){ this['label'] = undefined; }if(!this.hasAttribute('placeholder')){ this['placeholder'] = undefined; }if(!this.hasAttribute('icon')){ this['icon'] = undefined; }if(!this.hasAttribute('value')){ this['value'] = 0; }if(!this.hasAttribute('min')){ this['min'] = undefined; }if(!this.hasAttribute('max')){ this['max'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('label');this.__upgradeProperty('placeholder');this.__upgradeProperty('icon');this.__upgradeProperty('value');this.__upgradeProperty('min');this.__upgradeProperty('max'); }
    removeErrors() {
        this.errors = [];
    }
    isNumber(apply) {
        let valueTemp = Number(this.inputEl.value);
        if (!this.inputEl.value || isNaN(valueTemp)) {
            return false;
        }
        if (apply)
            this.value = valueTemp;
        return true;
    }
    isBiggerThanMin() {
        if (this.min != 0 || this.hasAttribute("min")) {
            return this.value >= this.min;
        }
        return true;
    }
    isLowerThanMax() {
        if (this.max != 0 || this.hasAttribute("max")) {
            return this.value <= this.max;
        }
        return true;
    }
    localValidation(apply = false) {
        this.errors = [];
        if (!this.isNumber(apply)) {
            const txt = this.errorsTxt.notNumber ?? this.defaultErrorsTxt.notNumber;
            this.errors.push(txt);
            return false;
        }
        if (!this.isBiggerThanMin()) {
            const txt = this.errorsTxt.lowerThanMin ?? this.defaultErrorsTxt.lowerThanMin;
            this.errors.push(txt);
            return false;
        }
        if (!this.isLowerThanMax()) {
            const txt = this.errorsTxt.biggerThanMax ?? this.defaultErrorsTxt.biggerThanMax;
            this.errors.push(txt);
            return false;
        }
        return true;
    }
    async validate() {
        if (!this.localValidation())
            return false;
        return super.validate();
    }
    onValueChange() {
        if (!this.localValidation(true))
            return;
        this.onChange.trigger([this.value]);
        if (this.formPart) {
            Components.FormElement.setValue(this.formPart, this.value);
            if (this.formPart.validateOnChange !== false) {
                this.validate();
            }
        }
    }
    __181298e531eab1a15f907371f4223808method2() {
        return this.label;
    }
    __181298e531eab1a15f907371f4223808method3() {
        return this.icon;
    }
    __181298e531eab1a15f907371f4223808method4() {
        return this.placeholder;
    }
    __181298e531eab1a15f907371f4223808method5(error) {
        return error;
    }
    __181298e531eab1a15f907371f4223808method1(error) {
        return error != "";
    }
}
Components.InputNumber.Namespace=`${moduleName}.Components`;
Components.InputNumber.Tag=`rk-input-number`;
_.Components.InputNumber=Components.InputNumber;
if(!window.customElements.get('rk-input-number')){window.customElements.define('rk-input-number', Components.InputNumber);Aventus.WebComponentInstance.registerDefinition(Components.InputNumber);}

Components.Input = class Input extends Components.FormElement {
    static get observedAttributes() {return ["label", "placeholder", "icon", "value"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }get 'placeholder'() { return this.getStringProp('placeholder') }
    set 'placeholder'(val) { this.setStringAttr('placeholder', val) }get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }get 'value'() { return this.getStringProp('value') }
    set 'value'(val) { this.setStringAttr('value', val) }    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("value", ((target) => {
    target.inputEl.value = target.value;
})); }
    static __style = `:host{--_input-height: var(--input-height, 30px);--_input-background-color: var(--input-background-color, var(--form-element-background, white));--_input-icon-height: var(--input-icon-height, calc(var(--_input-height) / 2));--_input-error-logo-size: var(--input-error-logo-size, calc(var(--_input-height) / 2));--_input-font-size: var(--input-font-size, var(--form-element-font-size, 16px));--_input-font-size-label: var(--input-font-size-label, var(--form-element-font-size-label, calc(var(--_input-font-size) * 0.95)));--_input-input-border: var(--input-input-border, var(--form-element-border, 1px solid var(--lighter-active)));--_input-border-radius: var(--input-border-radius, var(--form-element-border-radius, 0))}:host{min-width:100px;width:100%}:host label{display:none;font-size:var(--_input-font-size-label);margin-bottom:5px;margin-left:3px}:host .input{align-items:center;background-color:var(--_input-background-color);border:var(--_input-input-border);border-radius:var(--_input-border-radius);display:flex;height:var(--_input-height);padding:0 10px;width:100%}:host .input .icon{display:none;flex-shrink:0;height:var(--_input-icon-height);margin-right:10px}:host .input input{background-color:rgba(0,0,0,0);border:none;color:var(--text-color);display:block;flex-grow:1;font-size:var(--_input-font-size);height:100%;margin:0;min-width:0;outline:none;padding:5px 0;padding-right:10px}:host .input .error-logo{align-items:center;background-color:var(--red);border-radius:50%;color:#fff;display:none;flex-shrink:0;font-size:calc(var(--_input-error-logo-size) - 5px);height:var(--_input-error-logo-size);justify-content:center;width:var(--_input-error-logo-size)}:host .errors{color:var(--red);display:none;font-size:var(--font-size-sm);line-height:1.1;margin:10px;margin-bottom:0px}:host .errors div{margin:5px 0}:host([has_errors]) .input{border:1px solid var(--red)}:host([has_errors]) .input .error-logo{display:flex}:host([has_errors]) .errors{display:block}:host([icon]:not([icon=""])) .input .icon{display:block}:host([label]:not([label=""])) label{display:flex}`;
    __getStatic() {
        return Input;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Input.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
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
});const templ0 = new Aventus.Template(this);templ0.setTemplate(`        <template _id="input_4"></template>    `);this.__getStatic().__template.addLoop({
                    anchorId: 'input_3',
                    template: templ0,
                simple:{data: "this.errors",item:"error"}});const templ1 = new Aventus.Template(this);templ1.setTemplate(`            <div _id="input_5"></div>        `);templ1.setActions({
  "content": {
    "input_5°@HTML": {
      "fct": (c) => `${c.print(c.comp.__7b4688f1d13a935f88db2286094e0088method4(c.data.error))}`,
      "once": true
    }
  }
});templ0.addIf({
                    anchorId: 'input_4',
                    parts: [{once: true,
                    condition: (c) => true,
                    template: templ1
                }]
            }); }
    getClassName() {
        return "Input";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('label')){ this['label'] = undefined; }if(!this.hasAttribute('placeholder')){ this['placeholder'] = undefined; }if(!this.hasAttribute('icon')){ this['icon'] = undefined; }if(!this.hasAttribute('value')){ this['value'] = ""; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('label');this.__upgradeProperty('placeholder');this.__upgradeProperty('icon');this.__upgradeProperty('value'); }
    removeErrors() {
        this.errors = [];
    }
    onValueChange() {
        this.value = this.inputEl.value;
        this.onChange.trigger([this.value]);
        if (this.formPart) {
            Components.FormElement.setValue(this.formPart, this.value);
            if (this.formPart.validateOnChange !== false) {
                this.validate();
            }
        }
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

Components.Checkbox = class Checkbox extends Components.FormElement {
    static get observedAttributes() {return ["label", "placeholder", "icon", "checked"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'left_label'() { return this.getBoolAttr('left_label') }
    set 'left_label'(val) { this.setBoolAttr('left_label', val) }    get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }get 'placeholder'() { return this.getStringProp('placeholder') }
    set 'placeholder'(val) { this.setStringAttr('placeholder', val) }get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }get 'checked'() { return this.getBoolProp('checked') }
    set 'checked'(val) { this.setBoolAttr('checked', val) }    get 'value'() {
						return this.__watch["value"];
					}
					set 'value'(val) {
						this.__watch["value"] = val;
					}    __registerWatchesActions() {
    this.__addWatchesActions("value", ((target) => {
    target.checked = target.value;
}));    super.__registerWatchesActions();
}
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("checked", ((target) => {
    target.value = target.checked;
})); }
    static __style = `:host{--_checkbox-size: var(--checkbox-size, 18px);--_checkbox-height: var(--checkbox-height, var(--_checkbox-size));--_checkbox-width: var(--checkbox-width, var(--_checkbox-size));--_checkbox-size: 20px;--_checkbox-border-radius: var(--checkbox-border-radius, 2px);--_checkbox-border: var(--checkbox-border, var(--form-element-border));--_checkbox-border-active: var(--checkbox-border-active, var(--form-element-border-active, var(--_checkbox-border)));--_checkbox-background: var(--checkbox-background, var(--form-element-background, white));--_checkbox-background-active: var(--checkbox-background-active, var(--form-element-background-active, white));--_checkbox-tick-color: var(--checkbox-tick-color, var(--_checkbox-background));--_checkbox-tick-size: var(--checkbox-tick-size, 2px);--_checkbox-tick-padding: var(--checkbox-tick-padding, 10%);--_checkbox-font-size-label: var(--checkbox-font-size-label, var(--form-element-font-size-label, calc(var(--_input-font-size) * 0.95)));--_checkbox-margin-label: var(--checkbox-margin-label, 5px)}:host{align-items:center;display:flex;width:min-content}:host .label:not(:empty){cursor:pointer;font-size:var(--_checkbox-font-size-label);margin-left:var(--_checkbox-margin-label)}:host .square{background-color:var(--_checkbox-background);border:var(--_checkbox-border);border-radius:var(--_checkbox-border-radius);cursor:pointer;flex-shrink:0;height:var(--_checkbox-height);position:relative;transition:border .4s var(--bezier-curve),background-color .4s var(--bezier-curve);width:var(--_checkbox-width);display:flex;align-items:center;justify-content:center}:host .square rk-img{--img-stroke-color: var(--_checkbox-tick-color);--img-stroke-width: var(--_checkbox-tick-size);height:calc(100% - var(--_checkbox-tick-padding));opacity:0;visibility:hidden;width:calc(100% - var(--_checkbox-tick-padding))}:host([checked]) .square{background-color:var(--_checkbox-background-active);border:var(--_checkbox-border-active)}:host([checked]) .square rk-img{opacity:1;visibility:visible}:host([checked]) .square rk-img::part(tick){animation:dash .3s linear forwards;animation-delay:.2s;stroke-dasharray:100;stroke-dashoffset:100}:host([left_label]) .label:not(:empty){margin-left:0;margin-right:var(--_checkbox-margin-label);order:1}:host([left_label]) .square{order:2}@keyframes dash{to{stroke-dashoffset:70}}`;
    __getStatic() {
        return Checkbox;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Checkbox.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="square">    <rk-img src="/img/icons/tick.svg"></rk-img></div><div class="label" _id="checkbox_0"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "checkbox_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__ab411575f51bcaf15868d94c774ac9c3method0())}`,
      "once": true
    }
  }
}); }
    getClassName() {
        return "Checkbox";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('left_label')) { this.attributeChangedCallback('left_label', false, false); }if(!this.hasAttribute('label')){ this['label'] = undefined; }if(!this.hasAttribute('placeholder')){ this['placeholder'] = undefined; }if(!this.hasAttribute('icon')){ this['icon'] = undefined; }if(!this.hasAttribute('checked')) { this.attributeChangedCallback('checked', false, false); } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["value"] = false; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('left_label');this.__upgradeProperty('label');this.__upgradeProperty('placeholder');this.__upgradeProperty('icon');this.__upgradeProperty('checked');this.__correctGetter('value'); }
    __listBoolProps() { return ["left_label","checked"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    removeErrors() {
        this.errors = [];
    }
    postCreation() {
        super.postCreation();
        new Aventus.PressManager({
            element: this,
            onPress: () => {
                this.removeErrors();
                this.checked = !this.checked;
                this.onChange.trigger([this.checked]);
                if (this.formPart) {
                    Components.FormElement.setValue(this.formPart, this.value);
                    if (this.formPart.validateOnChange !== false) {
                        this.validate();
                    }
                }
            }
        });
    }
    __ab411575f51bcaf15868d94c774ac9c3method0() {
        return this.label;
    }
}
Components.Checkbox.Namespace=`${moduleName}.Components`;
Components.Checkbox.Tag=`rk-checkbox`;
_.Components.Checkbox=Components.Checkbox;
if(!window.customElements.get('rk-checkbox')){window.customElements.define('rk-checkbox', Components.Checkbox);Aventus.WebComponentInstance.registerDefinition(Components.Checkbox);}

Components.InternalVirtualForm=class InternalVirtualForm {
    __config;
    constructor(config) {
        for (let name in config) {
            if (!config[name].elements) {
                config[name].elements = [];
            }
            if (!config[name].validate) {
                config[name].validate = () => true;
            }
        }
        this.__config = config;
        for (let key in config) {
            this.registerKey(key);
        }
    }
    async validateAndExecute(result, application) {
        const validationResult = await this.validate(application);
        if (validationResult) {
            return await this.execute(result, application);
        }
        return undefined;
    }
    async validate(from) {
        let proms = [];
        let promsCustom = [];
        const namesCustom = [];
        const resultErrors = [];
        for (let name in this.__config) {
            const elements = this.__config[name].elements;
            if (!elements || elements.length == 0) {
                const result = this.__config[name].validate(Components.FormElement.getValue(this.__config[name]));
                if (result instanceof Promise) {
                    promsCustom.push(result);
                    namesCustom.push(name);
                }
                else if (result !== undefined && result !== true && result !== "") {
                    if (result === false) {
                        resultErrors.push("Le champs " + name + " n'est pas valide");
                    }
                    resultErrors.push(result + "");
                }
            }
            else {
                for (let element of this.__config[name].elements) {
                    proms.push(element.validate());
                }
            }
        }
        const result2 = await Promise.all(promsCustom);
        for (let i = 0; i < result2.length; i++) {
            const resultTemp = result2[i];
            if (resultTemp !== undefined && resultTemp !== true && resultTemp !== "") {
                if (resultTemp === false) {
                    resultErrors.push("Le champs " + namesCustom[i] + " n'est pas valide");
                }
                resultErrors.push(resultTemp + "");
            }
        }
        if (resultErrors.length > 0) {
            if (from) {
                let application = from instanceof System.Application ? from : from.findParentByType(System.Application);
                await application?.alert({
                    title: "Erreur de validation",
                    description: resultErrors.join("<br>")
                });
                return false;
            }
            return resultErrors;
        }
        const result = await Promise.all(proms);
        for (let resultTemp of result) {
            if (!resultTemp)
                return false;
        }
        return true;
    }
    async execute(query, from) {
        let queryResult = await Aventus.Async(query);
        if (queryResult.errors.length > 0) {
            let noPrintErrors = [];
            for (let error of queryResult.errors) {
                if (error instanceof AventusSharp.Data.DataError &&
                    error.code == AventusSharp.Data.DataErrorCode.ValidationError &&
                    error.details.length > 0 &&
                    error.details[0] instanceof AventusSharp.Data.FieldErrorInfo) {
                    let fieldInfo = error.details[0];
                    if (this.addFieldError(fieldInfo.Name, error.message)) {
                        continue;
                    }
                }
                noPrintErrors.push(error);
            }
            queryResult.errors = noPrintErrors;
        }
        if (from) {
            let application = from instanceof System.Application ? from : from.findParentByType(System.Application);
            if (application) {
                return await application.parseErrors(queryResult);
            }
        }
        return queryResult;
    }
    registerKey(key) {
        Object.defineProperty(this, key, {
            get: () => this.__config[key],
            set: (value) => this.__config[key] = value,
            enumerable: true
        });
    }
    getData() {
        let result = {};
        for (let name in this.__config) {
            result[name] = Components.FormElement.getValue(this.__config[name]);
        }
        return result;
    }
    // public async validate(from?: Aventus.WebComponent): Promise<boolean | string[]> {
    //     for(let name in this.__config) {
    //         if(!elements || elements.length == 0) {
    //             const result = this.__config[name].validate(FormElement.getValue(this.__config[name]));
    //             if(result instanceof Promise) {
    //                 promsCustom.push(result);
    //                 namesCustom.push(name);
    //             else if(result !== undefined && result !== true && result !== "") {
    //                 if(result === false) {
    //                     resultErrors.push("Le champs " + name + " n'est pas valide");
    //                 resultErrors.push(result + "");
    //             for(let element of this.__config[name].elements) {
    //                 proms.push(element.validate());
    //     const result2 = await Promise.all(promsCustom);
    //     for(let i = 0; i < result2.length; i++) {
    //         if(resultTemp !== undefined && resultTemp !== true && resultTemp !== "") {
    //             if(resultTemp === false) {
    //                 resultErrors.push("Le champs " + namesCustom[i] + " n'est pas valide");
    //             resultErrors.push(resultTemp + "");
    //     if(resultErrors.length > 0) {
    //         if(from) {
    //             let application = from instanceof Application ? from : from.findParentByType(Application);
    //             await application?.alert({
    //                 description: resultErrors.join("<br>")
    //             });
    //     const result = await Promise.all(proms);
    //     for(let resultTemp of result) {
    //         if(!resultTemp) return false;
    addFieldError(name, error) {
        if (this.__config[name]?.elements.length > 0) {
            for (let el of this.__config[name].elements) {
                el.errors.push(error);
            }
            return true;
        }
        return false;
    }
}
Components.InternalVirtualForm.Namespace=`${moduleName}.Components`;

Components.Form = class Form extends Aventus.WebComponent {
    elements = [];
    onSubmit = new Aventus.Callback();
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
    registerFormElement(element) {
        if (!this.elements.includes(element)) {
            this.elements.push(element);
        }
    }
    registerSubmit(element) {
        new Aventus.PressManager({
            element,
            onPress: () => {
                this.submit();
            }
        });
    }
    async submit() {
        if (await this.validate()) {
            this.onSubmit.trigger([]);
        }
    }
    async validate() {
        let proms = [];
        for (let element of this.elements) {
            proms.push(element.validate());
        }
        const result = await Promise.all(proms);
        for (let resultTemp of result) {
            if (!resultTemp)
                return false;
        }
        return true;
    }
    static create(config) {
        return new Components.InternalVirtualForm(config);
    }
}
Components.Form.Namespace=`${moduleName}.Components`;
Components.Form.Tag=`rk-form`;
_.Components.Form=Components.Form;
if(!window.customElements.get('rk-form')){window.customElements.define('rk-form', Components.Form);Aventus.WebComponentInstance.registerDefinition(Components.Form);}

State.CreateOrUpdate=class CreateOrUpdate extends State.ApplicationStorableState {
    static _state = "";
    static get state() {
        if (this._state == "") {
            let cst = this;
            new cst();
        }
        return this._state;
    }
    __form;
    get form() {
        return this.__form;
    }
    constructor(item) {
        super(item);
        this.constructor['_state'] = this.genericState();
        this.__form = Aventus.Watcher.get(Components.Form.create(this.defineFormSchema()));
    }
    /**
     * @inheritdoc
     */
    get name() {
        return this.genericState().replace("{id:number}", this.item.Id + "");
    }
    genericState() {
        return `/${this.defineObjectName().toLowerCase()}/{id:number}`;
    }
    async save() {
        let result;
        const validationResult = await this.form.validate(this.application);
        if (validationResult === true) {
            let ramResult;
            if (this.item.Id == 0) {
                ramResult = await this.application.showLoading(this.defineRAM().createWithError(this.item));
            }
            else {
                ramResult = await this.application.showLoading(this.defineRAM().updateWithError(this.item));
            }
            if (ramResult.errors.length > 0) {
                let noPrintErrors = [];
                for (let error of ramResult.errors) {
                    if (error instanceof AventusSharp.Data.DataError &&
                        error.code == AventusSharp.Data.DataErrorCode.ValidationError &&
                        error.details.length > 0 &&
                        error.details[0] instanceof AventusSharp.Data.FieldErrorInfo) {
                        let fieldInfo = error.details[0];
                        if (this.form.addFieldError(fieldInfo.Name, error.message)) {
                            continue;
                        }
                    }
                    noPrintErrors.push(error);
                }
                ramResult.errors = noPrintErrors;
            }
            return await this.application.parseErrors(ramResult);
        }
        return result;
    }
    back() {
        const splitted = this.name.split("/");
        splitted.pop();
        this.application.navigate(splitted.join("/"));
    }
    cancel() {
        this.back();
    }
}
State.CreateOrUpdate.Namespace=`${moduleName}.State`;
State.CreateOrUpdate.$schema={...(State.ApplicationStorableState?.$schema ?? {}), "__form":""+moduleName+".Components.VirtualForm","form":""+moduleName+".Components.VirtualForm","name":"string"};
Aventus.Converter.register(State.CreateOrUpdate.Fullname, State.CreateOrUpdate);

_.State.CreateOrUpdate=State.CreateOrUpdate;
Components.Button = class Button extends Aventus.WebComponent {
    static get observedAttributes() {return ["icon_before", "icon_after", "icon"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'color'() { return this.getStringAttr('color') }
    set 'color'(val) { this.setStringAttr('color', val) }get 'outline'() { return this.getBoolAttr('outline') }
    set 'outline'(val) { this.setBoolAttr('outline', val) }get 'submit'() { return this.getBoolAttr('submit') }
    set 'submit'(val) { this.setBoolAttr('submit', val) }get 'disabled'() { return this.getBoolAttr('disabled') }
    set 'disabled'(val) { this.setBoolAttr('disabled', val) }    get 'icon_before'() { return this.getStringProp('icon_before') }
    set 'icon_before'(val) { this.setStringAttr('icon_before', val) }get 'icon_after'() { return this.getStringProp('icon_after') }
    set 'icon_after'(val) { this.setStringAttr('icon_after', val) }get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("icon", ((target) => {
    target.icon_before = target.icon;
})); }
    static __style = `:host{--internal-button-background-color: var(--button-background-color);--_button-background-color-hover: var(--button-background-color-hover, var(--darker));--internal-button-color: var(--button-color);--internal-button-box-shadow: var(--button-box-shadow);--internal-button-box-shadow-hover: var(--button-box-shadow-hover);--_button-padding: var(--button-padding, 0 16px);--_button-icon-fill-color: var(--button-icon-fill-color, --internal-button-color);--_button-icon-stroke-color: var(--button-icon-stroke-color, transparent);--_button-background-color-disable: var(--button-background-color-disable, var(--disable-color));--_button-color-disable: var(--button-color-disable, var(--text-disable))}:host{background-color:var(--internal-button-background-color);border-radius:5px;box-shadow:var(--internal-button-box-shadow);color:var(--internal-button-color);cursor:pointer;height:36px;min-width:64px;position:relative}:host .hider{background-color:var(--_button-background-color-hover);inset:0;opacity:0;position:absolute;transition:opacity .3s var(--bezier-curve),visibility .3s var(--bezier-curve);visibility:hidden;z-index:1}:host .content{align-items:center;display:flex;height:100%;justify-content:center;padding:var(--_button-padding);position:relative;z-index:2}:host .content .icon-before,:host .content .icon-after{--img-stroke-color: var(--_button-icon-stroke-color);--img-fill-color: var(--_button-icon-fill-color);display:none;height:100%;padding:10px 0}:host([disabled]){background-color:var(--_button-background-color-disable) !important;cursor:not-allowed;color:var(--_button-color-disable);box-shadow:none}:host([disabled]) .hider{opacity:1;pointer-events:none;visibility:visible}:host([icon_before]) .icon-before{display:block;margin-right:10px}:host([icon_after]) .icon-after{display:block;margin-left:10px}:host([icon]) .icon-before{margin-right:0px}:host([outline]){background-color:rgba(0,0,0,0);border:1px solid var(--button-background-color);color:var(--text-color)}:host([color=green]){background-color:var(--green);color:var(--text-color-green)}:host([outline][color=green]){background-color:rgba(0,0,0,0);border:1px solid var(--green);color:var(--text-color)}:host([color=red]){background-color:var(--red);color:var(--text-color-red)}:host([outline][color=red]){background-color:rgba(0,0,0,0);border:1px solid var(--red);color:var(--text-color)}:host([color=orange]){background-color:var(--orange);color:var(--text-color-orange)}:host([outline][color=orange]){background-color:rgba(0,0,0,0);border:1px solid var(--orange);color:var(--text-color)}:host([color=blue]){background-color:var(--blue);color:var(--text-color-blue)}:host([outline][color=blue]){background-color:rgba(0,0,0,0);border:1px solid var(--blue);color:var(--text-color)}@media screen and (min-width: 1225px){:host(:not([disabled]):hover){box-shadow:var(--internal-button-box-shadow-hover)}:host(:not([disabled]):hover) .hider{opacity:1;visibility:visible}}`;
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('color')){ this['color'] = undefined; }if(!this.hasAttribute('outline')) { this.attributeChangedCallback('outline', false, false); }if(!this.hasAttribute('submit')) { this.attributeChangedCallback('submit', false, false); }if(!this.hasAttribute('disabled')) { this.attributeChangedCallback('disabled', false, false); }if(!this.hasAttribute('icon_before')){ this['icon_before'] = undefined; }if(!this.hasAttribute('icon_after')){ this['icon_after'] = undefined; }if(!this.hasAttribute('icon')){ this['icon'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('color');this.__upgradeProperty('outline');this.__upgradeProperty('submit');this.__upgradeProperty('disabled');this.__upgradeProperty('icon_before');this.__upgradeProperty('icon_after');this.__upgradeProperty('icon'); }
    __listBoolProps() { return ["outline","submit","disabled"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    registerToForm() {
        if (!this.submit)
            return;
        const parent = this.findParentByType(Components.Form);
        if (parent) {
            parent.registerSubmit(this);
        }
    }
    postCreation() {
        this.registerToForm();
    }
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

const DatePickerCalendar = class DatePickerCalendar extends Components.Calendar {
    picker;
    static __style = ``;
    __getStatic() {
        return DatePickerCalendar;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DatePickerCalendar.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`` }
    });
}
    getClassName() {
        return "DatePickerCalendar";
    }
    defineCalendarDay() {
        return DatePickerCalendarDay;
    }
}
DatePickerCalendar.Namespace=`${moduleName}`;
DatePickerCalendar.Tag=`rk-date-picker-calendar`;
_.DatePickerCalendar=DatePickerCalendar;
if(!window.customElements.get('rk-date-picker-calendar')){window.customElements.define('rk-date-picker-calendar', DatePickerCalendar);Aventus.WebComponentInstance.registerDefinition(DatePickerCalendar);}

Components.DatePicker = class DatePicker extends Components.FormElement {
    static get observedAttributes() {return ["label", "icon"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'year_format'() { return this.getStringAttr('year_format') }
    set 'year_format'(val) { this.setStringAttr('year_format', val) }get 'month_format'() { return this.getStringAttr('month_format') }
    set 'month_format'(val) { this.setStringAttr('month_format', val) }get 'day_format'() { return this.getStringAttr('day_format') }
    set 'day_format'(val) { this.setStringAttr('day_format', val) }get 'locale'() { return this.getStringAttr('locale') }
    set 'locale'(val) { this.setStringAttr('locale', val) }get 'time_zone'() { return this.getStringAttr('time_zone') }
    set 'time_zone'(val) { this.setStringAttr('time_zone', val) }get 'hide_on_select'() { return this.getBoolAttr('hide_on_select') }
    set 'hide_on_select'(val) { this.setBoolAttr('hide_on_select', val) }    get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }    get 'value'() {
						return this.__watch["value"];
					}
					set 'value'(val) {
						this.__watch["value"] = val;
					}    calendar;
    __registerWatchesActions() {
    this.__addWatchesActions("value", ((target) => {
    target.renderDate();
}));    super.__registerWatchesActions();
}
    static __style = `:host{--_datepicker-height: var(--input-height, 30px);--_datepicker-background-color: var(--input-background-color, var(--form-element-background, white));--_datepicker-icon-height: var(--input-icon-height, calc(var(--_datepicker-height) / 2));--_datepicker-error-logo-size: var(--input-error-logo-size, calc(var(--_datepicker-height) / 2));--_datepicker-font-size: var(--input-font-size, var(--form-element-font-size, 16px));--_datepicker-font-size-label: var(--input-font-size-label, var(--form-element-font-size-label, calc(var(--_datepicker-font-size) * 0.95)));--_datepicker-input-border: var(--input-input-border, var(--form-element-border, 1px solid var(--lighter-active)));--_datepicker-border-radius: var(--input-border-radius, var(--form-element-border-radius, 0))}:host{min-width:100px;width:100%}:host label{display:none;font-size:var(--_datepicker-font-size-label);margin-bottom:5px;margin-left:3px}:host .input{align-items:center;background-color:var(--_datepicker-background-color);border:var(--_datepicker-input-border);border-radius:var(--_datepicker-border-radius);display:flex;height:var(--_datepicker-height);padding:0 10px;width:100%}:host .input .icon{display:none;flex-shrink:0;height:var(--_datepicker-icon-height);margin-right:10px}:host .input input{background-color:rgba(0,0,0,0);border:none;color:var(--text-color);display:block;flex-grow:1;font-size:var(--_datepicker-font-size);height:100%;margin:0;min-width:0;outline:none;padding:5px 0;padding-right:10px}:host .input .error-logo{align-items:center;background-color:var(--red);border-radius:50%;color:#fff;display:none;flex-shrink:0;font-size:calc(var(--_datepicker-error-logo-size) - 5px);height:var(--_datepicker-error-logo-size);justify-content:center;width:var(--_datepicker-error-logo-size)}:host .errors{color:var(--red);display:none;font-size:var(--font-size-sm);line-height:1.1;margin:10px;margin-bottom:0px}:host .errors div{margin:5px 0}:host([has_errors]) .input{border:1px solid var(--red)}:host([has_errors]) .input .error-logo{display:flex}:host([has_errors]) .errors{display:block}:host([icon]:not([icon=""])) .input .icon{display:block}:host([label]:not([label=""])) label{display:flex}`;
    constructor() {
            super();
            this.bindCalendar();
        }
    __getStatic() {
        return DatePicker;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DatePicker.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<label for="input" _id="datepicker_0"></label><div class="input" _id="datepicker_1">    <rk-img class="icon" _id="datepicker_2"></rk-img>    <input id="input" readonly _id="datepicker_3" />    <div class="error-logo">!</div></div><div class="errors">    <template _id="datepicker_4"></template></div><rk-calendar-container _id="datepicker_6"></rk-calendar-container>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "inputEl",
      "ids": [
        "datepicker_3"
      ]
    },
    {
      "name": "calendarContainer",
      "ids": [
        "datepicker_6"
      ]
    }
  ],
  "content": {
    "datepicker_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__e3c5860a3719823edab2c4b36e42865dmethod1())}`,
      "once": true
    },
    "datepicker_2°src": {
      "fct": (c) => `${c.print(c.comp.__e3c5860a3719823edab2c4b36e42865dmethod2())}`,
      "once": true
    }
  },
  "events": [
    {
      "eventName": "focus",
      "id": "datepicker_3",
      "fct": (e, c) => c.comp.removeErrors(e)
    },
    {
      "eventName": "input",
      "id": "datepicker_3",
      "fct": (e, c) => c.comp.onValueChange(e)
    }
  ],
  "pressEvents": [
    {
      "id": "datepicker_1",
      "onPress": (e, pressInstance, c) => { c.comp.showCalendar(e, pressInstance); }
    }
  ]
});const templ0 = new Aventus.Template(this);templ0.setTemplate(`         <div _id="datepicker_5"></div>    `);templ0.setActions({
  "content": {
    "datepicker_5°@HTML": {
      "fct": (c) => `${c.print(c.comp.__e3c5860a3719823edab2c4b36e42865dmethod3(c.data.error))}`,
      "once": true
    }
  }
});this.__getStatic().__template.addLoop({
                    anchorId: 'datepicker_4',
                    template: templ0,
                simple:{data: "this.errors",item:"error"}}); }
    getClassName() {
        return "DatePicker";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('year_format')){ this['year_format'] = "numeric"; }if(!this.hasAttribute('month_format')){ this['month_format'] = "2-digit"; }if(!this.hasAttribute('day_format')){ this['day_format'] = "2-digit"; }if(!this.hasAttribute('locale')){ this['locale'] = undefined; }if(!this.hasAttribute('time_zone')){ this['time_zone'] = undefined; }if(!this.hasAttribute('hide_on_select')) { this.attributeChangedCallback('hide_on_select', false, false); }if(!this.hasAttribute('label')){ this['label'] = undefined; }if(!this.hasAttribute('icon')){ this['icon'] = undefined; } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["value"] = new Date(); }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('year_format');this.__upgradeProperty('month_format');this.__upgradeProperty('day_format');this.__upgradeProperty('locale');this.__upgradeProperty('time_zone');this.__upgradeProperty('hide_on_select');this.__upgradeProperty('label');this.__upgradeProperty('icon');this.__correctGetter('value'); }
    __listBoolProps() { return ["hide_on_select"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    defineCalendar() {
        return DatePickerCalendar;
    }
    renderDate() {
        if (!this.value) {
            this.inputEl.value = '';
        }
        else {
            this.inputEl.value = this.value.toLocaleDateString(this.locale, {
                year: this.year_format,
                month: this.month_format,
                day: this.day_format,
                timeZone: this.time_zone,
            });
        }
        this.calendar.date = this.value ?? new Date();
    }
    removeErrors() {
        this.errors = [];
    }
    onValueChange() {
        this.onChange.trigger([this.value]);
        if (this.formPart) {
            Components.FormElement.setValue(this.formPart, this.value);
            if (this.formPart.validateOnChange !== false) {
                this.validate();
            }
        }
    }
    showCalendar() {
        this.calendarContainer.show();
        setTimeout(() => {
            this.calendarContainer.focus({ preventScroll: true });
        }, 100);
    }
    bindCalendar() {
        this.calendar = new (this.defineCalendar())();
        this.calendar.picker = this;
        this.calendar.onDateClicked.add((date, caseEl) => {
            if (!Lib.DateTools.isSameDate(this.value, date)) {
                this.value = date;
                this.onValueChange();
                if (this.hide_on_select) {
                    this.calendarContainer.hide();
                }
            }
        });
    }
    manageFocus() {
        this.calendarContainer.init(this);
        let blurTimeout = 0;
        ;
        let blur = () => {
            blurTimeout = setTimeout(() => {
                this.calendarContainer.hide();
            }, 100);
        };
        this.inputEl.addEventListener("blur", () => {
            blur();
        });
        this.calendarContainer.addEventListener("blur", (e) => {
            blur();
        });
        this.inputEl.addEventListener("focus", () => {
            clearTimeout(blurTimeout);
        });
        this.calendarContainer.addEventListener("focus", () => {
            clearTimeout(blurTimeout);
        });
    }
    postCreation() {
        super.postCreation();
        this.manageFocus();
        this.renderDate();
    }
    __e3c5860a3719823edab2c4b36e42865dmethod1() {
        return this.label;
    }
    __e3c5860a3719823edab2c4b36e42865dmethod2() {
        return this.icon;
    }
    __e3c5860a3719823edab2c4b36e42865dmethod3(error) {
        return error;
    }
}
Components.DatePicker.Namespace=`${moduleName}.Components`;
Components.DatePicker.Tag=`rk-date-picker`;
_.Components.DatePicker=Components.DatePicker;
if(!window.customElements.get('rk-date-picker')){window.customElements.define('rk-date-picker', Components.DatePicker);Aventus.WebComponentInstance.registerDefinition(Components.DatePicker);}

const CalendarContainer = class CalendarContainer extends Aventus.WebComponent {
    get 'visible'() { return this.getBoolAttr('visible') }
    set 'visible'(val) { this.setBoolAttr('visible', val) }    picker;
    static __style = `:host{display:none;position:absolute;z-index:800}:host([visible]){display:block}`;
    __getStatic() {
        return CalendarContainer;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(CalendarContainer.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`` }
    });
}
    getClassName() {
        return "CalendarContainer";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('visible')) { this.attributeChangedCallback('visible', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('visible'); }
    __listBoolProps() { return ["visible"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    init(picker) {
        this.picker = picker;
        this.shadowRoot.appendChild(picker.calendar);
    }
    async show(container) {
        if (!container) {
            container = document.body;
        }
        let box = this.picker.getBoundingClientRect();
        let boxInput = this.picker.inputEl.getBoundingClientRect();
        let contBox = container.getBoundingClientRect();
        let newTop = boxInput.top + boxInput.height + 2;
        this.style.top = newTop + 'px';
        this.style.bottom = '';
        this.style.left = box.left + 'px';
        this.style.right = '';
        container.appendChild(this);
        this.visible = true;
        let height = this.offsetHeight;
        if (height + newTop > contBox.height) {
            newTop = contBox.height - boxInput.top + 2;
            this.style.top = '';
            this.style.bottom = newTop + 'px';
        }
        let width = this.offsetWidth;
        if (width + box.left > contBox.width) {
            let newRight = contBox.width - (width) - 2;
            this.style.left = newRight + 'px';
        }
    }
    hide() {
        this.visible = false;
        this.parentElement?.removeChild(this);
    }
    postCreation() {
        this.setAttribute("tabindex", "-1");
    }
}
CalendarContainer.Namespace=`${moduleName}`;
CalendarContainer.Tag=`rk-calendar-container`;
_.CalendarContainer=CalendarContainer;
if(!window.customElements.get('rk-calendar-container')){window.customElements.define('rk-calendar-container', CalendarContainer);Aventus.WebComponentInstance.registerDefinition(CalendarContainer);}

Components.GenericSelect = class GenericSelect extends Components.FormElement {
    static get observedAttributes() {return ["label", "placeholder", "icon", "searchable"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'open'() { return this.getBoolAttr('open') }
    set 'open'(val) { this.setBoolAttr('open', val) }    get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }get 'placeholder'() { return this.getStringProp('placeholder') }
    set 'placeholder'(val) { this.setStringAttr('placeholder', val) }get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }get 'searchable'() { return this.getBoolProp('searchable') }
    set 'searchable'(val) { this.setBoolAttr('searchable', val) }    get 'displayValue'() {
						return this.__watch["displayValue"];
					}
					set 'displayValue'(val) {
						this.__watch["displayValue"] = val;
					}get 'value'() {
						return this.__watch["value"];
					}
					set 'value'(val) {
						this.__watch["value"] = val;
					}    selectedOption;
    options = [];
    __registerWatchesActions() {
    this.__addWatchesActions("displayValue", ((target, action, path, value) => {
    target.inputEl.value = target.displayValue;
}));this.__addWatchesActions("value", ((target) => {
    target.onInternalValueChanged();
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
    static __style = `:host{--_select-height: var(--select-height, 30px);--_select-background-color: var(--select-background-color, var(--form-element-background, white));--_select-icon-height: var(--select-icon-height, calc(var(--_select-height) / 2));--_select-error-logo-size: var(--select-error-logo-size, calc(var(--_select-height) / 2));--_select-font-size: var(--select-font-size, var(--form-element-font-size, 16px));--_select-font-size-label: var(--select-font-size-label, var(--form-element-font-size-label, calc(var(--_select-font-size) * 0.95)));--_select-select-border: var(--select-select-border, var(--form-element-border, 1px solid var(--lighter-active)));--_generic-select-border-radius: var(--generic-select-border-radius, var(--form-element-border-radius, 0));--_select-caret-height: var(--select-caret-height, calc(var(--_select-height) / 2));--_select-caret-color: var(--select-caret-color, var(--form-element-color))}:host{min-width:100px;width:100%}:host label{display:none;font-size:var(--_select-font-size-label);margin-bottom:5px;margin-left:3px}:host .input{align-items:center;background-color:var(--_select-background-color);border:var(--_select-select-border);border-radius:var(--_generic-select-border-radius);cursor:pointer;display:flex;height:var(--_select-height);padding:0 10px;width:100%}:host .input .icon{display:none;height:var(--_select-icon-height);margin-right:10px}:host .input rk-img.caret{--img-fill-color: var(--_select-caret-color);--img-stroke-width: 0;aspect-ratio:1;flex-grow:0;flex-shrink:0;height:var(--_select-caret-height);transform:rotate(-90deg);transition:transform .5s var(--bezier-curve)}:host .input input{background-color:rgba(0,0,0,0);border:none;color:var(--text-color);display:block;flex-grow:1;font-size:var(--_select-font-size);height:100%;margin:0;opacity:1;outline:none;padding:5px 0;padding-right:10px;-webkit-text-fill-color:var(--text-color);width:100%}:host .input .error-logo{align-items:center;background-color:var(--red);border-radius:50%;color:#fff;display:none;font-size:calc(var(--_select-error-logo-size) - 5px);height:var(--_select-error-logo-size);justify-content:center;width:var(--_select-error-logo-size);flex-shrink:0}:host .errors{color:var(--red);display:none;font-size:var(--font-size-sm);line-height:1.1;margin:10px;margin-bottom:0px}:host .errors div{margin:5px 0}:host .hidden{display:none}:host([has_errors]) .input{border:1px solid var(--red)}:host([has_errors]) .input .error-logo{display:flex}:host([has_errors]) .errors{display:block}:host([icon]:not([icon=""])) .input .icon{display:block}:host([label]:not([label=""])) label{display:flex}:host([open]) .input .caret{transform:rotate(-270deg)}`;
    constructor() { super(); if (this.constructor == GenericSelect) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return GenericSelect;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(GenericSelect.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
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
      "fct": (c) => `${c.print(c.comp.__efca6c2ed5bcc3ecd5150acdf7f96c13method1())}`,
      "once": true
    },
    "genericselect_2°src": {
      "fct": (c) => `${c.print(c.comp.__efca6c2ed5bcc3ecd5150acdf7f96c13method2())}`,
      "once": true
    },
    "genericselect_3°placeholder": {
      "fct": (c) => `${c.print(c.comp.__efca6c2ed5bcc3ecd5150acdf7f96c13method3())}`,
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
      "fct": (c) => `${c.print(c.comp.__efca6c2ed5bcc3ecd5150acdf7f96c13method4(c.data.error))}`,
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('open')) { this.attributeChangedCallback('open', false, false); }if(!this.hasAttribute('label')){ this['label'] = undefined; }if(!this.hasAttribute('placeholder')){ this['placeholder'] = undefined; }if(!this.hasAttribute('icon')){ this['icon'] = undefined; }if(!this.hasAttribute('searchable')) { this.attributeChangedCallback('searchable', false, false); } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["displayValue"] = "";w["value"] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('open');this.__upgradeProperty('label');this.__upgradeProperty('placeholder');this.__upgradeProperty('icon');this.__upgradeProperty('searchable');this.__correctGetter('displayValue');this.__correctGetter('value'); }
    __listBoolProps() { return ["open","searchable"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    onInternalValueChanged() {
        if (!this.isConnected)
            return;
        let found = false;
        for (let option of this.options) {
            if (option.value == this.value) {
                found = true;
                this.selectedOption = option;
                this.displayValue = this.itemToText(option);
                this.filter();
                break;
            }
        }
        if (!found) {
            this.selectedOption = undefined;
            this.displayValue = this.placeholder ?? '';
            this.filter();
        }
    }
    setValueFromOption(option) {
        this.selectedOption = option;
        this.value = option.value;
        this.displayValue = this.itemToText(option);
        this.hideOptions();
        this.onChange.trigger([this.value]);
        this.filter();
        if (this.formPart) {
            Components.FormElement.setValue(this.formPart, this.value);
            if (this.formPart.validateOnChange !== false) {
                this.validate();
            }
        }
    }
    removeErrors() {
        this.errors = [];
    }
    loadElementsFromSlot() {
        let elements = this.getElementsInSlot();
        for (let element of elements) {
            if (element instanceof Components.GenericOption) {
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
        }
        if (!this.searchable) {
            setTimeout(() => {
                this.optionsContainer.focus({ preventScroll: true });
            }, 100);
        }
    }
    hideOptions() {
        setTimeout(() => {
            this.optionsContainer.blur();
        }, 50);
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
            }, 100);
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
    postDestruction() {
        super.postDestruction();
        this.optionsContainer.remove();
    }
    postCreation() {
        this.manageFocus();
        this.optionsContainer.init(this);
        this.loadElementsFromSlot();
        this.onInternalValueChanged();
    }
    __efca6c2ed5bcc3ecd5150acdf7f96c13method1() {
        return this.label;
    }
    __efca6c2ed5bcc3ecd5150acdf7f96c13method2() {
        return this.icon;
    }
    __efca6c2ed5bcc3ecd5150acdf7f96c13method3() {
        return this.placeholder;
    }
    __efca6c2ed5bcc3ecd5150acdf7f96c13method4(error) {
        return error;
    }
}
Components.GenericSelect.Namespace=`${moduleName}.Components`;
_.Components.GenericSelect=Components.GenericSelect;

Components.GenericOption = class GenericOption extends Aventus.WebComponent {
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
Components.GenericOption.Namespace=`${moduleName}.Components`;
Components.GenericOption.Tag=`rk-generic-option`;
_.Components.GenericOption=Components.GenericOption;
if(!window.customElements.get('rk-generic-option')){window.customElements.define('rk-generic-option', Components.GenericOption);Aventus.WebComponentInstance.registerDefinition(Components.GenericOption);}

Components.OptionEnum = class OptionEnum extends Components.GenericOption {
    value = undefined;
    static __style = ``;
    __getStatic() {
        return OptionEnum;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(OptionEnum.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "OptionEnum";
    }
}
Components.OptionEnum.Namespace=`${moduleName}.Components`;
Components.OptionEnum.Tag=`rk-option-enum`;
_.Components.OptionEnum=Components.OptionEnum;
if(!window.customElements.get('rk-option-enum')){window.customElements.define('rk-option-enum', Components.OptionEnum);Aventus.WebComponentInstance.registerDefinition(Components.OptionEnum);}

Components.SelectEnum = class SelectEnum extends Components.GenericSelect {
    enumEl;
    static __style = ``;
    constructor() {
            super();
            this.enumEl = this.defineEnum();
            this.createOptions();
if (this.constructor == SelectEnum) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return SelectEnum;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(SelectEnum.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "SelectEnum";
    }
    itemToText(option) {
        return option.innerHTML;
    }
    getEnumName(value) {
        return this.enumEl[value];
    }
    createOptions() {
        let _enum = this.defineEnum();
        for (let key in _enum) {
            if (!key.match(/^\d*$/)) {
                let val = _enum[key];
                let option = new Components.OptionEnum();
                option.value = val;
                option.innerHTML = this.getEnumName(val);
                this.appendChild(option);
            }
        }
    }
    postCreation() {
        super.postCreation();
    }
}
Components.SelectEnum.Namespace=`${moduleName}.Components`;
_.Components.SelectEnum=Components.SelectEnum;

Components.OptionData = class OptionData extends Components.GenericOption {
    static __style = ``;
    __getStatic() {
        return OptionData;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(OptionData.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "OptionData";
    }
}
Components.OptionData.Namespace=`${moduleName}.Components`;
Components.OptionData.Tag=`rk-option-data`;
_.Components.OptionData=Components.OptionData;
if(!window.customElements.get('rk-option-data')){window.customElements.define('rk-option-data', Components.OptionData);Aventus.WebComponentInstance.registerDefinition(Components.OptionData);}

Components.Option = class Option extends Components.GenericOption {
    static get observedAttributes() {return ["value"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'value'() { return this.getStringProp('value') }
    set 'value'(val) { this.setStringAttr('value', val) }    static __style = ``;
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('value')){ this['value'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('value'); }
}
Components.Option.Namespace=`${moduleName}.Components`;
Components.Option.Tag=`rk-option`;
_.Components.Option=Components.Option;
if(!window.customElements.get('rk-option')){window.customElements.define('rk-option', Components.Option);Aventus.WebComponentInstance.registerDefinition(Components.Option);}

Components.Select = class Select extends Components.GenericSelect {
    static get observedAttributes() {return ["value"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'value'() { return this.getStringProp('value') }
    set 'value'(val) { this.setStringAttr('value', val) }    static __style = ``;
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('value')){ this['value'] = ""; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('value'); }
    itemToText(option) {
        // if(option.value !== undefined) {
        //     return option.value
        // }
        return option.innerHTML;
    }
}
Components.Select.Namespace=`${moduleName}.Components`;
Components.Select.Tag=`rk-select`;
_.Components.Select=Components.Select;
if(!window.customElements.get('rk-select')){window.customElements.define('rk-select', Components.Select);Aventus.WebComponentInstance.registerDefinition(Components.Select);}

Components.ItemBoxSelect = class ItemBoxSelect extends Components.BoxContainer {
    static get observedAttributes() {return ["value"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'has_errors'() { return this.getBoolAttr('has_errors') }
    set 'has_errors'(val) { this.setBoolAttr('has_errors', val) }    get 'value'() { return this.getStringProp('value') }
    set 'value'(val) { this.setStringAttr('value', val) }    get 'errors'() {
						return this.__watch["errors"];
					}
					set 'errors'(val) {
						this.__watch["errors"] = val;
					}get 'formPart'() {
						return this.__watch["formPart"];
					}
					set 'formPart'(val) {
						this.__watch["formPart"] = val;
					}    options = [];
    optionSelected;
    form;
    onChange = new Aventus.Callback();
    __registerWatchesActions() {
    this.__addWatchesActions("errors", ((target) => {
    target.has_errors = target.errors.length > 0;
}));this.__addWatchesActions("formPart", ((target, action, path, value) => {
    target.onFormPartChange(action, path, value);
}));    super.__registerWatchesActions();
}
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("value", ((target) => {
    target.selectInternalOption();
})); }
    static __style = `:host{position:relative}:host .select-notify{position:absolute;width:var(--internal-item-box-size);height:100%;left:0;top:0;background-color:var(--internal-item-box-select-select-background-color);transition:all .3s var(--bezier-curve);border-radius:var(--internal-item-border-radius);z-index:1}:host .container-option{display:flex;flex-direction:row;justify-content:center;align-items:center;height:100%;z-index:2}:host([space="0"]) .select-notify{border-radius:0}:host([space="0"]) .select-notify.first{border-top-left-radius:var(--internal-item-border-radius);border-bottom-left-radius:var(--internal-item-border-radius)}:host([space="0"]) .select-notify.last{border-top-right-radius:var(--internal-item-border-radius);border-bottom-right-radius:var(--internal-item-border-radius)}`;
    __getStatic() {
        return ItemBoxSelect;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(ItemBoxSelect.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="select-notify" rk-element="selectNotify"></div><div class="container-option">    <slot></slot></div>` }
    });
}
    getClassName() {
        return "ItemBoxSelect";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('has_errors')) { this.attributeChangedCallback('has_errors', false, false); }if(!this.hasAttribute('value')){ this['value'] = undefined; } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["errors"] = [];w["formPart"] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('has_errors');this.__upgradeProperty('value');this.__correctGetter('errors');this.__correctGetter('formPart'); }
    __listBoolProps() { return ["has_errors"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    selectInternalOption() {
        if (!this.isConnected)
            return;
        let oneFound = false;
        for (let option of this.options) {
            if (option.value == this.value) {
                if (this.optionSelected)
                    this.optionSelected.selected = false;
                option.selected = true;
                this.optionSelected = option;
                oneFound = true;
            }
            else {
                option.selected = false;
            }
        }
        if (!oneFound) {
            this.optionSelected = undefined;
        }
    }
    selectOption(option) {
        this.value = option.value;
        this.onChange.trigger([this.value]);
        if (this.formPart) {
            Components.FormElement.setValue(this.formPart, this.value);
            if (this.formPart.validateOnChange !== false) {
                this.validate();
            }
        }
    }
    register(option) {
        if (!this.options.includes(option)) {
            this.options.push(option);
            if (option.value == this.value) {
                if (this.optionSelected) {
                    this.optionSelected.selected = false;
                }
                option.selected = true;
                this.optionSelected = option;
            }
        }
    }
    unregister(option) {
        const index = this.options.indexOf(option);
        if (index != -1) {
            this.options.splice(index, 1);
        }
    }
    removeErrors() {
        this.errors = [];
    }
    validate() {
        return Components.FormElement.validate(this);
    }
    onFormPartChange(action, path, value) {
        Components.FormElement.onFormPartChange(this, path, value);
    }
    postCreation() {
        this.selectInternalOption();
    }
}
Components.ItemBoxSelect.Namespace=`${moduleName}.Components`;
Components.ItemBoxSelect.Tag=`rk-item-box-select`;
_.Components.ItemBoxSelect=Components.ItemBoxSelect;
if(!window.customElements.get('rk-item-box-select')){window.customElements.define('rk-item-box-select', Components.ItemBoxSelect);Aventus.WebComponentInstance.registerDefinition(Components.ItemBoxSelect);}

Components.ItemBoxOption = class ItemBoxOption extends Components.ItemBox {
    get 'selected'() { return this.getBoolAttr('selected') }
    set 'selected'(val) { this.setBoolAttr('selected', val) }get 'value'() { return this.getStringAttr('value') }
    set 'value'(val) { this.setStringAttr('value', val) }    select;
    static __style = `:host{cursor:pointer}:host::slotted(*){pointer-events:none}:host>*{pointer-events:none}`;
    __getStatic() {
        return ItemBoxOption;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(ItemBoxOption.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "ItemBoxOption";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('selected')) { this.attributeChangedCallback('selected', false, false); }if(!this.hasAttribute('value')){ this['value'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('selected');this.__upgradeProperty('value'); }
    __listBoolProps() { return ["selected"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    register() {
        this.select = this.findParentByType(Components.ItemBoxSelect);
        if (this.select) {
            this.select.register(this);
        }
        new Aventus.PressManager({
            element: this,
            onPress: () => {
                if (this.select) {
                    this.select.selectOption(this);
                }
            }
        });
    }
    postCreation() {
        this.register();
    }
    destructor() {
        super.destructor();
        if (this.select) {
            this.select.unregister(this);
        }
    }
}
Components.ItemBoxOption.Namespace=`${moduleName}.Components`;
Components.ItemBoxOption.Tag=`rk-item-box-option`;
_.Components.ItemBoxOption=Components.ItemBoxOption;
if(!window.customElements.get('rk-item-box-option')){window.customElements.define('rk-item-box-option', Components.ItemBoxOption);Aventus.WebComponentInstance.registerDefinition(Components.ItemBoxOption);}

Components.SelectData = class SelectData extends Components.GenericSelect {
    get 'loading'() { return this.getBoolAttr('loading') }
    set 'loading'(val) { this.setBoolAttr('loading', val) }    data = [];
    isInit = false;
    static __style = ``;
    constructor() {
            super();
            this.createOptions();
if (this.constructor == SelectData) { throw "can't instanciate an abstract class"; } this.subscribe=this.subscribe.bind(this)this.unsubscribe=this.unsubscribe.bind(this)this.onCreated=this.onCreated.bind(this)this.onDeleted=this.onDeleted.bind(this)this.onUpdated=this.onUpdated.bind(this) }
    __getStatic() {
        return SelectData;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(SelectData.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "SelectData";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('loading')) { this.attributeChangedCallback('loading', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('loading'); }
    __listBoolProps() { return ["loading"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    itemToText(option) {
        return option.innerHTML;
    }
    async createOptions() {
        this.loading = true;
        this.data = await this.loadData();
        for (let item of this.data) {
            let option = new Components.OptionData();
            option.value = await Aventus.Async(this.optionValue(item));
            option.innerHTML = await Aventus.Async(this.optionText(item));
            this.appendChild(option);
        }
        this.loading = false;
        this.init();
    }
    async loadData() {
        const result = await Lib.Process.execute(this, this.defineRam().getListWithError()) ?? [];
        return result;
    }
    subscribe() {
        this.defineRam().onCreated(this.onCreated);
        this.defineRam().onUpdated(this.onUpdated);
        this.defineRam().onDeleted(this.onDeleted);
    }
    unsubscribe() {
        this.defineRam().offCreated(this.onCreated);
        this.defineRam().offUpdated(this.onUpdated);
        this.defineRam().offDeleted(this.onDeleted);
    }
    async onCreated(item) {
        this.data.push(item);
        let option = new Components.OptionData();
        option.value = await Aventus.Async(this.optionValue(item));
        option.innerHTML = await Aventus.Async(this.optionText(item));
        this.appendChild(option);
        this.loadElementsFromSlot();
    }
    onDeleted(item) {
        for (let i = 0; i < this.options.length; i++) {
            let option = this.options[i];
            if (option.value == this.optionValue(item)) {
                this.options.splice(i, 1);
                option.remove();
                if (this.value == this.optionValue(item)) {
                    this.value = undefined;
                }
            }
        }
    }
    async onUpdated(item) {
        for (let i = 0; i < this.options.length; i++) {
            let option = this.options[i];
            if (option.value == this.optionValue(item)) {
                option.innerHTML = await Aventus.Async(this.optionText(item));
            }
        }
    }
    init() {
        if (!this.isConnected)
            return;
        if (this.isInit)
            return;
        this.isInit = true;
        super.postCreation();
        this.subscribe();
    }
    postDestruction() {
        super.postDestruction();
        this.unsubscribe();
    }
    postConnect() {
    }
    postCreation() {
        this.init();
    }
}
Components.SelectData.Namespace=`${moduleName}.Components`;
_.Components.SelectData=Components.SelectData;

Components.Table = class Table extends Aventus.WebComponent {
    static get observedAttributes() {return ["auto_hide_scroll", "grid", "items_per_page"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'col_resize'() { return this.getBoolAttr('col_resize') }
    set 'col_resize'(val) { this.setBoolAttr('col_resize', val) }get 'grid_breakpoint'() { return this.getNumberAttr('grid_breakpoint') }
    set 'grid_breakpoint'(val) { this.setNumberAttr('grid_breakpoint', val) }get 'first_page'() { return this.getBoolAttr('first_page') }
    set 'first_page'(val) { this.setBoolAttr('first_page', val) }get 'last_page'() { return this.getBoolAttr('last_page') }
    set 'last_page'(val) { this.setBoolAttr('last_page', val) }    get 'auto_hide_scroll'() { return this.getBoolProp('auto_hide_scroll') }
    set 'auto_hide_scroll'(val) { this.setBoolAttr('auto_hide_scroll', val) }get 'grid'() { return this.getBoolProp('grid') }
    set 'grid'(val) { this.setBoolAttr('grid', val) }get 'items_per_page'() { return this.getNumberProp('items_per_page') }
    set 'items_per_page'(val) { this.setNumberAttr('items_per_page', val) }    get 'tableTitle'() {
						return this.__watch["tableTitle"];
					}
					set 'tableTitle'(val) {
						this.__watch["tableTitle"] = val;
					}get 'showSearch'() {
						return this.__watch["showSearch"];
					}
					set 'showSearch'(val) {
						this.__watch["showSearch"] = val;
					}get 'showHeader'() {
						return this.__watch["showHeader"];
					}
					set 'showHeader'(val) {
						this.__watch["showHeader"] = val;
					}get 'showFooter'() {
						return this.__watch["showFooter"];
					}
					set 'showFooter'(val) {
						this.__watch["showFooter"] = val;
					}get 'displayedData'() {
						return this.__watch["displayedData"];
					}
					set 'displayedData'(val) {
						this.__watch["displayedData"] = val;
					}get 'data'() {
						return this.__watch["data"];
					}
					set 'data'(val) {
						this.__watch["data"] = val;
					}get 'currentPage'() {
						return this.__watch["currentPage"];
					}
					set 'currentPage'(val) {
						this.__watch["currentPage"] = val;
					}get 'nbItems'() {
						return this.__watch["nbItems"];
					}
					set 'nbItems'(val) {
						this.__watch["nbItems"] = val;
					}    options;
    filters = {};
    sortColumns = {};
    globalSearchTxt;
    rows = new Map();
    hadGlobalSearch = false;
    isFirstRender = true;
    header;
    rowsSelected = [];
    rowsFiltered = [];
    rowsDisplayed = [];
    resizeObserver;
    mustForceRender = false;
    errorsTxtItemPerPage = {
        notNumber: '',
        lowerThanMin: '',
        biggerThanMax: '',
    };
    select = new Aventus.Callback();
    __registerWatchesActions() {
    this.__addWatchesActions("tableTitle");this.__addWatchesActions("showSearch");this.__addWatchesActions("showHeader");this.__addWatchesActions("showFooter");this.__addWatchesActions("displayedData", ((target, action, path, value) => {
    target.render();
}));this.__addWatchesActions("data", ((target, action, path, value) => {
    target.filterData();
}));this.__addWatchesActions("currentPage", ((target) => {
    target.correctPage();
}));this.__addWatchesActions("nbItems");    super.__registerWatchesActions();
}
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("grid", ((target) => {
    target.updateGrid();
}));this.__addPropertyActions("items_per_page", ((target) => {
    target.renderPage();
    if (target.items_per_page > 0 && target.options.showFooter === undefined) {
        target.showFooter = true;
    }
})); }
    static __style = `:host{--_table-background-color: var(--table-background-color, var(--secondary-color));--_table-elevation: var(--table-elevation, var(--elevation-2));--_table-row-header-height: var(--table-row-header-height, 50px);--_table-header-backgroud-color: var(--table-header-backgroud-color, var(--primary-color));--_table-header-color: var(--table-header-color, var(--text-color-reverse));--_table-footer-backgroud-color: var(--table-footer-backgroud-color, var(--primary-color));--_table-footer-color: var(--table-footer-color, var(--text-color-reverse));--_table-row-header-backgroud-color: var(--table-row-header-backgroud-color, var(--primary-color));--_table-row-header-color: var(--table-row-header-color, var(--text-color-reverse));--_table-border-color: var(--table-border-color, var(--secondary-color));--_table-row-header-vertical-border: var(--table-row-header-vertical-border, 1px solid var(--_table-border-color));--_table-row-header-horizontal-border: var(--table-row-header-horizontal-border, 1px solid var(--_table-border-color));--_table-cell-vertical-border: var(--table-cell-vertical-border, 1px solid var(--_table-border-color));--_table-cell-horizontal-border: var(--table-cell-vertical-border, 1px solid var(--_table-border-color));--_table-cell-padding: var(--table-cell-padding, 10px);--local-table-cell-resize-display: none}:host{background-color:var(--_table-background-color);border:1px solid var(--_table-border-color);border-radius:5px;box-shadow:var(--_table-elevation);display:flex;flex-direction:column;height:100%;overflow:hidden;width:100%}:host .style-wrapper{display:flex;flex-direction:column;height:100%;overflow:hidden;width:100%}:host .style-wrapper .header{align-items:center;background-color:var(--_table-header-backgroud-color);color:var(--_table-header-color);display:flex;justify-content:space-between;padding:10px}:host .style-wrapper .header .title{align-items:center;display:flex;font-size:var(--font-size-md);height:30px;margin-left:5px}:host .style-wrapper .row-header{--scrollbar-color: transparent;--scrollbar-active-color: transparent;--scroller-width: 0;height:var(--_table-row-header-height);width:100%}:host .style-wrapper .body{display:flex;flex-direction:column;height:calc(100% - var(--_table-row-header-height));width:100%}:host .style-wrapper .footer{align-items:center;background-color:var(--_table-footer-backgroud-color);color:var(--_table-footer-color);display:flex;gap:30px;justify-content:end;padding:10px}:host .style-wrapper .footer .items-per-page{align-items:center;display:flex}:host .style-wrapper .footer .items-per-page rk-input-number{margin-left:10px;min-width:auto;width:50px}:host .style-wrapper .footer .location{align-items:center;display:flex}:host .style-wrapper .footer .pagination{align-items:center;display:flex}:host .style-wrapper .footer .pagination .btn-previous,:host .style-wrapper .footer .pagination .btn-next{transition:background-color .2s var(--bezier-curve)}:host .style-wrapper rk-scrollable::part(content-wrapper){min-width:100%}:host([first_page]) .style-wrapper .footer .pagination .btn-previous{opacity:.5;pointer-events:none}:host([last_page]) .style-wrapper .footer .pagination .btn-next{opacity:.5;pointer-events:none}:host([col_resize]){--local-table-cell-resize-display: block}:host([grid]) .style-wrapper .header{display:none}:host([grid]) .style-wrapper .body{flex-direction:row}:host([grid]) .style-wrapper .body rk-scrollable::part(content-wrapper){display:flex;flex-wrap:wrap;gap:15px;justify-content:center;padding:15px}@media screen and (min-width: 1225px){:host .style-wrapper .footer .pagination .touch:hover{background-color:var(--lighter);border-radius:5px}}`;
    constructor() {
            super();
            this.options = this.configure(this.defaultOptions());
            this.normalizeSchema();
            this.auto_hide_scroll = this.autoHideScroll();
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
        slots: { 'before':`<slot name="before"></slot>`,'header':`<slot name="header">        <template _id="table_1"></template>    </slot>`,'footer':`<slot name="footer">        <template _id="table_7"></template>    </slot>`,'after':`<slot name="after"></slot>`,'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot name="before"></slot><div class="style-wrapper" _id="table_0">    <slot name="header">        <template _id="table_1"></template>    </slot>    <div class="row-header">        <rk-scrollable y_scroll="false" x_scroll floating_scroll _id="table_5">        </rk-scrollable>    </div>    <div class="body">        <rk-scrollable x_scroll floating_scroll _id="table_6">        </rk-scrollable>    </div>    <slot name="footer">        <template _id="table_7"></template>    </slot></div><slot name="after"></slot><slot></slot>` }
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
        "table_5"
      ]
    },
    {
      "name": "bodyContainer",
      "ids": [
        "table_6"
      ]
    }
  ],
  "content": {
    "table_6°auto_hide": {
      "fct": (c) => `${c.print(c.comp.__b5b6f5e196622f4341e5ecfc2e397e35method4())}`,
      "once": true
    }
  }
});const templ0 = new Aventus.Template(this);templ0.setTemplate(`            <div class="header">                <div class="title" _id="table_2"></div>                <template _id="table_3"></template>            </div>        `);templ0.setActions({
  "content": {
    "table_2°@HTML": {
      "fct": (c) => `${c.print(c.comp.__b5b6f5e196622f4341e5ecfc2e397e35method3())}`,
      "once": true
    }
  }
});const templ1 = new Aventus.Template(this);templ1.setTemplate(`                    <div class="search">                        <rk-input placeholder="Recherche" _id="table_4"></rk-input>                    </div>                `);templ1.setActions({
  "events": [
    {
      "eventName": "onChange",
      "id": "table_4",
      "fct": (c, ...args) => c.comp.globalFilter.apply(c.comp, ...args),
      "isCallback": true
    }
  ]
});templ0.addIf({
                    anchorId: 'table_3',
                    parts: [{once: true,
                    condition: (c) => c.comp.__b5b6f5e196622f4341e5ecfc2e397e35method1(),
                    template: templ1
                }]
            });this.__getStatic().__template.addIf({
                    anchorId: 'table_1',
                    parts: [{once: true,
                    condition: (c) => c.comp.__b5b6f5e196622f4341e5ecfc2e397e35method0(),
                    template: templ0
                }]
            });const templ2 = new Aventus.Template(this);templ2.setTemplate(`            <div class="footer">                <div class="items-per-page">                    <span>Éléments par page : </span>                    <rk-input-number min="1" _id="table_8"></rk-input-number>                </div>                <div class="location" _id="table_9"></div>                <div class="pagination">                    <mi-icon icon="keyboard_double_arrow_left" class="btn-previous touch" _id="table_10"></mi-icon>                    <mi-icon icon="keyboard_arrow_left" class="btn-previous touch" _id="table_11"></mi-icon>                    <mi-icon icon="keyboard_arrow_right" class="btn-next touch" _id="table_12"></mi-icon>                    <mi-icon icon="keyboard_double_arrow_right" class="btn-next touch" _id="table_13"></mi-icon>                </div>            </div>        `);templ2.setActions({
  "content": {
    "table_9°@HTML": {
      "fct": (c) => `${c.print(c.comp.__b5b6f5e196622f4341e5ecfc2e397e35method8())}`,
      "once": true
    }
  },
  "injection": [
    {
      "id": "table_8",
      "injectionName": "errorsTxt",
      "inject": (c) => c.comp.__b5b6f5e196622f4341e5ecfc2e397e35method7(),
      "once": true
    }
  ],
  "bindings": [
    {
      "id": "table_8",
      "injectionName": "value",
      "eventNames": [
        "onChange"
      ],
      "inject": (c) => c.comp.__b5b6f5e196622f4341e5ecfc2e397e35method5(),
      "extract": (c, v) => c.comp.__b5b6f5e196622f4341e5ecfc2e397e35method6(v),
      "once": true,
      "isCallback": true
    }
  ],
  "pressEvents": [
    {
      "id": "table_10",
      "onPress": (e, pressInstance, c) => { c.comp.firstPage(e, pressInstance); }
    },
    {
      "id": "table_11",
      "onPress": (e, pressInstance, c) => { c.comp.previousPage(e, pressInstance); }
    },
    {
      "id": "table_12",
      "onPress": (e, pressInstance, c) => { c.comp.nextPage(e, pressInstance); }
    },
    {
      "id": "table_13",
      "onPress": (e, pressInstance, c) => { c.comp.lastPage(e, pressInstance); }
    }
  ]
});this.__getStatic().__template.addIf({
                    anchorId: 'table_7',
                    parts: [{once: true,
                    condition: (c) => c.comp.__b5b6f5e196622f4341e5ecfc2e397e35method2(),
                    template: templ2
                }]
            }); }
    getClassName() {
        return "Table";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('col_resize')) { this.attributeChangedCallback('col_resize', false, false); }if(!this.hasAttribute('grid_breakpoint')){ this['grid_breakpoint'] = undefined; }if(!this.hasAttribute('first_page')) { this.attributeChangedCallback('first_page', false, false); }if(!this.hasAttribute('last_page')) { this.attributeChangedCallback('last_page', false, false); }if(!this.hasAttribute('auto_hide_scroll')) { this.attributeChangedCallback('auto_hide_scroll', false, false); }if(!this.hasAttribute('grid')) { this.attributeChangedCallback('grid', false, false); }if(!this.hasAttribute('items_per_page')){ this['items_per_page'] = 0; } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["tableTitle"] = "";w["showSearch"] = false;w["showHeader"] = false;w["showFooter"] = false;w["displayedData"] = undefined;w["data"] = undefined;w["currentPage"] = 0;w["nbItems"] = 0; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('col_resize');this.__upgradeProperty('grid_breakpoint');this.__upgradeProperty('first_page');this.__upgradeProperty('last_page');this.__upgradeProperty('auto_hide_scroll');this.__upgradeProperty('grid');this.__upgradeProperty('items_per_page');this.__correctGetter('tableTitle');this.__correctGetter('showSearch');this.__correctGetter('showHeader');this.__correctGetter('showFooter');this.__correctGetter('displayedData');this.__correctGetter('data');this.__correctGetter('currentPage');this.__correctGetter('nbItems'); }
    __listBoolProps() { return ["col_resize","first_page","last_page","auto_hide_scroll","grid"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    getSelectedData() {
        const result = [];
        for (let row of this.rowsSelected) {
            result.push(row.data);
        }
        return result;
    }
    autoHideScroll() {
        return true;
    }
    selectRow(row) {
        if (!row)
            return;
        if (!this.rowsSelected.includes(row)) {
            this.rowsSelected.push(row);
            this.onSelected();
            this.select.trigger([this.getSelectedData()]);
        }
    }
    unselectRow(row) {
        if (!row)
            return;
        let index = this.rowsSelected.indexOf(row);
        if (index != -1) {
            this.rowsSelected.splice(index, 1);
            this.onSelected();
            this.select.trigger([this.getSelectedData()]);
        }
    }
    unselectAllRows() {
        this.rowsSelected = [];
        this.onSelected();
        this.select.trigger([[]]);
    }
    onSelected() {
    }
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
    normalizeSchemaCell(cellConfig) {
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
    normalizeSchema() {
        for (let cellConfig of this.options.schema) {
            this.normalizeSchemaCell(cellConfig);
        }
        if (this.options.title || this.options.globalSearch) {
            this.showHeader = true;
            this.tableTitle = this.options.title;
            this.showSearch = this.options.globalSearch;
        }
        if (this.options.showFooter) {
            this.showFooter = true;
        }
        if (this.options.items_per_page && this.options.items_per_page > 0) {
            this.items_per_page = this.options.items_per_page;
        }
        if (this.options.selectable) {
            this.options.schema.splice(0, 0, {
                displayName: "",
                name: "",
                type: "custom",
                cell: TableCellCheckbox,
                width: 50,
                sortable: false
            });
        }
    }
    defaultOptions() {
        return {
            schema: [],
            selectable: false,
            header: Components.TableRowHeader,
            row: Components.TableRow,
            sortable: true,
            title: '',
            globalSearch: false,
        };
    }
    setColWidth(width, i) {
        this.styleWrapper?.style.setProperty("--_table-cell-width-" + (i + 1), width + "px");
        this.styleWrapper?.style.setProperty("--_table-cell-weight-" + (i + 1), "0");
    }
    setColMinWidth(width, i) {
        this.styleWrapper?.style.setProperty("--_table-cell-min-width-" + (i + 1), width + "px");
    }
    sortData(data) {
        return data;
    }
    setSortColumn(column, order) {
        let cell = this.header.cells[column];
        if (!(cell instanceof Components.TableCellHeader))
            return;
        cell.sort_direction = order;
        if (order === undefined) {
            delete this.sortColumns[column];
        }
        else {
            this.sortColumns[column] = order;
        }
        this.render(order !== undefined);
    }
    filterData(forceRender = false) {
        let result = [];
        let oldData = Array.from(this.rows.keys());
        if (this.data) {
            for (let item of this.data) {
                let isOk = true;
                // remove old data to avoid delete it
                let index = oldData.indexOf(item);
                if (index != -1) {
                    oldData.splice(index, 1);
                }
                // apply filters
                for (let name in this.filters) {
                    let value = item[name];
                    let filters = this.filters[name];
                    for (let filter of filters) {
                        if (!filter(value)) {
                            isOk = false;
                            break;
                        }
                    }
                }
                if (isOk) {
                    result.push(item);
                }
            }
        }
        // delete old rows
        for (let oldItem of oldData) {
            this.rows.get(oldItem)?.remove();
            this.rows.delete(oldItem);
        }
        result = this.sortData(result);
        if (forceRender) {
            this.mustForceRender = true;
        }
        this.displayedData = result;
        if (this.mustForceRender) {
            this.render();
        }
    }
    firstRender() {
        if (this.isFirstRender) {
            this.isFirstRender = false;
            for (let i = 0; i < this.options.schema.length; i++) {
                const width = this.options.schema[i].width;
                if (width) {
                    this.setColWidth(width, i);
                }
                const minWidth = this.options.schema[i].minWidth;
                if (minWidth) {
                    this.setColMinWidth(minWidth, i);
                }
            }
            let nbCol = this.options.schema.length ? this.options.schema.length : 1;
            this.styleWrapper?.style.setProperty("--_table-nb-column", nbCol + "");
            this.header = new this.options.header();
            this.header.table = this;
            this.header.init(this.options);
            this.headerContainer.innerHTML = "";
            this.headerContainer.appendChild(this.header);
        }
    }
    render(onlySort = false) {
        this.mustForceRender = false;
        if (!this.headerContainer || !this.bodyContainer) {
            return;
        }
        this.firstRender();
        this.hadGlobalSearch = false;
        if (!onlySort) {
            let newRowsFiltered = [];
            if (this.displayedData) {
                for (let item of this.displayedData) {
                    let rowItem = this.rows.get(item);
                    if (!rowItem) {
                        let row = new this.options.row();
                        row.table = this;
                        row.grid = this.grid;
                        row.init(this.options, item);
                        this.rows.set(item, row);
                        rowItem = row;
                    }
                    let search = this.globalSearchTxt?.trim().toLowerCase();
                    if (search) {
                        if (!rowItem.globalSearch(search)) {
                            continue;
                        }
                    }
                    newRowsFiltered.push(rowItem);
                }
            }
            this.rowsFiltered = newRowsFiltered;
        }
        for (let column in this.sortColumns) {
            this.rowsFiltered.sort((a, b) => a.sort(b, column, this.sortColumns[column]));
        }
        this.nbItems = this.rowsFiltered.length;
        this.renderPage();
    }
    renderPage() {
        this.correctPage();
        let oldRowsDisplayed = [...this.rowsDisplayed];
        let rowsDisplayed = this.items_per_page ? this.rowsFiltered.slice(this.items_per_page * this.currentPage, this.items_per_page * (this.currentPage + 1)) : [...this.rowsFiltered];
        for (let oldRowDisplayed of oldRowsDisplayed) {
            // remove from DOM but don't destroy
            oldRowDisplayed.parentElement?.removeChild(oldRowDisplayed);
        }
        for (let row of rowsDisplayed) {
            this.bodyContainer.appendChild(row);
        }
        this.rowsDisplayed = rowsDisplayed;
    }
    locationInfo() {
        const nbItems = this.nbItems;
        const currentPage = this.currentPage;
        const start = this.items_per_page == 0 ? 0 : Math.min(this.items_per_page * currentPage + 1, nbItems);
        const end = this.items_per_page == 0 ? nbItems : Math.min(this.items_per_page * (currentPage + 1), nbItems);
        return `${start}-${end} sur ${nbItems}`;
    }
    correctPage() {
        let maxPage = this.items_per_page == 0 ? 0 : Math.floor(this.nbItems / this.items_per_page);
        if (this.currentPage < 0) {
            this.currentPage = 0;
        }
        else if (this.currentPage > maxPage) {
            this.currentPage = maxPage;
        }
        this.first_page = this.currentPage == 0;
        this.last_page = this.currentPage == maxPage;
    }
    previousPage() {
        this.currentPage--;
        this.renderPage();
    }
    firstPage() {
        this.currentPage = 0;
        this.renderPage();
    }
    nextPage() {
        this.currentPage++;
        this.renderPage();
    }
    lastPage() {
        this.currentPage = this.items_per_page == 0 ? 0 : Math.floor(this.nbItems / this.items_per_page);
        this.renderPage();
    }
    globalFilter(txt) {
        this.globalSearchTxt = txt;
        this.currentPage = 0;
        this.render();
    }
    addFilter(name, action, reload = true) {
        let nameTxt = name;
        if (!this.filters[nameTxt]) {
            this.filters[nameTxt] = [];
        }
        else if (this.filters[nameTxt].includes(action)) {
            return;
        }
        this.filters[nameTxt].push(action);
        if (reload && this.isReady)
            this.filterData();
    }
    removeFilter(name, action, reload = true) {
        let nameTxt = name;
        if (this.filters[nameTxt]) {
            let index = this.filters[nameTxt].indexOf(action);
            if (index != -1) {
                this.filters[nameTxt].splice(index, 1);
            }
        }
        if (reload && this.isReady)
            this.filterData();
    }
    registerObserver() {
        this.resizeObserver = new Aventus.ResizeObserver(() => {
            this.grid = (this.grid_breakpoint != undefined && this.offsetWidth <= this.grid_breakpoint);
        });
        this.resizeObserver.observe(this);
    }
    updateGrid() {
        for (const [item, row] of this.rows) {
            row.grid = this.grid;
        }
    }
    postCreation() {
        this.syncScroll();
        this.registerObserver();
        this.render();
    }
    postDestruction() {
        super.postDestruction();
        this.resizeObserver.disconnect();
        for (let [item, row] of this.rows) {
            row.remove();
        }
    }
    __b5b6f5e196622f4341e5ecfc2e397e35method3() {
        return this.tableTitle;
    }
    __b5b6f5e196622f4341e5ecfc2e397e35method4() {
        return this.auto_hide_scroll;
    }
    __b5b6f5e196622f4341e5ecfc2e397e35method8() {
        return this.locationInfo();
    }
    __b5b6f5e196622f4341e5ecfc2e397e35method0() {
        return this.showHeader;
    }
    __b5b6f5e196622f4341e5ecfc2e397e35method1() {
        return this.showSearch;
    }
    __b5b6f5e196622f4341e5ecfc2e397e35method2() {
        return this.showFooter;
    }
    __b5b6f5e196622f4341e5ecfc2e397e35method7() {
        return this.errorsTxtItemPerPage;
    }
    __b5b6f5e196622f4341e5ecfc2e397e35method5() {
        return this.items_per_page;
    }
    __b5b6f5e196622f4341e5ecfc2e397e35method6(v) {
        if (this) {
            this.items_per_page = v;
        }
    }
}
Components.Table.Namespace=`${moduleName}.Components`;
_.Components.Table=Components.Table;

Components.TableRow = class TableRow extends Aventus.WebComponent {
    static get observedAttributes() {return ["grid"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'custom_grid'() { return this.getBoolAttr('custom_grid') }
    set 'custom_grid'(val) { this.setBoolAttr('custom_grid', val) }    get 'grid'() { return this.getBoolProp('grid') }
    set 'grid'(val) { this.setBoolAttr('grid', val) }    table;
    _data;
    get data() {
        return this._data;
    }
    cells = {};
    options;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("grid", ((target) => {
    target.updateGrid();
})); }
    static __style = `:host{width:100%}:host .row-content{align-items:stretch;border-bottom:var(--_table-cell-horizontal-border);display:flex;flex-direction:row;width:100%}:host .row-content>*:last-child{border-right:none !important}:host .grid-content{display:none}:host([grid]){width:fit-content}:host([grid]) .row-content,:host([grid]) .grid-content{border:var(--_table-cell-vertical-border);border-radius:5px;flex-direction:column;padding:10px;width:fit-content}:host([grid][custom_grid]) .row-content{display:none}:host([grid][custom_grid]) .grid-content{display:flex}`;
    constructor() {
            super();
            this.custom_grid = this.customGridTemplate();
        }
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
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="row-content" _id="tablerow_0"></div><div class="grid-content">    <slot></slot></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "rowContentEl",
      "ids": [
        "tablerow_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "TableRow";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('custom_grid')) { this.attributeChangedCallback('custom_grid', false, false); }if(!this.hasAttribute('grid')) { this.attributeChangedCallback('grid', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('data');this.__upgradeProperty('custom_grid');this.__upgradeProperty('grid'); }
    __listBoolProps() { return ["custom_grid","grid"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    customGridTemplate() {
        return false;
    }
    getCell(cellConfig) {
        return cellConfig.cell ?? Components.TableCellString;
    }
    getContent(cellConfig, data) {
        return cellConfig.name ? Aventus.getValueFromObject(cellConfig.name, data) : undefined;
    }
    addCellOption(cell, cellConfig, data) {
    }
    init(options, data) {
        this.options = options;
        this._data = data;
        let i = 0;
        this.cells = {};
        for (let cellConfig of options.schema) {
            let cellInfo = this.getCell(cellConfig);
            let cell;
            let applyContent = true;
            if (Aventus.isClass(cellInfo)) {
                let cst = cellInfo;
                cell = new cst();
            }
            else {
                let fct = cellInfo;
                cell = fct(data);
                applyContent = false;
            }
            cell.index = i;
            cell.row = this;
            cell.data = data;
            cell.label = cellConfig.name;
            cell.grid = this.grid;
            this.addCellOption(cell, cellConfig, data);
            if (applyContent) {
                const v = this.getContent(cellConfig, data);
                cell.setContent(v, data);
            }
            this.rowContentEl.appendChild(cell);
            this.cells[cellConfig.displayName] = cell;
            i++;
        }
    }
    globalSearch(search) {
        for (let name in this.cells) {
            if (this.cells[name].globalSearch(search)) {
                return true;
            }
        }
        return false;
    }
    sort(row, column, order) {
        let cell = this.cells[column];
        let cellRow = row.cells[column];
        if (!cell || !cellRow)
            return 0;
        let result = cell.sortAsc(cellRow);
        if (order == 'desc')
            result *= -1;
        return result;
    }
    updateGrid() {
        for (let name in this.cells) {
            this.cells[name].grid = this.grid;
        }
    }
    postDestruction() {
        super.postDestruction();
        for (let name in this.cells) {
            this.cells[name].remove();
        }
    }
}
Components.TableRow.Namespace=`${moduleName}.Components`;
Components.TableRow.Tag=`rk-table-row`;
_.Components.TableRow=Components.TableRow;
if(!window.customElements.get('rk-table-row')){window.customElements.define('rk-table-row', Components.TableRow);Aventus.WebComponentInstance.registerDefinition(Components.TableRow);}

Components.TableCell = class TableCell extends Aventus.WebComponent {
    static get observedAttributes() {return ["grid", "label"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'grid'() { return this.getBoolProp('grid') }
    set 'grid'(val) { this.setBoolAttr('grid', val) }get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }    row;
    index = 0;
    get table() {
        if (this.row && this.row.table) {
            return this.row.table;
        }
        throw 'Table can\'t be found for the cell';
    }
    content = "";
    data;
    static __style = `:host{align-items:center;border-right:var(--_table-cell-vertical-border);display:flex;flex-shrink:0;justify-content:center;padding:var(--_table-cell-padding);position:relative;text-align:center}:host .resize{background-color:rgba(0,0,0,0);bottom:0;cursor:col-resize;display:var(--local-table-cell-resize-display);position:absolute;right:0;top:0;width:5px}:host(:nth-child(1)){flex-grow:var(--_table-cell-weight-1, 1);min-width:var(--_table-cell-min-width-1, auto);width:var(--_table-cell-width-1, calc(100% / var(--_table-nb-column)))}:host(:nth-child(2)){flex-grow:var(--_table-cell-weight-2, 1);min-width:var(--_table-cell-min-width-2, auto);width:var(--_table-cell-width-2, calc(100% / var(--_table-nb-column)))}:host(:nth-child(3)){flex-grow:var(--_table-cell-weight-3, 1);min-width:var(--_table-cell-min-width-3, auto);width:var(--_table-cell-width-3, calc(100% / var(--_table-nb-column)))}:host(:nth-child(4)){flex-grow:var(--_table-cell-weight-4, 1);min-width:var(--_table-cell-min-width-4, auto);width:var(--_table-cell-width-4, calc(100% / var(--_table-nb-column)))}:host(:nth-child(5)){flex-grow:var(--_table-cell-weight-5, 1);min-width:var(--_table-cell-min-width-5, auto);width:var(--_table-cell-width-5, calc(100% / var(--_table-nb-column)))}:host(:nth-child(6)){flex-grow:var(--_table-cell-weight-6, 1);min-width:var(--_table-cell-min-width-6, auto);width:var(--_table-cell-width-6, calc(100% / var(--_table-nb-column)))}:host(:nth-child(7)){flex-grow:var(--_table-cell-weight-7, 1);min-width:var(--_table-cell-min-width-7, auto);width:var(--_table-cell-width-7, calc(100% / var(--_table-nb-column)))}:host(:nth-child(8)){flex-grow:var(--_table-cell-weight-8, 1);min-width:var(--_table-cell-min-width-8, auto);width:var(--_table-cell-width-8, calc(100% / var(--_table-nb-column)))}:host(:nth-child(9)){flex-grow:var(--_table-cell-weight-9, 1);min-width:var(--_table-cell-min-width-9, auto);width:var(--_table-cell-width-9, calc(100% / var(--_table-nb-column)))}:host(:nth-child(10)){flex-grow:var(--_table-cell-weight-10, 1);min-width:var(--_table-cell-min-width-10, auto);width:var(--_table-cell-width-10, calc(100% / var(--_table-nb-column)))}:host(:nth-child(11)){flex-grow:var(--_table-cell-weight-11, 1);min-width:var(--_table-cell-min-width-11, auto);width:var(--_table-cell-width-11, calc(100% / var(--_table-nb-column)))}:host(:nth-child(12)){flex-grow:var(--_table-cell-weight-12, 1);min-width:var(--_table-cell-min-width-12, auto);width:var(--_table-cell-width-12, calc(100% / var(--_table-nb-column)))}:host(:nth-child(13)){flex-grow:var(--_table-cell-weight-13, 1);min-width:var(--_table-cell-min-width-13, auto);width:var(--_table-cell-width-13, calc(100% / var(--_table-nb-column)))}:host(:nth-child(14)){flex-grow:var(--_table-cell-weight-14, 1);min-width:var(--_table-cell-min-width-14, auto);width:var(--_table-cell-width-14, calc(100% / var(--_table-nb-column)))}:host(:nth-child(15)){flex-grow:var(--_table-cell-weight-15, 1);min-width:var(--_table-cell-min-width-15, auto);width:var(--_table-cell-width-15, calc(100% / var(--_table-nb-column)))}:host(:nth-child(16)){flex-grow:var(--_table-cell-weight-16, 1);min-width:var(--_table-cell-min-width-16, auto);width:var(--_table-cell-width-16, calc(100% / var(--_table-nb-column)))}:host(:nth-child(17)){flex-grow:var(--_table-cell-weight-17, 1);min-width:var(--_table-cell-min-width-17, auto);width:var(--_table-cell-width-17, calc(100% / var(--_table-nb-column)))}:host(:nth-child(18)){flex-grow:var(--_table-cell-weight-18, 1);min-width:var(--_table-cell-min-width-18, auto);width:var(--_table-cell-width-18, calc(100% / var(--_table-nb-column)))}:host(:nth-child(19)){flex-grow:var(--_table-cell-weight-19, 1);min-width:var(--_table-cell-min-width-19, auto);width:var(--_table-cell-width-19, calc(100% / var(--_table-nb-column)))}:host(:nth-child(20)){flex-grow:var(--_table-cell-weight-20, 1);min-width:var(--_table-cell-min-width-20, auto);width:var(--_table-cell-width-20, calc(100% / var(--_table-nb-column)))}:host([grid]){align-items:flex-start;border-right:none;flex-direction:column;justify-content:flex-start;margin-top:10px;padding:0}:host([grid]) .label{color:var(--text-color-light);font-size:var(--font-size-sm);margin-bottom:4px}:host([grid]) .content{margin-left:5px}:host([grid]) .resize{display:none}:host([grid]:first-child){margin-top:0}`;
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
        blocks: { 'default':`<template _id="tablecell_0"></template><span class="content" _id="tablecell_2">    <slot></slot></span><div class="resize" _id="tablecell_3"></div>` }
    });
}
    get labelEl () { return this.shadowRoot.querySelector('[_id="tablecell_1"]'); }    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "contentEl",
      "ids": [
        "tablecell_2"
      ]
    },
    {
      "name": "resizeEl",
      "ids": [
        "tablecell_3"
      ]
    }
  ]
});const templ0 = new Aventus.Template(this);templ0.setTemplate(`    <div class="label" _id="tablecell_1"></div>`);templ0.setActions({
  "content": {
    "tablecell_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__ac8f24890b42a6032ac364c65280b7a3method1())}`,
      "once": true
    }
  }
});this.__getStatic().__template.addIf({
                    anchorId: 'tablecell_0',
                    parts: [{once: true,
                    condition: (c) => c.comp.__ac8f24890b42a6032ac364c65280b7a3method0(),
                    template: templ0
                }]
            }); }
    getClassName() {
        return "TableCell";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('grid')) { this.attributeChangedCallback('grid', false, false); }if(!this.hasAttribute('label')){ this['label'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('table');this.__upgradeProperty('grid');this.__upgradeProperty('label'); }
    __listBoolProps() { return ["grid"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
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
    globalSearch(search) {
        return this.content.toLowerCase().includes(search);
    }
    postCreation() {
        this.addResize();
    }
    __ac8f24890b42a6032ac364c65280b7a3method1() {
        return this.label;
    }
    __ac8f24890b42a6032ac364c65280b7a3method0() {
        return this.grid;
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
    sortAsc(cell) {
        let value = this.content;
        let valueCell = cell.content;
        return value.localeCompare(valueCell);
    }
    setContent(data, rowData) {
        this.content = data != undefined ? data + "" : "";
        this.contentEl.innerHTML = this.content;
    }
}
Components.TableCellString.Namespace=`${moduleName}.Components`;
Components.TableCellString.Tag=`rk-table-cell-string`;
_.Components.TableCellString=Components.TableCellString;
if(!window.customElements.get('rk-table-cell-string')){window.customElements.define('rk-table-cell-string', Components.TableCellString);Aventus.WebComponentInstance.registerDefinition(Components.TableCellString);}

Components.TableCellPicture = class TableCellPicture extends Components.TableCell {
    static get observedAttributes() {return ["src", "full"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'src'() { return this.getStringProp('src') }
    set 'src'(val) { this.setStringAttr('src', val) }get 'full'() { return this.getBoolProp('full') }
    set 'full'(val) { this.setBoolAttr('full', val) }    clone;
    static __style = `:host av-button{display:none}:host .img{border-radius:25px;height:50px;margin:auto;width:50px}:host .img img{object-fit:cover;width:100%;height:100%}:host([full]){position:absolute;inset:0;z-index:200}:host([full]) span{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;padding:40px}:host([full]) span av-button{display:inline-block;width:100px;margin-bottom:20px}:host([full]) span .img{flex-grow:1;width:100%}:host([full]) span .img img{object-fit:contain}`;
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
        blocks: { 'default':`<av-button color="danger" _id="tablecellpicture_0">Fermer</av-button><div class="img" _id="tablecellpicture_1">
		<img loading="lazy" _id="tablecellpicture_2" />
	</div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "tablecellpicture_2°src": {
      "fct": (c) => `${c.print(c.comp.__5c25ad747ea3a14316fd5b29073319bemethod0())}`,
      "once": true
    }
  },
  "pressEvents": [
    {
      "id": "tablecellpicture_0",
      "onPress": (e, pressInstance, c) => { c.comp.setSmaller(e, pressInstance); }
    },
    {
      "id": "tablecellpicture_1",
      "onPress": (e, pressInstance, c) => { c.comp.setBigger(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "TableCellPicture";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('src')){ this['src'] = undefined; }if(!this.hasAttribute('full')) { this.attributeChangedCallback('full', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('src');this.__upgradeProperty('full'); }
    __listBoolProps() { return ["full"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    sortAsc(cell) {
        return 0;
    }
    setContent(data, rowData) {
        this.src = data + "";
    }
    globalSearch(search) {
        return false;
    }
    setBigger() {
        if (this.clone)
            return;
        this.clone = this.cloneNode(true);
        this.clone.full = true;
        this.clone.clone = this;
        document.body.appendChild(this.clone);
    }
    setSmaller() {
        if (this.clone) {
            this.remove();
            this.clone.clone = undefined;
        }
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
    sortAsc(cell) {
        if (this.content == '' && cell.content == '')
            return 0;
        if (this.content == '')
            return 1;
        if (cell.content == '')
            return -1;
        let x = Number(this.content);
        let y = Number(cell.content);
        return x - y;
    }
    setContent(data, rowData) {
        if (!this.contentEl)
            return;
        this.content = Number(data) + "";
        this.contentEl.innerHTML = this.content;
    }
}
Components.TableCellNumber.Namespace=`${moduleName}.Components`;
Components.TableCellNumber.Tag=`rk-table-cell-number`;
_.Components.TableCellNumber=Components.TableCellNumber;
if(!window.customElements.get('rk-table-cell-number')){window.customElements.define('rk-table-cell-number', Components.TableCellNumber);Aventus.WebComponentInstance.registerDefinition(Components.TableCellNumber);}

Components.TableCellHeader = class TableCellHeader extends Components.TableCell {
    get 'sort_direction'() { return this.getStringAttr('sort_direction') }
    set 'sort_direction'(val) { this.setStringAttr('sort_direction', val) }    sortable;
    static __style = `:host .content{display:flex;align-items:center}:host .content .header-name{margin-left:21px}:host .content .sort-direction{margin-left:5px;font-size:var(--font-size);width:16px;height:16px;opacity:0;visibility:none;transform:rotate(180deg);transition:opacity .2s var(--bezier-curve),visibility .2s var(--bezier-curve),transform .4s var(--bezier-curve)}:host([sort_direction=asc]) .content .sort-direction{opacity:1;visibility:visible;transform:rotate(0deg)}:host([sort_direction=desc]) .content .sort-direction{opacity:1;visibility:visible;transform:rotate(180deg)}`;
    __getStatic() {
        return TableCellHeader;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableCellHeader.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot>    <div class="header-name" _id="tablecellheader_0"></div>    <mi-icon icon="expand_less" class="sort-direction"></mi-icon></slot>` }, 
        blocks: { 'default':`<slot>    <div class="header-name" _id="tablecellheader_0"></div>    <mi-icon icon="expand_less" class="sort-direction"></mi-icon></slot>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "headerName",
      "ids": [
        "tablecellheader_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "TableCellHeader";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('sort_direction')){ this['sort_direction'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('sort_direction'); }
    sortAsc(cell) {
        return 0;
    }
    setContent(data, rowData) {
        this.content = data != undefined ? data + "" : "";
        this.headerName.innerHTML = this.content;
    }
    postCreation() {
        new Aventus.PressManager({
            element: this,
            onPress: () => {
                if (this.sortable && this.row?.table) {
                    let current = this.sort_direction;
                    if (!current)
                        current = 'desc';
                    else if (current == 'desc')
                        current = 'asc';
                    else if (current == 'asc')
                        current = undefined;
                    this.row.table.setSortColumn(this.content, current);
                }
            }
        });
    }
}
Components.TableCellHeader.Namespace=`${moduleName}.Components`;
Components.TableCellHeader.Tag=`rk-table-cell-header`;
_.Components.TableCellHeader=Components.TableCellHeader;
if(!window.customElements.get('rk-table-cell-header')){window.customElements.define('rk-table-cell-header', Components.TableCellHeader);Aventus.WebComponentInstance.registerDefinition(Components.TableCellHeader);}

Components.TableDataCellHeaderAction = class TableDataCellHeaderAction extends Components.TableCellHeader {
    static __style = `:host{align-items:center;display:flex;justify-content:end}:host span{align-items:center;display:flex;height:100%}:host mi-icon{color:var(--green);cursor:pointer;border-radius:5px}:host mi-icon:hover{background-color:var(--lighter)}`;
    __getStatic() {
        return TableDataCellHeaderAction;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableDataCellHeaderAction.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<mi-icon icon="add"></mi-icon>` }
    });
}
    getClassName() {
        return "TableDataCellHeaderAction";
    }
    postCreation() {
        new Aventus.PressManager({
            element: this,
            onPress: () => {
                if (this.table instanceof Components.TableData) {
                    this.table.newData();
                }
            }
        });
    }
    setContent(data, rowData) {
    }
}
Components.TableDataCellHeaderAction.Namespace=`${moduleName}.Components`;
Components.TableDataCellHeaderAction.Tag=`rk-table-data-cell-header-action`;
_.Components.TableDataCellHeaderAction=Components.TableDataCellHeaderAction;
if(!window.customElements.get('rk-table-data-cell-header-action')){window.customElements.define('rk-table-data-cell-header-action', Components.TableDataCellHeaderAction);Aventus.WebComponentInstance.registerDefinition(Components.TableDataCellHeaderAction);}

Components.TableRowHeader = class TableRowHeader extends Components.TableRow {
    cells = {};
    static __style = `:host{--_table-cell-vertical-border: var(--_table-row-header-vertical-border);width:100%}:host .row-content{background-color:var(--_table-row-header-backgroud-color);border-bottom:var(--_table-row-header-horizontal-border);color:var(--_table-row-header-color);display:flex;flex-direction:row;height:var(--_table-row-header-height);width:100%}`;
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
    getContent(cellConfig, data) {
        return cellConfig.displayName;
    }
    addCellOption(cell, cellConfig, data) {
        if (cell instanceof Components.TableCellHeader) {
            if (cellConfig.sortable !== undefined) {
                cell.sortable = cellConfig.sortable;
            }
            else {
                cell.sortable = this.options.sortable;
            }
        }
    }
    getCell(cellConfig) {
        return cellConfig.cellHeader ?? Components.TableCellHeader;
    }
    init(options, data) {
        super.init(options, data);
    }
}
Components.TableRowHeader.Namespace=`${moduleName}.Components`;
Components.TableRowHeader.Tag=`rk-table-row-header`;
_.Components.TableRowHeader=Components.TableRowHeader;
if(!window.customElements.get('rk-table-row-header')){window.customElements.define('rk-table-row-header', Components.TableRowHeader);Aventus.WebComponentInstance.registerDefinition(Components.TableRowHeader);}

Components.TableCellEnum = class TableCellEnum extends Components.TableCell {
    enumEl;
    static __style = ``;
    constructor() {
            super();
            this.enumEl = this.defineEnum();
if (this.constructor == TableCellEnum) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return TableCellEnum;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableCellEnum.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "TableCellEnum";
    }
    sortAsc(cell) {
        let value = this.content;
        let valueCell = cell.content;
        return value.localeCompare(valueCell);
    }
    getEnumName(value) {
        return this.enumEl[value];
    }
    setContent(data, rowData) {
        if (!this.contentEl)
            return;
        this.content = data != undefined ? this.getEnumName(data) : "";
        this.contentEl.innerHTML = this.content;
    }
}
Components.TableCellEnum.Namespace=`${moduleName}.Components`;
_.Components.TableCellEnum=Components.TableCellEnum;

Components.TableCellDate = class TableCellDate extends Components.TableCell {
    date;
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
    sortAsc(cell) {
        if (cell.date?.toISOString() == this.date?.toISOString())
            return 0;
        if (this.date && !cell.date)
            return -1;
        if (!this.date && cell.date)
            return 1;
        if (this.date && cell.date)
            return this.date.getTime() - cell.date.getTime();
        return 0;
    }
    setContent(data, rowData) {
        if (!this.contentEl)
            return;
        if (data instanceof Date) {
            this.date = data;
            this.content = data.toLocaleDateString(undefined, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        }
        else {
            this.content = '';
        }
        this.contentEl.innerHTML = this.content;
    }
}
Components.TableCellDate.Namespace=`${moduleName}.Components`;
Components.TableCellDate.Tag=`rk-table-cell-date`;
_.Components.TableCellDate=Components.TableCellDate;
if(!window.customElements.get('rk-table-cell-date')){window.customElements.define('rk-table-cell-date', Components.TableCellDate);Aventus.WebComponentInstance.registerDefinition(Components.TableCellDate);}

Components.TableCellCustom = class TableCellCustom extends Components.TableCell {
    static __style = ``;
    __getStatic() {
        return TableCellCustom;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableCellCustom.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`` }
    });
}
    getClassName() {
        return "TableCellCustom";
    }
    sortAsc(cell) {
        let value = this.content;
        let valueCell = cell.content;
        return value.localeCompare(valueCell);
    }
    setContent(data, rowData) {
        this.content = data != undefined ? data + "" : "";
        this.contentEl.innerHTML = this.content;
    }
}
Components.TableCellCustom.Namespace=`${moduleName}.Components`;
Components.TableCellCustom.Tag=`rk-table-cell-custom`;
_.Components.TableCellCustom=Components.TableCellCustom;
if(!window.customElements.get('rk-table-cell-custom')){window.customElements.define('rk-table-cell-custom', Components.TableCellCustom);Aventus.WebComponentInstance.registerDefinition(Components.TableCellCustom);}

const TableCellCheckbox = class TableCellCheckbox extends Components.TableCell {
    static __style = `:host span{cursor:pointer}`;
    __getStatic() {
        return TableCellCheckbox;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableCellCheckbox.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<rk-checkbox _id="tablecellcheckbox_0"></rk-checkbox>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "checkboxEl",
      "ids": [
        "tablecellcheckbox_0"
      ]
    }
  ],
  "events": [
    {
      "eventName": "onChange",
      "id": "tablecellcheckbox_0",
      "fct": (c, ...args) => c.comp.changed.apply(c.comp, ...args),
      "isCallback": true
    }
  ]
}); }
    getClassName() {
        return "TableCellCheckbox";
    }
    sortAsc(cell) {
        return 0;
    }
    setContent(data, rowData) {
    }
    changed() {
        if (this.checkboxEl.value) {
            this.table.selectRow(this.row);
        }
        else {
            this.table.unselectRow(this.row);
        }
    }
}
TableCellCheckbox.Namespace=`${moduleName}`;
TableCellCheckbox.Tag=`rk-table-cell-checkbox`;
_.TableCellCheckbox=TableCellCheckbox;
if(!window.customElements.get('rk-table-cell-checkbox')){window.customElements.define('rk-table-cell-checkbox', TableCellCheckbox);Aventus.WebComponentInstance.registerDefinition(TableCellCheckbox);}

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
    sortAsc(cell) {
        let x = this.content == 'Oui';
        let y = cell.content == 'Oui';
        return (x === y) ? 0 : x ? -1 : 1;
    }
    setContent(data, rowData) {
        if (!this.contentEl)
            return;
        if (data === true || data === 1 || data === 'true') {
            this.content = 'Oui';
        }
        else {
            this.content = 'Non';
        }
        this.contentEl.innerHTML = this.content;
    }
}
Components.TableCellBoolean.Namespace=`${moduleName}.Components`;
Components.TableCellBoolean.Tag=`rk-table-cell-boolean`;
_.Components.TableCellBoolean=Components.TableCellBoolean;
if(!window.customElements.get('rk-table-cell-boolean')){window.customElements.define('rk-table-cell-boolean', Components.TableCellBoolean);Aventus.WebComponentInstance.registerDefinition(Components.TableCellBoolean);}

Components.TableCellAction = class TableCellAction extends Components.TableCell {
    static __style = ``;
    __getStatic() {
        return TableCellAction;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableCellAction.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "TableCellAction";
    }
    sortAsc(cell) {
        return 0;
    }
    setContent(data, rowData) {
    }
}
Components.TableCellAction.Namespace=`${moduleName}.Components`;
Components.TableCellAction.Tag=`rk-table-cell-action`;
_.Components.TableCellAction=Components.TableCellAction;
if(!window.customElements.get('rk-table-cell-action')){window.customElements.define('rk-table-cell-action', Components.TableCellAction);Aventus.WebComponentInstance.registerDefinition(Components.TableCellAction);}

Components.TableData = class TableData extends Components.Table {
    get 'add_btn'() { return this.getBoolAttr('add_btn') }
    set 'add_btn'(val) { this.setBoolAttr('add_btn', val) }    application;
    static __style = `:host{position:relative}:host .add-btn{bottom:10px;display:none;position:absolute;right:10px;z-index:10;box-shadow:var(--elevation-4)}:host([grid][add_btn]) .add-btn{display:block}`;
    constructor() { super(); if (this.constructor == TableData) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return TableData;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableData.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot><rk-button-icon-mi icon="add" class="add-btn touch" _id="tabledata_0"></rk-button-icon-mi>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "tabledata_0",
      "onPress": (e, pressInstance, c) => { c.comp.newData(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "TableData";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('add_btn')) { this.attributeChangedCallback('add_btn', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('add_btn'); }
    __listBoolProps() { return ["add_btn"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    async loadData() {
        let ram = this.defineRAM();
        this.data = await this.application?.executeWithLoading(ram.getListWithError());
        ram.onCreated((data) => {
            if (!this.data) {
                this.data = [data];
            }
            else {
                this.data.push(data);
            }
        });
        ram.onDeleted((data) => {
            if (!this.data)
                return;
            const index = this.data.findIndex(p => p.Id == data.Id);
            if (index != -1) {
                this.data.splice(index, 1);
            }
        });
        ram.onUpdated((data) => {
            if (!this.data) {
                this.data = [data];
            }
            else {
                const index = this.data.findIndex(p => p.Id == data.Id);
                if (index != -1) {
                    this.filterData(true);
                }
            }
        });
    }
    async newData() {
        let state = this.defineNewState();
        await this.application?.navigate(state);
    }
    async editData(data) {
        let cloneData = data.clone();
        let state = this.defineEditState(cloneData);
        await this.application?.navigate(state);
    }
    async deleteData(data) {
        const message = this.defineDeleteMessage(data);
        let confirm = await this.application?.confirm({
            title: "Confirmation de suppression",
            description: message
        });
        if (confirm) {
            let ram = this.defineRAM();
            await this.application?.executeWithLoading(ram.deleteWithError(data));
            this.data = await this.application?.executeWithLoading(ram.getListWithError());
        }
    }
    normalizeSchemaCell(cellConfig) {
        super.normalizeSchemaCell(cellConfig);
        if (cellConfig.cellHeader == Components.TableDataCellHeaderAction) {
            this.add_btn = true;
        }
    }
    postCreation() {
        super.postCreation();
        this.application = this.findParentByType(System.Application) ?? undefined;
        this.loadData();
    }
}
Components.TableData.Namespace=`${moduleName}.Components`;
_.Components.TableData=Components.TableData;

Components.TableDataCellAction = class TableDataCellAction extends Components.TableCellAction {
    static __style = `:host{padding:0 7px;justify-content:flex-end}:host mi-icon{font-size:var(--font-size-md);color:var(--blue);margin:0 2px;padding:3px;cursor:pointer;transition:background-color .2s linear;border-radius:5px}:host mi-icon.delete{color:var(--red)}:host mi-icon:hover{background-color:var(--lighter)}:host([grid]){margin-top:0;align-items:center;width:100%}`;
    __getStatic() {
        return TableDataCellAction;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableDataCellAction.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<mi-icon icon="edit" _id="tabledatacellaction_0"></mi-icon><mi-icon class="delete" icon="delete" _id="tabledatacellaction_1"></mi-icon>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "tabledatacellaction_0",
      "onPress": (e, pressInstance, c) => { c.comp.editData(e, pressInstance); }
    },
    {
      "id": "tabledatacellaction_1",
      "onPress": (e, pressInstance, c) => { c.comp.deleteData(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "TableDataCellAction";
    }
    editData() {
        if (this.table instanceof Components.TableData) {
            this.table.editData(this.data);
        }
    }
    deleteData() {
        if (this.table instanceof Components.TableData) {
            this.table.deleteData(this.data);
        }
    }
}
Components.TableDataCellAction.Namespace=`${moduleName}.Components`;
Components.TableDataCellAction.Tag=`rk-table-data-cell-action`;
_.Components.TableDataCellAction=Components.TableDataCellAction;
if(!window.customElements.get('rk-table-data-cell-action')){window.customElements.define('rk-table-data-cell-action', Components.TableDataCellAction);Aventus.WebComponentInstance.registerDefinition(Components.TableDataCellAction);}

App.AppError=class AppError extends Aventus.GenericError {
    static get Fullname() { return "Core.App.AppError, Core"; }
}
App.AppError.Namespace=`${moduleName}.App`;
App.AppError.$schema={...(Aventus.GenericError?.$schema ?? {}), };
Aventus.Converter.register(App.AppError.Fullname, App.AppError);

_.App.AppError=App.AppError;
Errors.DesktopError=class DesktopError extends Aventus.GenericError {
    static get Fullname() { return "Core.Logic.DesktopError, Core"; }
}
Errors.DesktopError.Namespace=`${moduleName}.Errors`;
Errors.DesktopError.$schema={...(Aventus.GenericError?.$schema ?? {}), };
Aventus.Converter.register(Errors.DesktopError.Fullname, Errors.DesktopError);

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
Permissions.ApplicationPermissionQuery.Namespace=`${moduleName}.Permissions`;
Permissions.ApplicationPermissionQuery.$schema={...(Permissions.PermissionQuery?.$schema ?? {}), };
Aventus.Converter.register(Permissions.ApplicationPermissionQuery.Fullname, Permissions.ApplicationPermissionQuery);

_.Permissions.ApplicationPermissionQuery=Permissions.ApplicationPermissionQuery;
Permissions.DesktopPermissionQuery=class DesktopPermissionQuery extends Permissions.PermissionQuery {
    static get Fullname() { return "Core.Permissions.DesktopPermissionQuery, Core"; }
}
Permissions.DesktopPermissionQuery.Namespace=`${moduleName}.Permissions`;
Permissions.DesktopPermissionQuery.$schema={...(Permissions.PermissionQuery?.$schema ?? {}), };
Aventus.Converter.register(Permissions.DesktopPermissionQuery.Fullname, Permissions.DesktopPermissionQuery);

_.Permissions.DesktopPermissionQuery=Permissions.DesktopPermissionQuery;
Errors.ImageFileError=class ImageFileError extends Aventus.GenericError {
    static get Fullname() { return "Core.Tools.ImageFileError, Core"; }
}
Errors.ImageFileError.Namespace=`${moduleName}.Errors`;
Errors.ImageFileError.$schema={...(Aventus.GenericError?.$schema ?? {}), };
Aventus.Converter.register(Errors.ImageFileError.Fullname, Errors.ImageFileError);

_.Errors.ImageFileError=Errors.ImageFileError;
Tools.ResultWithImageFileError=class ResultWithImageFileError extends AventusSharp.Tools.ResultWithError {
    static get Fullname() { return "Core.Tools.ResultWithImageFileError, Core"; }
}
Tools.ResultWithImageFileError.Namespace=`${moduleName}.Tools`;
Tools.ResultWithImageFileError.$schema={...(AventusSharp.Tools.ResultWithError?.$schema ?? {}), };
Aventus.Converter.register(Tools.ResultWithImageFileError.Fullname, Tools.ResultWithImageFileError);

_.Tools.ResultWithImageFileError=Tools.ResultWithImageFileError;
Tools.VoidWithImageFileError=class VoidWithImageFileError extends AventusSharp.Tools.VoidWithError {
    static get Fullname() { return "Core.Tools.VoidWithImageFileError, Core"; }
}
Tools.VoidWithImageFileError.Namespace=`${moduleName}.Tools`;
Tools.VoidWithImageFileError.$schema={...(AventusSharp.Tools.VoidWithError?.$schema ?? {}), };
Aventus.Converter.register(Tools.VoidWithImageFileError.Fullname, Tools.VoidWithImageFileError);

_.Tools.VoidWithImageFileError=Tools.VoidWithImageFileError;
Errors.PdfError=class PdfError extends Aventus.GenericError {
    static get Fullname() { return "Core.Tools.PdfError, Core"; }
}
Errors.PdfError.Namespace=`${moduleName}.Errors`;
Errors.PdfError.$schema={...(Aventus.GenericError?.$schema ?? {}), };
Aventus.Converter.register(Errors.PdfError.Fullname, Errors.PdfError);

_.Errors.PdfError=Errors.PdfError;
Tools.ResultWithPdfError=class ResultWithPdfError extends AventusSharp.Tools.ResultWithError {
    static get Fullname() { return "Core.Tools.ResultWithPdfError, Core"; }
}
Tools.ResultWithPdfError.Namespace=`${moduleName}.Tools`;
Tools.ResultWithPdfError.$schema={...(AventusSharp.Tools.ResultWithError?.$schema ?? {}), };
Aventus.Converter.register(Tools.ResultWithPdfError.Fullname, Tools.ResultWithPdfError);

_.Tools.ResultWithPdfError=Tools.ResultWithPdfError;
Tools.VoidWithPdfError=class VoidWithPdfError extends AventusSharp.Tools.VoidWithError {
    static get Fullname() { return "Core.Tools.VoidWithPdfError, Core"; }
}
Tools.VoidWithPdfError.Namespace=`${moduleName}.Tools`;
Tools.VoidWithPdfError.$schema={...(AventusSharp.Tools.VoidWithError?.$schema ?? {}), };
Aventus.Converter.register(Tools.VoidWithPdfError.Fullname, Tools.VoidWithPdfError);

_.Tools.VoidWithPdfError=Tools.VoidWithPdfError;
Websocket.RayukiEndPointType= AventusSharp.WebSocket.EndPoint.WithRoute({
    routes: Websocket.RayukiEndPointRoutes,
    events: Websocket.RayukiEndPointEvents
});

_.Websocket.RayukiEndPointType=Websocket.RayukiEndPointType;
Websocket.RayukiEndPoint=class RayukiEndPoint extends Websocket.RayukiEndPointType {
}
Websocket.RayukiEndPoint.Namespace=`${moduleName}.Websocket`;

_.Websocket.RayukiEndPoint=Websocket.RayukiEndPoint;

for(let key in _) { Core[key] = _[key] }
})(Core);
