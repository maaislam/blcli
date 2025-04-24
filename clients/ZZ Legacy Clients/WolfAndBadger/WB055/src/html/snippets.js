/* eslint-disable */

export const logoCaption = `
    <div class="wb55-logo-caption">
        The World's Best Independent Brands
    </div>
`;

export const headlineCurated = `
    <div class="wb55-headline wb55-headline--curated wb55-bg-near-white">
        Each product curated by Wolf & Badger
    </div>
`;

export const newProductsContainer = `
    <div class="wb55-discover-new wb55-products-area wb55-pal10 wb55-par10">
        <h2 class="wb55-h2-title">Discover what's new</h2>
        <div class="wb55-discover-new__products wb55-products-area__products clearfix">
        </div>
    </div>
`;

export const womensNewIn = `
    <div class="product-summary wb55-product-summary-replacement wb55-bg-dark-grey wb55-womens-cta">
      <div class="WB055-New-In-Wrapper WB055-Responsive">
        <p class="WB055-New-In">New in</p>
        <a class="WB055-Women-New-In" href="/category/women/clothing/?new">Womenswear</a>
        <a class="WB055-Women-New-In" href="/category/women/accessories/?new">Accessories</a>
        <a class="WB055-Women-New-In" href="/category/women/jewellery/?new">Jewellery</a>
        <a class="WB055-Women-New-In" href="/category/women/beauty/?new">Beauty</a>
        <p class="WB055-New-In-Button-Wrapper">
          <a class="WB055-New-In-Button button wb55-mw200" href="/category/women/?new">Shop now</a>
        </p>
      </div>
    </div>
`;

export const headlineUnique = `
    <div class="wb55-headline wb55-headline--unique wb55-bg-near-white">
        Unique, ethical, independent design
    </div>
`;

/*
export const headlineFashion = `
    <div class="wb55-headline wb55-headline--fresh wb55-bg-near-white">
        Fresh fashion not found on the high street
    </div>
`;
*/

export const editorsProductsContainer = `
    <div class="wb55-editors-picks wb55-products-area wb55-pal10 wb55-par10">
        <h2 class="wb55-h2-title">Our editor’s picks</h2>
        <div class="wb55-editors-picks__products wb55-products-area__products clear">
        </div>
    </div>
`;

export const shopHomeware = `
     <a class="product-summary wb55-product-summary-replacement wb55-bg-near-white wb55-homeware-cta WB055-Responsive" style="background-image: url(${document.querySelector('#home-category-boxes > .bottom-row .span6:last-child .image-container > a > img').src})" href="/category/homewares/">
        <p class="WB055-Homewares-Text">Homeware</p>
        <p class="WB055-Homewares-Button-Wrapper">
            <span class="WB055-Homewares-Button button wb55-mw200">Shop now</span>
        </p>
    </a>
`;

export const menNewTopLinks = `
  <li class="category-nav-links">
    <a href="/category/men/?new">New</a>
  </li>
  
    <span>/</span>

  <li class="category-nav-links">
    <a href="/category/men/jewellery/">Jewellery</a>
  </li>

  <span>/</span>
  
  <li class="category-nav-links">
    <a href="/category/men/accessories/">Accessories</a>
  </li>
  
    <span>/</span>

  <li class="category-nav-links">
    <a href="/category/men/clothing/">Clothing</a>
  </li>

  <span>/</span>

  <li class="category-nav-links">
    <a href="/category/men/grooming/">Grooming</a>
  </li>
  
    <span>/</span>
  

  <li class="category-nav-links">
    <a href="/category/men/?onsale=true">Sale</a>
  </li>
`;

export const getKidsBox = (kidsImageUrl) => {
  return `
        <div class="span6 WB055_ver WB055_height-match">
            <div class="category_box">
              <div class="image-container">
                  <div class="img-link">
                    <a href="/category/homewares/" class="bannerlinkoverlay">
                        BROWSE <span class="undertitletext">Homeware</span>
                    </a>
                  </div>
                  <a href="/category/homewares/"><span class="WB055-BG-Image" style="background-image: url(${kidsImageUrl})"></span></a>
              </div>
              <div class="undertopimagelinks">
                  <ul class="toplinks">
                      <li class="category-nav-links">
                        <a href="/category/homewares/home-decoration/">Home Decoration</a>
                      </li>
                      <span>/</span>
                      <li class="category-nav-links">
                        <a href="/category/homewares/kitchen-and-bathroom/">Kitchen & Bathroom</a>
                      </li>
                      <span>/</span>
                      <li class="category-nav-links">
                        <a href="/category/homewares/lighting/">Lighting</a>
                      </li>
                      <span>/</span>
                      <li class="category-nav-links">
                        <a href="/category/homewares/fun-stuff/">Fun Stuff</a>
                      </li>
                  </ul>
              </div>
            </div>
        </div>
    `;
};

export const ourStory = `
    <div class="wb55-our-story wb55-mt20 wb55-bg-near-white wb55-pa20">
        <h2 class="wb55-h2-title wb55-mt0">Our Story</h2>
        <p class="text-center">Wolf & Badger is home to over 600 independent designers and artisans just waiting to be discovered, who we have carefully selected from all over the world.</p>
        <p class="text-center wb55-mb0">
            <a class="button wb55-mw200" href="/pages/about/">More about us</a>
        </p>
    </div>
`;

export const headlineDesignerSupport = `
    <div class="wb55-headline wb55-headline--designer-support wb55-bg-near-white wb55-mt20">
        We support independent designers, you can too
    </div>
`;
