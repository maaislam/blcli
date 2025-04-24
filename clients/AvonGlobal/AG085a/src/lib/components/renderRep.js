const renderRep = (data, config) => {
  const { id, fireEvent, renderType, anchorElem, anchorPos, mobileAnchorElem, mobileAnchorPos } = config;
  const { brochureMaker, gdprLine, humanLogo, tickLogo } = data;
  const isMobile = DY.deviceInfo.type !== 'desktop';
  const htmlStr = `
        <div class="${id}__rep ${renderType}">
            <div class="${id}__rep--catalogue-maker ${
    renderType !== 'catalogue' || isMobile ? `${id}__hide` : ''
  }">${brochureMaker}</div>
            <div class="${id}__rep--gdpr-data ${renderType !== 'catalogue' || isMobile ? `${id}__hide` : ''}">${gdprLine}</div>
            <div class="${id}__rep--container ${!window[`${id}__repName`] ? `${id}__hide` : ''}">
                <div class="human-logo">${humanLogo}</div>
                <div class="details">
                    <div class="prefix-text">Shopping with</div>
                    <div class="rep-name">${window[`${id}__repName`]}</div>
                </div>
                <div class="tick-logo">${tickLogo}</div>
            </div>
        </div>`;

  if (isMobile) {
    mobileAnchorElem.insertAdjacentHTML(mobileAnchorPos, htmlStr);
  } else {
    anchorElem.insertAdjacentHTML(anchorPos, htmlStr);
  }
  fireEvent('Conditions Met');
};

export default renderRep;
