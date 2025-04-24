import { events, pollerLite } from "../../../../../lib/utils";
import { getSiteFromHostname } from "./services";
import shared from "./shared";

const { ID, VARIATION } = shared;

export default class ServicePopup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-lightboxModal`);

      if(VARIATION === '1') {
        element.innerHTML = `
            <div class="${ID}-modalInner">
                <div class="${ID}-close"></div>
                <div class="${ID}-titleBox">
                    <h3><span></span>Talk to an expert.</h3>
                    <p class="${ID}-mobileText">We know you can't get into our stores at the minute, so why not speak to one of our online experts?</p>
                </div>
                <div class="${ID}-innerContent">

                    <div class="${ID}-contentBlock ${ID}-call">
                        <div class="${ID}-blockTitle">
                            <span></span><h3><b>Live Call</b> - a personalised shopping experience from the comfort of your own home</h3>
                        </div>
                        <ul class="${ID}-mobilePoints">
                            <li>Talk to a jewellery/ watch expert</li>
                    </ul>
                        <ul class="${ID}-desktopPoints">
                            <li>Talk to a jewellery/ watch expert</li>
                            <li>Product queries</li>
                            <li>Pre sales advice</li>
                        </ul>
                        <div class="${ID}-button" data-target="live-call">Begin phone call</div>
                    </div>

                    <div class="${ID}-contentBlock ${ID}-liveChat">
                        <div class="${ID}-blockTitle">
                            <span></span><h3><b>Live chat</b> - with one of our customer service advisors </h3>
                        </div>
                        <ul class="${ID}-mobilePoints">
                            <li>Online order enquiries</li>
                        </ul>
                        <ul class="${ID}-desktopPoints">
                            <li>Online order enquiries</li>
                            <li>Online payment queries</li>
                            <li>Store information</li>
                        </ul>
                        <div class="${ID}-button" data-target="live-chat">Begin live chat</div>
                    </div>

                    <div class="${ID}-contentBlock ${ID}-appointment">
                    <div class="${ID}-blockTitle">
                        <span></span><h3>Book a <b>Virtual Online Appointment</b></h3>
                    </div>
                    <ul class="${ID}-mobilePoints">
                        <li>Using a camera is optional</li>
                    </ul>
                    <ul class="${ID}-desktopPoints">
                        <li>Using a camera is optional</li>
                        <li>Expert knowledge, virtually</li>
                        <li>Scheduled at your own convenience</li>
                    </ul>
                    <div class="${ID}-button" data-target="appointment">Book an expert</div>
                    </div>

                    <div class="${ID}-contentBlock ${ID}-storeappointment">
                        <div class="${ID}-blockTitle">
                            <span></span><h3>Book an <b>In-Store Appointment</b></h3>
                        </div>
                        <ul class="${ID}-mobilePoints">
                            <li>Friendly expert advice</li>
                        </ul>
                        <ul class="${ID}-desktopPoints">
                            <li>Book in-store appointment</li>
                            <li>Friendly expert advice</li>
                            <li>In a safe environment</li>
                        </ul>
                        <div class="${ID}-button" data-target="storeappointment">Book an in-store appointment</div>
                    </div>        
                    
                </div>
            </div>
        `;
      } else if (VARIATION === '2') {
        element.innerHTML = `
        <div class="${ID}-modalInner">
            <div class="${ID}-close"></div>
            <div class="${ID}-titleBox">
                <h3>We're still here to help</h3>
                <p class="${ID}-mobileText">We know you can't get into our stores at the minute, so why not speak to one of our online experts?</p>
            </div>
            <div class="${ID}-innerContent">

                <div class="${ID}-contentBlock ${ID}-call">
                    <div class="${ID}-icon"></div>
                    <div class="${ID}-blockText">
                        <h4>Live Call</h4>
                        <div class="${ID}-mobilePoints">
                            <p>A personalised shopping experience from the comfort of your own home. </p>
                        </div>
                        <div class="${ID}-desktopPoints">
                            <p>A personalised shopping experience from the comfort of your own home. </p>
                        </div>
                        <div class="${ID}-button" data-target="live-call">Begin live call</div>
                    </div>
                </div>

                <div class="${ID}-contentBlock ${ID}-liveChat">
                    <div class="${ID}-icon"></div>
                    <div class="${ID}-blockText">
                        <h4>Live Chat</h4>
                        <div class="${ID}-mobilePoints">
                            <p>Our customer service advisors are on hand to help you with any queries.</p>
                        </div>
                        <div class="${ID}-desktopPoints">
                            <p>Our customer service advisors are on hand to help you with any online order or payment queries.</p>
                        </div>
                        <div class="${ID}-button" data-target="live-chat">Begin live chat</div>
                    </div>
                    
                </div>

                <div class="${ID}-contentBlock ${ID}-appointment">
                    <div class="${ID}-icon"></div>
                    <div class="${ID}-blockText">
                        <h4>Virtual Appointment</h4>
                        <div class="${ID}-mobilePoints">
                        <p>Schedule at your own convience. Camera is optional.</p>
                        </div>
                        <div class="${ID}-desktopPoints">
                            <p>Schedule a virtual appointment at your own convience and get expert knowledge. Camera is optional.</p>
                        </div>
                        <div class="${ID}-button" data-target="appointment">Book appointment</div>
                    </div>
                 </div>

                <div class="${ID}-contentBlock ${ID}-storeappointment">
                    <div class="${ID}-icon"></div>
                    <div class="${ID}-blockText">
                        <h4>In-Store Appointment</h4>
                        <div class="${ID}-mobilePoints">
                        <p>Book an in-store appointment and recieve friendly expert advice.</p>
                        </div>
                        <div class="${ID}-desktopPoints">
                            <p>Book an in-store appointment and recieve friendly expert advice in a safe environment.</p>
                        </div>
                        <div class="${ID}-button" data-target="storeappointment">Book appointment</div>
                    </div>
                   
                    
                </div>        
            </div>
        </div>
    `;
      }
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
        let storeName;
         if(getSiteFromHostname() === 'ernestjones') {
            storeName = 'EJ101-mainclosed';
        } else {
            storeName = 'HS101-mainclosed';
        }

        const sideTab = document.querySelector(`.${ID}-sideBar`);

        // check inactive once tab is shown
        const inactivityTime = function () {
            var time;
            window.onload = resetTimer;
            // DOM Events
            document.onmousemove = resetTimer;
            document.onkeypress = resetTimer;
            document.onmousemove = resetTimer;
            document.onmousedown = resetTimer; // touchscreen presses
            document.ontouchstart = resetTimer;
            document.onclick = resetTimer;     // touchpad clicks
            document.onkeydown = resetTimer;   
            window.addEventListener('scroll', resetTimer, true)
        
            function animate() {
                sideTab.classList.add(`${ID}-animate`);
                sideTab.classList.remove(`${ID}-noanimate`);
            }
        
            function resetTimer() {
                clearTimeout(time);
                if(sideTab.classList.contains(`${ID}-animate`)) {
                   sideTab.classList.add(`${ID}-noanimate`);
                }
                sideTab.classList.remove(`${ID}-animate`);
                time = setTimeout(animate, 10000)
            }
        };


        const closedBox = () => {
            // class to hide it
            component.classList.remove(`${ID}-modalShow`);
 
            component.classList.remove(`${ID}-liveChatAvailable`);
            component.classList.remove(`${ID}-liveCallAvailable`);
            component.classList.remove(`${ID}-sideBox`);

            if(component.classList.contains(`${ID}-firstShow`)) {
                localStorage.setItem(`${storeName}`, 1);
                sideTab.classList.add(`${ID}-sideTabShow`);
                component.classList.remove(`${ID}-firstShow`);

                inactivityTime(); 
            }

            document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayShow`);
            document.body.classList.remove(`${ID}-noScroll`);
        }

        const openBox = () => {
            component.classList.add(`${ID}-modalShow`);
            document.body.classList.add(`${ID}-noScroll`);
            document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);
            component.classList.add(`${ID}-sideBox`);

            if(document.querySelector('.live-chat__content .live-chat__cta')) {
                component.classList.add(`${ID}-liveChatAvailable`);
            }
            if(document.querySelector('.live-chat__cta.js-gis-link')) {
                component.classList.add(`${ID}-liveCallAvailable`);
            }
        }

        component.querySelector(`.${ID}-close`).addEventListener('click', () => {
            events.send(`${ID} variation: ${VARIATION}`, 'click', 'lightbox closed');
            closedBox();
        });
        document.querySelector(`.${ID}-overlay`).addEventListener('click', () => {
            events.send(`${ID} variation: ${VARIATION}`, 'click', 'lightbox closed');
            closedBox();
        });

        sideTab.addEventListener('click', () => {
            events.send(`${ID} variation: ${VARIATION}`, 'click', 'side tab');
            openBox();
        });

        // button events
        const bookExpert = document.querySelector('.live-chat__content .js-live-chat-virtual-appointment__cta');
        component.querySelector(`.${ID}-button[data-target="appointment"]`).addEventListener('click', () => {
            console.log('click');
            pollerLite(['.live-chat__content .js-live-chat-virtual-appointment__cta',], () => {
                closedBox();
                bookExpert.click();
                events.send(`${ID} variation: ${VARIATION}`, 'click', 'book an expert button');
            });
        });

        const liveCall = document.querySelector('.live-chat__content .live-chat__cta.js-gis-link');
        component.querySelector(`.${ID}-button[data-target="live-call"]`).addEventListener('click', () => {
            pollerLite(['.live-chat__content .live-chat__cta.js-gis-link',], () => {
                closedBox();
                liveCall.click();
                events.send(`${ID} variation: ${VARIATION}`, 'click', 'live call button');
            });
        });

        const liveChat = document.querySelector('.live-chat__chat-option.js-live-chat-whoson .live-chat__cta');
        component.querySelector(`.${ID}-button[data-target="live-chat"]`).addEventListener('click', () => {
            pollerLite(['.live-chat__chat-option.js-live-chat-whoson .live-chat__cta',], () => {
                closedBox();
                liveChat.click();
                events.send(`${ID} variation: ${VARIATION}`, 'click', 'live chat button');
            });
        });

        component.querySelector(`.${ID}-button[data-target="storeappointment"]`).addEventListener('click', () => {
            closedBox();
            if(getSiteFromHostname() === 'ernestjones') {
                window.location.href = 'https://booking.ernestjones.co.uk/#/map';
            } else {
                window.location.href = 'https://booking.hsamuel.co.uk/#/map';
            }
            events.send(`${ID} variation: ${VARIATION}`, 'click', 'book in-store appt button');
        });

    }
  
    render() {
      const { component } = this;
      document.body.appendChild(component);

      let storeName;
      if(getSiteFromHostname() === 'ernestjones') {
         storeName = 'EJ101-mainclosed';
     } else {
         storeName = 'HS101-mainclosed';
     }

     if(!localStorage.getItem(`${storeName}`, 1)) {
        setTimeout(() => {

                component.classList.add(`${ID}-modalShow`);
                component.classList.add(`${ID}-firstShow`);
                document.body.classList.add(`${ID}-noScroll`);
                document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);

                if(document.querySelector('.live-chat__cta.js-gis-link')) {
                    component.classList.add(`${ID}-liveCallAvailable`);
                }
                events.send(`${ID} v:${VARIATION}`, 'seen', `lightbox shown`);
            
        }, 5000);
    } else {

        const sideTab = document.querySelector(`.${ID}-sideBar`);

        // check mouse inactive if pop up is never shown
        const inactivityTime = function () {
            var time;
            window.onload = resetTimer;
            // DOM Events
            document.onmousemove = resetTimer;
            document.onkeypress = resetTimer;
            document.onmousemove = resetTimer;
            document.onmousedown = resetTimer; // touchscreen presses
            document.ontouchstart = resetTimer;
            document.onclick = resetTimer;     // touchpad clicks
            document.onkeydown = resetTimer;   
            window.addEventListener('scroll', resetTimer, true)
        
            function animate() {
                sideTab.classList.add(`${ID}-animate`);
                sideTab.classList.remove(`${ID}-noanimate`);
            }
        
            function resetTimer() {
                clearTimeout(time);
                if(sideTab.classList.contains(`${ID}-animate`)) {
                   sideTab.classList.add(`${ID}-noanimate`);
                }
                sideTab.classList.remove(`${ID}-animate`);
                time = setTimeout(animate, 10000)
            }
        };
    
      
      sideTab.classList.add(`${ID}-sideTabShow`);
      inactivityTime(); 
      events.send(`${ID} v:${VARIATION}`, 'seen', `tab shown`);
       
    }
  }
}
