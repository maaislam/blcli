export const observeDOM = (targetSelectorString, callbackFunction, configObject) => {
    const target = document.querySelector(`${targetSelectorString}`);

    if (!target) return;
    //configuration of the observer:

    const config = configObject || {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
        characterDataOldValue: true
    };
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            //console.log(mutation);
            observer.disconnect();

            callbackFunction(mutation);
            observer.observe(target, config);
        });
    });

    observer.observe(target, config);
};