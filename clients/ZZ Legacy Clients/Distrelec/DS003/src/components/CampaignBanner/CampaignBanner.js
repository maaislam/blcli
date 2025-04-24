import settings from '../../lib/settings';

const { ID } = settings;

export default class CampaignBanner {
  constructor(options) {
    const opts = options || {};
    this.bannerImg = opts.bannerImg;
    this.bannerLink = opts.bannerLink;
    this.create();
    this.bindEvents();
    if (opts.render) opts.render(this.component);
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_campaignBannerWrap`);
    element.innerHTML = `
      <a href="${this.bannerLink}" class="${ID}_campaignBanner">
        <img src="${this.bannerImg}" class="${ID}_campaignBanner__img">
      </a>
    `;
    this.component = element;
  }

  bindEvents() {
  }
}
