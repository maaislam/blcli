function offersNavMB(offersContent) {
  const content = `
    <div class="GD017_nav-item GD017_male-tab">
      <a class="GD017_nav-link GD017_reveal-more">Men</a>
      <div class="GD017_reveal">
        <a href="/gender/male/popular/2-for-1-from-49/" class="GD017_nav-link GD017_strapline">
          <strong>Essential</strong>
          <span class="GD017_strap">2 for 1 frames from £49</span>
        </a>
        <a href="/gender/male/popular/2-for-1-designer/" class="GD017_nav-link GD017_strapline">
          <strong>Designer</strong>
          <span class="GD017_strap">2 for 1 Designer frames from £69</span>
        </a>
        <a href="/gender/male/popular/boutique/" class="GD017_nav-link GD017_strapline">
          <strong>Boutique</strong>
          <span class="GD017_strap">Iconic brands from £69</span>
        </a>

        <a class="GD017_nav-link GD017_dd-button">Shop by Shape</a>
        <div class="GD017_dd-content GD017_shape-wrap">
          <a href="/gender/male/frameshape/rectangle/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-rectangle"></span> Rectangular</a>
          <a href="/gender/male/frameshape/round/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-round"></span> Round</a>
          <a href="/gender/male/frameshape/oval/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-oval"></span> Oval</a>
          <a href="/gender/male/frameshape/wayfarer/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-wayfarer"></span> Wayfarer</a>
          <a href="/gender/male/frameshape/aviator/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-aviator"></span> Aviator</a>
          <a href="/gender/male/" class="GD017_nav-link"><span class="GD017_ellip"></span>All Shapes</a>
        </div>

        <a class="GD017_nav-link GD017_dd-button">Shop by Brand</a>
        <div class="GD017_dd-content">
          <a href="/gender/male/brand/ray-ban/" class="GD017_nav-link">Ray-Ban</a>
          <a href="/gender/male/brand/london-retro/" class="GD017_nav-link">London Retro</a>
          <a href="/gender/male/brand/oakley" class="GD017_nav-link">Oakley</a>
          <a href="/gender/male/brand/scout/" class="GD017_nav-link">Scout</a>
          <a href="/gender/male/brand/harrington/" class="GD017_nav-link">Harrington</a>
          <a href="/gender/male/brand/glasses-direct/" class="GD017_nav-link">Glasses Direct Collection</a>
          <a href="/gender/male/" class="GD017_nav-link">All Brands</a>
        </div>

        <a class="GD017_nav-link GD017_dd-button">Shop by Price</a>
        <div class="GD017_dd-content">
          <a href="/gender/male/price/20:59/" class="GD017_nav-link">£20-£59</a>
          <a href="/gender/male/price/59:89/" class="GD017_nav-link">£59-£89</a>
          <a href="/gender/male/price/89:119/" class="GD017_nav-link">£89-£119</a>
          <a href="/gender/male/price/119:249/" class="GD017_nav-link">£119-249</a>
        </div>

        <a href="/gender/male/" class="GD017_nav-link">All Men's Frames</a>
        <a href="/reglaze/" class="GD017_nav-link">Reglaze Your Glasses</a>
        <a target="_blank" href="https://www.glassesdirect.co.uk/vision-direct-contact-lenses/" class="GD017_nav-link">Free contact lenses</a>
      </div>
    </div>

    <div class="GD017_nav-item GD017_female-tab">
      <a class="GD017_nav-link GD017_reveal-more">Women</a>
      <div class="GD017_reveal">
        <a href="/gender/female/popular/2-for-1-from-49/" class="GD017_nav-link GD017_strapline">
          <strong>Essential</strong>
          <span class="GD017_strap">2 for 1 frames from £49</span>
        </a>
        <a href="/gender/female/popular/2-for-1-designer/" class="GD017_nav-link GD017_strapline">
          <strong>Designer</strong>
          <span class="GD017_strap">2 for 1 Designer frames from £69</span>
        </a>
        <a href="/gender/female/popular/boutique/" class="GD017_nav-link GD017_strapline">
          <strong>Boutique</strong>
          <span class="GD017_strap">Iconic brands from £69</span>
        </a>

        <a class="GD017_nav-link GD017_dd-button">Shop by Shape</a>
        <div class="GD017_dd-content GD017_shape-wrap">
          <a href="/gender/female/frameshape/rectangle/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-rectangle"></span> Rectangular</a>
          <a href="/gender/female/frameshape/round/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-round"></span> Round</a>
          <a href="/gender/female/frameshape/oval/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-oval"></span> Oval</a>
          <a href="/gender/female/frameshape/wayfarer/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-wayfarer"></span> Wayfarer</a>
          <a href="/gender/female/frameshape/aviator/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-aviator"></span> Aviator</a>
          <a href="/gender/female/" class="GD017_nav-link"><span class="GD017_ellip"></span>All Shapes</a>
        </div>

        <a class="GD017_nav-link GD017_dd-button">Shop by Brand</a>
        <div class="GD017_dd-content">
          <a href="/gender/female/brand/scout/" class="GD017_nav-link">Scout Eyewear</a>
          <a href="/gender/female/brand/london-retro/" class="GD017_nav-link">London Retro</a>
          <a href="/gender/female/brand/dolce-gabbana" class="GD017_nav-link">Dolce & Gabbana</a>
          <a href="/gender/female/brand/aspire" class="GD017_nav-link">Aspire</a>
          <a href="/gender/female/brand/marc-jacobs/" class="GD017_nav-link">Marc Jacobs</a>
          <a href="/gender/female/brand/glasses-direct/" class="GD017_nav-link">Glasses Direct Collection</a>
          <a href="/gender/female/" class="GD017_nav-link">All Brands</a>
        </div>

        <a class="GD017_nav-link GD017_dd-button">Shop by Price</a>
        <div class="GD017_dd-content">
          <a href="/gender/female/price/20:59/" class="GD017_nav-link">£20-£59</a>
          <a href="/gender/female/price/59:89/" class="GD017_nav-link">£59-£89</a>
          <a href="/gender/female/price/89:119/" class="GD017_nav-link">£89-£119</a>
          <a href="/gender/female/price/119:249/" class="GD017_nav-link">£119-249</a>
        </div>

        <a href="/gender/female/" class="GD017_nav-link">All Women's Frames</a>
        <a href="/reglaze/" class="GD017_nav-link">Reglaze Your Glasses</a>
        <a target="_blank" href="https://www.glassesdirect.co.uk/vision-direct-contact-lenses/" class="GD017_nav-link">Free contact lenses</a>
      </div>
    </div>

    <div class="GD017_nav-item GD017_offers-tab">
      <a class="GD017_nav-link GD017_reveal-more">Special Offers</a>
      <div class="GD017_reveal">
        <a href="/popular/2-for-1-from-49/" class="GD017_nav-link">2-for-1 from £49</a>
        <a href="/popular/2-for-1-designer/" class="GD017_nav-link">2-for-1 from £69</a>
        <a href="/free-home-trial" class="GD017_nav-link">Free Home Trial</a>
        <a href="/student-discount/" class="GD017_nav-link">Students 50% Off</a>
        <a href="${offersContent[0].href}" class="GD017_nav-link GD017_offer-link"><img src="${offersContent[0].img}" /></a>
        <a href="${offersContent[1].href}" class="GD017_nav-link GD017_offer-link"><img src="${offersContent[1].img}" /></a>
        <a href="${offersContent[2].href}" class="GD017_nav-link GD017_offer-link"><img src="${offersContent[2].img}" /></a>
      </div>
    </div>

    <div class="GD017_nav-item GD017_helpme-tab">
      <a class="GD017_nav-link GD017_reveal-more">Help Me Choose</a>
      <div class="GD017_reveal">
        <a href="/help/face-shapes/" class="GD017_nav-link">Face Shape Advice</a>
        <a href="/best-fit/" class="GD017_nav-link">Best Fit Machine</a>
        <a href="/style-finder/" class="GD017_nav-link">Style Finder</a>
        <!-- <a href="/ditto-how-to/" class="GD017_nav-link">Virtual Try-On</a> -->
        <a href="/free-home-trial/" class="GD017_nav-link">Free Home Trial</a>
        <a href="/freepair/" class="GD017_nav-link">Free Second Pair</a>
        <a href="/lenses-eye-health-advice/#tips" class="GD017_nav-link">Tips and guides</a>
        <a target="_blank" href="https://blog.glassesdirect.co.uk/" class="GD017_nav-link">Blog</a>
        <a href="${offersContent[3].href}" class="GD017_nav-link GD017_offer-link"><img src="${offersContent[3].img}" /></a>
        <a href="${offersContent[4].href}" class="GD017_nav-link GD017_offer-link"><img src="${offersContent[4].img}" /></a>
        <a href="${offersContent[5].href}" class="GD017_nav-link GD017_offer-link"><img src="${offersContent[5].img}" /></a>
      </div>
    </div>

    <div class="GD017_nav-item GD017_FAQS">
      <a class="GD017_nav-link GD017_reveal-more">FAQs</a>
      <div class="GD017_reveal">
        <a href="/help/returns-policy/" class="GD017_nav-link">Free Returns</a>
        <a href="/help/delivery-times/" class="GD017_nav-link">Delivery</a>
        <a href="/understanding-your-eye-prescription/" class="GD017_nav-link">About Prescriptions</a>
        <a href="/eye-tests-how-often-importance/" class="GD017_nav-link">About Eye Tests</a>
        <a href="/help/lens-options-and-coatings/" class="GD017_nav-link">Lens Options and Coatings</a>
        <a href="/reglaze/" class="GD017_nav-link">New Lenses in your Glasses</a>
        <a href="/help/" class="GD017_nav-link">All FAQs</a>
      </div>
    </div>
  `;

  return content;
}

export default offersNavMB;