const fetchBookingDetails = async (confirmationNumber, surname, headers) => {
    // const url = `/api/v3${isLogged ? '/bookings' : '/manage/booking'}/leisure/${confirmationNumber}/amend`;
    // const url = `/api/v3/booking/leisure/manage/${confirmationNumber}/sur_name/${surname}`;
    const url = `/api/v3/booking/leisure/manage/${confirmationNumber}/sur_name/${surname}`;
    
    try {
        const response = await fetch(url, {
            headers,
            method: "GET",
            mode: "cors",
            credentials: "include"
        });
        
        return await response.json();
    } catch (error) {
        console.log('Error fetching booking details:', error);
        throw error; // Rethrow the error so it can be handled by the caller
    }
};

export default fetchBookingDetails;