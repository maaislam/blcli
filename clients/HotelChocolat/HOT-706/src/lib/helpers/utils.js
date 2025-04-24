export const observeDOM = (targetSelectorString, callbackFunction, configObject) => {
    const target = targetSelectorString;

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
            observer.disconnect();

            if (mutation.target.classList.contains('select-address') && mutation.type === 'childList') {
                callbackFunction(mutation);
            }

            observer.observe(target, config);
        });
    });
    observer.observe(target, config);
};

// Load initial state from session storage (optional, for page reloads)
export const loadInitialState = () => {
    // Retrieve session data and parse it
    const sessionData = JSON.parse(sessionStorage.getItem('selectedAddresses'));

    // Return early if sessionData is null or an empty object
    if (!sessionData || Object.keys(sessionData).length === 0) {
        return;
    }

    // Iterate through sessionData and set the radio button states
    for (const [name, type] of Object.entries(sessionData)) {
        const radio = document.querySelector(`input[name="${name}"][data-type="${type}"]`);
        if (radio) radio.checked = true;
    }
}

// Function to set up initial addresses from session storage
export const setupInitialAddresses = (ID) => {
    // Retrieve session data and parse it
    const sessionData = JSON.parse(sessionStorage.getItem('selectedAddresses'));

    // Return early if sessionData is null or an empty object
    if (!sessionData || Object.keys(sessionData).length === 0) {
        return;
    }

    // Iterate through sessionData and set the address states
    for (const [name, { type, address, selectedValue }] of Object.entries(sessionData)) {
        const [key, index] = name.split('-'); // Extract name and index from the key
        if (!key.startsWith('billingAddress') && !key.startsWith('giftAddress')) continue;

        const container = document.querySelector(`.${ID}__billingContainer[data-index="${index}"]`);
        if (!container) continue;

        const addressOption = container.querySelector(`.${ID}__address-option[data-option="${type}"]`);
        const radio = addressOption.querySelector(`.${ID}__radio[data-type="${type}"]`);
        const formattedAddressElem = addressOption.querySelector(`.${ID}__formattedAddress`);


        if (addressOption) {
            if (formattedAddressElem) formattedAddressElem.innerHTML = address;
        }

        //update control's dropdown address field
        if (radio.checked) {
            const closestTab = radio.closest('.checkout-tab');
            const controlSelectElem = closestTab.querySelector('.shiptoaddress-block .select-address');
            controlSelectElem.value = selectedValue;
            controlSelectElem.dispatchEvent(new Event('change'));
        }
    }
}