const crm = (ID) => {
    const crmHtml = `
        <div class="${ID}-crm-container">
            <p class="${ID}-crm-msg">
                Please confirm if you’d like to receive email updates from Travelodge by clicking the button below:
            </p>
                <button class="${ID}-crm-button">Receive updates</button>
        </div>
        <div class="${ID}-crm-result">
            <svg fill="#008000" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><polygon points="437.3,30 202.7,339.3 64,200.7 0,264.7 213.3,478 512,94 "/></svg>
            <p> Thank you. You can now receive email updates from Travelodge. </p>     
        </div>   
    </div>
    `;
    return crmHtml;
}

export default crm;