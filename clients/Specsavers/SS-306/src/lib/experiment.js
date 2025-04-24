/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { h, render } from "preact";
import Wizard from "./Wizard";

// Tree nodes
import nodes from './nodes';

const { ID, VARIATION } = shared;

/**
 * Entry point for experiment
 */
export default () => {
  setup();

  fireEvent('Conditions Met');

  if (VARIATION == "control") {
    return;
  }

  // Add initialiser markup
  const p = document.querySelector('.banner-header .container section .dev-section h1');
  p.insertAdjacentHTML('afterend', `
    <div class="${ID}-init-wrap">
      <p>Find out if you are eligible for a home eye test in as little as 2 minutes</p>
      <p>
        <a class="${ID}-init">Let's get started</a>
      </p>
    </div>
  `);

  // Create Wizard
  const root = document.createElement("div");
  root.id = `${ID}-root`;
  document.body.append(root);

  render(<Wizard nodes={nodes} />, root);

  // Add eligibility overlay on the fly
  document.body.insertAdjacentHTML('beforeend', `
    <div class="${ID}-eligibility-overlay">
      <div class="${ID}-eligibility-overlay__inner">
        <span class="${ID}-eligibility-overlay__close" title="Close">&times;</span>

        <h2>Criteria for free NHS funded eye tests</h2>

        <ul>
          <li>Aged 60 or over</li>
          <li>Registered as partially sighted or blind</li>
          <li>Diagnosed with diabetes or glaucoma</li>
          <li>Considered to be at risk of glaucoma, as advised by an optician</li>
          <li>Aged 40 or over and have a family member diagnosed with glaucoma, or have a family history of glaucoma</li>
          <li>Receiving benefit*</li>
          <li>Entitled to, or named on, a valid NHS tax credit exemption certificate</li>
          <li>Named on a valid NHS HC2 certificate (full help). Those named on an NHS HC3 certificate (partial help) may also get help with the cost of a private eye test</li>
          <li>Eligible for an NHS Complex Lens Voucher (your optician will advise on the entitlement)</li>
          <li>* You're entitled if you or your partner (including civil partner) receive, or you're under the age of 20 and the dependant of someone receiving: Income support, Income-related Employment and Support Allowance, Income-based Jobseeker's Allowance, Pension Credit Guarantee Credit.</li>
        </ul>
      </div>
    </div>
  `);

  const overlay = document.querySelector(`.${ID}-eligibility-overlay`);
  const inner = document.querySelector(`.${ID}-eligibility-overlay__inner`);
  document.addEventListener('click', e => {
    if(e.target.closest(`.${ID}-check-criteria`)) {
      fireEvent('Click NHS Criteria');

      overlay.classList.add(`${ID}-eligibility-overlay--active`);
      inner.classList.add(`${ID}-eligibility-overlay__inner--active`);
    }
    if(e.target.closest(`.${ID}-eligibility-overlay`) && !e.target.closest(`.${ID}-eligibility-overlay__inner`)) {
      overlay.classList.remove(`${ID}-eligibility-overlay--active`);
      inner.classList.remove(`${ID}-eligibility-overlay__inner--active`);
    }
    if(e.target.closest(`.${ID}-eligibility-overlay__close`)) {
      overlay.classList.remove(`${ID}-eligibility-overlay--active`);
      inner.classList.remove(`${ID}-eligibility-overlay__inner--active`);
    }
  });
};
