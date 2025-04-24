/**
 * ME-PDP-COMBINE - Optimised version of several 100% experiments
 * @author User Conversion
 */
import ME159 from './experiments/ME159/triggers';
import ME164 from './experiments/ME164/triggers';
import ME155 from './experiments/ME155/triggers';
import ME174 from './experiments/ME174/triggers';
import ME141 from './experiments/ME141/triggers';

/*
  ---------------------------
  Included 100% Experiments
  ---------------------------
  ME159 (V2) - Scarcity Improvements
  ME164 - Lightbox Imagery Messaging
  ME155 - Seemless PLP in PDP
  ME174 - Christmas Jumper PLP on PDP
  ME141 - Mobile Navigation
*/

const activate = () => {
  // Activate all experiments
  const experimentsToActivate = [ME159, ME164, ME155, ME174, ME141];
  experimentsToActivate.forEach((exp) => {
    try {
      exp();
    } catch (e) {
      console.error(e);
    }
  });
};

export default activate;
