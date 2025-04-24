/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
 import activate from './lib/experiment';
 import { getCookie, pollerLite } from '../../../../lib/utils';
import shared from '../../../../core-files/shared';
 
 const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

const { VARIATION } = shared;

const isPDP = !!window.location.href.match(/(\d+)[^-]*$/g);
const PDPRE = /.*(-)([\d]{7,8}(p)|[\d]{7,8}).*/;

const PDPcode = window.location.pathname.match(PDPRE)[2];
fetch(`https://octopus-app-c6o8t.ondigitalocean.app/v2/compare-similar-items/${PDPcode}/`)
    .then((r) => r.json())
    .then((d) => {
        if (!ieChecks && isPDP) {
            pollerLite([
                () => {
                    if(window.R3_COMMON) {
                        return true;
                    }
                }
            ], () => {
                if (!getCookie("Synthetic_Testing")) {
                    // If placements
                    if(VARIATION === '1') {
                        const runData = () => {
                                return new Promise((resolve,reject) => {
                                    if(window.R3_COMMON) {
                                        window.R3_COMMON.placementTypes='';
                                        window.R3_COMMON.addPlacementType("item_page.oos");
                                        window.r3();
                                        setTimeout(function() {
                                            resolve();
                                        }, 2000);     
                                    }
                                
                                });
                        }
                        
                        runData().then(() => {
                            if(!document.documentElement.classList.contains('BO243')) {
                
                                pollerLite([
                                    'body','#sold_out_text', '#estore_productpage_template_container', '#isInStock', 
                                    ()=> {
                                        if(window.R3_COMMON && window.R3_COMMON.placementTypes) {
                                            return true;
                                        }
                                    },
                                    () => {
                                        if(window.RR.data.JSON.placements.length > 0) {
                                            return true;
                                        }
                                    },
                                    () => {
                                        return !!window.jQuery;
                                    },
                                    () => {
                                        return document.querySelector('#isInStock') && document.querySelector('#isInStock').value == 'false';
                                    },
                                ], activate);
                            }   
                        });
                    // If data
                    } else if(VARIATION === '2'){
                        pollerLite(['body','#sold_out_text', '#estore_productpage_template_container', '#isInStock',
                        () => {
                            return document.querySelector('#isInStock') && document.querySelector('#isInStock').value == 'false';
                        },
                        ], () => {
                            if(!document.documentElement.classList.contains('BO243')) {
                                activate(d.Data);
                            }
                        });
                    }
                }
            });
        }
    })
    .catch(() => {
        return;
    });
    



