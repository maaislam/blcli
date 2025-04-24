import settings from '../../settings';

const { ID } = settings;

export default class TopBanner {
  constructor() {
    //this.slideData = options.slides;
    this.create();
    this.bindEvents();
    this.render();
    // this.initSlider();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_topBanner`);

    element.innerHTML = `
      <div class="${ID}_topBanner-content"> </div>
      <div class="${ID}_topBanner-background"></div>
    `;

    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const mainContent = document.querySelector('.page-wrapper');
    mainContent.insertAdjacentElement('afterbegin', component);
  }

  /** Run slider plugin */
  /*initSlider() {
    const { component } = this;
    const slides = component.querySelectorAll(`.${ID}_HeroBanner-slide`);
    if (slides.length > 1) {
      // Run Flickity Slider if more than 1 banner
      pollerLite([
        () => {
          try {
            return typeof window.Flickity === 'function';
          } catch (e) {}
        },
      ], () => {
        // Flickity slider exists
        setTimeout(() => {
          // Show all secondary slides before slider init
          Array.prototype.forEach.call(slides, (el) => {
            const isHidden = el.style.display === 'none';
            if (isHidden) el.style.display = '';
          });
          const flickity = new Flickity(component.querySelector(`.${ID}_HeroBanner-slides`));
        }, 800);
      });
    }
  }*/
}
