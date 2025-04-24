const roomInputHandler = (id, target) => {
    const roomInputElem = target.closest(`.${id}__roomInput`);

    const roomLabelElem = roomInputElem.querySelector(`.${id}__roomLabel`);
    const roomsElem = roomInputElem.querySelector(`.${id}__rooms`);
    const roomSelectorElem = roomInputElem.querySelector(`.${id}__roomSelector`);

    roomInputElem.classList.add(`${id}__roomInput-active`);
    roomLabelElem.classList.add(`${id}__hide`);
    roomInputElem?.classList.remove(`${id}__roomInput-success`);
    roomsElem.classList.remove(`${id}__hide`);
    roomSelectorElem.classList.add(`${id}__roomSelector-active`);
};
export default roomInputHandler;
