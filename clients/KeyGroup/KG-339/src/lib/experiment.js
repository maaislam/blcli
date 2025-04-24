/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

let propertyValue = 0;
let leftOnMortgage = 0;
let leftOnLoans = 0;

const startExperiment = () => {

  pollerLite(['.hero-banner__image'], () => {

    let outerHolder = document.querySelector('.hero-banner__image');
    outerHolder.style = "";

    let newHTML = `
    
      <div class="${ID}-equitycalc">

        <!-- STAGE 1 --> 
      
        <div class="${ID}-equitycalc--stage ${ID}-equitycalc--stage1">
        
          <div class="${ID}-equitycalc--title">

            <span class="${ID}-equitycalc--stagenum">1/3</span>

            <h2>Let's find out how much equity you have in your home. To get started, we need your home's value.</h2>

          </div>

          <div class="${ID}-equitycalc--form">

            <div class="${ID}-equitycalc--progressbar one-third"></div>

            <div class="${ID}-equitycalc--form--input">
              
                <label for="${ID}-equitycalc--form--input--value">What's your home's value?</label>
  
                <div class="${ID}-equitycalc--form--input--holder">
                  <input type="tel" class="${ID}-keyuplistener-stage1" id="${ID}-equitycalc--propertyValue" placeholder="£0" />
                </div>
                
            </div>

          </div>

          <div class="${ID}-equitycalc--content">

            <span class="${ID}-man-image"></span>
            <p>An estimate will do if you're not sure. Online tools like Rightmove or Zoopla could also help with your estimation.</p>

          </div>

          <div class="${ID}-equitycalc--next">
          
            <button id="${ID}-equitycalc--nextbutton" class="${ID}-equitycalc--button">Next</button>
          
          </div>
        
        </div>

        <!-- STAGE 2 -->

        <div class="${ID}-equitycalc--stage ${ID}-equitycalc--stage2">
        
          <div class="${ID}-equitycalc--title">

            <span class="${ID}-equitycalc--stagenum">2/3</span>

            <h2>Now we know your home's value, we need to know how much debt you have secured against it - this is how we'll calculate your equity.</h2>

          </div>

          <div class="${ID}-equitycalc--form">

            <div class="${ID}-equitycalc--progressbar two-thirds"></div>

            <div class="${ID}-equitycalc--form--input">
              
                <label for="${ID}-equitycalc--form--input--value">What's your existing mortgage balance?</label>
  
                <div class="${ID}-equitycalc--form--input--holder">
                  <input type="tel" class="${ID}-keyuplistener-stage2-field1" id="${ID}-equitycalc--leftOnMortgage" placeholder="£0" />
                </div>
                

            </div>

            <div class="${ID}-equitycalc--form--input">
              
                <label for="${ID}-equitycalc--form--input--value">What's the existing balance of any loans secured against your home?</label>
  
                <div class="${ID}-equitycalc--form--input--holder">
                  <input type="tel" class="${ID}-keyuplistener-stage2-field2" id="${ID}-equitycalc--leftOnLoans" placeholder="£0" />
                </div>

            </div>

          </div>

          <div class="${ID}-equitycalc--content">

            <span class="${ID}-man-image"></span>
            <p>Any secured loans against your home should be included. If you have no debts, you can add £0.</p>

          </div>

          <div class="${ID}-equitycalc--next">
          
            <button id="${ID}-equitycalc--calcbutton" class="${ID}-equitycalc--button">Calculate your home equity</button>

            <button class="${ID}-backbutton">Back</button>
          
          </div>
        
        </div>


        <!-- STAGE 3 (CAN RELEASE EQUITY) -->

        <div class="${ID}-equitycalc--stage ${ID}-equitycalc--stage3--canreleaseequity">
        
          <div class="${ID}-equitycalc--title">

            <span class="${ID}-equitycalc--stagenum">3/3</span>

            <h2>Here's how much home equity you have</h2>

          </div>

          <div class="${ID}-equitycalc--form">

            <div class="${ID}-equitycalc--progressbar full"></div>

            <div class="${ID}-equitycalc--form--complete">
              
                <p> Based on what you've told us, your home equity is: </p>

                <p class="${ID}-equityvalue" id="${ID}-equityvalue"></p>

                <p> See if you could access some of your equity using our equity release calculator:</p>

                <ul>
                
                  <li>Find our how much you can release tax-free</li>
                  <li>Understand the benefits, drawbacks and cost of equity release</li>
                  <li>See if equity release is right for you - if it's not, we'll tell you</li>
                
                </ul>

            </div>

          </div>

          <div class="${ID}-equitycalc--next">
          
            <button id="${ID}-equitycalc--equityreleasebutton" class="${ID}-equitycalc--button ${ID}-completed">How much tax-free equity could I release</button>

            <button class="${ID}-backbutton">Back</button>

            <svg width="358" height="23" viewBox="0 0 358 23" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2064_66)"><path d="M22.8092 8.17432H31.3505V9.76789H27.992V18.7262H26.1453V9.76789H22.8018V8.17432H22.8092ZM30.9856 11.0859H32.5643V12.5604H32.594C32.6462 12.3519 32.743 12.1508 32.8845 11.9572C33.0259 11.7636 33.1972 11.5774 33.3983 11.421C33.5993 11.2572 33.8227 11.1306 34.0685 11.0264C34.3142 10.9296 34.5674 10.8774 34.8206 10.8774C35.0142 10.8774 35.1557 10.8849 35.2301 10.8923C35.3046 10.8998 35.3791 10.9147 35.461 10.9221V12.5455C35.3418 12.5231 35.2227 12.5083 35.0961 12.4934C34.9695 12.4785 34.8504 12.471 34.7312 12.471C34.4482 12.471 34.1802 12.5306 33.927 12.6423C33.6738 12.754 33.4579 12.9253 33.2717 13.1412C33.0855 13.3646 32.9366 13.6327 32.8249 13.9603C32.7132 14.288 32.6611 14.6603 32.6611 15.0848V18.7187H30.9781V11.0859H30.9856ZM43.198 18.7262H41.5449V17.6613H41.5151C41.3066 18.0485 41.0013 18.3539 40.5917 18.5847C40.1821 18.8155 39.7651 18.9347 39.3407 18.9347C38.3354 18.9347 37.6056 18.6889 37.1588 18.19C36.712 17.6911 36.4886 16.939 36.4886 15.9337V11.0859H38.1716V15.7699C38.1716 16.4401 38.2981 16.9167 38.5588 17.1922C38.812 17.4677 39.1768 17.6092 39.6385 17.6092C39.996 17.6092 40.2864 17.5571 40.5247 17.4454C40.763 17.3337 40.9566 17.1922 41.0981 17.006C41.247 16.8273 41.3513 16.6039 41.4183 16.3507C41.4853 16.0975 41.5151 15.822 41.5151 15.5241V11.0934H43.198V18.7262ZM46.065 16.2762C46.1171 16.7677 46.3032 17.1103 46.6235 17.3113C46.9511 17.5049 47.3383 17.6092 47.7926 17.6092C47.9489 17.6092 48.1277 17.5943 48.3287 17.572C48.5298 17.5496 48.7234 17.4975 48.8947 17.4305C49.0734 17.3635 49.2149 17.2592 49.334 17.1252C49.4457 16.9911 49.4978 16.8198 49.4904 16.6039C49.4829 16.3879 49.401 16.2092 49.2521 16.0752C49.1032 15.9337 48.917 15.8294 48.6862 15.7401C48.4553 15.6582 48.1947 15.5837 47.8968 15.5241C47.599 15.4646 47.3011 15.3975 46.9958 15.3305C46.683 15.2635 46.3777 15.1741 46.0873 15.0773C45.7969 14.9805 45.5362 14.8465 45.3054 14.6752C45.0746 14.5114 44.8884 14.2954 44.7544 14.0348C44.6129 13.7742 44.5458 13.454 44.5458 13.0667C44.5458 12.6497 44.6501 12.3072 44.8512 12.0242C45.0522 11.7412 45.3128 11.5179 45.6182 11.3466C45.9309 11.1753 46.2735 11.0562 46.6532 10.9817C47.033 10.9147 47.3979 10.8774 47.7404 10.8774C48.1351 10.8774 48.5149 10.9221 48.8723 11.004C49.2298 11.0859 49.5574 11.22 49.8478 11.4136C50.1382 11.5998 50.3765 11.8455 50.5702 12.1434C50.7638 12.4412 50.8829 12.8061 50.935 13.2306H49.1776C49.0957 12.8285 48.917 12.5529 48.6266 12.4189C48.3362 12.2774 48.0011 12.2104 47.6287 12.2104C47.5096 12.2104 47.3681 12.2178 47.2043 12.2402C47.0405 12.2625 46.8915 12.2997 46.7426 12.3519C46.6011 12.404 46.482 12.4859 46.3777 12.5902C46.2809 12.6944 46.2288 12.8285 46.2288 12.9997C46.2288 13.2082 46.3032 13.3721 46.4447 13.4987C46.5862 13.6252 46.7724 13.7295 47.0032 13.8189C47.2341 13.9008 47.4947 13.9752 47.7926 14.0348C48.0904 14.0944 48.3957 14.1614 48.7085 14.2284C49.0138 14.2954 49.3117 14.3848 49.6095 14.4816C49.9074 14.5784 50.168 14.7125 50.3989 14.8837C50.6297 15.055 50.8159 15.2635 50.9574 15.5167C51.0989 15.7699 51.1733 16.0901 51.1733 16.4624C51.1733 16.9167 51.0691 17.2964 50.8606 17.6166C50.6521 17.9294 50.384 18.19 50.0563 18.3836C49.7287 18.5773 49.3564 18.7262 48.9542 18.8155C48.5521 18.9049 48.15 18.9496 47.7553 18.9496C47.2713 18.9496 46.8245 18.8975 46.4149 18.7858C46.0054 18.6741 45.6479 18.5102 45.3501 18.2943C45.0522 18.0709 44.8139 17.7954 44.6427 17.4677C44.4714 17.1401 44.382 16.7454 44.3671 16.2911H46.065V16.2762ZM51.6201 11.0859H52.8935V8.79239H54.5764V11.0859H56.0955V12.3444H54.5764V16.4252C54.5764 16.6039 54.5839 16.7528 54.5988 16.8869C54.6137 17.0135 54.6509 17.1252 54.703 17.2145C54.7551 17.3039 54.8371 17.3709 54.9488 17.4156C55.0605 17.4603 55.2019 17.4826 55.3956 17.4826C55.5147 17.4826 55.6338 17.4826 55.753 17.4752C55.8721 17.4677 55.9913 17.4528 56.1104 17.423V18.7262C55.9243 18.7485 55.7381 18.7634 55.5668 18.7858C55.3881 18.8081 55.2094 18.8155 55.0232 18.8155C54.5764 18.8155 54.219 18.7709 53.9509 18.689C53.6828 18.607 53.4669 18.4804 53.318 18.3166C53.1616 18.1528 53.0648 17.9517 53.0052 17.706C52.9531 17.4603 52.9158 17.1773 52.9084 16.8645V12.3593H51.635V11.0859H51.6201ZM57.287 11.0859H58.8806V12.121H58.9104C59.1486 11.6742 59.4763 11.3615 59.9007 11.1679C60.3252 10.9742 60.7794 10.8774 61.2784 10.8774C61.8815 10.8774 62.4028 10.9817 62.8496 11.1976C63.2964 11.4062 63.6687 11.6966 63.9666 12.0689C64.2645 12.4412 64.4804 12.8731 64.6293 13.3646C64.7783 13.8561 64.8527 14.3848 64.8527 14.9433C64.8527 15.4571 64.7857 15.956 64.6517 16.4326C64.5176 16.9167 64.3166 17.3411 64.0485 17.7134C63.7804 18.0858 63.4379 18.3762 63.0209 18.5996C62.6039 18.823 62.1198 18.9347 61.5539 18.9347C61.3082 18.9347 61.0624 18.9123 60.8167 18.8677C60.5709 18.823 60.3327 18.7485 60.1093 18.6517C59.8859 18.5549 59.6699 18.4283 59.4837 18.2719C59.2901 18.1156 59.1338 17.9368 58.9997 17.7358H58.9699V21.5485H57.287V11.0859ZM63.1698 14.9135C63.1698 14.571 63.1251 14.2359 63.0358 13.9082C62.9464 13.5806 62.8124 13.2976 62.6337 13.0444C62.4549 12.7912 62.2315 12.5902 61.9709 12.4412C61.7028 12.2923 61.3975 12.2104 61.055 12.2104C60.3475 12.2104 59.8114 12.4561 59.454 12.9476C59.0965 13.4391 58.9178 14.0944 58.9178 14.9135C58.9178 15.3007 58.9625 15.6582 59.0593 15.9858C59.1561 16.3135 59.2901 16.5964 59.4837 16.8347C59.6699 17.073 59.8933 17.2592 60.1539 17.3932C60.4146 17.5347 60.7199 17.6017 61.0624 17.6017C61.4496 17.6017 61.7699 17.5198 62.0379 17.3635C62.306 17.2071 62.522 16.9986 62.6932 16.7528C62.8645 16.4996 62.9911 16.2167 63.0656 15.8965C63.1326 15.5763 63.1698 15.2486 63.1698 14.9135ZM66.141 8.17432H67.8239V9.76789H66.141V8.17432ZM66.141 11.0859H67.8239V18.7262H66.141V11.0859ZM69.3282 8.17432H71.0111V18.7262H69.3282V8.17432ZM76.1716 18.9347C75.561 18.9347 75.0174 18.8304 74.5408 18.6294C74.0642 18.4283 73.6621 18.1453 73.327 17.7954C72.9993 17.4379 72.7462 17.0135 72.5749 16.522C72.4036 16.0305 72.3142 15.4869 72.3142 14.8986C72.3142 14.3178 72.4036 13.7816 72.5749 13.2901C72.7462 12.7987 72.9993 12.3742 73.327 12.0168C73.6546 11.6593 74.0642 11.3838 74.5408 11.1828C75.0174 10.9817 75.561 10.8774 76.1716 10.8774C76.7822 10.8774 77.3258 10.9817 77.8024 11.1828C78.279 11.3838 78.6811 11.6668 79.0162 12.0168C79.3438 12.3742 79.597 12.7987 79.7683 13.2901C79.9396 13.7816 80.0289 14.3178 80.0289 14.8986C80.0289 15.4869 79.9396 16.0305 79.7683 16.522C79.597 17.0135 79.3438 17.4379 79.0162 17.7954C78.6885 18.1528 78.279 18.4283 77.8024 18.6294C77.3258 18.8304 76.7822 18.9347 76.1716 18.9347ZM76.1716 17.6017C76.5439 17.6017 76.8716 17.5198 77.1471 17.3635C77.4226 17.2071 77.646 16.9986 77.8247 16.7454C78.0035 16.4922 78.1301 16.2018 78.2194 15.8816C78.3013 15.5614 78.346 15.2337 78.346 14.8986C78.346 14.571 78.3013 14.2508 78.2194 13.9231C78.1375 13.5955 78.0035 13.3125 77.8247 13.0593C77.646 12.8061 77.4226 12.6051 77.1471 12.4487C76.8716 12.2923 76.5439 12.2104 76.1716 12.2104C75.7993 12.2104 75.4716 12.2923 75.1961 12.4487C74.9206 12.6051 74.6972 12.8136 74.5184 13.0593C74.3397 13.3125 74.2131 13.5955 74.1238 13.9231C74.0419 14.2508 73.9972 14.571 73.9972 14.8986C73.9972 15.2337 74.0419 15.5614 74.1238 15.8816C74.2057 16.2018 74.3397 16.4922 74.5184 16.7454C74.6972 16.9986 74.9206 17.2071 75.1961 17.3635C75.4716 17.5273 75.7993 17.6017 76.1716 17.6017ZM80.5204 11.0859H81.7938V8.79239H83.4767V11.0859H84.9958V12.3444H83.4767V16.4252C83.4767 16.6039 83.4842 16.7528 83.499 16.8869C83.5139 17.0135 83.5512 17.1252 83.6033 17.2145C83.6554 17.3039 83.7373 17.3709 83.849 17.4156C83.9607 17.4603 84.1022 17.4826 84.2958 17.4826C84.415 17.4826 84.5341 17.4826 84.6533 17.4752C84.7724 17.4677 84.8916 17.4528 85.0107 17.423V18.7262C84.8245 18.7485 84.6384 18.7634 84.4671 18.7858C84.2884 18.8081 84.1097 18.8155 83.9235 18.8155C83.4767 18.8155 83.1193 18.7709 82.8512 18.689C82.5831 18.607 82.3672 18.4804 82.2182 18.3166C82.0619 18.1528 81.965 17.9517 81.9055 17.706C81.8534 17.4603 81.8161 17.1773 81.8087 16.8645V12.3593H80.5353V11.0859H80.5204Z" fill="#191919"/><path d="M20.8432 8.1744H13.1286L10.7457 0.832031L8.35529 8.1744L0.640625 8.16695L6.88832 12.7094L4.49796 20.0443L10.7457 15.5093L16.9859 20.0443L14.603 12.7094L20.8432 8.1744Z" fill="#00B67A"/><path d="M15.1391 14.3701L14.6029 12.7095L10.7456 15.5094L15.1391 14.3701Z" fill="#005128"/></g><g clip-path="url(#clip1_2064_66)"><path d="M115.377 0H92.9961V22.3806H115.377V0Z" fill="#00B67A"/><path d="M139.622 0H117.242V22.3806H139.622V0Z" fill="#00B67A"/><path d="M163.868 0H141.487V22.3806H163.868V0Z" fill="#00B67A"/><path d="M188.114 0H165.733V22.3806H188.114V0Z" fill="#00B67A"/><path d="M212.359 0H189.979V22.3806H212.359V0Z" fill="#00B67A"/><path d="M104.186 15.0835L107.59 14.2209L109.012 18.6038L104.186 15.0835ZM112.019 9.4184H106.028L104.186 3.77661L102.344 9.4184H96.353L101.202 12.9154L99.3604 18.5572L104.21 15.0602L107.194 12.9154L112.019 9.4184Z" fill="white"/><path d="M128.432 15.0835L131.836 14.2209L133.258 18.6038L128.432 15.0835ZM136.265 9.4184H130.274L128.432 3.77661L126.59 9.4184H120.599L125.448 12.9154L123.606 18.5572L128.455 15.0602L131.439 12.9154L136.265 9.4184Z" fill="white"/><path d="M152.677 15.0835L156.081 14.2209L157.503 18.6038L152.677 15.0835ZM160.511 9.4184H154.519L152.677 3.77661L150.836 9.4184H144.844L149.693 12.9154L147.852 18.5572L152.701 15.0602L155.685 12.9154L160.511 9.4184Z" fill="white"/><path d="M176.924 15.0835L180.327 14.2209L181.749 18.6038L176.924 15.0835ZM184.757 9.4184H178.765L176.924 3.77661L175.082 9.4184H169.09L173.939 12.9154L172.098 18.5572L176.947 15.0602L179.931 12.9154L184.757 9.4184Z" fill="white"/><path d="M201.169 15.0835L204.573 14.2209L205.995 18.6038L201.169 15.0835ZM209.002 9.4184H203.011L201.169 3.77661L199.327 9.4184H193.336L198.185 12.9154L196.343 18.5572L201.192 15.0602L204.177 12.9154L209.002 9.4184Z" fill="white"/></g><path d="M226.179 16.3254C225.169 16.3254 224.294 16.1054 223.554 15.6654C222.814 15.2154 222.239 14.5854 221.829 13.7754C221.429 12.9554 221.229 11.9954 221.229 10.8954C221.229 9.78543 221.429 8.82543 221.829 8.01543C222.239 7.20543 222.814 6.58043 223.554 6.14043C224.294 5.70043 225.169 5.48043 226.179 5.48043C227.179 5.48043 228.049 5.70043 228.789 6.14043C229.539 6.58043 230.114 7.20543 230.514 8.01543C230.924 8.82543 231.129 9.78043 231.129 10.8804C231.129 11.9904 230.924 12.9554 230.514 13.7754C230.114 14.5854 229.539 15.2154 228.789 15.6654C228.049 16.1054 227.179 16.3254 226.179 16.3254ZM226.179 14.9754C227.229 14.9754 228.044 14.6204 228.624 13.9104C229.214 13.1904 229.509 12.1854 229.509 10.8954C229.509 9.60543 229.219 8.60543 228.639 7.89543C228.059 7.18543 227.239 6.83043 226.179 6.83043C225.129 6.83043 224.309 7.18543 223.719 7.89543C223.139 8.60543 222.849 9.60543 222.849 10.8954C222.849 12.1854 223.139 13.1904 223.719 13.9104C224.309 14.6204 225.129 14.9754 226.179 14.9754ZM235.2 16.1904L232.05 8.87043H233.685L235.92 14.4354L238.215 8.87043H239.76L236.565 16.1904H235.2ZM244.151 16.3254C242.951 16.3254 242.006 15.9904 241.316 15.3204C240.626 14.6404 240.281 13.7154 240.281 12.5454C240.281 11.7954 240.431 11.1354 240.731 10.5654C241.041 9.98543 241.466 9.53543 242.006 9.21543C242.546 8.89543 243.166 8.73543 243.866 8.73543C244.876 8.73543 245.671 9.06043 246.251 9.71043C246.831 10.3504 247.121 11.2354 247.121 12.3654V12.8754H241.751C241.861 14.3954 242.666 15.1554 244.166 15.1554C244.586 15.1554 244.996 15.0904 245.396 14.9604C245.806 14.8304 246.191 14.6154 246.551 14.3154L247.001 15.3654C246.671 15.6654 246.246 15.9004 245.726 16.0704C245.206 16.2404 244.681 16.3254 244.151 16.3254ZM243.926 9.80043C243.296 9.80043 242.796 9.99543 242.426 10.3854C242.056 10.7754 241.831 11.2954 241.751 11.9454H245.846C245.816 11.2654 245.636 10.7404 245.306 10.3704C244.976 9.99043 244.516 9.80043 243.926 9.80043ZM248.773 16.1904V8.87043H250.243V10.1754C250.623 9.30543 251.413 8.82043 252.613 8.72043L253.108 8.69043L253.213 9.98043L252.298 10.0704C250.968 10.2004 250.303 10.8854 250.303 12.1254V16.1904H248.773ZM258.999 16.1904V14.8854H261.399V7.41543L259.524 8.58543L258.894 7.43043L261.849 5.61543H262.944V14.8854H265.194V16.1904H258.999ZM267.738 16.1904L272.583 6.92043H267.168V5.61543H274.323V6.77043L269.448 16.1904H267.738ZM276.882 18.0354L276.222 17.5254C276.452 17.2754 276.622 17.0454 276.732 16.8354C276.842 16.6254 276.912 16.4104 276.942 16.1904H276.117V14.4054H277.902V15.6204C277.902 16.0804 277.827 16.5004 277.677 16.8804C277.527 17.2704 277.262 17.6554 276.882 18.0354ZM283.292 16.3254C282.062 16.3254 281.122 15.8604 280.472 14.9304C279.832 13.9904 279.512 12.6454 279.512 10.8954C279.512 9.11543 279.832 7.77043 280.472 6.86043C281.122 5.94043 282.062 5.48043 283.292 5.48043C284.532 5.48043 285.472 5.94043 286.112 6.86043C286.752 7.77043 287.072 9.11043 287.072 10.8804C287.072 12.6404 286.747 13.9904 286.097 14.9304C285.457 15.8604 284.522 16.3254 283.292 16.3254ZM283.292 15.0354C284.052 15.0354 284.617 14.7004 284.987 14.0304C285.357 13.3604 285.542 12.3104 285.542 10.8804C285.542 9.45043 285.357 8.41043 284.987 7.76043C284.627 7.10043 284.062 6.77043 283.292 6.77043C282.532 6.77043 281.967 7.10043 281.597 7.76043C281.227 8.42043 281.042 9.46043 281.042 10.8804C281.042 12.3104 281.227 13.3604 281.597 14.0304C281.967 14.7004 282.532 15.0354 283.292 15.0354ZM292.286 16.3254C291.056 16.3254 290.116 15.8604 289.466 14.9304C288.826 13.9904 288.506 12.6454 288.506 10.8954C288.506 9.11543 288.826 7.77043 289.466 6.86043C290.116 5.94043 291.056 5.48043 292.286 5.48043C293.526 5.48043 294.466 5.94043 295.106 6.86043C295.746 7.77043 296.066 9.11043 296.066 10.8804C296.066 12.6404 295.741 13.9904 295.091 14.9304C294.451 15.8604 293.516 16.3254 292.286 16.3254ZM292.286 15.0354C293.046 15.0354 293.611 14.7004 293.981 14.0304C294.351 13.3604 294.536 12.3104 294.536 10.8804C294.536 9.45043 294.351 8.41043 293.981 7.76043C293.621 7.10043 293.056 6.77043 292.286 6.77043C291.526 6.77043 290.961 7.10043 290.591 7.76043C290.221 8.42043 290.036 9.46043 290.036 10.8804C290.036 12.3104 290.221 13.3604 290.591 14.0304C290.961 14.7004 291.526 15.0354 292.286 15.0354ZM301.28 16.3254C300.05 16.3254 299.11 15.8604 298.46 14.9304C297.82 13.9904 297.5 12.6454 297.5 10.8954C297.5 9.11543 297.82 7.77043 298.46 6.86043C299.11 5.94043 300.05 5.48043 301.28 5.48043C302.52 5.48043 303.46 5.94043 304.1 6.86043C304.74 7.77043 305.06 9.11043 305.06 10.8804C305.06 12.6404 304.735 13.9904 304.085 14.9304C303.445 15.8604 302.51 16.3254 301.28 16.3254ZM301.28 15.0354C302.04 15.0354 302.605 14.7004 302.975 14.0304C303.345 13.3604 303.53 12.3104 303.53 10.8804C303.53 9.45043 303.345 8.41043 302.975 7.76043C302.615 7.10043 302.05 6.77043 301.28 6.77043C300.52 6.77043 299.955 7.10043 299.585 7.76043C299.215 8.42043 299.03 9.46043 299.03 10.8804C299.03 12.3104 299.215 13.3604 299.585 14.0304C299.955 14.7004 300.52 15.0354 301.28 15.0354ZM310.78 16.1904V8.87043H312.25V10.1754C312.63 9.30543 313.42 8.82043 314.62 8.72043L315.115 8.69043L315.22 9.98043L314.305 10.0704C312.975 10.2004 312.31 10.8854 312.31 12.1254V16.1904H310.78ZM318.642 16.3254C318.132 16.3254 317.677 16.2254 317.277 16.0254C316.877 15.8254 316.557 15.5554 316.317 15.2154C316.087 14.8754 315.972 14.4904 315.972 14.0604C315.972 13.5204 316.107 13.0954 316.377 12.7854C316.657 12.4754 317.112 12.2504 317.742 12.1104C318.382 11.9704 319.242 11.9004 320.322 11.9004H320.832V11.5104C320.832 10.9404 320.712 10.5304 320.472 10.2804C320.232 10.0304 319.837 9.90543 319.287 9.90543C318.867 9.90543 318.447 9.97043 318.027 10.1004C317.607 10.2204 317.177 10.4154 316.737 10.6854L316.272 9.62043C316.652 9.35043 317.127 9.13543 317.697 8.97543C318.267 8.81543 318.812 8.73543 319.332 8.73543C320.332 8.73543 321.072 8.97543 321.552 9.45543C322.032 9.92543 322.272 10.6654 322.272 11.6754V16.1904H320.847V14.9754C320.667 15.3954 320.387 15.7254 320.007 15.9654C319.627 16.2054 319.172 16.3254 318.642 16.3254ZM318.942 15.2454C319.482 15.2454 319.932 15.0554 320.292 14.6754C320.652 14.2954 320.832 13.8154 320.832 13.2354V12.8304H320.337C319.607 12.8304 319.032 12.8654 318.612 12.9354C318.202 13.0054 317.907 13.1254 317.727 13.2954C317.557 13.4554 317.472 13.6804 317.472 13.9704C317.472 14.3504 317.602 14.6604 317.862 14.9004C318.122 15.1304 318.482 15.2454 318.942 15.2454ZM327.479 16.3254C326.559 16.3254 325.874 16.0904 325.424 15.6204C324.974 15.1504 324.749 14.4704 324.749 13.5804V10.0404H323.324V8.87043H324.749V6.66543H326.264V8.87043H328.529V10.0404H326.264V13.4604C326.264 13.9904 326.374 14.3904 326.594 14.6604C326.824 14.9304 327.194 15.0654 327.704 15.0654C327.864 15.0654 328.019 15.0504 328.169 15.0204C328.319 14.9804 328.469 14.9354 328.619 14.8854L328.859 16.0254C328.709 16.1154 328.499 16.1854 328.229 16.2354C327.969 16.2954 327.719 16.3254 327.479 16.3254ZM329.702 7.17543V5.60043H331.472V7.17543H329.702ZM329.837 16.1904V8.87043H331.352V16.1904H329.837ZM333.485 16.1904V8.87043H334.955V10.0854C335.205 9.64543 335.545 9.31043 335.975 9.08043C336.415 8.85043 336.905 8.73543 337.445 8.73543C339.175 8.73543 340.04 9.71543 340.04 11.6754V16.1904H338.525V11.7654C338.525 11.1354 338.4 10.6754 338.15 10.3854C337.91 10.0954 337.53 9.95043 337.01 9.95043C336.4 9.95043 335.91 10.1454 335.54 10.5354C335.18 10.9154 335 11.4204 335 12.0504V16.1904H333.485ZM345.443 19.0254C344.783 19.0254 344.168 18.9454 343.598 18.7854C343.028 18.6354 342.523 18.3954 342.083 18.0654L342.548 16.9854C342.988 17.2854 343.438 17.5054 343.898 17.6454C344.358 17.7854 344.838 17.8554 345.338 17.8554C346.738 17.8554 347.438 17.1554 347.438 15.7554V14.6004C347.228 15.0404 346.898 15.3854 346.448 15.6354C346.008 15.8854 345.513 16.0104 344.963 16.0104C344.303 16.0104 343.728 15.8604 343.238 15.5604C342.748 15.2504 342.368 14.8254 342.098 14.2854C341.828 13.7354 341.693 13.0954 341.693 12.3654C341.693 11.6454 341.828 11.0154 342.098 10.4754C342.368 9.92543 342.748 9.50043 343.238 9.20043C343.728 8.89043 344.303 8.73543 344.963 8.73543C345.523 8.73543 346.023 8.86043 346.463 9.11043C346.903 9.36043 347.228 9.70543 347.438 10.1454V8.87043H348.908V15.5754C348.908 16.7254 348.613 17.5854 348.023 18.1554C347.433 18.7354 346.573 19.0254 345.443 19.0254ZM345.323 14.8254C345.963 14.8254 346.473 14.6054 346.853 14.1654C347.233 13.7254 347.423 13.1254 347.423 12.3654C347.423 11.6054 347.233 11.0104 346.853 10.5804C346.473 10.1404 345.963 9.92043 345.323 9.92043C344.683 9.92043 344.173 10.1404 343.793 10.5804C343.413 11.0104 343.223 11.6054 343.223 12.3654C343.223 13.1254 343.413 13.7254 343.793 14.1654C344.173 14.6054 344.683 14.8254 345.323 14.8254ZM353.599 16.3254C352.999 16.3254 352.439 16.2504 351.919 16.1004C351.399 15.9404 350.964 15.7204 350.614 15.4404L351.049 14.4204C351.419 14.6804 351.824 14.8804 352.264 15.0204C352.714 15.1604 353.164 15.2304 353.614 15.2304C354.144 15.2304 354.544 15.1354 354.814 14.9454C355.084 14.7554 355.219 14.5004 355.219 14.1804C355.219 13.9204 355.129 13.7204 354.949 13.5804C354.769 13.4304 354.499 13.3154 354.139 13.2354L352.714 12.9504C351.454 12.6904 350.824 12.0404 350.824 11.0004C350.824 10.3104 351.099 9.76043 351.649 9.35043C352.199 8.94043 352.919 8.73543 353.809 8.73543C354.319 8.73543 354.804 8.81043 355.264 8.96043C355.734 9.11043 356.124 9.33543 356.434 9.63543L355.999 10.6554C355.699 10.3954 355.354 10.1954 354.964 10.0554C354.574 9.91543 354.189 9.84543 353.809 9.84543C353.289 9.84543 352.894 9.94543 352.624 10.1454C352.354 10.3354 352.219 10.5954 352.219 10.9254C352.219 11.4254 352.549 11.7454 353.209 11.8854L354.634 12.1704C355.284 12.3004 355.774 12.5204 356.104 12.8304C356.444 13.1404 356.614 13.5604 356.614 14.0904C356.614 14.7904 356.339 15.3404 355.789 15.7404C355.239 16.1304 354.509 16.3254 353.599 16.3254Z" fill="#032240"/><defs><clipPath id="clip0_2064_66"><rect width="84.3553" height="20.7165" fill="white" transform="translate(0.640625 0.832031)"/></clipPath><clipPath id="clip1_2064_66"><rect width="119.363" height="22.3806" fill="white" transform="translate(92.9961)"/></clipPath></defs></svg>          
          
          </div>
        
        </div>      
      
      </div>
    
    `;

    outerHolder.insertAdjacentHTML('afterbegin', newHTML);
    let equityCalc = document.querySelector(`.${ID}-equitycalc`);
    outerHolder.classList.add(`${ID}-equity-column`);
    outerHolder.parentElement.classList.add(`${ID}-equity-row`);

    fireEvent('Interaction - Equity Calculator Displayed', true);

    let stage1KeyUpListener = document.querySelector(`.${ID}-keyuplistener-stage1`);
    let firstStageComplete = false;

    stage1KeyUpListener.addEventListener('keyup', (e) => {
      let value = e.target.value;
      let parsedValue = parseInt(value.replace(/,/g, '').replace('£', '').trim());
      if (value !== "" && !isNaN(parsedValue)) {

        if (document.querySelector(`#${ID}-equitycalc--propertyValue`).closest(`.${ID}-equitycalc--form--input--holder`).classList.contains(`${ID}-error`)) {
          document.querySelector(`#${ID}-equitycalc--propertyValue`).closest(`.${ID}-equitycalc--form--input--holder`).classList.remove(`${ID}-error`);
          document.querySelector(`#${ID}-equitycalc--propertyValue`).closest(`.${ID}-equitycalc--form--input--holder`).querySelector(`.${ID}-error-message`)?.remove();
        } 

        value = parseInt(value.replace(/,/g, '').replace('£', '').trim());
        value = new Intl.NumberFormat('en-US').format(value);
        e.target.value = '£' + value;

        firstStageComplete = true;

        document.querySelector(`#${ID}-equitycalc--propertyValue`).closest(`.${ID}-equitycalc--form--input--holder`).classList.add(`${ID}-success`);

      } else {
        e.target.value = '';
        firstStageComplete = false;
        document.querySelector(`#${ID}-equitycalc--propertyValue`).closest(`.${ID}-equitycalc--form--input--holder`).classList.remove(`${ID}-success`);
      }

      if (firstStageComplete == true) {
        document.querySelector(`#${ID}-equitycalc--propertyValue`).closest(`.${ID}-equitycalc--stage`).querySelector(`.${ID}-equitycalc--button`).classList.add(`${ID}-completed`);
      } else {
        document.querySelector(`#${ID}-equitycalc--propertyValue`).closest(`.${ID}-equitycalc--stage`).querySelector(`.${ID}-equitycalc--button`).classList.remove(`${ID}-completed`);
      }

    });

    let secondStageFieldOneInput = document.querySelector(`.${ID}-keyuplistener-stage2-field1`);
    let secondStageFieldTwoInput = document.querySelector(`.${ID}-keyuplistener-stage2-field2`);
    let secondStageFieldOneComplete = false;
    let secondStageFieldTwoComplete = false;


    secondStageFieldOneInput.addEventListener('keyup', (e) => {
      let value = e.target.value;
      let parsedValue = parseInt(value.replace(/,/g, '').replace('£', '').trim());
      if (value !== "" && !isNaN(parsedValue)) {

        if (document.querySelector(`#${ID}-equitycalc--leftOnMortgage`).closest(`.${ID}-equitycalc--form--input--holder`).classList.contains(`${ID}-error`)) {
          document.querySelector(`#${ID}-equitycalc--leftOnMortgage`).closest(`.${ID}-equitycalc--form--input--holder`).classList.remove(`${ID}-error`);
          document.querySelector(`#${ID}-equitycalc--leftOnMortgage`).closest(`.${ID}-equitycalc--form--input--holder`).querySelector(`.${ID}-error-message`)?.remove();
        } 

        value = parseInt(value.replace(/,/g, '').replace('£', '').trim());
        value = new Intl.NumberFormat('en-US').format(value);
        e.target.value = '£' + value;
        document.querySelector(`#${ID}-equitycalc--leftOnMortgage`).closest(`.${ID}-equitycalc--form--input--holder`).classList.add(`${ID}-success`);
        secondStageFieldOneComplete = true;
      } else {
        e.target.value = '';
        document.querySelector(`#${ID}-equitycalc--leftOnMortgage`).closest(`.${ID}-equitycalc--form--input--holder`).classList.remove(`${ID}-success`)
        secondStageFieldOneComplete = false;
      }

      if (secondStageFieldOneComplete == true && secondStageFieldTwoComplete == true) {
        document.querySelector(`#${ID}-equitycalc--leftOnMortgage`).closest(`.${ID}-equitycalc--stage`).querySelector(`.${ID}-equitycalc--button`).classList.add(`${ID}-completed`);
      } else {
        document.querySelector(`#${ID}-equitycalc--leftOnMortgage`).closest(`.${ID}-equitycalc--stage`).querySelector(`.${ID}-equitycalc--button`).classList.remove(`${ID}-completed`);
      }

    });

    secondStageFieldTwoInput.addEventListener('keyup', (e) => {
      let value = e.target.value;
      let parsedValue = parseInt(value.replace(/,/g, '').replace('£', '').trim());
      if (value !== "" && !isNaN(parsedValue)) {

        if (document.querySelector(`#${ID}-equitycalc--leftOnLoans`).closest(`.${ID}-equitycalc--form--input--holder`).classList.contains(`${ID}-error`)) {
          document.querySelector(`#${ID}-equitycalc--leftOnLoans`).closest(`.${ID}-equitycalc--form--input--holder`).classList.remove(`${ID}-error`);
          document.querySelector(`#${ID}-equitycalc--leftOnLoans`).closest(`.${ID}-equitycalc--form--input--holder`).querySelector(`.${ID}-error-message`)?.remove();
        }

        value = parseInt(value.replace(/,/g, '').replace('£', '').trim());
        value = new Intl.NumberFormat('en-US').format(value);
        e.target.value = '£' + value;
        document.querySelector(`#${ID}-equitycalc--leftOnLoans`).closest(`.${ID}-equitycalc--form--input--holder`).classList.add(`${ID}-success`);
        secondStageFieldTwoComplete = true;
      } else {
        e.target.value = '';
        document.querySelector(`#${ID}-equitycalc--leftOnLoans`).closest(`.${ID}-equitycalc--form--input--holder`).classList.remove(`${ID}-success`);
        secondStageFieldTwoComplete = false;
      }

      if (secondStageFieldOneComplete == true && secondStageFieldTwoComplete == true) {
        document.querySelector(`#${ID}-equitycalc--leftOnLoans`).closest(`.${ID}-equitycalc--stage`).querySelector(`.${ID}-equitycalc--button`).classList.add(`${ID}-completed`);
      } else {
        document.querySelector(`#${ID}-equitycalc--leftOnLoans`).closest(`.${ID}-equitycalc--stage`).querySelector(`.${ID}-equitycalc--button`).classList.remove(`${ID}-completed`);
      }

    });
    
         

    document.body.addEventListener('click', (e) => {
      
      if(e.target.id == `${ID}-equitycalc--nextbutton`) {
        

        propertyValue = document.querySelector(`#${ID}-equitycalc--propertyValue`).value;
        propertyValue = propertyValue.replace(/,/g, '').replace('£', '').trim();

        if (isNaN(propertyValue) || propertyValue == 0 || propertyValue == '') {
          propertyValue = 0;
          document.querySelector(`#${ID}-equitycalc--propertyValue`).value = '';
          document.querySelector(`#${ID}-equitycalc--propertyValue`).closest(`.${ID}-equitycalc--form--input--holder`).classList.add(`${ID}-error`);
          if(!document.querySelector(`#${ID}-equitycalc--propertyValue`).closest(`.${ID}-equitycalc--form--input--holder`).querySelector(`.${ID}-error-message`)) {
            document.querySelector(`#${ID}-equitycalc--propertyValue`).closest(`.${ID}-equitycalc--form--input--holder`).insertAdjacentHTML('afterbegin', `<div class="${ID}-error-message"><span class="${ID}-error-message--icon"></span>Please enter a valid number</div>`)
          }
          fireEvent('Click - user has clicked the next button on stage 1 but encountered an error so had to try again', true);
        } else {
          if (document.querySelector(`#${ID}-equitycalc--propertyValue`).closest(`.${ID}-equitycalc--form--input--holder`).classList.contains(`${ID}-error`)) {
            document.querySelector(`#${ID}-equitycalc--propertyValue`).closest(`.${ID}-equitycalc--form--input--holder`).classList.remove(`${ID}-error`);
            document.querySelector(`#${ID}-equitycalc--propertyValue`).closest(`.${ID}-equitycalc--form--input--holder`).querySelector(`.${ID}-error-message`)?.remove();
          }
          propertyValue = parseInt(propertyValue);
          equityCalc.classList.add('stage-2-displayed');

          fireEvent('Click - user has clicked the next button on stage 1', true);
        }

        

      }

      if (e.target.id == `${ID}-equitycalc--calcbutton`) {
        equityCalc.classList.remove('stage-2-displayed');

        leftOnMortgage = document.querySelector(`#${ID}-equitycalc--leftOnMortgage`).value;
        leftOnMortgage = leftOnMortgage.replace(/,/g, '').replace('£', '').trim();
        leftOnLoans = document.querySelector(`#${ID}-equitycalc--leftOnLoans`).value;
        leftOnLoans = leftOnLoans.replace(/,/g, '').replace('£', '').trim();

        let leftOnMortgagePassedValidation = false;
        let leftOnLoansPassedValidation = false;

        if (isNaN(leftOnMortgage) || leftOnMortgage < 0 || leftOnMortgage == '') {

          leftOnMortgage = 0;
          document.querySelector(`#${ID}-equitycalc--leftOnMortgage`).value = '';
          document.querySelector(`#${ID}-equitycalc--leftOnMortgage`).closest(`.${ID}-equitycalc--form--input--holder`).classList.add(`${ID}-error`);
          if (!document.querySelector(`#${ID}-equitycalc--leftOnMortgage`).closest(`.${ID}-equitycalc--form--input--holder`).querySelector(`.${ID}-error-message`)) {
            document.querySelector(`#${ID}-equitycalc--leftOnMortgage`).closest(`.${ID}-equitycalc--form--input--holder`).insertAdjacentHTML('afterbegin', `<div class="${ID}-error-message"><span class="${ID}-error-message--icon"></span>Please enter a valid number</div>`)
          }
          equityCalc.classList.add('stage-2-displayed');
          fireEvent('Click - user has clicked the next button on stage 2 but encountered an error so had to try again', true);
        } else {
          if (document.querySelector(`#${ID}-equitycalc--leftOnMortgage`).closest(`.${ID}-equitycalc--form--input--holder`).classList.contains(`${ID}-error`)) {
            document.querySelector(`#${ID}-equitycalc--leftOnMortgage`).closest(`.${ID}-equitycalc--form--input--holder`).classList.remove(`${ID}-error`);
            document.querySelector(`#${ID}-equitycalc--leftOnMortgage`).closest(`.${ID}-equitycalc--form--input--holder`).querySelector(`.${ID}-error-message`)?.remove();
          }
          leftOnMortgage = parseInt(leftOnMortgage);
          leftOnMortgagePassedValidation = true;

        }

        if (isNaN(leftOnLoans) || leftOnLoans < 0 || leftOnLoans == '') {

          leftOnLoans = 0;
          document.querySelector(`#${ID}-equitycalc--leftOnLoans`).value = '';
          document.querySelector(`#${ID}-equitycalc--leftOnLoans`).closest(`.${ID}-equitycalc--form--input--holder`).classList.add(`${ID}-error`);
          if (!document.querySelector(`#${ID}-equitycalc--leftOnLoans`).closest(`.${ID}-equitycalc--form--input--holder`).querySelector(`.${ID}-error-message`)) {
            document.querySelector(`#${ID}-equitycalc--leftOnLoans`).closest(`.${ID}-equitycalc--form--input--holder`).insertAdjacentHTML('afterbegin', `<div class="${ID}-error-message"><span class="${ID}-error-message--icon"></span>Please enter a valid number</div>`)
          }
          equityCalc.classList.add('stage-2-displayed');
          fireEvent('Click - user has clicked the next button on stage 2 but encountered an error so had to try again', true);
        } else {

          document.querySelector(`#${ID}-equitycalc--leftOnLoans`).closest(`.${ID}-equitycalc--form--input--holder`).classList.remove(`${ID}-error`);
          document.querySelector(`#${ID}-equitycalc--leftOnLoans`).closest(`.${ID}-equitycalc--form--input--holder`).querySelector(`.${ID}-error-message`)?.remove();
          leftOnLoans = parseInt(leftOnLoans);
          leftOnLoansPassedValidation = true;

        }


        if(leftOnMortgagePassedValidation && leftOnLoansPassedValidation) {
          fireEvent('Click - user has clicked the next button on stage 2 and passed validation', true);
          let equity = propertyValue - leftOnMortgage - leftOnLoans;

          if(equity < 0) {
            equity = 0;
          }

          equityCalc.classList.add('stage-3-equityrelease-displayed');
          document.querySelector(`#${ID}-equityvalue`).innerHTML = `£${equity.toLocaleString()}`;
          let equityReleaseValue = equity - 70000;
          if(equityReleaseValue > 0) {
            document.querySelector(`#${ID}-difference`).innerHTML = `£${(equity - 70000).toLocaleString()}`;
          } else {
            document.querySelector(`#${ID}-difference`).innerHTML = ``;
          }
          fireEvent('Click - user is shown the equity calculator option', true);

        }


        
      }

      if (e.target.id == `${ID}-equitycalc--equityreleasebutton`) {
        fireEvent('Click - user has clicked to go to the Equity Release Calculator from stage 3', true);
        window.location.href = "https://www.keyadvice.co.uk/equity-release/calculator?ots=CRO_HEC";

      }

      if(e.target.classList.contains(`${ID}-backbutton`)) {

        if (equityCalc.classList.contains('stage-3-noequityrelease-displayed') || equityCalc.classList.contains('stage-3-equityrelease-displayed')) {
          equityCalc.classList.remove('stage-3-noequityrelease-displayed');
          equityCalc.classList.remove('stage-3-equityrelease-displayed');
          equityCalc.classList.add('stage-2-displayed');
        } else if(equityCalc.classList.contains('stage-2-displayed')) {
          equityCalc.classList.remove('stage-2-displayed');
          equityCalc.classList.add('stage-1-displayed');
        }

        fireEvent('Click - user has clicked the back button', true);

      }
      
    });

  });

}

export default () => {

  newEvents.initiate = true;
  newEvents.methods = ["datalayer"];
  newEvents.property = "G-LNFZ1KRLB8";

  setup();

  fireEvent('Conditions Met');

  // Needed for attribution to Adobe Dynamics - do not remove
  document.documentElement.classList.add(`experimentation-${VARIATION == "control" ? `control` : `variant-${VARIATION}`}`);

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();

  
  
};
