/**
 * HH027 - Linear Branch Journey
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import BranchFinder from '../components/BranchFinder/BranchFinder';
import { events } from '../../../../../lib/utils';

const { ID } = settings;

const activate = () => {
  setup();

  const isHomepage = /https?:\/\/www\.helpinghandshomecare\.co\.uk\/?(\?.*)?(#.*)?$/.test(window.location.href);
  const branchFinder = new BranchFinder();
  const hero = document.querySelector('#hero');
  const heading = hero.querySelector('h1');
  const subtitle = heading.parentElement.querySelector('p');
  const pageTypeFunctions = {
    homepage: () => {
      document.body.classList.add(`${ID}--home`);
      const ctas = hero.querySelectorAll('.btn');
      const localCareCta = ctas[0];
      const jobCta = ctas[1];

      // Replace header text
      heading.innerText = 'Where do you need care?';

      // Replace subtitle text
      subtitle.innerText = 'We can provide care in your home anywhere in England & Wales';

      // Render BranchFinder
      subtitle.insertAdjacentElement('afterend', branchFinder.component);

      // Remove first CTA
      localCareCta.parentElement.style.display = 'none';

      // Replace job CTA text
      jobCta.innerText = 'I\'m looking for a job';

      // Add separator
      jobCta.parentElement.insertAdjacentHTML('beforebegin', `<div class="col-xs-12 ${ID}_separator">or</div>`);

      // Add GA event to Jobs CTA
      jobCta.addEventListener('click', () => {
        events.send(ID, 'Clicks', 'I\'m looking for a job');
      });
    },

    other: () => {
      document.body.classList.add(`${ID}--other`);

      // Reduce top padding from hero banner
      hero.style.paddingTop = '80px';

      // Replace subtitle text
      subtitle.innerHTML = '<strong>Where do you need care?</strong>';

      // Render BranchFinder
      subtitle.insertAdjacentElement('afterend', branchFinder.component);

      // Add second strapline
      subtitle.insertAdjacentHTML('afterend', `<p class="${ID}_second-strapline">We can provide care in your home anywhere in England & Wales</p>`);
    },
  };

  if (isHomepage) {
    pageTypeFunctions.homepage();
  } else {
    pageTypeFunctions.other();
  }
};

export default activate;
