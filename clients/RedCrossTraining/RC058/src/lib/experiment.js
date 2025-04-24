/**
 * RC058 - Course Finder signposting (homepage)
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  // Write experiment code here
  const bannerTextContainer = document.querySelector('.homepage-hero--text');
  if (bannerTextContainer) {
    const bannerCta = bannerTextContainer.querySelector('a.cta');
    const bannerCtaText = bannerCta.querySelectorAll('span')[1];
    bannerCtaText.innerHTML = 'Book a course';

    const bannerMainText = bannerTextContainer.querySelector('p.homepage-hero--description.large');
    bannerMainText.classList.remove('large');
    bannerMainText.innerHTML = `We offer a range of first aid, mental wellbeing and health and safety courses for workplace and public.`;

    const helpCta = `<a href="/courses/choose-the-right-course/" class="${shared.ID}-cta cta" rel="noopener">
      <span class="icon-menu-arrow" style="background-image: none;">
          <svg role="presentation" width="10" height="15" viewBox="0 0 10 15" version="1.1" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <title>Arrow icon</title><g id="C01.02_Navigation_&amp;_Search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="C01.02_Navigation_Search_Mobile" transform="translate(-281 -169)" fill="#262626"><g id="C01.02_Navigation_Secondary_Links" transform="translate(0 60)">
                      <g id="Nav_item_1" transform="translate(20 91)"><path d="M259.071 20.071h9v2h-8v8h-2v-10h1z" transform="rotate(135 263.071 25.071)"></path></g>
                  </g></g>
              </g>
          </svg>
      </span>
      <span>Help me find a course</span>
    </a>`;

    bannerCta.insertAdjacentHTML('beforebegin', helpCta);

    const bannerTitle = bannerTextContainer.querySelector('h1.homepage-hero--title');
    // bannerTitle.classList.add(`${shared.ID}-hero--title`);
    // bannerTitle.innerHTML = 'Find a course';
    
    const newSubText = `<p class="${shared.ID}-hero--description">Book your course today</p>`;
    bannerTitle.insertAdjacentHTML('afterend', newSubText);


    // /**
    //  * @desc Check for Returning User
    //  */
    // if (localStorage.getItem(`${shared.ID}-returningUser`) !== null && sessionStorage.getItem(`${shared.ID}-returningUser`) === null) {
    //   /**
    //   * ///////////// Returning user //////////////
    //   */
    // } else {
    //   /**
    //     * ///////////// First Visit on page //////////////
    //     */
    //   localStorage.setItem(`${shared.ID}-returningUser`, true);
    //   sessionStorage.setItem(`${shared.ID}-returningUser`, true);

    //   const bannerTitle = bannerTextContainer.querySelector('h1.homepage-hero--title');
    //   bannerTitle.classList.add(`${shared.ID}-hero--title`);
    //   bannerTitle.innerHTML = 'Find a course';
      
    //   const newSubText = `<p class="${shared.ID}-hero--description homepage-hero--description large">Train with a name you can trust</p>`;
    //   bannerTitle.insertAdjacentHTML('afterend', newSubText);
    // }

  } 
};
