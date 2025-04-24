/* eslint-disable import/prefer-default-export */
/** ******************************
 ***** Props Data Start *****
 ****************************** */

const representative = {
  imageUrl:
    'https://cdn.shopify.com/s/files/1/0327/1498/1421/files/Rep_image.png?v=1628845504',
  imageAlt: 'Rep',
  title: 'Rep',
  subTitle: 'Take That First Step',
  content:
    'Our most well known sales position. Perfect for someone wanting to run a quick side hustle selling to friends & family or to grow to a full time beuty seller!',
  text: 'Flexible Working',
  text1: '24/7 Support',
  text2: 'Unlimited Earnings',
};

const salesLeader = {
  imageUrl:
    'https://cdn.shopify.com/s/files/1/0327/1498/1421/files/Sales_Leader.png?v=1628845504',
  imageAlt: 'Sales Leader',
  title: 'Sales Leader',
  subTitle: 'Support, be supported',
  content:
    'Vivamus nec vestibulum nisi. Maecenas elementum efficitur ligula eget congue. Interdum et malesuada fames ac ante ipsum primis in faucibus. ',
  text: 'Interdum Meet',
  text1: 'Malesuada Fames',
  text2: 'Aliquam Laoreet',
};

export const data = [
  {
    imageUrl: representative.imageUrl,
    imageAlt: representative.imageAlt,
    title: representative.title,
    subTitle: representative.subTitle,
    content: representative.content,
    centerText: [
      representative.text,
      representative.text1,
      representative.text2,
    ],
  },
  {
    imageUrl: salesLeader.imageUrl,
    imageAlt: salesLeader.imageAlt,
    title: salesLeader.title,
    subTitle: salesLeader.subTitle,
    content: salesLeader.content,
    centerText: [salesLeader.text, salesLeader.text1, salesLeader.text2],
  },
];

/** ******************************
 ***** Props Data End *****
 ****************************** */
