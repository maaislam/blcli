const extraImages = [
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_1-768x1347.jpeg?3c6eb',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_5-768x768.jpeg?ca7fd',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_4-768x768.jpeg?887e6',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_3-768x768.jpeg?55811',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_2-768x1356.jpeg?a272e',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_26-768x1140.jpeg?65053',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_24-768x902.jpeg?933af',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_21-768x768.jpeg?b1a95',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_20-768x768.jpeg?c75b5',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_19-768x768.jpeg?2ae5d',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_18-768x768.jpeg?8a83d',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_17-768x768.jpeg?b77af',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_16-768x768.jpeg?3d708',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_15-768x768.jpeg?a6161',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_14-768x768.jpeg?56fa',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_13-768x768.jpeg?15c37',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_12-768x768.jpeg?22f5e',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_10-768x768.jpeg?6d4e3',
  'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_8-768x768.jpeg?7f7bc',
];


const featuresContent = [
  {
    image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_7-247x300.jpeg?a0bc5',
    title: 'Pop-lock buttons to lock yourself up in the coat',
    description: 'Keep your belongings safe as you brave the cold weather',
    lightboxImage: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_7-768x768.jpeg?d1f3f',
    lightboxTitle: 'Double lined and pop-lock pockets',
    lightboxDescription: 'An abundance of pockets to stow away those YT-1300 keys',
  },
  {
    image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_9-247x300.jpeg?3b3f5',
    title: 'Double insulated body lining',
    description: 'Stay warm, even if you\'re planning on a trip to Hoth',
    lightboxImage: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_9-768x768.jpeg?4ec23',
    lightboxTitle: 'Double insulated body lining',
    lightboxDescription: 'The toasty, insulated lining means there\'s no need to slice up Tauntauns anymore, hurray!',
  },
  {
    image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_6-247x300.jpeg?6f4ec',
    title: 'Full waist-to-neck zip',
    description: 'Full body coverage ensures you\'ll never need to spend a night inside a tauntaun',
    lightboxImage: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_6-768x768.jpeg?9155c',
    lightboxTitle: 'Full waist-to-neck zip',
    lightboxDescription: 'The perfect look for scoundrels, smugglers and heroes of the Rebel Alliance',
  },
  {
    image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_27-247x300.jpeg?a3535',
    title: 'Premium faux-fur lining',
    description: 'Not so scruffy looking after all, your Highness!',
    lightboxImage: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2019/01/HanSolo_Hoth_Coat_27-768x768.jpeg?5c9f6',
    lightboxTitle: 'Premium faux-fur lining',
    lightboxDescription: 'Hood trim is made using <del>real Wampa fur</del> an Earth-based, man-made alternative',
  },
];

export { extraImages, featuresContent };
