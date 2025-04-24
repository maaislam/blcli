import shared from "../shared";

export default () => {

    const { ID } = shared;

    const $ = window.jQuery;


    const slides = () => {
        const heroSlides = {
            slide1: {
                background: '#',
                heading: 'Save up to half price',
                innerText: '70 shades with 3 finishes; matte, satin and shine. Because 1 shade of lipstick is never enough.',
                linkText: 'Shop now',
                link: '#',
            },
            slide2: {
                background: '#',
                heading: 'Save up to half price',
                innerText: '70 shades with 3 finishes; matte, satin and shine. Because 1 shade of lipstick is never enough.',
                linkText: 'Shop now',
                link: '#',
            },
            slide3: {
                background: '#',
                heading: 'Save up to half price',
                innerText: '70 shades with 3 finishes; matte, satin and shine. Because 1 shade of lipstick is never enough.',
                linkText: 'Shop now',
                link: '#',
            },
            slide4: {
                background: '#',
                heading: 'Save up to half price',
                innerText: '70 shades with 3 finishes; matte, satin and shine. Because 1 shade of lipstick is never enough.',
                linkText: 'Shop now',
                link: '#',
            },
            slide5: {
                background: '#',
                heading: 'Save up to half price',
                innerText: '70 shades with 3 finishes; matte, satin and shine. Because 1 shade of lipstick is never enough.',
                linkText: 'Shop now',
                link: '#',
            },
        }
    
        Object.keys(heroSlides).forEach((i) => {
            const data = heroSlides[i];
            const slide = document.createElement('div');
            slide.classList.add(`${ID}__slide`);


            slide.innerHTML = 
            `<div class="${ID}__slide__text">
                <div class="${ID}__banner_title">
                    ${data.heading}
                </div>
                <p class="${ID}__p">${data.innerText}</p>
                <div class="${ID}__button ${ID}__primary ${ID}__primary__invert col-sm-12 col-6">
                    <a href="#">${data.linkText}</a>
                </div>
            </div>`;
        
            document.querySelector(`.${ID}__heroCarousel`).appendChild(slide);
        });
    }
    slides();

    const slickCarousel = () => {
        $(`.${ID}__heroCarousel`).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 7000,
            fade: true,
            pauseOnHover: true,
            cssEase: 'linear',
            mobileFirst: true,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    arrows: true,
                  }
                },
              ]
        });
    }
    slickCarousel();

    const hoverCarousel = () => {
        // prevent mouse out triggering on child
        const slider = document.querySelector(`.${ID}__heroCarousel`);
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

    if(window.innerWidth > 1024) {
        hoverCarousel();
    }
}