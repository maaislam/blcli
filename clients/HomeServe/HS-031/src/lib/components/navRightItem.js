import navToggleBtn from './navToggleBtn';
import search from './search';
import { searchIcon } from './componentUtils';

const navRightItem = (id, isSearchInput = false, isSearchBtn = false) => {
  const htmlStr = `<div class="${id}_navbar-right">
        ${isSearchInput ? search(id) : ''}
        ${isSearchBtn ? `<div class='${id}_search-btn'>${searchIcon}</div>` : ''}
        ${navToggleBtn(id)}
    </div>`;
  return htmlStr;
};
export default navRightItem;
