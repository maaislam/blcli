/**
 * @desc all the content that will go above the fold
 */

import headerVideo from './headerVideo';
import stickyNav from './stickyNav';
import video from './video';

export default () => {
  // top header section
  const topContainer = document.querySelector('.content-container.container-fluid');
  const topImage = document.createElement('div');
  topImage.classList.add('TG103-topContainer');
  topContainer.insertAdjacentElement('beforebegin', topImage);

  topImage.innerHTML = headerVideo;

  // sticky nav
  stickyNav();
  video();
};
