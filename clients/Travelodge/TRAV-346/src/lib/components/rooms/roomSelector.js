import { minusIconActive, plusIconActive } from "../../assets/icons";
import room from "./room";

const roomSelector = (id) => {
    const htmlStr = `
    <div class='${id}__roomSelectorContainer'>
        <div class='${id}__roomSelectorTitles'>Who?</div>

        <div class='${id}__roomInput'>
            <div class='${id}__roomInputLabel'>
                <p class='${id}__roomLabel'>1 Room, 1 Adult</p>
                
                <div class="${id}__rooms ${id}__hide">
                    <p for="rooms">Rooms</p>
                    <div class="${id}__roomsControl">
                        <button class="${id}__minusBtn">${minusIconActive}</button>
                        <input type="number" value="1" min="1" max="9">
                        <button class="${id}__plusBtn ${id}__addNewRoom">
                            ${plusIconActive}
                        </button>
                    </div>
                </div>
            </div>

            <div class="${id}__roomSelector">
                ${room(id, 0)}

                <div class="${id}__actions">
                    <button class="${id}__resetBtn">Reset</button>
                    <button class="${id}__searchBtn">Search</button>
                </div>
            </div>
        </div>
    </div>
    `;

    return htmlStr;
};
export default roomSelector;
