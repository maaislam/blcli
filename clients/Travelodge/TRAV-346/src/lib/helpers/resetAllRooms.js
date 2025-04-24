import room from "../components/rooms/room";

const resetAllRooms = (id) => {
    const roomLabel = document.querySelector(`.${id}__roomLabel`);
    const allRooms = document.querySelectorAll(`.${id}__room`);
    const actionsElem = document.querySelector(`.${id}__actions`);

    if (roomLabel) roomLabel.textContent = "1 Room, 1 Adult"; // Reset room label

    allRooms.forEach((room) => {
        room.remove(); // Remove all rooms
    });
    actionsElem.insertAdjacentHTML("beforebegin", room(id)); // Re-add first room

    // Reset room count
    const roomControl = document.querySelector(`.${id}__roomsControl`);
    const roomsInput = roomControl.querySelector('input[type="number"]');
    const event = new Event('change');

    roomsInput.value = 1;
    roomsInput.dispatchEvent(event);

};
export default resetAllRooms;