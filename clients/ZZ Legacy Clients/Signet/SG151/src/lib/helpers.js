/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {

    return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

export const getClientID = () => {
    let clientID;

    if (getSiteFromHostname() === 'ernestjones') {
        clientID = 'EJ151';
    } else {
        clientID = 'HS151';
    }

    return clientID;
}

/**
 * 
 * @returns key with the highest value in object
 */
const getMax = object => {
    return Object.keys(object).filter(x => {
        return object[x] == Math.max.apply(null,
            Object.values(object));
    });
};

/**
 * 
 * @returns Most viewed category
 */
export const mostViewedCategory = () => {

    let clientID;

    if (getSiteFromHostname() === 'ernestjones') {
        clientID = 'EJ151';
    } else {
        clientID = 'HS151';
    }

    const storageObj = localStorage.getItem(`${clientID}-groupings`);

    if (storageObj) {
        const parseData = JSON.parse(storageObj);
        const maxValue = getMax(parseData);

        if (maxValue[0]) {
            return maxValue[0];
        }
    }
}


const removeAllStorage = () => {
    localStorage.removeItem(`${getClientID()}-time`);
    localStorage.removeItem(`${getClientID()}-grouping`);
    localStorage.removeItem(`${getClientID()}-time`)

    if (getSiteFromHostname() === 'ernestjones') {
        localStorage.removeItem('EJbrand151');
    } else {
        localStorage.removeItem('HSbrand151');
    }
}


/**
 * Removes storage if certain conditions are met
 */
export const removeStorage = () => {

    const categoriesNotIncluded = ['personalised', 'gifts', 'gift', 'cufflinks', 'tie clip', 'pens', 'pen', 'charm'];
    for (var i = 0; i < categoriesNotIncluded.length; i += 1) {
        if (window.location.href.indexOf(categoriesNotIncluded[i]) > -1) {
            removeAllStorage();
        }
    }
    // if success page

    // if not come back in 10 days
    if (localStorage.getItem(`${getClientID()}-time`)) {
        const now = (new Date()).getTime();
        const time = parseInt(localStorage.getItem(`${getClientID()}-time`));

        if (now - time > 864000000) {
            removeAllStorage(); // it's been more than 10 days
        }
    }
}