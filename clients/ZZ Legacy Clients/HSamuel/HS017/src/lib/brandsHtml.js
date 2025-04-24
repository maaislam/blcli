/**
 * Helper map brand names, used for longer names
 * we can call them something shorter
 */
const brandNameMap = {
  'MW by Matthew Williamson': 'MW'
};

/**
 * Get brands HTML
 */
export default () => {
  const template = (title, link) => { 
    return `
      <div class="hs17-brands-slider__brand">
        <a href="${link}">${title}</a>
      </div>
    `;
  };

  let html = '';

  const refinementLinks = document.querySelectorAll('#\\#refinement-brand .filters-panel__refinement-link');
  [].forEach.call(refinementLinks, (link) => {
    const href = link.href;
    let title = link.innerText;

    if(href && href.indexOf('brand') > -1 && title) {
      let outputTitle = title.replace(/\(\d+\)/i, '').trim();
      outputTitle = brandNameMap[outputTitle] || outputTitle;

      html += template(outputTitle, link);
    }
  });

  return html;
};
