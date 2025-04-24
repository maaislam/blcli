import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { categoryProducts } from "./data";


const { ID, VARIATION } = shared;

export const tabMarkup = () => {
   const tabs = `
   <section class="${ID}-categoryProducts">
       <h2>Ernest Jones - Diamond & Watch Specialist</h2>
       <div class="${ID}-tabContainer">
           
           <div class="${ID}-tabs">
               <div class="${ID}-tabLinks">
                ${VARIATION === '4'? `
                    <div class="${ID}-tab active" tab-target="jewellery">Jewellery</div>
                    <div class="${ID}-tab" tab-target="watches">Watches</div>
                    <div class="${ID}-tab" tab-target="new">New In</div>
                    <div class="${ID}-tab" tab-target="engagement">Engagement</div>` 
                : ` 
                 <div class="${ID}-tab active" tab-target="watches">Watches</div>
                 <div class="${ID}-tab" tab-target="new">New In</div>
                 <div class="${ID}-tab" tab-target="engagement">Engagement</div>
                 <div class="${ID}-tab" tab-target="jewellery">Jewellery</div>
                 `}
               </div>
               ${VARIATION === '4'? `
               <div class="${ID}-tabContent active" tab-data="jewellery">
                 <div class="${ID}-image"></div>
                 <div class="${ID}-tabInner"></div>
               </div>
               <div class="${ID}-tabContent" tab-data="watches">
                <div class="${ID}-image"></div>
                <div class="${ID}-tabInner"></div>
                </div>
               <div class="${ID}-tabContent" tab-data="new">
                 <div class="${ID}-image"></div>
                 <div class="${ID}-tabInner"></div>
               </div>
               <div class="${ID}-tabContent" tab-data="engagement">
                 <div class="${ID}-image"></div>
                 <div class="${ID}-tabInner"></div>
               </div>
               ` 
               : `
               <div class="${ID}-tabContent active" tab-data="watches">
                <div class="${ID}-image"></div>
                <div class="${ID}-tabInner"></div>
                </div>
               <div class="${ID}-tabContent" tab-data="new">
                 <div class="${ID}-image"></div>
                 <div class="${ID}-tabInner"></div>
               </div>
               <div class="${ID}-tabContent" tab-data="engagement">
                 <div class="${ID}-image"></div>
                 <div class="${ID}-tabInner"></div>
               </div>
               <div class="${ID}-tabContent" tab-data="jewellery">
                 <div class="${ID}-image"></div>
                 <div class="${ID}-tabInner"></div>
               </div>
               `}
              
           </div>
       </div>
   </section>`;
   
   return tabs;
}

export const carouselContent = (data, section) => {
  
    // Add the new slides
    Object.keys(data).forEach((i) => {
        const el = data[i];

        const slide = document.createElement('div');
        slide.className = `${ID}-slide swiper-slide`;
        slide.setAttribute(`item-name`, el.attr);
        slide.innerHTML = `
        <a href="${el.link}"></a>
        <div class="${ID}-image" style="background-image:url(${el.image})"></div>
        ${el.title ? `
        <div class="${ID}-info">
            ${el.title ? `<h3>${el.title}</h3>` : ''} 
            ${el.wasPrice ? `<div class="${ID}-pricing"><p>${el.nowPrice}</p><span>${el.wasPrice}</span></div>` : `<p>${el.text}</p>`}
            <a class="${ID}-cta" href="${el.link}">${el.linkText}</a>
        </div>`: ''}`;

       section.appendChild(slide);
    });  
}


export const initCarousel = (carousel, paginationEl, nextArr, prevArr) => {

    var swiper = new Swiper(carousel, {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1.3,
        centeredSlides: false,
        spaceBetween: 8,
        observer: true,  
        centerMode: true,
        observeParents: true,
        pagination: {
            el: paginationEl,
            clickable: true
        },
        navigation: {
           nextEl: nextArr,
           prevEl: prevArr,
           clickable: true
        },

        breakpoints: {
            // when window width is >= 320px
            320: {
              slidesPerView: 1.3,
              spaceBetween: 8
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 2.5,
                spaceBetween: 10
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 3.5,
                spaceBetween: 10,
                
            },
            1023: {
                slidesPerView: 4.5,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 5.5,
                spaceBetween: 10,
            },
            1500: {
                slidesPerView: 5.5,
                spaceBetween: 10,
            }
          }
        
    });
    
}

let contentSwiper = window.Swiper;
let init = false
let initbestSellers = false;

export const uspSwiper = () => {
    let mobile = window.matchMedia('(min-width: 0px) and (max-width: 639px)');
    let tablet = window.matchMedia('(min-width: 640px) and (max-width: 1023px)');
    let desktop = window.matchMedia('(min-width: 1024px)');


    // Enable (for mobile)
    if(mobile.matches || tablet.matches) {
        if (!init) {
            init = true;
            contentSwiper = new Swiper(`.${ID}-usps .${ID}-container`, {
                direction: 'horizontal',
                loop: true,
                autoplay: {
                    delay: 5000,
                },
                spaceBetween: 10,
                observer: true,
                observeParents: true,
                breakpoints: {
                    // when window width is >= 320px
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 8
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    // when window width is >= 640px
                    630: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                        
                    },
                    766: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    1023: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    
                  }
            });
        }

    }
    // Disable (for desktop)
    else if(desktop.matches) {
        if(document.querySelector(`.${ID}-usps .swiper-slide.swiper-slide-active`)) {
            document.querySelector(`.${ID}-usps .${ID}-container`).swiper.destroy(true,true)
        }
        
        init = false;
    }
}

export const bestSellersSwiper = () => {
    let mobile = window.matchMedia('(min-width: 0px) and (max-width: 639px)');
    let tablet = window.matchMedia('(min-width: 640px) and (max-width: 1023px)');
    let desktop = window.matchMedia('(min-width: 1024px)');


    // Enable (for mobile)
    if(desktop.matches) {
        if (!initbestSellers) {
            initbestSellers = true;
            contentSwiper = new Swiper(`.${ID}-bestSellers .${ID}-carousel`, {
                direction: 'horizontal',
                loop: true,
                spaceBetween: 10,
                slidesPerView: 4,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: `.${ID}-bestSellers .${ID}-swiperNext`,
                    prevEl: `.${ID}-bestSellers .${ID}-swiperPrev`,
                    clickable: true
                 },
                
            });
        }

        contentSwiper.update();

    }
    // Disable
    else if(mobile.matches || tablet.matches) {
        if(document.querySelector(`.${ID}-bestSellers .${ID}-carousel .swiper-slide.swiper-slide-active`)) {
            document.querySelector(`.${ID}-bestSellers .${ID}-carousel`).swiper.destroy(true,true)
        }
        
        initbestSellers = false;
    }
}

export const addTabContent = (tab, element) => {
    const tabProducts = categoryProducts[tab].products;
    let tabOffer;

    if(VARIATION !== '4' && categoryProducts[tab].imageBlockV2) {
        tabOffer = categoryProducts[tab].imageBlockV2;
    } else {
        tabOffer = categoryProducts[tab].imageBlock;
    }


    element.querySelector(`.${ID}-image`).style = `background-image: url(${tabOffer.image})`;
    element.querySelector(`.${ID}-image`).setAttribute('item-name', tabOffer.attr);
    element.querySelector(`.${ID}-image`).innerHTML = `
    <a href="${tabOffer.link}"></a>
    <div class="${ID}-textBlock">
        <h2>${tabOffer.text}</h2>
        <p>${tabOffer.content}</p>
        <a href="${tabOffer.link}" class="${ID}-cta ${ID}-whiteFilled">${tabOffer.linktext}</a>
    </div>`;

    Object.keys(tabProducts).forEach((i) => {
        const data = tabProducts[i];
  
        const tabProduct = document.createElement('div');
        tabProduct.classList.add(`${ID}-product`);
        tabProduct.setAttribute('item-name', data.attr);
        tabProduct.innerHTML = `
        <a href="${data.link}"></a>
        <div class="${ID}-prodImage" style="background-image:url(${data.image})"></div>
        <div class="${ID}-info">
            <h4>${data.brand}</h4>
            <h3>${data.title}</h3>
            ${data.wasPrice ? `<div class="${ID}-pricing"><p>${data.nowPrice}</p><span>${data.wasPrice}</span></div>` : `<p>${data.text}</p`}
        </div>`;

        element.querySelector(`.${ID}-tabInner`).appendChild(tabProduct);
    });  

}

export const tabSwitch = (event, tabContent) => {

    let allTabLinks;
    let allTabContent;
    

    allTabContent = document.querySelectorAll(`.${ID}-tabContent`);
    for (let i = 0; i < allTabContent.length; i += 1) {
        allTabContent[i].classList.remove('active');
    }
   
    allTabLinks = document.querySelectorAll(`.${ID}-tab`);
    for (let j = 0; j < allTabLinks.length; j++) {
        allTabLinks[j].classList.remove('active');
    }
  
    document.querySelector(`.${ID}-tabContent[tab-data="${tabContent}"]`).classList.add('active');
    event.currentTarget.classList.add('active');
}

export const swiperSlideTracking = (allSlides, type) => {

    for (let index = 0; index < allSlides.length; index += 1) {
        const element = allSlides[index];
        element.querySelector(`a`).addEventListener('click', () => {
            const attr = element.getAttribute('item-name');
            fireEvent(`Clicked ${type}: ${attr}`);
        });
    }
}