/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if(document.location.href === 'https://www.boots.com/online/pharmacy/' || document.location.href.indexOf('https://www.boots.com/online/pharmacy/?') > -1) {
    pollerLite([
        'body', 
        '.styles__content--Ej6ay button',
        '#header-navbar-hamburger-button',
        () => {
            return !!window.Optanon
        },
        () => {
            if(window.innerWidth <= 1025) {
                return true;
            }
        },
        //'.optanon-alert-box-wrapper',  
    ], () =>{
        setTimeout(()=> {
            activate();
        }, 1000);
    });
}

pollerLite(['body'], () => {

    // for observer
    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    document.body.classList.remove('BO054');
                    if(document.location.href === 'https://www.boots.com/online/pharmacy/' || document.location.href.indexOf('https://www.boots.com/online/pharmacy/?') > -1) {
                        pollerLite([
                            'body', 
                            '.styles__content--Ej6ay button',
                            '#header-navbar-hamburger-button',
                            () => {
                                return !!window.Optanon
                            },
                            () => {
                                if(window.innerWidth <= 1025) {
                                    return true;
                                }
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






