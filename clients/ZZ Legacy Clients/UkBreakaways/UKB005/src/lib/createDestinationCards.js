import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';

export default (pathname, destinationsContainer) => {
  if (destinationsContainer) {
    destinationsContainer.classList.add('UKB005-destinationOptions__wrapper');
    if (pathname !== "/destination/london-theatre" && pathname !== "/destination/theatre" && pathname !== "/destination/comedy") {
      destinationsContainer.insertAdjacentHTML('beforebegin', `<h3 id='UKB005-destinations' class='UKB005-destinationPage__header'>View destinations</h3>`);
      destinationsContainer.insertAdjacentHTML('afterbegin', `<span class='UKB005-subTitle'>Choose a destination:</span>`);
    } else if (pathname === "/destination/london-theatre" || pathname === "/destination/theatre") {
      destinationsContainer.insertAdjacentHTML('beforebegin', `<h3 id='UKB005-destinations' class='UKB005-destinationPage__header'>View Theatre Breaks</h3>`);
      destinationsContainer.insertAdjacentHTML('afterbegin', `<span class='UKB005-subTitle'>Choose a theatre break:</span>`);
    } else if (pathname === "/destination/comedy") {
      destinationsContainer.insertAdjacentHTML('beforebegin', `<h3 id='UKB005-destinations' class='UKB005-destinationPage__header'>View Comedy Breaks</h3>`);
      destinationsContainer.insertAdjacentHTML('afterbegin', `<span class='UKB005-subTitle'>Choose a comedy break:</span>`);
    }
    const destinationsTitle = document.querySelector('#UKB005-destinations'); 
    // Hotel Options - click
    destinationsTitle.addEventListener('click', () => {
      document.querySelector('.UKB005-destinationOptions__wrapper').classList.toggle('show');
    });
  }
};
