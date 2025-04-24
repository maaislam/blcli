import { downArrow } from '../data';

const topBannerUsp = (id, data) => {
  const { image, headlines } = data;
  //console.log('data', data);

  const htmlStr = `
        <div class="${id}__topbanner--usp">
            <div class="image-wrapper">
                ${image}
            </div>
            <div class="content">
                <div class="line1">${headlines.line1}</div>
                <div class="line2">
                    <span> ${headlines.line2}</span><span class="svg-arrow">${downArrow()}</span>
                </div>
            </div>
        </div>`;

  return htmlStr;
};

export default topBannerUsp;
