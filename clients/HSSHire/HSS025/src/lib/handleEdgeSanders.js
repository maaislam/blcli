import getProductRows from './getProductRows';
import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const relatedHeadings = [
    'FLOOR SANDER SHEETS',
    'EDGE SANDER DISCS'
];

const handleEdgeSanders = () => {
    const relatedRows = getProductRows(relatedHeadings);
    relatedRows.forEach(row => {
        const head = row.querySelector('.precart_available_head');
        head.classList.add(`${ID}-heading`);
        head.insertAdjacentHTML('beforeend',
        `<div class="${ID}-heading__text" role="alert">
            ESSENTIAL (not included) !
        </div>`
        );
        head.insertAdjacentHTML('afterend', `
        <span class="${ID}-heading-text-outer">
            *We will refund you for any you return unused - in case you order too many
        <span>
        `);
    });
};

export default handleEdgeSanders;