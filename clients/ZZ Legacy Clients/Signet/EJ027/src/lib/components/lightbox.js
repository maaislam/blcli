import { events } from "../../../../../../lib/utils";

export default class Lightbox {
  /**
   * Creates a lightbox
   * @param {string} ID Experiment ID
   * @param {HTMLElement} options.content Content to go inside the lightbox
   * @param {boolean} options.closeOnClick Close on click away from lightbox
   */
  constructor(ID, options) {
    // Group common settings
    this.cache = {
      ID,
      content: options.content,
      closeOnClick: options.closeOnClick !== 'undefined' ? options.closeOnClick : true,
    };
    this.callbacks = {
      beforeOpen: options.beforeOpen || null,
      afterOpen: options.afterOpen || null,
      beforeClose: options.beforeClose || null,
      afterClose: options.afterClose || null,
    };
    this.state = 'closed';

    // Create component
    this.create();
    this.bindEvents();
    this.render();

    // Expose public methods
    this.open = this.open;
    this.close = this.close;
    this.toggle = this.toggle;
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
    content.classList.add(`${cache.ID}_Lightbox__bottomContent`);

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
      events.send('EJ027 V1','close lightbox', {sendOnce: true});
      window.location.pathname = '/webstore/showbasket.sdo';
    });

    // on click of continue
    cache.component.querySelector(`.${cache.ID}-continue`).addEventListener('click', () => {
      this.close();
      events.send('EJ027 V1','click continue shopping', {sendOnce: true});
    });

    cache.component.querySelector(`.${cache.ID}-basketButton`).addEventListener('click', () => {
      this.close();
      events.send('EJ027 V1','click go to basket', {sendOnce: true});
    });

    cache.overlay.addEventListener('click', () => {
      this.close();
      window.location.pathname = '/webstore/showbasket.sdo';
      events.send('EJ027 V1','close lightbox', {sendOnce: true});
    });
  }

  /** Inject to DOM */
  render() {
    const { body } = document;
    const { cache } = this;
    body.appendChild(cache.overlay);
    body.appendChild(cache.component);

    this.open();
  }

  /** Open lightbox */
  open() {
    const { cache, callbacks } = this;
    if (typeof callbacks.beforeOpen === 'function') callbacks.beforeOpen();
    cache.overlay.style.display = 'block';
    cache.component.style.display = 'block';
    document.documentElement.classList.add(`${cache.ID}_Lightbox__noScroll`);
    document.body.classList.add(`${cache.ID}_Lightbox__noScroll`);
    if (typeof callbacks.afterOpen === 'function') callbacks.afterOpen();
    this.state = 'open';
  }

  /** Close lightbox */
  close() {
    const { cache, callbacks } = this;
    if (typeof callbacks.beforeClose === 'function') callbacks.beforeClose();
    cache.overlay.remove();
    cache.component.remove();
    if (typeof callbacks.afterClose === 'function') callbacks.afterClose();
    this.state = 'closed';
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
