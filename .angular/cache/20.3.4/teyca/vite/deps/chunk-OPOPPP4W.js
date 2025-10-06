import {
  EVENT_MANAGER_PLUGINS
} from "./chunk-EEZMQJEC.js";
import {
  Inject,
  Injectable,
  NgModule,
  setClassMetadata,
  ɵɵdefineNgModule,
  ɵɵgetInheritedFactory
} from "./chunk-LOVZGDIB.js";
import {
  DOCUMENT,
  InjectionToken,
  inject,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵinject
} from "./chunk-J6QDPQT4.js";
import {
  defer
} from "./chunk-ZPDA6Z6E.js";
import {
  EMPTY,
  concat,
  takeWhile
} from "./chunk-DMY7NSOM.js";

// node_modules/@tinkoff/ng-event-plugins/fesm2015/tinkoff-ng-event-plugins.js
function dasharize(camel) {
  return camel.replace(/[a-z][A-Z]/g, (letterLetter) => {
    return `${letterLetter[0]}-${letterLetter[1].toLowerCase()}`;
  });
}
var AbstractEventPlugin = class {
  supports(event) {
    return event.includes(this.modifier);
  }
  /** This is not used in Ivy anymore */
  addGlobalEventListener() {
    return () => {
    };
  }
  unwrap(event) {
    return event.split(".").filter((v) => !this.modifier.includes(v)).join(".");
  }
};
var BindEventPlugin = class extends AbstractEventPlugin {
  constructor() {
    super(...arguments);
    this.modifier = "$";
  }
  addEventListener(element, event) {
    element[event] = element[event] || EMPTY;
    const method = this.getMethod(element, event);
    const zone$ = this.manager.getZone().onStable;
    const sub = concat(zone$.pipe(takeWhile(() => element[event] === EMPTY)), defer(() => element[event])).subscribe(method);
    return () => sub.unsubscribe();
  }
  getMethod(element, event) {
    const [, key, value, unit = ""] = event.split(".");
    if (event.endsWith(".attr")) {
      return (v) => v === null ? element.removeAttribute(key) : element.setAttribute(key, String(v));
    }
    if (key === "class") {
      return (v) => element.classList.toggle(value, !!v);
    }
    if (key === "style") {
      return (v) => element.style.setProperty(dasharize(value), `${v}${unit}`);
    }
    return (v) => element[key] = v;
  }
};
BindEventPlugin.ɵfac = /* @__PURE__ */ (() => {
  let ɵBindEventPlugin_BaseFactory;
  return function BindEventPlugin_Factory(__ngFactoryType__) {
    return (ɵBindEventPlugin_BaseFactory || (ɵBindEventPlugin_BaseFactory = ɵɵgetInheritedFactory(BindEventPlugin)))(__ngFactoryType__ || BindEventPlugin);
  };
})();
BindEventPlugin.ɵprov = ɵɵdefineInjectable({
  token: BindEventPlugin,
  factory: BindEventPlugin.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BindEventPlugin, [{
    type: Injectable
  }], null, null);
})();
var GLOBAL_HANDLER = new InjectionToken("[GLOBAL_HANDLER]: Global event target handler", {
  factory: () => {
    const document = inject(DOCUMENT);
    return (name) => name === "body" ? document.body : document.defaultView[name] || document.createElement("div");
  }
});
var GlobalEventPlugin = class extends AbstractEventPlugin {
  constructor() {
    super(...arguments);
    this.handler = inject(GLOBAL_HANDLER);
    this.modifier = ">";
  }
  addEventListener(_, event, handler) {
    return this.manager.addEventListener(this.handler(event.split(">")[0]), event.split(">")[1], handler);
  }
};
GlobalEventPlugin.ɵfac = /* @__PURE__ */ (() => {
  let ɵGlobalEventPlugin_BaseFactory;
  return function GlobalEventPlugin_Factory(__ngFactoryType__) {
    return (ɵGlobalEventPlugin_BaseFactory || (ɵGlobalEventPlugin_BaseFactory = ɵɵgetInheritedFactory(GlobalEventPlugin)))(__ngFactoryType__ || GlobalEventPlugin);
  };
})();
GlobalEventPlugin.ɵprov = ɵɵdefineInjectable({
  token: GlobalEventPlugin,
  factory: GlobalEventPlugin.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GlobalEventPlugin, [{
    type: Injectable
  }], null, null);
})();
var OptionsEventPlugin = class extends AbstractEventPlugin {
  constructor() {
    super(...arguments);
    this.modifier = "capture.once.passive";
  }
  supports(event) {
    return event.includes(".") && !this.unwrap(event).includes(".");
  }
  addEventListener(element, event, handler) {
    element.addEventListener(this.unwrap(event), handler, {
      once: event.includes(".once"),
      passive: event.includes(".passive"),
      capture: event.includes(".capture")
    });
    return () => element.removeEventListener(this.unwrap(event), handler, event.includes(".capture"));
  }
};
OptionsEventPlugin.ɵfac = /* @__PURE__ */ (() => {
  let ɵOptionsEventPlugin_BaseFactory;
  return function OptionsEventPlugin_Factory(__ngFactoryType__) {
    return (ɵOptionsEventPlugin_BaseFactory || (ɵOptionsEventPlugin_BaseFactory = ɵɵgetInheritedFactory(OptionsEventPlugin)))(__ngFactoryType__ || OptionsEventPlugin);
  };
})();
OptionsEventPlugin.ɵprov = ɵɵdefineInjectable({
  token: OptionsEventPlugin,
  factory: OptionsEventPlugin.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OptionsEventPlugin, [{
    type: Injectable
  }], null, null);
})();
var PreventEventPlugin = class extends AbstractEventPlugin {
  constructor() {
    super(...arguments);
    this.modifier = ".prevent";
  }
  addEventListener(element, event, handler) {
    const wrapped = (event2) => {
      event2.preventDefault();
      handler(event2);
    };
    return this.manager.addEventListener(element, this.unwrap(event), wrapped);
  }
};
PreventEventPlugin.ɵfac = /* @__PURE__ */ (() => {
  let ɵPreventEventPlugin_BaseFactory;
  return function PreventEventPlugin_Factory(__ngFactoryType__) {
    return (ɵPreventEventPlugin_BaseFactory || (ɵPreventEventPlugin_BaseFactory = ɵɵgetInheritedFactory(PreventEventPlugin)))(__ngFactoryType__ || PreventEventPlugin);
  };
})();
PreventEventPlugin.ɵprov = ɵɵdefineInjectable({
  token: PreventEventPlugin,
  factory: PreventEventPlugin.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PreventEventPlugin, [{
    type: Injectable
  }], null, null);
})();
var SelfEventPlugin = class extends AbstractEventPlugin {
  constructor() {
    super(...arguments);
    this.modifier = ".self";
  }
  addEventListener(element, event, handler) {
    const wrapped = (event2) => {
      if (event2.target === event2.currentTarget) {
        handler(event2);
      }
    };
    return this.manager.addEventListener(element, this.unwrap(event), wrapped);
  }
};
SelfEventPlugin.ɵfac = /* @__PURE__ */ (() => {
  let ɵSelfEventPlugin_BaseFactory;
  return function SelfEventPlugin_Factory(__ngFactoryType__) {
    return (ɵSelfEventPlugin_BaseFactory || (ɵSelfEventPlugin_BaseFactory = ɵɵgetInheritedFactory(SelfEventPlugin)))(__ngFactoryType__ || SelfEventPlugin);
  };
})();
SelfEventPlugin.ɵprov = ɵɵdefineInjectable({
  token: SelfEventPlugin,
  factory: SelfEventPlugin.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelfEventPlugin, [{
    type: Injectable
  }], null, null);
})();
var SilentEventPlugin = class _SilentEventPlugin extends AbstractEventPlugin {
  constructor() {
    super(...arguments);
    this.modifier = ".silent";
  }
  addEventListener(element, event, handler) {
    _SilentEventPlugin.ngZone = this.manager.getZone();
    return _SilentEventPlugin.ngZone.runOutsideAngular(() => this.manager.addEventListener(element, this.unwrap(event), handler));
  }
};
SilentEventPlugin.ɵfac = /* @__PURE__ */ (() => {
  let ɵSilentEventPlugin_BaseFactory;
  return function SilentEventPlugin_Factory(__ngFactoryType__) {
    return (ɵSilentEventPlugin_BaseFactory || (ɵSilentEventPlugin_BaseFactory = ɵɵgetInheritedFactory(SilentEventPlugin)))(__ngFactoryType__ || SilentEventPlugin);
  };
})();
SilentEventPlugin.ɵprov = ɵɵdefineInjectable({
  token: SilentEventPlugin,
  factory: SilentEventPlugin.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SilentEventPlugin, [{
    type: Injectable
  }], null, null);
})();
var StopEventPlugin = class extends AbstractEventPlugin {
  constructor() {
    super(...arguments);
    this.modifier = ".stop";
  }
  addEventListener(element, event, handler) {
    const wrapped = (event2) => {
      event2.stopPropagation();
      handler(event2);
    };
    return this.manager.addEventListener(element, this.unwrap(event), wrapped);
  }
};
StopEventPlugin.ɵfac = /* @__PURE__ */ (() => {
  let ɵStopEventPlugin_BaseFactory;
  return function StopEventPlugin_Factory(__ngFactoryType__) {
    return (ɵStopEventPlugin_BaseFactory || (ɵStopEventPlugin_BaseFactory = ɵɵgetInheritedFactory(StopEventPlugin)))(__ngFactoryType__ || StopEventPlugin);
  };
})();
StopEventPlugin.ɵprov = ɵɵdefineInjectable({
  token: StopEventPlugin,
  factory: StopEventPlugin.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StopEventPlugin, [{
    type: Injectable
  }], null, null);
})();
var ZoneEventPlugin = class extends AbstractEventPlugin {
  constructor() {
    super(...arguments);
    this.modifier = ".init";
  }
  addEventListener() {
    console.warn(".init plugin is no longer necessary as of v3.1.0");
    return () => {
    };
  }
};
ZoneEventPlugin.ɵfac = /* @__PURE__ */ (() => {
  let ɵZoneEventPlugin_BaseFactory;
  return function ZoneEventPlugin_Factory(__ngFactoryType__) {
    return (ɵZoneEventPlugin_BaseFactory || (ɵZoneEventPlugin_BaseFactory = ɵɵgetInheritedFactory(ZoneEventPlugin)))(__ngFactoryType__ || ZoneEventPlugin);
  };
})();
ZoneEventPlugin.ɵprov = ɵɵdefineInjectable({
  token: ZoneEventPlugin,
  factory: ZoneEventPlugin.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ZoneEventPlugin, [{
    type: Injectable
  }], null, null);
})();
var PLUGINS = [SilentEventPlugin, BindEventPlugin, GlobalEventPlugin, OptionsEventPlugin, PreventEventPlugin, SelfEventPlugin, StopEventPlugin, ZoneEventPlugin];
var NG_EVENT_PLUGINS = PLUGINS.map((useClass) => ({
  provide: EVENT_MANAGER_PLUGINS,
  multi: true,
  useClass
}));
function shouldCall(predicate) {
  return (_target, _key, desc) => {
    const {
      value
    } = desc;
    desc.value = function(...args) {
      if (!predicate.apply(this, args)) {
        return;
      }
      if (SilentEventPlugin.ngZone) {
        SilentEventPlugin.ngZone.run(() => value.apply(this, args));
      } else {
        value.apply(this, args);
      }
    };
  };
}
function asCallable(a) {
  return a;
}
var EventPluginsModule = class _EventPluginsModule {
  constructor([plugin]) {
    console.assert(!(plugin instanceof SilentEventPlugin) || _EventPluginsModule.initialized, "EventPluginsModule must come after BrowserModule in imports");
    _EventPluginsModule.initialized = true;
  }
};
EventPluginsModule.initialized = false;
EventPluginsModule.ɵfac = function EventPluginsModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || EventPluginsModule)(ɵɵinject(EVENT_MANAGER_PLUGINS));
};
EventPluginsModule.ɵmod = ɵɵdefineNgModule({
  type: EventPluginsModule
});
EventPluginsModule.ɵinj = ɵɵdefineInjector({
  providers: NG_EVENT_PLUGINS
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EventPluginsModule, [{
    type: NgModule,
    args: [{
      providers: NG_EVENT_PLUGINS
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [EVENT_MANAGER_PLUGINS]
      }]
    }];
  }, null);
})();

export {
  BindEventPlugin,
  GLOBAL_HANDLER,
  GlobalEventPlugin,
  OptionsEventPlugin,
  PreventEventPlugin,
  SilentEventPlugin,
  StopEventPlugin,
  ZoneEventPlugin,
  NG_EVENT_PLUGINS,
  shouldCall,
  asCallable,
  EventPluginsModule
};
//# sourceMappingURL=chunk-OPOPPP4W.js.map
