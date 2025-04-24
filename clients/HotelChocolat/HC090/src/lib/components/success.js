import shared from "../../../../../../core-files/shared"

export default () => {

    const { ID } = shared;
    
    const newContent = `
    <div class="${ID}-submittedContainer">
        <div class="${ID}-CSVStep">
            <h3><span>Thank you for submitting an enquiry. A member of our team will get in touch within 24 hours.</span></h3>
            <div class="${ID}-csvWrapper">
                <p>In the meantime, you can start choosing your products and fill in our corporate gifting order form with your details, your recipient details, the products you wish the send, your gift message and you’re preferred delivery options.</p>
                <p>Download our corporate gifting order form and start filling it in now for quicker processing of your order.</p>
                <div class="${ID}-csvBtn">
                    <a target="_blank" href="https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dw856417dd/CORPORATE/HC_Corporate_OrderForm_YourName_CompanyName.xlsx" download="CORPORATE/HC_Corporate_OrderForm_YourName_CompanyName.xlsx">
                        DOWNLOAD ORDER FORM
                    </a>
                </div>
                <h4>What happens next?</h4>
                <p>To provide extra security to your data, we will send you a secure file sharing link by email where you can upload your order form.</p>
                <p><b>For smooth processing of your order, please fill in all mandatory fields and make sure the file is renamed with your name and company name before uploading.</b></p>
            </div>
        </div>
    </div>
    `;


    document.querySelector('#primary .craigsmaincontainer .craigsrow').innerHTML = newContent;
    
}