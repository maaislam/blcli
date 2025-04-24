import shared from "../../../../../core-files/shared";
import { inRangeData } from "../lib/inRangeData";



const { ID, VARIATION } = shared;
const data = inRangeData;
const isMobile = window.matchMedia('(max-width: 640px)').matches;
//console.log(isMobile, "isMobile");


const inRangeBrandSection= (targetPage) => {
    const filteredData = data.filter((item) => item.targetPage === targetPage);

  
  const brandContents = (data) => {
    let r_string = "";

    data?.forEach((data) => {
      r_string =
        r_string +
        `               
        <div class="${ID}__in_range_brand ${data?.brandName}">
            <a href="${data?.href ? data?.href : "#"}" class="${ID}__brand">
                <div class="${ID}__brand_thumbnail">
                    <img class="${ID}__brand_thumbnail_img" src="${isMobile ? data?.brandThumbnailForMobile : data?.brandThumbnail}"></img>
                    <div class="${ID}__thumbnail_shadow_layout"></div>
                </div>
                <div class="${ID}__brand_details">
                    <div class="${ID}__brand_logo">
                        <img src="${isMobile ? data?.brandLogoForMobile : data?.brandLogo}"></img>
                    </div>
                   <div class="${ID}__shop_now_link">shop now</div>
                </div>
            </a>            
        </div>          
        `;
    });

    return r_string;
  };

  const htmlStr = `
    <div class="${ID}__in_range_brand_wrapper">
        ${brandContents(filteredData[0]?.brands)}
    </div>
    
    `;
  return htmlStr.trim();
};

export default inRangeBrandSection;
