const renderNewsletter = (id, anchorElm) => {
  const avonFormName = '${Avon Form Name}';
  const image = '${Newsletter Image}';
  const htmlStr = `
          <div class="${id}__newsletter">
              <div class="${id}__newsletter--msg">
                  <h2 class="title">Never miss out on a deal!</h2>
                  <div class="paragraph">Add your email here to receive promotions and offers relevant to your purchases.</div>
              </div>
              <div class="eloqua-email-wrapper">
    
                <form method="post"
                        name="UK-CUST-SWMRNewsletterSignUp-637679732256130930"
                        action="https://s1782160512.t.eloqua.com/e/f2"
                        onsubmit="return handleFormSubmit(this)"
                        id="form161"
                        class="elq-form">
                        <input value="UK-CUST-SWMRNewsletterSignUp-637679732256130930"
                        type="hidden"
                        name="elqFormName">
                        <input value="1782160512"
                        type="hidden"
                        name="elqSiteId">
                        <input name="elqCampaignId"
                        type="hidden">
                        <div class="layout container-fluid ${id}__input-wrapper">
                        <div class="${id}__input-wrapper--email">
                                <div class="grid-layout-col">
                                <div class="layout-col">
                                        <div id="formElement0"
                                        class="elq-field-style form-element-layout">
                                        <div style="text-align:left;"
                                                class="">
                                                <label class="elq-label "
                                                for="fe1429">Email Address
                                                <span class="elq-required">*
                                                </span>
                                                </label>
                                        </div>
                                        <div class="">
                                                <div class="">
                                                <div class="">
                                                        <div class="field-control-wrapper">
                                                        <input type="email"
                                                                required=""
                                                                class="elq-item-input ${id}__newsletter--email"
                                                                name="emailAddress"
                                                                id="fe1429"
                                                                value=""
                                                                placeholder="Enter your email address"
                                                                style="width:100%;">
                                                        </div>
                                                </div>
                                                </div>
                                        </div>
                                        </div>
                                </div>
                                </div>
                        </div>
                        <div class="${id}__submit-btn--wrapper">
                                <div class="grid-layout-col">
                                <div class="">
                                        <div id="formElement1"
                                        class="elq-field-style form-element-layout">
                                        <div class="">
                                                <div class="">
                                                <div class="${id}__newsletter--submit">
                                                        <div>
                                                        <input type="Submit"
                                                                class="submit-button-style ${id}__submit-btn"
                                                                value="Sign up"
                                                                id="fe1434">
                                                        </div>
                                                </div>
                                                </div>
                                        </div>
                                        </div>
                                </div>
                                </div>
                        </div>
                        <input type="hidden"
                                name="hiddenField"
                                id="fe1430"
                                value="United Kingdom">
                        <input type="hidden"
                                name="hiddenField4"
                                id="fe1431"
                                value="True">
                        <input type="hidden"
                                name="hiddenField3"
                                id="fe1432"
                                value="1">
                        <input type="hidden"
                                name="hiddenField5"
                                id="fe1433"
                                value="SWMR Newsletter Sign Up">
                        </div>
                        <input type="hidden"
                        name="elqCustomerGUID"
                        value="">
                        <input type="hidden"
                        name="elqCookieWrite"
                        value="0">
                </form>
   
                </div>
                <p class="${id}__disclaimer">
                By clicking sign up, you have read and agreed to the Avon Privacy Policy
                </p>
          </div>
        
        `;

  anchorElm.insertAdjacentHTML('afterend', htmlStr);
};
export default renderNewsletter;
