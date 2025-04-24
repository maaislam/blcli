import { pollerLite, events } from "../../../../../lib/utils";

/**
 * @desc check for NH5, count the seats, add the message
 */
export default () => {
    pollerLite(['.choose-seat .seat-area .nh5-seating-wrapper .seat-block .seat.unavailable'], () => {
        const allSeats = document.querySelectorAll('.choose-seat .seat-area .nh5-seating-wrapper .seat-block .seat:not(.blank)').length;
        const seatsUnavailable = document.querySelectorAll('.choose-seat .seat-area .nh5-seating-wrapper .seat-block .seat.unavailable').length;
    
        const seatsLeft = allSeats - seatsUnavailable;
    
        if(seatsLeft < 15) {
            if(!document.querySelector('.NH047-booking-title-wrap')) {
                events.send('NH048v2 control', 'view', 'Scarcity Message on checkout');
            }
        }
    });
}