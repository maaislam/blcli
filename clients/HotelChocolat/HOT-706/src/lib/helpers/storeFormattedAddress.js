const storeFormattedAddress = (key, name, index, type, address, selectedValue) => {
    // Retrieve session data and parse it
    const sessionData = JSON.parse(sessionStorage.getItem(key)) || {};

    // Update the session data with index-specific keys
    sessionData[`${name}-${index}`] = { type, address, selectedValue };

    // Save the updated data back to session storage
    sessionStorage.setItem(key, JSON.stringify(sessionData));
};
export default storeFormattedAddress;