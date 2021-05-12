if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
    console.log('init');
    const runtime = require("react-refresh/runtime");
    runtime.injectIntoGlobalHook(window);
    window.$RefreshReg$ = (type, id) => {};
    window.$RefreshSig$ = () => type => type;
    require('./App')
}
