import { events } from '../../../../../../lib/utils';
import { pollerLite } from '../../../../../../lib/uc-lib';
import Experiment from '../experiment';

export default class Lightbox {
  /**
   * Creates a lightbox
   * @param {string} ID Experiment ID
   * @param {HTMLElement} options.content Content to go inside the lightbox
   */
  constructor(ID, options) {
    this.cache = {
      ID: 'BI034',
      content: options.content,
    };
    this.create();
    this.bindEvents();
    this.render();
    pollerLite(['.BI034_Lightbox'], () => {
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

    // Close
    const close = document.createElement('div');
    close.classList.add(`${cache.ID}_Lightbox__close`);

    if (cache.content) {
      const type = typeof cache.content;
      if (type === 'string') {
        content.innerHTML = cache.content;
      } else if (type === 'object') {
        content.appendChild(cache.content);
      }
    }
    component.appendChild(close);
    component.appendChild(content);

    cache.overlay = overlay;
    cache.component = component;
  }

  /** Add event listeners */
  bindEvents() {
    const { cache } = this;

    // Close events
    cache.component.querySelector(`.${cache.ID}_Lightbox__close`).addEventListener('click', () => {
      this.close();
    });
    cache.component.querySelector(`.${cache.ID}-lightbox_close`).addEventListener('click', () => {
      this.close();
    });

    cache.overlay.addEventListener('click', () => {
      this.close();
    });
  }

  /** Inject to DOM */
  render() {
    const { body } = document;
    const { cache } = this;
    if (!localStorage.getItem(`${cache.ID}-lightbox_shown`)) {
      Experiment.addTimer( 
        setTimeout(() => {
          if(!localStorage.getItem(`${cache.ID}-lightbox_shown`)) {
            body.appendChild(cache.overlay);
            body.appendChild(cache.component);
            localStorage.setItem(`${cache.ID}-lightbox_shown`, 1);
          }
        }, 15000)
      );
    }
  }

  /** Open lightbox */
  open() {
    const { cache } = this;
    cache.overlay.style.display = 'block';
    cache.component.style.display = 'block';
    document.body.classList.add(`${cache.ID}_Lightbox__noScroll`);
    events.send(cache.ID, 'View', `User saw ${cache.ID} lightbox`);
  }

  /** Close lightbox */
  close() {
    const { cache } = this;
    cache.overlay.style.display = 'none';
    cache.component.style.display = 'none';
    document.documentElement.classList.remove(`${cache.ID}_Lightbox__noScroll`);
    document.body.classList.remove(`${cache.ID}_Lightbox__noScroll`);
    events.send(cache.ID, `User closed ${cache.ID} lightbox`, `User closed ${cache.ID} lightbox (to exit)`);
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
