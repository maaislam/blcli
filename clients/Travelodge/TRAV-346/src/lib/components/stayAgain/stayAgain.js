import { getHotelImage } from "../../helpers/getHotelImage";

const stayAgain = async (id, bookingData) => {
    if (!bookingData || bookingData.length === 0) {
        return ''; // if there is no booking data
    }

    const bookingItems = await Promise.all(
        bookingData.map(async (booking) => {
            const url = `/hotels/${booking.hotelId}/${booking.hotelName.replace(/ /g, '-')}`;
            const hotelImage = await getHotelImage(url);

            return `
            <a class="${id}__stayAgain-list" href="${url}">
                <img src="${hotelImage}" alt="${booking.hotelName}" />
                <p>${booking.hotelName}</p>
            </a>`;
        })
    );

    const htmlStr = `
        <div class='${id}__divider'></div>
        <div class="${id}__stayAgain">
            <p class="${id}__title">Stay again</p>
            ${bookingItems.join('')}
        </div>`;

    return htmlStr;
};

export default stayAgain;
