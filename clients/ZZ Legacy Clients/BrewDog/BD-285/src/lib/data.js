const data = {
  'Shop': {
    name: 'Shop',
    link: '/uk/shop/beer',
    items: [
      {
        name: 'Beer',
        hasSubmenu: true,
        link: '/uk/shop/beer',
        banner: {
          img: 'https://ucds.ams3.digitaloceanspaces.com/BD-285/brewbg.jpg',
          text: 'How we Brew',
          link: '/uk/beers/how-we-brew'
        },
        children: [
          {
            name: 'Shop All Beer',
            link: '/uk/shop/beer',
          },
          {
            name: 'Best Sellers',
            link: '/uk/shop/best-sellers',
          },
          {
            name: 'Mixed Packs',
            link: '/uk/shop/all-bundles',
          },
          {
            name: 'Alcohol Free',
            link: '/uk/shop/alcohol-free',
          },
          {
            name: "What's new",
            link: '/uk/shop/new-releases',
          },
          {
            name: 'Collaborations',
            link: '/uk/beers/seasonal',
          },
          {
            name: 'BrewDog & Friends',
            link: '/uk/brewdogandfriends',
          },
        ],
      },
      {
        name: 'Cider',
        link: '/uk/shop/cider',
        hasSubmenu: false,
      },
      {
        name: 'Spirits',
        link: '/uk/shop/spirits',
        hasSubmenu: false,
      },
      {
        name: 'Merch',
        link: '/uk/shop/merchandise',
        hasSubmenu: false,
      },
      {
        name: 'Gifts',
        link: '/uk/gift-guide',
        hasSubmenu: false,
      },
    ]
  },
  'Visit': {
    name: 'Visit',
    link: '/uk/locations',
    items: [
      {
        name: 'Bars',
        hasSubmenu: true,
        link: '/uk/bar_pages/bar/locator',
        banner: {
          img: 'https://ucds.ams3.digitaloceanspaces.com/BD-285/brewbg.jpg',
          text: 'How we Brew',
          link: '/uk/beers/how-we-brew'
        },
        children: [
          {
            name: 'Find Your Local Bar',
            link: '/uk/bar_pages/bar/locator',
          },
          {
            name: 'Events',
            link: '/uk/community/events',
          },
          {
            name: 'Experiences',
            link: '/uk/locations/bar-experience',
          },
          {
            name: 'Bar Gift Cards',
            link: '/uk/bar-giftcard',
          },
          {
            name: 'Open Arms Online Bar',
            link: '/uk/onlinebar',
          },
          {
            name: 'Christmas',
            link: '/uk/bookings/christmas',
          },
          {
            name: 'Franchise Opportunities',
            link: '/uk/locations/bar-partnerships',
          },
        ],
      },
      {
        name: 'Hotels',
        link: '/uk/locations/hotels',
        hasSubmenu: true,
        banner: {
          img: 'https://ucds.ams3.digitaloceanspaces.com/BD-285/brewbg.jpg',
          text: 'How we Brew',
          link: '/uk/beers/how-we-brew'
        },
        children: [
          {
            name: 'Our Hotels',
            link: '/uk/locations/hotels',
          },
          {
            name: 'Doghouse, Manchester',
            link: '/doghouse-manchester/hotel',
          },
          {
            name: 'Doghouse, Columbus',
            link: '/uk/locations/hotels/doghouse',
          },
          {
            name: 'Kennels, Aberdeen',
            link: '/uk/locations/hotels/aberdeen',
          },
          {
            name: 'Kennels, Columbus',
            link: '/uk/locations/hotels/columbus',
          },
          {
            name: 'Coming Soon!',
            link: '/uk/bar_pages/bar/locator/filter/coming-soon/',
          },
        ],
      },
      {
        name: 'Breweries',
        link: '/uk/locations/brewery',
        hasSubmenu: true,
        banner: {
          img: 'https://ucds.ams3.digitaloceanspaces.com/BD-285/brewbg.jpg',
          text: 'How we Brew',
          link: '/uk/beers/how-we-brew'
        },
        children: [
          {
            name: 'Our Breweries',
            link: '/uk/locations/brewery',
          },
          {
            name: 'Ellon, Scotland',
            link: '/uk/locations/brewery/ellon',
          },
          {
            name: 'Columbus, Ohio',
            link: '/uk/locations/brewery/columbus',
          },
          {
            name: 'Berlin, Germany',
            link: '/uk/locations/brewery/berlin',
          },
          {
            name: 'Overworks, Scotland',
            link: '/uk/locations/brewery/overworks',
          },
          {
            name: 'Brisbane, Australia',
            link: '/uk/locations/brewery/brisbane',
          },
        ],
      },
      {
        name: 'BrewDog Now',
        hasSubmenu: false,
        link: 'https://www.now.brewdog.com/',
      },
    ]
  },
  'Community': {
    name: 'Community',
    link: '/uk/community',
    items: [
      {
        name: 'Stories',
        hasSubmenu: true,
        link: '/blog',
        children: [
          {
            name: 'BrewDog Blog',
            link: '/blog',
          },
          {
            name: 'BrewDog Network',
            link: 'https://www.brewdognetwork.com/browse',
          },
        ],
      },
      {
        name: 'Culture',
        hasSubmenu: true,
        link: '/uk/community/culture',
        children: [
          {
            name: 'BrewDog Tomorrow',
            link: '/uk/tomorrow',
          },
          {
            name: 'Dogmas',
            link: '/uk/community/culture/dogmas',
          },
          {
            name: 'Mission & Charter',
            link: '/uk/community/culture/mission-and-charter',
          },
          {
            name: 'BrewDog Believe',
            link: '/uk/community/brewdog-believe',
          },
          {
            name: 'BrewDog Blueprint',
            link: '/uk/community/culture/the-blueprint',
          },
          {
            name: 'Our History',
            link: '/uk/community/culture/our-history',
          },
          {
            name: 'Kickstart Collective',
            link: '/uk/kickstartcollective',
          },
          {
            name: 'Work for us',
            link: 'https://www.jobs.brewdog.com/',
          },
        ],
      },
      {
        name: 'Events',
        link: '/uk/community/events',
        hasSubmenu: true,
        children: [
          {
            name: 'AGM',
            link: '/uk/agm',
          },
          {
            name: 'Collabfest',
            link: '/uk/community/events/collabfest',
          },
        ],
      },
      {
        name: 'Beer FAQ',
        hasSubmenu: false,
        link: '/uk/beer-faq',
      },
      {
        name: 'DIY Dog',
        hasSubmenu: false,
        link: '/uk/community/diy-dog',
      },
      {
        name: '#Mashtag',
        hasSubmenu: false,
        link: '/uk/mashtag',
      },
    ]
  },
};

export default data;
