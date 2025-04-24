const renderBanner = (id, fireEvent) => {
  fireEvent('user seen the UPS banner');
  //remove if already present
  document.querySelector(`.${id}__banner-container--item3`)?.closest(`.${id}__banner-container`)?.remove();

  const content = `
      <div class="${id}__banner-container HDA009-swiper-container swiper-active ${id}__desktop-hide ">
        <div class="swiper-wrapper">
            <a href=""
                class="${id}__banner-container--item1 swiper-slide"><span><img src="https://ucds.ams3.digitaloceanspaces.com/HDAustria/schaerfe%20%281%29.png"
                        alt=""></span>Das schärfste Fernsehen Österreichs</a>
            <a href=""
                class="${id}__banner-container--item2 swiper-slide"><span><img src="https://ucds.ams3.digitaloceanspaces.com/HDAustria/customer_service%20%281%29.png"
                        alt=""></span> Top Kundenservice</a>
            <a href=""
                class="${id}__banner-container--item3 swiper-slide"><span><img src="https://ucds.ams3.digitaloceanspaces.com/HDAustria/app_package_icon%20%281%29.png"
                        alt=""></span> All-in-One: TV und Streaming</a>
        </div>
        <div class="HDA009__swiper-pagination"></div>
      </div>
      <div class="${id}__banner-container ${id}__mobile-hide ${id}__full-wide">
        <div class="container">
            <a href=""
                class="${id}__banner-container--item1 swiper-slide"><span><img src="https://ucds.ams3.digitaloceanspaces.com/HDAustria/schaerfe%20%281%29.png"
                        alt=""></span>Das schärfste Fernsehen Österreichs</a>
            <a href=""
                class="${id}__banner-container--item2 swiper-slide"><span><img src="https://ucds.ams3.digitaloceanspaces.com/HDAustria/customer_service%20%281%29.png"
                        alt=""></span> Top Kundenservice</a>
            <a href=""
                class="${id}__banner-container--item3 swiper-slide"><span><img src="https://ucds.ams3.digitaloceanspaces.com/HDAustria/app_package_icon%20%281%29.png"
                        alt=""></span> All-in-One: TV und Streaming</a>
        </div>
      </div>`;

  document.querySelector('header').insertAdjacentHTML('afterend', content);

  document.querySelectorAll(`.${id}__banner-container`).forEach((elm) => {
    elm.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.matches('a')) {
        console.log(e.target.innerText);
        fireEvent(`user clicked ${e.target.innerText}`);
      }
    });
  });
};
export default renderBanner;
