/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const proofSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none">
<g id="Group 99">
<path id="Vector 40" d="M6.3869 8.68914C3.98037 8.20229 1.99851 6.61403 0.810097 5.15996C1.99851 3.70589 3.98037 2.11764 6.3869 1.63079C8.84571 1.13337 11.8795 1.75957 15.1275 5.15996C11.8795 8.56036 8.84571 9.18656 6.3869 8.68914Z" stroke="#353535" stroke-width="1.28"/>
<ellipse id="Ellipse 7" cx="7.69603" cy="5.22403" rx="3.312" ry="3.168" fill="#353535"/>
</g>
</svg>
`;

const windowSocialProof = {
  proofCount: 5,
}

const startExperiment = () => {
  // window.socialProof = windowSocialProof;

  pollerLite(['.pgHotel .main .rebaseContainer'], () => {
    console.log('Experiment started');

    const proofCount = window.socialProof;


    const socialProofHtml = (proofCount, type) => {
      return `<div class="${ID}-social-proof ${type === 'mobile' ? `${ID}-hide-desktop` : `${ID}-hide-mobile`}  ${type === 'mobile' ? `${ID}-mobile-style` : ``}">
        <div class="${ID}-social-proof-icon">
          ${proofSVG}
        </div>
        <div class="${ID}-social-prooftext">
          <p><strong>${proofCount} people</strong> looked at this arrival date in the past week</p>
        </div>
      </div>`;
    };

    const socialProofDesktop = socialProofHtml(proofCount, 'desktop');
    const targetDesktop = document.querySelector('.pgHotel .main .rebaseContainer .c-breadcrumb');
    targetDesktop.insertAdjacentHTML('beforeend', socialProofDesktop);

    const socialProofMobile = socialProofHtml(proofCount, 'mobile');
    const targetMobile = document.querySelector('.pgHotel .main .rebaseContainer .c-section');
    targetMobile.insertAdjacentHTML('beforebegin', socialProofMobile);

  })
};

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
