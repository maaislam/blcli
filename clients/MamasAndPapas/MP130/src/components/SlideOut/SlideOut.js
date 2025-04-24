import settings from '../../lib/settings';
import { events } from '../../../../../../lib/utils';
import { poller } from '../../../../../../lib/uc-lib';

const { ID } = settings;


const panelContent = {
  heading: 'Star review',
  subHeading: 'Nursery interiors for a growing family',
  bodyText: 'With a nursery, there\'s a lot to consider. From the style you choose to the storage space you have to play with. Whatever your nursery looks like, at Mamas & Papas we have furniture and interiors to suit your space style and budget. And to prove it, we asked Erica Weber, from globetrotting family The Worldwide Webers, to create the perfect space for their baby and toddler.',
  quote: '“We knew we needed a few key pieces to accomplish this task. A Changing Top that could fit anything from a baby to a toddler to possibly a middle schooler in case she decides against potty training until university. A comfy but washable (I think we all know why it needs to be washable), gender neutral Luxury Changing Mattress. A Mia Classic Wardrobe to hang her party dresses in, and a Mia Classic Dresser to contain any of his vests that actually make it out of the clean laundry pile.” ',
  image: 'https://dd6zx4ibq538k.cloudfront.net/static/images/4068/8a51dd798bc9b69855d12ad60dda856e_2500_1667.jpeg',
  imageCaption: 'Mia classic cotbed and dresser with changing top',
  linkText: 'Review continued',
  linkURI: 'https://www.mamasandpapas.com/en-gb/discover/home/nursery-interiors-for-a-growing-family',
};

export default class SlideOut {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    /* SLIDE OUT */
    const trigger = document.createElement('input');
    trigger.id = 'panelTrigger';
    trigger.name = 'panelTrigger';
    trigger.type = 'checkbox';
    document.querySelector('body').insertAdjacentElement('beforeend', trigger);
    const slideOut = document.createElement('div');
    slideOut.classList.add(`${ID}_slideOutWrap`);
    slideOut.innerHTML = `
      <div class="${ID}_slideOut">
        <label class="${ID}_slideOut__closeBtn ico ico-cross" for="panelTrigger"></label>
        <div class="${ID}_slideOut__header">
          <h3 class="${ID}_slideOut__heading">${panelContent.heading}</h3>
          <span class="${ID}_slideOut__subHeading">${panelContent.subHeading}</span>
        </div>
        <div class="${ID}_slideOut__body">
          <p class="${ID}_slideOut__bodyText">${panelContent.bodyText}</p>
          <p class="${ID}_slideOut__quote">${panelContent.quote}</p>
          <img class="${ID}_slideOut__image" src="${panelContent.image}" alt="${panelContent.imageCaption}">
          <span class="${ID}_slideOut__imageCaption">${panelContent.imageCaption}</span>
          <div class="${ID}_slideOut__linkWrap">
            <a class="${ID}_slideOut__link" href="${panelContent.linkURI}">${panelContent.linkText}</a>
          </div>
        </div>
      </div>
    `;
    this.slideOut = slideOut;

    /* TAB */
    /* Change the trigger ID */
    const tab = document.querySelector('.pdp-details').cloneNode(true);
    tab.id = 'PDP-review';
    tab.querySelector('.productDetailPanel').setAttribute('data-slide-id', 'PDP-review');

    /* Set the heading title and subtitle */
    const heading = tab.querySelector('.productDetail_panelHeading');
    heading.innerHTML = 'Check out this star review <span>“spacious but not too big, compact but not too small...”</span>';

    // A site script removes the spans from the above heading HTML
    // Re-run on page load as a workaround
    poller([() => !!window.jQuery], () => {
      window.jQuery(function docReady() {
        setTimeout(() => {
          heading.innerHTML = 'Check out this star review <span>“spacious but not too big, compact but not too small...”</span>';
        }, 2000);
      });
    });

    /* Insert the new text into the element slideOut panel removing the previous one */
    const slideOutBody = tab.querySelector('.productDetail_panelContent');
    slideOutBody.innerHTML = '';
    slideOutBody.innerHTML = `
      <div class="${ID}_slideOut__body">
        <p class="${ID}_slideOut__bodyText">${panelContent.bodyText}</p>
        <p class="${ID}_slideOut__quote">${panelContent.quote}</p>
        <img class="${ID}_slideOut__image" src="${panelContent.image}" alt="${panelContent.imageCaption}">
        <span class="${ID}_slideOut__imageCaption">${panelContent.imageCaption}</span>
        <div class="${ID}_slideOut__linkWrap">
          <a class="${ID}_slideOut__link" href="${panelContent.linkURI}">${panelContent.linkText}</a>
        </div>
      </div>
    `;
    this.tab = tab;
  }

  bindEvents() {
    /* Trigger the same slide panel whether you click on the first Star review or the second */
    this.tab.addEventListener('click', () => {
      document.querySelector('#panelTrigger').click();
      events.send(ID, 'Clicked', 'Star Review PLP');
    });

    this.slideOut.querySelector(`.${ID}_slideOut__link`).addEventListener('click', () => {
      events.send(ID, 'Clicked', 'Review continued');
    });
  }

  render() {
    document.querySelector('#PDP-Details').insertAdjacentElement('beforebegin', this.tab);
    document.querySelector('body').insertAdjacentElement('beforeend', this.slideOut);

    /* Move the .blackout element at the end of the body to use it with the injected slide panel */
    const blackout = document.querySelector('.blackout');
    document.querySelector('body').insertAdjacentElement('beforeend', blackout);
  }
}
