const renderNewsletter = (id, anchorElm) => {
  const shopifyFormName = '${shopify Form Name}';
  const image = '${Newsletter Image}';
  const htmlStr = `
    <div class="${id}__newsletter">
        <div class="${id}__newsletter--msg">
            <h2 class="title">Never miss out on a deal!</h2>
            <p class="paragraph">Add your email here to receive promotions and offers relevant to your purchases</p>
        </div>
        <div class="${id}__newsletter--img">
            <img src="${image}"
                alt="newsletter">
        </div>
        <div class="${id}__newsletter--form">
            <form name="${shopifyFormName}"
                    class="elq-form"
                    id="form114"
                    action="https://s1782160512.t.eloqua.com/e/f2"
                    method="POST">
                <input type="hidden"
                        name="elqFormName"
                        value="${shopifyFormName}">
                <input name="elqSiteId"
                        type="hidden"
                        value="1782160512">
                <input type="hidden"
                        name="elqCustomerGUID"
                        value="">
                <input type="hidden"
                        name="elqCookieWrite"
                        value="0">
                <input name="elqCampaignId"
                        type="hidden">

               
                <input type="email"
                        name="emailAddress"
                        class="elq-item-input ${id}__newsletter--email"
                        id="fe915"
                        placeholder="Enter your email address"
                        required="">
                <button type="submit"
                        class="btn btn-primary ${id}__newsletter--submit">Sign up</button>

                <input name="hiddenField"
                        id="fe921"
                        type="hidden"
                        value="United Kingdom">
                <input name="hiddenField2"
                        id="fe923"
                        type="hidden"
                        value="Shopify SignUp">
            </form>
        </div>
    </div>
  
  `;

  anchorElm.insertAdjacentHTML('afterend', htmlStr);
};
export default renderNewsletter;
