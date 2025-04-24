export const getHotelImage = (url) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/html',
            Accept: 'text/html',
        },
        credentials: 'include', // Include cookies for authenticated access
    })
        .then((response) => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then((htmlText) => {
            // Parse the HTML content
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            const hdpImgElem = doc.querySelector('#main-carousel-image .carousel-item img')
            const hdpImgSrc = hdpImgElem.getAttribute('src');

            if (!hdpImgElem) {
                return '';
            }
            return hdpImgSrc;
        });
};