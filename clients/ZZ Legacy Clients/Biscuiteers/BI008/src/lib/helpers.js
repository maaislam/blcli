/**
 * Helper get normalised window path name
 */
const getPathName = () => window.location.pathname.replace(/\/$/, '');

/**
 * Destroy pollers
 */
const destroyPollers = () => {
    if((window.UC.experiments.BI008 || {}).pollers) {
        const pollers = window.UC.experiments.BI008.pollers;
        for(let i = 0; i < pollers.length; i++) {
            pollers[i].destroy();
        }

        window.UC.experiments.BI008.pollers = [];
    }
};

export {destroyPollers, getPathName};
