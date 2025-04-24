/**
 * Throws an error if GTag is not loaded on the page. Used in GA4 reporting
 */
const throwIfNoGtag = () => {
    if (!window.dataLayer.find(elem => elem.event == 'defaultPageView')){
        throw new Error('Gtag is not loaded yet')
    }
}

/**
 * Sends an event to GA4 - Ideally use the global reporting object
 * @param {Array} testNames an array of all tests loaded onto the page
 */
const experienceID = (testNames) => {

    try {
        // throwIfNoGtag();
        const event = {
            event: 'experienceId',
            experience: `[${testNames.join('][')}]`
        };
        window.dataLayer.push(event);
    } catch (error) {
        setTimeout(() => experienceID(testNames), 10);
    }

};

/**
 * Sends a load event to GA4 - Ideally use the global reporting object
 * @param {string} testName The name of the test
 */
const testLoad = (testName) => {

    try {
        throwIfNoGtag();
        const event = {
            event: 'experience_load',
            experience: testName
        };
        window.dataLayer.push(event);
    } catch (error) {
        setTimeout(() => testLoad(testName), 200);
    }

};

/**
 * Sends a render event to GA4 - Ideally use the global reporting object
 * @param {string} testName The name of the test
 * @param {string} renderedElement The name of the rendered element
 * @param {string} renderDetail Any additional detail
 */
const testRender = (testName, renderedElement, renderDetail = '') => {

    try {
        throwIfNoGtag();
        const event = {
            event: 'experience_render',
            experience: testName,
            rendered_element: renderedElement,
            render_detail: renderDetail
        };
        window.dataLayer.push(event);
    } catch (error) {
        setTimeout(() => testRender(testName, renderedElement, renderDetail), 200);
    }

};

/**
 * Sends an action event to GA4 - Ideally use the global reporting object
 * @param {string} testName The name of the test
 * @param {string} action The action performed
 * @param {string} actionDetail Any additional detail
 */
const testAction = (testName, action, actionDetail = '') => {

    try {
        throwIfNoGtag();
        const event = {
            event: 'experience_action',
            experience: testName,
            action: action,
            action_detail: actionDetail
        };
        window.dataLayer.push(event);
        // console.log(testName, event);
    } catch (error) {
        setTimeout(() => testAction(testName, action, actionDetail), 200);
    }

};

export {
    experienceID,
    testLoad,
    testRender,
    testAction
};