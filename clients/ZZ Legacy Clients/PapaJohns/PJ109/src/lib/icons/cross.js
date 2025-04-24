import shared from '../shared';
const {ID, VARIATION} = shared;

const cross = (htmlClass) => {
    return `
    <button class="${ID}-close ${htmlClass}">
        <svg viewBox="0 0 20 20" class="${ID}-close__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Plain-cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
                <g id="Group" transform="translate(2.000000, 2.000000)" stroke="currentColor" stroke-width="2">
                    <line x1="0.5" y1="0.5" x2="15.5" y2="15.5" id="Line"></line>
                    <line x1="0.5" y1="0.5" x2="15.5" y2="15.5" id="Line" transform="translate(8.000000, 8.000000) scale(1, -1) translate(-8.000000, -8.000000) "></line>
                </g>
            </g>
        </svg>
    </button>
    `;
};
export default cross;