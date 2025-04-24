import settings from '../../lib/settings';

const { ID } = settings;

export default class ImportTool {
  constructor() {
    this.create();
    this.bindEvents();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_importToolWrap`);
    element.innerHTML = `
    <div class="${ID}_importTool">
      <h3 class="${ID}_importTool__title">Import Tool Upload</h3>
      <p class="${ID}_importTool__content">You can now upload all your product requirements in one go. Simply copy and paste, use your own file.</p>
      <div class="${ID}_importTool__buttonWrap">
        <a href="/import-tool" class="${ID}_importTool__button">Upload Now</a>
      </div>
      <img class="${ID}_importTool__img " src="https://dxlfb468n8ekd.cloudfront.net/gsc/4UA12F/b1/ab/17/b1ab174adb7145328f734982ad466482/images/search_logged_out/u36.png?token=971946363a82494dfc6f4d20515cfd47">
  </div>
  `;
    this.component = element;
  }

  bindEvents() {
  };
}
