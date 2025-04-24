const optionsFirst = {
  standard: {
    className: 'MP074-standard',
    price: 'FREE*',
    deliveryName: 'Standard Delivery',
    smallText: 'on orders over £50',
  },
  clickCollect: {
    className: 'MP074-clickCollect',
    price: 'FREE',
    deliveryName: 'Click & Collect',
    smallText: 'to your nearest shop',
  },
  under50: {
    className: 'MP074-under50',
    price: '£4.95',
    deliveryName: 'Standard Delivery',
    smallText: 'on orders under £50',
  },
  nextDay: {
    className: 'MP074-nextDay',
    price: '£7.95',
    deliveryName: 'Next Day Delivery',
    smallText: 'order before 2pm - Mon to Thurs',
  },
};
const optionsSecond = {
  nextMorning: {
    className: 'MP074-nextMorning',
    price: '£9.95',
    deliveryName: 'Next Morning Delivery',
    smallText: 'order before 2pm*',
  },
  nominated: {
    className: 'MP074-nominated',
    price: '£6.95',
    deliveryName: 'Nominated Day Delivery',
    smallText: 'with 2 days notice (6 days for furniture)',
  },
  saturday: {
    className: 'MP074-saturday',
    price: '£9.95',
    deliveryName: 'Saturday Delivery',
    smallText: 'order before midday Friday (6 days notice for furniture)',
  },
  freeCollect: {
    className: 'MP074-collectfree',
    price: 'FREE',
    deliveryName: 'Collect + Delivery',
    smallText: 'to your local convenience store',
  },
};
export { optionsFirst };
export { optionsSecond };
