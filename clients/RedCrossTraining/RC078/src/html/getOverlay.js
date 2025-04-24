import shared from '../lib/shared';
import getForm from './getForm';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const getOverlay = () => {
    return `
    <div class="${ID}-overlay">
        <div class="${ID}-overlay__content ${ID}-overlay-content">
            <div class="${ID}-overlay__content-top">
                Request a group quote
                <button class="${ID}-close ${ID}-overlay-close">
                    <svg width="20px" height="20px" viewBox="0 0 20 20" class="${ID}-close__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Plain-cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
                            <g id="Group" transform="translate(2.000000, 2.000000)" stroke="currentColor" stroke-width="2">
                                <line x1="0.5" y1="0.5" x2="15.5" y2="15.5" id="Line"></line>
                                <line x1="0.5" y1="0.5" x2="15.5" y2="15.5" id="Line" transform="translate(8.000000, 8.000000) scale(1, -1) translate(-8.000000, -8.000000) "></line>
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
            ${getForm()}
        </div>
    </div>`;
};

export default getOverlay;