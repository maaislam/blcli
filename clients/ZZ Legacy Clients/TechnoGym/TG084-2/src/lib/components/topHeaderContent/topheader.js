import settings from '../../../lib/settings';

const { ID } = settings;

export default class TopHeader {
  constructor() {
    this.render();
  }
  render() {
    const topHeaderWrapper = document.querySelector(`.${ID}-topContent`);
    topHeaderWrapper.innerHTML = `
    <div class="${ID}-headerText">
      <h1>Technogym Treadmills</h1>
      <span>Explore our range of treadmills</span>
      <p>Whether it's for your home or business, we've got a treadmill for you.</p>
      <p>Our wellness consultants are always on hand to help you find your perfect treadmill,
      or simply download our brochures for more information.</p>
    </div>`;
  }
}
