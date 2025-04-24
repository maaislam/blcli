import routeDatePickerController from '../_MambaServices/Controllers';

function setQuerySelector() {
    if (routeDatePickerController.isCalendarReturnPicker() === false) {
        return document.querySelector('div[data-tab*="Date Calendar Outbound"]').querySelectorAll('.day');
    } else {
        return document.querySelector('div[data-tab*="Date Calendar Return"]').querySelectorAll('.day');
    };
};

function createWorldwideIcon(worldwideAvailableDates) {
    let priceSpan = document.createElement('span');
    priceSpan.innerHTML = String(worldwideAvailableDates.dayNumber) + `<span class="worldwide-icon">*</span>`;
    priceSpan.setAttribute('class', 'worldwide-available');
    return priceSpan;
};

function createSelectableWorldwideElement(worldwideAvailableDates, day) {
    let createATag = document.createElement("a");
    createATag.setAttribute("class", "selectable worldwide-selectable");
    createATag.setAttribute("href", "javascript:void(0);");
    createATag.setAttribute("ej-child-click-event", `OnSelect(${worldwideAvailableDates.clickEvent})`);
    createATag.appendChild(createWorldwideIcon(worldwideAvailableDates));
    day.appendChild(createATag);
};

function hideUnselectableEJDayNumber(day) {
    day.firstElementChild.classList.add("worldwide-unselectable");
    day.firstElementChild.style.display = "none";
};

module.exports  = {
	setQuerySelector,
    createSelectableWorldwideElement,
    hideUnselectableEJDayNumber
};