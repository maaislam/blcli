import { events } from '../../../../../lib/utils';
import settings from '../settings';

export default class smallIcon {
  /**
   * Creates a lightbox
   * @param {string} ID Experiment ID
   * @param {HTMLElement} options.content Content to go inside the lightbox
   */
  constructor(ID, options) {
    this.cache = {
      ID: 'EJ026',
      content: options.content,
    };
    this.create();
    this.render();
    this.bindEvents();
    return {
      cache: this.cache,
    };
  }

  bindEvents() {
    const { cache } = this;
    // Close events
    cache.component.addEventListener('click', () => {
      document.querySelector('.email-sign-up-overlay').classList.add('page-overlay--is-active');
      events.send(settings.ID, 'Click', `${settings.VARIATION} icon (bottom right hand corner) shown`);
    });
  }


  /** Create elements */
  create() {
    const { cache } = this;
    // Component
    const component = document.createElement('div');
    component.classList.add(`${cache.ID}_smallIcon`);
    // Inner content
    const content = document.createElement('div');
    content.classList.add(`${cache.ID}_smallIcon__content`);

    if (cache.content) {
      const type = typeof cache.content;
      if (type === 'string') {
        content.innerHTML = cache.content;
      } else if (type === 'object') {
        content.appendChild(cache.content);
      }
    }
    component.appendChild(content);
    cache.component = component;
  }

  /** Inject to DOM */
  render() {
    const { body } = document;
    const { cache } = this;
    body.appendChild(cache.component);
  }
}
