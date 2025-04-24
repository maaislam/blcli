/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import settings from './shared';
import { events, pollerLite, logMessage, observer } from '../../../../../lib/utils';

const { ID, VARIATION } = settings;

events.analyticsReference = '_gaUAT';

const createSCPopup = (method) => {

  // comment this out before putting into the platform
  //let imageURL = "https://cdn-eu.dynamicyield.com/api/9876944/images/911c0b97ba19__sc-header.jpg";

  let popupHTML = `

    <div class="FLAN-345-SC-popup">

      <div class="FLAN-345-SC-overlay"></div>

      <div class="FLAN-345-SC-popup-inner">
        <div class="FLAN-345-SC-popup-inner-scrollable">


          <a href="#" id="FLAN-345-SC-close-element" class="FLAN-345-SC-close-element"><svg height="20" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="20" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path stroke-width="1" stroke="red" d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg></a>

          <img id="popup-image" src="" alt="Style & Collect from Flannels" />

          <p class="SC-intro-text"> Style &amp; Collect is an exclusive FLANNELS service, combining the ease of click and collect with a luxurious in-store personal shopping experience. All click and collect orders over £250 come with a complimentary Style &amp; Collect appointment. </p>

          <div class="FLAN-345-steps">

            <div class="FLAN-345-step step-one">
              <div class="FLAN-345-step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 357.45 357.45"><defs><style>.cls-1,.cls-4,.cls-5{fill:none;}.cls-2{clip-path:url(#clip-path);}.cls-3{fill:#fff;}.cls-4,.cls-5{stroke:#fff;stroke-miterlimit:10;}.cls-4{stroke-width:1.34px;}</style><clipPath id="clip-path" transform="translate(-171.22 -171.07)"><rect class="cls-1" width="700" height="700"/></clipPath></defs><title>flannels-desktop</title><g class="cls-2"><path class="cls-3" d="M496.82,171.74H203a31.13,31.13,0,0,0-31.09,31.09V403.49A31.13,31.13,0,0,0,203,434.58H304.72v5.81c0,15.55-1.09,27.15-6.27,39.41h-22a34,34,0,0,0-33.91,33.91v5.65a8.49,8.49,0,0,0,8.48,8.48H448.86a8.5,8.5,0,0,0,8.48-8.48v-5.65a34,34,0,0,0-33.91-33.91h-22c-5.18-12.26-6.27-23.86-6.27-39.41v-5.81H496.91A31.11,31.11,0,0,0,528,403.52V202.93a31.22,31.22,0,0,0-31.18-31.18M203,177.4H496.82a25.56,25.56,0,0,1,25.53,25.53V383.71H177.55V202.83A25.47,25.47,0,0,1,203,177.4M448.86,522.2H251a2.83,2.83,0,0,1-2.83-2.83v-2.83H451.69v2.82a2.84,2.84,0,0,1-2.83,2.83m2.69-11.31H248.35a28.3,28.3,0,0,1,28.12-25.44h147a28.3,28.3,0,0,1,28.12,25.44M395.34,479.8H304.55c4.77-12.33,5.82-24.43,5.82-39.41v-5.81h79.15v5.81c0,15,1.05,27.07,5.82,39.41m101.57-50.87H203a25.46,25.46,0,0,1-25.44-25.44V389.36h344.8v14.15a25.46,25.46,0,0,1-25.44,25.41" transform="translate(-171.22 -171.07)"/><path class="cls-4" d="M496.82,171.74H203a31.13,31.13,0,0,0-31.09,31.09V403.49A31.13,31.13,0,0,0,203,434.58H304.72v5.81c0,15.55-1.09,27.15-6.27,39.41h-22a34,34,0,0,0-33.91,33.91v5.65a8.49,8.49,0,0,0,8.48,8.48H448.86a8.5,8.5,0,0,0,8.48-8.48v-5.65a34,34,0,0,0-33.91-33.91h-22c-5.18-12.26-6.27-23.86-6.27-39.41v-5.81H496.91A31.11,31.11,0,0,0,528,403.52V202.93A31.22,31.22,0,0,0,496.82,171.74ZM203,177.4H496.82a25.56,25.56,0,0,1,25.53,25.53V383.71H177.55V202.83A25.47,25.47,0,0,1,203,177.4ZM448.86,522.2H251a2.83,2.83,0,0,1-2.83-2.83v-2.83H451.69v2.82A2.84,2.84,0,0,1,448.86,522.2Zm2.69-11.31H248.35a28.3,28.3,0,0,1,28.12-25.44h147A28.3,28.3,0,0,1,451.55,510.89ZM395.34,479.8H304.55c4.77-12.33,5.82-24.43,5.82-39.41v-5.81h79.15v5.81C389.52,455.38,390.58,467.47,395.34,479.8Zm101.57-50.87H203a25.46,25.46,0,0,1-25.44-25.44V389.36h344.8v14.15A25.46,25.46,0,0,1,496.91,428.93Z" transform="translate(-171.22 -171.07)"/><path class="cls-3" d="M349.95,395a14.13,14.13,0,1,0,14.13,14.13A14.15,14.15,0,0,0,349.95,395m0,22.61a8.48,8.48,0,1,1,8.48-8.48,8.49,8.49,0,0,1-8.48,8.48" transform="translate(-171.22 -171.07)"/><path class="cls-4" d="M349.95,395a14.13,14.13,0,1,0,14.13,14.13A14.15,14.15,0,0,0,349.95,395Zm0,22.61a8.48,8.48,0,1,1,8.48-8.48A8.49,8.49,0,0,1,349.95,417.63Z" transform="translate(-171.22 -171.07)"/><rect class="cls-5" x="26.73" y="26.34" width="303.98" height="166.48"/></g></svg>
              </div>

              <p> 01 </p>
              <p> SHOP ONLINE </p>
            </div>

            <div class="FLAN-345-step step-two">
              <div class="FLAN-345-step-icon">
                <svg class="store-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 415.66 186.47"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:1.56px;}</style></defs><title>flannels-store</title><rect class="cls-1" x="0.78" y="0.78" width="414.11" height="184.91"/><rect class="cls-1" x="23.89" y="67.87" width="158.91" height="107.94"/><rect class="cls-1" x="218.35" y="67.87" width="168.77" height="117.82"/><rect class="cls-1" x="21.53" y="172.41" width="163.63" height="13.28"/><rect class="cls-1" x="216.46" y="172.41" width="57.4" height="13.28"/><rect class="cls-1" x="332.23" y="172.41" width="56.78" height="13.28"/><line class="cls-1" x1="103.34" y1="67.87" x2="103.34" y2="172.41"/><line class="cls-1" x1="273.49" y1="67.87" x2="273.49" y2="172.41"/><line class="cls-1" x1="332.23" y1="67.87" x2="332.23" y2="172.41"/><rect class="cls-1" x="249.23" y="96.01" width="107.01" height="3.37"/><g id="gqrpay.tif"><image id="Layer_0" data-name="Layer 0" width="298" height="43" transform="translate(243.92 25.22) scale(0.4)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASsAAAAuCAYAAABwHj+zAAAACXBIWXMAABv9AAAb/QGX0Qc2AAALjUlEQVR4Xu2dPZLjyBGF+wijCygQoQvMBRSTpjytI3sgV44mpANs3UB7g+YBFKFx1yJvoDHkk5bcnRs8dRJANwhU5kv8FBtY8Yt4MIb5MhMEmACLbM4TgKeHHnrooa2LBjz00EMPbUE04KGHHnooqI8v+vSiHx3p41Ug10hdgeOdlWvm+UUnR38yfFtSAt/3j4E8U5Wr09dzIAdT7eQ/to/P9aoqxx9R5Dxe4i0ldj78E/7r4g/EX1qf0ZxfZ0zjFzQ+tv+v0o3kMhUm18x/XAfwN+R9W9EHNAeAcQDPNVURavA8ntI45Q0J873Kv8B78CTjlCOWeEuhtb39+q9tvfJn+P5SEkwfUBb/RmBodUXvTa6ZvQ+rGjF0oOlgY/mmKMLSummc8oaE+d6OH8D7sCSZfEOWeEuhtb392uKw+gfK8COcuroR01qOXDN7H1Z6dYjyBTzfFEX5CTyXpZTJ1ydhvrfjjPkDVcbpRizxlkJre/u1tWH1jLI8w6itG7F9xcg1s+dhpbewUziD55yiKdDbbUMpl6xHwnxvHy+PJ8klG7DEWwqt7e3XlobVM+5DQqa+bsRzFSL3ROx5WB0wHQHPG9UU9A6Q5csp5ZL1SJjvHTJnoEo20y1LvKXQ2t5+bWVYVbgvo3NAN+JaypB7MvY8rCIL60MO4Hmjmsqct6Epm+mNhPneIUfwfoaSXKIBS7yl0Nrefm1lWB0Q4zuaTyl1ySH1dGofi3LEoAfdiOdo0ZNbVtRTRnsdVjXmM3d9ZqipzFlsT9lMbyTM9+aowXvqS/JpbljilUJix2ELw6oCRwdRgr8/+lj9oouRY8jN3ZVuxI+/ojFsh5Zqr8PqiPkk8PwRzeEAnrevlE/zircvzJtj6kCVfJobSnhLawvDSuCjg2rKW/ePiN1l3XwgFGlE0RjWwFLtcVhVWMYZvEZEcxHw3J2SkaMjYb7XYsqnl2Lk6FPCW1pbGFYJPjV4jqHqbKZbTuh5dCN+/BWNYcWXao/DSl9MHqcXfSMxS75b1GkuZ/DcnVI+xSsJ870eAt7bE2LncQlvae1hWAl4jpwuuWQDXuN1IyRYmdvMFO1xWLGF9RrNep/HV/A6TEtI4PmfwE9YLw/zekQ/vRQrQY8S3tLaw7Cae8E95JINeI3XjZBgRWNY4aXa27DSA8TQNZeKBWH538UtQQdupH6yErQkzPcyIp9eiul+o4S3tPYwrPSCMmV9sVOFCR84PCF2oDSGFV6qvQ0rvSPyOEyITbDrRLSUI3iNZJlbvH1gXkZkoIrpfqOEt7S2MKwiF+bzi/4Inmu2dCPgaAxNtlB7GlYVOP1b45rEnsFremJEPnlht/LJtl5JmO+9kMcV9ofOYltfKeEtrS0MK1XkHFLOaP52cMqngyHpRsDRGJpsofY0rBJ8vuM2/oMffqUGr2uJwdbNlDP8W3m2zwnLvOyDCEVg1xDH11HCW1pbGVYHTEfviPUi8xn8zphKNwKOxtBkC7WnYXWGzwFjz8F1xN6KWWII+CeXSoJdIzk+YLlXSIxyhl0j4l/iPa6s6NcytjKs9EIWvbuyOKP5+8LPmDG8dCO4Dwl+M3sZVpH377lb4IivAq+fE0MQP9ms2/fkmbB8WGnckoEqnqnF6i/iXZsT+HFVbWVYqWqsyxHN4AotzutGclkKkOA3s5dhdYDPBbaXDYvo1XYohqCJiwzMI/I1kuMB1hlW0YFaYVxDXEeD1V/EuzYn8OOq2tKwUkWWFKbS/WpoBae2bsRIsDYJ/pOwh2EVWXtKsP0Hx6f8AtvriSF4iz2RWKXGuEZyHesMK1VNYpUjxjXEM7RY/UW8a6PHweqnr60NK1WN2EVlKnr+/xVGXd2I7V2VBP8J2MOwilxVKtj+j46vowbvYyiG4C22IrFK7u/ykutYb1ipTn74leGnl+KHX7H6i3jXRvfR6qevLQ4rlZ4fCWWG1hGZmroRx7QmumPezu9hWJ3h8w08x8V0N0S/sd0XQ3Abn/zwKwdM8yTcxi/xVn74lTNuB6q40Q1WfxHv2pzAj6tqq8OqU4XmXFl7aD1jUEs34jlWJMHf6a0PKwFH77xYnmS637AWuS0xtPd+vL7IL66joe9jfSfc1piyzzkv8yj9NT4hsYrVX8S7Nifw46ra+rDqS9AckwvW4eb11BW4Bwn+jm59WB3AiXyqUZnuN7QWy9MXQzD2iOto6N/lJRKbMK6x1HvxTC3dYI/sj9VfxCsrK3pB2tOw6qtCs6RxQOw45rhZjtCN+PFXNIY1t1RbHlaRhfWv4Hk6fTNydEz9LSeGIO/76plauqtbInEJdn9zveKZWo6Ix1r9LfGW1l6H1VAVmuGl59yUt4zquebQjZBgRWNYM0u15WFVg3MG/yJgpzM4WpP11YkhyPsq8BOn+7u8ROL0cau/Jd7oQBUWBLvGEm9p/VqGVV9TFuePaH26ET/2isawBpZqy8Nqyn+ztRZn8L46MQS2Nzm+Dv2TCRanj8+t4Xn1xGYntQ7UH0iMYtUQz9RieUvr1zisOulb4Qs413jdCIvE//ew0if0vRDw/p5M9xssD3tbqhzJ4wl2/uT4AL6e+cW2vnJmAbDzi2dq8forqfccVnqh+ITm1xR+bHXE7buDKcsVOdXgXGtosLBI8JN9DW11WB3wfmht1t+T6X5D4PvFtoZJsPMnxwfwYaWKDFTGkv1n/ZXSew8rRg2eZ2kNedFjWBHpE8l+DbQ0kSsXQ8BzHEx3jAQ7d3J8QGxYrXGHa+UWz9TC+iul9xxWKvYW/ACew1M1TjlCXvQYVkQ13p/u0zhPDAHPEVkb8kiwcyfHB8SGleonK0EQK694phbWWym997A6wSfyw4ie6nHKEdf8GiwsErGTfam2OKyOeH/O4H0yBDyHKrI2ZJFg502OD4gPKx2oFyNHBCuveKYW1lspvfewipwTc3/WWHUcpxtxjdWNsEjET/Yl2tqwqsA5gOdhitwtCPwcDObv62TkYCTYOZPjA+LDShX51M/CyimeqYX1VUrvPawqxHgGzzXUcybPEF2rvMbrRkiwojGs8FJtbVhFhoi+cFgepmqUdcxX+DkYAt5Hp7lrQwl2zuT4gGnDSnXKp6FY+cQztbCeSum9h5XqhBhnxM41jTlmM4xJaH2dkRFpYKnYsPoZTeNr6jew+2EL6xfY3qk6gVPB9jMEvIe+IoN6SIKdLzk+YPqwqjBvfc3KJ56p5VNBeW+h2LDSC1laWb/FbQ9TL2D6tlB/h11/7uVTq89ovvow5TuLeoxfn5vogdKY3BO5ptiwKsHvkO+l9kwt+oJm+xRVpF6C7WcIeA99zVkb8vpLjg+YPqwiOXNYucQz3QGtb/XGhlUJfo9xH3MuYEu5eY1FD5T3ZK6lLQ2rr56ppQLfp6gin8SdYfsZAt7DUFPXhhLsXMnxAfOGlepbLpmDlUc80x3Q+lZvWxlWeo5Ofb6XoLVu7jijB8p7MtfSVoZV5ToaXhf9VtQBHGuNjCHg9XM65ZIZJNh5kuMD5g8rySVzWCvP2mh9q7etDCvVvQbWzdu/TtED5T2Za2krwyq5joYafH+mKrIucETeyxDw+jlVuWQGCXae5PiA+cNKdcjks7ByiGe6A1rf6m1Lw0pVoezAusD4+ZzogfKezLW0lWF19gwt3oLoEkVOggpjH0PAa1tKmXw5NG5uDs/LFHkL3WHlEM90B7S+1dvWhlWnZLrnocdQc5qvreiB8p7MtbSFYRVZpzmA78tc1eDkFvYZAl7b02WcckSC7U+OD1g2rFT1OGUWyy+e6Q5ofau3rQ4rlQ6WL4idHxZ6gU4I3ADopoL/MWbCuovJlv7i1C+l4VcXfgh4sreoK+lDoP6XjI95qkBtTx8DNcTxywJvVF9IjeR4q4C3pLT+k6G/B/xra/jVhYj0HKnRXExPrS5443vv339qY6tA3lfRgIceeuihLeh/+Q0eYT46MuwAAAAASUVORK5CYII="/></g></svg>
              </div>

              <p> 02 </p>
              <p> SELECT A STORE </p>
            </div>

            <div class="FLAN-345-step step-three">
              <div class="FLAN-345-step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 282.67 251.68"><defs><style>.cls-1,.cls-3{fill:none;}.cls-2{clip-path:url(#clip-path);}.cls-3{stroke:#fff;stroke-miterlimit:10;}</style><clipPath id="clip-path" transform="translate(-156.3 -295.1)"><rect class="cls-1" x="147.64" y="233.44" width="300" height="375"/></clipPath></defs><title>flannels-calendar</title><g class="cls-2"><path class="cls-3" d="M374.78,318.34h-15.3a2.13,2.13,0,0,0-2.13,2.13v7.08a15.84,15.84,0,0,1-15.86,15.82c-.5,0-1,0-1.48-.07a16.11,16.11,0,0,1-14.31-16.2v-6.63a2.13,2.13,0,0,0-2.13-2.13H241.82a2.13,2.13,0,0,0-2.13,2.13v6.63a16.14,16.14,0,0,1-14.31,16.2A15.84,15.84,0,0,1,208.11,329c0-.49-.07-1-.07-1.48v-7.08a2.13,2.13,0,0,0-2.13-2.13h-14a35.1,35.1,0,0,0-35.07,35.07V513.94a20.28,20.28,0,0,0,20.25,20.28h134a2.34,2.34,0,0,0,1.77-3.84,79.73,79.73,0,0,1-7.32-10.44,2.3,2.3,0,0,0-2-1.17h-121a8.79,8.79,0,0,1-8.79-8.79s0-.08,0-.12V380.26a8.79,8.79,0,0,1,8.79-8.79H384.17a8.79,8.79,0,0,1,8.76,8.79v23.43a2.31,2.31,0,0,0,1.71,2.22,75.86,75.86,0,0,1,12,4.56,2.33,2.33,0,0,0,3.11-1.13,2.25,2.25,0,0,0,.22-1v-55a35.07,35.07,0,0,0-35.07-35.07Z" transform="translate(-156.3 -295.1)"/><rect class="cls-3" x="43.52" y="102.2" width="41.4" height="23.73" rx="1.89" ry="1.89"/><rect class="cls-3" x="106.04" y="102.2" width="41.4" height="23.73" rx="1.89" ry="1.89"/><path class="cls-3" d="M366.83,399.19v3.75a76.58,76.58,0,0,0-41.37,15.84V399.19a1.86,1.86,0,0,1,1.83-1.89h37.65A1.89,1.89,0,0,1,366.83,399.19Z" transform="translate(-156.3 -295.1)"/><rect class="cls-3" x="43.52" y="140.06" width="41.4" height="23.73" rx="1.89" ry="1.89"/><path class="cls-3" d="M303.62,437.06v7.68A79,79,0,0,0,298,458.87H264.23a1.89,1.89,0,0,1-1.89-1.86V437.06a1.92,1.92,0,0,1,1.89-1.92h37.62A1.89,1.89,0,0,1,303.62,437.06Z" transform="translate(-156.3 -295.1)"/><rect class="cls-3" x="43.52" y="177.05" width="41.4" height="23.73" rx="1.89" ry="1.89"/><path class="cls-3" d="M296.48,495.94H264.23a1.89,1.89,0,0,1-1.89-1.86V474a1.92,1.92,0,0,1,1.89-1.92h31.23c-.24,2.1-.39,4.23-.45,6.36A79.48,79.48,0,0,0,296.48,495.94Z" transform="translate(-156.3 -295.1)"/><path class="cls-3" d="M223.85,295.6a9.24,9.24,0,0,0-9.24,9.24v22.89a9.24,9.24,0,0,0,18.48,0V304.84A9.24,9.24,0,0,0,223.85,295.6Z" transform="translate(-156.3 -295.1)"/><path class="cls-3" d="M340.82,295.6a9.24,9.24,0,0,0-9.24,9.24v22.89a9.24,9.24,0,0,0,18.48,0V304.84A9.24,9.24,0,0,0,340.82,295.6Z" transform="translate(-156.3 -295.1)"/><path class="cls-3" d="M428.6,446a66.49,66.49,0,0,0-8-10.47,65,65,0,0,0-9.45-8.28,65.72,65.72,0,0,0-83.55,5.67,69,69,0,0,0-5.4,5.76A65.7,65.7,0,1,0,428.6,446Zm-19.26,73.26a52.58,52.58,0,0,1-31.11,14.25v-8.22a5.43,5.43,0,1,0-10.83-.81,5.18,5.18,0,0,0,0,.81v8.22A53.19,53.19,0,0,1,319.91,486h8.28a5.43,5.43,0,1,0,.81-10.83,5.18,5.18,0,0,0-.81,0h-8.25a52.88,52.88,0,0,1,9.51-25.41,54.85,54.85,0,0,1,6.84-7.86,52.85,52.85,0,0,1,31.11-14.28v8.28a5.43,5.43,0,1,0,10.83.8,5.14,5.14,0,0,0,0-.8v-8.19a53.1,53.1,0,0,1,47.46,47.49h-8.25a5.43,5.43,0,0,0,0,10.83h8.25A53,53,0,0,1,409.34,519.29Z" transform="translate(-156.3 -295.1)"/><path class="cls-3" d="M404.87,490.94l-27-13.32v-22a5,5,0,1,0-9.87-.77,4.72,4.72,0,0,0,0,.77v28.11l32.52,16.08a5.06,5.06,0,0,0,2.19.51,4.92,4.92,0,0,0,2.16-9.36Z" transform="translate(-156.3 -295.1)"/></g><g class="cls-2"><path class="cls-3" d="M374.78,318.34h-15.3a2.13,2.13,0,0,0-2.13,2.13v7.08a15.84,15.84,0,0,1-15.86,15.82c-.5,0-1,0-1.48-.07a16.11,16.11,0,0,1-14.31-16.2v-6.63a2.13,2.13,0,0,0-2.13-2.13H241.82a2.13,2.13,0,0,0-2.13,2.13v6.63a16.14,16.14,0,0,1-14.31,16.2A15.84,15.84,0,0,1,208.11,329c0-.49-.07-1-.07-1.48v-7.08a2.13,2.13,0,0,0-2.13-2.13h-14a35.1,35.1,0,0,0-35.07,35.07V513.94a20.28,20.28,0,0,0,20.25,20.28h134a2.34,2.34,0,0,0,1.77-3.84,79.73,79.73,0,0,1-7.32-10.44,2.3,2.3,0,0,0-2-1.17h-121a8.79,8.79,0,0,1-8.79-8.79s0-.08,0-.12V380.26a8.79,8.79,0,0,1,8.79-8.79H384.17a8.79,8.79,0,0,1,8.76,8.79v23.43a2.31,2.31,0,0,0,1.71,2.22,75.86,75.86,0,0,1,12,4.56,2.33,2.33,0,0,0,3.11-1.13,2.25,2.25,0,0,0,.22-1v-55a35.07,35.07,0,0,0-35.07-35.07Z" transform="translate(-156.3 -295.1)"/><rect class="cls-3" x="43.52" y="102.2" width="41.4" height="23.73" rx="1.89" ry="1.89"/><rect class="cls-3" x="106.04" y="102.2" width="41.4" height="23.73" rx="1.89" ry="1.89"/><path class="cls-3" d="M366.83,399.19v3.75a76.58,76.58,0,0,0-41.37,15.84V399.19a1.86,1.86,0,0,1,1.83-1.89h37.65A1.89,1.89,0,0,1,366.83,399.19Z" transform="translate(-156.3 -295.1)"/><rect class="cls-3" x="43.52" y="140.06" width="41.4" height="23.73" rx="1.89" ry="1.89"/><path class="cls-3" d="M303.62,437.06v7.68A79,79,0,0,0,298,458.87H264.23a1.89,1.89,0,0,1-1.89-1.86V437.06a1.92,1.92,0,0,1,1.89-1.92h37.62A1.89,1.89,0,0,1,303.62,437.06Z" transform="translate(-156.3 -295.1)"/><rect class="cls-3" x="43.52" y="177.05" width="41.4" height="23.73" rx="1.89" ry="1.89"/><path class="cls-3" d="M296.48,495.94H264.23a1.89,1.89,0,0,1-1.89-1.86V474a1.92,1.92,0,0,1,1.89-1.92h31.23c-.24,2.1-.39,4.23-.45,6.36A79.48,79.48,0,0,0,296.48,495.94Z" transform="translate(-156.3 -295.1)"/><path class="cls-3" d="M223.85,295.6a9.24,9.24,0,0,0-9.24,9.24v22.89a9.24,9.24,0,0,0,18.48,0V304.84A9.24,9.24,0,0,0,223.85,295.6Z" transform="translate(-156.3 -295.1)"/><path class="cls-3" d="M340.82,295.6a9.24,9.24,0,0,0-9.24,9.24v22.89a9.24,9.24,0,0,0,18.48,0V304.84A9.24,9.24,0,0,0,340.82,295.6Z" transform="translate(-156.3 -295.1)"/><path class="cls-3" d="M428.6,446a66.49,66.49,0,0,0-8-10.47,65,65,0,0,0-9.45-8.28,65.72,65.72,0,0,0-83.55,5.67,69,69,0,0,0-5.4,5.76A65.7,65.7,0,1,0,428.6,446Zm-19.26,73.26a52.58,52.58,0,0,1-31.11,14.25v-8.22a5.43,5.43,0,1,0-10.83-.81,5.18,5.18,0,0,0,0,.81v8.22A53.19,53.19,0,0,1,319.91,486h8.28a5.43,5.43,0,1,0,.81-10.83,5.18,5.18,0,0,0-.81,0h-8.25a52.88,52.88,0,0,1,9.51-25.41,54.85,54.85,0,0,1,6.84-7.86,52.85,52.85,0,0,1,31.11-14.28v8.28a5.43,5.43,0,1,0,10.83.8,5.14,5.14,0,0,0,0-.8v-8.19a53.1,53.1,0,0,1,47.46,47.49h-8.25a5.43,5.43,0,0,0,0,10.83h8.25A53,53,0,0,1,409.34,519.29Z" transform="translate(-156.3 -295.1)"/><path class="cls-3" d="M404.87,490.94l-27-13.32v-22a5,5,0,1,0-9.87-.77,4.72,4.72,0,0,0,0,.77v28.11l32.52,16.08a5.06,5.06,0,0,0,2.19.51,4.92,4.92,0,0,0,2.16-9.36Z" transform="translate(-156.3 -295.1)"/></g></svg>
              </div>

              <p> 03 </p>
              <p> BOOK YOUR STYLING APPOINTMENT </p>
            </div>

            <div class="FLAN-345-step step-four">
              <div class="FLAN-345-step-icon">
                <svg class="bag-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384.15 251.4"><defs><style>.cls-1,.cls-3,.cls-4{fill:none;}.cls-2{clip-path:url(#clip-path);}.cls-3,.cls-4{stroke:#fff;stroke-miterlimit:10;}.cls-3{stroke-width:1.57px;}.cls-5{clip-path:url(#clip-path-2);}</style><clipPath id="clip-path" transform="translate(-157.26 -224.8)"><rect class="cls-1" width="700" height="700"/></clipPath><clipPath id="clip-path-2" transform="translate(-157.26 -224.8)"><rect class="cls-1" x="-2" y="1" width="700" height="700"/></clipPath></defs><title>flannels-shopping-bag</title><g class="cls-2"><circle class="cls-3" cx="102.5" cy="31.89" r="4.09"/><circle class="cls-3" cx="256.71" cy="31.89" r="4.09"/><path class="cls-3" d="M259.76,255.32s-10.24,68.92,73,70.28S414,255.32,414,255.32" transform="translate(-157.26 -224.8)"/><polygon class="cls-4" points="382.95 222.26 355.31 222.26 355.31 249.47 355.65 249.56 382.95 222.26"/><polygon class="cls-4" points="355.31 222.26 382.95 222.26 369.3 0.5 26.08 0.5 25.61 7.67 355.31 7.67 355.31 222.26"/><polygon class="cls-4" points="355.31 7.67 25.61 7.67 18.91 7.67 2.54 249.9 355.31 249.9 355.31 249.47 355.31 222.26 355.31 7.67"/></g><g class="cls-5"><circle class="cls-3" cx="100.5" cy="32.89" r="4.09"/><circle class="cls-3" cx="254.71" cy="32.89" r="4.09"/><path class="cls-3" d="M257.76,256.32s-10.24,68.92,73,70.28S412,256.32,412,256.32" transform="translate(-157.26 -224.8)"/><polygon class="cls-4" points="380.95 223.26 353.31 223.26 353.31 250.47 353.65 250.56 380.95 223.26"/><polygon class="cls-4" points="353.31 223.26 380.95 223.26 367.3 1.5 24.08 1.5 23.61 8.66 353.31 8.66 353.31 223.26"/><polygon class="cls-4" points="353.31 8.66 23.61 8.66 16.91 8.66 0.54 250.9 353.31 250.9 353.31 250.47 353.31 223.26 353.31 8.66"/></g><g id="d9vsYl.tif"><image id="Layer_0" data-name="Layer 0" width="298" height="43" transform="translate(97.08 159.87) scale(0.56)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS0AAAAtCAYAAAD7lD1aAAAACXBIWXMAABPWAAAT1gGxNhB1AAALt0lEQVR4Xu2dMY7j2hFFewnjDRgEvIHZgDEVOvNPHA+dOvHAXsC8HfjvoLUAA57UkbQDT+Bcipz+2cF1l6jXTYmv6hb5SDX5oQNcgJiuW1UUqSL12K15AvD00EMPPbQV0YCHHnrooZH6+KJPL/rqSH/eBHIN1C+yv7NKDT2/6ODoT4ZvTUrg+/4xkGesSnX6eg7kYGqd/PvLz6d6VY3jjyhyHtd4lxQ7J/4J/73xB+JfWp/RnWNHjOMXdD62/6/KG1JItjSlhv7rOoC/oexbiz6gOwiMHXiusYrQgufxlIYpr0iY7lX+Bd6DJxmmHFDjXRKt7+3b/2zrmT/D9y8lwfhBZfEfBIZXv/C9KTW09aHVIoYONh1wLN8YRaitm4Ypr0iY7s38BN6HJSnku6XGuyRa39u3NQ6tf2AZvsKpmzfEci9IqaGtDy29UkT5Ap5vjKL8DJ7LUirk65Mw3Zs5YvpglWG6ATXeJdH63r6tbWg9Y1meYdTOG2Jal6PU0JaHlt7WjuEInnOMxkBvwQ2lUrIeCdO9fbw8nqSU7IYa75JofW/f1jS0nnEfEgr184Y4xqUovRhbHlo7jEfA80Y1Br0jZPlKSqVkPRKme2+ZMlilmOmaGu+SaH1v39YytBrcl8F5kDfEcy1E6QXZ8tCKLMDfsgPPG9VYpnw8TcVMbyRM996yB+/nVlJKdEONd0m0vrdvaxlaO8T4ge6ppi5HpJ4Ol59F2eOmh7whjimjJ7nMqKeCtjq0Wkxn6vrNrcYyZVE+FTO9kTDdW6IF76kvKae5osaryEJix2INQ6sBRwdSgr8/+rP2RScjxy1Xd1t5Q1xLh8awnarVVofWHtNJ4PkjmsIOPG9fqZzmFW9fmLfE2MEq5TRX1HgV1sNSWsPQEvjowBrzsf4jYnddVw+Pos0oGsOaqNUWh1aDOo7gNSKaioDnzkpGjkzCdK/FmKedYuToU+NVWA9LaQ1DK8GnBc9xq7aY6ZoDep68Ia6lQ2NYA7Xa4tDSN5XH4UXfSUzN7yZlTeUInjsrlVO8kjDd6yHgvT0hdh7XeBXWw1LawtAS8BwlnUrJbniNzxvix5+Z2tAYbXFosQX4Ft16oMc38DpMNSTw/E/gJ62Xh3k9ok87xUrQo8arsB6W0haG1tSL766U7IbX+LwhfvwZjWHFa7W1oaUHiaFrMg0LQv3f3dWggzdSP1kJLiRM9zIiTzvFdL9R41VYD0tpC0NLLy5j1iCzGox4MJE3BByNYcVrtbWhpXdIHrsRsQl2nYhq2YPXSJb5grcPzMuIDFYx3W/UeBWv/pJaw9CKXKSPL/ojeK7JyhsCjsbQhJXa0tBqwOnfLrck9ghe0xMj8pSG3d4n23omYbr3RH6usD+oFtv6So1X8eovqTUMLVXkPFKO6P42cczTxJDyhoCjMTRhpbY0tBJ8fuA6/oMffqYFr2uJwdbVlCP823u2zwl1XvbAQhHYNcTxZWq8iuVfWmsZWjuMR++S9YLzGfxumSpvCDgaQxNWaktD6wifHYaeneuIfUSzxBDwJ51Kgl0jOT6g3iskRjnCrhHx13iV/cyK/krHWoaWXtSid1sWR3R/v/gZE4ZY3hDchwS/oa0Mrchn+9JtccTXgNcviSGIn3DWLX3yTKgfWhpXM1jFM12w+ot4l+AAfmxVaxlaqhbzskc3wEKL+HlDComWIMFvaCtDawefE2wvGxrRK++tGIIuLjI49yjXSI4HmGdoRQdrg2ENcR0dVn8R7xIcwI+tak1DSxVZbhhL/hbTBk7tvCHlHLOT4L8QWxhakbWpBNu/c3zKL7C9nhiCt9gDiVVaDGsk1zHP0FK1JFbZY1hDPMMFq7+Idwn0WFg99bW2oaVqEbvAjEXfA3+FUTdviGmflwT/RdjC0IpcYRrY/o+OL9OC93ErhuAttiGxSunv/pLrmG9oqQ5++Jnbp53ih5+x+ot4l0D30+qprzUOLZWeIwnLDK89CjXzhti+WdGd816ALQytI3y+g+c4me6O6G+A98UQXMcnP/zMDuM8CdfxNd7GDz9zxPVgFTe6w+ov4l2CA/ixVa11aGU16M6XuYfXM25q5Q1xTHOS4O/42oeWgKN3YixPMt1vWIvhlhjaez9e3+wn19HR97G+E65rjNnnkpd5lP4aoJBYxeov4l2CA/ixVa19aPUl6I7LCfNw9Z7qF7kHCf7Orn1o7cCJPAFpTPcbWovl6YshGHrEdXT07/oSiU0Y1qj1njzThTzgI/tj9RfxKjKzohenLQ2tvhp0yx07xI5liaulipxYXEuHxrAGa7XmoRVZgP8Gnifru5EjM/a7pBiCsu+bZ7qQr3SJxCXY/U31ime6sEc81uov4lUs/9La6tC6VYNuiOl5N+ajpHrOOXIi8ePPaAxrqFZrHlotOEfwXybMOoKjNVlfWQxB2deAnzz57/4SidOfW/3VeKODVVgQ7BoRr2L5l9avZWj1NWYRf4+LL5vFDe/QGNZErdY8tMb892BzcQTvK4shsL3J8WX0zzBYnP58ag3Pqyc3O7F1sP5EYhSrhnimHpZ/af0ah1aWfkQ+gXOOzyYhwYrGsOK1WuvQ0hf1vRDw/p5M9xssD/u4quzJzxPs/MnxAXy984ttfeXIAmDnF8/Uw+txSb3n0NKLxid0397w9aI9rj8xjFnKKKkF51wjG4QEKxrDCtdqrUNrh/dDa7P+nkz3GwLfL7Y1TIKdPzk+gA8tVWSwMmr3n/W4lN57aDFa8Dy1NeRFj6EVkL6Y7NtJlyZyFWMIeI6d6Y6RYOdOjg+IDa057nit3OKZerAel9J7Di0V+3i+A8/hqRmmHCAvegytgFq8P/npnSeGgOeIrB15JNi5k+MDYkNL9bOVIIiVVzxTD9bfUnrvoXWAT+RLGj21w5QDzvmzQUiwojGscK3WOLT2eH+O4H0yBDyHKrJ2ZJFg502OD4gPLR2sJyNHBCuveKYerL+l9N5DK3JeTP26ZdV+mG7AOTYbhAQrGsMK12ptQ6sBZweehyly9yDwczCYv6+DkYORYOdMjg+IDy1V5CmhhZVTPFMP1ttSeu+h1SDGM3iuWz0X8tyi65nn+GwSP/6MxrDitVrb0IoME30DsTxMzSDrkG/wczAEvI+sqWtHCXbO5PiAcUNLdSinoVj5xDP1YH0tpfceWqoDYhwRO980Zl/MMCTh4uubGZEmasWG1r/RNT+nfgO7H7YAf4LtHasDOA1sP0PAe+grMrBvSbDzJccHjB9aDaatv1n5xDP1+LSgvI9WbGjpRS3NrN/iuoexFzP9uKjfE69fM/Ppos/ofmVizO896nF+fW1yM+JaOjTm9oWcW2xoLcHvUO6l9UwX9I3N9imqSL0E288Q8B76mrJ25PWXHB8wfmhFcpawcolnuhPag9UfG1pL8HsM+5hyMavl6n025oB5L+hcWtPQ+uaZLjTg+xRV5MndEbafIeA93Grs2lGCnSs5PmDa0FJ9LyVzsPKIZ7oT2oPV31qGlp6nY1/zGrTW1R3omAPmvaBzaS1Dq3EdHa8LgzNqB461hsYQ8PolHUrJDBLsPMnxAdOHlpSSOcyVZwm0B6u/tQwt1b0G19XHwqwxB8x7QefSWoZWch0dLfj+jFVkzWCPspch4PVLakrJDBLsPMnxAdOHlmpXyGdh5RDPdCe0B6u/NQ0tVYNlB9cJxtf2jDlg3gs6l9YytI6e4YK3aFqjyInQYOhjCHhtS6mQr4TGTc3heZkiH60zVg7xTHdCe7D6W9vQykqmexp6HDWn+f4ac8C8F3QurWFoRdZxduD7MlUtOKUHAAwBr+3pNEw5IMH2J8cH1A0tVTtMWcTyi2e6E9qD1d9ah5ZKB8wXxM4RC71YJwRuBvJGA//RZ8K8i86W/uLUX0q3v/LwU8BTvG2dSR8C9b8UfMzTBGp7+hioIY5fKrxRfSE1kuNtAt6l1cDu7+8B/9y6/ZWHiPQ8adFdWA8XnfDGj96//3yJbQJ5X0UDHnrooYfWpP8DQeDWvnIgXkcAAAAASUVORK5CYII="/></g></svg>
              </div>

              <p> 04 </p>
              <p> PERSONAL SHOPPERS </p>
            </div>

          </div>

          <a class="styled-button" href="#" id="FLAN-345-SC-continueshopping"><span>CONTINUE SHOPPING</span></a>



        </div>
      </div>

    </div>

  `;

  document.body.insertAdjacentHTML('beforeend', popupHTML);

  // add link click opening events

  let bannerClickElement = document.getElementById('banner-what-is-SC');
  bannerClickElement.addEventListener('click', (e) => {
    e.preventDefault();
    if(!document.querySelector('.FLAN-345-SC-popup').classList.contains('active')) {
      document.querySelector('.FLAN-345-SC-popup').classList.add('active');
      document.documentElement.classList.add('FLAN-345-noscroll');
      events.send(`${ID} Variation ${VARIATION}`, 'Click', `Opened popup via clicking SC banner - user saw: ${method}`);
    }
  });

  let linkClickElement = document.getElementById('what-is-SC');
  linkClickElement.addEventListener('click', (e) => {
    e.preventDefault();
    if(!document.querySelector('.FLAN-345-SC-popup').classList.contains('active')) {
      document.querySelector('.FLAN-345-SC-popup').classList.add('active');
      document.documentElement.classList.add('FLAN-345-noscroll');
      events.send(`${ID} Variation ${VARIATION}`, 'Click', `Opened popup via what is SC button - user saw: ${method}`);
    }
  });

  // add close events (on the X, outwith the modal and when the user clicks the 'continue shopping' button)

  let closeClickElement = document.getElementById('FLAN-345-SC-close-element');
  closeClickElement.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.FLAN-345-SC-popup').classList.remove('active');
    document.documentElement.classList.remove('FLAN-345-noscroll');
  });

  let ctbClickElement = document.getElementById('FLAN-345-SC-continueshopping');
  ctbClickElement.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.FLAN-345-SC-popup').classList.remove('active');
    document.documentElement.classList.remove('FLAN-345-noscroll');
  });

  let outwithInnerClickElement = document.querySelector('.FLAN-345-SC-overlay');
  outwithInnerClickElement.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.FLAN-345-SC-popup').classList.remove('active');
    document.documentElement.classList.remove('FLAN-345-noscroll');
  });


  

}


const displaySCBanner = (bannerMethod) => {

  // comment this out before putting into the platform
  //let imageURL = "https://cdn-eu.dynamicyield.com/api/9876944/images/911c0b97ba19__sc-header.jpg";

  let bannerHTML = `

    <div class="FLAN-345-SC-banner">
      <a href="#" id="banner-what-is-SC" class="FLAN-345-SC-banner-link">
        <div class="SC-banner-logo">
          <img id="sc-banner-image" src="" alt="style & collect from Flannels logo" />
        </div>

        <div class="SC-banner-text">
          <p>${ bannerMethod == "less-than-250" ? "<span>Spend £250</span> to be eligible" : "Select <span>Click &amp; Collect</span> at checkout" }</p>
        </div>
        
      </a>
      <a href="#" id="what-is-SC" class="what-is-SC"> What is Style &amp; Collect?</a>
    </div>
  `;

  let atbContainer = document.querySelector('.BasketWishContainer');
  atbContainer.insertAdjacentHTML('afterbegin', bannerHTML);

  createSCPopup(bannerMethod);



}

const checkBasketAmount = () => {

  let priceElement = document.getElementById('spanBagSubTotalValue');
  let reg = /,|\$|\£|\€/g;
  let priceAmount = parseFloat(priceElement.innerHTML.replace(reg, ''));
  return priceAmount;

}

export default () => {
  setup();

  logMessage(ID + " Variation "+VARIATION);
  
  let checkAmt = checkBasketAmount();

  if(checkAmt < 250) {
    logMessage("less than 250, initialising, basket amount: "+checkAmt);
    displaySCBanner('less-than-250');
  } else {
    logMessage("more than 250, initialising, basket amount: "+checkAmt);
    displaySCBanner('more-than-250');
  }


  // Trigger re render on pagniation change
  const wrap = document.querySelector('#spanBagSubTotalValue');
  observer.connect(wrap, (e) => {
    let amount = checkBasketAmount();
    let eleToChange = document.querySelector('.FLAN-345 .SC-banner-text p');
    if(amount < 250) {
      eleToChange.innerHTML = "<span>Spend £250</span> to be eligible";
    } else {
      eleToChange.innerHTML = "Select <span>Click &amp; Collect</span> at checkout";
    }


  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: false,
    }
  })


};
