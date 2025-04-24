import preprocessDate from "../helpers/preprocessDate";

const searchButtonHandler = (id) => {
    const searchInput = document.querySelector(`.${id}__search-input`);
    const location = searchInput.value.trim();

    if (!location) {
        searchInput.insertAdjacentHTML('afterend', `<span class=${id}__errorMsg>Please enter a location to search against</span>`);
        console.log('Location is required.');
        return;
    }

    document.querySelector(`.${id}__errorMsg`)?.remove();

    const checkInElement = document.querySelector(`.${id}-checkin`);
    const checkOutElement = document.querySelector(`.${id}-checkout`);
    const checkInDate = checkInElement ? checkInElement.textContent.trim() : '';
    const checkOutDate = checkOutElement ? checkOutElement.textContent.trim() : '';

    const formattedCheckIn = preprocessDate(checkInDate);
    const formattedCheckOut = preprocessDate(checkOutDate);

    const roomContainers = document.querySelectorAll(`.${id}__room`);
    let roomsData = [];
    roomContainers.forEach((room) => {
        const adultsInput = room.querySelector(`.adult-setting .${id}__control input`);
        const childrenInput = room.querySelector(`.children-setting .${id}__control input`);
        const accessibleInput = room.querySelector('.accessible-room-setting .custom-checkbox');

        const adults = adultsInput ? parseInt(adultsInput.value, 10) : 1;
        const children = childrenInput ? parseInt(childrenInput.value, 10) : 0;
        const accessible = accessibleInput && accessibleInput.checked ? 1 : 0;

        roomsData.push({
            adults,
            children,
            accessible,
        });
    });

    const roomsQuery = roomsData
        .map((room, index) =>
            `rooms[${index}][adults]=${room.adults}&rooms[${index}][children]=${room.children}&rooms[${index}][accessible]=${room.accessible}`
        )
        .join('&');

    const urlWithLocation = `https://www.travelodge.co.uk/search/results?location=${encodeURIComponent(location)}&lat=&long=&action=search&source=l&checkIn=${encodeURIComponent(
        formattedCheckIn
    )}&checkOut=${encodeURIComponent(formattedCheckOut)}&${roomsQuery}`;

    console.log('Redirecting to:', urlWithLocation);
    window.location.href = urlWithLocation;
};

export default searchButtonHandler;