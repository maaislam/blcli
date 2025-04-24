const homeBookingHandler = (ID) => {
    const nextRoomButtons = document.querySelectorAll(`.${ID}-home-booking-shortcut .${ID}-next-room`);

    nextRoomButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // console.log('Next room button clicked');
            if(index === nextRoomButtons.length - 1) {
                const rooms = document.querySelectorAll(`.${ID}-home-booking-shortcut .${ID}-home-booking-shortcut-body-right-room`);
                const roomButtons = document.querySelectorAll(`.${ID}-home-booking-shortcut .${ID}-home-booking-shortcut-body-right-room-buttons`);
    
                rooms.forEach(room => {
                    room.classList.add(`${ID}-display-none`);
                });
    
                roomButtons.forEach(roomButton => {
                    roomButton.classList.add(`${ID}-display-none`);
                });
    
                rooms[0].classList.remove(`${ID}-display-none`);
                roomButtons[0].classList.remove(`${ID}-display-none`);
            } else {
                const rooms = document.querySelectorAll(`.${ID}-home-booking-shortcut .${ID}-home-booking-shortcut-body-right-room`);
                const roomButtons = document.querySelectorAll(`.${ID}-home-booking-shortcut .${ID}-home-booking-shortcut-body-right-room-buttons`);
    
                rooms.forEach(room => {
                    room.classList.add(`${ID}-display-none`);
                });
    
                roomButtons.forEach(roomButton => {
                    roomButton.classList.add(`${ID}-display-none`);
                });
    
                rooms[index + 1].classList.remove(`${ID}-display-none`);
                roomButtons[index + 1].classList.remove(`${ID}-display-none`);
            }
        });
    })
};

export default homeBookingHandler;