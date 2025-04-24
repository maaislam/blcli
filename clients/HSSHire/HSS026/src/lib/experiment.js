/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';

export default () => {
  setup();


  const conf = {
    'https://www.hss.com/hire/c/access/access-towers-and-platforms': {
      '1': 'weekly',
      '2': 'weekly',
      '3': 'weekly',
      '4': 'weekly',
      '5': 'weekly',
      '6': 'weekly',
      '0': 'weekly',
    },
    'https://www.hss.com/hire/c/access/ladders-and-steps': {
      '1': 'weekly',
      '2': 'weekly',
      '3': 'weekly',
      '4': 'weekly',
      '5': 'weekly',
      '6': 'weekly',
      '0': 'weekly',
    },
    'https://www.hss.com/hire/c/access/trestles-stagings-and-steps': {
      '1': 'weekly',
      '2': 'weekly',
      '3': 'weekly',
      '4': 'weekly',
      '5': 'weekly',
      '6': 'weekly',
      '0': 'weekly',
    },
    'https://www.hss.com/hire/c/access/work-platforms': {
      '1': 'weekly',
      '2': 'weekly',
      '3': 'weekly',
      '4': 'weekly',
      '5': 'weekly',
      '6': 'weekly',
      '0': 'weekly',
    },
    'https://www.hss.com/hire/c/sanding-and-fixing/floor-sanders': {
      '1': 'weekly',
      '2': 'daily',
      '3': 'daily',
      '4': 'weekend',
      '5': 'weekend',
      '6': 'weekend',
      '0': 'weekly',
    },
    'https://www.hss.com/hire/c/sanding-and-fixing/orbital-and-belt-sanders': {
      '1': 'weekly',
      '2': 'daily',
      '3': 'daily',
      '4': 'weekend',
      '5': 'weekend',
      '6': 'weekend',
      '0': 'weekly',
    },
    'https://www.hss.com/hire/c/concreting-and-compaction/concrete-cement-mixers': {
      '1': 'weekly',
      '2': 'daily',
      '3': 'daily',
      '4': 'weekend',
      '5': 'weekend',
      '6': 'weekend',
      '0': 'weekly',
    },
    'https://www.hss.com/hire/c/concreting-and-compaction/concreting': {
      '1': 'weekly',
      '2': 'daily',
      '3': 'daily',
      '4': 'weekend',
      '5': 'weekend',
      '6': 'weekend',
      '0': 'weekly',
    },
    'https://www.hss.com/hire/c/concreting-and-compaction/cutting-and-compaction': {
      '1': 'weekly',
      '2': 'daily',
      '3': 'daily',
      '4': 'weekend',
      '5': 'weekend',
      '6': 'weekend',
      '0': 'weekly',
    },
    'https://www.hss.com/hire/c/concreting-and-compaction/surface-preparation': {
      '1': 'weekly',
      '2': 'daily',
      '3': 'daily',
      '4': 'weekend',
      '5': 'weekend',
      '6': 'weekend',
      '0': 'weekly',
    },
    'https://www.hss.com/hire/c/breaking-and-drilling/electric-breakers': {
      '1': 'weekly',
      '2': 'daily',
      '3': 'daily',
      '4': 'weekend',
      '5': 'weekend',
      '6': 'weekend',
      '0': 'weekly',
    },
    'https://www.hss.com/hire/c/breaking-and-drilling/petrol-breakers': {
      '1': 'weekly',
      '2': 'daily',
      '3': 'daily',
      '4': 'weekend',
      '5': 'weekend',
      '6': 'weekend',
      '0': 'weekly',
    },
    'https://www.hss.com/hire/c/cleaning-and-floorcare/carpet-cleaners': {
      '1': 'daily',
      '2': 'daily',
      '3': 'daily',
      '4': 'weekend',
      '5': 'weekend',
      '6': 'weekend',
      '0': 'daily',
    },
    'https://www.hss.com/hire/c/cleaning-and-floorcare/floor-scrubbers': {
      '1': 'daily',
      '2': 'daily',
      '3': 'daily',
      '4': 'weekend',
      '5': 'weekend',
      '6': 'weekend',
      '0': 'daily',
    },
    'https://www.hss.com/hire/c/cleaning-and-floorcare/pressure-washers': {
      '1': 'daily',
      '2': 'daily',
      '3': 'daily',
      '4': 'weekend',
      '5': 'weekend',
      '6': 'weekend',
      '0': 'daily',
    },
    'https://www.hss.com/hire/c/cleaning-and-floorcare/steam-cleaners': {
      '1': 'daily',
      '2': 'daily',
      '3': 'daily',
      '4': 'weekend',
      '5': 'weekend',
      '6': 'weekend',
      '0': 'daily',
    },
    'https://www.hss.com/hire/c/cleaning-and-floorcare/vacuum-cleaners': {
      '1': 'daily',
      '2': 'daily',
      '3': 'daily',
      '4': 'weekend',
      '5': 'weekend',
      '6': 'weekend',
      '0': 'daily',
    },
  }

  const whatDay = () => {
    const d = new Date();
    const today = d.getDay();
    return today;
  }

  const day = whatDay();

  const confResult = conf[window.location.href][day];


  const fetchProductPrices = (url, ref) => {

    fetch(url, { method: 'GET' })
      .then((res) => res.text())
      .then((html) => {
        const div = document.createElement('div');
        div.innerHTML = html;

        // Query prices
        const prices = div.querySelectorAll('.mobile-price .price-blk');

        // Loop over and build object
        const pricesArr = [];

        for (let i = 0; prices.length > i; i += 1) {
          const label = prices[i].querySelector('label');
          const price = prices[i].querySelector('p');

          if (confResult == 'daily' && label.textContent.trim() == '1st day') {
            pricesArr.push({
              label: label.textContent.trim(),
              price: price.textContent.trim()
            });
          }

          if (confResult == 'weekly' && label.textContent.trim() == 'Week') {
            pricesArr.push({
              label: label.textContent.trim(),
              price: price.textContent.trim()
            });
          }

          if (confResult == 'weekend' && label.textContent.trim() == 'WeekEnd') {
            pricesArr.push({
              label: label.textContent.trim(),
              price: price.textContent.trim()
            });
          }

        }


        if (pricesArr.length) {
          ref.innerHTML = '';
          ref.insertAdjacentHTML('afterbegin', `
            ${pricesArr[0].price} / ${confResult}
          `);
        }

        return pricesArr;

      }).catch((err) => {
        console.error('err', err);
      })
  }


  // Fetch first three products
  const prods = document.querySelectorAll('.prod_list_outer a.productMainLink');
  const threeProds = Array.from(prods).slice(0, 3);

  if (threeProds) {
    threeProds.forEach(prod => {
      const priceRef = prod.parentElement?.querySelector('p.price');
      console.log({priceRef})
      fetchProductPrices(prod.href, priceRef);
      prod.parentElement.classList.add('HSS026-change')
    });
  }

  // fetchProductPrices('https://www.hss.com/hire/p/mitower-one-person-quick-build-tower');
};
