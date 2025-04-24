import { searchIcon } from '../assets/icons';

export const inputBox = (id) => {
  const html = `
        <div class="${id}__inputBox">
            <div class="${id}__form">
                <div class="${id}__inputWrapper">
                    <input class="${id}__input" placeholder="What are you looking for?" />
                </div>
                <div class="${id}__searchResultsWrapper">
                    
                </div>
                <button class="${id}__searchBtn" type="submit">
                    <span>${searchIcon}</span>
                </button>
            </div>
            
        </div>
    `;
  return html;
};
