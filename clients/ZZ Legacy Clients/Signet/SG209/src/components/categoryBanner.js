import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;


const categoryBanner = (filteredData) => {
  
  const categoryContentsForDesktop = () => {
    let r_string = "";

    
    filteredData[0]?.categoryBanner?.forEach((data) => {
      r_string =
        r_string +
        
        `<div class="${ID}__category_banner_wrapper">
            <a href="${data?.categoryBannerHref}" class="${ID}__category_banner_card">
                <div class="${ID}__category_banner_thumbnail">
                    <img class="${ID}__banner_thumbnail_img" src="${data?.categoryBannerThumbnail}"></img>
                </div>
            </a>
            <div class="${ID}__category_banner_details ${data?.card}">
                <label class="${ID}__banner_thumbnail_title">${data?.categoryBannerName}</label>
                <a class="${ID}__learn_more" href="${data.categoryBannerHref}">learn more</a>
            </div>
        </div>              
        
                  
        `;
    });

    return r_string;
  };


  const categoryContentsForMobile = () => {
    let r_string = "";

    filteredData[0]?.categoryBannerForMobile?.forEach((data) => {
      r_string =
        r_string +
        
        `<div class="${ID}__category_banner_wrapper">
            <a href="${data?.categoryBannerHref}" class="${ID}__category_banner_card">
                <div class="${ID}__category_banner_thumbnail">
                    <img class="${ID}__banner_thumbnail_img" src="${data?.categoryBannerThumbnail}"></img>
                </div>
            </a>
            <div class="${ID}__category_banner_details ${data?.card}">
                <label class="${ID}__banner_thumbnail_title">${data?.categoryBannerName}</label>
                <a class="${ID}__learn_more" href="${data.categoryBannerHref}">shop now</a>
            </div>
        </div>              
        
                  
        `;
    });

    return r_string;
  };


  const htmlStr = `
    <div class="${ID}__category_banner_container">        
        ${window.innerWidth > 640 ?  categoryContentsForDesktop() : categoryContentsForMobile()}        
    </div>`;
  return htmlStr.trim();
};

export default categoryBanner;
