import shared from '../../../../../../core-files/shared';
import { brandImgData } from './brand_img_data';

const { ID, VARIATION } = shared;
const data = brandImgData;

const brandBanner = (category) => {
  const imgData = data.filter((item) => item?.title.toLowerCase() === category.toLowerCase());

  const brand_products_imgs = () => {
    let r_string = '';

    if (VARIATION === '1') {
      imgData[0]?.brandProducts?.forEach((img) => {
        r_string =
          r_string +
          `
          <div class="${ID}__banner_img swiper-slide">
              <a href="${img.href}" class="${ID}__banner_wrappe">
                  <img class=${ID}__img src="${img.imgSrc}"></img>
                  <div class="${ID}__img_title" >${img.title}</div>
              </a>
          </div>
      `;
      });
    } else if (VARIATION === '2') {
      imgData[0]?.brandProducts?.forEach((img) => {
        r_string =
          r_string +
          `               
            <div class="${ID}__banner_img swiper-slide">
                <a href="${img.href}" class="${ID}__banner_wrapper">
                    <img class=${ID}__img src="https://media.screwfix.com/is/image/ae235/${img.brandAlt}?$fxSharpen$=&wid=107&hei=50&dpr=on"></img>           
                </a>                
            </div>     
        `;
      });
    }

    return r_string;
  };

  const htmlStr = `
        <div class="${ID}__brand_banner_container">
            <div class="${ID}__banner_header">Shop by brand...</div>
            <div class="${ID}__brand_banner-swiper swiper">
              <div class="${ID}__banner_img_container swiper-wrapper">
                ${brand_products_imgs()} 
              </div>
            </div>
        </div>
    `;
  return htmlStr.trim();
};
export default brandBanner;
