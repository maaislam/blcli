const productBanner = (id) => {
  const htmlStr = `

    <div class="${id}__productbanner">
        <div class="${id}__productbanner--col1">
            <div class="banner-title">Get Fully Protected</div>
            <div class="banner-subtitle">Add our bestselling protective gloves to your basket</div>
        </div>
        <div class="${id}__productbanner--col2">
            <div class="product-image">
                <img src="https://media.screwfix.com/is/image//ae235?src=ae235/458FR_P&$prodImageMedium$"
                    alt="gloves black">
            </div>
            <div class="title-wrapper">
                <div class="product-title">Site 120 PU Palm Dip Gloves Black Large<span class="sku">(458FR)</span></div>
                <div class="${id}__show-mobile AVYP1F"><div class="_7Vfpc0" data-qaid="pdp-price"><span class="ogtgsW">£</span><span class="_U1S20">1</span><span class="xIIluZ">.<!-- -->49</span><span class="DFQwGV" data-qaid="pdp-vat-toggle">Inc Vat</span></div></div>
            </div>  
        </div>
        <div class="${id}__productbanner--col3">
            <div class="${id}__show-desktop AVYP1F"><div class="_7Vfpc0" data-qaid="pdp-price"><span class="ogtgsW">£</span><span class="_U1S20">1</span><span class="xIIluZ">.<!-- -->49</span><span class="DFQwGV" data-qaid="pdp-vat-toggle">Inc Vat</span></div></div>
            <div class="product-view _5Q5feo">
                <a class="DtE_nS noWGnz cxugKY mbiC2z" href="/p/site-120-pu-palm-dip-gloves-black-large/458fr">View Product</a>
            </div>
        </div>
    </div>`;

  return htmlStr.trim();
};

export default productBanner;
