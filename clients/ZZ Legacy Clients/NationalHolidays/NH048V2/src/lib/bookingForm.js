import { pollerLite, events } from "../../../../../lib/utils";
import shared from "../../../NH048V2-control/src/lib/shared";

/**
 * @desc check for NH5, count the seats, add the message
 */
export default () => {
    pollerLite(['.choose-seat .seat-area .nh5-seating-wrapper .seat-block .seat.unavailable'], () => {
        const seatingBox = document.querySelector('.nh5-left-box h2');
        const allSeats = document.querySelectorAll('.choose-seat .seat-area .nh5-seating-wrapper .seat-block .seat:not(.blank)').length;
        const seatsUnavailable = document.querySelectorAll('.choose-seat .seat-area .nh5-seating-wrapper .seat-block .seat.unavailable').length;
    
        const seatsLeft = allSeats - seatsUnavailable;
        if(seatsLeft < 15 && seatsLeft !== 0) {
            const unavailableText = document.createElement('div');
            unavailableText.classList.add(`NH048V2-seatsLimitedText`);
            unavailableText.innerHTML = `Hurry! only ${seatsLeft} seats left`;
            if(!document.querySelector('.NH047-booking-title-wrap')) {
                if(window.innerWidth > 767) {
                    seatingBox.insertAdjacentElement('afterend', unavailableText);
                } else {
                    seatingBox.insertAdjacentElement('beforebegin', unavailableText);
                }
                events.send(`NH048v2 v${shared.VARIATION}`, 'view', 'Scarcity Message on checkout');
            }
        }
    });
}