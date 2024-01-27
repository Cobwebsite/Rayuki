Object.defineProperty(window, "AvInstance", {
	get() {return Aventus.Instance;}
})
var Aventus;
(Aventus||(Aventus = {}));
(function (Aventus) {
const moduleName = `Aventus`;
const _ = {};


let _n;
const sleep=function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

_.sleep=sleep;
const DataManager=class DataManager {
    static info = new Map();
    /**
     * Register a unique string type for a data
     */
    static register($type, cst) {
        this.info.set($type, cst);
    }
    /**
     * Get the contructor for the unique string type
     */
    static getConstructor($type) {
        let result = this.info.get($type);
        if (result) {
            return result;
        }
        return null;
    }
    /**
     * Clone the object to keep real type
     */
    static clone(data) {
        return this.createObject(JSON.parse(JSON.stringify(data)));
    }
    /**
     * Create an object with the type management
     * Usefull to convert object from JSON into Js class
     */
    static createObject(data, transfromToDate = false) {
        if (typeof data === 'object' && data !== null) {
            if (data instanceof Date) {
                return data;
            }
            if (Array.isArray(data)) {
                let result = [];
                for (let element of data) {
                    result.push(this.createObject(element));
                }
                return result;
            }
            if (data.$type) {
                let cst = DataManager.getConstructor(data.$type);
                if (cst) {
                    let obj = new cst();
                    let props = Object.getOwnPropertyNames(obj);
                    for (let prop of props) {
                        if (data[prop] !== undefined) {
                            let propInfo = Object.getOwnPropertyDescriptor(obj, prop);
                            if (propInfo?.writable) {
                                if (obj[prop] instanceof Date) {
                                    obj[prop] = this.createObject(data[prop], true);
                                }
                                else {
                                    obj[prop] = this.createObject(data[prop]);
                                }
                            }
                        }
                    }
                    return obj;
                }
            }
            else {
                let result = {};
                for (let key in data) {
                    result[key] = this.createObject(data[key]);
                }
                return result;
            }
        }
        else if (transfromToDate && typeof data === "string") {
            return new Date(data);
        }
        return data;
    }
}
DataManager.Namespace=`${moduleName}`;
_.DataManager=DataManager;
var HttpErrorCode;
(function (HttpErrorCode) {
    HttpErrorCode[HttpErrorCode["unknow"] = 0] = "unknow";
})(HttpErrorCode || (HttpErrorCode = {}));

_.HttpErrorCode=HttpErrorCode;
const GenericError=class GenericError {
    /**
     * Code for the error
     */
    code;
    /**
     * Description of the error
     */
    message;
    details = [];
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}
GenericError.Namespace=`${moduleName}`;
_.GenericError=GenericError;
const VoidWithError=class VoidWithError {
    /**
     * Determine if the action is a success
     */
    get success() {
        return this.errors.length == 0;
    }
    /**
     * List of errors
     */
    errors = [];
}
VoidWithError.Namespace=`${moduleName}`;
_.VoidWithError=VoidWithError;
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["OPTION"] = "OPTION";
})(HttpMethod || (HttpMethod = {}));

_.HttpMethod=HttpMethod;
const ElementExtension=class ElementExtension {
    /**
     * Find a parent by tagname if exist Static.findParentByTag(this, "av-img")
     */
    static findParentByTag(element, tagname, untilNode) {
        let el = element;
        if (Array.isArray(tagname)) {
            for (let i = 0; i < tagname.length; i++) {
                tagname[i] = tagname[i].toLowerCase();
            }
        }
        else {
            tagname = [tagname.toLowerCase()];
        }
        let checkFunc = (el) => {
            return tagname.indexOf((el.nodeName || el.tagName).toLowerCase()) != -1;
        };
        if (el) {
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
        }
        while (el) {
            if (checkFunc(el)) {
                return el;
            }
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
            if (el == untilNode) {
                break;
            }
        }
        return null;
    }
    /**
     * Find a parent by class name if exist Static.findParentByClass(this, "my-class-img") = querySelector('.my-class-img')
     */
    static findParentByClass(element, classname, untilNode) {
        let el = element;
        if (!Array.isArray(classname)) {
            classname = [classname];
        }
        if (el) {
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
        }
        while (el) {
            for (let classnameTemp of classname) {
                if (el['classList'] && el['classList'].contains(classnameTemp)) {
                    return el;
                }
            }
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
            if (el == untilNode) {
                break;
            }
        }
        return null;
    }
    /**
     * Find a parent by type if exist Static.findParentyType(this, Aventus.Img)
     */
    static findParentByType(element, type, untilNode) {
        let el = element;
        let checkFunc = (el) => {
            return false;
        };
        if (typeof type == "function" && type['prototype']['constructor']) {
            checkFunc = (el) => {
                if (el instanceof type) {
                    return true;
                }
                return false;
            };
        }
        else {
            console.error("you must provide a class inside this function");
            return null;
        }
        if (el) {
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
        }
        while (el) {
            if (checkFunc(el)) {
                return el;
            }
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
            if (el == untilNode) {
                break;
            }
        }
        return null;
    }
    /**
     * Find list of parents by tagname
     */
    static findParents(element, tagname, untilNode) {
        let el = element;
        if (Array.isArray(tagname)) {
            for (let i = 0; i < tagname.length; i++) {
                tagname[i] = tagname[i].toLowerCase();
            }
        }
        else {
            tagname = [tagname.toLowerCase()];
        }
        let result = [];
        if (el) {
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
        }
        while (el) {
            if (tagname.indexOf((el.nodeName || el['tagName']).toLowerCase()) != -1) {
                result.push(el);
            }
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
            if (el == untilNode) {
                break;
            }
        }
        return result;
    }
    /**
     * Check if element contains a child
     */
    static containsChild(element, child) {
        var rootScope = element.getRootNode();
        var elScope = child.getRootNode();
        while (elScope != rootScope) {
            if (!elScope['host']) {
                return false;
            }
            child = elScope['host'];
            elScope = elScope['host'].getRootNode();
        }
        return element.contains(child);
    }
    /**
     * Get element inside slot
     */
    static getElementsInSlot(element, slotName) {
        if (element.shadowRoot) {
            let slotEl;
            if (slotName) {
                slotEl = element.shadowRoot.querySelector('slot[name="' + slotName + '"]');
            }
            else {
                slotEl = element.shadowRoot.querySelector("slot");
            }
            while (true) {
                if (!slotEl) {
                    return [];
                }
                var listChild = Array.from(slotEl.assignedElements());
                if (!listChild) {
                    return [];
                }
                let slotFound = false;
                for (let i = 0; i < listChild.length; i++) {
                    if (listChild[i].nodeName == "SLOT") {
                        slotEl = listChild[i];
                        slotFound = true;
                        break;
                    }
                }
                if (!slotFound) {
                    return listChild;
                }
            }
        }
        return [];
    }
    /**
     * Get deeper element inside dom at the position X and Y
     */
    static getElementAtPosition(x, y, startFrom) {
        var _realTarget = (el, i = 0) => {
            if (i == 50) {
                debugger;
            }
            if (el.shadowRoot && x !== undefined && y !== undefined) {
                var newEl = el.shadowRoot.elementFromPoint(x, y);
                if (newEl && newEl != el) {
                    return _realTarget(newEl, i + 1);
                }
            }
            return el;
        };
        if (startFrom == null) {
            startFrom = document.body;
        }
        return _realTarget(startFrom);
    }
}
ElementExtension.Namespace=`${moduleName}`;
_.ElementExtension=ElementExtension;
const Instance=class Instance {
    static elements = new Map();
    static get(type) {
        let result = this.elements.get(type);
        if (!result) {
            let cst = type.prototype['constructor'];
            result = new cst();
            this.elements.set(type, result);
        }
        return result;
    }
    static set(el) {
        let cst = el.constructor;
        if (this.elements.get(cst)) {
            return false;
        }
        this.elements.set(cst, el);
        return true;
    }
    static destroy(el) {
        let cst = el.constructor;
        return this.elements.delete(cst);
    }
}
Instance.Namespace=`${moduleName}`;
_.Instance=Instance;
const Style=class Style {
    static instance;
    static noAnimation;
    static defaultStyleSheets = {
        "@general": `:host{display:inline-block;box-sizing:border-box}:host *{box-sizing:border-box}`,
    };
    static store(name, content) {
        this.getInstance().store(name, content);
    }
    static get(name) {
        return this.getInstance().get(name);
    }
    static load(name, url) {
        return this.getInstance().load(name, url);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Style();
        }
        return this.instance;
    }
    constructor() {
        for (let name in Style.defaultStyleSheets) {
            this.store(name, Style.defaultStyleSheets[name]);
        }
        Style.noAnimation = new CSSStyleSheet();
        Style.noAnimation.replaceSync(`:host{-webkit-transition: none !important;-moz-transition: none !important;-ms-transition: none !important;-o-transition: none !important;transition: none !important;}:host *{-webkit-transition: none !important;-moz-transition: none !important;-ms-transition: none !important;-o-transition: none !important;transition: none !important;}`);
    }
    stylesheets = new Map();
    async load(name, url) {
        try {
            let style = this.stylesheets.get(name);
            if (!style || style.cssRules.length == 0) {
                let txt = await (await fetch(url)).text();
                this.store(name, txt);
            }
        }
        catch (e) {
        }
    }
    store(name, content) {
        let style = this.stylesheets.get(name);
        if (!style) {
            const sheet = new CSSStyleSheet();
            sheet.replaceSync(content);
            this.stylesheets.set(name, sheet);
            return sheet;
        }
        else {
            style.replaceSync(content);
            return style;
        }
    }
    get(name) {
        let style = this.stylesheets.get(name);
        if (!style) {
            style = this.store(name, "");
        }
        return style;
    }
}
Style.Namespace=`${moduleName}`;
_.Style=Style;
const WebComponentInstance=class WebComponentInstance {
    static __allDefinitions = [];
    static __allInstances = [];
    /**
     * Last definition insert datetime
     */
    static lastDefinition = 0;
    static registerDefinition(def) {
        WebComponentInstance.lastDefinition = Date.now();
        WebComponentInstance.__allDefinitions.push(def);
    }
    static removeDefinition(def) {
        WebComponentInstance.lastDefinition = Date.now();
        let index = WebComponentInstance.__allDefinitions.indexOf(def);
        if (index > -1) {
            WebComponentInstance.__allDefinitions.splice(index, 1);
        }
    }
    /**
     * Get all sub classes of type
     */
    static getAllClassesOf(type) {
        let result = [];
        for (let def of WebComponentInstance.__allDefinitions) {
            if (def.prototype instanceof type) {
                result.push(def);
            }
        }
        return result;
    }
    /**
     * Get all registered definitions
     */
    static getAllDefinitions() {
        return WebComponentInstance.__allDefinitions;
    }
    static addInstance(instance) {
        this.__allInstances.push(instance);
    }
    static removeInstance(instance) {
        let index = this.__allInstances.indexOf(instance);
        if (index > -1) {
            this.__allInstances.splice(index, 1);
        }
    }
    static getAllInstances(type) {
        let result = [];
        for (let instance of this.__allInstances) {
            if (instance instanceof type) {
                result.push(instance);
            }
        }
        return result;
    }
    static create(type) {
        let _class = customElements.get(type);
        if (_class) {
            return new _class();
        }
        let splitted = type.split(".");
        let current = window;
        for (let part of splitted) {
            current = current[part];
        }
        if (current && current.prototype instanceof Aventus.WebComponent) {
            return new current();
        }
        return null;
    }
}
WebComponentInstance.Namespace=`${moduleName}`;
_.WebComponentInstance=WebComponentInstance;
const Callback=class Callback {
    callbacks = [];
    /**
     * Clear all callbacks
     */
    clear() {
        this.callbacks = [];
    }
    /**
     * Add a callback
     */
    add(cb) {
        this.callbacks.push(cb);
    }
    /**
     * Remove a callback
     */
    remove(cb) {
        let index = this.callbacks.indexOf(cb);
        if (index != -1) {
            this.callbacks.splice(index, 1);
        }
    }
    /**
     * Trigger all callbacks
     */
    trigger(args) {
        let result = [];
        let cbs = [...this.callbacks];
        for (let cb of cbs) {
            result.push(cb.apply(null, args));
        }
        return result;
    }
}
Callback.Namespace=`${moduleName}`;
_.Callback=Callback;
const Mutex=class Mutex {
    waitingList = [];
    isLocked = false;
    /**
     * Wait the mutex to be free then get it
     */
    waitOne() {
        return new Promise((resolve) => {
            if (this.isLocked) {
                this.waitingList.push((run) => {
                    resolve(run);
                });
            }
            else {
                this.isLocked = true;
                resolve(true);
            }
        });
    }
    /**
     * Release the mutex
     */
    release() {
        let nextFct = this.waitingList.shift();
        if (nextFct) {
            nextFct(true);
        }
        else {
            this.isLocked = false;
        }
    }
    /**
     * Release the mutex
     */
    releaseOnlyLast() {
        if (this.waitingList.length > 0) {
            let lastFct = this.waitingList.pop();
            for (let fct of this.waitingList) {
                fct(false);
            }
            this.waitingList = [];
            if (lastFct) {
                lastFct(true);
            }
        }
        else {
            this.isLocked = false;
        }
    }
    /**
     * Clear mutex
     */
    dispose() {
        this.waitingList = [];
        this.isLocked = false;
    }
    async safeRun(cb) {
        let result = null;
        await this.waitOne();
        try {
            result = cb.apply(null, []);
        }
        catch (e) {
        }
        await this.release();
        return result;
    }
    async safeRunAsync(cb) {
        let result = null;
        await this.waitOne();
        try {
            result = await cb.apply(null, []);
        }
        catch (e) {
        }
        await this.release();
        return result;
    }
    async safeRunLast(cb) {
        let result = null;
        if (await this.waitOne()) {
            try {
                result = cb.apply(null, []);
            }
            catch (e) {
            }
            await this.releaseOnlyLast();
        }
        return result;
    }
    async safeRunLastAsync(cb) {
        let result;
        if (await this.waitOne()) {
            try {
                result = await cb.apply(null, []);
            }
            catch (e) {
            }
            await this.releaseOnlyLast();
        }
        return result;
    }
}
Mutex.Namespace=`${moduleName}`;
_.Mutex=Mutex;
const State=class State {
    /**
     * Activate a custom state inside a specific manager
     * It ll be a generic state with no information inside exept name
     */
    static async activate(stateName, manager) {
        return await new EmptyState(stateName).activate(manager);
    }
    /**
     * Activate this state inside a specific manager
     */
    async activate(manager) {
        return await manager.setState(this);
    }
    onActivate() {
    }
    onInactivate(nextState) {
    }
    async askChange(state, nextState) {
        return true;
    }
}
State.Namespace=`${moduleName}`;
_.State=State;
const EmptyState=class EmptyState extends State {
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
EmptyState.Namespace=`${moduleName}`;
_.EmptyState=EmptyState;
var WatchAction;
(function (WatchAction) {
    WatchAction[WatchAction["CREATED"] = 0] = "CREATED";
    WatchAction[WatchAction["UPDATED"] = 1] = "UPDATED";
    WatchAction[WatchAction["DELETED"] = 2] = "DELETED";
})(WatchAction || (WatchAction = {}));

_.WatchAction=WatchAction;
const Watcher=class Watcher {
    static __maxProxyData = 0;
    /**
     * Transform object into a watcher
     */
    static get(obj, onDataChanged) {
        if (obj == undefined) {
            console.error("You must define an objet / array for your proxy");
            return;
        }
        if (obj.__isProxy) {
            obj.__subscribe(onDataChanged);
            return obj;
        }
        Watcher.__maxProxyData++;
        let setProxyPath = (newProxy, newPath) => {
            if (newProxy instanceof Object && newProxy.__isProxy) {
                newProxy.__path = newPath;
                if (!newProxy.__proxyData) {
                    newProxy.__proxyData = {};
                }
                if (!newProxy.__proxyData[newPath]) {
                    newProxy.__proxyData[newPath] = [];
                }
                if (newProxy.__proxyData[newPath].indexOf(proxyData) == -1) {
                    newProxy.__proxyData[newPath].push(proxyData);
                }
            }
        };
        let removeProxyPath = (oldValue, pathToDelete, recursive = true) => {
            if (oldValue instanceof Object && oldValue.__isProxy) {
                let allProxies = oldValue.__proxyData;
                for (let triggerPath in allProxies) {
                    if (triggerPath == pathToDelete) {
                        for (let i = 0; i < allProxies[triggerPath].length; i++) {
                            if (allProxies[triggerPath][i] == proxyData) {
                                allProxies[triggerPath].splice(i, 1);
                                i--;
                            }
                        }
                        if (allProxies[triggerPath].length == 0) {
                            delete allProxies[triggerPath];
                            if (Object.keys(allProxies).length == 0) {
                                delete oldValue.__proxyData;
                            }
                        }
                    }
                }
            }
        };
        let jsonReplacer = (key, value) => {
            if (key == "__path")
                return undefined;
            else if (key == "__proxyData")
                return undefined;
            else
                return value;
        };
        let currentTrace = new Error().stack?.split("\n") ?? [];
        currentTrace.shift();
        currentTrace.shift();
        let onlyDuringInit = true;
        let proxyData = {
            baseData: {},
            id: Watcher.__maxProxyData,
            callbacks: [onDataChanged],
            avoidUpdate: [],
            pathToRemove: [],
            history: [{
                    object: JSON.parse(JSON.stringify(obj, jsonReplacer)),
                    trace: currentTrace,
                    action: 'init',
                    path: ''
                }],
            useHistory: false,
            getProxyObject(target, element, prop) {
                let newProxy;
                if (element instanceof Object && element.__isProxy) {
                    newProxy = element;
                }
                else {
                    try {
                        if (element instanceof Object) {
                            newProxy = new Proxy(element, this);
                        }
                        else {
                            return element;
                        }
                    }
                    catch {
                        return element;
                    }
                }
                let newPath = '';
                if (Array.isArray(target)) {
                    if (prop != "length") {
                        if (target.__path) {
                            newPath = target.__path;
                        }
                        newPath += "[" + prop + "]";
                        setProxyPath(newProxy, newPath);
                    }
                }
                else if (element instanceof Date) {
                    return element;
                }
                else {
                    if (target.__path) {
                        newPath = target.__path + '.';
                    }
                    newPath += prop;
                    setProxyPath(newProxy, newPath);
                }
                return newProxy;
            },
            tryCustomFunction(target, prop, receiver) {
                if (prop == "__isProxy") {
                    return true;
                }
                else if (prop == "__subscribe") {
                    return (cb) => {
                        this.callbacks.push(cb);
                    };
                }
                else if (prop == "__unsubscribe") {
                    return (cb) => {
                        let index = this.callbacks.indexOf(cb);
                        if (index > -1) {
                            this.callbacks.splice(index, 1);
                        }
                    };
                }
                else if (prop == "__proxyId") {
                    return this.id;
                }
                else if (prop == "getHistory") {
                    return () => {
                        return this.history;
                    };
                }
                else if (prop == "clearHistory") {
                    this.history = [];
                }
                else if (prop == "enableHistory") {
                    return () => {
                        this.useHistory = true;
                    };
                }
                else if (prop == "disableHistory") {
                    return () => {
                        this.useHistory = false;
                    };
                }
                else if (prop == "__getTarget" && onlyDuringInit) {
                    return () => {
                        return target;
                    };
                }
                else if (prop == "toJSON") {
                    return () => {
                        let result = {};
                        for (let key of Object.keys(target)) {
                            if (key == "__path" || key == "__proxyData") {
                                continue;
                            }
                            result[key] = target[key];
                        }
                        return result;
                    };
                }
                return undefined;
            },
            get(target, prop, receiver) {
                if (prop == "__proxyData") {
                    return target[prop];
                }
                let customResult = this.tryCustomFunction(target, prop, receiver);
                if (customResult !== undefined) {
                    return customResult;
                }
                let element = target[prop];
                if (typeof (element) == 'object') {
                    return this.getProxyObject(target, element, prop);
                }
                else if (typeof (element) == 'function') {
                    if (Array.isArray(target)) {
                        let result;
                        if (prop == 'push') {
                            if (target.__isProxy) {
                                result = (el) => {
                                    let index = target.push(el);
                                    return index;
                                };
                            }
                            else {
                                result = (el) => {
                                    let index = target.push(el);
                                    let proxyEl = this.getProxyObject(target, el, (index - 1));
                                    target.splice(target.length - 1, 1, proxyEl);
                                    trigger('CREATED', target, receiver, proxyEl, "[" + (index - 1) + "]");
                                    return index;
                                };
                            }
                        }
                        else if (prop == 'splice') {
                            if (target.__isProxy) {
                                result = (index, nbRemove, ...insert) => {
                                    let res = target.splice(index, nbRemove, ...insert);
                                    return res;
                                };
                            }
                            else {
                                result = (index, nbRemove, ...insert) => {
                                    let res = target.splice(index, nbRemove, ...insert);
                                    let path = target.__path ? target.__path : '';
                                    for (let i = 0; i < res.length; i++) {
                                        trigger('DELETED', target, receiver, res[i], "[" + index + "]");
                                        removeProxyPath(res[i], path + "[" + (index + i) + "]");
                                    }
                                    for (let i = 0; i < insert.length; i++) {
                                        let proxyEl = this.getProxyObject(target, insert[i], (index + i));
                                        target.splice((index + i), 1, proxyEl);
                                        trigger('CREATED', target, receiver, proxyEl, "[" + (index + i) + "]");
                                    }
                                    let fromIndex = index + insert.length;
                                    let baseDiff = index - insert.length + res.length + 1;
                                    for (let i = fromIndex, j = 0; i < target.length; i++, j++) {
                                        let oldPath = path + "[" + (j + baseDiff) + "]";
                                        removeProxyPath(target[i], oldPath, false);
                                        let proxyEl = this.getProxyObject(target, target[i], i);
                                        let recuUpdate = (childEl) => {
                                            if (Array.isArray(childEl)) {
                                                for (let i = 0; i < childEl.length; i++) {
                                                    if (childEl[i] instanceof Object && childEl[i].__path) {
                                                        let oldPathRecu = proxyEl[i].__path.replace(proxyEl.__path, oldPath);
                                                        removeProxyPath(childEl[i], oldPathRecu, false);
                                                        let newProxyEl = this.getProxyObject(childEl, childEl[i], i);
                                                        recuUpdate(newProxyEl);
                                                    }
                                                }
                                            }
                                            else if (childEl instanceof Object && !(childEl instanceof Date)) {
                                                for (let key in childEl) {
                                                    if (childEl[key] instanceof Object && childEl[key].__path) {
                                                        let oldPathRecu = proxyEl[key].__path.replace(proxyEl.__path, oldPath);
                                                        removeProxyPath(childEl[key], oldPathRecu, false);
                                                        let newProxyEl = this.getProxyObject(childEl, childEl[key], key);
                                                        recuUpdate(newProxyEl);
                                                    }
                                                }
                                            }
                                        };
                                        recuUpdate(proxyEl);
                                    }
                                    return res;
                                };
                            }
                        }
                        else if (prop == 'pop') {
                            if (target.__isProxy) {
                                result = () => {
                                    let res = target.pop();
                                    return res;
                                };
                            }
                            else {
                                result = () => {
                                    let index = target.length - 1;
                                    let res = target.pop();
                                    let path = target.__path ? target.__path : '';
                                    trigger('DELETED', target, receiver, res, "[" + index + "]");
                                    removeProxyPath(res, path + "[" + index + "]");
                                    return res;
                                };
                            }
                        }
                        else {
                            result = element.bind(target);
                        }
                        return result;
                    }
                    return element.bind(target);
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                let triggerChange = false;
                if (["__path", "__proxyData"].indexOf(prop) == -1) {
                    if (Array.isArray(target)) {
                        if (prop != "length") {
                            triggerChange = true;
                        }
                    }
                    else {
                        let oldValue = Reflect.get(target, prop, receiver);
                        if (oldValue !== value) {
                            triggerChange = true;
                        }
                    }
                }
                let result = Reflect.set(target, prop, value, receiver);
                if (triggerChange) {
                    let index = this.avoidUpdate.indexOf(prop);
                    if (index == -1) {
                        trigger('UPDATED', target, receiver, value, prop);
                    }
                    else {
                        this.avoidUpdate.splice(index, 1);
                    }
                }
                return result;
            },
            deleteProperty(target, prop) {
                let triggerChange = false;
                let pathToDelete = '';
                if (prop != "__path") {
                    if (Array.isArray(target)) {
                        if (prop != "length") {
                            if (target.__path) {
                                pathToDelete = target.__path;
                            }
                            pathToDelete += "[" + prop + "]";
                            triggerChange = true;
                        }
                    }
                    else {
                        if (target.__path) {
                            pathToDelete = target.__path + '.';
                        }
                        pathToDelete += prop;
                        triggerChange = true;
                    }
                }
                if (target.hasOwnProperty(prop)) {
                    let oldValue = target[prop];
                    delete target[prop];
                    if (triggerChange) {
                        trigger('DELETED', target, null, oldValue, prop);
                        removeProxyPath(oldValue, pathToDelete);
                    }
                    return true;
                }
                return false;
            },
            defineProperty(target, prop, descriptor) {
                let triggerChange = false;
                let newPath = '';
                if (["__path", "__proxyData"].indexOf(prop) == -1) {
                    if (Array.isArray(target)) {
                        if (prop != "length") {
                            if (target.__path) {
                                newPath = target.__path;
                            }
                            newPath += "[" + prop + "]";
                            if (!target.hasOwnProperty(prop)) {
                                triggerChange = true;
                            }
                        }
                    }
                    else {
                        if (target.__path) {
                            newPath = target.__path + '.';
                        }
                        newPath += prop;
                        if (!target.hasOwnProperty(prop)) {
                            triggerChange = true;
                        }
                    }
                }
                let result = Reflect.defineProperty(target, prop, descriptor);
                if (triggerChange) {
                    this.avoidUpdate.push(prop);
                    let proxyEl = this.getProxyObject(target, descriptor.value, prop);
                    target[prop] = proxyEl;
                    trigger('CREATED', target, null, proxyEl, prop);
                }
                return result;
            }
        };
        const trigger = (type, target, receiver, value, prop) => {
            if (target.__isProxy) {
                return;
            }
            let allProxies = target.__proxyData;
            let receiverId = 0;
            if (receiver == null) {
                receiverId = proxyData.id;
            }
            else {
                receiverId = receiver.__proxyId;
            }
            if (proxyData.id == receiverId) {
                let stacks = [];
                let allStacks = new Error().stack?.split("\n") ?? [];
                for (let i = allStacks.length - 1; i >= 0; i--) {
                    let current = allStacks[i].trim().replace("at ", "");
                    if (current.startsWith("Object.set") || current.startsWith("Proxy.result")) {
                        break;
                    }
                    stacks.push(current);
                }
                for (let triggerPath in allProxies) {
                    for (let currentProxyData of allProxies[triggerPath]) {
                        let pathToSend = triggerPath;
                        if (pathToSend != "") {
                            if (Array.isArray(target)) {
                                if (!prop.startsWith("[")) {
                                    pathToSend += "[" + prop + "]";
                                }
                                else {
                                    pathToSend += prop;
                                }
                            }
                            else {
                                if (!prop.startsWith("[")) {
                                    pathToSend += ".";
                                }
                                pathToSend += prop;
                            }
                        }
                        else {
                            pathToSend = prop;
                        }
                        if (proxyData.useHistory) {
                            proxyData.history.push({
                                object: JSON.parse(JSON.stringify(currentProxyData.baseData, jsonReplacer)),
                                trace: stacks.reverse(),
                                action: WatchAction[type],
                                path: pathToSend
                            });
                        }
                        [...currentProxyData.callbacks].forEach((cb) => {
                            cb(WatchAction[type], pathToSend, value);
                        });
                    }
                }
            }
        };
        var realProxy = new Proxy(obj, proxyData);
        proxyData.baseData = realProxy.__getTarget();
        onlyDuringInit = false;
        setProxyPath(realProxy, '');
        return realProxy;
    }
}
Watcher.Namespace=`${moduleName}`;
_.Watcher=Watcher;
const PressManager=class PressManager {
    static create(options) {
        if (Array.isArray(options.element)) {
            let result = [];
            for (let el of options.element) {
                let cloneOpt = { ...options };
                cloneOpt.element = el;
                result.push(new PressManager(cloneOpt));
            }
            return result;
        }
        else {
            return new PressManager(options);
        }
    }
    options;
    element;
    delayDblPress = 150;
    delayLongPress = 700;
    nbPress = 0;
    offsetDrag = 20;
    state = {
        oneActionTriggered: false,
        isMoving: false,
    };
    startPosition = { x: 0, y: 0 };
    customFcts = {};
    timeoutDblPress = 0;
    timeoutLongPress = 0;
    downEventSaved;
    actionsName = {
        press: "press",
        longPress: "longPress",
        dblPress: "dblPress",
        drag: "drag"
    };
    useDblPress = false;
    stopPropagation = () => true;
    functionsBinded = {
        downAction: (e) => { },
        upAction: (e) => { },
        moveAction: (e) => { },
        childPressStart: (e) => { },
        childPressEnd: (e) => { },
        childPress: (e) => { },
        childDblPress: (e) => { },
        childLongPress: (e) => { },
        childDragStart: (e) => { },
    };
    /**
     * @param {*} options - The options
     * @param {HTMLElement | HTMLElement[]} options.element - The element to manage
     */
    constructor(options) {
        if (options.element === void 0) {
            throw 'You must provide an element';
        }
        this.element = options.element;
        this.checkDragConstraint(options);
        this.assignValueOption(options);
        this.options = options;
        this.init();
    }
    /**
     * Get the current element focused by the PressManager
     */
    getElement() {
        return this.element;
    }
    checkDragConstraint(options) {
        if (options.onDrag !== void 0) {
            if (options.onDragStart === void 0) {
                options.onDragStart = (e) => { };
            }
            if (options.onDragEnd === void 0) {
                options.onDragEnd = (e) => { };
            }
        }
        if (options.onDragStart !== void 0) {
            if (options.onDrag === void 0) {
                options.onDrag = (e) => { };
            }
            if (options.onDragEnd === void 0) {
                options.onDragEnd = (e) => { };
            }
        }
        if (options.onDragEnd !== void 0) {
            if (options.onDragStart === void 0) {
                options.onDragStart = (e) => { };
            }
            if (options.onDrag === void 0) {
                options.onDrag = (e) => { };
            }
        }
    }
    assignValueOption(options) {
        if (options.delayDblPress !== undefined) {
            this.delayDblPress = options.delayDblPress;
        }
        if (options.delayLongPress !== undefined) {
            this.delayLongPress = options.delayLongPress;
        }
        if (options.offsetDrag !== undefined) {
            this.offsetDrag = options.offsetDrag;
        }
        if (options.onDblPress !== undefined) {
            this.useDblPress = true;
        }
        if (options.forceDblPress) {
            this.useDblPress = true;
        }
        if (typeof options.stopPropagation == 'function') {
            this.stopPropagation = options.stopPropagation;
        }
        else if (options.stopPropagation === false) {
            this.stopPropagation = () => false;
        }
    }
    bindAllFunction() {
        this.functionsBinded.downAction = this.downAction.bind(this);
        this.functionsBinded.moveAction = this.moveAction.bind(this);
        this.functionsBinded.upAction = this.upAction.bind(this);
        this.functionsBinded.childDblPress = this.childDblPress.bind(this);
        this.functionsBinded.childDragStart = this.childDragStart.bind(this);
        this.functionsBinded.childLongPress = this.childLongPress.bind(this);
        this.functionsBinded.childPress = this.childPress.bind(this);
        this.functionsBinded.childPressStart = this.childPressStart.bind(this);
        this.functionsBinded.childPressEnd = this.childPressEnd.bind(this);
    }
    init() {
        this.bindAllFunction();
        this.element.addEventListener("pointerdown", this.functionsBinded.downAction);
        this.element.addEventListener("trigger_pointer_press", this.functionsBinded.childPress);
        this.element.addEventListener("trigger_pointer_pressstart", this.functionsBinded.childPressStart);
        this.element.addEventListener("trigger_pointer_pressend", this.functionsBinded.childPressEnd);
        this.element.addEventListener("trigger_pointer_dblpress", this.functionsBinded.childDblPress);
        this.element.addEventListener("trigger_pointer_longpress", this.functionsBinded.childLongPress);
        this.element.addEventListener("trigger_pointer_dragstart", this.functionsBinded.childDragStart);
    }
    downAction(e) {
        this.downEventSaved = e;
        if (this.stopPropagation()) {
            e.stopImmediatePropagation();
        }
        this.customFcts = {};
        if (this.nbPress == 0) {
            this.state.oneActionTriggered = false;
            clearTimeout(this.timeoutDblPress);
        }
        this.startPosition = { x: e.pageX, y: e.pageY };
        document.addEventListener("pointerup", this.functionsBinded.upAction);
        document.addEventListener("pointermove", this.functionsBinded.moveAction);
        this.timeoutLongPress = setTimeout(() => {
            if (!this.state.oneActionTriggered) {
                if (this.options.onLongPress) {
                    this.state.oneActionTriggered = true;
                    this.options.onLongPress(e, this);
                    this.triggerEventToParent(this.actionsName.longPress, e);
                }
                else {
                    this.emitTriggerFunction(this.actionsName.longPress, e);
                }
            }
        }, this.delayLongPress);
        if (this.options.onPressStart) {
            this.options.onPressStart(e, this);
            this.emitTriggerFunctionParent("pressstart", e);
        }
        else {
            this.emitTriggerFunction("pressstart", e);
        }
    }
    upAction(e) {
        if (this.stopPropagation()) {
            e.stopImmediatePropagation();
        }
        document.removeEventListener("pointerup", this.functionsBinded.upAction);
        document.removeEventListener("pointermove", this.functionsBinded.moveAction);
        clearTimeout(this.timeoutLongPress);
        if (this.state.isMoving) {
            this.state.isMoving = false;
            if (this.options.onDragEnd) {
                this.options.onDragEnd(e, this);
            }
            else if (this.customFcts.src && this.customFcts.onDragEnd) {
                this.customFcts.onDragEnd(e, this.customFcts.src);
            }
        }
        else {
            if (this.useDblPress) {
                this.nbPress++;
                if (this.nbPress == 2) {
                    if (!this.state.oneActionTriggered) {
                        this.state.oneActionTriggered = true;
                        this.nbPress = 0;
                        if (this.options.onDblPress) {
                            this.options.onDblPress(e, this);
                            this.triggerEventToParent(this.actionsName.dblPress, e);
                        }
                        else {
                            this.emitTriggerFunction(this.actionsName.dblPress, e);
                        }
                    }
                }
                else if (this.nbPress == 1) {
                    this.timeoutDblPress = setTimeout(() => {
                        this.nbPress = 0;
                        if (!this.state.oneActionTriggered) {
                            if (this.options.onPress) {
                                this.state.oneActionTriggered = true;
                                this.options.onPress(e, this);
                                this.triggerEventToParent(this.actionsName.press, e);
                            }
                            else {
                                this.emitTriggerFunction(this.actionsName.press, e);
                            }
                        }
                    }, this.delayDblPress);
                }
            }
            else {
                if (!this.state.oneActionTriggered) {
                    if (this.options.onPress) {
                        this.state.oneActionTriggered = true;
                        this.options.onPress(e, this);
                        this.triggerEventToParent(this.actionsName.press, e);
                    }
                    else {
                        this.emitTriggerFunction("press", e);
                    }
                }
            }
        }
        if (this.options.onPressEnd) {
            this.options.onPressEnd(e, this);
            this.emitTriggerFunctionParent("pressend", e);
        }
        else {
            this.emitTriggerFunction("pressend", e);
        }
    }
    moveAction(e) {
        if (!this.state.isMoving && !this.state.oneActionTriggered) {
            if (this.stopPropagation()) {
                e.stopImmediatePropagation();
            }
            let xDist = e.pageX - this.startPosition.x;
            let yDist = e.pageY - this.startPosition.y;
            let distance = Math.sqrt(xDist * xDist + yDist * yDist);
            if (distance > this.offsetDrag && this.downEventSaved) {
                this.state.oneActionTriggered = true;
                if (this.options.onDragStart) {
                    this.state.isMoving = true;
                    this.options.onDragStart(this.downEventSaved, this);
                    this.triggerEventToParent(this.actionsName.drag, e);
                }
                else {
                    this.emitTriggerFunction("dragstart", this.downEventSaved);
                }
            }
        }
        else if (this.state.isMoving) {
            if (this.options.onDrag) {
                this.options.onDrag(e, this);
            }
            else if (this.customFcts.src && this.customFcts.onDrag) {
                this.customFcts.onDrag(e, this.customFcts.src);
            }
        }
    }
    triggerEventToParent(eventName, pointerEvent) {
        if (this.element.parentNode) {
            this.element.parentNode.dispatchEvent(new CustomEvent("pressaction_trigger", {
                bubbles: true,
                cancelable: false,
                composed: true,
                detail: {
                    target: this.element,
                    eventName: eventName,
                    realEvent: pointerEvent
                }
            }));
        }
    }
    childPressStart(e) {
        if (this.options.onPressStart) {
            this.options.onPressStart(e.detail.realEvent, this);
        }
    }
    childPressEnd(e) {
        if (this.options.onPressEnd) {
            this.options.onPressEnd(e.detail.realEvent, this);
        }
    }
    childPress(e) {
        if (this.options.onPress) {
            if (this.stopPropagation()) {
                e.stopImmediatePropagation();
            }
            e.detail.state.oneActionTriggered = true;
            this.options.onPress(e.detail.realEvent, this);
            this.triggerEventToParent(this.actionsName.press, e.detail.realEvent);
        }
    }
    childDblPress(e) {
        if (this.options.onDblPress) {
            if (this.stopPropagation()) {
                e.stopImmediatePropagation();
            }
            if (e.detail.state) {
                e.detail.state.oneActionTriggered = true;
            }
            this.options.onDblPress(e.detail.realEvent, this);
            this.triggerEventToParent(this.actionsName.dblPress, e.detail.realEvent);
        }
    }
    childLongPress(e) {
        if (this.options.onLongPress) {
            if (this.stopPropagation()) {
                e.stopImmediatePropagation();
            }
            e.detail.state.oneActionTriggered = true;
            this.options.onLongPress(e.detail.realEvent, this);
            this.triggerEventToParent(this.actionsName.longPress, e.detail.realEvent);
        }
    }
    childDragStart(e) {
        if (this.options.onDragStart) {
            if (this.stopPropagation()) {
                e.stopImmediatePropagation();
            }
            e.detail.state.isMoving = true;
            e.detail.customFcts.src = this;
            e.detail.customFcts.onDrag = this.options.onDrag;
            e.detail.customFcts.onDragEnd = this.options.onDragEnd;
            e.detail.customFcts.offsetDrag = this.options.offsetDrag;
            this.options.onDragStart(e.detail.realEvent, this);
            this.triggerEventToParent(this.actionsName.drag, e.detail.realEvent);
        }
    }
    emitTriggerFunctionParent(action, e) {
        let el = this.element.parentElement;
        if (el == null) {
            let parentNode = this.element.parentNode;
            if (parentNode instanceof ShadowRoot) {
                this.emitTriggerFunction(action, e, parentNode.host);
            }
        }
        else {
            this.emitTriggerFunction(action, e, el);
        }
    }
    emitTriggerFunction(action, e, el) {
        let ev = new CustomEvent("trigger_pointer_" + action, {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                state: this.state,
                customFcts: this.customFcts,
                realEvent: e
            }
        });
        if (!el) {
            el = this.element;
        }
        el.dispatchEvent(ev);
    }
    /**
     * Destroy the Press instance byremoving all events
     */
    destroy() {
        if (this.element) {
            this.element.removeEventListener("pointerdown", this.functionsBinded.downAction);
            this.element.removeEventListener("trigger_pointer_press", this.functionsBinded.childPress);
            this.element.removeEventListener("trigger_pointer_pressstart", this.functionsBinded.childPressStart);
            this.element.removeEventListener("trigger_pointer_pressend", this.functionsBinded.childPressEnd);
            this.element.removeEventListener("trigger_pointer_dblpress", this.functionsBinded.childDblPress);
            this.element.removeEventListener("trigger_pointer_longpress", this.functionsBinded.childLongPress);
            this.element.removeEventListener("trigger_pointer_dragstart", this.functionsBinded.childDragStart);
        }
    }
}
PressManager.Namespace=`${moduleName}`;
_.PressManager=PressManager;
const StateManager=class StateManager {
    subscribers = {};
    static canBeActivate(statePattern, stateName) {
        let stateInfo = this.prepareStateString(statePattern);
        return stateInfo.regex.test(stateName);
    }
    activeState;
    changeStateMutex = new Mutex();
    afterStateChanged = new Callback();
    /**
     * Subscribe actions for a state or a state list
     */
    subscribe(statePatterns, callbacks) {
        if (!callbacks.active && !callbacks.inactive && !callbacks.askChange) {
            this._log(`Trying to subscribe to state : ${statePatterns} with no callbacks !`, "warning");
            return;
        }
        if (!Array.isArray(statePatterns)) {
            statePatterns = [statePatterns];
        }
        for (let statePattern of statePatterns) {
            if (!this.subscribers.hasOwnProperty(statePattern)) {
                let res = StateManager.prepareStateString(statePattern);
                let isActive = this.activeState !== undefined && res.regex.test(this.activeState.name);
                this.subscribers[statePattern] = {
                    "regex": res.regex,
                    "params": res.params,
                    "callbacks": {
                        "active": [],
                        "inactive": [],
                        "askChange": [],
                    },
                    "isActive": isActive,
                };
            }
            if (callbacks.active) {
                if (!Array.isArray(callbacks.active)) {
                    callbacks.active = [callbacks.active];
                }
                for (let activeFct of callbacks.active) {
                    this.subscribers[statePattern].callbacks.active.push(activeFct);
                    if (this.subscribers[statePattern].isActive && this.activeState) {
                        let slugs = this.getInternalStateSlugs(this.subscribers[statePattern], this.activeState.name);
                        if (slugs) {
                            activeFct(this.activeState, slugs);
                        }
                    }
                }
            }
            if (callbacks.inactive) {
                if (!Array.isArray(callbacks.inactive)) {
                    callbacks.inactive = [callbacks.inactive];
                }
                for (let inactiveFct of callbacks.inactive) {
                    this.subscribers[statePattern].callbacks.inactive.push(inactiveFct);
                }
            }
            if (callbacks.askChange) {
                if (!Array.isArray(callbacks.askChange)) {
                    callbacks.askChange = [callbacks.askChange];
                }
                for (let askChangeFct of callbacks.askChange) {
                    this.subscribers[statePattern].callbacks.askChange.push(askChangeFct);
                }
            }
        }
    }
    /**
     * Unsubscribe actions for a state or a state list
     */
    unsubscribe(statePatterns, callbacks) {
        if (!callbacks.active && !callbacks.inactive && !callbacks.askChange) {
            this._log(`Trying to unsubscribe to state : ${statePatterns} with no callbacks !`, "warning");
            return;
        }
        if (!Array.isArray(statePatterns)) {
            statePatterns = [statePatterns];
        }
        for (let statePattern of statePatterns) {
            if (this.subscribers[statePattern]) {
                if (callbacks.active) {
                    if (!Array.isArray(callbacks.active)) {
                        callbacks.active = [callbacks.active];
                    }
                    for (let activeFct of callbacks.active) {
                        let index = this.subscribers[statePattern].callbacks.active.indexOf(activeFct);
                        if (index !== -1) {
                            this.subscribers[statePattern].callbacks.active.splice(index, 1);
                        }
                    }
                }
                if (callbacks.inactive) {
                    if (!Array.isArray(callbacks.inactive)) {
                        callbacks.inactive = [callbacks.inactive];
                    }
                    for (let inactiveFct of callbacks.inactive) {
                        let index = this.subscribers[statePattern].callbacks.inactive.indexOf(inactiveFct);
                        if (index !== -1) {
                            this.subscribers[statePattern].callbacks.inactive.splice(index, 1);
                        }
                    }
                }
                if (callbacks.askChange) {
                    if (!Array.isArray(callbacks.askChange)) {
                        callbacks.askChange = [callbacks.askChange];
                    }
                    for (let askChangeFct of callbacks.askChange) {
                        let index = this.subscribers[statePattern].callbacks.askChange.indexOf(askChangeFct);
                        if (index !== -1) {
                            this.subscribers[statePattern].callbacks.askChange.splice(index, 1);
                        }
                    }
                }
                if (this.subscribers[statePattern].callbacks.active.length === 0 &&
                    this.subscribers[statePattern].callbacks.inactive.length === 0 &&
                    this.subscribers[statePattern].callbacks.askChange.length === 0) {
                    delete this.subscribers[statePattern];
                }
            }
        }
    }
    onAfterStateChanged(cb) {
        this.afterStateChanged.add(cb);
    }
    offAfterStateChanged(cb) {
        this.afterStateChanged.remove(cb);
    }
    static prepareStateString(stateName) {
        let params = [];
        let i = 0;
        let regexState = stateName.replace(/{.*?}/g, (group, position) => {
            group = group.slice(1, -1);
            let splitted = group.split(":");
            let name = splitted[0].trim();
            let type = "string";
            let result = "([^\\/]+)";
            i++;
            if (splitted.length > 1) {
                if (splitted[1].trim() == "number") {
                    result = "([0-9]+)";
                    type = "number";
                }
            }
            params.push({
                name,
                type,
                position: i
            });
            return result;
        });
        regexState = regexState.replace(/\*/g, ".*?");
        regexState = "^" + regexState + '$';
        return {
            regex: new RegExp(regexState),
            params
        };
    }
    /**
     * Activate a current state
     */
    async setState(state) {
        let result = await this.changeStateMutex.safeRunLastAsync(async () => {
            let stateToUse;
            if (typeof state == "string") {
                stateToUse = new EmptyState(state);
            }
            else {
                stateToUse = state;
            }
            if (!stateToUse) {
                this._log("state is undefined", "error");
                this.changeStateMutex.release();
                return false;
            }
            let canChange = true;
            if (this.activeState) {
                let activeToInactive = [];
                let inactiveToActive = [];
                let triggerActive = [];
                canChange = await this.activeState.askChange(this.activeState, stateToUse);
                if (canChange) {
                    for (let statePattern in this.subscribers) {
                        let subscriber = this.subscribers[statePattern];
                        if (subscriber.isActive) {
                            let clone = [...subscriber.callbacks.askChange];
                            let currentSlug = this.getInternalStateSlugs(subscriber, this.activeState.name);
                            if (currentSlug) {
                                for (let i = 0; i < clone.length; i++) {
                                    let askChange = clone[i];
                                    if (!await askChange(this.activeState, stateToUse, currentSlug)) {
                                        canChange = false;
                                        break;
                                    }
                                }
                            }
                            let slugs = this.getInternalStateSlugs(subscriber, stateToUse.name);
                            if (slugs === null) {
                                activeToInactive.push(subscriber);
                            }
                            else {
                                triggerActive.push({
                                    subscriber: subscriber,
                                    params: slugs
                                });
                            }
                        }
                        else {
                            let slugs = this.getInternalStateSlugs(subscriber, stateToUse.name);
                            if (slugs) {
                                inactiveToActive.push({
                                    subscriber,
                                    params: slugs
                                });
                            }
                        }
                        if (!canChange) {
                            break;
                        }
                    }
                }
                if (canChange) {
                    const oldState = this.activeState;
                    this.activeState = stateToUse;
                    oldState.onInactivate(stateToUse);
                    for (let subscriber of activeToInactive) {
                        subscriber.isActive = false;
                        let oldSlug = this.getInternalStateSlugs(subscriber, oldState.name);
                        if (oldSlug) {
                            let oldSlugNotNull = oldSlug;
                            [...subscriber.callbacks.inactive].forEach(callback => {
                                callback(oldState, stateToUse, oldSlugNotNull);
                            });
                        }
                    }
                    for (let trigger of triggerActive) {
                        [...trigger.subscriber.callbacks.active].forEach(callback => {
                            callback(stateToUse, trigger.params);
                        });
                    }
                    for (let trigger of inactiveToActive) {
                        trigger.subscriber.isActive = true;
                        [...trigger.subscriber.callbacks.active].forEach(callback => {
                            callback(stateToUse, trigger.params);
                        });
                    }
                    stateToUse.onActivate();
                }
            }
            else {
                this.activeState = stateToUse;
                for (let key in this.subscribers) {
                    let slugs = this.getInternalStateSlugs(this.subscribers[key], stateToUse.name);
                    if (slugs) {
                        let slugsNotNull = slugs;
                        this.subscribers[key].isActive = true;
                        [...this.subscribers[key].callbacks.active].forEach(callback => {
                            callback(stateToUse, slugsNotNull);
                        });
                    }
                }
                stateToUse.onActivate();
            }
            this.afterStateChanged.trigger([]);
            return true;
        });
        return result ?? false;
    }
    getState() {
        return this.activeState;
    }
    getInternalStateSlugs(subscriber, stateName) {
        let matches = subscriber.regex.exec(stateName);
        if (matches) {
            let slugs = {};
            for (let param of subscriber.params) {
                if (param.type == "number") {
                    slugs[param.name] = Number(matches[param.position]);
                }
                else {
                    slugs[param.name] = matches[param.position];
                }
            }
            return slugs;
        }
        return null;
    }
    /**
     * Check if a state is in the subscribers and active, return true if it is, false otherwise
     */
    isStateActive(statePattern) {
        return StateManager.prepareStateString(statePattern).regex.test(this.activeState?.name ?? '');
    }
    /**
     * Get slugs information for the current state, return null if state isn't active
     */
    getStateSlugs(statePattern) {
        let prepared = StateManager.prepareStateString(statePattern);
        let name = this.activeState?.name ?? '';
        return this.getInternalStateSlugs({
            regex: prepared.regex,
            params: prepared.params,
            isActive: false,
            callbacks: {
                active: [],
                inactive: [],
                askChange: [],
            }
        }, name);
    }
    // 0 = error only / 1 = errors and warning / 2 = error, warning and logs (not implemented)
    logLevel() {
        return 0;
    }
    _log(msg, type) {
        if (type === "error") {
            console.error(msg);
        }
        else if (type === "warning" && this.logLevel() > 0) {
            console.warn(msg);
        }
        else if (type === "info" && this.logLevel() > 1) {
            console.log(msg);
        }
    }
}
StateManager.Namespace=`${moduleName}`;
_.StateManager=StateManager;
const WebComponentTemplateContext=class WebComponentTemplateContext {
    __changes = {};
    component;
    fctsToRemove = [];
    c = {
        __P: (value) => {
            return value == null ? "" : value + "";
        }
    };
    isRendered = false;
    schema;
    constructor(component, schema, locals) {
        this.component = component;
        this.schema = { ...schema };
        for (let key in locals) {
            this.schema.locals[key] = locals[key];
        }
        this.buildSchema();
    }
    destructor() {
        for (let toRemove of this.fctsToRemove) {
            let index = this.component['__onChangeFct'][toRemove.name].indexOf(toRemove.fct);
            if (index != -1) {
                this.component['__onChangeFct'][toRemove.name].splice(index, 1);
            }
        }
    }
    buildSchema() {
        for (let global of this.schema.globals) {
            this.createGlobal(global);
        }
        for (let item in this.schema.loops) {
            this.createLoop(item, this.schema.loops[item].index, this.schema.loops[item].data);
        }
        for (let key in this.schema.locals) {
            this.createLocal(key, this.schema.locals[key]);
        }
    }
    createGlobal(global) {
        let comp = this.component;
        Object.defineProperty(this.c, global, {
            get() {
                return WebComponentTemplate.getValueFromItem(global, comp);
            },
            set(value) {
                WebComponentTemplate.setValueToItem(global, comp, value);
            }
        });
        let name = global.split(".")[0];
        this.__changes[name] = [];
        if (!this.component['__onChangeFct'][name]) {
            this.component['__onChangeFct'][name] = [];
        }
        let fct = (path) => {
            if (this.isRendered) {
                for (let change of this.__changes[name]) {
                    change(path);
                }
            }
        };
        this.fctsToRemove.push({ name, fct });
        this.component['__onChangeFct'][name].push(fct);
    }
    createLoop(item, index, data) {
        Object.defineProperty(this.c, item, {
            get() {
                let indexValue = this[index];
                return WebComponentTemplate.getValueFromItem(data, this)[indexValue];
            }
        });
        let name = data.split(".")[0];
        this.__changes[item] = [];
        this.__changes[name].push((path) => {
            if (this.isRendered) {
                let currentPath = `${data}[${this.c[index]}]`;
                if (path.startsWith(currentPath)) {
                    let localPath = path.replace(currentPath, item);
                    for (let change of this.__changes[item]) {
                        change(localPath);
                    }
                }
            }
        });
    }
    createLocal(key, value) {
        let changes = this.__changes;
        Object.defineProperty(this.c, key, {
            get() {
                return value;
            },
            set(value) {
                value = value;
                if (changes[key]) {
                    for (let change of changes[key]) {
                        change(key);
                    }
                }
            }
        });
    }
    addChange(on, fct) {
        if (!this.__changes[on]) {
            this.__changes[on] = [];
        }
        this.__changes[on].push(fct);
    }
}
WebComponentTemplateContext.Namespace=`${moduleName}`;
_.WebComponentTemplateContext=WebComponentTemplateContext;
const WebComponentTemplate=class WebComponentTemplate {
    static setValueToItem(path, obj, value) {
        let splitted = path.split(".");
        for (let i = 0; i < splitted.length - 1; i++) {
            let split = splitted[i];
            if (!obj[split]) {
                obj[split] = {};
            }
            obj = obj[split];
        }
        obj[splitted[splitted.length - 1]] = value;
    }
    static getValueFromItem(path, obj) {
        let splitted = path.split(".");
        for (let i = 0; i < splitted.length - 1; i++) {
            let split = splitted[i];
            if (typeof obj[split] !== 'object') {
                return undefined;
            }
            obj = obj[split];
        }
        return obj[splitted[splitted.length - 1]];
    }
    static validatePath(path, pathToCheck) {
        if (path.startsWith(pathToCheck)) {
            return true;
        }
        return false;
    }
    cst;
    constructor(component) {
        this.cst = component;
    }
    htmlParts = [];
    setHTML(data) {
        this.htmlParts.push(data);
    }
    generateTemplate() {
        this.template = document.createElement('template');
        let currentHTML = "<slot></slot>";
        let previousSlots = {
            default: '<slot></slot>'
        };
        for (let htmlPart of this.htmlParts) {
            for (let blockName in htmlPart.blocks) {
                if (!previousSlots.hasOwnProperty(blockName)) {
                    throw "can't found slot with name " + blockName;
                }
                currentHTML = currentHTML.replace(previousSlots[blockName], htmlPart.blocks[blockName]);
            }
            for (let slotName in htmlPart.slots) {
                previousSlots[slotName] = htmlPart.slots[slotName];
            }
        }
        this.template.innerHTML = currentHTML;
    }
    setTemplate(template) {
        this.template = document.createElement('template');
        this.template.innerHTML = template;
    }
    contextSchema = {
        globals: [],
        locals: {},
        loops: {}
    };
    template;
    actions = {};
    loops = [];
    setActions(actions) {
        if (!this.actions) {
            this.actions = actions;
        }
        else {
            if (actions.elements) {
                if (!this.actions.elements) {
                    this.actions.elements = [];
                }
                this.actions.elements = [...actions.elements, ...this.actions.elements];
            }
            if (actions.events) {
                if (!this.actions.events) {
                    this.actions.events = [];
                }
                this.actions.events = [...actions.events, ...this.actions.events];
            }
            if (actions.pressEvents) {
                if (!this.actions.pressEvents) {
                    this.actions.pressEvents = [];
                }
                this.actions.pressEvents = [...actions.pressEvents, ...this.actions.pressEvents];
            }
            if (actions.content) {
                if (!this.actions.content) {
                    this.actions.content = actions.content;
                }
                else {
                    for (let contextProp in actions.content) {
                        if (!this.actions.content[contextProp]) {
                            this.actions.content[contextProp] = actions.content[contextProp];
                        }
                        else {
                            this.actions.content[contextProp] = [...actions.content[contextProp], ...this.actions.content[contextProp]];
                        }
                    }
                }
            }
            if (actions.injection) {
                if (!this.actions.injection) {
                    this.actions.injection = actions.injection;
                }
                else {
                    for (let contextProp in actions.injection) {
                        if (!this.actions.injection[contextProp]) {
                            this.actions.injection[contextProp] = actions.injection[contextProp];
                        }
                        else {
                            this.actions.injection[contextProp] = { ...actions.injection[contextProp], ...this.actions.injection[contextProp] };
                        }
                    }
                }
            }
            if (actions.bindings) {
                if (!this.actions.bindings) {
                    this.actions.bindings = actions.bindings;
                }
                else {
                    for (let contextProp in actions.bindings) {
                        if (!this.actions.bindings[contextProp]) {
                            this.actions.bindings[contextProp] = actions.bindings[contextProp];
                        }
                        else {
                            this.actions.bindings[contextProp] = { ...actions.bindings[contextProp], ...this.actions.bindings[contextProp] };
                        }
                    }
                }
            }
        }
    }
    setSchema(contextSchema) {
        if (contextSchema.globals) {
            for (let glob of contextSchema.globals) {
                if (!this.contextSchema.globals.includes(glob)) {
                    this.contextSchema.globals.push(glob);
                }
            }
        }
        if (contextSchema.locals) {
            for (let key in contextSchema.locals) {
                this.contextSchema.locals[key] = contextSchema.locals[key];
            }
        }
        if (contextSchema.loops) {
            for (let key in contextSchema.loops) {
                this.contextSchema.loops[key] = contextSchema.loops[key];
            }
        }
    }
    createInstance(component) {
        let context = new WebComponentTemplateContext(component, this.contextSchema, {});
        let content = this.template?.content.cloneNode(true);
        let actions = this.actions;
        let instance = new WebComponentTemplateInstance(context, content, actions, component, this.loops);
        return instance;
    }
    addLoop(loop) {
        this.loops.push(loop);
    }
}
WebComponentTemplate.Namespace=`${moduleName}`;
_.WebComponentTemplate=WebComponentTemplate;
const WebComponentTemplateInstance=class WebComponentTemplateInstance {
    context;
    content;
    actions;
    component;
    _components = {};
    firstRenderUniqueCb = {};
    firstRenderCb = [];
    fctsToRemove = [];
    loopRegisteries = {};
    firstChild;
    lastChild;
    loops = [];
    constructor(context, content, actions, component, loops) {
        this.context = context;
        this.content = content;
        this.actions = actions;
        this.component = component;
        this.loops = loops;
        this.firstChild = content.firstChild;
        this.lastChild = content.lastChild;
        this.selectElements();
        this.transformActionsListening();
    }
    render() {
        this.bindEvents();
        for (let cb of this.firstRenderCb) {
            cb();
        }
        for (let key in this.firstRenderUniqueCb) {
            this.firstRenderUniqueCb[key]();
        }
        this.renderSubTemplate();
        this.context.isRendered = true;
    }
    destructor() {
        this.firstChild.remove();
        this.context.destructor();
        for (let toRemove of this.fctsToRemove) {
            let index = this.component['__watchActions'][toRemove.name].indexOf(toRemove.fct);
            if (index != -1) {
                this.component['__watchActions'][toRemove.name].splice(index, 1);
            }
        }
    }
    selectElements() {
        this._components = {};
        let idEls = Array.from(this.content.querySelectorAll('[_id]'));
        for (let idEl of idEls) {
            let id = idEl.attributes['_id'].value;
            if (!this._components[id]) {
                this._components[id] = [];
            }
            this._components[id].push(idEl);
        }
        if (this.actions.elements) {
            for (let element of this.actions.elements) {
                let components = [];
                for (let id of element.ids) {
                    if (this._components[id]) {
                        components = [...components, ...this._components[id]];
                    }
                }
                if (element.isArray) {
                    WebComponentTemplate.setValueToItem(element.name, this.component, components);
                }
                else if (components[0]) {
                    WebComponentTemplate.setValueToItem(element.name, this.component, components[0]);
                }
            }
        }
    }
    bindEvents() {
        if (this.actions.events) {
            for (let event of this.actions.events) {
                this.bindEvent(event);
            }
        }
        if (this.actions.pressEvents) {
            for (let event of this.actions.pressEvents) {
                this.bindPressEvent(event);
            }
        }
    }
    bindEvent(event) {
        if (!this._components[event.id]) {
            return;
        }
        if (event.isCallback) {
            for (let el of this._components[event.id]) {
                let cb = WebComponentTemplate.getValueFromItem(event.eventName, el);
                cb?.add((...args) => {
                    event.fct(this.context, args);
                });
            }
        }
        else {
            for (let el of this._components[event.id]) {
                el.addEventListener(event.eventName, (e) => { event.fct(e, this.context); });
            }
        }
    }
    bindPressEvent(event) {
        let id = event['id'];
        if (id && this._components[id]) {
            let clone = {};
            for (let temp in event) {
                if (temp != 'id') {
                    if (event[temp] instanceof Function) {
                        clone[temp] = (e, pressInstance) => { event[temp](e, pressInstance, this.context); };
                    }
                    else {
                        clone[temp] = event[temp];
                    }
                }
            }
            clone.element = this._components[id];
            PressManager.create(clone);
        }
    }
    transformActionsListening() {
        if (this.actions.content) {
            for (let name in this.actions.content) {
                for (let change of this.actions.content[name]) {
                    this.transformChangeAction(name, change);
                }
            }
        }
        if (this.actions.injection) {
            for (let name in this.actions.injection) {
                for (let injection of this.actions.injection[name]) {
                    this.transformInjectionAction(name, injection);
                }
            }
        }
        if (this.actions.bindings) {
            for (let name in this.actions.bindings) {
                for (let binding of this.actions.bindings[name]) {
                    this.transformBindigAction(name, binding);
                }
            }
        }
    }
    transformChangeAction(name, change) {
        if (!this._components[change.id])
            return;
        let key = change.id + "_" + change.attrName;
        if (change.attrName == "@HTML") {
            if (change.path) {
                this.context.addChange(name, (path) => {
                    if (WebComponentTemplate.validatePath(path, change.path ?? '')) {
                        for (const el of this._components[change.id]) {
                            el.innerHTML = change.render(this.context.c);
                        }
                    }
                });
            }
            else {
                this.context.addChange(name, (path) => {
                    for (const el of this._components[change.id]) {
                        el.innerHTML = change.render(this.context.c);
                    }
                });
            }
            if (!this.firstRenderUniqueCb[key]) {
                this.firstRenderUniqueCb[key] = () => {
                    for (const el of this._components[change.id]) {
                        el.innerHTML = change.render(this.context.c);
                    }
                };
            }
        }
        else if (change.isBool) {
            this.context.addChange(name, () => {
                for (const el of this._components[change.id]) {
                    if (this.context.c[name]) {
                        el.setAttribute(change.attrName, "true");
                    }
                    else {
                        el.removeAttribute(change.attrName);
                    }
                }
            });
            if (!this.firstRenderUniqueCb[key]) {
                this.firstRenderUniqueCb[key] = () => {
                    for (const el of this._components[change.id]) {
                        if (this.context.c[name]) {
                            el.setAttribute(change.attrName, "true");
                        }
                        else {
                            el.removeAttribute(change.attrName);
                        }
                    }
                };
            }
        }
        else {
            if (change.path) {
                this.context.addChange(name, (path) => {
                    if (WebComponentTemplate.validatePath(path, change.path ?? '')) {
                        for (const el of this._components[change.id]) {
                            el.setAttribute(change.attrName, change.render(this.context.c));
                        }
                    }
                });
            }
            else {
                this.context.addChange(name, (path) => {
                    for (const el of this._components[change.id]) {
                        el.setAttribute(change.attrName, change.render(this.context.c));
                    }
                });
            }
            if (!this.firstRenderUniqueCb[key]) {
                this.firstRenderUniqueCb[key] = () => {
                    for (const el of this._components[change.id]) {
                        el.setAttribute(change.attrName, change.render(this.context.c));
                    }
                };
            }
        }
    }
    transformInjectionAction(name, injection) {
        if (!this._components[injection.id])
            return;
        if (injection.path) {
            this.context.addChange(name, (path) => {
                if (WebComponentTemplate.validatePath(path, injection.path ?? '')) {
                    for (const el of this._components[injection.id]) {
                        el[injection.injectionName] = injection.inject(this.context.c);
                    }
                }
            });
        }
        else {
            this.context.addChange(name, (path) => {
                for (const el of this._components[injection.id]) {
                    el[injection.injectionName] = injection.inject(this.context.c);
                }
            });
        }
        this.firstRenderCb.push(() => {
            for (const el of this._components[injection.id]) {
                el[injection.injectionName] = injection.inject(this.context.c);
            }
        });
    }
    transformBindigAction(name, binding) {
        if (!this._components[binding.id])
            return;
        if (binding.path) {
            this.context.addChange(name, (path) => {
                let bindingPath = binding.path ?? '';
                if (WebComponentTemplate.validatePath(path, bindingPath)) {
                    let valueToSet = WebComponentTemplate.getValueFromItem(bindingPath, this.context.c);
                    for (const el of this._components[binding.id]) {
                        WebComponentTemplate.setValueToItem(binding.valueName, el, valueToSet);
                    }
                }
            });
        }
        else {
            binding.path = name;
            this.context.addChange(name, (path) => {
                let valueToSet = WebComponentTemplate.getValueFromItem(name, this.context.c);
                for (const el of this._components[binding.id]) {
                    WebComponentTemplate.setValueToItem(binding.valueName, el, valueToSet);
                }
            });
        }
        if (binding.isCallback) {
            this.firstRenderCb.push(() => {
                for (var el of this._components[binding.id]) {
                    for (let fct of binding.eventNames) {
                        let cb = WebComponentTemplate.getValueFromItem(fct, el);
                        cb?.add((value) => {
                            WebComponentTemplate.setValueToItem(binding.path ?? '', this.context.c, value);
                        });
                    }
                    let valueToSet = WebComponentTemplate.getValueFromItem(binding.path ?? '', this.context.c);
                    WebComponentTemplate.setValueToItem(binding.valueName, el, valueToSet);
                }
            });
        }
        else {
            this.firstRenderCb.push(() => {
                for (var el of this._components[binding.id]) {
                    for (let fct of binding.eventNames) {
                        el.addEventListener(fct, (e) => {
                            let valueToSet = WebComponentTemplate.getValueFromItem(binding.valueName, e.target);
                            WebComponentTemplate.setValueToItem(binding.path ?? '', this.context.c, valueToSet);
                        });
                    }
                    let valueToSet = WebComponentTemplate.getValueFromItem(binding.path ?? '', this.context.c);
                    WebComponentTemplate.setValueToItem(binding.valueName, el, valueToSet);
                }
            });
        }
    }
    renderSubTemplate() {
        for (let loop of this.loops) {
            let localContext = JSON.parse(JSON.stringify(this.context.schema));
            localContext.loops[loop.item] = {
                data: loop.data,
                index: loop.index,
            };
            this.renderLoop(loop, localContext);
            this.registerLoopWatchEvent(loop, localContext);
        }
    }
    renderLoop(loop, localContext) {
        if (this.loopRegisteries[loop.anchorId]) {
            for (let item of this.loopRegisteries[loop.anchorId]) {
                item.destructor();
            }
        }
        this.loopRegisteries[loop.anchorId] = [];
        let result = WebComponentTemplate.getValueFromItem(loop.data, this.context.c);
        let anchor = this._components[loop.anchorId][0];
        for (let i = 0; i < result.length; i++) {
            let context = new WebComponentTemplateContext(this.component, localContext, { [loop.index]: i });
            let content = loop.template.template?.content.cloneNode(true);
            let actions = loop.template.actions;
            let instance = new WebComponentTemplateInstance(context, content, actions, this.component, loop.template.loops);
            instance.render();
            anchor.parentNode?.insertBefore(instance.content, anchor);
            this.loopRegisteries[loop.anchorId].push(instance);
        }
    }
    registerLoopWatchEvent(loop, localContext) {
        let fullPath = loop.data;
        let watchName = fullPath.split(".")[0];
        if (!this.component['__watchActions'][watchName]) {
            this.component['__watchActions'][watchName] = [];
        }
        let regex = new RegExp(fullPath.replace(/\./g, "\\.") + "\\[(\\d+?)\\]$");
        this.component['__watchActions'][watchName].push((element, action, path, value) => {
            if (path == fullPath) {
                this.renderLoop(loop, localContext);
                return;
            }
            regex.lastIndex = 0;
            let result = regex.exec(path);
            if (result) {
                let registry = this.loopRegisteries[loop.anchorId];
                let index = Number(result[1]);
                if (action == WatchAction.CREATED) {
                    let context = new WebComponentTemplateContext(this.component, localContext, { [loop.index]: index });
                    let content = loop.template.template?.content.cloneNode(true);
                    let actions = loop.template.actions;
                    let instance = new WebComponentTemplateInstance(context, content, actions, this.component, loop.template.loops);
                    instance.render();
                    let anchor;
                    if (index < registry.length) {
                        anchor = registry[index].firstChild;
                    }
                    else {
                        anchor = this._components[loop.anchorId][0];
                    }
                    anchor.parentNode?.insertBefore(instance.content, anchor);
                    registry.splice(index, 0, instance);
                    for (let i = index + 1; i < registry.length; i++) {
                        registry[i].context.c[loop.index] = registry[i].context.c[loop.index] + 1;
                    }
                }
                else if (action == WatchAction.UPDATED) {
                    registry[index].render();
                }
                else if (action == WatchAction.DELETED) {
                    registry[index].destructor();
                    registry.splice(index, 1);
                    for (let i = index; i < registry.length; i++) {
                        registry[i].context.c[loop.index] = registry[i].context.c[loop.index] - 1;
                    }
                }
            }
        });
    }
}
WebComponentTemplateInstance.Namespace=`${moduleName}`;
_.WebComponentTemplateInstance=WebComponentTemplateInstance;
const WebComponent=class WebComponent extends HTMLElement {
    /**
     * Add attributes informations
     */
    static get observedAttributes() {
        return [];
    }
    _first;
    _isReady;
    /**
     * Determine if the component is ready (postCreation done)
     */
    get isReady() {
        return this._isReady;
    }
    /**
     * The current namespace
     */
    static Namespace = "";
    /**
     * Get the unique type for the data. Define it as the namespace + class name
     */
    static get Fullname() { return this.Namespace + "." + this.name; }
    /**
     * The current namespace
     */
    get namespace() {
        return this.constructor['Namespace'];
    }
    /**
     * Get the name of the component class
     */
    getClassName() {
        return this.constructor.name;
    }
    /**
    * Get the unique type for the data. Define it as the namespace + class name
    */
    get $type() {
        return this.constructor['Fullname'];
    }
    __onChangeFct = {};
    __watch;
    __watchActions = {};
    __watchActionsCb = {};
    __pressManagers = [];
    __isDefaultState = true;
    __defaultActiveState = new Map();
    __defaultInactiveState = new Map();
    __statesList = {};
    constructor() {
        super();
        if (this.constructor == WebComponent) {
            throw "can't instanciate an abstract class";
        }
        this.__removeNoAnimations = this.__removeNoAnimations.bind(this);
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", this.__removeNoAnimations);
        }
        this._first = true;
        this._isReady = false;
        this.__renderTemplate();
        this.__registerWatchesActions();
        this.__registerPropertiesActions();
        this.__createStates();
        this.__subscribeState();
    }
    /**
     * Remove all listeners
     * State + press
     */
    destructor() {
        WebComponentInstance.removeInstance(this);
        this.__unsubscribeState();
        for (let press of this.__pressManagers) {
            press.destroy();
        }
        // TODO add missing info for destructor();
    }
    __addWatchesActions(name, fct) {
        if (!this.__watchActions[name]) {
            this.__watchActions[name] = [];
            this.__watchActionsCb[name] = (action, path, value) => {
                for (let fct of this.__watchActions[name]) {
                    fct(this, action, path, value);
                }
                if (this.__onChangeFct[name]) {
                    for (let fct of this.__onChangeFct[name]) {
                        fct(path);
                    }
                }
            };
        }
        if (fct) {
            this.__watchActions[name].push(fct);
        }
    }
    __registerWatchesActions() {
        if (Object.keys(this.__watchActions).length > 0) {
            if (!this.__watch) {
                this.__watch = Watcher.get({}, (type, path, element) => {
                    let action = this.__watchActionsCb[path.split(".")[0]] || this.__watchActionsCb[path.split("[")[0]];
                    action(type, path, element);
                });
            }
        }
    }
    __addPropertyActions(name, fct) {
        if (!this.__onChangeFct[name]) {
            this.__onChangeFct[name] = [];
        }
        if (fct) {
            this.__onChangeFct[name].push(() => {
                fct(this);
            });
        }
    }
    __registerPropertiesActions() { }
    static __style = ``;
    static __template;
    __templateInstance;
    styleBefore(addStyle) {
        addStyle("@general");
    }
    styleAfter(addStyle) {
    }
    __getStyle() {
        return [WebComponent.__style];
    }
    __getHtml() { }
    __getStatic() {
        return WebComponent;
    }
    static __styleSheets = {};
    __renderStyles() {
        let sheets = {};
        const addStyle = (name) => {
            let sheet = Style.get(name);
            if (sheet) {
                sheets[name] = sheet;
            }
        };
        this.styleBefore(addStyle);
        let localStyle = new CSSStyleSheet();
        let styleTxt = this.__getStyle().join("\r\n");
        if (styleTxt.length > 0) {
            localStyle.replace(styleTxt);
            sheets['@local'] = localStyle;
        }
        this.styleAfter(addStyle);
        return sheets;
    }
    __renderTemplate() {
        let staticInstance = this.__getStatic();
        if (!staticInstance.__template || staticInstance.__template.cst != staticInstance) {
            staticInstance.__template = new WebComponentTemplate(staticInstance);
            this.__getHtml();
            this.__registerTemplateAction();
            staticInstance.__template.generateTemplate();
            staticInstance.__styleSheets = this.__renderStyles();
        }
        this.__templateInstance = staticInstance.__template.createInstance(this);
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.adoptedStyleSheets = [...Object.values(staticInstance.__styleSheets), Style.noAnimation];
        shadowRoot.appendChild(this.__templateInstance.content);
        customElements.upgrade(shadowRoot);
        return shadowRoot;
    }
    __registerTemplateAction() {
    }
    connectedCallback() {
        if (this._first) {
            WebComponentInstance.addInstance(this);
            this._first = false;
            this.__defaultValues();
            this.__upgradeAttributes();
            this.__templateInstance?.render();
            this.__removeNoAnimations();
        }
    }
    __removeNoAnimations() {
        if (document.readyState !== "loading") {
            this.offsetWidth;
            setTimeout(() => {
                this.postCreation();
                this._isReady = true;
                this.dispatchEvent(new CustomEvent('postCreationDone'));
                this.shadowRoot.adoptedStyleSheets = Object.values(this.__getStatic().__styleSheets);
                document.removeEventListener("DOMContentLoaded", this.__removeNoAnimations);
            }, 50);
        }
    }
    __defaultValues() { }
    __upgradeAttributes() { }
    __listBoolProps() {
        return [];
    }
    __upgradeProperty(prop) {
        let boolProps = this.__listBoolProps();
        if (boolProps.indexOf(prop) != -1) {
            if (this.hasAttribute(prop) && (this.getAttribute(prop) === "true" || this.getAttribute(prop) === "")) {
                let value = this.getAttribute(prop);
                delete this[prop];
                this[prop] = value;
            }
            else {
                this.removeAttribute(prop);
                this[prop] = false;
            }
        }
        else {
            if (this.hasAttribute(prop)) {
                let value = this.getAttribute(prop);
                delete this[prop];
                this[prop] = value;
            }
        }
    }
    __getStateManager(managerClass) {
        let mClass;
        if (managerClass instanceof StateManager) {
            mClass = managerClass;
        }
        else {
            mClass = Instance.get(managerClass);
        }
        return mClass;
    }
    __addActiveDefState(managerClass, cb) {
        let mClass = this.__getStateManager(managerClass);
        if (!this.__defaultActiveState.has(mClass)) {
            this.__defaultActiveState.set(mClass, []);
        }
        this.__defaultActiveState.get(mClass)?.push(cb);
    }
    __addInactiveDefState(managerClass, cb) {
        let mClass = this.__getStateManager(managerClass);
        if (!this.__defaultInactiveState.has(mClass)) {
            this.__defaultInactiveState.set(mClass, []);
        }
        this.__defaultInactiveState.get(mClass)?.push(cb);
    }
    __addActiveState(statePattern, managerClass, cb) {
        let mClass = this.__getStateManager(managerClass);
        this.__statesList[statePattern].get(mClass)?.active.push(cb);
    }
    __addInactiveState(statePattern, managerClass, cb) {
        let mClass = this.__getStateManager(managerClass);
        this.__statesList[statePattern].get(mClass)?.inactive.push(cb);
    }
    __addAskChangeState(statePattern, managerClass, cb) {
        let mClass = this.__getStateManager(managerClass);
        this.__statesList[statePattern].get(mClass)?.askChange.push(cb);
    }
    __createStates() { }
    __createStatesList(statePattern, managerClass) {
        if (!this.__statesList[statePattern]) {
            this.__statesList[statePattern] = new Map();
        }
        let mClass = this.__getStateManager(managerClass);
        if (!this.__statesList[statePattern].has(mClass)) {
            this.__statesList[statePattern].set(mClass, {
                active: [],
                inactive: [],
                askChange: []
            });
        }
    }
    __inactiveDefaultState(managerClass) {
        if (this.__isDefaultState) {
            this.__isDefaultState = false;
            let mClass = this.__getStateManager(managerClass);
            if (this.__defaultInactiveState.has(mClass)) {
                let fcts = this.__defaultInactiveState.get(mClass) ?? [];
                for (let fct of fcts) {
                    fct.bind(this)();
                }
            }
        }
    }
    __activeDefaultState(nextStep, managerClass) {
        if (!this.__isDefaultState) {
            for (let pattern in this.__statesList) {
                if (StateManager.canBeActivate(pattern, nextStep)) {
                    let mClass = this.__getStateManager(managerClass);
                    if (this.__statesList[pattern].has(mClass)) {
                        return;
                    }
                }
            }
            this.__isDefaultState = true;
            let mClass = this.__getStateManager(managerClass);
            if (this.__defaultActiveState.has(mClass)) {
                let fcts = this.__defaultActiveState.get(mClass) ?? [];
                for (let fct of fcts) {
                    fct.bind(this)();
                }
            }
        }
    }
    __subscribeState() {
        if (!this.isReady && this.__stateCleared) {
            return;
        }
        for (let route in this.__statesList) {
            for (const managerClass of this.__statesList[route].keys()) {
                let el = this.__statesList[route].get(managerClass);
                if (el) {
                    managerClass.subscribe(route, el);
                }
            }
        }
    }
    __stateCleared = false;
    __unsubscribeState() {
        for (let route in this.__statesList) {
            for (const managerClass of this.__statesList[route].keys()) {
                let el = this.__statesList[route].get(managerClass);
                if (el) {
                    managerClass.unsubscribe(route, el);
                }
            }
        }
        this.__stateCleared = true;
    }
    dateToString(d) {
        if (d instanceof Date) {
            return new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
        }
        return null;
    }
    dateTimeToString(dt) {
        if (dt instanceof Date) {
            return new Date(dt.getTime() - (dt.getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
        }
        return null;
    }
    stringToDate(s) {
        let td = new Date(s);
        let d = new Date(td.getTime() + (td.getTimezoneOffset() * 60000));
        if (isNaN(d)) {
            return null;
        }
        return d;
    }
    stringToDateTime(s) {
        let td = new Date(s);
        let d = new Date(td.getTime() + (td.getTimezoneOffset() * 60000));
        if (isNaN(d)) {
            return null;
        }
        return d;
    }
    getBoolean(val) {
        if (val === true || val === 1 || val === 'true' || val === '') {
            return true;
        }
        else if (val === false || val === 0 || val === 'false' || val === null || val === undefined) {
            return false;
        }
        console.error("error parsing boolean value " + val);
        return false;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue || !this.isReady) {
            if (this.__onChangeFct.hasOwnProperty(name)) {
                for (let fct of this.__onChangeFct[name]) {
                    fct('');
                }
            }
        }
    }
    remove() {
        super.remove();
        this.postDestruction();
    }
    /**
     * Function triggered when the component is removed from the DOM
     */
    postDestruction() { }
    /**
     * Function triggered the first time the component is rendering inside DOM
     */
    postCreation() { }
    /**
     * Find a parent by tagname if exist
     */
    findParentByTag(tagname, untilNode) {
        return ElementExtension.findParentByTag(this, tagname, untilNode);
    }
    /**
     * Find a parent by class name if exist
     */
    findParentByClass(classname, untilNode) {
        return ElementExtension.findParentByClass(this, classname, untilNode);
    }
    /**
     * Find a parent by type if exist
     */
    findParentByType(type, untilNode) {
        return ElementExtension.findParentByType(this, type, untilNode);
    }
    /**
     * Find list of parents by tagname
     */
    findParents(tagname, untilNode) {
        return ElementExtension.findParents(this, tagname, untilNode);
    }
    /**
     * Check if element contains a child
     */
    containsChild(el) {
        return ElementExtension.containsChild(this, el);
    }
    /**
     * Get element inside slot
     */
    getElementsInSlot(slotName) {
        return ElementExtension.getElementsInSlot(this, slotName);
    }
}
WebComponent.Namespace=`${moduleName}`;
_.WebComponent=WebComponent;
const ResizeObserver=class ResizeObserver {
    callback;
    targets;
    fpsInterval = -1;
    nextFrame;
    entriesChangedEvent;
    willTrigger;
    static resizeObserverClassByObject = {};
    static uniqueInstance;
    static getUniqueInstance() {
        if (!ResizeObserver.uniqueInstance) {
            ResizeObserver.uniqueInstance = new window.ResizeObserver(entries => {
                let allClasses = [];
                for (let j = 0; j < entries.length; j++) {
                    let entry = entries[j];
                    let index = entry.target['sourceIndex'];
                    if (ResizeObserver.resizeObserverClassByObject[index]) {
                        for (let i = 0; i < ResizeObserver.resizeObserverClassByObject[index].length; i++) {
                            let classTemp = ResizeObserver.resizeObserverClassByObject[index][i];
                            classTemp.entryChanged(entry);
                            if (allClasses.indexOf(classTemp) == -1) {
                                allClasses.push(classTemp);
                            }
                        }
                    }
                }
                for (let i = 0; i < allClasses.length; i++) {
                    allClasses[i].triggerCb();
                }
            });
        }
        return ResizeObserver.uniqueInstance;
    }
    constructor(options) {
        let realOption;
        if (options instanceof Function) {
            realOption = {
                callback: options,
            };
        }
        else {
            realOption = options;
        }
        this.callback = realOption.callback;
        this.targets = [];
        if (!realOption.fps) {
            realOption.fps = 60;
        }
        if (realOption.fps != -1) {
            this.fpsInterval = 1000 / realOption.fps;
        }
        this.nextFrame = 0;
        this.entriesChangedEvent = {};
        this.willTrigger = false;
    }
    /**
     * Observe size changing for the element
     */
    observe(target) {
        if (!target["sourceIndex"]) {
            target["sourceIndex"] = Math.random().toString(36);
            this.targets.push(target);
            ResizeObserver.resizeObserverClassByObject[target["sourceIndex"]] = [];
            ResizeObserver.getUniqueInstance().observe(target);
        }
        if (ResizeObserver.resizeObserverClassByObject[target["sourceIndex"]].indexOf(this) == -1) {
            ResizeObserver.resizeObserverClassByObject[target["sourceIndex"]].push(this);
        }
    }
    /**
     * Stop observing size changing for the element
     */
    unobserve(target) {
        for (let i = 0; this.targets.length; i++) {
            let tempTarget = this.targets[i];
            if (tempTarget == target) {
                let position = ResizeObserver.resizeObserverClassByObject[target['sourceIndex']].indexOf(this);
                if (position != -1) {
                    ResizeObserver.resizeObserverClassByObject[target['sourceIndex']].splice(position, 1);
                }
                if (ResizeObserver.resizeObserverClassByObject[target['sourceIndex']].length == 0) {
                    delete ResizeObserver.resizeObserverClassByObject[target['sourceIndex']];
                }
                ResizeObserver.getUniqueInstance().unobserve(target);
                this.targets.splice(i, 1);
                return;
            }
        }
    }
    /**
     * Destroy the resize observer
     */
    disconnect() {
        for (let i = 0; this.targets.length; i++) {
            this.unobserve(this.targets[i]);
        }
    }
    entryChanged(entry) {
        let index = entry.target.sourceIndex;
        this.entriesChangedEvent[index] = entry;
    }
    triggerCb() {
        if (!this.willTrigger) {
            this.willTrigger = true;
            this._triggerCb();
        }
    }
    _triggerCb() {
        let now = window.performance.now();
        let elapsed = now - this.nextFrame;
        if (this.fpsInterval != -1 && elapsed <= this.fpsInterval) {
            requestAnimationFrame(() => {
                this._triggerCb();
            });
            return;
        }
        this.nextFrame = now - (elapsed % this.fpsInterval);
        let changed = Object.values(this.entriesChangedEvent);
        this.entriesChangedEvent = {};
        this.willTrigger = false;
        setTimeout(() => {
            this.callback(changed);
        }, 0);
    }
}
ResizeObserver.Namespace=`${moduleName}`;
_.ResizeObserver=ResizeObserver;
const Animation=class Animation {
    /**
     * Default FPS for all Animation if not set inside options
     */
    static FPS_DEFAULT = 60;
    options;
    nextFrame = 0;
    fpsInterval;
    continueAnimation = false;
    frame_id = 0;
    constructor(options) {
        if (!options.animate) {
            options.animate = () => { };
        }
        if (!options.stopped) {
            options.stopped = () => { };
        }
        if (!options.fps) {
            options.fps = Animation.FPS_DEFAULT;
        }
        this.options = options;
        this.fpsInterval = 1000 / options.fps;
    }
    animate() {
        let now = window.performance.now();
        let elapsed = now - this.nextFrame;
        if (elapsed <= this.fpsInterval) {
            this.frame_id = requestAnimationFrame(() => this.animate());
            return;
        }
        this.nextFrame = now - (elapsed % this.fpsInterval);
        setTimeout(() => {
            this.options.animate();
        }, 0);
        if (this.continueAnimation) {
            this.frame_id = requestAnimationFrame(() => this.animate());
        }
        else {
            this.options.stopped();
        }
    }
    /**
     * Start the of animation
     */
    start() {
        if (this.continueAnimation == false) {
            this.continueAnimation = true;
            this.nextFrame = window.performance.now();
            this.animate();
        }
    }
    /**
     * Stop the animation
     */
    stop() {
        this.continueAnimation = false;
    }
    /**
     * Stop the animation
     */
    immediateStop() {
        cancelAnimationFrame(this.frame_id);
        this.continueAnimation = false;
        this.options.stopped();
    }
    /**
     * Get the FPS
     */
    getFPS() {
        return this.options.fps;
    }
    /**
     * Set the FPS
     */
    setFPS(fps) {
        this.options.fps = fps;
        this.fpsInterval = 1000 / this.options.fps;
    }
    /**
     * Get the animation status (true if animation is running)
     */
    isStarted() {
        return this.continueAnimation;
    }
}
Animation.Namespace=`${moduleName}`;
_.Animation=Animation;
const DragAndDrop=class DragAndDrop {
    /**
     * Default offset before drag element
     */
    static defaultOffsetDrag = 20;
    pressManager;
    options;
    startCursorPosition = { x: 0, y: 0 };
    startElementPosition = { x: 0, y: 0 };
    isEnable = true;
    constructor(options) {
        this.options = this.getDefaultOptions(options.element);
        this.mergeProperties(options);
        this.mergeFunctions(options);
        this.options.elementTrigger.style.touchAction = 'none';
        this.pressManager = new PressManager({
            element: this.options.elementTrigger,
            onPressStart: this.onPressStart.bind(this),
            onPressEnd: this.onPressEnd.bind(this),
            onDragStart: this.onDragStart.bind(this),
            onDrag: this.onDrag.bind(this),
            onDragEnd: this.onDragEnd.bind(this),
            offsetDrag: this.options.offsetDrag,
            stopPropagation: this.options.stopPropagation
        });
    }
    getDefaultOptions(element) {
        return {
            applyDrag: true,
            element: element,
            elementTrigger: element,
            offsetDrag: DragAndDrop.defaultOffsetDrag,
            shadow: {
                enable: false,
                container: document.body,
                removeOnStop: true,
                transform: () => { }
            },
            strict: false,
            targets: [],
            usePercent: false,
            stopPropagation: true,
            isDragEnable: () => true,
            getZoom: () => 1,
            getOffsetX: () => 0,
            getOffsetY: () => 0,
            onPointerDown: (e) => { },
            onPointerUp: (e) => { },
            onStart: (e) => { },
            onMove: (e) => { },
            onStop: (e) => { },
            onDrop: (element, targets) => { },
            correctPosition: (position) => position
        };
    }
    mergeProperties(options) {
        if (options.element === void 0) {
            throw "You must define the element for the drag&drop";
        }
        this.options.element = options.element;
        if (options.elementTrigger === void 0) {
            this.options.elementTrigger = this.options.element;
        }
        else {
            this.options.elementTrigger = options.elementTrigger;
        }
        this.defaultMerge(options, "applyDrag");
        this.defaultMerge(options, "offsetDrag");
        this.defaultMerge(options, "strict");
        this.defaultMerge(options, "targets");
        this.defaultMerge(options, "usePercent");
        this.defaultMerge(options, "stopPropagation");
        if (options.shadow !== void 0) {
            this.options.shadow.enable = options.shadow.enable;
            if (options.shadow.container !== void 0) {
                this.options.shadow.container = options.shadow.container;
            }
            else {
                this.options.shadow.container = document.body;
            }
            if (options.shadow.removeOnStop !== void 0) {
                this.options.shadow.removeOnStop = options.shadow.removeOnStop;
            }
            if (options.shadow.transform !== void 0) {
                this.options.shadow.transform = options.shadow.transform;
            }
        }
    }
    mergeFunctions(options) {
        this.defaultMerge(options, "isDragEnable");
        this.defaultMerge(options, "getZoom");
        this.defaultMerge(options, "getOffsetX");
        this.defaultMerge(options, "getOffsetY");
        this.defaultMerge(options, "onPointerDown");
        this.defaultMerge(options, "onPointerUp");
        this.defaultMerge(options, "onStart");
        this.defaultMerge(options, "onMove");
        this.defaultMerge(options, "onStop");
        this.defaultMerge(options, "onDrop");
        this.defaultMerge(options, "correctPosition");
    }
    defaultMerge(options, name) {
        if (options[name] !== void 0) {
            this.options[name] = options[name];
        }
    }
    positionShadowRelativeToElement = { x: 0, y: 0 };
    onPressStart(e) {
        this.options.onPointerDown(e);
    }
    onPressEnd(e) {
        this.options.onPointerUp(e);
    }
    onDragStart(e) {
        this.isEnable = this.options.isDragEnable();
        if (!this.isEnable) {
            return;
        }
        let draggableElement = this.options.element;
        this.startCursorPosition = {
            x: e.pageX,
            y: e.pageY
        };
        this.startElementPosition = {
            x: draggableElement.offsetLeft,
            y: draggableElement.offsetTop
        };
        if (this.options.shadow.enable) {
            draggableElement = this.options.element.cloneNode(true);
            let elBox = this.options.element.getBoundingClientRect();
            let containerBox = this.options.shadow.container.getBoundingClientRect();
            this.positionShadowRelativeToElement = {
                x: elBox.x - containerBox.x,
                y: elBox.y - containerBox.y
            };
            if (this.options.applyDrag) {
                draggableElement.style.position = "absolute";
                draggableElement.style.top = this.positionShadowRelativeToElement.y + this.options.getOffsetY() + 'px';
                draggableElement.style.left = this.positionShadowRelativeToElement.x + this.options.getOffsetX() + 'px';
            }
            this.options.shadow.transform(draggableElement);
            this.options.shadow.container.appendChild(draggableElement);
        }
        this.options.onStart(e);
    }
    onDrag(e) {
        if (!this.isEnable) {
            return;
        }
        let zoom = this.options.getZoom();
        let diff = {
            x: 0,
            y: 0
        };
        if (this.options.shadow.enable) {
            diff = {
                x: (e.pageX - this.startCursorPosition.x) + this.positionShadowRelativeToElement.x + this.options.getOffsetX(),
                y: (e.pageY - this.startCursorPosition.y) + this.positionShadowRelativeToElement.y + this.options.getOffsetY(),
            };
        }
        else {
            diff = {
                x: (e.pageX - this.startCursorPosition.x) / zoom + this.startElementPosition.x + this.options.getOffsetX(),
                y: (e.pageY - this.startCursorPosition.y) / zoom + this.startElementPosition.y + this.options.getOffsetY()
            };
        }
        let newPos = this.setPosition(diff);
        this.options.onMove(e, newPos);
    }
    onDragEnd(e) {
        if (!this.isEnable) {
            return;
        }
        let targets = this.getMatchingTargets();
        let draggableElement = this.options.element;
        if (this.options.shadow.enable && this.options.shadow.removeOnStop) {
            draggableElement.parentNode?.removeChild(draggableElement);
        }
        if (targets.length > 0) {
            this.options.onDrop(draggableElement, targets);
        }
        this.options.onStop(e);
    }
    setPosition(position) {
        let draggableElement = this.options.element;
        if (this.options.usePercent) {
            let elementParent = draggableElement.offsetParent;
            let percentPosition = {
                x: (position.x / elementParent.offsetWidth) * 100,
                y: (position.y / elementParent.offsetHeight) * 100
            };
            percentPosition = this.options.correctPosition(percentPosition);
            if (this.options.applyDrag) {
                draggableElement.style.left = percentPosition.x + '%';
                draggableElement.style.top = percentPosition.y + '%';
            }
            return percentPosition;
        }
        else {
            position = this.options.correctPosition(position);
            if (this.options.applyDrag) {
                draggableElement.style.left = position.x + 'px';
                draggableElement.style.top = position.y + 'px';
            }
        }
        return position;
    }
    /**
     * Get targets within the current element position is matching
     */
    getMatchingTargets() {
        let draggableElement = this.options.element;
        let matchingTargets = [];
        for (let target of this.options.targets) {
            const elementCoordinates = draggableElement.getBoundingClientRect();
            const targetCoordinates = target.getBoundingClientRect();
            let offsetX = this.options.getOffsetX();
            let offsetY = this.options.getOffsetY();
            let zoom = this.options.getZoom();
            targetCoordinates.x += offsetX;
            targetCoordinates.y += offsetY;
            targetCoordinates.width *= zoom;
            targetCoordinates.height *= zoom;
            if (this.options.strict) {
                if ((elementCoordinates.x >= targetCoordinates.x && elementCoordinates.x + elementCoordinates.width <= targetCoordinates.x + targetCoordinates.width) &&
                    (elementCoordinates.y >= targetCoordinates.y && elementCoordinates.y + elementCoordinates.height <= targetCoordinates.y + targetCoordinates.height)) {
                    matchingTargets.push(target);
                }
            }
            else {
                let elementLeft = elementCoordinates.x;
                let elementRight = elementCoordinates.x + elementCoordinates.width;
                let elementTop = elementCoordinates.y;
                let elementBottom = elementCoordinates.y + elementCoordinates.height;
                let targetLeft = targetCoordinates.x;
                let targetRight = targetCoordinates.x + targetCoordinates.width;
                let targetTop = targetCoordinates.y;
                let targetBottom = targetCoordinates.y + targetCoordinates.height;
                if (!(elementRight < targetLeft ||
                    elementLeft > targetRight ||
                    elementBottom < targetTop ||
                    elementTop > targetBottom)) {
                    matchingTargets.push(target);
                }
            }
        }
        return matchingTargets;
    }
    /**
     * Get element currently dragging
     */
    getElementDrag() {
        return this.options.element;
    }
    /**
     * Set targets where to drop
     */
    setTargets(targets) {
        this.options.targets = targets;
    }
    /**
     * Destroy the current drag&drop instance
     */
    destroy() {
        this.pressManager.destroy();
    }
}
DragAndDrop.Namespace=`${moduleName}`;
_.DragAndDrop=DragAndDrop;
const HttpRoute=class HttpRoute {
    static JoinPath(s1, s2) {
        return s1 + "." + s2;
    }
    static ExtendRoutes(options, path) {
        let result = [];
        if (!path) {
            result = options;
        }
        else {
            for (let option of options) {
                if (typeof option == "function") {
                    result.push({
                        type: option,
                        path: path
                    });
                }
                else {
                    result.push({
                        type: option.type,
                        path: this.JoinPath(path, option.path)
                    });
                }
            }
        }
        return result;
    }
    router;
    constructor(router) {
        this.router = router;
    }
}
HttpRoute.Namespace=`${moduleName}`;
_.HttpRoute=HttpRoute;
const ResultWithError=class ResultWithError extends VoidWithError {
    /**
     * Result
     */
    result;
}
ResultWithError.Namespace=`${moduleName}`;
_.ResultWithError=ResultWithError;
const HttpError=class HttpError extends GenericError {
}
HttpError.Namespace=`${moduleName}`;
_.HttpError=HttpError;
const Converter=class Converter {
    static info = new Map();
    static schema = new Map();
    /**
     * Register a unique string type for any class
     */
    static register($type, cst, schema) {
        this.info.set($type, cst);
        if (schema) {
            this.schema.set($type, schema);
        }
    }
    static transform(data) {
        return this.transformLoop(data);
    }
    static transformLoop(data) {
        if (data === null) {
            return data;
        }
        if (Array.isArray(data)) {
            let result = [];
            for (let element of data) {
                result.push(this.transformLoop(element));
            }
            return result;
        }
        if (data instanceof Date) {
            return data;
        }
        if (typeof data === 'object' && !/^\s*class\s+/.test(data.toString())) {
            if (data.$type) {
                if (data.$type == "AventusSharp.Map") {
                }
                let cst = this.info.get(data.$type);
                if (cst) {
                    let obj = new cst();
                    let props = Object.getOwnPropertyNames(obj);
                    for (let prop of props) {
                        let propUpperFirst = prop[0].toUpperCase() + prop.slice(1);
                        let value = data[prop] === undefined ? data[propUpperFirst] : data[prop];
                        if (value !== undefined) {
                            let propInfo = Object.getOwnPropertyDescriptor(obj, prop);
                            if (propInfo?.writable) {
                                if (obj[prop] instanceof Date) {
                                    obj[prop] = value ? new Date(value) : null;
                                }
                                else if (obj[prop] instanceof Map) {
                                    obj[prop].clear();
                                    for (const keyValue of value) {
                                        obj[prop].set(this.transformLoop(keyValue[0]), this.transformLoop(keyValue[1]));
                                    }
                                }
                                else {
                                    obj[prop] = this.transformLoop(value);
                                }
                            }
                        }
                    }
                    return obj;
                }
            }
            let result = {};
            for (let key in data) {
                result[key] = this.transformLoop(data[key]);
            }
            return result;
        }
        return data;
    }
}
Converter.Namespace=`${moduleName}`;
_.Converter=Converter;
const HttpRequest=class HttpRequest {
    request;
    url;
    constructor(url, method = HttpMethod.GET, body) {
        this.url = url;
        this.request = {};
        this.setMethod(method);
        this.prepareBody(body);
    }
    setUrl(url) {
        this.url = url;
    }
    toString() {
        return this.url + " : " + JSON.stringify(this.request);
    }
    setBody(body) {
        this.prepareBody(body);
    }
    setMethod(method) {
        this.request.method = method;
    }
    prepareBody(data) {
        if (!data) {
            return;
        }
        else if (data instanceof FormData) {
            this.request.body = data;
        }
        else {
            this.request.body = JSON.stringify(data);
            this.setHeader("Content-Type", "Application/json");
        }
    }
    setHeader(name, value) {
        if (!this.request.headers) {
            this.request.headers = [];
        }
        this.request.headers.push([name, value]);
    }
    async query(router) {
        let result = new ResultWithError();
        try {
            result.result = await fetch(router['options'].url + this.url, this.request);
        }
        catch (e) {
            result.errors.push(new HttpError(HttpErrorCode.unknow, e));
        }
        return result;
    }
    async queryVoid(router) {
        let resultTemp = await this.query(router);
        let result = new VoidWithError();
        if (!resultTemp.success) {
            result.errors = resultTemp.errors;
            return result;
        }
        try {
            if (!resultTemp.result) {
                return result;
            }
            if (resultTemp.result.status != 204) {
                let tempResult = Converter.transform(await resultTemp.result.json());
                if (tempResult instanceof VoidWithError) {
                    for (let error of tempResult.errors) {
                        result.errors.push(error);
                    }
                }
            }
        }
        catch (e) {
        }
        return result;
    }
    async queryJSON(router) {
        let resultTemp = await this.query(router);
        let result = new ResultWithError();
        if (!resultTemp.success) {
            result.errors = resultTemp.errors;
            return result;
        }
        try {
            if (!resultTemp.result) {
                return result;
            }
            let tempResult = Converter.transform(await resultTemp.result.json());
            if (tempResult instanceof VoidWithError) {
                for (let error of tempResult.errors) {
                    result.errors.push(error);
                }
                if (tempResult instanceof ResultWithError) {
                    result.result = tempResult.result;
                }
            }
            else {
                result.result = tempResult;
            }
        }
        catch (e) {
            result.errors.push(new HttpError(HttpErrorCode.unknow, e));
        }
        return result;
    }
    async queryTxt(router) {
        let resultTemp = await this.query(router);
        let result = new ResultWithError();
        if (!resultTemp.success) {
            result.errors = resultTemp.errors;
            return result;
        }
        try {
            if (!resultTemp.result) {
                return result;
            }
            result.result = await resultTemp.result.text();
        }
        catch (e) {
            result.errors.push(new HttpError(HttpErrorCode.unknow, e));
        }
        return result;
    }
}
HttpRequest.Namespace=`${moduleName}`;
_.HttpRequest=HttpRequest;
const HttpRouter=class HttpRouter {
    _routes;
    options;
    static WithRoute(options) {
        class Router extends HttpRouter {
            constructor() {
                super();
                for (let route of options) {
                    if (typeof route == "function") {
                        this._routes.addRoute(route);
                    }
                    else {
                        this._routes.addRoute(route.type, route.path);
                    }
                }
            }
        }
        return Router;
    }
    constructor() {
        Object.defineProperty(this, "routes", {
            get: () => { return this._routes; }
        });
        this.createRoutesProxy();
        this.options = this.defineOptions(this.defaultOptionsValue());
    }
    createRoutesProxy() {
        if (!this._routes) {
            var that = this;
            var proxyData = {
                routePath: {},
                get(target, prop, receiver) {
                    if (prop == "addRoute") {
                        return (routeClass, path) => {
                            try {
                                if (!path) {
                                    path = "";
                                }
                                let splitted = path.split(".");
                                let current = this.routePath;
                                for (let part of splitted) {
                                    if (part != "") {
                                        if (!current[part]) {
                                            current[part] = {};
                                        }
                                        current = current[part];
                                    }
                                }
                                let routeInstance = new routeClass(that);
                                let keyFromChild = [];
                                while (routeClass.prototype) {
                                    let keys = Object.getOwnPropertyNames(routeClass.prototype);
                                    for (let key of keys) {
                                        if (key != "constructor" && !keyFromChild.includes(key)) {
                                            keyFromChild.push(key);
                                            current[key] = routeInstance[key].bind(routeInstance);
                                        }
                                    }
                                    routeClass = Object.getPrototypeOf(routeClass);
                                }
                            }
                            catch (e) {
                                console.error(e);
                            }
                        };
                    }
                    else if (prop == "allRoutes") {
                        return (flat) => {
                            if (!flat) {
                                return this.routePath;
                            }
                            else {
                                let result = {};
                                let load = (current, pathes) => {
                                    for (let key in current) {
                                        pathes.push(key);
                                        if (typeof current[key] == "function") {
                                            result[pathes.join(".")] = current[key];
                                        }
                                        else {
                                            load(current[key], pathes);
                                        }
                                        pathes.pop();
                                    }
                                };
                                load(this.routePath, []);
                                return result;
                            }
                        };
                    }
                    else if (this.routePath[prop]) {
                        return this.routePath[prop];
                    }
                    return null;
                }
            };
            this._routes = new Proxy({}, proxyData);
        }
    }
    defaultOptionsValue() {
        return {
            url: location.protocol + "//" + location.host
        };
    }
    defineOptions(options) {
        return options;
    }
    async get(url) {
        return await new HttpRequest(url).queryJSON(this);
    }
    async post(url, data) {
        return await new HttpRequest(url, HttpMethod.POST, data).queryJSON(this);
    }
    async put(url, data) {
        return await new HttpRequest(url, HttpMethod.PUT, data).queryJSON(this);
    }
    async delete(url, data) {
        return await new HttpRequest(url, HttpMethod.DELETE, data).queryJSON(this);
    }
    async option(url, data) {
        return await new HttpRequest(url, HttpMethod.OPTION, data).queryJSON(this);
    }
}
HttpRouter.Namespace=`${moduleName}`;
_.HttpRouter=HttpRouter;
const Data=class Data {
    /**
     * The schema for the class
     */
    static get $schema() { return {}; }
    /**
     * The current namespace
     */
    static Namespace = "";
    /**
     * Get the unique type for the data. Define it as the namespace + class name
     */
    static get Fullname() { return this.Namespace + "." + this.name; }
    /**
     * The current namespace
     */
    get namespace() {
        return this.constructor['Namespace'];
    }
    /**
     * Get the unique type for the data. Define it as the namespace + class name
     */
    get $type() {
        return this.constructor['Fullname'];
    }
    /**
     * Get the name of the class
     */
    get className() {
        return this.constructor.name;
    }
    /**
     * Get a JSON for the current object
     */
    toJSON() {
        let result = { $type: this.$type };
        let props = Object.getOwnPropertyNames(this);
        for (let prop of props) {
            let propInfo = Object.getOwnPropertyDescriptor(this, prop);
            if (propInfo?.writable) {
                result[prop] = this[prop];
            }
        }
        return result;
    }
}
Data.Namespace=`${moduleName}`;
_.Data=Data;
const Socket=class Socket {
    options;
    waitingList = {};
    timeoutError = 0;
    memoryBeforeOpen = [];
    socket;
    constructor() {
        this.options = this._configure(this.configure({}));
    }
    /**
     * Configure a new Websocket
     */
    _configure(options = {}) {
        if (!options.host) {
            options.host = window.location.hostname;
        }
        if (!options.hasOwnProperty('useHttps')) {
            options.useHttps = window.location.protocol == "https:";
        }
        if (!options.port) {
            if (window.location.port) {
                options.port = parseInt(window.location.port);
            }
            else {
                options.port = options.useHttps ? 443 : 80;
            }
        }
        if (!options.routes) {
            options.routes = {};
        }
        if (!options.socketName) {
            options.socketName = "";
        }
        if (options.log === undefined) {
            options.log = false;
        }
        return options;
    }
    /**
     * Add a new route to listen to the websocket
     */
    addRoute(newRoute) {
        if (!this.options.routes.hasOwnProperty(newRoute.channel)) {
            this.options.routes[newRoute.channel] = [];
        }
        this.options.routes[newRoute.channel].push(newRoute);
    }
    /**
     * The route to remove
     * @param route - The route to remove
     */
    removeRoute(route) {
        let index = this.options.routes[route.channel].indexOf(route);
        if (index != -1) {
            this.options.routes[route.channel].splice(index, 1);
        }
    }
    openCallback;
    /**
     * Try to open the websocket
     */
    open() {
        return new Promise((resolve) => {
            try {
                if (this.socket) {
                    this.socket.close();
                }
                let protocol = "ws";
                if (this.options.useHttps) {
                    protocol = "wss";
                }
                let url = protocol + "://" + this.options.host + ":" + this.options.port + "/ws/" + this.options.socketName;
                this.log(url);
                this.openCallback = (isOpen) => {
                    resolve(isOpen);
                };
                this.socket = new WebSocket(url);
                this.socket.onopen = this._onOpen.bind(this);
                this.socket.onclose = this._onClose.bind(this);
                this.socket.onerror = this._onError.bind(this);
                this.socket.onmessage = this.onMessage.bind(this);
            }
            catch (e) {
                console.log(e);
                resolve(false);
            }
        });
    }
    jsonReplacer(key, value) {
        if (this[key] instanceof Date && this[key].getFullYear() < 100) {
            return "0001-01-01T00:00:00";
        }
        return value;
    }
    /**
     * Send a message though the websocket
     * @param channelName The channel on which the message is sent
     * @param data The data to send
     * @param options the options to add to the message (typically the uid)
     */
    sendMessage(channelName, body, options = {}) {
        if (this.socket && this.socket.readyState == 1) {
            let message = {
                channel: channelName,
            };
            for (let key in options) {
                message[key] = options[key];
            }
            if (body) {
                message.data = body;
                this.log(message);
                if (typeof body != 'string') {
                    message.data = JSON.stringify(body, this.jsonReplacer);
                }
            }
            else {
                this.log(message);
            }
            this.socket.send(JSON.stringify(message));
        }
        else {
            this.log('Socket not ready ! Please ensure that it is open and ready to send message');
            this.memoryBeforeOpen.push({
                channelName: channelName,
                data: body,
                options: options
            });
        }
    }
    /**
     * Send a message though the websocket and wait one answer give in parameters callbacks
     * @param channelName The channel on which the message is sent
     * @param data The data to send
     * @param callbacks The callbacks to call. With the channel as key and the callback function as value
     */
    sendMessageAndWait(channelName, body) {
        return new Promise((resolve) => {
            let uid = '_' + Math.random().toString(36).substr(2, 9);
            this.waitingList[uid] = (channel, data) => {
                if (channel != channelName) {
                    resolve(null);
                }
                else {
                    resolve(data);
                }
            };
            this.sendMessage(channelName, body, {
                uid: uid
            });
        });
    }
    ;
    /**
     * Check if socket is ready
     */
    isReady() {
        if (this.socket && this.socket.readyState == 1) {
            return true;
        }
        return false;
    }
    /**
     * Callback when the websocket connection is open
     */
    onOpen() {
    }
    _onOpen() {
        if (this.socket && this.socket.readyState == 1) {
            if (this.openCallback) {
                this.openCallback(true);
                this.openCallback = undefined;
            }
            this.log('Connection successfully established !' + this.options.host + ":" + this.options.port);
            window.clearTimeout(this.timeoutError);
            this.onOpen();
            for (let i = 0; i < this.memoryBeforeOpen.length; i++) {
                this.sendMessage(this.memoryBeforeOpen[i].channelName, this.memoryBeforeOpen[i].data, this.memoryBeforeOpen[i].options);
            }
            this.memoryBeforeOpen = [];
        }
        else {
            if (this.openCallback) {
                this.openCallback(false);
                this.openCallback = undefined;
            }
        }
    }
    errorOccur = false;
    /**
     * Callback called when the socket as an error
     */
    onError(event) {
    }
    _onError(event) {
        this.errorOccur = true;
        if (this.openCallback) {
            this.openCallback(false);
            this.openCallback = undefined;
            return;
        }
        this.log('An error has occured');
        this.onError(event);
    }
    /**
     * Callback called when the connection closed without calling the close function
     * By default the socket will try to reconnect each 5000ms
     */
    onClose(event) {
        let reopenInterval = setInterval(async () => {
            console.warn("try reopen socket ");
            if (await this.open()) {
                clearInterval(reopenInterval);
            }
        }, 5000);
    }
    _onClose(event) {
        if (this.errorOccur) {
            this.errorOccur = false;
            return;
        }
        this.log('Closing connection');
        this.onClose(event);
    }
    /**
     * Close the current connection
     */
    close() {
        if (this.socket) {
            this.socket.onclose = null;
            this.socket.onerror = null;
            this.socket.onmessage = null;
            this.socket.onopen = null;
            this.socket.close();
            delete this.socket;
        }
    }
    onMessage(event) {
        let response = JSON.parse(event.data);
        this.log(response);
        response.data = JSON.parse(response.data);
        if (this.options.routes.hasOwnProperty(response.channel)) {
            this.options.routes[response.channel].forEach(element => {
                element.callback(response.data);
            });
        }
        if (response.uid) {
            if (this.waitingList.hasOwnProperty(response.uid)) {
                this.waitingList[response.uid](response.channel, response.data);
                delete this.waitingList[response.uid];
            }
        }
    }
    /**
     * Print a msg inside the console
     */
    log(message) {
        if (this.options.log) {
            const now = new Date();
            const hours = (now.getHours()).toLocaleString(undefined, { minimumIntegerDigits: 2 });
            const minutes = (now.getMinutes()).toLocaleString(undefined, { minimumIntegerDigits: 2 });
            const seconds = (now.getSeconds()).toLocaleString(undefined, { minimumIntegerDigits: 2 });
            if (message instanceof Object) {
                let cloneMessage = JSON.parse(JSON.stringify(message, this.jsonReplacer));
                if (cloneMessage.data && typeof cloneMessage.data == 'string') {
                    cloneMessage.data = JSON.parse(cloneMessage.data);
                }
                console.log(`[WEBSOCKET] [${hours}:${minutes}:${seconds}]: `, cloneMessage);
            }
            else {
                console.log(`[WEBSOCKET] [${hours}:${minutes}:${seconds}]: `, message);
            }
        }
    }
}
Socket.Namespace=`${moduleName}`;
_.Socket=Socket;

for(let key in _) { Aventus[key] = _[key] }
})(Aventus);

var AventusSharp;
(AventusSharp||(AventusSharp = {}));
(function (AventusSharp) {
const moduleName = `AventusSharp`;
const _ = {};

const Socket = {};
_.Socket = {};
const Routes = {};
_.Routes = {};
const Data = {};
_.Data = {};
let _n;
Socket.WsRoute=class WsRoute {
    endpoint;
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
}
Socket.WsRoute.Namespace=`${moduleName}.Socket`;
_.Socket.WsRoute=Socket.WsRoute;
Routes.StorableRoute=class StorableRoute extends Aventus.HttpRoute {
    async GetAll() {
        const request = new Aventus.HttpRequest(`/${this.StorableName()}`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    async Create(body) {
        const request = new Aventus.HttpRequest(`/${this.StorableName()}`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
    async CreateMany(body) {
        const request = new Aventus.HttpRequest(`/${this.StorableName()}s`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
    async GetById(id) {
        const request = new Aventus.HttpRequest(`/${this.StorableName()}/${id}`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    async Update(id, body) {
        const request = new Aventus.HttpRequest(`/${this.StorableName()}/${id}`, Aventus.HttpMethod.PUT);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
    async UpdateMany(body) {
        const request = new Aventus.HttpRequest(`/${this.StorableName()}s`, Aventus.HttpMethod.PUT);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
    async Delete(id) {
        const request = new Aventus.HttpRequest(`/${this.StorableName()}/${id}`, Aventus.HttpMethod.DELETE);
        return await request.queryJSON(this.router);
    }
    async DeleteMany(body) {
        const request = new Aventus.HttpRequest(`/${this.StorableName()}s`, Aventus.HttpMethod.DELETE);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
}
Routes.StorableRoute.Namespace=`${moduleName}.Routes`;
_.Routes.StorableRoute=Routes.StorableRoute;
Data.Storable=class Storable extends Aventus.Data {
    id = 0;
    createdDate = new Date();
    updatedDate = new Date();
}
Data.Storable.$schema={"id":"number","createdDate":"Date","updatedDate":"Date"};Aventus.DataManager.register("");Aventus.DataManager.register(Data.Storable.Fullname, Data.Storable);Data.Storable.Namespace=`${moduleName}.Data`;
_.Data.Storable=Data.Storable;
Socket.WsEndPoint=class WsEndPoint extends Aventus.Socket {
    static With(options) {
        class EndPoint extends WsEndPoint {
            constructor() {
                super();
                for (let route of options.routes) {
                    if (typeof route == "function") {
                        this._routes.addRoute(route);
                    }
                    else {
                        this._routes.addRoute(route.type, route.path);
                    }
                }
                for (let _event of options.events) {
                    if (typeof _event == "function") {
                        this._events.addEvent(_event);
                    }
                    else {
                        this._events.addEvent(_event.type, _event.path);
                    }
                }
            }
        }
        return EndPoint;
    }
    _routes;
    _events;
    constructor() {
        super();
        Object.defineProperty(this, "routes", {
            get: () => { return this._routes; }
        });
        Object.defineProperty(this, "events", {
            get: () => { return this._events; }
        });
        this.createProxy();
    }
    createProxy() {
        if (!this._routes) {
            let that = this;
            let proxyData = {
                routePath: {},
                get(target, prop, receiver) {
                    if (prop == "addRoute") {
                        return (routeClass, path) => {
                            try {
                                if (!path) {
                                    path = "";
                                }
                                let splitted = path.split(".");
                                let current = this.routePath;
                                for (let part of splitted) {
                                    if (part != "") {
                                        if (!current[part]) {
                                            current[part] = {};
                                        }
                                        current = current[part];
                                    }
                                }
                                let routeInstance = new routeClass(that);
                                let keyFromChild = [];
                                while (routeClass.prototype) {
                                    let keys = Object.getOwnPropertyNames(routeClass.prototype);
                                    for (let key of keys) {
                                        if (key != "constructor" && !keyFromChild.includes(key)) {
                                            keyFromChild.push(key);
                                            current[key] = routeInstance[key].bind(routeInstance);
                                        }
                                    }
                                    routeClass = Object.getPrototypeOf(routeClass);
                                }
                            }
                            catch (e) {
                                console.error(e);
                            }
                        };
                    }
                    else if (prop == "allRoutes") {
                        return (flat) => {
                            if (!flat) {
                                return this.routePath;
                            }
                            else {
                                let result = {};
                                let load = (current, pathes) => {
                                    for (let key in current) {
                                        pathes.push(key);
                                        if (typeof current[key] == "function") {
                                            result[pathes.join(".")] = current[key];
                                        }
                                        else {
                                            load(current[key], pathes);
                                        }
                                        pathes.pop();
                                    }
                                };
                                load(this.routePath, []);
                                return result;
                            }
                        };
                    }
                    else if (this.routePath[prop]) {
                        return this.routePath[prop];
                    }
                    return null;
                }
            };
            this._routes = new Proxy({}, proxyData);
        }
        if (!this._events) {
            let that = this;
            let proxyData = {
                eventPath: {},
                get(target, prop, receiver) {
                    if (prop == "addEvent") {
                        return (eventClass, path) => {
                            try {
                                if (!path) {
                                    path = "";
                                }
                                let splitted = path.split(".");
                                let current = this.eventPath;
                                for (let part of splitted) {
                                    if (part != "") {
                                        if (!current[part]) {
                                            current[part] = {};
                                        }
                                        current = current[part];
                                    }
                                }
                                let routeInstance = new eventClass(that);
                                routeInstance['configure']();
                                let keyFromChild = [];
                                while (eventClass.prototype) {
                                    let keys = Object.getOwnPropertyNames(eventClass.prototype);
                                    for (let key of keys) {
                                        if (key != "constructor" && !keyFromChild.includes(key)) {
                                            keyFromChild.push(key);
                                            current[key] = routeInstance[key].bind(routeInstance);
                                        }
                                    }
                                    eventClass = Object.getPrototypeOf(eventClass);
                                }
                            }
                            catch (e) {
                                console.error(e);
                            }
                        };
                    }
                    else if (prop == "allEvents") {
                        return (flat) => {
                            if (!flat) {
                                return this.eventPath;
                            }
                            else {
                                let result = {};
                                let load = (current, pathes) => {
                                    for (let key in current) {
                                        pathes.push(key);
                                        if (typeof current[key] == "function") {
                                            result[pathes.join(".")] = current[key];
                                        }
                                        else {
                                            load(current[key], pathes);
                                        }
                                        pathes.pop();
                                    }
                                };
                                load(this.eventPath, []);
                                return result;
                            }
                        };
                    }
                    else if (this.eventPath[prop]) {
                        return this.eventPath[prop];
                    }
                    return null;
                }
            };
            this._events = new Proxy({}, proxyData);
        }
    }
    /**
     * @inheritdoc
     */
    configure(options) {
        options.socketName = this.path;
        return options;
    }
}
Socket.WsEndPoint.Namespace=`${moduleName}.Socket`;
_.Socket.WsEndPoint=Socket.WsEndPoint;
Socket.WsEvent=class WsEvent {
    endpoint;
    onTrigger = new Aventus.Callback();
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.onEvent = this.onEvent.bind(this);
    }
    configure() {
        this.endpoint.addRoute({
            channel: this.path,
            callback: this.onEvent
        });
    }
    onEvent(data) {
        this.onTrigger.trigger([data]);
    }
}
Socket.WsEvent.Namespace=`${moduleName}.Socket`;
_.Socket.WsEvent=Socket.WsEvent;

for(let key in _) { AventusSharp[key] = _[key] }
})(AventusSharp);

var Core;
(Core||(Core = {}));
(function (Core) {
const moduleName = `Core`;
const _ = {};
Aventus.Style.store("@Rayuki", `.touch{cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}.touch.disable,.touch.disabled{cursor:default}.green{background-color:var(--green)}.red{background-color:var(--red)}.orange{background-color:var(--orange)}.blue{background-color:var(--blue)}`)
const Components = {};
_.Components = {};
let _n;
Components.Button = class Button extends Aventus.WebComponent {
    static get observedAttributes() {return ["icon_before", "icon_after"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'color'() {
                    return this.getAttribute('color') ?? undefined;
                }
                set 'color'(val) {
                    if(val === undefined || val === null){this.removeAttribute('color')}
                    else{this.setAttribute('color',val)}
                }get 'outline'() {
                return this.hasAttribute('outline');
            }
            set 'outline'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('outline', 'true');
                } else{
                    this.removeAttribute('outline');
                }
            }    get 'icon_before'() {
                    return this.getAttribute('icon_before') ?? undefined;
                }
                set 'icon_before'(val) {
                    if(val === undefined || val === null){this.removeAttribute('icon_before')}
                    else{this.setAttribute('icon_before',val)}
                }get 'icon_after'() {
                    return this.getAttribute('icon_after') ?? undefined;
                }
                set 'icon_after'(val) {
                    if(val === undefined || val === null){this.removeAttribute('icon_after')}
                    else{this.setAttribute('icon_after',val)}
                }    static __style = `:host{--internal-button-background-color: var(--button-background-color);--internal-button-color: var(--button-color)}:host{background-color:var(--internal-button-background-color);border-radius:5px;box-shadow:rgba(47,43,61,.3) 0px 0px 5px;color:var(--internal-button-color);cursor:pointer;height:36px;min-width:64px;overflow:hidden;position:relative}:host .hider{background-color:var(--darker);inset:0;opacity:0;position:absolute;transform:opacity .3 var(--bezier-curve);z-index:1}:host .content{align-items:center;display:flex;height:100%;justify-content:center;padding:0 16px;position:relative;z-index:2}:host .content .icon-before,:host .content .icon-after{--img-fill-color: var(--internal-button-color);display:none;height:100%;padding:10px 0}:host([icon_before]) .icon-before{display:block;margin-right:10px}:host([icon_after]) .icon-after{display:block;margin-left:10px}:host([outline]){background-color:rgba(0,0,0,0);border:1px solid var(--button-background-color);color:var(--text-color)}:host([color=green]){background-color:var(--green);color:var(--text-color-green)}:host([outline][color=green]){background-color:rgba(0,0,0,0);border:1px solid var(--green);color:var(--text-color)}:host([color=red]){background-color:var(--red);color:var(--text-color-red)}:host([outline][color=red]){background-color:rgba(0,0,0,0);border:1px solid var(--red);color:var(--text-color)}:host([color=orange]){background-color:var(--orange);color:var(--text-color-orange)}:host([outline][color=orange]){background-color:rgba(0,0,0,0);border:1px solid var(--orange);color:var(--text-color)}:host([color=blue]){background-color:var(--blue);color:var(--text-color-blue)}:host([outline][color=blue]){background-color:rgba(0,0,0,0);border:1px solid var(--blue);color:var(--text-color)}@media screen and (min-width: 1225px){:host(:hover){box-shadow:none}:host(:hover) .hider{opacity:1}}`;
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
    "icon_before": [
      {
        "id": "button_0",
        "attrName": "src",
        "render": (c) => `${c.__P(c.icon_before)}`
      }
    ],
    "icon_after": [
      {
        "id": "button_1",
        "attrName": "src",
        "render": (c) => `${c.__P(c.icon_after)}`
      }
    ]
  }
});this.__getStatic().__template.setSchema({globals:["icon_before","icon_after"]}); }
    getClassName() {
        return "Button";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('color')){ this['color'] = undefined; }if(!this.hasAttribute('outline')) { this.attributeChangedCallback('outline', false, false); }if(!this.hasAttribute('icon_before')){ this['icon_before'] = ""; }if(!this.hasAttribute('icon_after')){ this['icon_after'] = ""; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('color');this.__upgradeProperty('outline');this.__upgradeProperty('icon_before');this.__upgradeProperty('icon_after'); }
    __listBoolProps() { return ["outline"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
}
Components.Button.Namespace=`${moduleName}.Components`;
_.Components.Button=Components.Button;
if(!window.customElements.get('rk-button')){window.customElements.define('rk-button', Components.Button);Aventus.WebComponentInstance.registerDefinition(Components.Button);}

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
_.Components.TableRow=Components.TableRow;
if(!window.customElements.get('rk-table-row')){window.customElements.define('rk-table-row', Components.TableRow);Aventus.WebComponentInstance.registerDefinition(Components.TableRow);}

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
_.Components.TableRowHeader=Components.TableRowHeader;
if(!window.customElements.get('rk-table-row-header')){window.customElements.define('rk-table-row-header', Components.TableRowHeader);Aventus.WebComponentInstance.registerDefinition(Components.TableRowHeader);}

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
    get 'y_scroll_visible'() {
                return this.hasAttribute('y_scroll_visible');
            }
            set 'y_scroll_visible'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('y_scroll_visible', 'true');
                } else{
                    this.removeAttribute('y_scroll_visible');
                }
            }get 'x_scroll_visible'() {
                return this.hasAttribute('x_scroll_visible');
            }
            set 'x_scroll_visible'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('x_scroll_visible', 'true');
                } else{
                    this.removeAttribute('x_scroll_visible');
                }
            }get 'floating_scroll'() {
                return this.hasAttribute('floating_scroll');
            }
            set 'floating_scroll'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('floating_scroll', 'true');
                } else{
                    this.removeAttribute('floating_scroll');
                }
            }get 'x_scroll'() {
                return this.hasAttribute('x_scroll');
            }
            set 'x_scroll'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('x_scroll', 'true');
                } else{
                    this.removeAttribute('x_scroll');
                }
            }get 'y_scroll'() {
                return this.hasAttribute('y_scroll');
            }
            set 'y_scroll'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('y_scroll', 'true');
                } else{
                    this.removeAttribute('y_scroll');
                }
            }get 'auto_hide'() {
                return this.hasAttribute('auto_hide');
            }
            set 'auto_hide'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('auto_hide', 'true');
                } else{
                    this.removeAttribute('auto_hide');
                }
            }get 'break'() {
                    return Number(this.getAttribute('break'));
                }
                set 'break'(val) {
                    if(val === undefined || val === null){this.removeAttribute('break')}
                    else{this.setAttribute('break',val)}
                }get 'disable'() {
                return this.hasAttribute('disable');
            }
            set 'disable'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('disable', 'true');
                } else{
                    this.removeAttribute('disable');
                }
            }get 'no_user_select'() {
                return this.hasAttribute('no_user_select');
            }
            set 'no_user_select'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('no_user_select', 'true');
                } else{
                    this.removeAttribute('no_user_select');
                }
            }    get 'zoom'() {
                    return Number(this.getAttribute('zoom'));
                }
                set 'zoom'(val) {
                    if(val === undefined || val === null){this.removeAttribute('zoom')}
                    else{this.setAttribute('zoom',val)}
                }    observer;
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
    static __style = `:host{--internal-scrollbar-container-color: var(--scrollbar-container-color, transparent);--internal-scrollbar-color: var(--scrollbar-color, #757575);--internal-scrollbar-active-color: var(--scrollbar-active-color, #858585);--internal-scroller-width: var(--scroller-width, 6px);--internal-scroller-top: var(--scroller-top, 3px);--internal-scroller-bottom: var(--scroller-bottom, 3px);--internal-scroller-right: var(--scroller-right, 3px);--internal-scroller-left: var(--scroller-left, 3px)}:host{display:block;height:100%;overflow:hidden;position:relative;-webkit-user-drag:none;-khtml-user-drag:none;-moz-user-drag:none;-o-user-drag:none;width:100%}:host .scroll-main-container{display:block;height:100%;position:relative;width:100%}:host .scroll-main-container .content-zoom{display:block;height:100%;position:relative;transform-origin:0 0;width:100%;z-index:4}:host .scroll-main-container .content-zoom .content-hidder{display:block;height:100%;overflow:hidden;position:relative;width:100%}:host .scroll-main-container .content-zoom .content-hidder .content-wrapper{display:inline-block;height:100%;min-height:100%;min-width:100%;position:relative;width:100%}:host .scroll-main-container .scroller-wrapper .container-scroller{display:none;overflow:hidden;position:absolute;z-index:5;transition:transform .2s linear}:host .scroll-main-container .scroller-wrapper .container-scroller .shadow-scroller{background-color:var(--internal-scrollbar-container-color);border-radius:5px}:host .scroll-main-container .scroller-wrapper .container-scroller .shadow-scroller .scroller{background-color:var(--internal-scrollbar-color);border-radius:5px;cursor:pointer;position:absolute;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;z-index:5}:host .scroll-main-container .scroller-wrapper .container-scroller .scroller.active{background-color:var(--internal-scrollbar-active-color)}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical{height:calc(100% - var(--internal-scroller-bottom)*2 - var(--internal-scroller-width));padding-left:var(--internal-scroller-left);right:var(--internal-scroller-right);top:var(--internal-scroller-bottom);transform:0;width:calc(var(--internal-scroller-width) + var(--internal-scroller-left))}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical.hide{transform:translateX(calc(var(--internal-scroller-width) + var(--internal-scroller-left)))}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical .shadow-scroller{height:100%}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical .shadow-scroller .scroller{width:calc(100% - var(--internal-scroller-left))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal{bottom:var(--internal-scroller-bottom);height:calc(var(--internal-scroller-width) + var(--internal-scroller-top));left:var(--internal-scroller-right);padding-top:var(--internal-scroller-top);transform:0;width:calc(100% - var(--internal-scroller-right)*2 - var(--internal-scroller-width))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal.hide{transform:translateY(calc(var(--internal-scroller-width) + var(--internal-scroller-top)))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal .shadow-scroller{height:100%}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal .shadow-scroller .scroller{height:calc(100% - var(--internal-scroller-top))}:host([y_scroll]) .scroll-main-container .content-zoom .content-hidder .content-wrapper{height:auto}:host([x_scroll]) .scroll-main-container .content-zoom .content-hidder .content-wrapper{width:auto}:host([y_scroll_visible]) .scroll-main-container .scroller-wrapper .container-scroller.vertical{display:block}:host([x_scroll_visible]) .scroll-main-container .scroller-wrapper .container-scroller.horizontal{display:block}:host([no_user_select]) .content-wrapper *{user-select:none}:host([no_user_select]) ::slotted{user-select:none}`;
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
_.Components.Scrollable=Components.Scrollable;
if(!window.customElements.get('rk-scrollable')){window.customElements.define('rk-scrollable', Components.Scrollable);Aventus.WebComponentInstance.registerDefinition(Components.Scrollable);}

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
_.Components.TableCellString=Components.TableCellString;
if(!window.customElements.get('rk-table-cell-string')){window.customElements.define('rk-table-cell-string', Components.TableCellString);Aventus.WebComponentInstance.registerDefinition(Components.TableCellString);}

Components.TableCellPicture = class TableCellPicture extends Components.TableCell {
    static get observedAttributes() {return ["src"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'src'() {
                    return this.getAttribute('src') ?? undefined;
                }
                set 'src'(val) {
                    if(val === undefined || val === null){this.removeAttribute('src')}
                    else{this.setAttribute('src',val)}
                }    static __style = `.img{background-position:center;background-size:cover;border-radius:25px;height:50px;margin:auto;width:50px}`;
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
    "src": [
      {
        "id": "tablecellpicture_0",
        "attrName": "style",
        "render": (c) => `background-image:url('${c.__P(c.src)}')`
      }
    ]
  }
});this.__getStatic().__template.setSchema({globals:["src"]}); }
    getClassName() {
        return "TableCellPicture";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('src')){ this['src'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('src'); }
    setContent(data, rowData) {
        this.src = data + "";
    }
}
Components.TableCellPicture.Namespace=`${moduleName}.Components`;
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
_.Components.TableCellBoolean=Components.TableCellBoolean;
if(!window.customElements.get('rk-table-cell-boolean')){window.customElements.define('rk-table-cell-boolean', Components.TableCellBoolean);Aventus.WebComponentInstance.registerDefinition(Components.TableCellBoolean);}

Components.Table = class Table extends Aventus.WebComponent {
    get 'col_resize'() {
                return this.hasAttribute('col_resize');
            }
            set 'col_resize'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('col_resize', 'true');
                } else{
                    this.removeAttribute('col_resize');
                }
            }    get 'data'() {
						return this.__watch["data"];
					}
					set 'data'(val) {
						this.__watch["data"] = val;
					}    options;
    __registerWatchesActions() {
                this.__addWatchesActions("data", ((target, action, path, value) => {
    target.render();
}));                super.__registerWatchesActions();
            }
    static __style = `:host{--internal-table-header-height: var(--table-header-height, 50px);--internal-table-header-backgroud-color: var(--table-header-backgroud-color, #1d4893);--internal-table-header-color: var(--table-header-color, white);--internal-table-header-vertical-border: var(--table-header-vertical-border, 1px solid var(--darker-active));--internal-table-header-horizontal-border: var(--table-header-vertical-border, 1px solid var(--darker-active));--internal-table-cell-vertical-border: var(--table-cell-vertical-border, 1px solid var(--darker-active));--internal-table-cell-horizontal-border: var(--table-cell-vertical-border, 1px solid var(--darker-active));--internal-table-cell-padding: var(--table-cell-padding, 10px);--local-table-cell-resize-display: none}:host{background-color:#fff;border-radius:5px;box-shadow:0 0 5px rgba(0,0,0,.5);display:flex;flex-direction:column;height:100%;overflow:hidden;width:100%}:host .style-wrapper{width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column}:host .style-wrapper .header{--scrollbar-color: transparent;--scrollbar-active-color: transparent;--scroller-width: 0;height:var(--internal-table-header-height);width:100%}:host .style-wrapper .body{display:flex;flex-direction:column;height:calc(100% - var(--internal-table-header-height));width:100%}:host([col_resize]){--local-table-cell-resize-display: block}`;
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('col_resize')) { this.attributeChangedCallback('col_resize', false, false); }if(!this["data"]){ this["data"] = [];} }
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
        this.bodyContainer.innerHTML = "";
        for (let item of this.data) {
            let row = new this.options.row();
            row.table = this;
            row.init(this.options, item);
            this.bodyContainer.appendChild(row);
        }
    }
    postCreation() {
        this.syncScroll();
    }
}
Components.Table.Namespace=`${moduleName}.Components`;
_.Components.Table=Components.Table;


for(let key in _) { Core[key] = _[key] }
})(Core);

var Core;
(Core||(Core = {}));
(function (Core) {
const moduleName = `Core`;
const _ = {};

const Websocket = {};
_.Websocket = {};
Websocket.Events = {};
_.Websocket.Events = {};
const Logic = {};
_.Logic = {};
const Data = {};
_.Data = {};
const App = {};
_.App = {};
const Routes = {};
_.Routes = {};
Websocket.Routes = {};
_.Websocket.Routes = {};
let _n;

Websocket.Events.ApplicationTestEvent2=class ApplicationTestEvent2 extends AventusSharp.Socket.WsEvent {
    /**
     * @inheritdoc
     */
    get path() {
        return "/application/test/2";
    }
}
Websocket.Events.ApplicationTestEvent2.Namespace=`${moduleName}.Websocket.Events`;
_.Websocket.Events.ApplicationTestEvent2=Websocket.Events.ApplicationTestEvent2;
Websocket.Events.Body=class Body {
    static get Fullname() { return "Core.Websocket.Events.ApplicationTestEvent+Body, Core"; }
    id = undefined;
    name = undefined;
}
Websocket.Events.Body.Namespace=`${moduleName}.Websocket.Events`;Aventus.Converter.register(Websocket.Events.Body.Fullname, Websocket.Events.Body);
_.Websocket.Events.Body=Websocket.Events.Body;
Websocket.Events.ApplicationTestEvent=class ApplicationTestEvent extends AventusSharp.Socket.WsEvent {
    /**
     * @inheritdoc
     */
    get path() {
        return "Core.Websocket.Events.ApplicationTestEvent";
    }
}
Websocket.Events.ApplicationTestEvent.Namespace=`${moduleName}.Websocket.Events`;
_.Websocket.Events.ApplicationTestEvent=Websocket.Events.ApplicationTestEvent;
Websocket.MainEndPointEvents= [
    { type: Websocket.Events.ApplicationTestEvent, path: "application.ApplicationTestEvent" },
    { type: Websocket.Events.ApplicationTestEvent2, path: "ApplicationTestEvent2" },
];

_.Websocket.MainEndPointEvents=Websocket.MainEndPointEvents;
(function (LoginCode) {
    LoginCode[LoginCode["OK"] = 0] = "OK";
    LoginCode[LoginCode["WrongCredentials"] = 1] = "WrongCredentials";
    LoginCode[LoginCode["Unknown"] = 2] = "Unknown";
})(Logic.LoginCode || (Logic.LoginCode = {}));

_.Logic.LoginCode=Logic.LoginCode;
Data.Permission=class Permission extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.Permission, Core"; }
    EnumName = undefined;
    AdditionalInfo = "";
    EnumValue = undefined;
}
Data.Permission.$schema={"EnumName":"string","AdditionalInfo":"string","EnumValue":"Aventus.Enum"};Aventus.DataManager.register(Data.Permission.Fullname, Data.Permission);Data.Permission.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Permission.Fullname, Data.Permission);
_.Data.Permission=Data.Permission;
Data.Desktop=class Desktop extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.Desktop, Core"; }
    Name = undefined;
    Elements = [];
}
Data.Desktop.$schema={"Name":"string","Elements":"DesktopPosition"};Aventus.DataManager.register(Data.Desktop.Fullname, Data.Desktop);Data.Desktop.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.Desktop.Fullname, Data.Desktop);
_.Data.Desktop=Data.Desktop;
Data.DesktopPosition=class DesktopPosition extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.DesktopPosition, Core"; }
    Position = undefined;
    Desktop = undefined;
}
Data.DesktopPosition.$schema={"Position":"number","Desktop":"Desktop"};Aventus.DataManager.register(Data.DesktopPosition.Fullname, Data.DesktopPosition);Data.DesktopPosition.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.DesktopPosition.Fullname, Data.DesktopPosition);
_.Data.DesktopPosition=Data.DesktopPosition;
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
Data.User=class User extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.User, Core"; }
    Firstname = "";
    Lastname = "";
    Username = "";
    Password = "";
    Token = "";
    Picture = "";
}
Data.User.$schema={"Firstname":"string","Lastname":"string","Username":"string","Password":"string","Token":"string","Picture":"string"};Aventus.DataManager.register(Data.User.Fullname, Data.User);Data.User.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.User.Fullname, Data.User);
_.Data.User=Data.User;
Data.PermissionUser=class PermissionUser extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.PermissionUser, Core"; }
    Permission = undefined;
    User = undefined;
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
    Permission = undefined;
    Group = undefined;
}
Data.PermissionGroup.$schema={"Permission":""+moduleName+".Data.Permission","Group":""+moduleName+".Data.Group"};Aventus.DataManager.register(Data.PermissionGroup.Fullname, Data.PermissionGroup);Data.PermissionGroup.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.PermissionGroup.Fullname, Data.PermissionGroup);
_.Data.PermissionGroup=Data.PermissionGroup;
Routes.MainRouter=class MainRouter extends Aventus.HttpRoute {
    async Home() {
        const request = new Aventus.HttpRequest(`/`, Aventus.HttpMethod.GET);
    }
    async LoginAction(body) {
        const request = new Aventus.HttpRequest(`/login`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryVoid(this.router);
    }
    async Logout() {
        const request = new Aventus.HttpRequest(`/logout`, Aventus.HttpMethod.POST);
        return await request.queryVoid(this.router);
    }
    async VapidPublicKey() {
        const request = new Aventus.HttpRequest(`/vapidPublicKey`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    async Register(body) {
        const request = new Aventus.HttpRequest(`/register`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryVoid(this.router);
    }
    async SendNotification() {
        const request = new Aventus.HttpRequest(`/sendNotification`, Aventus.HttpMethod.GET);
        return await request.queryVoid(this.router);
    }
    async Restart() {
        const request = new Aventus.HttpRequest(`/restart`, Aventus.HttpMethod.GET);
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
_.App.AppConfiguration=App.AppConfiguration;
Data.ApplicationData=class ApplicationData extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.ApplicationData, Core"; }
    Name = "";
    Version = 0;
    LogoClassName = "";
    LogoTagName = "";
    Extension = undefined;
}
Data.ApplicationData.$schema={"Name":"string","Version":"number","LogoClassName":"string","LogoTagName":"string","Extension":"string"};Aventus.DataManager.register(Data.ApplicationData.Fullname, Data.ApplicationData);Data.ApplicationData.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.ApplicationData.Fullname, Data.ApplicationData);
_.Data.ApplicationData=Data.ApplicationData;
Websocket.Routes.ApplicationRouter_GetAll3=class ApplicationRouter_GetAll3 extends AventusSharp.Socket.WsEvent {
    /**
     * @inheritdoc
     */
    get path() {
        return "/application3";
    }
}
Websocket.Routes.ApplicationRouter_GetAll3.Namespace=`${moduleName}.Websocket.Routes`;
_.Websocket.Routes.ApplicationRouter_GetAll3=Websocket.Routes.ApplicationRouter_GetAll3;
Websocket.Routes.ApplicationRouter_GetAll2=class ApplicationRouter_GetAll2 extends AventusSharp.Socket.WsEvent {
    /**
     * @inheritdoc
     */
    get path() {
        return "/application2";
    }
}
Websocket.Routes.ApplicationRouter_GetAll2.Namespace=`${moduleName}.Websocket.Routes`;
_.Websocket.Routes.ApplicationRouter_GetAll2=Websocket.Routes.ApplicationRouter_GetAll2;
Websocket.Routes.ApplicationRouter=class ApplicationRouter extends AventusSharp.Socket.WsRoute {
    events;
    constructor(endpoint) {
        super(endpoint);
        this.events = {
            GetAll2: new ApplicationRouter_GetAll2(endpoint),
            GetAll3: new ApplicationRouter_GetAll3(endpoint),
        };
    }
    async GetAll2() {
        return await this.endpoint.sendMessageAndWait(`/application2`);
    }
    async GetAll3(body) {
        return await this.endpoint.sendMessageAndWait(`/application3`, body);
    }
    async GetAll4() {
        await this.endpoint.sendMessageAndWait(`/application4`);
    }
    async GetAll5() {
        return await this.endpoint.sendMessageAndWait(`/getall5`);
    }
}
Websocket.Routes.ApplicationRouter.Namespace=`${moduleName}.Websocket.Routes`;
_.Websocket.Routes.ApplicationRouter=Websocket.Routes.ApplicationRouter;
const ConfigureAppTableAllAppsAction = class ConfigureAppTableAllAppsAction extends Core.Components.TableCell {
    name = "";
    static __style = `:host rk-button{background-color:var(--green)}`;
    __getStatic() {
        return ConfigureAppTableAllAppsAction;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(ConfigureAppTableAllAppsAction.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<rk-button _id="configureapptableallappsaction_0">Installer</rk-button>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "configureapptableallappsaction_0",
      "onPress": (e, pressInstance, c) => { c.component.install(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "ConfigureAppTableAllAppsAction";
    }
    setContent(data, rowData) {
        this.name = rowData.name;
    }
    async install() {
        if (this.table instanceof ConfigureAppTableAllApps) {
            let isInstalled = await this.table.install(this.name);
            if (isInstalled) {
                this.row?.remove();
            }
            else {
                alert("Quelque chose ne s'est pas bien passée, vérifier que l'application choisie a déjà été compilée");
            }
        }
    }
}
ConfigureAppTableAllAppsAction.Namespace=`${moduleName}`;
_.ConfigureAppTableAllAppsAction=ConfigureAppTableAllAppsAction;
if(!window.customElements.get('rk-configure-app-table-all-apps-action')){window.customElements.define('rk-configure-app-table-all-apps-action', ConfigureAppTableAllAppsAction);Aventus.WebComponentInstance.registerDefinition(ConfigureAppTableAllAppsAction);}

Routes.ApplicationRouter=class ApplicationRouter extends Aventus.HttpRoute {
    async GetAll() {
        const request = new Aventus.HttpRequest(`/application`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    async ConfigureAppData() {
        const request = new Aventus.HttpRequest(`/configureApp/data`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    async InstallDevApp(body) {
        const request = new Aventus.HttpRequest(`/configureApp/install`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
    async UninstallDevApp(body) {
        const request = new Aventus.HttpRequest(`/configureApp/uninstall`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryVoid(this.router);
    }
}
Routes.ApplicationRouter.Namespace=`${moduleName}.Routes`;
_.Routes.ApplicationRouter=Routes.ApplicationRouter;
Routes.UserRouter=class UserRouter extends AventusSharp.Routes.StorableRoute {
    StorableName() {
        return "User";
    }
}
Routes.UserRouter.Namespace=`${moduleName}.Routes`;
_.Routes.UserRouter=Routes.UserRouter;
const generatedHttpRoutes= [
    { type: Routes.ApplicationRouter, path: "Application" },
    { type: Routes.MainRouter, path: "" },
    { type: Routes.UserRouter, path: "" },
];

_.generatedHttpRoutes=generatedHttpRoutes;
const GeneratedRouter=class GeneratedRouter extends Aventus.HttpRouter.WithRoute(generatedHttpRoutes) {
}
GeneratedRouter.Namespace=`${moduleName}`;
_.GeneratedRouter=GeneratedRouter;
const ConfigureAppTableInstalledAction = class ConfigureAppTableInstalledAction extends Core.Components.TableCell {
    appName = "";
    static __style = `:host rk-button{background-color:var(--red)}`;
    __getStatic() {
        return ConfigureAppTableInstalledAction;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(ConfigureAppTableInstalledAction.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<rk-button _id="configureapptableinstalledaction_0">Désinstaller</rk-button>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "configureapptableinstalledaction_0",
      "onPress": (e, pressInstance, c) => { c.component.uninstall(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "ConfigureAppTableInstalledAction";
    }
    setContent(data, rowData) {
        this.appName = rowData.name;
    }
    async uninstall() {
        let query = await new GeneratedRouter().routes.Application.UninstallDevApp({
            app: this.appName
        });
        this.row?.remove();
    }
}
ConfigureAppTableInstalledAction.Namespace=`${moduleName}`;
_.ConfigureAppTableInstalledAction=ConfigureAppTableInstalledAction;
if(!window.customElements.get('rk-configure-app-table-installed-action')){window.customElements.define('rk-configure-app-table-installed-action', ConfigureAppTableInstalledAction);Aventus.WebComponentInstance.registerDefinition(ConfigureAppTableInstalledAction);}

const ConfigureAppTableInstalled = class ConfigureAppTableInstalled extends Core.Components.Table {
    static __style = ``;
    __getStatic() {
        return ConfigureAppTableInstalled;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(ConfigureAppTableInstalled.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "ConfigureAppTableInstalled";
    }
    configure(options) {
        options.schema = [{
                displayName: "Nom",
                name: "name",
                type: "string",
            }, {
                displayName: "Action",
                name: "",
                type: "custom",
                cell: ConfigureAppTableInstalledAction
            }];
        return options;
    }
}
ConfigureAppTableInstalled.Namespace=`${moduleName}`;
_.ConfigureAppTableInstalled=ConfigureAppTableInstalled;
if(!window.customElements.get('rk-configure-app-table-installed')){window.customElements.define('rk-configure-app-table-installed', ConfigureAppTableInstalled);Aventus.WebComponentInstance.registerDefinition(ConfigureAppTableInstalled);}

const ConfigureAppTableAllApps = class ConfigureAppTableAllApps extends Core.Components.Table {
    container = "";
    static __style = ``;
    __getStatic() {
        return ConfigureAppTableAllApps;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(ConfigureAppTableAllApps.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "ConfigureAppTableAllApps";
    }
    async install(appName) {
        let query = await new GeneratedRouter().routes.Application.InstallDevApp({
            container: this.container,
            app: appName
        });
        if (query.success && query.result) {
            return true;
        }
        return false;
    }
    configure(options) {
        options.schema = [{
                displayName: "Nom",
                name: "name",
                type: "string",
            }, {
                displayName: "Action",
                name: "",
                type: "custom",
                cell: ConfigureAppTableAllAppsAction
            }];
        return options;
    }
}
ConfigureAppTableAllApps.Namespace=`${moduleName}`;
_.ConfigureAppTableAllApps=ConfigureAppTableAllApps;
if(!window.customElements.get('rk-configure-app-table-all-apps')){window.customElements.define('rk-configure-app-table-all-apps', ConfigureAppTableAllApps);Aventus.WebComponentInstance.registerDefinition(ConfigureAppTableAllApps);}

const ConfigureApp = class ConfigureApp extends Aventus.WebComponent {
    static __style = `:host{background-color:#fff;background-image:url(/img/wp.png);color:var(--text-color);height:100%;width:100%}:host rk-scrollable{background-color:rgba(255,255,255,.3)}:host rk-scrollable .container{padding:30px;position:relative;width:100%}:host rk-scrollable .container .reboot-btn{position:absolute;right:20px;top:20px}:host rk-scrollable .container h1{text-align:center}:host rk-scrollable .container .table{height:auto}:host rk-scrollable .container h3{margin-top:40px}:host rk-scrollable .container h5{font-size:14px;font-weight:bold;letter-spacing:1px;text-transform:uppercase}`;
    __getStatic() {
        return ConfigureApp;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(ConfigureApp.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<rk-scrollable>    <div class="container">        <rk-button class="reboot-btn" _id="configureapp_0">Redémarrer</rk-button>        <h1>Configuration des applications</h1>        <h3>Applications installées</h3>        <rk-configure-app-table-installed class="table" _id="configureapp_1"></rk-configure-app-table-installed>        <h3>Toutes les applications</h3>        <div _id="configureapp_2"></div>    </div></rk-scrollable>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "tableInstalled",
      "ids": [
        "configureapp_1"
      ]
    },
    {
      "name": "allAppEl",
      "ids": [
        "configureapp_2"
      ]
    }
  ],
  "pressEvents": [
    {
      "id": "configureapp_0",
      "onPress": (e, pressInstance, c) => { c.component.reboot(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "ConfigureApp";
    }
    async load() {
        let query = await new GeneratedRouter().routes.Application.ConfigureAppData();
        if (query.result) {
            let appInstalled = [];
            for (const app of query.result.appsInstalled) {
                appInstalled.push({
                    name: app
                });
            }
            this.tableInstalled.data = appInstalled;
            for (const [key, value] of query.result.allApps) {
                let allApps = [];
                for (let appName of value) {
                    allApps.push({
                        name: appName
                    });
                }
                if (allApps.length > 0) {
                    let title = document.createElement("H5");
                    title.innerHTML = key;
                    this.allAppEl.appendChild(title);
                    let table = new ConfigureAppTableAllApps();
                    table.data = allApps;
                    table.container = key;
                    this.allAppEl.appendChild(table);
                }
            }
        }
    }
    async reboot() {
        await new GeneratedRouter().routes.Restart();
        await Aventus.sleep(2000);
        location.reload();
    }
    postCreation() {
        this.load();
    }
}
ConfigureApp.Namespace=`${moduleName}`;
_.ConfigureApp=ConfigureApp;
if(!window.customElements.get('rk-configure-app')){window.customElements.define('rk-configure-app', ConfigureApp);Aventus.WebComponentInstance.registerDefinition(ConfigureApp);}

App.AppError=class AppError extends Aventus.GenericError {
    static get Fullname() { return "Core.App.AppError, Core"; }
}
App.AppError.Namespace=`${moduleName}.App`;Aventus.Converter.register(App.AppError.Fullname, App.AppError);
_.App.AppError=App.AppError;
Logic.LoginError=class LoginError extends Aventus.GenericError {
    static get Fullname() { return "Core.Logic.LoginError, Core"; }
}
Logic.LoginError.Namespace=`${moduleName}.Logic`;Aventus.Converter.register(Logic.LoginError.Fullname, Logic.LoginError);
_.Logic.LoginError=Logic.LoginError;
Websocket.MainEndPointRoutes= [
    { type: Websocket.Routes.ApplicationRouter, path: "application" },
];

_.Websocket.MainEndPointRoutes=Websocket.MainEndPointRoutes;
Websocket.endPointInfo= {
    routes: Websocket.MainEndPointRoutes,
    events: Websocket.MainEndPointEvents
};

Websocket.MainEndPoint=class MainEndPoint extends AventusSharp.Socket.WsEndPoint.With(Websocket.endPointInfo) {
    get path() {
        return "/ws";
    }
}
Websocket.MainEndPoint.Namespace=`${moduleName}.Websocket`;
_.Websocket.MainEndPoint=Websocket.MainEndPoint;

for(let key in _) { Core[key] = _[key] }
})(Core);
