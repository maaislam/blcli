import settings from "../settings";
import { events } from "../../../../../../lib/utils";

export default () => {
  const { ID } = settings;

  const productCategory = window.digitalData.page.category;

  // change the usps based on the category
  const weddingOffer = [
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/4331443-606',
      title: '18ct White Gold 0.15ct Diamond Shaped Ring',
      price: '£524.25',
      link: 'https://www.ernestjones.co.uk/webstore/d/4331443/18ct+white+gold+0.15ct+diamond+shaped+ring/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/8604894-606',
      title: 'Palladium 950 4mm matt & polished ring',
      price: '£699',
      link: 'https://www.ernestjones.co.uk/webstore/d/8604894/palladium+950+4mm+matt+%26+polished+ring/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/5884136-606',
      title: '18ct White Gold 0.15ct Wedding Band',
      price: '£374.25',
      link: 'https://www.ernestjones.co.uk/webstore/d/5884136/18ct+white+gold+0.15ct+wedding+band/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/3791424-606',
      title: 'Vera Wang 18ct White Gold 0.23ct Diamond Wedding Ring',
      price: '£749.25',
      link: 'https://www.ernestjones.co.uk/webstore/d/3791424/vera+wang+18ct+white+gold+0.23ct+diamond+wedding+ring/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/3399400-606',
      title: '18ct white gold 3mm extra heavyweight court ring',
      price: '£375',
      link: 'https://www.ernestjones.co.uk/webstore/d/3399400/18ct+white+gold+3mm+extra+heavyweight+court+ring/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/6263755-606',
      title: '18ct white gold 3mm extra heavyweight D Shape ring',
      price: '£325',
      link: 'https://www.ernestjones.co.uk/webstore/d/6263755/18ct+white+gold+3mm+extra+heavyweight+d+shape+ring/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/3865002-1490.webp',
      title: 'Tolkowsky 18ct White Gold 1/4ct Diamond Ring',
      price: '£974.25',
      link: 'https://www.ernestjones.co.uk/webstore/d/3865002/tolkowsky+18ct+white+gold+1%2f4ct+diamond+ring/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/3121496-606',
      title: 'Platinum 5mm extra heavyweight court ring',
      price: '£1250',
      link: 'https://www.ernestjones.co.uk/webstore/d/3121496/platinum+5mm+extra+heavyweight+court+ring/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/6171222-606',
      title: '18ct White & Rose Gold Men\'s Wedding Band',
      price: '£850',
      link: 'https://www.ernestjones.co.uk/webstore/d/6171222/18ct+white+%26+rose+gold+men%27s+wedding+band/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/8604886-606',
      title: 'Palladium 950 5mm matt & polished ring',
      price: '£825',
      link: 'https://www.ernestjones.co.uk/webstore/d/8604886/palladium+950+5mm+matt+%26+polished+ring/',
    },
  ];

  const chamilaProduct = [
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/2236826-606',
      title: 'Chamilia Disney Lady and The Tramp Sterling Silver Charm',
      price: '£35',
      link: 'https://www.ernestjones.co.uk/webstore/d/2236826/chamilia+disney+lady+and+the+tramp+sterling+silver+charm/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/5853753-606',
      title: 'Chamilia Sterling Silver Disney Lumiere Charm',
      price: '£45',
      link: ' https://www.ernestjones.co.uk/webstore/d/5853753/chamilia+sterling+silver+disney+lumiere+charm/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/8128553-606',
      title: 'Chamilia Disney Sterling Silver Mickey Mouse Figure',
      price: '£45',
      link: 'https://www.ernestjones.co.uk/webstore/d/8128553/chamilia+disney+sterling+silver+mickey+mouse+figure/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/8128553-606',
      title: 'Chamilia Disney Sterling Silver Mickey Mouse Figure',
      price: '£45',
      link: 'https://www.ernestjones.co.uk/webstore/d/8128553/chamilia+disney+sterling+silver+mickey+mouse+figure/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/5853826-606',
      title: 'Chamilia Sterling Silver Disney Chip Charm',
      price: '£30',
      link: 'https://www.ernestjones.co.uk/webstore/d/5853826/chamilia+sterling+silver+disney+chip+charm/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/2233908-606',
      title: 'Chamilia Disney Beauty and the Beast Cogsworth Charm',
      price: '£35',
      link: 'https://www.ernestjones.co.uk/webstore/d/2233908/chamilia+disney+beauty+and+the+beast+cogsworth+charm/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/8128561-606',
      title: 'Chamilia Disney Sterling Silver Minnie Mouse Figure',
      price: '£45',
      link: 'https://www.ernestjones.co.uk/webstore/d/8128561/chamilia+disney+sterling+silver+minnie+mouse+figure/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/2233908-606',
      title: 'Chamilia Sterling Silver Crystal Skull Bead',
      price: '£30',
      link: 'https://www.ernestjones.co.uk/webstore/d/1948024/chamilia+sterling+silver+crystal+skull+bead/',
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/9659153-606',
      title: 'Chamilia Sterling Silver Hearts & Vines Gift Set',
      price: '£80',
      link: 'https://www.ernestjones.co.uk/webstore/d/9659153/chamilia+sterling+silver+hearts+%26+vines+gift+set/'
    },
    {
      image: 'https://d34qiagx43sg99.cloudfront.net/6128203-606',
      title: 'Chamilia Disney Winnie The Pooh Eeyore Bead',
      price: '£35',
      link: 'https://www.ernestjones.co.uk/webstore/d/6128203/chamilia+disney+winnie+the+pooh+eeyore+bead/',
    },
  ];


  let upsellProducts;

  const imageBanner = document.querySelector('.product-image__corner-flag');
  const brand = window.digitalData.product[0].productInfo.brand;

  const offerBanner = document.querySelector('.offer');

  // if the product is save 20% on wedding rings
  if ((imageBanner && imageBanner.textContent.trim() === 'Buy 2 Save20%') && productCategory.subCategory1 === 'Rings') {
    upsellProducts = weddingOffer;
  }

  // if the offer is 2 for 20% but no banner
  else if (offerBanner && offerBanner.textContent.indexOf('Buy two selected full price wedding rings and save 20%') > -1 && productCategory.subCategory1 === 'Rings') {
    upsellProducts = weddingOffer;
  }

  // if the offer is on chamila jewellery
  else if (brand === 'Chamilia') {
    upsellProducts = chamilaProduct;
  }

  Object.keys(upsellProducts).forEach((i) => {
    const data = upsellProducts[i];
    const lightboxUSP = document.createElement('div');
    lightboxUSP.classList.add(`${ID}-upsProduct`);
    lightboxUSP.innerHTML = `
    <a href="${data.link}">
      <span style="background-image: url('${data.image}')"></span>
      <p>${data.title}</p>
      <p class="${ID}-upsellPrice">${data.price}</p>
    </a>`;
    document.querySelector(`.${ID}_Lightbox__bottomContent .${ID}-bottom_inner`).appendChild(lightboxUSP);
    
    lightboxUSP.addEventListener('click', () => {
      events.send('EJ027', 'click upsell product', { sendOnce: true });
    });
  });

  
};
