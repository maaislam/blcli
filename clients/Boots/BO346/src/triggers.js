/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
import TestReporting from './boots_tracking/TestReporting';
import shared from '../../../../core-files/shared';
const { ID, VARIATION } = shared;

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

const testID = `${ID}| Category Recommendations`;
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const reporting = new TestReporting(testID, testVariant); // sends experience id event to datalayer


pollerLite(['#isInStock',
    () => {
        return document.querySelector('#isInStock') && document.querySelector('#isInStock').value == 'false';
    }
], () => {

    // const runData = () => {
    //     return new Promise((resolve, reject) => {
    //         R3_COMMON.placementTypes = '';
    //         window.R3_COMMON.addPlacementType("item_page.oos");
    //         window.r3();
    //         setTimeout(function () {
    //             resolve();
    //         }, 2000);
    //     });
    // }
    const runData = () => {
        return new Promise((resolve, reject) => {
            // Reset placement types and add placement type
            R3_COMMON.placementTypes = '';
            window.R3_COMMON.addPlacementType("item_page.oos");
            window.r3();
    
            // Polling interval in milliseconds (e.g., check every 500ms)
            const checkInterval = 500;
    
            // Timeout to prevent infinite polling (e.g., after 10 seconds)
            const timeout = 10000;
    
            // This function checks if the required data exists in placements
            const checkDataAvailability = () => {

                // Ensure window.RR.data.JSON.placements is available and has data
                if (window.RR && window.RR.data && window.RR.data.JSON && Array.isArray(window.RR.data.JSON.placements)) {
                    // Iterate through all placements
                    const placements = window.RR.data.JSON.placements;
    
                    // Check if any placement has the required type
                    for (let placement of placements) {
                        if (placement.placementType === "item_page.oos") {
                            // Data is available, stop polling and resolve the promise
                            clearInterval(intervalId);
                            resolve();  // Proceed further after data is available
                            return;
                        }
                        else{
                            window.r3();
                        }
                    }
                }
            };
    
            // Start polling at regular intervals (e.g., every 500ms)
            const intervalId = setInterval(checkDataAvailability, checkInterval);
    
            // Timeout to reject after 10 seconds if data is not found
            setTimeout(() => {
                clearInterval(intervalId);
                reject(new Error("Timeout: Data not available after waiting for 10 seconds"));
            }, timeout); // Timeout after 10 seconds
        });
    };
    
    

    runData().then(() => {

        if (!ieChecks) {
            if (!getCookie('Synthetic_Testing')) {
                reporting.register(); // sends experience load event to datalayer

                if (!document.documentElement.classList.contains('BO346')) {

                    //const r3Count = window.RR.data.JSON.placements.length;

                    pollerLite([
                        'body', '#sold_out_text', '#estore_productpage_template_container', '#isInStock',
                        () => {
                            if (window.R3_COMMON && window.R3_COMMON.placementTypes) {
                                return true;
                            }
                        },
                        () => {
                            if (window.RR.data.JSON.placements.length > 0) {
                                return true;
                            }
                        },
                        // ()=> {
                        //     if(window.RR.data.JSON.placements.length > r3Count) {
                        //         return true;
                        //     }
                        // },
                        () => {
                            return !!window.jQuery;
                        },
                    ], activate);
                }
            }
        }
    });
});

