const removeRoom = (id, actionsElem) => {
    const lastRoomElem = actionsElem.previousElementSibling;
    if (lastRoomElem && lastRoomElem.classList.contains(`${id}__room`)) {
        lastRoomElem.remove();
    }
};
export default removeRoom;