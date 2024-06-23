var Univer;
(Univer||(Univer = {}));
(function (Univer) {
const moduleName = `Univer`;
const _ = {};


let _n;
const Loader=class Loader {
    static urls = {
        main: "https://store.aventusjs.com/libs/Univer/1_0_0/univer.full.umd.js",
        style: "https://store.aventusjs.com/libs/Univer/1_0_0/univer.css.php",
        locales: {
            "en-US": "https://store.aventusjs.com/libs/Univer/1_0_0/en-US.js",
            "ru-RU": "https://store.aventusjs.com/libs/Univer/1_0_0/ru-RU.js",
            "zh-CN": "https://store.aventusjs.com/libs/Univer/1_0_0/zh-CN.js",
        }
    };
    static defaultLocale = "en-US";
    static setMainUrl(url) {
        this.urls.main = url;
    }
    static setStyleUrl(url) {
        this.urls.style = url;
    }
    static setLangUrl(locale, url) {
        this.urls.locales[locale] = url;
    }
    static setLang(locale) {
        this.defaultLocale = locale;
    }
    static async loadLang(locale) {
        return await Aventus.ResourceLoader.loadInHead({
            type: "js",
            url: this.urls.locales[locale]
        });
    }
    static async loadStyle(name) {
        const result = await Aventus.ResourceLoader.load({
            type: "css",
            url: this.urls.style
        });
        let style = document.createElement("style");
        style.innerHTML = result;
        document.head.appendChild(style);
        return await Aventus.Style.store(name, result);
    }
    static async loadMain() {
        return await Aventus.ResourceLoader.loadInHead({
            type: "js",
            url: this.urls.main
        });
    }
    static isFirst = true;
    static async init(locale) {
        await Loader.loadLang(locale);
        if (this.isFirst) {
            this.isFirst = false;
            await Loader.loadStyle("Univer");
            await Loader.loadMain();
            const style = Aventus.Style.get("UniverTheme");
            const _setTheme = UniverDesign.themeInstance.setTheme.bind(UniverDesign.themeInstance);
            UniverDesign.themeInstance.setTheme = function (root, theme) {
                _setTheme(root, theme);
                style.replaceSync(UniverDesign.themeInstance['_styleSheet'].innerHTML);
            };
            // document.getElementById(UniverDesign.themeInstance['_themeRootName'])?.remove();
        }
    }
}
Loader.Namespace=`Univer`;

_.Loader=Loader;
const UDoc = class UDoc extends Aventus.WebComponent {
    api;
    static __style = `:host{height:100%;width:100%}:host .container{height:100%;width:100%}`;
    __getStatic() {
        return UDoc;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(UDoc.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="container" _id="udoc_0"></div><slot></slot>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "container",
      "ids": [
        "udoc_0"
      ]
    }
  ]
});
 }
    getClassName() {
        return "UDoc";
    }
    styleBefore(addStyle) {
        super.styleBefore(addStyle);
        addStyle("Univer");
        addStyle("UniverTheme");
    }
    async init() {
        await Loader.init("en-US");
        var univer = new UniverCore.Univer({
            theme: UniverDesign.defaultTheme,
            locale: UniverCore.LocaleType.EN_US,
            locales: {
                [UniverCore.LocaleType.EN_US]: UniverUMD['en-US'],
            },
        });
        univer.registerPlugin(UniverEngineRender.UniverRenderEnginePlugin);
        univer.registerPlugin(UniverEngineFormula.UniverFormulaEnginePlugin);
        univer.registerPlugin(UniverUi.UniverUIPlugin, {
            container: this.container,
        });
        univer.registerPlugin(UniverDocs.UniverDocsPlugin, {
            hasScroll: false,
        });
        univer.registerPlugin(UniverDocsUi.UniverDocsUIPlugin);
        univer.registerPlugin(UniverSheets.UniverSheetsPlugin);
        univer.registerPlugin(UniverSheetsUi.UniverSheetsUIPlugin);
        univer.registerPlugin(UniverSheetsNumfmt.UniverSheetsNumfmtPlugin);
        univer.registerPlugin(UniverSheetsFormula.UniverSheetsFormulaPlugin);
        let oldDoc = localStorage.getItem("doc_save") ?? '{}';
        univer.createUnit(UniverCore.UniverInstanceType.UNIVER_DOC, JSON.parse(oldDoc));
        this.api = UniverFacade.FUniver.newAPI(univer);
    }
    save() {
        let result = this.api.getActiveDocument()?.getSnapshot();
        console.log(result);
        localStorage.setItem("doc_save", JSON.stringify(result));
    }
    postCreation() {
        this.init();
    }
}
UDoc.Namespace=`${moduleName}`;
UDoc.Tag=`av-u-doc`;
_.UDoc=UDoc;
if(!window.customElements.get('av-u-doc')){window.customElements.define('av-u-doc', UDoc);Aventus.WebComponentInstance.registerDefinition(UDoc);}

const USheet = class USheet extends Aventus.WebComponent {
    static __style = `:host{height:100%;width:100%}:host .container{height:100%;width:100%}`;
    __getStatic() {
        return USheet;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(USheet.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="container" _id="usheet_0"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "container",
      "ids": [
        "usheet_0"
      ]
    }
  ]
});
 }
    getClassName() {
        return "USheet";
    }
    styleBefore(addStyle) {
        super.styleBefore(addStyle);
        addStyle("Univer");
        addStyle("UniverTheme");
    }
    async init() {
        await Loader.init("en-US");
        var univer = new UniverCore.Univer({
            theme: UniverDesign.defaultTheme,
            locale: UniverCore.LocaleType.EN_US,
            locales: {
                [UniverCore.LocaleType.EN_US]: UniverUMD['en-US'],
            },
        });
        univer.registerPlugin(UniverEngineRender.UniverRenderEnginePlugin);
        univer.registerPlugin(UniverEngineFormula.UniverFormulaEnginePlugin);
        univer.registerPlugin(UniverUi.UniverUIPlugin, {
            container: this.container,
        });
        univer.registerPlugin(UniverDocs.UniverDocsPlugin, {
            hasScroll: false,
        });
        univer.registerPlugin(UniverDocsUi.UniverDocsUIPlugin);
        univer.registerPlugin(UniverSheets.UniverSheetsPlugin);
        univer.registerPlugin(UniverSheetsUi.UniverSheetsUIPlugin);
        univer.registerPlugin(UniverSheetsNumfmt.UniverSheetsNumfmtPlugin);
        univer.registerPlugin(UniverSheetsFormula.UniverSheetsFormulaPlugin);
        univer.createUnit(UniverCore.UniverInstanceType.UNIVER_SHEET, {});
        const univerAPI = UniverFacade.FUniver.newAPI(univer);
    }
    postCreation() {
        this.init();
    }
}
USheet.Namespace=`${moduleName}`;
USheet.Tag=`av-u-sheet`;
_.USheet=USheet;
if(!window.customElements.get('av-u-sheet')){window.customElements.define('av-u-sheet', USheet);Aventus.WebComponentInstance.registerDefinition(USheet);}


for(let key in _) { Univer[key] = _[key] }
})(Univer);
