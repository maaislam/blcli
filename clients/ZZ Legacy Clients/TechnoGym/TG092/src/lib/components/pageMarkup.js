/**
 * Add the page markup
 */
import { __ } from '../helpers';
import settings from '../../lib/settings';

const { ID } = settings;

export default class PageContent {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_innerContent`);


    element.innerHTML = `
    <section class="${ID}-pageBlock ${ID}-commercial">
      <div class="${ID}-sectionHeading">
        <h2>${__('Commercial equipment and impeccable support for every setting')}</h2>
        <p class="${ID}-subcontent">${__('Deliver a bespoke and diverse training experience with our smart equipment. Make your environment stand out with our Interior Design team. Plan your investment accurately with our financial services. We give you complete support so you can focus on your customer fully.')}</p>
      </div>
      <div class="${ID}-gridImages"></div>
    </section>
    <section class="${ID}-pageBlock ${ID}-fitness"></section>
    <section class="${ID}-pageBlock ${ID}-hospitality"></section>
    <section class="${ID}-pageBlock ${ID}-residential"></section>
    <section class="${ID}-pageBlock ${ID}-health"></section>
    <section class="${ID}-pageBlock ${ID}-performance"></section>
    <section class="${ID}-pageBlock ${ID}-workplace"></section>`;
    this.component = element;
  }
  render() {
    const { component } = this;
    const header = document.querySelector(`.${ID}_topHeader`);
    header.insertAdjacentElement('afterend', component);
  }
}

