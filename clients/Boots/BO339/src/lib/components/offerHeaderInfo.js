import { arrow } from '../assets/icons';
import offerCount from './offerCount';

const offerHeaderInfo = (id, totalCountPromos) => {
  const title = window.location.pathname.split('/')[1].replace(/-/g, ' & ');
  const html = `
        <div class="${id}__offerHeader">
            <div class="${id}__offerHeader-text">LATEST ${title} OFFERS</div>
            <div class="${id}__offerHeader-info">
                <div class="${id}__offerHeader-available">
                    ${offerCount(id, totalCountPromos)}
                </div>
                <div class="${id}__offerHeader-filter">
                    Filter
                    <span>${arrow}</span>
                </div>
            </div>
        </div>
    `;

  return html.trim();
};

export default offerHeaderInfo;
