/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import Reviews from './newReviews';
import settings from './settings';



const activate = () => {
  setup();

  const { VARIATION } = settings;

  if (VARIATION === '1') {
    const reviewBanner = new Reviews({
    review: [
      {
        quote: 'They sell original licensed merchandise, would recommend to any geeky fandoms out there',
        author: 'Greg Adams',
      },
      {
        quote: 'I love Merchoid! They have very lovely rare merch!',
        author: 'Dan Jones',
      },
      {
        quote: 'Quality geeky merch that honestly makes your friends ask "where did you get that?"',
        author: 'Sam Johnson',
      },
      {
        quote: 'The size & quality of the product I bought is top rate. I get great feedback about how nice the product is',
        author: 'Sara Boulton',
      },
      {
        quote: 'I have become the trend setter at work, made of good quality material and I stand out from the crowd',
        author: 'Pete Cook',
      },
    ],
    });
  }

  if (VARIATION === '2') {
    const reviewBanner = new Reviews({
      review: [
        {
          quote: 'Geektastic Merchandise! Quick delivery and excellent SciFi Stockists!',
          author: 'Greg Adams',
        },
        {
          quote: 'My order was delivered extremely quickly and was perfect, my partner is in love with it!',
          author: 'Dan Jones',
        },
        {
          quote: 'Super quick delivery and awesome product range',
          author: 'Sam Johnson',
        },
        {
          quote: 'I\'d recommend to anyone and will continue to shop here as long as they keep selling amazing stuff!',
          author: 'Sara Boulton',
        },
        {
          quote: 'Great company, great products and great service. Will definitely be back.',
          author: 'Pete Cook',
        },
      ],
    });
  }
};

export default activate;
