import shared from '../../../../../core-files/shared';
import { reviewStar } from './reviewStar';
const { ID, VARIATION } = shared;

const generateSlickItems = (data) => {

    const htmlStr = `
        <!-- Product -->
        <div  class="carousel-item">

            <div class="carousel-item-wrapper">
                <a href="${data?.actionurl}" class="carousel-item--image">
                    <img src="${data.referenceimageurl}" />
                </a>

                <div class="carousel-item--content">
                    <div class="review-star">
                        ${reviewStar(data.averagereviewscore)} 
                        <p class="review_count">${data.numberofreviews > 0 ? `(${data.numberofreviews})` : ""}</p>
                    </div>    
                    <p class="category-title" title="${data.offername}"> ${data.offername} </p>
                    <div class="price">
                        <p class="now_price"> now <span> £${parseFloat(data.currentprice).toFixed(2)}</span></p>
                        <p class="was_price">${parseFloat(data.regularprice).toFixed(2) != parseFloat(data.currentprice).toFixed(2) ? `was <span> £` + parseFloat(data.regularprice).toFixed(2)  + `</span>` : ''} </p>
                    </div>
                    <div class="atc__btn" data-model="${data.model}" data-name="${data.offername}" data-object="${data.objectid}">
                        add to basket
                    </div>
                </div>
            </div>

            <div class="offer-tag"></div>

        </div>

      `;
    return htmlStr;
};

const generateSlider = (data) => {
    let content = ``;// Process the fetched data
    data.forEach(item => {
        content += generateSlickItems(item.product_data);
    });
    return content;
};


export const product_carousel = (data) =>{
    return `
        <div class="row">
            <div class="${ID}__product_carousel_container row">

                <div class="${ID}__product_carousel_container_title row"> 
                    <div class="${ID}__left_stroke"></div>
                    <div class="${ID}__title">
                        <p>products we think <span>you'd love<span></p>
                    </div>
                    <div class="${ID}__right_stroke"></div>
                    
                </div>

                <div class="${ID}__product_carousel_wrapper row">

                    <button class="slick_btn ${ID}-prev-arrow">

                        <div class="slick_btn__item slick_btn__item--prev">
                            <svg xmlns="http://www.w3.org/2000/svg" wIDth="32" height="32" viewBox="0 0 32 32">
                            <mask ID="path-1-insIDe-1_112_3351" fill="white">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 10L13 16L19 22"/>
                            </mask>
                            <path d="M13 16L11.5858 14.5858L10.1716 16L11.5858 17.4142L13 16ZM17.5858 8.58579L11.5858 14.5858L14.4142 17.4142L20.4142 11.4142L17.5858 8.58579ZM11.5858 17.4142L17.5858 23.4142L20.4142 20.5858L14.4142 14.5858L11.5858 17.4142Z" fill="#333333" mask="url(#path-1-insIDe-1_112_3351)"/>
                            </svg>
                        </div>

                    </button> 
                    <div class="${ID}__product_carousel row">
                        ${generateSlider(data)} 
                    </div>
                    <button class="slick_btn ${ID}-next-arrow">

                        <div class="slick_btn__item slick_btn__item--next">
                            <svg xmlns="http://www.w3.org/2000/svg" wIDth="32" height="32" viewBox="0 0 32 32">
                            <mask ID="path-1-insIDe-1_112_3348" fill="white">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13 10L19 16L13 22"/>
                            </mask>
                            <path d="M19 16L20.4142 14.5858L21.8284 16L20.4142 17.4142L19 16ZM14.4142 8.58579L20.4142 14.5858L17.5858 17.4142L11.5858 11.4142L14.4142 8.58579ZM20.4142 17.4142L14.4142 23.4142L11.5858 20.5858L17.5858 14.5858L20.4142 17.4142Z" fill="#333333" mask="url(#path-1-insIDe-1_112_3348)"/>
                            </svg>
                        </div>

                    </button> 
                </div>

                <div class="${ID}__carousel_progress_bar_container">

                    <div class="product-progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                        <span class="slIDer__label sr-only"></span>
                    </div>

                </div>

            </div>
        </div>
    `

} 



