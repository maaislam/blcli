/**
 * Helper generate remaining passengers text
 */
const generateRemainingPaxText = (remainingPassengers) => {
    if(remainingPassengers > 0) {
        $('.nh5-remaining-pax-wrap').html(`
            <p class="nh5-remaining-pax">
                Please select 
                <strong>
                    <span class="nh5-remaining-pax__value">${remainingPassengers}</span> passengers
                </strong>
                by clicking on an available seat below
            </p>
        `);

        $('.seat-area').removeClass('nh5-all-seats-selected');
    } else {
        $('.nh5-remaining-pax-wrap').html(`
            <p class="nh5-remaining-pax nh5-remaining-pax--complete">
                Great! You've reserved all your seats.
            </p>
        `);

        $('.seat-area').addClass('nh5-all-seats-selected');
    }
};

/**
 * Helper get remaining passengers
 */
const getRemainingPassengers = (remainingPax) => {
    return remainingPax.text().trim();
};

/**
 * Transpose the seats to a columnar layout for portrait coach layout on phones
 */
const transposeSeats = (coachSideElement) => {
    const numSeatsPerRow = 13,
        seats = coachSideElement.find('.seat'),
        row1Seats = seats.slice(0,13),
        row2Seats = seats.slice(13, 26);

    coachSideElement.find('.seat').each((idx, item) => item.dataset.nh5origorder = idx);

    const results = [];
    for(let i = numSeatsPerRow - 1; i >= 0; i--) {
        if(row1Seats[i]) {
            $(row1Seats[i]).prependTo(coachSideElement);
        }
        if(row2Seats[i]) {
            $(row2Seats[i]).prependTo(coachSideElement);
        }
    }
};

/**
 * Reset seats to row layout
 */
const resetSeats = (coachSideElement) => {
    const seats = coachSideElement.find('[data-nh5origorder]');
    if(seats.length) {
        seats.sort(function(a, b) {
            const ordA = a.dataset['nh5origorder'],
                ordB = b.dataset['nh5origorder'];

            return ordA - ordB;
        });
    }

    $.each(seats, (idx, item) => {
        $(item).appendTo(coachSideElement);
    });
};

export {generateRemainingPaxText, getRemainingPassengers, transposeSeats, resetSeats};
