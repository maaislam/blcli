const crm = (ID) => {
    const crmHtml = `
        <div class="${ID}-crm-container">
            <p class="${ID}-crm-msg">
                Please confirm if you’d like to receive email updates from Travelodge by clicking the button below:
            </p>
            <button class="${ID}-crm-button">Receive updates</button>
        </div>
    `;
    return crmHtml;
}

export default crm;