import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const buildIconTitle = (title, additionalClasses, reverse) => {
    if (reverse) {
        return `
        <div class="${ID}-icon-title ${ID}-icon-title--reverse ${additionalClasses ?? ''}">
            <i class="fas fa-exclamation-circle ${ID}-icon-title__icon"></i>
            ${title}
        </div>
        `;
    }
    return `
    <div class="${ID}-icon-title ${additionalClasses ?? ''}">
        ${title}
        <i class="fas fa-exclamation-circle ${ID}-icon-title__icon"></i>
    </div>
    `;
};

export default buildIconTitle;