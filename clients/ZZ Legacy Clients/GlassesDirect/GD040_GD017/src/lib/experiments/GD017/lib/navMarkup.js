function offersNav(offersContent) {
  const content = `
    <li class="item-level-1 nav-2for1 GD017_fullWidth full-width">
      <a href="/popular/2-for-1-from-49+2-for-1-designer/"" class="no-pointer-events">Special Offers</a>
      <div class="list-container-level-2">
        <div class="GD017_container">
          <div class="GD017_offers-block">
            <label>Offers for him</label>
            <ul>
              <li><a href="/gender/male/popular/2-for-1-from-49/">2 for 1 from £49</a></li>
              <li><a href="/gender/male/popular/2-for-1-designer/">2 for 1 Designer Glasses</a></li>
              <li><a href="/free-home-trial">Free Home Trial</a></li>
              <li><a href="/student-discount/">Students 50% Off</a></li>
            </ul>
          </div>
          <div class="GD017_offers-block">
            <label>Offers for her</label>
            <ul>
              <li><a href="/gender/female/popular/2-for-1-from-49/">2 for 1 from £49</a></li>
              <li><a href="/gender/female/popular/2-for-1-designer/">2 for 1 Designer Glasses</a></li>
              <li><a href="/free-home-trial">Free Home Trial</a></li>
              <li><a href="/student-discount/">Students 50% Off</a></li>
            </ul>
          </div>
          <div class="GD017_hero-banner-wrap">
            <a href="${offersContent[0].href}" style="background-image: url('${offersContent[0].img}');" class="GD017_hero-banner"></a>
          </div>
          <div class="GD017_offer-banners">
            <a href="${offersContent[1].href}" style="background-image: url('${offersContent[1].img}');" class="GD017_banner"></a>
            <a href="${offersContent[2].href}" style="background-image: url('${offersContent[2].img}');" class="GD017_banner"></a>
          </div>
        </div>
      </div>
    </li>

    <li class="item-level-1 nav-help GD017_fullWidth full-width">
      <a href="/help-me-choose/">Help & FAQ</a>
      <div class="list-container-level-2">
        <div class="GD017_container">
          <div class="GD017_offers-block">
            <label>Help me choose</label>
            <ul>
              <li><a href="/help/face-shapes/">Face shape advice</a></li>
              <li><a href="/best-fit/">Best Fit Machine</a></li>
              <li><a href="/style-finder">Style finder</a></li>
              <li><a href="/free-home-trial/">Free Home Trial</a></li>
              <li><a href="/free-second-pair/">Free second pair</a></li>
              <li><a href="/lenses-eye-health-advice/#tips">Tips and guides</a></li>
              <li><a href="https://blog.glassesdirect.co.uk/">Blog</a></li>
            </ul>
          </div>
          <div class="GD017_offers-block">
            <label>FAQs</label>
            <ul>
              <li><a href="/help/returns-policy/">Free returns</a></li>
              <li><a href="/help/delivery-times/">Delivery</a></li>
              <li><a href="/understanding-your-eye-prescription/">About prescriptions</a></li>
              <li><a href="/eye-tests-how-often-importance/">About eye tests</a></li>
              <li><a href="/help/lens-options-and-coatings/">Lens options and coatings</a></li>
              <li><a href="/reglaze/">New lenses in your glasses</a></li>
              <li><a href="/help/">All FAQs</a></li>
            </ul>
          </div>
          <div class="GD017_hero-banner-wrap">
            <a href="${offersContent[3].href}" style="background-image: url('${offersContent[3].img}');" class="GD017_hero-banner"></a>
          </div>
          <div class="GD017_offer-banners">
            <a href="${offersContent[4].href}" style="background-image: url('${offersContent[4].img}');" class="GD017_banner"></a>
            <a href="${offersContent[5].href}" style="background-image: url('${offersContent[5].img}');" class="GD017_banner"></a>
          </div>
        </div>
      </div>
    </li>
  `;

  return content;
}

export default offersNav;
