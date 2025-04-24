import shared from "../../../../../core-files/shared";
import { signatureProducts } from "../lib/signatureProductsData";
import featuredProductSection from "./featureProducts";
import inRangeBrandSection from "./inRange";
import productHighlightVideo from "./productVideoSection";


const { ID, VARIATION } = shared;
const signatureProductsData = signatureProducts;


const signatureProductsCarousel = (targetPage) => {
    const filteredData = signatureProductsData.filter((item) => item.targetPage === targetPage);

  
  const carouselContents = (data) => {
    let r_string = "";

    data?.forEach((data) => {
      r_string =
        r_string +
        `               
        <div class="${ID}__carousel_products swiper-slide">
            <div class="${ID}__heighlight_title">
                <img src="${data?.starIcon}"></img>
                <span class="${ID}__heighlight_bar">${data?.heighlight}</span>
            </div
            <a class="${ID}__product_wrapper" href="${data?.href}">
                <div class="${ID}__carousel_thumbnail">
                    <img class="${ID}__thumbnail_img" src="${data?.img}"></img>
                </div>
                <div class="${ID}__thumbnail_title">${data?.product_name}</div>
                <div class="${ID}__product_price">
                   <span class="${ID}__new_price">${data?.product_price}</span>
                   <span class="${ID}__old_price">${data?.old_price}</span>
                </div>
                <span class="${ID}__price_details">${data?.price_details}</span>
            </a>
            
        </div>          
        `;
    });

    return r_string;
  };

  const htmlStr = `
    <div class="${ID}__signature_product_container">
        <div class="${ID}__signature_product_header">
            <span class="${ID}__title">${filteredData[0].title}</span>
            <span class="${ID}__title_mobile">${filteredData[0]?.mobileTitle}</span>
            <p class="${ID}__subtitile">${filteredData[0].subTitle}</p>
            <a class="${ID}__view_all" href="${filteredData[0].href}">${filteredData[0].quickViewAll}</a>
        </div>
        <div class="${ID}__signature_product_carousel_container">
            <div class="${ID}__signature_product_carousel swiper">                
                <div class="${ID}__carousel_wrapper swiper-wrapper">
                    ${carouselContents(filteredData[0].carouselData)}
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>            
            </div>
            <div class="${ID}__swiper-button-prev ${ID}__swiper-button-disabled"></div>
            <div class="${ID}__swiper-button-next"></div> 
        </div>
        
    </div>
    <div class="${ID}__featured_product_section">
         ${featuredProductSection(targetPage)}
    </div>
    <div class="${ID}__in_range_brand_section_container">
        ${inRangeBrandSection(targetPage)}
    </div>
    <div class="${ID}__product_highlight_video">
        ${productHighlightVideo(targetPage)}
    </div>
    
    `;
  return htmlStr.trim();
};

export default signatureProductsCarousel;
