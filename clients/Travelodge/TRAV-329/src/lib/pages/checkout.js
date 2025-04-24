import { pollerLite } from "../../../../../../lib/utils";

const checkoutPage = (roomType) => {
    pollerLite([() => document.querySelectorAll('.room-section').length > 0], () => {

        const roomSectionElems = document.querySelectorAll('.room-section');

        roomSectionElems.forEach((roomSectionElem) => {
            const roomTitleElem = roomSectionElem.querySelector('.room-title');
            let roomTitleText = roomTitleElem.innerText;

            const roomNoText = roomTitleText.split(':')[0];
            const roomTypeText = roomTitleText.split(':')[1].trim().toLowerCase();

            const roomTypeModifiedText = roomType[roomTypeText];

            if (!roomTypeModifiedText) return;

            roomTitleElem.innerText = `${roomNoText}: ${roomTypeModifiedText}`;
        });
    });
};

export default checkoutPage;