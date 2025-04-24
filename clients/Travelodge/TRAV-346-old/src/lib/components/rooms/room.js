import { arrowIcon, minusIconActive, minusIconDisabled, plusIconActive, plusIconDisabled, wheelChairIcon } from "../../assets/icons";
import roomTooltip from "./roomTooltip";

const room = (id, currentRooms) => {
    const htmlStr = `
    <div class="${id}__room">
        <div class='${id}__divider'></div>

        <div class="${id}__title ${id}__roomAccordionHeader">
            <p>Your first room</p>
            <div class="${id}__icon">${arrowIcon}</div>
        </div>

        <div class="${id}__content ${id}__content-active">
            <div class="adult-setting">
                <label><p>Adults</p> <p class="ages">(Ages 16+)</p></label>
                <div class="${id}__control">
                    ${roomTooltip(id)}
                    <button class="${id}__minusBtn">
                        ${minusIconActive}
                    </button>
                    <input type="number" id="${id}__rooms" value="1" min="1" max="3">
                    <button class="${id}__plusBtn">
                        ${plusIconDisabled}
                    </button>
                </div>
            </div>
            <div class="children-setting">
                <label><p>Children</p> <p class="ages">(Ages 2-16)</p></label>
                <div class="${id}__control">
                    <button class="${id}__minusBtn">
                        ${minusIconDisabled}
                    </button>
                    <input type="number" id="${id}__rooms" value="0" min="0" max="3">
                    <button class="${id}__plusBtn">
                        ${plusIconActive}
                    </button>
                </div>
            </div>
            <div class="accessible-room-setting">
                <input type="checkbox" id="accessible-${currentRooms + 1}" class="custom-checkbox">
                <label for="accessible-${currentRooms + 1}" class="custom-label ${id}__customLabel">
                    <span class="icon">${wheelChairIcon}</span> Accessible room
                </label>
            </div>
        </div>
    </div>
    `;

    return htmlStr;
};

export default room;