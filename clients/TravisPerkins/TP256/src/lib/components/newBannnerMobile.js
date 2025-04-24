import { bannerImageUrl, uspData } from '../data';
import ctaBtn from './ctaBtn';
import landingImage from './landingImage';
import topBannerUsps from './topBannerUsps';
const newBannerMobile = (id) => {
  console.log('uspData', uspData);
  console.log('bannerImageUrl', bannerImageUrl);
  const htmlStr = `
      
        <div class="${id}__newbannermob">
            <div class="${id}__newbanner--item1 row">
                <div class="headline">
                NEW! <span class="subheadline">ONE STOP SHOP TO FIND AND BUY YOUR TRADE PRODUCTS</span> 
                </div>
            </div>
            <div class="${id}__landingimage">
              ${topBannerUsps(id, uspData)}
              ${landingImage(id, bannerImageUrl)}
            </div>
            <div class="${id}__newbanner--item2 row">
                <div class="btn-container">
                    ${ctaBtn(id, 'Shop with Trade Counter', '/tc/buy-again-list', 'yellow')}
                    ${ctaBtn(id, 'Continue with Main Site', '/', 'gray')}
                </div>
            </div>
            
        </div>`;
  return htmlStr.trim();
};
export default newBannerMobile;
