import settings from './settings';
import getCode from './getCode';
import checkForValidCode from './checkForValidCode';
import shared from '../../../../../core-files/shared';

const getCodeRedirectUrl = (code) => {
    if(shared.VARIATION == 1) {
        return settings.urls.old + 'c/' + code;
    } else if(shared.VARIATION == 2){
        return settings.urls.new + 'c/' + code;
    }
    
};

const redirect = () => {
    let code = getCode();
    /*
    * Conditions:
    * Has offer code in URL (runs continously until a valid offer code exists (RETURNED FROM API) and then redirects to correct URL)
    * Has offer code in local storage and not in URL (if so redirects with the code)
    * Is a normal URL without any offer code.
    */

    if (settings.hasCodeInUrl) {
        requestAnimationFrame(() => {
            checkForValidCode((code) => {
                window.location.href = getCodeRedirectUrl(code);
            });
        });
    } else if (code && !settings.hasCodeInUrl) {
        window.location.href = getCodeRedirectUrl(code);
    } else {
        if(shared.VARIATION == 1) {
            window.location.href = settings.urls.old;
        } else if(shared.VARIATION == 2){
            window.location.href = settings.urls.new;
        }
        
    }
};

export default redirect;
