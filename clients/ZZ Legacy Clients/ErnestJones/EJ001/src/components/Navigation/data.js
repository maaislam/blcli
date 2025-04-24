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
      <div class="EJ001_col-3">
        <ul class="EJ001_navListing">
          <li><a href="/webstore/l/search/select%7Csale/">ALL SALE</a></li>
          <li><a href="/webstore/l/diamonds/category%7Cjewellery/select%7Csale/">SALE DIAMOND JEWELLERY</a></li>
          <li><a href="/webstore/l/diamonds/category%7Crings/select%7Csale/">SALE DIAMOND RINGS</a></li>
          <li><a href="/webstore/l/jewellery/select%7Csale/">SALE JEWELLERY</a></li>
          <li><a href="/webstore/l/watches/select%7Csale/">SALE WATCHES</a></li>
          <li><a href="/webstore/l/search/select%7Csale/recipient%7Chim/">SALE FOR HIM</a></li>
          <li><a href="/webstore/l/search/select%7Csale/recipient%7Cher/">SALE FOR HER</a></li>
        </ul>
      </div>

      <div class="EJ001_col-9">
        <div class="EJ001_col-3">
          <div class="EJ001_fullWidthBanner EJ001_fullWidthBanner--fullHeight">
            <a href="/webstore/l/jewellery/select%7Csale/">
              <img src="#$(ContentManager:Sale-Jewellery.jpg)!"/>
            </a>
          </div>
        </div>

        <div class="EJ001_col-3">
          <div class="EJ001_fullWidthBanner EJ001_fullWidthBanner--fullHeight">
            <a href="/webstore/l/watches/select%7Csale/">
              <img src="#$(ContentManager:Sale-Watches.jpg)!"/>
            </a>
          </div>
        </div>
        
        <div class="EJ001_col-3">
          <div class="EJ001_fullWidthBanner EJ001_fullWidthBanner--fullHeight">
            <a href="/webstore/l/jewellery/category%7Crings/occasion%7Cengagement/select%7csale/">
              <img src="#$(ContentManager:Sale-EngagementRings.jpg)!"/>
            </a>
          </div>
        </div>

        <div class="EJ001_col-3">
          <div class="EJ001_fullWidthBanner EJ001_fullWidthBanner--fullHeight">
            <a href="/webstore/l/diamonds/select%7Csale/">
              <img src="#$(ContentManager:Sale-Diamonds.jpg)!"/>
            </a>
          </div>
        </div>
      </div>
    `,
  },
  {
    name: 'Watches',
    url: '/webstore/watches.do?icid=ej-tn-summer-wp',
    html: `
      <div class="EJ001_col-5ths">
        <ul class="EJ001_navListing">
          <li class="EJ001_heading">Watches By Collection</li>
          <li><a href="/webstore/l/watches">All Watches</a></li>
          <li><a href="/webstore/l/watches/recipient%7Chim/">Men's Watches</a></li>
          <li><a href="/webstore/l/watches/recipient%7Cher/">Ladies Watches</a></li>
          <li><a href="/webstore/shops/luxury-watches-boutique.cdo">Luxury Watches</a></li>
          <li><a href="/webstore/l/watches/category%7Csmart+watches/">Smart Watches</a></li>
          <li><a href="/webstore/l/watches/select%7Cnew/">New Watches</a></li>
          <li><a href="/webstore/l/watches/rating%7C5+stars/?Nf=P_Current_Price%7CBTWN+0+100000">Top Rated Watches</a></li>
          <li class="EJ001_linkRed"><a href="/webstore/l/watches/select%7Csale/?icid=ej-dd-sale-watches">Sale Watches</a></li>
        </ul>
      </div>

      <div class="EJ001_col-5ths">
        <ul class="EJ001_navListing">
          <li class="EJ001_heading">Popular For Him</li>
          <li><a href="/webstore/l/watches/recipient%7Chim/">All Watches For Him</a></li>
          <li><a href="/webstore/l/watches/brand%7Ctag+heuer/recipient%7Chim">TAG Heuer</a></li>
          <li><a href="/webstore/l/watches/brand%7Comega/recipient%7Chim/">Omega</a></li>
          <li><a href="/webstore/l/watches/brand%7Cbreitling/recipient%7Chim/">Breitling</a></li>
          <li><a href="/webstore/l/watches/brand%7Ctissot/recipient%7Chim/">Tissot</a></li>
          <li><a href="/webstore/l/watches/brand%7Chugo+boss/recipient%7Chim/">Hugo Boss</a></li>
          <li><a href="/webstore/l/watches/brand%7Cemporio+armani/recipient%7Chim/">Emporio Armani</a></li>
        </ul>
      </div>

      <div class="EJ001_col-5ths">
        <ul class="EJ001_navListing">
          <li class="EJ001_heading">Popular For Her</li>
          <li><a href="/webstore/l/watches/recipient%7Cher/">All Watches For Her</a></li>
          <li><a href="/webstore/l/watches/brand%7Cgucci+watches/recipient%7Cher/">Gucci</a></li>
          <li><a href="/webstore/l/watches/brand%7Clongines/recipient%7Cher/">Longines</a></li>
          <li><a href="/webstore/l/watches/brand%7Cchanel/recipient%7Cher/">Chanel</a></li>
          <li><a href="/webstore/l/watches/brand%7Ctag+heuer/recipient%7Cher/">TAG Heuer</a></li>
          <li><a href="/webstore/l/watches/brand%7Cmichael+kors/recipient%7Cher/?icid=Shop-ej-kors_ladies_watches">Michael Kors</a></li>
          <li><a href="/webstore/l/watches/brand%7Colivia+burton/recipient%7Cher/">Olivia Burton</a></li>
        </ul>
      </div>

      <div class="EJ001_col-2-5ths">
        <div class="EJ001_fullWidthBanner">
          <a href="/tag-heuer/">
            <img src="#$(ContentManager:EJ001-Watches-6.png)!"/>
          </a>
        </div>
        <div class="EJ001_fullWidthBanner">
          <a href="/webstore/shops/omega.sdo">
            <img src="#$(ContentManager:EJ001-Watches-7.png)!"/>
          </a>
        </div>
        <div class="EJ001_fullWidthBanner">
          <a href="/breitling/">
            <img src="#$(ContentManager:EJ001-Watches-5.png)!"/>
          </a>
        </div>
        <div class="EJ001_fullWidthBanner">
          <a href="/gucci/">
            <img src="#$(ContentManager:Watches-Gucci-Long.png)!"/>
          </a>
        </div>
      </div>
    `,
  },
  {
    name: 'Jewellery',
    url: '/webstore/jewellery.do?icid=ej-tn-summer-jp',
    html: `
      <div class="EJ001_col-2">
        <ul class="EJ001_navListing">
          <li class="EJ001_heading">For Her</li>
          <li><a href="/webstore/l/jewellery/category%7Crings/occasion%7Cengagement/recipient%7Cher/">Engagement Rings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Crings/occasion%7Cwedding/recipient%7Cher/">Wedding Rings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Crings/recipient%7Cher/style%7Ceternity/">Eternity Rings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cearrings/recipient%7Cher/">Earrings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cbracelets/recipient%7Cher/">Bracelets</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cnecklaces/recipient%7Cher/">Necklaces</a></li>
          <li><a href="/webstore/l/jewellery/category%7Crings/recipient%7Cher/">Rings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cbeads+%26+charms/recipient%7Cher/">Beads and Charms</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cjewellery+sets/recipient%7Cher/">Jewellery Sets</a></li>
          <li><a href="/webstore/l/jewellery/recipient%7Cher/">Gifts For Her</a></li>
          <li class="EJ001_linkRed"><a href="/webstore/l/jewellery/recipient%7Cher/select%7Csale/">Sale</a></li>
        </ul>
      </div>

      <div class="EJ001_col-2">
        <ul class="EJ001_navListing">
          <li class="EJ001_heading">For Him</li>
          <li><a href="/webstore/l/jewellery/category%7Crings/occasion%7Cwedding/recipient%7Chim/">Wedding Rings</a></li>
          <li><a href="/webstore/l/jewellery/category%7Crings/recipient%7Chim/">Rings</a></li>
          <li><a href="/webstore/l/search/category%7Ccufflinks/recipient%7Chim/">Cufflinks</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cbracelets/recipient%7Chim/">Bracelets</a></li>
          <li><a href="/webstore/l/jewellery/category%7Cnecklaces/recipient%7Chim/">Necklaces</a></li>
          <li class="EJ001_linkRed"><a href="/webstore/l/jewellery/recipient%7Chim/select%7Csale/">Sale</a></li>
        </ul>
      </div>

      <div class="EJ001_col-2">
        <ul class="EJ001_navListing">
          <li class="EJ001_heading">By Occasion</li>
          <li><a href="/webstore/l/jewellery/occasion%7Cengagement/">Engagement</a></li>
          <li><a href="/webstore/l/jewellery/occasion%7Cwedding/">Wedding</a></li>
          <li><a href="/webstore/l/jewellery/occasion%7Canniversary/">Anniversary</a></li>
          <li><a href="/webstore/l/jewellery/recipient%7Cher/">Gifts For Her</a></li>
          <li><a href="/webstore/l/jewellery/recipient%7Chim/">Gifts For Him</a></li>
        </ul>
      </div>
      
      <div class="EJ001_col-2">
        <ul class="EJ001_navListing">
          <li class="EJ001_heading">Brands</li>
          <li><a href="/gucci/">Gucci</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Cvera+wang%7Cvera+wang+love/">Vera Wang</a></li>
          <li><a href="/webstore/l/search/brand%7Cle+vian/stock+position%7Cin+stock/">Le Vian</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Clinks+of+london/">Links of London</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Cswarovski/">Swarovski</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Cthomas+sabo/">Thomas Sabo</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Cmichael+kors/">Michael Kors</a></li>
          <li><a href="/webstore/l/jewellery/brand%7Ccarat/">Carat</a></li>
          <li class="EJ001_heading"><a href="/webstore/brand-index.do?category=jewellery">View All Brands</a></li>
        </ul>
      </div>

      <div class="EJ001_col-4">  
        <div class="EJ001_fullWidthBanner">
          <a href="/webstore/shops/verawanglove.cdo">
            <img src="#$(ContentManager:Watches-VeraWang.png)!"/>
          </a>
        </div>
        <div class="EJ001_fullWidthBanner">
          <a href="/le-vian/">
            <img src="#$(ContentManager:Watches-LeVian.png)!"/>
          </a>
        </div>
        <div class="EJ001_fullWidthBanner">
          <a href="/gucci/">
            <img src="#$(ContentManager:Watches-Gucci.png)!"/>
          </a>
        </div>
        <div class="EJ001_fullWidthBanner">
          <a href="/webstore/l/jewellery/brand%7Cswarovski/">
            <img src="#$(ContentManager:Watches-Swarovski.png)!"/>
          </a>
        </div>
      </div>
    `,
  },
  {
    name: 'Diamonds',
    url: '/webstore/diamonds.do?icid=ej-tn-summer-dp',
    html: `
      <div class="EJ001_col-2">
        <ul class="EJ001_navListing">
          <li class="EJ001_heading">Diamond Rings</li>
          <li><a href="/webstore/l/diamonds/category%7Crings/?Nf=P_Current_Price%7CBTWN+15+9999999">All Diamond Rings</a></li>
          <li><a href="/webstore/l/diamonds/category%7Crings/occasion%7Cengagement/">Engagement Rings</a></li>
          <li><a href="/webstore/l/diamonds/style%7Cbridal+set/category%7Cjewellery/">Bridal Sets</a></li>
          <li><a href="/webstore/l/diamonds/occasion%7Cwedding/category%7Cjewellery%7Crings/">Wedding Rings</a></li>
          <li><a href="/webstore/l/diamonds/style%7Ceternity/category%7Cjewellery%7Crings/">Eternity Rings</a></li>
          <li class="EJ001_linkRed"><a href="/webstore/l/diamonds/category%7Crings/select%7Csale/">Sale Diamond Rings</a></li>
        </ul>
      </div>

      <div class="EJ001_col-2">
        <ul class="EJ001_navListing">
          <li class="EJ001_heading">By Category</li>
          <li><a href="/webstore/l/diamonds/category%7Cearrings/">Diamond Earrings</a></li>
          <li><a href="/webstore/l/diamonds/category%7Cnecklaces/">Diamond Necklaces</a></li>
          <li><a href="/webstore/l/diamonds/category%7Cbracelets/">Diamond Bracelets</a></li>
          <li><a href="/webstore/l/diamonds/category%7Cbangles/">Diamond Bangles</a></li>
          <li><a href="/webstore/l/diamonds/category%7Crings/?Nf=P_Current_Price%7CBTWN+15+9999999">Diamond Rings</a></li>
          <li><a href="/webstore/l/watches/stone+type%7Cdiamond/">Diamond Set Watches</a></li>
          <li class="EJ001_linkRed"><a href="/webstore/l/diamonds/select%7Csale/?icid=ej-dp-summer-sale">Sale Diamonds</a></li>
        </ul>
      </div>

      <div class="EJ001_col-2">
        <ul class="EJ001_navListing">
          <li class="EJ001_heading">By Metal Type</li>
          <li><a href="/webstore/l/diamonds/material%7Cwhite+gold/category%7Cjewellery/">White Gold</a></li>
          <li><a href="/webstore/l/diamonds/material%7Cyellow+gold/category%7Cjewellery/">Yellow Gold</a></li>
          <li><a href="/webstore/l/diamonds/material%7Crose+gold/category%7Cjewellery/">Rose Gold</a></li>
          <li><a href="/webstore/l/diamonds/material%7Cplatinum/category%7Cjewellery/">Platinum</a></li>
          <li><a href="/webstore/l/diamonds/material%7Call+silver/category%7Cjewellery/">Silver</a></li>
        </ul>
      </div>
      
      <div class="EJ001_col-2">
        <ul class="EJ001_navListing">
          <li class="EJ001_heading">Brands</li>
          <li><a href="/webstore/l/diamonds/brand%7Cvera+wang+love/">Vera Wang</a></li>
          <li><a href="/webstore/l/diamonds/brand%7Ctolkowsky/">Tolkowsky</a></li>
          <li><a href="/webstore/l/diamonds/brand%7Cleo+diamond/">Leo Diamond</a></li>
          <li><a href="/webstore/l/search/?Ntk=PRIMARY&Ntt=Neil+Lane+Bridal"">Neil Lane Bridal</a></li>
          <li><a href="/webstore/l/search/?Ntk=PRIMARY&Ntt=Neil+Lane+Designs"">Neil Lane Designs</a></li>
          <li><a href="/webstore/l/diamonds/brand%7Cthe+diamond+story/">The Diamond Story</a></li>
          <li><a href="/webstore/l/diamonds/brand%7Cle+vian/">Le Vian</a></li>
          <li><a href="/webstore/l/diamonds/brand%7Cernest+jones/">Ernest Jones</a></li>
          <li class="EJ001_heading"><a href="/webstore/brand-index.do?category=diamonds">View All Brands</a></li>
        </ul>
      </div>

      <div class="EJ001_col-4">
        <div class="EJ001_fullWidthBanner">
          <a href="/webstore/shops/verawanglove.cdo">
            <img src="#$(ContentManager:Watches-VeraWang.png)!"/>
          </a>
        </div>
        <div class="EJ001_fullWidthBanner">
          <a href="/tolkowsky/">
            <img src="#$(ContentManager:Watches-Tolkowsky.png)!"/>
          </a>
        </div>
        <div class="EJ001_fullWidthBanner">
          <a href="/neil-lane/">
            <img src="#$(ContentManager:Watches-NeilLane.png)!"/>
          </a>
        </div>
        <div class="EJ001_fullWidthBanner">
          <a href="/le-vian/">
            <img src="#$(ContentManager:Watches-LeVian.png)!"/>
          </a>
        </div>
      </div>
    `,
  },
  {
    name: 'Brands',
    url: '/webstore/brand-index.do?icid=ej-tn-summer-bi',
    html: (() => {
      let markup = '';
      const brandLinks = document.querySelectorAll('.brands .subNav a');
      const numberOfColumns = 5;
      const linksPerColumn = Math.ceil(brandLinks.length / numberOfColumns);
      [].forEach.call(brandLinks, (brandLink, index) => {
        if (index % linksPerColumn === 0) {
          // End the last column if not first column
          if (index !== 0) markup += '</ul></div>';

          // Start a new column
          markup += '<div class="EJ001_col-5ths"><ul class="EJ001_navListing">';
          markup += `<li><a href="${brandLink.href}">${brandLink.innerHTML}</a></li>`;
        } else {
          markup += `<li><a href="${brandLink.href}">${brandLink.innerHTML}</a></li>`;
        }
      });
      markup += '</ul></div>';
      return markup;
    })(),
  },
];

export default data;
