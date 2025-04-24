const compareTable = (id, headerData) => {
  console.log('🚀 ~ compareTable ~ headerData:', headerData);
  const nonStarterPackUrls = [
    '/products/wellbeing-pod-mini-essential-oil-diffuser-nude',
    '/products/wellbeing-pod',
    '/products/wellbeing-pod-luxe',
  ];

  const isNonStarterPack = nonStarterPackUrls.some((url) => window.location.pathname === url);
  const row = (rowName) =>
    isNonStarterPack && rowName === 'Oil Size'
      ? ''
      : `<div class="header-column__${rowName.split(' ').join('-').toLowerCase()} ${id}-${rowName
          .split(' ')
          .join('-')
          .toLowerCase()}">${rowName}</div>`;

  const htmlStr = `

    <section class="${id}__comparison shopify-section section is-paddingless-mobile">
        <div class="${id}__block">
            <div class="container">
                <div class="${id}__comparison--title">
                    <h2>Find the right pod for you</h2>
                </div>

                <div class="${id}__comparison--table">

                    <div class="header-column">
                        <div class="header-column__image ${id}-image">
                            <img src=""
                                alt="">
                        </div>
                        <div class="header-column__cta">
                            <a href="">SHOP NOW</a>
                        </div>
                        ${headerData.map(row).join('\n')}
                        
                    </div>

                    <div class="comparison-columns ${id}__carousel swiper">
                        <div class="comparison-columns-wrapper swiper-wrapper">
                            
                        </div>
                        <div class="swiper-scrollbar"></div>
                    </div>

                </div>
            </div>
        </div>
    </section>`;

  return htmlStr;
};
export default compareTable;
