import { fullStory, events } from '../../../../lib/utils';

/**
 * {{EJNavUpdate}} - {{Test Description}}
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'EJNavUpdate',
      VARIATION: '1',
    },
    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;
      // Watches
      const nav1 = doc.querySelector('#js-nav-status > .top-level__title + .top-level__drop-down');
      // Jewellery
      const nav2 = doc.querySelector('#js-nav-status > .top-level__title + .top-level__drop-down + .top-level__drop-down');
      // Diamonds
      const nav3 = doc.querySelector('#js-nav-status > .top-level__title + .top-level__drop-down + .top-level__drop-down + .top-level__drop-down');
      // Brands
      const nav4 = doc.querySelector('#js-nav-status > .top-level__title + .top-level__drop-down + .top-level__drop-down + .top-level__drop-down + .top-level__drop-down');
      // Sale
      const nav5 = doc.querySelector('#js-nav-status > .top-level__title + .top-level__drop-down + .top-level__drop-down + .top-level__drop-down + .top-level__drop-down + .top-level__drop-down');

      return {
        doc,
        bodyVar,
        nav1,
        nav2,
        nav3,
        nav4,
        nav5,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
    },
    components: {
      contentBuilder() {
        Exp.cache.nav1.querySelector('.drop-down').insertAdjacentHTML('afterbegin', `
          <div class="nav-slot-1 mobile_view-all">
            <a href="/webstore/watches.do?icid=ej-tn-watches">View All Watches</a>
          </div>
        `);

        Exp.cache.nav2.querySelector('.drop-down').insertAdjacentHTML('afterbegin', `
          <div class="nav-slot-1 mobile_view-all">
            <a href="/webstore/jewellery.do?icid=ej-tn-jewellery">View All Jewellery</a>
          </div>
        `);

        Exp.cache.nav3.querySelector('.drop-down').insertAdjacentHTML('afterbegin', `
          <div class="nav-slot-1 mobile_view-all">
            <a href="/webstore/diamonds.do?icid=ej-tn-diamonds">View All Diamonds</a>
          </div>
        `);
        
        Exp.cache.nav4.querySelector('.drop-down').insertAdjacentHTML('afterbegin', `
          <div class="nav-slot-1 mobile_view-all">
            <a href="/webstore/brand-index.do?icid=ej-tn-brands">View All Brands</a>
          </div>
        `);

        Exp.cache.nav5.querySelector('.drop-down').insertAdjacentHTML('afterbegin', `
          <div class="nav-slot-1 mobile_view-all">
            <a href="/webstore/offers.do?icid=ej-tn-sale">View All Sale Products</a>
          </div>
        `);

        Exp.cache.nav2.insertAdjacentHTML('afterend', `
          <li class="top-level__drop-down EJ_engage-rings">
            <svg xmlns="http://www.w3.org/2000/svg" class="EJ_nav-ico" viewBox="0 0 128.11 95"><defs><style>.cls-1{fill:none;stroke:#212121;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title>EJ-wedding</title><path class="cls-1" d="M103.88,31a41.44,41.44,0,1,1-20.81,80,39.24,39.24,0,0,1-6.41-2.86A41.46,41.46,0,0,1,62.57,48.24" transform="translate(-11 -29.42)"/><path class="cls-1" d="M67,42.83A41.23,41.23,0,0,1,89.45,31" transform="translate(-11 -29.42)"/><path class="cls-1" d="M73.45,45.69a34.79,34.79,0,0,1,23.22-8.84h0a34.95,34.95,0,1,1-9.12,68.68,33.46,33.46,0,0,1-6.31-2.38A34.94,34.94,0,0,1,68.88,50.62" transform="translate(-11 -29.42)"/><path class="cls-1" d="M83.07,111A41.43,41.43,0,1,1,67,42.83a39.24,39.24,0,0,1,6.41,2.86,41.46,41.46,0,0,1,14.1,59.84" transform="translate(-11 -29.42)"/><path class="cls-1" d="M76.66,108.09A34.94,34.94,0,1,1,53.44,47,34.9,34.9,0,0,1,88.38,82a34.78,34.78,0,0,1-7.14,21.17" transform="translate(-11 -29.42)"/><path class="cls-1" d="M95.41,28.84" transform="translate(-11 -29.42)"/><path class="cls-1" d="M96.84,36.85H96.5" transform="translate(-11 -29.42)"/><path class="cls-1" d="M103.88,31" transform="translate(-11 -29.42)"/><path class="cls-1" d="M79.39,15.61" transform="translate(-11 -29.42)"/><path class="cls-1" d="M89.46,31" transform="translate(-11 -29.42)"/><path class="cls-1" d="M89,31a47.52,47.52,0,0,1,16.33.27" transform="translate(-11 -29.42)"/></svg>
            <a class="js-top-level-link top-level-link top-link--sale " href="//www.ernestjones.co.uk/webstore/wedding.do">
              Wedding Rings
            </a>
            <div class="u-container">
              <div class="drop-down">
                <div class="nav-slot-1 mobile_view-all">
                  <a href="/webstore/l/jewellery/category%7Crings/occasion%7Cwedding/">View All Wedding Rings</a>
                </div>
                <div class="nav-slot-1">
                  <b class="js-nav-slot__title nav-slot__title">Wedding Rings</b>
                  <ul class="nav-slot__links">
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/category%7Crings/occasion%7Cwedding/">
                        All Wedding Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/occasion%7Cwedding/recipient%7Cher/category%7Crings/">
                        Ladies' Wedding Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/occasion%7Cwedding/recipient%7Chim/category%7Crings/">
                        Men's Wedding Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/occasion%7Cwedding/rating%7C5+stars/category%7Crings/">
                        Top Rated Wedding Rings
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="nav-slot-1">
                  <b class="js-nav-slot__title nav-slot__title">Metal Type</b>
                  <ul class="nav-slot__links">
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/occasion%7Cwedding/material%7Cplatinum/category%7Crings/">
                        Platinum Wedding Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/occasion%7Cwedding/material%7Cwhite+gold/category%7Crings/">
                        White Gold Wedding Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/occasion%7Cwedding/material%7Cyellow+gold/category%7Crings/">
                        Yellow Gold Wedding Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/category%7Crings/material%7Crose+gold/occasion%7Cwedding/">
                        Rose Gold Wedding Rings
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="nav-slot-1">
                  <b class="js-nav-slot__title nav-slot__title">Wedding Jewellery</b>
                  <ul class="nav-slot__links">
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/diamonds/category%7Cjewellery/?getAll=true">
                        Diamond Jewellery
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/stone+type%7ccultured+freshwater+pearl%7cpearl/">
                        Pearl Jewellery
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/stone+type%7Csapphire/">
                        Sapphire Jewellery
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/material%7Call+silver/">
                        Silver Jewellery
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/material%7Cwhite+gold/">
                        White Gold Jewellery
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/material%7Cyellow+gold/">
                        Yellow Gold Jewellery
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/material%7Crose+gold/">
                        Rose Gold Jewellery
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/material%7Cplatinum/">
                        Platinum Jewellery
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/?getAll=true">
                        <strong>View all Jewellery</strong>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="nav-slot-1">
                  <b class="js-nav-slot__title nav-slot__title">Brands</b>
                  <ul class="nav-slot__links">
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/le-vian/">
                        Le Vian<sup>&reg;</sup>
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/leo-diamond/">
                        Leo Diamond<sup>&reg;</sup>
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/neil-lane/">
                        Neil Lane
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/tolkowsky/">
                        Tolkowsky
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/brand%7Cernest+jones+pearl+collection/stock+position%7Cin+stock/">
                        Ernest Jones Pearl Collection
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/shops/verawanglove.cdo">
                        Vera Wang LOVE
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/brand%7Cyoko+london/">
                        Yoko London
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/brand%2Dindex.do">
                        <strong>View all brands</strong>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        `);

        Exp.cache.nav1.insertAdjacentHTML('afterend', `
          <li class="top-level__drop-down EJ_wedding-rings">
            <svg xmlns="http://www.w3.org/2000/svg" class="EJ_nav-ico" viewBox="0 0 84.88 117.26"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title>EJ-engagement</title><path class="cls-1" d="M65.65,50.19a49.28,49.28,0,0,0-20,11.89s-3.9,4.66-4.46,5.42a41.46,41.46,0,0,0,14.2,59.83,40.53,40.53,0,0,0,6.42,2.84,41.11,41.11,0,0,0,13.6,2.26,41.53,41.53,0,0,0,41.36-41.52c.09-20-12-34.78-32.14-40.72" transform="translate(-32.91 -16.18)"/><path class="cls-1" d="M52.08,64.93l.61-.54A39.6,39.6,0,0,1,64.9,57.63a34.74,34.74,0,0,1,10.38-1.58h0a34.94,34.94,0,1,1,.14,69.88A35,35,0,0,1,60,122.38,35,35,0,0,1,42.1,80.21a38.34,38.34,0,0,1,5.42-10.34A37.06,37.06,0,0,1,52.08,64.93Z" transform="translate(-32.91 -16.18)"/><path class="cls-1" d="M93.69,27.08,76.92,47.35a2.15,2.15,0,0,1-3.31,0L56.76,27.16Z" transform="translate(-32.91 -16.18)"/><polyline class="cls-1" points="39.9 1.02 36.5 10.96 42.03 31.92"/><polyline class="cls-1" points="42.68 31.92 48.13 10.93 44.69 1.01"/><path class="cls-1" d="M75.46,56h-.35" transform="translate(-32.91 -16.18)"/><path class="cls-1" d="M65.75,50.2,53.09,35a4.8,4.8,0,0,1,3.67-7.87l9.91-9.95H83.74l10,9.91a4.79,4.79,0,0,1,3.71,7.85L84.79,50.16" transform="translate(-32.91 -16.18)"/></svg>
            <a class="js-top-level-link top-level-link top-link--sale" href="//www.ernestjones.co.uk/webstore/engagement.do">
               Engagement Rings
            </a>
            <div class="u-container">
              <div class="drop-down">
                <div class="nav-slot-1 mobile_view-all">
                  <a href="/webstore/l/jewellery/category%7Crings/occasion%7Cengagement/">View All Engagement Rings</a>
                </div>
                <div class="nav-slot-1">
                  <b class="js-nav-slot__title nav-slot__title">Engagement Rings</b>
                  <ul class="nav-slot__links">
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/category%7Crings/occasion%7Cengagement/">
                        All Engagement Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/occasion%7Cengagement/rating%7C5+stars/category%7Cjewellery%7Crings/">
                        Top Rated Engagement Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/occasion%7Cengagement/category%7Cjewellery%7Crings/?Ntk=P_New%26Ntt=new">
                        New Engagement Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/category%7Cjewellery%7Crings/style%7Cbridal+set/">
                        All Bridal Sets
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/diamonds/category%7Crings/occasion%7Cwedding/recipient%7Chim/">
                        Men&#39;s Engagement Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link sale-event" href="/webstore/l/jewellery/occasion%7Cengagement/select|sale/category%7Cjewellery%7Crings/">
                        Sale Engagement Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/engagement-ring-buyers-guide.cdo">
                        Engagement Ring Buying Guide
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="nav-slot-1">
                  <b class="js-nav-slot__title nav-slot__title">Engagement Ring Style</b>
                  <ul class="nav-slot__links">
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/diamonds/style%7Csolitaire/occasion%7Cengagement/category%7Cjewellery%7Crings/">
                        Diamond Solitaire Engagement Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/diamonds/style%7Cbridal+set/category%7Cjewellery%7Crings/">
                        Diamond Bridal Sets
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/diamonds/style%7Ccluster/occasion%7Cengagement/category%7Cjewellery%7Crings/">
                        Diamond Cluster Engagement Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/category%7Crings/occasion%7Cengagement/style%7Chalo/">
                        Diamond Halo Engagement Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/diamonds/style%7Cthree+stone/occasion%7Cengagement/category%7Cjewellery%7Crings/">
                        Diamond 3 Stone Engagement Rings
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="nav-slot-1">
                  <b class="js-nav-slot__title nav-slot__title">Metal type</b>
                  <ul class="nav-slot__links">
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/occasion%7Cengagement/material%7Cwhite+gold/category%7Cjewellery%7Crings/">
                        White Gold Engagement Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/occasion%7Cengagement/material%7Cyellow+gold/category%7Cjewellery%7Crings/">
                        Yellow Gold Engagement Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/occasion%7Cengagement/material%7Crose+gold/category%7Cjewellery%7Crings/">
                        Rose Gold Engagement Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/category%7Crings/material%7Cplatinum/occasion%7Cengagement/">
                        Platinum Engagement Rings
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/occasion%7Cengagement/material%7Ctwo+colour+gold/category%7Cjewellery%7Crings/">
                        Two Colour Gold Engagement Rings
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="nav-slot-1">
                  <b class="js-nav-slot__title nav-slot__title">Brands</b>
                  <ul class="nav-slot__links">
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/l/jewellery/brand|ever+us/occasion|engagement/">
                        Ever Us
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/shops/ernest_jones.cdo">
                        Ernest Jones Diamond Collection
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/le-vian/">
                        Le Vian<sup>&reg;</sup>
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/leo-diamond/">
                        Leo Diamond<sup>&reg;</sup>
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/neil-lane/">
                        Neil Lane
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/shops/diamondstory.cdo">
                        The Diamond Story
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/tolkowsky/">
                        Tolkowsky
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/shops/verawanglove.cdo">
                        Vera Wang LOVE
                      </a>
                    </li>
                    <li>
                      <a class="js-nav-slot__link nav-slot__link " href="/webstore/brand%2Dindex.do">
                        <strong>View all brands</strong>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        `);    
      },
    },
  };

  Exp.init();
};

export default Run;
