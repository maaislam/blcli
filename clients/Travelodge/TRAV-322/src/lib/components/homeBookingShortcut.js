const closeSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_225_431)">
    <path d="M13.4099 11.9999L17.7099 7.70994C17.8982 7.52164 18.004 7.26624 18.004 6.99994C18.004 6.73364 17.8982 6.47825 17.7099 6.28994C17.5216 6.10164 17.2662 5.99585 16.9999 5.99585C16.7336 5.99585 16.4782 6.10164 16.2899 6.28994L11.9999 10.5899L7.70994 6.28994C7.52164 6.10164 7.26624 5.99585 6.99994 5.99585C6.73364 5.99585 6.47824 6.10164 6.28994 6.28994C6.10164 6.47825 5.99585 6.73364 5.99585 6.99994C5.99585 7.26624 6.10164 7.52164 6.28994 7.70994L10.5899 11.9999L6.28994 16.2899C6.19621 16.3829 6.12182 16.4935 6.07105 16.6154C6.02028 16.7372 5.99414 16.8679 5.99414 16.9999C5.99414 17.132 6.02028 17.2627 6.07105 17.3845C6.12182 17.5064 6.19621 17.617 6.28994 17.7099C6.3829 17.8037 6.4935 17.8781 6.61536 17.9288C6.73722 17.9796 6.86793 18.0057 6.99994 18.0057C7.13195 18.0057 7.26266 17.9796 7.38452 17.9288C7.50638 17.8781 7.61698 17.8037 7.70994 17.7099L11.9999 13.4099L16.2899 17.7099C16.3829 17.8037 16.4935 17.8781 16.6154 17.9288C16.7372 17.9796 16.8679 18.0057 16.9999 18.0057C17.132 18.0057 17.2627 17.9796 17.3845 17.9288C17.5064 17.8781 17.617 17.8037 17.7099 17.7099C17.8037 17.617 17.8781 17.5064 17.9288 17.3845C17.9796 17.2627 18.0057 17.132 18.0057 16.9999C18.0057 16.8679 17.9796 16.7372 17.9288 16.6154C17.8781 16.4935 17.8037 16.3829 17.7099 16.2899L13.4099 11.9999Z" fill="black"/>
  </g>
  <defs>
    <clipPath id="clip0_225_431">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>`;

const homeBookingShortcut = (ID, bookingObj, hotelId, apiConfirmationNumber) => {
    const homeBookingShortcutHTML = `
        <div class="${ID}-home-booking-shortcut">
            <div class="${ID}-home-booking-shortcut-header">
                <div class="${ID}-home-booking-shortcut-header-title">Your upcoming stay at</div>
                <div class="${ID}-home-booking-shortcut-header-close">${closeSVG}</div>
            </div>
            <div class="${ID}-home-booking-shortcut-body">
                <div class="${ID}-home-booking-shortcut-body-left">
                    <div class="${ID}-home-booking-shortcut-body-left-location">${bookingObj?.location}</div>
                    <div class="${ID}-home-booking-shortcut-body-left-date">${bookingObj?.checkIn} - ${bookingObj?.checkOut}</div>
                    <div class="${ID}-home-booking-shortcut-body-left-address">
                        <div class="${ID}-home-booking-shortcut-body-left-address-row">
                            <div class="${ID}-row-left">Address:</div>
                            <div class="${ID}-row-right">${bookingObj?.address}</div>
                        </div>
                        <div class="${ID}-home-booking-shortcut-body-left-address-row">
                            <div class="${ID}-row-left">Phone:</div>
                            <div class="${ID}-row-right">${bookingObj?.contactNumber}</div>
                        </div>
                    </div>
                </div>
                <div class="${ID}-home-booking-shortcut-body-right">
                    ${bookingObj?.rooms.map((room, index) => {
                    //const bookingLink = `/manage-bookings?confirmationNo=${apiConfirmationNumber}&h=${hotelId}&continue=extras`;
                    const bookingLink = `/manage-bookings?confirmationNo=${apiConfirmationNumber}&surname=${bookingObj.surname}&journey=share`;
                    return `
                        <div data-confirmationNo=${room.confirmationNumber} class="${ID}-home-booking-shortcut-body-right-room ${index >= 1 ? `${ID}-display-none` : ''}">
                            <div class="${ID}-home-booking-shortcut-body-right-room-title">
                                Room details
                            </div>
                            <div class="${ID}-home-booking-shortcut-body-right-room-row">
                                <div class="${ID}-row-left">Booking no:</div>
                                <div class="${ID}-row-right">${room["confirmationNumber"]}</div>
                            </div>
                            <div class="${ID}-home-booking-shortcut-body-right-room-row">
                                <div class="${ID}-row-left">Rate:</div>
                                <div class="${ID}-row-right">${room["rate"]}</div>
                            </div>
                            <div class="${ID}-home-booking-shortcut-body-right-room-row">
                                <div class="${ID}-row-left">Staying in a:</div>
                                <div class="${ID}-row-right">${room["roomType"]}</div>
                            </div>
                            <div class="${ID}-home-booking-shortcut-body-right-room-row">
                                <div class="${ID}-row-left">Room extras:</div>
                                <div class="${ID}-row-right ${ID}-room-extras">${room["roomExtras"].map(extra => `<span class="${ID}-extra">${extra}</span>`).join('')}</div>
                            </div>
                        </div>
                        <div class="${ID}-home-booking-shortcut-body-right-room-buttons ${index >= 1 ? `${ID}-display-none` : ''}">
                            <a href="${bookingLink}" class="${ID}-home-booking-shortcut-body-right-room-button ${ID}-view-booking">Manage room booking</a>
                            <button class="${ID}-home-booking-shortcut-body-right-room-button ${ID}-next-room ${bookingObj.rooms.length < 2 ? `${ID}-display-none` : ''}">Next room</button>
                        </div>
                    `}).join('')}
                </div>
            </div>
        </div>
    `;

    return homeBookingShortcutHTML;
};

export default homeBookingShortcut;