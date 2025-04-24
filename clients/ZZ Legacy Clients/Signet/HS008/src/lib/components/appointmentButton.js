import settings from '../../lib/settings';
import { events } from '../../../../../../lib/utils';

const { ID } = settings;

export default class AppointmentButton {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_storeButton`);

    element.innerHTML =
    `<span>or</span><button class="${ID}-book">Book in-store appointment</button>`;


    this.component = element;
  }

  bindEvents() {
    const { component } = this;
    component.querySelector(`.${ID}-book`).addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      events.send('HS008 V2', 'click', 'Clicked Book Instore', {
        nonInteraction: true
      });
      window.open('https://booking.hsamuel.co.uk/#/service_list', '_blank');
    });
  }

  render() {
    const { component } = this;


    // insert before finance button
    if (document.querySelector('#basketForm .buying-buttons-ifc')) {
      document.querySelector('#basketForm .buying-buttons-ifc').appendChild(component);
    } else {
      document.querySelector('#basketForm .buying-buttons').appendChild(component);
    }

    const sizing = document.querySelector('.buying-options__sections');
    if (sizing) {
      if (window.innerWidth > 767) {
        const sizingFinder = document.querySelector('.childSku__pdf');
        sizing.insertAdjacentElement('beforebegin', sizingFinder);
      }
    }
  }
}
