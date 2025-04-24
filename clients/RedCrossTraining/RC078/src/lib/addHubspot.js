const addHubspot = (callback) => {
    let hubspotScript = document.createElement('script');
    hubspotScript.src = 'https://js.hsforms.net/forms/v2.js';
    document.head.appendChild(hubspotScript);
    hubspotScript.onload = function() { 
        callback();
    };
};

export default addHubspot;