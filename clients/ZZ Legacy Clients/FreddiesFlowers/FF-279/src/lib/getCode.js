const getCode = () => {
    let storage = JSON.parse(localStorage.getItem('freddiesflowers') || null);
    let code;
    let codeCorrect;
    if (storage) {
        code = storage.register.details.couponCode;
        codeCorrect = typeof (code) !== 'undefined' && code != 'undefined' && code != null;
        if (codeCorrect) {
            return code;
        }
    }
    return null;
};

export default getCode;