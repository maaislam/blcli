import shared from "./shared";

const { ID } = shared;

export default class PageMarkup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-content`);

      element.innerHTML = `
        <div class="${ID}-banner ${ID}-hero ${ID}-carouselBanner">
            <div class="${ID}-textRow">
                <div class="${ID}-buttonContainer">
                    <div class="${ID}-bannerImage"></div>
                    <div class="${ID}-button"><a href="https://www.hotelchocolat.com/uk/shop/summer/">Shop the summer collection</a></div>
                </div>
            </div>
            <div class="${ID}-carousel"></div>
        </div>

        <div class="${ID}-container">
            <div class="${ID}-section ${ID}-categories">
                <div class="${ID}-titleBlock">
                    <h2 class="${ID}-h2">Chocolate Gifts & Luxury Presents</h2>
                    <p class="${ID}-p">Whether you're looking for boxed chocolates, luxury gifts, or giant chocolate slabs for birthdays, anniversaries, celebrations or even apologies - you'll find it here. Our chocolate is delivered next-day or click & collect. Original, authentic, ethical. Our three guiding principles have taken us to over 150 chocolate shops, cafe's & restaurants and even a cocoa estate hotel.</p>  
                </div>
                <div class="${ID}-categoryBlocks ${ID}-main"></div>
            </div>
        </div>

        <div class="${ID}-banner ${ID}-gift ${ID}-carouselBanner">
        <div class="${ID}-bannerImage"></div>
            <div class="${ID}-textRow">
                <div class="${ID}-titleText">
                    <h2 class="${ID}-h2">Say it with a Gift Sleeve</h2>
                    <p class="${ID}-p">Personalise their favourite Luxe, Sleekster or H-Box selection by adding a complimenetary Gift Sleeve.</p>  
                    <div class="${ID}-button"><a href="https://www.hotelchocolat.com/uk/shop/collections/products/chocolate-box/">Choose their favourite</a></div>
                </div>
            </div>
            <div class="${ID}-carousel"></div>
        </div>

        <div class="${ID}-container">
            <div class="${ID}-section ${ID}-categories">
                <div class="${ID}-categoryBlocks ${ID}-gift"></div>
            </div>
            <div class="${ID}-section ${ID}-discover">
                <h2 class="${ID}-h2">Discover</h2>
                <div class="${ID}-banner ${ID}-beauty">
                    <a href="https://rabot1745beauty.com/collections?referrer=HC">
                    <img class="${ID}-bannerMobile" src="https://editor-assets.abtasty.com/48343/5f0c52c67a5221594643142.png"/>
                    <img class="${ID}-bannerDesktop" src="https://editor-assets.abtasty.com/48343/5f0c50d4d15c41594642644.png"/>
                    </a>
                </div>
                <div class="${ID}-categoryBlocks"></div>
            </div>
        </div>

        <div class="${ID}-banner ${ID}-ethics">
            <div class="${ID}-bannerContent">
                <h2 class="${ID}-h2">Our Ethical Business</h2>
                <p class="${ID}-p">Getting stuck in. Doing the right thing, not just saying it.</p>
                <div class="${ID}-button"><a href="https://www.hotelchocolat.com/uk/engaged-ethics.html">Find out more</a></div>
            </div>
        </div>

        <div class="${ID}-container">
            <div class="${ID}-section ${ID}-recommended">
                <h4 class="${ID}-h4">Recommendations and Customer Favourites...</h4>
                <div class="${ID}-carousel"></div>
            </div>
        </div>
      `;
     /* element.innerHTML = `
        <div class="${ID}-banner ${ID}-hero ${ID}-carouselBanner">
            <div class="${ID}-textRow">
                <div class="${ID}-buttonContainer">
                    <div class="${ID}-bannerImage"></div>
                    <div class="${ID}-button"><a href="#">Shop the summer collection</a></div>
                </div>
            </div>
            <div class="${ID}-carousel"></div>
        </div>

        <div class="${ID}-container">
            <div class="${ID}-section ${ID}-categories">
                <div class="${ID}-titleBlock">
                    <h2 class="${ID}-h2">Chocolate Gifts & Luxury Presents</h2>
                    <p class="${ID}-p">Whether you're looking for boxed chocolates, luxury gifts, or giant chocolate slabs for birthdays, anniversaries, celebrations or even apologies - you'll find it here. Our chocolate is delivered next-day or click & collect. Original, authentic, ethical. Our three guiding principles have taken us to over 150 chocolate shops, cafe's & restaurants and even a cocoa estate hotel.</p>  
                </div>
                <div class="${ID}-categoryBlocks ${ID}-main"></div>
            </div>

            <div class="${ID}-section ${ID}-giftFinder">
                <div class="${ID}-giftFinderContent">
                    <h3 class="${ID}-h3">The Gift Finder</h3>
                    <div class="${ID}-finderButton">
                        <span>3 Quick Questions...</span>
                        <div class="${ID}-button"><a href="#">Let's go!</a></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="${ID}-banner ${ID}-gift ${ID}-carouselBanner">
        <div class="${ID}-bannerImage"></div>
            <div class="${ID}-textRow">
                <div class="${ID}-titleText">
                    <h2 class="${ID}-h2">Say it with a Gift Sleeve</h2>
                    <p class="${ID}-p">Personalise their favourite Luxe, Sleekster or H-Box selection by adding a complimenetary Gift Sleeve.</p>  
                    <div class="${ID}-button"><a href="#">Choose their favourite</a></div>
                </div>
            </div>
            <div class="${ID}-carousel"></div>
        </div>

        <div class="${ID}-container">
            <div class="${ID}-section ${ID}-categories">
                <div class="${ID}-categoryBlocks ${ID}-gift"></div>
            </div>
            <div class="${ID}-section ${ID}-discover">
                <h2 class="${ID}-h2">Discover</h2>
                <div class="${ID}-categoryBlocks"></div>
            </div>
        </div>

        <div class="${ID}-banner ${ID}-ethics">
            <div class="${ID}-bannerContent">
                <h2 class="${ID}-h2">Our Ethical Business</h2>
                <p class="${ID}-p">Getting stuck in. Doing the right thing, not just saying it.</p>
                <div class="${ID}-button"><a href="#">Find out more</a></div>
            </div>
        </div>

        <div class="${ID}-container">
            <div class="${ID}-section ${ID}-recommended">
                <h4 class="${ID}-h4">Recommendations and Customer Favourites...</h4>
                <div class="${ID}-carousel"></div>
            </div>
        </div>
      `;*/
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector('#wrapper #main').insertAdjacentElement('beforebegin', component);
    }
  }
  
