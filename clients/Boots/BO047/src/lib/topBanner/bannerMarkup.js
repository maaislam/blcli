import { pollerLite } from "../../../../../../lib/utils";
import shared from "../shared";
import { carouselDataLargeBanners } from "./carouselBannerData";

const { ID } = shared;

export default class HeroBanner {

    
    constructor() {
    this.staticBanner();
      this.bindEvents();
      this.render();
      
      //this.pullInBanners();

      //this.addBanners();
     // this.slickBanners();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-heroBanner`);
      element.innerHTML = `
        <div class="${ID}-container">
            <div class="${ID}-heroCarousel">
                <div class="${ID}-carouselItems"></div>
                <div class="${ID}-productFinder"></div>
            </div>
        </div>`;
      this.component = element;
    }

    // New static banner - Only use this one
    staticBanner () {
        const element = document.createElement('div');
        element.classList.add(`${ID}-staticBanner`);
        element.classList.add(`${ID}-heroBanner`);
        element.innerHTML = `
        <div class="${ID}-content">
            <div class="${ID}-textBlock">
            <h3>Boots Product Finder</h3>
            <p>Find exactly what you’re looking for with our product finder.</p>
            </div>
            <div class="${ID}-actions">
                <div class="${ID}-selectBox ${ID}-department" data-target="${ID}-department">Select a department</div>
                <div class="${ID}-button">Get started</div>
            </div>
        </div>
        <div class="${ID}-productFinder"></div>`;
        this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector('.cm-placement-main .heroCarousel').insertAdjacentElement('beforebegin', component);
      
    }

    pullInBanners () {

        const request = new XMLHttpRequest();
        request.open('GET', 'https://www.boots.com/ab-test-page-optimisation', true);
        request.onload = () => {
            if(request.status >= 200 && request.status < 400) {
                const temp = document.createElement('html');
                temp.innerHTML = request.responseText;

                const carousel = temp.querySelector('.heroCarousel');
            
                if(carousel) {
                    console.log(carousel);
                    document.querySelector(`.${ID}-carouselItems`).appendChild(carousel);
                }
            }
        };
        request.send();

        
        pollerLite([`.${ID}-carouselItems .heroCarousel`], () => {
        // loop through and set the images
            const allSlides = document.querySelectorAll(`.${ID}-carouselItems .heroCarousel .rel img`);
            for (let index = 0; index < allSlides.length; index += 1) {
                const element = allSlides[index];
                const imageSmall = element.getAttribute('data-imagesml');
                const largeImage = element.getAttribute('data-imagelrg');

                if (window.innerWidth >= 767) {
                    element.setAttribute('src', largeImage);
                } else {

                    element.parentNode.setAttribute('style', `background-image:url(${largeImage})`);

                    //element.setAttribute('src', imageSmall);
                }
            }
            window.jQuery(`.${ID}-carouselItems .heroCarousel`).slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
            });
        });

    }

    addBanners () {
        const { component } = this;
        /**
         * get content from datalayer
         */
        const el = window.dataLayer;

        Object.keys(el).forEach((i) => {
            if(el[i].event === 'CreateBanners') {
                const data = el[i];
                
                const banners = 
                `<div class="${ID}-slide" style="${window.innerWidth > 767 ? `background-image:url(${data.banner1.imgsrc})` : `background-color: ${data.banner1.colour}`}">
                    <a class="${ID}-bannerLink" href="${data.banner1.link}"></a>
                    <div class="${ID}-textContent"> 
                        <h3 ${data.banner1.textColour ? `style="color:${data.banner1.textColour }"`: ''}>${data.banner1.header}</h3>
                        <p ${data.banner1.textColour ? `style="color:${data.banner1.textColour }"`: ''}>${data.banner1.text}</p>
                        <a href="${data.banner1.link}" class="${ID}-textLink"${data.banner1.textColour  ? `style="color:${data.banner1.textColour}"`: ''}>${data.banner1.linktext}</a>
                    </div>
                </div>
                
                <div class="${ID}-slide" style="${window.innerWidth > 767 ? `background-image:url(${data.banner2.imgsrc})` : `background-color: ${data.banner2.colour}`}">
                    <a class="${ID}-bannerLink" href="${data.banner2.link}"></a>
                    <div class="${ID}-textContent"> 
                        <h3 ${data.banner2.textColour ? `style="color:${data.banner2.textColour }"`: ''}>${data.banner2.header}</h3>
                        <p ${data.banner2.textColour ? `style="color:${data.banner2.textColour }"`: ''}>${data.banner2.text}</p>
                        <a href="${data.banner2.link}" class="${ID}-textLink"${data.banner2.textColour  ? `style="color:${data.banner2.textColour}"`: ''}>${data.banner2.linktext}</a>
                    </div>
                </div>
                
                <div class="${ID}-slide" style="${window.innerWidth > 767 ? `background-image:url(${data.banner3.imgsrc})` : `background-color: ${data.banner3.colour}`}">
                    <a class="${ID}-bannerLink" href="${data.banner3.link}"></a>
                    <div class="${ID}-textContent"> 
                        <h3 ${data.banner3.textColour ? `style="color:${data.banner3.textColour }"`: ''}>${data.banner3.header}</h3>
                        <p ${data.banner3.textColour ? `style="color:${data.banner3.textColour }"`: ''}>${data.banner3.text}</p>
                        <a href="${data.banner3.link}" class="${ID}-textLink"${data.banner3.textColour  ? `style="color:${data.banner3.textColour}"`: ''}>${data.banner3.linktext}</a>
                    </div>
                </div>
                
                <div class="${ID}-slide" style="${window.innerWidth > 767 ? `background-image:url(${data.banner4.imgsrc})` : `background-color: ${data.banner4.colour}`}">
                    <a class="${ID}-bannerLink" href="${data.banner4.link}"></a>
                    <div class="${ID}-textContent"> 
                        <h3 ${data.banner4.textColour ? `style="color:${data.banner4.textColour }"`: ''}>${data.banner4.header}</h3>
                        <p ${data.banner4.textColour ? `style="color:${data.banner4.textColour }"`: ''}>${data.banner4.text}</p>
                        <a href="${data.banner4.link}" class="${ID}-textLink"${data.banner4.textColour  ? `style="color:${data.banner4.textColour}"`: ''}>${data.banner1.linktext}</a>
                    </div>
                </div>
                
                <div class="${ID}-slide" style="${window.innerWidth > 767 ? `background-image:url(${data.banner5.imgsrc})` : `background-color: ${data.banner5.colour}`}">
                    <a class="${ID}-bannerLink" href="${data.banner5.link}"></a>
                    <div class="${ID}-textContent"> 
                        <h3 ${data.banner5.textColour ? `style="color:${data.banner5.textColour }"`: ''}>${data.banner5.header}</h3>
                        <p ${data.banner5.textColour ? `style="color:${data.banner5.textColour }"`: ''}>${data.banner5.text}</p>
                        <a href="${data.banner5.link}" class="${ID}-textLink"${data.banner5.textColour  ? `style="color:${data.banner5.textColour}"`: ''}>${data.banner5.linktext}</a>
                    </div>
                </div>`;

                component.querySelector(`.${ID}-heroCarousel .${ID}-carouselItems`).innerHTML = banners;
            }
        });
          
    }

    slickBanners () {
        
        const { component } = this;

        const $ = window.jQuery;
        
        $(`.${ID}-heroCarousel .${ID}-carouselItems`).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 7000,
            mobileFirst: true,
            responsive: [
                {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                }
                },
            ]
        });   
    }
  }
  
