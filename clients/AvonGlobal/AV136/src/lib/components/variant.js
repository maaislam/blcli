const variant = (id, data) => {
  const { modifiedVariantTitle, outOfStock, url } = data;
  const tick = `
  <svg style="margin-left:auto" width="10" height="12" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.28003 10.0998L3.79512 13.8724C4.1943 14.4712 5.07627 14.465 5.46697 13.8606L13.6 1.27982" stroke="#546264" stroke-width="3" stroke-linecap="round"/>
  </svg>
`;
  const selected = window.location.href.includes(url) ? tick : '';

  const htmlStr = `
    <div class="${id}__variant">
        ${
          outOfStock
            ? `<a href="${url}" class="${id}__variant--out-of-stock" data-stock="false">
                <span>${modifiedVariantTitle}</span>
                <span>Out of stock</span>
              </a>`
            : `<a href="${url}" class="${id}__variant--title" ${
                selected ? `style="display:flex;font-weight:600;"` : ''
              }>${modifiedVariantTitle} ${selected}</a>`
        }
    </div>`;
  return htmlStr.trim();
};

export default variant;
