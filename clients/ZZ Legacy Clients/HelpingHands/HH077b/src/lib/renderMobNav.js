const renderMobNav = (data) => {
  const newContent = document.querySelector('.HH077b__mobile--navitems');
  newContent.innerHTML = '';

  const subMenuItem = (item, index) => {
    const htmlStr = `
        <li itemscope="itemscope" class="HH077b__menu-item--lvl2" data-index="${index}">
            <a title="${item.title}" href="${item.pageUrl}">${item.title} </a>
        </li>`;
    return htmlStr;
  };

  data.forEach((item, i) => {
    const content = `
    <li itemscope="itemscope" class="HH077b__menu-item--lvl1">
       <div>
       <a title="${item.mainNav}" href="${item.mainUrl}" class="dropdown-toggle ${
      item.subCategory.length === 0 ? '' : 'HH077b__hide'
    }">${item.mainNav}</a>
        <span title="${item.mainNav}" class="dropdown-toggle ${item.subCategory.length === 0 ? 'HH077b__hide' : ''}">${
      item.mainNav
    }</span>
        <a ${item.subCategory.length === 0 ? 'href' : 'data-href'}="${
      item.subCategory.length === 0 ? item.mainUrl : ''
    }" class="caret-arrows ${data.length - 1 === i ? 'HH077b__hide' : ''}">
        <i class="fa fa-angle-down fa-angle-up"></i>
        </a>
      </div> 
      <ul role="menu" class="HH077b__hide">
            ${item.subCategory.map((el, index) => subMenuItem(el, index)).join('\n')}
      </ul>
    </li>`;

    newContent.innerHTML += content;
  });
};

export default renderMobNav;
