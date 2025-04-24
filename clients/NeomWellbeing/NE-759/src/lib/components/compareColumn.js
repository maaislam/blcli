import { checkedIcon, crossIcon } from '../assets/svgs';

const compareColumn = (id, data) => {
  const {
    ChangeableIntensitySettings,
    automaticShutoff,
    available,
    compare_at_price,
    coverage,
    guidedBreathingMode,
    handheldRemote,
    howItWorks,
    image,
    lightSettings,
    oilSize,
    portable,
    price,
    runtime,
    size,
    title,
    url,
  } = data;

  const formatPrice = (amount, code = 'en-GB', currency = 'GBP') => {
    return new Intl.NumberFormat(code, {
      style: 'currency',
      currency,
    }).format(amount / 100);
  };

  const setIcon = (data) => (data === 'Yes' ? checkedIcon : crossIcon);

  const nonStarterPackUrls = [
    '/products/wellbeing-pod-mini-essential-oil-diffuser-nude',
    '/products/wellbeing-pod',
    '/products/wellbeing-pod-luxe',
  ];

  const isNonStarterPack = nonStarterPackUrls.some((url) => window.location.pathname === url);

  const htmlStr = `
    <div class="comparison-column swiper-slide">
        <div class="comparison-column__image ${id}-image">
            <img src="${image}"
                alt="${title}">
        </div>
        <div class="comparison-column__title ${id}-title">${title}</div>
        <div class="comparison-column__cta ${id}-cta">
            <a href="${url}">SHOP NOW</a>
        </div>
        <div class="comparison-column__price ${id}-price">From ${formatPrice(price)}</div>
        <div class="comparison-column__coverage ${id}-coverage">${coverage}</div>
        <div class="comparison-column__size ${id}-size">${size}</div>
        ${isNonStarterPack ? '' : `<div class="comparison-column__oilsize ${id}-oil-size">${oilSize}</div>`}
        <div class="comparison-column__runtime ${id}-runtime">${runtime}</div>
        <div class="comparison-column__intensityval ${id}-intensityval ${id}-number-of-intensity-settings">${ChangeableIntensitySettings}</div>
        <div class="comparison-column__lightsetting ${id}-lightsetting ${id}-light-settings">${setIcon(lightSettings)}</div>
        <div class="comparison-column__gbreathingmode ${id}-gbreathingmode ${id}-guided-breathing-mode">${setIcon(
    guidedBreathingMode
  )}</div>
        <div class="comparison-column__hasremote ${id}-hasremote ${id}-handheld-remote">${setIcon(handheldRemote)}</div>
        <div class="comparison-column__autoshuts ${id}-autoshuts ${id}-automatic-shutoff">${setIcon(automaticShutoff)}</div>
        <div class="comparison-column__portable ${id}-portable">${setIcon(portable)}${
    portable === 'Yes' ? '  <span>Battery operated</span>' : '  <span>Mains operated</span>  '
  } </div>
        <div class="comparison-column__howto ${id}-howto ${id}-how-it-works">${howItWorks}</div>
    </div>`;
  return htmlStr;
};

export default compareColumn;
