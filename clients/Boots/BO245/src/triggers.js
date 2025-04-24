/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
import shared from '../../../../core-files/shared';
import TestReporting from './boots_tracking/TestReporting';

const { ID, VARIATION } = shared;

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

const testID = `${ID}| OOS recs - redesign`; // Change this to test name and include in experiment.js
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const reporting = new TestReporting(testID, testVariant); // sends experience id event to datalayer

pollerLite(['#isInStock',
    () => {
        return document.querySelector('#isInStock') && document.querySelector('#isInStock').value == 'false';
    }
], () => {

    const runData = () => {
        return new Promise((resolve, reject) => {
            R3_COMMON.placementTypes = '';
            window.R3_COMMON.addPlacementType("item_page.oos");
            window.r3();
            setTimeout(function () {
                resolve();
            }, 2000);
        });
    }

    runData().then(() => {

        if (!ieChecks) {
            if (!getCookie('Synthetic_Testing')) {
                reporting.register(); // sends experience load event to datalayer
                if (!document.documentElement.classList.contains('BO245')) {

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

