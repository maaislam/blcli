import stayAgain from "../components/stayAgain/stayAgain";
import stayAgainSkeleton from "../components/stayAgain/stayAgainSkeleton";
import getBookingData from "./getBookingData";

const renderStayAgain = async (id) => {
    try {
        const bookingData = await getBookingData();

        if (bookingData) {
            const searchSuggestions = document.querySelector(`.${id}__searchSuggestions`);
            searchSuggestions.insertAdjacentHTML('beforeend', stayAgainSkeleton(id));

            stayAgain(id, bookingData).then((html) => {
                searchSuggestions.insertAdjacentHTML('beforeend', html);
                document.querySelector(`.${id}__stayAgainSkeleton`)?.remove();
            });
        } else {
            console.log('No past bookings to display.');
        }
    } catch (error) {
        console.error('Failed to fetch bookings:', error);
    }
};

export default renderStayAgain;