export default function content (text) {
const keyword = text.toLowerCase().replace(' ', '_');

const data = {
    'armadillo': {
      'name': 'Armadillo in Buggies & Strollers',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/armadillo' name='Armadillo in Buggies & Strollers'>
                <li class="MP149-result">
                    Armadillo <strong>in Buggies & Strollers</strong>
                </li>
              </a>`,
    },
    'atlas1': {
      'name': 'Atlas in Furniture Collections',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/atlas' name='Atlas in Furniture Collections'>
                <li class="MP149-result">
                    Atlas <strong>in Furniture Collections</strong>
                </li>
              </a>`,
    },
    'atlas2': {
      'name': 'Atlas in Cots & Beds',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/atlas?q=%3AtopRated%3AsubCat%3ACot%20Beds' name='Atlas in Cots & Beds'>
                <li class="MP149-result">
                    Atlas <strong>in Cots &amp; Beds</strong>
                </li>
              </a>`,
    },
    'atlas3': {
      'name': 'Atlas in Wardrobes',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/atlas?q=%3AtopRated%3AsubCat%3AWardrobes' name='Atlas in Wardrobes'>
                <li class="MP149-result">
                    Atlas <strong>in Wardrobes</strong>
                </li>
              </a>`,
    },
    'atlas4': {
      'name': 'Atlas in Dressers & Changers',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/atlas?q=%3AtopRated%3AsubCat%3ADressers%20%26%20Changers' name='Atlas in Dressers & Changers'>
                <li class="MP149-result">
                    Atlas <strong>in Dressers &amp; Changers</strong>
                </li>
              </a>`,
    },
    'baby_monitor': {
      'name': 'Baby monitor in Nightlights & Monitors',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/baby-monitor-night-light' name='Baby monitor in Nightlights & Monitors'>
                <li class="MP149-result">
                    Baby monitor <strong>in Nightlights & Monitors</strong>
                </li>
              </a>`,
    },
    'snug': {
      'name': 'Snug in Floor Seating',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/baby-floor-seating' name='Snug in Floor Seating'>
                <li class="MP149-result">
                    Snug <strong>in Sleep Bags & Swaddling</strong>
                </li>
              </a>`,
    },
    'baby_snug1': {
      'name': 'Baby snug in Floor Seating',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/baby-monitor-night-light' name='Baby snug in Floor Seating'>
                <li class="MP149-result">
                    Baby snug <strong>in Floor Seating</strong>
                </li>
              </a>`,
    },
    'baby_snug2': {
      'name': 'Baby snug in Booster Seats',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/booster-seats' name='Baby snug in Booster Seats'>
                <li class="MP149-result">
                    Baby snug <strong>in Booster Seats</strong>
                </li>
              </a>`,
    },
    'baby_snug3': {
      'name': 'Baby snug in Sleep Bags & Swaddling',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/dreampods-swaddling' name='Baby snug in Sleep Bags & Swaddling'>
                <li class="MP149-result">
                    Baby snug <strong>in Sleep Bags & Swaddling</strong>
                </li>
              </a>`,
    },
    'bath1': {
      'name': 'Bath in Baths & Tidies',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/bathtime?q=%3AtopRated%3AsubCat%3ABaths%20%26%20Tidies' name='Bath in Baths & Tidies'>
                <li class="MP149-result">
                  Bath <strong>in Baths & Tidies</strong>
                </li>
              </a>`,
    },
    'bath2': {
      'name': 'Bath in Bath Support',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/bathtime?q=%3AtopRated%3AsubCat%3ABath%20Support' name='Bath in Bath Support'>
                <li class="MP149-result">
                  Bath <strong>in Bath Support</strong>
                </li>
              </a>`,
    },
    'bath3': {
      'name': 'Bath in Bath Seat',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/bathtime?q=%3AtopRated%3AsubCat%3ABath%20Seat%20' name='Bath in Bath Seat'>
                <li class="MP149-result">
                  Bath <strong>in Bath Seat</strong>
                </li>
              </a>`,
    },
    'blanket': {
      'name': 'Blanket in Bedding & Interiors',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/blankets' name='Blanket in Bedding & Interiors'>
                <li class="MP149-result">
                  Blanket <strong>in Bedding & Interiors</strong>
                </li>
              </a>`,
    },
    'bouncer': {
      'name': 'Bouncer in Rockers, Bouncers & Swings',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/rockers-bouncers-swings' name='Bouncer in Rockers, Bouncers & Swings'>
                <li class="MP149-result">
                  Bouncer <strong>in Rockers, Bouncers & Swings</strong>
                </li>
              </a>`,
    },
    'bugaboo': {
      'name': 'Bugaboo in Pushchairs & Prams',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/pushchairs-prams?q=%3AtopRated%3Abrand%3ABugaboo' name='Bugaboo in Pushchairs & Prams'>
                <li class="MP149-result">
                  Bugaboo <strong>in Pushchairs & Prams</strong>
                </li>
              </a>`,
    },
    'bumbo': {
      'name': 'Bumbo in Floor Seating',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/baby-floor-seating' name='Bumbo in Floor Seating'>
                <li class="MP149-result">
                  Bumbo <strong>in Floor Seating</strong>
                </li>
              </a>`,
    },
    'car_seat': {
      'name': 'Car seat in Car Seats',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/car-seats' name='Car seat in Car Seats'>
                <li class="MP149-result">
                  Car seat <strong>in Car Seats</strong>
                </li>
              </a>`,
    },
    'chair1': {
      'name': 'Chair in Highchairs',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/highchairs' name='Chair in Highchairs'>
                <li class="MP149-result">
                  Chair <strong>in Highchairs</strong>
                </li>
              </a>`,
    },
    'chair2': {
      'name': 'Chair in Floor Seating',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/baby-floor-seating' name='Chair in Floor Seating'>
                <li class="MP149-result">
                  Chair <strong>in Floor Seating</strong>
                </li>
              </a>`,
    },
    'chair3': {
      'name': 'Chair in Boosters Seats',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/booster-seats' name='Chair in Boosters Seats'>
                <li class="MP149-result">
                  Chair <strong>in Boosters Seats</strong>
                </li>
              </a>`,
    },
    'chair4': {
      'name': 'Chair in Nursery Furniture',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/nursery-furniture?q=%3AtopRated%3AsubCat%3AChairs' name='Chair in Nursery Furniture'>
                <li class="MP149-result">
                  Chair <strong>in Nursery Furniture</strong>
                </li>
              </a>`,
    },
    'changing_bag': {
      'name': 'Changing bag in Travel Accessories',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/travel-changing-bags' name='Changing bag in Travel Accessories'>
                <li class="MP149-result">
                  Changing bag <strong>in Travel Accessories</strong>
                </li>
              </a>`,
    },
    'changing_mat': {
      'name': 'Changing mat in Bathing & Feeding',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/bathtime?q=%3AtopRated%3AsubCat%3AChanging%20Mats' name='Changing mat in Bathing & Feeding'>
                <li class="MP149-result">
                  Changing mat <strong>in Bathing & Feeding</strong>
                </li>
              </a>`,
    },
    // 'cot1': {
    //   'name': 'Cot in Cots & Beds',
    //   'html': `<li class="MP149-result">
    //             <a href='https://www.mamasandpapas.com/en-gb/c/cots-cribs-cotbeds'>
    //             Cot <strong>in Cots & Beds</strong></a>
    //           </li>`,
    // },
    // 'cot2': {
    //   'name': 'Cot in Travel Cots',
    //   'html': `<li class="MP149-result">
    //             <a href='https://www.mamasandpapas.com/en-gb/c/travel-cots'>
    //             Cot <strong>in Travel Cots</strong></a>
    //           </li>`,
    // },
    // 'cot3': {
    //   'name': 'Cot in Bedside Sleeping',
    //   'html': `<li class="MP149-result">
    //             <a href='https://www.mamasandpapas.com/en-gb/c/moses-baskets-stands'>
    //             Cot <strong>in Bedside Sleeping</strong></a>
    //           </li>`,
    // },
    'cot_bed1': {
      'name': 'Cot bed in Cots & Beds',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/cots-cribs-cotbeds' name='Cot bed in Cots & Beds'>
                <li class="MP149-result">
                  Cot bed <strong>in Cots & Beds</strong>
                </li>
              </a>`,
    },
    'cot_bed2': {
      'name': 'Cot bed in Travel Cots',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/travel-cots' name='Cot bed in Travel Cots'>
                <li class="MP149-result">
                  Cot bed <strong>in Travel Cots</strong>
                </li>
              </a>`,
    },
    'cot_bed3': {
      'name': 'Cot bed in Bedside Sleeping',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/moses-baskets-stands' name='Cot bed in Bedside Sleeping'>
                <li class="MP149-result">
                  Cot bed <strong>in Bedside Sleeping</strong>
                </li>
              </a>`,
    },
    'footmuff': {
      'name': 'Foot muff in Cold Weather Accessories',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/cold-weather' name='Foot muff in Cold Weather Accessories'>
                <li class="MP149-result">
                  Foot muff <strong>in Cold Weather Accessories</strong>
                </li>
              </a>`,
    },
    'highchair': {
      'name': 'High chair in Highchairs',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/highchairs' name='High chair in Highchairs'>
                <li class="MP149-result">
                  High chair <strong>in Highchairs</strong>
                </li>
              </a>`,
    },
    'mattress': {
      'name': 'Mattress in Mattresses',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/all-mattresses' name='Mattress in Mattresses'>
                <li class="MP149-result">
                  Mattress <strong>in Mattresses</strong>
                </li>
              </a>`,
    },
    'mobile': {
      'name': 'Mobile in Cot Mobiles',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/nursery-cot-mobiles' name='Mobile in Cot Mobiles'>
                <li class="MP149-result">
                  Mobile <strong>in Cot Mobiles</strong>
                </li>
              </a>`,
    },
    'moses': {
      'name': 'Moses in Moses Baskets & Beside Sleeping',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/moses-baskets-stands' name='Moses in Moses Baskets & Beside Sleeping'>
                <li class="MP149-result">
                  Moses <strong>in Moses Baskets & Beside Sleeping</strong>
                </li>
              </a>`,
    },
    'moses_basket': {
      'name': 'Moses bakset in Moses Baskets & Beside Sleeping',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/moses-baskets-stands' name='Moses bakset in Moses Baskets & Beside Sleeping'>
                <li class="MP149-result">
                  Moses bakset <strong>in Moses Baskets & Beside Sleeping</strong>
                </li>
              </a>`,
    },
    'ocarro': {
      'name': 'Ocarro in Pushchairs & Prams',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/ocarro' name='Ocarro in Pushchairs & Prams'>
                <li class="MP149-result">
                  Ocarro <strong>in Pushchairs & Prams</strong>
                </li>
              </a>`,
    },
    'occaro': {
      'name': 'Ocarro in Pushchairs & Prams',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/ocarro' name='Ocarro in Pushchairs & Prams'>
                <li class="MP149-result">
                  Ocarro <strong>in Pushchairs & Prams</strong>
                </li>
              </a>`,
    },
    'playmat': {
      'name': 'Play mat in Playmats & Gyms',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/playmats-gyms-0months' name='Play mat in Playmats & Gyms'>
                <li class="MP149-result">
                  Play mat <strong>in Playmats & Gyms</strong>
                </li>
              </a>`,
    },
    'pram': {
      'name': 'Pram in Pushchairs & Prams',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/pushchairs-prams' name='Pram in Pushchairs & Prams'>
                <li class="MP149-result">
                  Pram <strong>in Pushchairs & Prams</strong>
                </li>
              </a>`,
    },
    'pramsuit1': {
      'name': 'Pramsuit in Boys Outerwear',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/outerwear-boys?q=%3AtopRated%3AsubCat%3APramsuits' name='Pramsuit in Boys Outerwear'>
                <li class="MP149-result">
                  Pramsuit <strong>in Boys Outerwear</strong>
                </li>
              </a>`,
    },
    'pramsuit2': {
      'name': 'Pramsuit in Girls Outerwear',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/outerwear-girls?q=%3AtopRated%3AsubCat%3APramsuits' name='Pramsuit in Girls Outerwear'>
                <li class="MP149-result">
                  Pramsuit <strong>in Girls Outerwear</strong>
                </li>
              </a>`,
    },
    'pramsuit3': {
      'name': 'Pramsuit in Newborn Baby Jackets & Pramsuits',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/outerwear-unisex' name='Pramsuit in Newborn Baby Jackets & Pramsuits'>
                <li class="MP149-result">
                  Pramsuit <strong>in Newborn Baby Jackets & Pramsuits</strong>
                </li>
              </a>`,
    },
    'rocking': {
      'name': 'Rocking in Rocking Horses & Animals',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/rocking-horse-animals' name='Rocking in Rocking Horses & Animals'>
                <li class="MP149-result">
                  Rocking <strong>in Rocking Horses & Animals</strong>
                </li>
              </a>`,
    },
    'rocking_horse': {
      'name': 'Rocking horse in Rocking Horses & Animals',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/rocking-horse-animals' name='Rocking horse in Rocking Horses & Animals'>
                <li class="MP149-result">
                  Rocking horse <strong>in Rocking Horses & Animals</strong>
                </li>
              </a>`,
    },
    'sleeping_bag': {
      'name': 'Sleeping bag in Dreampod Sleep Bags & Swaddling',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/dreampods-swaddling' name='Sleeping bag in Dreampod Sleep Bags & Swaddling'>
                <li class="MP149-result">
                  Sleeping bag <strong>in Dreampod Sleep Bags & Swaddling</strong>
                </li>
              </a>`,
    },
    'snowsuit1': {
      'name': 'Snowsuit in Boys Outerwear',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/outerwear-boys?q=%3AtopRated%3AsubCat%3APramsuits' name='Snowsuit in Boys Outerwear'>
                <li class="MP149-result">
                  Snowsuit <strong>in Boys Outerwear</strong>
                </li>
              </a>`,
    },
    'snowsuit2': {
      'name': 'Snowsuit in Girls Outerwear',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/outerwear-girls?q=%3AtopRated%3AsubCat%3APramsuits' name='Snowsuit in Girls Outerwear'>
                <li class="MP149-result">
                  Snowsuit <strong>in Girls Outerwear</strong>
                </li>
              </a>`,
    },
    'snowsuit3': {
      'name': 'Snowsuit in Newborn Baby Jackets & Pramsuits',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/outerwear-unisex' name='Snowsuit in Newborn Baby Jackets & Pramsuits'>
                <li class="MP149-result">
                  Snowsuit <strong>in Newborn Baby Jackets & Pramsuits</strong>
                </li>
              </a>`,
    },
    'stroller': {
      'name': 'Stroller in Buggies & Strollers',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/buggies-strollers' name='Stroller in Buggies & Strollers'>
                <li class="MP149-result">
                  Stroller  <strong>in Buggies & Strollers</strong>
                </li>
              </a>`,
    },
    'travel_cot': {
      'name': 'Travel cot in Travel Cots',
      'html': `<a href='https://www.mamasandpapas.com/en-gb/c/travel-cots' name='Travel cot in Travel Cots'>
                <li class="MP149-result">
                  Travel cot <strong>in Travel Cots</strong>
                </li>
              </a>`,
    },
  }

  let results = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      /**
       * @desc When searched text is more than three characters, then show suggestions
       */
      if (keyword.length > 2 && key.indexOf(`${keyword}`) > -1) {
        results[`${key}`] = data[`${key}`];
      }
    }
  }
  return(results);
}