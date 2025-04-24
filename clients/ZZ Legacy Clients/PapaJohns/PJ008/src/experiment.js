import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as content from './lib/PJ008-html.js';


const PJ008 = (() => {
    const activate = () => {

        const notLoggedIn = () =>{
            document.body.classList.add('PJ008');


        const headerBlock = document.getElementById('ctl00__objHeader_upOneClickPopup');
        const parent = document.getElementById('aspnetForm');


            const newHeaderBlock = document.createElement('div');

            newHeaderBlock.classList.add('PJ008-header_Wrapper');
            newHeaderBlock.innerHTML = content.headerHTML;
            
            parent.insertBefore(newHeaderBlock, headerBlock.nextSibling);


            //create the postcode box
            const postcodeBoxWrap = document.createElement('div');
            postcodeBoxWrap.classList.add('PJ008-postcode_Wrap');
            postcodeBoxWrap.innerHTML = content.popupMarkup;

            newHeaderBlock.appendChild(postcodeBoxWrap);

            //Add the buttons
            const buttonArr = content.buttons,
            buttonWrapper = document.querySelector('.PJ008-buttons');
            buttonArr.forEach(element => {
                const typeButton = document.createElement('div');
                typeButton.classList.add(element[0]);
                typeButton.innerHTML = '<span>'+element[1]+'</span>';

                buttonWrapper.appendChild(typeButton);
                
            });

            const hiddenPostcode = document.getElementById('ctl00_cphBody_txtPostcode');

            //if postcode is there by default
            if(hiddenPostcode.value != 'null'){
                document.getElementById('PJ008-postcode').value = hiddenPostcode.value;
            }

            //delivery and collection button functions 
            const postcodeField = document.querySelector('#ctl00_cphBody_txtPostcode');
            
            const collectionButton = document.querySelector('.PJ008-collect'),
            deliveryButton = document.querySelector('.PJ008-deliver');

            collectionButton.addEventListener('click', function(){
                collectionFunction();
                utils.events.send('PJ008', 'Collection click', 'PJ008 collection clicked', {
                    sendOnce: true
                });
            });
            deliveryButton.addEventListener('click', function(){
                deliveryFunction();
                utils.events.send('PJ008', 'Delivery click', 'PJ008 Deliver to me clicked', {
                    sendOnce: true
                });
            });


            //Automatically clicks the get started button and fires one of the existing functions
            const $newpostCode = document.getElementById('PJ008-postcode');

            const collectionFunction = () => {
                const postcodeField = document.querySelector('#ctl00_cphBody_txtPostcode');
                const newPostcodeValue = $newpostCode.value;
                    postcodeField.value = newPostcodeValue;


                __doPostBack('ctl00$cphBody$lbGetStarted',''); 
                document.body.classList.add('PJ008-boxOpened');
                
                setTimeout(function(){
                    const errorMessage = $('#ctl00_cphBody_pnlPostCodeError');
                    if(!errorMessage.length){
                        __doPostBack('ctl00$_objHeader$lbOrderForCollection','');
                    }
                },1000);
            }

            const deliveryFunction = () => {
                const postcodeField = document.querySelector('#ctl00_cphBody_txtPostcode');
                const newPostcodeValue = $newpostCode.value;
                postcodeField.value = newPostcodeValue;
                __doPostBack('ctl00$cphBody$lbGetStarted',''); 
                document.body.classList.add('PJ008-boxOpened');
                
                setTimeout(function(){
                    const errorMessage = $('#ctl00_cphBody_pnlPostCodeError');
                    if(!errorMessage.length){
                        __doPostBack('ctl00$_objHeader$lbOrderForDelivery','');
                    }
                },1000);
            }

            //On the new link clicks click the hidden links to bring down the hidden blocks
            const signinLink = document.querySelector('.PJ008-signin'),
            storeLink = document.querySelector('.PJ008-store');

            //on click of sign in run the sign in function
            signinLink.addEventListener('click', function(){
                __doPostBack('ctl00$_objHeader$lbLoginRegisterItem','');
                newHeaderBlock.classList.add('PJ8-fadeAway');
                closeSignin();
            });

            //on click of select a store run select store function
            storeLink.addEventListener('click', function(){
                __doPostBack('ctl00$_objHeader$lbSelectStoreMenuItem','');
                newHeaderBlock.classList.add('PJ8-fadeAway');
                closestoreChoose();
                
            });


            //functions to remove the opacity on the sign in/store close
            const closeSignin = () => { 
            UC.poller(['#ctl00__objHeader_lbCloseOnmibar2'], function() { 
                        const closesignInBlock = document.getElementById('ctl00__objHeader_lbCloseOnmibar2');
                        closesignInBlock.addEventListener('click', function(){
                            newHeaderBlock.classList.remove('PJ8-fadeAway');
                        });
                });
            }
            const closestoreChoose = () => { 
            UC.poller(['#ctl00__objHeader_lbCloseOnmibar1'], function() { 
                        const closestoreBlock = document.getElementById('ctl00__objHeader_lbCloseOnmibar1');
                        closestoreBlock.addEventListener('click', function(){
                            newHeaderBlock.classList.remove('PJ8-fadeAway');
                        });
                });
            }

            //typed in postcode event
            $newpostCode.addEventListener('keydown', (event) => {
                utils.events.send('PJ008', 'Postcode enter', 'PJ008 Postcode typed', {
                    sendOnce: true
                });
            });
        }

        const loggedIn = $('#ctl00__objHeader_pnlLoggedInUserTitle');

        if(loggedIn.length){
            utils.events.send('PJ008', 'Logged in', 'PJ008 User is logged in', {sendOnce: true});
        }else{
            notLoggedIn();
        }

       
    
    };

    // Audience conditions
    const triggers = ((options) => {
        UC.poller([
            '#ctl00_cphBody_txtPostcode',
            '.header',
        ], () => {
			utils.fullStory('PJ008', 'Variation 1');
			activate();
		});
    })();

})();
