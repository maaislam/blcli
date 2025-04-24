export const addCssToPage = (href, id, classes) => {
    if (document.querySelector(`#${id}`)) {
        return;
    }

    const c = document.createElement('link');
    c.setAttribute('id', id);
    c.setAttribute('rel', 'stylesheet');

    if (classes) {
        c.className = classes;
    }

    c.href = href;
    document.head.appendChild(c);
};

export const addJsToPage = (src, id, classes) => {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`#${id}`)) {
            resolve();
            return;
        }

        const script = document.createElement('script');

        if (classes) {
            script.className = classes;
        }

        script.onload = () => {
            resolve();
        };

        script.onerror = () => {
            reject(new Error(`Failed to load script: ${src}`));
        };

        script.src = src;
        script.setAttribute('id', id);
        document.head.appendChild(script);
    });
};