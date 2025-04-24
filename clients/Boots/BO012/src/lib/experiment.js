/**
 * BO012 - Email Promotion
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { observer, setCookie, getCookie, pollerLite } from '../../../../../lib/utils';

export default () => {
  setup();

  let run = false;

  if (getCookie('OptanonAlertBoxClosed')) {
    run = true;
  }


  const runFunctions = () => {
    let signUpEl = document.querySelector('#cu_newsletter_signup');

    // If no signUpEl .e.g on PLP/PDP, add it.
    if (!signUpEl && !getCookie('BO012-closed')) {
      const page = document.querySelector('#page');
      page.insertAdjacentHTML('beforeend', `
      <div>
      <style type="text/css">
      #cu_newsletter_signup {
      background: #CAE0F5;
      padding: 20px;
      }
      #cu_newsletter_signup .container {
      background: white;
      box-sizing: border-box;
      width: 100%;
      max-width: 660px;
      margin: 0 auto;
      padding: 20px 20px;
      text-align: center;
      border-radius: 0.25rem;
      font-size: 1rem;
      line-height: 1.25rem;
      position: relative;
      }
      #cu_newsletter_signup .container .success {
      display: none;
      position: absolute;
      background: white;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      padding: 65px 1rem 1rem 1rem;
      border-radius: 0.25rem;
      }
      #cu_newsletter_signup .container .error {
      display: none;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: white;
      padding: 70px 1rem 1rem 1rem;
      border-radius: 0.25rem;
      }
      #cu_newsletter_signup .container .error a {
      text-decoration: underline;
      }
      #cu_newsletter_signup .container .spinnerContainer {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #fff;
      background: rgba(255, 255, 255, 0.9);
      display: none;
      }
      #cu_newsletter_signup .container .spinnerContainer img {
      margin: 80px auto 0 auto;
      display: block;
      }
      #cu_newsletter_signup .container h4 {
      margin: 0 0 1rem 0;
      padding: 0;
      line-height: 1.25rem;
      font-size: 1.25rem;
      font-family:F37 Ginger Bold, "F37 Ginger Bold", Tahoma, Arial, sans-serif;
      }
      #cu_newsletter_signup .container form {
      margin: 1rem 0;
      vertical-align: text-top;
      }
      #cu_newsletter_signup .container form input {
      border: 1px solid #aaa;
      outline: none;
      margin: 0;
      margin-right: 1rem;
      padding: 0.5rem;
      border-radius: 0.25rem;
      box-sizing: border-box;
      display: inline-block;
      height: 38px;
      width: 300px;
      vertical-align: text-top;
      color: #4c4c4c;
      }
      #cu_newsletter_signup .container form button.btn {
      box-sizing: border-box;
      margin: 0;
      padding: 0 1rem;
      border: 1px solid #aaa;
      border-radius: 0.25rem;
      background: #004490;
      color: white;
      font-family: "F37 Ginger", tahoma, arial, sans-serif;
      font-weight: bold;
      display: inline-block;
      height: 38px;
      line-height: 38px;
      font-size: 1rem;
      vertical-align: text-top;
      }
      #cu_newsletter_signup .container p.footer {
      font-size: 0.75rem;
      margin: 0;
      padding: 0;
      color: #333;
      }
      #cu_newsletter_signup .container p.footer a {
      text-decoration: underline;
      }
      @media (max-width: 616px) {
      #cu_newsletter_signup .container form input {
      display: block;
      width: 100%;
      margin-bottom: 1rem;
      }
      #cu_newsletter_signup .container form a.btn {
      display: block;
      }
      }
      /*# sourceMappingURL=newsletter.css.map */
      </style>
      <div id="cu_newsletter_signup" class="BO-fix">
          <div class="BO012-close">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkBAEJLRrepKqLAAABl0lEQVRo3sXZPUoDURSG4RfrlFlMKgOKIAQsXJwi7kCzCi0lojvQRlJqCo1CuBYGzQxzZ+7POZ+pMmneZ8Jk5hwCI8555pYJyteUB1bMGcMlgUDgnSNZfsZ6W72C5fatjvCXD7zC4vdAQ9jNBxZwyJeQ0Myv2e/6cOaWP+Zjp/TJSczlQ4jmNYTevD9hMO9LSMr7EZLzPoSsvD0hO29LKMrbEYrzNoSqfD2hOl9HMMmXE8zyZQTTfD7BPJ9HcMmnE9zyaQTX/DDBPd9PkOTjBFm+myDNA5y29gjVSB/9FqRn30cQ5rsIxfm9QsCG0DgObJTn37zypRdgLP9vv4G1dLmn666nW+6J3XRlhPhNV0Lov+e7E4YfOa6EtCeeGyH9getCyHvemxPyxw1TQtm0Y0YoH7ZMCHWzXjWhftSsIthMusUEu0G7iGA752cT7NeMLILPlpNM8Fuykgi+O94gwX/F7CVoNtwoQbdgdxKm0gW7vdxP4FG82zQJN7CS5tuEJ5iL803CGYy55o37nz9RZa8D7njhgtE30Fx6j9z0yp4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDQtMDFUMDk6NDU6MjYrMDA6MDC7DHroAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA0LTAxVDA5OjQ1OjI2KzAwOjAwylHCVAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=" alt="close">
          </div>
        
      <div class="container">
      <div class="success">
      <h4>Thanks you've been added to our email list</h4>
      <p class="footer">
      You can unsubscribe at any time. See our
      <a href="/privacypolicy" target="_blank">privacy policy</a>
      for more info on how we use your data.
      </p>
      </div>
      <div class="error">
      There was a problem submitting your details.<br>
      <br>
      <a id="cu_newsletter_tryAgain" class="btn">Try Again</a>
      </div>
      <div class="spinnerContainer">
      <img src="https://www.boots.com/wcsstore/eBootsStorefrontAssetStore/images/boots/boots_loader_spinner.gif" alt="">
      </div>
      <h4>Let's stay in touch</h4>
      <p>
      Receive the latest guidance from our healthcare professionals, updates on our delivery services &amp; store opening times, &amp; information on the latest products
      </p>
      <form action="javascript:cuNewsletterSignup()" id="cu_newsletter_signup_form">
      <input type="email" name="cu_newsletter_signup_email" id="cu_newsletter_signup_email" placeholder="Enter email address" data-validation="required" required="" pattern="[a-zA-Z0-9_\.\-]+([.][a-zA-Z0-9_\.\-]+)*@[a-zA-Z0-9_\.\-]+([.][a-zA-Z0-9_\.\-]+)*[.][a-zA-Z\.\-]{1,5}" aria-label="Enter email address" style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAfBJREFUWAntVk1OwkAUZkoDKza4Utm61iP0AqyIDXahN2BjwiHYGU+gizap4QDuegWN7lyCbMSlCQjU7yO0TOlAi6GwgJc0fT/fzPfmzet0crmD7HsFBAvQbrcrw+Gw5fu+AfOYvgylJ4TwCoVCs1ardYTruqfj8fgV5OUMSVVT93VdP9dAzpVvm5wJHZFbg2LQ2pEYOlZ/oiDvwNcsFoseY4PBwMCrhaeCJyKWZU37KOJcYdi27QdhcuuBIb073BvTNL8ln4NeeR6NRi/wxZKQcGurQs5oNhqLshzVTMBewW/LMU3TTNlO0ieTiStjYhUIyi6DAp0xbEdgTt+LE0aCKQw24U4llsCs4ZRJrYopB6RwqnpA1YQ5NGFZ1YQ41Z5S8IQQdP5laEBRJcD4Vj5DEsW2gE6s6g3d/YP/g+BDnT7GNi2qCjTwGd6riBzHaaCEd3Js01vwCPIbmWBRx1nwAN/1ov+/drgFWIlfKpVukyYihtgkXNp4mABK+1GtVr+SBhJDbBIubVw+Cd/TDgKO2DPiN3YUo6y/nDCNEIsqTKH1en2tcwA9FKEItyDi3aIh8Gl1sRrVnSDzNFDJT1bAy5xpOYGn5fP5JuL95ZjMIn1ya7j5dPGfv0A5eAnpZUY3n5jXcoec5J67D9q+VuAPM47D3XaSeL4AAAAASUVORK5CYII=&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;">
      <!-- <a id="cu_newsletter_signup_button" class="btn">Sign up</a>-->
      <button type="submit" id="cu_newsletter_signup_button" class="btn">Sign up</button>
      </form>
      <p class="footer">
      You can unsubscribe at any time. See our
      <a href="/privacypolicy" target="_blank">privacy policy</a>
      for more info on how we use your data.
      </p>
      </div>
      </div>
      
      </div>
      `);


      // Run site functions
      let $ = null;
      $ = window.$ || window.jQuery;

      (function () {
        $(document).ready(function () {
        var $form = $("#cu_newsletter_signup_form");
        var $email = $("#cu_newsletter_signup_email");
        $form.submit(function (e) {
        e.preventDefault();
        // ajax call
        $(".spinnerContainer").show();
        var theURL = "https://x.email.boots.com/ats/post.aspx";
        // theURL = '';
        $.ajax({
        url: theURL,
        method: "GET",
        async: false,
        crossDomain: true,
        data: {
        "cr": "1043",
        "fm": "64",
        "s_list_name": "STANDARD SIGN-UP",
        "s_country": "UK",
        "s_email_address": $email.val(),
        }
        })
        .done(function (msg) {
        // console.log("msg", msg);
        $(".success").css({"display": "block"});
        })
        .fail(function (jqXHR, textStatus) {
        console.log("error", jqXHR);
        console.log("error text", textStatus);
        $(".error").css({"display": "block"});
        })
        .always(function () {
        // console.log("complete");
        $(".spinnerContainer").hide();
        });
        // handle errors
        // handle success
        });
        $("#cu_newsletter_tryAgain").click(function () {
        $(".spinnerContainer").hide();
        $(".error").hide();
        $(".success").hide();
        });
        });
        })();
    }


    if (signUpEl && !getCookie('BO012-closed')) {
      signUpEl.classList.add('BO-fix');
    
      signUpEl.insertAdjacentHTML('afterbegin', `
        <div class="BO012-close">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkBAEJLRrepKqLAAABl0lEQVRo3sXZPUoDURSG4RfrlFlMKgOKIAQsXJwi7kCzCi0lojvQRlJqCo1CuBYGzQxzZ+7POZ+pMmneZ8Jk5hwCI8555pYJyteUB1bMGcMlgUDgnSNZfsZ6W72C5fatjvCXD7zC4vdAQ9jNBxZwyJeQ0Myv2e/6cOaWP+Zjp/TJSczlQ4jmNYTevD9hMO9LSMr7EZLzPoSsvD0hO29LKMrbEYrzNoSqfD2hOl9HMMmXE8zyZQTTfD7BPJ9HcMmnE9zyaQTX/DDBPd9PkOTjBFm+myDNA5y29gjVSB/9FqRn30cQ5rsIxfm9QsCG0DgObJTn37zypRdgLP9vv4G1dLmn666nW+6J3XRlhPhNV0Lov+e7E4YfOa6EtCeeGyH9getCyHvemxPyxw1TQtm0Y0YoH7ZMCHWzXjWhftSsIthMusUEu0G7iGA752cT7NeMLILPlpNM8Fuykgi+O94gwX/F7CVoNtwoQbdgdxKm0gW7vdxP4FG82zQJN7CS5tuEJ5iL803CGYy55o37nz9RZa8D7njhgtE30Fx6j9z0yp4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDQtMDFUMDk6NDU6MjYrMDA6MDC7DHroAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA0LTAxVDA5OjQ1OjI2KzAwOjAwylHCVAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=" alt="close" />
        </div>
      `);
    }

    pollerLite(['#cu_newsletter_signup.BO-fix'], () => {
      const close = document.querySelector('.BO012-close');
      if (close) {
        close.addEventListener('click', () => {
          signUpEl = document.querySelector('#cu_newsletter_signup');
          
          signUpEl.classList.remove('BO-fix');

          setTimeout(() => {
            if (window.dataLayer && window.dataLayer[1] && window.dataLayer[1].page && window.dataLayer[1].page.templateID && window.dataLayer[1].page.templateID !== "HomePage") { // NOT homepage
              signUpEl.parentNode.removeChild(signUpEl);
            }
          }, 1000);

          // Set cookie to not show again (only where added, e.g. not Homepage)
          setCookie('BO012-closed');
        });
      }


      // On submit, close popup
      const successEl = document.querySelector('#cu_newsletter_signup .success');
      if (successEl) {
        observer.connect(successEl, () => {
          setTimeout(() => {
            signUpEl = document.querySelector('#cu_newsletter_signup');
          
            signUpEl.classList.remove('BO-fix');

            signUpEl.parentNode.removeChild(signUpEl);
            // setTimeout(() => {
            //   if (window.dataLayer && window.dataLayer[1] && window.dataLayer[1].page && window.dataLayer[1].page.templateID && window.dataLayer[1].page.templateID !== "HomePage") { // NOT homepage
            //   }
            // }, 1000);
          }, 4500);

          // Set cookie to not show again (only where added, e.g. not Homepage)
          setCookie('BO012-closed');
        }, {
          attributes: true,
          childList: false,
          subtree: false,
        });
      }
    });
  };


  if (run) {
    runFunctions();
  }

  if (!run) {
    pollerLite(['button.optanon-allow-all.accept-cookies-button'], () => {
      const cookieBtn = document.querySelector('button.optanon-allow-all.accept-cookies-button');
      cookieBtn.addEventListener('click', () => {
        runFunctions();
      });
    });
  }
  
};
