import topBannerUsp from './topBannerUsp';

const topBannerUsps = (id, uspData) => {
  const htmlStr = `   
        <div class="${id}__topbanner-usps">
            ${uspData.map((usp) => topBannerUsp(id, usp)).join('\n')}
        </div>`;

  return htmlStr.trim();
};

export default topBannerUsps;
