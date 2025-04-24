import shared from "./shared";

const { ID } = shared;

export default class ScarcityBar {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {

    const brandName = document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/);
    const element = document.createElement('div');
    element.classList.add(`${ID}_scarcityBar`);
    
    element.innerHTML = `
    <div class="${ID}-smallerLoader"></div>
    <p></p>`
    this.component = element;

    element.querySelector('p').innerHTML =  `Hurry! We’ve already sold out of <b>6</b> ${brandName[0]} products`;

    setTimeout(() => {
        element.classList.add(`${ID}-animatedLoader`);
        element.querySelector('p').classList.add(`${ID}-pulseText`);
        element.querySelector('p').innerHTML = 'Checking stock'
    }, 5000);


    setTimeout(() => {
    element.querySelector('p').classList.remove(`${ID}-pulseText`);
    element.querySelector('p').innerHTML = 'This product is selling fast!';
    }, 9000);
  }

  bindEvents() {
    const { component } = this;

    const brandName = document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/);
    sessionStorage.setItem(`${ID}-brand`, brandName[0]);
  }

  render() {
    const { component } = this;
    const productGallery = document.querySelector('.gallery-placeholder');
    productGallery.insertAdjacentElement('beforebegin', component);
  }
}
