import settings from '../../lib/settings';

const { ID } = settings;

export default class Banner {
  constructor(options) {
    this.opts = options || {};
    this.create();
    if (typeof options.render === 'function') options.render(this.component);
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_Banner`);
    element.innerHTML = `
    <div class="${ID}-banner_text">
      <h3>Search over <span>3,000</span> pieces of <span>Officially Licensed</span> Geek Merch!</h3>
      <div class="${ID}-banner_cta">Product Finder</div>
    </div>
    `;
    this.component = element;
  }
}
