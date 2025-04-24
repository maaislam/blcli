// This code can be ignored
// This module is only used on localhost:3000, to listen for gtmDataLayer.push() events
// It immulates how Optimize 360 triggers AB tests in PROD ENV
function gtmCalendarOpenedEvent(callbackToFireABTest) {
    const originalPush = gtmDataLayer.push
    const dataLayerListeners = [];

    gtmDataLayer.push = function(...args) {
        dataLayerListeners.forEach(listener => listener.notify(args))
        originalPush(...args);
    };

    class DatalayerListener {
        constructor(name) {
            this.name = name;
        }
        notify(args) {
            if (args[0].event === "calendar_opened") {
                callbackToFireABTest();
            };
        };
    };
    const listener = new DatalayerListener('listener');
    dataLayerListeners.push(listener);
};

module.exports  = {
    gtmCalendarOpenedEvent
};
