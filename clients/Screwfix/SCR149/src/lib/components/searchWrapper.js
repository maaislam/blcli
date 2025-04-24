import { searchIcon } from '../assets/icons';

export const searchWrapper = (id) => {
  const html = `
        <div class="${id}__searchWrapper">
            <div class="${id}__searchContainer">
                <form class="${id}__searchBox">
                    <div class="${id}__inputWrapper">
                            <input type="text" placeholder="Search for a product or feature" class="${id}__input" aria-label="Search for products" aria-describedby="search-instructions"/>
                        <span class="${id}__divider"></span>
                            <button type="submit" aria-label="Submit search">
                            <span class="${id}__icon">${searchIcon}</span>
                        </button>
                    </div>
                </form>
            </div>
            <div class="${id}__dynamicSearchResults"></div>
        </div>
    `;
  return html.trim();
};
