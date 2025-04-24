import settings from '../settings';

const { ID } = settings;

export default class TopHeader {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_topHeader`);
    element.innerHTML = `
      <div class="${ID}-headerText">
        <h1>Running for your home</h1>
        <p>Our selection of treadmills, perfect for the home</p>
      </div>
    `;
    this.component = element;
  }

  render() {
    const { component } = this;
    const mainPage = document.querySelector('.content-container.container-fluid');
    mainPage.insertAdjacentElement('afterbegin', component);
  }
}
