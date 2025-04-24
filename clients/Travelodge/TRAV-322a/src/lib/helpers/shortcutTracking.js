const shortcutTracking = (ID) => {

  let currBookingObj = localStorage.getItem(`${ID}-bookingObj`);
  let bookingObjArray = [];
  if (currBookingObj) {
    bookingObjArray = JSON.parse(currBookingObj);
  } 

    //do this for more than one stay
    const allStays = document.querySelectorAll('.chForm .bookingDetails .eachStay');
    
    allStays.forEach((stay, index) => {
    
      const bookingObj = {
          location: stay.querySelector('.eachStay .title1').innerText,
          checkIn: stay.querySelectorAll('.checkinWrapper .row div')[0].querySelector('.date').innerText,
          checkOut: stay.querySelectorAll('.checkinWrapper .row div')[1].querySelector('.date').innerText,
          surname: window.globalDataLayer["bookerLastName"],
          rooms: [
          ],
          contactNumber: stay.querySelector('.eachStay .pTel a').href.split(':')[1],
          address: stay.querySelector('.eachStay .address').innerText,
        };

        //get booking data from page html and add to bookingObj
        //get all room data
        const roomData = stay.querySelectorAll('.bookingDetails .rowRoom');
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

        bookingObjArray.push(bookingObj);
    });

    //sort bookingObjArray by date
    bookingObjArray.sort((a, b) => {
      const dateA = new Date(a.checkIn);
      const dateB = new Date(b.checkIn);
      return dateA - dateB;
    });

    //set local storage with bookingObj data from page html
    localStorage.setItem(`${ID}-bookingObj`, JSON.stringify(bookingObjArray));

}

export default shortcutTracking;