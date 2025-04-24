const shortcutTracking = (ID) => {
    const bookingObj = {
        location: document.querySelector('.eachStay .title1').innerText,
        checkIn: document.querySelectorAll('.checkinWrapper .row div')[0].querySelector('.date').innerText,
        checkOut: document.querySelectorAll('.checkinWrapper .row div')[1].querySelector('.date').innerText,
        surname: window.globalDataLayer["bookerLastName"],
        rooms: [
        ],
        contactNumber: document.querySelector('.eachStay .pTel a').href.split(':')[1],
        address: document.querySelector('.eachStay .address').innerText,
      };

      //get booking data from page html and add to bookingObj
      //get all room data
      const roomData = document.querySelectorAll('.bookingDetails .rowRoom');
      roomData.forEach((room, index) => {
        // if (index > 0) return;
        const newRoom = {
          rate: '',
          roomType: '',
          roomExtras: [],
          confirmationNumber: '',
        };

        newRoom.rate = room.querySelector('.dlTable .field dt').innerText.split('-')[1].trim();
        newRoom.roomType = room.querySelector('.title1Light').innerText.split(':')[1].trim();
        newRoom.confirmationNumber = room.querySelector('.bookingNumbers dd').innerText.trim();

        room.querySelectorAll('.dlTable div dl').forEach((extra, index) => {
          if (index > 0) {
            newRoom.roomExtras.push(extra.querySelector('dt').innerText.trim());
          }
        });

        bookingObj.rooms.push(newRoom);
      });

      //set local storage with bookingObj data from page html
      localStorage.setItem(`${ID}-bookingObj`, JSON.stringify(bookingObj));
}

export default shortcutTracking;