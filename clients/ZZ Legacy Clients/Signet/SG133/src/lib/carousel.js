/**
 * Carousel for V2
 */

import { pollerLite } from "../../../../../lib/utils";
import { fireEvent, getSiteFromHostname } from "./services";
import shared from "./shared";

export default () => {

    const { ID } = shared;

    const $ = window.jQuery;

    const createCarousel = () => {
        const carousel = document.createElement('div');
        carousel.classList.add(`${ID}-carousel`);
        carousel.innerHTML = `<div class="${ID}-slides"></div>`;
        document.querySelector('.home-tile-grid').insertAdjacentElement('beforebegin', carousel);
    }
    createCarousel();


    const slides = () => {
        let slides;
        const heroSlides = {
            slide3: {
                background: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/F2D12BF9DC1A74D8F605AE0F1C6EAA3775A84667CB620DCD8044F7128D89B811.jpg?meta=/SG133---Homepage-Banner/SIG2004_EJhomepageredesign_650x500_EJSummer.jpg',
                desktopImage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/A7ADFDB21B884E6A4CE5088026F70C6C067748799C52A7F3AC2054465679F556.jpg?meta=/SG133---Homepage-Banner/SIG2004_EJhomepageredesign_1500x500_EJSummer.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/jewellery/select%7csummer+collection/',
            },
            slide1: {
                background: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/968F2064BA899762822381290500C35DA712F7D57E155C5A6F6E162932F60EA6.jpg?meta=/SG080---In-Grid-Content-PLP-New/EJ2106W01_20__BANNER_650x500MONDAY.jpg',
                desktopImage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/6C0853A4E39AD7A6ED4F97E94D984D90430E8C5FF3BD52F7B1EC03B39150E02A.jpg?meta=/SG080---In-Grid-Content-PLP-New/EJ2106W01_20__off_BANNER_1500x500_MONDAY.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/select%7csummer+styles/?icid=ej-hp-20pc-summer-collection',
            },
            slide2: {
                background: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/AE223F62A8FE7716EE1871064CDE362F9825C5C3BCD030C22C673C2DA2A23DE6.jpg?meta=/SG080---In-Grid-Content-PLP-New/650x500_EJ2106W02_LEVIAN_TRUNKSHOW_RESIZE.jpg',
                desktopImage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/31B3EE5DCF3F7F9371B963CC63E2D229E77F94795E0DEB3DC99F1524C42BC3DD.jpg?meta=/SG080---In-Grid-Content-PLP-New/1500x500_EJ2106W02_LEVIAN_TRUNKSHOW_RESIZE.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/content/le-vian-trunk-show/?icid=ej-trunk-show',
            },
           
        }
        const HSheroSlides = {
            
            slide2: { // rings
                background: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/B900040A93C80A3C9FA90F30FDAF8A6BDB21011ECB3E80EE39A5AD9D889ED813.jpg?meta=/SG133---Homepage-Banner/HS_Homepageredesign650x500_M1Variation3.jpg',
                desktopImage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/A47F1158AF72F954AD26034DF62C118AEA2608B2125FB5DEB90B6D0FF77CD905.jpg?meta=/SG133---Homepage-Banner/HS_Homepageredesign1500x500_DT1Variation3.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/select%7csale/',
            },
            /*slide3: { // book
                background: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/576A8211667080AEB7414040A2C7873B424D1EBDBE677F3F2B3744DA86CB7004.jpg?meta=/SG133---Homepage-Banner/HS_Homepageredesign650x500_M2Variation3.jpg',
                desktopImage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/480F9E02D29E627B43D1C41591B8654F247F5F815E2CDA2C91FC7F6158362D0E.jpg?meta=/SG133---Homepage-Banner/HS_Homepageredesign1500x500_DT2Variation3.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/content/appointment-booking/',
            },*/
            slide1: { // watches
                background: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/B37CDDA700B68B3E213069D21BD447F3B56E23FFCE3255289937697C24BB9B7C.jpg?meta=/SG133---Homepage-Banner/HS_Homepageredesign650x500_M3Variation3-1.jpg',
                desktopImage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5252E6A7486D69890FBC8C2F3C3CECD49AED286F4F183E023E7CC98037ED9A30.jpg?meta=/SG133---Homepage-Banner/HS_Homepageredesign1500x500_DT3Variation3.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/watches/select%7csale/',
            },
           
        }
    
        if(getSiteFromHostname() === 'ernestjones') {
            slides = heroSlides;
        } else {
            slides = HSheroSlides;
        }

        Object.keys(slides).forEach((i) => {
            const data = slides[i];
            const slide = document.createElement('div');
            slide.classList.add(`${ID}__slide`);
            if(window.innerWidth >= 1024) {
                slide.setAttribute('style', `background-image: url(${data.desktopImage}})`);
            } else {
                slide.setAttribute('style', `background-image: url(${data.background}})`);
            }

            slide.innerHTML = 
            `<a href="${data.link}"></a>`;
        
            document.querySelector(`.${ID}-carousel .${ID}-slides`).appendChild(slide);
        });
    }
    slides();

    const slickCarousel = () => {
        const init = () => {
            window.jQuery(`.${ID}-slides`).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 7000,
                fade: true,
                pauseOnHover: true,
                rows: 0,
                cssEase: 'linear',
                mobileFirst: true,
                responsive: [
                    {
                    breakpoint: 1023,
                    settings: {
                        arrows: true,
                    }
                    },
                ]
            });
        }
        if(window.jQuery && window.jQuery.fn.slick) {
            init();
          } else {
            window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
              init();
            });
        }
    }
    slickCarousel();

    const hoverCarousel = () => {
        // prevent mouse out triggering on child
        const slider = document.querySelector(`.${ID}-carousel`);
        slider.querySelector('.slick-track').onmouseout=function(e){
            let obj = e.relatedTarget;
            while(obj!=null){
                if(obj==this){
                    return;
                }
                obj = obj.parentNode;
            }
            slider.querySelector('.slick-dots .slick-active').classList.remove(`${ID}-pauseAnim`);
        }
       
        slider.querySelector('.slick-track').addEventListener('mouseover', (e) => {
           slider.querySelector('.slick-dots .slick-active').classList.add(`${ID}-pauseAnim`);
        });
    }

    const carouselTracking = () => {
        const allSlides = document.querySelectorAll(`.${ID}-slides .${ID}__slide`);
        for (let index = 0; index < allSlides.length; index += 1) {
            const element = allSlides[index];
            if(element) {
                element.querySelector('a').addEventListener('click', () => {
                    fireEvent('Clicked Carousel Image ' + index);
                });
            }
        }
    }

    if(window.innerWidth > 1024) {
        pollerLite([`.${ID}-carousel .slick-track`], () => {
            hoverCarousel();
        });
       
    }

    carouselTracking();
}