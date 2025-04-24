const banner = (ID) => {
  const html = `
          <div class="${ID}__banner">
              <section>
                  <a
                  class="${ID}__banner-link"
                  tabindex="0"
                  href="https://www.screwfix.com/search?search=newonlinerangespromo"
                  >
                    <div class="wrapper">
                        <span class="${ID}__banner-text">SHOP OUR NEW IN</span>
                        <span class="${ID}__banner-icon"></span>
                        <span class="${ID}__banner-icon"></span>
                        <span class="${ID}__banner-icon"></span>                     
                    </div>
                  </a>
              </section>
          </div>
      `;

  return html.trim();
};

export default banner;
