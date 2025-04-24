import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
import buildIconTitle from './buildIconTitle';
import getBrand from '../../../utils/getBrand';

const uspItems = [
    {
        text: `Genuine ${getBrand()} products`
    },
    {
        text: 'Return unopened cartridges within 6 months'
    },
    {
        text: 'Protect your warranty'
    }
];

const buildUsp = (text) => {
    return `
    <div class="${ID}-usp ${ID}-usps__usp">
        <i class="fas fa-check ${ID}-usp__icon"></i>
        ${text}
    </div>
    `;
};

const buildUsps = () => {
    let usps = '';
    uspItems.forEach(usp => {
        usps = usps + buildUsp(usp.text);
    });
    return `
    <div class="${ID}-usps">
        ${usps}
    </div>
    `;
};

const getIconTitle = () => {
    return `
    ${buildIconTitle(`Add cartridges, accessories and cables -&nbsp;<span class="${ID}-icon-title__small-text">save on future delivery costs</span>`, `${ID}-mb-1`, true)}
    `;
};

const buildConsumablesMarkup = () => {
    let html = '';
    const usps = buildUsps();
    const iconTitle = getIconTitle();
    html = html + iconTitle + usps;
    return html;
};

export default buildConsumablesMarkup;