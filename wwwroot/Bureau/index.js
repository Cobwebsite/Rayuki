
var Bureau;
(Bureau||(Bureau = {}));
(function (Bureau) {
const moduleName = `Bureau`;
const _ = {};

const Data = {};
_.Data = {};
const Routes = {};
_.Routes = {};
const Frame = {};
_.Frame = {};
const Component = {};
_.Component = {};
let _n;
Data.Telechargement=class Telechargement extends AventusSharp.Data.Storable {
    static get Fullname() { return "Bureau.Data.Telechargement, Bureau"; }
    Name = null;
    Url = null;
}
Data.Telechargement.$schema={"Name":"string","Url":"string"};Aventus.DataManager.register(Data.Telechargement.Fullname, Data.Telechargement);Data.Telechargement.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Telechargement.Fullname, Data.Telechargement);
_.Data.Telechargement=Data.Telechargement;
Data.Planning=class Planning extends AventusSharp.Data.Storable {
    static get Fullname() { return "Bureau.Data.Planning, Bureau"; }
    Annee = null;
    Date = null;
    NbHeure = null;
}
Data.Planning.$schema={"Annee":"number","Date":"Date","NbHeure":"number"};Aventus.DataManager.register(Data.Planning.Fullname, Data.Planning);Data.Planning.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Planning.Fullname, Data.Planning);
_.Data.Planning=Data.Planning;
Data.MoisFini=class MoisFini extends AventusSharp.Data.Storable {
    static get Fullname() { return "Bureau.Data.MoisFini, Bureau"; }
    Annee = null;
    Mois = null;
}
Data.MoisFini.$schema={"Annee":"number","Mois":"number"};Aventus.DataManager.register(Data.MoisFini.Fullname, Data.MoisFini);Data.MoisFini.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.MoisFini.Fullname, Data.MoisFini);
_.Data.MoisFini=Data.MoisFini;
Data.EmailNotification=class EmailNotification extends AventusSharp.Data.Storable {
    static get Fullname() { return "Bureau.Data.EmailNotification, Bureau"; }
    Email = null;
}
Data.EmailNotification.$schema={"Email":"string"};Aventus.DataManager.register(Data.EmailNotification.Fullname, Data.EmailNotification);Data.EmailNotification.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.EmailNotification.Fullname, Data.EmailNotification);
_.Data.EmailNotification=Data.EmailNotification;
Data.Chantier=class Chantier extends AventusSharp.Data.Storable {
    static get Fullname() { return "Bureau.Data.Chantier, Bureau"; }
    Name = "";
    IsOpen = true;
    IsSpecial = false;
}
Data.Chantier.$schema={"Name":"string","IsOpen":"boolean","IsSpecial":"boolean"};Aventus.DataManager.register(Data.Chantier.Fullname, Data.Chantier);Data.Chantier.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Chantier.Fullname, Data.Chantier);
_.Data.Chantier=Data.Chantier;
Data.BureauUnit=class BureauUnit extends AventusSharp.Data.Storable {
    static get Fullname() { return "Bureau.Data.BureauUnit, Bureau"; }
    Name = "";
}
Data.BureauUnit.$schema={"Name":"string"};Aventus.DataManager.register(Data.BureauUnit.Fullname, Data.BureauUnit);Data.BureauUnit.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.BureauUnit.Fullname, Data.BureauUnit);
_.Data.BureauUnit=Data.BureauUnit;
Routes.BureauUnitRoute=class BureauUnitRoute extends AventusSharp.Routes.StorableRoute {
    async MyCustomRoute() {
        const request = new Aventus.HttpRequest(`/custom`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    StorableName() {
        return "BureauUnit";
    }
}
Routes.BureauUnitRoute.Namespace=`${moduleName}.Routes`;
_.Routes.BureauUnitRoute=Routes.BureauUnitRoute;
Data.User=class User extends Core.Data.User {
    static get Fullname() { return "Bureau.Data.User, Bureau"; }
    Email = "";
}
Data.User.$schema={"Email":"string"};Aventus.DataManager.register(Data.User.Fullname, Data.User);Data.User.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.User.Fullname, Data.User);
_.Data.User=Data.User;
Data.Repas=class Repas extends AventusSharp.Data.Storable {
    static get Fullname() { return "Bureau.Data.Repas, Bureau"; }
    User = null;
    Date = null;
}
Data.Repas.$schema={"User":""+moduleName+".Data.User","Date":"Date"};Aventus.DataManager.register(Data.Repas.Fullname, Data.Repas);Data.Repas.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Repas.Fullname, Data.Repas);
_.Data.Repas=Data.Repas;
Data.Remboursement=class Remboursement extends AventusSharp.Data.Storable {
    static get Fullname() { return "Bureau.Data.Remboursement, Bureau"; }
    User = null;
    Date = null;
    Rendu = null;
}
Data.Remboursement.$schema={"User":""+moduleName+".Data.User","Date":"Date","Rendu":"boolean"};Aventus.DataManager.register(Data.Remboursement.Fullname, Data.Remboursement);Data.Remboursement.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Remboursement.Fullname, Data.Remboursement);
_.Data.Remboursement=Data.Remboursement;
Data.Maladie=class Maladie extends AventusSharp.Data.Storable {
    static get Fullname() { return "Bureau.Data.Maladie, Bureau"; }
    User = null;
    Date = null;
    Percent = null;
}
Data.Maladie.$schema={"User":""+moduleName+".Data.User","Date":"Date","Percent":"number"};Aventus.DataManager.register(Data.Maladie.Fullname, Data.Maladie);Data.Maladie.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Maladie.Fullname, Data.Maladie);
_.Data.Maladie=Data.Maladie;
Data.Horaire=class Horaire extends AventusSharp.Data.Storable {
    static get Fullname() { return "Bureau.Data.Horaire, Bureau"; }
    User = null;
    Chantier = null;
    Date = null;
    NbHeure = null;
}
Data.Horaire.$schema={"User":""+moduleName+".Data.User","Chantier":""+moduleName+".Data.Chantier","Date":"Date","NbHeure":"number"};Aventus.DataManager.register(Data.Horaire.Fullname, Data.Horaire);Data.Horaire.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Horaire.Fullname, Data.Horaire);
_.Data.Horaire=Data.Horaire;
Data.Deplacement=class Deplacement extends AventusSharp.Data.Storable {
    static get Fullname() { return "Bureau.Data.Deplacement, Bureau"; }
    Date = null;
    Distance = null;
    User = null;
}
Data.Deplacement.$schema={"Date":"Date","Distance":"number","User":""+moduleName+".Data.User"};Aventus.DataManager.register(Data.Deplacement.Fullname, Data.Deplacement);Data.Deplacement.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Deplacement.Fullname, Data.Deplacement);
_.Data.Deplacement=Data.Deplacement;
(function (AccidentSize) {
    AccidentSize[AccidentSize["Gauche"] = 0] = "Gauche";
    AccidentSize[AccidentSize["Droite"] = 1] = "Droite";
    AccidentSize[AccidentSize["Deux"] = 2] = "Deux";
})(Data.AccidentSize || (Data.AccidentSize = {}));

_.Data.AccidentSize=Data.AccidentSize;
Frame.Index = class Index extends Core.Frame {
    static __style = `:root{--primary-color-opacity: rgb(220, 220, 220, 0.9);--primary-color: rgb(220, 220, 220, 1);--secondary-color: #a5a5a5;--secondary-color-active: #7a7a7a;--text-color: rgb(30, 30, 30);--text-disable: rgb(180, 180, 180);--primary-font-family: "Roboto", sans-serif;--lighter: rgb(125, 125, 125, 0.2);--lighter-active: rgb(125, 125, 125, 0.4);--darker: rgb(30, 30, 30, 0.2);--darker-active: rgb(30, 30, 30, 0.4);--soft-emphasize: var(--darker);--emphasize: var(--darker-active);--green: #71e271;--red: #d43434;--orange: #e4b349;--blue: #2835c2;--font-size: 16px;--font-size-sm: calc(var(--font-size) * 0.75);--font-size-md: calc(var(--font-size) * 1.25);--font-size-lg: calc(var(--font-size) * 1.5);--font-size-input: calc(var(--font-size) * 0.9);--bezier-curve: cubic-bezier(0.65, 0, 0.15, 1);--input-background-color: white}:host .content{display:flex;height:calc(100% - 30px);margin:0;position:relative;width:100%}:host .content .sidenav{background-color:var(--secondary-color);box-shadow:1px 0px 5px var(--darker-active);height:100%;width:200px}:host .content .sidenav .sidenav-item{align-items:center;border-bottom:1px solid var(--lighter-active);cursor:pointer;display:flex;flex-wrap:nowrap;height:51px;padding:10px;transition:linear background-color .3s}:host .content .sidenav .sidenav-item av-img{--img-fill-color: var(--text-color);height:30px;width:30px}:host .content .sidenav .sidenav-item span{color:var(--text-color);margin-left:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:calc(100% - 30px)}:host .content .container{height:100%;width:calc(100% - 200px)}@media screen and (min-width: 1225px){:host .content .sidenav .sidenav-item:hover{background-color:var(--lighter-active)}}`;
    constructor() {
			super();
			this.frame_title = "Bureau"
		}
    __getStatic() {
        return Index;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Index.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="sidenav">    <av-scrollable auto_hide>        <div class="sidenav-item">            <av-img src="/apps/Bureau/img/calendar.svg"></av-img>            <span>Calendrier</span>        </div>        <div class="sidenav-item">            <av-img src="/apps/Bureau/img/calendar.svg"></av-img>            <span>Calendrier</span>        </div>        <div class="sidenav-item">            <av-img src="/apps/Bureau/img/calendar.svg"></av-img>            <span>Calendrier</span>        </div>    </av-scrollable></div><div class="container">    <av-app>    </av-app></div>` }
    });
}
    getClassName() {
        return "Index";
    }
}
Frame.Index.Namespace=`${moduleName}.Frame`;
Frame.Index.Tag=`bureau-index`;
_.Frame.Index=Frame.Index;
if(!window.customElements.get('bureau-index')){window.customElements.define('bureau-index', Frame.Index);Aventus.WebComponentInstance.registerDefinition(Frame.Index);}

Component.Calendar = class Calendar extends Aventus.WebComponent {
    static get observedAttributes() {return ["year"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'year'() { return this.getNumberProp('year') }
    set 'year'(val) { this.setNumberAttr('year', val) }    months = [
        {
            long: "Janvier",
            short: "Jan"
        }, {
            long: "Février",
            short: "Fev"
        }, {
            long: "Mars",
            short: "Mar"
        }, {
            long: "Avril",
            short: "Avr"
        }, {
            long: "Mai",
            short: "Mai"
        }, {
            long: "Juin",
            short: "Juin"
        }, {
            long: "Juillet",
            short: "Juil"
        }, {
            long: "Août",
            short: "Aoû"
        }, {
            long: "Septembre",
            short: "Sep"
        }, {
            long: "Octobre",
            short: "Oct"
        }, {
            long: "Novembre",
            short: "Nov"
        }, {
            long: "Décembre",
            short: "Déc"
        }
    ];
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("year", ((target) => {
    target.render();
})); }
    static __style = `:host{background-color:#fff;height:100%;padding:30px;width:100%;min-width:1000px}:host .year{font-size:20px;font-weight:bold;margin:20px;text-align:center}:host .container{display:flex}:host .container .jours{border-left:1px solid #000;border-top:1px solid #000;display:flex;flex-direction:column;font-weight:bold;margin-top:29px;text-align:center;width:50px}:host .container .jours div{align-items:center;border-bottom:1px solid #000;display:flex;height:30px;justify-content:center}:host .months-container{display:flex;width:calc(100% - 50px)}:host .months-container .month{border-right:1px solid #000;width:8.3333333333%}:host .months-container .month .month-name{border-top:1px solid #000;font-weight:bold;overflow:hidden;text-overflow:ellipsis}:host .months-container .month div{align-items:center;border-bottom:1px solid #000;display:flex;height:30px;justify-content:center}:host .months-container .month:first-child div{border-left:1px solid #000}`;
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
        blocks: { 'default':`<div class="year" _id="calendar_0"></div><div class="container">    <div class="jours" _id="calendar_1"></div>    <div class="months-container" _id="calendar_2"></div></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "jours",
      "ids": [
        "calendar_1"
      ]
    },
    {
      "name": "monthsContainer",
      "ids": [
        "calendar_2"
      ]
    }
  ],
  "content": {
    "calendar_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__fb7ece9fd54cef8ddb37a918942724c5method0())}`,
      "once": true
    }
  }
}); }
    getClassName() {
        return "Calendar";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('year')){ this['year'] = new Date().getFullYear(); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('year'); }
    render() {
        this.jours.innerHTML = "";
        this.monthsContainer.innerHTML = "";
        for (let i = 0; i < 31; i++) {
            let el = document.createElement("DIV");
            el.innerHTML = i + 1 + "";
            this.jours.appendChild(el);
        }
        let date = new Date(this.year, 0, 1, 0, 0, 0);
        let monthContainer;
        while (date.getFullYear() == this.year) {
            if (date.getDate() == 1) {
                monthContainer = document.createElement("DIV");
                monthContainer.classList.add("month");
                this.monthsContainer.appendChild(monthContainer);
                let monthName = document.createElement("DIV");
                monthName.classList.add("month-name");
                monthName.innerHTML = this.months[date.getMonth()].long;
                monthContainer.appendChild(monthName);
            }
            let el = document.createElement("DIV");
            el.innerHTML = date.getDate() + "";
            el.dataset.date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
            monthContainer.appendChild(el);
            date.setDate(date.getDate() + 1);
        }
        for (let i = 0; i < this.months.length; i++) {
        }
    }
    __fb7ece9fd54cef8ddb37a918942724c5method0() {
        return year;
    }
}
Component.Calendar.Namespace=`${moduleName}.Component`;
Component.Calendar.Tag=`bureau-calendar`;
_.Component.Calendar=Component.Calendar;
if(!window.customElements.get('bureau-calendar')){window.customElements.define('bureau-calendar', Component.Calendar);Aventus.WebComponentInstance.registerDefinition(Component.Calendar);}

Data.Accident=class Accident extends AventusSharp.Data.Storable {
    static get Fullname() { return "Bureau.Data.Accident, Bureau"; }
    Date = null;
    Lieu = "";
    Deroulement = "";
    Partie = "";
    Cote = Data.AccidentSize.Deux;
    Type = "";
    Medecin1 = "";
    Medecin2 = "";
    User = null;
}
Data.Accident.$schema={"Date":"Date","Lieu":"string","Deroulement":"string","Partie":"string","Cote":"AccidentSize","Type":"string","Medecin1":"string","Medecin2":"string","User":""+moduleName+".Data.User"};Aventus.DataManager.register(Data.Accident.Fullname, Data.Accident);Data.Accident.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Accident.Fullname, Data.Accident);
_.Data.Accident=Data.Accident;
const generatedHttpRoutes= [
    { type: Routes.BureauUnitRoute, path: "BureauUnit" },
];

_.generatedHttpRoutes=generatedHttpRoutes;
const GeneratedRouter=class GeneratedRouter extends Aventus.HttpRouter.WithRoute(generatedHttpRoutes) {
}
GeneratedRouter.Namespace=`${moduleName}`;
_.GeneratedRouter=GeneratedRouter;

for(let key in _) { Bureau[key] = _[key] }
})(Bureau);
