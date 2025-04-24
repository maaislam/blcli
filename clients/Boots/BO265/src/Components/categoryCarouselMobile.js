//import { fetchDataWithParams, getPLPData } from "../helper";
import shared from '../../../../../core-files/shared';
import { chunkArray } from '../helper';
const { ID, VARIATION } = shared;


const generateDom = (data) => {
    const htmlStr = `
        <!-- Product -->
        <a href="${data?.subheader_url}">
            <div class="carousel-item-wrapper">
                <div class="carousel-item--image">
                    <img src="${data.subheader_image}" />
                </div>

                <div class="carousel-item--content">
                    <p class="category-title"> ${data.subheader_name} </p>
                    <p class="category-shop"> shop now </p>
                </div>
            </div>
        </a>
      `;
    return htmlStr;
};

const items = (data) => {
    let slideWrapper = ``;
    data.forEach(item => {
        slideWrapper += generateDom(item);
    });
    return slideWrapper;
    
};

const generateSlide = (data) => {
    let content = `<div class="carousel-item">${items(data)}</div>`;// Process the fetched data
    return content;
};


const generateSlider = (data) => {
    let content = ``;// Process the fetched data
    data.forEach(item => {
        content += generateSlide(item);
    });
    return content;
};


export const mobile_carousel = (data) =>{
    const chunkedDataArray = chunkArray(data, 2); 
    return `
        <div class="row">
            <div class="${ID}__mobile_category_carousel_container row">
                <div class="${ID}__mobile_category_carousel_container_title row"> 
                    <div class="${ID}__title">
                        <p>categories that could <span>inspire you<span></p>
                    </div>
                </div>
                <div class="${ID}__mobile_category_carousel_wrapper row">
                    <div class="${ID}__mobile_category_carousel row">
                        ${generateSlider(chunkedDataArray)}  
                    </div>
                </div>
                <div class="${ID}__mobile_carousel_progress_bar_container">
                    <div class="mobile-progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                        <span class="slider__label sr-only"></span>
                    </div>
                </div>
            </div>
        </div>
    `
} 



