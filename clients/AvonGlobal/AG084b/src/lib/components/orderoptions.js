const renderOrderOptions = (id, repName, cartData) => {
  //console.log('cart data', cartData);
  const disableBtn = cartData['items_count'] <= 0;
  const detectSingleBtnType = () => {
    const rep = !!PDP_MANAGER['API_DATA']['rep_id'];
    const checkoutBtnWrapper =
      document.querySelector('.checkout_shopping_with_section') || document.querySelector('.checkout_send_to_rep_section');
    const checkoutButtonns = checkoutBtnWrapper?.getElementsByTagName('button');
    if (!rep || checkoutButtonns.length > 1) {
      return;
    }
    return checkoutButtonns[0].innerText.trim() === 'Отправить Представителю' ? 'sendToRep' : 'checkout';
  };

  const cardIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M18 0H2C0.89543 0 0 0.89543 0 2V4V8V14C0 15.1046 0.89543 16 2 16H18C19.1046 16 20 15.1046 20 14V8V4V2C20 0.89543 19.1046 0 18 0ZM18 3V2H2V3H18ZM2 5V7H18V5H2ZM18 9H2V14H18V9ZM12 10H17V12H12V10ZM10 10H8V12H10V10Z" fill="#181818"/>
  </svg>`;

  const userIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5625 18H3.43817C2.73178 18 2.21015 17.303 2.47658 16.662C3.71277 13.698 6.61693 12 9.99985 12C13.3838 12 16.288 13.698 17.5241 16.662C17.7906 17.303 17.2689 18 16.5625 18ZM6 5.99998C6 3.79398 7.795 1.99998 10 1.99998C12.206 1.99998 14 3.79398 14 5.99998C14 8.20598 12.206 9.99998 10 9.99998C7.795 9.99998 6 8.20598 6 5.99998ZM13.837 10.673C15.456 9.39598 16.4002 7.33098 16.0532 5.06998C15.651 2.44698 13.4236 0.347977 10.7348 0.041977C7.02321 -0.381023 3.87507 2.44898 3.87507 5.99998C3.87507 7.88998 4.76929 9.57398 6.1637 10.673C3.10743 11.798 0.787164 14.277 0.044024 17.636C-0.225466 18.857 0.778997 20 2.05397 20H17.9457C19.2217 20 20.2262 18.857 19.9557 17.636C19.2136 14.277 16.8923 11.798 13.837 10.673Z" fill="#181818"/>
  </svg>`;
  //<button class="${id}__no-rep--send-btn ${id}__hide--desktop btn-full">\${Send your order to Avon REP}</button>
  //<button class="${id}__no-rep--paiddelivery-btn  btn-full">\${SEND WITH PAID DELIVERY}</button>
  const withoutRep = `

    <div class="${id}__no-rep">
        <div class="${id}__no-rep--headline ">Выберите удобный способ</div>

        <button ${
          disableBtn ? 'disabled' : ''
        } class="${id}__no-rep--paiddelivery-btn  btn-full">\${SEND WITH PAID DELIVERY}</button>
        <button ${disableBtn ? 'disabled' : ''} class="${id}__no-rep--whatsapp-btn  btn-full">\${SEND WITH WHATSAPP}</button>
        <button ${disableBtn ? 'disabled' : ''} class="${id}__no-rep--email-btn  btn-full">\${SEND VIA EMAIL}</button>
        <button ${disableBtn ? 'disabled' : ''} class="${id}__no-rep--copy-btn  btn-full">\${COPY LINK}</button>
        
    </div>  
    
    `;

  const withRep = () => {
    const renderOption = detectSingleBtnType();
    const htmlStr = `
    <div class="${id}__has-rep">
        <div class="${id}__has-rep--title">\${Order options}</div>
        <div class="${id}__has-rep--name">\${You are shopping with} <span>${repName}</span></div>
        
        <div class="${id}__checkout-option1 ${renderOption === 'sendToRep' ? `${id}__hide` : ''}">
            <label for="online"><input type="radio"
                    id="online"
                    name="checkoutmethod"
                    value="A"
                    checked="checked"
                    class="${renderOption === 'checkout' ? `${id}__hide-visibility` : ''}">${cardIcon} \${Checkout online}</label>
            <span>\${pay online now}</span>
            <span>\${Delivery from our trusted courier}</span>
        </div>
        <div class="${id}__checkout-option2 ${renderOption === 'checkout' ? `${id}__hide` : ''}">
            <label for="rep"><input type="radio"
                    id="rep"
                    name="checkoutmethod"
                    value="B"
                    ${renderOption === 'sendToRep' ? `checked` : ''}
                    class="${renderOption === 'sendToRep' ? `${id}__hide-visibility` : ''}" data-autoclick="${
      renderOption === 'sendToRep' ? `true` : ''
    }"> ${userIcon} \${Send order to rep}</label>
            <span>\${Pay when you receive the order}</span>
            <span>\${Delivery from your Avon rep}</span>
        </div>
        <button class="${id}__has-rep--continue-btn btn_continue btn-bordered" >\${CONTINUE SHOPPING}</button>
        <button class="${id}__has-rep--checkout-btn btn-full" data-click="online">\${CHECKOUT}</button>
    </div>`;
    return htmlStr;
  };
  const rep = !!PDP_MANAGER['API_DATA']['rep_id'] || repName ? withRep() : withoutRep;
  return rep;
};

export default renderOrderOptions;
