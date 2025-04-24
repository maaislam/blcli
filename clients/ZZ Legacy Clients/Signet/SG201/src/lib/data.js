import { h } from 'preact';
export const getData = () => {
    return [
    {
      name: 'Watches',
      link: '#',
      regex: 'watches',
      hasSubmenu: true,
      children: [{
        content:
            [<div className="container">
              <div className="column oneColumn">
                <div className="inner">
                  <h4 className="headerFour title alternate">Shop Collections</h4>
                  <ul className="subList">
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/watches/">All Watches</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/mens-watches/">Men's Watches</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/ladies-watches/">Ladies' Watches</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/luxury-watches/">Luxury Watches</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/smartwatches/">Smart Watches</a></li>
                      <li><a className="normalText saleText" href="https://www.ernestjones.co.uk/webstore/l/watches-sale/">Sale Watches</a></li>
                    </ul>
                </div>
              </div>
              <div className="column oneColumn no-MobilePadding">
                <h4 className="headerFour title alternate">Luxury Watches</h4>
                <div className="inner">
                        <div className="col1">
                        <ul className="subList carousel">
                          <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/content/omega/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/a4c6c052-f232-11ec-80c7-fefac1a87864)"}><span>OMEGA</span></a></li>
                          <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/content/cartier/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9f765bc6-f232-11ec-adac-925a401590aa)"}><span>Cartier</span></a></li>
                          <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/content/breitling/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9e90a0f4-f232-11ec-85f1-aa1704e546ad)"}><span>Breitling</span></a></li>
                          <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/content/tag-heuer/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/a534dd1c-f232-11ec-b011-aa1704e546ad)"}><span>TAG Heuer</span></a></li>
                          <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/content/tudor/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/a5b5fdc0-f232-11ec-8094-9a13d28e548d)"}><span>Tudor</span></a></li>
                          <li><a className="normalText" href="https://www.ernestjones.co.uk/bremont/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9f07e150-f232-11ec-b832-aa1704e546ad)"}><span>Bremont</span></a></li>
                        </ul>
                        </div>
                    </div>
              </div>
              <div className="column oneColumn no-MobilePadding">
                <div className="inner">
                    <h4 className="headerFour title alternate">Designer watches</h4>
                    <ul className="subList carousel">
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/boss-watches/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9e283442-f232-11ec-82fc-925a401590aa)"}><span>BOSS</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/emporio-armani-watches/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9db563f4-f232-11ec-8454-fefac1a87864)"}><span>Emporio Armani</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/content/Michael-Kors/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/a348196a-f232-11ec-86b3-dac241d48ae1)"}><span>Michael Kors</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/watches/?brand.lvl0=garmin" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9ca1b59e-f232-11ec-8f86-9a13d28e548d)"}><span>Alpina</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/alpina-watches/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/a1de8b2c-f232-11ec-9902-dac241d48ae1)"}><span>Garmin</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/casio-watches/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/a254375a-f232-11ec-92f7-9a13d28e548d)"}><span>G-Shock</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/watches-citizen/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9ff08b94-f232-11ec-96be-fefac1a87864)"}><span>Citizen</span></a></li>
                    </ul>
                </div>
                <a className="sg-cta secondary" href="#"><span>View all watch brands</span></a>
              </div>

              <div className="column oneColumn stacked content-slots">
                  <div className="contentBlock" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/63b3d5de-f235-11ec-ae7e-9a13d28e548d)"}><a href="https://www.ernestjones.co.uk/webstore/l/omega-watches/"><span>Omega</span></a></div>
                  <div className="contentBlock" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/46291da8-f235-11ec-95fb-925a401590aa)"}><a href="https://www.ernestjones.co.uk/webstore/l/tag-heuer-watches/"><span>Tag Heuer</span></a></div>
              </div>
            </div>]
      }]
    },
    { 
      name: 'Jewellery',
      link: '#',
      hasSubmenu: true,
      children: [{
        content:
            [<div className="container">
              <div className="column oneColumn">
                <div className="inner">
                  <h4 className="headerFour title alternate">For Her</h4>
                  <ul className="subList">
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/jewellery-new/">New-In Jewellery</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/ladies-jewellery/">All Jewellery</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/jewellery-yellow-gold/?recipient=her">Gold Jewellery</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/ladies-jewellery/?material.lvl0=all%20silver">Silver Jewellery</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/ladies-necklaces/">Necklaces</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/ladies-earrings/">Earrings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/rings/">Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/ladies-bracelets/">Bracelets</a></li>
                    </ul>
                </div>
              </div>
              <div className="column oneColumn">
                <h4 className="headerFour title alternate">For Him</h4>
                <div className="inner">
                        <div className="col1">
                            <ul className="subList">
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/mens-jewellery/">All Mens Jewellery</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/yellow-gold-mens-jewellery/">Gold Jewellery</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/mens-silver-jewellery/">Silver Jewellery</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/mens-necklaces/">Necklaces</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/mens-rings/">Rings</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/bracelets-mens/">Bracelets</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/mens-earrings/">Earrings</a></li>
                                <li><a className="normalText saleText" href="https://www.ernestjones.co.uk/webstore/l/mens-jewellery-sale/">Sale Jewellery</a></li>
                            </ul>
                        </div>
                    </div>
              </div>
              <div className="column oneColumn">
                <div className="inner">
                    <h4 className="headerFour title alternate">By Type</h4>
                    <ul className="subList">
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/rings/">Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/necklaces/">Necklaces</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/earrings-jewellery/">Earrings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/ladies-bracelets/">Bracelets</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/bangles/">Bangles</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/diamond-rings/">Diamond Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/rings/?collection=cocktail%20rings">Cocktail Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/stud-earrings/">Stud Earrings</a></li>
                    </ul>
                </div>
              </div>
              <div className="column oneColumn stacked content-slots">
                  <div className="contentBlock" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/db96785a-f234-11ec-9847-7abb14313b8e)"}><a href="https://www.ernestjones.co.uk/webstore/l/gucci-jewellery/"><span>Gucci Jewellery</span></a></div>
                  <div className="contentBlock" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/91b730a2-f235-11ec-abda-72b74b5fb13a)"}><a href="https://www.ernestjones.co.uk/webstore/l/boss-jewellery/"><span>BOSS Jewellery</span></a></div>
              </div>
            </div>]
      }]
    },
    {
      name: 'Engagement Rings',
      link: '#',
      hasSubmenu: true,
      children: [{
        content:
            [<div className="container">
              <div className="column oneColumn">
                <div className="inner">
                  <h4 className="headerFour title alternate">Shop Collection</h4>
                  <ul className="subList">
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/engagement-rings/">All Engagement Rings</a></li>
                      <li><a className="normalText saleText" href="https://www.ernestjones.co.uk/webstore/l/engagement-rings-sale/">Sale Engagement Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/bridal-set-engagement-rings/">All Bridal Sets</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/5-star-engagement-rings/">Top Rated 5 Star Engagement Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/gemstone-engagement-rings/">Gemstone Engagement Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/engagement-rings/?recipient=him">Men's Engagement Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/eternity-rings/">Eternity Rings</a></li>
                    </ul>
                </div>
              </div>
              <div className="column oneColumn">
                <h4 className="headerFour title alternate">Shop Style</h4>
                <div className="inner">
                        <div className="col1">
                            <ul className="subList">
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/diamond-solitaire-engagement-rings/">Diamond Solitaire Engagement Rings</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/diamond-ring-bridal-sets/">Diamond Bridal Sets</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/diamond-cluster-engagement-rings/">Diamond Cluster Engagement Rings</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/diamond-halo-engagement-rings/">Diamond Halo Engagement Rings</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/three-stone-ediamond-engagement-rings/">Diamond 3 Stone Engagement Rings</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/content/createyourring/">Create Your Own</a></li>
                            </ul>
                        </div>
                    </div>
              </div>
              <div className="column oneColumn stacked no-MobilePadding">
                <div className="inner">
                    <h4 className="headerFour title alternate">Metal Type</h4>
                    <ul className="subList">
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/platinum-engagement-rings/">Platinum Engagement Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/white-gold-engagement-rings/">White Gold Engagement Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/yellow-gold-engagement-rings/">Yellow Gold Engagement Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/rose-gold-engagement-rings/">Rose Gold Engagement Rings</a></li>
                    </ul>
                </div>
                <div className="inner">
                  <h4 className="headerFour title alternate">Brands</h4>
                  <ul className="subList carousel">
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/content/eternal-diamond/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/a1131d7a-f232-11ec-a95e-aa1704e546ad)"}><span>Eternal Diamond</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/content/le-vian/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/a2c131b6-f232-11ec-9c6f-fefac1a87864)"}><span>Le Vian</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/content/vera-wang/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/a63cb630-f232-11ec-aaa1-aa1704e546ad)"}><span>Vera Wang LOVE</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/content/arctic-light/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9d1956a8-f232-11ec-b522-fefac1a87864)"}><span>Arctic Light</span></a></li>
                  </ul>
                </div>
                <a className="sg-cta secondary" href="https://www.ernestjones.co.uk/webstore/brand-index.do?category=diamonds"><span>View all brands</span></a>
              </div>

              <div className="column oneColumn stacked content-slots">
                  <div className="contentBlock" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/88850548-f237-11ec-b42f-6a43d17712cf)"}><a href="#"><span>Ernest Jones Diamond Collection</span></a></div>
                  <div className="contentBlock" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/dca95d86-f237-11ec-8fe8-e259c3c07bd7)"}><a href="#"><span>The Diamond Story</span></a></div>
              </div>
            </div>]
      }]
    },
    {
      name: 'Diamonds',
      link: '#',
      hasSubmenu: true,
      children: [{
        content:
            [<div className="container">
              <div className="column oneColumn">
                <div className="inner">
                  <h4 className="headerFour title alternate">Diamond Rings</h4>
                  <ul className="subList">
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/diamond-rings/">Diamond Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/diamond-engagement-rings/">Diamond Engagement Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/diamond-ring-bridal-sets/">Bridal Sets</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/diamond-wedding-rings/">Diamond Wedding Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/eternity-diamond-rings/">Diamond Eternity Rings</a></li>
                      <li><a className="normalText saleText" href="https://www.ernestjones.co.uk/webstore/l/diamond-rings-sale/">Sale Diamond Rings</a></li>
                    </ul>
                </div>
              </div>
              <div className="column oneColumn">
                <h4 className="headerFour title alternate">Shop Category</h4>
                <div className="inner">
                        <div className="col1">
                            <ul className="subList">
                                <li><a className="normalText saleText" href="https://www.ernestjones.co.uk/webstore/l/diamonds-sale/">Sale Diamonds</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/diamond-bangles/">Diamond Bangles</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/diamond-bracelets/">Diamond Bracelets</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/diamond-necklaces/">Diamond Necklaces</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/diamond-earrings/">Diamond Earrings</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/diamond-set-watches/">Diamond Set Watches</a></li>
                            </ul>
                        </div>
                    </div>
              </div>
              <div className="column oneColumn stacked no-MobilePadding">
                <div className="inner">
                    <h4 className="headerFour title alternate">Metal Type</h4>
                    <ul className="subList">
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/jewellery-yellow-gold/"><span>Gold Jewellery</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/rose-gold-diamond-jewellery/"><span>White Gold</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/white-gold-diamond-jewellery/"><span>Rose Gold</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/jewellery-yellow-gold/"><span>Platinum</span></a></li>
                    </ul>
                </div>
                <div className="inner">
                  <h4 className="headerFour title alternate">Brands</h4>
                  <ul className="subList carousel">
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/content/eternal-diamond/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/a1131d7a-f232-11ec-a95e-aa1704e546ad)"}><span>Eternal Diamond</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/content/arctic-light/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9d1956a8-f232-11ec-b522-fefac1a87864)"}><span>Arctic Light</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/content/vera-wang/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/a63cb630-f232-11ec-aaa1-aa1704e546ad)"}><span>Vera Wang LOVE</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/neil-lane/" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/a43aec08-f232-11ec-9595-9a13d28e548d)"}><span>Neil Lane Bridal</span></a></li>
                  </ul>
                </div>
                <a className="sg-cta secondary" href="https://www.ernestjones.co.uk/webstore/brand-index.do?category=diamonds"><span>View all brands</span></a>
              </div>

              <div className="column oneColumn stacked content-slots">
                  <div className="contentBlock" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/73705846-f238-11ec-8a7c-6e9422e93fbf)"}><a href="https://www.ernestjones.co.uk/webstore/l/diamonds-sale/"><span>Diamond Sale</span></a></div>
                  <div className="contentBlock" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/2826a40a-0cc7-11ec-8e4d-d20794f0994a)"}><a href="https://www.ernestjones.co.uk/webstore/content/eternal-diamond/"><span>Eternal Diamond</span></a></div>
              </div>
            </div>]
      }]
    },
    {
      name: 'Weddings',
      link: '#',
      hasSubmenu: true,
      children: [{
        content:
            [<div className="container">
              <div className="column oneColumn">
                <div className="inner">
                  <h4 className="headerFour title alternate">Wedding Rings</h4>
                  <ul className="subList">
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/wedding-rings/">All Wedding Rings</a></li>
                      <li><a className="normalText saleText" href="https://www.ernestjones.co.uk/webstore/l/sale-wedding-rings/">Sale Wedding Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/mens-wedding-rings/">Men's Wedding Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/ladies-wedding-rings/">Ladies' Wedding Rings</a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/wedding-ring-buyers-guide.cdo">Wedding Ring Guide</a></li>
                    </ul>
                </div>
              </div>
              <div className="column oneColumn">
                <h4 className="headerFour title alternate">Metal Type</h4>
                <div className="inner">
                        <div className="col1">
                            <ul className="subList">
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/platinum-gold-wedding-rings-and-jewellery/">Platinum Wedding Rings</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/white-gold-wedding-rings/">White Gold Wedding Rings</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/yellow-gold-wedding-rings/">Yellow Gold Wedding Rings</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/rose-gold-wedding-rings/">Rose Gold Wedding Rings</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/all-silver-wedding-rings-and-jewellery/">Silver Wedding Rings</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/palladium-wedding-rings/">Palladium Wedding Rings</a></li>
                                <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/titanium-wedding-rings/">Titanium Wedding Rings</a></li>
                            </ul>
                        </div>
                    </div>
              </div>
              <div className="column oneColumn">
                <div className="inner">
                    <h4 className="headerFour title alternate">Shop Style</h4>
                    <ul className="subList">
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/classic-plain-wedding-rings/"><span>Plain Wedding Rings</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/patterned-wedding-rings/"><span>Patterned Wedding Rings</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/shaped-wedding-bands/"><span>Shaped Wedding Rings</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/wedding-rings-diamond-set-shaped/"><span>Diamond-Set Wedding Rings</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/wedding-rings-diamond-set-shaped/"><span>Diamond-Set Shaped Wedding Rings</span></a></li>
                      <li><a className="normalText" href="https://www.ernestjones.co.uk/webstore/l/eternity-rings/"><span>Eternity Rings</span></a></li>
                    </ul>
                </div>
              </div>

              <div className="column oneColumn stacked content-slots">
                  <div className="contentBlock" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/5017df58-f239-11ec-8bad-dac241d48ae1)"}><a href="https://www.ernestjones.co.uk/webstore/l/ladies-jewellery-sets/"><span>Wedding Jewellery</span></a></div>
                  <div className="contentBlock" style={"background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/1dc2e36c-f23a-11ec-abda-72b74b5fb13a)"}><a href="https://www.ernestjones.co.uk/webstore/l/cufflink-gifts/"><span>Cufflinks</span></a></div>
              </div>
            </div>]
      }]
    },
    // Brands
    {
      name: 'Brands',
      link: 'https://www.ernestjones.co.uk/webstore/brand-index.do',
      hasSubmenu: false,
      allBrands: true,
    },
    {
      name: 'Sale',
      link: 'https://www.ernestjones.co.uk/webstore/offers.do',
      colour: '#AC0000;',
      hasSubmenu: false,
      allBrands: true,
    },
    {
      name: 'Stores',
      link: 'https://www.ernestjones.co.uk/webstore/secure/storeLocator.sdo?icid=ej-tn-topbar-store',
      hasSubmenu: false,
      desktop: false,
      noneCat: true,
    },
    {
      name: 'Blog',
      link: 'https://www.ernestjones.co.uk/webstore/blog/?icid=ej-tn-topbar-blog',
      hasSubmenu: false,
      desktop: false,
      noneCat: true,
    },
    
    ];
}

export const trendingSearches = [
  {
    image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/78a298ac-ebde-11ec-8e57-0a4dcbb5d404',
    link: 'https://www.ernestjones.co.uk/webstore/l/tag-heuer-watches/',
    text: 'TAG Heuer watches',
  },
  {
    image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/6eebd904-ebde-11ec-b2ff-3a22b66edee0',
    link: 'https://www.ernestjones.co.uk/webstore/l/engagement-rings/',
    text: 'Engagement rings',
  },
  {
    image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/752628d8-ebde-11ec-928b-3a22b66edee0',
    link: 'https://www.ernestjones.co.uk/webstore/l/ladies-necklaces/',
    text: "Ladies' necklaces",
  },
  {
    image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/604ef688-ebde-11ec-8bbd-3a22b66edee0',
    link: 'https://www.ernestjones.co.uk/webstore/l/breitling-watches/',
    text: 'Breitling watches',
  }
]