import { events } from '../../../../../../lib/utils';
import settings from '../settings';

export default class Lightbox {
  /**
   * Creates a lightbox
   * @param {string} ID Experiment ID
   * @param {HTMLElement} options.content Content to go inside the lightbox
   * @param {boolean} options.closeOnClick Close on click away from lightbox
   */
  constructor(ID, options) {
    this.cache = {
      ID,
      content: options.content,
      closeOnClick: options.closeOnClick !== 'undefined' ? options.closeOnClick : true,
    };
    this.create();
    this.bindEvents();
    this.render();
    document.querySelector('.TG065-form_download').addEventListener('click', () => {
      this.toggle();
    });

    return {
      open: this.open,
      close: this.close,
      toggle: this.toggle,
      cache: this.cache,
    };
  }

  /** Create elements */
  create() {
    const { cache } = this;

    // Overlay
    const overlay = document.createElement('div');
    overlay.classList.add(`${cache.ID}_Lightbox__overlay`);

    // Component
    const component = document.createElement('div');
    component.classList.add(`${cache.ID}_Lightbox`);

    // Inner content
    const content = document.createElement('div');
    content.classList.add(`${cache.ID}_Lightbox__content`);

    if (cache.content) {
      const type = typeof cache.content;
      if (type === 'string') {
        content.innerHTML = cache.content;
      } else if (type === 'object') {
        content.appendChild(cache.content);
      }
    }
    component.appendChild(content);

    cache.overlay = overlay;
    cache.component = component;
  }

  /** Add event listeners */
  bindEvents() {
    const { cache } = this;

    cache.component.querySelector('.TG065_Lightbox__close').addEventListener('click', () => {
      this.close();
    });
    // Close events
    cache.overlay.addEventListener('click', () => {
      this.close();
    });

    if (cache.closeOnClick) {
      cache.overlay.addEventListener('click', () => {
        this.close();
      });
      cache.component.querySelector('.TG065_Lightbox__close').addEventListener('click', () => {
        this.close();
      });
    }
  }

  /** Inject to DOM */
  render() {
    const { body } = document;
    const { cache } = this;
    body.appendChild(cache.overlay);
    body.appendChild(cache.component);
  }

  /** Open lightbox */
  open() {
    const { cache } = this;
    cache.overlay.style.display = 'block';
    cache.component.style.display = 'block';
    document.documentElement.classList.add(`${cache.ID}_Lightbox__noScroll`);
    document.body.classList.add(`${cache.ID}_Lightbox__noScroll`);
    events.send(`TG065 Mobile v${settings.VARIATION}`, 'Click', 'Opened Form Lightbox');
  }

  /** Close lightbox */
  close() {
    const { cache } = this;
    cache.overlay.style.display = 'none';
    cache.component.style.display = 'none';
    document.documentElement.classList.remove(`${cache.ID}_Lightbox__noScroll`);
    document.body.classList.remove(`${cache.ID}_Lightbox__noScroll`);
  }

  /** Toggle lightbox open/close state */
  toggle() {
    const { cache } = this;
    if (cache.overlay.style === 'block') {
      this.close();
    } else {
      this.open();
    }
  }
}
