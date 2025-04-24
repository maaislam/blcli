const updateWhoLabel = (id, roomDetails) => {
    const totalRooms = roomDetails.length;
    const totalAdults = roomDetails.reduce((sum, room) => sum + (room.adults || 0), 0);
    const totalChildren = roomDetails.reduce((sum, room) => sum + (room.children || 0), 0);

    const label = `${totalRooms} Room${totalRooms > 1 ? 's' : ''}, ${totalAdults} Adult${totalAdults > 1 ? 's' : ''}, ${totalChildren} Child${totalChildren > 1 ? 'ren' : ''}`;
    document.querySelector(`.${id}__roomLabel`).textContent = label;
};
export default updateWhoLabel;