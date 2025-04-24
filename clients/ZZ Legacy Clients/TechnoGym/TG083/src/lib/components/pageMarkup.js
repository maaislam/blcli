import settings from '../settings';
import { pollerLite } from '../../../../../../lib/uc-lib';

const { ID } = settings;

export default class PageMarkup {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_pageContent`);
    element.innerHTML = `
      <section class="${ID}-product_container">
        <h2>Running companions for your home</h2>
        <p class="${ID}-productSubtext">With a broad range of treadmills available, there is a Technogym product to suit every need. Explore our range below.</p>
        <div class="${ID}-productBlock ${ID}-myRun"></div>
      </section>
      <section class="${ID}-whyTG"></section>
      <section class="${ID}-product_container">
        <div class="${ID}-productBlock ${ID}-skillLine"></div>
      </section>
      
      <section class="${ID}-newsroom"></section>
    `;

    // add more treadmills to component
    /*pollerLite(['.lazy-load.shortcode-image'], () => {
      const otherTreadmills = document.querySelector('.wrapper_container:nth-of-type(17)');
      element.querySelector(`.${ID}-moreTreadmills h2`).insertAdjacentElement('afterend', otherTreadmills);      
    }); */

    this.component = element;
  }

  render() {
    const { component } = this;
    const header = document.querySelector(`.${ID}_topHeader`);
    header.insertAdjacentElement('afterend', component);
  }
}
