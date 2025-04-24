/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { set } from 'lodash';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  console.log('Experiment started');
  // pollerLite([() => typeof window.DY.feedProperties === 'object' && typeof window.DY.ServerUtil === 'object'], () => {
  pollerLite([() => typeof window.Moengage=== 'object' && 
                    typeof window.Moengage.onsite.getData  === 'function' && 
                    typeof window.Moengage.add_unique_user_id === 'function' &&
                    typeof window.Moengage.add_email === 'function'], () => {
    console.log('Moengage loaded');

    setTimeout(() => {
    window.Moengage.add_unique_user_id("jjj@jjj.com").then((res) => {
        window.Moengage.add_email("jjj@jjj.com");
        window.Moengage.add_mobile("+12399999999");
        window.Moengage.add_user_attribute("emailpermit", true).then((res) => {
          console.log('Moengage add_user_attribute sent');
          console.log(res);
        });
        window.Moengage.add_user_attribute("smspermit", "yes");
        window.Moengage.add_user_attribute("src", "booking-form");
        window.Moengage.add_user_attribute("moe_unsubscribe", false);
        console.log('Moengage add_unique_user_id sent');
        console.log(res);
      });
    }, 3000);


    // window.Moengage.onsite.registerCallback("optedin", function (err, data) {
    //   if (err) {
    //   return console.error('Error from moengage:', err);
    //   }
    //   console.log('Data for campaign:', data);
    //   var payload = data.payload; 
    //   var impTracker = data.imp; 
    // })

  });
}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  startExperiment();
};
