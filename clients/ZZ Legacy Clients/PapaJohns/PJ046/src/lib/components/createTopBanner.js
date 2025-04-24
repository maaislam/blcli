import { events } from '../../../../../../lib/utils';

export default () => {
  // CYO Top Banner
  const cyoContainer = `<div class='PJ046-cyo__topTitle-wrapper'>
    <h2 class='PJ046-cyo__title'>Create Your Own</h2>
    <div class='PJ046-cyo__banner'></div>
  </div>`;
  document.querySelector('.customisePizza').insertAdjacentHTML('beforebegin', cyoContainer);
};