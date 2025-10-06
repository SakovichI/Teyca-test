import {
  TUI_ANIMATION_OPTIONS,
  TUI_CLOSE_WORD,
  TUI_COMMON_ICONS,
  TUI_MEDIA,
  TuiButtonComponent,
  TuiButtonModule,
  TuiModeDirective,
  TuiModeModule,
  tuiIsMobile,
  tuiSlideInTop
} from "./chunk-2B3GAIHW.js";
import "./chunk-2WFSCSU5.js";
import {
  TUI_PARENT_ANIMATION,
  WINDOW,
  tuiAssert,
  tuiIsObserved
} from "./chunk-XSZEMEAF.js";
import "./chunk-ZVRBU4VF.js";
import {
  PolymorpheusModule,
  PolymorpheusOutletDirective
} from "./chunk-OCBWOXYR.js";
import "./chunk-XWRF4YCG.js";
import "./chunk-EFD2AJG6.js";
import "./chunk-3B45YLHA.js";
import "./chunk-EEZMQJEC.js";
import {
  AsyncPipe,
  CommonModule,
  NgIf
} from "./chunk-WIHG3L7R.js";
import "./chunk-YLHXK2KV.js";
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injectable,
  NgModule,
  setClassMetadata,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-LOVZGDIB.js";
import {
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-J6QDPQT4.js";
import "./chunk-ZPDA6Z6E.js";
import "./chunk-6EY7IDZ7.js";
import {
  Observable,
  ReplaySubject
} from "./chunk-DMY7NSOM.js";
import "./chunk-HSWANC32.js";
import "./chunk-46DXP6YY.js";

// node_modules/@taiga-ui/addon-tablebars/fesm2015/taiga-ui-addon-tablebars.js
function TuiTableBarsHostComponent_div_0_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const text_r1 = ctx.polymorpheusOutlet;
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", text_r1, " ");
  }
}
function TuiTableBarsHostComponent_div_0_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 8);
    ɵɵpipe(1, "async");
    ɵɵlistener("click", function TuiTableBarsHostComponent_div_0_button_6_Template_button_click_0_listener() {
      ɵɵrestoreView(_r2);
      const item_r3 = ɵɵnextContext().ngIf;
      const ctx_r3 = ɵɵnextContext();
      return ɵɵresetView(ctx_r3.onCloseClick(item_r3));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r3 = ɵɵnextContext().ngIf;
    const ctx_r3 = ɵɵnextContext();
    ɵɵproperty("icon", ctx_r3.icons.close)("title", ɵɵpipeBind1(1, 3, ctx_r3.closeWord$))("tuiMode", ctx_r3.getMode(item_r3.mode));
  }
}
function TuiTableBarsHostComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5);
    ɵɵtemplate(5, TuiTableBarsHostComponent_div_0_ng_container_5_Template, 2, 1, "ng-container", 6);
    ɵɵelementEnd();
    ɵɵtemplate(6, TuiTableBarsHostComponent_div_0_button_6_Template, 2, 5, "button", 7);
    ɵɵelementEnd()()()();
  }
  if (rf & 2) {
    const item_r3 = ctx.ngIf;
    const ctx_r3 = ɵɵnextContext();
    ɵɵproperty("@tuiParentAnimation", void 0);
    ɵɵadvance();
    ɵɵclassProp("t-bar_light", item_r3.mode === "onDark");
    ɵɵproperty("@tuiSlideInTop", ctx_r3.animation);
    ɵɵadvance();
    ɵɵclassProp("t-container_adaptive", item_r3.adaptive);
    ɵɵadvance(3);
    ɵɵproperty("polymorpheusOutlet", item_r3.content)("polymorpheusOutletContext", ctx_r3.getItemContext(item_r3));
    ɵɵadvance();
    ɵɵproperty("ngIf", item_r3.hasCloseButton);
  }
}
var TuiTableBar = class {
  constructor(observer, content, options = {}) {
    this.observer = observer;
    this.content = content;
    const {
      mode = "onLight",
      hasCloseButton = false,
      adaptive = false
    } = options;
    this.mode = mode;
    this.hasCloseButton = hasCloseButton;
    this.adaptive = adaptive;
  }
  close() {
    this.observer.complete();
  }
};
var NO_HOST = "Table bars are disabled, enable support by adding TuiTableBarsHostModule to your main app module and tui-table-bars-host component to app template";
var TuiTableBarsService = class {
  constructor() {
    this.bar$ = new ReplaySubject(1);
  }
  open(content, options) {
    return new Observable((observer) => {
      ngDevMode && tuiAssert.assert(tuiIsObserved(this.bar$), NO_HOST);
      const tableBar = new TuiTableBar(observer, content, options);
      this.bar$.next(tableBar);
      return () => {
        this.bar$.next(null);
      };
    });
  }
};
TuiTableBarsService.ɵfac = function TuiTableBarsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TuiTableBarsService)();
};
TuiTableBarsService.ɵprov = ɵɵdefineInjectable({
  token: TuiTableBarsService,
  factory: TuiTableBarsService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiTableBarsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var TuiTableBarsHostComponent = class {
  constructor(service, closeWord$, icons, animation, media, win) {
    this.service = service;
    this.closeWord$ = closeWord$;
    this.icons = icons;
    this.animation = animation;
    this.media = media;
    this.win = win;
  }
  get isMobile() {
    return tuiIsMobile(this.win, this.media);
  }
  getMode(mode) {
    return mode === "onLight" ? "onDark" : null;
  }
  onCloseClick(itemToRemove) {
    itemToRemove.close();
  }
  getItemContext(item) {
    return {
      $implicit: () => item.close()
    };
  }
};
TuiTableBarsHostComponent.ɵfac = function TuiTableBarsHostComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TuiTableBarsHostComponent)(ɵɵdirectiveInject(TuiTableBarsService), ɵɵdirectiveInject(TUI_CLOSE_WORD), ɵɵdirectiveInject(TUI_COMMON_ICONS), ɵɵdirectiveInject(TUI_ANIMATION_OPTIONS), ɵɵdirectiveInject(TUI_MEDIA), ɵɵdirectiveInject(WINDOW));
};
TuiTableBarsHostComponent.ɵcmp = ɵɵdefineComponent({
  type: TuiTableBarsHostComponent,
  selectors: [["tui-table-bars-host"]],
  standalone: false,
  decls: 2,
  vars: 3,
  consts: [["class", "t-wrapper", 4, "ngIf"], [1, "t-wrapper"], ["automation-id", "tui-table-bar__bar", 1, "t-bar"], [1, "t-container"], [1, "t-inner"], [1, "t-content"], [4, "polymorpheusOutlet", "polymorpheusOutletContext"], ["appearance", "icon", "automation-id", "tui-table-bar__close-button", "size", "xs", "tuiIconButton", "", "type", "button", "class", "t-close-button", 3, "icon", "title", "tuiMode", "click", 4, "ngIf"], ["appearance", "icon", "automation-id", "tui-table-bar__close-button", "size", "xs", "tuiIconButton", "", "type", "button", 1, "t-close-button", 3, "click", "icon", "title", "tuiMode"]],
  template: function TuiTableBarsHostComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, TuiTableBarsHostComponent_div_0_Template, 7, 9, "div", 0);
      ɵɵpipe(1, "async");
    }
    if (rf & 2) {
      ɵɵproperty("ngIf", ɵɵpipeBind1(1, 1, ctx.service.bar$));
    }
  },
  dependencies: [TuiButtonComponent, NgIf, PolymorpheusOutletDirective, TuiModeDirective, AsyncPipe],
  styles: ["[_nghost-%COMP%]{position:fixed;bottom:0;left:0;display:flex;align-items:flex-end;width:100%;height:0}.t-wrapper[_ngcontent-%COMP%]{display:flex;width:100%}.t-bar[_ngcontent-%COMP%]{box-shadow:var(--tui-shadow);flex:0 0 100%;background:var(--tui-base-07);color:var(--tui-base-01)}.t-bar_light[_ngcontent-%COMP%]{background:var(--tui-base-01);color:var(--tui-text-01)}.t-container[_ngcontent-%COMP%]{position:relative;margin:0 auto}@media screen and (min-width: 80em){.t-container.t-container_adaptive[_ngcontent-%COMP%]{width:69rem}}@media screen and (max-width: 79.9625em){.t-container.t-container_adaptive[_ngcontent-%COMP%]{width:51.5rem}}@media screen and (max-width: 47.9625em){.t-container.t-container_adaptive[_ngcontent-%COMP%]{width:100%;padding:0 1rem;box-sizing:border-box}}@media screen and (min-width: 80em){.t-container[_ngcontent-%COMP%]{width:69rem}}@media screen and (max-width: 79.9625em){.t-container[_ngcontent-%COMP%]{width:51.5rem;padding:0 3rem}}.t-inner[_ngcontent-%COMP%]{display:flex;align-items:center;height:4.5rem;width:100%;overflow:hidden}tui-root._mobile[_nghost-%COMP%]   .t-inner[_ngcontent-%COMP%], tui-root._mobile   [_nghost-%COMP%]   .t-inner[_ngcontent-%COMP%]{height:5.75rem}.t-close-button[_ngcontent-%COMP%]{margin-left:1.5rem}.t-content[_ngcontent-%COMP%]{width:100%;flex:1 1 0}"],
  data: {
    animation: [tuiSlideInTop, TUI_PARENT_ANIMATION]
  },
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiTableBarsHostComponent, [{
    type: Component,
    args: [{
      selector: "tui-table-bars-host",
      templateUrl: "./table-bars-host.template.html",
      styleUrls: ["./table-bars-host.style.less"],
      changeDetection: ChangeDetectionStrategy.OnPush,
      animations: [tuiSlideInTop, TUI_PARENT_ANIMATION]
    }]
  }], function() {
    return [{
      type: TuiTableBarsService,
      decorators: [{
        type: Inject,
        args: [TuiTableBarsService]
      }]
    }, {
      type: Observable,
      decorators: [{
        type: Inject,
        args: [TUI_CLOSE_WORD]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [TUI_COMMON_ICONS]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [TUI_ANIMATION_OPTIONS]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [TUI_MEDIA]
      }]
    }, {
      type: Window,
      decorators: [{
        type: Inject,
        args: [WINDOW]
      }]
    }];
  }, null);
})();
var TuiTableBarsHostModule = class {
};
TuiTableBarsHostModule.ɵfac = function TuiTableBarsHostModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TuiTableBarsHostModule)();
};
TuiTableBarsHostModule.ɵmod = ɵɵdefineNgModule({
  type: TuiTableBarsHostModule,
  declarations: [TuiTableBarsHostComponent],
  imports: [CommonModule, PolymorpheusModule, TuiModeModule, TuiButtonModule],
  exports: [TuiTableBarsHostComponent]
});
TuiTableBarsHostModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, PolymorpheusModule, TuiModeModule, TuiButtonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiTableBarsHostModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, PolymorpheusModule, TuiModeModule, TuiButtonModule],
      declarations: [TuiTableBarsHostComponent],
      exports: [TuiTableBarsHostComponent]
    }]
  }], null, null);
})();
export {
  TuiTableBar,
  TuiTableBarsHostComponent,
  TuiTableBarsHostModule,
  TuiTableBarsService
};
//# sourceMappingURL=@taiga-ui_addon-tablebars.js.map
