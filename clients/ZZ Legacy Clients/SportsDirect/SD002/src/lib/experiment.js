/**
 * SD002 - New Login
 * Josh Tyler
 * @author User Conversion
 */
import { emailValid, setup, amendTitle, storeEmail, fetchEmail, fillEmail, showError, removeErr } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
// Pull in FL034 / 15
import FL015 from './helpers/FL015';
import FL034 from './helpers/FL034';
import settings from './settings';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();

  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'SD002 Control', 'Control is active');
    return false;
  }

  events.send(settings.ID, `SD002 Variation ${settings.VARIATION} is Active`, 'Test is active');

  const addLoading = () => {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="SD002-first-loading loading-dots">
        <div class="dot one">&nbsp;</div>
        <div class="dot two">&nbsp;</div>
        <div class="dot three">&nbsp;</div>
      </div>
    `);
  };


  // Run test, add blank page with loader until elements have loaded.
  document.body.classList.add('SD002-loading');
  let checkWrap = document.querySelector('.container-fluid.ContentWrapper');
  if (!checkWrap) {
    checkWrap = document.querySelector('.ContentWrap .container-fluid');
  }

  addLoading();
  const pageLoader = document.querySelector('.SD002-first-loading');

  // Check original tests are not already active
  if (!document.body.classList.contains('FL015')) {
    if (settings.VARIATION === '3' || settings.VARIATION === '4') {
      FL015(true);
    } else {
      FL015();
    }
    
  }

  if (!document.body.classList.contains('FL034')) {
    FL034();
  }

  let floHides;
  let floShows;
  let guestCheckoutCopy = document.querySelector('.newCustomer .loginContainer');
  if (guestCheckoutCopy) {
    guestCheckoutCopy = guestCheckoutCopy.cloneNode(true);
  }

  // Save to local storage for use on the password reset confirmation page.
  if (guestCheckoutCopy) {
    window.localStorage.setItem('SD002-guestCheckout', guestCheckoutCopy.outerHTML);
  }


  const clickEvents = {
    addEvents() {
      
      const btnsContainer = cacheDom.get('.FL015-account-options');
      btnsContainer.addEventListener('click', (e) => {
        const input = document.querySelector('input[type="email"]');

        if (settings.VARIATION === '3' || settings.VARIATION === '4') {
          input.value = 'test@testing.test';
        }

        // Is email input empty?
        if (document.body.classList.contains('SD002-showerror') || !emailValid(input.value)) {
          showError(input);

          e.preventDefault();
          e.stopPropagation();
        } else {
          removeErr();
        }
      });

      // Existing customer login
      const existingCustomerEl = cacheDom.get('.CheckWrap .existingCustomer .ImgButWrap a.dnnPrimaryAction');
      // if (existingCustomerEl) {
      //   existingCustomerEl.addEventListener('click', () => {
      //     events.send(settings.ID, 'Click', 'Existing user clicked log in');
      //   });
      // }

      // Forgot pass (existing)
      const forgotPassEl = cacheDom.get('.ForgotPass a.ForgotPasswordLinkButton');
      // if (forgotPassEl) {
      //   forgotPassEl.addEventListener('click', () => {
      //     events.send(settings.ID, 'Click', 'Existing user, forgotten password');
      //   });
      // }

      // Continue as guest
      const guestBtn = document.querySelector('#dnn_ctr88149_Launch_btnGuestCustomer');
      // if(guestBtn) {
      //   guestBtn.addEventListener('click', (e) => {
      //     if(document.body.classList.contains('SD002-wrongPsw')) {
      //       events.send(settings.ID, 'Click', 'continue-guest-cta-incorrect-details');
      //     }
      //   });
      // }
    },
    init() {
      this.addEvents();
    }
  }
  

  // First page.
  pollerLite(['.existingCustomer h1'], () => {
    const welcomeTitle = cacheDom.get('.existingCustomer h1');
    // const subtitle = cacheDom.get('.existingCustomer .SectionTops > h2');
    const continueBtns = cacheDom.getAll('.CheckWrap .ImgButWrap a.dnnPrimaryAction');
    const newAccountEl = cacheDom.get('.FL015-account-options');
    const emailInputs = cacheDom.getAll('.existingCustomer input[type="email"]');
    let backRef = cacheDom.get('#dnn_ContentPane');
    const yesNoButtons = cacheDom.getAll('button.FL015-button');
    
    // FL015 has been added.
    // Add email input
    welcomeTitle.insertAdjacentHTML('afterend', `
      <div class="SD002-email">
        <input autocomplete="off" type="email" name="email" placeholder="ENTER EMAIL ADDRESS"/>
      </div>
    `);

    // Store email value on type.
    const emailInput = cacheDom.get('.SD002-email', true);
    storeEmail(emailInput);

    // Already have email stored?
    const emailVal = fetchEmail();
    if (emailVal) {
      const input = document.querySelector('input[type="email"]');
      if (input) {
        input.value = emailVal;

        if(emailValid(emailVal)) {
          removeErr();
          document.body.classList.add('SD002-hasInput');
        } else {
          document.body.classList.add('SD002-showerror');
          showError(input);
        }
      }
    }


    // Move back ref if mobile
    if (window.innerWidth < 479) {
      backRef = cacheDom.get('.row.CustomerGroups');
    }


    // Change continue buttons text
    for (let i = 0; continueBtns.length > i; i += 1) {
      amendTitle(continueBtns[i], 'Login');
    }

    // On click of email inputs, clear placeholders.
    const formInputs = cacheDom.getAll('.ContentWrap input');
    for (let i = 0; formInputs.length > i; i += 1) {
      if (formInputs[i].getAttribute('placeholder')) {
        const currentPlaceholder = formInputs[i].getAttribute('placeholder');
        formInputs[i].setAttribute('onfocus', 'this.placeholder=""');
        formInputs[i].setAttribute('onblur', `this.placeholder="${currentPlaceholder}"`);
      }
    }

    // Add back element
    if (!document.querySelector('.SD002-back')) {
      backRef.insertAdjacentHTML('afterbegin', `
        <div class="SD002-back">
          <p>back</p>
        </div>
      `);
    }


    // Guest checkout for 'No' & 'Not sure'
    if (settings.VARIATION !== '3') {
      const guestCheckoutBtn = document.querySelector('a#dnn_ctr88149_Launch_btnGuestCustomer');
      for (let i = 1; yesNoButtons.length > i; i += 1) {
        // Skip 'Yes'
        yesNoButtons[i].addEventListener('click', (e) => {
          if (document.body.classList.contains('SD002-showerror')) {
            
  
            return false;
          }
          document.body.classList.add('SD002-guestCheckout');
          // Add loader.
          newAccountEl.insertAdjacentHTML('beforebegin', `
            <div class="SD002-guest-loading">
              <p>Checking out as a guest.</p>
              <div class="UC_loading-dots"><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></div>
            </div>
          `);
          guestCheckoutBtn.click();
          
        });
  
        const $loader = document.querySelector('.SD002-guest-loading');
        if ($loader && document.querySelector('.FL015-account-options')) {
          setTimeout(function(){
            $loader.innerHTML = ''
            $loader.parentNode.removeChild($loader);
          }, 1500);
        }
        // if ($loader && document.querySelector('.FL015-account-options')) {
        //   $loader.innerHTML = '';
        // }
      }
    }

    
    // Click events
    pollerLite(['.FL015-account-options'], () => {
      const yesNoButtons = document.querySelectorAll('.FL015-account-options button.FL015-button');

      // Back click event, Reset to default
      const backBtn = cacheDom.get('.SD002-back');
      if (backBtn) {
        // Hide it on this page.
        backBtn.addEventListener('click', () => {
          const loginErrMessage = document.querySelector('.dnnFormValidationSummary');
          if (loginErrMessage) {
            loginErrMessage.style.display = 'none';
          }
          document.body.classList.remove('FL015-yesUser');
          document.body.classList.remove('SD002-passReset');
          document.body.classList.remove('SD002-wrongPsw');
          document.body.classList.remove('FL015-guestUser');
          for (let i = 0; yesNoButtons.length > i; i += 1) {
            yesNoButtons[i].classList.remove('FL015-active');
            const shownSection = document.querySelector('.FL015-show');
            if (shownSection) {
              shownSection.classList.remove('FL015-show');
            }
          }

          floHides = cacheDom.getAll('.FL034-hide');
          // FL034 shows
          if (floShows) {
            for (let i = 0; floShows.length > i; i += 1) {
              floShows[i].classList.remove('FL034-show');
            }
          }
          
          // FL034 hides
          if (floHides) {
            for (let i = 0; floHides.length > i; i += 1) {
              floHides[i].classList.remove('FL034-hide');
            }
          }

          const shownPanels = document.querySelectorAll('.FL015-show');
          // FL015 shows
          if (shownPanels) {
            for (let i = 0; shownPanels.length > i; i += 1) {
              shownPanels[i].classList.remove('FL015-show');
            }
          }
        });
      }
      // Remove loader
      if (pageLoader && document.querySelector('.FL015-account-options')) {
        setTimeout(function(){
          // If V3, change button text to just 'Yes', 'No'..
          if (settings.VARIATION === '3') {
            yesNoButtons[0].textContent = 'Yes';
            yesNoButtons[1].textContent = 'No';
          }

          pageLoader.innerHTML = ''
          document.body.classList.remove('SD002-loading');
  
        }, 1500);
      }
      clickEvents.init();
    });

    // If SS contains 'SD002-change' then change 'Not sure' to 'Guest'
    const hasSentPswReset = window.localStorage.getItem('SD002-change');
    if (hasSentPswReset) {
      const notSureBtn = cacheDom.get('.FL015-account-options button[data-choice="notsure"]');
      if (notSureBtn) {
        notSureBtn.textContent = 'Guest Checkout';
      }
    }

    // show cart info
    if (settings.VARIATION === '3' || settings.VARIATION === '4') {
    
      // First page? Pull in cart info.
      const fetchCartInfo = (cb) => {
        const request = new XMLHttpRequest();
        request.open('GET', 'https://www.sportsdirect.com/Cart', true);

        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            // Success!
            const div = document.createElement('div');
            const resp = request.responseText;
            div.innerHTML = resp;
            const info = div.querySelector('.col-xs-12.OrderSumm');
            const products = div.querySelectorAll('.AspNet-GridView table tr[class*="AspNet-GridView"]');
            const firstFiveProducts = [].slice.call(products, 1, 6);
            const totalEl = div.querySelector('#BasketSummarySubtotalValue');
            const totalAmt = totalEl.textContent;

            const data = {
              info,
              firstFiveProducts,
              totalAmt,
              totalProducts: products.length,
              moreThanFive: products.length > 6 ? true : false,
            }
            cb(data);
          } else {
            // We reached our target server, but it returned an error
            console.error('Could not fetch cart info');
          }
        };

        request.onerror = function() {
          // There was a connection error of some sort
        };

        request.send();
      }

      fetchCartInfo((infoData) => {
        const { firstFiveProducts } = infoData;
        const { moreThanFive } = infoData;
        const { totalProducts } = infoData;
        let productArr = firstFiveProducts;
        console.log(productArr);
        const accountOptionsContainer = document.querySelector('.FL015-account-options');
        if (accountOptionsContainer && infoData) {
          accountOptionsContainer.insertAdjacentHTML('beforeend', `
            ${settings.VARIATION === '4' ? '<p>*You can create an account later on.</p>' : ''}
            <div class="SD002-cartInfo row">
              <p class="col-xs-12">ORDER SUMMARY</p>
              ${settings.VARIATION === '3' ? `
                <div class="col-xs-6 text-left SD002-total">${totalProducts > 1 ? `${totalProducts} items` : `${totalProducts} item`}</div>
                <div class="col-xs-6 text-right SD002-total">${infoData.totalAmt}</div>
              ` : ''}
              ${settings.VARIATION === '4' ? `<div class="col-xs-12 tableOuter">
                <table class="SD002-prodList">
                ${productArr ? productArr.map((prodEl, index) => {
                  return(`
                  <tr>
                    ${prodEl.children[0] ? prodEl.children[0].outerHTML : ''}
                    ${prodEl.children[1] ? prodEl.children[1].outerHTML : ''}
                    ${prodEl.children[3] ? prodEl.children[3].outerHTML : ''}
                    ${prodEl.children[4] ? prodEl.children[4].outerHTML : ''}
                  </tr>
                `)
                }).join(' ') : ''}
              </table></div>` : ''}
              ${infoData.info ? infoData.info.innerHTML : ''}

              
            </div>
          `);
        }
      });
    }
  });


  // Password reset
  pollerLite(['#dnn_ctr54535_PasswordReset_PasswordResetDiv'], () => {

    const emailInput = cacheDom.get('.userInputwrap input[type="email"]');
    const storedEmail = fetchEmail();
    if (emailInput && storedEmail) {
      emailInput.value = storedEmail;
    }
    floHides = cacheDom.getAll('.FL034-hide');

    // Make cancel button go back to first page.
    const cancelBtn = cacheDom.get('a#dnn_ctr54535_PasswordReset_cmdCancelSendPassword');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'https://www.flannels.com/checkout/launch';
      });
    }

    // Remove loader
    if (pageLoader) {
      setTimeout(function(){
        pageLoader.innerHTML = ''
        document.body.classList.remove('SD002-loading');
      }, 1500);
    }
  });

  // Poll for password reset confirmation
  pollerLite(['.DNNModuleContent.ModPasswordResetC .dnnFormMessage.dnnFormSuccess span', '.Login .innerPass'], () => {
    const confirmationMessage = cacheDom.get('.DNNModuleContent.ModPasswordResetC .dnnFormMessage.dnnFormSuccess span');
    const wholeLoginArea = cacheDom.get('.Login .innerPass');
    document.body.classList.add('SD002-passReset');
    if (confirmationMessage) {
      confirmationMessage.innerHTML = `
        <p class="SD002-confirm"><span>Great!</span> We’ve just sent you a link to reset your password to the email address.<p> 
        <p>This should arrive within the next 60 seconds. If it does not, you can always <a href="https://www.flannels.com/checkout/launch" class="SD002-contGuest">continue as a guest</a>.</p>
      `;
    }

    floShows = cacheDom.getAll('.FL034-show');
    floHides = cacheDom.getAll('.FL034-hide');

    // Add to SS to change message on first page.
    window.localStorage.setItem('SD002-change', true);
  });

  
  // Poll for new guest checkout link
  pollerLite(['#FL034-guest'], () => {
    floHides = cacheDom.getAll('.FL034-hide');
    const newLogoutEl = cacheDom.get('.CheckWrap .newCustomer .ImgButWrap a.dnnPrimaryAction');
    amendTitle(newLogoutEl, 'CHECKOUT AS GUEST');

  });

  pollerLite(['input#txtGuestCustomerEmailAddress'], () => {
    fillEmail();
  });


  // Already have email stored? As a backup.
  const emailVal = fetchEmail();
  if (emailVal) {
    const input = document.querySelector('input[type="email"]');
    if (input) {
      input.value = emailVal;

      if(emailValid(emailVal)) {
        removeErr();
        document.body.classList.add('SD002-hasInput');
      } else {
        document.body.classList.add('SD002-showerror');
        showError(input);
      }
    }
  }

  
  // V3
  if (settings.VARIATION === '3' || settings.VARIATION === '4') {
    
    // Login > Continue
    pollerLite(['.newCustomer .loginContainer .NewCustWrap .ImgButWrap a.dnnPrimaryAction'], () => {
      setTimeout(() => {
        const loginBtn = document.querySelector('.newCustomer .loginContainer .NewCustWrap .ImgButWrap a.dnnPrimaryAction');

        if (loginBtn) {
          loginBtn.textContent = 'Continue';
        }
      }, 500);
    });

    pollerLite(['.SD002-email input[type="email"]'], () => {
      const emailInput = document.querySelector('.SD002-email input[type="email"]');
      if (emailInput) {
        emailInput.setAttribute('placeholder', 'ENTER EMAIL ADDRESS TO CONTINUE');
      }
    });
    pollerLite(['section.existingCustomer .FL034-error > p'], () => {
      const incorrectPswMessage = document.querySelector('.SD002.SD002-wrongPsw section.existingCustomer .FL034-error > p');
      const loginBtn = document.querySelector('.newCustomer .loginContainer .NewCustWrap .ImgButWrap a.dnnPrimaryAction');

      if (incorrectPswMessage) {
        incorrectPswMessage.textContent = '';
        incorrectPswMessage.innerHTML = '';
        incorrectPswMessage.insertAdjacentHTML('beforebegin', `
          <h2>Welcome Back</h2>
          <p>
            <span class="SD002-red">We couldn\’t seem to find a match for your email or password.</span>
            <span class="SD002-red">We recommend just checking out as a guest if you are in a hurry. You can still use the same email address. No password required</span>
          </p>
          
          <a class="dnnPrimaryAction" id="SD002-GuestBtn" href="#">CONTINUE AS GUEST</a>

          <hr />

          <h2>Try Again</h2>
        `);
      }

      // If v3 add email to guest email input
      if (settings.VARIATION === '3' || settings.VARIATION === '4') {
        const guestInput = document.querySelector('input#txtGuestCustomerEmailAddress');
        const tryAgainEmailInput = document.querySelector('.innerBorder.FL034-show input[type="email"]');
        if (guestInput && tryAgainEmailInput) {
          if (!tryAgainEmailInput.value) {
            guestInput.value = 'test@test.com'
          } else {
            guestInput.value = tryAgainEmailInput.value;
          }
        }
      }

      // Add event to new guest btn
      const newGuestBtn = document.querySelector('#SD002-GuestBtn');

      if (newGuestBtn) {
        newGuestBtn.addEventListener('click', (e) => {
          e.preventDefault();
          loginBtn.click();
        });
      }
      
      const newGuestTextRef = document.querySelector('.SD002.SD002-wrongPsw.FL015 .CustomerGroups .newCustomer .innerBorder');
      if (newGuestTextRef) {
        newGuestTextRef.insertAdjacentHTML('afterbegin', `
          <div class="SD002-guestMessage">
            <p>You can always use our guest checkout at any point if you are in a hurry!</p>
          </div>
        `)
      }
    });
    
  }
  
};

export default activate;
