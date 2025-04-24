import { getCookie } from '/Users/james.johnson/Documents/Bitbucket/experiments/lib/utils.js'

const shortcutTrackingAmend = (ID) => {

    let currBookingObj = localStorage.getItem(`${ID}-bookingObj`);
    let bookingObjArray = [];
    if (currBookingObj) {
      bookingObjArray = JSON.parse(currBookingObj);
    } 
    console.log('bookingObjArray', bookingObjArray);

    //on amend - so check to see if this booking is already in the bookingObjArray and if so do nothing
    //if not then add it to the bookingObjArray

    const url = window.location.href;
    const confirmationNo = new URL(url).searchParams.get('confirmationNo');

    const token = localStorage.getItem('MANAGE_BOOKING_TOKEN');
    const isLogged = getCookie('TLUSERAUTHTOKEN');
    const headers = isLogged
    ? {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getCookie('TLUSERAUTHTOKEN')}`,
        }
    : {
        'Content-Type': 'application/json',
        tlmanagebookingtoken: token,
        authorization: '',
        };

    fetch(`/api/v3${isLogged ? '/bookings' : '/manage/booking'}/leisure/${confirmationNo}/amend`, {
    headers: headers,
    }).then((res) => res.json())
      .then((bookingDetails) => {
        console.log('bookingDetails', bookingDetails);

        const confirmationNo = bookingDetails["booking"]["confirmationNo"];
        console.log('confirmationNo', confirmationNo);

        //check if bookingObjArray already contains this booking
        const bookingExists = bookingObjArray.some((bookingObj) => {
            return bookingObj.rooms.some((room) => {
            return room.confirmationNumber === confirmationNo;
            });
        });

        if (bookingExists){
            console.log('booking already exists in bookingObjArray');
            return;
        } 
  
        const bookingObj = {
            location: window.globalDataLayer["hotelName"],
            checkIn: document.querySelector('.main .leisure-amend-booking-view-container .leisure-booked-date-content').innerText.split('-')[0],
            checkOut: document.querySelector('.main .leisure-amend-booking-view-container .leisure-booked-date-content').innerText.split('-')[1],
            surname: bookingDetails["booking"]["booker"]["lastName"], 
            rooms: [
            ],
            contactNumber: bookingDetails["booking"]["hotel"]["phone"],
            address: bookingDetails["booking"]["hotel"]["address"]["line1"],
            };

            //get booking data from page html and add to bookingObj
            //get all room data
            // const roomData = document.querySelector('.bookingDetails .rowRoom');
            // roomData.forEach((room, index) => {
            // if (index > 0) return;
            const newRoom = {
                rate: '',
                roomType: '',
                roomExtras: [],
                confirmationNumber: '',
            };

            newRoom.rate = bookingDetails["booking"]["rateType"]["group"];
            newRoom.roomType = bookingDetails["booking"]["roomType"]["name"];
            newRoom.confirmationNumber = bookingDetails["booking"]["confirmationNo"];

            // newRoom.roomExtras.push(bookingDetails["booking"]["products"]["name"]);
            //  bookingDetails["booking"]["products"].map((product) => {
            //     return {
            //     name: product["name"],
            //     // price: product["price"],
            //     };
            // });

            bookingDetails["booking"]["products"].forEach((product) => {
                newRoom.roomExtras.push(product["name"]);
            });

            bookingObj.rooms.push(newRoom);

            bookingObjArray.push(bookingObj);

            //sort bookingObjArray by date
            bookingObjArray.sort((a, b) => {
                const dateA = new Date(a.checkIn);
                const dateB = new Date(b.checkIn);
                return dateA - dateB;
            });

            console.log('bookingObjArray', bookingObjArray);
    
            //set local storage with bookingObj data from page html
            localStorage.setItem(`${ID}-bookingObj`, JSON.stringify(bookingObjArray));
            });

    // });
  
  }
  
  export default shortcutTrackingAmend;