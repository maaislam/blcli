const renderHowItWorks = (id, data, parentContainer, renderType) => {
  const countryStr = ['/en-au', '/en-us'];
  const pathnameCountryPrefix = countryStr.filter((item) => location.pathname.indexOf(item) !== -1)[0];
  const country = pathnameCountryPrefix?.split('-')[1] || 'uk';
  const renderData = renderType === 'module1' ? data.content1 : data.content3;

  const stepsStr = (stepData) => {
    const { img, title, paragraph } = stepData;
    const htmlStr = `

            <div class="${id}__step--container">
                <div class="step-img"><div class="svg ${renderType !== 'module1' ? `${id}__hide` : ''}">${img}</div><img class="${
      renderType === 'module1' ? `${id}__hide` : ''
    }" src='${img}' alt='${title}'/></div>
                <div class="step-content">
                    <div class="title">${title}</div>
                    <div class="paragraph">${paragraph}</div>
                </div>
            </div>
        
            `;
    return htmlStr;
  };

  const htmlStr = (info, stepBuilder) => {
    const { title, subtitle, heroImage, listItems, ctaLink, ctaText, learnMoreLink } = info;
    // console.log(info);
    // console.log(learnMoreLink);
    const htmlString = `
    <div class="${id}__howitworks--${renderType}">
        <div class="${id}__howitworks--title">${title}</div>
        <div class="${id}__howitworks--subtitle">${subtitle}</div>
        <div class="${id}__howitworks--heroImage ${renderType !== 'module1' ? `${id}__hide` : ''}">
          <div class="image-wrapper">
          <div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_pb0x2kjuf3 seo=false videoFoam=true autoPlay=true endVideoBehavior=loop" style="height:100%;position:relative;width:100%"><div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"><img src="https://fast.wistia.com/embed/medias/pb0x2kjuf3/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" /></div></div></div></div>
          </div>
          
        </div>
        <div class="${id}__howitworks--steps">
            ${listItems.map((item) => stepBuilder(item)).join('\n')}
        </div>
        <div class="${id}__howitworks--cta " data-position="${renderType}" data-href="${ctaLink}">${ctaText}</div>
        <a class="${id}__howitworks--learnCta ${
      renderType !== 'module3' ? `${id}__hide` : ''
    }" data-position="${renderType}" href="${learnMoreLink ? learnMoreLink[country] : ''}">Learn more</a>
    </div>`;
    return htmlString;
  };

  const middleQuote = () => {
    const htmlString = `
    <div class="${id}__quote--${renderType}">
        ${data.content2}
    </div>`;
    return htmlString;
  };

  const newContent = renderType === 'module2' ? middleQuote() : htmlStr(renderData, stepsStr);
  const anchorPos = renderType === 'module3' ? 'beforebegin' : 'beforebegin';

  parentContainer.insertAdjacentHTML(anchorPos, newContent);
  document.querySelectorAll(`.${id}__howitworks--cta`).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      location.href = e.target.getAttribute('data-href');
    });
  });
};

export default renderHowItWorks;
