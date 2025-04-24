/**
 * Change image reference to production when going live:
 * Production: #$(ContentManager:{{name}})!
 * Development: https://ab-test-sandbox.userconversion.com/experiments/{{name}}
 */

/**
 * @desc Data for the navigation dropdown
 */
const data = [
  {
    name: 'Sale',
    url: '/webstore/offers.do?icid=ej-tn-summer-sp',
    html: `
    <div class="HS003_col-2">
        <ul class="HS003_navListing">
          <li class="HS003_heading">Sale for Her</li>
          <li><a href="/webstore/l/select%7csale/?icid=HS-nv-sale-for-her">Shop All Sale</a></li>
          <li><a href="/webstore/l/watches/select%7Csale/recipient%7Cher/?icid=HS-nv-sale-ladies-watches">Watches</a></li>
          <li><a href="/webstore/l/jewellery/category%7Crings/recipient%7Cher/select%7Csale/">Rings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Crings/occasion%7Cengagement/recipient%7Cher/select%7Csale/">Engagement Rings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Crings/occasion%7Cwedding/recipient%7Cher/select%7Csale/">Wedding rings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cearrings/recipient%7Cher/select%7Csale/">Earrings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cbracelets/recipient%7Cher/select%7Csale/">Bracelets</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cnecklaces/recipient%7Cher/select%7Csale/">Necklaces</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cbeads+%26+charms/recipient%7Cher/select%7Csale/">Beads and charms</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cjewellery+sets/recipient%7Cher/select%7Csale/">Jewellery sets</a></li>
        </ul>
      </div>

      <div class="HS003_col-2">
        <ul class="HS003_navListing">
          <li class="HS003_heading">Sale for Him</li>
          <li><a href="/webstore/l/select%7csale/?icid=HS-nv-sale-for-him">Shop All Sale</a></li>
          <li><a href="/webstore/l/watches/select%7Csale/recipient%7Chim/?icid=HS-nv-sale-mens-watches">Watches</a></li>
          <li><a href="/webstore/l/search/category%7Crings/recipient%7Chim/select%7Csale/">Rings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Crings/occasion%7Cwedding/recipient%7Chim/select%7Csale/">Wedding Rings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cbracelets/recipient%7Chim/select%7Csale/">Bracelets</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cnecklaces/recipient%7Chim/select%7Csale/">Necklaces</a></li>
        </ul>
      </div>

      <div class="HS003_col-2">
        <ul class="HS003_navListing">
          <li class="HS003_heading">Sale by Price</li>
          <li><a href="/webstore/l/select%7Csale/?Nf=P_Current_Price%7CBTWN+0+50&icid=HS-nv-sale-0-50"> > £50</a></li>
          <li><a href="/webstore/l/select%7Csale/?Nf=P_Current_Price%7CBTWN+50+100&icid=HS-nv-sale-50-100">£50 - £100</a></li>
          <li><a href="/webstore/l/select%7Csale/?Nf=P_Current_Price%7CBTWN+150+200&icid=HS-nv-sale-150-200">£100 - £150</a></li>
          <li><a href="/webstore/l/select%7Csale/?Nf=P_Current_Price%7CBTWN+150+200&icid=HS-nv-sale-150-200">£150 - £200</a></li>
          <li><a href="/webstore/l/select%7Csale/?Nf=P_Current_Price%7CBTWN+200+9999999&icid=HS-nv-sale-200-plus">£200+</a></li>
        </ul>
      </div>

      <div class="HS003_col-2">
        <ul class="HS003_navListing">
          <li class="HS003_heading">Top Sale Watch brands</li>
          <li><a href="/webstore/l/watches/brand%7Ccitizen/select%7Csale/">Citizen</a></li>
          <li><a href="/webstore/l/watches/brand%7Ccasio/select%7Csale/">Casio</a></li>
          <li><a href="/webstore/l/watches/brand%7rotary/select%7Csale/">Rotary</a></li>
          <li><a href="/webstore/l/watches/brand%7Cbulova/select%7Csale/">Bulova</a></li>
          <li><a href="/webstore/l/watches/brand%7Csekonda/select%7Csale/">Sekonda</a></li>
          <li><a href="/webstore/l/watches/brand%7Cseiko/select%7Csale/">Seiko</a></li>
          <li><a href="/webstore/l/watches/brand%7Cguess/select%7Csale/">Guess</a></li>
          <li><a href="/webstore/l/watches/brand%7Cseksy/select%7Csale/">Seksy</a></li>
          <li><a href="/webstore/l/watches/brand%7Cradley/select%7Csale/">Radley</a></li>
        </ul>
      </div>

      <div class="HS003_col-2">
        <ul class="HS003_navListing">
          <li class="HS003_heading">Top Sale Jewellery brands</li>
          <li><a href="/webstore/l/jewellery/brand%7Cthe+forever+diamond/select%7Csale/?icid=HS-nv-sale-the-forever-diamond">The Forever Diamond</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Cperfect+fit/select%7Csale/">Perfect Fit</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Cprincessa/select%7Csale/">Princessa</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Cchamilia/select%7Csale/">Chamilia</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Cguess/select%7Csale/">Guess</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Cdisney/select%7Csale/">Disney</a></li>
        </ul>
      </div>
    `,
  },
  {
    name: 'Watches',
    url: '/webstore/watches.do?icid=HS-nv-watches-page-shop',
    html: `
      <div class="HS003_col-5ths">
        <ul class="HS003_navListing">
          <li class="HS003_heading">Watches By Collection</li>
          <li><a href="/webstore/l/watches/?icid=HS-nv-watches-all">All Watches</a></li>
          <li><a href="/webstore/l/watches/recipient%7Chim/?icid=HS-nv-watches-mens">Men's Watches</a></li>
          <li><a href="/webstore/l/watches/recipient%7Cher/?icid=HS-nv-watches-ladies">Ladies Watches</a></li>
          <li><a href="/webstore/l/watches/select%7Cexclusive/?icid=HS-nv-watches-exclusive">Exclusive Watches</a></li>
          <li><a href="/webstore/l/watches/category%7Cactivity+tracker%7Csmart+watches/?icid=HS-nv-watches-smartwatches">Smart Watches</a></li>
          <li><a href="webstore/l/watches/select%7Cnew/?icid=HS-nv-watches-new-in">New Watches</a></li>
          <li><a href="/webstore/l/watches/rating%7C5+stars/?icid=HS-nv-watches-top-rated">Top Rated Watches</a></li>
          <li class="HS003_linkRed"><a href="/webstore/l/watches/select%7Csale/?icid=HS-nv-watches-sale">Sale Watches</a></li>
        </ul>
      </div>

      <div class="HS003_col-5ths">
        <ul class="HS003_navListing">
          <li class="HS003_heading">Popular For Him</li>
          <li><a href="/webstore/l/watches/recipient%7Chim/?icid=HS-nv-watches-mens">All Watches For Him</a></li>
          <li><a href="/webstore/l/watches/brand%7Ccitizen/recipient%7Chim/">Citizen</a></li>
          <li><a href="/webstore/l/watches/brand%7Ccasio/recipient%7Chim/">Casio</a></li>
          <li><a href="/webstore/l/watches/brand%7Crotary/recipient%7Chim/">Rotary</a></li>
          <li><a href="/webstore/l/watches/brand%7Cbulova/recipient%7Chim/">Bulova</a></li>
          <li><a href="/webstore/l/watches/brand%7Csekonda/recipient%7Chim/">Sekonda</a></li>
          <li><a href="/webstore/l/watches/brand%7Cseiko/recipient%7Chim/">Seiko</a></li>
          <li class="HS003_linkRed"><a href="/webstore/l/watches/price%7Con+sale/recipient%7Chim/">Sale</a></li>
        </ul>
      </div>

      <div class="HS003_col-5ths">
        <ul class="HS003_navListing">
          <li class="HS003_heading">Popular For Her</li>
          <li><a href="/webstore/l/watches/recipient%7Cher/?icid=HS-nv-watches-ladies">All Watches For Her</a></li>
          <li><a href="/webstore/l/watches/brand%7Cseksy/recipient%7Cher/">Seksy</a></li>
          <li><a href="/webstore/l/watches/brand%7Csekonda/recipient%7Cher/">Sekonda</a></li>
          <li><a href="/webstore/l/watches/brand%7Ccitizen/recipient%7Cher/">Citizen</a></li>
          <li><a href="/webstore/l/watches/brand%7Cguess/recipient%7Cher/">Guess</a></li>
          <li><a href="/webstore/l/watches/brand%7Crotary/recipient%7Cher/">Rotary</a></li>
          <li><a href="/webstore/l/watches/brand%7Cradley/recipient%7Cher/">Radley</a></li>
          <li class="HS003_linkRed"><a href="/webstore/l/watches/price%7Con+sale/recipient%7Cher/">Sale</a></li>
        </ul>
      </div>

      <div class="HS003_col-2-5ths">
        <div class="HS003_fullWidthBanner">
          <a href="/webstore/l/search/brand%7ccitizen/stock+position%7Cin+stock/">
          <div class="HS003-banner" style="background-image: url('#$(ContentManager:HS18W67_Watches_TopNav_Citizen_897x2911.jpg)!');"></div>
          </a>
        </div>
        <div class="HS003_fullWidthBanner">
          <a href="/webstore/l/search/brand%7ccasio/stock+position%7cin+stock/">
          <div class="HS003-banner" style="background-image: url('#$(ContentManager:HS18W67_Watches_TopNav_Casio_897x2911.jpg)!');"></div>
          </a>
        </div>
        <div class="HS003_fullWidthBanner">
          <a href="/webstore/l/search/brand%7cseksy/stock+position%7cin+stock/">
          <div class="HS003-banner" style="background-image: url('#$(ContentManager:HS18W67_Watches_TopNav_Seksy_897x2911.jpg)!');"></div>
          </a>
        </div>
      </div>
    `,
  },
  {
    name: 'Engagement',
    url: '/diamonds/?icid=HS-nv-engagement-page-shop',
    html: `
      <div class="HS003_col-2">
        <ul class="HS003_navListing">
          <li class="HS003_heading">By Category</li>
          <li><a href="/webstore/l/diamonds/category%7Crings/occasion%7Cengagement/?icid=HS-nv-engagement-rings-all">All Engagement Rings</a></li>
          <li><a href="/webstore/l/diamonds/category%7Crings/occasion%7Cengagement/stone+style%7Csolitaire/">Solitaire Rings</a></li>
          <li><a href="/webstore/l/diamonds/stone+style%7Cbridal+set/occasion%7Cengagement/?icid=HS-nv-engagement-bridal-sets">Bridal Sets</a></li>
          <li><a href="/webstore/l/diamonds/category%7Crings/stone+style%7Ccluster/?icid=HS-nv-engagement-diamond-cluster">Cluster Rings</a></li>
          <li><a href="/webstore/l/diamonds/category%7Crings/stone+style%7Ceternity/?icid=HS-nv-engagement-diamond-eternity">Eternity Rings</a></li>
          <li class="HS003_linkRed"><a href="/webstore/l/diamonds/occasion%7Cengagement/category%7Crings/select%7Csale/?icid=HS-nv-sale-engagement-rings">Sale</a></li>
        </ul>
      </div>

      <div class="HS003_col-2">
        <ul class="HS003_navListing">
          <li class="HS003_heading">By Metal Type</li>
          <li><a href="/webstore/l/diamonds/material%7Cyellow+gold/category%7Crings/occasion%7Cengagement/?icid=HS-nv-engagement-yellow-gold">Yellow Gold</a></li>
          <li><a href="/webstore/l/diamonds/material%7Cwhite+gold/category%7Crings/occasion%7Cengagement/?icid=HS-nv-engagement-white-gold">White Gold</a></li>
          <li><a href="/webstore/l/diamonds/category%7Crings/material%7Crose+gold/occasion%7Cengagement/?icid=HS-nv-engagement-rose-gold">Rose Gold</a></li>
          <li><a href="/webstore/l/diamonds/category%7Crings/material%7Cplatinum/occasion%7Cengagement/?icid=HS-nv-engagement-platinum">Platinum</a></li>
          <li><a href="/webstore/l/diamonds/category%7Crings/material%7Call+silver/occasion%7Cengagement/?icid=HS-nv-engagement-silver">Silver</a></li>
          <li><a href="/webstore/l/diamonds/material%7Ctwo+colour+gold/occasion%7Cengagement/?icid=HS-nv-engagement-two-colour-gold">Two Colour Gold</a></li>
        </ul>
      </div>

      <div class="HS003_col-2">
        <ul class="HS003_navListing">
          <li class="HS003_heading">Brand</li>
          <li><a href="/foreverdiamond/?icid=HS-nv-engagement-forever-diamond-shop">The Forever Diamond</a></li>
          <li><a href="/webstore/l/diamonds/material%7Cyellow+gold/category%7Cjewellery/">Perfect Fit</a></li>
          <li><a href="/webstore/l/diamonds/material%7Crose+gold/category%7Cjewellery/">Princessa</a></li>
          <li><a href="/webstore/l/diamonds/material%7Cplatinum/category%7Cjewellery/">Emmy London</a></li>
          <li><a href="/webstore/l/diamonds/material%7Call+silver/category%7Cjewellery/">The One</a></li>
          <li><a href="/webstore/l/diamonds/material%7Call+silver/category%7Cjewellery/">Ever Us</a></li>
          <li><a href="/webstore/l/diamonds/material%7Call+silver/category%7Cjewellery/">Chocolate by Petite Levian</a></li>
          <li><a href="/webstore/l/diamonds/material%7Call+silver/category%7Cjewellery/">Open Hearts</a></li>
        </ul>
      </div>
      
      <div class="HS003_col-2">
        <ul class="HS003_navListing">
          <li class="HS003_heading">Buying Guide</li>
          <li><a href="/webstore/engagement/introduction.cdo?icid=HS-nv-engagement-intro-guide">Engagement Ring Buyer's Guide</a></li>
          <li><a href="/webstore/engagement/technicalHelp.cdo?icid=HS-nv-engagement-diamonds-help-guide">Learn More About Diamonds</a></li>
          <li><a href="/webstore/engagement/technicalHelp/ringSizing.cdo?icid=HS-nv-engagement-ring-sizing-guide">Ring Sizing</a></li>
          <li><a href="/webstore/jewellery/metalGuide.cdo?icid=HS-nv-diamonds-metal-guide>Metal Guide</a></li>
          <li><a href="/webstore/engagement/ringStyle.cdo?icid=HS-nv-engagement-rings-styles-guide">Ring Styles</a></li>
        </ul>
      </div>

      <div class="HS003_col-4">
        <div class="HS003_fullWidthBanner">
          <a href="/webstore/brands/TheOne.do?icid=HS-nv-diamonds-the-one-shop">
          <div class="HS003-banner" style="background-image: url('#$(ContentManager:theOne.png)!');"></div>
          </a>
        </div>
        <div class="HS003_fullWidthBanner">
          <a href="/foreverdiamond/?icid=HS-nv-diamonds-forever-diamond-shop">
            <div class="HS003-banner" style="background-image: url('#$(ContentManager:forever.png)!');"></div>
          </a>
        </div>
        <div class="HS003_fullWidthBanner">
          <a href="/perfectfit/?icid=HS-nv-diamonds-perfect-fit-shop">
            <div class="HS003-banner" style="background-image: url('#$(ContentManager:Diamonds3.png)!');"></div>
          </a>
        </div>
      </div>
    `,
  },
  {
    name: 'Jewellery',
    url: '/webstore/jewellery.do?icid=HS-nv-jewellery-page-shop',
    html: `
      <div class="HS003_col-2">
        <ul class="HS003_navListing">
          <li class="HS003_heading">By Occasion</li>
          <li><a href="/diamonds/?icid=HS-nv-engagement-page-shop">Engagement</a></li>
          <li><a href="/webstore/l/jewellery/occasion%7Cwedding/?icid=HS-nv-jewellery-wedding-jewellery">Wedding</a></li>
          <li><a href="/webstore/l/jewellery/occasion%7canniversary/">Anniversaries</a></li>
          <li><a href="/webstore/l/jewellery/occasion%7Cchristening/">Christening</a></li>
          <li><a href="/webstore/l/jewellery/occasion%7Cbirthday/">Birthdays</a></li>
          <li class="HS003_linkRed"> <a href="/webstore/l/jewellery/select%7Csale/">Sale</a></li>
        </ul>
      </div>

      <div class="HS003_col-2">
        <ul class="HS003_navListing">
          <li class="HS003_heading">For Her</li>
          <li><a href="/webstore/l/jewellery/category%7Crings/recipient%7Cher/">Rings</a></li>
          <li><a href="/webstore/l/diamonds/category%7Crings/occasion%7Cengagement/?icid=HS-nv-engagement-rings-all">Engagement rings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Crings/occasion%7Cwedding/recipient%7Cher/">Wedding rings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cearrings/recipient%7Cher/">Earrings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cbracelets/recipient%7Cher/">Bracelets</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cnecklaces/recipient%7Cher/">Necklaces</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cbeads+%26+charms/recipient%7Cher/">Beads and charms</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cjewellery+sets/recipient%7Cher/">Jewellery sets</a></li>
          <li><a href="/webstore/l/jewellery/recipient%7Cher/">Gifts for her</a></li>
          <li class="HS003_linkRed"><a href="/webstore/l/jewellery/price%7Con+sale/recipient%7Cher/">Sale</a></li>
        </ul>
      </div>

      <div class="HS003_col-2">
        <ul class="HS003_navListing">
          <li class="HS003_heading">For Him</li>
          <li><a href="/webstore/l/jewellery/category%7Crings/recipient%7Chim/">Rings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Crings/occasion%7Cwedding/recipient%7Chim/">Wedding rings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cbracelets/recipient%7Chim/">Bracelets</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cnecklaces/recipient%7Chim/">Necklaces</a></li>
          <li><a href="/webstore/l/jewellery/recipient%7Chim/">Gifts for him</a></li>
          <li class="HS003_linkRed"><a href="/webstore/l/jewellery/price%7Con+sale/recipient%7Chim/">Sale</a></li>
        </ul>
      </div>
      
      <div class="HS003_col-2">
        <ul class="HS003_navListing">
          <li class="HS003_heading">Brands</li>
          <li><a href="/chamilia/?icid=HS-nv-jewellery-chamilia-shop">Chamilia</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Cdisney/">Disney</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Cenchanted+disney/">Enchanted Disney Fine Jewelry</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Cclogau/?icid=HS-nv-jewellery-clogau">Clogau</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Cguess/?icid=HS-nv-jewellery-guess">Guess</a></li>
          <li><a href="/webstore/brands/Bodifine.cdo?icid=HS-nv-jewellery-bodifine-shop">Bodifine</a></li>
          <li><a href="/emmyLondon/?icid=HS-nv-jewellery-emmy-london-shop">Emmy London</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Chot+diamonds/category%7Cjewellery/?icid=HS-nv-jewellery-hot-diamonds">Hot Diamonds</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Cmikey/?icid=HS-nv-jewellery-mikey">Mikey Jewellery</a></li>
          <li><a href="/webstore/l/search/brand%7Cbuckley+london/?icid=HS-nv-jewellery-buckley_london">Buckley</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Ccalvin%20klein%20jewellery/?icid=HS-nv-jewellery-calvin_klein">Calvin Klein</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Ctommy%20hilfiger/?icid=HS-nv-jewellery-tommy-hilfiger">Tommy Hilfiger</a></li>
          <li class="HS003_heading"><a href="/webstore/brand-index.do?icid=HS-nv-Brand_Index-Shop">View All Brands</a></li>
        </ul>
      </div>

      <div class="HS003_col-4">  
        <div class="HS003_fullWidthBanner">
          <a href="/emmyLondon/?icid=HS-nv-jewellery-emmy-london-shop">
            <div class="HS003-banner" style="background-image: url('#$(ContentManager:Emmy.png)!');"></div>
          </a>
        </div>
        <div class="HS003_fullWidthBanner">
          <a href="/childrens/?icid=HS-jp-summer-sale-children-jewellery">
          <div class="HS003-banner" style="background-image: url('#$(ContentManager:childrenJewellery.jpg)!');"></div>
          </a>
        </div>
        <div class="HS003_fullWidthBanner">
          <a href="/webstore/l/jewellery/brand%7Cdisney/">
          <div class="HS003-banner" style="background-image: url('#$(ContentManager:897x291.jpg)!');"></div>
          </a>
        </div>
      </div>
    `,
  },
  {
    name: 'Diamonds',
    url: '/webstore/diamonds.cdo?icid=HS-nv-diamonds-page-shop',
    html: `
    <div class="HS003_col-5ths">
        <ul class="HS003_navListing">
          <li class="HS003_heading">By Category</li>
          <li><a href="/diamonds/?icid=HS-nv-engagement-page-shop">All Diamonds</a></li>
          <li><a href="/webstore/l/diamonds/category%7Cjewellery/category%7Cnecklaces/?icid=HS-nv-diamonds-necklaces">Diamond Necklaces</a></li>
          <li><a href="/webstore/l/diamonds/category%7Cbracelets/?icid=HS-nv-diamonds-bracelets">Diamond Bracelets</a></li>
          <li><a href="/webstore/l/diamonds/category%7Cjewellery+sets/?icid=HS-nv-diamonds-jewellery-sets">Diamond Jewellery Sets</a></li>
          <li><a href="/webstore/l/jewellery/collection%7Cgemstone+jewellery/?icid=HS-nv-diamonds-gemstones">Diamond Gemstones</a></li>
          <li class="HS003_linkRed"> <a href="/webstore/l/diamonds/select%7Csale/?icid=HS-nv-diamonds-sale">Sale</a></li>
        </ul>
      </div>

      <div class="HS003_col-5ths">
        <ul class="HS003_navListing">
          <li class="HS003_heading">Diamond Rings</li>
          <li><a href="/webstore/l/diamonds/category%7Crings/occasion%7Cengagement/?icid=HS-nv-diamonds-engagement-rings">Diamond Engagement Rings</a></li>
          <li><a href="/webstore/l/diamonds/category%7Crings/stone+style%7Csolitaire/?icid=HS-nv-diamonds-solitaire-rings">Diamond Solitaire Rings</a></li>
          <li><a href="/webstore/l/diamonds/category%7Crings/ring+style%7Cbridal+set/?icid=HS-nv-diamonds-bridal-sets">Diamond Bridal Sets</a></li>
          <li><a href="webstore/l/diamonds/category%7Crings/stone+style%7Ccluster/?icid=HS-nv-diamonds-cluster-rings">Diamond Cluster Rings</a></li>
          <li><a href="/webstore/l/diamonds/category%7Crings/stone+style%7Ceternity/?icid=HS-nv-diamons-eternity-rings">Diamond Eternity Rings</a></li>
          <li><a href="/webstore/l/diamonds/category%7Crings/occasion%7Cwedding/?icid=HS-nv-diamonds-wedding-rings">Diamond Wedding Rings</a></li>
          <li><a href="/webstore/l/diamonds/collection%7cPromise+Rings/?icid=HS-nv-diamonds-promise-rings">Diamond Promise Rings</a></li>
          <li class="HS003_linkRed"><a href="/webstore/l/diamonds/select%7Csale/?icid=HS-nv-diamonds-sale">Sale</a></li>
        </ul>
      </div>

      <div class="HS003_col-5ths">
        <ul class="HS003_navListing">
          <li class="HS003_heading">By Brand</li>
          <li><a href="/foreverdiamond/?icid=HS-nv-diamonds-forever-diamond-shop">The Forever Diamond</a></li>
          <li><a href="/perfectfit/?icid=HS-nv-diamonds-perfect-fit-shop">Perfect Fit</a></li>
          <li><a href="/webstore/jewellery/brands/princessa.cdo?icid=HS-nv-diamonds-princessa-shop">Princessa</a></li>
          <li><a href=".emmyLondon/?icid=HS-nv-diamonds-emmy-london-shop">Emmy London</a></li>
          <li><a href="/webstore/brands/TheOne.do?icid=HS-nv-diamonds-the-one-shop">The One</a></li>
          <li><a href="/webstore/brands/enchanted-disney.cdo/?icid=HS-nv-diamonds-enchanted-disney-shop">Enchanted Disney Fine Jewelry</a></li>
          <li><a href="/webstore/l/diamonds/brand%7Cinterwoven/">Interwoven</a></li>
          <li class="HS003_linkRed"><a href="/webstore/l/diamonds/select%7Csale/?icid=HS-nv-diamonds-sale">Sale</a></li>
        </ul>
      </div>
    
      <div class="HS003_col-2-5ths">
      <div class="HS003_fullWidthBanner">
          <a href="/webstore/brands/TheOne.do?icid=HS-nv-diamonds-the-one-shop">
          <div class="HS003-banner" style="background-image: url('#$(ContentManager:theOne.png)!');"></div>
          </a>
        </div>
        <div class="HS003_fullWidthBanner">
          <a href="/foreverdiamond/?icid=HS-nv-diamonds-forever-diamond-shop">
            <div class="HS003-banner" style="background-image: url('#$(ContentManager:forever.png)!');"></div>
          </a>
        </div>
        <div class="HS003_fullWidthBanner">
          <a href="/perfectfit/?icid=HS-nv-diamonds-perfect-fit-shop">
            <div class="HS003-banner" style="background-image: url('#$(ContentManager:Diamonds3.png)!');"></div>
          </a>
        </div>
      </div>
    `,
  },
  {
    name: 'Brands',
    url: '/webstore/brand-index.do?icid=HS-nv-Brand_Index-Shop',
    html: `
    <div class="HS003_col-5ths">
    <ul class="HS003_navListing">
      <a href="/webstore/l/search/brand%7Caccurist/stock+position%7Cin+stock/">Accurist</a>
      <a href="/webstore/l/search/brand%7Cadidas/stock+position%7Cin+stock/">Adidas</a>
      <a href="/webstore/l/search/brand%7Calways+in+my+heart/stock+position%7Cin+stock/">Always In My Heart</a>
      <a href="/webstore/l/search/brand%7Camore/stock+position%7Cin+stock/">Amore</a>
      <a href="/webstore/l/search/brand%7Canne+klein/stock+position%7Cin+stock/">Anne Klein</a>
      <a href="/webstore/l/search/brand%7Carmani+exchange/stock+position%7Cin+stock/">Armani Exchange</a>
      <a href="/webstore/l/search/brand%7Cavi-8/stock+position%7Cin+stock/">AVI-8</a>
      <a href="/webstore/l/search/brand%7Cbaby-g/stock+position%7Cin+stock/">Baby-G</a>
      <a href="/webstore/l/search/brand%7Cbeatrix+potter/stock+position%7Cin+stock/">Beatrix Potter</a>
      <a href="/webstore/l/search/brand%7Cbeauty+and+the+beast/stock+position%7Cin+stock/">Beauty and the Beast</a>
      <a href="/webstore/l/search/brand%7Cbodifine/stock+position%7Cin+stock/">Bodifine</a>
      <a href="/webstore/l/search/brand%7Cboss+orange/stock+position%7Cin+stock/">Boss Orange</a>
      <a href="/webstore/l/search/brand%7Cbrilliance/stock+position%7Cin+stock/">Brilliance</a>
      <a href="/webstore/l/search/brand%7Cbuckley+london/stock+position%7Cin+stock/">Buckley London</a>
      <a href="/webstore/l/search/brand%7Cbulova/stock+position%7Cin+stock/">Bulova</a>
      <a href="/webstore/l/search/brand%7Cbutton+corner/stock+position%7Cin+stock/">Button Corner</a>
      <a href="/webstore/l/search/brand%7Ccailin/stock+position%7Cin+stock/">cailin</a>
      <a href="/webstore/l/search/brand%7Ccalvin+klein/stock+position%7Cin+stock/">Calvin Klein</a>
      <a href="/webstore/l/search/brand%7Ccalvin+klein+jewellery/stock+position%7Cin+stock/">Calvin Klein Jewellery</a>
      <a href="/webstore/l/search/brand%7Ccaravelle+new+york/stock+position%7Cin+stock/">Caravelle New York</a>
      <a href="/webstore/l/search/brand%7Ccarrs+silver/stock+position%7Cin+stock/">Carrs Silver</a>
      <a href="/webstore/l/search/brand%7Ccasio/stock+position%7Cin+stock/">Casio</a>
      </ul>
    </div>  
    <div class="HS003_col-5ths">
    <ul class="HS003_navListing">
      <a href="/webstore/l/search/brand%7Ccath+kidston/stock+position%7Cin+stock/">Cath Kidston</a>
      <a href="/webstore/l/search/brand%7Ccelebration+grand/stock+position%7Cin+stock/">Celebration Grand</a>
      <a href="/webstore/l/search/brand%7Cchamilia/stock+position%7Cin+stock/">Chamilia</a>
      <a href="/webstore/l/search/brand%7Ccharmed+memories/stock+position%7Cin+stock/">Charmed Memories</a>
      <a href="/webstore/l/search/brand%7Ccherished/stock+position%7Cin+stock/">Cherished</a>
      <a href="/webstore/l/search/brand%7Cchildhood+memories/stock+position%7Cin+stock/">Childhood Memories</a>
      <a href="/webstore/l/search/brand%7Cchocolate+by+petite+le+vian/stock+position%7Cin+stock/">Chocolate By Petite Le Vian</a>
      <a href="/webstore/l/search/brand%7Cchrysalis/stock+position%7Cin+stock/">Chrysalis</a>
      <a href="/webstore/l/search/brand%7Ccitizen/stock+position%7Cin+stock/">Citizen</a>
      <a href="/webstore/l/search/brand%7Cclassic+collection/stock+position%7Cin+stock/">Classic Collection</a>
      <a href="/webstore/l/search/brand%7Cclogau/stock+position%7Cin+stock/">Clogau</a>
      <a href="/webstore/l/search/brand%7Cclogau+gold/stock+position%7Cin+stock/">Clogau Gold</a>
      <a href="/webstore/l/search/brand%7Ccluse/stock+position%7Cin+stock/">Cluse</a>
      <a href="/webstore/l/search/brand%7Ccommitment/stock+position%7Cin+stock/">Commitment</a>
      <a href="/webstore/l/search/brand%7Ccross/stock+position%7Cin+stock/">Cross</a>
      <a href="/webstore/l/search/brand%7Cdaisy+dixon/stock+position%7Cin+stock/">Daisy Dixon</a>
      <a href="/webstore/l/search/brand%7Cdaniel+wellington/stock+position%7Cin+stock/">Daniel Wellington</a>
      <a href="/webstore/l/search/brand%7Cdiamonds+in+rhythm/stock+position%7Cin+stock/">Diamonds in Rhythm</a>
      <a href="/webstore/l/search/brand%7Cdiesel/stock+position%7Cin+stock/">Diesel</a>
      <a href="/webstore/l/search/brand%7Cdisney/stock+position%7Cin+stock/">Disney</a>
      </ul>
    </div>
    <div class="HS003_col-5ths">
    <ul class="HS003_navListing">
      <a href="/webstore/l/search/brand%7Cdisney+baby/stock+position%7Cin+stock/">Disney Baby</a>
      <a href="/webstore/l/search/brand%7Cdisney+britto/stock+position%7Cin+stock/">Disney Britto</a>
      <a href="/webstore/l/search/brand%7Cdisney+by+britto/stock+position%7Cin+stock/">Disney by Britto</a>
      <a href="/webstore/l/search/brand%7Cdisney+enchanting/stock+position%7Cin+stock/">Disney Enchanting</a>
      <a href="/webstore/l/search/brand%7Cdisney+showcase/stock+position%7Cin+stock/">Disney Showcase</a>
      <a href="/webstore/l/search/brand%7Cdisney+traditions/stock+position%7Cin+stock/">Disney Traditions</a>
      <a href="/webstore/l/search/brand%7Cdisney+trinkets/stock+position%7Cin+stock/">Disney Trinkets</a>
      <a href="/webstore/l/search/brand%7Cdkny/stock+position%7Cin+stock/">DKNY</a>
      <a href="/webstore/l/search/brand%7Cdreyfuss+%26+co/stock+position%7Cin+stock/">Dreyfuss &amp; Co</a>
      <a href="/webstore/l/search/brand%7Cdyrberg+kern/stock+position%7Cin+stock/">Dyrberg Kern</a>
      <a href="/webstore/l/search/brand%7Cedifice/stock+position%7Cin+stock/">Edifice</a>
      <a href="/webstore/l/search/brand%7Cemmy+london/stock+position%7Cin+stock/">Emmy London</a>
      <a href="/webstore/l/search/brand%7Cemporium/stock+position%7Cin+stock/">Emporium</a>
      <a href="/webstore/l/search/brand%7Cenchanted+disney/stock+position%7Cin+stock/">Enchanted Disney Fine Jewelry</a>
      <a href="/webstore/l/search/brand%7Cever+us/stock+position%7Cin+stock/">Ever Us</a>
      <a href="/webstore/l/search/brand%7Cevoke/stock+position%7Cin+stock/">Evoke</a>
      <a href="/webstore/l/search/brand%7Cferrari/stock+position%7Cin+stock/">Ferrari</a> 
      <a href="/webstore/l/search/brand%7Cfiorelli/stock+position%7Cin+stock/">Fiorelli</a>
      <a href="/webstore/l/search/brand%7Cfossil/stock+position%7Cin+stock/">Fossil</a>
      <a href="/webstore/l/search/brand%7Cfrozen/stock+position%7Cin+stock/">Frozen</a>
      </ul>
    </div>
    <div class="HS003_col-5ths">
    <ul class="HS003_navListing">  
      <a href="/webstore/l/search/brand%7Cg-shock/stock+position%7Cin+stock/">G-Shock</a>
      <a href="/webstore/l/search/brand%7Cgaia/stock+position%7Cin+stock/">Gaia</a>
      <a href="/webstore/l/search/brand%7Cgarmin/stock+position%7Cin+stock/">Garmin</a>
      <a href="/webstore/l/search/brand%7Cgc/stock+position%7Cin+stock/">Gc</a>
      <a href="/webstore/l/search/brand%7Cguess/stock+position%7Cin+stock/">Guess</a>
      <a href="/webstore/l/search/brand%7Cguess+connect/stock+position%7Cin+stock/">Guess Connect</a> 
      <a href="/webstore/l/search/brand%7Chello+kitty/stock+position%7Cin+stock/">Hello Kitty</a>
      <a href="/webstore/l/search/brand%7Chenry+london/stock+position%7Cin+stock/">Henry London</a>
      <a href="/webstore/l/search/brand%7Chot+diamonds/stock+position%7Cin+stock/">Hot Diamonds</a>
      <a href="/webstore/l/search/brand%7Chuawei/stock+position%7Cin+stock/">Huawei</a>
      <a href="/webstore/l/search/brand%7Cice-watch/stock+position%7Cin+stock/">Ice-Watch</a>
      <a href="/webstore/l/search/brand%7Cinterwoven/stock+position%7Cin+stock/">Interwoven</a>
      <a href="/webstore/l/search/brand%7Cjos+von+arx/stock+position%7Cin+stock/">jos von arx</a>
      <a href="/webstore/l/search/brand%7Cjuicy+couture/stock+position%7Cin+stock/">Juicy Couture</a>
      <a href="/webstore/l/search/brand%7Cjust+to+say/stock+position%7Cin+stock/">Just To Say</a>
      <a href="/webstore/l/search/brand%7Ckiss/stock+position%7Cin+stock/">Kiss</a>
      <a href="/webstore/l/search/brand%7Clacoste/stock+position%7Cin+stock/">Lacoste</a>
      <a href="/webstore/l/search/brand%7Clily+and+lotty/stock+position%7Cin+stock/">Lily and Lotty</a>
      <a href="/webstore/l/search/brand%7Clily+charmed/stock+position%7Cin+stock/">Lily Charmed</a>
      <a href="/webstore/l/search/brand%7Climit/stock+position%7Cin+stock/">Limit</a>
    </ul>
    </div> 
  <div class="HS003_col-5ths">
    <ul class="HS003_navListing">     
      <a href="/webstore/l/search/brand%7Clipsy/stock+position%7Cin+stock/">Lipsy</a>
      <a href="/webstore/l/search/brand%7Clittle+princess/stock+position%7Cin+stock/">Little Princess</a>
      <a href="/webstore/l/search/brand%7Clorus/stock+position%7Cin+stock/">Lorus</a>
      <a href="/webstore/l/search/brand%7Clove+is+in+the+detail/stock+position%7Cin+stock/">Love is in the Detail</a>
      <a href="/webstore/l/search/brand%7Clove+x+infinity/stock+position%7Cin+stock/">Love x Infinity</a>
      <a href="/webstore/l/search/brand%7Cloved/stock+position%7Cin+stock/">Loved</a>
      <a href="/webstore/l/search/brand%7Cmagical+moments/stock+position%7Cin+stock/">Magical Moments</a>
      <a href="/webstore/l/search/brand%7Cmagnificent+meerkats/stock+position%7Cin+stock/">Magnificent Meerkats</a>
      <a href="/webstore/l/search/brand%7Cmarc+ecko/stock+position%7Cin+stock/">Marc Ecko</a>
      <a href="/webstore/l/search/brand%7Cmartine+wester/stock+position%7Cin+stock/">Martine Wester</a>
      <a href="/webstore/l/search/brand%7Cmarvel/stock+position%7Cin+stock/">Marvel</a>
      <a href="/webstore/l/search/brand%7Cme+to+you/stock+position%7Cin+stock/">Me to You</a>
      <a href="/webstore/l/search/brand%7Cmiami+beach/stock+position%7Cin+stock/">Miami Beach</a>
      <a href="/webstore/l/search/brand%7Cmikey/stock+position%7Cin+stock/">Mikey</a>
      <a href="/webstore/l/search/brand%7Cmisfit/stock+position%7Cin+stock/">Misfit</a>
      <a href="/webstore/l/search/brand%7Cmiss+mindy/stock+position%7Cin+stock/">Miss Mindy</a>
      <a href="/webstore/l/search/brand%7Cmolly+brown+london/stock+position%7Cin+stock/">Molly Brown London</a>
      <a href="/webstore/l/search/brand%7Cmondaine/stock+position%7Cin+stock/">Mondaine</a>
      <a href="/webstore/l/search/brand%7Cmore+than+words/stock+position%7Cin+stock/">More Than Words</a>
      <a href="/webstore/l/search/brand%7Cmount+royal/stock+position%7Cin+stock/">Mount Royal</a>
    </ul>
  </div> 
  <div class="HS003_col-5ths">
    <ul class="HS003_navListing"> 
      <a href="/webstore/l/search/brand%7Cmrandmrs/stock+position%7Cin+stock/">mrandmrs</a>
      <a href="/webstore/l/search/brand%7Cmudpie/stock+position%7Cin+stock/">Mudpie</a>
      <a href="/webstore/l/search/brand%7Cmy+blue+nose+friends/stock+position%7Cin+stock/">My Blue Nose Friends</a>
      <a href="/webstore/l/search/brand%7Cnao/stock+position%7Cin+stock/">Nao</a>
      <a href="/webstore/l/search/brand%7Cnorthern+lights/stock+position%7Cin+stock/">Northern Lights</a>
      <a href="/webstore/l/search/brand%7Cobaku/stock+position%7Cin+stock/">Obaku</a>
      <a href="/webstore/l/search/brand%7Coliver+weber/stock+position%7Cin+stock/">Oliver Weber</a>
      <a href="/webstore/l/search/brand%7Copen+hearts+by+jane+seymour/stock+position%7Cin+stock/">Open Hearts by Jane Seymour</a>
      <a href="/webstore/l/search/brand%7Corla+kiely/stock+position%7Cin+stock/">Orla Kiely</a>
      <a href="/webstore/l/search/brand%7Cortak/stock+position%7Cin+stock/">Ortak</a>
      <a href="/webstore/l/search/brand%7Cpauls+boutique/stock+position%7Cin+stock/">Pauls Boutique</a>
      <a href="/webstore/l/search/brand%7Cperfect+fit/stock+position%7Cin+stock/">Perfect Fit</a>
      <a href="/webstore/l/search/brand%7Cperfect+fit+signature/stock+position%7Cin+stock/">Perfect Fit Signature</a>
      <a href="/webstore/l/search/brand%7Cpeter+rabbit/stock+position%7Cin+stock/">Peter Rabbit</a>
      <a href="/webstore/l/search/brand%7Cpolice/stock+position%7Cin+stock/">Police</a>
      <a href="/webstore/l/search/brand%7Cprincessa/stock+position%7Cin+stock/">Princessa</a>
      <a href="/webstore/l/search/brand%7Cpulsar/stock+position%7Cin+stock/">Pulsar</a>
      <a href="/webstore/l/search/brand%7Cradiance/stock+position%7Cin+stock/">Radiance</a>
      <a href="/webstore/l/search/brand%7Cradley/stock+position%7Cin+stock/">Radley</a>
      <a href="/webstore/l/search/brand%7Crelic/stock+position%7Cin+stock/">Relic</a>
    </ul>
  </div> 
  <div class="HS003_col-5ths">
    <ul class="HS003_navListing">
      <a href="/webstore/l/search/brand%7Croamer/stock+position%7Cin+stock/">Roamer</a>
      <a href="/webstore/l/search/brand%7Crosefield/stock+position%7Cin+stock/">Rosefield</a>
      <a href="/webstore/l/search/brand%7Crotary/stock+position%7Cin+stock/">Rotary</a>
      <a href="/webstore/l/search/brand%7Csaid+with+sentiment/stock+position%7Cin+stock/">Said with Sentiment</a>
      <a href="/webstore/l/search/brand%7Csecrets+of+the+sea/stock+position%7Cin+stock/">Secrets of the Sea</a>
      <a href="/webstore/l/search/brand%7Cseiko/stock+position%7Cin+stock/">Seiko</a>
      <a href="/webstore/l/search/brand%7Csekonda/stock+position%7Cin+stock/">Sekonda</a>
      <a href="/webstore/l/search/brand%7Cseksy/stock+position%7Cin+stock/">Seksy</a>
      <a href="/webstore/l/search/brand%7Cshades+of+gold/stock+position%7Cin+stock/">Shades Of Gold</a>
      <a href="/webstore/l/search/brand%7Csharon+nowlan/stock+position%7Cin+stock/">Sharon Nowlan</a>
      <a href="/webstore/l/search/brand%7Csheaffer/stock+position%7Cin+stock/">Sheaffer</a>
      <a href="/webstore/l/search/brand%7Cshimla/stock+position%7Cin+stock/">shimla</a>
      <a href="/webstore/l/search/brand%7Cskagen/stock+position%7Cin+stock/">Skagen</a>
      <a href="/webstore/l/search/brand%7Cstar+wars/stock+position%7Cin+stock/">Star Wars</a>
      <a href="/webstore/l/search/brand%7Cstorm/stock+position%7Cin+stock/">Storm</a>
      <a href="/webstore/l/search/brand%7Cswarovski/stock+position%7Cin+stock/">Swarovski</a>
      <a href="/webstore/l/search/brand%7Cthe+forever+diamond/stock+position%7Cin+stock/">The Forever Diamond</a>
      <a href="/webstore/l/search/brand%7Cthe+gallery+collection/stock+position%7Cin+stock/">The Gallery Collection</a>
      <a href="/webstore/l/search/brand%7Cthe+glitter+collection/stock+position%7Cin+stock/">The Glitter Collection</a>
      <a href="/webstore/l/search/brand%7Cthe+juliana+collection/stock+position%7Cin+stock/">The Juliana Collection</a>
    </ul>
  </div> 
  <div class="HS003_col-5ths">
    <ul class="HS003_navListing">  
      <a href="/webstore/l/search/brand%7Cthe+one/stock+position%7Cin+stock/">The One</a>
      <a href="/webstore/l/search/brand%7Ctikkers/stock+position%7Cin+stock/">Tikkers</a>
      <a href="/webstore/l/search/brand%7Ctimex/stock+position%7Cin+stock/">Timex</a>
      <a href="/webstore/l/search/brand%7Ctimex+kids/stock+position%7Cin+stock/">Timex Kids</a>
      <a href="/webstore/l/search/brand%7Ctogether/stock+position%7Cin+stock/">Together</a>
      <a href="/webstore/l/search/brand%7Ctommy+hilfiger/stock+position%7Cin+stock/">Tommy Hilfiger</a>
      <a href="/webstore/l/search/brand%7Ctruth/stock+position%7Cin+stock/">Truth</a>
      <a href="/webstore/l/search/brand%7Cversus+versace/stock+position%7Cin+stock/">Versus Versace</a>
      <a href="/webstore/l/search/brand%7Cvictorinox/stock+position%7Cin+stock/">Victorinox</a>
      <a href="/webstore/l/search/brand%7Cviva+colour/stock+position%7Cin+stock/">Viva Colour</a>
      <a href="/webstore/l/search/brand%7Cwenger/stock+position%7Cin+stock/">Wenger</a>
      <a href="/webstore/l/search/brand%7Cwiddop/stock+position%7Cin+stock/">Widdop</a>
      <a href="/webstore/l/search/brand%7Cwillow+tree/stock+position%7Cin+stock/">Willow Tree</a>
      <a href="/webstore/l/search/brand%7Cyour+story/stock+position%7Cin+stock/">Your Story</a>
    </ul>
  </div> 
    `,
  },
];

export default data;
