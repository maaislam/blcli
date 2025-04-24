import shared from "./shared";

const { ID } = shared;

export default class PageMarkup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

        const videoSkus = {
            
            '1562142': {
                video: 'https://player.vimeo.com/video/584893780?title=0&byline=0&portrait=0'
            }, 
            '1561731': {
                video: 'https://player.vimeo.com/video/584893666?title=0&byline=0&portrait=0'
            }, 
            '1561340': {
                video: 'https://player.vimeo.com/video/584893533?title=0&byline=0&portrait=0'
            }, 
            '1560646': {
                video: 'https://player.vimeo.com/video/584893383?title=0&byline=0&portrait=0'
            }, 
            '1559982': {
                video: 'https://player.vimeo.com/video/584892463?title=0&byline=0&portrait=0'
            }, 
            '1563661': {
                video: 'https://player.vimeo.com/video/584903242?title=0&byline=0&portrait=0'
            }, 
            '1563459': {
                video: 'https://player.vimeo.com/video/584903117?title=0&byline=0&portrait=0'
            }, 
            '1563289': {
                video: 'https://player.vimeo.com/video/584902921?title=0&byline=0&portrait=0'
            }, 
            '1562800': {
                video: 'https://player.vimeo.com/video/584902735?title=0&byline=0&portrait=0'
            }, 
            '1562533': {
                video: 'https://player.vimeo.com/video/584902558?title=0&byline=0&portrait=0'
            }, 

        }

        const hasVideo = () => {
            const sku = window.digitalData.product[0].productInfo.masterSku;
            if(videoSkus[sku] && videoSkus[sku].video) {
                return videoSkus[sku].video;
            }
        }


        // get product details
        const brand = window.digitalData.product[0].productInfo.brand;
        const productTitle = window.digitalData.product[0].productInfo.productName.replace(brand, '').trim();
        const price = window.digitalData.product[0].price.currentPrice;
        const mainImage = document.querySelector('.product-gallery__image').getAttribute('src');
        const secondImage = document.querySelectorAll('.product-gallery__image')[1].getAttribute('src');
        const description = document.querySelector('.s-product-description-markdown').innerHTML.replace('-', '');

        // check for certified diamond
        const isCertified = () => {
            if (document.querySelector('.product-description__certified-diamond')) {
                const certText = document.querySelector('.product-description__certified-diamond').textContent;
                if (certText && (certText.indexOf('Certificated diamond') > -1)) {
                    return true;
                }
            } else {
                const hsCertText = document.querySelectorAll('.product-properties__property-text');
                for (let index = 0; index < hsCertText.length; index++) {
                    const element = hsCertText[index];
                    var pdpText = element.textContent;

                    if (pdpText && (pdpText.indexOf('Certificated diamond') > -1)) {
                        return true;
                    }
                }
            }
        }

        const hasDiamondLabel = () => {
            //The centre stone is certified by De Beers Group.
            if (document.querySelector('.s-product-description-markdown')) {
                const descText = document.querySelector('.s-product-description-markdown').innerText;
                if (descText && (descText.indexOf('certified by De Beers Group') > -1)) {
                    return true;
                }
            } 
        }

        const element = document.createElement('div');
        element.classList.add(`${ID}-main`);
        element.innerHTML = `
            <div class="${ID}-section ${ID}-intro">
                <div class="${ID}-container">
                    <div class="${ID}-introText">
                        <div class="${ID}-inner">
                            <h2>${brand}</h2>
                            <p>${productTitle}</p>
                            <span class="${ID}-price">£${price}</span>
                            <div class="${ID}-buttons">
                                <div class="${ID}-button ${ID}-white">Learn more</div>
                                <div class="${ID}-button ${ID}-whiteBorder">Shop now</div>
                            </div>
                        </div>
                        <div class="${ID}-mainImage ${hasDiamondLabel() ? `${ID}-labelImage` : ''}" style="background-image:url(${mainImage})" ${window.innerWidth > 767 ? `data-aos="zoom-in" data-aos-duration="3500"` : ''}></div>
                    </div>
                   
                </div>
            </div>
            <div class="${ID}-section ${ID}-ecom">
                <div class="${ID}-container">
                    <div class="${ID}-imageWrap">
                        <div class="${ID}-mainImage">
                            <div class="${ID}-topCarousel">
                                <div class="swiper-container">
                                    <div class="swiper-wrapper"></div>
                                    <div class="swiper-pagination ${ID}-sliderPagination"></div>
                                </div>
                                <div class="${ID}-swiperArrow swiper-button-prev"></div>
                                <div class="${ID}-swiperArrow swiper-button-next"></div>
                            </div>
                        </div>
                        <div class="${ID}-seeSimilar"></div>
                        <div class="${ID}-tangiblee"></div>
                    </div>
                    <div class="${ID}-productEcom">
                        <h2>${brand}</h2>
                        <p>${productTitle}</p>
                        <div class="${ID}-details"></div>
                    </div>
                </div>
            </div>
            <div class="${ID}-section ${ID}-textBlock" ${window.innerWidth > 767 ? `data-aos="fade-up"` : ''}>
                <div class="${ID}-container">
                    <div class="${ID}-textImage"></div>
                </div>
            </div>
            <div class="${ID}-section ${ID}-description">
                <div class="${ID}-container">
                    <div class="${ID}-mainImage" style="background-image:url(${secondImage})" ${window.innerWidth > 767 ? `data-aos="fade-right"` : ''}></div>
                    <div class="${ID}-paragraph" ${window.innerWidth > 767 ? `data-aos="fade-left"` : ''}>${description}</div>
                </div>
            </div>

            ${hasVideo() !== undefined ? `}
            <div class="${ID}-section ${ID}-video" ${window.innerWidth > 767 ? `data-aos="fade-up"` : ''}>
            <div class="${ID}-container">
                <h3>Diamond Cut From The Stars</h3>
                    <div class="${ID}-videoContainer">  
                            <iframe src="${hasVideo()}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen"></iframe>
                    </div>
            </div>
            `: ''}

            <div class="${ID}-section ${ID}-carousel">
                <div class="${ID}-container">
                    <div class="${ID}-mainCarousel">
                        <div class="swiper-container">
                            <div class="swiper-wrapper"></div>
                            <div class="swiper-pagination ${ID}-sliderPagination"></div>
                        </div>
                        <div class="${ID}-swiperArrow swiper-button-prev"></div>
                        <div class="${ID}-swiperArrow swiper-button-next"></div>
                    </div>
                </div>
            </div>
            ${isCertified() ? `
                <div class="${ID}-section ${ID}-certified" ${window.innerWidth > 767 ? `data-aos="fade-up"` : ''}>
                    <div class="${ID}-container">
                        <div class="${ID}-textImage"></div>
                    </div>
             </div>`  : ''}
            <div class="${ID}-section ${ID}-specs">
                <div class="${ID}-container">
                    <div class="${ID}-specWrapper">
                        <h3>Ring specifications</h3>
                    </div>
                    <div class="${ID}-specImage" style="background-image:url(${mainImage})"></div>
                </div>
            </div>
            <div class="${ID}-section ${ID}-booking"></div>
            
            
            <div class="${ID}-section ${ID}-articles">
                <div class="${ID}-container">
                </div>
            </div>
        `;
        this.component = element;

        const productDetails = document.querySelector('.detail-page__right-column');
        element.querySelector(`.${ID}-productEcom .${ID}-details`).appendChild(productDetails);

        const tangiblee = document.querySelector('.tangiblee-button')
        if(tangiblee) {
            element.querySelector(`.${ID}-tangiblee`).appendChild(tangiblee);
        }
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector(`#access-content`).insertAdjacentElement('afterbegin', component);
      
    }
  }
