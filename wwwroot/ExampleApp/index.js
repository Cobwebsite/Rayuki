
var ExampleApp;
(ExampleApp||(ExampleApp = {}));
(function (ExampleApp) {
const moduleName = `ExampleApp`;
const _ = {};

const Data = {};
_.Data = {};
const Routes = {};
_.Routes = {};
let _n;
Data.Person=class Person extends Aventus.Data {
    static get Fullname() { return "ExampleApp.Data.Person, ExampleApp"; }
    firstname = null;
    lastname = null;
}
Data.Person.$schema={"firstname":"string","lastname":"string"};Aventus.DataManager.register(Data.Person.Fullname, Data.Person);Data.Person.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Person.Fullname, Data.Person);
_.Data.Person=Data.Person;
Data.Animal=class Animal extends Aventus.Data {
    /**
     * My Description
     * Liine 2
     */
    name = "asd";
}
Data.Animal.$schema={"name":"string"};Aventus.DataManager.register(Data.Animal.Fullname, Data.Animal);Data.Animal.Namespace=`${moduleName}.Data`;
_.Data.Animal=Data.Animal;
Data.Chien=class Chien extends Data.Animal {
    static get Fullname() { return "ExampleApp.Data.Chien, ExampleApp"; }
    color = null;
}
Data.Chien.$schema={"color":"string"};Aventus.DataManager.register(Data.Chien.Fullname, Data.Chien);Data.Chien.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Chien.Fullname, Data.Chien);
_.Data.Chien=Data.Chien;
Routes.AnimalRoute=class AnimalRoute extends AventusSharp.Routes.StorableRoute {
    async MyCustomRoute() {
        const request = new Aventus.HttpRequest(`/custom`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    async MyCustomRoute2() {
        const request = new Aventus.HttpRequest(`/custom2`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    async MyCustomRoute3() {
        const request = new Aventus.HttpRequest(`/custom3`, Aventus.HttpMethod.GET);
        return await request.queryTxt(this.router);
    }
    async MyCustomRoute4() {
        const request = new Aventus.HttpRequest(`/custom4`, Aventus.HttpMethod.GET);
        return await request.queryVoid(this.router);
    }
    StorableName() {
        return "Animal";
    }
}
Routes.AnimalRoute.Namespace=`${moduleName}.Routes`;
_.Routes.AnimalRoute=Routes.AnimalRoute;
const Index = class Index extends RayukiCore.Frame {
    static __style = ``;
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
        blocks: { 'default':`<h1>Example app</h1><rk-row>    <rk-col size="12" size_md="6">        <rk-input placeholder="salut"></rk-input>    </rk-col></rk-row>` }
    });
}
    getClassName() {
        return "Index";
    }
}
Index.Namespace=`${moduleName}`;
Index.Tag=`example-app-index`;
_.Index=Index;
if(!window.customElements.get('example-app-index')){window.customElements.define('example-app-index', Index);Aventus.WebComponentInstance.registerDefinition(Index);}

const generatedHttpRoutes= [
    { type: Routes.AnimalRoute, path: "animal" },
];

_.generatedHttpRoutes=generatedHttpRoutes;
const GeneratedRouter=class GeneratedRouter extends Aventus.HttpRouter.WithRoute(generatedHttpRoutes) {
}
GeneratedRouter.Namespace=`${moduleName}`;
_.GeneratedRouter=GeneratedRouter;
const MyTest=class MyTest {
    test() {
        let router = new GeneratedRouter();
    }
}
MyTest.Namespace=`${moduleName}`;
_.MyTest=MyTest;

for(let key in _) { ExampleApp[key] = _[key] }
})(ExampleApp);
