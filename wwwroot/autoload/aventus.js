Object.defineProperty(window, "AvInstance", {
	get() {return Aventus.Instance;}
});

(() => {
	Map.prototype._defaultHas = Map.prototype.has;
	Map.prototype._defaultSet = Map.prototype.set;
	Map.prototype._defaultGet = Map.prototype.get;
	Map.prototype.has = function(key) {
		if(Aventus.Watcher?.is(key)) {
			return Map.prototype._defaultHas.call(this,key.getTarget())
		}
		return Map.prototype._defaultHas.call(this,key);
	}

	Map.prototype.set = function(key, value) {
		if(Aventus.Watcher?.is(key)) {
			return Map.prototype._defaultSet.call(this, key.getTarget(), value)
		}
		return Map.prototype._defaultSet.call(this, key, value);
	}
	Map.prototype.get = function(key) {
		if(Aventus.Watcher?.is(key)) {
			return Map.prototype._defaultGet.call(this, key.getTarget())
		}
		return Map.prototype._defaultGet.call(this, key);
	}
})()

var Aventus;
(Aventus||(Aventus = {}));
(function (Aventus) {
const moduleName = `Aventus`;
const _ = {};


let _n;
let ElementExtension=class ElementExtension {
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
        let result = [];
        if (element.shadowRoot) {
            let slotEl;
            if (slotName) {
                slotEl = element.shadowRoot.querySelector('slot[name="' + slotName + '"]');
            }
            else {
                slotEl = element.shadowRoot.querySelector("slot:not([name])");
                if (!slotEl) {
                    slotEl = element.shadowRoot.querySelector("slot");
                }
            }
            while (true) {
                if (!slotEl) {
                    return result;
                }
                var listChild = Array.from(slotEl.assignedElements());
                if (!listChild) {
                    return result;
                }
                let slotFound = false;
                for (let i = 0; i < listChild.length; i++) {
                    let child = listChild[i];
                    if (listChild[i].nodeName == "SLOT") {
                        slotEl = listChild[i];
                        slotFound = true;
                    }
                    else if (child instanceof HTMLElement) {
                        result.push(child);
                    }
                }
                if (!slotFound) {
                    return result;
                }
            }
        }
        return result;
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
                const elements = el.shadowRoot.elementsFromPoint(x, y);
                var newEl = elements.length > 0 ? elements[0] : null;
                if (newEl && newEl != el && (el.shadowRoot.contains(newEl) || el.contains(newEl))) {
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
    /**
     * Get active element from the define root
     */
    static getActiveElement(root = document) {
        if (!root)
            return null;
        let el = root.activeElement;
        while (el instanceof WebComponent) {
            let elTemp = el.shadowRoot?.activeElement;
            if (!elTemp)
                return el;
            el = elTemp;
        }
        return el;
    }
}
ElementExtension.Namespace=`Aventus`;
_.ElementExtension=ElementExtension;

let DateConverter=class DateConverter {
    static __converter = new DateConverter();
    static get converter() {
        return this.__converter;
    }
    static set converter(value) {
        this.__converter = value;
    }
    isStringDate(txt) {
        return /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/.exec(txt) !== null;
    }
    fromString(txt) {
        return new Date(txt);
    }
    toString(date) {
        if (date.getFullYear() < 100) {
            return "0001-01-01T00:00:00.000Z";
        }
        return date.toISOString();
    }
}
DateConverter.Namespace=`Aventus`;
_.DateConverter=DateConverter;

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

let CallbackGroup=class CallbackGroup {
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
    add(group, cb, scope = null) {
        if (!this.callbacks[group]) {
            this.callbacks[group] = new Map();
        }
        if (!this.callbacks[group].has(cb)) {
            this.callbacks[group].set(cb, scope);
        }
    }
    /**
     * Remove a callback for a group
     */
    remove(group, cb) {
        if (this.callbacks[group]) {
            this.callbacks[group].delete(cb);
        }
    }
    /**
     * Trigger all callbacks inside a group
     */
    trigger(group, args) {
        if (this.callbacks[group]) {
            let cbs = [...this.callbacks[group]];
            for (let [cb, scope] of cbs) {
                cb.apply(scope, args);
            }
        }
    }
}
CallbackGroup.Namespace=`Aventus`;
_.CallbackGroup=CallbackGroup;

let Callback=class Callback {
    callbacks = new Map();
    /**
     * Clear all callbacks
     */
    clear() {
        this.callbacks.clear();
    }
    /**
     * Add a callback
     */
    add(cb, scope = null) {
        if (!this.callbacks.has(cb)) {
            this.callbacks.set(cb, scope);
        }
    }
    /**
     * Remove a callback
     */
    remove(cb) {
        this.callbacks.delete(cb);
    }
    /**
     * Trigger all callbacks
     */
    trigger(args) {
        let result = [];
        let cbs = [...this.callbacks];
        for (let [cb, scope] of cbs) {
            result.push(cb.apply(scope, args));
        }
        return result;
    }
}
Callback.Namespace=`Aventus`;
_.Callback=Callback;

let NormalizedEvent=class NormalizedEvent {
    _event;
    get event() {
        return this._event;
    }
    constructor(event) {
        this._event = event;
    }
    getProp(prop) {
        if (prop in this.event) {
            return this.event[prop];
        }
        return undefined;
    }
    stopImmediatePropagation() {
        this.event.stopImmediatePropagation();
    }
    get clientX() {
        if ('clientX' in this.event) {
            return this.event.clientX;
        }
        else if ('touches' in this.event && this.event.touches.length > 0) {
            return this.event.touches[0].clientX;
        }
        return 0;
    }
    get clientY() {
        if ('clientY' in this.event) {
            return this.event.clientY;
        }
        else if ('touches' in this.event && this.event.touches.length > 0) {
            return this.event.touches[0].clientY;
        }
        return 0;
    }
    get pageX() {
        if ('pageX' in this.event) {
            return this.event.pageX;
        }
        else if ('touches' in this.event && this.event.touches.length > 0) {
            return this.event.touches[0].pageX;
        }
        return 0;
    }
    get pageY() {
        if ('pageY' in this.event) {
            return this.event.pageY;
        }
        else if ('touches' in this.event && this.event.touches.length > 0) {
            return this.event.touches[0].pageY;
        }
        return 0;
    }
    get type() {
        return this.event.type;
    }
    get target() {
        return this.event.target;
    }
    get timeStamp() {
        return this.event.timeStamp;
    }
    get pointerType() {
        if ('TouchEvent' in window && this._event instanceof TouchEvent)
            return "touch";
        return this.getProp("pointerType");
    }
    get button() {
        return this.getProp("button");
    }
    get isTouch() {
        if ('TouchEvent' in window && this._event instanceof TouchEvent)
            return true;
        return this._event.pointerType == "touch";
    }
}
NormalizedEvent.Namespace=`Aventus`;
_.NormalizedEvent=NormalizedEvent;

let Instance=class Instance {
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
Instance.Namespace=`Aventus`;
_.Instance=Instance;

let getValueFromObject=function getValueFromObject(path, obj) {
    if (path === undefined) {
        path = '';
    }
    path = path.replace(/\[(.*?)\]/g, '.$1');
    if (path == "") {
        return obj;
    }
    const val = (key) => {
        if (obj instanceof Map) {
            return obj.get(key);
        }
        return obj[key];
    };
    let splitted = path.split(".");
    for (let i = 0; i < splitted.length - 1; i++) {
        let split = splitted[i];
        let value = val(split);
        if (!value || typeof value !== 'object') {
            return undefined;
        }
        obj = value;
    }
    if (!obj || typeof obj !== 'object') {
        return undefined;
    }
    return val(splitted[splitted.length - 1]);
}
_.getValueFromObject=getValueFromObject;

var WatchAction;
(function (WatchAction) {
    WatchAction[WatchAction["CREATED"] = 0] = "CREATED";
    WatchAction[WatchAction["UPDATED"] = 1] = "UPDATED";
    WatchAction[WatchAction["DELETED"] = 2] = "DELETED";
})(WatchAction || (WatchAction = {}));
_.WatchAction=WatchAction;

let Signal=class Signal {
    __subscribes = [];
    _value;
    _onChange;
    get value() {
        Watcher._register?.register(this, "*", Watcher._register.version, "*");
        return this._value;
    }
    set value(item) {
        const oldValue = this._value;
        this._value = item;
        if (oldValue != item) {
            if (this._onChange) {
                this._onChange();
            }
            for (let fct of this.__subscribes) {
                fct(WatchAction.UPDATED, "*", item, []);
            }
        }
    }
    constructor(item, onChange) {
        this._value = item;
        this._onChange = onChange;
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
    destroy() {
        this.__subscribes = [];
    }
}
Signal.Namespace=`Aventus`;
_.Signal=Signal;

var RamErrorCode;
(function (RamErrorCode) {
    RamErrorCode[RamErrorCode["unknow"] = 0] = "unknow";
    RamErrorCode[RamErrorCode["noId"] = 1] = "noId";
    RamErrorCode[RamErrorCode["noItemInsideRam"] = 2] = "noItemInsideRam";
})(RamErrorCode || (RamErrorCode = {}));
_.RamErrorCode=RamErrorCode;

let ActionGuard=class ActionGuard {
    /**
     * Map to store actions that are currently running.
     * @type {Map<any[], ((res: any) => void)[]>}
     * @private
     */
    runningAction = new Map();
    /**
     * Executes an action uniquely based on the specified keys.
     * @template T
     * @param {any[]} keys The keys associated with the action.
     * @param {() => Promise<T>} action The action to execute.
     * @returns {Promise<T>} A promise that resolves with the result of the action.
     * @example
     *
     *
     * const actionGuard = new Aventus.ActionGuard();
     *
     *
     * const keys = ["key1", "key2"];
     *
     *
     * const action = async () => {
     *
     *     await new Promise(resolve => setTimeout(resolve, 1000));
     *     return "Action executed";
     * };
     *
     *
     * await actionGuard.run(keys, action)
     *
     */
    run(keys, action) {
        return new Promise(async (resolve) => {
            let actions = undefined;
            let runningKeys = Array.from(this.runningAction.keys());
            for (let runningKey of runningKeys) {
                if (runningKey.length == keys.length) {
                    let found = true;
                    for (let i = 0; i < keys.length; i++) {
                        if (runningKey[i] != keys[i]) {
                            found = false;
                            break;
                        }
                    }
                    if (found) {
                        actions = this.runningAction.get(runningKey);
                        break;
                    }
                }
            }
            if (actions) {
                actions.push((res) => {
                    resolve(res);
                });
            }
            else {
                this.runningAction.set(keys, []);
                let res = await action();
                let actions = this.runningAction.get(keys);
                if (actions) {
                    for (let action of actions) {
                        action(res);
                    }
                }
                this.runningAction.delete(keys);
                resolve(res);
            }
        });
    }
}
ActionGuard.Namespace=`Aventus`;
_.ActionGuard=ActionGuard;

let Mutex=class Mutex {
    /**
     * Array to store functions waiting for the mutex to become available.
     * @type {((run: boolean) => void)[]}
     */
    waitingList = [];
    /**
    * Indicates whether the mutex is currently locked or not.
    * @type {boolean}
    */
    isLocked = false;
    /**
    * Waits for the mutex to become available and then acquires it.
    * @returns {Promise<boolean>} A Promise that resolves to true if the mutex was acquired successfully.
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
     * Releases the mutex, allowing only the last function in the waiting list to acquire it.
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
     * Clears the mutex, removing all waiting functions and releasing the lock.
     */
    dispose() {
        this.waitingList = [];
        this.isLocked = false;
    }
    /**
     * Executes a callback function safely within the mutex lock and releases the lock afterward.
     * @template T - The type of the return value of the callback function.
     * @param {() => T} cb - The callback function to execute.
     * @returns {Promise<T | null>} A Promise that resolves to the result of the callback function or null if an error occurs.
     */
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
    /**
     * Executes an asynchronous callback function safely within the mutex lock and releases the lock afterward.
     * @template T - The type of the return value of the asynchronous callback function.
     * @param {() => Promise<T>} cb - The asynchronous callback function to execute.
     * @returns {Promise<T | null>} A Promise that resolves to the result of the asynchronous callback function or null if an error occurs.
     */
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
    /**
     * Executes a callback function safely within the mutex lock, allowing only the last function in the waiting list to acquire the lock, and releases the lock afterward.
     * @template T - The type of the return value of the callback function.
     * @param {() => T} cb - The callback function to execute.
     * @returns {Promise<T | null>} A Promise that resolves to the result of the callback function or null if an error occurs.
     */
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
    /**
     * Executes an asynchronous callback function safely within the mutex lock, allowing only the last function in the waiting list to acquire the lock, and releases the lock afterward.
     * @template T - The type of the return value of the asynchronous callback function.
     * @param {() => Promise<T>} cb - The asynchronous callback function to execute.
     * @returns {Promise<T | undefined>} A Promise that resolves to the result of the asynchronous callback function or undefined if an error occurs.
     */
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
Mutex.Namespace=`Aventus`;
_.Mutex=Mutex;

let setValueToObject=function setValueToObject(path, obj, value) {
    path = path.replace(/\[(.*?)\]/g, '.$1');
    const val = (key) => {
        if (obj instanceof Map) {
            return obj.get(key);
        }
        return obj[key];
    };
    let splitted = path.split(".");
    for (let i = 0; i < splitted.length - 1; i++) {
        let split = splitted[i];
        let value = val(split);
        if (!value) {
            obj[split] = {};
            value = obj[split];
        }
        obj = value;
    }
    if (obj instanceof Map) {
        obj.set(splitted[splitted.length - 1], value);
    }
    else {
        obj[splitted[splitted.length - 1]] = value;
    }
}
_.setValueToObject=setValueToObject;

let isClass=function isClass(v) {
    return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
}
_.isClass=isClass;

let sleep=function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
_.sleep=sleep;

let uuidv4=function uuidv4() {
    let uid = '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16));
    return uid;
}
_.uuidv4=uuidv4;

let Style=class Style {
    static instance;
    static noAnimation;
    static defaultStyleSheets = {
        "@default": `:host{display:inline-block;box-sizing:border-box}:host *{box-sizing:border-box}`,
    };
    static store(name, content) {
        this.getInstance().store(name, content);
    }
    static get(name) {
        return this.getInstance().get(name);
    }
    static getAsString(name) {
        return this.getInstance().getAsString(name);
    }
    static sheetToString(stylesheet) {
        return this.getInstance().sheetToString(stylesheet);
    }
    static load(name, url) {
        return this.getInstance().load(name, url);
    }
    static appendToHead(name) {
        if (!document.head.querySelector(`style[data-name="${name}"]`)) {
            const styleNode = document.createElement('style');
            styleNode.setAttribute(`data-name`, name);
            styleNode.innerHTML = Aventus.Style.getAsString(name);
            document.getElementsByTagName('head')[0].appendChild(styleNode);
        }
    }
    static refreshHead(name) {
        const styleNode = document.head.querySelector(`style[data-name="${name}"]`);
        if (styleNode) {
            styleNode.innerHTML = Aventus.Style.getAsString(name);
        }
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
            Style.refreshHead(name);
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
    getAsString(name) {
        return this.sheetToString(this.get(name));
    }
    sheetToString(stylesheet) {
        return stylesheet.cssRules
            ? Array.from(stylesheet.cssRules)
                .map(rule => rule.cssText || '')
                .join('\n')
            : '';
    }
}
Style.Namespace=`Aventus`;
_.Style=Style;

let Effect=class Effect {
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
            cb = (action, changePath, value, dones) => { this.onChange(action, changePath, value, dones); };
        }
        else {
            cb = (action, changePath, value, dones) => {
                let full = fullPath;
                if (changePath == path) {
                    this.onChange(action, changePath, value, dones);
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
    checkCanChange(action, changePath, value, dones) {
        if (this.isDestroy) {
            return false;
        }
        for (let fct of this.__allowChanged) {
            if (!fct(action, changePath, value, dones)) {
                return false;
            }
        }
        return true;
    }
    onChange(action, changePath, value, dones) {
        if (!this.checkCanChange(action, changePath, value, dones)) {
            return;
        }
        this.run();
        for (let fct of this.__subscribes) {
            fct(action, changePath, value, dones);
        }
    }
    destroy() {
        this.isDestroy = true;
        this.clearCallbacks();
        this.isInit = false;
    }
    clearCallbacks() {
        for (let pair of this.callbacks) {
            pair.receiver.unsubscribe(pair.cb);
        }
        this.callbacks = [];
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
Effect.Namespace=`Aventus`;
_.Effect=Effect;

let Computed=class Computed extends Effect {
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
    onChange(action, changePath, value, dones) {
        if (!this.checkCanChange(action, changePath, value, dones)) {
            return;
        }
        let oldValue = this._value;
        this.computedValue();
        if (oldValue === this._value) {
            return;
        }
        for (let fct of this.__subscribes) {
            fct(action, changePath, value, dones);
        }
    }
}
Computed.Namespace=`Aventus`;
_.Computed=Computed;

let Watcher=class Watcher {
    constructor() { }
    ;
    static __reservedName = {
        __path: '__path',
    };
    static __triggerForced = false;
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
        const reservedName = this.__reservedName;
        const clearReservedNames = (data) => {
            if (data instanceof Object && !data.__isProxy) {
                for (let key in reservedName) {
                    delete data[key];
                }
            }
        };
        const setProxyPath = (newProxy, newPath) => {
            if (newProxy instanceof Object && newProxy.__isProxy) {
                newProxy.__path = newPath;
            }
        };
        const jsonReplacer = (key, value) => {
            if (reservedName[key])
                return undefined;
            return value;
        };
        const addAlias = (otherBaseData, name, cb) => {
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
        const deleteAlias = (otherBaseData, name) => {
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
        const replaceByAlias = (target, element, prop, receiver, apply, out = {}) => {
            let fullInternalPath = "";
            if (Array.isArray(receiver)) {
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
                    element.__validatePath();
                    let oldPath = element.__path ?? '';
                    let unbindElement = Watcher.extract(getValueFromObject(oldPath, root));
                    if (unbindElement === undefined) {
                        return element;
                    }
                    if (receiver == null) {
                        receiver = getValueFromObject(target.__path, realProxy);
                        if (internalAliases[fullInternalPath]) {
                            internalAliases[fullInternalPath].unbind();
                        }
                    }
                    if (apply) {
                        let result = Reflect.set(target, prop, unbindElement, receiver);
                    }
                    element.__addAlias(proxyData.baseData, oldPath, (type, target, receiver2, value, prop2, dones) => {
                        let triggerPath;
                        if (prop2.startsWith("[") || fullInternalPath == "" || prop2 == "") {
                            triggerPath = fullInternalPath + prop2;
                        }
                        else {
                            triggerPath = fullInternalPath + "." + prop2;
                        }
                        if (type == 'DELETED' && internalAliases[triggerPath]) {
                            internalAliases[triggerPath].unbind();
                        }
                        triggerPath = triggerPath.replace(/\[(.*?)\]/g, '.$1');
                        let splitted = triggerPath.split(".");
                        let newProp = splitted.pop();
                        let newReceiver = getValueFromObject(splitted.join("."), realProxy);
                        if (newReceiver.getTarget(false) == target)
                            trigger(type, target, newReceiver, value, newProp, dones);
                    });
                    internalAliases[fullInternalPath] = {
                        unbind: () => {
                            delete internalAliases[fullInternalPath];
                            element.__deleteAlias(proxyData.baseData, oldPath);
                            deleteAlias(root, fullInternalPath);
                        }
                    };
                    addAlias(root, fullInternalPath, (type, target, receiver2, value, prop2, dones) => {
                        const pathSave = element.__path;
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
                        if (newReceiver.getTarget(false) == target)
                            element.__trigger(type, target, newReceiver, value, newProp, dones);
                        element.__path = pathSave;
                    });
                    out.otherRoot = root;
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
            injectedDones: null,
            history: [{
                    object: JSON.parse(JSON.stringify(obj, jsonReplacer)),
                    trace: currentTrace,
                    action: 'init',
                    path: ''
                }],
            useHistory: false,
            getProxyObject(target, element, prop) {
                let newProxy;
                element = replaceByAlias(target, element, prop, null, true);
                if (element instanceof Object && element.__isProxy) {
                    newProxy = element;
                }
                else {
                    try {
                        if (element instanceof Computed) {
                            return element;
                        }
                        if (element instanceof HTMLElement) {
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
                else if (prop == "__validatePath") {
                    return () => {
                        if (this.baseData == target) {
                            target.__path = "";
                        }
                    };
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
                else if (prop == "getTarget") {
                    return (clear = true) => {
                        if (clear)
                            clearReservedNames(target);
                        return target;
                    };
                }
                else if (prop == "toJSON") {
                    if (target.toJSON) {
                        return target.toJSON;
                    }
                    if (Array.isArray(receiver)) {
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
                else if (prop == "__injectedDones") {
                    return (dones) => {
                        this.injectedDones = dones;
                    };
                }
                else if (prop == "__trigger") {
                    return trigger;
                }
                else if (prop == "__static_trigger") {
                    return (type) => {
                        Watcher.__triggerForced = true;
                        trigger(type, target, receiver, target, '');
                        Watcher.__triggerForced = false;
                    };
                }
                return undefined;
            },
            get(target, prop, receiver) {
                if (typeof prop == 'symbol') {
                    return Reflect.get(target, prop, receiver);
                }
                if (reservedName[prop]) {
                    return target[prop];
                }
                let customResult = this.tryCustomFunction(target, prop, receiver);
                if (customResult !== undefined) {
                    return customResult;
                }
                let element = target[prop];
                if (typeof (element) == 'function') {
                    if (Array.isArray(receiver)) {
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
                                    let index = target.length;
                                    let out = {};
                                    el = replaceByAlias(target, el, target.length + '', receiver, false, out);
                                    target.push(el);
                                    const dones = [];
                                    if (out.otherRoot) {
                                        dones.push(out.otherRoot);
                                    }
                                    trigger('CREATED', target, receiver, receiver[index], "[" + (index) + "]", dones);
                                    trigger('UPDATED', target, receiver, target.length, "length", dones);
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
                                    const extReceiver = Watcher.extract(receiver);
                                    for (let i = index; i < index + nbRemove; i++) {
                                        oldValues.push(extReceiver[i]);
                                    }
                                    let updateLength = nbRemove != insert.length;
                                    for (let i = 0; i < oldValues.length; i++) {
                                        target.splice((index + i), 1);
                                        trigger('DELETED', target, receiver, oldValues[i], "[" + index + "]");
                                    }
                                    for (let i = 0; i < insert.length; i++) {
                                        const out = {};
                                        let value = replaceByAlias(target, insert[i], (index + i) + '', receiver, false, out);
                                        const dones = out.otherRoot ? [out.otherRoot] : [];
                                        target.splice((index + i), 0, value);
                                        trigger('CREATED', target, receiver, receiver[(index + i)], "[" + (index + i) + "]", dones);
                                    }
                                    if (updateLength)
                                        trigger('UPDATED', target, receiver, target.length, "length");
                                    return target;
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
                    else if (target instanceof Map) {
                        let result;
                        if (prop == "set") {
                            if (target.__isProxy) {
                                result = (key, value) => {
                                    return target.set(key, value);
                                };
                            }
                            else {
                                result = (key, value) => {
                                    const out = {};
                                    let dones = [];
                                    key = Watcher.extract(key);
                                    value = replaceByAlias(target, value, key + '', receiver, false, out);
                                    if (out.otherRoot)
                                        dones.push(out.otherRoot);
                                    let result = target.set(key, value);
                                    trigger('CREATED', target, receiver, receiver.get(key), key + '', dones);
                                    trigger('UPDATED', target, receiver, target.size, "size", dones);
                                    return result;
                                };
                            }
                        }
                        else if (prop == "clear") {
                            if (target.__isProxy) {
                                result = () => {
                                    return target.clear();
                                };
                            }
                            else {
                                result = () => {
                                    let keys = target.keys();
                                    for (let key of keys) {
                                        let oldValue = receiver.get(key);
                                        target.delete(key);
                                        trigger('DELETED', target, receiver, oldValue, key);
                                        trigger('UPDATED', target, receiver, target.size, "size");
                                    }
                                };
                            }
                        }
                        else if (prop == "delete") {
                            if (target.__isProxy) {
                                result = (key) => {
                                    return target.delete(key);
                                };
                            }
                            else {
                                result = (key) => {
                                    key = Watcher.extract(key);
                                    let oldValue = receiver.get(key);
                                    let res = target.delete(key);
                                    trigger('DELETED', target, receiver, oldValue, key + '');
                                    trigger('UPDATED', target, receiver, target.size, "size");
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
                if (typeof prop == 'symbol') {
                    return Reflect.set(target, prop, value, receiver);
                }
                let oldValue = Reflect.get(target, prop, receiver);
                value = replaceByAlias(target, value, prop, receiver, true);
                if (value instanceof Signal) {
                    value = value.value;
                }
                let triggerChange = false;
                if (!reservedName[prop]) {
                    if (Array.isArray(receiver)) {
                        if (prop != "length") {
                            triggerChange = true;
                        }
                    }
                    else {
                        if (!compareObject(value, oldValue)) {
                            triggerChange = true;
                        }
                    }
                    if (Watcher.__triggerForced) {
                        triggerChange = true;
                    }
                }
                let result = Reflect.set(target, prop, value, receiver);
                if (triggerChange) {
                    let index = this.avoidUpdate.indexOf(prop);
                    if (index == -1) {
                        let dones = this.injectedDones ?? [];
                        this.injectedDones = null;
                        trigger('UPDATED', target, receiver, value, prop, dones);
                    }
                    else {
                        this.avoidUpdate.splice(index, 1);
                    }
                }
                return result;
            },
            deleteProperty(target, prop) {
                if (typeof prop == 'symbol') {
                    return Reflect.deleteProperty(target, prop);
                }
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
                    if (oldValue instanceof Effect || oldValue instanceof Signal) {
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
                if (typeof prop == 'symbol') {
                    return Reflect.defineProperty(target, prop, descriptor);
                }
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
                    let key = result[i];
                    if (typeof key == 'string') {
                        if (reservedName[key]) {
                            result.splice(i, 1);
                            i--;
                        }
                    }
                }
                return result;
            },
        };
        if (onDataChanged) {
            proxyData.callbacks[''] = [onDataChanged];
        }
        const trigger = (type, target, receiver, value, prop, dones = []) => {
            if (dones.includes(proxyData.baseData)) {
                return;
            }
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
                if (Array.isArray(receiver)) {
                    if (prop && !prop.startsWith("[")) {
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
                    if (prop && !prop.startsWith("[")) {
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
                        let regex2 = new RegExp("^" + rootPath.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + "(\\.|(\\[)|$)");
                        if (!regex2.test(name)) {
                            continue;
                        }
                        else {
                            pathToSend = "";
                        }
                    }
                    else {
                        pathToSend = rootPath.replace(regex, "$2");
                    }
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
                        cb(WatchAction[type], pathToSend, value, dones);
                    }
                    catch (e) {
                        if (e != 'impossible')
                            console.error(e);
                    }
                }
                for (let [key, infos] of aliases) {
                    if (!dones.includes(key)) {
                        for (let info of infos) {
                            if (info.name == name) {
                                aliasesDone.push(key);
                                if (target.__path) {
                                    let oldPath = target.__path;
                                    info.fct(type, target, receiver, value, prop, dones);
                                    target.__path = oldPath;
                                }
                                else {
                                    info.fct(type, target, receiver, value, prop, dones);
                                }
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
                        let newProp = rootPath.replace(info.name, "");
                        if (newProp.startsWith(".")) {
                            newProp = newProp.slice(1);
                        }
                        if (target.__path) {
                            let oldPath = target.__path;
                            info.fct(type, target, receiver, value, newProp, dones);
                            target.__path = oldPath;
                        }
                        else {
                            info.fct(type, target, receiver, value, newProp, dones);
                        }
                    }
                }
            }
        };
        var realProxy = new Proxy(obj, proxyData);
        proxyData.baseData = obj;
        setProxyPath(realProxy, '');
        return realProxy;
    }
    static is(obj) {
        return typeof obj == 'object' && obj.__isProxy;
    }
    static extract(obj, clearPath = false) {
        if (this.is(obj)) {
            return obj.getTarget(clearPath);
        }
        else {
            if (obj instanceof Object) {
                for (let key in this.__reservedName) {
                    delete obj[key];
                }
            }
        }
        return obj;
    }
    static trigger(type, target) {
        if (this.is(target)) {
            target.__static_trigger(type);
        }
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
    /**
     * Create a signal variable
     */
    static signal(item, onChange) {
        return new Signal(item, onChange);
    }
}
Watcher.Namespace=`Aventus`;
_.Watcher=Watcher;

let EffectNoRecomputed=class EffectNoRecomputed extends Effect {
    init() {
        this.isInit = true;
        Watcher._registering.push(this);
        this.fct();
        Watcher._registering.splice(Watcher._registering.length - 1, 1);
    }
    run() {
        if (!this.isInit) {
            this.init();
        }
    }
}
EffectNoRecomputed.Namespace=`Aventus`;
_.EffectNoRecomputed=EffectNoRecomputed;

let ComputedNoRecomputed=class ComputedNoRecomputed extends Computed {
    init() {
        this.isInit = true;
        Watcher._registering.push(this);
        this._value = this.fct();
        Watcher._registering.splice(Watcher._registering.length - 1, 1);
    }
    computedValue() {
        if (this.isInit)
            this._value = this.fct();
        else
            this.init();
    }
    run() { }
}
ComputedNoRecomputed.Namespace=`Aventus`;
_.ComputedNoRecomputed=ComputedNoRecomputed;

let compareObject=function compareObject(obj1, obj2) {
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
    else if (typeof obj1 === 'object' && obj1 !== undefined && obj1 !== null) {
        if (typeof obj2 !== 'object' || obj2 === undefined || obj2 === null) {
            return false;
        }
        if (obj1 == obj2) {
            return true;
        }
        if (obj1 instanceof HTMLElement || obj2 instanceof HTMLElement) {
            return false;
        }
        if (obj1 instanceof Date || obj2 instanceof Date) {
            return obj1.toString() === obj2.toString();
        }
        let oneProxy = false;
        if (Watcher.is(obj1)) {
            oneProxy = true;
            obj1 = Watcher.extract(obj1, false);
        }
        if (Watcher.is(obj2)) {
            oneProxy = true;
            obj2 = Watcher.extract(obj2, false);
        }
        if (obj1 instanceof Map && obj2 instanceof Map) {
            if (obj1.size != obj2.size) {
                return false;
            }
            const keys = obj1.keys();
            for (let key in keys) {
                if (!obj2.has(key)) {
                    return false;
                }
                if (!compareObject(obj1.get(key), obj2.get(key))) {
                    return false;
                }
            }
            return true;
        }
        else {
            if (Object.keys(obj1).length !== Object.keys(obj2).length) {
                return false;
            }
            for (let key in obj1) {
                if (oneProxy && Watcher['__reservedName'][key]) {
                    continue;
                }
                if (!(key in obj2)) {
                    return false;
                }
                if (!compareObject(obj1[key], obj2[key])) {
                    return false;
                }
            }
            return true;
        }
    }
    else {
        return obj1 === obj2;
    }
}
_.compareObject=compareObject;

let ResourceLoader=class ResourceLoader {
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
ResourceLoader.Namespace=`Aventus`;
_.ResourceLoader=ResourceLoader;

let Async=function Async(el) {
    return new Promise((resolve) => {
        if (el instanceof Promise) {
            el.then(resolve);
        }
        else {
            resolve(el);
        }
    });
}
_.Async=Async;

let Json=class Json {
    /**
     * Converts a JavaScript class instance to a JSON object.
     * @template T - The type of the object to convert.
     * @param {T} obj - The object to convert to JSON.
     * @param {JsonToOptions} [options] - Options for JSON conversion.
     * @returns {{ [key: string | number]: any; }} Returns the JSON representation of the object.
     */
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
    /**
    * Converts a JSON object to a JavaScript class instance.
    * @template T - The type of the object to convert.
    * @param {T} obj - The object to populate with JSON data.
    * @param {*} data - The JSON data to populate the object with.
    * @param {JsonFromOptions} [options] - Options for JSON deserialization.
    * @returns {T} Returns the populated object.
    */
    static classFromJson(obj, data, options) {
        let realOptions = {
            transformValue: options?.transformValue ?? ((key, value) => value),
            replaceUndefined: options?.replaceUndefined ?? false,
            replaceUndefinedWithKey: options?.replaceUndefinedWithKey ?? false,
        };
        return this.__classFromJson(obj, data, realOptions);
    }
    static __classFromJson(obj, data, options) {
        let props = Object.getOwnPropertyNames(obj);
        for (let prop of props) {
            let propUpperFirst = prop[0].toUpperCase() + prop.slice(1);
            let value = data[prop] === undefined ? data[propUpperFirst] : data[prop];
            if (value !== undefined || options.replaceUndefined || (options.replaceUndefinedWithKey && (Object.hasOwn(data, prop) || Object.hasOwn(data, propUpperFirst)))) {
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
                if (value !== undefined || options.replaceUndefined || (options.replaceUndefinedWithKey && (Object.hasOwn(data, prop) || Object.hasOwn(data, propUpperFirst)))) {
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
Json.Namespace=`Aventus`;
_.Json=Json;

let Data=class Data {
    /**
     * The schema for the class
     */
    static $schema;
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
    /**
     * Clone the object by transforming a parsed JSON string back into the original type
     */
    clone() {
        return Converter.transform(JSON.parse(JSON.stringify(this)));
    }
}
Data.Namespace=`Aventus`;
_.Data=Data;

let ConverterTransform=class ConverterTransform {
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
                if (objTemp instanceof Map) {
                    if (data.values) {
                        for (const keyValue of data.values) {
                            objTemp.set(this.transformLoop(keyValue[0]), this.transformLoop(keyValue[1]));
                        }
                    }
                    return objTemp;
                }
                let obj = objTemp;
                this.beforeTransformObject(obj);
                if (obj.fromJSON) {
                    obj = obj.fromJSON(data);
                }
                else {
                    obj = Json.classFromJson(obj, data, {
                        transformValue: (key, value) => {
                            if (obj[key] instanceof Date) {
                                return value ? new Date(value) : null;
                            }
                            else if (typeof value == 'string' && DateConverter.converter.isStringDate(value)) {
                                return value ? DateConverter.converter.fromString(value) : null;
                            }
                            else if (obj[key] instanceof Map) {
                                let map = new Map();
                                for (const keyValue of value) {
                                    map.set(this.transformLoop(keyValue[0]), this.transformLoop(keyValue[1]));
                                }
                                return map;
                            }
                            else if (obj instanceof Data) {
                                let cst = obj.constructor;
                                if (cst.$schema[key] == 'boolean') {
                                    return value ? true : false;
                                }
                                else if (cst.$schema[key] == 'number') {
                                    return isNaN(Number(value)) ? 0 : Number(value);
                                }
                                else if (cst.$schema[key] == 'number') {
                                    return isNaN(Number(value)) ? 0 : Number(value);
                                }
                                else if (cst.$schema[key] == 'Date') {
                                    return value ? new Date(value) : null;
                                }
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
        if (typeof data == 'string' && /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/.exec(data)) {
            return new Date(data);
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
ConverterTransform.Namespace=`Aventus`;
_.ConverterTransform=ConverterTransform;

let Converter=class Converter {
    /**
    * Map storing information about registered types.
    */
    static info = new Map([["Aventus.Map", Map]]);
    /**
    * Map storing schemas for registered types.
    */
    static schema = new Map();
    /**
     * Internal converter instance.
     */
    static __converter = new ConverterTransform();
    /**
     * Getter for the internal converter instance.
     */
    static get converterTransform() {
        return this.__converter;
    }
    /**
    * Sets the converter instance.
    * @param converter The converter instance to set.
    */
    static setConverter(converter) {
        this.__converter = converter;
    }
    /**
    * Registers a unique string type for any class.
    * @param $type The unique string type identifier.
    * @param cst The constructor function for the class.
    * @param schema Optional schema for the registered type.
    */
    static register($type, cst, schema) {
        this.info.set($type, cst);
        if (schema) {
            this.schema.set($type, schema);
        }
    }
    /**
     * Transforms the provided data using the current converter instance.
     * @template T
     * @param {*} data The data to transform.
     * @param {IConverterTransform} [converter] Optional converter instance to use for transformation.
     * @returns {T} Returns the transformed data.
     */
    static transform(data, converter) {
        if (!converter) {
            converter = this.converterTransform;
        }
        return converter.transform(data);
    }
    /**
     * Copies values from one class instance to another using the current converter instance.
     * @template T
     * @param {T} to The destination class instance to copy values into.
     * @param {T} from The source class instance to copy values from.
     * @param {ClassCopyOptions} [options] Optional options for the copy operation.
     * @param {IConverterTransform} [converter] Optional converter instance to use for the copy operation.
     * @returns {T} Returns the destination class instance with copied values.
     */
    static copyValuesClass(to, from, options, converter) {
        if (!converter) {
            converter = this.converterTransform;
        }
        return converter.copyValuesClass(to, from, options);
    }
}
Converter.Namespace=`Aventus`;
_.Converter=Converter;

let GenericError=class GenericError {
    /**
     * Code for the error
     */
    code;
    /**
     * Description of the error
     */
    message;
    /**
     * Additional details related to the error.
     * @type {any[]}
     */
    details = [];
    /**
     * Creates a new instance of GenericError.
     * @param {EnumValue<T>} code - The error code.
     * @param {string} message - The error message.
     */
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}
GenericError.Namespace=`Aventus`;
_.GenericError=GenericError;

let RamError=class RamError extends GenericError {
}
RamError.Namespace=`Aventus`;
_.RamError=RamError;

let HttpError=class HttpError extends GenericError {
}
HttpError.Namespace=`Aventus`;
_.HttpError=HttpError;

let VoidWithError=class VoidWithError {
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
    /**
     * Converts the current instance to a VoidWithError object.
     * @returns {VoidWithError} A new instance of VoidWithError with the same error list.
     */
    toGeneric() {
        const result = new VoidWithError();
        result.errors = this.errors;
        return result;
    }
    /**
    * Checks if the error list contains a specific error code.
    * @template U - The type of error, extending GenericError.
    * @template T - The type of the error code, which extends either number or Enum.
    * @param {EnumValue<T>} code - The error code to check for.
    * @param {new (...args: any[]) => U} [type] - Optional constructor function of the error type.
    * @returns {boolean} True if the error list contains the specified error code, otherwise false.
    */
    containsCode(code, type) {
        if (type) {
            for (let error of this.errors) {
                if (error instanceof type) {
                    if (error.code == code) {
                        return true;
                    }
                }
            }
        }
        else {
            for (let error of this.errors) {
                if (error.code == code) {
                    return true;
                }
            }
        }
        return false;
    }
}
VoidWithError.Namespace=`Aventus`;
_.VoidWithError=VoidWithError;

let VoidRamWithError=class VoidRamWithError extends VoidWithError {
}
VoidRamWithError.Namespace=`Aventus`;
_.VoidRamWithError=VoidRamWithError;

let ResultWithError=class ResultWithError extends VoidWithError {
    /**
      * The result value of the action.
      * @type {U | undefined}
      */
    result;
    /**
     * Converts the current instance to a ResultWithError object.
     * @returns {ResultWithError<U>} A new instance of ResultWithError with the same error list and result value.
     */
    toGeneric() {
        const result = new ResultWithError();
        result.errors = this.errors;
        result.result = this.result;
        return result;
    }
}
ResultWithError.Namespace=`Aventus`;
_.ResultWithError=ResultWithError;

let ResultRamWithError=class ResultRamWithError extends ResultWithError {
}
ResultRamWithError.Namespace=`Aventus`;
_.ResultRamWithError=ResultRamWithError;

let HttpRequest=class HttpRequest {
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
    objectToFormData(obj, formData, parentKey) {
        formData = formData || new FormData();
        let byPass = obj;
        if (byPass.__isProxy) {
            obj = byPass.getTarget();
        }
        const keys = obj.toJSON ? Object.keys(obj.toJSON()) : Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            let value = obj[key];
            const newKey = parentKey ? `${parentKey}[${key}]` : key;
            if (value instanceof Date) {
                formData.append(newKey, DateConverter.converter.toString(value));
            }
            else if (typeof value === 'object' &&
                value !== null &&
                !(value instanceof File)) {
                if (Array.isArray(value)) {
                    for (let j = 0; j < value.length; j++) {
                        const arrayKey = `${newKey}[${j}]`;
                        this.objectToFormData({ [arrayKey]: value[j] }, formData);
                    }
                }
                else {
                    this.objectToFormData(value, formData, newKey);
                }
            }
            else {
                if (value === undefined || value === null) {
                    value = "";
                }
                formData.append(newKey, value);
            }
        }
        return formData;
    }
    jsonReplacer(key, value) {
        if (this[key] instanceof Date) {
            return DateConverter.converter.toString(this[key]);
        }
        return value;
    }
    prepareBody(data) {
        if (!data) {
            return;
        }
        else if (data instanceof FormData) {
            this.request.body = data;
        }
        else {
            let useFormData = false;
            const analyseFormData = (obj) => {
                for (let key in obj) {
                    if (obj[key] instanceof File) {
                        useFormData = true;
                        break;
                    }
                    else if (Array.isArray(obj[key]) && obj[key].length > 0 && obj[key][0] instanceof File) {
                        useFormData = true;
                        break;
                    }
                    else if (typeof obj[key] == 'object' && !Array.isArray(obj[key]) && !(obj[key] instanceof Date)) {
                        analyseFormData(obj[key]);
                        if (useFormData) {
                            break;
                        }
                    }
                }
            };
            analyseFormData(data);
            if (useFormData) {
                this.request.body = this.objectToFormData(data);
            }
            else {
                this.request.body = JSON.stringify(data, this.jsonReplacer);
                this.setHeader("Content-Type", "Application/json");
            }
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
    async queryBlob(router) {
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
            result.result = await resultTemp.result.blob();
        }
        catch (e) {
            result.errors.push(new HttpError(HttpErrorCode.unknow, e));
        }
        return result;
    }
}
HttpRequest.Namespace=`Aventus`;
_.HttpRequest=HttpRequest;

let HttpRouter=class HttpRouter {
    options;
    constructor() {
        this.options = this.defineOptions(this.defaultOptionsValue());
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
HttpRouter.Namespace=`Aventus`;
_.HttpRouter=HttpRouter;

let HttpRoute=class HttpRoute {
    router;
    constructor(router) {
        this.router = router ?? new HttpRouter();
    }
    getPrefix() {
        return "";
    }
}
HttpRoute.Namespace=`Aventus`;
_.HttpRoute=HttpRoute;

let StorableRoute=class StorableRoute extends HttpRoute {
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
StorableRoute.Namespace=`Aventus`;
_.StorableRoute=StorableRoute;

let Animation=class Animation {
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
Animation.Namespace=`Aventus`;
_.Animation=Animation;

let PressManager=class PressManager {
    static globalConfig = {
        delayDblPress: 250,
        delayLongPress: 700,
        offsetDrag: 20
    };
    static setGlobalConfig(options) {
        this.globalConfig = options;
    }
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
    delayDblPress;
    delayLongPress;
    nbPress = 0;
    offsetDrag;
    state = {
        oneActionTriggered: null,
    };
    startPosition = { x: 0, y: 0 };
    customFcts = {};
    timeoutDblPress = 0;
    timeoutLongPress = 0;
    downEventSaved;
    useDblPress = false;
    stopPropagation = () => true;
    pointersRecord = {};
    functionsBinded = {
        downAction: (e) => { },
        upAction: (e) => { },
        moveAction: (e) => { },
        childPressStart: (e) => { },
        childPressEnd: (e) => { },
        childPressMove: (e) => { }
    };
    /**
     * @param {*} options - The options
     * @param {HTMLElement | HTMLElement[]} options.element - The element to manage
     */
    constructor(options) {
        if (options.element === void 0) {
            throw 'You must provide an element';
        }
        this.offsetDrag = PressManager.globalConfig.offsetDrag !== undefined ? PressManager.globalConfig.offsetDrag : 20;
        this.delayLongPress = PressManager.globalConfig.delayLongPress ?? 700;
        this.delayDblPress = PressManager.globalConfig.delayDblPress ?? 150;
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
        if (PressManager.globalConfig.delayDblPress !== undefined) {
            this.delayDblPress = PressManager.globalConfig.delayDblPress;
        }
        if (options.delayDblPress !== undefined) {
            this.delayDblPress = options.delayDblPress;
        }
        if (PressManager.globalConfig.delayLongPress !== undefined) {
            this.delayLongPress = PressManager.globalConfig.delayLongPress;
        }
        if (options.delayLongPress !== undefined) {
            this.delayLongPress = options.delayLongPress;
        }
        if (PressManager.globalConfig.offsetDrag !== undefined) {
            this.offsetDrag = PressManager.globalConfig.offsetDrag;
        }
        if (options.offsetDrag !== undefined) {
            this.offsetDrag = options.offsetDrag;
        }
        if (options.onDblPress !== undefined) {
            this.useDblPress = true;
        }
        if (PressManager.globalConfig.forceDblPress !== undefined) {
            this.useDblPress = PressManager.globalConfig.forceDblPress;
        }
        if (options.forceDblPress !== undefined) {
            this.useDblPress = options.forceDblPress;
        }
        if (typeof PressManager.globalConfig.stopPropagation == 'function') {
            this.stopPropagation = PressManager.globalConfig.stopPropagation;
        }
        else if (options.stopPropagation === false) {
            this.stopPropagation = () => false;
        }
        if (typeof options.stopPropagation == 'function') {
            this.stopPropagation = options.stopPropagation;
        }
        else if (options.stopPropagation === false) {
            this.stopPropagation = () => false;
        }
        if (!options.buttonAllowed)
            options.buttonAllowed = PressManager.globalConfig.buttonAllowed;
        if (!options.buttonAllowed)
            options.buttonAllowed = [0];
        if (!options.onEvent)
            options.onEvent = PressManager.globalConfig.onEvent;
    }
    bindAllFunction() {
        this.functionsBinded.downAction = this.downAction.bind(this);
        this.functionsBinded.moveAction = this.moveAction.bind(this);
        this.functionsBinded.upAction = this.upAction.bind(this);
        this.functionsBinded.childPressStart = this.childPressStart.bind(this);
        this.functionsBinded.childPressEnd = this.childPressEnd.bind(this);
        this.functionsBinded.childPressMove = this.childPressMove.bind(this);
    }
    init() {
        this.bindAllFunction();
        this.element.addEventListener("pointerdown", this.functionsBinded.downAction);
        this.element.addEventListener("touchstart", this.functionsBinded.downAction);
        this.element.addEventListener("trigger_pointer_pressstart", this.functionsBinded.childPressStart);
        this.element.addEventListener("trigger_pointer_pressend", this.functionsBinded.childPressEnd);
        this.element.addEventListener("trigger_pointer_pressmove", this.functionsBinded.childPressMove);
    }
    identifyEvent(touch) {
        if ('Touch' in window && touch instanceof Touch)
            return touch.identifier;
        return touch.pointerId;
    }
    registerEvent(ev) {
        if ('TouchEvent' in window && ev instanceof TouchEvent) {
            for (let touch of ev.targetTouches) {
                const id = this.identifyEvent(touch);
                if (this.pointersRecord[id]) {
                    return false;
                }
                this.pointersRecord[id] = ev;
            }
            return true;
        }
        else {
            const id = this.identifyEvent(ev);
            if (this.pointersRecord[id]) {
                return false;
            }
            this.pointersRecord[id] = ev;
            return true;
        }
    }
    unregisterEvent(ev) {
        let result = true;
        if ('TouchEvent' in window && ev instanceof TouchEvent) {
            for (let touch of ev.changedTouches) {
                const id = this.identifyEvent(touch);
                if (!this.pointersRecord[id]) {
                    result = false;
                }
                else {
                    delete this.pointersRecord[id];
                }
            }
        }
        else {
            const id = this.identifyEvent(ev);
            if (!this.pointersRecord[id]) {
                result = false;
            }
            else {
                delete this.pointersRecord[id];
            }
        }
        return result;
    }
    genericDownAction(state, e) {
        this.downEventSaved = e;
        if (this.options.onLongPress) {
            this.timeoutLongPress = setTimeout(() => {
                if (!state.oneActionTriggered) {
                    if (this.options.onLongPress) {
                        if (this.options.onLongPress(e, this) !== false) {
                            state.oneActionTriggered = this;
                        }
                    }
                }
            }, this.delayLongPress);
        }
    }
    downAction(ev) {
        const isFirst = Object.values(this.pointersRecord).length == 0;
        if (!this.registerEvent(ev)) {
            if (this.stopPropagation()) {
                ev.stopImmediatePropagation();
            }
            return;
        }
        const e = new NormalizedEvent(ev);
        if (this.options.onEvent) {
            this.options.onEvent(e);
        }
        if (e.button != undefined && !this.options.buttonAllowed?.includes(e.button)) {
            this.unregisterEvent(ev);
            return;
        }
        if (this.stopPropagation()) {
            e.stopImmediatePropagation();
        }
        this.customFcts = {};
        if (this.nbPress == 0 && isFirst) {
            this.state.oneActionTriggered = null;
            clearTimeout(this.timeoutDblPress);
        }
        this.startPosition = { x: e.pageX, y: e.pageY };
        if (isFirst) {
            document.addEventListener("pointerup", this.functionsBinded.upAction);
            document.addEventListener("pointercancel", this.functionsBinded.upAction);
            document.addEventListener("touchend", this.functionsBinded.upAction);
            document.addEventListener("touchcancel", this.functionsBinded.upAction);
            document.addEventListener("pointermove", this.functionsBinded.moveAction);
        }
        this.genericDownAction(this.state, e);
        if (this.options.onPressStart) {
            this.options.onPressStart(e, this);
            this.lastEmitEvent = e;
            // this.emitTriggerFunctionParent("pressstart", e);
        }
        this.emitTriggerFunction("pressstart", e);
    }
    genericUpAction(state, e) {
        clearTimeout(this.timeoutLongPress);
        if (state.oneActionTriggered == this) {
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
                    if (!state.oneActionTriggered) {
                        this.nbPress = 0;
                        if (this.options.onDblPress) {
                            if (this.options.onDblPress(e, this) !== false) {
                                state.oneActionTriggered = this;
                            }
                        }
                    }
                }
                else if (this.nbPress == 1) {
                    this.timeoutDblPress = setTimeout(() => {
                        this.nbPress = 0;
                        if (!state.oneActionTriggered) {
                            if (this.options.onPress) {
                                if (this.options.onPress(e, this) !== false) {
                                    state.oneActionTriggered = this;
                                }
                            }
                        }
                    }, this.delayDblPress);
                }
            }
            else {
                if (!state.oneActionTriggered) {
                    if (this.options.onPress) {
                        if (this.options.onPress(e, this) !== false) {
                            state.oneActionTriggered = this;
                        }
                    }
                }
            }
        }
    }
    upAction(ev) {
        if (!this.unregisterEvent(ev)) {
            if (this.stopPropagation()) {
                ev.stopImmediatePropagation();
            }
            return;
        }
        const e = new NormalizedEvent(ev);
        if (this.options.onEvent) {
            this.options.onEvent(e);
        }
        if (this.stopPropagation()) {
            e.stopImmediatePropagation();
        }
        if (Object.values(this.pointersRecord).length == 0) {
            document.removeEventListener("pointerup", this.functionsBinded.upAction);
            document.removeEventListener("pointercancel", this.functionsBinded.upAction);
            document.removeEventListener("touchend", this.functionsBinded.upAction);
            document.removeEventListener("touchcancel", this.functionsBinded.upAction);
            document.removeEventListener("pointermove", this.functionsBinded.moveAction);
        }
        this.genericUpAction(this.state, e);
        if (this.options.onPressEnd) {
            this.options.onPressEnd(e, this);
            this.lastEmitEvent = e;
            // this.emitTriggerFunctionParent("pressend", e);
        }
        this.emitTriggerFunction("pressend", e);
    }
    genericMoveAction(state, e) {
        if (!state.oneActionTriggered) {
            let xDist = e.pageX - this.startPosition.x;
            let yDist = e.pageY - this.startPosition.y;
            let distance = Math.sqrt(xDist * xDist + yDist * yDist);
            if (distance > this.offsetDrag && this.downEventSaved) {
                if (this.options.onDragStart) {
                    if (this.options.onDragStart(this.downEventSaved, this) !== false) {
                        state.oneActionTriggered = this;
                    }
                }
            }
        }
        else if (state.oneActionTriggered == this) {
            if (this.options.onDrag) {
                this.options.onDrag(e, this);
            }
            else if (this.customFcts.src && this.customFcts.onDrag) {
                this.customFcts.onDrag(e, this.customFcts.src);
            }
        }
    }
    moveAction(ev) {
        const e = new NormalizedEvent(ev);
        if (this.options.onEvent) {
            this.options.onEvent(e);
        }
        if (this.stopPropagation()) {
            e.stopImmediatePropagation();
        }
        this.genericMoveAction(this.state, e);
        this.lastEmitEvent = e;
        // if(this.options.onDrag) {
        //     this.emitTriggerFunctionParent("pressmove", e);
        this.emitTriggerFunction("pressmove", e);
    }
    childPressStart(e) {
        if (this.lastEmitEvent == e.detail.realEvent)
            return;
        this.genericDownAction(e.detail.state, e.detail.realEvent);
        if (this.options.onPressStart) {
            this.options.onPressStart(e.detail.realEvent, this);
        }
    }
    childPressEnd(e) {
        if (this.lastEmitEvent == e.detail.realEvent)
            return;
        this.genericUpAction(e.detail.state, e.detail.realEvent);
        if (this.options.onPressEnd) {
            this.options.onPressEnd(e.detail.realEvent, this);
        }
    }
    childPressMove(e) {
        if (this.lastEmitEvent == e.detail.realEvent)
            return;
        this.genericMoveAction(e.detail.state, e.detail.realEvent);
    }
    lastEmitEvent;
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
        this.lastEmitEvent = e;
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
            this.element.removeEventListener("trigger_pointer_pressstart", this.functionsBinded.childPressStart);
            this.element.removeEventListener("trigger_pointer_pressend", this.functionsBinded.childPressEnd);
            this.element.removeEventListener("trigger_pointer_pressmove", this.functionsBinded.childPressMove);
            document.removeEventListener("pointerup", this.functionsBinded.upAction);
            document.removeEventListener("pointercancel", this.functionsBinded.upAction);
            document.removeEventListener("pointermove", this.functionsBinded.moveAction);
        }
    }
}
PressManager.Namespace=`Aventus`;
_.PressManager=PressManager;

let DragAndDrop=class DragAndDrop {
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
                transform: () => { },
                delete: (el) => {
                    el.remove();
                }
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
            if (options.shadow.delete !== void 0) {
                this.options.shadow.delete = options.shadow.delete;
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
            return false;
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
        return this.options.onStart(e);
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
            this.options.shadow.delete(draggableElement);
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
        let srcTargets;
        if (typeof this.options.targets == "function") {
            srcTargets = this.options.targets();
        }
        else {
            srcTargets = this.options.targets;
        }
        for (let target of srcTargets) {
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
     * Set targets where to drop
     */
    setTargetsFct(targets) {
        this.options.targets = targets;
    }
    /**
     * Destroy the current drag&drop instance
     */
    destroy() {
        this.pressManager.destroy();
    }
}
DragAndDrop.Namespace=`Aventus`;
_.DragAndDrop=DragAndDrop;

let ResizeObserver=class ResizeObserver {
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
ResizeObserver.Namespace=`Aventus`;
_.ResizeObserver=ResizeObserver;

let Uri=class Uri {
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
        let matches = from.regex.exec(current.toLowerCase());
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
    static normalize(path) {
        const isAbsolute = path.startsWith('/');
        const parts = path.split('/');
        const normalizedParts = [];
        for (let i = 0; i < parts.length; i++) {
            if (parts[i] === '..') {
                normalizedParts.pop();
            }
            else if (parts[i] !== '.' && parts[i] !== '') {
                normalizedParts.push(parts[i]);
            }
        }
        let normalizedPath = normalizedParts.join('/');
        if (isAbsolute) {
            normalizedPath = '/' + normalizedPath;
        }
        return normalizedPath;
    }
}
Uri.Namespace=`Aventus`;
_.Uri=Uri;

let GenericRam=class GenericRam {
    /**
     * The current namespace
     */
    static Namespace = "";
    // public static get Namespace(): string { return ""; }
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
    actionGuard = new ActionGuard();
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
     * Prevent adding Watch element
     */
    removeWatch(element) {
        let byPass = element;
        if (byPass.__isProxy) {
            return byPass.getTarget();
        }
        return element;
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
                    that.mergeObject(oldData, newData, { replaceUndefinedWithKey: true });
                    let result = await that.update(oldData);
                    return result;
                }
                return undefined;
            }
            async updateWithError(newData = {}) {
                const result = new ResultRamWithError();
                let queryId = that.getIdWithError(this);
                if (!queryId.success || !queryId.result) {
                    result.errors = queryId.errors;
                    return result;
                }
                let oldData = that.records.get(queryId.result);
                if (oldData) {
                    that.mergeObject(oldData, newData, { replaceUndefinedWithKey: true });
                    let result = await that.updateWithError(oldData);
                    return result;
                }
                result.errors.push(new RamError(RamErrorCode.noItemInsideRam, "Can't find this item inside the ram"));
                return result;
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
            async deleteWithError() {
                const result = new VoidRamWithError();
                let queryId = that.getIdWithError(this);
                if (!queryId.success || !queryId.result) {
                    result.errors = queryId.errors;
                    return result;
                }
                const queryDelete = await that.deleteByIdWithError(queryId.result);
                result.errors = queryDelete.errors;
                return result;
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
    async addOrUpdateData(item, result) {
        try {
            let idWithError = this.getIdWithError(item);
            if (idWithError.success && idWithError.result !== undefined) {
                let id = idWithError.result;
                if (this.records.has(id)) {
                    let uniqueRecord = this.records.get(id);
                    await this.beforeRecordSet(uniqueRecord);
                    this.mergeObject(uniqueRecord, item);
                    await this.afterRecordSet(uniqueRecord);
                }
                else {
                    let realObject = this.getObjectForRam(item);
                    await this.beforeRecordSet(realObject);
                    this.records.set(id, realObject);
                    await this.afterRecordSet(realObject);
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
    mergeObject(item, objJson, options) {
        if (!item) {
            return;
        }
        if (!options) {
            options = {
                replaceUndefined: true
            };
        }
        Json.classFromJson(item, objJson, options);
    }
    /**
     * Create or update the item
     */
    async save(item, ...args) {
        let action = await this.saveWithError(item, ...args);
        if (action.success) {
            return action.result;
        }
        return undefined;
    }
    /**
     * Create or update the item
     */
    async saveWithError(item, ...args) {
        let action = new ResultRamWithError();
        let resultTemp = await this.getIdWithError(item);
        if (resultTemp.success && resultTemp.result !== undefined) {
            if (resultTemp.result) {
                return this.updateWithError(item, ...args);
            }
            else {
                return this.createWithError(item, ...args);
            }
        }
        else {
            action.errors = resultTemp.errors;
        }
        return action;
    }
    async beforeRecordSet(item) { }
    async afterRecordSet(item) { }
    async beforeRecordDelete(item) { }
    async afterRecordDelete(item) { }
    publish(type, data) {
        let callbacks = [...this.subscribers[type]];
        for (let callback of callbacks) {
            callback(data);
        }
        let sub = this.recordsSubscribers.get(this.getId(data));
        if (sub) {
            let localCallbacks = [...sub[type]];
            for (let localCallback of localCallbacks) {
                localCallback(data);
            }
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
        return this.actionGuard.run(['getByIdWithError', id], async () => {
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
        });
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
        return this.actionGuard.run(['getByIdsWithError', ids], async () => {
            let action = new ResultRamWithError();
            action.result = [];
            await this.beforeGetByIds(ids, action);
            if (action.success) {
                action.result = [];
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
        });
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
        return this.actionGuard.run(['getAllWithError'], async () => {
            let action = new ResultRamWithError();
            action.result = new Map();
            await this.beforeGetAll(action);
            if (action.success) {
                action.result = this.records;
                await this.afterGetAll(action);
            }
            return action;
        });
    }
    ;
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
                action.result = Array.from(result.result.values());
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
        list = this.removeWatch(list);
        let action = new ResultRamWithError();
        action.result = [];
        await this.beforeCreateList(list, action);
        if (action.success) {
            if (action.result.length > 0) {
                list = action.result;
                action.result = [];
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
        item = this.removeWatch(item);
        return this.actionGuard.run(['_create', item], async () => {
            let action = new ResultRamWithError();
            await this.beforeCreateItem(item, fromList, action);
            if (action.success) {
                if (action.result) {
                    item = action.result;
                }
                let resultTemp = this.getIdWithError(item);
                if (resultTemp.success) {
                    await this.addOrUpdateData(item, action);
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
        });
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
        list = this.removeWatch(list);
        let action = new ResultRamWithError();
        action.result = [];
        await this.beforeUpdateList(list, action);
        if (action.success) {
            if (action.result.length > 0) {
                list = action.result;
                action.result = [];
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
        item = this.removeWatch(item);
        return this.actionGuard.run(['_update', item], async () => {
            let action = new ResultRamWithError();
            let resultTemp = await this.getIdWithError(item);
            if (resultTemp.success && resultTemp.result !== undefined) {
                let key = resultTemp.result;
                if (this.records.has(key)) {
                    if (this.records.get(key) == item) {
                        console.warn("You are updateing the same item. You should clone the object first to avoid weird effect");
                    }
                    await this.beforeUpdateItem(item, fromList, action);
                    if (!action.success) {
                        return action;
                    }
                    if (action.result) {
                        item = action.result;
                    }
                    await this.addOrUpdateData(item, action);
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
        });
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
        list = this.removeWatch(list);
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
        item = this.removeWatch(item);
        return this.actionGuard.run(['_delete', item], async () => {
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
                    this.beforeRecordDelete(oldItem);
                    this.records.delete(key);
                    this.afterRecordDelete(oldItem);
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
        });
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
GenericRam.Namespace=`Aventus`;
_.GenericRam=GenericRam;

let Ram=class Ram extends GenericRam {
}
Ram.Namespace=`Aventus`;
_.Ram=Ram;

let State=class State {
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
State.Namespace=`Aventus`;
_.State=State;

let EmptyState=class EmptyState extends State {
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
EmptyState.Namespace=`Aventus`;
_.EmptyState=EmptyState;

let StateManager=class StateManager {
    subscribers = {};
    static canBeActivate(statePattern, stateName) {
        let stateInfo = Uri.prepare(statePattern);
        return stateInfo.regex.test(stateName);
    }
    activeState;
    changeStateMutex = new Mutex();
    canChangeStateCbs = [];
    afterStateChanged = new Callback();
    /**
     * Subscribe actions for a state or a state list
     */
    subscribe(statePatterns, callbacks, autoActiveState = true) {
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
                    if (this.subscribers[statePattern].isActive && this.activeState && autoActiveState) {
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
     *
     */
    activateAfterSubscribe(statePatterns, callbacks) {
        if (!Array.isArray(statePatterns)) {
            statePatterns = [statePatterns];
        }
        for (let statePattern of statePatterns) {
            if (callbacks.active) {
                if (!Array.isArray(callbacks.active)) {
                    callbacks.active = [callbacks.active];
                }
                for (let activeFct of callbacks.active) {
                    if (this.subscribers[statePattern].isActive && this.activeState) {
                        let slugs = Uri.getParams(this.subscribers[statePattern], this.activeState.name);
                        if (slugs) {
                            activeFct(this.activeState, slugs);
                        }
                    }
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
    canChangeState(cb) {
        this.canChangeStateCbs.push(cb);
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
            for (let cb of this.canChangeStateCbs) {
                if (!(await cb(stateToUse))) {
                    return false;
                }
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
                            let callbacks = [...subscriber.callbacks.inactive];
                            for (let callback of callbacks) {
                                callback(oldState, stateToUse, oldSlugNotNull);
                            }
                        }
                    }
                    for (let trigger of triggerActive) {
                        let callbacks = [...trigger.subscriber.callbacks.active];
                        for (let callback of callbacks) {
                            callback(stateToUse, trigger.params);
                        }
                    }
                    for (let trigger of inactiveToActive) {
                        trigger.subscriber.isActive = true;
                        let callbacks = [...trigger.subscriber.callbacks.active];
                        for (let callback of callbacks) {
                            callback(stateToUse, trigger.params);
                        }
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
                        let callbacks = [...this.subscribers[key].callbacks.active];
                        for (let callback of callbacks) {
                            callback(stateToUse, slugsNotNull);
                        }
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
StateManager.Namespace=`Aventus`;
_.StateManager=StateManager;

let Template=class Template {
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
        document.adoptNode(content);
        customElements.upgrade(content);
        return new TemplateInstance(component, content, this.actions, this.loops, this.ifs);
    }
}
Template.Namespace=`Aventus`;
_.Template=Template;

let WebComponent=class WebComponent extends HTMLElement {
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
    __signalActions = {};
    __signals = {};
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
        this.__registerSignalsActions();
        this.__createStates();
        this.__subscribeState();
        if (this.constructor == WebComponent) {
            throw "can't instanciate an abstract class";
        }
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
        for (let name in this.__signals) {
            this.__signals[name].destroy();
        }
        // TODO add missing info for destructor();
        this.postDestruction();
        this.destructChildren();
    }
    destructChildren() {
        const recu = (el) => {
            for (let child of Array.from(el.children)) {
                if (child instanceof WebComponent) {
                    child.destructor();
                }
                else if (child instanceof HTMLElement) {
                    recu(child);
                }
            }
            if (el.shadowRoot) {
                for (let child of Array.from(el.shadowRoot.children)) {
                    if (child instanceof WebComponent) {
                        child.destructor();
                    }
                    else if (child instanceof HTMLElement) {
                        recu(child);
                    }
                }
            }
        };
        recu(this);
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
                    try {
                        let action = this.__watchActionsCb[path.split(".")[0]] || this.__watchActionsCb[path.split("[")[0]];
                        action(type, path, element);
                    }
                    catch (e) {
                        console.error(e);
                    }
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
    __addSignalActions(name, fct) {
        this.__signalActions[name] = () => {
            fct(this);
        };
    }
    __registerSignalsActions() {
        if (Object.keys(this.__signals).length > 0) {
            const defaultValues = {};
            for (let name in this.__signals) {
                this.__registerSignalsAction(name);
                this.__defaultValuesSignal(defaultValues);
            }
            for (let name in defaultValues) {
                this.__signals[name].value = defaultValues[name];
            }
        }
    }
    __registerSignalsAction(name) {
        this.__signals[name] = new Signal(undefined, () => {
            if (this.__signalActions[name]) {
                this.__signalActions[name]();
            }
        });
    }
    __defaultValuesSignal(s) { }
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
        addStyle("@default");
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
        // customElements.upgrade(shadowRoot);
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
            this.__activateState();
            this.__templateInstance?.render();
            this.__removeNoAnimations();
        }
        else {
            setTimeout(() => {
                this.postConnect();
            });
        }
    }
    disconnectedCallback() {
        setTimeout(() => {
            this.postDisonnect();
        });
    }
    __onReadyCb = [];
    onReady(cb) {
        if (this._isReady) {
            cb();
        }
        else {
            this.__onReadyCb.push(cb);
        }
    }
    __setReady() {
        this._isReady = true;
        this.dispatchEvent(new CustomEvent('postCreationDone'));
        let cbs = [...this.__onReadyCb];
        for (let cb of cbs) {
            cb();
        }
        this.__onReadyCb = [];
    }
    __removeNoAnimations() {
        if (document.readyState !== "loading") {
            setTimeout(() => {
                this.postCreation();
                this.__setReady();
                this.shadowRoot.adoptedStyleSheets = Object.values(this.__getStatic().__styleSheets);
                document.removeEventListener("DOMContentLoaded", this.__removeNoAnimations);
                this.postConnect();
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
                delete this[prop];
                this[prop] = false;
            }
        }
        else {
            if (this.hasAttribute(prop)) {
                let value = this.getAttribute(prop);
                delete this[prop];
                this[prop] = value;
            }
            else if (Object.hasOwn(this, prop)) {
                const value = this[prop];
                delete this[prop];
                this[prop] = value;
            }
        }
    }
    __correctGetter(prop) {
        if (Object.hasOwn(this, prop)) {
            const value = this[prop];
            delete this[prop];
            this[prop] = value;
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
                    managerClass.subscribe(route, el, false);
                }
            }
        }
    }
    __activateState() {
        for (let route in this.__statesList) {
            for (const managerClass of this.__statesList[route].keys()) {
                let el = this.__statesList[route].get(managerClass);
                if (el) {
                    managerClass.activateAfterSubscribe(route, el);
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
        if (typeof d == 'string') {
            d = this.stringToDate(d);
        }
        if (d instanceof Date) {
            return new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
        }
        return null;
    }
    dateTimeToString(dt) {
        if (typeof dt == 'string') {
            dt = this.stringToDate(dt);
        }
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
        return this.getAttribute(name)?.replace(/&avquot;/g, '"') ?? undefined;
    }
    setStringAttr(name, val) {
        if (val === undefined || val === null) {
            this.removeAttribute(name);
        }
        else {
            this.setAttribute(name, (val + "").replace(/"/g, '&avquot;'));
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
    /**
     * Remove a component from the dom
     * If desctruct is set to true, the component will be fully destroyed
     */
    remove(destruct = true) {
        super.remove();
        if (destruct) {
            this.destructor();
        }
    }
    /**
     * Function triggered when the component is destroyed
     */
    postDestruction() { }
    /**
     * Function triggered the first time the component is rendering inside DOM
     */
    postCreation() { }
    /**
    * Function triggered each time the component is rendering inside DOM
    */
    postConnect() { }
    /**
    * Function triggered each time the component is removed from the DOM
    */
    postDisonnect() { }
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
    /**
     * Get active element from the shadowroot or the document
     */
    getActiveElement(document) {
        return ElementExtension.getActiveElement(document ?? this.shadowRoot);
    }
}
WebComponent.Namespace=`Aventus`;
_.WebComponent=WebComponent;

let WebComponentInstance=class WebComponentInstance {
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
        if (current && current.prototype instanceof WebComponent) {
            return new current();
        }
        return null;
    }
}
WebComponentInstance.Namespace=`Aventus`;
_.WebComponentInstance=WebComponentInstance;

let TemplateContext=class TemplateContext {
    data = {};
    comp;
    computeds = [];
    watch;
    registry;
    isDestroyed = false;
    constructor(component, data = {}, parentContext, registry) {
        this.comp = component;
        this.registry = registry;
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
    registerLoop(dataName, _indexValue, _indexName, indexName, itemName, onThis) {
        this.watch[_indexName] = _indexValue;
        let getItems;
        let mustBeRecomputed = /if|switch|\?|\[.+?\]/g.test(dataName);
        let _class = mustBeRecomputed ? Computed : ComputedNoRecomputed;
        if (!onThis) {
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
            let element = items[index];
            if (element === undefined && (Array.isArray(items) || !items)) {
                if (this.registry) {
                    let indexNb = Number(_getIndex.value);
                    if (!isNaN(indexNb)) {
                        this.registry.templates[indexNb].destructor();
                        this.registry.templates.splice(indexNb, 1);
                        for (let i = indexNb; i < this.registry.templates.length; i++) {
                            this.registry.templates[i].context.decreaseIndex(_indexName);
                        }
                    }
                }
            }
            return element;
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
        this.isDestroyed = true;
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
    updateWatch(name, value, dones) {
        if (Watcher.is(this.watch[name])) {
            this.watch[name].__injectedDones(dones);
        }
        this.watch[name] = value;
    }
    normalizePath(path) {
        path = path.replace(/^this\./, '');
        const regex = /\[(.*?)\]/g;
        let m;
        while ((m = regex.exec(path)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            let name = m[1];
            let result = getValueFromObject(name, this.data);
            if (result !== undefined) {
                path = path.replace(m[0], `[${result}]`);
            }
        }
        return path;
    }
    getValueFromItem(name) {
        if (!name)
            return undefined;
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
TemplateContext.Namespace=`Aventus`;
_.TemplateContext=TemplateContext;

let TemplateInstance=class TemplateInstance {
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
    isDestroyed = false;
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
        this.isDestroyed = true;
        for (let name in this.loopRegisteries) {
            let register = this.loopRegisteries[name];
            for (let item of register.templates) {
                item.destructor();
            }
            for (let item of register.computeds) {
                item.destroy();
            }
            if (register.unsub) {
                register.unsub();
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
            try {
                return edit.fct(this.context);
            }
            catch (e) {
            }
            return {};
        });
        computed.subscribe((action, path, value, dones) => {
            for (let key in computed.value) {
                let newValue = computed.value[key];
                this.context.updateWatch(key, newValue, dones);
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
                    try {
                        return event.fct(this.context, args);
                    }
                    catch (e) {
                        console.error(e);
                    }
                });
            }
        }
        else {
            for (let el of this._components[event.id]) {
                el.addEventListener(event.eventName, (e) => {
                    try {
                        event.fct(e, this.context);
                    }
                    catch (e) {
                        console.error(e);
                    }
                });
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
            try {
                return change.fct(this.context);
            }
            catch (e) {
                if (e instanceof TypeError && e.message.includes("undefined")) {
                    if (computed instanceof ComputedNoRecomputed) {
                        computed.isInit = false;
                    }
                }
                else {
                    console.error(e);
                }
            }
            return "";
        });
        let timeout;
        computed.subscribe((action, path, value, dones) => {
            clearTimeout(timeout);
            // add timeout to group change that append on the same frame (for example index update)
            timeout = setTimeout(() => {
                if (computed.isDestroy)
                    return;
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
            try {
                return injection.inject(this.context);
            }
            catch (e) {
                if (e instanceof TypeError && e.message.includes("undefined")) {
                    if (computed instanceof ComputedNoRecomputed) {
                        computed.isInit = false;
                    }
                }
                else {
                    console.error(e);
                }
            }
        });
        this.computeds.push(computed);
        computed.subscribe((action, path, value, dones) => {
            for (const el of this._components[injection.id]) {
                if (el instanceof WebComponent && el.__watch && Object.hasOwn(el.__watch, injection.injectionName)) {
                    el.__watch.__injectedDones(dones);
                }
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
            try {
                return binding.inject(this.context);
            }
            catch (e) {
                if (e instanceof TypeError && e.message.includes("undefined")) {
                    if (computed instanceof ComputedNoRecomputed) {
                        computed.isInit = false;
                    }
                }
                else {
                    console.error(e);
                }
            }
        });
        this.computeds.push(computed);
        computed.subscribe((action, path, value, dones) => {
            if (isLocalChange)
                return;
            for (const el of this._components[binding.id]) {
                if (el instanceof WebComponent && el.__watch && Object.hasOwn(el.__watch, binding.injectionName)) {
                    el.__watch.__injectedDones(dones);
                }
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
    resetLoopComplex(anchorId) {
        if (this.loopRegisteries[anchorId]) {
            for (let item of this.loopRegisteries[anchorId].templates) {
                item.destructor();
            }
            for (let item of this.loopRegisteries[anchorId].computeds) {
                item.destroy();
            }
        }
        this.loopRegisteries[anchorId] = {
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
        this.resetLoopComplex(loop.anchorId);
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
            let context = new TemplateContext(this.component, result[i], this.context, this.loopRegisteries[loop.anchorId]);
            let content = loop.template.template?.content.cloneNode(true);
            document.adoptNode(content);
            customElements.upgrade(content);
            let actions = loop.template.actions;
            let instance = new TemplateInstance(this.component, content, actions, loop.template.loops, loop.template.ifs, context);
            instance.render();
            anchor.parentNode?.insertBefore(instance.content, anchor);
            this.loopRegisteries[loop.anchorId].templates.push(instance);
        }
    }
    resetLoopSimple(anchorId, basePath) {
        let register = this.loopRegisteries[anchorId];
        if (register?.unsub) {
            register.unsub();
        }
        this.resetLoopComplex(anchorId);
    }
    renderLoopSimple(loop, simple) {
        let onThis = simple.data.startsWith("this.");
        let basePath = this.context.normalizePath(simple.data);
        this.resetLoopSimple(loop.anchorId, basePath);
        let getElements = () => this.context.getValueFromItem(basePath);
        let elements = getElements();
        if (!elements) {
            let currentPath = basePath;
            while (currentPath != '' && !elements) {
                let splittedPath = currentPath.split(".");
                splittedPath.pop();
                currentPath = splittedPath.join(".");
                elements = this.context.getValueFromItem(currentPath);
            }
            if (!elements && onThis) {
                const splittedPath = basePath.split(".");
                const firstPart = splittedPath.length > 0 ? splittedPath[0] : null;
                if (firstPart && this.component.__signals[firstPart]) {
                    elements = this.component.__signals[firstPart];
                }
                else {
                    elements = this.component.__watch;
                }
            }
            if (!elements || !(elements.__isProxy || elements instanceof Signal)) {
                debugger;
            }
            const subTemp = (action, path, value) => {
                if (basePath.startsWith(path) || path == "*") {
                    elements.unsubscribe(subTemp);
                    this.renderLoopSimple(loop, simple);
                    return;
                }
            };
            elements.subscribe(subTemp);
            return;
        }
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
                        let context = new TemplateContext(this.component, {}, this.context, registry);
                        context.registerLoop(basePath, index, indexName, simple.index, simple.item, onThis);
                        let content = loop.template.template?.content.cloneNode(true);
                        document.adoptNode(content);
                        customElements.upgrade(content);
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
            this.loopRegisteries[loop.anchorId].unsub = () => {
                elements.unsubscribe(sub);
            };
            elements.subscribe(sub);
        }
        let anchor = this._components[loop.anchorId][0];
        for (let i = 0; i < keys.length; i++) {
            let context = new TemplateContext(this.component, {}, this.context, this.loopRegisteries[loop.anchorId]);
            context.registerLoop(basePath, i, indexName, simple.index, simple.item, onThis);
            let content = loop.template.template?.content.cloneNode(true);
            document.adoptNode(content);
            customElements.upgrade(content);
            let actions = loop.template.actions;
            let instance = new TemplateInstance(this.component, content, actions, loop.template.loops, loop.template.ifs, context);
            instance.render();
            anchor.parentNode?.insertBefore(instance.content, anchor);
            this.loopRegisteries[loop.anchorId].templates.push(instance);
        }
    }
    renderIf(_if) {
        // this.renderIfMemory(_if);
        this.renderIfRecreate(_if);
    }
    renderIfMemory(_if) {
        let computeds = [];
        let instances = [];
        if (!this._components[_if.anchorId] || this._components[_if.anchorId].length == 0)
            return;
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
            document.adoptNode(content);
            customElements.upgrade(content);
            let actions = part.template.actions;
            let instance = new TemplateInstance(this.component, content, actions, part.template.loops, part.template.ifs, context);
            instances.push(instance);
            instance.render();
        }
        calculateActive();
    }
    renderIfRecreate(_if) {
        let computeds = [];
        if (!this._components[_if.anchorId] || this._components[_if.anchorId].length == 0)
            return;
        let anchor = this._components[_if.anchorId][0];
        let currentActive = undefined;
        let currentActiveNb = -1;
        const createContext = () => {
            if (currentActiveNb < 0 || currentActiveNb > _if.parts.length - 1) {
                currentActive = undefined;
                return;
            }
            const part = _if.parts[currentActiveNb];
            let context = new TemplateContext(this.component, {}, this.context);
            let content = part.template.template?.content.cloneNode(true);
            document.adoptNode(content);
            customElements.upgrade(content);
            let actions = part.template.actions;
            let instance = new TemplateInstance(this.component, content, actions, part.template.loops, part.template.ifs, context);
            currentActive = instance;
            instance.render();
            anchor.parentNode?.insertBefore(currentActive.content, anchor);
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
        }
        const calculateActive = () => {
            let newActive = -1;
            for (let i = 0; i < _if.parts.length; i++) {
                if (computeds[i].value) {
                    newActive = i;
                    break;
                }
            }
            if (newActive == currentActiveNb) {
                return;
            }
            if (currentActive) {
                currentActive.destructor();
            }
            currentActiveNb = newActive;
            createContext();
        };
        calculateActive();
    }
}
TemplateInstance.Namespace=`Aventus`;
_.TemplateInstance=TemplateInstance;


for(let key in _) { Aventus[key] = _[key] }
})(Aventus);

var MaterialIcon;
(MaterialIcon||(MaterialIcon = {}));
(function (MaterialIcon) {
const moduleName = `MaterialIcon`;
const _ = {};


let _n;
let IconList= {
    '10k': '10k',
    '10mp': '10mp',
    '11mp': '11mp',
    '123': '123',
    '12mp': '12mp',
    '13mp': '13mp',
    '14mp': '14mp',
    '15mp': '15mp',
    '16mp': '16mp',
    '17mp': '17mp',
    '18_up_rating': '18_up_rating',
    '18mp': '18mp',
    '19mp': '19mp',
    '1k': '1k',
    '1k_plus': '1k_plus',
    '1x_mobiledata': '1x_mobiledata',
    '1x_mobiledata_badge': '1x_mobiledata_badge',
    '20mp': '20mp',
    '21mp': '21mp',
    '22mp': '22mp',
    '23mp': '23mp',
    '24fps_select': '24fps_select',
    '24mp': '24mp',
    '2d': '2d',
    '2k': '2k',
    '2k_plus': '2k_plus',
    '2mp': '2mp',
    '30fps': '30fps',
    '30fps_select': '30fps_select',
    '360': '360',
    '3d_rotation': '3d_rotation',
    '3g_mobiledata': '3g_mobiledata',
    '3g_mobiledata_badge': '3g_mobiledata_badge',
    '3k': '3k',
    '3k_plus': '3k_plus',
    '3mp': '3mp',
    '3p': '3p',
    '4g_mobiledata': '4g_mobiledata',
    '4g_mobiledata_badge': '4g_mobiledata_badge',
    '4g_plus_mobiledata': '4g_plus_mobiledata',
    '4k': '4k',
    '4k_plus': '4k_plus',
    '4mp': '4mp',
    '50mp': '50mp',
    '5g': '5g',
    '5g_mobiledata_badge': '5g_mobiledata_badge',
    '5k': '5k',
    '5k_plus': '5k_plus',
    '5mp': '5mp',
    '60fps': '60fps',
    '60fps_select': '60fps_select',
    '6_ft_apart': '6_ft_apart',
    '6k': '6k',
    '6k_plus': '6k_plus',
    '6mp': '6mp',
    '7k': '7k',
    '7k_plus': '7k_plus',
    '7mp': '7mp',
    '8k': '8k',
    '8k_plus': '8k_plus',
    '8mp': '8mp',
    '9k': '9k',
    '9k_plus': '9k_plus',
    '9mp': '9mp',
    'abc': 'abc',
    'ac_unit': 'ac_unit',
    'accessibility': 'accessibility',
    'accessibility_new': 'accessibility_new',
    'accessible': 'accessible',
    'accessible_forward': 'accessible_forward',
    'account_balance': 'account_balance',
    'account_balance_wallet': 'account_balance_wallet',
    'account_box': 'account_box',
    'account_child': 'account_child',
    'account_child_invert': 'account_child_invert',
    'account_circle': 'account_circle',
    'account_circle_off': 'account_circle_off',
    'account_tree': 'account_tree',
    'action_key': 'action_key',
    'activity_zone': 'activity_zone',
    'acute': 'acute',
    'ad': 'ad',
    'ad_group': 'ad_group',
    'ad_group_off': 'ad_group_off',
    'ad_off': 'ad_off',
    'ad_units': 'ad_units',
    'adaptive_audio_mic': 'adaptive_audio_mic',
    'adaptive_audio_mic_off': 'adaptive_audio_mic_off',
    'adb': 'adb',
    'add': 'add',
    'add_2': 'add_2',
    'add_a_photo': 'add_a_photo',
    'add_ad': 'add_ad',
    'add_alert': 'add_alert',
    'add_box': 'add_box',
    'add_business': 'add_business',
    'add_call': 'add_call',
    'add_card': 'add_card',
    'add_chart': 'add_chart',
    'add_circle': 'add_circle',
    'add_column_left': 'add_column_left',
    'add_column_right': 'add_column_right',
    'add_comment': 'add_comment',
    'add_diamond': 'add_diamond',
    'add_home': 'add_home',
    'add_home_work': 'add_home_work',
    'add_link': 'add_link',
    'add_location': 'add_location',
    'add_location_alt': 'add_location_alt',
    'add_moderator': 'add_moderator',
    'add_notes': 'add_notes',
    'add_photo_alternate': 'add_photo_alternate',
    'add_reaction': 'add_reaction',
    'add_road': 'add_road',
    'add_row_above': 'add_row_above',
    'add_row_below': 'add_row_below',
    'add_shopping_cart': 'add_shopping_cart',
    'add_task': 'add_task',
    'add_to_drive': 'add_to_drive',
    'add_to_home_screen': 'add_to_home_screen',
    'add_to_queue': 'add_to_queue',
    'add_triangle': 'add_triangle',
    'adf_scanner': 'adf_scanner',
    'adjust': 'adjust',
    'admin_meds': 'admin_meds',
    'admin_panel_settings': 'admin_panel_settings',
    'ads_click': 'ads_click',
    'agender': 'agender',
    'agriculture': 'agriculture',
    'air': 'air',
    'air_freshener': 'air_freshener',
    'air_purifier': 'air_purifier',
    'air_purifier_gen': 'air_purifier_gen',
    'airline_seat_flat': 'airline_seat_flat',
    'airline_seat_flat_angled': 'airline_seat_flat_angled',
    'airline_seat_individual_suite': 'airline_seat_individual_suite',
    'airline_seat_legroom_extra': 'airline_seat_legroom_extra',
    'airline_seat_legroom_normal': 'airline_seat_legroom_normal',
    'airline_seat_legroom_reduced': 'airline_seat_legroom_reduced',
    'airline_seat_recline_extra': 'airline_seat_recline_extra',
    'airline_seat_recline_normal': 'airline_seat_recline_normal',
    'airline_stops': 'airline_stops',
    'airlines': 'airlines',
    'airplane_ticket': 'airplane_ticket',
    'airplanemode_inactive': 'airplanemode_inactive',
    'airplay': 'airplay',
    'airport_shuttle': 'airport_shuttle',
    'airware': 'airware',
    'airwave': 'airwave',
    'alarm': 'alarm',
    'alarm_add': 'alarm_add',
    'alarm_off': 'alarm_off',
    'alarm_on': 'alarm_on',
    'alarm_smart_wake': 'alarm_smart_wake',
    'album': 'album',
    'align_center': 'align_center',
    'align_end': 'align_end',
    'align_flex_center': 'align_flex_center',
    'align_flex_end': 'align_flex_end',
    'align_flex_start': 'align_flex_start',
    'align_horizontal_center': 'align_horizontal_center',
    'align_horizontal_left': 'align_horizontal_left',
    'align_horizontal_right': 'align_horizontal_right',
    'align_items_stretch': 'align_items_stretch',
    'align_justify_center': 'align_justify_center',
    'align_justify_flex_end': 'align_justify_flex_end',
    'align_justify_flex_start': 'align_justify_flex_start',
    'align_justify_space_around': 'align_justify_space_around',
    'align_justify_space_between': 'align_justify_space_between',
    'align_justify_space_even': 'align_justify_space_even',
    'align_justify_stretch': 'align_justify_stretch',
    'align_self_stretch': 'align_self_stretch',
    'align_space_around': 'align_space_around',
    'align_space_between': 'align_space_between',
    'align_space_even': 'align_space_even',
    'align_start': 'align_start',
    'align_stretch': 'align_stretch',
    'align_vertical_bottom': 'align_vertical_bottom',
    'align_vertical_center': 'align_vertical_center',
    'align_vertical_top': 'align_vertical_top',
    'all_inbox': 'all_inbox',
    'all_inclusive': 'all_inclusive',
    'all_match': 'all_match',
    'all_out': 'all_out',
    'allergies': 'allergies',
    'allergy': 'allergy',
    'alt_route': 'alt_route',
    'alternate_email': 'alternate_email',
    'altitude': 'altitude',
    'ambulance': 'ambulance',
    'amend': 'amend',
    'amp_stories': 'amp_stories',
    'analytics': 'analytics',
    'anchor': 'anchor',
    'android': 'android',
    'animated_images': 'animated_images',
    'animation': 'animation',
    'aod': 'aod',
    'aod_tablet': 'aod_tablet',
    'aod_watch': 'aod_watch',
    'apartment': 'apartment',
    'api': 'api',
    'apk_document': 'apk_document',
    'apk_install': 'apk_install',
    'app_badging': 'app_badging',
    'app_blocking': 'app_blocking',
    'app_promo': 'app_promo',
    'app_registration': 'app_registration',
    'app_shortcut': 'app_shortcut',
    'apparel': 'apparel',
    'approval': 'approval',
    'approval_delegation': 'approval_delegation',
    'apps': 'apps',
    'apps_outage': 'apps_outage',
    'aq': 'aq',
    'aq_indoor': 'aq_indoor',
    'ar_on_you': 'ar_on_you',
    'ar_stickers': 'ar_stickers',
    'architecture': 'architecture',
    'archive': 'archive',
    'area_chart': 'area_chart',
    'arming_countdown': 'arming_countdown',
    'arrow_and_edge': 'arrow_and_edge',
    'arrow_back': 'arrow_back',
    'arrow_back_2': 'arrow_back_2',
    'arrow_back_ios': 'arrow_back_ios',
    'arrow_back_ios_new': 'arrow_back_ios_new',
    'arrow_circle_down': 'arrow_circle_down',
    'arrow_circle_left': 'arrow_circle_left',
    'arrow_circle_right': 'arrow_circle_right',
    'arrow_circle_up': 'arrow_circle_up',
    'arrow_cool_down': 'arrow_cool_down',
    'arrow_downward': 'arrow_downward',
    'arrow_downward_alt': 'arrow_downward_alt',
    'arrow_drop_down': 'arrow_drop_down',
    'arrow_drop_down_circle': 'arrow_drop_down_circle',
    'arrow_drop_up': 'arrow_drop_up',
    'arrow_forward': 'arrow_forward',
    'arrow_forward_ios': 'arrow_forward_ios',
    'arrow_insert': 'arrow_insert',
    'arrow_left': 'arrow_left',
    'arrow_left_alt': 'arrow_left_alt',
    'arrow_menu_close': 'arrow_menu_close',
    'arrow_menu_open': 'arrow_menu_open',
    'arrow_or_edge': 'arrow_or_edge',
    'arrow_outward': 'arrow_outward',
    'arrow_range': 'arrow_range',
    'arrow_right': 'arrow_right',
    'arrow_right_alt': 'arrow_right_alt',
    'arrow_selector_tool': 'arrow_selector_tool',
    'arrow_split': 'arrow_split',
    'arrow_top_left': 'arrow_top_left',
    'arrow_top_right': 'arrow_top_right',
    'arrow_upload_progress': 'arrow_upload_progress',
    'arrow_upload_ready': 'arrow_upload_ready',
    'arrow_upward': 'arrow_upward',
    'arrow_upward_alt': 'arrow_upward_alt',
    'arrow_warm_up': 'arrow_warm_up',
    'arrows_input': 'arrows_input',
    'arrows_more_down': 'arrows_more_down',
    'arrows_more_up': 'arrows_more_up',
    'arrows_output': 'arrows_output',
    'arrows_outward': 'arrows_outward',
    'art_track': 'art_track',
    'article': 'article',
    'article_shortcut': 'article_shortcut',
    'artist': 'artist',
    'aspect_ratio': 'aspect_ratio',
    'assignment': 'assignment',
    'assignment_add': 'assignment_add',
    'assignment_ind': 'assignment_ind',
    'assignment_late': 'assignment_late',
    'assignment_return': 'assignment_return',
    'assignment_returned': 'assignment_returned',
    'assignment_turned_in': 'assignment_turned_in',
    'assist_walker': 'assist_walker',
    'assistant_device': 'assistant_device',
    'assistant_direction': 'assistant_direction',
    'assistant_navigation': 'assistant_navigation',
    'assistant_on_hub': 'assistant_on_hub',
    'assured_workload': 'assured_workload',
    'asterisk': 'asterisk',
    'atm': 'atm',
    'atr': 'atr',
    'attach_email': 'attach_email',
    'attach_file': 'attach_file',
    'attach_file_add': 'attach_file_add',
    'attach_file_off': 'attach_file_off',
    'attach_money': 'attach_money',
    'attachment': 'attachment',
    'attractions': 'attractions',
    'attribution': 'attribution',
    'audio_description': 'audio_description',
    'audio_file': 'audio_file',
    'audio_video_receiver': 'audio_video_receiver',
    'auto_awesome_mosaic': 'auto_awesome_mosaic',
    'auto_awesome_motion': 'auto_awesome_motion',
    'auto_delete': 'auto_delete',
    'auto_read_pause': 'auto_read_pause',
    'auto_read_play': 'auto_read_play',
    'auto_stories': 'auto_stories',
    'auto_towing': 'auto_towing',
    'auto_transmission': 'auto_transmission',
    'autofps_select': 'autofps_select',
    'automation': 'automation',
    'autopause': 'autopause',
    'autoplay': 'autoplay',
    'autorenew': 'autorenew',
    'autostop': 'autostop',
    'av1': 'av1',
    'av_timer': 'av_timer',
    'avc': 'avc',
    'avg_pace': 'avg_pace',
    'avg_time': 'avg_time',
    'award_star': 'award_star',
    'azm': 'azm',
    'baby_changing_station': 'baby_changing_station',
    'back_hand': 'back_hand',
    'back_to_tab': 'back_to_tab',
    'background_dot_large': 'background_dot_large',
    'background_dot_small': 'background_dot_small',
    'background_grid_small': 'background_grid_small',
    'background_replace': 'background_replace',
    'backlight_high': 'backlight_high',
    'backlight_high_off': 'backlight_high_off',
    'backlight_low': 'backlight_low',
    'backpack': 'backpack',
    'backspace': 'backspace',
    'backup': 'backup',
    'backup_table': 'backup_table',
    'badge': 'badge',
    'badge_critical_battery': 'badge_critical_battery',
    'bakery_dining': 'bakery_dining',
    'balance': 'balance',
    'balcony': 'balcony',
    'ballot': 'ballot',
    'bar_chart': 'bar_chart',
    'bar_chart_4_bars': 'bar_chart_4_bars',
    'bar_chart_off': 'bar_chart_off',
    'barcode': 'barcode',
    'barcode_reader': 'barcode_reader',
    'barcode_scanner': 'barcode_scanner',
    'barefoot': 'barefoot',
    'batch_prediction': 'batch_prediction',
    'bath_outdoor': 'bath_outdoor',
    'bath_private': 'bath_private',
    'bath_public_large': 'bath_public_large',
    'bathroom': 'bathroom',
    'bathtub': 'bathtub',
    'battery_0_bar': 'battery_0_bar',
    'battery_1_bar': 'battery_1_bar',
    'battery_2_bar': 'battery_2_bar',
    'battery_3_bar': 'battery_3_bar',
    'battery_4_bar': 'battery_4_bar',
    'battery_5_bar': 'battery_5_bar',
    'battery_6_bar': 'battery_6_bar',
    'battery_alert': 'battery_alert',
    'battery_change': 'battery_change',
    'battery_charging_20': 'battery_charging_20',
    'battery_charging_30': 'battery_charging_30',
    'battery_charging_50': 'battery_charging_50',
    'battery_charging_60': 'battery_charging_60',
    'battery_charging_80': 'battery_charging_80',
    'battery_charging_90': 'battery_charging_90',
    'battery_charging_full': 'battery_charging_full',
    'battery_error': 'battery_error',
    'battery_full': 'battery_full',
    'battery_full_alt': 'battery_full_alt',
    'battery_horiz_000': 'battery_horiz_000',
    'battery_horiz_050': 'battery_horiz_050',
    'battery_horiz_075': 'battery_horiz_075',
    'battery_low': 'battery_low',
    'battery_plus': 'battery_plus',
    'battery_profile': 'battery_profile',
    'battery_saver': 'battery_saver',
    'battery_share': 'battery_share',
    'battery_status_good': 'battery_status_good',
    'battery_unknown': 'battery_unknown',
    'battery_very_low': 'battery_very_low',
    'beach_access': 'beach_access',
    'bed': 'bed',
    'bedroom_baby': 'bedroom_baby',
    'bedroom_child': 'bedroom_child',
    'bedroom_parent': 'bedroom_parent',
    'bedtime': 'bedtime',
    'bedtime_off': 'bedtime_off',
    'beenhere': 'beenhere',
    'bento': 'bento',
    'bia': 'bia',
    'bid_landscape': 'bid_landscape',
    'bid_landscape_disabled': 'bid_landscape_disabled',
    'bigtop_updates': 'bigtop_updates',
    'bike_dock': 'bike_dock',
    'bike_lane': 'bike_lane',
    'bike_scooter': 'bike_scooter',
    'biotech': 'biotech',
    'blanket': 'blanket',
    'blender': 'blender',
    'blind': 'blind',
    'blinds': 'blinds',
    'blinds_closed': 'blinds_closed',
    'block': 'block',
    'blood_pressure': 'blood_pressure',
    'bloodtype': 'bloodtype',
    'bluetooth': 'bluetooth',
    'bluetooth_connected': 'bluetooth_connected',
    'bluetooth_disabled': 'bluetooth_disabled',
    'bluetooth_drive': 'bluetooth_drive',
    'bluetooth_searching': 'bluetooth_searching',
    'blur_circular': 'blur_circular',
    'blur_linear': 'blur_linear',
    'blur_medium': 'blur_medium',
    'blur_off': 'blur_off',
    'blur_on': 'blur_on',
    'blur_short': 'blur_short',
    'boat_bus': 'boat_bus',
    'boat_railway': 'boat_railway',
    'body_fat': 'body_fat',
    'body_system': 'body_system',
    'bolt': 'bolt',
    'bomb': 'bomb',
    'book': 'book',
    'book_2': 'book_2',
    'book_3': 'book_3',
    'book_4': 'book_4',
    'book_4_spark': 'book_4_spark',
    'book_5': 'book_5',
    'book_6': 'book_6',
    'book_online': 'book_online',
    'book_ribbon': 'book_ribbon',
    'bookmark': 'bookmark',
    'bookmark_add': 'bookmark_add',
    'bookmark_added': 'bookmark_added',
    'bookmark_bag': 'bookmark_bag',
    'bookmark_check': 'bookmark_check',
    'bookmark_flag': 'bookmark_flag',
    'bookmark_heart': 'bookmark_heart',
    'bookmark_manager': 'bookmark_manager',
    'bookmark_remove': 'bookmark_remove',
    'bookmark_star': 'bookmark_star',
    'bookmarks': 'bookmarks',
    'books_movies_and_music': 'books_movies_and_music',
    'border_all': 'border_all',
    'border_bottom': 'border_bottom',
    'border_clear': 'border_clear',
    'border_color': 'border_color',
    'border_horizontal': 'border_horizontal',
    'border_inner': 'border_inner',
    'border_left': 'border_left',
    'border_outer': 'border_outer',
    'border_right': 'border_right',
    'border_style': 'border_style',
    'border_top': 'border_top',
    'border_vertical': 'border_vertical',
    'borg': 'borg',
    'bottom_app_bar': 'bottom_app_bar',
    'bottom_drawer': 'bottom_drawer',
    'bottom_navigation': 'bottom_navigation',
    'bottom_panel_close': 'bottom_panel_close',
    'bottom_panel_open': 'bottom_panel_open',
    'bottom_right_click': 'bottom_right_click',
    'bottom_sheets': 'bottom_sheets',
    'box': 'box',
    'box_add': 'box_add',
    'box_edit': 'box_edit',
    'boy': 'boy',
    'brand_awareness': 'brand_awareness',
    'brand_family': 'brand_family',
    'branding_watermark': 'branding_watermark',
    'breakfast_dining': 'breakfast_dining',
    'breaking_news': 'breaking_news',
    'breaking_news_alt_1': 'breaking_news_alt_1',
    'breastfeeding': 'breastfeeding',
    'brick': 'brick',
    'brightness_1': 'brightness_1',
    'brightness_2': 'brightness_2',
    'brightness_3': 'brightness_3',
    'brightness_4': 'brightness_4',
    'brightness_5': 'brightness_5',
    'brightness_6': 'brightness_6',
    'brightness_7': 'brightness_7',
    'brightness_alert': 'brightness_alert',
    'brightness_auto': 'brightness_auto',
    'brightness_empty': 'brightness_empty',
    'brightness_high': 'brightness_high',
    'brightness_low': 'brightness_low',
    'brightness_medium': 'brightness_medium',
    'bring_your_own_ip': 'bring_your_own_ip',
    'broadcast_on_home': 'broadcast_on_home',
    'broadcast_on_personal': 'broadcast_on_personal',
    'broken_image': 'broken_image',
    'browse': 'browse',
    'browse_activity': 'browse_activity',
    'browse_gallery': 'browse_gallery',
    'browser_updated': 'browser_updated',
    'brunch_dining': 'brunch_dining',
    'brush': 'brush',
    'bubble': 'bubble',
    'bubble_chart': 'bubble_chart',
    'bubbles': 'bubbles',
    'bug_report': 'bug_report',
    'build': 'build',
    'build_circle': 'build_circle',
    'bungalow': 'bungalow',
    'burst_mode': 'burst_mode',
    'bus_alert': 'bus_alert',
    'bus_railway': 'bus_railway',
    'business_center': 'business_center',
    'business_chip': 'business_chip',
    'business_messages': 'business_messages',
    'buttons_alt': 'buttons_alt',
    'cabin': 'cabin',
    'cable': 'cable',
    'cable_car': 'cable_car',
    'cached': 'cached',
    'cadence': 'cadence',
    'cake': 'cake',
    'cake_add': 'cake_add',
    'calculate': 'calculate',
    'calendar_add_on': 'calendar_add_on',
    'calendar_apps_script': 'calendar_apps_script',
    'calendar_clock': 'calendar_clock',
    'calendar_month': 'calendar_month',
    'calendar_today': 'calendar_today',
    'calendar_view_day': 'calendar_view_day',
    'calendar_view_month': 'calendar_view_month',
    'calendar_view_week': 'calendar_view_week',
    'call': 'call',
    'call_end': 'call_end',
    'call_log': 'call_log',
    'call_made': 'call_made',
    'call_merge': 'call_merge',
    'call_missed': 'call_missed',
    'call_missed_outgoing': 'call_missed_outgoing',
    'call_quality': 'call_quality',
    'call_received': 'call_received',
    'call_split': 'call_split',
    'call_to_action': 'call_to_action',
    'camera': 'camera',
    'camera_front': 'camera_front',
    'camera_indoor': 'camera_indoor',
    'camera_outdoor': 'camera_outdoor',
    'camera_rear': 'camera_rear',
    'camera_roll': 'camera_roll',
    'camera_video': 'camera_video',
    'cameraswitch': 'cameraswitch',
    'campaign': 'campaign',
    'camping': 'camping',
    'cancel': 'cancel',
    'cancel_presentation': 'cancel_presentation',
    'cancel_schedule_send': 'cancel_schedule_send',
    'candle': 'candle',
    'candlestick_chart': 'candlestick_chart',
    'captive_portal': 'captive_portal',
    'capture': 'capture',
    'car_crash': 'car_crash',
    'car_rental': 'car_rental',
    'car_repair': 'car_repair',
    'car_tag': 'car_tag',
    'card_membership': 'card_membership',
    'card_travel': 'card_travel',
    'cardio_load': 'cardio_load',
    'cardiology': 'cardiology',
    'cards': 'cards',
    'cards_star': 'cards_star',
    'carpenter': 'carpenter',
    'carry_on_bag': 'carry_on_bag',
    'carry_on_bag_checked': 'carry_on_bag_checked',
    'carry_on_bag_inactive': 'carry_on_bag_inactive',
    'carry_on_bag_question': 'carry_on_bag_question',
    'cases': 'cases',
    'casino': 'casino',
    'cast': 'cast',
    'cast_connected': 'cast_connected',
    'cast_for_education': 'cast_for_education',
    'cast_pause': 'cast_pause',
    'cast_warning': 'cast_warning',
    'castle': 'castle',
    'category': 'category',
    'category_search': 'category_search',
    'celebration': 'celebration',
    'cell_merge': 'cell_merge',
    'cell_tower': 'cell_tower',
    'cell_wifi': 'cell_wifi',
    'center_focus_strong': 'center_focus_strong',
    'center_focus_weak': 'center_focus_weak',
    'chair': 'chair',
    'chair_alt': 'chair_alt',
    'chalet': 'chalet',
    'change_circle': 'change_circle',
    'change_history': 'change_history',
    'charger': 'charger',
    'charging_station': 'charging_station',
    'chart_data': 'chart_data',
    'chat': 'chat',
    'chat_add_on': 'chat_add_on',
    'chat_apps_script': 'chat_apps_script',
    'chat_bubble': 'chat_bubble',
    'chat_error': 'chat_error',
    'chat_info': 'chat_info',
    'chat_paste_go': 'chat_paste_go',
    'chat_paste_go_2': 'chat_paste_go_2',
    'check': 'check',
    'check_box': 'check_box',
    'check_box_outline_blank': 'check_box_outline_blank',
    'check_circle': 'check_circle',
    'check_in_out': 'check_in_out',
    'check_indeterminate_small': 'check_indeterminate_small',
    'check_small': 'check_small',
    'checkbook': 'checkbook',
    'checked_bag': 'checked_bag',
    'checked_bag_question': 'checked_bag_question',
    'checklist': 'checklist',
    'checklist_rtl': 'checklist_rtl',
    'checkroom': 'checkroom',
    'cheer': 'cheer',
    'chess': 'chess',
    'chess_pawn': 'chess_pawn',
    'chevron_backward': 'chevron_backward',
    'chevron_forward': 'chevron_forward',
    'chevron_left': 'chevron_left',
    'chevron_right': 'chevron_right',
    'child_care': 'child_care',
    'child_friendly': 'child_friendly',
    'chip_extraction': 'chip_extraction',
    'chips': 'chips',
    'chrome_reader_mode': 'chrome_reader_mode',
    'chromecast_2': 'chromecast_2',
    'chromecast_device': 'chromecast_device',
    'chronic': 'chronic',
    'church': 'church',
    'cinematic_blur': 'cinematic_blur',
    'circle': 'circle',
    'circle_notifications': 'circle_notifications',
    'circles': 'circles',
    'circles_ext': 'circles_ext',
    'clarify': 'clarify',
    'clean_hands': 'clean_hands',
    'cleaning': 'cleaning',
    'cleaning_bucket': 'cleaning_bucket',
    'cleaning_services': 'cleaning_services',
    'clear_all': 'clear_all',
    'clear_day': 'clear_day',
    'climate_mini_split': 'climate_mini_split',
    'clinical_notes': 'clinical_notes',
    'clock_arrow_down': 'clock_arrow_down',
    'clock_arrow_up': 'clock_arrow_up',
    'clock_loader_10': 'clock_loader_10',
    'clock_loader_20': 'clock_loader_20',
    'clock_loader_40': 'clock_loader_40',
    'clock_loader_60': 'clock_loader_60',
    'clock_loader_80': 'clock_loader_80',
    'clock_loader_90': 'clock_loader_90',
    'close': 'close',
    'close_fullscreen': 'close_fullscreen',
    'close_small': 'close_small',
    'closed_caption': 'closed_caption',
    'closed_caption_add': 'closed_caption_add',
    'closed_caption_disabled': 'closed_caption_disabled',
    'cloud': 'cloud',
    'cloud_alert': 'cloud_alert',
    'cloud_circle': 'cloud_circle',
    'cloud_done': 'cloud_done',
    'cloud_download': 'cloud_download',
    'cloud_lock': 'cloud_lock',
    'cloud_off': 'cloud_off',
    'cloud_sync': 'cloud_sync',
    'cloud_upload': 'cloud_upload',
    'cloudy_snowing': 'cloudy_snowing',
    'co2': 'co2',
    'co_present': 'co_present',
    'code': 'code',
    'code_blocks': 'code_blocks',
    'code_off': 'code_off',
    'coffee': 'coffee',
    'coffee_maker': 'coffee_maker',
    'cognition': 'cognition',
    'cognition_2': 'cognition_2',
    'collapse_all': 'collapse_all',
    'collapse_content': 'collapse_content',
    'collections_bookmark': 'collections_bookmark',
    'colorize': 'colorize',
    'colors': 'colors',
    'combine_columns': 'combine_columns',
    'comedy_mask': 'comedy_mask',
    'comic_bubble': 'comic_bubble',
    'comment': 'comment',
    'comment_bank': 'comment_bank',
    'comments_disabled': 'comments_disabled',
    'commit': 'commit',
    'communication': 'communication',
    'communities': 'communities',
    'commute': 'commute',
    'compare': 'compare',
    'compare_arrows': 'compare_arrows',
    'compass_calibration': 'compass_calibration',
    'component_exchange': 'component_exchange',
    'compost': 'compost',
    'compress': 'compress',
    'computer': 'computer',
    'concierge': 'concierge',
    'conditions': 'conditions',
    'confirmation_number': 'confirmation_number',
    'congenital': 'congenital',
    'connect_without_contact': 'connect_without_contact',
    'connected_tv': 'connected_tv',
    'connecting_airports': 'connecting_airports',
    'construction': 'construction',
    'contact_emergency': 'contact_emergency',
    'contact_mail': 'contact_mail',
    'contact_page': 'contact_page',
    'contact_phone': 'contact_phone',
    'contact_support': 'contact_support',
    'contactless': 'contactless',
    'contactless_off': 'contactless_off',
    'contacts': 'contacts',
    'contacts_product': 'contacts_product',
    'content_copy': 'content_copy',
    'content_cut': 'content_cut',
    'content_paste': 'content_paste',
    'content_paste_go': 'content_paste_go',
    'content_paste_off': 'content_paste_off',
    'content_paste_search': 'content_paste_search',
    'contextual_token': 'contextual_token',
    'contextual_token_add': 'contextual_token_add',
    'contract': 'contract',
    'contract_delete': 'contract_delete',
    'contract_edit': 'contract_edit',
    'contrast': 'contrast',
    'contrast_circle': 'contrast_circle',
    'contrast_rtl_off': 'contrast_rtl_off',
    'contrast_square': 'contrast_square',
    'control_camera': 'control_camera',
    'control_point_duplicate': 'control_point_duplicate',
    'controller_gen': 'controller_gen',
    'conversion_path': 'conversion_path',
    'conversion_path_off': 'conversion_path_off',
    'convert_to_text': 'convert_to_text',
    'conveyor_belt': 'conveyor_belt',
    'cookie': 'cookie',
    'cookie_off': 'cookie_off',
    'cooking': 'cooking',
    'cool_to_dry': 'cool_to_dry',
    'copy_all': 'copy_all',
    'copyright': 'copyright',
    'coronavirus': 'coronavirus',
    'corporate_fare': 'corporate_fare',
    'cottage': 'cottage',
    'counter_0': 'counter_0',
    'counter_1': 'counter_1',
    'counter_2': 'counter_2',
    'counter_3': 'counter_3',
    'counter_4': 'counter_4',
    'counter_5': 'counter_5',
    'counter_6': 'counter_6',
    'counter_7': 'counter_7',
    'counter_8': 'counter_8',
    'counter_9': 'counter_9',
    'countertops': 'countertops',
    'create_new_folder': 'create_new_folder',
    'credit_card': 'credit_card',
    'credit_card_clock': 'credit_card_clock',
    'credit_card_gear': 'credit_card_gear',
    'credit_card_heart': 'credit_card_heart',
    'credit_card_off': 'credit_card_off',
    'credit_score': 'credit_score',
    'crib': 'crib',
    'crisis_alert': 'crisis_alert',
    'crop': 'crop',
    'crop_16_9': 'crop_16_9',
    'crop_3_2': 'crop_3_2',
    'crop_5_4': 'crop_5_4',
    'crop_7_5': 'crop_7_5',
    'crop_9_16': 'crop_9_16',
    'crop_free': 'crop_free',
    'crop_landscape': 'crop_landscape',
    'crop_portrait': 'crop_portrait',
    'crop_rotate': 'crop_rotate',
    'crop_square': 'crop_square',
    'crossword': 'crossword',
    'crowdsource': 'crowdsource',
    'crown': 'crown',
    'cruelty_free': 'cruelty_free',
    'css': 'css',
    'csv': 'csv',
    'currency_bitcoin': 'currency_bitcoin',
    'currency_exchange': 'currency_exchange',
    'currency_franc': 'currency_franc',
    'currency_lira': 'currency_lira',
    'currency_pound': 'currency_pound',
    'currency_ruble': 'currency_ruble',
    'currency_rupee': 'currency_rupee',
    'currency_rupee_circle': 'currency_rupee_circle',
    'currency_yen': 'currency_yen',
    'currency_yuan': 'currency_yuan',
    'curtains': 'curtains',
    'curtains_closed': 'curtains_closed',
    'custom_typography': 'custom_typography',
    'cycle': 'cycle',
    'cyclone': 'cyclone',
    'dangerous': 'dangerous',
    'dark_mode': 'dark_mode',
    'dashboard': 'dashboard',
    'dashboard_2': 'dashboard_2',
    'dashboard_customize': 'dashboard_customize',
    'data_alert': 'data_alert',
    'data_array': 'data_array',
    'data_check': 'data_check',
    'data_exploration': 'data_exploration',
    'data_info_alert': 'data_info_alert',
    'data_loss_prevention': 'data_loss_prevention',
    'data_object': 'data_object',
    'data_saver_on': 'data_saver_on',
    'data_table': 'data_table',
    'data_thresholding': 'data_thresholding',
    'data_usage': 'data_usage',
    'database': 'database',
    'database_off': 'database_off',
    'database_search': 'database_search',
    'database_upload': 'database_upload',
    'dataset': 'dataset',
    'dataset_linked': 'dataset_linked',
    'date_range': 'date_range',
    'deblur': 'deblur',
    'deceased': 'deceased',
    'decimal_decrease': 'decimal_decrease',
    'decimal_increase': 'decimal_increase',
    'deck': 'deck',
    'dehaze': 'dehaze',
    'delete': 'delete',
    'delete_forever': 'delete_forever',
    'delete_history': 'delete_history',
    'delete_sweep': 'delete_sweep',
    'delivery_truck_bolt': 'delivery_truck_bolt',
    'delivery_truck_speed': 'delivery_truck_speed',
    'demography': 'demography',
    'density_large': 'density_large',
    'density_medium': 'density_medium',
    'density_small': 'density_small',
    'dentistry': 'dentistry',
    'departure_board': 'departure_board',
    'deployed_code': 'deployed_code',
    'deployed_code_account': 'deployed_code_account',
    'deployed_code_alert': 'deployed_code_alert',
    'deployed_code_history': 'deployed_code_history',
    'deployed_code_update': 'deployed_code_update',
    'dermatology': 'dermatology',
    'description': 'description',
    'deselect': 'deselect',
    'design_services': 'design_services',
    'desk': 'desk',
    'deskphone': 'deskphone',
    'desktop_access_disabled': 'desktop_access_disabled',
    'desktop_cloud': 'desktop_cloud',
    'desktop_cloud_stack': 'desktop_cloud_stack',
    'desktop_landscape': 'desktop_landscape',
    'desktop_landscape_add': 'desktop_landscape_add',
    'desktop_mac': 'desktop_mac',
    'desktop_portrait': 'desktop_portrait',
    'desktop_windows': 'desktop_windows',
    'destruction': 'destruction',
    'details': 'details',
    'detection_and_zone': 'detection_and_zone',
    'detector': 'detector',
    'detector_alarm': 'detector_alarm',
    'detector_battery': 'detector_battery',
    'detector_co': 'detector_co',
    'detector_offline': 'detector_offline',
    'detector_smoke': 'detector_smoke',
    'detector_status': 'detector_status',
    'developer_board': 'developer_board',
    'developer_board_off': 'developer_board_off',
    'developer_guide': 'developer_guide',
    'developer_mode': 'developer_mode',
    'developer_mode_tv': 'developer_mode_tv',
    'device_hub': 'device_hub',
    'device_thermostat': 'device_thermostat',
    'device_unknown': 'device_unknown',
    'devices': 'devices',
    'devices_fold': 'devices_fold',
    'devices_fold_2': 'devices_fold_2',
    'devices_off': 'devices_off',
    'devices_other': 'devices_other',
    'devices_wearables': 'devices_wearables',
    'dew_point': 'dew_point',
    'diagnosis': 'diagnosis',
    'diagonal_line': 'diagonal_line',
    'dialer_sip': 'dialer_sip',
    'dialogs': 'dialogs',
    'dialpad': 'dialpad',
    'diamond': 'diamond',
    'dictionary': 'dictionary',
    'difference': 'difference',
    'digital_out_of_home': 'digital_out_of_home',
    'digital_wellbeing': 'digital_wellbeing',
    'dining': 'dining',
    'dinner_dining': 'dinner_dining',
    'directions': 'directions',
    'directions_alt': 'directions_alt',
    'directions_alt_off': 'directions_alt_off',
    'directions_bike': 'directions_bike',
    'directions_boat': 'directions_boat',
    'directions_bus': 'directions_bus',
    'directions_car': 'directions_car',
    'directions_off': 'directions_off',
    'directions_railway': 'directions_railway',
    'directions_railway_2': 'directions_railway_2',
    'directions_run': 'directions_run',
    'directions_subway': 'directions_subway',
    'directions_walk': 'directions_walk',
    'directory_sync': 'directory_sync',
    'dirty_lens': 'dirty_lens',
    'disabled_by_default': 'disabled_by_default',
    'disabled_visible': 'disabled_visible',
    'disc_full': 'disc_full',
    'discover_tune': 'discover_tune',
    'dishwasher': 'dishwasher',
    'dishwasher_gen': 'dishwasher_gen',
    'display_external_input': 'display_external_input',
    'display_settings': 'display_settings',
    'distance': 'distance',
    'diversity_1': 'diversity_1',
    'diversity_2': 'diversity_2',
    'diversity_3': 'diversity_3',
    'diversity_4': 'diversity_4',
    'dns': 'dns',
    'do_not_disturb_off': 'do_not_disturb_off',
    'do_not_disturb_on': 'do_not_disturb_on',
    'do_not_disturb_on_total_silence': 'do_not_disturb_on_total_silence',
    'do_not_step': 'do_not_step',
    'do_not_touch': 'do_not_touch',
    'dock': 'dock',
    'dock_to_bottom': 'dock_to_bottom',
    'dock_to_left': 'dock_to_left',
    'dock_to_right': 'dock_to_right',
    'docs': 'docs',
    'docs_add_on': 'docs_add_on',
    'docs_apps_script': 'docs_apps_script',
    'document_scanner': 'document_scanner',
    'document_search': 'document_search',
    'domain': 'domain',
    'domain_add': 'domain_add',
    'domain_disabled': 'domain_disabled',
    'domain_verification': 'domain_verification',
    'domain_verification_off': 'domain_verification_off',
    'domino_mask': 'domino_mask',
    'done_all': 'done_all',
    'done_outline': 'done_outline',
    'donut_large': 'donut_large',
    'donut_small': 'donut_small',
    'door_back': 'door_back',
    'door_front': 'door_front',
    'door_open': 'door_open',
    'door_sensor': 'door_sensor',
    'door_sliding': 'door_sliding',
    'doorbell': 'doorbell',
    'doorbell_3p': 'doorbell_3p',
    'doorbell_chime': 'doorbell_chime',
    'double_arrow': 'double_arrow',
    'downhill_skiing': 'downhill_skiing',
    'download': 'download',
    'download_2': 'download_2',
    'download_done': 'download_done',
    'download_for_offline': 'download_for_offline',
    'downloading': 'downloading',
    'draft': 'draft',
    'draft_orders': 'draft_orders',
    'drafts': 'drafts',
    'drag_click': 'drag_click',
    'drag_handle': 'drag_handle',
    'drag_indicator': 'drag_indicator',
    'drag_pan': 'drag_pan',
    'draw': 'draw',
    'draw_abstract': 'draw_abstract',
    'draw_collage': 'draw_collage',
    'dresser': 'dresser',
    'drive_export': 'drive_export',
    'drive_file_move': 'drive_file_move',
    'drive_folder_upload': 'drive_folder_upload',
    'dropdown': 'dropdown',
    'dry': 'dry',
    'dry_cleaning': 'dry_cleaning',
    'dual_screen': 'dual_screen',
    'duo': 'duo',
    'dvr': 'dvr',
    'dynamic_feed': 'dynamic_feed',
    'dynamic_form': 'dynamic_form',
    'e911_avatar': 'e911_avatar',
    'e911_emergency': 'e911_emergency',
    'e_mobiledata': 'e_mobiledata',
    'e_mobiledata_badge': 'e_mobiledata_badge',
    'earbuds': 'earbuds',
    'earbuds_battery': 'earbuds_battery',
    'early_on': 'early_on',
    'earthquake': 'earthquake',
    'east': 'east',
    'ecg': 'ecg',
    'ecg_heart': 'ecg_heart',
    'eco': 'eco',
    'eda': 'eda',
    'edgesensor_high': 'edgesensor_high',
    'edgesensor_low': 'edgesensor_low',
    'edit': 'edit',
    'edit_arrow_down': 'edit_arrow_down',
    'edit_arrow_up': 'edit_arrow_up',
    'edit_attributes': 'edit_attributes',
    'edit_audio': 'edit_audio',
    'edit_calendar': 'edit_calendar',
    'edit_document': 'edit_document',
    'edit_location': 'edit_location',
    'edit_location_alt': 'edit_location_alt',
    'edit_note': 'edit_note',
    'edit_notifications': 'edit_notifications',
    'edit_off': 'edit_off',
    'edit_road': 'edit_road',
    'edit_square': 'edit_square',
    'editor_choice': 'editor_choice',
    'egg': 'egg',
    'egg_alt': 'egg_alt',
    'eject': 'eject',
    'elderly': 'elderly',
    'elderly_woman': 'elderly_woman',
    'electric_bike': 'electric_bike',
    'electric_bolt': 'electric_bolt',
    'electric_car': 'electric_car',
    'electric_meter': 'electric_meter',
    'electric_moped': 'electric_moped',
    'electric_rickshaw': 'electric_rickshaw',
    'electric_scooter': 'electric_scooter',
    'electrical_services': 'electrical_services',
    'elevation': 'elevation',
    'elevator': 'elevator',
    'emergency': 'emergency',
    'emergency_heat': 'emergency_heat',
    'emergency_heat_2': 'emergency_heat_2',
    'emergency_home': 'emergency_home',
    'emergency_recording': 'emergency_recording',
    'emergency_share': 'emergency_share',
    'emergency_share_off': 'emergency_share_off',
    'emoji_events': 'emoji_events',
    'emoji_food_beverage': 'emoji_food_beverage',
    'emoji_language': 'emoji_language',
    'emoji_nature': 'emoji_nature',
    'emoji_objects': 'emoji_objects',
    'emoji_people': 'emoji_people',
    'emoji_symbols': 'emoji_symbols',
    'emoji_transportation': 'emoji_transportation',
    'emoticon': 'emoticon',
    'empty_dashboard': 'empty_dashboard',
    'enable': 'enable',
    'encrypted': 'encrypted',
    'encrypted_add': 'encrypted_add',
    'encrypted_add_circle': 'encrypted_add_circle',
    'encrypted_minus_circle': 'encrypted_minus_circle',
    'encrypted_off': 'encrypted_off',
    'endocrinology': 'endocrinology',
    'energy': 'energy',
    'energy_program_saving': 'energy_program_saving',
    'energy_program_time_used': 'energy_program_time_used',
    'energy_savings_leaf': 'energy_savings_leaf',
    'engineering': 'engineering',
    'enhanced_encryption': 'enhanced_encryption',
    'ent': 'ent',
    'enterprise': 'enterprise',
    'enterprise_off': 'enterprise_off',
    'equal': 'equal',
    'equalizer': 'equalizer',
    'eraser_size_1': 'eraser_size_1',
    'eraser_size_2': 'eraser_size_2',
    'eraser_size_3': 'eraser_size_3',
    'eraser_size_4': 'eraser_size_4',
    'eraser_size_5': 'eraser_size_5',
    'error': 'error',
    'error_med': 'error_med',
    'escalator': 'escalator',
    'escalator_warning': 'escalator_warning',
    'euro': 'euro',
    'euro_symbol': 'euro_symbol',
    'ev_mobiledata_badge': 'ev_mobiledata_badge',
    'ev_shadow': 'ev_shadow',
    'ev_shadow_add': 'ev_shadow_add',
    'ev_shadow_minus': 'ev_shadow_minus',
    'ev_station': 'ev_station',
    'event': 'event',
    'event_available': 'event_available',
    'event_busy': 'event_busy',
    'event_list': 'event_list',
    'event_note': 'event_note',
    'event_repeat': 'event_repeat',
    'event_seat': 'event_seat',
    'event_upcoming': 'event_upcoming',
    'exclamation': 'exclamation',
    'exercise': 'exercise',
    'exit_to_app': 'exit_to_app',
    'expand': 'expand',
    'expand_all': 'expand_all',
    'expand_circle_down': 'expand_circle_down',
    'expand_circle_right': 'expand_circle_right',
    'expand_circle_up': 'expand_circle_up',
    'expand_content': 'expand_content',
    'expansion_panels': 'expansion_panels',
    'experiment': 'experiment',
    'explicit': 'explicit',
    'explore': 'explore',
    'explore_nearby': 'explore_nearby',
    'explore_off': 'explore_off',
    'explosion': 'explosion',
    'export_notes': 'export_notes',
    'exposure': 'exposure',
    'exposure_neg_1': 'exposure_neg_1',
    'exposure_neg_2': 'exposure_neg_2',
    'exposure_plus_1': 'exposure_plus_1',
    'exposure_plus_2': 'exposure_plus_2',
    'exposure_zero': 'exposure_zero',
    'extension': 'extension',
    'extension_off': 'extension_off',
    'eye_tracking': 'eye_tracking',
    'eyeglasses': 'eyeglasses',
    'face': 'face',
    'face_2': 'face_2',
    'face_3': 'face_3',
    'face_4': 'face_4',
    'face_5': 'face_5',
    'face_6': 'face_6',
    'face_down': 'face_down',
    'face_left': 'face_left',
    'face_nod': 'face_nod',
    'face_retouching_off': 'face_retouching_off',
    'face_right': 'face_right',
    'face_shake': 'face_shake',
    'face_up': 'face_up',
    'fact_check': 'fact_check',
    'factory': 'factory',
    'falling': 'falling',
    'familiar_face_and_zone': 'familiar_face_and_zone',
    'family_history': 'family_history',
    'family_home': 'family_home',
    'family_link': 'family_link',
    'family_restroom': 'family_restroom',
    'family_star': 'family_star',
    'farsight_digital': 'farsight_digital',
    'fast_forward': 'fast_forward',
    'fast_rewind': 'fast_rewind',
    'fastfood': 'fastfood',
    'faucet': 'faucet',
    'favorite': 'favorite',
    'fax': 'fax',
    'feature_search': 'feature_search',
    'featured_play_list': 'featured_play_list',
    'featured_seasonal_and_gifts': 'featured_seasonal_and_gifts',
    'featured_video': 'featured_video',
    'feedback': 'feedback',
    'female': 'female',
    'femur': 'femur',
    'femur_alt': 'femur_alt',
    'fence': 'fence',
    'fertile': 'fertile',
    'festival': 'festival',
    'fiber_dvr': 'fiber_dvr',
    'fiber_manual_record': 'fiber_manual_record',
    'fiber_new': 'fiber_new',
    'fiber_pin': 'fiber_pin',
    'fiber_smart_record': 'fiber_smart_record',
    'file_copy': 'file_copy',
    'file_copy_off': 'file_copy_off',
    'file_download_off': 'file_download_off',
    'file_export': 'file_export',
    'file_json': 'file_json',
    'file_map': 'file_map',
    'file_map_stack': 'file_map_stack',
    'file_open': 'file_open',
    'file_png': 'file_png',
    'file_present': 'file_present',
    'file_save': 'file_save',
    'file_save_off': 'file_save_off',
    'file_upload_off': 'file_upload_off',
    'files': 'files',
    'filter': 'filter',
    'filter_1': 'filter_1',
    'filter_2': 'filter_2',
    'filter_3': 'filter_3',
    'filter_4': 'filter_4',
    'filter_5': 'filter_5',
    'filter_6': 'filter_6',
    'filter_7': 'filter_7',
    'filter_8': 'filter_8',
    'filter_9': 'filter_9',
    'filter_9_plus': 'filter_9_plus',
    'filter_alt': 'filter_alt',
    'filter_alt_off': 'filter_alt_off',
    'filter_arrow_right': 'filter_arrow_right',
    'filter_b_and_w': 'filter_b_and_w',
    'filter_center_focus': 'filter_center_focus',
    'filter_drama': 'filter_drama',
    'filter_frames': 'filter_frames',
    'filter_hdr': 'filter_hdr',
    'filter_list': 'filter_list',
    'filter_list_off': 'filter_list_off',
    'filter_none': 'filter_none',
    'filter_retrolux': 'filter_retrolux',
    'filter_tilt_shift': 'filter_tilt_shift',
    'filter_vintage': 'filter_vintage',
    'finance': 'finance',
    'finance_chip': 'finance_chip',
    'finance_mode': 'finance_mode',
    'find_in_page': 'find_in_page',
    'find_replace': 'find_replace',
    'fingerprint': 'fingerprint',
    'fingerprint_off': 'fingerprint_off',
    'fire_extinguisher': 'fire_extinguisher',
    'fire_hydrant': 'fire_hydrant',
    'fire_truck': 'fire_truck',
    'fireplace': 'fireplace',
    'first_page': 'first_page',
    'fit_page': 'fit_page',
    'fit_page_height': 'fit_page_height',
    'fit_page_width': 'fit_page_width',
    'fit_screen': 'fit_screen',
    'fit_width': 'fit_width',
    'fitness_center': 'fitness_center',
    'fitness_tracker': 'fitness_tracker',
    'flag': 'flag',
    'flag_2': 'flag_2',
    'flag_check': 'flag_check',
    'flag_circle': 'flag_circle',
    'flaky': 'flaky',
    'flare': 'flare',
    'flash_auto': 'flash_auto',
    'flash_off': 'flash_off',
    'flash_on': 'flash_on',
    'flashlight_off': 'flashlight_off',
    'flashlight_on': 'flashlight_on',
    'flatware': 'flatware',
    'flex_direction': 'flex_direction',
    'flex_no_wrap': 'flex_no_wrap',
    'flex_wrap': 'flex_wrap',
    'flight': 'flight',
    'flight_class': 'flight_class',
    'flight_land': 'flight_land',
    'flight_takeoff': 'flight_takeoff',
    'flights_and_hotels': 'flights_and_hotels',
    'flip': 'flip',
    'flip_camera_android': 'flip_camera_android',
    'flip_camera_ios': 'flip_camera_ios',
    'flip_to_back': 'flip_to_back',
    'flip_to_front': 'flip_to_front',
    'float_landscape_2': 'float_landscape_2',
    'float_portrait_2': 'float_portrait_2',
    'flood': 'flood',
    'floor': 'floor',
    'floor_lamp': 'floor_lamp',
    'flowchart': 'flowchart',
    'flowsheet': 'flowsheet',
    'fluid': 'fluid',
    'fluid_balance': 'fluid_balance',
    'fluid_med': 'fluid_med',
    'fluorescent': 'fluorescent',
    'flutter': 'flutter',
    'flutter_dash': 'flutter_dash',
    'flyover': 'flyover',
    'fmd_bad': 'fmd_bad',
    'foggy': 'foggy',
    'folded_hands': 'folded_hands',
    'folder': 'folder',
    'folder_check': 'folder_check',
    'folder_check_2': 'folder_check_2',
    'folder_code': 'folder_code',
    'folder_copy': 'folder_copy',
    'folder_data': 'folder_data',
    'folder_delete': 'folder_delete',
    'folder_eye': 'folder_eye',
    'folder_info': 'folder_info',
    'folder_limited': 'folder_limited',
    'folder_managed': 'folder_managed',
    'folder_match': 'folder_match',
    'folder_off': 'folder_off',
    'folder_open': 'folder_open',
    'folder_shared': 'folder_shared',
    'folder_special': 'folder_special',
    'folder_supervised': 'folder_supervised',
    'folder_zip': 'folder_zip',
    'follow_the_signs': 'follow_the_signs',
    'font_download': 'font_download',
    'font_download_off': 'font_download_off',
    'food_bank': 'food_bank',
    'foot_bones': 'foot_bones',
    'footprint': 'footprint',
    'for_you': 'for_you',
    'forest': 'forest',
    'fork_left': 'fork_left',
    'fork_right': 'fork_right',
    'fork_spoon': 'fork_spoon',
    'forklift': 'forklift',
    'format_align_center': 'format_align_center',
    'format_align_justify': 'format_align_justify',
    'format_align_left': 'format_align_left',
    'format_align_right': 'format_align_right',
    'format_bold': 'format_bold',
    'format_clear': 'format_clear',
    'format_color_fill': 'format_color_fill',
    'format_color_reset': 'format_color_reset',
    'format_color_text': 'format_color_text',
    'format_h1': 'format_h1',
    'format_h2': 'format_h2',
    'format_h3': 'format_h3',
    'format_h4': 'format_h4',
    'format_h5': 'format_h5',
    'format_h6': 'format_h6',
    'format_image_left': 'format_image_left',
    'format_image_right': 'format_image_right',
    'format_indent_decrease': 'format_indent_decrease',
    'format_indent_increase': 'format_indent_increase',
    'format_ink_highlighter': 'format_ink_highlighter',
    'format_italic': 'format_italic',
    'format_letter_spacing': 'format_letter_spacing',
    'format_letter_spacing_2': 'format_letter_spacing_2',
    'format_letter_spacing_standard': 'format_letter_spacing_standard',
    'format_letter_spacing_wide': 'format_letter_spacing_wide',
    'format_letter_spacing_wider': 'format_letter_spacing_wider',
    'format_line_spacing': 'format_line_spacing',
    'format_list_bulleted': 'format_list_bulleted',
    'format_list_bulleted_add': 'format_list_bulleted_add',
    'format_list_numbered': 'format_list_numbered',
    'format_list_numbered_rtl': 'format_list_numbered_rtl',
    'format_overline': 'format_overline',
    'format_paint': 'format_paint',
    'format_paragraph': 'format_paragraph',
    'format_quote': 'format_quote',
    'format_quote_off': 'format_quote_off',
    'format_shapes': 'format_shapes',
    'format_size': 'format_size',
    'format_strikethrough': 'format_strikethrough',
    'format_text_clip': 'format_text_clip',
    'format_text_overflow': 'format_text_overflow',
    'format_text_wrap': 'format_text_wrap',
    'format_textdirection_l_to_r': 'format_textdirection_l_to_r',
    'format_textdirection_r_to_l': 'format_textdirection_r_to_l',
    'format_textdirection_vertical': 'format_textdirection_vertical',
    'format_underlined': 'format_underlined',
    'format_underlined_squiggle': 'format_underlined_squiggle',
    'forms_add_on': 'forms_add_on',
    'forms_apps_script': 'forms_apps_script',
    'fort': 'fort',
    'forum': 'forum',
    'forward': 'forward',
    'forward_10': 'forward_10',
    'forward_30': 'forward_30',
    'forward_5': 'forward_5',
    'forward_circle': 'forward_circle',
    'forward_media': 'forward_media',
    'forward_to_inbox': 'forward_to_inbox',
    'foundation': 'foundation',
    'frame_inspect': 'frame_inspect',
    'frame_person': 'frame_person',
    'frame_person_mic': 'frame_person_mic',
    'frame_person_off': 'frame_person_off',
    'frame_reload': 'frame_reload',
    'frame_source': 'frame_source',
    'free_cancellation': 'free_cancellation',
    'front_hand': 'front_hand',
    'front_loader': 'front_loader',
    'full_coverage': 'full_coverage',
    'full_hd': 'full_hd',
    'full_stacked_bar_chart': 'full_stacked_bar_chart',
    'fullscreen': 'fullscreen',
    'fullscreen_exit': 'fullscreen_exit',
    'fullscreen_portrait': 'fullscreen_portrait',
    'function': 'function',
    'functions': 'functions',
    'funicular': 'funicular',
    'g_mobiledata': 'g_mobiledata',
    'g_mobiledata_badge': 'g_mobiledata_badge',
    'g_translate': 'g_translate',
    'gallery_thumbnail': 'gallery_thumbnail',
    'gamepad': 'gamepad',
    'garage': 'garage',
    'garage_door': 'garage_door',
    'garage_home': 'garage_home',
    'garden_cart': 'garden_cart',
    'gas_meter': 'gas_meter',
    'gastroenterology': 'gastroenterology',
    'gate': 'gate',
    'gavel': 'gavel',
    'general_device': 'general_device',
    'genetics': 'genetics',
    'genres': 'genres',
    'gesture': 'gesture',
    'gesture_select': 'gesture_select',
    'gif': 'gif',
    'gif_2': 'gif_2',
    'gif_box': 'gif_box',
    'girl': 'girl',
    'gite': 'gite',
    'glass_cup': 'glass_cup',
    'globe': 'globe',
    'globe_asia': 'globe_asia',
    'globe_book': 'globe_book',
    'globe_uk': 'globe_uk',
    'glucose': 'glucose',
    'glyphs': 'glyphs',
    'go_to_line': 'go_to_line',
    'golf_course': 'golf_course',
    'gondola_lift': 'gondola_lift',
    'google_home_devices': 'google_home_devices',
    'google_tv_remote': 'google_tv_remote',
    'google_wifi': 'google_wifi',
    'gpp_bad': 'gpp_bad',
    'gpp_maybe': 'gpp_maybe',
    'gradient': 'gradient',
    'grading': 'grading',
    'grain': 'grain',
    'graph_1': 'graph_1',
    'graph_2': 'graph_2',
    'graph_3': 'graph_3',
    'graph_4': 'graph_4',
    'graph_5': 'graph_5',
    'graph_6': 'graph_6',
    'graphic_eq': 'graphic_eq',
    'grass': 'grass',
    'grid_3x3': 'grid_3x3',
    'grid_3x3_off': 'grid_3x3_off',
    'grid_4x4': 'grid_4x4',
    'grid_goldenratio': 'grid_goldenratio',
    'grid_guides': 'grid_guides',
    'grid_off': 'grid_off',
    'grid_on': 'grid_on',
    'grid_view': 'grid_view',
    'grocery': 'grocery',
    'group': 'group',
    'group_add': 'group_add',
    'group_off': 'group_off',
    'group_remove': 'group_remove',
    'group_search': 'group_search',
    'group_work': 'group_work',
    'grouped_bar_chart': 'grouped_bar_chart',
    'groups': 'groups',
    'groups_2': 'groups_2',
    'groups_3': 'groups_3',
    'guardian': 'guardian',
    'gynecology': 'gynecology',
    'h_mobiledata': 'h_mobiledata',
    'h_mobiledata_badge': 'h_mobiledata_badge',
    'h_plus_mobiledata': 'h_plus_mobiledata',
    'h_plus_mobiledata_badge': 'h_plus_mobiledata_badge',
    'hail': 'hail',
    'hallway': 'hallway',
    'hand_bones': 'hand_bones',
    'hand_gesture': 'hand_gesture',
    'hand_gesture_off': 'hand_gesture_off',
    'handheld_controller': 'handheld_controller',
    'handshake': 'handshake',
    'handyman': 'handyman',
    'hangout_video': 'hangout_video',
    'hangout_video_off': 'hangout_video_off',
    'hard_disk': 'hard_disk',
    'hard_drive': 'hard_drive',
    'hard_drive_2': 'hard_drive_2',
    'hardware': 'hardware',
    'hd': 'hd',
    'hdr_auto': 'hdr_auto',
    'hdr_auto_select': 'hdr_auto_select',
    'hdr_enhanced_select': 'hdr_enhanced_select',
    'hdr_off': 'hdr_off',
    'hdr_off_select': 'hdr_off_select',
    'hdr_on': 'hdr_on',
    'hdr_on_select': 'hdr_on_select',
    'hdr_plus': 'hdr_plus',
    'hdr_plus_off': 'hdr_plus_off',
    'hdr_strong': 'hdr_strong',
    'hdr_weak': 'hdr_weak',
    'head_mounted_device': 'head_mounted_device',
    'headphones': 'headphones',
    'headphones_battery': 'headphones_battery',
    'headset_mic': 'headset_mic',
    'headset_off': 'headset_off',
    'healing': 'healing',
    'health_and_beauty': 'health_and_beauty',
    'health_and_safety': 'health_and_safety',
    'health_metrics': 'health_metrics',
    'heap_snapshot_large': 'heap_snapshot_large',
    'heap_snapshot_multiple': 'heap_snapshot_multiple',
    'heap_snapshot_thumbnail': 'heap_snapshot_thumbnail',
    'hearing': 'hearing',
    'hearing_aid': 'hearing_aid',
    'hearing_aid_disabled': 'hearing_aid_disabled',
    'hearing_disabled': 'hearing_disabled',
    'heart_broken': 'heart_broken',
    'heart_check': 'heart_check',
    'heart_minus': 'heart_minus',
    'heart_plus': 'heart_plus',
    'heat': 'heat',
    'heat_pump': 'heat_pump',
    'heat_pump_balance': 'heat_pump_balance',
    'height': 'height',
    'helicopter': 'helicopter',
    'help': 'help',
    'help_center': 'help_center',
    'help_clinic': 'help_clinic',
    'hematology': 'hematology',
    'hevc': 'hevc',
    'hexagon': 'hexagon',
    'hide': 'hide',
    'hide_image': 'hide_image',
    'hide_source': 'hide_source',
    'high_density': 'high_density',
    'high_quality': 'high_quality',
    'high_res': 'high_res',
    'highlight': 'highlight',
    'highlight_keyboard_focus': 'highlight_keyboard_focus',
    'highlight_mouse_cursor': 'highlight_mouse_cursor',
    'highlight_text_cursor': 'highlight_text_cursor',
    'highlighter_size_1': 'highlighter_size_1',
    'highlighter_size_2': 'highlighter_size_2',
    'highlighter_size_3': 'highlighter_size_3',
    'highlighter_size_4': 'highlighter_size_4',
    'highlighter_size_5': 'highlighter_size_5',
    'hiking': 'hiking',
    'history': 'history',
    'history_2': 'history_2',
    'history_edu': 'history_edu',
    'history_off': 'history_off',
    'history_toggle_off': 'history_toggle_off',
    'hive': 'hive',
    'hls': 'hls',
    'hls_off': 'hls_off',
    'holiday_village': 'holiday_village',
    'home': 'home',
    'home_and_garden': 'home_and_garden',
    'home_app_logo': 'home_app_logo',
    'home_health': 'home_health',
    'home_improvement_and_tools': 'home_improvement_and_tools',
    'home_iot_device': 'home_iot_device',
    'home_max': 'home_max',
    'home_max_dots': 'home_max_dots',
    'home_mini': 'home_mini',
    'home_pin': 'home_pin',
    'home_repair_service': 'home_repair_service',
    'home_speaker': 'home_speaker',
    'home_storage': 'home_storage',
    'home_work': 'home_work',
    'horizontal_distribute': 'horizontal_distribute',
    'horizontal_rule': 'horizontal_rule',
    'horizontal_split': 'horizontal_split',
    'host': 'host',
    'hot_tub': 'hot_tub',
    'hotel': 'hotel',
    'hotel_class': 'hotel_class',
    'hourglass': 'hourglass',
    'hourglass_arrow_down': 'hourglass_arrow_down',
    'hourglass_arrow_up': 'hourglass_arrow_up',
    'hourglass_bottom': 'hourglass_bottom',
    'hourglass_disabled': 'hourglass_disabled',
    'hourglass_empty': 'hourglass_empty',
    'hourglass_pause': 'hourglass_pause',
    'hourglass_top': 'hourglass_top',
    'house': 'house',
    'house_siding': 'house_siding',
    'house_with_shield': 'house_with_shield',
    'houseboat': 'houseboat',
    'household_supplies': 'household_supplies',
    'hov': 'hov',
    'how_to_reg': 'how_to_reg',
    'how_to_vote': 'how_to_vote',
    'hr_resting': 'hr_resting',
    'html': 'html',
    'http': 'http',
    'hub': 'hub',
    'humerus': 'humerus',
    'humerus_alt': 'humerus_alt',
    'humidity_high': 'humidity_high',
    'humidity_indoor': 'humidity_indoor',
    'humidity_low': 'humidity_low',
    'humidity_mid': 'humidity_mid',
    'humidity_percentage': 'humidity_percentage',
    'hvac': 'hvac',
    'ice_skating': 'ice_skating',
    'icecream': 'icecream',
    'id_card': 'id_card',
    'identity_aware_proxy': 'identity_aware_proxy',
    'identity_platform': 'identity_platform',
    'ifl': 'ifl',
    'iframe': 'iframe',
    'iframe_off': 'iframe_off',
    'image': 'image',
    'image_aspect_ratio': 'image_aspect_ratio',
    'image_search': 'image_search',
    'imagesearch_roller': 'imagesearch_roller',
    'imagesmode': 'imagesmode',
    'immunology': 'immunology',
    'import_contacts': 'import_contacts',
    'important_devices': 'important_devices',
    'in_home_mode': 'in_home_mode',
    'inactive_order': 'inactive_order',
    'inbox': 'inbox',
    'inbox_customize': 'inbox_customize',
    'inbox_text': 'inbox_text',
    'incomplete_circle': 'incomplete_circle',
    'indeterminate_check_box': 'indeterminate_check_box',
    'indeterminate_question_box': 'indeterminate_question_box',
    'info': 'info',
    'info_i': 'info_i',
    'infrared': 'infrared',
    'ink_eraser': 'ink_eraser',
    'ink_eraser_off': 'ink_eraser_off',
    'ink_highlighter': 'ink_highlighter',
    'ink_highlighter_move': 'ink_highlighter_move',
    'ink_marker': 'ink_marker',
    'ink_pen': 'ink_pen',
    'ink_selection': 'ink_selection',
    'inpatient': 'inpatient',
    'input': 'input',
    'input_circle': 'input_circle',
    'insert_chart': 'insert_chart',
    'insert_page_break': 'insert_page_break',
    'insert_text': 'insert_text',
    'install_desktop': 'install_desktop',
    'install_mobile': 'install_mobile',
    'instant_mix': 'instant_mix',
    'integration_instructions': 'integration_instructions',
    'interactive_space': 'interactive_space',
    'interests': 'interests',
    'interpreter_mode': 'interpreter_mode',
    'inventory': 'inventory',
    'inventory_2': 'inventory_2',
    'invert_colors': 'invert_colors',
    'invert_colors_off': 'invert_colors_off',
    'ios': 'ios',
    'ios_share': 'ios_share',
    'iron': 'iron',
    'jamboard_kiosk': 'jamboard_kiosk',
    'javascript': 'javascript',
    'join': 'join',
    'join_inner': 'join_inner',
    'join_left': 'join_left',
    'join_right': 'join_right',
    'joystick': 'joystick',
    'jump_to_element': 'jump_to_element',
    'kayaking': 'kayaking',
    'kebab_dining': 'kebab_dining',
    'keep': 'keep',
    'keep_off': 'keep_off',
    'keep_public': 'keep_public',
    'kettle': 'kettle',
    'key': 'key',
    'key_off': 'key_off',
    'key_vertical': 'key_vertical',
    'key_visualizer': 'key_visualizer',
    'keyboard': 'keyboard',
    'keyboard_alt': 'keyboard_alt',
    'keyboard_arrow_down': 'keyboard_arrow_down',
    'keyboard_arrow_left': 'keyboard_arrow_left',
    'keyboard_arrow_right': 'keyboard_arrow_right',
    'keyboard_arrow_up': 'keyboard_arrow_up',
    'keyboard_backspace': 'keyboard_backspace',
    'keyboard_capslock': 'keyboard_capslock',
    'keyboard_capslock_badge': 'keyboard_capslock_badge',
    'keyboard_command_key': 'keyboard_command_key',
    'keyboard_control_key': 'keyboard_control_key',
    'keyboard_double_arrow_down': 'keyboard_double_arrow_down',
    'keyboard_double_arrow_left': 'keyboard_double_arrow_left',
    'keyboard_double_arrow_right': 'keyboard_double_arrow_right',
    'keyboard_double_arrow_up': 'keyboard_double_arrow_up',
    'keyboard_external_input': 'keyboard_external_input',
    'keyboard_full': 'keyboard_full',
    'keyboard_hide': 'keyboard_hide',
    'keyboard_keys': 'keyboard_keys',
    'keyboard_lock': 'keyboard_lock',
    'keyboard_lock_off': 'keyboard_lock_off',
    'keyboard_off': 'keyboard_off',
    'keyboard_onscreen': 'keyboard_onscreen',
    'keyboard_option_key': 'keyboard_option_key',
    'keyboard_previous_language': 'keyboard_previous_language',
    'keyboard_return': 'keyboard_return',
    'keyboard_tab': 'keyboard_tab',
    'keyboard_tab_rtl': 'keyboard_tab_rtl',
    'kid_star': 'kid_star',
    'king_bed': 'king_bed',
    'kitchen': 'kitchen',
    'kitesurfing': 'kitesurfing',
    'lab_panel': 'lab_panel',
    'lab_profile': 'lab_profile',
    'lab_research': 'lab_research',
    'label': 'label',
    'label_important': 'label_important',
    'label_off': 'label_off',
    'labs': 'labs',
    'lan': 'lan',
    'landscape': 'landscape',
    'landscape_2': 'landscape_2',
    'landscape_2_off': 'landscape_2_off',
    'landslide': 'landslide',
    'language': 'language',
    'language_chinese_array': 'language_chinese_array',
    'language_chinese_cangjie': 'language_chinese_cangjie',
    'language_chinese_dayi': 'language_chinese_dayi',
    'language_chinese_pinyin': 'language_chinese_pinyin',
    'language_chinese_quick': 'language_chinese_quick',
    'language_chinese_wubi': 'language_chinese_wubi',
    'language_french': 'language_french',
    'language_gb_english': 'language_gb_english',
    'language_international': 'language_international',
    'language_japanese_kana': 'language_japanese_kana',
    'language_korean_latin': 'language_korean_latin',
    'language_pinyin': 'language_pinyin',
    'language_spanish': 'language_spanish',
    'language_us': 'language_us',
    'language_us_colemak': 'language_us_colemak',
    'language_us_dvorak': 'language_us_dvorak',
    'laps': 'laps',
    'laptop_car': 'laptop_car',
    'laptop_chromebook': 'laptop_chromebook',
    'laptop_mac': 'laptop_mac',
    'laptop_windows': 'laptop_windows',
    'lasso_select': 'lasso_select',
    'last_page': 'last_page',
    'laundry': 'laundry',
    'layers': 'layers',
    'layers_clear': 'layers_clear',
    'lda': 'lda',
    'leaderboard': 'leaderboard',
    'leak_add': 'leak_add',
    'leak_remove': 'leak_remove',
    'left_click': 'left_click',
    'left_panel_close': 'left_panel_close',
    'left_panel_open': 'left_panel_open',
    'legend_toggle': 'legend_toggle',
    'lens_blur': 'lens_blur',
    'letter_switch': 'letter_switch',
    'library_add': 'library_add',
    'library_add_check': 'library_add_check',
    'library_books': 'library_books',
    'library_music': 'library_music',
    'license': 'license',
    'lift_to_talk': 'lift_to_talk',
    'light': 'light',
    'light_group': 'light_group',
    'light_mode': 'light_mode',
    'light_off': 'light_off',
    'lightbulb': 'lightbulb',
    'lightbulb_2': 'lightbulb_2',
    'lightbulb_circle': 'lightbulb_circle',
    'lightning_stand': 'lightning_stand',
    'line_axis': 'line_axis',
    'line_curve': 'line_curve',
    'line_end': 'line_end',
    'line_end_arrow': 'line_end_arrow',
    'line_end_arrow_notch': 'line_end_arrow_notch',
    'line_end_circle': 'line_end_circle',
    'line_end_diamond': 'line_end_diamond',
    'line_end_square': 'line_end_square',
    'line_start': 'line_start',
    'line_start_arrow': 'line_start_arrow',
    'line_start_arrow_notch': 'line_start_arrow_notch',
    'line_start_circle': 'line_start_circle',
    'line_start_diamond': 'line_start_diamond',
    'line_start_square': 'line_start_square',
    'line_style': 'line_style',
    'line_weight': 'line_weight',
    'linear_scale': 'linear_scale',
    'link': 'link',
    'link_off': 'link_off',
    'linked_camera': 'linked_camera',
    'linked_services': 'linked_services',
    'liquor': 'liquor',
    'list': 'list',
    'list_alt': 'list_alt',
    'list_alt_add': 'list_alt_add',
    'list_alt_check': 'list_alt_check',
    'lists': 'lists',
    'live_help': 'live_help',
    'live_tv': 'live_tv',
    'living': 'living',
    'local_activity': 'local_activity',
    'local_atm': 'local_atm',
    'local_bar': 'local_bar',
    'local_cafe': 'local_cafe',
    'local_car_wash': 'local_car_wash',
    'local_convenience_store': 'local_convenience_store',
    'local_dining': 'local_dining',
    'local_drink': 'local_drink',
    'local_fire_department': 'local_fire_department',
    'local_florist': 'local_florist',
    'local_gas_station': 'local_gas_station',
    'local_hospital': 'local_hospital',
    'local_laundry_service': 'local_laundry_service',
    'local_library': 'local_library',
    'local_mall': 'local_mall',
    'local_parking': 'local_parking',
    'local_pharmacy': 'local_pharmacy',
    'local_pizza': 'local_pizza',
    'local_police': 'local_police',
    'local_post_office': 'local_post_office',
    'local_see': 'local_see',
    'local_shipping': 'local_shipping',
    'local_taxi': 'local_taxi',
    'location_away': 'location_away',
    'location_chip': 'location_chip',
    'location_city': 'location_city',
    'location_disabled': 'location_disabled',
    'location_home': 'location_home',
    'location_off': 'location_off',
    'location_on': 'location_on',
    'location_searching': 'location_searching',
    'lock': 'lock',
    'lock_clock': 'lock_clock',
    'lock_open': 'lock_open',
    'lock_open_right': 'lock_open_right',
    'lock_person': 'lock_person',
    'lock_reset': 'lock_reset',
    'login': 'login',
    'logo_dev': 'logo_dev',
    'logout': 'logout',
    'looks': 'looks',
    'looks_3': 'looks_3',
    'looks_4': 'looks_4',
    'looks_5': 'looks_5',
    'looks_6': 'looks_6',
    'looks_one': 'looks_one',
    'looks_two': 'looks_two',
    'loupe': 'loupe',
    'low_density': 'low_density',
    'low_priority': 'low_priority',
    'lowercase': 'lowercase',
    'loyalty': 'loyalty',
    'lte_mobiledata': 'lte_mobiledata',
    'lte_mobiledata_badge': 'lte_mobiledata_badge',
    'lte_plus_mobiledata': 'lte_plus_mobiledata',
    'lte_plus_mobiledata_badge': 'lte_plus_mobiledata_badge',
    'luggage': 'luggage',
    'lunch_dining': 'lunch_dining',
    'lyrics': 'lyrics',
    'macro_auto': 'macro_auto',
    'macro_off': 'macro_off',
    'magnification_large': 'magnification_large',
    'magnification_small': 'magnification_small',
    'magnify_docked': 'magnify_docked',
    'magnify_fullscreen': 'magnify_fullscreen',
    'mail': 'mail',
    'mail_lock': 'mail_lock',
    'mail_off': 'mail_off',
    'male': 'male',
    'man': 'man',
    'man_2': 'man_2',
    'man_3': 'man_3',
    'man_4': 'man_4',
    'manage_accounts': 'manage_accounts',
    'manage_history': 'manage_history',
    'manage_search': 'manage_search',
    'manga': 'manga',
    'manufacturing': 'manufacturing',
    'map': 'map',
    'map_search': 'map_search',
    'maps_ugc': 'maps_ugc',
    'margin': 'margin',
    'mark_as_unread': 'mark_as_unread',
    'mark_chat_read': 'mark_chat_read',
    'mark_chat_unread': 'mark_chat_unread',
    'mark_email_read': 'mark_email_read',
    'mark_email_unread': 'mark_email_unread',
    'mark_unread_chat_alt': 'mark_unread_chat_alt',
    'markdown': 'markdown',
    'markdown_copy': 'markdown_copy',
    'markdown_paste': 'markdown_paste',
    'markunread_mailbox': 'markunread_mailbox',
    'masked_transitions': 'masked_transitions',
    'masked_transitions_add': 'masked_transitions_add',
    'masks': 'masks',
    'match_case': 'match_case',
    'match_case_off': 'match_case_off',
    'match_word': 'match_word',
    'matter': 'matter',
    'maximize': 'maximize',
    'measuring_tape': 'measuring_tape',
    'media_bluetooth_off': 'media_bluetooth_off',
    'media_bluetooth_on': 'media_bluetooth_on',
    'media_link': 'media_link',
    'media_output': 'media_output',
    'media_output_off': 'media_output_off',
    'mediation': 'mediation',
    'medical_information': 'medical_information',
    'medical_mask': 'medical_mask',
    'medical_services': 'medical_services',
    'medication': 'medication',
    'medication_liquid': 'medication_liquid',
    'meeting_room': 'meeting_room',
    'memory': 'memory',
    'memory_alt': 'memory_alt',
    'menstrual_health': 'menstrual_health',
    'menu': 'menu',
    'menu_book': 'menu_book',
    'menu_open': 'menu_open',
    'merge': 'merge',
    'merge_type': 'merge_type',
    'metabolism': 'metabolism',
    'metro': 'metro',
    'mfg_nest_yale_lock': 'mfg_nest_yale_lock',
    'mic': 'mic',
    'mic_alert': 'mic_alert',
    'mic_double': 'mic_double',
    'mic_external_off': 'mic_external_off',
    'mic_external_on': 'mic_external_on',
    'mic_off': 'mic_off',
    'microbiology': 'microbiology',
    'microwave': 'microwave',
    'microwave_gen': 'microwave_gen',
    'military_tech': 'military_tech',
    'mimo': 'mimo',
    'mimo_disconnect': 'mimo_disconnect',
    'mindfulness': 'mindfulness',
    'minimize': 'minimize',
    'minor_crash': 'minor_crash',
    'mintmark': 'mintmark',
    'missed_video_call': 'missed_video_call',
    'missing_controller': 'missing_controller',
    'mist': 'mist',
    'mitre': 'mitre',
    'mixture_med': 'mixture_med',
    'mms': 'mms',
    'mobile_friendly': 'mobile_friendly',
    'mobile_off': 'mobile_off',
    'mobile_screen_share': 'mobile_screen_share',
    'mobiledata_off': 'mobiledata_off',
    'mode_comment': 'mode_comment',
    'mode_cool': 'mode_cool',
    'mode_cool_off': 'mode_cool_off',
    'mode_dual': 'mode_dual',
    'mode_fan': 'mode_fan',
    'mode_fan_off': 'mode_fan_off',
    'mode_heat': 'mode_heat',
    'mode_heat_cool': 'mode_heat_cool',
    'mode_heat_off': 'mode_heat_off',
    'mode_night': 'mode_night',
    'mode_of_travel': 'mode_of_travel',
    'mode_off_on': 'mode_off_on',
    'mode_standby': 'mode_standby',
    'model_training': 'model_training',
    'modeling': 'modeling',
    'money': 'money',
    'money_bag': 'money_bag',
    'money_off': 'money_off',
    'monitor': 'monitor',
    'monitor_heart': 'monitor_heart',
    'monitor_weight': 'monitor_weight',
    'monitor_weight_gain': 'monitor_weight_gain',
    'monitor_weight_loss': 'monitor_weight_loss',
    'monitoring': 'monitoring',
    'monochrome_photos': 'monochrome_photos',
    'monorail': 'monorail',
    'mood': 'mood',
    'mood_bad': 'mood_bad',
    'mop': 'mop',
    'moped': 'moped',
    'more': 'more',
    'more_down': 'more_down',
    'more_horiz': 'more_horiz',
    'more_time': 'more_time',
    'more_up': 'more_up',
    'more_vert': 'more_vert',
    'mosque': 'mosque',
    'motion_blur': 'motion_blur',
    'motion_mode': 'motion_mode',
    'motion_photos_auto': 'motion_photos_auto',
    'motion_photos_off': 'motion_photos_off',
    'motion_photos_on': 'motion_photos_on',
    'motion_photos_paused': 'motion_photos_paused',
    'motion_play': 'motion_play',
    'motion_sensor_active': 'motion_sensor_active',
    'motion_sensor_alert': 'motion_sensor_alert',
    'motion_sensor_idle': 'motion_sensor_idle',
    'motion_sensor_urgent': 'motion_sensor_urgent',
    'motorcycle': 'motorcycle',
    'mountain_flag': 'mountain_flag',
    'mouse': 'mouse',
    'mouse_lock': 'mouse_lock',
    'mouse_lock_off': 'mouse_lock_off',
    'move': 'move',
    'move_down': 'move_down',
    'move_group': 'move_group',
    'move_item': 'move_item',
    'move_location': 'move_location',
    'move_selection_down': 'move_selection_down',
    'move_selection_left': 'move_selection_left',
    'move_selection_right': 'move_selection_right',
    'move_selection_up': 'move_selection_up',
    'move_to_inbox': 'move_to_inbox',
    'move_up': 'move_up',
    'moved_location': 'moved_location',
    'movie': 'movie',
    'movie_edit': 'movie_edit',
    'movie_info': 'movie_info',
    'movie_off': 'movie_off',
    'moving': 'moving',
    'moving_beds': 'moving_beds',
    'moving_ministry': 'moving_ministry',
    'mp': 'mp',
    'multicooker': 'multicooker',
    'multiline_chart': 'multiline_chart',
    'multimodal_hand_eye': 'multimodal_hand_eye',
    'multiple_airports': 'multiple_airports',
    'multiple_stop': 'multiple_stop',
    'museum': 'museum',
    'music_cast': 'music_cast',
    'music_note': 'music_note',
    'music_note_add': 'music_note_add',
    'music_off': 'music_off',
    'music_video': 'music_video',
    'my_location': 'my_location',
    'mystery': 'mystery',
    'nat': 'nat',
    'nature': 'nature',
    'nature_people': 'nature_people',
    'navigation': 'navigation',
    'near_me': 'near_me',
    'near_me_disabled': 'near_me_disabled',
    'nearby': 'nearby',
    'nearby_error': 'nearby_error',
    'nearby_off': 'nearby_off',
    'nephrology': 'nephrology',
    'nest_audio': 'nest_audio',
    'nest_cam_floodlight': 'nest_cam_floodlight',
    'nest_cam_indoor': 'nest_cam_indoor',
    'nest_cam_iq': 'nest_cam_iq',
    'nest_cam_iq_outdoor': 'nest_cam_iq_outdoor',
    'nest_cam_magnet_mount': 'nest_cam_magnet_mount',
    'nest_cam_outdoor': 'nest_cam_outdoor',
    'nest_cam_stand': 'nest_cam_stand',
    'nest_cam_wall_mount': 'nest_cam_wall_mount',
    'nest_cam_wired_stand': 'nest_cam_wired_stand',
    'nest_clock_farsight_analog': 'nest_clock_farsight_analog',
    'nest_clock_farsight_digital': 'nest_clock_farsight_digital',
    'nest_connect': 'nest_connect',
    'nest_detect': 'nest_detect',
    'nest_display': 'nest_display',
    'nest_display_max': 'nest_display_max',
    'nest_doorbell_visitor': 'nest_doorbell_visitor',
    'nest_eco_leaf': 'nest_eco_leaf',
    'nest_farsight_weather': 'nest_farsight_weather',
    'nest_found_savings': 'nest_found_savings',
    'nest_gale_wifi': 'nest_gale_wifi',
    'nest_heat_link_e': 'nest_heat_link_e',
    'nest_heat_link_gen_3': 'nest_heat_link_gen_3',
    'nest_hello_doorbell': 'nest_hello_doorbell',
    'nest_mini': 'nest_mini',
    'nest_multi_room': 'nest_multi_room',
    'nest_protect': 'nest_protect',
    'nest_remote': 'nest_remote',
    'nest_remote_comfort_sensor': 'nest_remote_comfort_sensor',
    'nest_secure_alarm': 'nest_secure_alarm',
    'nest_sunblock': 'nest_sunblock',
    'nest_tag': 'nest_tag',
    'nest_thermostat': 'nest_thermostat',
    'nest_thermostat_e_eu': 'nest_thermostat_e_eu',
    'nest_thermostat_gen_3': 'nest_thermostat_gen_3',
    'nest_thermostat_sensor': 'nest_thermostat_sensor',
    'nest_thermostat_sensor_eu': 'nest_thermostat_sensor_eu',
    'nest_thermostat_zirconium_eu': 'nest_thermostat_zirconium_eu',
    'nest_true_radiant': 'nest_true_radiant',
    'nest_wake_on_approach': 'nest_wake_on_approach',
    'nest_wake_on_press': 'nest_wake_on_press',
    'nest_wifi_point': 'nest_wifi_point',
    'nest_wifi_pro': 'nest_wifi_pro',
    'nest_wifi_pro_2': 'nest_wifi_pro_2',
    'nest_wifi_router': 'nest_wifi_router',
    'network_cell': 'network_cell',
    'network_check': 'network_check',
    'network_intel_node': 'network_intel_node',
    'network_intelligence': 'network_intelligence',
    'network_intelligence_history': 'network_intelligence_history',
    'network_intelligence_update': 'network_intelligence_update',
    'network_locked': 'network_locked',
    'network_manage': 'network_manage',
    'network_node': 'network_node',
    'network_ping': 'network_ping',
    'network_wifi': 'network_wifi',
    'network_wifi_1_bar': 'network_wifi_1_bar',
    'network_wifi_1_bar_locked': 'network_wifi_1_bar_locked',
    'network_wifi_2_bar': 'network_wifi_2_bar',
    'network_wifi_2_bar_locked': 'network_wifi_2_bar_locked',
    'network_wifi_3_bar': 'network_wifi_3_bar',
    'network_wifi_3_bar_locked': 'network_wifi_3_bar_locked',
    'network_wifi_locked': 'network_wifi_locked',
    'neurology': 'neurology',
    'new_label': 'new_label',
    'new_releases': 'new_releases',
    'new_window': 'new_window',
    'news': 'news',
    'newsmode': 'newsmode',
    'newspaper': 'newspaper',
    'newsstand': 'newsstand',
    'next_plan': 'next_plan',
    'next_week': 'next_week',
    'nfc': 'nfc',
    'night_shelter': 'night_shelter',
    'night_sight_auto': 'night_sight_auto',
    'night_sight_auto_off': 'night_sight_auto_off',
    'night_sight_max': 'night_sight_max',
    'nightlife': 'nightlife',
    'nightlight': 'nightlight',
    'nights_stay': 'nights_stay',
    'no_accounts': 'no_accounts',
    'no_adult_content': 'no_adult_content',
    'no_backpack': 'no_backpack',
    'no_crash': 'no_crash',
    'no_drinks': 'no_drinks',
    'no_encryption': 'no_encryption',
    'no_flash': 'no_flash',
    'no_food': 'no_food',
    'no_luggage': 'no_luggage',
    'no_meals': 'no_meals',
    'no_meeting_room': 'no_meeting_room',
    'no_photography': 'no_photography',
    'no_sim': 'no_sim',
    'no_sound': 'no_sound',
    'no_stroller': 'no_stroller',
    'no_transfer': 'no_transfer',
    'noise_aware': 'noise_aware',
    'noise_control_off': 'noise_control_off',
    'noise_control_on': 'noise_control_on',
    'nordic_walking': 'nordic_walking',
    'north': 'north',
    'north_east': 'north_east',
    'north_west': 'north_west',
    'not_accessible': 'not_accessible',
    'not_accessible_forward': 'not_accessible_forward',
    'not_listed_location': 'not_listed_location',
    'not_started': 'not_started',
    'note_add': 'note_add',
    'note_alt': 'note_alt',
    'note_stack': 'note_stack',
    'note_stack_add': 'note_stack_add',
    'notes': 'notes',
    'notification_add': 'notification_add',
    'notification_important': 'notification_important',
    'notification_multiple': 'notification_multiple',
    'notifications': 'notifications',
    'notifications_active': 'notifications_active',
    'notifications_off': 'notifications_off',
    'notifications_paused': 'notifications_paused',
    'notifications_unread': 'notifications_unread',
    'numbers': 'numbers',
    'nutrition': 'nutrition',
    'ods': 'ods',
    'odt': 'odt',
    'offline_bolt': 'offline_bolt',
    'offline_pin': 'offline_pin',
    'offline_pin_off': 'offline_pin_off',
    'offline_share': 'offline_share',
    'oil_barrel': 'oil_barrel',
    'on_device_training': 'on_device_training',
    'on_hub_device': 'on_hub_device',
    'oncology': 'oncology',
    'online_prediction': 'online_prediction',
    'onsen': 'onsen',
    'opacity': 'opacity',
    'open_in_browser': 'open_in_browser',
    'open_in_full': 'open_in_full',
    'open_in_new': 'open_in_new',
    'open_in_new_down': 'open_in_new_down',
    'open_in_new_off': 'open_in_new_off',
    'open_in_phone': 'open_in_phone',
    'open_jam': 'open_jam',
    'open_run': 'open_run',
    'open_with': 'open_with',
    'ophthalmology': 'ophthalmology',
    'oral_disease': 'oral_disease',
    'orbit': 'orbit',
    'order_approve': 'order_approve',
    'order_play': 'order_play',
    'orders': 'orders',
    'orthopedics': 'orthopedics',
    'other_admission': 'other_admission',
    'other_houses': 'other_houses',
    'outbound': 'outbound',
    'outbox': 'outbox',
    'outbox_alt': 'outbox_alt',
    'outdoor_garden': 'outdoor_garden',
    'outdoor_grill': 'outdoor_grill',
    'outgoing_mail': 'outgoing_mail',
    'outlet': 'outlet',
    'outpatient': 'outpatient',
    'outpatient_med': 'outpatient_med',
    'output': 'output',
    'output_circle': 'output_circle',
    'oven': 'oven',
    'oven_gen': 'oven_gen',
    'overview': 'overview',
    'overview_key': 'overview_key',
    'owl': 'owl',
    'oxygen_saturation': 'oxygen_saturation',
    'p2p': 'p2p',
    'pace': 'pace',
    'pacemaker': 'pacemaker',
    'package': 'package',
    'package_2': 'package_2',
    'padding': 'padding',
    'page_control': 'page_control',
    'page_footer': 'page_footer',
    'page_header': 'page_header',
    'page_info': 'page_info',
    'pageless': 'pageless',
    'pages': 'pages',
    'pageview': 'pageview',
    'paid': 'paid',
    'palette': 'palette',
    'pallet': 'pallet',
    'pan_tool': 'pan_tool',
    'pan_tool_alt': 'pan_tool_alt',
    'pan_zoom': 'pan_zoom',
    'panorama': 'panorama',
    'panorama_horizontal': 'panorama_horizontal',
    'panorama_photosphere': 'panorama_photosphere',
    'panorama_vertical': 'panorama_vertical',
    'panorama_wide_angle': 'panorama_wide_angle',
    'paragliding': 'paragliding',
    'park': 'park',
    'partly_cloudy_day': 'partly_cloudy_day',
    'partly_cloudy_night': 'partly_cloudy_night',
    'partner_exchange': 'partner_exchange',
    'partner_reports': 'partner_reports',
    'party_mode': 'party_mode',
    'passkey': 'passkey',
    'password': 'password',
    'password_2': 'password_2',
    'password_2_off': 'password_2_off',
    'patient_list': 'patient_list',
    'pattern': 'pattern',
    'pause': 'pause',
    'pause_circle': 'pause_circle',
    'pause_presentation': 'pause_presentation',
    'payments': 'payments',
    'pedal_bike': 'pedal_bike',
    'pediatrics': 'pediatrics',
    'pen_size_1': 'pen_size_1',
    'pen_size_2': 'pen_size_2',
    'pen_size_3': 'pen_size_3',
    'pen_size_4': 'pen_size_4',
    'pen_size_5': 'pen_size_5',
    'pending': 'pending',
    'pending_actions': 'pending_actions',
    'pentagon': 'pentagon',
    'percent': 'percent',
    'pergola': 'pergola',
    'perm_camera_mic': 'perm_camera_mic',
    'perm_contact_calendar': 'perm_contact_calendar',
    'perm_data_setting': 'perm_data_setting',
    'perm_device_information': 'perm_device_information',
    'perm_media': 'perm_media',
    'perm_phone_msg': 'perm_phone_msg',
    'perm_scan_wifi': 'perm_scan_wifi',
    'person': 'person',
    'person_2': 'person_2',
    'person_3': 'person_3',
    'person_4': 'person_4',
    'person_add': 'person_add',
    'person_add_disabled': 'person_add_disabled',
    'person_alert': 'person_alert',
    'person_apron': 'person_apron',
    'person_book': 'person_book',
    'person_cancel': 'person_cancel',
    'person_celebrate': 'person_celebrate',
    'person_check': 'person_check',
    'person_edit': 'person_edit',
    'person_off': 'person_off',
    'person_pin': 'person_pin',
    'person_pin_circle': 'person_pin_circle',
    'person_play': 'person_play',
    'person_raised_hand': 'person_raised_hand',
    'person_remove': 'person_remove',
    'person_search': 'person_search',
    'personal_bag': 'personal_bag',
    'personal_bag_off': 'personal_bag_off',
    'personal_bag_question': 'personal_bag_question',
    'personal_injury': 'personal_injury',
    'personal_places': 'personal_places',
    'pest_control': 'pest_control',
    'pest_control_rodent': 'pest_control_rodent',
    'pet_supplies': 'pet_supplies',
    'pets': 'pets',
    'phishing': 'phishing',
    'phone_android': 'phone_android',
    'phone_bluetooth_speaker': 'phone_bluetooth_speaker',
    'phone_callback': 'phone_callback',
    'phone_disabled': 'phone_disabled',
    'phone_enabled': 'phone_enabled',
    'phone_forwarded': 'phone_forwarded',
    'phone_in_talk': 'phone_in_talk',
    'phone_iphone': 'phone_iphone',
    'phone_locked': 'phone_locked',
    'phone_missed': 'phone_missed',
    'phone_paused': 'phone_paused',
    'phonelink_erase': 'phonelink_erase',
    'phonelink_lock': 'phonelink_lock',
    'phonelink_off': 'phonelink_off',
    'phonelink_ring': 'phonelink_ring',
    'phonelink_ring_off': 'phonelink_ring_off',
    'phonelink_setup': 'phonelink_setup',
    'photo': 'photo',
    'photo_album': 'photo_album',
    'photo_auto_merge': 'photo_auto_merge',
    'photo_camera': 'photo_camera',
    'photo_camera_back': 'photo_camera_back',
    'photo_camera_front': 'photo_camera_front',
    'photo_frame': 'photo_frame',
    'photo_library': 'photo_library',
    'photo_prints': 'photo_prints',
    'photo_size_select_large': 'photo_size_select_large',
    'photo_size_select_small': 'photo_size_select_small',
    'php': 'php',
    'physical_therapy': 'physical_therapy',
    'piano': 'piano',
    'piano_off': 'piano_off',
    'picture_as_pdf': 'picture_as_pdf',
    'picture_in_picture': 'picture_in_picture',
    'picture_in_picture_alt': 'picture_in_picture_alt',
    'picture_in_picture_center': 'picture_in_picture_center',
    'picture_in_picture_large': 'picture_in_picture_large',
    'picture_in_picture_medium': 'picture_in_picture_medium',
    'picture_in_picture_mobile': 'picture_in_picture_mobile',
    'picture_in_picture_off': 'picture_in_picture_off',
    'picture_in_picture_small': 'picture_in_picture_small',
    'pie_chart': 'pie_chart',
    'pill': 'pill',
    'pill_off': 'pill_off',
    'pin': 'pin',
    'pin_drop': 'pin_drop',
    'pin_end': 'pin_end',
    'pin_invoke': 'pin_invoke',
    'pinboard': 'pinboard',
    'pinboard_unread': 'pinboard_unread',
    'pinch': 'pinch',
    'pinch_zoom_in': 'pinch_zoom_in',
    'pinch_zoom_out': 'pinch_zoom_out',
    'pip': 'pip',
    'pip_exit': 'pip_exit',
    'pivot_table_chart': 'pivot_table_chart',
    'place_item': 'place_item',
    'plagiarism': 'plagiarism',
    'planet': 'planet',
    'planner_banner_ad_pt': 'planner_banner_ad_pt',
    'planner_review': 'planner_review',
    'play_arrow': 'play_arrow',
    'play_circle': 'play_circle',
    'play_disabled': 'play_disabled',
    'play_for_work': 'play_for_work',
    'play_lesson': 'play_lesson',
    'play_pause': 'play_pause',
    'playing_cards': 'playing_cards',
    'playlist_add': 'playlist_add',
    'playlist_add_check': 'playlist_add_check',
    'playlist_add_check_circle': 'playlist_add_check_circle',
    'playlist_add_circle': 'playlist_add_circle',
    'playlist_play': 'playlist_play',
    'playlist_remove': 'playlist_remove',
    'plumbing': 'plumbing',
    'podcasts': 'podcasts',
    'podiatry': 'podiatry',
    'podium': 'podium',
    'point_of_sale': 'point_of_sale',
    'point_scan': 'point_scan',
    'poker_chip': 'poker_chip',
    'policy': 'policy',
    'policy_alert': 'policy_alert',
    'polyline': 'polyline',
    'polymer': 'polymer',
    'pool': 'pool',
    'portable_wifi_off': 'portable_wifi_off',
    'position_bottom_left': 'position_bottom_left',
    'position_bottom_right': 'position_bottom_right',
    'position_top_right': 'position_top_right',
    'post': 'post',
    'post_add': 'post_add',
    'potted_plant': 'potted_plant',
    'power': 'power',
    'power_input': 'power_input',
    'power_off': 'power_off',
    'power_settings_circle': 'power_settings_circle',
    'power_settings_new': 'power_settings_new',
    'prayer_times': 'prayer_times',
    'precision_manufacturing': 'precision_manufacturing',
    'pregnancy': 'pregnancy',
    'pregnant_woman': 'pregnant_woman',
    'preliminary': 'preliminary',
    'prescriptions': 'prescriptions',
    'present_to_all': 'present_to_all',
    'preview': 'preview',
    'preview_off': 'preview_off',
    'price_change': 'price_change',
    'price_check': 'price_check',
    'print': 'print',
    'print_add': 'print_add',
    'print_connect': 'print_connect',
    'print_disabled': 'print_disabled',
    'print_error': 'print_error',
    'print_lock': 'print_lock',
    'priority': 'priority',
    'priority_high': 'priority_high',
    'privacy': 'privacy',
    'privacy_tip': 'privacy_tip',
    'private_connectivity': 'private_connectivity',
    'problem': 'problem',
    'procedure': 'procedure',
    'process_chart': 'process_chart',
    'production_quantity_limits': 'production_quantity_limits',
    'productivity': 'productivity',
    'progress_activity': 'progress_activity',
    'prompt_suggestion': 'prompt_suggestion',
    'propane': 'propane',
    'propane_tank': 'propane_tank',
    'psychiatry': 'psychiatry',
    'psychology': 'psychology',
    'psychology_alt': 'psychology_alt',
    'public': 'public',
    'public_off': 'public_off',
    'publish': 'publish',
    'published_with_changes': 'published_with_changes',
    'pulmonology': 'pulmonology',
    'pulse_alert': 'pulse_alert',
    'punch_clock': 'punch_clock',
    'qr_code': 'qr_code',
    'qr_code_2': 'qr_code_2',
    'qr_code_2_add': 'qr_code_2_add',
    'qr_code_scanner': 'qr_code_scanner',
    'query_stats': 'query_stats',
    'question_exchange': 'question_exchange',
    'question_mark': 'question_mark',
    'queue_music': 'queue_music',
    'queue_play_next': 'queue_play_next',
    'quick_phrases': 'quick_phrases',
    'quick_reference': 'quick_reference',
    'quick_reference_all': 'quick_reference_all',
    'quick_reorder': 'quick_reorder',
    'quickreply': 'quickreply',
    'quiz': 'quiz',
    'r_mobiledata': 'r_mobiledata',
    'radar': 'radar',
    'radio': 'radio',
    'radio_button_checked': 'radio_button_checked',
    'radio_button_partial': 'radio_button_partial',
    'radio_button_unchecked': 'radio_button_unchecked',
    'radiology': 'radiology',
    'railway_alert': 'railway_alert',
    'railway_alert_2': 'railway_alert_2',
    'rainy': 'rainy',
    'rainy_heavy': 'rainy_heavy',
    'rainy_light': 'rainy_light',
    'rainy_snow': 'rainy_snow',
    'ramen_dining': 'ramen_dining',
    'ramp_left': 'ramp_left',
    'ramp_right': 'ramp_right',
    'range_hood': 'range_hood',
    'rate_review': 'rate_review',
    'raven': 'raven',
    'raw_off': 'raw_off',
    'raw_on': 'raw_on',
    'read_more': 'read_more',
    'readiness_score': 'readiness_score',
    'real_estate_agent': 'real_estate_agent',
    'rear_camera': 'rear_camera',
    'rebase': 'rebase',
    'rebase_edit': 'rebase_edit',
    'receipt': 'receipt',
    'receipt_long': 'receipt_long',
    'receipt_long_off': 'receipt_long_off',
    'recent_actors': 'recent_actors',
    'recent_patient': 'recent_patient',
    'recenter': 'recenter',
    'recommend': 'recommend',
    'record_voice_over': 'record_voice_over',
    'rectangle': 'rectangle',
    'recycling': 'recycling',
    'redeem': 'redeem',
    'redo': 'redo',
    'reduce_capacity': 'reduce_capacity',
    'refresh': 'refresh',
    'regular_expression': 'regular_expression',
    'relax': 'relax',
    'release_alert': 'release_alert',
    'remember_me': 'remember_me',
    'reminder': 'reminder',
    'remote_gen': 'remote_gen',
    'remove': 'remove',
    'remove_done': 'remove_done',
    'remove_from_queue': 'remove_from_queue',
    'remove_moderator': 'remove_moderator',
    'remove_road': 'remove_road',
    'remove_selection': 'remove_selection',
    'remove_shopping_cart': 'remove_shopping_cart',
    'reopen_window': 'reopen_window',
    'reorder': 'reorder',
    'repartition': 'repartition',
    'repeat': 'repeat',
    'repeat_on': 'repeat_on',
    'repeat_one': 'repeat_one',
    'repeat_one_on': 'repeat_one_on',
    'replace_audio': 'replace_audio',
    'replace_image': 'replace_image',
    'replace_video': 'replace_video',
    'replay': 'replay',
    'replay_10': 'replay_10',
    'replay_30': 'replay_30',
    'replay_5': 'replay_5',
    'reply': 'reply',
    'reply_all': 'reply_all',
    'report': 'report',
    'report_off': 'report_off',
    'request_page': 'request_page',
    'request_quote': 'request_quote',
    'reset_brightness': 'reset_brightness',
    'reset_focus': 'reset_focus',
    'reset_image': 'reset_image',
    'reset_iso': 'reset_iso',
    'reset_settings': 'reset_settings',
    'reset_shadow': 'reset_shadow',
    'reset_shutter_speed': 'reset_shutter_speed',
    'reset_tv': 'reset_tv',
    'reset_white_balance': 'reset_white_balance',
    'reset_wrench': 'reset_wrench',
    'resize': 'resize',
    'respiratory_rate': 'respiratory_rate',
    'responsive_layout': 'responsive_layout',
    'restart_alt': 'restart_alt',
    'restaurant': 'restaurant',
    'restore_from_trash': 'restore_from_trash',
    'restore_page': 'restore_page',
    'resume': 'resume',
    'reviews': 'reviews',
    'rewarded_ads': 'rewarded_ads',
    'rheumatology': 'rheumatology',
    'rib_cage': 'rib_cage',
    'rice_bowl': 'rice_bowl',
    'right_click': 'right_click',
    'right_panel_close': 'right_panel_close',
    'right_panel_open': 'right_panel_open',
    'ring_volume': 'ring_volume',
    'ripples': 'ripples',
    'road': 'road',
    'robot': 'robot',
    'robot_2': 'robot_2',
    'rocket': 'rocket',
    'rocket_launch': 'rocket_launch',
    'roller_shades': 'roller_shades',
    'roller_shades_closed': 'roller_shades_closed',
    'roller_skating': 'roller_skating',
    'roofing': 'roofing',
    'room_preferences': 'room_preferences',
    'room_service': 'room_service',
    'rotate_90_degrees_ccw': 'rotate_90_degrees_ccw',
    'rotate_90_degrees_cw': 'rotate_90_degrees_cw',
    'rotate_auto': 'rotate_auto',
    'rotate_left': 'rotate_left',
    'rotate_right': 'rotate_right',
    'roundabout_left': 'roundabout_left',
    'roundabout_right': 'roundabout_right',
    'rounded_corner': 'rounded_corner',
    'route': 'route',
    'router': 'router',
    'routine': 'routine',
    'rowing': 'rowing',
    'rss_feed': 'rss_feed',
    'rsvp': 'rsvp',
    'rtt': 'rtt',
    'rubric': 'rubric',
    'rule': 'rule',
    'rule_folder': 'rule_folder',
    'rule_settings': 'rule_settings',
    'run_circle': 'run_circle',
    'running_with_errors': 'running_with_errors',
    'rv_hookup': 'rv_hookup',
    'safety_check': 'safety_check',
    'safety_check_off': 'safety_check_off',
    'safety_divider': 'safety_divider',
    'sailing': 'sailing',
    'salinity': 'salinity',
    'sanitizer': 'sanitizer',
    'satellite': 'satellite',
    'satellite_alt': 'satellite_alt',
    'sauna': 'sauna',
    'save': 'save',
    'save_as': 'save_as',
    'save_clock': 'save_clock',
    'saved_search': 'saved_search',
    'savings': 'savings',
    'scale': 'scale',
    'scan': 'scan',
    'scan_delete': 'scan_delete',
    'scanner': 'scanner',
    'scatter_plot': 'scatter_plot',
    'scene': 'scene',
    'schedule': 'schedule',
    'schedule_send': 'schedule_send',
    'schema': 'schema',
    'school': 'school',
    'science': 'science',
    'science_off': 'science_off',
    'scooter': 'scooter',
    'score': 'score',
    'scoreboard': 'scoreboard',
    'screen_lock_landscape': 'screen_lock_landscape',
    'screen_lock_portrait': 'screen_lock_portrait',
    'screen_lock_rotation': 'screen_lock_rotation',
    'screen_record': 'screen_record',
    'screen_rotation': 'screen_rotation',
    'screen_rotation_alt': 'screen_rotation_alt',
    'screen_rotation_up': 'screen_rotation_up',
    'screen_search_desktop': 'screen_search_desktop',
    'screen_share': 'screen_share',
    'screenshot': 'screenshot',
    'screenshot_frame': 'screenshot_frame',
    'screenshot_frame_2': 'screenshot_frame_2',
    'screenshot_keyboard': 'screenshot_keyboard',
    'screenshot_monitor': 'screenshot_monitor',
    'screenshot_region': 'screenshot_region',
    'screenshot_tablet': 'screenshot_tablet',
    'script': 'script',
    'scrollable_header': 'scrollable_header',
    'scuba_diving': 'scuba_diving',
    'sd': 'sd',
    'sd_card': 'sd_card',
    'sd_card_alert': 'sd_card_alert',
    'sdk': 'sdk',
    'search': 'search',
    'search_activity': 'search_activity',
    'search_check': 'search_check',
    'search_check_2': 'search_check_2',
    'search_hands_free': 'search_hands_free',
    'search_insights': 'search_insights',
    'search_off': 'search_off',
    'security': 'security',
    'security_key': 'security_key',
    'security_update_good': 'security_update_good',
    'security_update_warning': 'security_update_warning',
    'segment': 'segment',
    'select': 'select',
    'select_all': 'select_all',
    'select_check_box': 'select_check_box',
    'select_to_speak': 'select_to_speak',
    'select_window': 'select_window',
    'select_window_2': 'select_window_2',
    'select_window_off': 'select_window_off',
    'self_care': 'self_care',
    'self_improvement': 'self_improvement',
    'sell': 'sell',
    'send': 'send',
    'send_and_archive': 'send_and_archive',
    'send_money': 'send_money',
    'send_time_extension': 'send_time_extension',
    'send_to_mobile': 'send_to_mobile',
    'sensor_door': 'sensor_door',
    'sensor_occupied': 'sensor_occupied',
    'sensor_window': 'sensor_window',
    'sensors': 'sensors',
    'sensors_krx': 'sensors_krx',
    'sensors_krx_off': 'sensors_krx_off',
    'sensors_off': 'sensors_off',
    'sentiment_calm': 'sentiment_calm',
    'sentiment_content': 'sentiment_content',
    'sentiment_dissatisfied': 'sentiment_dissatisfied',
    'sentiment_excited': 'sentiment_excited',
    'sentiment_extremely_dissatisfied': 'sentiment_extremely_dissatisfied',
    'sentiment_frustrated': 'sentiment_frustrated',
    'sentiment_neutral': 'sentiment_neutral',
    'sentiment_sad': 'sentiment_sad',
    'sentiment_satisfied': 'sentiment_satisfied',
    'sentiment_stressed': 'sentiment_stressed',
    'sentiment_very_dissatisfied': 'sentiment_very_dissatisfied',
    'sentiment_very_satisfied': 'sentiment_very_satisfied',
    'sentiment_worried': 'sentiment_worried',
    'serif': 'serif',
    'server_person': 'server_person',
    'service_toolbox': 'service_toolbox',
    'set_meal': 'set_meal',
    'settings': 'settings',
    'settings_accessibility': 'settings_accessibility',
    'settings_account_box': 'settings_account_box',
    'settings_alert': 'settings_alert',
    'settings_applications': 'settings_applications',
    'settings_b_roll': 'settings_b_roll',
    'settings_backup_restore': 'settings_backup_restore',
    'settings_bluetooth': 'settings_bluetooth',
    'settings_brightness': 'settings_brightness',
    'settings_cell': 'settings_cell',
    'settings_cinematic_blur': 'settings_cinematic_blur',
    'settings_ethernet': 'settings_ethernet',
    'settings_heart': 'settings_heart',
    'settings_input_antenna': 'settings_input_antenna',
    'settings_input_component': 'settings_input_component',
    'settings_input_hdmi': 'settings_input_hdmi',
    'settings_input_svideo': 'settings_input_svideo',
    'settings_motion_mode': 'settings_motion_mode',
    'settings_night_sight': 'settings_night_sight',
    'settings_overscan': 'settings_overscan',
    'settings_panorama': 'settings_panorama',
    'settings_phone': 'settings_phone',
    'settings_photo_camera': 'settings_photo_camera',
    'settings_power': 'settings_power',
    'settings_remote': 'settings_remote',
    'settings_slow_motion': 'settings_slow_motion',
    'settings_system_daydream': 'settings_system_daydream',
    'settings_timelapse': 'settings_timelapse',
    'settings_video_camera': 'settings_video_camera',
    'settings_voice': 'settings_voice',
    'settop_component': 'settop_component',
    'severe_cold': 'severe_cold',
    'shadow': 'shadow',
    'shadow_add': 'shadow_add',
    'shadow_minus': 'shadow_minus',
    'shape_line': 'shape_line',
    'shapes': 'shapes',
    'share': 'share',
    'share_eta': 'share_eta',
    'share_location': 'share_location',
    'share_off': 'share_off',
    'share_reviews': 'share_reviews',
    'share_windows': 'share_windows',
    'sheets_rtl': 'sheets_rtl',
    'shelf_auto_hide': 'shelf_auto_hide',
    'shelf_position': 'shelf_position',
    'shelves': 'shelves',
    'shield': 'shield',
    'shield_lock': 'shield_lock',
    'shield_locked': 'shield_locked',
    'shield_moon': 'shield_moon',
    'shield_person': 'shield_person',
    'shield_question': 'shield_question',
    'shield_with_heart': 'shield_with_heart',
    'shield_with_house': 'shield_with_house',
    'shift': 'shift',
    'shift_lock': 'shift_lock',
    'shift_lock_off': 'shift_lock_off',
    'shop': 'shop',
    'shop_two': 'shop_two',
    'shopping_bag': 'shopping_bag',
    'shopping_bag_speed': 'shopping_bag_speed',
    'shopping_basket': 'shopping_basket',
    'shopping_cart': 'shopping_cart',
    'shopping_cart_checkout': 'shopping_cart_checkout',
    'shopping_cart_off': 'shopping_cart_off',
    'shoppingmode': 'shoppingmode',
    'short_stay': 'short_stay',
    'short_text': 'short_text',
    'show_chart': 'show_chart',
    'shower': 'shower',
    'shuffle': 'shuffle',
    'shuffle_on': 'shuffle_on',
    'shutter_speed': 'shutter_speed',
    'shutter_speed_add': 'shutter_speed_add',
    'shutter_speed_minus': 'shutter_speed_minus',
    'sick': 'sick',
    'side_navigation': 'side_navigation',
    'sign_language': 'sign_language',
    'signal_cellular_0_bar': 'signal_cellular_0_bar',
    'signal_cellular_1_bar': 'signal_cellular_1_bar',
    'signal_cellular_2_bar': 'signal_cellular_2_bar',
    'signal_cellular_3_bar': 'signal_cellular_3_bar',
    'signal_cellular_4_bar': 'signal_cellular_4_bar',
    'signal_cellular_add': 'signal_cellular_add',
    'signal_cellular_alt': 'signal_cellular_alt',
    'signal_cellular_alt_1_bar': 'signal_cellular_alt_1_bar',
    'signal_cellular_alt_2_bar': 'signal_cellular_alt_2_bar',
    'signal_cellular_connected_no_internet_0_bar': 'signal_cellular_connected_no_internet_0_bar',
    'signal_cellular_connected_no_internet_4_bar': 'signal_cellular_connected_no_internet_4_bar',
    'signal_cellular_nodata': 'signal_cellular_nodata',
    'signal_cellular_null': 'signal_cellular_null',
    'signal_cellular_off': 'signal_cellular_off',
    'signal_cellular_pause': 'signal_cellular_pause',
    'signal_disconnected': 'signal_disconnected',
    'signal_wifi_0_bar': 'signal_wifi_0_bar',
    'signal_wifi_4_bar': 'signal_wifi_4_bar',
    'signal_wifi_bad': 'signal_wifi_bad',
    'signal_wifi_off': 'signal_wifi_off',
    'signal_wifi_statusbar_not_connected': 'signal_wifi_statusbar_not_connected',
    'signal_wifi_statusbar_null': 'signal_wifi_statusbar_null',
    'signature': 'signature',
    'signpost': 'signpost',
    'sim_card': 'sim_card',
    'sim_card_download': 'sim_card_download',
    'simulation': 'simulation',
    'single_bed': 'single_bed',
    'sip': 'sip',
    'siren': 'siren',
    'siren_check': 'siren_check',
    'siren_open': 'siren_open',
    'siren_question': 'siren_question',
    'skateboarding': 'skateboarding',
    'skeleton': 'skeleton',
    'skillet': 'skillet',
    'skillet_cooktop': 'skillet_cooktop',
    'skip_next': 'skip_next',
    'skip_previous': 'skip_previous',
    'skull': 'skull',
    'skull_list': 'skull_list',
    'slab_serif': 'slab_serif',
    'sledding': 'sledding',
    'sleep_score': 'sleep_score',
    'slide_library': 'slide_library',
    'sliders': 'sliders',
    'slideshow': 'slideshow',
    'slow_motion_video': 'slow_motion_video',
    'smart_card_reader': 'smart_card_reader',
    'smart_card_reader_off': 'smart_card_reader_off',
    'smart_display': 'smart_display',
    'smart_outlet': 'smart_outlet',
    'smart_screen': 'smart_screen',
    'smart_toy': 'smart_toy',
    'smartphone': 'smartphone',
    'smartphone_camera': 'smartphone_camera',
    'smb_share': 'smb_share',
    'smoke_free': 'smoke_free',
    'smoking_rooms': 'smoking_rooms',
    'sms': 'sms',
    'snippet_folder': 'snippet_folder',
    'snooze': 'snooze',
    'snowboarding': 'snowboarding',
    'snowing': 'snowing',
    'snowing_heavy': 'snowing_heavy',
    'snowmobile': 'snowmobile',
    'snowshoeing': 'snowshoeing',
    'soap': 'soap',
    'social_distance': 'social_distance',
    'social_leaderboard': 'social_leaderboard',
    'solar_power': 'solar_power',
    'sort': 'sort',
    'sort_by_alpha': 'sort_by_alpha',
    'sos': 'sos',
    'sound_detection_dog_barking': 'sound_detection_dog_barking',
    'sound_detection_glass_break': 'sound_detection_glass_break',
    'sound_detection_loud_sound': 'sound_detection_loud_sound',
    'sound_sampler': 'sound_sampler',
    'soup_kitchen': 'soup_kitchen',
    'source_environment': 'source_environment',
    'source_notes': 'source_notes',
    'south': 'south',
    'south_america': 'south_america',
    'south_east': 'south_east',
    'south_west': 'south_west',
    'spa': 'spa',
    'space_bar': 'space_bar',
    'space_dashboard': 'space_dashboard',
    'spatial_audio': 'spatial_audio',
    'spatial_audio_off': 'spatial_audio_off',
    'spatial_speaker': 'spatial_speaker',
    'spatial_tracking': 'spatial_tracking',
    'speaker': 'speaker',
    'speaker_group': 'speaker_group',
    'speaker_notes': 'speaker_notes',
    'speaker_notes_off': 'speaker_notes_off',
    'speaker_phone': 'speaker_phone',
    'special_character': 'special_character',
    'specific_gravity': 'specific_gravity',
    'speech_to_text': 'speech_to_text',
    'speed': 'speed',
    'speed_0_25': 'speed_0_25',
    'speed_0_2x': 'speed_0_2x',
    'speed_0_5': 'speed_0_5',
    'speed_0_5x': 'speed_0_5x',
    'speed_0_75': 'speed_0_75',
    'speed_0_7x': 'speed_0_7x',
    'speed_1_2': 'speed_1_2',
    'speed_1_25': 'speed_1_25',
    'speed_1_2x': 'speed_1_2x',
    'speed_1_5': 'speed_1_5',
    'speed_1_5x': 'speed_1_5x',
    'speed_1_75': 'speed_1_75',
    'speed_1_7x': 'speed_1_7x',
    'speed_2x': 'speed_2x',
    'speed_camera': 'speed_camera',
    'spellcheck': 'spellcheck',
    'split_scene': 'split_scene',
    'splitscreen': 'splitscreen',
    'splitscreen_add': 'splitscreen_add',
    'splitscreen_bottom': 'splitscreen_bottom',
    'splitscreen_landscape': 'splitscreen_landscape',
    'splitscreen_left': 'splitscreen_left',
    'splitscreen_portrait': 'splitscreen_portrait',
    'splitscreen_right': 'splitscreen_right',
    'splitscreen_top': 'splitscreen_top',
    'splitscreen_vertical_add': 'splitscreen_vertical_add',
    'spo2': 'spo2',
    'spoke': 'spoke',
    'sports': 'sports',
    'sports_and_outdoors': 'sports_and_outdoors',
    'sports_bar': 'sports_bar',
    'sports_baseball': 'sports_baseball',
    'sports_basketball': 'sports_basketball',
    'sports_cricket': 'sports_cricket',
    'sports_esports': 'sports_esports',
    'sports_football': 'sports_football',
    'sports_golf': 'sports_golf',
    'sports_gymnastics': 'sports_gymnastics',
    'sports_handball': 'sports_handball',
    'sports_hockey': 'sports_hockey',
    'sports_kabaddi': 'sports_kabaddi',
    'sports_martial_arts': 'sports_martial_arts',
    'sports_mma': 'sports_mma',
    'sports_motorsports': 'sports_motorsports',
    'sports_rugby': 'sports_rugby',
    'sports_score': 'sports_score',
    'sports_soccer': 'sports_soccer',
    'sports_tennis': 'sports_tennis',
    'sports_volleyball': 'sports_volleyball',
    'sprinkler': 'sprinkler',
    'sprint': 'sprint',
    'square': 'square',
    'square_dot': 'square_dot',
    'square_foot': 'square_foot',
    'ssid_chart': 'ssid_chart',
    'stack': 'stack',
    'stack_hexagon': 'stack_hexagon',
    'stack_off': 'stack_off',
    'stack_star': 'stack_star',
    'stacked_bar_chart': 'stacked_bar_chart',
    'stacked_email': 'stacked_email',
    'stacked_inbox': 'stacked_inbox',
    'stacked_line_chart': 'stacked_line_chart',
    'stacks': 'stacks',
    'stadia_controller': 'stadia_controller',
    'stadium': 'stadium',
    'stairs': 'stairs',
    'stairs_2': 'stairs_2',
    'star': 'star',
    'star_half': 'star_half',
    'star_rate': 'star_rate',
    'star_rate_half': 'star_rate_half',
    'stars': 'stars',
    'start': 'start',
    'stat_0': 'stat_0',
    'stat_1': 'stat_1',
    'stat_2': 'stat_2',
    'stat_3': 'stat_3',
    'stat_minus_1': 'stat_minus_1',
    'stat_minus_2': 'stat_minus_2',
    'stat_minus_3': 'stat_minus_3',
    'stay_current_landscape': 'stay_current_landscape',
    'stay_current_portrait': 'stay_current_portrait',
    'stay_primary_landscape': 'stay_primary_landscape',
    'stay_primary_portrait': 'stay_primary_portrait',
    'step': 'step',
    'step_into': 'step_into',
    'step_out': 'step_out',
    'step_over': 'step_over',
    'steppers': 'steppers',
    'steps': 'steps',
    'stethoscope': 'stethoscope',
    'stethoscope_arrow': 'stethoscope_arrow',
    'stethoscope_check': 'stethoscope_check',
    'sticky_note': 'sticky_note',
    'sticky_note_2': 'sticky_note_2',
    'stock_media': 'stock_media',
    'stockpot': 'stockpot',
    'stop': 'stop',
    'stop_circle': 'stop_circle',
    'stop_screen_share': 'stop_screen_share',
    'storage': 'storage',
    'store': 'store',
    'storefront': 'storefront',
    'storm': 'storm',
    'straight': 'straight',
    'straighten': 'straighten',
    'strategy': 'strategy',
    'stream': 'stream',
    'stream_apps': 'stream_apps',
    'streetview': 'streetview',
    'stress_management': 'stress_management',
    'strikethrough_s': 'strikethrough_s',
    'stroke_full': 'stroke_full',
    'stroke_partial': 'stroke_partial',
    'stroller': 'stroller',
    'style': 'style',
    'styler': 'styler',
    'stylus': 'stylus',
    'stylus_laser_pointer': 'stylus_laser_pointer',
    'stylus_note': 'stylus_note',
    'subdirectory_arrow_left': 'subdirectory_arrow_left',
    'subdirectory_arrow_right': 'subdirectory_arrow_right',
    'subheader': 'subheader',
    'subject': 'subject',
    'subscript': 'subscript',
    'subscriptions': 'subscriptions',
    'subtitles': 'subtitles',
    'subtitles_off': 'subtitles_off',
    'subway': 'subway',
    'summarize': 'summarize',
    'sunny': 'sunny',
    'sunny_snowing': 'sunny_snowing',
    'superscript': 'superscript',
    'supervised_user_circle': 'supervised_user_circle',
    'supervised_user_circle_off': 'supervised_user_circle_off',
    'supervisor_account': 'supervisor_account',
    'support': 'support',
    'support_agent': 'support_agent',
    'surfing': 'surfing',
    'surgical': 'surgical',
    'surround_sound': 'surround_sound',
    'swap_calls': 'swap_calls',
    'swap_driving_apps': 'swap_driving_apps',
    'swap_driving_apps_wheel': 'swap_driving_apps_wheel',
    'swap_horiz': 'swap_horiz',
    'swap_horizontal_circle': 'swap_horizontal_circle',
    'swap_vert': 'swap_vert',
    'swap_vertical_circle': 'swap_vertical_circle',
    'sweep': 'sweep',
    'swipe': 'swipe',
    'swipe_down': 'swipe_down',
    'swipe_down_alt': 'swipe_down_alt',
    'swipe_left': 'swipe_left',
    'swipe_left_alt': 'swipe_left_alt',
    'swipe_right': 'swipe_right',
    'swipe_right_alt': 'swipe_right_alt',
    'swipe_up': 'swipe_up',
    'swipe_up_alt': 'swipe_up_alt',
    'swipe_vertical': 'swipe_vertical',
    'switch': 'switch',
    'switch_access': 'switch_access',
    'switch_access_2': 'switch_access_2',
    'switch_access_shortcut': 'switch_access_shortcut',
    'switch_access_shortcut_add': 'switch_access_shortcut_add',
    'switch_account': 'switch_account',
    'switch_camera': 'switch_camera',
    'switch_left': 'switch_left',
    'switch_right': 'switch_right',
    'switch_video': 'switch_video',
    'switches': 'switches',
    'sword_rose': 'sword_rose',
    'swords': 'swords',
    'symptoms': 'symptoms',
    'synagogue': 'synagogue',
    'sync': 'sync',
    'sync_alt': 'sync_alt',
    'sync_arrow_down': 'sync_arrow_down',
    'sync_arrow_up': 'sync_arrow_up',
    'sync_desktop': 'sync_desktop',
    'sync_disabled': 'sync_disabled',
    'sync_lock': 'sync_lock',
    'sync_problem': 'sync_problem',
    'sync_saved_locally': 'sync_saved_locally',
    'syringe': 'syringe',
    'system_update': 'system_update',
    'system_update_alt': 'system_update_alt',
    'tab': 'tab',
    'tab_close': 'tab_close',
    'tab_close_inactive': 'tab_close_inactive',
    'tab_close_right': 'tab_close_right',
    'tab_duplicate': 'tab_duplicate',
    'tab_group': 'tab_group',
    'tab_inactive': 'tab_inactive',
    'tab_move': 'tab_move',
    'tab_new_right': 'tab_new_right',
    'tab_recent': 'tab_recent',
    'tab_unselected': 'tab_unselected',
    'table': 'table',
    'table_bar': 'table_bar',
    'table_chart': 'table_chart',
    'table_chart_view': 'table_chart_view',
    'table_convert': 'table_convert',
    'table_edit': 'table_edit',
    'table_eye': 'table_eye',
    'table_lamp': 'table_lamp',
    'table_restaurant': 'table_restaurant',
    'table_rows': 'table_rows',
    'table_rows_narrow': 'table_rows_narrow',
    'table_view': 'table_view',
    'tablet': 'tablet',
    'tablet_android': 'tablet_android',
    'tablet_camera': 'tablet_camera',
    'tablet_mac': 'tablet_mac',
    'tabs': 'tabs',
    'tactic': 'tactic',
    'tag': 'tag',
    'takeout_dining': 'takeout_dining',
    'tamper_detection_off': 'tamper_detection_off',
    'tamper_detection_on': 'tamper_detection_on',
    'tap_and_play': 'tap_and_play',
    'tapas': 'tapas',
    'target': 'target',
    'task': 'task',
    'task_alt': 'task_alt',
    'taunt': 'taunt',
    'taxi_alert': 'taxi_alert',
    'team_dashboard': 'team_dashboard',
    'temp_preferences_eco': 'temp_preferences_eco',
    'temple_buddhist': 'temple_buddhist',
    'temple_hindu': 'temple_hindu',
    'tenancy': 'tenancy',
    'terminal': 'terminal',
    'text_ad': 'text_ad',
    'text_compare': 'text_compare',
    'text_decrease': 'text_decrease',
    'text_fields': 'text_fields',
    'text_fields_alt': 'text_fields_alt',
    'text_format': 'text_format',
    'text_increase': 'text_increase',
    'text_rotate_up': 'text_rotate_up',
    'text_rotate_vertical': 'text_rotate_vertical',
    'text_rotation_angledown': 'text_rotation_angledown',
    'text_rotation_angleup': 'text_rotation_angleup',
    'text_rotation_down': 'text_rotation_down',
    'text_rotation_none': 'text_rotation_none',
    'text_select_end': 'text_select_end',
    'text_select_jump_to_beginning': 'text_select_jump_to_beginning',
    'text_select_jump_to_end': 'text_select_jump_to_end',
    'text_select_move_back_character': 'text_select_move_back_character',
    'text_select_move_back_word': 'text_select_move_back_word',
    'text_select_move_down': 'text_select_move_down',
    'text_select_move_forward_character': 'text_select_move_forward_character',
    'text_select_move_forward_word': 'text_select_move_forward_word',
    'text_select_move_up': 'text_select_move_up',
    'text_select_start': 'text_select_start',
    'text_snippet': 'text_snippet',
    'text_to_speech': 'text_to_speech',
    'text_up': 'text_up',
    'texture': 'texture',
    'texture_add': 'texture_add',
    'texture_minus': 'texture_minus',
    'theater_comedy': 'theater_comedy',
    'theaters': 'theaters',
    'thermometer': 'thermometer',
    'thermometer_add': 'thermometer_add',
    'thermometer_gain': 'thermometer_gain',
    'thermometer_loss': 'thermometer_loss',
    'thermometer_minus': 'thermometer_minus',
    'thermostat': 'thermostat',
    'thermostat_arrow_down': 'thermostat_arrow_down',
    'thermostat_arrow_up': 'thermostat_arrow_up',
    'thermostat_auto': 'thermostat_auto',
    'thermostat_carbon': 'thermostat_carbon',
    'things_to_do': 'things_to_do',
    'thread_unread': 'thread_unread',
    'threat_intelligence': 'threat_intelligence',
    'thumb_down': 'thumb_down',
    'thumb_up': 'thumb_up',
    'thumbnail_bar': 'thumbnail_bar',
    'thumbs_up_down': 'thumbs_up_down',
    'thunderstorm': 'thunderstorm',
    'tibia': 'tibia',
    'tibia_alt': 'tibia_alt',
    'tile_large': 'tile_large',
    'tile_medium': 'tile_medium',
    'tile_small': 'tile_small',
    'time_auto': 'time_auto',
    'timelapse': 'timelapse',
    'timeline': 'timeline',
    'timer': 'timer',
    'timer_10': 'timer_10',
    'timer_10_alt_1': 'timer_10_alt_1',
    'timer_10_select': 'timer_10_select',
    'timer_3': 'timer_3',
    'timer_3_alt_1': 'timer_3_alt_1',
    'timer_3_select': 'timer_3_select',
    'timer_5': 'timer_5',
    'timer_5_shutter': 'timer_5_shutter',
    'timer_arrow_down': 'timer_arrow_down',
    'timer_arrow_up': 'timer_arrow_up',
    'timer_off': 'timer_off',
    'timer_pause': 'timer_pause',
    'timer_play': 'timer_play',
    'tire_repair': 'tire_repair',
    'title': 'title',
    'titlecase': 'titlecase',
    'toast': 'toast',
    'toc': 'toc',
    'today': 'today',
    'toggle_off': 'toggle_off',
    'toggle_on': 'toggle_on',
    'token': 'token',
    'toll': 'toll',
    'tonality': 'tonality',
    'toolbar': 'toolbar',
    'tools_flat_head': 'tools_flat_head',
    'tools_installation_kit': 'tools_installation_kit',
    'tools_ladder': 'tools_ladder',
    'tools_level': 'tools_level',
    'tools_phillips': 'tools_phillips',
    'tools_pliers_wire_stripper': 'tools_pliers_wire_stripper',
    'tools_power_drill': 'tools_power_drill',
    'tooltip': 'tooltip',
    'tooltip_2': 'tooltip_2',
    'top_panel_close': 'top_panel_close',
    'top_panel_open': 'top_panel_open',
    'topic': 'topic',
    'tornado': 'tornado',
    'total_dissolved_solids': 'total_dissolved_solids',
    'touch_app': 'touch_app',
    'touch_double': 'touch_double',
    'touch_long': 'touch_long',
    'touch_triple': 'touch_triple',
    'touchpad_mouse': 'touchpad_mouse',
    'touchpad_mouse_off': 'touchpad_mouse_off',
    'tour': 'tour',
    'toys': 'toys',
    'toys_and_games': 'toys_and_games',
    'toys_fan': 'toys_fan',
    'track_changes': 'track_changes',
    'trackpad_input': 'trackpad_input',
    'trackpad_input_2': 'trackpad_input_2',
    'trackpad_input_3': 'trackpad_input_3',
    'traffic': 'traffic',
    'traffic_jam': 'traffic_jam',
    'trail_length': 'trail_length',
    'trail_length_medium': 'trail_length_medium',
    'trail_length_short': 'trail_length_short',
    'train': 'train',
    'tram': 'tram',
    'transcribe': 'transcribe',
    'transfer_within_a_station': 'transfer_within_a_station',
    'transform': 'transform',
    'transgender': 'transgender',
    'transit_enterexit': 'transit_enterexit',
    'transit_ticket': 'transit_ticket',
    'transition_chop': 'transition_chop',
    'transition_dissolve': 'transition_dissolve',
    'transition_fade': 'transition_fade',
    'transition_push': 'transition_push',
    'transition_slide': 'transition_slide',
    'translate': 'translate',
    'transportation': 'transportation',
    'travel': 'travel',
    'travel_explore': 'travel_explore',
    'travel_luggage_and_bags': 'travel_luggage_and_bags',
    'trending_down': 'trending_down',
    'trending_flat': 'trending_flat',
    'trending_up': 'trending_up',
    'trip': 'trip',
    'trip_origin': 'trip_origin',
    'trolley': 'trolley',
    'trolley_cable_car': 'trolley_cable_car',
    'trophy': 'trophy',
    'troubleshoot': 'troubleshoot',
    'tsunami': 'tsunami',
    'tsv': 'tsv',
    'tty': 'tty',
    'tune': 'tune',
    'turn_left': 'turn_left',
    'turn_right': 'turn_right',
    'turn_sharp_left': 'turn_sharp_left',
    'turn_sharp_right': 'turn_sharp_right',
    'turn_slight_left': 'turn_slight_left',
    'turn_slight_right': 'turn_slight_right',
    'tv': 'tv',
    'tv_displays': 'tv_displays',
    'tv_gen': 'tv_gen',
    'tv_guide': 'tv_guide',
    'tv_next': 'tv_next',
    'tv_off': 'tv_off',
    'tv_options_edit_channels': 'tv_options_edit_channels',
    'tv_options_input_settings': 'tv_options_input_settings',
    'tv_remote': 'tv_remote',
    'tv_signin': 'tv_signin',
    'tv_with_assistant': 'tv_with_assistant',
    'two_pager': 'two_pager',
    'two_pager_store': 'two_pager_store',
    'two_wheeler': 'two_wheeler',
    'type_specimen': 'type_specimen',
    'u_turn_left': 'u_turn_left',
    'u_turn_right': 'u_turn_right',
    'ulna_radius': 'ulna_radius',
    'ulna_radius_alt': 'ulna_radius_alt',
    'umbrella': 'umbrella',
    'unarchive': 'unarchive',
    'undo': 'undo',
    'unfold_less': 'unfold_less',
    'unfold_less_double': 'unfold_less_double',
    'unfold_more': 'unfold_more',
    'unfold_more_double': 'unfold_more_double',
    'ungroup': 'ungroup',
    'universal_currency': 'universal_currency',
    'universal_currency_alt': 'universal_currency_alt',
    'universal_local': 'universal_local',
    'unknown_2': 'unknown_2',
    'unknown_5': 'unknown_5',
    'unknown_7': 'unknown_7',
    'unknown_document': 'unknown_document',
    'unknown_med': 'unknown_med',
    'unlicense': 'unlicense',
    'unpaved_road': 'unpaved_road',
    'unpublished': 'unpublished',
    'unsubscribe': 'unsubscribe',
    'upcoming': 'upcoming',
    'update': 'update',
    'update_disabled': 'update_disabled',
    'upgrade': 'upgrade',
    'upi_pay': 'upi_pay',
    'upload': 'upload',
    'upload_2': 'upload_2',
    'upload_file': 'upload_file',
    'uppercase': 'uppercase',
    'urology': 'urology',
    'usb': 'usb',
    'usb_off': 'usb_off',
    'user_attributes': 'user_attributes',
    'vaccines': 'vaccines',
    'vacuum': 'vacuum',
    'valve': 'valve',
    'vape_free': 'vape_free',
    'vaping_rooms': 'vaping_rooms',
    'variable_add': 'variable_add',
    'variable_insert': 'variable_insert',
    'variable_remove': 'variable_remove',
    'variables': 'variables',
    'ventilator': 'ventilator',
    'verified': 'verified',
    'verified_user': 'verified_user',
    'vertical_align_bottom': 'vertical_align_bottom',
    'vertical_align_center': 'vertical_align_center',
    'vertical_align_top': 'vertical_align_top',
    'vertical_distribute': 'vertical_distribute',
    'vertical_shades': 'vertical_shades',
    'vertical_shades_closed': 'vertical_shades_closed',
    'vertical_split': 'vertical_split',
    'vibration': 'vibration',
    'video_call': 'video_call',
    'video_camera_back': 'video_camera_back',
    'video_camera_back_add': 'video_camera_back_add',
    'video_camera_front': 'video_camera_front',
    'video_camera_front_off': 'video_camera_front_off',
    'video_chat': 'video_chat',
    'video_file': 'video_file',
    'video_label': 'video_label',
    'video_library': 'video_library',
    'video_search': 'video_search',
    'video_settings': 'video_settings',
    'video_stable': 'video_stable',
    'videocam': 'videocam',
    'videocam_alert': 'videocam_alert',
    'videocam_off': 'videocam_off',
    'videogame_asset': 'videogame_asset',
    'videogame_asset_off': 'videogame_asset_off',
    'view_agenda': 'view_agenda',
    'view_apps': 'view_apps',
    'view_array': 'view_array',
    'view_carousel': 'view_carousel',
    'view_column': 'view_column',
    'view_column_2': 'view_column_2',
    'view_comfy': 'view_comfy',
    'view_comfy_alt': 'view_comfy_alt',
    'view_compact': 'view_compact',
    'view_compact_alt': 'view_compact_alt',
    'view_cozy': 'view_cozy',
    'view_day': 'view_day',
    'view_headline': 'view_headline',
    'view_in_ar': 'view_in_ar',
    'view_in_ar_off': 'view_in_ar_off',
    'view_kanban': 'view_kanban',
    'view_list': 'view_list',
    'view_module': 'view_module',
    'view_object_track': 'view_object_track',
    'view_quilt': 'view_quilt',
    'view_real_size': 'view_real_size',
    'view_sidebar': 'view_sidebar',
    'view_stream': 'view_stream',
    'view_timeline': 'view_timeline',
    'view_week': 'view_week',
    'vignette': 'vignette',
    'villa': 'villa',
    'visibility': 'visibility',
    'visibility_lock': 'visibility_lock',
    'visibility_off': 'visibility_off',
    'vital_signs': 'vital_signs',
    'vo2_max': 'vo2_max',
    'voice_chat': 'voice_chat',
    'voice_over_off': 'voice_over_off',
    'voice_selection': 'voice_selection',
    'voice_selection_off': 'voice_selection_off',
    'voicemail': 'voicemail',
    'volcano': 'volcano',
    'volume_down': 'volume_down',
    'volume_down_alt': 'volume_down_alt',
    'volume_mute': 'volume_mute',
    'volume_off': 'volume_off',
    'volume_up': 'volume_up',
    'volunteer_activism': 'volunteer_activism',
    'voting_chip': 'voting_chip',
    'vpn_key': 'vpn_key',
    'vpn_key_alert': 'vpn_key_alert',
    'vpn_key_off': 'vpn_key_off',
    'vpn_lock': 'vpn_lock',
    'vr180_create2d': 'vr180_create2d',
    'vr180_create2d_off': 'vr180_create2d_off',
    'vrpano': 'vrpano',
    'wall_art': 'wall_art',
    'wall_lamp': 'wall_lamp',
    'wallet': 'wallet',
    'wallpaper': 'wallpaper',
    'wallpaper_slideshow': 'wallpaper_slideshow',
    'ward': 'ward',
    'warehouse': 'warehouse',
    'warning': 'warning',
    'warning_off': 'warning_off',
    'wash': 'wash',
    'watch': 'watch',
    'watch_button_press': 'watch_button_press',
    'watch_check': 'watch_check',
    'watch_off': 'watch_off',
    'watch_screentime': 'watch_screentime',
    'watch_vibration': 'watch_vibration',
    'watch_wake': 'watch_wake',
    'water': 'water',
    'water_bottle': 'water_bottle',
    'water_bottle_large': 'water_bottle_large',
    'water_damage': 'water_damage',
    'water_do': 'water_do',
    'water_drop': 'water_drop',
    'water_ec': 'water_ec',
    'water_full': 'water_full',
    'water_heater': 'water_heater',
    'water_lock': 'water_lock',
    'water_loss': 'water_loss',
    'water_lux': 'water_lux',
    'water_medium': 'water_medium',
    'water_orp': 'water_orp',
    'water_ph': 'water_ph',
    'water_pump': 'water_pump',
    'water_voc': 'water_voc',
    'waterfall_chart': 'waterfall_chart',
    'waves': 'waves',
    'waving_hand': 'waving_hand',
    'wb_auto': 'wb_auto',
    'wb_incandescent': 'wb_incandescent',
    'wb_iridescent': 'wb_iridescent',
    'wb_shade': 'wb_shade',
    'wb_sunny': 'wb_sunny',
    'wb_twilight': 'wb_twilight',
    'wc': 'wc',
    'weather_hail': 'weather_hail',
    'weather_mix': 'weather_mix',
    'weather_snowy': 'weather_snowy',
    'web': 'web',
    'web_asset': 'web_asset',
    'web_asset_off': 'web_asset_off',
    'web_stories': 'web_stories',
    'web_traffic': 'web_traffic',
    'webhook': 'webhook',
    'weekend': 'weekend',
    'weight': 'weight',
    'west': 'west',
    'whatshot': 'whatshot',
    'wheelchair_pickup': 'wheelchair_pickup',
    'where_to_vote': 'where_to_vote',
    'widget_medium': 'widget_medium',
    'widget_small': 'widget_small',
    'widget_width': 'widget_width',
    'widgets': 'widgets',
    'width_full': 'width_full',
    'width_normal': 'width_normal',
    'width_wide': 'width_wide',
    'wifi': 'wifi',
    'wifi_1_bar': 'wifi_1_bar',
    'wifi_2_bar': 'wifi_2_bar',
    'wifi_add': 'wifi_add',
    'wifi_calling': 'wifi_calling',
    'wifi_calling_bar_1': 'wifi_calling_bar_1',
    'wifi_calling_bar_2': 'wifi_calling_bar_2',
    'wifi_calling_bar_3': 'wifi_calling_bar_3',
    'wifi_channel': 'wifi_channel',
    'wifi_find': 'wifi_find',
    'wifi_home': 'wifi_home',
    'wifi_lock': 'wifi_lock',
    'wifi_notification': 'wifi_notification',
    'wifi_off': 'wifi_off',
    'wifi_password': 'wifi_password',
    'wifi_protected_setup': 'wifi_protected_setup',
    'wifi_proxy': 'wifi_proxy',
    'wifi_tethering': 'wifi_tethering',
    'wifi_tethering_error': 'wifi_tethering_error',
    'wifi_tethering_off': 'wifi_tethering_off',
    'wind_power': 'wind_power',
    'window': 'window',
    'window_closed': 'window_closed',
    'window_open': 'window_open',
    'window_sensor': 'window_sensor',
    'wine_bar': 'wine_bar',
    'woman': 'woman',
    'woman_2': 'woman_2',
    'work': 'work',
    'work_alert': 'work_alert',
    'work_history': 'work_history',
    'work_update': 'work_update',
    'workspace_premium': 'workspace_premium',
    'workspaces': 'workspaces',
    'wounds_injuries': 'wounds_injuries',
    'wrap_text': 'wrap_text',
    'wrist': 'wrist',
    'wrong_location': 'wrong_location',
    'wysiwyg': 'wysiwyg',
    'yard': 'yard',
    'your_trips': 'your_trips',
    'youtube_activity': 'youtube_activity',
    'youtube_searched_for': 'youtube_searched_for',
    'zone_person_alert': 'zone_person_alert',
    'zone_person_idle': 'zone_person_idle',
    'zone_person_urgent': 'zone_person_urgent',
    'zoom_in': 'zoom_in',
    'zoom_in_map': 'zoom_in_map',
    'zoom_out': 'zoom_out',
    'zoom_out_map': 'zoom_out_map'
};
_.IconList=IconList;

const Icon = class Icon extends Aventus.WebComponent {
    static get observedAttributes() {return ["icon", "type", "fill"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'is_hidden'() { return this.getBoolAttr('is_hidden') }
    set 'is_hidden'(val) { this.setBoolAttr('is_hidden', val) }get 'no_check'() { return this.getBoolAttr('no_check') }
    set 'no_check'(val) { this.setBoolAttr('no_check', val) }    get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }get 'type'() { return this.getStringProp('type') }
    set 'type'(val) { this.setStringAttr('type', val) }get 'fill'() { return this.getBoolProp('fill') }
    set 'fill'(val) { this.setBoolAttr('fill', val) }    static defaultType = 'outlined';
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("icon", ((target) => {
    if (target.isReady) {
        target.init();
    }
}));this.__addPropertyActions("type", ((target) => {
    if (target.isReady)
        target.loadFont();
}));this.__addPropertyActions("fill", ((target) => {
    if (target.isReady)
        target.loadFont();
})); }
    static __style = `:host{--_material-icon-animation-duration: var(--material-icon-animation-duration, 1.75s)}:host{direction:ltr;display:inline-block;font-family:"Material Symbols Outlined";-moz-font-feature-settings:"liga";font-size:24px;-moz-osx-font-smoothing:grayscale;font-style:normal;font-weight:normal;letter-spacing:normal;line-height:1;text-transform:none;white-space:nowrap;word-wrap:normal}:host .icon{direction:inherit;display:inline-block;font-family:inherit;-moz-font-feature-settings:inherit;font-size:inherit;-moz-osx-font-smoothing:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;line-height:inherit;text-transform:inherit;white-space:inherit;word-wrap:inherit}:host([is_hidden]){opacity:0}:host([type=sharp]){font-family:"Material Symbols Sharp"}:host([type=rounded]){font-family:"Material Symbols Rounded"}:host([type=outlined]){font-family:"Material Symbols Outlined"}:host([fill]){font-variation-settings:"FILL" 1}:host([spin]){animation:spin var(--_material-icon-animation-duration) linear infinite}:host([reverse_spin]){animation:reverse-spin var(--_material-icon-animation-duration) linear infinite}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes reverse-spin{0%{transform:rotate(360deg)}100%{transform:rotate(0deg)}}`;
    __getStatic() {
        return Icon;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Icon.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="icon" _id="icon_0"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "iconEl",
      "ids": [
        "icon_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "Icon";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('is_hidden')) {this.setAttribute('is_hidden' ,'true'); }if(!this.hasAttribute('no_check')) { this.attributeChangedCallback('no_check', false, false); }if(!this.hasAttribute('icon')){ this['icon'] = "check_box_outline_blank"; }if(!this.hasAttribute('type')){ this['type'] = Icon.defaultType; }if(!this.hasAttribute('fill')) { this.attributeChangedCallback('fill', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('is_hidden');this.__upgradeProperty('no_check');this.__upgradeProperty('icon');this.__upgradeProperty('type');this.__upgradeProperty('fill'); }
    __listBoolProps() { return ["is_hidden","no_check","fill"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    async loadFont() {
        if (!this.type)
            return;
        const name = this.type.charAt(0).toUpperCase() + this.type.slice(1);
        let fontsName = [
            'Material Symbols ' + name,
            '"Material Symbols ' + name + '"',
        ];
        const check = () => {
            for (let font of document.fonts) {
                if (fontsName.includes(font.family)) {
                    this.is_hidden = false;
                    return true;
                }
            }
            return false;
        };
        if (check()) {
            return;
        }
        const cb = (e) => {
            check();
            document.fonts.removeEventListener("loadingdone", cb);
        };
        document.fonts.addEventListener("loadingdone", cb);
        let url = 'https://fonts.googleapis.com/css2?family=Material+Symbols+' + name + ":FILL@0..1";
        await Aventus.ResourceLoader.loadInHead({
            type: "css",
            url: url
        });
        setTimeout(() => {
            check();
        }, 100);
    }
    async init() {
        if (!this.no_check) {
            await this.loadFont();
        }
        else {
            this.is_hidden = false;
        }
        this.iconEl.innerHTML = this.icon;
    }
    postCreation() {
        this.init();
    }
}
Icon.Namespace=`MaterialIcon`;
Icon.Tag=`mi-icon`;
_.Icon=Icon;
if(!window.customElements.get('mi-icon')){window.customElements.define('mi-icon', Icon);Aventus.WebComponentInstance.registerDefinition(Icon);}


for(let key in _) { MaterialIcon[key] = _[key] }
})(MaterialIcon);

var AventusSharp;
(AventusSharp||(AventusSharp = {}));
(function (AventusSharp) {
const moduleName = `AventusSharp`;
const _ = {};

let Data = {};
_.Data = AventusSharp.Data ?? {};
let Routes = {};
_.Routes = AventusSharp.Routes ?? {};
let WebSocket = {};
_.WebSocket = AventusSharp.WebSocket ?? {};
let Tools = {};
_.Tools = AventusSharp.Tools ?? {};
let RAM = {};
_.RAM = AventusSharp.RAM ?? {};
let _n;
Data.AventusFile=class AventusFile {
    static get Fullname() { return "AventusSharp.Data.AventusFile, AventusSharp"; }
    Uri;
    Upload;
    /**
     * Get the unique type for the data. Define it as the namespace + class name
     */
    get $type() {
        return this.constructor['Fullname'];
    }
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
Data.AventusFile.Namespace=`AventusSharp.Data`;
Data.AventusFile.$schema={"Uri":"string","Upload":"File","$type":"string"};
Aventus.Converter.register(Data.AventusFile.Fullname, Data.AventusFile);
_.Data.AventusFile=Data.AventusFile;

Data.SharpClass=class SharpClass {
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
     * Clone the object by transforming a parsed JSON string back into the original type
     */
    clone() {
        return Aventus.Converter.transform(JSON.parse(JSON.stringify(this)));
    }
    /**
     * Get a JSON for the current object
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
Data.SharpClass.Namespace=`AventusSharp.Data`;
_.Data.SharpClass=Data.SharpClass;

Data.Date=class Date extends Data.SharpClass {
    static get Fullname() { return "AventusSharp.Data.Date, AventusSharp"; }
    DateTime;
}
Data.Date.Namespace=`AventusSharp.Data`;
Data.Date.$schema={...(Data.SharpClass?.$schema ?? {}), "DateTime":"AventusSharp.RealDate"};
Aventus.Converter.register(Data.Date.Fullname, Data.Date);
_.Data.Date=Data.Date;

Data.FieldErrorInfo=class FieldErrorInfo extends Data.SharpClass {
    static get Fullname() { return "AventusSharp.Data.FieldErrorInfo, AventusSharp"; }
    Name;
}
Data.FieldErrorInfo.Namespace=`AventusSharp.Data`;
Data.FieldErrorInfo.$schema={...(Data.SharpClass?.$schema ?? {}), "Name":"string"};
Aventus.Converter.register(Data.FieldErrorInfo.Fullname, Data.FieldErrorInfo);
_.Data.FieldErrorInfo=Data.FieldErrorInfo;

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
    DataErrorCode[DataErrorCode["LinkNotSet"] = 38] = "LinkNotSet";
})(Data.DataErrorCode || (Data.DataErrorCode = {}));
_.Data.DataErrorCode=Data.DataErrorCode;

Data.DataError=class DataError extends Aventus.GenericError {
    static get Fullname() { return "AventusSharp.Data.DataError, AventusSharp"; }
}
Data.DataError.Namespace=`AventusSharp.Data`;
Data.DataError.$schema={...(Aventus.GenericError?.$schema ?? {}), };
Aventus.Converter.register(Data.DataError.Fullname, Data.DataError);
_.Data.DataError=Data.DataError;

(function (RouteErrorCode) {
    RouteErrorCode[RouteErrorCode["UnknowError"] = 0] = "UnknowError";
    RouteErrorCode[RouteErrorCode["FormContentTypeUnknown"] = 1] = "FormContentTypeUnknown";
    RouteErrorCode[RouteErrorCode["CantGetValueFromBody"] = 2] = "CantGetValueFromBody";
    RouteErrorCode[RouteErrorCode["CantMoveFile"] = 3] = "CantMoveFile";
    RouteErrorCode[RouteErrorCode["CantCreateFolders"] = 4] = "CantCreateFolders";
    RouteErrorCode[RouteErrorCode["RouteAlreadyExist"] = 5] = "RouteAlreadyExist";
})(Routes.RouteErrorCode || (Routes.RouteErrorCode = {}));
_.Routes.RouteErrorCode=Routes.RouteErrorCode;

Routes.RouteError=class RouteError extends Aventus.GenericError {
    static get Fullname() { return "AventusSharp.Routes.RouteError, AventusSharp"; }
}
Routes.RouteError.Namespace=`AventusSharp.Routes`;
Routes.RouteError.$schema={...(Aventus.GenericError?.$schema ?? {}), };
Aventus.Converter.register(Routes.RouteError.Fullname, Routes.RouteError);
_.Routes.RouteError=Routes.RouteError;

WebSocket.Socket=class Socket {
    static Debug = false;
    static connections = {};
    static getInstance(url, el) {
        if (!this.connections[url]) {
            this.connections[url] = new WebSocket.Socket(url, el);
        }
        else {
            this.connections[url].registerEl(el);
        }
        return this.connections[url];
    }
    socket;
    url;
    elements = [];
    reopenInterval = 0;
    onOpen = new Aventus.Callback();
    onClose = new Aventus.Callback();
    onError = new Aventus.Callback();
    onMessage = new Aventus.Callback();
    get readyState() {
        return this.socket.readyState;
    }
    constructor(url, el) {
        this.url = url;
        this.elements = [el];
        this.socket = this.createWebSocket();
        this.reopen = this.reopen.bind(this);
        this.onClose.add(this.reopen);
    }
    registerEl(el) {
        if (!this.elements.includes(el)) {
            this.elements.push(el);
        }
    }
    createWebSocket() {
        this.removeSocket();
        const socket = new window.WebSocket(this.url);
        socket.onopen = (e) => {
            clearInterval(this.reopenInterval);
            this.onOpen.trigger([e]);
        };
        socket.onclose = (e) => {
            this.onClose.trigger([e]);
        };
        socket.onerror = (e) => {
            this.onError.trigger([e]);
        };
        socket.onmessage = (e) => {
            this.onMessage.trigger([e]);
        };
        this.socket = socket;
        return socket;
    }
    removeSocket() {
        if (this.socket) {
            this.socket.onopen = null;
            this.socket.onclose = null;
            this.socket.onerror = null;
            this.socket.onmessage = null;
            this.socket.close();
        }
    }
    reopen() {
        clearInterval(this.reopenInterval);
        this.reopenInterval = setInterval(async () => {
            console.warn("try reopen socket ");
            await this.createWebSocket();
            if (this.isReady()) {
                clearInterval(this.reopenInterval);
            }
        }, 5000);
    }
    close(el, code, reason) {
        let index = this.elements.indexOf(el);
        if (index != -1) {
            this.elements.splice(0, 1);
        }
        if (this.elements.length == 0) {
            this.removeSocket();
            delete WebSocket.Socket.connections[this.url];
        }
    }
    send(data) {
        this.socket.send(data);
    }
    /**
    * Check if socket is ready
    */
    isReady() {
        return this.socket.readyState == 1;
    }
}
WebSocket.Socket.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.Socket=WebSocket.Socket;

(function (SocketErrorCode) {
    SocketErrorCode[SocketErrorCode["socketClosed"] = 0] = "socketClosed";
    SocketErrorCode[SocketErrorCode["timeout"] = 1] = "timeout";
    SocketErrorCode[SocketErrorCode["differentChannel"] = 2] = "differentChannel";
    SocketErrorCode[SocketErrorCode["unknow"] = 3] = "unknow";
})(WebSocket.SocketErrorCode || (WebSocket.SocketErrorCode = {}));
_.WebSocket.SocketErrorCode=WebSocket.SocketErrorCode;

WebSocket.SocketError=class SocketError extends Aventus.GenericError {
}
WebSocket.SocketError.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.SocketError=WebSocket.SocketError;

(function (WsErrorCode) {
    WsErrorCode[WsErrorCode["UnknowError"] = 0] = "UnknowError";
    WsErrorCode[WsErrorCode["CantDefineAssembly"] = 1] = "CantDefineAssembly";
    WsErrorCode[WsErrorCode["ConfigError"] = 2] = "ConfigError";
    WsErrorCode[WsErrorCode["MultipleMainEndpoint"] = 3] = "MultipleMainEndpoint";
    WsErrorCode[WsErrorCode["CantGetValueFromBody"] = 4] = "CantGetValueFromBody";
    WsErrorCode[WsErrorCode["NoConnection"] = 5] = "NoConnection";
    WsErrorCode[WsErrorCode["NoEndPoint"] = 6] = "NoEndPoint";
    WsErrorCode[WsErrorCode["NoPath"] = 7] = "NoPath";
})(WebSocket.WsErrorCode || (WebSocket.WsErrorCode = {}));
_.WebSocket.WsErrorCode=WebSocket.WsErrorCode;

WebSocket.WsError=class WsError extends Aventus.GenericError {
    static get Fullname() { return "AventusSharp.WebSocket.WsError, AventusSharp"; }
}
WebSocket.WsError.Namespace=`AventusSharp.WebSocket`;
WebSocket.WsError.$schema={...(Aventus.GenericError?.$schema ?? {}), };
Aventus.Converter.register(WebSocket.WsError.Fullname, WebSocket.WsError);
_.WebSocket.WsError=WebSocket.WsError;

Data.Storable=class Storable extends Aventus.Data {
    Id = 0;
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
Data.Storable.Namespace=`AventusSharp.Data`;
Data.Storable.$schema={...(Aventus.Data?.$schema ?? {}), "Id":"number"};
Aventus.Converter.register(Data.Storable.Fullname, Data.Storable);
_.Data.Storable=Data.Storable;

Data.StorableTimestamp=class StorableTimestamp extends Data.Storable {
    CreatedDate = new Date();
    UpdatedDate = new Date();
}
Data.StorableTimestamp.Namespace=`AventusSharp.Data`;
Data.StorableTimestamp.$schema={...(Data.Storable?.$schema ?? {}), "CreatedDate":"Date","UpdatedDate":"Date"};
Aventus.Converter.register(Data.StorableTimestamp.Fullname, Data.StorableTimestamp);
_.Data.StorableTimestamp=Data.StorableTimestamp;

Data.Datetime=class Datetime extends Data.SharpClass {
    static get Fullname() { return "AventusSharp.Data.Datetime, AventusSharp"; }
    DateTime;
}
Data.Datetime.Namespace=`AventusSharp.Data`;
Data.Datetime.$schema={...(Data.SharpClass?.$schema ?? {}), "DateTime":"AventusSharp.RealDate"};
Aventus.Converter.register(Data.Datetime.Fullname, Data.Datetime);
_.Data.Datetime=Data.Datetime;

Tools.VoidWithError=class VoidWithError extends Aventus.VoidWithError {
    static get Fullname() { return "AventusSharp.Tools.VoidWithError, AventusSharp"; }
}
Tools.VoidWithError.Namespace=`AventusSharp.Tools`;
Tools.VoidWithError.$schema={...(Aventus.VoidWithError?.$schema ?? {}), };
Aventus.Converter.register(Tools.VoidWithError.Fullname, Tools.VoidWithError);
_.Tools.VoidWithError=Tools.VoidWithError;

WebSocket.VoidWithWsError=class VoidWithWsError extends Tools.VoidWithError {
    static get Fullname() { return "AventusSharp.WebSocket.VoidWithWsError, AventusSharp"; }
}
WebSocket.VoidWithWsError.Namespace=`AventusSharp.WebSocket`;
WebSocket.VoidWithWsError.$schema={...(Tools.VoidWithError?.$schema ?? {}), };
Aventus.Converter.register(WebSocket.VoidWithWsError.Fullname, WebSocket.VoidWithWsError);
_.WebSocket.VoidWithWsError=WebSocket.VoidWithWsError;

Routes.VoidWithRouteError=class VoidWithRouteError extends Tools.VoidWithError {
    static get Fullname() { return "AventusSharp.Routes.VoidWithRouteError, AventusSharp"; }
}
Routes.VoidWithRouteError.Namespace=`AventusSharp.Routes`;
Routes.VoidWithRouteError.$schema={...(Tools.VoidWithError?.$schema ?? {}), };
Aventus.Converter.register(Routes.VoidWithRouteError.Fullname, Routes.VoidWithRouteError);
_.Routes.VoidWithRouteError=Routes.VoidWithRouteError;

Data.VoidWithDataError=class VoidWithDataError extends Tools.VoidWithError {
    static get Fullname() { return "AventusSharp.Data.VoidWithDataError, AventusSharp"; }
}
Data.VoidWithDataError.Namespace=`AventusSharp.Data`;
Data.VoidWithDataError.$schema={...(Tools.VoidWithError?.$schema ?? {}), };
Aventus.Converter.register(Data.VoidWithDataError.Fullname, Data.VoidWithDataError);
_.Data.VoidWithDataError=Data.VoidWithDataError;

Tools.ResultWithError=class ResultWithError extends Aventus.ResultWithError {
    static get Fullname() { return "AventusSharp.Tools.ResultWithError, AventusSharp"; }
}
Tools.ResultWithError.Namespace=`AventusSharp.Tools`;
Tools.ResultWithError.$schema={...(Aventus.ResultWithError?.$schema ?? {}), };
Aventus.Converter.register(Tools.ResultWithError.Fullname, Tools.ResultWithError);
_.Tools.ResultWithError=Tools.ResultWithError;

WebSocket.ResultWithWsError=class ResultWithWsError extends Tools.ResultWithError {
    static get Fullname() { return "AventusSharp.WebSocket.ResultWithWsError, AventusSharp"; }
}
WebSocket.ResultWithWsError.Namespace=`AventusSharp.WebSocket`;
WebSocket.ResultWithWsError.$schema={...(Tools.ResultWithError?.$schema ?? {}), };
Aventus.Converter.register(WebSocket.ResultWithWsError.Fullname, WebSocket.ResultWithWsError);
_.WebSocket.ResultWithWsError=WebSocket.ResultWithWsError;

Routes.ResultWithRouteError=class ResultWithRouteError extends Tools.ResultWithError {
    static get Fullname() { return "AventusSharp.Routes.ResultWithRouteError, AventusSharp"; }
}
Routes.ResultWithRouteError.Namespace=`AventusSharp.Routes`;
Routes.ResultWithRouteError.$schema={...(Tools.ResultWithError?.$schema ?? {}), };
Aventus.Converter.register(Routes.ResultWithRouteError.Fullname, Routes.ResultWithRouteError);
_.Routes.ResultWithRouteError=Routes.ResultWithRouteError;

Data.ResultWithDataError=class ResultWithDataError extends Tools.ResultWithError {
    static get Fullname() { return "AventusSharp.Data.ResultWithDataError, AventusSharp"; }
}
Data.ResultWithDataError.Namespace=`AventusSharp.Data`;
Data.ResultWithDataError.$schema={...(Tools.ResultWithError?.$schema ?? {}), };
Aventus.Converter.register(Data.ResultWithDataError.Fullname, Data.ResultWithDataError);
_.Data.ResultWithDataError=Data.ResultWithDataError;

Routes.StorableRouter=class StorableRouter extends Aventus.HttpRoute {
    constructor(router) {
        super(router);
        this.GetAll = this.GetAll.bind(this);
        this.Create = this.Create.bind(this);
        this.CreateMany = this.CreateMany.bind(this);
        this.GetById = this.GetById.bind(this);
        this.GetByIds = this.GetByIds.bind(this);
        this.Update = this.Update.bind(this);
        this.UpdateMany = this.UpdateMany.bind(this);
        this.Delete = this.Delete.bind(this);
        this.DeleteMany = this.DeleteMany.bind(this);
    }
    async GetAll() {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/${this.StorableName()}`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    async Create(body) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/${this.StorableName()}`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
    async CreateMany(body) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/${this.StorableName()}s`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
    async GetById(id) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/${this.StorableName()}/${id}`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    async GetByIds(body) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/${this.StorableName()}/getbyids`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
    async Update(id, body) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/${this.StorableName()}/${id}`, Aventus.HttpMethod.PUT);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
    async UpdateMany(body) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/${this.StorableName()}s`, Aventus.HttpMethod.PUT);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
    async Delete(id) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/${this.StorableName()}/${id}`, Aventus.HttpMethod.DELETE);
        return await request.queryJSON(this.router);
    }
    async DeleteMany(body) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/${this.StorableName()}s`, Aventus.HttpMethod.DELETE);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
}
Routes.StorableRouter.Namespace=`AventusSharp.Routes`;
_.Routes.StorableRouter=Routes.StorableRouter;

RAM.RamHttp=class RamHttp extends Aventus.Ram {
    getAllDone = false;
    routes;
    constructor() {
        super();
        this.routes = this.defineRoutes();
    }
    async beforeGetAll(result) {
        if (!this.getAllDone) {
            let response = await this.routes.GetAll();
            if (response.success && response.result) {
                for (let item of response.result) {
                    let resultTemp = new Aventus.ResultRamWithError();
                    await this.addOrUpdateData(item, resultTemp);
                    if (!resultTemp.success) {
                        result.errors = [...result.errors, ...resultTemp.errors];
                    }
                }
                this.getAllDone = true;
            }
            else {
                result.errors = [...result.errors, ...response.errors];
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
                await this.addOrUpdateData(response.result, resultTemp);
                if (!resultTemp.success) {
                    result.errors = [...result.errors, ...resultTemp.errors];
                }
                else {
                    result.result = resultTemp.result;
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
            result.result = [];
            let response = await this.routes.GetByIds({ ids: missingIds });
            if (response.success && response.result) {
                for (let item of response.result) {
                    let resultTemp = new Aventus.ResultRamWithError();
                    await this.addOrUpdateData(item, resultTemp);
                    if (!resultTemp.success || !resultTemp.result) {
                        result.errors = [...result.errors, ...resultTemp.errors];
                    }
                    else if (!result.result.includes(resultTemp.result)) {
                        result.result.push(resultTemp.result);
                    }
                }
            }
            else {
                result.errors = [...result.errors, ...response.errors];
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
        let response = await this.routes.Update(item.Id, { item });
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
        let response = await this.routes.Delete(item.Id);
        if (!response.success) {
            result.errors = [...result.errors, ...response.errors];
        }
    }
    async beforeDeleteList(list, result) {
        let response = await this.routes.DeleteMany({ ids: list.map(t => t.Id) });
        if (!response.success) {
            result.errors = [...result.errors, ...response.errors];
        }
    }
}
RAM.RamHttp.Namespace=`AventusSharp.RAM`;
_.RAM.RamHttp=RAM.RamHttp;

WebSocket.Connection=class Connection {
    static Debug = false;
    options;
    waitingList = {};
    memoryBeforeOpen = [];
    socket;
    actionGuard = new Aventus.ActionGuard();
    /**
     * Create a singleton
     */
    static getInstance() {
        return Aventus.Instance.get(WebSocket.Connection);
    }
    constructor() {
        this.options = this._configure(this.configure({}));
        this._onOpen = this._onOpen.bind(this);
        this._onClose = this._onClose.bind(this);
        this._onError = this._onError.bind(this);
        this.onMessage = this.onMessage.bind(this);
        if (this.options.autoStart) {
            this.open();
        }
    }
    onOpen = new Aventus.Callback();
    onClose = new Aventus.Callback();
    onError = new Aventus.Callback();
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
            options.log = WebSocket.Connection.Debug;
        }
        if (options.autoStart === undefined) {
            options.autoStart = true;
        }
        if (options.sendPing !== undefined && options.sendPing <= 0) {
            options.sendPing = undefined;
        }
        if (options.logPrefix === undefined) {
            options.logPrefix = "";
        }
        return options;
    }
    getUrl() {
        let protocol = "ws";
        if (this.options.useHttps) {
            protocol = "wss";
        }
        let url = protocol + "://" + this.options.host + ":" + this.options.port + this.options.socketName;
        return url;
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
        return this.actionGuard.run(["open"], () => {
            return new Promise((resolve) => {
                try {
                    let url = this.getUrl();
                    this.log("Opening " + url);
                    this.openCallback = (isOpen) => {
                        resolve(isOpen);
                    };
                    this.socket = WebSocket.Socket.getInstance(url, this);
                    this.socket.onOpen.add(this._onOpen);
                    this.socket.onClose.add(this._onClose);
                    this.socket.onError.add(this._onError);
                    this.socket.onMessage.add(this.onMessage);
                    if (this.socket.isReady()) {
                        this._onOpen();
                    }
                }
                catch (e) {
                    console.log(e);
                    resolve(false);
                }
            });
        });
    }
    jsonReplacer(key, value) {
        if (this[key] instanceof Date) {
            return Aventus.DateConverter.converter.toString(this[key]);
        }
        return value;
    }
    /**
     * Send a message though the websocket
     * @param channelName The channel on which the message is sent
     * @param data The data to send
     * @param options the options to add to the message (typically the uid)
     */
    async sendMessage(options) {
        let result = new Tools.VoidWithError();
        if (!this.socket || this.socket.readyState != 1) {
            let isOpen = await this.open();
            if (!isOpen) {
                result.errors.push(new WebSocket.SocketError(WebSocket.SocketErrorCode.socketClosed, "Socket not ready ! Please ensure that it is open and ready to send message"));
                this.log('Socket not ready ! Please ensure that it is open and ready to send message');
                if (this.options.allowSendBeforeOpen) {
                    this.memoryBeforeOpen.push(options);
                }
                return result;
            }
        }
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
                else if (options.channel != "/ping") {
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
        return new Promise(async (resolve) => {
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
                let sendMessageResult = await this.sendMessage(options);
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
        if (this.socket && this.socket.isReady()) {
            return true;
        }
        return false;
    }
    sendPingTimeout = 0;
    sendPing() {
        this.sendMessage({
            channel: "/ping",
        });
    }
    startPing() {
        clearInterval(this.sendPingTimeout);
        this.sendPingTimeout = setInterval(() => {
            this.sendPing();
        }, 5000);
    }
    stopPing() {
        clearInterval(this.sendPingTimeout);
    }
    _onOpen() {
        if (this.socket?.isReady()) {
            if (this.openCallback) {
                this.openCallback(true);
                this.openCallback = undefined;
            }
            let protocol = "ws";
            if (this.options.useHttps) {
                protocol = "wss";
            }
            this.log(`Connection successfully established to ${this.getUrl()}!`);
            this.onOpen.trigger([]);
            for (let i = 0; i < this.memoryBeforeOpen.length; i++) {
                this.sendMessage(this.memoryBeforeOpen[i]);
            }
            this.memoryBeforeOpen = [];
            if (this.options.sendPing) {
                this.startPing();
            }
        }
        else {
            if (this.openCallback) {
                this.openCallback(false);
                this.openCallback = undefined;
            }
        }
    }
    errorOccur = false;
    _onError(event) {
        this.errorOccur = true;
        if (this.openCallback) {
            this.openCallback(false);
            this.openCallback = undefined;
            return;
        }
        this.log('An error has occured');
        this.onError.trigger([event]);
    }
    _onClose(event) {
        this.stopPing();
        if (this.errorOccur) {
            this.errorOccur = false;
            return;
        }
        this.log('Closing connection');
        this.onClose.trigger([event]);
    }
    /**
     * Close the current connection
     */
    close() {
        if (this.socket) {
            this.socket.onOpen.remove(this._onOpen);
            this.socket.onClose.remove(this._onClose);
            this.socket.onError.remove(this._onError);
            this.socket.onMessage.remove(this.onMessage);
            this.socket.close(this);
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
                    let valueCb = data;
                    if (data instanceof Aventus.ResultWithError) {
                        valueCb = data.result;
                    }
                    else if (data instanceof Aventus.VoidWithError) {
                        valueCb = undefined;
                    }
                    info.callback(valueCb, params, response.uid);
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
            const prefix = this.options.logPrefix ? `[${this.options.logPrefix}] ` : '';
            if (message instanceof Object) {
                let cloneMessage = JSON.parse(JSON.stringify(message, this.jsonReplacer));
                if (cloneMessage.data && typeof cloneMessage.data == 'string') {
                    cloneMessage.data = JSON.parse(cloneMessage.data);
                }
                console.log(`${prefix}[${hours}:${minutes}:${seconds}]: `, cloneMessage);
            }
            else {
                console.log(`${prefix}[${hours}:${minutes}:${seconds}]: `, message);
            }
        }
    }
}
WebSocket.Connection.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.Connection=WebSocket.Connection;

WebSocket.EndPoint=class EndPoint extends WebSocket.Connection {
    /**
     * Create a singleton
     */
    static getInstance() {
        return Aventus.Instance.get(WebSocket.EndPoint);
    }
    constructor() {
        super();
        this.register();
    }
    register() {
    }
    /**
     * @inheritdoc
     */
    configure(options) {
        options.socketName = this.path;
        options.sendPing = 5000;
        return options;
    }
    get path() {
        return "/ws";
    }
    ;
}
WebSocket.EndPoint.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.EndPoint=WebSocket.EndPoint;

WebSocket.WsEvent=class WsEvent {
    endpoint;
    onTrigger = new Aventus.Callback();
    routeInfo;
    _listening = false;
    get listening() {
        return this._listening;
    }
    getPrefix;
    constructor(endpoint, getPrefix) {
        this.endpoint = endpoint ?? WebSocket.EndPoint.getInstance();
        this.getPrefix = getPrefix ?? (() => "");
        this.onEvent = this.onEvent.bind(this);
    }
    init() {
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
            if (!this.routeInfo) {
                this.routeInfo = {
                    channel: this.path(),
                    callback: this.onEvent
                };
            }
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
    onEvent(data, params, uid) {
        this.onTrigger.trigger([data, params, uid]);
    }
}
WebSocket.WsEvent.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.WsEvent=WebSocket.WsEvent;

WebSocket.StorableWsRouter_GetAll=class StorableWsRouter_GetAll extends WebSocket.WsEvent {
    StorableName;
    constructor(endpoint, getPrefix, StorableName) {
        super(endpoint, getPrefix);
        this.StorableName = StorableName;
    }
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/${this.StorableName()}`;
    }
}
WebSocket.StorableWsRouter_GetAll.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.StorableWsRouter_GetAll=WebSocket.StorableWsRouter_GetAll;

WebSocket.StorableWsRouter_Create=class StorableWsRouter_Create extends WebSocket.WsEvent {
    StorableName;
    constructor(endpoint, getPrefix, StorableName) {
        super(endpoint, getPrefix);
        this.StorableName = StorableName;
    }
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/${this.StorableName()}/Create`;
    }
}
WebSocket.StorableWsRouter_Create.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.StorableWsRouter_Create=WebSocket.StorableWsRouter_Create;

WebSocket.StorableWsRoute_CreateMany=class StorableWsRoute_CreateMany extends WebSocket.WsEvent {
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/${this.StorableName()}/CreateMany`;
    }
    StorableName;
    constructor(endpoint, getPrefix, StorableName) {
        super(endpoint, getPrefix);
        this.StorableName = StorableName ?? (() => "");
    }
}
WebSocket.StorableWsRoute_CreateMany.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.StorableWsRoute_CreateMany=WebSocket.StorableWsRoute_CreateMany;

WebSocket.StorableWsRouter_GetById=class StorableWsRouter_GetById extends WebSocket.WsEvent {
    StorableName;
    constructor(endpoint, getPrefix, StorableName) {
        super(endpoint, getPrefix);
        this.StorableName = StorableName;
    }
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/${this.StorableName()}/{id:number}`;
    }
}
WebSocket.StorableWsRouter_GetById.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.StorableWsRouter_GetById=WebSocket.StorableWsRouter_GetById;

WebSocket.StorableWsRouter_GetByIds=class StorableWsRouter_GetByIds extends WebSocket.WsEvent {
    StorableName;
    constructor(endpoint, getPrefix, StorableName) {
        super(endpoint, getPrefix);
        this.StorableName = StorableName;
    }
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/${this.StorableName()}/getbyids`;
    }
}
WebSocket.StorableWsRouter_GetByIds.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.StorableWsRouter_GetByIds=WebSocket.StorableWsRouter_GetByIds;

WebSocket.StorableWsRouter_Update=class StorableWsRouter_Update extends WebSocket.WsEvent {
    StorableName;
    constructor(endpoint, getPrefix, StorableName) {
        super(endpoint, getPrefix);
        this.StorableName = StorableName;
    }
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/${this.StorableName()}/{id:number}/Update`;
    }
}
WebSocket.StorableWsRouter_Update.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.StorableWsRouter_Update=WebSocket.StorableWsRouter_Update;

WebSocket.StorableWsRoute_UpdateMany=class StorableWsRoute_UpdateMany extends WebSocket.WsEvent {
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/${this.StorableName()}/UpdateMany`;
    }
    StorableName;
    constructor(endpoint, getPrefix, StorableName) {
        super(endpoint, getPrefix);
        this.StorableName = StorableName ?? (() => "");
    }
}
WebSocket.StorableWsRoute_UpdateMany.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.StorableWsRoute_UpdateMany=WebSocket.StorableWsRoute_UpdateMany;

WebSocket.StorableWsRouter_Delete=class StorableWsRouter_Delete extends WebSocket.WsEvent {
    StorableName;
    constructor(endpoint, getPrefix, StorableName) {
        super(endpoint, getPrefix);
        this.StorableName = StorableName;
    }
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/${this.StorableName()}/{id:number}/Delete`;
    }
}
WebSocket.StorableWsRouter_Delete.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.StorableWsRouter_Delete=WebSocket.StorableWsRouter_Delete;

WebSocket.StorableWsRoute_DeleteMany=class StorableWsRoute_DeleteMany extends WebSocket.WsEvent {
    /**
     * @inheritdoc
     */
    path() {
        return `${this.getPrefix()}/${this.StorableName()}/DeleteMany`;
    }
    StorableName;
    constructor(endpoint, getPrefix, StorableName) {
        super(endpoint, getPrefix);
        this.StorableName = StorableName ?? (() => "");
    }
}
WebSocket.StorableWsRoute_DeleteMany.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.StorableWsRoute_DeleteMany=WebSocket.StorableWsRoute_DeleteMany;

WebSocket.Router=class Router {
    endpoint;
    events;
    constructor(endpoint) {
        this.endpoint = endpoint ?? WebSocket.EndPoint.getInstance();
        this.events = this.defineEvents();
        for (let key in this.events) {
            this.events[key].init();
        }
    }
    getPrefix() {
        return "";
    }
    defineEvents() {
        return {};
    }
}
WebSocket.Router.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.Router=WebSocket.Router;

WebSocket.StorableWsRouter=class StorableWsRouter extends WebSocket.Router {
    defineEvents() {
        return {
            ...super.defineEvents(),
            GetAll: new WebSocket.StorableWsRouter_GetAll(this.endpoint, this.getPrefix, this.StorableName),
            Create: new WebSocket.StorableWsRouter_Create(this.endpoint, this.getPrefix, this.StorableName),
            CreateMany: new WebSocket.StorableWsRoute_CreateMany(this.endpoint, this.getPrefix, this.StorableName),
            GetById: new WebSocket.StorableWsRouter_GetById(this.endpoint, this.getPrefix, this.StorableName),
            GetByIds: new WebSocket.StorableWsRouter_GetByIds(this.endpoint, this.getPrefix, this.StorableName),
            Update: new WebSocket.StorableWsRouter_Update(this.endpoint, this.getPrefix, this.StorableName),
            UpdateMany: new WebSocket.StorableWsRoute_UpdateMany(this.endpoint, this.getPrefix, this.StorableName),
            Delete: new WebSocket.StorableWsRouter_Delete(this.endpoint, this.getPrefix, this.StorableName),
            DeleteMany: new WebSocket.StorableWsRoute_DeleteMany(this.endpoint, this.getPrefix, this.StorableName),
        };
    }
    async GetAll(options = {}) {
        const info = {
            channel: `${this.getPrefix()}/${this.StorableName()}`,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async Create(body, options = {}) {
        const info = {
            channel: `${this.getPrefix()}/${this.StorableName()}/Create`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async CreateMany(body, options = {}) {
        const info = {
            channel: `${this.getPrefix()}/${this.StorableName()}/CreateMany`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async GetById(id, options = {}) {
        const info = {
            channel: `${this.getPrefix()}/${this.StorableName()}/${id}`,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async GetByIds(body, options = {}) {
        const info = {
            channel: `${this.getPrefix()}/${this.StorableName()}/getbyids`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async Update(id, body, options = {}) {
        const info = {
            channel: `${this.getPrefix()}/${this.StorableName()}/${id}/Update`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async UpdateMany(body, options = {}) {
        const info = {
            channel: `${this.getPrefix()}/${this.StorableName()}/UpdateMany`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async Delete(id, options = {}) {
        const info = {
            channel: `${this.getPrefix()}/${this.StorableName()}/${id}/Delete`,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
    async DeleteMany(body, options = {}) {
        const info = {
            channel: `${this.getPrefix()}/${this.StorableName()}/DeleteMany`,
            body: body,
            ...options,
        };
        return await this.endpoint.sendMessageAndWait(info);
    }
}
WebSocket.StorableWsRouter.Namespace=`AventusSharp.WebSocket`;
_.WebSocket.StorableWsRouter=WebSocket.StorableWsRouter;

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
        this.routes.events.GetAll.onTrigger.add(this.otherGetAll, this);
        if (autoListen.GetAll) {
            this.routes.events.GetAll.listen();
        }
        else {
            this.routes.events.GetAll.stop();
        }
        this.routes.events.GetById.onTrigger.add(this.otherGetById, this);
        if (autoListen.GetById) {
            this.routes.events.GetById.listen();
        }
        else {
            this.routes.events.GetById.stop();
        }
        this.routes.events.Create.onTrigger.add(this.otherCreateItem, this);
        if (autoListen.Create) {
            this.routes.events.Create.listen();
        }
        else {
            this.routes.events.Create.stop();
        }
        this.routes.events.CreateMany.onTrigger.add(this.otherCreateList, this);
        if (autoListen.CreateMany) {
            this.routes.events.CreateMany.listen();
        }
        else {
            this.routes.events.CreateMany.stop();
        }
        this.routes.events.Update.onTrigger.add(this.otherUpdateItem, this);
        if (autoListen.Update) {
            this.routes.events.Update.listen();
        }
        else {
            this.routes.events.Update.stop();
        }
        this.routes.events.UpdateMany.onTrigger.add(this.otherUpdateList, this);
        if (autoListen.UpdateMany) {
            this.routes.events.UpdateMany.listen();
        }
        else {
            this.routes.events.UpdateMany.stop();
        }
        this.routes.events.Delete.onTrigger.add(this.otherDeleteItem, this);
        if (autoListen.Delete) {
            this.routes.events.Delete.listen();
        }
        else {
            this.routes.events.Delete.stop();
        }
        this.routes.events.DeleteMany.onTrigger.add(this.otherDeleteList, this);
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
    async otherGetAll(items, params, uid) {
        if (uid && this.otherGetAllLocked[uid])
            return;
        for (let item of items) {
            let resultTemp = new Aventus.ResultRamWithError();
            await this.addOrUpdateData(item, resultTemp);
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
                    await this.addOrUpdateData(item, resultTemp);
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
    async otherGetById(item, params, uid) {
        if (uid && this.otherGetByIdLocked[uid])
            return;
        let resultTemp = new Aventus.ResultRamWithError();
        await this.addOrUpdateData(item, resultTemp);
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
                await this.addOrUpdateData(response.result, resultTemp);
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
            let response = await this.routes.GetByIds({ ids: missingIds });
            if (response.success && response.result) {
                for (let item of response.result) {
                    let resultTemp = new Aventus.ResultRamWithError();
                    await this.addOrUpdateData(item, resultTemp);
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
    async otherCreateItem(item, params, uid) {
        if (uid && this.otherCreateItemLocked[uid])
            return;
        let resultTemp = new Aventus.ResultRamWithError();
        await this.addOrUpdateData(item, resultTemp);
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
    async otherCreateList(items, params, uid) {
        if (uid && this.otherCreateListLocked[uid])
            return;
        for (let item of items) {
            let resultTemp = new Aventus.ResultRamWithError();
            await this.addOrUpdateData(item, resultTemp);
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
    async otherUpdateItem(item, params, uid) {
        if (uid && this.otherUpdateItemLocked[uid])
            return;
        let resultTemp = new Aventus.ResultRamWithError();
        await this.addOrUpdateData(item, resultTemp);
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
        let response = await this.routes.Update(item.Id, { item }, { uid });
        delete this.otherUpdateItemLocked[uid];
        if (response.success && response.result) {
            result.result = this.getObjectForRam(response.result);
        }
        else {
            result.errors = [...result.errors, ...response.errors];
        }
    }
    async otherUpdateList(items, params, uid) {
        if (uid && this.otherUpdateListLocked[uid])
            return;
        for (let item of items) {
            let resultTemp = new Aventus.ResultRamWithError();
            await this.addOrUpdateData(item, resultTemp);
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
            this.recordsSubscribers.delete(resultTemp.result.Id);
        }
    }
    async beforeDeleteItem(item, fromList, result) {
        if (fromList) {
            return;
        }
        let uid = Aventus.uuidv4();
        this.otherDeleteItemLocked[uid] = true;
        let response = await this.routes.Delete(item.Id, { uid });
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
                this.recordsSubscribers.delete(resultTemp.result.Id);
            }
        }
    }
    async beforeDeleteList(list, result) {
        let uid = Aventus.uuidv4();
        this.otherDeleteListLocked[uid] = true;
        let response = await this.routes.DeleteMany({ ids: list.map(t => t.Id) }, { uid });
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
RAM.RamWebSocket.Namespace=`AventusSharp.RAM`;
_.RAM.RamWebSocket=RAM.RamWebSocket;


for(let key in _) { AventusSharp[key] = _[key] }
})(AventusSharp);


