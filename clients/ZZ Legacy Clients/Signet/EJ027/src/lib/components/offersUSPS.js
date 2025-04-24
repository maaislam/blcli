import settings from "../settings";

export default () => {
  const { ID } = settings;

  const productCategory = window.digitalData.page.category.primaryCategory;
  const productName = document.querySelector('.buying-info__name');

  // change the usps based on the category
  const watchUsps = [
    { image: 'https://service.maxymiser.net/cm/images-us/1/1/2/DF3562755448E55BEB9734B34BA3471F7289441E2A55322242FD82553763115F/ernestjones-co-uk/EJ027---Add-to-Cart-Intercept/noun_TrackingDelivery_164082.png', title: 'Tracked delivery on all orders' },
    { image: 'https://service.maxymiser.net/cm/images-us/1/1/2/4D81ED56EBD540C644F8CF771D577B23C4AC0C770A57C01C63DA0C3FF9DC27DA/ernestjones-co-uk/EJ027---Add-to-Cart-Intercept/moneyOff.png', title: 'Up to 4 years interest free credit available' },
    { image: 'https://service.maxymiser.net/cm/images-us/1/1/2/76677724FA7BB9CF39F2ED2C3F3940B71562F5A716659C1F6D6A53712871656A/ernestjones-co-uk/EJ027---Add-to-Cart-Intercept/noun_quality_2496546.png', title: 'Over 70 years of expertise' },
  ];

  const engagementUsps = [
    { image: 'https://service.maxymiser.net/cm/images-us/1/1/2/DF3562755448E55BEB9734B34BA3471F7289441E2A55322242FD82553763115F/ernestjones-co-uk/EJ027---Add-to-Cart-Intercept/noun_TrackingDelivery_164082.png', title: 'Tracked delivery on all orders' },
    { image: 'https://service.maxymiser.net/cm/images-us/1/1/2/E371ABAC8B2A6E2344BCC118C4202392BFBC5E67A7CD9A4392E82F5BE8969E61/ernestjones-co-uk/EJ027---Add-to-Cart-Intercept/noun_Diamond_2196918.png', title: 'Responsibly-sourced diamonds, crafted by our diamond specialists and iconic designers' },
    { image: 'https://service.maxymiser.net/cm/images-us/1/1/2/4D81ED56EBD540C644F8CF771D577B23C4AC0C770A57C01C63DA0C3FF9DC27DA/ernestjones-co-uk/EJ027---Add-to-Cart-Intercept/moneyOff.png', title: 'Up to 4 years interest free credit available' },
  ];

  const otherJewelleryUsps = [
    { image: 'https://service.maxymiser.net/cm/images-us/1/1/2/DF3562755448E55BEB9734B34BA3471F7289441E2A55322242FD82553763115F/ernestjones-co-uk/EJ027---Add-to-Cart-Intercept/noun_TrackingDelivery_164082.png', title: 'Free Click & Collect from over 150 UK stores' },
    { image: 'https://service.maxymiser.net/cm/images-us/1/1/2/48927650FB8776B2EC447536D87C5261344321D60F165DC1EE72DBF7C4349D23/ernestjones-co-uk/EJ027---Add-to-Cart-Intercept/delivery.png', title: 'Free and easy returns' },
  ];

  let usps;

  if (productCategory === 'Watches') {
    usps = watchUsps;
  } else if (productName.textContent.indexOf('engagement') > -1) {
    usps = engagementUsps;
  } else if (productCategory === 'Jewellery') {
    usps = otherJewelleryUsps;
  }


  Object.keys(usps).forEach((i) => {
    const data = usps[i];
    const lightboxUSP = document.createElement('div');
    lightboxUSP.classList.add(`${ID}-usp`);
    lightboxUSP.innerHTML = `<span style="background-image: url('${data.image}')"></span><p>${data.title}</p>`;
    document.querySelector(`.${ID}_Lightbox__bottomContent .${ID}-bottom_inner`).appendChild(lightboxUSP);
  });
};
