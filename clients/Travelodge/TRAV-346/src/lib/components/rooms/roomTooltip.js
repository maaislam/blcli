const roomTooltip = (id) => {
    const htmlStr = `
    <div class="${id}__roomTooltipWrapper">
        <div class="${id}__roomTooltipContainer">
            <div class="${id}__roomTooltip">
                <p>You’ll need to add another room for more than 3 adults</p>
                <div class="${id}__addNewRoomLink">Add a room?</div>
            </div>
        </div>
    </div>
    `;

    return htmlStr;
};

export default roomTooltip;