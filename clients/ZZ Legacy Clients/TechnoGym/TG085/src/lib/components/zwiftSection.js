import settings from '../../lib/settings';

const { ID } = settings;

export default class ZwiftSection {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_zwiftSection`);

    element.innerHTML =
    `
    <div class="${ID}-zwiftImage">
    <div class="${ID}-zwiftLogo"></div>
    </div>
    <h2>TRAIN & GAME</h2>
    <p>Compete with other runners online from around the world, while accessing a digital experience packed with maps, routes, and competitive challenges.</p>
    <p>Train in different settings, with a vast selection of virtual scenarios, and customize routes based on various levels of difficulty with ZWIFT which is fully integrated in your MyRun. </p>`;

    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const headerWrap = document.querySelector('.page-container .main-content');
    if(headerWrap) {
      headerWrap.insertAdjacentElement('afterbegin', component);
    }
  }
}
