function offersNav(offersContent) {
  const content = `
    <li class="item-level-1 nav-2for1 full-width">
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
              <li><a href="/gender/male/popular/2-for-1-designer/">2 for 1 Designer Glasses</a></li>
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
  `;

  return content;
}

export default offersNav;
