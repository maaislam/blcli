import settings from '../../../lib/settings';

const { ID } = settings;

export default class ContactBlock {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_contactBlock`);
    element.innerHTML = `
    <div class="${ID}-contactText">
      <h3>Not found what you were looking for?</h3>
      <p> Our Wellness consultants are on hand to help with any specifications or questions and provide advice especially tailored to your needs and goals.</p>
      <p>If you would like to find out more, please click below and your dedicated Wellness Consultant will contact you by your preferred contact method.</p>
      <div class="${ID}-button"><a href="https://www.technogym.com/gb/contacts">Contact us</a></div>
    </div>
    `;

    this.component = element;
  }

  render() {
    const { component } = this;
    const contactWrap = document.querySelector(`section.${ID}-contactForm`);
    contactWrap.appendChild(component);
  }
}

