import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const manufacturer = window.dataLayer.filter(f => f.event == 'EEproductDetail')?.[0]?.ecommerce?.detail?.products?.[0]?.brand;

const html = `
<div class="${ID}-card">
    <div class="${ID}-strip ${ID}-flex ${ID}-items-center">
    <i class="fas fa-question ${ID}-strip__icon"></i>
    Not found what you are looking for?
    </div>
    <div class="${ID}-card__content ${ID}-flex ${ID}-items-center ${ID}-flex-wrap@sm ${ID}-justify-between ${ID}-justify-center@sm">
        Try our NEW Cartridge Searcher and Finder
        <a href="consumables/352?manufacturer=${manufacturer}" class="${ID}-button ${ID}-card__button">
            Cartridge Searcher & Finder
            <i class="fas fa-caret-right ${ID}-button__icon"></i>
        </a>
    </div>
</div>
`;

export default html;