import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const html = `
<div class="${ID}-flex ${ID}-items-center">
    <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="${ID}-icon">
        <g id="Blue-icon-with-white-tick" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Group">
                <circle id="Oval" fill="#028CD0" cx="16" cy="16" r="16"></circle>
                <polyline stroke="#FFFFFF" stroke-width="2.76" stroke-linecap="round" stroke-linejoin="round" points="6.5 15.6090129 13.1607233 22 24.5 9"></polyline>
            </g>
        </g>
    </svg>
    Ready to be added to the basket 
    </div>
</div>
`;

export default html;