const wifi = (ID) => {
   const wifiPrices = {
        "24 hours": 3,
        "48 hours": 6,
        "72 hours": 9,
        "1 week": 12,
        "2 weeks": 20,
        "1 month": 35
    }

    let numberNights = window.globalDataLayer["roomNights"];
    if(numberNights == 1) {
        numberNights = "24 hours";
    } else if(numberNights == 2) {
        numberNights = "48 hours";
    } else if(numberNights == 3) {
        numberNights = "72 hours";
    } else if(numberNights > 3 && numberNights <= 7) {
        numberNights = "1 week";
    } else if(numberNights > 7 && numberNights <= 14) {
        numberNights = "2 weeks";
    } else if(numberNights > 14) {
        numberNights = "1 month";
    }

    const wifiPrice = wifiPrices[numberNights];

    const bookingSurname = window.globalDataLayer["bookerLastName"];
    const confirmationNumber = window.globalDataLayer["confirmationID"];

    const bookingLink = `/manage-bookings?confirmationNo=${confirmationNumber}&surName=${bookingSurname}&journey=wifi`
    const isStaging = window.location.hostname.includes('uat.dev');
    const stagingBookingLink = `https://uat.dev.travelodge.co.uk/manage-bookings?confirmationNo=${confirmationNumber}&surName=${bookingSurname}&journey=wifi`

    const wifiHtml = `
        <div class="${ID}-wifi-container">
            <div class="${ID}-wifi-container-left ${ID}-wifi-container-sub">
                <div class="${ID}-wifi-text">
                    <h3 class="${ID}-wifi-title">Best Ever WiFi from just £${wifiPrice}</h3>
                    <p>It’s not too late to add ${numberNights} of WiFi in partnership with Virgin Media</p>
                </div>
                <a href="${isStaging ? stagingBookingLink : bookingLink}" class="${ID}-wifi-button" data-stayLength=${numberNights}>Add for £${wifiPrice}</a>
                <div class="${ID}-wifi-logo ${ID}-hide-desktop">
                    <p class="${ID}-virgin-text">Powered by</p>
                    <img src="https://media.travelodge.co.uk/image/upload/ui/travelodge-virgin-media.png" alt="Virgin Media">
                </div>
            </div>
            <div class="${ID}-wifi-container-right ${ID}-wifi-container-sub">
                <div class="${ID}-wifi-image">
                    <img src="https://media.travelodge.co.uk/image/upload/ui/travelodge-wifi.png" alt="WiFi">
                </div>
                <div class="${ID}-wifi-logo ${ID}-hide-mbl">
                    <p class="${ID}-virgin-text">Powered by</p>
                    <img src="https://media.travelodge.co.uk/image/upload/ui/travelodge-virgin-media.png" alt="Virgin Media">
                </div>
            </div>
        </div>
    `;
    return wifiHtml;
}

export default wifi;