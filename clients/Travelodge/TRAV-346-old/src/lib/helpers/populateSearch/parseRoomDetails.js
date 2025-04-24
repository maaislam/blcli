const parseRoomDetails = (roomParams) => {
    let roomDetails = [];
    roomParams.forEach(([key, value]) => {
        const match = key.match(/rooms\[(\d+)\]\[(.+)\]/);
        if (match) {
            const [, roomIndex, field] = match;
            roomDetails[roomIndex] = roomDetails[roomIndex] || {};
            roomDetails[roomIndex][field] = parseInt(value, 10) || 0;
        }
    });
    return roomDetails;
};
export default parseRoomDetails;