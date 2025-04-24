import { getCookie } from "./utils";

const getBookingData = async () => {
    try {
        const response = await fetch(
            '/api/v3/bookings/leisure?listType=upcomingBooking&offset=0&limit=25&groupBy=checkInDate',
            {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${getCookie('TLUSERAUTHTOKEN')}`,
                },
            }
        );
        const data = await response.json();
        console.log('Upcoming bookings:', data);

        if (!data.data || data.data.futureBookings.length === 0) {
            console.log('No upcoming bookings available.');
            return null; // Return null if no bookings
        }

        return data.data.futureBookings; // Return the future bookings data
    } catch (error) {
        console.error('Error fetching booking data:', error);
        throw error; // Re-throw the error for further handling
    }
};

export default getBookingData;
