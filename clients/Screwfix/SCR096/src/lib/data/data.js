/* eslint-disable no-useless-escape */
const productsData = [
  // {
  //   brand: 'DeWalt',
  //   productName: 'DeWalt Wall Dog Phillips Countersunk Self-Tapping Multipurpose Screws 6mm x 32mm 100 Pack',
  //   headType: 'Phillips Countersunk Self-Tapping Multipurpose',
  //   packSize: 100,
  //   length: '32mm',
  //   diameter: '6mm',
  //   price: 12.99,
  //   sku: '4017P',
  //   url: 'https://www.screwfix.com/p/dewalt-wall-dog-phillips-countersunk-self-tapping-multipurpose-screws-6mm-x-32mm-100-pack/4017p',
  // },
  // {
  //   brand: 'DeWalt',
  //   productName: 'DeWalt Wall Dog Phillips Pan Self-Tapping Multipurpose Screws 6mm x 32mm 100 Pack',
  //   headType: 'Pan Self-Tapping Multipurpose',
  //   packSize: 100,
  //   length: '32mm',
  //   diameter: '6mm',
  //   price: 12.99,
  //   sku: '4991P',
  //   url: 'https://www.screwfix.com/p/dewalt-wall-dog-phillips-pan-self-tapping-multipurpose-screws-6mm-x-32mm-100-pack/4991p',
  // },
  {
    brand: 'DeWalt',
    productName: 'DeWalt Wall Dog TX Countersunk Self-Tapping Multipurpose Screws 6mm x 50mm 100 Pack',
    headType: 'TX Countersunk Self-Tapping Multipurpose',
    packSize: 100,
    length: '50mm',
    diameter: '6mm',
    price: 24.99,
    sku: '549FY',
    url: 'https://www.screwfix.com/p/dewalt-wall-dog-tx-countersunk-self-tapping-multipurpose-screws-6mm-x-50mm-100-pack/549fy',
  },
  {
    brand: 'DeWalt',
    productName: 'DeWalt Wall Dog TX Countersunk Self-Tapping Multipurpose Screws 6mm x 70mm 100 Pack',
    headType: 'TX Countersunk Self-Tapping Multipurpose',
    packSize: 100,
    length: '70mm',
    diameter: '6mm',
    price: 24.99,
    sku: '164FY',
    url: 'https://www.screwfix.com/p/dewalt-wall-dog-tx-countersunk-self-tapping-multipurpose-screws-6mm-x-70mm-100-pack/164fy',
  },
  // {
  //   brand: 'Easydrive',
  //   productName: 'Easydrive Button Self-Drilling Low Profile Screws 4.8mm x 22mm 200 Pack',
  //   headType: 'Button Self-Drilling Low Profile',
  //   packSize: 200,
  //   length: '22mm',
  //   diameter: '4.8mm',
  //   price: 9.39,
  //   sku: '7483H',
  //   url: 'https://www.screwfix.com/p/easydrive-button-self-drilling-low-profile-screws-4-8mm-x-22mm-200-pack/7483h',
  // },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Double-Countersunk Self-Drilling Roofing Screws 4.8mm x 38mm 200 Pack',
    headType: 'Double-Countersunk Self-Drilling Roofing',
    packSize: 200,
    length: '38mm',
    diameter: '4.8mm',
    price: 11.99,
    sku: '2688H',
    url: 'https://www.screwfix.com/p/easydrive-double-countersunk-self-drilling-roofing-screws-4-8mm-x-38mm-200-pack/2688h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Double-Countersunk Self-Drilling Roofing Screws 5.5mm x 50mm 200 Pack',
    headType: 'Double-Countersunk Self-Drilling Roofing',
    packSize: 200,
    length: '50mm',
    diameter: '5.5mm',
    price: 20.99,
    sku: '1027H',
    url: 'https://www.screwfix.com/p/easydrive-double-countersunk-self-drilling-roofing-screws-5-5mm-x-50mm-200-pack/1027h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Double-Countersunk Self-Drilling Roofing Screws 5.5mm x 65mm 200 Pack',
    headType: 'Double-Countersunk Self-Drilling Roofing',
    packSize: 200,
    length: '65mm',
    diameter: '5.5mm',
    price: 22.49,
    sku: '2022H',
    url: 'https://www.screwfix.com/p/easydrive-double-countersunk-self-drilling-roofing-screws-5-5mm-x-65mm-200-pack/2022h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Double-Countersunk Self-Drilling Roofing Screws 5.5mm x 85mm 100 Pack',
    headType: 'Double-Countersunk Self-Drilling Roofing',
    packSize: 100,
    length: '85 mm',
    diameter: '5.5mm',
    price: 20.99,
    sku: '4225H',
    url: 'https://www.screwfix.com/p/easydrive-double-countersunk-self-drilling-roofing-screws-5-5mm-x-85mm-100-pack/4225h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws 5.5mm x 25mm 100 Pack',
    headType: 'Flange',
    packSize: 100,
    length: '25mm',
    diameter: '5.5mm',
    price: 9.99,
    sku: '54743',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-5-5mm-x-25mm-100-pack/54743',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws 4.8mm x 16mm 100 Pack',
    headType: 'Flange Self-Drilling',
    packSize: 100,
    length: '16mm',
    diameter: '4.8mm',
    price: 6.09,
    sku: '68505',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-4-8mm-x-16mm-100-pack/68505',
  },

  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws 5.5mm x 22mm 100 Pack',
    headType: 'Flange Self-Drilling',
    packSize: 100,
    length: '22mm',
    diameter: '5.5mm',
    price: 7.29,
    sku: '40117',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-5-5mm-x-22mm-100-pack/40117',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws 5.5mm x 25mm 100 Pack',
    headType: 'Flange Self-Drilling',
    packSize: 100,
    length: '25mm',
    diameter: '5.5mm',
    price: 7.99,
    sku: '41196',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-5-5mm-x-25mm-100-pack/41196',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws 5.5mm x 32mm 100 Pack',
    headType: 'Flange Self-Drilling',
    packSize: 100,
    length: '32mm',
    diameter: '5.5mm',
    price: 8.99,
    sku: '77302',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-5-5mm-x-32mm-100-pack/77302',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws 5.5mm x 38mm 100 Pack ',
    headType: 'Flange Self-Drilling',
    packSize: 100,
    length: '38mm',
    diameter: '5.5mm',
    price: 9.49,
    sku: '46123',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-5-5mm-x-38mm-100-pack/46123',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws 5.5mm x 45mm 100 Pack',
    headType: 'Flange Self-Drilling',
    packSize: 100,
    length: '45mm',
    diameter: '5.5mm',
    price: 9.99,
    sku: '39339',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-5-5mm-x-45mm-100-pack/39339',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws 5.5mm x 55mm 100 Pack',
    headType: 'Flange Self-Drilling',
    packSize: 100,
    length: '55mm',
    diameter: '5.5mm',
    price: 11.99,
    sku: '88656',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-5-5mm-x-55mm-100-pack/88656',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws 5.5mm x 75mm 100 Pack',
    headType: 'Flange Self-Drilling',
    packSize: 100,
    length: '75mm',
    diameter: '5.5mm',
    price: 14.99,
    sku: '37982',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-5-5mm-x-75mm-100-pack/37982',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws 5.5mm x 90mm 100 Pack',
    headType: 'Flange Self-Drilling',
    packSize: 100,
    length: '90mm',
    diameter: '5.5mm',
    price: 18.99,
    sku: '82585',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-5-5mm-x-90mm-100-pack/82585',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws 5.5mm x 120mm 100 Pack',
    headType: 'Flange Self-Drilling',
    packSize: 100,
    length: '120mm',
    diameter: '5.5mm',
    price: 23.99,
    sku: '95940',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-5-5mm-x-120mm-100-pack/95940',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws with Washers 5.5mm x 22mm 100 Pack',
    headType: 'Flange with washers',
    packSize: 100,
    length: '22mm',
    diameter: '5.5mm',
    price: 8.99,
    sku: '49758',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-with-washers-5-5mm-x-22mm-100-pack/49758',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws with Washers 5.5mm x 32mm 100 Pack',
    headType: 'Flange with washers',
    packSize: 100,
    length: '32mm',
    diameter: '5.5mm',
    price: 10.99,
    sku: '93904',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-with-washers-5-5mm-x-32mm-100-pack/93904',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws with Washers 5.5mm x 38mm 100 Pack',
    headType: 'Flange with washers',
    packSize: 100,
    length: '38mm',
    diameter: '5.5mm',
    price: 11.99,
    sku: '66798',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-with-washers-5-5mm-x-38mm-100-pack/66798',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws with Washers 5.5mm x 45mm 100 Pack',
    headType: 'Flange with washers',
    packSize: 100,
    length: '45mm',
    diameter: '5.5mm',
    price: 12.99,
    sku: '40278',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-with-washers-5-5mm-x-45mm-100-pack/40278',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws with Washers 5.5mm x 55mm 100 Pack',
    headType: 'Flange with washers',
    packSize: 100,
    length: '55mm',
    diameter: '5.5mm',
    price: 13.99,
    sku: '21911',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-with-washers-5-5mm-x-55mm-100-pack/21911',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Flange Self-Drilling Screws with Washers 5.5mm x 75mm 100 Pack',
    headType: 'Flange with washers',
    packSize: 100,
    length: '75mm',
    diameter: '5.5mm',
    price: 16.99,
    sku: '44476',
    url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-screws-with-washers-5-5mm-x-75mm-100-pack/44476',
  },
  // {
  //   brand: 'Easydrive',
  //   productName: 'Easydrive Flange Self-Drilling Stitching Screws with Washers 6.3mm x 25mm 100 Pack',
  //   headType: 'Flange Self-Drilling Stitching Screws with Washers',
  //   packSize: 100,
  //   length: '25mm',
  //   diameter: '6.3mm',
  //   price: 10.99,
  //   sku: '4259H',
  //   url: 'https://www.screwfix.com/p/easydrive-flange-self-drilling-stitching-screws-with-washers-6-3mm-x-25mm-100-pack/4259h',
  // },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Pan Self-Drilling Screws 4.2mm x 13mm 100 Pack',
    headType: 'Pan Self-Drilling',
    packSize: 100,
    length: '13mm',
    diameter: '4.2mm',
    price: 4.49,
    sku: '2061H',
    url: 'https://www.screwfix.com/p/easydrive-pan-self-drilling-screws-4-2mm-x-13mm-100-pack/2061h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Pan Self-Drilling Screws 4.2mm x 19mm 100 Pack ',
    headType: 'Pan Self-Drilling',
    packSize: 100,
    length: '19mm',
    diameter: '4.2mm',
    price: 5.49,
    sku: '1302H',
    url: 'https://www.screwfix.com/p/easydrive-pan-self-drilling-screws-4-2mm-x-19mm-100-pack/1302h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Pan Self-Drilling Screws 4.2mm x 25mm 100 Pack',
    headType: 'Pan Self-Drilling',
    packSize: 100,
    length: '25mm',
    diameter: '4.2mm',
    price: 8.49,
    sku: '2929H',
    url: 'https://www.screwfix.com/p/easydrive-pan-self-drilling-screws-4-2mm-x-25mm-100-pack/2929h',
  },
  // {
  //   brand: 'Easydrive',
  //   productName: 'Easydrive Pancake Self-Drilling Low Profile Head Screws 5.5mm x 19mm 200 Pack',
  //   headType: 'Pancake',
  //   packSize: 200,
  //   length: '19mm',
  //   diameter: '5.5mm',
  //   price: 11.29,
  //   sku: '1376H',
  //   url: 'https://www.screwfix.com/p/easydrive-pancake-self-drilling-low-profile-head-screws-5-5mm-x-19mm-200-pack/1376h',
  // },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Phillips Double-Countersunk Self-Drilling Wing Screws 5.5mm x 40mm 100 Pack',
    headType: 'Phillips Double-Countersunk Self-Drilling Wing',
    packSize: 100,
    length: '40mm',
    diameter: '5.5mm',
    price: 12.99,
    sku: '16748',
    url: 'https://www.screwfix.com/p/easydrive-phillips-double-countersunk-self-drilling-wing-screws-5-5mm-x-40mm-100-pack/16748',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Phillips Double-Countersunk Self-Drilling Wing Screws 5.5mm x 60mm 100 Pack',
    headType: 'Phillips Double-Countersunk Self-Drilling Wing',
    packSize: 100,
    length: '60mm',
    diameter: '5.5mm',
    price: 16.49,
    sku: '12808',
    url: 'https://www.screwfix.com/p/easydrive-phillips-double-countersunk-self-drilling-wing-screws-5-5mm-x-60mm-100-pack/12808',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive Phillips Double-Countersunk Self-Drilling Wing Screws 5.5mm x 80mm 100 Pack',
    headType: 'Phillips Double-Countersunk Self-Drilling Wing',
    packSize: 100,
    length: '80mm',
    diameter: '5.5mm',
    price: 21.69,
    sku: '16652',
    url: 'https://www.screwfix.com/p/easydrive-phillips-double-countersunk-self-drilling-wing-screws-5-5mm-x-80mm-100-pack/16652',
  },

  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Countersunk Self-Tapping Screws 10ga x 1 1/2" 100 Pack',
    headType: 'PZ Countersunk Self-Tapping',
    packSize: 100,
    length: '1 1/2"',
    diameter: '10ga',
    price: 12.99,
    sku: '7445P',
    url: 'https://www.screwfix.com/p/easydrive-pz-countersunk-self-tapping-screws-10ga-x-1-1-2-100-pack/7445p',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Countersunk Self-Tapping Screws 10ga x 1 1/4" 100 Pack',
    headType: 'PZ Countersunk Self-Tapping',
    packSize: 100,
    length: '1 1/4"',
    diameter: '10ga',
    price: 13.29,
    sku: '8042P',
    url: 'https://www.screwfix.com/p/easydrive-pz-countersunk-self-tapping-screws-10ga-x-1-1-4-100-pack/8042p',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Countersunk Self-Tapping Screws 10ga x 2" 100 Pack',
    headType: 'PZ Countersunk Self-Tapping',
    packSize: 100,
    length: '2"',
    diameter: '10ga',
    price: 13.59,
    sku: '4939P',
    url: 'https://www.screwfix.com/p/easydrive-pz-countersunk-self-tapping-screws-10ga-x-2-100-pack/4939p',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Countersunk Self-Tapping Screws 6ga x 1 1/2" 100 Pack',
    headType: 'PZ Countersunk Self-Tapping',
    packSize: 100,
    length: '1 1/2"',
    diameter: '6ga',
    price: 7.99,
    sku: '9497P',
    url: 'https://www.screwfix.com/p/easydrive-pz-countersunk-self-tapping-screws-6ga-x-1-1-2-100-pack/9497p',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Countersunk Self-Tapping Screws 6ga x 1" 100 Pack',
    headType: 'PZ Countersunk Self-Tapping',
    packSize: 100,
    length: '1"',
    diameter: '6ga',
    price: 8.29,
    sku: '2918H',
    url: 'https://www.screwfix.com/p/easydrive-pz-countersunk-self-tapping-screws-6ga-x-1-100-pack/2918h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Countersunk Self-Tapping Screws 6ga x 1/2" 100 Pack',
    headType: 'PZ Countersunk Self-Tapping',
    packSize: 100,
    length: '1/2"',
    diameter: '6ga',
    price: 6.89,
    sku: '1390P',
    url: 'https://www.screwfix.com/p/easydrive-pz-countersunk-self-tapping-screws-6ga-x-1-2-100-pack/1390p',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Countersunk Self-Tapping Screws 8ga x 1 1/2" 100 Pack',
    headType: 'PZ Countersunk Self-Tapping',
    packSize: 100,
    length: '1 1/2"',
    diameter: '8ga',
    price: 11.99,
    sku: '5577H',
    url: 'https://www.screwfix.com/p/easydrive-pz-countersunk-self-tapping-screws-8ga-x-1-1-2-100-pack/5577h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Countersunk Self-Tapping Screws 8ga x 1 1/2" 100 Pack',
    headType: 'PZ Countersunk Self-Tapping',
    packSize: 100,
    length: '1 1/2"',
    diameter: '8ga',
    price: 11.99,
    sku: '5577H',
    url: 'https://www.screwfix.com/p/easydrive-pz-countersunk-self-tapping-screws-8ga-x-1-1-2-100-pack/5577h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Countersunk Self-Tapping Screws 8ga x 1 1/4" 100 Pack',
    headType: 'PZ Countersunk Self-Tapping',
    packSize: 100,
    length: '1 1/4"',
    diameter: '8ga',
    price: 10.49,
    sku: '7496H',
    url: 'https://www.screwfix.com/p/easydrive-pz-countersunk-self-tapping-screws-8ga-x-1-1-4-100-pack/7496h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Countersunk Self-Tapping Screws 8ga x 1" 100 Pack',
    headType: 'PZ Countersunk Self-Tapping',
    packSize: 100,
    length: '1"',
    diameter: '8ga',
    price: 10.49,
    sku: '7710H',
    url: 'https://www.screwfix.com/p/easydrive-pz-countersunk-self-tapping-screws-8ga-x-1-100-pack/7710h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Pan Self-Tapping Screws 10ga x 1 1/2" 100 Pack',
    headType: 'PZ Pan Self-Tapping',
    packSize: 100,
    length: '1 1/2"',
    diameter: '10ga',
    price: 17.99,
    sku: '5649H',
    url: 'https://www.screwfix.com/p/easydrive-pz-pan-self-tapping-screws-10ga-x-1-1-2-100-pack/5649h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Pan Self-Tapping Screws 10ga x 1" 100 Pack',
    headType: 'PZ Pan Self-Tapping',
    packSize: 100,
    length: '1"',
    diameter: '10ga',
    price: 13.99,
    sku: '6885H',
    url: 'https://www.screwfix.com/p/easydrive-pz-pan-self-tapping-screws-10ga-x-1-100-pack/6885h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Pan Self-Tapping Screws 6ga x 1" 100 Pack',
    headType: 'PZ Pan Self-Tapping',
    packSize: 100,
    length: '1"',
    diameter: '6ga',
    price: 7.99,
    sku: '6210H',
    url: 'https://www.screwfix.com/p/easydrive-pz-pan-self-tapping-screws-6ga-x-1-100-pack/6210h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Pan Self-Tapping Screws 6ga x 1/2" 100 Pack',
    headType: 'PZ Pan Self-Tapping',
    packSize: 100,
    length: '1/2"',
    diameter: '6ga',
    price: 6.39,
    sku: '9456H',
    url: 'https://www.screwfix.com/p/easydrive-pz-pan-self-tapping-screws-6ga-x-1-2-100-pack/9456h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive  PZ Pan Self-Tapping Screws 8ga x 1 1/2" 100 Pack',
    headType: 'PZ Pan Self-Tapping',
    packSize: 100,
    length: '1 1/2"',
    diameter: '8ga',
    price: 13.79,
    sku: '3309h',
    url: 'https://www.screwfix.com/p/easydrive-pz-pan-self-tapping-screws-8ga-x-1-1-2-100-pack/3309h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive  PZ Pan Self-Tapping Screws 8ga x 1" 100 Pack',
    headType: 'PZ Pan Self-Tapping',
    packSize: 100,
    length: '1"',
    diameter: '8ga',
    price: 11.99,
    sku: '4329h',
    url: 'https://www.screwfix.com/p/easydrive-pz-pan-self-tapping-screws-8ga-x-1-100-pack/4329h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Pan Self-Tapping Screws 8ga x 1/2" 100 Pack',
    headType: 'PZ Pan Self-Tapping',
    packSize: 100,
    length: '1/2"',
    diameter: '8ga',
    price: 8.99,
    sku: '7203h',
    url: 'https://www.screwfix.com/p/easydrive-pz-pan-self-tapping-screws-8ga-x-1-2-100-pack/7203h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Pan Self-Tapping Screws 8ga x 3/4" 100 Pack',
    headType: 'PZ Pan Self-Tapping',
    packSize: 100,
    length: '3/4"',
    diameter: '8ga',
    price: 9.99,
    sku: '1755h',
    url: 'https://www.screwfix.com/p/easydrive-pz-pan-self-tapping-screws-8ga-x-3-4-100-pack/1755h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Wafer Self-Tapping Screws 10ga x 3/4" 100 Pack',
    headType: 'PZ Wafer Self-Tapping',
    packSize: 100,
    length: '3/4"',
    diameter: '10ga',
    price: 5.19,
    sku: '9033H',
    url: 'https://www.screwfix.com/p/easydrive-pz-wafer-self-tapping-screws-10ga-x-3-4-100-pack/9033h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Wafer Self-Tapping Screws 8ga x 1/2" 100 Pack',
    headType: 'PZ Wafer Self-Tapping',
    packSize: 100,
    length: '1/2"',
    diameter: '8ga',
    price: 2.99,
    sku: '8979H',
    url: 'https://www.screwfix.com/p/easydrive-pz-wafer-self-tapping-screws-8ga-x-1-2-100-pack/8979h',
  },
  {
    brand: 'Easydrive',
    productName: 'Easydrive PZ Wafer Self-Tapping Screws 8ga x 3/4" 100 Pack',
    headType: 'PZ Wafer Self-Tapping',
    packSize: 100,
    length: '3/4"',
    diameter: '8ga',
    price: 3.29,
    sku: '6553H',
    url: 'https://www.screwfix.com/p/easydrive-pz-wafer-self-tapping-screws-8ga-x-3-4-100-pack/6553h',
  },
  // {
  //   brand: 'Easydrive',
  //   productName: 'Easydrive Wafer Self-Drilling Low Profile Screws 4.8mm x 16mm 200 Pack',
  //   headType: 'Wafer Self-Drilling',
  //   packSize: 200,
  //   length: '16mm',
  //   diameter: '4.8mm',
  //   price: 8.29,
  //   sku: '5004H',
  //   url: 'https://www.screwfix.com/p/easydrive-wafer-self-drilling-low-profile-screws-4-8mm-x-16mm-200-pack/5004h',
  // },
  {
    brand: 'Rawlplug',
    productName: 'Rawlplug Hex Flange Self-Drilling Screws 7mm x 115mm 100 Pack',
    headType: 'Hex Flange Self-Drilling',
    packSize: 100,
    length: '115mm',
    diameter: '7mm',
    price: 60.45,
    sku: '936TK',
    url: 'https://www.screwfix.com/p/rawlplug-hex-flange-self-drilling-screws-7mm-x-115mm-100-pack/936tk',
  },
  {
    brand: 'Rawlplug',
    productName: 'Rawlplug Hex Flange Self-Drilling Screws 7mm x 135mm 100 Pack',
    headType: 'Hex Flange Self-Drilling',
    packSize: 100,
    length: '135mm',
    diameter: '7mm',
    price: 74.8,
    sku: '485TK',
    url: 'https://www.screwfix.com/p/rawlplug-hex-flange-self-drilling-screws-7mm-x-135mm-100-pack/485tk',
  },
  {
    brand: 'Rawlplug',
    productName: 'Rawlplug Hex Flange Self-Drilling Screws 7mm x 155mm 100 Pack',
    headType: 'Hex Flange Self-Drilling',
    packSize: 100,
    length: '155mm',
    diameter: '7mm',
    price: 89.0,
    sku: '150TK',
    url: 'https://www.screwfix.com/p/rawlplug-hex-flange-self-drilling-screws-7mm-x-155mm-100-pack/150tk',
  },
  {
    brand: 'Rawlplug',
    productName: 'Rawlplug Hex Flange Self-Drilling Screws 7mm x 185mm 100 Pack',
    headType: 'Hex Flange Self-Drilling',
    packSize: 100,
    length: '185mm',
    diameter: '7mm',
    price: 124.8,
    sku: '358TK',
    url: 'https://www.screwfix.com/p/rawlplug-hex-flange-self-drilling-screws-7mm-x-185mm-100-pack/358tk',
  },
  {
    brand: 'Rawlplug',
    productName: 'Rawlplug Hex Flange Self-Drilling Screws 7mm x 205mm 100 Pack',
    headType: 'Hex Flange Self-Drilling',
    packSize: 100,
    length: '205mm',
    diameter: '7mm',
    price: 157.25,
    sku: '841TK',
    url: 'https://www.screwfix.com/p/rawlplug-hex-flange-self-drilling-screws-7mm-x-205mm-100-pack/841tk',
  },
  {
    brand: 'Rawlplug',
    productName: 'Rawlplug Hex Flange Self-Drilling Screws 7mm x 255mm 100 Pack',
    headType: 'Hex Flange Self-Drilling',
    packSize: 100,
    length: '255mm',
    diameter: '7mm',
    price: 208.95,
    sku: '388TK',
    url: 'https://www.screwfix.com/p/rawlplug-hex-flange-self-drilling-screws-7mm-x-255mm-100-pack/388tk',
  },
  // {
  //   brand: 'Timco',
  //   productName: 'Timco Socket Self-Drilling Roofing Screws 5.5mm x 25mm 100 Pack',
  //   headType: 'Socket Self-Drilling Roofing',
  //   packSize: 100,
  //   length: '25mm',
  //   diameter: '5.5m',
  //   price: 7.99,
  //   sku: '36886',
  //   url: 'https://www.screwfix.com/p/timco-socket-self-drilling-roofing-screws-5-5mm-x-25mm-100-pack/36886',
  // },
  {
    brand: 'Trend',
    productName: 'Trend PH/7X25/500C Square Flange Self-Tapping Pocket Hole Screws Coarse Thread No. 7ga x 1" 500 Pack',
    headType: 'Square Flange Self-Tapping Pocket Hole-Screws Coarse',
    packSize: 500,
    length: '1"',
    diameter: '7ga',
    price: 25.99,
    sku: '251PX',
    url: 'https://www.screwfix.com/p/trend-ph-7x25-500c-square-flange-self-tapping-pocket-hole-screws-coarse-thread-no-7ga-x-1-500-pack/251px',
  },
  {
    brand: 'Trend',
    productName: 'Trend PH/7X30/500 Square Flange Self-Tapping Pocket Hole Screws No. 7ga x 1 3/16" 500 Pack',
    headType: 'Square Flange Self Tapping Pocket Hole',
    packSize: 500,
    length: '1 3/16"',
    diameter: '7ga',
    price: 18.49,
    sku: '52244',
    url: 'https://www.screwfix.com/p/trend-ph-7x30-500-square-flange-self-tapping-pocket-hole-screws-no-7ga-x-1-3-16-500-pack/52244',
  },
  {
    brand: 'Trend',
    productName: 'Trend PH/7X30/500C Square Flange Self-Tapping Pocket Hole Screws Coarse Thread No. 7ga x 1 1/4" 500 Pack',
    headType: 'Square Flange Self-Tapping Pocket Hole-Screws Coarse',
    packSize: 500,
    length: '1 1/4"',
    diameter: '7ga',
    price: 24.99,
    sku: '522PX',
    url: 'https://www.screwfix.com/p/trend-ph-7x30-500c-square-flange-self-tapping-pocket-hole-screws-coarse-thread-no-7ga-x-1-1-4-500-pack/522px',
  },
  {
    brand: 'Trend',
    productName: 'Trend PH/8X37/200C Square Flange Self-Tapping Pocket Hole Screws Coarse Thread No. 8ga x 1 1/2" 200 Pack',
    headType: 'Square Flange Self-Tapping Pocket Hole-Screws Coarse',
    packSize: 200,
    length: '1 1/2"',
    diameter: '8ga',
    price: 16.99,
    sku: '526PX',
    url: 'https://www.screwfix.com/p/trend-ph-8x37-200c-square-flange-self-tapping-pocket-hole-screws-coarse-thread-no-8ga-x-1-1-2-200-pack/526px',
  },
  {
    brand: 'Trend',
    productName: 'Trend PH/8X50/200C Square Flange Self-Tapping Pocket Hole Screws Coarse Thread No. 8ga x 2" 200 Pack',
    headType: 'Square Flange Self-Tapping Pocket Hole-Screws Coarse',
    packSize: 200,
    length: '2"',
    diameter: '8ga',
    price: 18.99,
    sku: '588PX',
    url: 'https://www.screwfix.com/p/trend-ph-8x50-200c-square-flange-self-tapping-pocket-hole-screws-coarse-thread-no-8ga-x-2-200-pack/588px',
  },
  {
    brand: 'Trend',
    productName: 'Trend PH/8X63/200C Square Flange Self-Tapping Pocket Hole Screws Coarse Thread No. 8ga x 2 1/2" 200 Pack',
    headType: 'Square Flange Self-Tapping Pocket Hole-Screws Coarse',
    packSize: 200,
    length: '2 1/2"',
    diameter: '8ga',
    price: 20.99,
    sku: '497PV',
    url: 'https://www.screwfix.com/p/trend-ph-8x63-200c-square-flange-self-tapping-pocket-hole-screws-coarse-thread-no-8ga-x-2-1-2-200-pack/497pv',
  },

  {
    brand: 'Turbo TX',
    productName: 'Turbo TX TX Double-Countersunk Self-Tapping Multi-Purpose Screws 3mm x 12mm 200 Pack',
    headType: 'TX TX Double-Countersunk Self-Tapping Multi-Purpose',
    packSize: 200,
    length: '12mm',
    diameter: '3mm',
    price: 3.99,
    sku: '594HM',
    url: 'https://www.screwfix.com/p/turbo-tx-tx-double-countersunk-self-tapping-multi-purpose-screws-3mm-x-12mm-200-pack/594hm',
  },
  {
    brand: 'Turbo TX',
    productName: 'Turbo TX TX Double-Countersunk Self-Tapping Multi-Purpose Screws 3mm x 40mm 200 Pack',
    headType: 'TX TX Double-Countersunk Self-Tapping Multi-Purpose',
    packSize: 200,
    length: '40mm',
    diameter: '3mm',
    price: 4.99,
    sku: '879HM',
    url: 'https://www.screwfix.com/p/turbo-tx-tx-double-countersunk-self-tapping-multi-purpose-screws-3mm-x-40mm-200-pack/879hm',
  },
  {
    brand: 'Turbo TX',
    productName: 'Turbo TX TX Double-Countersunk Self-Tapping Multi-Purpose Screws 4mm x 20mm 200 Pack',
    headType: 'TX TX Double-Countersunk Self-Tapping Multi-Purpose',
    packSize: 200,
    length: '20mm',
    diameter: '4mm',
    price: 5.12,
    sku: '134HM',
    url: 'https://www.screwfix.com/p/turbo-tx-tx-double-countersunk-self-tapping-multi-purpose-screws-4mm-x-20mm-200-pack/134hm',
  },
  {
    brand: 'Turbo TX',
    productName: 'Turbo TX TX Double-Countersunk Self-Tapping Multi-Purpose Screws 4mm x 60mm 200 Pack',
    headType: 'TX TX Double-Countersunk Self-Tapping Multi-Purpose',
    packSize: 200,
    length: '60mm',
    diameter: '4mm',
    price: 8.99,
    sku: '380HM',
    url: 'https://www.screwfix.com/p/turbo-tx-tx-double-countersunk-self-tapping-multi-purpose-screws-4mm-x-60mm-200-pack/380hm',
  },
  {
    brand: 'Turbo TX',
    productName: 'Turbo TX TX Double-Countersunk Self-Tapping Multi-Purpose Screws 5mm x 40mm 200 Pack',
    headType: 'TX TX Double-Countersunk Self-Tapping Multi-Purpose',
    packSize: 200,
    length: '40mm',
    diameter: '5mm',
    price: 9.99,
    sku: '651HM',
    url: 'https://www.screwfix.com/p/turbo-tx-tx-double-countersunk-self-tapping-multi-purpose-screws-5mm-x-40mm-200-pack/651hm',
  },
  {
    brand: 'Turbo TX',
    productName: 'Turbo TX TX Double-Countersunk Self-Tapping Multi-Purpose Screws 6mm x 140mm 50 Pack',
    headType: 'TX TX Double-Countersunk Self-Tapping Multi-Purpose',
    packSize: 50,
    length: '140mm',
    diameter: '6mm',
    price: 12.99,
    sku: '481HM',
    url: 'https://www.screwfix.com/p/turbo-tx-tx-double-countersunk-self-tapping-multi-purpose-screws-6mm-x-140mm-50-pack/481hm',
  },
  {
    brand: 'Turbo TX',
    productName: 'Turbo TX TX Double-Countersunk Self-Tapping Multi-Purpose Screws 6mm x 70mm 100 Pack',
    headType: 'TX TX Double-Countersunk Self-Tapping Multi-Purpose',
    packSize: 100,
    length: '70mm',
    diameter: '6mm',
    price: 14.43,
    sku: '890HM',
    url: 'https://www.screwfix.com/p/turbo-tx-tx-double-countersunk-self-tapping-multi-purpose-screws-6mm-x-70mm-100-pack/890hm',
  },
  {
    brand: 'Turbo TX',
    productName: 'Turbo TX TX Double-Countersunk Self-Tapping Multi-Purpose Screws 6mm x 90mm 100 Pack',
    headType: 'TX TX Double-Countersunk Self-Tapping Multi-Purpose',
    packSize: 100,
    length: '90mm',
    diameter: '6mm',
    price: 19.78,
    sku: '815HM',
    url: 'https://www.screwfix.com/p/turbo-tx-tx-double-countersunk-self-tapping-multi-purpose-screws-6mm-x-90mm-100-pack/815hm',
  },
];

export default productsData;
