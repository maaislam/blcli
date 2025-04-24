/**
 * One-level deep menu generator
 *
 * @param {Object} config
 * @return {String}
 */
const menuGenerator = (config, level = 1) => {
  const prefix = config.classPrefix;
  const target = config.target || 'root';

  let html = `<ul class="${prefix} ${prefix}--level-${level}" data-target="${target}">`;

  // -------------------------
  // Standalone Elements
  // -------------------------
  const st = config.standalone;
  if(st && Object.keys(st).length) {

    html += `<li class="${prefix}__standalone">`;

    Object.keys(st).forEach((k) => {
        html += `
          <div class="${prefix}__standalone-item">
            <a href="${st[k].href}">
              <img src="${st[k].icon}">
              <span>${st[k].title}</span>
            </a>
          </div>
        `;
    });

    html += '</li>';
  }
  
  // -------------------------
  // Featured Link
  // -------------------------
  if(config.featured) {
    html += `<li class="${prefix}__featured ${prefix}__nav-item--bubble">`;

    html += `
      <a class="${prefix}__featured-link" 
        href="${config.featured.href}" 
        style="background-image:url(${config.featured.background})"
      >
        <span>${config.featured.title}</span>
        ${config.featured.legend ? `
          <span class="${prefix}__legend" style="color: ${config.featured.legendColor}">
            ${config.featured.legend}</span>
        ` : ''}
      </a>
    `;

    html += '</li>';
  }
  
  // -------------------------
  // Hierarchical
  // -------------------------
  if(config.hierarchical) {
    html += `<li class="${prefix}__hierarchical">`;

    const generateNav = (menuLevel) => {
      html += `<ul class="${prefix}__nav">`;

      Object.keys(menuLevel).forEach((k) => {
        const item = menuLevel[k];

        html += `<li class="${prefix}__nav-item ${prefix}__nav-item--${item.type}">`;

        let className = `${prefix}__nav-item-link`;
        let target = '';

        if(item.sublevel && item.sublevel.length) {
          className += ` ${prefix}__nav-item-link--sublevel`;

          target = `${item.sublevel.target}`;
        }

        html += `<a class="${className}" ${item.href ? `href="${item.href}"` : ''} 
          data-target="${k}">`;
        if(item.type == 'bubble') {
          html += `
            <span>
              ${item.title}
              ${item.legend ? `
                <em class="${prefix}__legend" style="color: ${item.legendColor}">
                  ${item.legend}</em>
              ` : ''}
            </span>
            <div class="${prefix}__nav-bubble-image" style='background-image: url("${item.icon}");'></div>
          `;
        } else {
          html += `
            <img src="${item.icon}">
            <span>${item.title}</span>
          `;
        }

        if(item.sublevel) {
          html += `<i class="pos-absolute top-0 right-2 bottom-0 flex flex-middle col-11 icon-right-open"></i>`;
        }

        html += '</a>';

        html += '</li>';
      });

      html += '</ul>';
    };

    generateNav(config.hierarchical);

    html += '</li>';
  }
  
  // -------------------------
  // Sublevel
  // -------------------------
  if(config.items) {
    html += `<li class="${prefix}__sublevel">`;

    html += `<div class="${prefix}__nav-anchor">`;
    html += `<a class="${prefix}__nav-back"><i class="pos-absolute col-11 icon-left-open"></i> menu</a>`;
    html += `<span class="${prefix}__nav-title">${config.title}</span>`;
    html += `</div>`;

    html += `<ul class="${prefix}__nav">`;

    let group = null;
    config.items.forEach((item) => {
      if(item.type == 'heading') {
        html += `<li class="${prefix}__nav-heading">`;
        html += `<span>${item.title}</span>`;
        html += '</li>';
      } else {
        if(item.group && item.group != group) {
          if(group != null) {
            html += '</li>';
          }

          html += `<li class="${prefix}__nav-group">`;

          group = item.group;
        }

        html += `
          <a href="${item.href}">
            <span class="iconwrap">
              <img src="${item.icon}">
            </span>
            <span>${item.title}</span>
          </a>
        `;
      }
    });

    html += `</li>`;
      
    html += '</ul>';

    html += '</li>';
  }
  
  html += '</ul>';

  return html;
};

export {menuGenerator};
