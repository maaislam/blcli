/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import HomeMarkup from './components/homepageMarkup';
import settings from './settings';

const activate = () => {
  setup();

  const id = settings.ID;

  let homeBanners;
  if (settings.VARIATION === '1') {
    homeBanners = new HomeMarkup({
    banners: [
      {
        classTitle: `${id}-diamond ${id}-banner-small`,
        img: 'https://service.maxymiser.net/cm/images-us/1/1/2/0B0EFEDEF1D6B9876658CBCD9DA4D56FF1A4D0A90D8803934C6593610B962D25/hsamuel-co-uk/HS010---Home-Page-Banner-Concept/HS19WC04_MidSeason_Homepage14_1342x1050.jpg',
        link: 'https://www.hsamuel.co.uk/webstore/l/diamonds/?icid=hs-hp-mss-hp-diamonds-maxy',
      },
      {
        classTitle: `${id}-gen-sale ${id}-banner-large`,
        img: 'https://service.maxymiser.net/cm/images-us/1/1/2/5B9E60BA2A6EE630B4AC13273B35F817C871F7FE6234495D8A64A86EDDADDF10/hsamuel-co-uk/HS010---Home-Page-Banner-Concept/HS19WC04_MidSeason_Homepage16_1342x1050.jpg',
        /* innerText: `
        <p>
          <span class="${id}-promotion-hero-banner__tagline">UP TO</span>
          <span class="${id}-promotion-hero-banner__title">60% OFF</span>
          <span class="${id}-promotion-hero-banner__subtitle">SALE*</span>
        </p>`, */
        link: 'www.hsamuel.co.uk/webstore/offers.do?icid=hs-hp-mss-60sale-maxy',
      },
      {
        classTitle: `${id}-gen-sale ${id}-banner-large`,
        img: 'https://service.maxymiser.net/cm/images-us/1/1/2/5B9E60BA2A6EE630B4AC13273B35F817C871F7FE6234495D8A64A86EDDADDF10/hsamuel-co-uk/HS010---Home-Page-Banner-Concept/HS19WC04_MidSeason_Homepage16_1342x1050.jpg',
        /* innerText: `
        <p>
          <span class="${id}-promotion-hero-banner__tagline">UP TO</span>
          <span class="${id}-promotion-hero-banner__title">60% OFF</span>
          <span class="${id}-promotion-hero-banner__subtitle">SALE*</span>
        </p>`, */
        link: 'www.hsamuel.co.uk/webstore/offers.do?icid=hs-hp-mss-60sale-maxy',
      },
      {
        classTitle: `${id}-watches ${id}-banner-small`,
        img: 'https://service.maxymiser.net/cm/images-us/1/1/2/31161ACC6C9D501BD61ECFBC6A245B15782D1E71899C54BFDFD5399BA12A904A/hsamuel-co-uk/HS010---Home-Page-Banner-Concept/HS19WC04_MidSeason_Homepage17_1342x1050.jpg',
        link: 'https://www.hsamuel.co.uk/webstore/l/watches/?icid=hs-hp-mss-hp-watches-maxy',
      },
    ],
    });
  } else if (settings.VARIATION === '2') {
    homeBanners = new HomeMarkup({
    banners: [
      {
        classTitle: `${id}-gen-sale ${id}-banner-small`,
        img: 'https://service.maxymiser.net/cm/images-us/1/1/2/5B9E60BA2A6EE630B4AC13273B35F817C871F7FE6234495D8A64A86EDDADDF10/hsamuel-co-uk/HS010---Home-Page-Banner-Concept/HS19WC04_MidSeason_Homepage16_1342x1050.jpg',
       /* innerText: `
        <p>
          <span class="${id}-promotion-hero-banner__tagline">UP TO</span>
          <span class="${id}-promotion-hero-banner__title">60% OFF</span>
          <span class="${id}-promotion-hero-banner__subtitle">SALE*</span>
        </p>`, */
        link: 'www.hsamuel.co.uk/webstore/offers.do?icid=hs-hp-mss-60sale-maxy',
      },
      {
        classTitle: `${id}-diamond ${id}-banner-large`,
        img: 'https://service.maxymiser.net/cm/images-us/1/1/2/0B0EFEDEF1D6B9876658CBCD9DA4D56FF1A4D0A90D8803934C6593610B962D25/hsamuel-co-uk/HS010---Home-Page-Banner-Concept/HS19WC04_MidSeason_Homepage14_1342x1050.jpg',
        link: 'https://www.hsamuel.co.uk/webstore/l/diamonds/?icid=hs-hp-mss-hp-diamonds-maxy',
      },
      {
        classTitle: `${id}-watches ${id}-banner-large`,
        img: 'https://service.maxymiser.net/cm/images-us/1/1/2/31161ACC6C9D501BD61ECFBC6A245B15782D1E71899C54BFDFD5399BA12A904A/hsamuel-co-uk/HS010---Home-Page-Banner-Concept/HS19WC04_MidSeason_Homepage17_1342x1050.jpg',
        link: 'https://www.hsamuel.co.uk/webstore/l/watches/?icid=hs-hp-mss-hp-watches-maxy',
      },

      {
        classTitle: `${id}-gen-sale ${id}-banner-small`,
        img: 'https://service.maxymiser.net/cm/images-us/1/1/2/5B9E60BA2A6EE630B4AC13273B35F817C871F7FE6234495D8A64A86EDDADDF10/hsamuel-co-uk/HS010---Home-Page-Banner-Concept/HS19WC04_MidSeason_Homepage16_1342x1050.jpg',
        /* innerText: `
        <p>
          <span class="${id}-promotion-hero-banner__tagline">UP TO</span>
          <span class="${id}-promotion-hero-banner__title">60% OFF</span>
          <span class="${id}-promotion-hero-banner__subtitle">SALE*</span>
        </p>`, */
        link: 'www.hsamuel.co.uk/webstore/offers.do?icid=hs-hp-mss-60sale-maxy',
      },
    ],
    });
  }
};

export default activate;
