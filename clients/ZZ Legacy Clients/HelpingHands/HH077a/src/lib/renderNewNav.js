const renderNav = (menuData) => {
  const mainContainer = `<div class="HH077a__nav-container"></div>`;

  document.querySelectorAll('.HH077a__control--nav').forEach((item) => {
    item.innerHTML = mainContainer;
  });

  const menuListHTML = (listData) => {
    const content = `
              <a ${listData.pageUrl !== '' ? `href=${listData.pageUrl}` : ''} class="secondary__list-item">
                  <div class="img-div"  style="background-image: url(${listData.imgUrl}); height: ${
      listData.imgUrl ? '110px' : 0
    };">
                  </div>
                  <div class="HH077a__title">${listData.title}</div>
                  <div class="HH077a__sub-title">${listData.subTitle}</div>
              </a>`;
    return content;
  };
  const menuSidebarHTML = (sidebarData) => {
    const content = `
              <a href = "${sidebarData.url}" class="sidebar__list-item">
                  <div class="title-wrapper">
                      <div class="bullet-img">
                      <i class="fa fa-${sidebarData.bulletImg}"></i>
                      </div>
                      <div class="HH077a__title sidebar__title">${sidebarData.title}</div>
                  </div>
                  <div class="HH077a__sub-title sidebar__sub-title">${sidebarData.subtitle}</div>
              </a>`;
    return content;
  };
  menuData.forEach((item) => {
    const primaryContent = `
            
                <div class="primary__list">
                    <div class="primary__list-item">
                        <a ${item.mainUrl !== '' ? `href=${item.mainUrl}` : ''} class="primary__list-item--title">${
      item.mainNav
    }</a>
                        <div class="secondary__container HH077a__hide">
                            <div class="secondary__list">
                                ${item.subCategory.map((item) => menuListHTML(item)).join('\n')}
                            </div>
                            <div class="sidebar__container">
                            ${
                              item.sideBarContent.length > 0
                                ? item.sideBarContent.map((item) => menuSidebarHTML(item)).join('\n')
                                : ''
                            }
                            </div>
                        </div>
                    </div>
                </div>`;

    document.querySelectorAll('.HH077a__nav-container').forEach((item) => {
      item.innerHTML += primaryContent;
    });
  });
};

export default renderNav;
