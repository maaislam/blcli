import {
    sumPeople,
    setRooms
} from './services';
import settings from './settings';
const {
    ID
} = settings;

function addResetButton() {
    const controlRooms = document.querySelectorAll('#roomList .room-selector');
    const element = document.createElement('div');
    element.classList.add(`${ID}_resetWrap`);
    element.innerHTML = `
    <div class="${ID}_reset">Reset your selection</div>
    `;
    document.querySelector(`.${ID}_rooms__addButtonWrap`).insertAdjacentElement('beforeend', element);
    document.querySelector(`.${ID}_reset`).addEventListener('click', function () {
        document.querySelector(`.${ID}_roomsWrap`).remove();
        setRooms();
        const toCheck = ['ddlAdults', 'ddlChildren'];
        const people = {
            adults: 0,
            children: 0,
        };
        let curValue;
        toCheck.forEach(function (element, i) {
            curValue = parseInt(document.querySelector(`.left #${toCheck[i]}`).value);
            if (element === toCheck[0]) {
                people.adults = curValue;
            } else {
                people.children = curValue;
            }
        });
        sumPeople(people);
        [].forEach.call(controlRooms, function(el){
            el.selectedIndex = '0';
        });
    });
}


function reset() {
    document.querySelector(`.${ID}_roomsWrap`).remove();
    setRooms();
    const controlRooms = document.querySelectorAll('#roomList .room-selector');
    const toCheck = ['ddlAdults', 'ddlChildren'];
    const people = {
        adults: 0,
        children: 0,
    };
    let curValue;
    toCheck.forEach(function (element, i) {
        curValue = parseInt(document.querySelector(`.left #${toCheck[i]}`).value);
        if (element === toCheck[0]) {
            people.adults = curValue;
        } else {
            people.children = curValue;
        }
    });
    sumPeople(people);
    [].forEach.call(controlRooms, function(el){
        el.selectedIndex = '0';
    });
}

export {
    addResetButton,
    reset
};