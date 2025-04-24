const populateSearchInput = (id, location) => {
    const searchInput = document.querySelector(`.${id}__search-input`);

    const url = new URL(window.location.href);
    const pathname = url.pathname;

    if (location && searchInput && !pathname.includes('/hotels')) {
        // If location is explicitly passed, populate it directly
        searchInput.value = decodeURIComponent(location);
        return;
    }

    if (pathname.includes('/hotels')) {
        // Extract hotel name from the URL if location is not explicitly provided
        const hotelName = window.hotelInfo.title;
        if (hotelName && searchInput) {
            searchInput.value = hotelName;
        }
    } else if (pathname.includes('/search/results')) {
        const locationParam = url?.searchParams?.get('location');
        // Use 'location' query param for the search page
        if (locationParam && searchInput) {
            searchInput.value = decodeURIComponent(locationParam);
        }
    }
};
export default populateSearchInput;
