System.Os = class Os extends System.RayukiComponent {
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
    contextMenuCst = ContextMenu;
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
this.desktopMoveLeft=this.desktopMoveLeft.bind(this)this.desktopMoveRight=this.desktopMoveRight.bind(this)this.desktopMoveValidate=this.desktopMoveValidate.bind(this) }
    __getStatic() {
        return Os;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Os.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
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
                if (this.desktops[i].id == el.id) {
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
        this.contextMenuCst = ContextMenu;
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
        const a = new Alert();
        a.subject = title;
        a.body = message;
        if (okBtnTxt) {
            a.btn_txt = okBtnTxt;
        }
        await this.popup(a);
    }
    async confirm(title, message, yesBtnTxt, noBtnTxt) {
        const c = new Confirm();
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
        return desktop.id;
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

