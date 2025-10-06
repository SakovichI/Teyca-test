import {
  DOCUMENT,
  InjectionToken,
  inject
} from "./chunk-J6QDPQT4.js";
import {
  fromEvent
} from "./chunk-ZPDA6Z6E.js";
import {
  Observable,
  distinctUntilChanged,
  map,
  share,
  shareReplay,
  startWith
} from "./chunk-DMY7NSOM.js";

// node_modules/@ng-web-apis/common/fesm2015/ng-web-apis-common.js
var WINDOW = new InjectionToken("An abstraction over global window object", {
  factory: () => {
    const { defaultView } = inject(DOCUMENT);
    if (!defaultView) {
      throw new Error("Window is not available");
    }
    return defaultView;
  }
});
var ANIMATION_FRAME = new InjectionToken("Shared Observable based on `window.requestAnimationFrame`", {
  factory: () => {
    const { requestAnimationFrame, cancelAnimationFrame } = inject(WINDOW);
    const animationFrame$ = new Observable((subscriber) => {
      let id = NaN;
      const callback = (timestamp) => {
        subscriber.next(timestamp);
        id = requestAnimationFrame(callback);
      };
      id = requestAnimationFrame(callback);
      return () => {
        cancelAnimationFrame(id);
      };
    });
    return animationFrame$.pipe(share());
  }
});
var CACHES = new InjectionToken("An abstraction over window.caches object", {
  factory: () => inject(WINDOW).caches
});
var CRYPTO = new InjectionToken("An abstraction over window.crypto object", {
  factory: () => inject(WINDOW).crypto
});
var CSS = new InjectionToken("An abstraction over window.CSS object", {
  factory: () => inject(WINDOW).CSS || {
    escape: (v) => v,
    supports: () => false
  }
});
var HISTORY = new InjectionToken("An abstraction over window.history object", {
  factory: () => inject(WINDOW).history
});
var LOCAL_STORAGE = new InjectionToken("An abstraction over window.localStorage object", {
  factory: () => inject(WINDOW).localStorage
});
var LOCATION = new InjectionToken("An abstraction over window.location object", {
  factory: () => inject(WINDOW).location
});
var NAVIGATOR = new InjectionToken("An abstraction over window.navigator object", {
  factory: () => inject(WINDOW).navigator
});
var MEDIA_DEVICES = new InjectionToken("An abstraction over window.navigator.mediaDevices object", {
  factory: () => inject(NAVIGATOR).mediaDevices
});
var NETWORK_INFORMATION = new InjectionToken("An abstraction over window.navigator.connection object", {
  // @ts-ignore
  factory: () => inject(NAVIGATOR).connection || null
});
var PAGE_VISIBILITY = new InjectionToken("Shared Observable based on `document visibility changed`", {
  factory: () => {
    const documentRef = inject(DOCUMENT);
    return fromEvent(documentRef, "visibilitychange").pipe(startWith(0), map(() => documentRef.visibilityState !== "hidden"), distinctUntilChanged(), shareReplay({ refCount: false, bufferSize: 1 }));
  }
});
var PERFORMANCE = new InjectionToken("An abstraction over window.performance object", {
  factory: () => inject(WINDOW).performance
});
var SCREEN = new InjectionToken("An abstraction over window.screen object", {
  factory: () => inject(WINDOW).screen
});
var SESSION_STORAGE = new InjectionToken("An abstraction over window.sessionStorage object", {
  factory: () => inject(WINDOW).sessionStorage
});
var SPEECH_RECOGNITION = new InjectionToken("An abstraction over SpeechRecognition class", {
  factory: () => {
    const windowRef = inject(WINDOW);
    return windowRef.speechRecognition || windowRef.webkitSpeechRecognition || null;
  }
});
var SPEECH_SYNTHESIS = new InjectionToken("An abstraction over window.speechSynthesis object", {
  factory: () => inject(WINDOW).speechSynthesis
});
var USER_AGENT = new InjectionToken("An abstraction over window.navigator.userAgent object", {
  factory: () => inject(NAVIGATOR).userAgent
});

export {
  WINDOW,
  ANIMATION_FRAME,
  CSS,
  HISTORY,
  LOCAL_STORAGE,
  NAVIGATOR,
  PAGE_VISIBILITY,
  PERFORMANCE,
  USER_AGENT
};
//# sourceMappingURL=chunk-XSI3Z367.js.map
