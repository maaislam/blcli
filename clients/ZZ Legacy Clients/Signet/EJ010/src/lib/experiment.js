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

  let homeContent;
  if (settings.VARIATION === '1') {
    homeContent = new HomeMarkup({
      banners: [
        {
          classTitle: `${id}-watchesBanner`,
          title: 'Luxury Watches',
          img: 'https://service.maxymiser.net/cm/images-us/1/1/2/5D1313526C3471D2F9DA4BEDCEB8B0FA9484D6D8F7EB20F1F4B0B2A07975CB62/ernestjones-co-uk/EJ010---Homepage-Concept/WATCH2.jpg',
          innerText: 'Shop for your new favourite timepiece now',
          link: 'https://www.ernestjones.co.uk/webstore/l/watches/',
        },
        {
          classTitle: `${id}-jewelleryBanner`,
          title: 'Engagement Rings',
          img: 'https://service.maxymiser.net/cm/images-us/1/1/2/45292280FA2DB5738843AD3CAF9430FE7567FE6F60B5CD43A4A7625BF4BB3AF8/ernestjones-co-uk/EJ010---Homepage-Concept/ENGAGEMENT.jpg',
          innerText: 'Find the perfect ring for the perfect proposal',
          link: 'https://www.ernestjones.co.uk/webstore/l/jewellery/category%7Crings/occasion%7Cengagement/',
        },
        {
          classTitle: `${id}-diamondBanner`,
          title: 'Diamond Jewellery',
          img: 'https://service.maxymiser.net/cm/images-us/1/1/2/589515B291A716D0731547BBE924C8B357A859B1354F9CF8FE6C1958A7D4B89C/ernestjones-co-uk/EJ010---Homepage-Concept/JEWELLERY.jpg',
          innerText: 'Sparkle into the summer season with stunning diamonds',
          link: 'https://www.ernestjones.co.uk/webstore/l/diamonds/',
        },
      ],
    });
  } else if (settings.VARIATION === '2') {
    homeContent = new HomeMarkup({
      banners: [
        {
          classTitle: `${id}-diamondBanner`,
          title: 'Diamond Jewellery',
          img: 'https://service.maxymiser.net/cm/images-us/1/1/2/589515B291A716D0731547BBE924C8B357A859B1354F9CF8FE6C1958A7D4B89C/ernestjones-co-uk/EJ010---Homepage-Concept/JEWELLERY.jpg',
          innerText: 'Sparkle into the summer season with stunning diamonds',
          link: 'https://www.ernestjones.co.uk/webstore/l/diamonds/',
        },
        {
          classTitle: `${id}-watchesBanner`,
          title: 'Luxury Watches',
          img: 'https://service.maxymiser.net/cm/images-us/1/1/2/5D1313526C3471D2F9DA4BEDCEB8B0FA9484D6D8F7EB20F1F4B0B2A07975CB62/ernestjones-co-uk/EJ010---Homepage-Concept/WATCH2.jpg',
          innerText: 'Shop for your new favourite timepiece now',
          link: 'https://www.ernestjones.co.uk/webstore/l/watches/',
        },
        {
          classTitle: `${id}-jewelleryBanner`,
          title: 'Engagement Rings',
          img: 'https://service.maxymiser.net/cm/images-us/1/1/2/45292280FA2DB5738843AD3CAF9430FE7567FE6F60B5CD43A4A7625BF4BB3AF8/ernestjones-co-uk/EJ010---Homepage-Concept/ENGAGEMENT.jpg',
          innerText: 'Find the perfect ring for the perfect proposal',
          link: 'https://www.ernestjones.co.uk/webstore/l/jewellery/category%7Crings/occasion%7Cengagement/',
        },
      ],
    });
  }
};

export default activate;
