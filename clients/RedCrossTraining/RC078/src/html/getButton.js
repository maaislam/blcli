import shared from '../lib/shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const getButton = () => {
    const text = 'Group Booking Quotes';
    if (VARIATION == '1') {
        return `<a href="#group-bookings" class="cta ${ID}-button ${ID}-button--dark">${text}</a>`;
    }
    return `<button class="cta ${ID}-button ${ID}-button--dark ${ID}-overlay-open">${text}</button>`;
};

export default getButton;