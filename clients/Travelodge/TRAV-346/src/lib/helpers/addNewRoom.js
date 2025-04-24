import room from "../components/rooms/room";

const addNewRoom = (id, actionsElem, currentRooms) => {
    const roomCountInTexts = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];

    //currentRooms counting starts from 0, so 8 is the max room count
    if (currentRooms < 9) {
        const newRoomHTML = room(id, currentRooms).replace("first", `${roomCountInTexts[currentRooms]}`);
        actionsElem.insertAdjacentHTML("beforebegin", newRoomHTML);
    }
};
export default addNewRoom;