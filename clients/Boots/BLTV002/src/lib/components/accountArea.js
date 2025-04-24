import { advantageCard } from '../assets/icons';

const accountArea = (id) => {
  const html = `
        <div class="${id}__accountArea">
            <div class="${id}__accountAreaContainer">
                <div class="${id}__accountAreaInfo">
                    <div class="${id}__icon">${advantageCard}</div>
                    <div class="${id}__text">You have 1699 points to spend</div>
                </div>
                <a class="${id}__primary-btn" href="https://www.boots.com/sitesearch?searchTerm=price+advantage">Shop Price Advantage</a>
            </div>
        </div>
    `;
  return html.trim();
};

export default accountArea;
