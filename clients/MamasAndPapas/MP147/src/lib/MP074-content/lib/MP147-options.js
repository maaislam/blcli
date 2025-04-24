const clothing = ['standard', 'clickCollect', 'chooseDay', 'nextDay', 'saturday', 'nextMorning', 'collectionPoint'];
const carSeats = ['standard', 'clickCollect', 'chooseDay', 'nextDay', 'saturday', 'nextMorning'];
const pushchairs = ['standard', 'clickCollect', 'nextDay', 'saturday', 'nextMorning'];
const mattresses = ['standard', 'clickCollect', 'chooseDay', 'nextDay', 'saturday', 'nextMorning'];
const furniture = ['chooseDayFurniture', 'saturdayFurniture', 'deliverBuild'];
// const newIn = ['standard', 'clickCollect', 'chooseDay', 'chooseDayFurniture', 'nextDay', 'saturday', 'nextMorning', 'collectionPoint', 'deliverBuild'];
const cribs = ['standard', 'clickCollect', 'chooseDay', 'nextDay', 'saturday', 'nextMorning'];
const beddingInteriors = ['standard', 'clickCollect', 'chooseDay', 'nextDay', 'saturday', 'nextMorning', 'collectionPoint'];
const playtime = ['standard', 'clickCollect', 'chooseDay', 'nextDay', 'saturday', 'nextMorning', 'collectionPoint'];
const babyFloorSeating = ['standard', 'clickCollect', 'chooseDay', 'nextDay', 'saturday', 'nextMorning', 'collectionPoint'];
const giftsByOccasion = ['standard', 'clickCollect', 'chooseDay', 'nextDay', 'saturday', 'nextMorning', 'collectionPoint'];
const giftsByType = ['standard', 'clickCollect', 'chooseDay', 'nextDay', 'saturday', 'nextMorning', 'collectionPoint'];
const bathTime = ['standard', 'clickCollect', 'chooseDay', 'nextDay', 'saturday', 'nextMorning', 'collectionPoint'];
const highchairs = ['standard', 'clickCollect', 'chooseDay', 'nextDay', 'saturday', 'nextMorning'];
const feeding = ['standard', 'clickCollect', 'chooseDay', 'nextDay', 'saturday', 'nextMorning', 'collectionPoint'];

const deliveryOptions = {
  standard: {
    className: 'MP074-standard',
    price: 'FREE*',
    deliveryName: 'Standard Delivery',
    smallText: 'on orders over £50*',
    extraLine: '(£4.95 Standard)',
  },
  clickCollect: {
    className: 'MP074-clickCollect',
    price: 'FREE',
    deliveryName: 'Click & Collect',
    smallText: 'to an M&P store',
  },
  chooseDay: {
    className: 'MP074-nominated',
    price: '£6.95',
    deliveryName: 'Nominated Day Delivery',
    smallText: '2 days notice required',
    extraLine: 'Tue - Fri only',
  },
  chooseDayFurniture: {
    className: 'MP074-nominated',
    price: '£9.95',
    deliveryName: 'Nominated Day Delivery - Furniture',
    smallText: '6 days notice required',
    extraLine: 'Tue - Fri only',
  },
  nextDay: {
    className: 'MP074-nextDay',
    price: '£7.95',
    deliveryName: 'Next Day Delivery',
    smallText: 'order before 2pm',
    extraLine: 'Tue - Fri only',
  },
  saturday: {
    className: 'MP074-saturday',
    price: '£9.95',
    deliveryName: 'Saturday Delivery',
    smallText: 'order before 2pm',
  },
  saturdayFurniture: {
    className: 'MP074-saturday',
    price: '£14.95',
    deliveryName: 'Saturday Delivery - Furniture',
    smallText: 'order before 2pm (6 days notice required)',
  },
  nextMorning: {
    className: 'MP074-nextMorning',
    price: '£9.95',
    deliveryName: 'Tomorrow Morning',
    smallText: 'order before 2pm',
    extraLine: 'Tue - Fri only',
  },
  collectionPoint: {
    className: 'MP074-collectfree',
    price: 'FREE*',
    deliveryName: 'Local Collect+',
    smallText: '*on orders over £50',
    extraLine: '(£4.95 Standard)',
  },
  deliverBuild: {
    className: 'MP074-deliveryBuild',
    price: '£150',
    deliveryName: 'Deliver and Build',
    smallText: 'built for you',
  },
  collectPlus: {
    className: 'MP074-collectPlus',
    price: 'FREE*',
    deliveryName: 'Local Collect+',
    smallText: '*on orders over £50',
  },
};

const deliveryInfo = {
  standard: {
    content: `<li>Standard Delivery <strong>FREE</strong>
      <span>Free on orders over £50 (excluding furniture & some larger items). Orders under £50 are £4.95.</span>
    </li>`,
  },
  clickCollect: {
    content: `<li>Click & Collect <strong>FREE</strong>
      <span>Free delivery a Mamas and Papas store of your choice for easy collection. <br>(Free on orders over £50,  £4.95 standard)</span>
    </li>`,
  },
  chooseDay: {
    content: `<li>Choose your day <strong>£6.95</strong>
      <span>Choose a delivery day that suits you. 2 days notice required. Tuesday to Friday only.</span>
    </li>`,
  },
  chooseDayFurniture: {
    content: `<li>Choose your day <strong>£6.95</strong>
      <span>Choose a delivery day that suits you. 6 days notice required. Tuesday to Friday only.</span>
    </li>`,
  },
  nextDay: {
    content: `<li>Next day delivery <strong>£7.95</strong>
      <span>Order before 2pm. Avaiable for delivery Tuesday to Friday only.</span>
    </li>`,
  },
  saturday: {
    content: `<li>Saturday delivery <strong>£9.95</strong>
      <span>Order before midday Friday to receive your order on Saturday.</span>
    </li>`,
  },
  saturdayFurniture: {
    content: `<li>Saturday delivery <strong>£14.95</strong>
      <span>Convenient delivery on a Saturday. 6 days notice required.</span>
    </li>`,
  },
  nextMorning: {
    content: `<li>Morning (before 10:30am) <strong>£9.95</strong>
      <span>Order before 2pm for delivery before 10:30 tomorrow. Tuesday to Friday only.</span>
    </li>`,
  },
  collectionPoint: {
    content: `<li>Local Collect+ <strong>£4.95</strong>
      <span>Collect from a choice of over 3,500 Collectplus and DPD parcelshop stores.</span>
    </li>`,
  },
  deliverBuild: {
    content: `<li>Deliver and Build <strong>£150</strong>
      <span>Choose a delivery date that suits you. Our trained team will deliver and build all furniture and place in position in the room of your choice.</span>
    </li>`,
  },
};

const getCategoryData = (category, options, deliveryContent) => {
  let count = 0;
  for (let i = 0; i < category.length; i += 1) {
    const deliveryOption = category[i];
    if (count < 4) {
      options[deliveryOption] = deliveryOptions[deliveryOption];
      count += 1;
    }
    deliveryContent += deliveryInfo[deliveryOption].content;
  }
  return deliveryContent;
};

// Get Category from Breadcrumbs
let category = '';
if (window && window.universal_variable && window.universal_variable.page && window.universal_variable.page.breadcrumb) {
  const breadcrumbs = window.universal_variable.page.breadcrumb;
  for (let i = 0; i < breadcrumbs.length; i += 1) {
    const breadcrumb = breadcrumbs[i].toLowerCase();
    if (breadcrumb.indexOf('clothing') > -1) {
      category = clothing;
      break;
    } else if (breadcrumb.indexOf('car seat') > -1) {
      category = carSeats;
      break;
    } else if (breadcrumb.indexOf('travel') > -1) {
      category = pushchairs;
      break;
    } else if (breadcrumb.indexOf('mattress') > -1) {
      category = mattresses;
      break;
    } else if (breadcrumb.indexOf('furniture') > -1) {
      category = furniture;
      break;
    } else if (breadcrumb.indexOf('cots') > -1) {
      category = cribs;
      break;
    } else if (breadcrumb.indexOf('bedding') > -1) {
      category = beddingInteriors;
      break;
    } else if (breadcrumb.indexOf('playtime') > -1) {
      category = playtime;
      break;
    } else if (breadcrumb.indexOf('sit') > -1 && breadcrumb.indexOf('play') > -1) {
      category = babyFloorSeating;
      break;
    } else if (breadcrumb.indexOf('gifts by occasion') > -1) {
      category = giftsByOccasion;
      break;
    } else if (breadcrumb.indexOf('gifts by type') > -1) {
      category = giftsByType;
      break;
    } else if (breadcrumb.indexOf('bath time') > -1) {
      category = bathTime;
      break;
    } else if (breadcrumb.indexOf('highchair') > -1) {
      category = highchairs;
      break;
    } else if (breadcrumb.indexOf('feeding') > -1) {
      category = feeding;
      break;
    } 
  }
} 


let options = {};
let deliveryContent = '';

if (category !== '') {
  deliveryContent = getCategoryData(category, options, deliveryContent);
}

export {options};
export {deliveryContent};
