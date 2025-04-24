import settings from '../lib/settings';

const { ID } = settings;

export default class PageMarkup {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_pageContent`);
    element.innerHTML = 
    `<div class="${ID}-topText">
        <h1>Technogym Treadmills</h1>
        <p>Live healthier and happier</p>
        <p>Each treadmill combines scientific research, innovative technology and exquisite design.</p>
        <p>We're a 7 time Official Fitness Equipment Supplier to the Olympic and Paralympic Games. Train with the best.</p>
    </div>
    <div class="${ID}-treadmills_wrapper">
      <div class="${ID}-productSlider_wrapper"></div>
    </div>
    <div class="${ID}-contactArea">
      <h3>Not found what you were looking for?</h3>
      <p>Our Wellness consultants are on hand to help with any specifications or questions and provide advice especially tailored to your needs and goals.</p>
      <div class="${ID}-contactButton">Contact Me</div>
    </div>`;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const mainPage = document.querySelector('.container.bodypage');
    mainPage.appendChild(component);
  }
}