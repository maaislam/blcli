import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if(document.location.href === 'https://www.boots.com/online/pharmacy/') {
    pollerLite([
        'body', 
        '.getStarted__getStarted--2m57Y .common__primary--3SdgS',
        '.index__landingPage--1YuZv',
        () => {
            return !!window.Optanon
        },
        //'.optanon-alert-box-wrapper',  
    ], activate);
}

pollerLite(['body'], () => {

    // for observer
    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    document.body.classList.remove('BO014');
                    document.body.classList.remove('BO014-1');
                    document.body.classList.remove('BO014-2');
                   
                    if(document.querySelector('.BO014_pageContainer')) {
                        document.querySelector('.BO014_pageContainer').remove();
                    }
                   
                    if(document.location.href === 'https://www.boots.com/online/pharmacy/') {
                        pollerLite([
                            'body', 
                            '.getStarted__getStarted--2m57Y .common__primary--3SdgS',
                            '.index__landingPage--1YuZv',
                            () => {
                                return !!window.Optanon
                            },
                        ], activate);
                    }
                }
            });
        });
    const config = {
        childList: true,
        subtree: true
    };
    
    observer.observe(bodyList, config);
});