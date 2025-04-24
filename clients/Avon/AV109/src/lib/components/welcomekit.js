const renderKit = (id, data, anchorElm) => {
  const { imgSrc, title, subtitles, keyFeatures, optionalFeatures, buttonText } = data;

  const renderListItems = (listItems) => listItems.map((item) => `<li>${item}</li>`).join('\n');

  const htmlStr = `
   
    <div class="${id}__welcome--kits ${id}__${title.split(' ').join('')}">
        <img src="${imgSrc}"
            alt="${title}">
        <div class="title ">${title}</div>
        <ul class="subtitles">${renderListItems(subtitles)}</ul>
        <ul class="key-features">${renderListItems(keyFeatures)}</ul>
        <ul class="optional-features">${renderListItems(optionalFeatures)}</ul>
        <a href="#apply" target="_self" class="${id}__apply-anchor-btn get-kit__btn">${buttonText}</a>
        <span class="${id}__welcomekit-TC">*For T&Cs <a href="https://rep.avon.uk.com/FLDSuite/static/downloads/campaignly/Joining-offer-TCs.pdf">click here</a></span>
    </div>`;

  anchorElm.insertAdjacentHTML('afterbegin', htmlStr);
};

export default renderKit;
