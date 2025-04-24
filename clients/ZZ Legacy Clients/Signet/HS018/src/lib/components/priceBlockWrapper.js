export default class PriceFilters {
  /**
   * Creates the price filter block
   * @param {string} ID Experiment ID
   * @param {HTMLElement} options.content Content to go inside the price filters
   */
  constructor(ID, options) {
    // Group common settings
    this.cache = { ID, content: options.content };
    // Create component
    this.create();
    this.render();
  }

  /** Create elements */
  create() {
    const { cache } = this;

    // Component
    const component = document.createElement('div');
    component.classList.add(`${cache.ID}_priceFilters-wrapper`);

    // add the content based on the markup
    if (cache.content) {
      const type = typeof cache.content;
      if (type === 'string') {
        component.innerHTML = cache.content;
      } else if (type === 'object') {
        component.appendChild(cache.content);
      }
    }
    cache.component = component;
  }
  /** Inject to DOM */
  render() {
    const { body } = document;
    const { cache } = this;
    const PLPheader = body.querySelector('.browse__header-section');
    PLPheader.appendChild(cache.component);
  }
}
