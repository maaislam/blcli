import shared from "../../../../../core-files/shared";
import { getSiteFromHostname } from "./helpers";


const { ID } = shared;

let storeLink;
let virtualLink;
let buyingGuidesLink;
let storeLocLink;
let termsLinks;
let liveCallLink;
let accountLink;
let contactLink;

// all links
if(getSiteFromHostname() === 'ernestjones') {
    storeLink = 'https://www.ernestjones.co.uk/webstore/store-appointment-booking.cdo';
    virtualLink = 'https://www.ernestjones.co.uk/webstore/store-appointment-booking.cdo/?client=ernest_jones&service=48321&company=37397';
    buyingGuidesLink = 'https://www.ernestjones.co.uk/webstore/static/guides/buyersGuides.cdo?icid=ej-fn-guides';
    storeLocLink = 'https://www.ernestjones.co.uk/webstore/secure/storeLocator.sdo?icid=ej-tn-topbar-store';
    liveCallLink = 'https://www.ernestjones.co.uk/?gis=wo';
    termsLinks = 'https://www.ernestjones.co.uk/terms/?icid=ej-fn-ess-terms';
    contactLink = 'https://www.ernestjones.co.uk/webstore/secure/message/customer-services/show.sdo?icid=ej-fn-ess-contact';
    accountLink = 'https://www.ernestjones.co.uk/webstore/secure/account/login.sdo';
    
} else if(getSiteFromHostname() === 'hsamuel') {
    storeLink = 'https://www.hsamuel.co.uk/webstore/store-appointment-booking.cdo';
    virtualLink = 'https://www.hsamuel.co.uk/webstore/store-appointment-booking.cdo/?client=h_samuel&service=49232&company=37398';
    buyingGuidesLink = '#';
    storeLocLink = 'https://www.hsamuel.co.uk/webstore/secure/storeLocator.sdo';
    liveCallLink = 'https://www.hsamuel.co.uk/?gis=wo';
    termsLinks = 'https://www.hsamuel.co.uk/terms/';
    contactLink = 'https://www.hsamuel.co.uk/webstore/secure/message/customer-services/show.sdo';
    accountLink = 'https://www.hsamuel.co.uk/webstore/secure/authenticated/account/checkSignedIn.sdo';
}

export const liveAdviceBox = 
`<div class="live-chat__chat-options-container ${ID}-liveChatOptions">
    <div class="${ID}-helpSection ${ID}-fullWidth live-chat__chat-option">
        <h3><span>What can we help you with today?</span></h3>
        <p>I'd like help with</p> 
        <div class="${ID}-select">
       
                <input type="radio" id="${ID}-option-1" name="option" value="virtual">
                <input type="radio" id="${ID}-option-2" name="option" value="policy">
                <input type="radio" id="${ID}-option-3" name="option" value="store">
                <input type="radio" id="${ID}-option-4" name="option" value="existing">
                <input type="radio" id="${ID}-option-5" name="option" value="service">
                <input type="radio" id="${ID}-option-6" name="option" value="prepurchase">
                <input type="radio" id="${ID}-option-7" name="option" value="appointment">
                <input type="radio" id="${ID}-option-8" name="option" value="repair">
            
    
                <div class="${ID}-select_box">
                    <span id="select-op-btn" class="${ID}-default ${ID}-option">Please Select</span>
                    <ul id="options" class="${ID}-closed">
                        <li>
                            <label for="${ID}-option-6" class="${ID}-option">Pre-purchase advice</label>
                        </li>
                        <li>
                            <label for="${ID}-option-7" class="${ID}-option">Book an appointment</label>
                        </li>
                        <li>
                            <label for="${ID}-option-3" class="${ID}-option">Store Information</label>
                        </li>
                        <li>
                            <label for="${ID}-option-4" class="${ID}-option">Existing Order Query</label>
                        </li>
                        <li>
                            <label for="${ID}-option-8" class="${ID}-option">Repair Query</label>
                        </li>
                        <li>
                            <label for="${ID}-option-5" class="${ID}-option">Customer Service</label>
                        </li>
                        <li>
                            <label for="${ID}-option-2" class="${ID}-option">Policy Query</label>
                        </li>
                        
                        <li>
                            <label for="${ID}-option-1" class="${ID}-option">Virtual product view</label>
                        </li>
                    </ul>
                </div>
        </div>
    </div>  
    <div class="${ID}-options">  
        <div class="${ID}-box ${ID}-ctaSection ${ID}-storeLoc ${ID}-fullWidth" opt-target="store">
            <div class="${ID}-content">
                <p>You can also find this on our <b>Store Locator</b> page</p>
                <div class="${ID}-contentCTA">
                    <a class="live-chat__cta ${ID}-back"><span>Back</span></a> 
                    <a target="_blank" href="${storeLocLink}" class="live-chat__cta"><span>Store Locator</span></a> 
                </div>
            </div>
        
        </div>
        <div class="${ID}-box ${ID}-ctaSection ${ID}-terms ${ID}-fullWidth" opt-target="policy">
            <div class="${ID}-content">
            <p>You can also find this on our <b>Terms & Conditions</b> page</p>
                <div class="${ID}-contentCTA">
                    <a class="live-chat__cta ${ID}-back"><span>Back</span></a> 
                    <a href="${termsLinks}" class="live-chat__cta"><span>Terms & Conditions</span></a> 
                </div>
            </div>
        </div>

        <div class="${ID}-box ${ID}-virtual live-chat__chat-option " opt-target="virtual, policy">
            <div class="live-chat__content"> 
                <h3><span>Virtual product view</span></h3> 
            <ul> 
                <li>Virtual showcase of your products</li>
                <li>Virtual viewing</li>
                <li>Product advice</li>
            </ul> 
            <a target="_blank" href="#" class="live-chat__cta ${ID}-liveCallButton">
                <span>Begin phone call</span>
            </a> 
            </div>
        </div>


        
        <div class="${ID}-box ${ID}-liveCall live-chat__chat-option" opt-target="prepurchase, virtual">
            <div class="live-chat__content"> 
                <h3><span>Live call - a personalised shopping experience from the comfort of your own home</span> </h3> 
                <ul> 
                    <li>Talk to a jewellery/watch expert</li>
                    <li>Product queries</li>
                    <li>Pre sales advice</li>
                </ul> 
                <a href="#" class="live-chat__cta ${ID}-liveCallButton"><span>Begin phone call</span></a> 
            </div>
        </div>

        <div class="${ID}-box ${ID}-liveChat live-chat__chat-option" opt-target="existing, repair, service, policy">
            <div class="live-chat__content"> 
                <h3><span>Live chat - with one of our customer service advisors</span></h3> 
                <ul> 
                    <li>Online order enquiries</li>
                    <li>Online payment queries</li>
                    <li>Store information</li>
                    </ul> 
                    <a href="#" class="live-chat__cta ${ID}-liveChatButton"><span>Begin live chat</span></a> 
            </div>
        </div>

        ${getSiteFromHostname() === 'ernestjones' ? `<div class="${ID}-box ${ID}-buyingGuide live-chat__chat-option" opt-target="prepurchase">
            <div class="live-chat__content"> 
                <h3><span>Buying guides</span> </h3> 
                <ul> 
                    <li>Extra product information</li>
                    <li>Product queries</li>
                    <li>Guide for all categories</li>
                </ul> 
                <a href="${buyingGuidesLink}" class="live-chat__cta"><span>Buying Guides</span></a> 
            </div>
        </div>` : ''}

        <div class="${ID}-box ${ID}-contact live-chat__chat-option" opt-target="service">
            <div class="live-chat__content"> 
                <h3> <span>Contact us</span> </h3> 
                <ul> 
                    <li>Contact numbers</li>
                    <li>Customer service open hours</li>
                </ul> 
                <a target="_blank" href="${contactLink}" class="live-chat__cta"><span>Contact us</span></a> 
            </div>
        </div>

        <div class="${ID}-box ${ID}-account live-chat__chat-option" opt-target="existing, repair">
            <div class="live-chat__content"> 
                    <h3> <span>Your account</span> </h3> 
                    <ul> 
                        <li>Contains tracking links to orders</li>
                        <li>Estimated order arrival</li>
                        <li>View your order details</li>
                    </ul> 
                    <a href="${accountLink}" class="live-chat__cta"><span>Your account</span></a> 
            </div>
        </div>

        <div class="${ID}-box ${ID}-onlineAppt live-chat__chat-option ${ID}-boxShow" opt-target="appointment, prepurchase, service">
            <div class="live-chat__content"> 
                <h3> <span>Book a virtual online appointment</span> </h3> 
                <ul> 
                    <li>Using a camera is optional</li>
                    <li>Expert knowledge, virtually</li>
                    <li>Scheduled at your own convenience</li>
                </ul> 
                <a href="#" class="live-chat__cta js-live-chat-virtual-appointment__cta ${ID}-onlineAppt"><span>Book now</span></a> 
            </div>
        </div>
        
        <div class="${ID}-box ${ID}-inStoreAppt live-chat__chat-option ${ID}-boxShow" opt-target="store, appointment, service, prepurchase">
             <div class="live-chat__content"> 
                <h3> <span>Book an in-store appointment</span> </h3> 
                <ul> 
                    <li>Book in-store appointment</li>
                    <li>Friendly expert advice</li>
                    <li>In a safe environment</li>
                </ul> 
                <a target="_blank" href="#" class="live-chat__cta ${ID}-storeAppt"><span>Book now</span></a> </div></section>
        </div>
    </div>
</div>`;


