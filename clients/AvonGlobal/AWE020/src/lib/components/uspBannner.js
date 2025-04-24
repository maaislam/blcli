const uspBanner = (id, variation, data, anchorElm, isMobile) => {
  const renderSlides = (data) => {
    return data
      .map((item, index) => {
        const { imgSrc, title, paragraph } = item;
        const domStr = `
          <div class="${id}__swiper--slide ${id}__slide-${index + 1}  ${isMobile ? 'swiper-slide' : ''}">
                <div class="usp-image"><img src="${imgSrc}" alt="${title}"/></div>
                <div class="text-content">
                    <div class="title">${title}</div>
                    <div class="paragraph">${paragraph}</div>
                </div>
            </div>`;
        return domStr;
      })
      .join('\n');
  };
  const htmlStr = `
    <div class="${id}__uspbanner ${variation == 2 ? `${id}__variation2` : ''}">
        <div class="${id}__uspbanner--container swiper">
            <div class="${id}__swiper-wrapper ${isMobile ? 'swiper-wrapper' : ''}">
                ${renderSlides(data)}
            </div>
        </div>
    </div>
  `;

  anchorElm.insertAdjacentHTML('afterend', htmlStr);
};

export default uspBanner;
