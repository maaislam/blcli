import getCode from './getCode';

const checkForValidCode = (callback) => {
    let code = getCode();
    if (code) {
        callback(code);
    } else {
        requestAnimationFrame(checkForValidCode);
    }
};

export default checkForValidCode;