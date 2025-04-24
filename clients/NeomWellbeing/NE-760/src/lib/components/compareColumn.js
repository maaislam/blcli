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
    portable,
    price,
    runtime,
    size,
    title,
    url,
    learnMoreUrl,
    colorSwatches,
  } = data;

  const formatPrice = (amount, code = 'en-GB', currency = 'GBP') => {
    return new Intl.NumberFormat(code, {
      style: 'currency',
      currency,
    }).format(amount / 100);
  };

  const setIcon = (data) => (data === 'Yes' ? checkedIcon : crossIcon);

  const colorSwatchesHtml = colorSwatches.map((color) => `<div class="${color}"></div>`).join('');

  const htmlStr = `
    <div class="comparison-column swiper-slide">
        <div class="comparison-column__image ${id}-image">
            <img src="${image}"
                alt="${title}">
        </div>
        <div class="comparison-column__title ${id}-title">${title}</div>
        <div class="comparison-column__colorSwatch ${id}-colorSwatch">${colorSwatchesHtml}</div>
        <div class="comparison-column__cta ${id}-cta">
            <a href="${url}">SHOP NOW</a>
        </div>
        <a href="${learnMoreUrl}" class="comparison-column__cta ${id}-learnMore">
          LEARN MORE
        </a>
        <div class="comparison-column__price ${id}-price">From ${formatPrice(price)}</div>
        <div class="comparison-column__coverage ${id}-coverage">${coverage}</div>
        <div class="comparison-column__size ${id}-size">${size}</div>
      
        <div class="comparison-column__runtime ${id}-runtime">${runtime}</div>
        <div class="comparison-column__intensityval ${id}-intensityval ${id}-number-of-intensity-settings">${ChangeableIntensitySettings}</div>
        <div class="comparison-column__lightsetting ${id}-lightsetting ${id}-light-settings">${setIcon(lightSettings)}</div>
        <div class="comparison-column__gbreathingmode ${id}-gbreathingmode ${id}-guided-breathing-mode">${setIcon(
    guidedBreathingMode
  )}</div>
        <div class="comparison-column__hasremote ${id}-hasremote ${id}-handheld-remote">${setIcon(handheldRemote)}</div>
        <div class="comparison-column__autoshuts ${id}-autoshuts ${id}-automatic-shutoff">${setIcon(automaticShutoff)}</div>
        <div class="comparison-column__portable ${id}-portable">${setIcon(portable)}</div>
        <div class="comparison-column__howto ${id}-howto ${id}-how-it-works">${howItWorks}</div>
    </div>`;
  return htmlStr;
};

export default compareColumn;
