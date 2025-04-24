/**
 * FL063 - New Login
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

  // Control
  if (settings.VARIATION === '2') {
    events.send(settings.ID, `${settings.ID} Control`, 'Control is active');

    const ogLogin = cacheDom.get('a#dnn_ctr88149_Launch_registerLogin_btnRegisteredCustomer');
    const ogGuest = cacheDom.get('a#dnn_ctr88149_Launch_btnGuestCustomer');
    if (ogLogin) {
      ogLogin.addEventListener('click', () => {
        events.send(settings.ID, 'Click', `${settings.ID} Control - User clicked login`);
      });
    }
    if (ogGuest) {
      ogGuest.addEventListener('click', () => {
        events.send(settings.ID, 'Click', `${settings.ID} Control - User clicked guest`);
      });
    }

    const loginErrorMsg = document.querySelector('#dnn_ctr88149_Launch_registerLogin_lblLoginErrorMessage');
    if(loginErrorMsg && loginErrorMsg.innerHTML.trim()) {
      events.send(settings.ID, 'Click', `${settings.ID} Control Acc/Password Incorrect`);
    }

    return false;
  }

  // Run test, add blank page with loader until elements have loaded.
  document.body.classList.add('FL063-loading');
  let checkWrap = document.querySelector('.container-fluid.ContentWrapper');
  if (!checkWrap) {
    checkWrap = document.querySelector('.ContentWrap .container-fluid');
  }
  // Add loader.
  checkWrap.insertAdjacentHTML('afterbegin', `
    <div class="FL063-first-loading">
      <div class="UC_loading-dots"><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></div>
    </div>
  `);
  const pageLoader = document.querySelector('.FL063-first-loading');

  // Check original tests are not already active
  if (!document.body.classList.contains('FL015')) {
    if (settings.VARIATION === '3') {
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
    window.localStorage.setItem('FL063-guestCheckout', guestCheckoutCopy.outerHTML);
  }


  const clickEvents = {
    addEvents() {
      events.send(settings.ID, `${settings.ID} Variation ${settings.VARIATION} Active`, 'Test is active');
      const btnsContainer = cacheDom.get('.FL015-account-options');
      btnsContainer.addEventListener('click', (e) => {
        const input = document.querySelector('input[type="email"]');

        if (settings.VARIATION === '3') {
          input.value = 'test@testing.test';
        }

        // Is email input empty?
        if (document.body.classList.contains('FL063-showerror') || !emailValid(input.value)) {
          showError(input);

          e.preventDefault();
          e.stopPropagation();
        } else {
          removeErr();
        }
        if (e.target.classList.contains('FL015-button')) {
          const btn = e.target;
          if (btn.getAttribute('data-choice') === 'yes') {
            events.send(settings.ID, 'Click', 'User clicked on Yes');
          }
          if (btn.getAttribute('data-choice') === 'no') {
            events.send(settings.ID, 'Click', 'User clicked on No');
          }
          if (btn.getAttribute('data-choice') === 'notsure') {
            events.send(settings.ID, 'Click', 'User clicked on Not Sure');
          }
        }
      });

      // Existing customer login
      const existingCustomerEl = cacheDom.get('.CheckWrap .existingCustomer .ImgButWrap a.dnnPrimaryAction');
      if (existingCustomerEl) {
        existingCustomerEl.addEventListener('click', () => {
          events.send(settings.ID, 'Click', 'Existing user clicked log in');
        });
      }

      // Forgot pass (existing)
      const forgotPassEl = cacheDom.get('.ForgotPass a.ForgotPasswordLinkButton');
      if (forgotPassEl) {
        forgotPassEl.addEventListener('click', () => {
          events.send(settings.ID, 'Click', 'Existing user, forgotten password');
        });
      }

      // Continue as guest
      const guestBtn = document.querySelector('#dnn_ctr88149_Launch_btnGuestCustomer');
      if(guestBtn) {
        guestBtn.addEventListener('click', (e) => {
          if(document.body.classList.contains('FL063-wrongPsw')) {
            events.send(settings.ID, 'Click', 'continue-guest-cta-incorrect-details');
          }
        });
      }
    },
    init() {
      this.addEvents();
    }
  }
  

  // First page.
  pollerLite(['.existingCustomer h1', '.existingCustomer .SectionTops > h2'], () => {
    // console.log('First Page!');
    const welcomeTitle = cacheDom.get('.existingCustomer h1');
    const subtitle = cacheDom.get('.existingCustomer .SectionTops > h2');
    const continueBtns = cacheDom.getAll('.CheckWrap .ImgButWrap a.dnnPrimaryAction');
    const newAccountEl = cacheDom.get('.FL015-account-options');
    const emailInputs = cacheDom.getAll('.existingCustomer input[type="email"]');
    const yesNoButtons = cacheDom.getAll('button.FL015-button');
    const backRef = cacheDom.get('#dnn_ContentPane');

    // FL015 has been added.
    // Add email input
    welcomeTitle.insertAdjacentHTML('afterend', `
      <div class="FL063-email">
        <input autocomplete="off" type="email" name="email" placeholder="ENTER EMAIL ADDRESS"/>
      </div>
    `);

    // Store email value on type.
    const emailInput = cacheDom.get('.FL063-email', true);
    storeEmail(emailInput);

    // Already have email stored?
    const emailVal = fetchEmail();
    if (emailVal) {
      const input = document.querySelector('input[type="email"]');
      if (input) {
        input.value = emailVal;

        if(emailValid(emailVal)) {
          removeErr();
          document.body.classList.add('FL063-hasInput');
        } else {
          document.body.classList.add('FL063-showerror');
          showError(input);
        }
      }
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
    if (!document.querySelector('.FL063-back')) {
      backRef.insertAdjacentHTML('afterbegin', `
        <div class="FL063-back">
          <p>&larr; back</p>
        </div>
      `);
    }

    // Back click event, Reset to default
    const backBtn = cacheDom.get('.FL063-back');
    if (backBtn) {
      // Hide it on this page.
      backBtn.addEventListener('click', () => {
        document.body.classList.remove('FL015-yesUser');
        document.body.classList.remove('FL063-passReset');
        document.body.classList.remove('FL063-wrongPsw');
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
      });
    }

    // Guest checkout for 'No' & 'Not sure'
    if (settings.VARIATION !== '3') {
      const guestCheckoutBtn = document.querySelector('a#dnn_ctr88149_Launch_btnGuestCustomer');
      for (let i = 1; yesNoButtons.length > i; i += 1) {
        // Skip 'Yes'
        yesNoButtons[i].addEventListener('click', (e) => {
          if (document.body.classList.contains('FL063-showerror')) {
            
  
            return false;
          }
          document.body.classList.add('FL063-guestCheckout');
          // Add loader.
          newAccountEl.insertAdjacentHTML('beforebegin', `
            <div class="FL063-guest-loading">
              <p>Checking out as a guest.</p>
              <div class="UC_loading-dots"><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></div>
            </div>
          `);
          guestCheckoutBtn.click();
          
        });
  
        const $loader = document.querySelector('.FL063-guest-loading');
        if ($loader && document.querySelector('.FL015-account-options')) {
          setTimeout(function(){
            $loader.innerHTML = ''
          }, 1500);
        }
        // if ($loader && document.querySelector('.FL015-account-options')) {
        //   $loader.innerHTML = '';
        // }
      }
    }

    // Remove loader
    if (pageLoader && document.querySelector('.FL015-account-options')) {
      setTimeout(function(){
        pageLoader.innerHTML = ''
        document.body.classList.remove('FL063-loading');

      }, 1500);
    }

    // Click events
    clickEvents.init();

    // If SS contains 'FL063-change' then change 'Not sure' to 'Guest'
    const hasSentPswReset = window.localStorage.getItem('FL063-change');
    if (hasSentPswReset) {
      const notSureBtn = cacheDom.get('.FL015-account-options button[data-choice="notsure"]');
      if (notSureBtn) {
        notSureBtn.textContent = 'Guest Checkout';
      }
    }

    // show cart info
    if (settings.VARIATION === '3') {
    
      // First page? Pull in cart info.
      const fetchCartInfo = (cb) => {
        const request = new XMLHttpRequest();
        request.open('GET', 'https://www.flannels.com/Cart', true);

        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            // Success!
            const div = document.createElement('div');
            const resp = request.responseText;
            div.innerHTML = resp;

            const info = div.querySelector('.col-xs-12.OrderSumm');
            cb(info);
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

      fetchCartInfo((infoEl) => {
        const accountOptionsContainer = document.querySelector('.FL015-account-options');
        if (accountOptionsContainer && infoEl) {
          accountOptionsContainer.insertAdjacentHTML('beforeend', `
            <div class="FL063-cartInfo">
              <p>ORDER SUMMARY</p>
              ${infoEl.innerHTML}
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
        document.body.classList.remove('FL063-loading');
      }, 1500);
    }
  });

  // Poll for password reset confirmation
  pollerLite(['.DNNModuleContent.ModPasswordResetC .dnnFormMessage.dnnFormSuccess span', '.Login .innerPass'], () => {
    const confirmationMessage = cacheDom.get('.DNNModuleContent.ModPasswordResetC .dnnFormMessage.dnnFormSuccess span');
    const wholeLoginArea = cacheDom.get('.Login .innerPass');
    document.body.classList.add('FL063-passReset');
    if (confirmationMessage) {
      confirmationMessage.innerHTML = `
        <p class="FL063-confirm"><span>Great!</span> We’ve just sent you a link to reset your password to the email address.<p> 
        <p>This should arrive within the next 60 seconds. If it does not, you can always <a href="https://www.flannels.com/checkout/launch" class="FL063-contGuest">continue as a guest</a>.</p>
      `;
    }

    floShows = cacheDom.getAll('.FL034-show');
    floHides = cacheDom.getAll('.FL034-hide');

    // Add to SS to change message on first page.
    window.localStorage.setItem('FL063-change', true);
  });

  
  // Poll for new guest checkout link
  pollerLite(['#FL034-guest'], () => {
    floHides = cacheDom.getAll('.FL034-hide');
    const newLogoutEl = cacheDom.get('.CheckWrap .newCustomer .ImgButWrap a.dnnPrimaryAction');
    amendTitle(newLogoutEl, 'CHECKOUT AS GUEST');
    // Add an extra button 'Try Again' ***** Not in use due to error landing on the same screen.
    // const ref = cacheDom.get('.FL063.FL063-wrongPsw.FL015 .CustomerGroups .newCustomer');
    // if (ref) {
    //   if (!document.querySelector('.FL063-tryAgain')) {
    //     ref.insertAdjacentHTML('afterend', `
    //       <section class="newCustomer col-xs-12 col-sm-6 FL034-show">
    //         <div class="FL063-tryAgain innerBorder">
    //           <span class="ImgButWrap">
    //             <a href="" class="dnnPrimaryAction">Try Again</a>
    //           </span>
    //         </div>
    //       </section>
    //     `);
    //   }
    //   const addedBtn = document.querySelector('.FL063-tryAgain a');
    //   if (addedBtn) {
    //     addedBtn.addEventListener('click', () => {
    //       const backBtn = document.querySelector('.FL063-back');
    //       if (backBtn) {
    //         backBtn.click();
    //       }
    //     });
    //   }
    // }
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
        document.body.classList.add('FL063-hasInput');
      } else {
        document.body.classList.add('FL063-showerror');
        showError(input);
      }
    }
  }

  
  // V3
  if (settings.VARIATION === '3') {
    
    // Login > Continue
    pollerLite(['.newCustomer .loginContainer .NewCustWrap .ImgButWrap a.dnnPrimaryAction'], () => {
      setTimeout(() => {
        const loginBtn = document.querySelector('.newCustomer .loginContainer .NewCustWrap .ImgButWrap a.dnnPrimaryAction');

        if (loginBtn) {
          loginBtn.textContent = 'Continue';
        }
      }, 500);
    });

    pollerLite(['.FL063-email input[type="email"]'], () => {
      const emailInput = document.querySelector('.FL063-email input[type="email"]');
      if (emailInput) {
        emailInput.setAttribute('placeholder', 'ENTER EMAIL ADDRESS TO CONTINUE');
      }
    });
    pollerLite(['section.existingCustomer .FL034-error > p'], () => {
      const incorrectPswMessage = document.querySelector('.FL063.FL063-wrongPsw section.existingCustomer .FL034-error > p');
      const loginBtn = document.querySelector('.newCustomer .loginContainer .NewCustWrap .ImgButWrap a.dnnPrimaryAction');

      if (incorrectPswMessage) {
        incorrectPswMessage.textContent = '';
        incorrectPswMessage.innerHTML = '';
        incorrectPswMessage.insertAdjacentHTML('beforebegin', `
          <p>
            <span class="FL063-red">We couldn\’t seem to find a match for your email or password.</span>
            <span class="FL063-red">We recommend just checking out as a guest if you are in a hurry. You can still use the same email address. No password required</span>
          </p>
          
          <a class="dnnPrimaryAction" id="FL063-GuestBtn" href="#">CONTINUE AS GUEST</a>

          <hr />

          <h2>Try Again</h2>
        `);
      }

      // If v3 add email to guest email input
      if (settings.VARIATION === '3') {
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
      const newGuestBtn = document.querySelector('#FL063-GuestBtn');
      if (newGuestBtn) {
        newGuestBtn.addEventListener('click', (e) => {
          e.preventDefault();
          loginBtn.click();
        });
      }
      
      const newGuestTextRef = document.querySelector('.FL063.FL063-wrongPsw.FL015 .CustomerGroups .newCustomer .innerBorder');
      if (newGuestTextRef) {
        newGuestTextRef.insertAdjacentHTML('afterbegin', `
          <div class="FL063-guestMessage">
            <p>You can always use our guest checkout at any point if you are in a hurry!</p>
          </div>
        `)
      }
    });
  }

  
};

export default activate;
