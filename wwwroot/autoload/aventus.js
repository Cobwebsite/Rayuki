Object.defineProperty(window, "AvInstance", {
	get() {return Aventus.Instance;}
})
var Aventus;
(Aventus||(Aventus = {}));
(function (Aventus) {
const moduleName = `Aventus`;
const _ = {};


let _n;
var HttpErrorCode;
(function (HttpErrorCode) {
    HttpErrorCode[HttpErrorCode["unknow"] = 0] = "unknow";
})(HttpErrorCode || (HttpErrorCode = {}));

_.HttpErrorCode=HttpErrorCode;
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["OPTION"] = "OPTION";
})(HttpMethod || (HttpMethod = {}));

_.HttpMethod=HttpMethod;
const createCommProxy=function createCommProxy(that) {
    let proxyData = {
        routePath: {},
        get(target, prop, receiver) {
            if (prop == "add") {
                return (cst, path) => {
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
                        let instance = new cst(that);
                        let keyFromChild = [];
                        while (cst.prototype) {
                            let keys = Object.getOwnPropertyNames(cst.prototype);
                            for (let key of keys) {
                                if (key != "constructor" && !keyFromChild.includes(key)) {
                                    keyFromChild.push(key);
                                    if (instance[key] instanceof Function)
                                        current[key] = instance[key].bind(instance);
                                    else
                                        current[key] = instance[key];
                                }
                            }
                            cst = Object.getPrototypeOf(cst);
                        }
                        let keysName = Object.getOwnPropertyNames(instance);
                        for (let key of keysName) {
                            if (!Object.getOwnPropertyDescriptor(current, key) && !keyFromChild.includes(key)) {
                                keyFromChild.push(key);
                                if (instance[key] instanceof Function)
                                    instance[key] = instance[key].bind(instance);
                                Object.defineProperty(current, key, {
                                    get: () => {
                                        return instance[key];
                                    },
                                    set: (value) => {
                                        instance[key] = value;
                                    }
                                });
                            }
                        }
                    }
                    catch (e) {
                        console.error(e);
                    }
                };
            }
            else if (prop == "getAll") {
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
    return proxyData;
}

_.createCommProxy=createCommProxy;
const CallbackGroup=class CallbackGroup {
    callbacks = {};
    /**
     * Clear all callbacks
     */
    clearAll() {
        this.callbacks = {};
    }
    /**
     * Clear all callbacks for a specific group
     */
    clear(group) {
        delete this.callbacks[group];
    }
    /**
     * Add a callback for a group
     */
    add(group, cb) {
        if (!this.callbacks[group]) {
            this.callbacks[group] = [];
        }
        this.callbacks[group].push(cb);
    }
    /**
     * Remove a callback for a group
     */
    remove(group, cb) {
        if (this.callbacks[group]) {
            let index = this.callbacks[group].indexOf(cb);
            if (index != -1) {
                this.callbacks[group].splice(index, 1);
            }
        }
    }
    /**
     * Trigger all callbacks inside a group
     */
    trigger(group, args) {
        if (this.callbacks[group]) {
            let cbs = [...this.callbacks[group]];
            for (let cb of cbs) {
                cb.apply(null, args);
            }
        }
    }
}
CallbackGroup.Namespace=`${moduleName}`;
_.CallbackGroup=CallbackGroup;
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
var WatchAction;
(function (WatchAction) {
    WatchAction[WatchAction["CREATED"] = 0] = "CREATED";
    WatchAction[WatchAction["UPDATED"] = 1] = "UPDATED";
    WatchAction[WatchAction["DELETED"] = 2] = "DELETED";
})(WatchAction || (WatchAction = {}));

_.WatchAction=WatchAction;
const getValueFromObject=function getValueFromObject(path, obj) {
    path = path.replace(/\[(.*?)\]/g, '.$1');
    if (path == "") {
        return obj;
    }
    let splitted = path.split(".");
    for (let i = 0; i < splitted.length - 1; i++) {
        let split = splitted[i];
        if (!obj[split] || typeof obj[split] !== 'object') {
            return undefined;
        }
        obj = obj[split];
    }
    if (!obj || typeof obj !== 'object') {
        return undefined;
    }
    return obj[splitted[splitted.length - 1]];
}

_.getValueFromObject=getValueFromObject;
const compareObject=function compareObject(obj1, obj2) {
    if (Array.isArray(obj1)) {
        if (!Array.isArray(obj2)) {
            return false;
        }
        obj2 = obj2.slice();
        if (obj1.length !== obj2.length) {
            return false;
        }
        for (let i = 0; i < obj1.length; i++) {
            let foundElement = false;
            for (let j = 0; j < obj2.length; j++) {
                if (compareObject(obj1[i], obj2[j])) {
                    obj2.splice(j, 1);
                    foundElement = true;
                    break;
                }
            }
            if (!foundElement) {
                return false;
            }
        }
        return true;
    }
    else if (obj1 instanceof Date) {
        return obj1.toString() === obj2.toString();
    }
    else if (typeof obj1 === 'object' && obj1 !== undefined && obj1 !== null) {
        if (typeof obj2 !== 'object' || obj2 === undefined || obj2 === null) {
            return false;
        }
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }
        for (let key in obj1) {
            if (!(key in obj2)) {
                return false;
            }
            if (!compareObject(obj1[key], obj2[key])) {
                return false;
            }
        }
        return true;
    }
    else {
        return obj1 === obj2;
    }
}

_.compareObject=compareObject;
var RamErrorCode;
(function (RamErrorCode) {
    RamErrorCode[RamErrorCode["unknow"] = 0] = "unknow";
    RamErrorCode[RamErrorCode["noId"] = 1] = "noId";
    RamErrorCode[RamErrorCode["noItemInsideRam"] = 2] = "noItemInsideRam";
})(RamErrorCode || (RamErrorCode = {}));

_.RamErrorCode=RamErrorCode;
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
const setValueToObject=function setValueToObject(path, obj, value) {
    path = path.replace(/\[(.*?)\]/g, '.$1');
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

_.setValueToObject=setValueToObject;
const sleep=function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

_.sleep=sleep;
const uuidv4=function uuidv4() {
    let uid = '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16));
    return uid;
}

_.uuidv4=uuidv4;
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
                if (newEl && newEl != el && el.shadowRoot.contains(newEl)) {
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
const ResourceLoader=class ResourceLoader {
    static headerLoaded = {};
    static headerWaiting = {};
    /**
     * Load the resource inside the head tag
     */
    static async loadInHead(options) {
        const _options = this.prepareOptions(options);
        if (this.headerLoaded[_options.url]) {
            return true;
        }
        else if (this.headerWaiting.hasOwnProperty(_options.url)) {
            return await this.awaitFctHead(_options.url);
        }
        else {
            this.headerWaiting[_options.url] = [];
            let tagEl;
            if (_options.type == "js") {
                tagEl = document.createElement("SCRIPT");
            }
            else if (_options.type == "css") {
                tagEl = document.createElement("LINK");
                tagEl.setAttribute("rel", "stylesheet");
            }
            else {
                throw "unknow type " + _options.type + " to append into head";
            }
            document.head.appendChild(tagEl);
            let result = await this.loadTag(tagEl, _options.url);
            this.headerLoaded[_options.url] = true;
            this.releaseAwaitFctHead(_options.url, result);
            return result;
        }
    }
    static loadTag(tagEl, url) {
        return new Promise((resolve, reject) => {
            tagEl.addEventListener("load", (e) => {
                resolve(true);
            });
            tagEl.addEventListener("error", (e) => {
                resolve(false);
            });
            if (tagEl instanceof HTMLLinkElement) {
                tagEl.setAttribute("href", url);
            }
            else {
                tagEl.setAttribute('src', url);
            }
        });
    }
    static releaseAwaitFctHead(url, result) {
        if (this.headerWaiting[url]) {
            for (let i = 0; i < this.headerWaiting[url].length; i++) {
                this.headerWaiting[url][i](result);
            }
            delete this.headerWaiting[url];
        }
    }
    static awaitFctHead(url) {
        return new Promise((resolve) => {
            this.headerWaiting[url].push((result) => {
                resolve(result);
            });
        });
    }
    static requestLoaded = {};
    static requestWaiting = {};
    /**
     *
    */
    static async load(options) {
        options = this.prepareOptions(options);
        if (this.requestLoaded[options.url]) {
            return this.requestLoaded[options.url];
        }
        else if (this.requestWaiting.hasOwnProperty(options.url)) {
            await this.awaitFct(options.url);
            return this.requestLoaded[options.url];
        }
        else {
            this.requestWaiting[options.url] = [];
            let blob = false;
            if (options.type == "img") {
                blob = true;
            }
            let content = await this.fetching(options.url, blob);
            if (options.type == "img" && content.startsWith("data:text/html;")) {
                console.error("Can't load img " + options.url);
                content = "";
            }
            this.requestLoaded[options.url] = content;
            this.releaseAwaitFct(options.url);
            return content;
        }
    }
    static releaseAwaitFct(url) {
        if (this.requestWaiting[url]) {
            for (let i = 0; i < this.requestWaiting[url].length; i++) {
                this.requestWaiting[url][i]();
            }
            delete this.requestWaiting[url];
        }
    }
    static awaitFct(url) {
        return new Promise((resolve) => {
            this.requestWaiting[url].push(() => {
                resolve('');
            });
        });
    }
    static async fetching(url, useBlob = false) {
        if (useBlob) {
            let result = await fetch(url, {
                headers: {
                    responseType: 'blob'
                }
            });
            let blob = await result.blob();
            return await this.readFile(blob);
        }
        else {
            let result = await fetch(url);
            return await result.text();
        }
    }
    static readFile(blob) {
        return new Promise((resolve) => {
            var reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });
    }
    static imgExtensions = ["png", "jpg", "jpeg", "gif"];
    static prepareOptions(options) {
        let result;
        if (typeof options === 'string' || options instanceof String) {
            result = {
                url: options,
                type: 'js'
            };
            let splittedURI = result.url.split('.');
            let extension = splittedURI[splittedURI.length - 1];
            extension = extension.split("?")[0];
            if (extension == "svg") {
                result.type = 'svg';
            }
            else if (extension == "js") {
                result.type = 'js';
            }
            else if (extension == "css") {
                result.type = 'css';
            }
            else if (this.imgExtensions.indexOf(extension) != -1) {
                result.type = 'img';
            }
            else {
                throw 'unknow extension found :' + extension + ". Please define your extension inside options";
            }
        }
        else {
            result = options;
        }
        return result;
    }
}
ResourceLoader.Namespace=`${moduleName}`;
_.ResourceLoader=ResourceLoader;
const Json=class Json {
    static classToJson(obj, options) {
        const realOptions = {
            isValidKey: options?.isValidKey ?? (() => true),
            replaceKey: options?.replaceKey ?? ((key) => key),
            transformValue: options?.transformValue ?? ((key, value) => value),
            beforeEnd: options?.beforeEnd ?? ((res) => res)
        };
        return this.__classToJson(obj, realOptions);
    }
    static __classToJson(obj, options) {
        let result = {};
        let descriptors = Object.getOwnPropertyDescriptors(obj);
        for (let key in descriptors) {
            if (options.isValidKey(key))
                result[options.replaceKey(key)] = options.transformValue(key, descriptors[key].value);
        }
        let cst = obj.constructor;
        while (cst.prototype && cst != Object.prototype) {
            let descriptorsClass = Object.getOwnPropertyDescriptors(cst.prototype);
            for (let key in descriptorsClass) {
                if (options.isValidKey(key)) {
                    let descriptor = descriptorsClass[key];
                    if (descriptor?.get) {
                        result[options.replaceKey(key)] = options.transformValue(key, obj[key]);
                    }
                }
            }
            cst = Object.getPrototypeOf(cst);
        }
        result = options.beforeEnd(result);
        return result;
    }
    static classfromJson(obj, data, options) {
        let realOptions = {
            transformValue: options?.transformValue ?? ((key, value) => value),
        };
        return this.__classfromJson(obj, data, realOptions);
    }
    static __classfromJson(obj, data, options) {
        let props = Object.getOwnPropertyNames(obj);
        for (let prop of props) {
            let propUpperFirst = prop[0].toUpperCase() + prop.slice(1);
            let value = data[prop] === undefined ? data[propUpperFirst] : data[prop];
            if (value !== undefined) {
                let propInfo = Object.getOwnPropertyDescriptor(obj, prop);
                if (propInfo?.writable) {
                    obj[prop] = options.transformValue(prop, value);
                }
            }
        }
        let cstTemp = obj.constructor;
        while (cstTemp.prototype && cstTemp != Object.prototype) {
            props = Object.getOwnPropertyNames(cstTemp.prototype);
            for (let prop of props) {
                let propUpperFirst = prop[0].toUpperCase() + prop.slice(1);
                let value = data[prop] === undefined ? data[propUpperFirst] : data[prop];
                if (value !== undefined) {
                    let propInfo = Object.getOwnPropertyDescriptor(cstTemp.prototype, prop);
                    if (propInfo?.set) {
                        obj[prop] = options.transformValue(prop, value);
                    }
                }
            }
            cstTemp = Object.getPrototypeOf(cstTemp);
        }
        return obj;
    }
}
Json.Namespace=`${moduleName}`;
_.Json=Json;
const ConverterTransform=class ConverterTransform {
    transform(data) {
        return this.transformLoop(data);
    }
    createInstance(data) {
        if (data.$type) {
            let cst = Converter.info.get(data.$type);
            if (cst) {
                return new cst();
            }
        }
        return undefined;
    }
    beforeTransformObject(obj) {
    }
    afterTransformObject(obj) {
    }
    transformLoop(data) {
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
            let objTemp = this.createInstance(data);
            if (objTemp) {
                let obj = objTemp;
                this.beforeTransformObject(obj);
                if (obj.fromJSON) {
                    obj.fromJSON(data);
                }
                else {
                    obj = Json.classfromJson(obj, data, {
                        transformValue: (key, value) => {
                            if (obj[key] instanceof Date) {
                                return value ? new Date(value) : null;
                            }
                            else if (obj[key] instanceof Map) {
                                let map = new Map();
                                for (const keyValue of value) {
                                    map.set(this.transformLoop(keyValue[0]), this.transformLoop(keyValue[1]));
                                }
                                return map;
                            }
                            return this.transformLoop(value);
                        }
                    });
                }
                this.afterTransformObject(obj);
                return obj;
            }
            let result = {};
            for (let key in data) {
                result[key] = this.transformLoop(data[key]);
            }
            return result;
        }
        return data;
    }
    copyValuesClass(target, src, options) {
        const realOptions = {
            isValidKey: options?.isValidKey ?? (() => true),
            replaceKey: options?.replaceKey ?? ((key) => key),
            transformValue: options?.transformValue ?? ((key, value) => value),
        };
        this.__classCopyValues(target, src, realOptions);
    }
    __classCopyValues(target, src, options) {
        let props = Object.getOwnPropertyNames(target);
        for (let prop of props) {
            let propInfo = Object.getOwnPropertyDescriptor(target, prop);
            if (propInfo?.writable) {
                if (options.isValidKey(prop))
                    target[options.replaceKey(prop)] = options.transformValue(prop, src[prop]);
            }
        }
        let cstTemp = target.constructor;
        while (cstTemp.prototype && cstTemp != Object.prototype) {
            props = Object.getOwnPropertyNames(cstTemp.prototype);
            for (let prop of props) {
                let propInfo = Object.getOwnPropertyDescriptor(cstTemp.prototype, prop);
                if (propInfo?.set && propInfo.get) {
                    if (options.isValidKey(prop))
                        target[options.replaceKey(prop)] = options.transformValue(prop, src[prop]);
                }
            }
            cstTemp = Object.getPrototypeOf(cstTemp);
        }
    }
}
ConverterTransform.Namespace=`${moduleName}`;
_.ConverterTransform=ConverterTransform;
const Converter=class Converter {
    static info = new Map();
    static schema = new Map();
    static __converter = new ConverterTransform();
    static get converterTransform() {
        return this.__converter;
    }
    static setConverter(converter) {
        this.__converter = converter;
    }
    /**
     * Register a unique string type for any class
     */
    static register($type, cst, schema) {
        this.info.set($type, cst);
        if (schema) {
            this.schema.set($type, schema);
        }
    }
    static transform(data, converter) {
        if (!converter) {
            converter = this.converterTransform;
        }
        return converter.transform(data);
    }
    static copyValuesClass(to, from, options, converter) {
        if (!converter) {
            converter = this.converterTransform;
        }
        return converter.copyValuesClass(to, from, options);
    }
}
Converter.Namespace=`${moduleName}`;
_.Converter=Converter;
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
        return Converter.transform(JSON.parse(JSON.stringify(data)));
    }
}
DataManager.Namespace=`${moduleName}`;
_.DataManager=DataManager;
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
        let toAvoid = ['className', 'namespace'];
        return Json.classToJson(this, {
            isValidKey: (key) => !toAvoid.includes(key)
        });
    }
}
Data.Namespace=`${moduleName}`;
_.Data=Data;
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
const RamError=class RamError extends GenericError {
}
RamError.Namespace=`${moduleName}`;
_.RamError=RamError;
const HttpError=class HttpError extends GenericError {
}
HttpError.Namespace=`${moduleName}`;
_.HttpError=HttpError;
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
const ResultWithError=class ResultWithError extends VoidWithError {
    /**
     * Result
     */
    result;
}
ResultWithError.Namespace=`${moduleName}`;
_.ResultWithError=ResultWithError;
const ResultRamWithError=class ResultRamWithError extends ResultWithError {
}
ResultRamWithError.Namespace=`${moduleName}`;
_.ResultRamWithError=ResultRamWithError;
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
            const fullUrl = router ? router.options.url + this.url : this.url;
            result.result = await fetch(fullUrl, this.request);
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
                        this._routes.add(route);
                    }
                    else {
                        this._routes.add(route.type, route.path);
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
            this._routes = new Proxy({}, createCommProxy(this));
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
const StorableRoute=class StorableRoute extends HttpRoute {
    async GetAll() {
        const request = new HttpRequest(`/${this.StorableName()}`, HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    async Create(body) {
        const request = new HttpRequest(`/${this.StorableName()}`, HttpMethod.POST);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
    async GetById(id) {
        const request = new HttpRequest(`/${this.StorableName()}/${id}`, HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    async Update(id, body) {
        const request = new HttpRequest(`/${this.StorableName()}/${id}`, HttpMethod.PUT);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
    async Delete(id) {
        const request = new HttpRequest(`/${this.StorableName()}/${id}`, HttpMethod.DELETE);
        return await request.queryJSON(this.router);
    }
}
StorableRoute.Namespace=`${moduleName}`;
_.StorableRoute=StorableRoute;
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
        if (!options.buttonAllowed)
            options.buttonAllowed = [0];
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
        if (!this.options.buttonAllowed?.includes(e.button)) {
            return;
        }
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
    draggableElement;
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
        this.draggableElement = draggableElement;
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
        let draggableElement = this.draggableElement;
        if (this.options.shadow.enable && this.options.shadow.removeOnStop) {
            draggableElement.parentNode?.removeChild(draggableElement);
        }
        if (targets.length > 0) {
            this.options.onDrop(this.options.element, targets);
        }
        this.options.onStop(e);
    }
    setPosition(position) {
        let draggableElement = this.draggableElement;
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
        let draggableElement = this.draggableElement;
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
const Effect=class Effect {
    callbacks = [];
    isInit = false;
    isDestroy = false;
    __subscribes = [];
    __allowChanged = [];
    version = 0;
    fct;
    constructor(fct) {
        this.fct = fct;
        if (this.autoInit()) {
            this.init();
        }
    }
    autoInit() {
        return true;
    }
    init() {
        this.isInit = true;
        this.run();
    }
    run() {
        this.version++;
        Watcher._registering.push(this);
        let result = this.fct();
        Watcher._registering.splice(Watcher._registering.length - 1, 1);
        for (let i = 0; i < this.callbacks.length; i++) {
            if (this.callbacks[i].version != this.version) {
                this.callbacks[i].receiver.unsubscribe(this.callbacks[i].cb);
                this.callbacks.splice(i, 1);
                i--;
            }
        }
        return result;
    }
    register(receiver, path, version, fullPath) {
        for (let info of this.callbacks) {
            if (info.receiver == receiver && info.path == path && receiver.__path == info.registerPath) {
                info.version = version;
                info.fullPath = fullPath;
                return;
            }
        }
        let cb;
        if (path == "*") {
            cb = (action, changePath, value) => { this.onChange(action, changePath, value); };
        }
        else {
            cb = (action, changePath, value) => {
                let full = fullPath;
                if (changePath == path) {
                    this.onChange(action, changePath, value);
                }
            };
        }
        this.callbacks.push({
            receiver,
            path,
            registerPath: receiver.__path,
            cb,
            version,
            fullPath
        });
        receiver.subscribe(cb);
    }
    canChange(fct) {
        this.__allowChanged.push(fct);
    }
    checkCanChange(action, changePath, value) {
        if (this.isDestroy) {
            return false;
        }
        for (let fct of this.__allowChanged) {
            if (!fct(action, changePath, value)) {
                return false;
            }
        }
        return true;
    }
    onChange(action, changePath, value) {
        if (!this.checkCanChange(action, changePath, value)) {
            return;
        }
        this.run();
        for (let fct of this.__subscribes) {
            fct(action, changePath, value);
        }
    }
    destroy() {
        this.isDestroy = true;
        for (let pair of this.callbacks) {
            pair.receiver.unsubscribe(pair.cb);
        }
        this.callbacks = [];
        this.isInit = false;
    }
    subscribe(fct) {
        let index = this.__subscribes.indexOf(fct);
        if (index == -1) {
            this.__subscribes.push(fct);
        }
    }
    unsubscribe(fct) {
        let index = this.__subscribes.indexOf(fct);
        if (index > -1) {
            this.__subscribes.splice(index, 1);
        }
    }
}
Effect.Namespace=`${moduleName}`;
_.Effect=Effect;
const Watcher=class Watcher {
    static _registering = [];
    static get _register() {
        return this._registering[this._registering.length - 1];
    }
    /**
     * Transform object into a watcher
     */
    static get(obj, onDataChanged) {
        if (obj == undefined) {
            console.error("You must define an objet / array for your proxy");
            return;
        }
        if (obj.__isProxy) {
            if (onDataChanged)
                obj.subscribe(onDataChanged);
            return obj;
        }
        const reservedName = {
            __path: '__path',
        };
        const clearReservedNames = (data) => {
            if (data instanceof Object && !data.__isProxy) {
                for (let key in reservedName) {
                    delete data[key];
                }
            }
        };
        let setProxyPath = (newProxy, newPath) => {
            if (newProxy instanceof Object && newProxy.__isProxy) {
                newProxy.__path = newPath;
            }
        };
        let jsonReplacer = (key, value) => {
            if (reservedName[key])
                return undefined;
            return value;
        };
        let addAlias = (otherBaseData, name, cb) => {
            let cbs = aliases.get(otherBaseData);
            if (!cbs) {
                cbs = [];
                aliases.set(otherBaseData, cbs);
            }
            cbs.push({
                name: name,
                fct: cb
            });
        };
        let deleteAlias = (otherBaseData, name) => {
            let cbs = aliases.get(otherBaseData);
            if (!cbs)
                return;
            for (let i = 0; i < cbs.length; i++) {
                if (cbs[i].name == name) {
                    cbs.splice(i, 1);
                    if (cbs.length == 0) {
                        aliases.delete(otherBaseData);
                    }
                    return;
                }
            }
        };
        let replaceByAlias = (target, element, prop, receiver) => {
            let fullInternalPath = "";
            if (Array.isArray(target)) {
                if (prop != "length") {
                    if (target.__path) {
                        fullInternalPath = target.__path;
                    }
                    fullInternalPath += "[" + prop + "]";
                }
            }
            else {
                if (target.__path) {
                    fullInternalPath = target.__path + '.';
                }
                fullInternalPath += prop;
            }
            if (receiver && internalAliases[fullInternalPath]) {
                internalAliases[fullInternalPath].unbind();
            }
            if (element instanceof Object && element.__isProxy) {
                let root = element.__root;
                if (root != proxyData.baseData) {
                    let oldPath = element.__path;
                    let unbindElement = getValueFromObject(oldPath, root);
                    if (receiver == null) {
                        receiver = getValueFromObject(target.__path, realProxy);
                        if (internalAliases[fullInternalPath]) {
                            internalAliases[fullInternalPath].unbind();
                        }
                    }
                    let result = Reflect.set(target, prop, unbindElement, receiver);
                    element.__addAlias(proxyData.baseData, oldPath, (type, target, receiver2, value, prop2, dones) => {
                        let triggerPath;
                        if (prop2.startsWith("[") || fullInternalPath == "" || prop2 == "") {
                            triggerPath = fullInternalPath + prop2;
                        }
                        else {
                            triggerPath = fullInternalPath + "." + prop2;
                        }
                        triggerPath = triggerPath.replace(/\[(.*?)\]/g, '.$1');
                        if (type == 'DELETED' && internalAliases[triggerPath]) {
                            internalAliases[triggerPath].unbind();
                        }
                        let splitted = triggerPath.split(".");
                        let newProp = splitted.pop();
                        let newReceiver = getValueFromObject(splitted.join("."), realProxy);
                        trigger(type, target, newReceiver, value, newProp, dones);
                    });
                    internalAliases[fullInternalPath] = {
                        unbind: () => {
                            delete internalAliases[fullInternalPath];
                            element.__deleteAlias(proxyData.baseData, oldPath);
                            deleteAlias(root, prop);
                        }
                    };
                    addAlias(root, prop, (type, target, receiver2, value, prop2, dones) => {
                        let proxy = element.__getProxy;
                        let triggerPath;
                        if (prop2.startsWith("[") || oldPath == "" || prop2 == "") {
                            triggerPath = oldPath + prop2;
                        }
                        else {
                            triggerPath = oldPath + "." + prop2;
                        }
                        triggerPath = triggerPath.replace(/\[(.*?)\]/g, '.$1');
                        let splitted = triggerPath.split(".");
                        let newProp = splitted.pop();
                        let newReceiver = getValueFromObject(splitted.join("."), proxy);
                        element.__trigger(type, target, newReceiver, value, newProp, dones);
                    });
                    return unbindElement;
                }
            }
            return element;
        };
        let currentTrace = new Error().stack?.split("\n") ?? [];
        currentTrace.shift();
        currentTrace.shift();
        const aliases = new Map();
        const internalAliases = {};
        let proxyData = {
            baseData: {},
            callbacks: {},
            callbacksReverse: new Map(),
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
                element = replaceByAlias(target, element, prop, null);
                if (element instanceof Object && element.__isProxy) {
                    newProxy = element;
                }
                else {
                    try {
                        if (element instanceof Computed) {
                            return element;
                        }
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
                    if (/^[0-9]*$/g.exec(prop)) {
                        if (target.__path) {
                            newPath = target.__path;
                        }
                        newPath += "[" + prop + "]";
                        setProxyPath(newProxy, newPath);
                    }
                    else {
                        newPath += "." + prop;
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
                else if (prop == "__getProxy") {
                    return realProxy;
                }
                else if (prop == "__root") {
                    return this.baseData;
                }
                else if (prop == "__callbacks") {
                    return this.callbacks;
                }
                else if (prop == "subscribe") {
                    let path = receiver.__path;
                    return (cb) => {
                        if (!this.callbacks[path]) {
                            this.callbacks[path] = [];
                        }
                        this.callbacks[path].push(cb);
                        this.callbacksReverse.set(cb, path);
                    };
                }
                else if (prop == "unsubscribe") {
                    return (cb) => {
                        let oldPath = this.callbacksReverse.get(cb);
                        if (oldPath === undefined)
                            return;
                        if (!this.callbacks[oldPath]) {
                            return;
                        }
                        let index = this.callbacks[oldPath].indexOf(cb);
                        if (index > -1) {
                            this.callbacks[oldPath].splice(index, 1);
                        }
                        this.callbacksReverse.delete(cb);
                    };
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
                else if (prop == "toJSON") {
                    if (Array.isArray(target)) {
                        return () => {
                            let result = [];
                            for (let element of target) {
                                result.push(element);
                            }
                            return result;
                        };
                    }
                    return () => {
                        let result = {};
                        for (let key of Object.keys(target)) {
                            if (reservedName[key]) {
                                continue;
                            }
                            result[key] = target[key];
                        }
                        return result;
                    };
                }
                else if (prop == "__addAlias") {
                    return addAlias;
                }
                else if (prop == "__deleteAlias") {
                    return deleteAlias;
                }
                else if (prop == "__trigger") {
                    return trigger;
                }
                return undefined;
            },
            get(target, prop, receiver) {
                if (reservedName[prop]) {
                    return target[prop];
                }
                let customResult = this.tryCustomFunction(target, prop, receiver);
                if (customResult !== undefined) {
                    return customResult;
                }
                let element = target[prop];
                if (typeof (element) == 'function') {
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
                                    target.splice(target.length - 1, 1, el);
                                    trigger('CREATED', target, receiver, receiver[index - 1], "[" + (index - 1) + "]");
                                    trigger('UPDATED', target, receiver, target.length, "length");
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
                                    let oldValues = [];
                                    for (let i = index; i < index + nbRemove; i++) {
                                        oldValues.push(receiver[i]);
                                    }
                                    let updateLength = nbRemove != insert.length;
                                    let res = target.splice(index, nbRemove, ...insert);
                                    for (let i = 0; i < oldValues.length; i++) {
                                        trigger('DELETED', target, receiver, oldValues[i], "[" + index + "]");
                                    }
                                    for (let i = 0; i < insert.length; i++) {
                                        target.splice((index + i), 1, insert[i]);
                                        trigger('CREATED', target, receiver, receiver[(index + i)], "[" + (index + i) + "]");
                                    }
                                    // for(let i = fromIndex, j = 0; i < target.length; i++, j++) {
                                    //     let proxyEl = this.getProxyObject(target, target[i], i);
                                    //     let recuUpdate = (childEl) => {
                                    //         if(Array.isArray(childEl)) {
                                    //             for(let i = 0; i < childEl.length; i++) {
                                    //                 if(childEl[i] instanceof Object && childEl[i].__path) {
                                    //                     let newProxyEl = this.getProxyObject(childEl, childEl[i], i);
                                    //                     recuUpdate(newProxyEl);
                                    //         else if(childEl instanceof Object && !(childEl instanceof Date)) {
                                    //             for(let key in childEl) {
                                    //                 if(childEl[key] instanceof Object && childEl[key].__path) {
                                    //                     let newProxyEl = this.getProxyObject(childEl, childEl[key], key);
                                    //                     recuUpdate(newProxyEl);
                                    //     recuUpdate(proxyEl);
                                    if (updateLength)
                                        trigger('UPDATED', target, receiver, target.length, "length");
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
                                    let oldValue = receiver.length ? receiver[receiver.length] : undefined;
                                    let res = target.pop();
                                    trigger('DELETED', target, receiver, oldValue, "[" + index + "]");
                                    trigger('UPDATED', target, receiver, target.length, "length");
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
                if (element instanceof Computed) {
                    return element.value;
                }
                if (Watcher._registering.length > 0) {
                    let currentPath;
                    let fullPath;
                    let isArray = Array.isArray(receiver);
                    if (isArray && /^[0-9]*$/g.exec(prop)) {
                        fullPath = receiver.__path + "[" + prop + "]";
                        currentPath = "[" + prop + "]";
                    }
                    else {
                        fullPath = receiver.__path ? receiver.__path + '.' + prop : prop;
                        currentPath = prop;
                    }
                    Watcher._register?.register(receiver, currentPath, Watcher._register.version, fullPath);
                }
                if (typeof (element) == 'object') {
                    return this.getProxyObject(target, element, prop);
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                value = replaceByAlias(target, value, prop, receiver);
                let triggerChange = false;
                if (!reservedName[prop]) {
                    if (Array.isArray(target)) {
                        if (prop != "length") {
                            triggerChange = true;
                        }
                    }
                    else {
                        let oldValue = Reflect.get(target, prop, receiver);
                        if (!compareObject(value, oldValue)) {
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
                if (!reservedName[prop]) {
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
                if (internalAliases[pathToDelete]) {
                    internalAliases[pathToDelete].unbind();
                }
                if (target.hasOwnProperty(prop)) {
                    let oldValue = target[prop];
                    if (oldValue instanceof Effect) {
                        oldValue.destroy();
                    }
                    delete target[prop];
                    if (triggerChange) {
                        clearReservedNames(oldValue);
                        trigger('DELETED', target, null, oldValue, prop);
                    }
                    return true;
                }
                return false;
            },
            defineProperty(target, prop, descriptor) {
                let triggerChange = false;
                let newPath = '';
                if (!reservedName[prop]) {
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
            },
            ownKeys(target) {
                let result = Reflect.ownKeys(target);
                for (let i = 0; i < result.length; i++) {
                    if (reservedName[result[i]]) {
                        result.splice(i, 1);
                        i--;
                    }
                }
                return result;
            },
        };
        if (onDataChanged) {
            proxyData.callbacks[''] = [onDataChanged];
        }
        const trigger = (type, target, receiver, value, prop, dones = []) => {
            if (target.__isProxy) {
                return;
            }
            let rootPath;
            if (receiver == null) {
                rootPath = target.__path;
            }
            else {
                rootPath = receiver.__path;
            }
            if (rootPath != "") {
                if (Array.isArray(target)) {
                    if (!prop.startsWith("[")) {
                        if (/^[0-9]*$/g.exec(prop)) {
                            rootPath += "[" + prop + "]";
                        }
                        else {
                            rootPath += "." + prop;
                        }
                    }
                    else {
                        rootPath += prop;
                    }
                }
                else {
                    if (!prop.startsWith("[")) {
                        rootPath += ".";
                    }
                    rootPath += prop;
                }
            }
            else {
                rootPath = prop;
            }
            let stacks = [];
            if (proxyData.useHistory) {
                let allStacks = new Error().stack?.split("\n") ?? [];
                for (let i = allStacks.length - 1; i >= 0; i--) {
                    let current = allStacks[i].trim().replace("at ", "");
                    if (current.startsWith("Object.set") || current.startsWith("Proxy.result")) {
                        break;
                    }
                    stacks.push(current);
                }
            }
            dones.push(proxyData.baseData);
            let aliasesDone = [];
            for (let name in proxyData.callbacks) {
                let pathToSend = rootPath;
                if (name !== "") {
                    let regex = new RegExp("^" + name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + "(\\.|(\\[)|$)");
                    if (!regex.test(rootPath)) {
                        continue;
                    }
                    pathToSend = rootPath.replace(regex, "$2");
                }
                if (name === "" && proxyData.useHistory) {
                    proxyData.history.push({
                        object: JSON.parse(JSON.stringify(proxyData.baseData, jsonReplacer)),
                        trace: stacks.reverse(),
                        action: WatchAction[type],
                        path: pathToSend
                    });
                }
                let cbs = [...proxyData.callbacks[name]];
                for (let cb of cbs) {
                    try {
                        cb(WatchAction[type], pathToSend, value);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                for (let [key, infos] of aliases) {
                    if (!dones.includes(key)) {
                        for (let info of infos) {
                            if (info.name == name) {
                                aliasesDone.push(key);
                                info.fct(type, target, receiver, value, prop, dones);
                            }
                        }
                    }
                }
            }
            for (let [key, infos] of aliases) {
                if (!dones.includes(key) && !aliasesDone.includes(key)) {
                    for (let info of infos) {
                        let regex = new RegExp("^" + info.name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + "(\\.|(\\[)|$)");
                        if (!regex.test(rootPath)) {
                            continue;
                        }
                        let name = rootPath.replace(regex, "$2");
                        info.fct(type, target, receiver, value, name, dones);
                    }
                }
            }
        };
        var realProxy = new Proxy(obj, proxyData);
        proxyData.baseData = obj;
        setProxyPath(realProxy, '');
        return realProxy;
    }
    /**
     * Create a computed variable that will watch any changes
     */
    static computed(fct) {
        const comp = new Computed(fct);
        return comp;
    }
    /**
     * Create an effect variable that will watch any changes
     */
    static effect(fct) {
        const comp = new Effect(fct);
        return comp;
    }
}
Watcher.Namespace=`${moduleName}`;
_.Watcher=Watcher;
const EffectNoRecomputed=class EffectNoRecomputed extends Effect {
    init() {
        this.isInit = true;
        Watcher._registering.push(this);
        this.fct();
        Watcher._registering.splice(Watcher._registering.length - 1, 1);
    }
    run() { }
}
EffectNoRecomputed.Namespace=`${moduleName}`;
_.EffectNoRecomputed=EffectNoRecomputed;
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
const Uri=class Uri {
    static prepare(uri) {
        let params = [];
        let i = 0;
        let regexState = uri.replace(/{.*?}/g, (group, position) => {
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
        regexState = regexState.replace(/\*/g, ".*?").toLowerCase();
        regexState = "^" + regexState + '$';
        return {
            regex: new RegExp(regexState),
            params
        };
    }
    static getParams(from, current) {
        if (typeof from == "string") {
            from = this.prepare(from);
        }
        let matches = from.regex.exec(current);
        if (matches) {
            let slugs = {};
            for (let param of from.params) {
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
    static isActive(from, current) {
        if (typeof from == "string") {
            from = this.prepare(from);
        }
        return from.regex.test(current);
    }
}
Uri.Namespace=`${moduleName}`;
_.Uri=Uri;
const Computed=class Computed extends Effect {
    _value;
    __path = "*";
    get value() {
        if (!this.isInit) {
            this.init();
        }
        Watcher._register?.register(this, "*", Watcher._register.version, "*");
        return this._value;
    }
    autoInit() {
        return false;
    }
    constructor(fct) {
        super(fct);
    }
    init() {
        this.isInit = true;
        this.computedValue();
    }
    computedValue() {
        this._value = this.run();
    }
    onChange(action, changePath, value) {
        if (!this.checkCanChange(action, changePath, value)) {
            return;
        }
        let oldValue = this._value;
        this.computedValue();
        if (oldValue === this._value) {
            return;
        }
        for (let fct of this.__subscribes) {
            fct(action, changePath, value);
        }
    }
}
Computed.Namespace=`${moduleName}`;
_.Computed=Computed;
const ComputedNoRecomputed=class ComputedNoRecomputed extends Computed {
    init() {
        this.isInit = true;
        Watcher._registering.push(this);
        this._value = this.fct();
        Watcher._registering.splice(Watcher._registering.length - 1, 1);
    }
    computedValue() {
        this._value = this.fct();
    }
    run() { }
}
ComputedNoRecomputed.Namespace=`${moduleName}`;
_.ComputedNoRecomputed=ComputedNoRecomputed;
const State=class State {
    /**
     * Activate a custom state inside a specific manager
     * It ll be a generic state with no information inside exept name
     */
    static async activate(stateName, manager) {
        return await manager.setState(stateName);
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
const StateManager=class StateManager {
    subscribers = {};
    static canBeActivate(statePattern, stateName) {
        let stateInfo = Uri.prepare(statePattern);
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
                let res = Uri.prepare(statePattern);
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
                        let slugs = Uri.getParams(this.subscribers[statePattern], this.activeState.name);
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
    assignDefaultState(stateName) {
        return new EmptyState(stateName);
    }
    /**
     * Activate a current state
     */
    async setState(state) {
        let result = await this.changeStateMutex.safeRunLastAsync(async () => {
            let stateToUse;
            if (typeof state == "string") {
                stateToUse = this.assignDefaultState(state);
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
                            let currentSlug = Uri.getParams(subscriber, this.activeState.name);
                            if (currentSlug) {
                                for (let i = 0; i < clone.length; i++) {
                                    let askChange = clone[i];
                                    if (!await askChange(this.activeState, stateToUse, currentSlug)) {
                                        canChange = false;
                                        break;
                                    }
                                }
                            }
                            let slugs = Uri.getParams(subscriber, stateToUse.name);
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
                            let slugs = Uri.getParams(subscriber, stateToUse.name);
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
                        let oldSlug = Uri.getParams(subscriber, oldState.name);
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
                    let slugs = Uri.getParams(this.subscribers[key], stateToUse.name);
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
    /**
     * Check if a state is in the subscribers and active, return true if it is, false otherwise
     */
    isStateActive(statePattern) {
        return Uri.isActive(statePattern, this.activeState?.name ?? '');
    }
    /**
     * Get slugs information for the current state, return null if state isn't active
     */
    getStateSlugs(statePattern) {
        return Uri.getParams(statePattern, this.activeState?.name ?? '');
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
const TemplateInstance=class TemplateInstance {
    context;
    content;
    actions;
    component;
    _components = {};
    firstRenderUniqueCb = {};
    firstRenderCb = [];
    firstChild;
    lastChild;
    computeds = [];
    renderingComputeds = [];
    loopRegisteries = {};
    loops = [];
    ifs = [];
    constructor(component, content, actions, loops, ifs, context) {
        this.component = component;
        this.content = content;
        this.actions = actions;
        this.ifs = ifs;
        this.loops = loops;
        this.context = context ? context : new TemplateContext(component);
        this.firstChild = content.firstElementChild;
        this.lastChild = content.lastElementChild;
        this.selectElements();
        this.transformActionsListening();
    }
    render() {
        this.updateContext();
        this.bindEvents();
        for (let cb of this.firstRenderCb) {
            cb();
        }
        for (let key in this.firstRenderUniqueCb) {
            this.firstRenderUniqueCb[key]();
        }
        this.renderSubTemplate();
    }
    destructor() {
        for (let name in this.loopRegisteries) {
            for (let item of this.loopRegisteries[name].templates) {
                item.destructor();
            }
            for (let item of this.loopRegisteries[name].computeds) {
                item.destroy();
            }
        }
        this.loopRegisteries = {};
        this.context.destructor();
        for (let computed of this.computeds) {
            computed.destroy();
        }
        for (let computed of this.renderingComputeds) {
            computed.destroy();
        }
        this.computeds = [];
        this.removeFromDOM();
    }
    removeFromDOM(avoidTrigger = false) {
        if (avoidTrigger) {
            let node = this.firstChild;
            while (node && node != this.lastChild) {
                let next = node.nextElementSibling;
                node.parentNode?.removeChild(node);
                node = next;
            }
            this.lastChild?.parentNode?.removeChild(this.lastChild);
        }
        else {
            let node = this.firstChild;
            while (node && node != this.lastChild) {
                let next = node.nextElementSibling;
                node.remove();
                node = next;
            }
            this.lastChild?.remove();
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
                    setValueToObject(element.name, this.component, components);
                }
                else if (components[0]) {
                    setValueToObject(element.name, this.component, components[0]);
                }
            }
        }
    }
    updateContext() {
        if (this.actions.contextEdits) {
            for (let contextEdit of this.actions.contextEdits) {
                this.renderContextEdit(contextEdit);
            }
        }
    }
    renderContextEdit(edit) {
        let _class = edit.once ? ComputedNoRecomputed : Computed;
        let computed = new _class(() => {
            return edit.fct(this.context);
        });
        computed.subscribe((action, path, value) => {
            for (let key in computed.value) {
                let newValue = computed.value[key];
                this.context.updateWatch(key, newValue);
            }
        });
        this.computeds.push(computed);
        for (let key in computed.value) {
            this.context.registerWatch(key, computed.value[key]);
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
                let cb = getValueFromObject(event.eventName, el);
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
                this.transformChangeAction(name, this.actions.content[name]);
            }
        }
        if (this.actions.injection) {
            for (let injection of this.actions.injection) {
                this.transformInjectionAction(injection);
            }
        }
        if (this.actions.bindings) {
            for (let binding of this.actions.bindings) {
                this.transformBindigAction(binding);
            }
        }
    }
    transformChangeAction(name, change) {
        const [id, attr] = name.split("°");
        if (!this._components[id])
            return;
        let apply = () => { };
        if (attr == "@HTML") {
            apply = () => {
                let value = this.context.print(computed.value);
                for (const el of this._components[id])
                    el.innerHTML = value;
            };
        }
        else {
            apply = () => {
                let value = this.context.print(computed.value);
                if (value === "false") {
                    for (const el of this._components[id]) {
                        el.removeAttribute(attr);
                    }
                }
                else {
                    for (const el of this._components[id]) {
                        el.setAttribute(attr, value);
                    }
                }
            };
        }
        let _class = change.once ? ComputedNoRecomputed : Computed;
        let computed = new _class(() => {
            return change.fct(this.context);
        });
        let timeout;
        computed.subscribe((action, path, value) => {
            clearTimeout(timeout);
            // add timeout to group change that append on the same frame (for example index update)
            timeout = setTimeout(() => {
                apply();
            });
        });
        this.renderingComputeds.push(computed);
        this.firstRenderUniqueCb[name] = () => {
            apply();
        };
    }
    transformInjectionAction(injection) {
        if (!this._components[injection.id])
            return;
        let _class = injection.once ? ComputedNoRecomputed : Computed;
        let computed = new _class(() => {
            return injection.inject(this.context);
        });
        this.computeds.push(computed);
        computed.subscribe(() => {
            for (const el of this._components[injection.id]) {
                el[injection.injectionName] = computed.value;
            }
        });
        this.firstRenderCb.push(() => {
            for (const el of this._components[injection.id]) {
                el[injection.injectionName] = computed.value;
            }
        });
    }
    transformBindigAction(binding) {
        let isLocalChange = false;
        let _class = binding.once ? ComputedNoRecomputed : Computed;
        let computed = new _class(() => {
            return binding.inject(this.context);
        });
        this.computeds.push(computed);
        computed.subscribe(() => {
            if (isLocalChange)
                return;
            for (const el of this._components[binding.id]) {
                el[binding.injectionName] = computed.value;
            }
        });
        this.firstRenderCb.push(() => {
            for (const el of this._components[binding.id]) {
                el[binding.injectionName] = computed.value;
            }
        });
        if (binding.isCallback) {
            this.firstRenderCb.push(() => {
                for (var el of this._components[binding.id]) {
                    for (let fct of binding.eventNames) {
                        let cb = getValueFromObject(fct, el);
                        cb?.add((value) => {
                            let valueToSet = getValueFromObject(binding.injectionName, el);
                            isLocalChange = true;
                            binding.extract(this.context, valueToSet);
                            isLocalChange = false;
                        });
                    }
                }
            });
        }
        else {
            this.firstRenderCb.push(() => {
                for (var el of this._components[binding.id]) {
                    for (let fct of binding.eventNames) {
                        el.addEventListener(fct, (e) => {
                            let valueToSet = getValueFromObject(binding.injectionName, e.target);
                            isLocalChange = true;
                            binding.extract(this.context, valueToSet);
                            isLocalChange = false;
                        });
                    }
                }
            });
        }
    }
    renderSubTemplate() {
        for (let loop of this.loops) {
            this.renderLoop(loop);
        }
        for (let _if of this.ifs) {
            this.renderIf(_if);
        }
    }
    renderLoop(loop) {
        if (loop.func) {
            this.renderLoopComplex(loop);
        }
        else if (loop.simple) {
            this.renderLoopSimple(loop, loop.simple);
        }
    }
    resetLoop(loop) {
        if (this.loopRegisteries[loop.anchorId]) {
            for (let item of this.loopRegisteries[loop.anchorId].templates) {
                item.destructor();
            }
            for (let item of this.loopRegisteries[loop.anchorId].computeds) {
                item.destroy();
            }
            if (loop.simple && this.loopRegisteries[loop.anchorId].sub) {
                let elements = this.context.getValueFromItem(loop.simple.data.replace(/^this\./, ''));
                if (elements) {
                    elements.unsubscribe(this.loopRegisteries[loop.anchorId].sub);
                }
            }
        }
        this.loopRegisteries[loop.anchorId] = {
            templates: [],
            computeds: [],
        };
    }
    renderLoopComplex(loop) {
        if (!loop.func)
            return;
        let fctsTemp = loop.func.bind(this.component)(this.context);
        let fcts = {
            apply: fctsTemp.apply,
            condition: fctsTemp.condition,
            transform: fctsTemp.transform ?? (() => { })
        };
        this.resetLoop(loop);
        let computedsCondition = [];
        let alreadyRecreated = false;
        const createComputedCondition = () => {
            let compCondition = new Computed(() => {
                return fcts.condition();
            });
            compCondition.value;
            compCondition.subscribe((action, path, value) => {
                if (!alreadyRecreated) {
                    alreadyRecreated = true;
                    this.renderLoopComplex(loop);
                }
            });
            computedsCondition.push(compCondition);
            this.loopRegisteries[loop.anchorId].computeds.push(compCondition);
            return compCondition;
        };
        let result = [];
        let compCondition = createComputedCondition();
        while (compCondition.value) {
            result.push(fcts.apply());
            fcts.transform();
            compCondition = createComputedCondition();
        }
        let anchor = this._components[loop.anchorId][0];
        for (let i = 0; i < result.length; i++) {
            let context = new TemplateContext(this.component, result[i], this.context);
            let content = loop.template.template?.content.cloneNode(true);
            let actions = loop.template.actions;
            let instance = new TemplateInstance(this.component, content, actions, loop.template.loops, loop.template.ifs, context);
            instance.render();
            anchor.parentNode?.insertBefore(instance.content, anchor);
            this.loopRegisteries[loop.anchorId].templates.push(instance);
        }
    }
    renderLoopSimple(loop, simple) {
        this.resetLoop(loop);
        let basePath = simple.data.replace(/^this\./, '');
        let getElements = () => this.context.getValueFromItem(basePath);
        let elements = getElements();
        let indexName = this.context.registerIndex();
        let keys = Object.keys(elements);
        if (elements.__isProxy) {
            let regexArray = new RegExp("^\\[(\\d+?)\\]$");
            let regexObject = new RegExp("^([^\\.]*)$");
            let sub = (action, path, value) => {
                if (path == "") {
                    this.renderLoopSimple(loop, simple);
                    return;
                }
                if (action == WatchAction.UPDATED) {
                    return;
                }
                let index = undefined;
                regexArray.lastIndex = 0;
                regexObject.lastIndex = 0;
                let resultArray = regexArray.exec(path);
                if (resultArray) {
                    index = Number(resultArray[1]);
                }
                else {
                    let resultObject = regexObject.exec(path);
                    if (resultObject) {
                        let oldKey = resultObject[1];
                        if (action == WatchAction.CREATED) {
                            keys = Object.keys(getElements());
                            index = keys.indexOf(oldKey);
                        }
                        else if (action == WatchAction.DELETED) {
                            index = keys.indexOf(oldKey);
                            keys = Object.keys(getElements());
                        }
                    }
                }
                if (index !== undefined) {
                    let registry = this.loopRegisteries[loop.anchorId];
                    if (action == WatchAction.CREATED) {
                        let context = new TemplateContext(this.component, {}, this.context);
                        context.registerLoop(simple.data, index, indexName, simple.index, simple.item);
                        let content = loop.template.template?.content.cloneNode(true);
                        let actions = loop.template.actions;
                        let instance = new TemplateInstance(this.component, content, actions, loop.template.loops, loop.template.ifs, context);
                        instance.render();
                        let anchor;
                        if (index < registry.templates.length) {
                            anchor = registry.templates[index].firstChild;
                        }
                        else {
                            anchor = this._components[loop.anchorId][0];
                        }
                        anchor?.parentNode?.insertBefore(instance.content, anchor);
                        registry.templates.splice(index, 0, instance);
                        for (let i = index + 1; i < registry.templates.length; i++) {
                            registry.templates[i].context.increaseIndex(indexName);
                        }
                    }
                    else if (action == WatchAction.DELETED) {
                        registry.templates[index].destructor();
                        registry.templates.splice(index, 1);
                        for (let i = index; i < registry.templates.length; i++) {
                            registry.templates[i].context.decreaseIndex(indexName);
                        }
                    }
                }
            };
            elements.subscribe(sub);
        }
        let anchor = this._components[loop.anchorId][0];
        for (let i = 0; i < keys.length; i++) {
            let context = new TemplateContext(this.component, {}, this.context);
            context.registerLoop(simple.data, i, indexName, simple.index, simple.item);
            let content = loop.template.template?.content.cloneNode(true);
            let actions = loop.template.actions;
            let instance = new TemplateInstance(this.component, content, actions, loop.template.loops, loop.template.ifs, context);
            instance.render();
            anchor.parentNode?.insertBefore(instance.content, anchor);
            this.loopRegisteries[loop.anchorId].templates.push(instance);
        }
    }
    renderIf(_if) {
        let computeds = [];
        let instances = [];
        let anchor = this._components[_if.anchorId][0];
        let currentActive = -1;
        const calculateActive = () => {
            let newActive = -1;
            for (let i = 0; i < _if.parts.length; i++) {
                if (computeds[i].value) {
                    newActive = i;
                    break;
                }
            }
            if (newActive == currentActive) {
                return;
            }
            if (currentActive != -1) {
                let instance = instances[currentActive];
                let node = instance.firstChild;
                while (node && node != instance.lastChild) {
                    let next = node.nextElementSibling;
                    instance.content.appendChild(node);
                    node = next;
                }
                if (instance.lastChild)
                    instance.content.appendChild(instance.lastChild);
            }
            currentActive = newActive;
            if (instances[currentActive])
                anchor.parentNode?.insertBefore(instances[currentActive].content, anchor);
        };
        for (let i = 0; i < _if.parts.length; i++) {
            const part = _if.parts[i];
            let _class = part.once ? ComputedNoRecomputed : Computed;
            let computed = new _class(() => {
                return part.condition(this.context);
            });
            computeds.push(computed);
            computed.subscribe(() => {
                calculateActive();
            });
            this.computeds.push(computed);
            let context = new TemplateContext(this.component, {}, this.context);
            let content = part.template.template?.content.cloneNode(true);
            let actions = part.template.actions;
            let instance = new TemplateInstance(this.component, content, actions, part.template.loops, part.template.ifs, context);
            instances.push(instance);
            instance.render();
        }
        calculateActive();
    }
}
TemplateInstance.Namespace=`${moduleName}`;
_.TemplateInstance=TemplateInstance;
const Template=class Template {
    static validatePath(path, pathToCheck) {
        if (pathToCheck.startsWith(path)) {
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
    /**
     * Used by the for loop and the if
     * @param template
     */
    setTemplate(template) {
        this.template = document.createElement('template');
        this.template.innerHTML = template;
    }
    template;
    actions = {};
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
                            throw 'this should be impossible';
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
            if (actions.contextEdits) {
                if (!this.actions.contextEdits) {
                    this.actions.contextEdits = [];
                }
                this.actions.contextEdits = [...actions.contextEdits, ...this.actions.contextEdits];
            }
        }
    }
    loops = [];
    addLoop(loop) {
        this.loops.push(loop);
    }
    ifs = [];
    addIf(_if) {
        this.ifs.push(_if);
    }
    createInstance(component) {
        let content = this.template.content.cloneNode(true);
        return new TemplateInstance(component, content, this.actions, this.loops, this.ifs);
    }
}
Template.Namespace=`${moduleName}`;
_.Template=Template;
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
     * The current Tag / empty if abstract class
     */
    static Tag = "";
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
     * The current tag
     */
    get tag() {
        return this.constructor['Tag'];
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
    __watchFunctions = {};
    __watchFunctionsComputed = {};
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
        for (let name in this.__watchFunctionsComputed) {
            this.__watchFunctionsComputed[name].destroy();
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
    __addWatchesFunctions(infos) {
        for (let info of infos) {
            let realName;
            let autoInit;
            if (typeof info == "string") {
                realName = info;
                autoInit = false;
            }
            else {
                realName = info.name;
                autoInit = info.autoInit;
            }
            if (!this.__watchFunctions[realName]) {
                this.__watchFunctions[realName] = { autoInit };
            }
        }
    }
    __registerWatchesActions() {
        if (Object.keys(this.__watchActions).length > 0) {
            if (!this.__watch) {
                let defaultValue = {};
                this.__defaultValuesWatch(defaultValue);
                this.__watch = Watcher.get(defaultValue, (type, path, element) => {
                    let action = this.__watchActionsCb[path.split(".")[0]] || this.__watchActionsCb[path.split("[")[0]];
                    action(type, path, element);
                });
            }
        }
        for (let name in this.__watchFunctions) {
            this.__watchFunctionsComputed[name] = Watcher.computed(this[name].bind(this));
            if (this.__watchFunctions[name].autoInit) {
                this.__watchFunctionsComputed[name].value;
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
            staticInstance.__template = new Template(staticInstance);
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
    __defaultValuesWatch(w) { }
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
    __registerPropToWatcher(name) {
        if (Watcher._register) {
            Watcher._register.register(this.getReceiver(name), name, Watcher._register.version, name);
        }
    }
    getStringAttr(name) {
        return this.getAttribute(name) ?? undefined;
    }
    setStringAttr(name, val) {
        if (val === undefined || val === null) {
            this.removeAttribute(name);
        }
        else {
            this.setAttribute(name, val);
        }
    }
    getStringProp(name) {
        this.__registerPropToWatcher(name);
        return this.getStringAttr(name);
    }
    getNumberAttr(name) {
        return Number(this.getAttribute(name));
    }
    setNumberAttr(name, val) {
        if (val === undefined || val === null) {
            this.removeAttribute(name);
        }
        else {
            this.setAttribute(name, val);
        }
    }
    getNumberProp(name) {
        this.__registerPropToWatcher(name);
        return this.getNumberAttr(name);
    }
    getBoolAttr(name) {
        return this.hasAttribute(name);
    }
    setBoolAttr(name, val) {
        val = this.getBoolean(val);
        if (val) {
            this.setAttribute(name, 'true');
        }
        else {
            this.removeAttribute(name);
        }
    }
    getBoolProp(name) {
        this.__registerPropToWatcher(name);
        return this.getBoolAttr(name);
    }
    getDateAttr(name) {
        if (!this.hasAttribute(name)) {
            return undefined;
        }
        return this.stringToDate(this.getAttribute(name));
    }
    setDateAttr(name, val) {
        let valTxt = this.dateToString(val);
        if (valTxt === null) {
            this.removeAttribute(name);
        }
        else {
            this.setAttribute(name, valTxt);
        }
    }
    getDateProp(name) {
        this.__registerPropToWatcher(name);
        return this.getDateAttr(name);
    }
    getDateTimeAttr(name) {
        if (!this.hasAttribute(name))
            return undefined;
        return this.stringToDateTime(this.getAttribute(name));
    }
    setDateTimeAttr(name, val) {
        let valTxt = this.dateTimeToString(val);
        if (valTxt === null) {
            this.removeAttribute(name);
        }
        else {
            this.setAttribute(name, valTxt);
        }
    }
    getDateTimeProp(name) {
        this.__registerPropToWatcher(name);
        return this.getDateTimeAttr(name);
    }
    __propertyReceivers = {};
    getReceiver(name) {
        if (!this.__propertyReceivers[name]) {
            let that = this;
            let result = {
                __subscribes: [],
                subscribe(fct) {
                    let index = this.__subscribes.indexOf(fct);
                    if (index == -1) {
                        this.__subscribes.push(fct);
                    }
                },
                unsubscribe(fct) {
                    let index = this.__subscribes.indexOf(fct);
                    if (index > -1) {
                        this.__subscribes.splice(index, 1);
                    }
                },
                onChange() {
                    for (let fct of this.__subscribes) {
                        fct(WatchAction.UPDATED, name, that[name]);
                    }
                },
                __path: name
            };
            this.__propertyReceivers[name] = result;
        }
        return this.__propertyReceivers[name];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue || !this.isReady) {
            if (this.__propertyReceivers.hasOwnProperty(name)) {
                this.__propertyReceivers[name].onChange();
            }
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
const TemplateContext=class TemplateContext {
    data = {};
    comp;
    computeds = [];
    watch;
    constructor(component, data = {}, parentContext) {
        this.comp = component;
        this.watch = Watcher.get({});
        let that = this;
        for (let key in data) {
            if (data[key].__isProxy) {
                Object.defineProperty(this.data, key, {
                    get() {
                        return data[key];
                    }
                });
            }
            else {
                this.watch[key] = data[key];
                Object.defineProperty(this.data, key, {
                    get() {
                        return that.watch[key];
                    }
                });
            }
        }
        if (parentContext) {
            const descriptors = Object.getOwnPropertyDescriptors(parentContext.data);
            for (let name in descriptors) {
                Object.defineProperty(this.data, name, {
                    get() {
                        return parentContext.data[name];
                    }
                });
            }
        }
    }
    print(value) {
        return value == null ? "" : value + "";
    }
    registerIndex() {
        let name = "index";
        let i = 0;
        let fullName = name + i;
        while (this.watch[fullName] !== undefined) {
            i++;
            fullName = name + i;
        }
        return fullName;
    }
    registerLoop(dataName, _indexValue, _indexName, indexName, itemName) {
        this.watch[_indexName] = _indexValue;
        let getItems;
        let mustBeRecomputed = /if|switch|\?|\[.+?\]/g.test(dataName);
        let _class = mustBeRecomputed ? Computed : ComputedNoRecomputed;
        if (!dataName.startsWith("this.")) {
            getItems = new _class(() => {
                return getValueFromObject(dataName, this.data);
            });
        }
        else {
            dataName = dataName.replace(/^this\./, '');
            getItems = new _class(() => {
                return getValueFromObject(dataName, this.comp);
            });
        }
        let getIndex = new ComputedNoRecomputed(() => {
            let items = getItems.value;
            if (!items)
                throw 'impossible';
            let keys = Object.keys(items);
            let index = keys[_getIndex.value];
            if (/^[0-9]+$/g.test(index))
                return Number(index);
            return index;
        });
        let getItem = new ComputedNoRecomputed(() => {
            let items = getItems.value;
            if (!items)
                throw 'impossible';
            let keys = Object.keys(items);
            let index = keys[_getIndex.value];
            return items[index];
        });
        let _getIndex = new ComputedNoRecomputed(() => {
            return this.watch[_indexName];
        });
        this.computeds.push(getIndex);
        this.computeds.push(getItem);
        this.computeds.push(_getIndex);
        if (itemName) {
            Object.defineProperty(this.data, itemName, {
                get() {
                    return getItem.value;
                }
            });
        }
        if (indexName) {
            Object.defineProperty(this.data, indexName, {
                get() {
                    return getIndex.value;
                }
            });
        }
    }
    updateIndex(newIndex, _indexName) {
        // let items: any[] | {};
        // if(!dataName.startsWith("this.")) {
        //     let comp = new Computed(() => {
        //         return getValueFromObject(dataName, this.data);
        //     });
        //     fullName = dataName.replace(/^this\./, '');
        //     items = getValueFromObject(fullName, this.comp);
        // if(Array.isArray(items)) {
        //     let regex = new RegExp("^(" + fullName.replace(/\./g, "\\.") + ")\\[(\\d+?)\\]");
        //     for(let computed of computeds) {
        //         for(let cb of computed.callbacks) {
        //             cb.path = cb.path.replace(regex, "$1[" + newIndex + "]");
        //     let oldKey = Object.keys(items)[this.watch[_indexName]]
        //     let newKey = Object.keys(items)[newIndex]
        //     let regex = new RegExp("^(" + fullName.replace(/\./g, "\\.") + "\\.)(" + oldKey + ")($|\\.)");
        //     for (let computed of computeds) {
        //         for (let cb of computed.callbacks) {
        //             cb.path = cb.path.replace(regex, "$1" + newKey + "$3")
        this.watch[_indexName] = newIndex;
    }
    increaseIndex(_indexName) {
        this.updateIndex(this.watch[_indexName] + 1, _indexName);
    }
    decreaseIndex(_indexName) {
        this.updateIndex(this.watch[_indexName] - 1, _indexName);
    }
    destructor() {
        for (let computed of this.computeds) {
            computed.destroy();
        }
        this.computeds = [];
    }
    registerWatch(name, value) {
        let that = this;
        that.watch[name] = value;
        Object.defineProperty(that.data, name, {
            get() {
                return that.watch[name];
            }
        });
    }
    updateWatch(name, value) {
        this.watch[name] = value;
    }
    getValueFromItem(name) {
        let result = getValueFromObject(name, this.data);
        if (result !== undefined) {
            return result;
        }
        result = getValueFromObject(name, this.comp);
        if (result !== undefined) {
            return result;
        }
        return undefined;
    }
    setValueToItem(name, value) {
        setValueToObject(name, this.comp, value);
    }
}
TemplateContext.Namespace=`${moduleName}`;
_.TemplateContext=TemplateContext;
const GenericRam=class GenericRam {
    /**
     * The current namespace
     */
    static get Namespace() { return ""; }
    /**
     * Get the unique type for the data. Define it as the namespace + class name
     */
    static get Fullname() { return this.Namespace + "." + this.name; }
    subscribers = {
        created: [],
        updated: [],
        deleted: [],
    };
    recordsSubscribers = new Map();
    /**
     * List of stored item by index key
     */
    records = new Map();
    getAllInPorgress;
    constructor() {
        if (this.constructor == GenericRam) {
            throw "can't instanciate an abstract class";
        }
    }
    /**
     * Get item id
     */
    getIdWithError(item) {
        let action = new ResultRamWithError();
        let idTemp = item[this.defineIndexKey()];
        if (idTemp !== undefined) {
            action.result = idTemp;
        }
        else {
            action.errors.push(new RamError(RamErrorCode.noId, "no key found for item"));
        }
        return action;
    }
    /**
     * Get item id
     */
    getId(item) {
        let result = this.getIdWithError(item);
        if (result.success) {
            return result.result;
        }
        throw 'no key found for item';
    }
    /**
     * Add function update, onUpdate, offUpdate, delete, onDelete, offDelete
     */
    addRamAction(Base) {
        let that = this;
        return class ActionClass extends Base {
            static get className() {
                return Base.className || Base.name;
            }
            get className() {
                return Base.className || Base.name;
            }
            async update(newData = {}) {
                let id = that.getId(this);
                let oldData = that.records.get(id);
                if (oldData) {
                    that.mergeObject(oldData, newData);
                    let result = await that.update(oldData);
                    return result;
                }
                return undefined;
            }
            onUpdate(callback) {
                let id = that.getId(this);
                if (!that.recordsSubscribers.has(id)) {
                    that.recordsSubscribers.set(id, {
                        created: [],
                        updated: [],
                        deleted: []
                    });
                }
                let sub = that.recordsSubscribers.get(id);
                if (sub && !sub.updated.includes(callback)) {
                    sub.updated.push(callback);
                }
            }
            offUpdate(callback) {
                let id = that.getId(this);
                let sub = that.recordsSubscribers.get(id);
                if (sub) {
                    let index = sub.updated.indexOf(callback);
                    if (index != -1) {
                        sub.updated.splice(index, 1);
                    }
                }
            }
            async delete() {
                let id = that.getId(this);
                await that.deleteById(id);
            }
            onDelete(callback) {
                let id = that.getId(this);
                if (!that.recordsSubscribers.has(id)) {
                    that.recordsSubscribers.set(id, {
                        created: [],
                        updated: [],
                        deleted: []
                    });
                }
                let sub = that.recordsSubscribers.get(id);
                if (sub && !sub.deleted.includes(callback)) {
                    sub.deleted.push(callback);
                }
            }
            offDelete(callback) {
                let id = that.getId(this);
                let sub = that.recordsSubscribers.get(id);
                if (sub) {
                    let index = sub.deleted.indexOf(callback);
                    if (index != -1) {
                        sub.deleted.splice(index, 1);
                    }
                }
            }
        };
    }
    /**
     * Transform the object into the object stored inside Ram
     */
    getObjectForRam(objJson) {
        let T = this.addRamAction(this.getTypeForData(objJson));
        let item = new T();
        this.mergeObject(item, objJson);
        return item;
    }
    /**
     * Add element inside Ram or update it. The instance inside the ram is unique and ll never be replaced
     */
    addOrUpdateData(item, result) {
        try {
            let idWithError = this.getIdWithError(item);
            if (idWithError.success && idWithError.result !== undefined) {
                let id = idWithError.result;
                if (this.records.has(id)) {
                    this.mergeObject(this.records.get(id), item);
                }
                else {
                    let realObject = this.getObjectForRam(item);
                    this.records.set(id, realObject);
                }
                result.result = this.records.get(id);
            }
            else {
                result.errors = [...result.errors, ...idWithError.errors];
            }
        }
        catch (e) {
            result.errors.push(new RamError(RamErrorCode.unknow, e));
        }
    }
    /**
     * Merge object and create real instance of class
     */
    mergeObject(item, objJson) {
        if (!item) {
            return;
        }
        Json.classfromJson(item, objJson);
    }
    publish(type, data) {
        [...this.subscribers[type]].forEach(callback => callback(data));
        let sub = this.recordsSubscribers.get(this.getId(data));
        if (sub) {
            [...sub[type]].forEach(callback => callback(data));
        }
    }
    subscribe(type, cb) {
        if (!this.subscribers[type].includes(cb)) {
            this.subscribers[type].push(cb);
        }
    }
    unsubscribe(type, cb) {
        let index = this.subscribers[type].indexOf(cb);
        if (index != -1) {
            this.subscribers[type].splice(index, 1);
        }
    }
    /**
    * Add a callback that ll be triggered when a new item is stored
    */
    onCreated(cb) {
        this.subscribe('created', cb);
    }
    /**
     * Remove a created callback
     */
    offCreated(cb) {
        this.unsubscribe('created', cb);
    }
    /**
     * Add a callback that ll be triggered when an item is updated
     */
    onUpdated(cb) {
        this.subscribe('updated', cb);
    }
    /**
     * Remove an updated callback
     */
    offUpdated(cb) {
        this.unsubscribe('updated', cb);
    }
    /**
     * Add a callback that ll be triggered when an item is deleted
     */
    onDeleted(cb) {
        this.subscribe('deleted', cb);
    }
    /**
     * Remove an deleted callback
     */
    offDeleted(cb) {
        this.unsubscribe('deleted', cb);
    }
    /**
     * Get an item by id if exist (alias for getById)
     */
    async get(id) {
        return await this.getById(id);
    }
    ;
    /**
     * Get an item by id if exist (alias for getById)
     */
    async getWithError(id) {
        return await this.getByIdWithError(id);
    }
    ;
    /**
     * Get an item by id if exist
     */
    async getById(id) {
        let action = await this.getByIdWithError(id);
        if (action.success) {
            return action.result;
        }
        return undefined;
    }
    /**
     * Get an item by id if exist
     */
    async getByIdWithError(id) {
        let action = new ResultRamWithError();
        await this.beforeGetById(id, action);
        if (action.success) {
            if (this.records.has(id)) {
                action.result = this.records.get(id);
                await this.afterGetById(action);
            }
            else {
                action.errors.push(new RamError(RamErrorCode.noItemInsideRam, "can't find the item " + id + " inside ram"));
            }
        }
        return action;
    }
    /**
     * Trigger before getting an item by id
     */
    async beforeGetById(id, result) { }
    ;
    /**
     * Trigger after getting an item by id
     */
    async afterGetById(result) { }
    ;
    /**
     * Get multiple items by ids
     */
    async getByIds(ids) {
        let result = await this.getByIdsWithError(ids);
        if (result.success) {
            return result.result ?? [];
        }
        return [];
    }
    ;
    /**
     * Get multiple items by ids
     */
    async getByIdsWithError(ids) {
        let action = new ResultRamWithError();
        action.result = [];
        await this.beforeGetByIds(ids, action);
        if (action.success) {
            for (let id of ids) {
                let rec = this.records.get(id);
                if (rec) {
                    action.result.push(rec);
                }
                else {
                    action.errors.push(new RamError(RamErrorCode.noItemInsideRam, "can't find the item " + id + " inside ram"));
                }
            }
            if (action.success) {
                await this.afterGetByIds(action);
            }
        }
        return action;
    }
    ;
    /**
     * Trigger before getting a list of items by id
     */
    async beforeGetByIds(ids, result) { }
    ;
    /**
     * Trigger after getting a list of items by id
     */
    async afterGetByIds(result) { }
    ;
    /**
     * Get all elements inside the Ram
     */
    async getAll() {
        let result = await this.getAllWithError();
        if (result.success) {
            return result.result ?? new Map();
        }
        return new Map();
    }
    ;
    /**
     * Get all elements inside the Ram
     */
    async getAllWithError() {
        let action = new ResultRamWithError();
        if (!this.getAllInPorgress) {
            this.getAllInPorgress = [];
            action.result = new Map();
            await this.beforeGetAll(action);
            if (action.success) {
                action.result = this.records;
                await this.afterGetAll(action);
            }
            for (let cb of this.getAllInPorgress) {
                cb(action);
            }
            this.getAllInPorgress = undefined;
        }
        else {
            action = await this.getAllWaiting();
        }
        return action;
    }
    ;
    getAllWaiting() {
        return new Promise((resolve, reject) => {
            if (this.getAllInPorgress) {
                this.getAllInPorgress.push((action) => {
                    let actionTemp = new ResultRamWithError();
                    actionTemp.result = action.result;
                    actionTemp.errors = action.errors;
                    resolve(action);
                });
            }
        });
    }
    /**
     * Trigger before getting all items inside Ram
     */
    async beforeGetAll(result) { }
    ;
    /**
     * Trigger after getting all items inside Ram
     */
    async afterGetAll(result) { }
    ;
    /**
     * Get all elements inside the Ram
     */
    async getList() {
        let data = await this.getAll();
        return Array.from(data.values());
    }
    ;
    /**
     * Get all elements inside the Ram
     */
    async getListWithError() {
        let action = new ResultRamWithError();
        action.result = [];
        let result = await this.getAllWithError();
        if (result.success) {
            if (result.result) {
                action.result = Object.values(result.result);
            }
            else {
                action.result = [];
            }
        }
        else {
            action.errors = result.errors;
        }
        return action;
    }
    /**
     * Create a list of items inside ram
     */
    async createList(list) {
        let result = await this.createListWithError(list);
        return result.result ?? [];
    }
    /**
     * Create a list of items inside ram
     */
    async createListWithError(list) {
        let action = new ResultRamWithError();
        action.result = [];
        await this.beforeCreateList(list, action);
        if (action.success) {
            if (action.result.length > 0) {
                list = action.result;
            }
            for (let item of list) {
                let resultItem = await this._create(item, true);
                if (resultItem.success && resultItem.result) {
                    action.result.push(resultItem.result);
                }
                else {
                    action.errors = [...action.errors, ...resultItem.errors];
                }
            }
            if (action.success) {
                await this.afterCreateList(action);
            }
        }
        return action;
    }
    /**
     * Create an item inside ram
     */
    async create(item, ...args) {
        let action = await this.createWithError(item, args);
        if (action.success) {
            return action.result;
        }
        return undefined;
    }
    /**
     * Create an item inside ram
     */
    async createWithError(item, ...args) {
        return await this._create(item, false);
    }
    async _create(item, fromList) {
        let action = new ResultRamWithError();
        await this.beforeCreateItem(item, fromList, action);
        if (action.success) {
            if (action.result) {
                item = action.result;
            }
            let resultTemp = this.getIdWithError(item);
            if (resultTemp.success) {
                this.addOrUpdateData(item, action);
                if (!action.success) {
                    return action;
                }
                await this.afterCreateItem(action, fromList);
                if (!action.success) {
                    action.result = undefined;
                }
                else if (action.result) {
                    this.publish('created', action.result);
                }
            }
            else {
                action.errors = resultTemp.errors;
            }
        }
        return action;
    }
    /**
     * Trigger before creating a list of items
     */
    async beforeCreateList(list, result) {
    }
    ;
    /**
     * Trigger before creating an item
     */
    async beforeCreateItem(item, fromList, result) {
    }
    ;
    /**
     * Trigger after creating an item
     */
    async afterCreateItem(result, fromList) {
    }
    ;
    /**
     * Trigger after creating a list of items
     */
    async afterCreateList(result) {
    }
    ;
    /**
     * Update a list of items inside ram
     */
    async updateList(list) {
        let result = await this.updateListWithError(list);
        return result.result ?? [];
    }
    ;
    /**
     * Update a list of items inside ram
     */
    async updateListWithError(list) {
        let action = new ResultRamWithError();
        action.result = [];
        await this.beforeUpdateList(list, action);
        if (action.success) {
            if (action.result.length > 0) {
                list = action.result;
            }
            for (let item of list) {
                let resultItem = await this._update(item, true);
                if (resultItem.success && resultItem.result) {
                    action.result.push(resultItem.result);
                }
                else {
                    action.errors = [...action.errors, ...resultItem.errors];
                }
            }
            if (action.success) {
                await this.afterUpdateList(action);
            }
        }
        return action;
    }
    ;
    /**
     * Update an item inside ram
     */
    async update(item, ...args) {
        let action = await this.updateWithError(item, args);
        if (action.success) {
            return action.result;
        }
        return undefined;
    }
    /**
     * Update an item inside ram
     */
    async updateWithError(item, ...args) {
        return await this._update(item, false);
    }
    async _update(item, fromList) {
        let action = new ResultRamWithError();
        let resultTemp = await this.getIdWithError(item);
        if (resultTemp.success && resultTemp.result !== undefined) {
            let key = resultTemp.result;
            if (this.records.has(key)) {
                await this.beforeUpdateItem(item, fromList, action);
                if (!action.success) {
                    return action;
                }
                if (action.result) {
                    item = action.result;
                }
                this.addOrUpdateData(item, action);
                if (!action.success) {
                    return action;
                }
                await this.afterUpdateItem(action, fromList);
                if (!action.success) {
                    action.result = undefined;
                }
                else if (action.result) {
                    this.publish('updated', action.result);
                }
            }
            else {
                action.errors.push(new RamError(RamErrorCode.noItemInsideRam, "can't update the item " + key + " because it wasn't found inside ram"));
            }
        }
        else {
            action.errors = resultTemp.errors;
        }
        return action;
    }
    ;
    /**
     * Trigger before updating a list of items
     */
    async beforeUpdateList(list, result) {
    }
    ;
    /**
    * Trigger before updating an item
    */
    async beforeUpdateItem(item, fromList, result) {
    }
    ;
    /**
     * Trigger after updating an item
     */
    async afterUpdateItem(result, fromList) {
    }
    ;
    /**
     * Trigger after updating a list of items
     */
    async afterUpdateList(result) {
    }
    ;
    /**
     * Delete a list of items inside ram
     */
    async deleteList(list) {
        let result = await this.deleteListWithError(list);
        return result.result ?? [];
    }
    ;
    /**
     * Delete a list of items inside ram
     */
    async deleteListWithError(list) {
        let action = new ResultRamWithError();
        action.result = [];
        let deleteResult = new VoidWithError();
        await this.beforeDeleteList(list, deleteResult);
        if (!deleteResult.success) {
            action.errors = deleteResult.errors;
        }
        for (let item of list) {
            let resultItem = await this._delete(item, true);
            if (resultItem.success && resultItem.result) {
                action.result.push(resultItem.result);
            }
            else {
                action.errors = [...action.errors, ...resultItem.errors];
            }
        }
        if (action.success) {
            await this.afterDeleteList(action);
        }
        return action;
    }
    ;
    /**
     * Delete an item inside ram
     */
    async delete(item, ...args) {
        let action = await this.deleteWithError(item, args);
        if (action.success) {
            return action.result;
        }
        return undefined;
    }
    ;
    /**
    * Delete an item inside ram
    */
    async deleteWithError(item, ...args) {
        return await this._delete(item, false);
    }
    ;
    /**
     * Delete an item by id inside ram
     */
    async deleteById(id) {
        let action = await this.deleteByIdWithError(id);
        if (action.success) {
            return action.result;
        }
        return undefined;
    }
    /**
    * Delete an item by id inside ram
    */
    async deleteByIdWithError(id) {
        let item = this.records.get(id);
        if (item) {
            return await this._delete(item, false);
        }
        let result = new ResultRamWithError();
        result.errors.push(new RamError(RamErrorCode.noItemInsideRam, "can't update the item " + id + " because it wasn't found inside ram"));
        return result;
    }
    async _delete(item, fromList) {
        let action = new ResultRamWithError();
        let resultTemp = await this.getIdWithError(item);
        if (resultTemp.success && resultTemp.result) {
            let key = resultTemp.result;
            let oldItem = this.records.get(key);
            if (oldItem) {
                let deleteResult = new VoidWithError();
                await this.beforeDeleteItem(oldItem, fromList, deleteResult);
                if (!deleteResult.success) {
                    action.errors = deleteResult.errors;
                    return action;
                }
                this.records.delete(key);
                action.result = oldItem;
                await this.afterDeleteItem(action, fromList);
                if (!action.success) {
                    action.result = undefined;
                }
                else {
                    this.publish('deleted', action.result);
                }
                this.recordsSubscribers.delete(key);
            }
            else {
                action.errors.push(new RamError(RamErrorCode.noItemInsideRam, "can't delete the item " + key + " because it wasn't found inside ram"));
            }
        }
        else {
            action.errors = resultTemp.errors;
        }
        return action;
    }
    /**
     * Trigger before deleting a list of items
     */
    async beforeDeleteList(list, result) { }
    ;
    /**
     * Trigger before deleting an item
     */
    async beforeDeleteItem(item, fromList, result) { }
    ;
    /**
     * Trigger after deleting an item
     */
    async afterDeleteItem(result, fromList) { }
    ;
    /**
     * Trigger after deleting a list of items
     */
    async afterDeleteList(result) { }
}
GenericRam.Namespace=`${moduleName}`;
_.GenericRam=GenericRam;
const Ram=class Ram extends GenericRam {
}
Ram.Namespace=`${moduleName}`;
_.Ram=Ram;

for(let key in _) { Aventus[key] = _[key] }
})(Aventus);

var AventusSharp;
(AventusSharp||(AventusSharp = {}));
(function (AventusSharp) {
const moduleName = `AventusSharp`;
const _ = {};

const Data = {};
_.Data = {};
const Routes = {};
_.Routes = {};
const WebSocket = {};
_.WebSocket = {};
const RAM = {};
_.RAM = {};
const Tools = {};
_.Tools = {};
let _n;
(function (DataErrorCode) {
    DataErrorCode[DataErrorCode["DefaultDMGenericType"] = 0] = "DefaultDMGenericType";
    DataErrorCode[DataErrorCode["DMOnlyForceInherit"] = 1] = "DMOnlyForceInherit";
    DataErrorCode[DataErrorCode["TypeNotStorable"] = 2] = "TypeNotStorable";
    DataErrorCode[DataErrorCode["TypeTooMuchStorable"] = 3] = "TypeTooMuchStorable";
    DataErrorCode[DataErrorCode["GenericNotAbstract"] = 4] = "GenericNotAbstract";
    DataErrorCode[DataErrorCode["ParentNotAbstract"] = 5] = "ParentNotAbstract";
    DataErrorCode[DataErrorCode["InfiniteLoop"] = 6] = "InfiniteLoop";
    DataErrorCode[DataErrorCode["InterfaceNotUnique"] = 7] = "InterfaceNotUnique";
    DataErrorCode[DataErrorCode["SelfReferecingDependance"] = 8] = "SelfReferecingDependance";
    DataErrorCode[DataErrorCode["DMNotExist"] = 9] = "DMNotExist";
    DataErrorCode[DataErrorCode["DMAlreadyExist"] = 10] = "DMAlreadyExist";
    DataErrorCode[DataErrorCode["MethodNotFound"] = 11] = "MethodNotFound";
    DataErrorCode[DataErrorCode["StorageDisconnected"] = 12] = "StorageDisconnected";
    DataErrorCode[DataErrorCode["StorageNotFound"] = 13] = "StorageNotFound";
    DataErrorCode[DataErrorCode["NoConnectionInsideStorage"] = 14] = "NoConnectionInsideStorage";
    DataErrorCode[DataErrorCode["TypeNotExistInsideStorage"] = 15] = "TypeNotExistInsideStorage";
    DataErrorCode[DataErrorCode["UnknowError"] = 16] = "UnknowError";
    DataErrorCode[DataErrorCode["NoItemProvided"] = 17] = "NoItemProvided";
    DataErrorCode[DataErrorCode["NoTransactionInProgress"] = 18] = "NoTransactionInProgress";
    DataErrorCode[DataErrorCode["WrongType"] = 19] = "WrongType";
    DataErrorCode[DataErrorCode["NoTypeIdentifierFoundInsideQuery"] = 20] = "NoTypeIdentifierFoundInsideQuery";
    DataErrorCode[DataErrorCode["ItemNoExistInsideStorage"] = 21] = "ItemNoExistInsideStorage";
    DataErrorCode[DataErrorCode["ItemAlreadyExist"] = 22] = "ItemAlreadyExist";
    DataErrorCode[DataErrorCode["ValidationError"] = 23] = "ValidationError";
    DataErrorCode[DataErrorCode["GetAllNotAllowed"] = 24] = "GetAllNotAllowed";
    DataErrorCode[DataErrorCode["GetByIdNotAllowed"] = 25] = "GetByIdNotAllowed";
    DataErrorCode[DataErrorCode["GetByIdsNotAllowed"] = 26] = "GetByIdsNotAllowed";
    DataErrorCode[DataErrorCode["WhereNotAllowed"] = 27] = "WhereNotAllowed";
    DataErrorCode[DataErrorCode["CreateNotAllowed"] = 28] = "CreateNotAllowed";
    DataErrorCode[DataErrorCode["UpdateNotAllowed"] = 29] = "UpdateNotAllowed";
    DataErrorCode[DataErrorCode["DeleteNotAllowed"] = 30] = "DeleteNotAllowed";
    DataErrorCode[DataErrorCode["NumberOfItemsNotMatching"] = 31] = "NumberOfItemsNotMatching";
    DataErrorCode[DataErrorCode["FieldTypeNotFound"] = 32] = "FieldTypeNotFound";
    DataErrorCode[DataErrorCode["MemberNotFound"] = 33] = "MemberNotFound";
    DataErrorCode[DataErrorCode["TooMuchMemberFound"] = 34] = "TooMuchMemberFound";
    DataErrorCode[DataErrorCode["TypeNotFound"] = 35] = "TypeNotFound";
    DataErrorCode[DataErrorCode["ReverseLinkNotExist"] = 36] = "ReverseLinkNotExist";
    DataErrorCode[DataErrorCode["ErrorCreatingReverseQuery"] = 37] = "ErrorCreatingReverseQuery";
})(Data.DataErrorCode || (Data.DataErrorCode = {}));

_.Data.DataErrorCode=Data.DataErrorCode;
Data.DataError=class DataError extends Aventus.GenericError {
    static get Fullname() { return "AventusSharp.Data.DataError, AventusSharp"; }
}
Data.DataError.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.DataError.Fullname, Data.DataError);
_.Data.DataError=Data.DataError;
(function (RouteErrorCode) {
    RouteErrorCode[RouteErrorCode["UnknowError"] = 0] = "UnknowError";
    RouteErrorCode[RouteErrorCode["FormContentTypeUnknown"] = 1] = "FormContentTypeUnknown";
    RouteErrorCode[RouteErrorCode["CantGetValueFromBody"] = 2] = "CantGetValueFromBody";
})(Routes.RouteErrorCode || (Routes.RouteErrorCode = {}));

_.Routes.RouteErrorCode=Routes.RouteErrorCode;
Routes.RouteError=class RouteError extends Aventus.GenericError {
    static get Fullname() { return "AventusSharp.Routes.RouteError, AventusSharp"; }
}
Routes.RouteError.Namespace=`${moduleName}.Routes`;Aventus.Converter.register(Routes.RouteError.Fullname, Routes.RouteError);
_.Routes.RouteError=Routes.RouteError;
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
WebSocket.Route=class Route {
    endpoint;
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
}
WebSocket.Route.Namespace=`${moduleName}.WebSocket`;
_.WebSocket.Route=WebSocket.Route;
(function (SocketErrorCode) {
    SocketErrorCode[SocketErrorCode["socketClosed"] = 0] = "socketClosed";
    SocketErrorCode[SocketErrorCode["timeout"] = 1] = "timeout";
    SocketErrorCode[SocketErrorCode["differentChannel"] = 2] = "differentChannel";
    SocketErrorCode[SocketErrorCode["unknow"] = 3] = "unknow";
})(WebSocket.SocketErrorCode || (WebSocket.SocketErrorCode = {}));

_.WebSocket.SocketErrorCode=WebSocket.SocketErrorCode;
WebSocket.SocketError=class SocketError extends Aventus.GenericError {
}
WebSocket.SocketError.Namespace=`${moduleName}.WebSocket`;
_.WebSocket.SocketError=WebSocket.SocketError;
(function (WsErrorCode) {
    WsErrorCode[WsErrorCode["UnknowError"] = 0] = "UnknowError";
    WsErrorCode[WsErrorCode["CantDefineAssembly"] = 1] = "CantDefineAssembly";
    WsErrorCode[WsErrorCode["ConfigError"] = 2] = "ConfigError";
    WsErrorCode[WsErrorCode["MultipleMainEndpoint"] = 3] = "MultipleMainEndpoint";
    WsErrorCode[WsErrorCode["CantGetValueFromBody"] = 4] = "CantGetValueFromBody";
    WsErrorCode[WsErrorCode["NoConnection"] = 5] = "NoConnection";
})(WebSocket.WsErrorCode || (WebSocket.WsErrorCode = {}));

_.WebSocket.WsErrorCode=WebSocket.WsErrorCode;
WebSocket.WsError=class WsError extends Aventus.GenericError {
    static get Fullname() { return "AventusSharp.WebSocket.WsError, AventusSharp"; }
}
WebSocket.WsError.Namespace=`${moduleName}.WebSocket`;Aventus.Converter.register(WebSocket.WsError.Fullname, WebSocket.WsError);
_.WebSocket.WsError=WebSocket.WsError;
Data.Storable=class Storable extends Aventus.Data {
    id = 0;
    createdDate = new Date();
    updatedDate = new Date();
    /**
     * @inerhit
     */
    toJSON() {
        let toAvoid = ['className', 'namespace'];
        return Aventus.Json.classToJson(this, {
            isValidKey: (key) => !toAvoid.includes(key),
            beforeEnd: (result) => {
                let resultTemp = {};
                if (result.$type) {
                    resultTemp.$type = result.$type;
                    for (let key in result) {
                        if (key != '$type') {
                            resultTemp[key] = result[key];
                        }
                    }
                    return resultTemp;
                }
                return result;
            }
        });
    }
}
Data.Storable.$schema={"id":"number","createdDate":"Date","updatedDate":"Date"};Aventus.DataManager.register(Data.Storable.Fullname, Data.Storable);Data.Storable.Namespace=`${moduleName}.Data`;
_.Data.Storable=Data.Storable;
RAM.RamHttp=class RamHttp extends Aventus.Ram {
    getAllDone = false;
    routes;
    getAllProms = [];
    isLoading = false;
    async wait() {
        return new Promise((resolve) => {
            this.getAllProms.push(() => {
                resolve();
            });
        });
    }
    constructor() {
        super();
        this.routes = this.defineRoutes();
    }
    async beforeGetAll(result) {
        if (!this.getAllDone) {
            if (this.isLoading) {
                await this.wait();
            }
            else {
                this.isLoading = true;
                let response = await this.routes.GetAll();
                if (response.success && response.result) {
                    for (let item of response.result) {
                        let resultTemp = new Aventus.ResultRamWithError();
                        this.addOrUpdateData(item, resultTemp);
                        if (!resultTemp.success) {
                            result.errors = [...result.errors, ...resultTemp.errors];
                        }
                    }
                    this.getAllDone = true;
                }
                else {
                    result.errors = [...result.errors, ...response.errors];
                }
                this.isLoading = false;
                for (let cb of this.getAllProms) {
                    cb();
                }
            }
        }
    }
    async beforeGetById(id, result) {
        if (this.records.has(id)) {
            return;
        }
        else {
            let response = await this.routes.GetById(id);
            if (response.success && response.result) {
                let resultTemp = new Aventus.ResultRamWithError();
                this.addOrUpdateData(response.result, resultTemp);
                if (!resultTemp.success) {
                    result.errors = [...result.errors, ...resultTemp.errors];
                }
            }
            else {
                result.errors = [...result.errors, ...response.errors];
            }
        }
    }
    async beforeGetByIds(ids, result) {
        let missingIds = [];
        for (let id of ids) {
            if (!this.records.has(id)) {
                missingIds.push(id);
            }
        }
        if (missingIds.length > 0) {
            for (let id of missingIds) {
                let resultTemp = new Aventus.ResultRamWithError();
                await this.beforeGetById(id, resultTemp);
                if (!resultTemp.success) {
                    result.errors = [...result.errors, ...resultTemp.errors];
                }
            }
        }
    }
    async beforeCreateItem(item, fromList, result) {
        if (fromList) {
            return;
        }
        let response = await this.routes.Create({ item });
        if (response.success && response.result) {
            result.result = this.getObjectForRam(response.result);
        }
        else {
            result.errors = [...result.errors, ...response.errors];
        }
    }
    async beforeCreateList(list, result) {
        let response = await this.routes.CreateMany({ list });
        if (response.success && response.result) {
            result.result = [];
            for (let element of response.result) {
                result.result.push(this.getObjectForRam(element));
            }
        }
        else {
            result.errors = [...result.errors, ...response.errors];
        }
    }
    async beforeUpdateItem(item, fromList, result) {
        if (fromList) {
            return;
        }
        let response = await this.routes.Update(item.id, { item });
        if (response.success && response.result) {
            result.result = this.getObjectForRam(response.result);
        }
        else {
            result.errors = [...result.errors, ...response.errors];
        }
    }
    async beforeUpdateList(list, result) {
        let response = await this.routes.UpdateMany({ list });
        if (response.success && response.result) {
            result.result = [];
            for (let element of response.result) {
                result.result.push(this.getObjectForRam(element));
            }
        }
        else {
            result.errors = [...result.errors, ...response.errors];
        }
    }
    async beforeDeleteItem(item, fromList, result) {
        if (fromList) {
            return;
        }
        let response = await this.routes.Delete(item.id);
        if (!response.success) {
            result.errors = [...result.errors, ...response.errors];
        }
    }
    async beforeDeleteList(list, result) {
        let response = await this.routes.DeleteMany({ ids: list.map(t => t.id) });
        if (!response.success) {
            result.errors = [...result.errors, ...response.errors];
        }
    }
}
RAM.RamHttp.Namespace=`${moduleName}.RAM`;
_.RAM.RamHttp=RAM.RamHttp;
Tools.VoidWithError=class VoidWithError extends Aventus.VoidWithError {
    static get Fullname() { return "AventusSharp.Tools.VoidWithError, AventusSharp"; }
}
Tools.VoidWithError.Namespace=`${moduleName}.Tools`;Aventus.Converter.register(Tools.VoidWithError.Fullname, Tools.VoidWithError);
_.Tools.VoidWithError=Tools.VoidWithError;
WebSocket.VoidWithWsError=class VoidWithWsError extends Tools.VoidWithError {
    static get Fullname() { return "AventusSharp.WebSocket.VoidWithWsError, AventusSharp"; }
}
WebSocket.VoidWithWsError.Namespace=`${moduleName}.WebSocket`;Aventus.Converter.register(WebSocket.VoidWithWsError.Fullname, WebSocket.VoidWithWsError);
_.WebSocket.VoidWithWsError=WebSocket.VoidWithWsError;
Routes.VoidWithRouteError=class VoidWithRouteError extends Tools.VoidWithError {
    static get Fullname() { return "AventusSharp.Routes.VoidWithRouteError, AventusSharp"; }
}
Routes.VoidWithRouteError.Namespace=`${moduleName}.Routes`;Aventus.Converter.register(Routes.VoidWithRouteError.Fullname, Routes.VoidWithRouteError);
_.Routes.VoidWithRouteError=Routes.VoidWithRouteError;
Data.VoidWithDataError=class VoidWithDataError extends Tools.VoidWithError {
    static get Fullname() { return "AventusSharp.Data.VoidWithDataError, AventusSharp"; }
}
Data.VoidWithDataError.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.VoidWithDataError.Fullname, Data.VoidWithDataError);
_.Data.VoidWithDataError=Data.VoidWithDataError;
WebSocket.Connection=class Connection {
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
        for (let info of this.options.routes[newRoute.channel]) {
            if (info.callback == newRoute.callback) {
                return;
            }
        }
        const { params, regex } = Aventus.Uri.prepare(newRoute.channel);
        let prepared = {
            callback: newRoute.callback,
            channel: newRoute.channel,
            regex,
            params
        };
        this.options.routes[newRoute.channel].push(prepared);
    }
    /**
     * The route to remove
     * @param route - The route to remove
     */
    removeRoute(route) {
        for (let i = 0; i < this.options.routes[route.channel].length; i++) {
            let info = this.options.routes[route.channel][i];
            if (info.callback == route.callback) {
                this.options.routes[route.channel].splice(i, 1);
                i--;
            }
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
                let url = protocol + "://" + this.options.host + ":" + this.options.port + this.options.socketName;
                this.log(url);
                this.openCallback = (isOpen) => {
                    resolve(isOpen);
                };
                this.socket = new window.WebSocket(url);
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
    sendMessage(options) {
        let result = new Tools.VoidWithError();
        if (this.socket && this.socket.readyState == 1) {
            try {
                let message = {
                    channel: options.channel,
                };
                if (options.uid) {
                    message.uid = options.uid;
                }
                if (options.body) {
                    message.data = options.body;
                    this.log(message);
                    if (typeof options.body != 'string') {
                        message.data = JSON.stringify(options.body, this.jsonReplacer);
                    }
                }
                else {
                    this.log(message);
                }
                this.socket.send(JSON.stringify(message));
            }
            catch (e) {
                result.errors.push(new WebSocket.SocketError(WebSocket.SocketErrorCode.unknow, e));
            }
        }
        else {
            result.errors.push(new WebSocket.SocketError(WebSocket.SocketErrorCode.socketClosed, "Socket not ready ! Please ensure that it is open and ready to send message"));
            this.log('Socket not ready ! Please ensure that it is open and ready to send message');
            if (this.options.allowSendBeforeOpen) {
                this.memoryBeforeOpen.push(options);
            }
        }
        return result;
    }
    /**
     * Send a message though the websocket and wait one answer give in parameters callbacks
     * @param channelName The channel on which the message is sent
     * @param body The data to send
     * @param timeout The timeout before the request failed
     */
    sendMessageAndWait(options) {
        return new Promise((resolve) => {
            let result = new Aventus.ResultWithError();
            try {
                let _uid = options.uid ? options.uid : Aventus.uuidv4();
                options.uid = _uid;
                let timeoutInfo;
                this.waitingList[_uid] = (channel, data) => {
                    clearTimeout(timeoutInfo);
                    if (channel.toLowerCase() != options.channel.toLowerCase()) {
                        result.errors.push(new WebSocket.SocketError(WebSocket.SocketErrorCode.differentChannel, `We sent a message on ${options.channel} but we receive on ${channel}`));
                        resolve(result);
                    }
                    else {
                        if (data instanceof Aventus.VoidWithError) {
                            for (let error of data.errors) {
                                result.errors.push(error);
                            }
                            if (data instanceof Aventus.ResultWithError) {
                                result.result = data.result;
                            }
                        }
                        else {
                            result.result = data;
                        }
                        resolve(result);
                    }
                };
                if (options.timeout !== undefined) {
                    timeoutInfo = setTimeout(() => {
                        delete this.waitingList[_uid];
                        result.errors.push(new WebSocket.SocketError(WebSocket.SocketErrorCode.timeout, "No message received after " + options.timeout + "ms"));
                        resolve(result);
                    }, options.timeout);
                }
                let sendMessageResult = this.sendMessage(options);
                if (!sendMessageResult.success) {
                    for (let error of sendMessageResult.errors) {
                        result.errors.push(error);
                    }
                    resolve(result);
                }
            }
            catch (e) {
                result.errors.push(new WebSocket.SocketError(WebSocket.SocketErrorCode.unknow, e));
                resolve(result);
            }
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
                this.sendMessage(this.memoryBeforeOpen[i]);
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
        let data = {};
        try {
            data = Aventus.Converter.transform(JSON.parse(response.data));
        }
        catch (e) {
            console.error(e);
        }
        for (let channel in this.options.routes) {
            let current = this.options.routes[channel];
            for (let info of current) {
                let params = Aventus.Uri.getParams(info, response.channel);
                if (params) {
                    info.callback(data, params, response.uid);
                }
            }
        }
        if (response.uid) {
            if (this.waitingList.hasOwnProperty(response.uid)) {
                this.waitingList[response.uid](response.channel, data);
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
WebSocket.Connection.Namespace=`${moduleName}.WebSocket`;
_.WebSocket.Connection=WebSocket.Connection;
WebSocket.EndPoint=class EndPoint extends WebSocket.Connection {
    static With(options) {
        class EndPointWith extends WebSocket.EndPoint {
            constructor() {
                super();
                for (let route of options.routes) {
                    if (typeof route == "function") {
                        this._routes.add(route);
                    }
                    else {
                        this._routes.add(route.type, route.path);
                    }
                }
                for (let _event of options.events) {
                    if (typeof _event == "function") {
                        this._events.add(_event);
                    }
                    else {
                        this._events.add(_event.type, _event.path);
                    }
                }
            }
        }
        return EndPointWith;
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
            this._routes = new Proxy({}, Aventus.createCommProxy(this));
        }
        if (!this._events) {
            this._events = new Proxy({}, Aventus.createCommProxy(this));
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
WebSocket.EndPoint.Namespace=`${moduleName}.WebSocket`;
_.WebSocket.EndPoint=WebSocket.EndPoint;
WebSocket.Event=class Event {
    endpoint;
    onTrigger = new Aventus.Callback();
    routeInfo;
    _listening = false;
    get listening() {
        return this._listening;
    }
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.onEvent = this.onEvent.bind(this);
        this.routeInfo = {
            channel: this.path(),
            callback: this.onEvent
        };
        if (this.listenOnBoot()) {
            this.listen();
        }
    }
    /**
     * Override this method to tell that the event must listen when created
     */
    listenOnBoot() {
        return false;
    }
    /**
     * Add the event to the endpoint. After that, the on trigger event can be triggered
     */
    listen() {
        if (!this._listening) {
            this._listening = true;
            this.endpoint.addRoute(this.routeInfo);
        }
    }
    /**
     * Remove the event from the endpoint. After that, the on trigger event won't be triggered
     */
    stop() {
        if (this._listening) {
            this._listening = false;
            this.endpoint.removeRoute(this.routeInfo);
        }
    }
    onEvent(data, params) {
        this.onTrigger.trigger([data, params]);
    }
}
WebSocket.Event.Namespace=`${moduleName}.WebSocket`;
_.WebSocket.Event=WebSocket.Event;
WebSocket.StorableWsRoute_GetAll=class StorableWsRoute_GetAll extends WebSocket.Event {
    StorableName;
    constructor(endpoint, StorableName) {
        super(endpoint);
        this.StorableName = StorableName;
    }
    /**
     * @inheritdoc
     */
    path() {
        return `/${this.StorableName()}`;
    }
}
WebSocket.StorableWsRoute_GetAll.Namespace=`${moduleName}.WebSocket`;
_.WebSocket.StorableWsRoute_GetAll=WebSocket.StorableWsRoute_GetAll;
WebSocket.StorableWsRoute_Create=class StorableWsRoute_Create extends WebSocket.Event {
    StorableName;
    constructor(endpoint, StorableName) {
        super(endpoint);
        this.StorableName = StorableName;
    }
    /**
     * @inheritdoc
     */
    path() {
        return `/${this.StorableName()}`;
    }
}
WebSocket.StorableWsRoute_Create.Namespace=`${moduleName}.WebSocket`;
_.WebSocket.StorableWsRoute_Create=WebSocket.StorableWsRoute_Create;
WebSocket.StorableWsRoute_CreateMany=class StorableWsRoute_CreateMany extends WebSocket.Event {
    StorableName;
    constructor(endpoint, StorableName) {
        super(endpoint);
        this.StorableName = StorableName;
    }
    /**
     * @inheritdoc
     */
    path() {
        return `/${this.StorableName()}s`;
    }
}
WebSocket.StorableWsRoute_CreateMany.Namespace=`${moduleName}.WebSocket`;
_.WebSocket.StorableWsRoute_CreateMany=WebSocket.StorableWsRoute_CreateMany;
WebSocket.StorableWsRoute_GetById=class StorableWsRoute_GetById extends WebSocket.Event {
    StorableName;
    constructor(endpoint, StorableName) {
        super(endpoint);
        this.StorableName = StorableName;
    }
    /**
     * @inheritdoc
     */
    path() {
        return `/${this.StorableName()}/{id:number}`;
    }
}
WebSocket.StorableWsRoute_GetById.Namespace=`${moduleName}.WebSocket`;
_.WebSocket.StorableWsRoute_GetById=WebSocket.StorableWsRoute_GetById;
WebSocket.StorableWsRoute_Update=class StorableWsRoute_Update extends WebSocket.Event {
    StorableName;
    constructor(endpoint, StorableName) {
        super(endpoint);
        this.StorableName = StorableName;
    }
    /**
     * @inheritdoc
     */
    path() {
        return `/${this.StorableName()}/{id:number}`;
    }
}
WebSocket.StorableWsRoute_Update.Namespace=`${moduleName}.WebSocket`;
_.WebSocket.StorableWsRoute_Update=WebSocket.StorableWsRoute_Update;
WebSocket.StorableWsRoute_UpdateMany=class StorableWsRoute_UpdateMany extends WebSocket.Event {
    StorableName;
    constructor(endpoint, StorableName) {
        super(endpoint);
        this.StorableName = StorableName;
    }
    /**
     * @inheritdoc
     */
    path() {
        return `/${this.StorableName()}s`;
    }
}
WebSocket.StorableWsRoute_UpdateMany.Namespace=`${moduleName}.WebSocket`;
_.WebSocket.StorableWsRoute_UpdateMany=WebSocket.StorableWsRoute_UpdateMany;
WebSocket.StorableWsRoute_Delete=class StorableWsRoute_Delete extends WebSocket.Event {
    StorableName;
    constructor(endpoint, StorableName) {
        super(endpoint);
        this.StorableName = StorableName;
    }
    /**
     * @inheritdoc
     */
    path() {
        return `/${this.StorableName()}/{id:number}`;
    }
}
WebSocket.StorableWsRoute_Delete.Namespace=`${moduleName}.WebSocket`;
_.WebSocket.StorableWsRoute_Delete=WebSocket.StorableWsRoute_Delete;
WebSocket.StorableWsRoute_DeleteMany=class StorableWsRoute_DeleteMany extends WebSocket.Event {
    StorableName;
    constructor(endpoint, StorableName) {
        super(endpoint);
        this.StorableName = StorableName;
    }
    /**
     * @inheritdoc
     */
    path() {
        return `/${this.StorableName()}s`;
    }
}
WebSocket.StorableWsRoute_DeleteMany.Namespace=`${moduleName}.WebSocket`;
_.WebSocket.StorableWsRoute_DeleteMany=WebSocket.StorableWsRoute_DeleteMany;
Tools.ResultWithError=class ResultWithError extends Aventus.ResultWithError {
    static get Fullname() { return "AventusSharp.Tools.ResultWithError, AventusSharp"; }
}
Tools.ResultWithError.Namespace=`${moduleName}.Tools`;Aventus.Converter.register(Tools.ResultWithError.Fullname, Tools.ResultWithError);
_.Tools.ResultWithError=Tools.ResultWithError;
WebSocket.ResultWithWsError=class ResultWithWsError extends Tools.ResultWithError {
    static get Fullname() { return "AventusSharp.WebSocket.ResultWithWsError, AventusSharp"; }
}
WebSocket.ResultWithWsError.Namespace=`${moduleName}.WebSocket`;Aventus.Converter.register(WebSocket.ResultWithWsError.Fullname, WebSocket.ResultWithWsError);
_.WebSocket.ResultWithWsError=WebSocket.ResultWithWsError;
Routes.ResultWithRouteError=class ResultWithRouteError extends Tools.ResultWithError {
    static get Fullname() { return "AventusSharp.Routes.ResultWithRouteError, AventusSharp"; }
}
Routes.ResultWithRouteError.Namespace=`${moduleName}.Routes`;Aventus.Converter.register(Routes.ResultWithRouteError.Fullname, Routes.ResultWithRouteError);
_.Routes.ResultWithRouteError=Routes.ResultWithRouteError;
Data.ResultWithDataError=class ResultWithDataError extends Tools.ResultWithError {
    static get Fullname() { return "AventusSharp.Data.ResultWithDataError, AventusSharp"; }
}
Data.ResultWithDataError.Namespace=`${moduleName}.Data`;Aventus.Converter.register(Data.ResultWithDataError.Fullname, Data.ResultWithDataError);
_.Data.ResultWithDataError=Data.ResultWithDataError;
WebSocket.StorableWsRoute=class StorableWsRoute extends WebSocket.Route {
    events;
    constructor(endpoint) {
        super(endpoint);
        this.events = {
            GetAll: new WebSocket.StorableWsRoute_GetAll(endpoint, this.StorableName),
            Create: new WebSocket.StorableWsRoute_Create(endpoint, this.StorableName),
            CreateMany: new WebSocket.StorableWsRoute_CreateMany(endpoint, this.StorableName),
            GetById: new WebSocket.StorableWsRoute_GetById(endpoint, this.StorableName),
            Update: new WebSocket.StorableWsRoute_Update(endpoint, this.StorableName),
            UpdateMany: new WebSocket.StorableWsRoute_UpdateMany(endpoint, this.StorableName),
            Delete: new WebSocket.StorableWsRoute_Delete(endpoint, this.StorableName),
            DeleteMany: new WebSocket.StorableWsRoute_DeleteMany(endpoint, this.StorableName),
        };
    }
    async GetAll(options = {}) {
        const info = {
            channel: `/${this.StorableName()}`,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async Create(body, options = {}) {
        const info = {
            channel: `/${this.StorableName()}`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async CreateMany(body, options = {}) {
        const info = {
            channel: `/${this.StorableName()}s`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async GetById(id, options = {}) {
        const info = {
            channel: `/${this.StorableName()}/${id}`,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async Update(id, body, options = {}) {
        const info = {
            channel: `/${this.StorableName()}/${id}`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async UpdateMany(body, options = {}) {
        const info = {
            channel: `/${this.StorableName()}s`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async Delete(id, options = {}) {
        const info = {
            channel: `/${this.StorableName()}/${id}`,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async DeleteMany(body, options = {}) {
        const info = {
            channel: `/${this.StorableName()}s`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
}
WebSocket.StorableWsRoute.Namespace=`${moduleName}.WebSocket`;
_.WebSocket.StorableWsRoute=WebSocket.StorableWsRoute;
RAM.RamWebSocket=class RamWebSocket extends Aventus.Ram {
    getAllDone = false;
    routes;
    otherGetAllLocked = {};
    otherGetByIdLocked = {};
    otherCreateItemLocked = {};
    otherCreateListLocked = {};
    otherUpdateItemLocked = {};
    otherUpdateListLocked = {};
    otherDeleteItemLocked = {};
    otherDeleteListLocked = {};
    constructor() {
        super();
        this.routes = this.defineRoutes();
        this.addEventsBindings();
        this.otherGetAll = this.otherGetAll.bind(this);
        this.otherGetById = this.otherGetById.bind(this);
        this.otherCreateItem = this.otherCreateItem.bind(this);
        this.otherCreateList = this.otherCreateList.bind(this);
        this.otherUpdateItem = this.otherUpdateItem.bind(this);
        this.otherUpdateList = this.otherUpdateList.bind(this);
        this.otherDeleteItem = this.otherDeleteItem.bind(this);
        this.otherDeleteList = this.otherDeleteList.bind(this);
    }
    addEventsBindings() {
        const autoListen = this.listenOnStart();
        this.routes.events.GetAll.onTrigger.add(this.otherGetAll);
        if (autoListen.GetAll) {
            this.routes.events.GetAll.listen();
        }
        else {
            this.routes.events.GetAll.stop();
        }
        this.routes.events.GetById.onTrigger.add(this.otherGetById);
        if (autoListen.GetById) {
            this.routes.events.GetById.listen();
        }
        else {
            this.routes.events.GetById.stop();
        }
        this.routes.events.Create.onTrigger.add(this.otherCreateItem);
        if (autoListen.Create) {
            this.routes.events.Create.listen();
        }
        else {
            this.routes.events.Create.stop();
        }
        this.routes.events.CreateMany.onTrigger.add(this.otherCreateList);
        if (autoListen.CreateMany) {
            this.routes.events.CreateMany.listen();
        }
        else {
            this.routes.events.CreateMany.stop();
        }
        this.routes.events.Update.onTrigger.add(this.otherCreateItem);
        if (autoListen.Update) {
            this.routes.events.Update.listen();
        }
        else {
            this.routes.events.Update.stop();
        }
        this.routes.events.UpdateMany.onTrigger.add(this.otherCreateList);
        if (autoListen.UpdateMany) {
            this.routes.events.UpdateMany.listen();
        }
        else {
            this.routes.events.UpdateMany.stop();
        }
        this.routes.events.Delete.onTrigger.add(this.otherCreateItem);
        if (autoListen.Delete) {
            this.routes.events.Delete.listen();
        }
        else {
            this.routes.events.Delete.stop();
        }
        this.routes.events.DeleteMany.onTrigger.add(this.otherCreateList);
        if (autoListen.DeleteMany) {
            this.routes.events.DeleteMany.listen();
        }
        else {
            this.routes.events.DeleteMany.stop();
        }
    }
    listenOnStart() {
        return {
            GetAll: false,
            GetById: false,
            Create: true,
            CreateMany: true,
            Update: true,
            UpdateMany: true,
            Delete: true,
            DeleteMany: true,
        };
    }
    otherGetAll(items, params, uid) {
        if (uid && this.otherGetAllLocked[uid])
            return;
        for (let item of items) {
            let resultTemp = new Aventus.ResultRamWithError();
            this.addOrUpdateData(item, resultTemp);
        }
    }
    async beforeGetAll(result) {
        if (!this.getAllDone) {
            let uid = Aventus.uuidv4();
            this.otherGetAllLocked[uid] = true;
            let response = await this.routes.GetAll({ uid });
            delete this.otherGetAllLocked[uid];
            if (!response)
                return;
            if (response.success && response.result) {
                for (let item of response.result) {
                    let resultTemp = new Aventus.ResultRamWithError();
                    this.addOrUpdateData(item, resultTemp);
                    if (!resultTemp.success) {
                        result.errors = [...result.errors, ...resultTemp.errors];
                    }
                }
            }
            else {
                result.errors = [...result.errors, ...response.errors];
            }
        }
    }
    otherGetById(item, params, uid) {
        if (uid && this.otherGetByIdLocked[uid])
            return;
        let resultTemp = new Aventus.ResultRamWithError();
        this.addOrUpdateData(item, resultTemp);
    }
    async beforeGetById(id, result) {
        if (this.records.has(id)) {
            return;
        }
        else {
            let uid = Aventus.uuidv4();
            this.otherGetByIdLocked[uid] = true;
            let response = await this.routes.GetById(id, { uid });
            delete this.otherGetByIdLocked[uid];
            if (!response)
                return;
            if (response.success && response.result) {
                let resultTemp = new Aventus.ResultRamWithError();
                this.addOrUpdateData(response.result, resultTemp);
                if (!resultTemp.success) {
                    result.errors = [...result.errors, ...resultTemp.errors];
                }
            }
            else {
                result.errors = [...result.errors, ...response.errors];
            }
        }
    }
    async beforeGetByIds(ids, result) {
        let missingIds = [];
        for (let id of ids) {
            if (!this.records.has(id)) {
                missingIds.push(id);
            }
        }
        if (missingIds.length > 0) {
            for (let id of missingIds) {
                let resultTemp = new Aventus.ResultRamWithError();
                await this.beforeGetById(id, resultTemp);
                if (!resultTemp.success) {
                    result.errors = [...result.errors, ...resultTemp.errors];
                }
            }
        }
    }
    otherCreateItem(item, params, uid) {
        if (uid && this.otherCreateItemLocked[uid])
            return;
        let resultTemp = new Aventus.ResultRamWithError();
        this.addOrUpdateData(item, resultTemp);
        if (resultTemp.success && resultTemp.result) {
            this.publish('created', resultTemp.result);
        }
    }
    async beforeCreateItem(item, fromList, result) {
        if (fromList) {
            return;
        }
        let uid = Aventus.uuidv4();
        this.otherCreateItemLocked[uid] = true;
        let response = await this.routes.Create({ item }, { uid });
        delete this.otherCreateItemLocked[uid];
        if (response.success && response.result) {
            result.result = this.getObjectForRam(response.result);
        }
        else {
            result.errors = [...result.errors, ...response.errors];
        }
    }
    otherCreateList(items, params, uid) {
        if (uid && this.otherCreateListLocked[uid])
            return;
        for (let item of items) {
            let resultTemp = new Aventus.ResultRamWithError();
            this.addOrUpdateData(item, resultTemp);
            if (resultTemp.success && resultTemp.result) {
                this.publish('created', resultTemp.result);
            }
        }
    }
    async beforeCreateList(list, result) {
        let uid = Aventus.uuidv4();
        this.otherCreateListLocked[uid] = true;
        let response = await this.routes.CreateMany({ list }, { uid });
        delete this.otherCreateListLocked[uid];
        if (response.success && response.result) {
            result.result = [];
            for (let element of response.result) {
                result.result.push(this.getObjectForRam(element));
            }
        }
        else {
            result.errors = [...result.errors, ...response.errors];
        }
    }
    otherUpdateItem(item, params, uid) {
        if (uid && this.otherUpdateItemLocked[uid])
            return;
        let resultTemp = new Aventus.ResultRamWithError();
        this.addOrUpdateData(item, resultTemp);
        if (resultTemp.success && resultTemp.result) {
            this.publish('updated', resultTemp.result);
        }
    }
    async beforeUpdateItem(item, fromList, result) {
        if (fromList) {
            return;
        }
        let uid = Aventus.uuidv4();
        this.otherUpdateItemLocked[uid] = true;
        let response = await this.routes.Update(item.id, { item }, { uid });
        delete this.otherUpdateItemLocked[uid];
        if (response.success && response.result) {
            result.result = this.getObjectForRam(response.result);
        }
        else {
            result.errors = [...result.errors, ...response.errors];
        }
    }
    otherUpdateList(items, params, uid) {
        if (uid && this.otherUpdateListLocked[uid])
            return;
        for (let item of items) {
            let resultTemp = new Aventus.ResultRamWithError();
            this.addOrUpdateData(item, resultTemp);
            if (resultTemp.success && resultTemp.result) {
                this.publish('updated', resultTemp.result);
            }
        }
    }
    async beforeUpdateList(list, result) {
        let uid = Aventus.uuidv4();
        this.otherUpdateListLocked[uid] = true;
        let response = await this.routes.UpdateMany({ list }, { uid });
        delete this.otherUpdateListLocked[uid];
        if (response.success && response.result) {
            result.result = [];
            for (let element of response.result) {
                result.result.push(this.getObjectForRam(element));
            }
        }
        else {
            result.errors = [...result.errors, ...response.errors];
        }
    }
    otherDeleteItem(item, params, uid) {
        if (uid && this.otherDeleteItemLocked[uid])
            return;
        let resultTemp = new Aventus.ResultRamWithError();
        this.deleteData(item, resultTemp);
        if (resultTemp.success && resultTemp.result) {
            this.publish('deleted', resultTemp.result);
            this.recordsSubscribers.delete(resultTemp.result.id);
        }
    }
    async beforeDeleteItem(item, fromList, result) {
        if (fromList) {
            return;
        }
        let uid = Aventus.uuidv4();
        this.otherDeleteItemLocked[uid] = true;
        let response = await this.routes.Delete(item.id, { uid });
        delete this.otherDeleteItemLocked[uid];
        if (!response.success) {
            result.errors = [...result.errors, ...response.errors];
        }
    }
    otherDeleteList(items, params, uid) {
        if (uid && this.otherDeleteListLocked[uid])
            return;
        for (let item of items) {
            let resultTemp = new Aventus.ResultRamWithError();
            this.deleteData(item, resultTemp);
            if (resultTemp.success && resultTemp.result) {
                this.publish('deleted', resultTemp.result);
                this.recordsSubscribers.delete(resultTemp.result.id);
            }
        }
    }
    async beforeDeleteList(list, result) {
        let uid = Aventus.uuidv4();
        this.otherDeleteListLocked[uid] = true;
        let response = await this.routes.DeleteMany({ ids: list.map(t => t.id) }, { uid });
        delete this.otherDeleteListLocked[uid];
        if (!response.success) {
            result.errors = [...result.errors, ...response.errors];
        }
    }
    /**
    * Delete element inside Ram without firing delete event
    */
    deleteData(item, result) {
        try {
            let idWithError = this.getIdWithError(item);
            if (idWithError.success && idWithError.result !== undefined) {
                let id = idWithError.result;
                if (this.records.has(id)) {
                    result.result = this.records.get(id);
                    this.records.delete(id);
                }
                else {
                    result.errors.push(new Aventus.RamError(Aventus.RamErrorCode.noItemInsideRam, "can't delete the item " + id + " because it wasn't found inside ram"));
                }
            }
            else {
                result.errors = [...result.errors, ...idWithError.errors];
            }
        }
        catch (e) {
            result.errors.push(new Aventus.RamError(Aventus.RamErrorCode.unknow, e));
        }
    }
}
RAM.RamWebSocket.Namespace=`${moduleName}.RAM`;
_.RAM.RamWebSocket=RAM.RamWebSocket;

for(let key in _) { AventusSharp[key] = _[key] }
})(AventusSharp);


