
var Utilisateur;
(Utilisateur||(Utilisateur = {}));
(function (Utilisateur) {
const moduleName = `Utilisateur`;
const _ = {};

const Application = {};
_.Application = {};
Application.main = {};
_.Application.main = {};
Application.main.Frame = {};
_.Application.main.Frame = {};
Application.main.Frame.Index = {};
_.Application.main.Frame.Index = {};
let _n;
Application.main.Frame.Index.TableUsers = class TableUsers extends Core.Components.Table {
    static __style = ``;
    __getStatic() {
        return TableUsers;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TableUsers.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "TableUsers";
    }
    configure(options) {
        options.schema = [{
                displayName: "Id",
                name: "id",
                type: "number"
            }, {
                displayName: "Prénom",
                name: "Firstname",
                type: "string"
            },
            {
                displayName: "Nom",
                name: "Lastname",
                type: "string"
            }];
        return options;
    }
    async loadData() {
        let users = await Core.RAM.UserRAM.getInstance().getList();
        this.data = users;
    }
    postCreation() {
        this.loadData();
    }
}
Application.main.Frame.Index.TableUsers.Namespace=`${moduleName}.Application.main.Frame.Index`;
Application.main.Frame.Index.TableUsers.Tag=`utilisateur-table-users`;
_.Application.main.Frame.Index.TableUsers=Application.main.Frame.Index.TableUsers;
if(!window.customElements.get('utilisateur-table-users')){window.customElements.define('utilisateur-table-users', Application.main.Frame.Index.TableUsers);Aventus.WebComponentInstance.registerDefinition(Application.main.Frame.Index.TableUsers);}

_n = Application.main.Frame.Index;Application.main.Frame.Index = class Index extends Core.System.Frame {
    static __style = `:host h1{text-align:center}`;
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
        blocks: { 'default':`<h1>Gestion des utilisateurs123</h1><utilisateur-table-users></utilisateur-table-users>` }
    });
}
    getClassName() {
        return "Index";
    }
    pageTitle() {
        return "Utilisateur - Accueil";
    }
    onShow() {
    }
    onHide() {
    }
}
Application.main.Frame.Index.Namespace=`${moduleName}.Application.main.Frame`;
Application.main.Frame.Index.Tag=`utilisateur-index`;
_.Application.main.Frame.Index=Application.main.Frame.Index;
if(!window.customElements.get('utilisateur-index')){window.customElements.define('utilisateur-index', Application.main.Frame.Index);Aventus.WebComponentInstance.registerDefinition(Application.main.Frame.Index);}
Object.assign(Application.main.Frame.Index, _n);
Application.Main = class Main extends Core.System.Application {
    static __style = ``;
    __getStatic() {
        return Main;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Main.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`` }
    });
}
    getClassName() {
        return "Main";
    }
    defineRoutes() {
        this.addRoute("/", Application.main.Frame.Index);
    }
}
Application.Main.Namespace=`${moduleName}.Application`;
Application.Main.Tag=`utilisateur-main`;
_.Application.Main=Application.Main;
if(!window.customElements.get('utilisateur-main')){window.customElements.define('utilisateur-main', Application.Main);Aventus.WebComponentInstance.registerDefinition(Application.Main);}


for(let key in _) { Utilisateur[key] = _[key] }
})(Utilisateur);
