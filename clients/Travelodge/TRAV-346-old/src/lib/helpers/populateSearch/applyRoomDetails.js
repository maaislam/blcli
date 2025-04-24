import parseRoomDetails from "./parseRoomDetails";
import renderRoomDetails from "./renderRoomDetails";
import updateWhoLabel from "./updateWhoLabel";

const applyRoomDetails = (id, urlParams) => {
    const roomParams = [...urlParams.entries()].filter(([key]) => key.startsWith('rooms'));
    const roomDetails = parseRoomDetails(roomParams);

    updateWhoLabel(id, roomDetails);
    renderRoomDetails(id, roomDetails);
};
export default applyRoomDetails;