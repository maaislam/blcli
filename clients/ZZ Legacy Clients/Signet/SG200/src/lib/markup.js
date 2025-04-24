import shared from "../../../../../core-files/shared"
import { departmentData } from "./data";
import { createCarousel, pageType } from "./helpers";


    const { ID } = shared;

    export default class Markup {
        constructor() {
          this.create();
          this.bindEvents();
          this.render();
        }
      
        create() {

         const data = departmentData[pageType()];

          const element = document.createElement('div');
          element.className = `${ID}-pageContent ${pageType()}`;
          element.innerHTML = `

          ${pageType() === 'watches' ? `
          <section class="${ID}-banner">
            <div class="${ID}-banner-text">
                <h1>${data.title}</h1>
                <p>${data.headerText}</p>
                <div class="${ID}-quickLinks">
                ${data.quickLinks.map((item) =>`<a class="${ID}-textLink" href="${item.link}">${item.text}</a>`).join("")}
                </div>
            </div>
          </section>` : 
          `<section class="${ID}-header">
              <div class="${ID}-header-text">
                <h1>${data.title}</h1>
                <p>${data.headerText}</p>
                <div class="${ID}-quickLinks">
                    ${data.quickLinks.map((item) =>`<a class="${ID}-textLink" href="${item.link}">${item.text}</a>`).join("")}
                </div>
              </div>
          </section>
          `}

          ${pageType() !== 'watches' ? `
          <section class="${ID}-catbanner">
            <div class="${ID}-banner-text">
                <h2>${data.banner.title}</h2>
                <p>${data.banner.text}</p>
                <a href="${data.banner.link}" class="${ID}-cta primary">Shop now</a>
            </div>
          </section>` : ''}

            <section class="${ID}-categories">
                <div class="${ID}-container">
                    <h2 class="title">${data.categoriesTitle}</h2>
                    <div class="${ID}-categoriesWrap">
                        ${data.categories.map((cat) =>
                        `<div class="${ID}-category">
                            <a class="fullLink" href="${cat.link}"></a>
                            <div class="${ID}-image" style="background-image:url(${cat.image})"></div>
                            <h3><a href="${cat.link}">${cat.text}</a></h3>
                        </div>`
                        ).join("")}
                    </div>
                </div>
            </section>

            ${pageType() === 'watches' ? 
            `<section class="${ID}-gift">
                    <div class="${ID}-container">
                        <div class="${ID}-row">
                            <div class="${ID}-image" style="background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/b2fb4c80-c54e-11ec-bba3-b228874b6b42)"></div>
                            <div class="${ID}-textBlock">
                                    <h2>Complimentary gift with purchase</h2>
                                    <p>Receive a complimentary Wolf Watch Roll when you spend £1500 on a single watch or receive a complimentary Wolf Watch winder if you spend £2000 or more on a single watch.</p>
                                    <div class="${ID}-ctas">
                                        <a href="https://www.ernestjones.co.uk/webstore/l/luxury-watches/" class="${ID}-cta primary">Shop now</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>` 
            : ''}

            ${pageType() === 'watches' ? 
            `<section class="${ID}-brands">
                    <div class="${ID}-container">
                        <h2 class="title">${data.brandHeading}</h2>
                        <div class="${ID}-brandsWrap">
                            ${data.brands.map((brand) =>
                            `<div class="${ID}-brand">
                                <a class="fullLink" href="${brand.link}"></a> 
                                <div class="${ID}-image" style="background-image: url(${brand.image})"></div> 
                            </div>`
                            ).join("")}
                        </div>
                    </div>
                </div>
            </section>` 
            : ''}

            ${pageType() === 'watches' || pageType() === 'engagement' ? 
            `<section class="${ID}-appointment">
                    <div class="${ID}-container">
                        <div class="${ID}-row">
                            <div class="${ID}-image"></div>
                            <div class="${ID}-textBlock">
                                
                                    <h2>${data.appointment.title}</h2>
                                    <p>${data.appointment.text}</p>
                                    <div class="${ID}-ctas">
                                        <a href="https://www.ernestjones.co.uk/webstore/in-store-appointment.cdo?icid=ej-fn-appointment" class="${ID}-cta primary">Book now</a>
                                        <a href="https://customer.bookingbug.com/?client=ernest_jones&service=48321&company=37397" class="${ID}-cta secondary">Talk to an expert</a>
                                    </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </section>` 
            : ''}

            ${pageType() !== 'watches' ? 
            `<section class="${ID}-contentSlots">
                    <div class="${ID}-container">
                        ${data.contentSpots.map((block) =>
                        `<div class="${ID}-contentBlock">
                            <a class="fullLink" href="${block.link}"></a>
                            <div class="${ID}-image" style="background-image: url(${block.image})"></div>
                            <div class="${ID}-textBlock">
                                <h2>${block.title}</h2>
                                <p>${block.text}</p>
                                <a href="${block.link}" class="${ID}-cta secondary">Shop now</a>
                            </div>
                        </div>`
                        ).join("")}
                    </div>
                </div>
            </section>` 
            : ''}

            ${pageType() !== 'watches' ? 
            `<section class="${ID}-brands">
                    <div class="${ID}-container">
                        <h2 class="title">${data.brandHeading}</h2>
                        <div class="${ID}-row">
                            <div class="${ID}-brandsWrap">
                                ${data.brands.map((brand) =>
                                `<div class="${ID}-brand">
                                    <a href="${brand.link}"></a> 
                                    <div class="${ID}-image" style="background-image:url(${brand.image})"></div> 
                                </div>`
                                ).join("")}
                            </div>
                            <div class="${ID}-spotlightBrand">
                                    <div class="${ID}-image" style="background-image:url(${data.spotlightBrand.image})"></div>
                                    <div class="${ID}-textBlock">
                                        <h2>${data.spotlightBrand.title}</h2>
                                        <p>${data.spotlightBrand.text}</p>
                                        <a href="${data.spotlightBrand.link}" class="${ID}-cta secondary">Shop ${data.spotlightBrand.brandName}</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>` 
            : ''}

            <section class="${ID}-articles">
                <div class="${ID}-container">
                   
                        ${data.articleSpots.map((article) =>
                        `<div class="${ID}-contentBlock">
                            <a class="fullLink" href="${article.link}"></a>
                            <div class="${ID}-image" style="background-image:url(${article.image})"></div>
                            <div class="${ID}-textBlock">
                                <h2 class="alternate">${article.title}</h2>
                                <p>${article.text}</p>
                                <a href="${article.link}" class="${ID}-cta secondary">${article.linkTitle}</a>
                            </div>
                        </div>`
                        ).join("")}
              
                </div>
            </section>

            ${pageType() == 'watches' || pageType == 'engagement' ? 
            `<section class="${ID}-brandFeature">
                <div class="${ID}-container">
                    <div class="${ID}-row">
                        <div class="${ID}-image" style="background-image:url(${data.spotlightBrand.image})"></div>
                        <div class="${ID}-brandInfo">
                            <div class="${ID}-textBlock">
                                <h2>${data.spotlightBrand.title}</h2>
                                <p>${data.spotlightBrand.text}</p>
                                <a href="${data.spotlightBrand.link}" class="${ID}-cta primary">Shop now</a>
                            </div>
                            <div class="${ID}-carContainer">
                                <div class="${ID}-carousel">
                                    <div class="swiper-wrapper">
                                        ${data.spotlightBrand.products.map((product) =>
                                            `<div class="${ID}-product swiper-slide">
                                                <a class="fullLink" href="${product.link}"></a>
                                                <div class="${ID}-image" style="background-image:url(${product.image})"></div>
                                                <div class="${ID}-info">
                                                    <p>${product.brand}</p>
                                                    <h4>${product.text}</h4>
                                                    <div class="${ID}-price">
                                                        <span>${product.price}</span>
                                                    </div>
                                                </div>
                                            </div>`
                                            ).join("")}
                                    </div>
                                </div>
                                <div class="${ID}-swiperNext swiper-button-next"></div>
                                <div class="${ID}-swiperPrev swiper-button-prev"></div>
                                <div class="${ID}-swiperScroll swiper-scrollbar"></div>
                            </div>
                        </div>
                    </div>
                </div>    
            </section>` 
            : ''}

            ${pageType() !== 'watches' ? 
            `<section class="${ID}-emailSignUp"></section>` 
            : ''}

            ${pageType() == 'watches' ? `<section class="${ID}-brandContent"></section>` : ''}

            <section class="${ID}-seoContent">
                <div class="${ID}-container">
                    <p></p>
                </div>
            </section>

           
          `;
          
         this.component = element;

         if(pageType() !== 'watches') {

            const emailBox = document.querySelector('.email-sign-up');
            emailBox.querySelector('.email-sign-up__title').textContent = 'Get 10% off!';
            emailBox.querySelector('.button.email-sign-up__submit').insertAdjacentElement('afterend', emailBox.querySelector('.email-sign-up__text--small'));
            emailBox.querySelector('.email-sign-up__text').innerHTML = `Sign up to our newsletter to receive a 10% off code to use on your next purchase`;
            emailBox.querySelector('.email-sign-up__policy-label span').innerHTML = `I accept the privacy policy. You can read the privacy policy <a href="https://www.ernestjones.co.uk/privacy-policy/">here</a>`;
            emailBox.querySelector('.email-sign-up__text--small').innerHTML = `Exclusions apply - <a class="email-sign-up__link-interaction" href="/terms/">see terms and conditions</a> for details. If you wish to <a href="/webstore/secure/responsys/unsubscribe.sdo" class="email-sign-up__link">unsubscribe from our emails please <span class="email-sign-up__link-interaction">click here</span></a>`;
           
            element.querySelector(`.${ID}-emailSignUp`).appendChild(emailBox);
         } else {
            // move tmcontent

            const brandBanner = document.querySelector('.single-image-block');
            const fullBrandBanner = document.querySelector('.divider-image.divider-image--full-width.divider-image--text-left');
            const brandBlocks = document.querySelectorAll('.card-grid.card-grid--3-cards')[2];
            const bottomBanner =  document.querySelectorAll('.single-image-block')[1];
            element.querySelector(`.${ID}-brandContent`).appendChild(brandBanner);
            element.querySelector(`.${ID}-brandContent`).appendChild(fullBrandBanner);
            element.querySelector(`.${ID}-brandContent`).appendChild(brandBlocks);
            element.querySelector(`.${ID}-brandContent`).appendChild(bottomBanner);
            
         }

         const seoText = document.querySelector('.seo-text-block__text-container.seo-text-block__text-container--reveal');
         if(seoText) {
             element.querySelector(`.${ID}-seoContent p`).innerHTML = seoText.innerHTML;
         }

        
          
        }
      
        bindEvents() {
          const { component } = this;

        }
      
        render() {
          const { component } = this;
          document.querySelector('#access-content').insertAdjacentElement('beforebegin', component);
    
          if(pageType() === 'watches') {

            const loadScript = (scriptUrl) => {
                const script = document.createElement('script');
                script.src = scriptUrl;
                document.head.appendChild(script);
                
                return new Promise((res, rej) => {
                  script.onload = function() {
                    res();
                  }
                  script.onerror = function () {
                    rej();
                  }
                });
            }
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.0.7/swiper-bundle.min.js').then(() => {
                if(typeof window.Swiper !== 'undefined') {
                    createCarousel(`.${ID}-brandFeature`);
                }
            });
          }
        }
      }

   

    

