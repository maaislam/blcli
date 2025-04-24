const share = (ID) => {
        const bookingSurname = window.globalDataLayer["bookerLastName"];
        const confirmationNumber = window.globalDataLayer["confirmationID"];

        const shareLink = `https://www.travelodge.co.uk/manage-bookings?confirmationNo=${confirmationNumber}&surName=${bookingSurname}&journey=share`;
        const isStaging = window.location.hostname.includes('int.dev');
        const stagingShareLink = `https://int.dev.travelodge.co.uk/manage-bookings?confirmationNo=${confirmationNumber}&surName=${bookingSurname}&journey=share`;
        
        const shareHtml = `
        <div class="${ID}-share-container">
            <h3 class="${ID}-share-title">Share your booking with your guests</h3>
            <p>Share the link below with your guests to give them access to this booking.</p>
            <div class="${ID}-share-button-container">
                <input type="text" class="${ID}-share-input" value="${isStaging ? stagingShareLink : shareLink}" readonly>
                <button class="${ID}-share-button">Share</button>
            </div>
        </div>
        `;

        return shareHtml;
}

const getTheApp = (ID) => {
    const appHtml = `
    <div class="${ID}-app-container">
        <h3 class="${ID}-app-title">Get the Travelodge app</h3>
        <p>View and manage this booking in the Travelodge app.</p>
        <div class="${ID}-app-button-container">
            <a href="https://apps.apple.com/gb/app/travelodge-hotels/id978132900" class="${ID}-app-button">
                <img src="https://media.travelodge.co.uk/image/upload/ui/travelodge-apple-store.svg" alt="Apple app store">
            </a>
            <a href="https://play.google.com/store/apps/details?id=co.uk.travelodge.app&hl=en&gl=UK" class="${ID}-app-button">
                <img src="https://media.travelodge.co.uk/image/upload/ui/travelodge-google-play.svg" alt="Google play store">
            </a>
        </div>
        <div class="${ID}-app-image-container">
            <img src="https://media.travelodge.co.uk/image/upload/ui/travelodge-app-footer-img.png" alt="Travelodge app">
        </div>
    </div>
    `;

    return appHtml;
}

export { share, getTheApp};