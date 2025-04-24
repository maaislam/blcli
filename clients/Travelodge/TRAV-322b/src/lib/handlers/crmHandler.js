const crmInput = (ID) => {
    const crmButton = document.querySelector(`.${ID}-crm-button`);

    crmButton.addEventListener('click', () => {
        console.log('CRM button clicked');
        const email = window.globalDataLayer.bookerEmail;
          window.Moengage.add_unique_user_id(email).then((res) => {
            window.Moengage.add_user_attribute("moe_unsubscribe", false);
            window.Moengage.add_user_attribute("src", "confirmation-page");
            window.Moengage.add_email(email);
            window.Moengage.add_user_attribute("emailpermit", true);
          })
          .then(() => {
            // change sign up button to subscribed
            crmButton.textContent = 'Subscribed';
            crmButton.disabled = true;
          });
    });
}

export default crmInput;