import shared from './shared';

const {ID, VARIATION } = shared;

export default class SelfSelectBanner {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-selectionModal`);
      element.innerHTML = `
        <div class="${ID}-innerContent">
            <div class="${ID}-topContent">
                <div class="${ID}-logo"></div>
                <div class="${ID}-textLink ${ID}-banner" banner-target="all">Shop All</div>
            </div>
           
            <div class="${ID}-banners">
                <div class="${ID}-banner ${ID}-banner-large" banner-target="watches">
                    <div class="${ID}-bannerText">
                        <h3>Watches</h3>
                        <p>Shop all<p>
                    </div>
                </div>
                <div class="${ID}-banner ${ID}-banner-large" banner-target="engagement">
                    <div class="${ID}-bannerText">
                        <h3>Engagement</h3>
                        <p>Shop all<p>
                    </div>
                </div>
                <div class="${ID}-banner ${ID}-banner-large" banner-target="weddings">
                    <div class="${ID}-bannerText">
                        <h3>Weddings</h3>
                        <p>Shop all<p>
                    </div>
                </div>
                <div class="${ID}-banner ${ID}-banner-large" banner-target="jewellery">
                    <div class="${ID}-bannerText">
                        <h3>Jewellery</h3>
                        <p>Shop all<p>
                    </div>
                </div>
            </div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.body.appendChild(component);
      document.body.classList.add(`${ID}-noScroll`);
      
    }
}