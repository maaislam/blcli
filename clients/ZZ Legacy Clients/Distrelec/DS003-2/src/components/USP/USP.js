import settings from '../../lib/settings';

const { ID } = settings;

export default class USP {
  constructor() {
    this.create();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_USP`);
    element.innerHTML = `
      <div class="${ID}_USP__content">
        <div class="${ID}_USP__element">
          <img class="${ID}_USP__elementImg" src="https://d2t44wh9rnwl5y.cloudfront.net/gsc/4UA12F/b1/ab/17/b1ab174adb7145328f734982ad466482/images/search_logged_out/u43.png?token=5e30ab75dfb8c5cadada125e5f8c12bb">
          <span class="${ID}_USP__elementText">Price Math Promise</span>
        </div>
        <div class="${ID}_USP__element">
          <img class="${ID}_USP__elementImg" src="https://d2t44wh9rnwl5y.cloudfront.net/gsc/4UA12F/b1/ab/17/b1ab174adb7145328f734982ad466482/images/search_logged_out/u49.png?token=b694332963bc73769e790aef065dcaca">
          <span class="${ID}_USP__elementText">Price Promise</span>
        </div>
        <div class="${ID}_USP__element">
          <img class="${ID}_USP__elementImg" src="https://d2t44wh9rnwl5y.cloudfront.net/gsc/4UA12F/b1/ab/17/b1ab174adb7145328f734982ad466482/images/search_logged_out/u40.png?token=570ccf2db7da58f955e6711a95018524">
          <span class="${ID}_USP__elementText">Free Shipping*</span>
        </div>
      </div>
    `;
    this.component = element;
  }
}
