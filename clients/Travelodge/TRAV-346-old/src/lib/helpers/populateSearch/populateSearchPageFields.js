const populateSearchPageFields = (id) => {
    const urlParams = new URLSearchParams(window.location.search);

    // Populate location input
    const location = urlParams.get('location');
    const locationInput = document.querySelector(`.${id}__search-input`);
    if (locationInput) {
        locationInput.value = location ? decodeURIComponent(location) : '';
    }

    // Populate dates
    const checkIn = urlParams.get('checkIn');
    const checkOut = urlParams.get('checkOut');
    const checkInElement = document.querySelector('.TRAV-345-checkin');
    const checkOutElement = document.querySelector('.TRAV-345-checkout');
    if (checkInElement) {
        checkInElement.textContent = checkIn ? decodeURIComponent(checkIn) : 'Check in';
    }
    if (checkOutElement) {
        checkOutElement.textContent = checkOut ? decodeURIComponent(checkOut) : 'Check out';
    }

    // Populate room details
    const roomParams = [...urlParams.entries()].filter(([key]) => key.startsWith('rooms'));
    let roomDetails = [];
    roomParams.forEach(([key, value]) => {
        const match = key.match(/rooms\[(\d+)\]\[(.+)\]/);
        if (match) {
            const [_, roomIndex, field] = match; //ignore first element
            roomDetails[roomIndex] = roomDetails[roomIndex] || {};
            roomDetails[roomIndex][field] = value;
        }
    });

    // Update "Who?" section
    const roomLabel = document.querySelector('.TRAV-345__roomLabel');
    if (roomLabel && roomDetails.length > 0) {
        const totalRooms = roomDetails.length;
        let totalAdults = 0;
        let totalChildren = 0;

        roomDetails.forEach((room) => {
            totalAdults += parseInt(room.adults || 0, 10);
            totalChildren += parseInt(room.children || 0, 10);
        });

        roomLabel.textContent = `${totalRooms} Room${totalRooms > 1 ? 's' : ''}, ${totalAdults} Adult${totalAdults > 1 ? 's' : ''}${totalChildren > 0 ? `, ${totalChildren} Child${totalChildren > 1 ? 'ren' : ''}` : ''
            }`;
    }
};

export default populateSearchPageFields;