const parseRoomDetails = (roomParams) => {
    if (roomParams.length === 0) {
        // Default to 1 room with 1 adult and 0 children if no params are found
        return [
            {
                adults: 1,
                children: 0,
                accessible: false,
            },
        ];
    }
    
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