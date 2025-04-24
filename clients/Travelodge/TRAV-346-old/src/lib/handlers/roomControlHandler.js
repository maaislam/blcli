import addNewRoom from "../helpers/addNewRoom";
import removeRoom from "../helpers/removeRoom";

const roomControlHandler = (id, isPlus) => {
    const roomContainer = document.querySelector(`.${id}__roomSelector`);
    const actionsElem = roomContainer.querySelector(`.${id}__actions`);
    const currentRooms = roomContainer.querySelectorAll(`.${id}__room`).length;
    const allRooms = document.querySelectorAll(`.${id}__room`).length;

    if (isPlus) {
        addNewRoom(id, actionsElem, currentRooms); //add new room if user clicks on plus button
    } else {
        if (allRooms === 1) return; //don't remove the first room
        removeRoom(id, actionsElem); //remove last added room if user clicks on minus button
    }
};
export default roomControlHandler;
