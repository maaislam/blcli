import settings from '../settings';
import specifications from '../components/specifications';
import { pollerLite } from '../../../../../../lib/uc-lib';

export default () => {
  /**
   * Below the fold content
   */
  const ID = `${settings.ID}`;
  const aboveContainer = document.querySelector(`.${ID}-abovefold_wrapper`);

  const belowFold = document.createElement('div');
  belowFold.classList.add(`${ID}-belowfold_wrapper`);
  belowFold.innerHTML =
  `<div class="${ID}-sectionTabs"> 
    <div class="${ID}-tab ${ID}-features ${ID}-tab_active" data-target="#TG065-features"><span>Features</span></div>
    <div class="${ID}-tab ${ID}-specifications" data-target="#TG065-specs"><span>Specifications</span></div>
  </div>
  <div id="TG065-features" class="${ID}-features_section ${ID}-tab_section TG065-tab-section_active"></div>
  <div id="TG065-specs" class="${ID}-specifications_section ${ID}-tab_section"><div class="TG065-specifications_content"></div></div>
  <div class="${ID}-large_blocks_section"></div>
  <div class="${ID}-video_section">
    <iframe src="https://player.vimeo.com/video/116771155?title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
  </div>
  <div class="${ID}-footer">
    <div class="${ID}-address">
      <p>Products and services supplied in UNITED KINGDOM by <br><br>
      <strong>TECHNOGYM U.K. Ltd.</strong><br>
      Two The Boulevard, Cain Road, RG12 1WP, Bracknell<br>
      Fully paid up capital GBP 100.000<br><br>
      Website operated by<br><br>
      TECHNOGYM S.p.A.<br>
      VIA CALCINARO, 2861<br>
      47521 CESENA (FC)<br><br></p>
      <p><span class="copyright">Fiscal code and VAT: 06250230965<br>
      Certified Electronic Mail (PEC): technogym.amministrazione@legalmail.it<br>
      Company registration number at the Forlì-Cesena Register, REA 315187<br>
      Fully paid up capital Euro 10.050.250,00<br>
      Siae License 201500000083<br></span></p>
    </div>
  </div>`;

  aboveContainer.insertAdjacentElement('afterend', belowFold);

  specifications();
  /* tab functionality */

  const tabHeadings = document.querySelectorAll(`.${ID}-tab`);
  const tabSections = document.querySelectorAll(`.${ID}-tab_section`);

  for (let i = 0; i < tabHeadings.length; i += 1) {
    tabHeadings[i].addEventListener('click', (e) => {
      // remove active from tabs that currently open
      for (let j = 0; j < tabHeadings.length; j += 1) {
        tabHeadings[j].classList.remove('TG065-tab_active');
      }
      // add class to active heading
      e.currentTarget.classList.add('TG065-tab_active');
      // Remove active class from all content tabs
      [].forEach.call(tabSections, (item) => {
        item.classList.remove('TG065-tab-section_active');
      });
      // Make one active
      const id = e.currentTarget.getAttribute('data-target');
      const matchingElm = document.querySelector(`${id}`);
      matchingElm.classList.add('TG065-tab-section_active');
    });
  }


  /* Move the video on desktop */
  if (window.innerWidth >= 1024) {
    pollerLite(['.TG065-bottom_block'], () => {
      const video = document.querySelector('.TG065-video_section');
      const readytoRun = document.querySelector('.TG065-bottom_block:last-of-type');
      readytoRun.appendChild(video);
    });
  }
};
