//import { fetchDataWithParams, getPLPData } from "../helper";
import shared from '../../../../../core-files/shared';
const { ID, VARIATION } = shared;
const generateSlickItems = (data) => {

    const htmlStr = `
        <!-- Product -->
        <a href="${data?.subheader_url}" class="carousel-item">
            <div class="carousel-item-wrapper">
                <div class="carousel-item--image">
                    <img src="${data.subheader_image}" />
                </div>

                <div class="carousel-item--content">
                    <p class="category-title" title="${data.subheader_name}"> ${data.subheader_name} </p>
                    <p class="category-shop"> shop now </p>
                </div>
            </div>
        </a>
      `;
    return htmlStr;
};

const generateSlider = (data) => {
    let content = ``;// Process the fetched data
    data.forEach(item => {
        content += generateSlickItems(item);
    });
    return content;
};


export const carousel = (data) =>{
    return `
        <div class="row">
            <div class="${ID}__category_carousel_container row">
                <div class="${ID}__category_carousel_container_title row"> 
                    <div class="${ID}__left_stroke">
                        <svg xmlns="http://www.w3.org/2000/svg"  height="2" viewBox="0 0 280 2" fill="none">
                        <path d="M0 1H280" stroke="#05054B"/>
                        </svg>
                    </div>
                    <div class="${ID}__title">
                        <p>categories that could <span>inspire you<span></p>
                    </div>
                    <div class="${ID}__right_stroke">
                        <div class="svg_wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg"  height="2" viewBox="0 0 281 2" fill="none">
                            <path d="M0.5 0.99997L280.5 1.00118" stroke="#05054B"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="${ID}__category_carousel_wrapper row">
                    <div class="slick_btn ${ID}-prev-arrow ${ID}-hidden">
                        <div class="slick_btn__item slick_btn__item--prev">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <mask id="path-1-inside-1_112_3351" fill="white">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 10L13 16L19 22"/>
                            </mask>
                            <path d="M13 16L11.5858 14.5858L10.1716 16L11.5858 17.4142L13 16ZM17.5858 8.58579L11.5858 14.5858L14.4142 17.4142L20.4142 11.4142L17.5858 8.58579ZM11.5858 17.4142L17.5858 23.4142L20.4142 20.5858L14.4142 14.5858L11.5858 17.4142Z" fill="#333333" mask="url(#path-1-inside-1_112_3351)"/>
                            </svg>
                        </div>
                    </div> 
                    <div class="${ID}__category_carousel row">
                        ${generateSlider(data)}  
                    </div>
                    <div class="slick_btn ${ID}-next-arrow ${ID}-hidden">
                        <div class="slick_btn__item slick_btn__item--next">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <mask id="path-1-inside-1_112_3348" fill="white">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13 10L19 16L13 22"/>
                            </mask>
                            <path d="M19 16L20.4142 14.5858L21.8284 16L20.4142 17.4142L19 16ZM14.4142 8.58579L20.4142 14.5858L17.5858 17.4142L11.5858 11.4142L14.4142 8.58579ZM20.4142 17.4142L14.4142 23.4142L11.5858 20.5858L17.5858 14.5858L20.4142 17.4142Z" fill="#333333" mask="url(#path-1-inside-1_112_3348)"/>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `
} 



