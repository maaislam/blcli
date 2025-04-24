const getFemaleTab = (data) => `
  <div class="GD017_container GD017_male-wrap">
    <div class="GD017_img-wrap">
    ${!data.var1female1link ? '' : `
      <div class="GD017_img-block">
        <a href="${data.var1female1link}" class="GD017_img-link">
          <img src="${data.var1female1img}" />
          <label>${data.var1female1name}</label>
        </a>
        <span>${data.var1female1text}</span>
      </div>
    `}

    ${!data.var1female2link ? '' : `
      <div class="GD017_img-block">
        <a href="${data.var1female2link}" class="GD017_img-link">
          <img src="${data.var1female2img}" />
          <label>${data.var1female2name}</label>
        </a>
        <span>${data.var1female2text}</span>
      </div>
    `}

    ${!data.var1female3link ? '' : `
      <div class="GD017_img-block">
        <a href="${data.var1female3link}" class="GD017_img-link">
          <img src="${data.var1female3img}" />
          <label>${data.var1female3name}</label>
        </a>
        <span>${data.var1female3text}</span>
      </div>
    `}
    </div>

    <div class="GD017_link-wrap">
      <div class="GD017_link-inner">
        <div class="GD017_help-item GD017_reveal-hover">
          <a href="#">Shop by Shape</a>
        </div>
        <div class="GD017_reveal-ds GD017_shape-wrap">
          <a href="/gender/female/frameshape/rectangle/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-rectangle"></span> Rectangular</a>
          <a href="/gender/female/frameshape/round/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-round"></span> Round</a>
          <a href="/gender/female/frameshape/oval/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-oval"></span> Oval</a>
          <a href="/gender/female/frameshape/wayfarer/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-wayfarer"></span> Wayfarer</a>
          <a href="/gender/female/frameshape/aviator/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-aviator"></span> Aviator</a>
          <a href="/gender/female/" class="GD017_shape-item"><span class="GD017_ellip"></span>All Shapes</a>
        </div>

        <div class="GD017_help-item GD017_reveal-hover">
          <a href="#">Shop by Brand</a>
        </div>
        <div class="GD017_reveal-ds">
        <a href="/gender/female/brand/scout/" class="GD017_help-item">Scout Eyewear</a>
        <a href="/gender/female/brand/london-retro/" class="GD017_help-item">London Retro</a>
        <a href="/gender/female/brand/dolce-gabbana" class="GD017_help-item">Dolce & Gabbana</a>
        <a href="/gender/female/brand/aspire" class="GD017_help-item">Aspire</a>
        <a href="/gender/female/brand/marc-jacobs/" class="GD017_help-item">Marc Jacobs</a>
        <a href="/gender/female/brand/glasses-direct/" class="GD017_help-item">Glasses Direct Collection</a>
        <a href="/gender/female/" class="GD017_help-item GD017_last-item">All Brands</a>
        </div>

        <div class="GD017_help-item GD017_reveal-hover">
          <a href="#">Shop by Price</a>
        </div>
        <div class="GD017_reveal-ds">
          <a href="/gender/female/price/20:59/" class="GD017_help-item">£20-£59</a>
          <a href="/gender/female/price/59:89/" class="GD017_help-item">£59-£89</a>
          <a href="/gender/female/price/89:119/" class="GD017_help-item">£89-£119</a>
          <a href="/gender/female/price/119:249/" class="GD017_help-item">£119-249</a>
        </div>

        <div class="GD017_help-item">
          <a href="/gender/female/">All women's frames</a>
        </div>

        <div class="GD017_help-item">
          <a href="/gender/female/?aspect=sun">Sunglasses</a>
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

export default getFemaleTab;
