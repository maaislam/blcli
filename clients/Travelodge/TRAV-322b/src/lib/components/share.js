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

export default share;