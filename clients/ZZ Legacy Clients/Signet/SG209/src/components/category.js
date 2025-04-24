import shared from "../../../../../core-files/shared";
import categoryBanner from "./categoryBanner";

const { ID, VARIATION } = shared;

const categoryCarousel = (filteredData) => {
  
  const categoryContents = () => {
    let r_string = "";

    filteredData[0]?.category?.forEach((data) => {
      r_string =
        r_string +
        `               
        <a class="${ID}__category swiper-slide">
            <div class="${ID}__category_thumbnail">
                <img class="${ID}__thumbnail_img" src="${data?.categoryThumbnail}"></img>
            </div>
            <label class="${ID}__thumbnail_title">${data?.categoryName}</label>
        </a>          
        `;
    });

    return r_string;
  };

  const htmlStr = `
    <div class="${ID}__category_container swiper">
        <div class="${ID}__category_wrapper swiper-wrapper">
            ${categoryContents()}
        </div>
    </div>
    <div class="${ID}__category_banner">
      ${categoryBanner(filteredData)}
    </div>
    `;
  return htmlStr.trim();
};

export default categoryCarousel;
