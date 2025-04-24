

const loadScript = (url, callback) => {

    let scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.async = false;
    if (callback) {
        scriptTag.onload = callback;
    }
    document.body.appendChild(scriptTag);
};

const loadScripts = (callback) => {
    const scripts = [
        {
            url: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js',
        },
        {
            url: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js',
        },
    ];
    scripts.forEach((script) => {
        loadScript(script.url, script?.callback);
    });
    if (callback) {
        callback();
    }
};

export default loadScripts;