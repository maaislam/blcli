/**
 * Get Number of Available Seats
 */
export const availableSeats = (tourRef) => {
  return new Promise((res, rej) => {
    $.ajax({
      url:"/WebServices/SeatplanService.asmx/GetSeatplan?ref=UC",
      data: JSON.stringify({
        tourRef: tourRef
      }),
      type:"POST",
      contentType:"application/json",
      dataType:"json",
    }).success((data) => {
      const rows = ((data || {}).d || {}).Rows;

      if(rows) {
        let numAvailable = 0;
        rows.forEach((row) => {
          row.Seats.forEach((seat) => {
            if(seat && seat.Object == 1) {
              numAvailable += 1;
            }
          });
        });

        res(numAvailable);
      }
    });
  });
};

/**
 * Use rendered HTML to get available seats
 */
export const availableSeatsFromDom = () => {
  const seats = document.querySelectorAll('.seat-block .seat');
  const availableSeats = [...seats].filter(
    (seat) => !seat.classList.contains('blank') && !seat.classList.contains('unavailable')
  );

  return availableSeats.length;
};
