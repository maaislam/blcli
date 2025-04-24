import { brandListData } from '../brandListData';

const brandLogo = (id, active_tab) => {
  const activeBrand = brandListData.filter((data) => data.tab === active_tab.getAttribute('data-brand'));

  const brand_list = () => {
    let r_string = '';
    activeBrand[0].tab_contents.forEach((data) => {
      r_string =
        r_string +
        `               
          <a class="${id}__brand_list_wrapper" href="${data.href}" ${data.identifier}>
            <img class="${id}__brand_logo" src="${data?.brandLogo}"></img>
          </a>     
        `;
    });

    return r_string;
  };

  const htmlStr = `<div class="${id}__brand_list_container">
                      ${brand_list()}
                    </div>`;

  return htmlStr.trim();
};
export default brandLogo;
