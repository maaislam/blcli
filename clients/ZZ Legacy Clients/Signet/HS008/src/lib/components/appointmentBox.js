import settings from '../../lib/settings';
import { events } from '../../../../../../lib/utils';

const { ID } = settings;

export default class HelpBox {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_helpBox`);

    element.innerHTML =
    `<h3>Our in-store experts are here to help</h3>
    <div class="${ID}-button_wrap">
      <button class="${ID}-book">Book an appointment</button>
      <span>or</span>
      <button class="${ID}-store">Find your local store</button>
    </div>`;


    this.component = element;
  }

  bindEvents() {
    const { component } = this;

    component.querySelector(`.${ID}-book`).addEventListener('click', (e) => {
      e.preventDefault();
      events.send('HS008 V1', 'click', 'Clicked Book Instore', {
        nonInteraction: true
      });
      window.open('https://booking.hsamuel.co.uk/#/service_list', '_blank');
    });
    component.querySelector(`.${ID}-store`).addEventListener('click', (e) => {
      e.preventDefault();
      events.send('HS008 V1', 'click', 'Clicked Find Instore', {
        nonInteraction: true
      });
      window.open('https://www.hsamuel.co.uk/webstore/secure/storeLocator.sdo', '_blank');
    });
  }

  render() {
    const { component } = this;

    let buttonWrap;
    if (document.querySelector('#basketForm .buying-buttons-ifc')) {
      buttonWrap = document.querySelector('#basketForm .buying-buttons-ifc');
    } else {
      buttonWrap = document.querySelector('#basketForm .buying-buttons');
    }
    buttonWrap.insertAdjacentElement('afterend', component);
  }
}
