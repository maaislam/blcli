import shared from './shared';

// @var for anything hosted on site
const iconPrefix = 'https://thumbor-gc.tomandco.uk/unsafe/trim/fit-in/100x100/center/middle/smart/filters:upscale():fill():sharpen(0.5,0.5,true)/';

export default {
  classPrefix: shared.ID + '-menu',

  /**
   * Standalone hrefs, reference by key
   */
  standalone: {
    'sign-in': {
      title: 'Sign in',
      icon: 'https://cdn-sitegainer.com/rja9le1qekdjoiq.png',
      href: 'https://www.biscuiteers.com/account/login',
    },
    'contact': {
      title: 'Contact',
      icon: 'https://cdn-sitegainer.com/r81p6szngslbpdx.png',
      href: 'https://www.biscuiteers.com/contact-us',
    },
  },

  /**
   * Featured href e.g. for seasonal
   */
  featured: {
    title: 'Christmas',
    legend: 'Shop now &gt;',
    legendColor: '#92ce8f',
    background: 'https://cdn-sitegainer.com/ze1l7uttq6cjfyj.jpg',
    href: 'https://www.biscuiteers.com/christmas-gifts-by-biscuiteers',
  },

  /**
   * Hierarchical menu
   */
  hierarchical: {
    'all-biscuits': {
      title: 'All biscuits',
      legend: 'view all occasions (18)',
      icon: 'https://cdn-sitegainer.com/ivh1ajqzh948hrj.png',
      type: 'bubble',
      sublevel: {
        classPrefix: shared.ID + '-menu',
        title: 'All biscuits',
        target: 'all-biscuits',
        items: [
          {
            type: 'heading',
            title: 'Shop by Occassion',
          },
          {
            title: 'all occasions',
            href: 'https://www.biscuiteers.com/biscuits',
            icon: 'https://cdn-sitegainer.com/uhz17ypj1jwvcbq.jpg',
            type: 'bubble',
            group: 'A',
          },
          {
            title: 'Birthday',
            href: 'https://www.biscuiteers.com/send-a-gift/birthday-gifts',
            type: 'bubble',
            icon: 'https://cdn-sitegainer.com/n44op9swhcqws9w.png',
            group: 'B',
          },
          {
            title: 'Thank you',
            href: 'https://www.biscuiteers.com/send-a-gift/thank-you-gifts',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/t/h/thank_you_5.jpg`,
            type: 'bubble',
            group: 'C',
          },
          {
            title: 'Get well soon',
            href: 'https://www.biscuiteers.com/send-a-gift/get-well-soon-gifts',
            type: 'bubble',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/p/r/product-cutout-mr-bump-biscuit-card.jpg`,
            group: 'D',
          },
          {
            title: 'Sympathy',
            href: 'https://www.biscuiteers.com/send-a-gift/sympathy-gifts',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/p/r/product-cutout-little-miss-hugs-biscuit-card_3.jpg`,
            type: 'bubble',
            group: 'D',
          },
          {
            title: 'Just because',
            type: 'bubble',
            href: 'https://www.biscuiteers.com/send-a-gift/thinking-of-you-gifts',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/p/r/product-cutout-biscuit-card-flower-card_1.jpg`,
            group: 'D',
          },
          {
            title: 'Christmas',
            type: 'bubble',
            href: 'https://www.biscuiteers.com/christmas-gifts-by-biscuiteers ',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/2/0/2019_-_santa_christmas_jolly_ginger_-_high_res.jpg`,
            group: 'E',
          },
          {
            title: 'Halloween',
            href: 'https://www.biscuiteers.com/halloween-gifts',
            type: 'bubble',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/2/0/2019_-_halloween_frankenstein_jolly_ginger_-_high_res.jpg`,
            group: 'E',
          },
            
          {
            title: 'Congratulations',
            type: 'bubble',
            href: 'https://www.biscuiteers.com/send-a-gift/congratulations-gifts',
            icon: `https://cdn-sitegainer.com/yj59t3seyr04v72.png`,
            group: 'F',
          },
          {
            title: 'Engagement',
            href: 'https://www.biscuiteers.com/send-a-gift/engagement-gifts',
            type: 'bubble',
            icon: `https://cdn-sitegainer.com/qela84xplrxozjl.png`,
            group: 'F',
          },
          {
            title: 'New baby',
            href: 'https://www.biscuiteers.com/send-a-gift/new-baby-gifts',
            type: 'bubble',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/p/r/product-cutout-biscuit-card-stork-baby-on-board.jpg`,
            group: 'F',
          },
          {
            title: 'New home',
            href: 'https://www.biscuiteers.com/send-a-gift/new-home-gifts',
            icon: `https://cdn-sitegainer.com/x1dt3snr8lkyo6f.png`,
            type: 'bubble',
            group: 'F',
          },

          {
            title: 'Wedding',
            href: 'https://www.biscuiteers.com/send-a-gift/wedding-gifts',
            type: 'bubble',
            icon: `https://cdn-sitegainer.com/g3dm8i3bgoitcsz.jpg`,
            group: 'G',
          },
          {
            title: 'Anniversary',
            href: 'https://www.biscuiteers.com/send-a-gift/anniversary-gifts',
            type: 'bubble',
            icon: 'https://cdn-sitegainer.com/1e52l7881qtd60z.jpg',
            group: 'G',
          },
            
          {
            title: 'Best of British',
            type: 'bubble',
            href: 'https://www.biscuiteers.com/send-a-gift/best-of-british-gifts',
            icon: 'https://cdn-sitegainer.com/cf9pvxog5gv829z.jpg',
            group: 'H',
          },
          {
            title: 'Paddington',
            href: 'https://www.biscuiteers.com/biscuits/paddington-bear-biscuits ',
            type: 'bubble',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/p/a/paddington_bear_letterbox_biscuits.jpg`,
            group: 'H',
          },
          {
            title: 'Beatrix Potter',
            type: 'bubble',
            href: 'https://www.biscuiteers.com/biscuits/beatrix-potter-biscuits ',
            icon: `https://cdn-sitegainer.com/k3sg421884b2fgl.jpg`,
            group: 'H',
          },
          {
            title: 'Mr. Men',
            href: 'https://www.biscuiteers.com/send-a-gift/mr-men-gifts ',
            type: 'bubble',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/p/r/product-cutout-little-miss-sunshine-biscuit-card.jpg`,
            group: 'H',
          },
          {
            title: 'Great Ormond Street collection',
            type: 'bubble',
            href: 'https://www.biscuiteers.com/send-a-gift/gosh-collection ',
            icon: 'https://cdn-sitegainer.com/aqw9qin7lrw866c.jpg',
            group: 'H',
          },

          {
            type: 'heading',
            title: 'Shop by size',
          },
            
          {
            title: 'Biscuit tins',
            type: 'bubble',
            href: 'https://www.biscuiteers.com/biscuits/mini-biscuit-tins',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/f/r/fruit_basket_tin.jpg`,
            group: 'I',
          },
          {
            title: 'Letterbox biscuits',
            href: 'https://www.biscuiteers.com/biscuits/letterbox-biscuits ',
            type: 'bubble',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/g/i/gin_and_tonic_letterbox_biscuits_.jpg`,
            group: 'I',
          },
          {
            title: 'Jolly gingers',
            href: 'https://www.biscuiteers.com/biscuits/jolly-gingers',
            type: 'bubble',
            icon: 'https://cdn-sitegainer.com/vt7ke7pzb86tbg8.jpg',
            group: 'I',
          },
          {
            title: 'Large gift boxes',
            href: 'https://www.biscuiteers.com/biscuits/biscuits-and-fizz',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/2/0/2017_-_ayr_happy_birthday_-_hamper_-_gusbourne_-_low_res.jpg`,
            type: 'bubble',
            group: 'I',
          },
        ],
      },
    },
    'top-25': {
      type: 'bubble',
      title: 'Top 25',
      icon: `https://cdn-sitegainer.com/03kmkhyw6qsq36q.png`,
      href: 'https://www.biscuiteers.com/send-a-gift/our-top-picks',
    },
    'personalised': {
      type: 'bubble',
      title: 'Personalised',
      icon: `https://cdn-sitegainer.com/hin7oqab72g4rt4.png`,
      href: 'https://www.biscuiteers.com/biscuits/personalised-biscuits',
    },
    'letterbox-friendly': {
      type: 'bubble',
      title: 'Letterbox friendly',
      icon: `https://cdn-sitegainer.com/p7m1u14utmqbw8y.png`,
      href: 'https://www.biscuiteers.com/biscuits/letterbox-biscuits',
    },
    'gifts-and-books': {
      type: 'list',
      icon: 'https://cdn-sitegainer.com/1x4h8zun7emezgy.png',
      title: 'Gifts and books',
      sublevel: {
        classPrefix: shared.ID + '-menu',
        title: 'Gifts and books',
        target: 'gifts-and-books',
        items: [
          {
            title: 'Gift certificates',
            href: 'https://www.biscuiteers.com/icing-classes-and-equipment/icing-class-gift-certificates',
            type: 'bubble',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/2/0/2018_-_school_of_icing_voucher_front_-_low_res.jpg`,
            group: 'P',
          },
          {
            title: 'Biscuiteers merchandise',
            href: 'https://www.biscuiteers.com/send-a-gift/gifts-for-home-bakers',
            type: 'bubble',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/c/u/cutout_-_2019_-_apron_with_pocket_-_high_res.jpg`,
            group: 'P',
          },
          {
            title: 'Biscuiteers books',
            href: 'https://www.biscuiteers.com/icing-classes-and-equipment/biscuiteers-book-of-iced-biscuits',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/n/e/new_book_cover_1.jpg`,
            type: 'bubble',
            group: 'P',
          },
          {
            title: 'Master icing kit',
            href: 'https://www.biscuiteers.com/send-a-gift/master-icing-kit',
            type: 'bubble',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/e/e/eeee.jpg`,
            group: 'P',
          },
          {
            title: 'Biscuiteers tea',
            href: 'https://www.biscuiteers.com/send-a-gift/biscuiteers-tea',
            type: 'bubble',
            icon: `${iconPrefix}https://www.biscuiteers.com/static/media/catalog/product/b/i/biscuiteers_great_british_tea.jpg`,
            group: 'P',
          },
        ],
      }
    },
    'corporate-christmas-gifting': {
      type: 'list',
      icon: 'https://cdn-sitegainer.com/fdsfkx6ndg0o0cv.png',
      title: 'Corporate Christmas gifting',
      href: 'https://www.biscuiteers.com/corporate-gifts',
    },
    'icing-cafes-and-experiences': {
      type: 'list',
      icon: 'https://cdn-sitegainer.com/9amx6jcw9ekkb88.png',
      title: 'Icing cafes and experiences',
      href: 'https://www.biscuiteers.com/boutique-icing-cafe',
    },
  },
};
