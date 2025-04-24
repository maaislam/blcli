/**
 * Executes a callback function when the window has loaded.
 *
 * @param {Function} callback Function called when window loaded.
 */

const onWinLoad = (callback) => {
    if (typeof callback != 'function') {
        throw "onWinload expects a function callback";
    }
    if (document.readyState === 'complete') {
        callback();
    } else {
        window.addEventListener('load', (event) => {
            callback();
        });
    }
};

export default onWinLoad;