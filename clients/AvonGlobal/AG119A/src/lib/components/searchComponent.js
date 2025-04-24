export const searchComponent = (ID) => {
  return `
    <div class="${ID}__container">
      <p class='${ID}__suggestionHeader'>Search Suggestions</p>
      <ul>
        <li>
          <a href="/5466-7073/cadouri/pentru-ea">Gifts for Her</a>
        </li>
        <li>
          <a href="/5466-7074/cadouri/pentru-el">Gifts for him</a> 
        </li>
        <li>
          <a href="/5466-7075/cadouri/pentru-copii-si-adolescenti">Gifts for kids</a>
        </li>
        <li>
          <a href="/5466/cadouri">Gifts</a>
        </li>
        <li>
          <a href="/5466-7066/cadouri/parfumuri">Fragrance</a>
        </li>
        <li>
          <a href="/5466-7067/cadouri/ingrijire-ten">Skincare</a>
        </li>
        <li>
          <a href="/5466-7068/cadouri/ingrijire-personala">Bath & Body</a>
        </li>
      </ul>
    </div>`;
};

export const overlay = (ID) => {
  return `<div class="${ID}__overlay"></div>`;
};
