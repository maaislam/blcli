import { wistiaId } from '../helpers/addWistia';

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
          <div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_${wistiaId()} seo=false videoFoam=true autoPlay=true endVideoBehavior=loop" style="height:100%;position:relative;width:100%"><div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"><img src="https://fast.wistia.com/embed/medias/${wistiaId()}/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" /></div></div></div></div>
          </div></div>
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
    <path d="M4.53543 4.84097C2.75781 7.06298 2.50132 9.30242 3.02362 10.8693C4.99746 9.30186 7.74063 9.63008 9.41103 11.1906C11.0984 12.7669 11.2436 15.5379 10.1669 17.3323C9.26125 18.8418 7.67076 19.7512 5.89608 19.7512C1.85726 19.7512 0 16.189 0 12.1922C0 9.59687 0.66141 7.27247 1.98424 5.21893C3.30708 3.16538 5.30393 1.50869 7.9748 0.24884L8.69292 1.64728C7.08032 2.32759 5.69449 3.39215 4.53543 4.84097ZM17.6882 4.84097C15.9106 7.06298 15.6541 9.30242 16.1764 10.8693C17.0583 10.189 18.0158 9.84884 19.0488 9.84884C21.7663 9.84884 24 11.6587 24 14.8C24 17.6886 21.7832 19.7512 19.0488 19.7512C15.01 19.7512 13.1528 16.189 13.1528 12.1922C13.1528 9.59689 13.8142 7.27247 15.137 5.21893C16.4598 3.16538 18.4567 1.50869 21.1275 0.24884L21.8457 1.64726C20.2331 2.32759 18.8472 3.39215 17.6882 4.84097Z" fill="#1C1B18"/>
    </svg>
    <figure><blockquote><span>${data.content2}</span></figcaption></figure>
    </div>
    `;
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
