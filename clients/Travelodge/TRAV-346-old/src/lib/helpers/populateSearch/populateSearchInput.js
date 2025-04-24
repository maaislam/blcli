const populateSearchInput = (id, location) => {
    const searchInput = document.querySelector(`.${id}__search-input`);

    if (location && searchInput) {
        // If location is explicitly passed, populate it directly
        searchInput.value = decodeURIComponent(location);
        return;
    }

    const url = new URL(window.location.href);
    const pathname = url.pathname;

    if (pathname.includes('/hotels')) {
        // Extract hotel name from the URL if location is not explicitly provided
        const hotelName = pathname.split('/').slice(-1)[0].replace(/-/g, ' ');
        if (hotelName && searchInput) {
            searchInput.value = decodeURIComponent(hotelName);
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
