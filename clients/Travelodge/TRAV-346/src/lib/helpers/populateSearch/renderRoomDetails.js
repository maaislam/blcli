import { arrowIcon, minusIconActive, minusIconDisabled, plusIconActive, plusIconDisabled, wheelChairIcon } from "../../assets/icons";
import roomTooltip from "../../components/rooms/roomTooltip";

const renderRoomDetails = (id, roomDetails) => {
    const roomCountInTexts = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];
    const roomSelector = document.querySelector(`.${id}__roomSelector`);
    const roomAttachPoint = roomSelector.querySelector(`.${id}__actions`);

    // remove all existing rooms
    const rooms = roomSelector.querySelectorAll(`.${id}__room`);
    rooms.forEach(room => room.remove());

    roomDetails.forEach((room, index) => {
        const roomNumber = index + 1;

        // Generate the dynamic room HTML
        const roomHTML = `<div class="${id}__room">
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
                        <input type="number" id="${id}__rooms" value="${room.adults || 1}" min="1" max="3">
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
                        <input type="number" id="${id}__rooms" value="${room.children || 0}" min="0" max="3">
                        <button class="${id}__plusBtn">
                            ${plusIconActive}
                        </button>
                    </div>
                </div>
                <div class="accessible-room-setting">
                    <input type="checkbox" id="accessible-${roomNumber}" class="custom-checkbox" ${room.accessible ? 'checked' : ''}>
                    <label for="accessible-${roomNumber}" class="custom-label ${id}__customLabel">
                        <span class="icon">${wheelChairIcon}</span> Accessible room
                    </label>
                </div>
            </div>
        </div>`;

        // Append the generated room HTML to the container
        roomAttachPoint.insertAdjacentHTML('beforebegin', roomHTML.replace("first", `${roomCountInTexts[roomNumber-1]}`));
    });
};

export default renderRoomDetails;