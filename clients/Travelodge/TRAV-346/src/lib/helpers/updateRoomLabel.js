const updateRoomLabel = (id) => {
    const roomContainers = document.querySelectorAll(`.${id}__room`);
    const roomLabel = document.querySelector(`.${id}__roomLabel`);

    let totalRooms = 0;
    let totalAdults = 0;
    let totalChildren = 0;

    roomContainers.forEach((room) => {
        const adultsInput = room.querySelector(`.adult-setting .${id}__control input`);
        const childrenInput = room.querySelector(`.children-setting .${id}__control input`);

        totalRooms += 1; // Each container is a room
        totalAdults += parseInt(adultsInput.value, 10) || 0; // Add adults count
        totalChildren += parseInt(childrenInput.value, 10) || 0; // Add children count
    });

    let label = `${totalRooms} Room${totalRooms > 1 ? 's' : ''}, ${totalAdults} Adult${totalAdults > 1 ? 's' : ''}`;

    if (totalChildren > 0) {
        label += `, ${totalChildren} Child${totalChildren > 1 ? 'ren' : ''}`;
    }

    roomLabel.textContent = label;
}

export default updateRoomLabel;