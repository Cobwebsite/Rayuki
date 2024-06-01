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
var RamErrorCode;
(function (RamErrorCode) {
    RamErrorCode[RamErrorCode["unknow"] = 0] = "unknow";
    RamErrorCode[RamErrorCode["noId"] = 1] = "noId";
    RamErrorCode[RamErrorCode["noItemInsideRam"] = 2] = "noItemInsideRam";
})(RamErrorCode || (RamErrorCode = {}));

_.RamErrorCode=RamErrorCode;
const uuidv4=function uuidv4() {
    let uid = '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16));
    return uid;
}

_.uuidv4=uuidv4;
const ActionGuard=class ActionGuard {
    /**
     * Map to store actions that are currently running.
     * @type {Map<any[], ((res: any) => void)[]>}
     * @private
     */
    runningAction = new Map();
    /**
     * Executes an action uniquely based on the specified keys.
     * @template T
     * @param {any[]} keys - The keys associated with the action.
     * @param {() => Promise<T>} action - The action to execute.
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
ActionGuard.Namespace=`${moduleName}`;

_.ActionGuard=ActionGuard;
const Async=function Async(el) {
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
var WatchAction;
(function (WatchAction) {
    WatchAction[WatchAction["CREATED"] = 0] = "CREATED";
    WatchAction[WatchAction["UPDATED"] = 1] = "UPDATED";
    WatchAction[WatchAction["DELETED"] = 2] = "DELETED";
})(WatchAction || (WatchAction = {}));

_.WatchAction=WatchAction;
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
    else if (typeof obj1 === 'object' && obj1 !== undefined && obj1 !== null) {
        if (typeof obj2 !== 'object' || obj2 === undefined || obj2 === null) {
            return false;
        }
        if (obj1 instanceof HTMLElement || obj2 instanceof HTMLElement) {
            return obj1 == obj2;
        }
        if (obj1 instanceof Date || obj2 instanceof Date) {
            return obj1.toString() === obj2.toString();
        }
        obj1 = Watcher.extract(obj1);
        obj2 = Watcher.extract(obj2);
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
Style.Namespace=`${moduleName}`;

_.Style=Style;
const Callback=class Callback {
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
Callback.Namespace=`${moduleName}`;

_.Callback=Callback;
const Mutex=class Mutex {
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
Mutex.Namespace=`${moduleName}`;

_.Mutex=Mutex;
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
Effect.Namespace=`${moduleName}`;

_.Effect=Effect;
const PressManager=class PressManager {
    static globalConfig = {
        delayDblPress: 150,
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
    delayDblPress = PressManager.globalConfig.delayDblPress ?? 150;
    delayLongPress = PressManager.globalConfig.delayLongPress ?? 700;
    nbPress = 0;
    offsetDrag = PressManager.globalConfig.offsetDrag ?? 20;
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
        if (this.options.onEvent) {
            this.options.onEvent(e);
        }
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
        if (this.options.onEvent) {
            this.options.onEvent(e);
        }
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
        if (this.options.onEvent) {
            this.options.onEvent(e);
        }
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
            document.removeEventListener("pointerup", this.functionsBinded.upAction);
            document.removeEventListener("pointermove", this.functionsBinded.moveAction);
        }
    }
}
PressManager.Namespace=`${moduleName}`;

_.PressManager=PressManager;
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
Uri.Namespace=`${moduleName}`;

_.Uri=Uri;
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
Computed.Namespace=`${moduleName}`;

_.Computed=Computed;
const Watcher=class Watcher {
    static __reservedName = {
        __path: '__path',
    };
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
        const replaceByAlias = (target, element, prop, receiver) => {
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
                    element.__validatePath();
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
                element = replaceByAlias(target, element, prop, null);
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
                    return () => {
                        clearReservedNames(target);
                        return target;
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
                        trigger(type, target, receiver, target, '');
                    };
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
                let oldValue = Reflect.get(target, prop, receiver);
                value = replaceByAlias(target, value, prop, receiver);
                let triggerChange = false;
                if (!reservedName[prop]) {
                    if (Array.isArray(target)) {
                        if (prop != "length") {
                            triggerChange = true;
                        }
                    }
                    else {
                        if (!compareObject(value, oldValue)) {
                            triggerChange = true;
                        }
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
                if (Array.isArray(target)) {
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
        };
        var realProxy = new Proxy(obj, proxyData);
        proxyData.baseData = obj;
        setProxyPath(realProxy, '');
        return realProxy;
    }
    static is(obj) {
        return typeof obj == 'object' && obj.__isProxy;
    }
    static extract(obj) {
        if (this.is(obj)) {
            return obj.getTarget();
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
}
Watcher.Namespace=`${moduleName}`;

_.Watcher=Watcher;
const ComputedNoRecomputed=class ComputedNoRecomputed extends Computed {
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
ComputedNoRecomputed.Namespace=`${moduleName}`;

_.ComputedNoRecomputed=ComputedNoRecomputed;
const TemplateContext=class TemplateContext {
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
TemplateContext.Namespace=`${moduleName}`;

_.TemplateContext=TemplateContext;
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
                if (e instanceof TypeError && e.message.startsWith("Cannot read properties of undefined")) {
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
                if (e instanceof TypeError && e.message.startsWith("Cannot read properties of undefined")) {
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
                if (e instanceof TypeError && e.message.startsWith("Cannot read properties of undefined")) {
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
                elements = this.component.__watch;
            }
            if (!elements || !elements.__isProxy) {
                debugger;
            }
            const subTemp = (action, path, value) => {
                if (basePath.startsWith(path)) {
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
        document.adoptNode(content);
        customElements.upgrade(content);
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
    __removeNoAnimations() {
        if (document.readyState !== "loading") {
            setTimeout(() => {
                this.postCreation();
                this._isReady = true;
                this.dispatchEvent(new CustomEvent('postCreationDone'));
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
const GenericError=class GenericError {
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
VoidWithError.Namespace=`${moduleName}`;

_.VoidWithError=VoidWithError;
const ResultWithError=class ResultWithError extends VoidWithError {
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
ResultWithError.Namespace=`${moduleName}`;

_.ResultWithError=ResultWithError;
const HttpError=class HttpError extends GenericError {
}
HttpError.Namespace=`${moduleName}`;

_.HttpError=HttpError;
const Json=class Json {
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
        };
        return this.__classFromJson(obj, data, realOptions);
    }
    static __classFromJson(obj, data, options) {
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
const Data=class Data {
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
    clone() {
        return Converter.transform(JSON.parse(JSON.stringify(this)));
    }
}
Data.Namespace=`${moduleName}`;

_.Data=Data;
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
                    obj = Json.classFromJson(obj, data, {
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
    /**
    * Map storing information about registered types.
    */
    static info = new Map();
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
                const offset = this[key].getTimezoneOffset() * 60000;
                formData.append(newKey, new Date(this[key].getTime() - offset).toISOString());
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
            const offset = this[key].getTimezoneOffset() * 60000;
            return new Date(this[key].getTime() - offset).toISOString();
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
}
HttpRequest.Namespace=`${moduleName}`;

_.HttpRequest=HttpRequest;
const HttpRouter=class HttpRouter {
    _routes;
    options;
    // public static WithRoute<const T extends readonly ({ type: RouteType, path: string; } | RouteType)[]>(options: T): HttpRouterType<T> {
    //         constructor() {
    //             super();
    //             for(let route of options) {
    //                 if(typeof route == "function") {
    //                     this._routes.add(route);
    //                     this._routes.add(route.type, route.path);
    constructor() {
        // Object.defineProperty(this, "routes", {
        //     get: () => { return this._routes; }
        // });
        // this.createRoutesProxy();
        this.options = this.defineOptions(this.defaultOptionsValue());
    }
    // private createRoutesProxy() {
    //     if(!this._routes) {
    //         this._routes = new Proxy({}, createCommProxy<HttpRoute>(this));
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
    // private static JoinPath<T extends string, U extends string>(s1: T, s2: U): Join<[T, U], "."> {
    // public static ExtendRoutes<const T extends readonly ({ type: RouteType, path: string; } | RouteType)[], U extends string>(options: T, path: StringLiteral<U>) {
    //     if(!path) {
    //         for(let option of options) {
    //             if(typeof option == "function") {
    //                 result.push({
    //                 });
    //                 result.push({
    //                     path: this.JoinPath(path, option.path)
    //                 });
    router;
    constructor(router) {
        this.router = router ?? new HttpRouter();
    }
    getPrefix() {
        return "";
    }
}
HttpRoute.Namespace=`${moduleName}`;

_.HttpRoute=HttpRoute;
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
const RamError=class RamError extends GenericError {
}
RamError.Namespace=`${moduleName}`;

_.RamError=RamError;
const VoidRamWithError=class VoidRamWithError extends VoidWithError {
}
VoidRamWithError.Namespace=`${moduleName}`;

_.VoidRamWithError=VoidRamWithError;
const ResultRamWithError=class ResultRamWithError extends ResultWithError {
}
ResultRamWithError.Namespace=`${moduleName}`;

_.ResultRamWithError=ResultRamWithError;
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
                    that.mergeObject(oldData, newData);
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
                    that.mergeObject(oldData, newData);
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
        Json.classFromJson(item, objJson);
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
GenericRam.Namespace=`${moduleName}`;

_.GenericRam=GenericRam;
const Ram=class Ram extends GenericRam {
}
Ram.Namespace=`${moduleName}`;

_.Ram=Ram;

for(let key in _) { Aventus[key] = _[key] }
})(Aventus);

var MaterialIcon;
(MaterialIcon||(MaterialIcon = {}));
(function (MaterialIcon) {
const moduleName = `MaterialIcon`;
const _ = {};


let _n;
const Icon = class Icon extends Aventus.WebComponent {
    static get observedAttributes() {return ["icon", "type"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'is_hidden'() { return this.getBoolAttr('is_hidden') }
    set 'is_hidden'(val) { this.setBoolAttr('is_hidden', val) }    get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }get 'type'() { return this.getStringProp('type') }
    set 'type'(val) { this.setStringAttr('type', val) }    static defaultType = 'outlined';
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("icon", ((target) => {
    if (target.isReady)
        target.shadowRoot.innerHTML = target.icon;
}));this.__addPropertyActions("type", ((target) => {
    if (target.isReady)
        target.loadFont();
})); }
    static __style = `:host{--_material-icon-animation-duration: var(--material-icon-animation-duration, 1.75s)}:host{direction:ltr;display:inline-block;font-family:"Material Symbols Outlined";-moz-font-feature-settings:"liga";font-size:24px;-moz-osx-font-smoothing:grayscale;font-style:normal;font-weight:normal;letter-spacing:normal;line-height:1;text-transform:none;white-space:nowrap;word-wrap:normal}:host([is_hidden]){opacity:0}:host([type=sharp]){font-family:"Material Symbols Sharp"}:host([type=rounded]){font-family:"Material Symbols Rounded"}:host([type=outlined]){font-family:"Material Symbols Outlined"}:host([spin]){animation:spin var(--_material-icon-animation-duration) linear infinite}:host([reverse_spin]){animation:reverse-spin var(--_material-icon-animation-duration) linear infinite}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes reverse-spin{0%{transform:rotate(360deg)}100%{transform:rotate(0deg)}}`;
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
        blocks: { 'default':`` }
    });
}
    getClassName() {
        return "Icon";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('is_hidden')) {this.setAttribute('is_hidden' ,'true'); }if(!this.hasAttribute('icon')){ this['icon'] = "check_box_outline_blank"; }if(!this.hasAttribute('type')){ this['type'] = Icon.defaultType; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('is_hidden');this.__upgradeProperty('icon');this.__upgradeProperty('type'); }
    __listBoolProps() { return ["is_hidden"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    async loadFont() {
        if (!this.type)
            return;
        const name = this.type.charAt(0).toUpperCase() + this.type.slice(1);
        let fontsName = [
            'Material Symbols ' + name,
            '"Material Symbols ' + name + '"',
        ];
        for (let font of document.fonts) {
            if (fontsName.includes(font.family)) {
                this.is_hidden = false;
                return;
            }
        }
        const cb = (e) => {
            for (let font of e.fontfaces) {
                if (fontsName.includes(font.family)) {
                    this.is_hidden = false;
                    break;
                }
            }
            document.fonts.removeEventListener("loadingdone", cb);
        };
        document.fonts.addEventListener("loadingdone", cb);
        let url = 'https://fonts.googleapis.com/icon?family=Material+Symbols+' + name;
        await Aventus.ResourceLoader.loadInHead({
            type: "css",
            url: url
        });
    }
    async init() {
        await this.loadFont();
        this.shadowRoot.innerHTML = this.icon;
    }
    postCreation() {
        this.init();
    }
}
Icon.Namespace=`${moduleName}`;
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

const Data = {};
_.Data = {};
const Routes = {};
_.Routes = {};
const WebSocket = {};
_.WebSocket = {};
const Tools = {};
_.Tools = {};
const RAM = {};
_.RAM = {};
let _n;
Data.FieldErrorInfo=class FieldErrorInfo {
    static get Fullname() { return "AventusSharp.Data.FieldErrorInfo, AventusSharp"; }
    Name;
}
Data.FieldErrorInfo.Namespace=`${moduleName}.Data`;
Data.FieldErrorInfo.$schema={"Name":"string"};
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
Routes.StorableRoute=class StorableRoute extends Aventus.HttpRoute {
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
Routes.StorableRoute.Namespace=`${moduleName}.Routes`;

_.Routes.StorableRoute=Routes.StorableRoute;
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
Data.AventusFile.Namespace=`${moduleName}.Data`;
Data.AventusFile.$schema={"Uri":"string","Upload":"File","$type":"string"};
Aventus.Converter.register(Data.AventusFile.Fullname, Data.AventusFile);

_.Data.AventusFile=Data.AventusFile;
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
Data.Storable.Namespace=`${moduleName}.Data`;
Data.Storable.$schema={...(Aventus.Data?.$schema ?? {}), "Id":"number"};
Aventus.Converter.register(Data.Storable.Fullname, Data.Storable);

_.Data.Storable=Data.Storable;
(function (SocketErrorCode) {
    SocketErrorCode[SocketErrorCode["socketClosed"] = 0] = "socketClosed";
    SocketErrorCode[SocketErrorCode["timeout"] = 1] = "timeout";
    SocketErrorCode[SocketErrorCode["differentChannel"] = 2] = "differentChannel";
    SocketErrorCode[SocketErrorCode["unknow"] = 3] = "unknow";
})(WebSocket.SocketErrorCode || (WebSocket.SocketErrorCode = {}));

_.WebSocket.SocketErrorCode=WebSocket.SocketErrorCode;
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
WebSocket.Socket.Namespace=`${moduleName}.WebSocket`;

_.WebSocket.Socket=WebSocket.Socket;
Tools.ResultWithError=class ResultWithError extends Aventus.ResultWithError {
    static get Fullname() { return "AventusSharp.Tools.ResultWithError, AventusSharp"; }
}
Tools.ResultWithError.Namespace=`${moduleName}.Tools`;
Tools.ResultWithError.$schema={...(Aventus.ResultWithError?.$schema ?? {}), };
Aventus.Converter.register(Tools.ResultWithError.Fullname, Tools.ResultWithError);

_.Tools.ResultWithError=Tools.ResultWithError;
Tools.VoidWithError=class VoidWithError extends Aventus.VoidWithError {
    static get Fullname() { return "AventusSharp.Tools.VoidWithError, AventusSharp"; }
}
Tools.VoidWithError.Namespace=`${moduleName}.Tools`;
Tools.VoidWithError.$schema={...(Aventus.VoidWithError?.$schema ?? {}), };
Aventus.Converter.register(Tools.VoidWithError.Fullname, Tools.VoidWithError);

_.Tools.VoidWithError=Tools.VoidWithError;
WebSocket.SocketError=class SocketError extends Aventus.GenericError {
}
WebSocket.SocketError.Namespace=`${moduleName}.WebSocket`;

_.WebSocket.SocketError=WebSocket.SocketError;
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
        return this.actionGuard.run(["open"], () => {
            return new Promise((resolve) => {
                try {
                    let protocol = "ws";
                    if (this.options.useHttps) {
                        protocol = "wss";
                    }
                    let url = protocol + "://" + this.options.host + ":" + this.options.port + this.options.socketName;
                    this.log(url);
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
        if (this[key] instanceof Date && this[key].getFullYear() < 100) {
            return "0001-01-01T00:00:00";
        }
        else if (this[key] instanceof Date) {
            const offset = this[key].getTimezoneOffset() * 60000;
            return new Date(this[key].getTime() - offset).toISOString();
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
    /**
     * Callback when the websocket connection is open
     */
    onOpen() {
    }
    _onOpen() {
        if (this.socket?.isReady()) {
            if (this.openCallback) {
                this.openCallback(true);
                this.openCallback = undefined;
            }
            this.log('Connection successfully established !' + this.options.host + ":" + this.options.port);
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
     */
    onClose(event) {
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
        return options;
    }
    get path() {
        return "/ws";
    }
    ;
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
WebSocket.Event.Namespace=`${moduleName}.WebSocket`;

_.WebSocket.Event=WebSocket.Event;
WebSocket.Route=class Route {
    endpoint;
    constructor(endpoint) {
        this.endpoint = endpoint ?? WebSocket.EndPoint.getInstance();
    }
    getPrefix() {
        return "";
    }
}
WebSocket.Route.Namespace=`${moduleName}.WebSocket`;

_.WebSocket.Route=WebSocket.Route;
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
RAM.RamHttp.Namespace=`${moduleName}.RAM`;

_.RAM.RamHttp=RAM.RamHttp;
Data.DataError=class DataError extends Aventus.GenericError {
    static get Fullname() { return "AventusSharp.Data.DataError, AventusSharp"; }
}
Data.DataError.Namespace=`${moduleName}.Data`;
Data.DataError.$schema={...(Aventus.GenericError?.$schema ?? {}), };
Aventus.Converter.register(Data.DataError.Fullname, Data.DataError);

_.Data.DataError=Data.DataError;

for(let key in _) { AventusSharp[key] = _[key] }
})(AventusSharp);

var Core;
(Core||(Core = {}));
(function (Core) {
const moduleName = `Core`;
const _ = {};
Aventus.Style.store("@default", `:host{--img-fill-color: var(--text-color);box-sizing:border-box;display:inline-block}:host *{box-sizing:border-box}.touch{cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}.touch.disable,.touch.disabled{cursor:default}.green{background-color:var(--green)}.red{background-color:var(--red)}.orange{background-color:var(--orange)}.blue{background-color:var(--blue)}`)
const Lib = {};
_.Lib = {};
const Permissions = {};
_.Permissions = {};
const Data = {};
_.Data = {};
Permissions.Tree = {};
_.Permissions.Tree = {};
Data.DataTypes = {};
_.Data.DataTypes = {};
const System = {};
_.System = {};
const State = {};
_.State = {};
const App = {};
_.App = {};
const Components = {};
_.Components = {};
const Websocket = {};
_.Websocket = {};
Websocket.Routes = {};
_.Websocket.Routes = {};
const Errors = {};
_.Errors = {};
const Routes = {};
_.Routes = {};
const RAM = {};
_.RAM = {};
let _n;
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
Lib.Pointer=class Pointer {
    static isTouch(e) {
        if (window.TouchEvent && e instanceof TouchEvent) {
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
(function (ApplicationPermission) {
    ApplicationPermission[ApplicationPermission["AllowAccess"] = 0] = "AllowAccess";
})(Permissions.ApplicationPermission || (Permissions.ApplicationPermission = {}));

_.Permissions.ApplicationPermission=Permissions.ApplicationPermission;
Lib.HttpRouter=class HttpRouter extends Aventus.HttpRouter {
}
Lib.HttpRouter.Namespace=`${moduleName}.Lib`;

_.Lib.HttpRouter=Lib.HttpRouter;
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
Data.PermissionUser=class PermissionUser extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.PermissionUser, Core"; }
    Data;
    Permission;
    UserId;
    Allow;
}
Data.PermissionUser.Namespace=`${moduleName}.Data`;
Data.PermissionUser.$schema={...(AventusSharp.Data.Storable?.$schema ?? {}), "Permission":""+moduleName+".Data.Permission","UserId":"number","Allow":"boolean"};
Aventus.Converter.register(Data.PermissionUser.Fullname, Data.PermissionUser);

_.Data.PermissionUser=Data.PermissionUser;
Permissions.Tree.PermissionTreeItem=class PermissionTreeItem {
    static get Fullname() { return "Core.Permissions.Tree.PermissionTreeItem, Core"; }
    DisplayName = "";
    Description = "";
    EnumName = "";
    Value;
    PermissionId;
    Permissions = [];
}
Permissions.Tree.PermissionTreeItem.Namespace=`${moduleName}.Permissions.Tree`;
Permissions.Tree.PermissionTreeItem.$schema={"DisplayName":"string","Description":"string","EnumName":"string","Value":"Aventus.Enum","PermissionId":"number","Permissions":"PermissionTreeItem"};
Aventus.Converter.register(Permissions.Tree.PermissionTreeItem.Fullname, Permissions.Tree.PermissionTreeItem);

_.Permissions.Tree.PermissionTreeItem=Permissions.Tree.PermissionTreeItem;
Data.DataTypes.ImageFile=class ImageFile extends AventusSharp.Data.AventusFile {
    static get Fullname() { return "Core.Data.DataTypes.ImageFile, Core"; }
}
Data.DataTypes.ImageFile.Namespace=`${moduleName}.Data.DataTypes`;
Data.DataTypes.ImageFile.$schema={...(AventusSharp.Data.AventusFile?.$schema ?? {}), };
Aventus.Converter.register(Data.DataTypes.ImageFile.Fullname, Data.DataTypes.ImageFile);

_.Data.DataTypes.ImageFile=Data.DataTypes.ImageFile;
System.Panel = class Panel extends Aventus.WebComponent {
    static __style = `:host{background-color:var(--primary-color-opacity);border-radius:var(--border-radius)}@media screen and (max-width: 768px){:host{background-color:var(--primary-color)}}@media screen and (max-width: 1224px){:host{border-radius:0px}}`;
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

(function (BackgroundSize) {
    BackgroundSize[BackgroundSize["Cover"] = 0] = "Cover";
    BackgroundSize[BackgroundSize["Contain"] = 1] = "Contain";
    BackgroundSize[BackgroundSize["Stretch"] = 2] = "Stretch";
})(Data.BackgroundSize || (Data.BackgroundSize = {}));

_.Data.BackgroundSize=Data.BackgroundSize;
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

Websocket.MainEndPoint=class MainEndPoint extends AventusSharp.WebSocket.EndPoint {
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
(function (DesktopLocation) {
    DesktopLocation[DesktopLocation["Desktop"] = 0] = "Desktop";
    DesktopLocation[DesktopLocation["BottomBar"] = 1] = "BottomBar";
    DesktopLocation[DesktopLocation["HomeFav"] = 2] = "HomeFav";
})(Data.DesktopLocation || (Data.DesktopLocation = {}));

_.Data.DesktopLocation=Data.DesktopLocation;
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
Permissions.PermissionQuery=class PermissionQuery {
    $type;
    value;
    additionalInfo;
    constructor(value, additionalInfo) {
        this.$type = this.constructor['Fullname'];
        this.value = value;
        this.additionalInfo = additionalInfo;
    }
}
Permissions.PermissionQuery.Namespace=`${moduleName}.Permissions`;

_.Permissions.PermissionQuery=Permissions.PermissionQuery;
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
    static __style = `:host{--_img-color: var(--img-color);--_img-stroke-color: var(--img-stroke-color, var(--_img-color));--_img-fill-color: var(--img-fill-color, var(--_img-color));--_img-color-transition: var(--img-color-transition, none);--_img-stroke-width: var(--img-stroke-width, 1px)}:host{display:inline-block;font-size:0;overflow:hidden}:host *{box-sizing:border-box}:host img{opacity:0;transition:filter .3s linear}:host .svg{display:none;height:100%;width:100%}:host .svg svg{height:100%;width:100%}:host mi-icon{display:none;height:100%;width:100%;font-size:inherit}:host([src$=".svg"]) img{display:none}:host([src$=".svg"]) .svg{display:flex}:host([src$=".svg"]) .svg svg{fill:var(--_img-fill-color);stroke:var(--_img-stroke-color);stroke-width:var(--_img-stroke-width);transition:var(--_img-color-transition)}:host([src$=".svg"]) mi-icon{display:none}:host([src^=mi-]){font-size:inherit}:host([src^=mi-]) img{display:none}:host([src^=mi-]) .svg{display:none}:host([src^=mi-]) mi-icon{display:inline-block}:host([display_bigger]) img{cursor:pointer}:host([display_bigger]) img:hover{filter:brightness(50%)}`;
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
        blocks: { 'default':`<img _id="img_0" /><div class="svg" _id="img_1"></div><mi-icon _id="img_2"></mi-icon>` }
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
    },
    {
      "name": "iconEl",
      "ids": [
        "img_2"
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
        else if (this.src?.startsWith("mi-")) {
            element = this.iconEl;
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
        if (!this.src || !this.svgEl || !this.imgEl || !this.iconEl) {
            return;
        }
        if (this.src.endsWith(".svg")) {
            let svgContent = await Aventus.ResourceLoader.load(this.src);
            this.svgEl.innerHTML = svgContent;
            this.calculateSize();
        }
        else if (this.src.startsWith("mi-")) {
            this.iconEl.icon = this.src.replace("mi-", "");
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

(function (LoginCode) {
    LoginCode[LoginCode["OK"] = 0] = "OK";
    LoginCode[LoginCode["WrongCredentials"] = 1] = "WrongCredentials";
    LoginCode[LoginCode["Unknown"] = 2] = "Unknown";
    LoginCode[LoginCode["NotConnected"] = 3] = "NotConnected";
})(Errors.LoginCode || (Errors.LoginCode = {}));

_.Errors.LoginCode=Errors.LoginCode;
Routes.CoreRouter=class CoreRouter extends Aventus.HttpRouter {
    defineOptions(options) {
        options.url = location.protocol + "//" + location.host + "";
        return options;
    }
}
Routes.CoreRouter.Namespace=`${moduleName}.Routes`;

_.Routes.CoreRouter=Routes.CoreRouter;
Routes.MainRouter=class MainRouter extends Aventus.HttpRoute {
    constructor(router) {
        super(router ?? new Routes.CoreRouter());
        this.LoginAction = this.LoginAction.bind(this);
        this.Logout = this.Logout.bind(this);
        this.VapidPublicKey = this.VapidPublicKey.bind(this);
        this.Register = this.Register.bind(this);
        this.SendNotification = this.SendNotification.bind(this);
        this.Restart = this.Restart.bind(this);
    }
    async LoginAction(body) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/login`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryJSON(this.router);
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
Errors.LoginError=class LoginError extends Aventus.GenericError {
    static get Fullname() { return "Core.Logic.LoginError, Core"; }
}
Errors.LoginError.Namespace=`${moduleName}.Errors`;
Errors.LoginError.$schema={...(Aventus.GenericError?.$schema ?? {}), };
Aventus.Converter.register(Errors.LoginError.Fullname, Errors.LoginError);

_.Errors.LoginError=Errors.LoginError;
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
Components.ContextMenuItem = class ContextMenuItem extends Aventus.WebComponent {
    static get observedAttributes() {return ["text", "icon"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'text'() { return this.getStringProp('text') }
    set 'text'(val) { this.setStringAttr('text', val) }get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }    priority = 0;
    action = () => { };
    menu;
    canBeRendered = () => true;
    static __style = `:host{align-items:center;border-radius:var(--border-radius-sm);cursor:pointer;display:flex;font-size:var(--font-size);margin:0 5px;padding:5px 10px;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host .title{margin-left:30px}:host .icon{display:none;font-size:var(--font-size-sm);margin-right:10px;width:20px}:host([icon]) .title{margin-left:0px}:host([icon]) .icon{display:inline-block}@media screen and (min-width: 1225px){:host{font-size:var(--font-size)}:host .icon{font-size:var(--font-size)}:host(:hover){background-color:var(--darker)}}`;
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
    static __style = `:host{--scrollbar-container-display: flex;background-color:#fff;border-radius:var(--border-radius-sm);box-shadow:var(--elevation-3);cursor:pointer;display:flex;flex-direction:column;outline:none;overflow:hidden;position:absolute;-webkit-tap-highlight-color:rgba(0,0,0,0);z-index:502}:host .container{display:flex;flex-direction:column;padding:5px 0}`;
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

Components.ContextMenuElement = class ContextMenuElement extends Aventus.WebComponent {
    static __style = `:host{display:block}`;
    __getStatic() {
        return ContextMenuElement;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(ContextMenuElement.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "ContextMenuElement";
    }
    onContextMenu(contextMenu, stop) {
    }
}
Components.ContextMenuElement.Namespace=`${moduleName}.Components`;
Components.ContextMenuElement.Tag=`rk-context-menu-element`;
_.Components.ContextMenuElement=Components.ContextMenuElement;
if(!window.customElements.get('rk-context-menu-element')){window.customElements.define('rk-context-menu-element', Components.ContextMenuElement);Aventus.WebComponentInstance.registerDefinition(Components.ContextMenuElement);}

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
    delaySaveState = 0;
    saveState() {
        if (!this.canSync())
            return;
        clearTimeout(this.delaySaveState);
        this.delaySaveState = setTimeout(() => {
            this.__manager.save();
        }, 500);
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
State.ApplicationState.$schema={...(Aventus.State?.$schema ?? {}), "$type":"string","__manager":""+moduleName+".Lib.ApplicationStateManager","application":""+moduleName+".System.Application","__canSaveState":"boolean","delaySaveState":"number"};
Aventus.Converter.register(State.ApplicationState.Fullname, State.ApplicationState);

_.State.ApplicationState=State.ApplicationState;
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
    static __style = `:host{display:none;height:100%;width:100%}:host .opacity-wrapper{animation-delay:var(--local-frame-animation-delay, 0ms);animation-duration:200ms;animation-fill-mode:forwards;animation-name:fadeIn;animation-timing-function:var(--bezier-curve);display:none;height:100%;visibility:hidden;width:100%}:host([visible]){display:block}:host([visible]) .opacity-wrapper{display:block}@keyframes fadeIn{0%{opacity:0;visibility:hidden}100%{opacity:1;visibility:visible}}`;
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
        blocks: { 'default':`<div class="opacity-wrapper">    <slot></slot></div>` }
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
    async testPermissions() {
        let proms = [];
        let queries = [];
        let test = (query) => {
            queries.push(query);
        };
        this.definePermissions(test);
        if (queries.length == 0) {
            return true;
        }
        for (let query of queries) {
            proms.push(can(query));
        }
        const perms = await Promise.all(proms);
        for (let perm of perms) {
            if (!perm) {
                return false;
            }
        }
        return true;
    }
    definePermissions(can) {
    }
    async can(state) {
        return true;
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
            if (destroy === true) {
                this.memory.splice(this.currentPosition, 1);
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
    static __style = `:host{--_scrollbar-container-color: var(--scrollbar-container-color, transparent);--_scrollbar-color: var(--scrollbar-color, #757575);--_scrollbar-active-color: var(--scrollbar-active-color, #858585);--_scrollbar-max-height: var(--scrollbar-max-height, 100%);--_scroller-width: var(--scroller-width, 6px);--_scroller-top: var(--scroller-top, 3px);--_scroller-bottom: var(--scroller-bottom, 3px);--_scroller-right: var(--scroller-right, 3px);--_scroller-left: var(--scroller-left, 3px);--_scrollbar-content-padding: var(--scrollbar-content-padding, 0);--_scrollbar-container-display: var(--scrollbar-container-display, inline-block)}:host{display:block;height:100%;min-height:inherit;min-width:inherit;overflow:hidden;position:relative;-webkit-user-drag:none;-khtml-user-drag:none;-moz-user-drag:none;-o-user-drag:none;width:100%}:host .scroll-main-container{display:block;height:100%;max-height:var(--_scrollbar-max-height);min-height:inherit;min-width:inherit;position:relative;width:100%}:host .scroll-main-container .content-zoom{display:block;height:100%;max-height:var(--_scrollbar-max-height);min-height:inherit;min-width:inherit;position:relative;transform-origin:0 0;width:100%;z-index:4}:host .scroll-main-container .content-zoom .content-hidder{display:block;height:100%;max-height:var(--_scrollbar-max-height);min-height:inherit;min-width:inherit;overflow:hidden;position:relative;width:100%}:host .scroll-main-container .content-zoom .content-hidder .content-wrapper{display:var(--_scrollbar-container-display);height:100%;min-height:inherit;min-width:inherit;padding:var(--_scrollbar-content-padding);position:relative;width:100%}:host .scroll-main-container .scroller-wrapper .container-scroller{display:none;overflow:hidden;position:absolute;transition:transform .2s linear;z-index:5}:host .scroll-main-container .scroller-wrapper .container-scroller .shadow-scroller{background-color:var(--_scrollbar-container-color);border-radius:var(--border-radius-sm)}:host .scroll-main-container .scroller-wrapper .container-scroller .shadow-scroller .scroller{background-color:var(--_scrollbar-color);border-radius:var(--border-radius-sm);cursor:pointer;position:absolute;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;z-index:5}:host .scroll-main-container .scroller-wrapper .container-scroller .scroller.active{background-color:var(--_scrollbar-active-color)}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical{height:calc(100% - var(--_scroller-bottom)*2 - var(--_scroller-width));padding-left:var(--_scroller-left);right:var(--_scroller-right);top:var(--_scroller-bottom);transform:0;width:calc(var(--_scroller-width) + var(--_scroller-left))}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical.hide{transform:translateX(calc(var(--_scroller-width) + var(--_scroller-left)))}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical .shadow-scroller{height:100%}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical .shadow-scroller .scroller{width:calc(100% - var(--_scroller-left))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal{bottom:var(--_scroller-bottom);height:calc(var(--_scroller-width) + var(--_scroller-top));left:var(--_scroller-right);padding-top:var(--_scroller-top);transform:0;width:calc(100% - var(--_scroller-right)*2 - var(--_scroller-width))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal.hide{transform:translateY(calc(var(--_scroller-width) + var(--_scroller-top)))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal .shadow-scroller{height:100%}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal .shadow-scroller .scroller{height:calc(100% - var(--_scroller-top))}:host([y_scroll]) .scroll-main-container .content-zoom .content-hidder .content-wrapper{height:auto}:host([x_scroll]) .scroll-main-container .content-zoom .content-hidder .content-wrapper{width:auto}:host([y_scroll_visible]) .scroll-main-container .scroller-wrapper .container-scroller.vertical{display:block}:host([x_scroll_visible]) .scroll-main-container .scroller-wrapper .container-scroller.horizontal{display:block}:host([no_user_select]) .content-wrapper *{user-select:none}:host([no_user_select]) ::slotted{user-select:none}`;
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

System.Frame = class Frame extends System.FrameNoScroll {
    static __style = `:host .main-scroll{--scrollbar-content-padding: 0 15px}:host .main-scroll>*{--scrollbar-content-padding: 0}`;
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

System.FrameNotAllowed = class FrameNotAllowed extends System.Frame {
    static __style = ``;
    __getStatic() {
        return FrameNotAllowed;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(FrameNotAllowed.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<p>Pas autorisé</p>` }
    });
}
    getClassName() {
        return "FrameNotAllowed";
    }
    pageTitle() {
        return "Accès non autorisé";
    }
    definePermissions(test) {
    }
    onShow() {
    }
    onHide() {
    }
}
System.FrameNotAllowed.Namespace=`${moduleName}.System`;
System.FrameNotAllowed.Tag=`rk-frame-not-allowed`;
_.System.FrameNotAllowed=System.FrameNotAllowed;
if(!window.customElements.get('rk-frame-not-allowed')){window.customElements.define('rk-frame-not-allowed', System.FrameNotAllowed);Aventus.WebComponentInstance.registerDefinition(System.FrameNotAllowed);}

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
    definePermissions(can) {
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
Websocket.Routes.DesktopRouter=class DesktopRouter extends AventusSharp.WebSocket.Route {
    events;
    constructor(endpoint) {
        super(endpoint ?? Websocket.MainEndPoint.getInstance());
        this.events = {
            RegisterOpenApp: new Websocket.Routes.DesktopRouter_RegisterOpenApp(this.endpoint, this.getPrefix),
            RemoveApp: new Websocket.Routes.DesktopRouter_RemoveApp(this.endpoint, this.getPrefix),
            SetDesktopIcon: new Websocket.Routes.DesktopRouter_SetDesktopIcon(this.endpoint, this.getPrefix),
            RemoveDesktopIcon: new Websocket.Routes.DesktopRouter_RemoveDesktopIcon(this.endpoint, this.getPrefix),
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
    constructor(router) {
        super(router ?? new Routes.CoreRouter());
        this.GetAll = this.GetAll.bind(this);
        this.ConfigureAppData = this.ConfigureAppData.bind(this);
        this.InstallDevApp = this.InstallDevApp.bind(this);
        this.UninstallDevApp = this.UninstallDevApp.bind(this);
    }
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
                let apps = await new Routes.ApplicationRouter().GetAll();
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
    static __style = `:host{align-items:center;background-color:#0c2247;border-radius:var(--border-radius-sm);box-shadow:var(--elevation-5);cursor:pointer;display:flex;height:30px;justify-content:center;position:relative;transition:box-shadow var(--bezier-curve) .3s,transform var(--bezier-curve) .3s;width:30px;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host::after{background-color:var(--text-color);border-radius:var(--border-radius-sm);bottom:-7px;content:"";height:4px;opacity:0;position:absolute;transition:visibility var(--bezier-curve) .3s,opacity var(--bezier-curve) .3s;visibility:hidden;width:4px}:host .remove{background-color:var(--primary-color);border-radius:var(--border-radius-round);display:none;height:20px;position:absolute;right:-10px;top:-10px;width:20px}:host .remove rk-img{--img-stroke-color: var(--text-color);height:100%;padding:0;width:100%}:host([shaking]){animation:shake linear .4s infinite}:host([shaking][can_remove]) .remove{display:block}:host([is_open]){transform:translateY(-3px)}:host([is_open])::after{visibility:visible;opacity:1}@media screen and (min-width: 1225px){:host(:hover){box-shadow:var(--elevation-1)}}@media screen and (max-width: 768px){:host{height:50px;width:50px}}@keyframes shake{0%{transform:rotateZ(0) rotateX(-13deg)}25%{transform:rotateZ(2deg) rotateX(-13deg)}50%{transform:rotateZ(0) rotateX(-13deg)}75%{transform:rotateZ(-2deg) rotateX(-13deg)}100%{transform:rotateZ(0) rotateX(-13deg)}}`;
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

System.AppList = class AppList extends Aventus.WebComponent {
    static get observedAttributes() {return ["show"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'no_transition'() { return this.getBoolAttr('no_transition') }
    set 'no_transition'(val) { this.setBoolAttr('no_transition', val) }    get 'show'() { return this.getBoolProp('show') }
    set 'show'(val) { this.setBoolAttr('show', val) }    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("show", ((target) => {
    target.onShowChange();
})); }
    static __style = `:host{--internal-app-list-case-border-radius: var(--app-list-case-border-radius, var(--app-icon-border-radius, 10px));--internal-app-list-case-border: var(--app-list-case-border, none);--internal-app-list-case-background-color: var(--app-list-case-background-color, transparent);--internal-app-list-case-border-selected: var(--app-list-case-border-selected, 2px solid red);--internal-app-list-case-background-color-selected: var(--app-list-case-background-color-selected, transparent)}:host{align-items:center;background-color:var(--lighter-active);display:flex;flex-direction:column;inset:0;position:absolute;top:100%;transition:top .5s var(--bezier-curve);z-index:5}:host .search{align-items:center;display:flex;height:100px;justify-content:center;width:100%}:host .search input{background-color:var(--form-element-background);border:none;border-radius:var(--border-radius-round);box-shadow:var(--elevation-3);font-size:var(--form-element-font-size);line-height:var(--form-element-font-size);max-width:400px;outline:none;padding:10px 20px;width:calc(100% - 20px)}:host .app-list{--page-case-background: var(--internal-app-list-case-background-color);--page-case-background-active: var(--internal-app-list-case-background-color-selected);--page-case-border-active: var(--internal-app-list-case-border-selected);--page-case-border-radius: var(--internal-app-list-case-border-radius);flex-grow:1;max-width:1000px;width:100%}:host([show]){top:0}:host([no_transition]){transition:none}`;
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
Routes.UserRouter=class UserRouter extends AventusSharp.Routes.StorableRoute {
    constructor(router) {
        super(router ?? new Routes.CoreRouter());
        this.GetConnected = this.GetConnected.bind(this);
    }
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
Permissions.Tree.PermissionTree=class PermissionTree {
    static get Fullname() { return "Core.Permissions.Tree.PermissionTree, Core"; }
    AppName;
    IconTagName;
    PermissionId;
    Permissions = [];
}
Permissions.Tree.PermissionTree.Namespace=`${moduleName}.Permissions.Tree`;
Permissions.Tree.PermissionTree.$schema={"AppName":"string","IconTagName":"string","PermissionId":"number","Permissions":"PermissionTreeItem"};
Aventus.Converter.register(Permissions.Tree.PermissionTree.Fullname, Permissions.Tree.PermissionTree);

_.Permissions.Tree.PermissionTree=Permissions.Tree.PermissionTree;
Data.PermissionGroup=class PermissionGroup extends AventusSharp.Data.Storable {
    static get Fullname() { return "Core.Data.PermissionGroup, Core"; }
    Data;
    Permission;
    GroupId;
}
Data.PermissionGroup.Namespace=`${moduleName}.Data`;
Data.PermissionGroup.$schema={...(AventusSharp.Data.Storable?.$schema ?? {}), "Permission":""+moduleName+".Data.Permission","GroupId":"number"};
Aventus.Converter.register(Data.PermissionGroup.Fullname, Data.PermissionGroup);

_.Data.PermissionGroup=Data.PermissionGroup;
Permissions.PermissionForUser=class PermissionForUser {
    static get Fullname() { return "Core.Logic.PermissionForUser, Core"; }
    permissionGroups = [];
    permissionUsers = [];
}
Permissions.PermissionForUser.Namespace=`${moduleName}.Permissions`;
Permissions.PermissionForUser.$schema={"permissionGroups":""+moduleName+".Data.PermissionGroup","permissionUsers":""+moduleName+".Data.PermissionUser"};
Aventus.Converter.register(Permissions.PermissionForUser.Fullname, Permissions.PermissionForUser);

_.Permissions.PermissionForUser=Permissions.PermissionForUser;
Routes.PermissionRouter=class PermissionRouter extends Aventus.HttpRoute {
    constructor(router) {
        super(router ?? new Routes.CoreRouter());
        this.Can = this.Can.bind(this);
        this.GetPermissionsTree = this.GetPermissionsTree.bind(this);
        this.GetPermissionsForUser = this.GetPermissionsForUser.bind(this);
    }
    async Can(body) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/can`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryJSON(this.router);
    }
    async GetPermissionsTree() {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/getpermissionstree`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
    async GetPermissionsForUser(idUser) {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/permissions/GetPermissionsForUser/${idUser}`, Aventus.HttpMethod.GET);
        return await request.queryJSON(this.router);
    }
}
Routes.PermissionRouter.Namespace=`${moduleName}.Routes`;

_.Routes.PermissionRouter=Routes.PermissionRouter;
Permissions.Permission=class Permission {
    static saved = {};
    static async can(query) {
        if (!query.additionalInfo) {
            query.additionalInfo = "";
        }
        let key = query.$type + "$" + query.value + "$" + query.additionalInfo;
        if (Object.keys(this.saved).includes(key)) {
            return this.saved[key];
        }
        let response = await new Routes.PermissionRouter().Can({ permissionQuery: query });
        if (response.success && response.result !== undefined) {
            this.saved[key] = response.result;
            return this.saved[key];
        }
        else {
            console.log(response.errors);
        }
        return false;
    }
    static clear() {
        this.saved = {};
    }
}
Permissions.Permission.Namespace=`${moduleName}.Permissions`;

_.Permissions.Permission=Permissions.Permission;
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
                let query = await new Routes.UserRouter().GetConnected();
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
            await new Routes.MainRouter().Logout();
            Permissions.Permission.clear();
        }
        catch { }
        window.location.reload();
    }
    static getUserId() {
        return userIdConnected;
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
    static __style = `:host{display:flex;flex-direction:column;left:-9px;position:absolute;width:500px;box-shadow:var(--elevation-3)}:host .content{flex-grow:1;max-height:calc(100% - 57px)}:host .content rk-row{height:100%}:host .content rk-row rk-col{height:100%}:host .content rk-row rk-col .title{font-weight:700;height:30px;padding:5px}:host .content rk-row rk-col .scrollable{--scroller-right: 0;height:calc(100% - 30px);width:100%}:host .content rk-row rk-col .recent{width:100%}:host .content rk-row rk-col .recent .recent-container *{background-color:var(--primary-color);border-radius:var(--border-radius-sm);margin:10px;overflow:hidden}:host .content rk-row rk-col .favoris{width:100%}:host .content rk-row rk-col .favoris .favoris-container .grid{display:flex;flex-wrap:wrap;gap:10px;padding:10px}:host .content rk-row rk-col .favoris .favoris-container .grid *{aspect-ratio:1/1;flex-shrink:0;height:auto;width:calc(33.3333333333% - 6.6666666667px)}:host .footer{align-items:center;border-top:1px solid var(--lighter-active);display:flex;gap:10px;height:57px;justify-content:space-between;width:100%}:host .footer .person{align-items:center;border-radius:var(--border-radius-sm);display:flex;margin:10px 10px;padding:8px 10px;transition:background-color .2s var(--bezier-curve)}:host .footer .person .icon{height:30px;width:30px}:host .footer .person .name{margin-left:10px}:host .footer .person:hover{background-color:var(--lighter)}:host .footer .actions{align-items:center;display:flex}:host .footer .actions rk-pwa-button{color:var(--text-color-green);background-color:var(--green);height:36px;width:36px}:host .footer .actions rk-button{--button-padding: 0px 8px;--button-icon-stroke-color: var(--text-color-red);--button-icon-fill-color: transparent;--button-background-color: var(--red);--button-background-color-hover: transparent;aspect-ratio:1;border:none;box-shadow:var(--elevation-2);margin:10px 10px;min-width:auto}`;
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
        blocks: { 'default':`<div class="content">    <rk-row>        <rk-col size="6">            <div class="recent">                <div class="title">                    Récents                </div>                <rk-scrollable class="scrollable recent-container" floating_scroll _id="homepanel_0">                </rk-scrollable>            </div>        </rk-col>        <rk-col size="6">            <div class="favoris">                <div class="title">                    Mes favoris                </div>                <rk-scrollable class="scrollable favoris-container" floating_scroll>                    <div class="grid" _id="homepanel_1"></div>                </rk-scrollable>            </div>        </rk-col>    </rk-row></div><div class="footer">    <div class="person touch" _id="homepanel_2">        <rk-user-profil-picture class="icon" _id="homepanel_3"></rk-user-profil-picture>        <div class="name" _id="homepanel_4"></div>    </div>    <div class="actions">        <rk-pwa-button>            <rk-tooltip position="top" delay="1000" use_absolute color="green">Installer l'application</rk-tooltip>        </rk-pwa-button>        <rk-button icon="/img/icons/power-off.svg" _id="homepanel_5"></rk-button>    </div></div>` }
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
            desktop.openUrl("Settings", "/", "/profil");
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
    set 'active'(val) { this.setBoolAttr('active', val) }    static __style = `:host{position:relative}:host .icon{border-radius:var(--border-radius-sm);cursor:pointer;margin:0 3px;max-height:calc(100% - 16px);max-width:34px;padding:7px;transition:background-color .2s var(--bezier-curve)}:host rk-home-panel{bottom:calc(100% + 5px);height:0;overflow:hidden;transition:bottom var(--bezier-curve) .5s,height var(--bezier-curve) .5s}:host([active]) .icon{background-color:var(--text-color)}:host([active]) .icon rk-img{--img-fill-color: var(--primary-color-opacity)}:host([active]) rk-home-panel{bottom:calc(100% + 10px);height:400px}@media screen and (min-width: 1225px){:host(:not([active])) .icon:hover{background-color:var(--lighter-active)}}`;
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
    static __style = `:host{align-items:center;background-color:var(--primary-color-opacity);border-radius:var(--border-radius);bottom:10px;box-shadow:var(--elevation-3);color:var(--text-color);display:flex;font-size:var(--font-size);height:50px;left:100px;outline:none;padding:0 10px;position:absolute;transition:opacity var(--bezier-curve) .5s,visibility var(--bezier-curve) .5s,transform 1s var(--bezier-curve);width:calc(100% - 200px);z-index:100}:host .section{align-items:center;display:flex;height:100%}:host .section .icon{--img-stroke-color: transparent;--img-fill-color: var(--text-color);border-radius:var(--border-radius-sm);cursor:pointer;margin:0 3px;max-height:calc(100% - 16px);max-width:34px;padding:7px;transition:background-color .2s var(--bezier-curve)}:host .section rk-app-icon{margin:0 5px}:host .separator{background-color:var(--text-color);display:inline-block;height:50%;margin:0 13px;width:1px}:host .applications{flex-grow:1;gap:10px;position:relative}:host .applications .empty-icon{background-color:var(--darker-active);border-radius:var(--border-radius-sm);height:30px;width:30px}:host .nb-notifications{align-items:center;background-color:var(--text-color);border-radius:var(--border-radius-round);color:var(--primary-color-opacity);display:flex;font-size:14px;font-weight:bold;height:25px;justify-content:center;letter-spacing:-1px;padding-right:1px;width:25px}@media screen and (min-width: 1225px){:host .section .icon:hover{background-color:var(--lighter-active)}}@media screen and (max-width: 1224px){:host{border-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0;bottom:0px;left:0px;padding:0 10px;width:100%}}@media screen and (max-width: 768px){:host{height:70px}:host .basic-action{display:none}:host .addons>*{display:none}:host .separator{display:none}:host .applications .empty-icon{height:50px;width:50px}}`;
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
            let result = await new Websocket.Routes.DesktopRouter().SetDesktopIcon({
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
                    let result = await new Websocket.Routes.DesktopRouter().SetDesktopIcon({
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
            let result = await new Websocket.Routes.DesktopRouter().RemoveDesktopIcon({
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
                        let result = await new Websocket.Routes.DesktopRouter().SetDesktopIcon({
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

Permissions.ApplicationPermissionQuery=class ApplicationPermissionQuery extends Permissions.PermissionQuery {
    static get Fullname() { return "Core.Permissions.ApplicationPermissionQuery, Core"; }
}
Permissions.ApplicationPermissionQuery.Namespace=`${moduleName}.Permissions`;
Permissions.ApplicationPermissionQuery.$schema={...(Permissions.PermissionQuery?.$schema ?? {}), };
Aventus.Converter.register(Permissions.ApplicationPermissionQuery.Fullname, Permissions.ApplicationPermissionQuery);

_.Permissions.ApplicationPermissionQuery=Permissions.ApplicationPermissionQuery;
System.Notification = class Notification extends Aventus.WebComponent {
    static get observedAttributes() {return ["icon", "subject"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'position'() { return this.getStringAttr('position') }
    set 'position'(val) { this.setStringAttr('position', val) }get 'is_active'() { return this.getBoolAttr('is_active') }
    set 'is_active'(val) { this.setBoolAttr('is_active', val) }    get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }get 'subject'() { return this.getStringProp('subject') }
    set 'subject'(val) { this.setStringAttr('subject', val) }    showAsked = false;
    onHide = () => { };
    static __style = `:host{--internal-notification-box-shadow: var(--notification-box-shadow);--internal-notification-logo-fill-color: var(--notification-logo-fill-color, var(--text-color));--internal-notification-logo-stroke-color: var(--notification-logo-stroke-color, transparent);--local-notification-transition-delay: 0.4s}:host{background-color:var(--secondary-color);border-radius:var(--border-radius);box-shadow:var(--internal-notification-box-shadow);color:var(--text-color);display:flex;max-width:calc(100% - 20px);min-height:40px;padding:10px;position:absolute;width:400px;z-index:600}:host .logo{--img-fill-color: var(--internal-notification-logo-fill-color);--img-stroke-color: var(--internal-notification-logo-stroke-color);flex-shrink:0;order:1;width:30px}:host .logo[src=""]{display:none}:host .content{display:flex;flex-direction:column;order:2}:host .content .title{font-size:20px;font-weight:bold;margin-bottom:5px}:host .content .title:empty{display:none}:host .content .text{flex-grow:1;overflow:hidden}:host .content .text:empty{display:none}:host .close{cursor:pointer;flex-grow:0;height:30px;position:absolute;width:30px}:host([position=left]){bottom:80px;left:0px;opacity:0;transform:translateX(-100%);transition:left var(--local-notification-transition-delay) var(--bezier-curve),bottom var(--local-notification-transition-delay) var(--bezier-curve),transform var(--local-notification-transition-delay) var(--bezier-curve),opacity var(--local-notification-transition-delay) var(--bezier-curve)}:host([position=left]) .logo{order:2}:host([position=left]) .content{margin-left:30px;margin-right:0px;order:1}:host([position=left]) .close{left:5px;top:5px}:host([position=left][is_active]){left:10px;opacity:1;transform:translateX(0)}:host([position=right]){bottom:80px;opacity:0;right:0px;transform:translateX(100%);transition:right var(--local-notification-transition-delay) var(--bezier-curve),bottom var(--local-notification-transition-delay) var(--bezier-curve),transform var(--local-notification-transition-delay) var(--bezier-curve),opacity var(--local-notification-transition-delay) var(--bezier-curve)}:host([position=right]) .content{margin-left:10px;margin-right:30px}:host([position=right]) .close{right:5px;top:5px}:host([position=right][is_active]){opacity:1;right:10px;transform:translateX(0)}:host([position=top]){left:10%;opacity:0;transform:translateY(-100%);transition:top var(--local-notification-transition-delay) var(--bezier-curve),transform var(--local-notification-transition-delay) var(--bezier-curve),opacity var(--local-notification-transition-delay) var(--bezier-curve);width:80%}:host([position=top]) .content{margin-left:10px;margin-right:30px}:host([position=top]) .close{right:5px;top:5px}:host([position=top]:not([is_active])){top:0px !important}:host([position=top][is_active]){opacity:1;top:10px;transform:translateY(0)}:host([position=bottom]){left:10%;transform:translateY(100%);transition:bottom var(--local-notification-transition-delay) var(--bezier-curve),transform var(--local-notification-transition-delay) var(--bezier-curve),opacity var(--local-notification-transition-delay) var(--bezier-curve);width:80%}:host([position=bottom]) .content{margin-left:10px;margin-right:30px}:host([position=bottom]) .close{right:5px;top:5px}:host([position=bottom]:not([is_active])){bottom:0px !important}:host([position=bottom][is_active]){bottom:80px;opacity:1;transform:translateY(0)}`;
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
    constructor(router) {
        super(router ?? new Routes.CoreRouter());
    }
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
    static __style = `:host{--_desktop-background-color: var(--desktop-background-color, var(--primary-color))}:host{background-color:var(--_desktop-background-color);background-position:center;background-repeat:no-repeat;background-size:cover;flex-shrink:0;height:100%;overflow:hidden;position:relative;width:100%}:host .icons{--page-case-border-radius: var(--border-radius-sm);--page-case-border-active: 1px solid var(--darker-active);--page-case-background-active: var(--lighter-active);height:calc(100% - 70px);transition:opacity var(--bezier-curve) .5s,visibility var(--bezier-curve) .5s;width:100%;z-index:2}:host .app-container{transition:opacity var(--bezier-curve) .5s,visibility var(--bezier-curve) .5s}:host([show_application_list])>*{opacity:0 !important;visibility:hidden !important}:host([background_size=Cover]){background-size:cover}:host([background_size=Contain]){background-size:contain}:host([background_size=Stretch]){background-size:100% 100%}`;
    constructor() {            super();this.setAppPositionTemp=this.setAppPositionTemp.bind(this)this.clearAppPositionTemp=this.clearAppPositionTemp.bind(this)this.setAppPosition=this.setAppPosition.bind(this)this.removeAppPosition=this.removeAppPosition.bind(this) }
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
        if (!(await can(new Permissions.ApplicationPermissionQuery(Permissions.ApplicationPermission.AllowAccess, application)))) {
            let notif = new System.Notification();
            notif.subject = "Erreur";
            notif.innerHTML = "Vous n'êtes pas autorisé à ouvrir l'application " + application;
            System.Os.instance.notify(notif);
            return;
        }
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
        if (!(await can(new Permissions.ApplicationPermissionQuery(Permissions.ApplicationPermission.AllowAccess, appName)))) {
            let notif = new System.Notification();
            notif.subject = "Erreur";
            notif.innerHTML = "Vous n'êtes pas autorisé à ouvrir l'application " + appName;
            System.Os.instance.notify(notif);
            return;
        }
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
            let result = await new Websocket.Routes.DesktopRouter().SetDesktopIcon({
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
            let result = await new Websocket.Routes.DesktopRouter().RemoveDesktopIcon({
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

Components.GenericPopup = class GenericPopup extends Aventus.WebComponent {
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
    static __style = `:host{--_popup-background-color: var(--popup-background-color, var(--application-background-color, var(--primary-color-opacity)));--_popup-border-radius: var(--popup-border-radius, var(--application-border-radius, 10px));--_popup-header-background-color: var(--popup-header-background-color, var(--application-header-background-color, var(--darker-active)));--_popup-content-padding: var(--popup-content-padding, 15px)}:host{align-items:center;animation-duration:.5s;animation-fill-mode:forwards;animation-name:fadeIn;animation-timing-function:var(--bezier-curve);background-color:rgba(48,48,48,.1);border-radius:var(--application-border-radius);display:flex;inset:0;justify-content:center;position:absolute;z-index:650}:host .popup{background-color:var(--_popup-background-color);border-radius:var(--_popup-border-radius);box-shadow:var(--elevation-5);container-name:application;container-type:normal;display:flex;flex-direction:column;max-height:calc(100% - 50px);max-width:calc(100% - 50px);width:fit-content}:host .popup .header{align-items:center;border-top-left-radius:var(--_popup-border-radius);border-top-right-radius:var(--_popup-border-radius);display:flex;flex-shrink:0;height:30px;overflow:hidden;position:relative;width:100%;z-index:3}:host .popup .header .background{background-color:var(--_popup-header-background-color);inset:0;position:absolute;z-index:1}:host .popup .header .title{flex-grow:1;margin-left:15px;margin-right:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;z-index:2}:host .popup .header .application-actions{align-items:center;display:flex;gap:5px;justify-content:end;margin-right:15px;z-index:2}:host .popup .header .application-actions .btn{border-radius:var(--border-radius);height:15px;width:15px}:host .popup .content{border-bottom-left-radius:var(--_application-border-radius);border-bottom-right-radius:var(--_application-border-radius);height:calc(100% - 30px);max-height:calc(var(--app-height) - 50px - 30px);min-width:auto;min-height:auto;overflow:hidden;padding:var(--_popup-content-padding);width:100%;z-index:1;width:fit-content}:host .popup.shake{animation-duration:.3s;animation-iteration-count:1;animation-name:shake;animation-timing-function:var(--bezier-curve)}:host(.fade-out){animation-duration:.5s;animation-fill-mode:forwards;animation-name:fadeOut;animation-timing-function:var(--bezier-curve)}:host([no_red_btn]) .popup .header .application-actions .btn{display:none}:host([behind]){z-index:550}@media screen and (min-width: 1225px){:host .popup .header .application-actions .btn:hover{box-shadow:0 0 4px var(--darker-active) inset}}@keyframes fadeIn{0%{opacity:0;visibility:hidden}100%{opacity:1;visibility:visible}}@keyframes fadeOut{0%{opacity:1;visibility:visible}100%{opacity:0;visibility:hidden}}@keyframes shake{0%{transform:scale(1)}50%{transform:scale(1.03)}100%{transform:scale(1)}}`;
    constructor() {
            super();
            this.info = this.defaultOptions();
if (this.constructor == GenericPopup) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return GenericPopup;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(GenericPopup.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="popup" _id="genericpopup_0">    <div class="header">        <div class="background"></div>        <div class="title" _id="genericpopup_1"></div>        <div class="application-actions">            <div class="btn red touch" _id="genericpopup_2"></div>        </div>    </div>    <div class="content">        <slot></slot>    </div></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "popupEl",
      "ids": [
        "genericpopup_0"
      ]
    }
  ],
  "content": {
    "genericpopup_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__cc26f54f9c039edaaa84e25490791589method0())}`,
      "once": true
    }
  },
  "pressEvents": [
    {
      "id": "genericpopup_2",
      "onPress": (e, pressInstance, c) => { c.comp.cancel(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "GenericPopup";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('no_red_btn')) { this.attributeChangedCallback('no_red_btn', false, false); }if(!this.hasAttribute('behind')) { this.attributeChangedCallback('behind', false, false); }if(!this.hasAttribute('close_on_click')) { this.attributeChangedCallback('close_on_click', false, false); } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["info"] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('no_red_btn');this.__upgradeProperty('behind');this.__upgradeProperty('close_on_click');this.__correctGetter('info'); }
    __listBoolProps() { return ["no_red_btn","behind","close_on_click"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    onContextMenu(contextMenu, stop) {
        stop();
    }
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
    __cc26f54f9c039edaaa84e25490791589method0() {
        return this.info.title;
    }
}
Components.GenericPopup.Namespace=`${moduleName}.Components`;
_.Components.GenericPopup=Components.GenericPopup;

Components.Confirm = class Confirm extends Components.GenericPopup {
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
        this.resolve(true);
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

Components.Alert = class Alert extends Components.GenericPopup {
    static __style = `:host .popup .content .body{--scrollbar-max-height: calc(var(--app-height) - 50px - 30px - 36px - var(--_popup-content-padding) - var(--_popup-content-padding));align-items:center;display:flex;justify-content:center;line-height:1.5;max-height:calc(var(--app-height) - 50px - 30px - 36px - var(--_popup-content-padding) - var(--_popup-content-padding));padding:20px;padding-top:15px;text-align:center}:host .popup .content .action{align-items:center;display:flex;gap:20px;height:36px;justify-content:center}`;
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
    static __style = `:host{--_active-desktop: var(_active-desktop, 0)}:host{height:100%;position:relative;width:100%;z-index:1}:host .desktop-container{display:flex;height:100%;position:relative;width:100%;z-index:1}:host .desktop-container .desktop-case{flex-shrink:0;height:100%;position:relative;width:100%}:host .desktop-container .desktop-case .delete-desktop{--img-stroke-color: var(--red);background-color:var(--lighter-active);border-radius:var(--border-radius-round);cursor:pointer;display:none;height:40px;position:absolute;right:5px;top:5px;width:40px;z-index:5556}:host .desktop-container .desktop-case .desktop-hider{display:none;inset:0;position:absolute;z-index:5555}:host .desktop-container .desktop-case:first-child{margin-left:calc(var(--_active-desktop)*-100%)}:host .add-desktop{--img-stroke-color: white;bottom:30px;display:none;height:50px;min-width:auto;position:absolute;right:10px;z-index:6}:host rk-loading{opacity:0;visibility:hidden}:host(:not([ready])) *{opacity:0;visibility:hidden}:host(:not([loading])) rk-loading{transition:opacity 1s var(--bezier-curve),visibility 1s var(--bezier-curve)}:host([loading]) rk-loading{opacity:1;visibility:visible}:host([desktop_list]) .desktop-container{flex-wrap:wrap;height:auto;justify-content:center}:host([desktop_list]) .desktop-container .desktop-case{--nb: 3;aspect-ratio:var(--ration);box-shadow:var(--elevation-10);height:max-content;margin:15px !important;overflow:hidden;width:calc(100%/var(--nb) - 30px)}:host([desktop_list]) .desktop-container .desktop-case .desktop-hider,:host([desktop_list]) .desktop-container .desktop-case .delete-desktop{display:block}:host([desktop_list]) .desktop-container .desktop-case rk-desktop{height:calc(100%*var(--nb));margin-left:calc(-50%*(var(--nb) - 1));top:calc(-50%*(var(--nb) - 1));transform:scale(calc(1 / var(--nb)));width:calc(100%*var(--nb))}:host([desktop_list]) .desktop-container .desktop-case.active{border:solid 5px var(--blue);border-radius:var(--border-radius-sm)}:host([desktop_list]) .add-desktop{display:block}`;
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
                await new Websocket.Routes.DesktopRouter().RegisterOpenApp({
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
                await new Websocket.Routes.DesktopRouter().RemoveApp({
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
        new Websocket.Routes.DesktopRouter().events.RegisterOpenApp.onTrigger.add(this.onRegisterInfo);
        new Websocket.Routes.DesktopRouter().events.RemoveApp.onTrigger.add(this.onRemoveApp);
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
    page405;
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
    static __style = `:host{--_application-box-shadow: var(--application-box-shadow);--_application-header-background-color: var(--application-header-background-color, var(--darker-active));--_application-background-color: var(--application-background-color, var(--primary-color-opacity));--_application-border-radius: var(--application-border-radius, 10px)}:host{backdrop-filter:blur(2px);background-color:var(--_application-background-color);border-radius:var(--_application-border-radius);box-shadow:var(--_application-box-shadow);container-name:application;container-type:inline-size;height:var(--app-height);outline:none;position:absolute;width:var(--app-width);z-index:50}:host .header{align-items:center;border-top-left-radius:var(--_application-border-radius);border-top-right-radius:var(--_application-border-radius);cursor:grab;display:flex;flex-shrink:0;height:30px;overflow:hidden;position:relative;width:100%;z-index:3}:host .header .background{background-color:var(--_application-header-background-color);inset:0;position:absolute;z-index:1}:host .header .navigation-actions{align-items:center;display:flex;flex-grow:0;height:100%;margin-left:15px;margin-right:15px;z-index:2}:host .header .navigation-actions .action{align-items:center;border-radius:2px;display:flex;height:calc(100% - 6px);justify-content:center;padding:0px;padding:1px 5px;transition:background-color var(--bezier-curve) .2s;width:22px}:host .header .navigation-actions .action rk-img{height:100%;pointer-events:none;width:100%}:host .header .navigation-actions .action.disable rk-img{--img-fill-color: var(--text-disable)}:host .header .title{flex-grow:1;margin-right:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;z-index:2}:host .header .application-actions{align-items:center;display:flex;gap:5px;justify-content:end;margin-right:15px;z-index:2}:host .header .application-actions .btn{border-radius:var(--border-radius-round);height:15px;width:15px}:host .content{border-bottom-left-radius:var(--_application-border-radius);border-bottom-right-radius:var(--_application-border-radius);height:calc(100% - 35px);margin:5px;margin-top:0;overflow:hidden;width:calc(100% - 10px);z-index:1}:host .loading{border-radius:var(--_application-border-radius);display:none;z-index:600}:host rk-resize{--resize-z-index: 4}:host(:not([moving])){transition:height .5s var(--bezier-curve),width .5s var(--bezier-curve),top .5s var(--bezier-curve),left .5s var(--bezier-curve),border-radius .5s var(--bezier-curve),opacity var(--bezier-curve) .5s,visibility var(--bezier-curve) .5s}:host(:not([moving])) .header{transition:border-radius .5s var(--bezier-curve)}:host([moving]) .header{cursor:grabbing}:host([full]){border-radius:0;height:100% !important;left:0 !important;top:0 !important;width:100% !important;z-index:500}:host([full]) .header{border-top-left-radius:0;border-top-right-radius:0;cursor:default}:host([full]) .content{border-bottom-left-radius:0;border-bottom-right-radius:0}:host([is_hidden]){height:0 !important;left:calc(50% - 100px) !important;overflow:hidden;top:calc(100% - 50px) !important;width:200px !important}:host([loading]) .loading{display:flex}@media screen and (min-width: 1225px){:host .header .navigation-actions .action:not(.disable):hover{background-color:var(--lighter)}:host .header .application-actions .btn:hover{box-shadow:0 0 4px var(--darker-active) inset}}@media screen and (max-width: 1224px){:host .header{height:40px}:host .header .application-actions{gap:10px}:host .header .application-actions .btn{height:20px;width:20px}:host .content{height:calc(100% - 45px)}}@media screen and (max-width: 768px){:host{border-radius:0;height:100% !important;left:0 !important;top:0 !important;width:100% !important;z-index:502}:host .header{border-top-left-radius:0;border-top-right-radius:0;height:40px}:host .header .application-actions{gap:10px}:host .header .application-actions .btn{height:20px;width:20px}:host .header .application-actions .orange{display:none}:host .content{border-bottom-left-radius:0;border-bottom-right-radius:0;height:calc(100% - 45px)}:host rk-resize{display:none}:host([is_hidden]){left:0 !important;width:100% !important}}`;
    constructor() {            super();            this.history = new System.ApplicationHistory();            this.sizeManager = new System.ApplicationSize(this);            this.canChangeState = this.canChangeState.bind(this);            this.navigator.canChangeState(this.canChangeState);if (this.constructor == Application) { throw "can't instanciate an abstract class"; } this.onContextMenuContent=this.onContextMenuContent.bind(this)this.onContextMenuHeader=this.onContextMenuHeader.bind(this)this.validError404=this.validError404.bind(this)this.showErrorNotAllowed=this.showErrorNotAllowed.bind(this)this.saveApplicationHistory=this.saveApplicationHistory.bind(this)this.onResizeStart=this.onResizeStart.bind(this)this.onResizeStop=this.onResizeStop.bind(this)this.moveApplicationToLeft=this.moveApplicationToLeft.bind(this)this.moveApplicationToRight=this.moveApplicationToRight.bind(this) }
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
        blocks: { 'default':`<rk-context-menu-element class="header" _id="application_0">    <div class="background"></div>    <div class="navigation-actions">        <div class="previous action touch disable" _id="application_1">            <rk-img src="/img/icons/angle-left.svg"></rk-img>        </div>        <div class="next action touch disable" _id="application_2">            <rk-img src="/img/icons/angle-right.svg"></rk-img>        </div>    </div>    <div class="title" _id="application_3"></div>    <div class="application-actions">        <div class="btn green touch" _id="application_4"></div>        <div class="btn orange touch" _id="application_5"></div>        <div class="btn red touch" _id="application_6"></div>    </div></rk-context-menu-element><rk-context-menu-element class="content" _id="application_7"></rk-context-menu-element><rk-resize min_width="200" min_height="200" _id="application_8"></rk-resize><rk-loading class="loading"></rk-loading>` }
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
    onContextMenuContent(contextMenu, stop) {
        stop();
    }
    onContextMenuHeader(contextMenu, stop) {
        contextMenu.addItem({
            text: "Recentrer la fenetre",
            icon: "/img/icons/window-restore.svg",
            priority: 2,
            action: () => {
                this.resetSize();
            }
        });
        stop();
    }
    bindContextMenu() {
        this.header.onContextMenu = this.onContextMenuHeader;
        this.contentEl.onContextMenu = this.onContextMenuContent;
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
                        let isAllowed = await element.testPermissions();
                        if (!isAllowed) {
                            this.showErrorNotAllowed();
                            return;
                        }
                        const canResult = await element.can(currentState);
                        if (canResult !== true) {
                            if (canResult === false) {
                                return;
                            }
                            else {
                                this.navigate(canResult);
                            }
                            return;
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
            let state = this.navigator.getState();
            await this.page404.show(state);
            this.oldFrame = this.page404;
            this.activePath = '';
        }
    }
    error404(state) {
        return System.Frame404;
    }
    async showErrorNotAllowed() {
        let frameError = this.errorNotAllowed(this.navigator.getState());
        if (!this.page405) {
            this.page405 = new frameError();
            this.page405.application = this;
            this.contentEl.appendChild(this.page405);
        }
        if (this.oldFrame && this.oldFrame != this.page405) {
            await this.oldFrame.hide();
        }
        let state = this.navigator.getState();
        await this.page405.show(state);
        this.oldFrame = this.page405;
        this.activePath = '';
    }
    errorNotAllowed(state) {
        return System.FrameNotAllowed;
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
    init(options) {
        this.options = options;
        this.setSizeInfo(this.sizeManager.load());
    }
    postCreation() {
        this.register();
        this.addResize();
        this.addFocus();
        this.addMoveDragAndDrop();
        this.watchTransition();
        this.bindContextMenu();
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
                element.errors = ["Le champs n'est pas valide"];
                return false;
            }
            element.errors = [result];
            return false;
        }
        element.errors = [];
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
    static __style = `:host{--internal-button-background-color: var(--button-background-color);--_button-background-color-hover: var(--button-background-color-hover, var(--darker));--internal-button-color: var(--button-color);--internal-button-box-shadow: var(--button-box-shadow);--internal-button-box-shadow-hover: var(--button-box-shadow-hover);--_button-border-radius: var(--button-border-radius, var(--border-radius-sm, 5px));--_button-padding: var(--button-padding, 0 16px);--_button-icon-fill-color: var(--button-icon-fill-color, --internal-button-color);--_button-icon-stroke-color: var(--button-icon-stroke-color, transparent);--_button-background-color-disable: var(--button-background-color-disable, var(--disable-color));--_button-color-disable: var(--button-color-disable, var(--text-disable))}:host{background-color:var(--internal-button-background-color);border-radius:var(--_button-border-radius);box-shadow:var(--internal-button-box-shadow);color:var(--internal-button-color);cursor:pointer;height:36px;min-width:64px;position:relative}:host .hider{background-color:var(--_button-background-color-hover);border-radius:var(--_button-border-radius);inset:0;opacity:0;position:absolute;transition:opacity .3s var(--bezier-curve),visibility .3s var(--bezier-curve);visibility:hidden;z-index:1}:host .content{align-items:center;display:flex;height:100%;justify-content:center;padding:var(--_button-padding);position:relative;z-index:2}:host .content .icon-before,:host .content .icon-after{--img-stroke-color: var(--_button-icon-stroke-color);--img-fill-color: var(--_button-icon-fill-color);display:none;height:100%;padding:10px 0}:host([disabled]){background-color:var(--_button-background-color-disable) !important;box-shadow:none;color:var(--_button-color-disable);cursor:not-allowed}:host([disabled]) .hider{opacity:1;pointer-events:none;visibility:visible}:host([icon_before]) .icon-before{display:block;margin-right:10px}:host([icon_after]) .icon-after{display:block;margin-left:10px}:host([icon]) .icon-before{margin-right:0px}:host([outline]){background-color:rgba(0,0,0,0);border:1px solid var(--button-background-color);color:var(--text-color)}:host([color=green]){background-color:var(--green);color:var(--text-color-green)}:host([outline][color=green]){background-color:rgba(0,0,0,0);border:1px solid var(--green);color:var(--text-color)}:host([color=red]){background-color:var(--red);color:var(--text-color-red)}:host([outline][color=red]){background-color:rgba(0,0,0,0);border:1px solid var(--red);color:var(--text-color)}:host([color=orange]){background-color:var(--orange);color:var(--text-color-orange)}:host([outline][color=orange]){background-color:rgba(0,0,0,0);border:1px solid var(--orange);color:var(--text-color)}:host([color=blue]){background-color:var(--blue);color:var(--text-color-blue)}:host([outline][color=blue]){background-color:rgba(0,0,0,0);border:1px solid var(--blue);color:var(--text-color)}@media screen and (min-width: 1225px){:host(:not([disabled]):hover){box-shadow:var(--internal-button-box-shadow-hover)}:host(:not([disabled]):hover) .hider{opacity:1;visibility:visible}}`;
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


for(let key in _) { Core[key] = _[key] }
})(Core);

var Core;
(Core||(Core = {}));
(function (Core) {
const moduleName = `Core`;
const _ = {};


let _n;
const Blur = class Blur extends Aventus.WebComponent {
    static get observedAttributes() {return ["src"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'src'() { return this.getStringProp('src') }
    set 'src'(val) { this.setStringAttr('src', val) }    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("src", ((target) => {
    target.effectEl.style.backgroundImage = "url('" + target.src + "')";
})); }
    static __style = `:host{--internal-blur-size: var(--blur-size, 4px)}:host{height:100%;left:0;position:absolute;top:0;width:100%}:host .effect{background-color:rgba(255,255,255,.3);background-position:center center;background-repeat:no-repeat;background-size:cover;filter:blur(var(--internal-blur-size));height:calc(100% + var(--internal-blur-size)*4);left:calc(var(--internal-blur-size)*-2);position:absolute;top:calc(var(--internal-blur-size)*-2);width:calc(100% + var(--internal-blur-size)*4)}`;
    __getStatic() {
        return Blur;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Blur.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="effect" _id="blur_0"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "effectEl",
      "ids": [
        "blur_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "Blur";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('src')){ this['src'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('src'); }
}
Blur.Namespace=`${moduleName}`;
Blur.Tag=`rk-blur`;
_.Blur=Blur;
if(!window.customElements.get('rk-blur')){window.customElements.define('rk-blur', Blur);Aventus.WebComponentInstance.registerDefinition(Blur);}

const Login = class Login extends Aventus.WebComponent {
    static get observedAttributes() {return ["error"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'error'() { return this.getStringProp('error') }
    set 'error'(val) { this.setStringAttr('error', val) }    static __style = `:host{align-items:center;display:flex;height:100%;justify-content:center;left:0;position:absolute;top:0;width:100%}:host .login-container{background-color:rgba(25,25,25,.8);border-radius:5px;box-sizing:border-box;display:flex;flex-direction:column;padding:20px;width:372px;z-index:200;transform:perspective(1000px);box-shadow:var(--elevation-10)}:host .login-container .body{display:flex}:host .login-container .body .login-img-container{height:75px;margin-top:12.5px}:host .login-container .body .login-img-container rk-img{background-color:#818181;border-radius:50%;height:100%;padding:20px}:host .login-container .body .field-container{margin-left:13px;width:200px}:host .login-container .body .field-container input,:host .login-container .body .field-container ::slotted(input){background-color:rgba(0,0,0,0);border-radius:0;border:1px solid #fff;border-bottom:none;color:#fff;cursor:default;height:30px;outline:none;padding:5px 5px;width:100%}:host .login-container .body .field-container input[readonly],:host .login-container .body .field-container ::slotted(input[readonly]){color:#c9c9c9}:host .login-container .body .field-container input:first-child{border-top-left-radius:3px;border-top-right-radius:3px}:host .login-container .body .field-container input:last-child,:host .login-container .body .field-container ::slotted(input:last-child){border-bottom:1px solid #fff;border-bottom-left-radius:3px;border-bottom-right-radius:3px}:host .login-container .body .btn-login{background-color:gray;border:1px solid #fff;border-radius:50%;color:#fff;cursor:pointer;font-size:20px;font-weight:bold;height:30px;line-height:28px;margin-left:13px;margin-top:35px;padding:3px;text-align:center;transition:all 1s;width:30px}:host .login-container .body .btn-login-mobile{background-color:rgba(0,0,0,0);border:1px solid #fff;box-shadow:none;display:none;font-size:13px;margin-top:20px}:host .login-container .body input[type=submit]{display:none}:host .login-container .errors{color:#ff5454;display:none;font-size:13px;margin-top:20px}:host([error]:not([error=""])) .login-container{animation-duration:.25s;animation-iteration-count:2;animation-name:shake;animation-timing-function:linear;transform-origin:center center}:host([error]:not([error=""])) .login-container .errors{display:block}@keyframes shake{0%{transform:translateX(0) rotate(0deg)}25%{transform:translateX(20px) rotate(3deg)}50%{transform:translateX(0px) rotate(0deg)}75%{transform:translateX(-20px) rotate(-3deg)}100%{transform:translateX(0px) rotate(0deg)}}@media screen and (max-width: 1224px){:host .login-container{max-width:300px;width:calc(100% - 20px)}:host .login-container .body{align-items:center;flex-direction:column}:host .login-container .body .login-img-container{margin-bottom:20px;margin-top:0}:host .login-container .body .field-container{margin:0 20px;width:100%}:host .login-container .body .btn-login{display:none}:host .login-container .body .btn-login-mobile{display:inline-block}:host .login-container .errors{margin-top:20px;text-align:center}}`;
    __getStatic() {
        return Login;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Login.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<rk-blur src="/img/wp.png"></rk-blur><form class="login-container" _id="login_0">    <div class="body">        <div class="login-img-container">            <rk-img src="/img/avatar.png" mode="stretch"></rk-img>        </div>        <div class="field-container">            <input type="text" value="Cobwebsite" readonly="readonly" />            <slot></slot>            <input type="text" name="username" placeholder="Nom d'utilisateur" _id="login_1" />            <input type="password" name="password" placeholder="Mot de passe" _id="login_2" />        </div>        <rk-img class="btn-login" src="/img/icons/angle-right.svg" _id="login_3"></rk-img>        <rk-button class="btn-login-mobile" _id="login_4">Se connecter</rk-button>        <input type="submit" value="sub" _id="login_5" />    </div>    <div class="errors" _id="login_6"></div></form>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "formEl",
      "ids": [
        "login_0"
      ]
    },
    {
      "name": "usernameEl",
      "ids": [
        "login_1"
      ]
    },
    {
      "name": "passwordEl",
      "ids": [
        "login_2"
      ]
    },
    {
      "name": "submitBtn",
      "ids": [
        "login_5"
      ]
    }
  ],
  "content": {
    "login_6°@HTML": {
      "fct": (c) => `${c.print(c.comp.__16a0b4642da4b9340c7f134867b43d8dmethod0())}`,
      "once": true
    }
  },
  "events": [
    {
      "eventName": "submit",
      "id": "login_0",
      "fct": (e, c) => c.comp.loginAction(e)
    },
    {
      "eventName": "focus",
      "id": "login_1",
      "fct": (e, c) => c.comp.clearError(e)
    },
    {
      "eventName": "focus",
      "id": "login_2",
      "fct": (e, c) => c.comp.clearError(e)
    },
    {
      "eventName": "click",
      "id": "login_3",
      "fct": (e, c) => c.comp.validateForm(e)
    },
    {
      "eventName": "click",
      "id": "login_4",
      "fct": (e, c) => c.comp.validateForm(e)
    }
  ]
}); }
    getClassName() {
        return "Login";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('error')){ this['error'] = ""; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('error'); }
    loginAction(e) {
        e.preventDefault();
        e.stopPropagation();
        this.login(e);
        return false;
    }
    async login(e) {
        let body = {
            username: this.usernameEl.value,
            password: this.passwordEl.value
        };
        let formData = new FormData();
        formData.append("username", this.usernameEl.value);
        formData.append("password", this.passwordEl.value);
        const router = new Core.Routes.MainRouter();
        let result = await router.LoginAction(body);
        if (result.success) {
            window.location.pathname = "/";
        }
        else {
            for (let error of result.errors) {
                if (error instanceof Core.Errors.LoginError) {
                    if (error.code == Core.Errors.LoginCode.WrongCredentials) {
                        this.error = "Les informations fournies sont erronées";
                        console.log("Wrong credentials");
                    }
                    else {
                        this.error = error.message;
                        console.log(error);
                    }
                }
                else {
                    this.error = error.message;
                    // console.log(error);
                }
            }
        }
    }
    clearError() {
        this.formEl.style.transform = "";
        this.error = "";
    }
    validateForm() {
        this.submitBtn.click();
    }
    moving3d() {
        let XAngle = 0;
        let YAngle = 0;
        let Z = 0;
        const onMove = (e) => {
            var box = this.formEl.getBoundingClientRect();
            var XRel = e.pageX - box.left;
            var YRel = e.pageY - box.top;
            var size = box.width;
            YAngle = -(0.5 - (XRel / size)) * 10;
            XAngle = (0.5 - (YRel / size)) * 10;
            const max = 15;
            if (XAngle < max * -1)
                XAngle = max * -1;
            else if (XAngle > max)
                XAngle = max;
            if (YAngle < max * -1)
                YAngle = max * -1;
            else if (YAngle > max)
                YAngle = max;
            this.formEl.style.transform = "perspective(1000px) translateZ(" + Z + "px) rotateX(" + XAngle + "deg) rotateY(" + YAngle + "deg)";
        };
        if (Core.Lib.Platform.device == "pc") {
            this.addEventListener("mousemove", (e) => onMove(e));
        }
        else {
            new Aventus.DragAndDrop({
                element: this,
                offsetDrag: 0,
                onMove: (e) => {
                    onMove(e);
                },
                applyDrag: false
            });
        }
    }
    postCreation() {
        super.postCreation();
        this.moving3d();
        this.appendChild(this.usernameEl);
        this.appendChild(this.passwordEl);
    }
    __16a0b4642da4b9340c7f134867b43d8dmethod0() {
        return this.error;
    }
}
Login.Namespace=`${moduleName}`;
Login.Tag=`rk-login`;
_.Login=Login;
if(!window.customElements.get('rk-login')){window.customElements.define('rk-login', Login);Aventus.WebComponentInstance.registerDefinition(Login);}


for(let key in _) { Core[key] = _[key] }
})(Core);
