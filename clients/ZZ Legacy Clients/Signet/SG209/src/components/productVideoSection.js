import shared from "../../../../../core-files/shared";
import { productVideoContents } from "../lib/productVideoContents";



const { ID, VARIATION } = shared;
const data = productVideoContents;


const productHighlightVideo = (targetPage) => {
    const filteredData = data.filter((item) => item.targetPage === targetPage);

  
  const videoContents = (data) => {
    let r_string = "";

    data?.forEach((data) => {
      r_string =
        r_string +
        `               
        <div class="${ID}__product_video_player">
            <div class="${ID}__video_container">
                <video controls>
                    <source src="${data?.videoUrl}" type="video/mp4">
                </video>
            </div>
            <div class="${ID}__contents">
                <h2 class="${ID}__header">${data?.header}</h2>
                <div class="${ID}__primary_btn">${data?.primaryBtnLabel}</div>
                <div class="${ID}__secondary_btn">${data?.secondarybtnLabel}</div>
            </div>
            
        </div>          
        `;
    });

    return r_string;
  };

  const htmlStr = `
    <div class="${ID}__product_video_player_wrapper">
        ${videoContents(filteredData[0]?.content)}
    </div>
    
    `;
  return htmlStr.trim();
};

export default productHighlightVideo;
