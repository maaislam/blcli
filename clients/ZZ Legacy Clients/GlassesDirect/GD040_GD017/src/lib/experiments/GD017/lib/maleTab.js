const getMaleTab = (data) => `
  <div class="GD017_container GD017_male-wrap">
    <div class="GD017_img-wrap">
      ${!data.var1male1link ? '' : `
        <div class="GD017_img-block">
          <a href="${data.var1male1link}" class="GD017_img-link">
            <img src="${data.var1male1img}" />
            <label>${data.var1male1name}</label>
          </a>
          <span>${data.var1male1text}</span>
        </div>
      `}

      ${!data.var1male2link ? '' : `
        <div class="GD017_img-block">
          <a href="${data.var1male2link}" class="GD017_img-link">
            <img src="${data.var1male2img}" />
            <label>${data.var1male2name}</label>
          </a>
          <span>${data.var1male2text}</span>
        </div>
      `}

      ${!data.var1male3link ? '' : `
        <div class="GD017_img-block">
          <a href="${data.var1male3link}" class="GD017_img-link">
            <img src="${data.var1male3img}" />
            <label>${data.var1male3name}</label>
          </a>
          <span>${data.var1male3text}</span>
        </div>
      `}
    </div>

    <div class="GD017_link-wrap">
      <div class="GD017_link-inner">
        <div class="GD017_help-item GD017_reveal-hover">
          <a href="#">Shop by Shape</a>
        </div>
        <div class="GD017_reveal-ds GD017_shape-wrap">
          <a href="/gender/male/frameshape/rectangle/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-rectangle"></span> Rectangular</a>
          <a href="/gender/male/frameshape/round/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-round"></span> Round</a>
          <a href="/gender/male/frameshape/oval/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-oval"></span> Oval</a>
          <a href="/gender/male/frameshape/wayfarer/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-wayfarer"></span> Wayfarer</a>
          <a href="/gender/male/frameshape/aviator/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-aviator"></span> Aviator</a>
          <a href="/gender/male/" class="GD017_shape-item"><span class="GD017_ellip"></span>All Shapes</a>
        </div>

        <div class="GD017_help-item GD017_reveal-hover">
          <a href="#">Shop by Brand</a>
        </div>
        <div class="GD017_reveal-ds">
          <a href="/gender/male/brand/ray-ban/" class="GD017_help-item">Ray-Ban</a>
          <a href="/gender/male/brand/london-retro/" class="GD017_help-item">London Retro</a>
          <a href="/gender/male/brand/oakley" class="GD017_help-item">Oakley</a>
          <a href="/gender/male/brand/scout/" class="GD017_help-item">Scout</a>
          <a href="/gender/male/brand/harrington/" class="GD017_help-item">Harrington</a>
          <a href="/gender/male/brand/glasses-direct/" class="GD017_help-item">Glasses Direct Collection</a>
          <a href="/gender/male/" class="GD017_help-item GD017_last-item">All Brands</a>
        </div>

        <div class="GD017_help-item GD017_reveal-hover">
          <a href="#">Shop by Price</a>
        </div>
        <div class="GD017_reveal-ds">
          <a href="/gender/male/price/20:59/" class="GD017_help-item">£20-£59</a>
          <a href="/gender/male/price/59:89/" class="GD017_help-item">£59-£89</a>
          <a href="/gender/male/price/89:119/" class="GD017_help-item">£89-£119</a>
          <a href="/gender/male/price/119:249/" class="GD017_help-item">£119-249</a>
        </div>

        <div class="GD017_help-item">
          <a href="/gender/male/">All men's frames</a>
        </div>

        <div class="GD017_help-item">
          <a href="/gender/male/?aspect=sun">Sunglasses</a>
        </div>

        <div class="GD017_help-item">
          <a href="/reglaze/">Reglaze your glasses</a>
        </div>

        <div class="GD017_help-item">
          <a href="https://www.glassesdirect.co.uk/vision-direct-contact-lenses/" target="_blank">Free contact lenses</a>
        </div>
      </div>
    </div>
  </div>
`;

export default getMaleTab;