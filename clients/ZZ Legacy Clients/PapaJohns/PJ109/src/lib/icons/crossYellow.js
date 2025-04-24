import shared from '../shared';
const {ID, VARIATION} = shared;

const crossYellow = (htmlClass) => {
    return `
        <button class="${ID}-close ${ID}-close--yellow ${htmlClass}">
        <svg class="${ID}-close__icon" viewBox="0 0 51 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <polygon id="path-1" points="0 0 37.066645 0 37.066645 37.7890025 0 37.7890025"></polygon>
                <filter x="-36.4%" y="-35.7%" width="172.8%" height="171.4%" filterUnits="objectBoundingBox" id="filter-2">
                    <feMorphology radius="1.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                    <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur stdDeviation="3" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                    <feColorMatrix values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                </filter>
            </defs>
            <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Group-2" transform="translate(8.000000, 7.000000)">
                    <g id="Path">
                        <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use>
                        <use fill="#E8D260" fill-rule="evenodd" xlink:href="#path-1"></use>
                    </g>
                    <g id="Group" transform="translate(12.000000, 12.000000)" stroke="#B53127" stroke-width="3">
                        <line x1="0" y1="0" x2="13" y2="13" id="Path-2"></line>
                        <line x1="0" y1="0" x2="13" y2="13" id="Path-2" transform="translate(6.500000, 6.500000) scale(1, -1) translate(-6.500000, -6.500000) "></line>
                    </g>
                </g>
            </g>
        </svg>
    </button>
    `;
};
export default crossYellow;