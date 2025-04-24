import shared from "../../../../../core-files/shared";
import { heroBannerData } from "../lib/heroBannerData";
const { ID, VARIATION } = shared;
const data = heroBannerData;

const heroBanner = (targetPage) => {
    const filteredData = data.filter((item) => item.targetPage === targetPage);
    
    const htmlStr = `
    <div class="${ID}__banner_container">
        <div class=${ID}__banner_wrapper >
            <img class="${ID}__banner_img" src="${filteredData[0].thumbNail}"> </img>
            <img class="${ID}__banner_img_mobile" src="${filteredData[0].thumbnailForMobile}"> </img>
            <div class="${ID}__brand">
                <div class="${ID}__brand_wrapper">
                    <img class="${ID}__brand_logo" src="${filteredData[0]?.brandLogo}"></img>
                    <div class="${ID}__brand_text">${filteredData[0]?.text}</div>
                    <a class="${ID}__brand_shop_all_links" href="${filteredData[0]?.shopAllLink}">
                        shop all
                    </a>
                </div>             
            </div>
        </div>
        
    </div>`;
    return htmlStr.trim();
  };

  export default heroBanner;