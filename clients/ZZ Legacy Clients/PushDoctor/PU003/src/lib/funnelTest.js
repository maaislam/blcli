import {poller} from '../../../../../lib/uc-lib';

export default function(ID) {
    const experiment = window.UC.experiments[ID];

    // Change steps images to white
    (function() {
      experiment.pollers.push(
        poller([(() => document.querySelectorAll('.appointmentStep img').length === 3)], () => {
          var appointmentSteps = document.querySelectorAll('.appointmentStep img');
          if (appointmentSteps !== null) {
            var clock = appointmentSteps[0];
            var lock = appointmentSteps[1];
            var phone = appointmentSteps[2];
            clock.src = "https://www.pushdoctor.co.uk/hubfs/Clock-symbol-white%20(1).png";
            lock.src = "https://www.pushdoctor.co.uk/hubfs/Lock-symbol-white%20(1).png";
            phone.src = "https://www.pushdoctor.co.uk/hubfs/Phone-symbol-white%20(1).png";
          }  
        })
      );
    })();

    // Change logos to white
    (function() {
      experiment.pollers.push(
        poller([
          '[ng-show="!boolWhiteLogos"]',
          '[ng-show="boolWhiteLogos"]'
        ], () => {
          var blackLogos = document.querySelectorAll('[ng-show="!boolWhiteLogos"]');
          var whiteLogos = document.querySelectorAll('[ng-show="boolWhiteLogos"]');
          if (blackLogos !== null || whiteLogos !== null) {
            for (var i = 0; i < blackLogos.length; i++) {
              blackLogos[i].classList.add('ng-hide');
              whiteLogos[i].classList.remove('ng-hide');
            }
          }
        })
      );
    })();

    if (/pushdoctor\.co\.uk\/see-a-doctor-2\/select-time/.test(window.location.href)) {
      // Only show start time of appointments
      (function() {
        function showFirstTimeRange() {
          var appointmentContainers = document.querySelectorAll('.appointmentContainer');
          for (var i = 0; i < appointmentContainers.length; i++) {
            // Do nothing if already modified
            var appointmentContainer = appointmentContainers[i];
            if (!appointmentContainer.classList.contains('PU003_modified')) {
              var appointmentContainerText = appointmentContainer.innerText;
              if(appointmentContainerText.indexOf(' ') !== -1) {
                appointmentContainerText = appointmentContainerText.substring(0, appointmentContainerText.indexOf(' '));
                appointmentContainer.innerText = appointmentContainerText;
              }
              appointmentContainer.classList.add('PU003_modified');
            }
          }
        }

        function attachEventToSeeAll() {
          var seeAllBtn = document.querySelector('.btnSeeAll');
          if(seeAllBtn !== null && !seeAllBtn.classList.contains('PU003_modified')) {
            seeAllBtn.addEventListener("click", function() {
              showFirstTimeRange();
              seeAllBtn.classList.add('PU003_modified');
            });
          }
        }

        experiment.pollers.push(
          poller(['.appointmentContainer'], () => {
            showFirstTimeRange();
            poller(['.btnSeeAll'], attachEventToSeeAll, {timeout: 6000});
          })
        );
        
        experiment.pollers.push(
            poller(['.realTimeAppointmentsContainer'], () => {
            function insertAfter(newNode, referenceNode) {
              referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
            }
            var realTimeAppointmentsContainer = document.querySelector('.realTimeAppointmentsContainer');
            var startTimeLabel = document.querySelector('.PU003_startTimeLabel');
            if(realTimeAppointmentsContainer !== null && startTimeLabel === null) {
              var startsAt = document.createElement('p');
              startsAt.className = 'PU003_startTimeLabel';
              startsAt.innerText = 'Choose your start time:';
              startsAt.style.textAlign = "center";
              insertAfter(startsAt, realTimeAppointmentsContainer);
            }
          })
        );
      })();
    
      (function () {
        experiment.pollers.push(
            poller(['.realTimeAppointments'], () => {
            var cycleThroughArrayOfStrings = function (targetElement, arrayOfStrings) {
              var title = arrayOfStrings;
              var targetElement = document.querySelector(targetElement);
              targetElement.innerText = title[0];
      
              var i = 1; // the index of the current item to show
              setInterval(function () {
                targetElement.innerText = title[i];
                i++;
                if (i == title.length) {
                  i = 0; // reset to first element if you've reached the end
                }
              }, 5000);
            };
            cycleThroughArrayOfStrings('.realTimeAppointments', ['Doctors online 6am - 11pm', 'Get same-day prescriptions', 'Sick notes emailed instantly', 'NHS and private referrals']);
          })
        );
      })();

      (function () {
        experiment.pollers.push(
            poller(['.btnContinue'], () => {
            var chooseAnotherDay = document.querySelector('.btnContinue');
            chooseAnotherDay.innerText = 'Choose alternative day';
          })
        );
      })();
    }

    (function () {
      experiment.pollers.push(
        poller(['.funnelFooter'], () => {
          if (!document.querySelector('.price-footer')) {
            var footerContainer = document.querySelector('.funnelFooter');
            
            var priceFooter = document.createElement('div');
            priceFooter.className = 'price-footer';

            var stripeLogo = document.createElement('img');
            stripeLogo.src = 'https://www.pushdoctor.co.uk/hubfs/Stripe%20logo.png';
            priceFooter.appendChild(stripeLogo);

            var sslLogo = document.createElement('img');
            sslLogo.src = 'https://www.pushdoctor.co.uk/hubfs/SSL%20Secured.png';
            priceFooter.appendChild(sslLogo);

            var contactUsText = document.createElement('p');
            contactUsText.className = 'contact-us-text';
            contactUsText.innerHTML = 'CONTACT US <a href="tel:+443308084702"><strong>0330 808 4702</strong></a>';
            priceFooter.appendChild(contactUsText);

            var cardsLogo = document.createElement('img');
            cardsLogo.src = 'https://www.pushdoctor.co.uk/hubfs/Rebrand_Assets/Footer/logo-payment-cards-new-retina.png';
            priceFooter.appendChild(cardsLogo);

            footerContainer.appendChild(priceFooter);
          }
        })
      );
    })();

    (function () {  
      experiment.pollers.push(
          poller(['.faqsButton a'], () => {
          var faqButton = document.querySelector('.faqsButton');
          faqButton.style.width = 'auto';
          var faqButtonLink = document.querySelector('.faqsButton a');
          faqButtonLink.innerText = 'Need help?';
        })
      );
    })();

    (function () {
      experiment.pollers.push(
        poller(['.funnelLinks ul'], () => {
          function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
              }
            }
            return "";
          }
          
          function addMyAccountNavItem() {
              var funnelLinks = document.querySelector('.funnelLinks ul');
              var myAccountNavItem = document.createElement('li');
              if (document.querySelector('.my-account') === null) {
                myAccountNavItem.className += "my-account";
                myAccountNavItem.innerHTML = "<a href='../account/myDetails' title='My Account' target='_self'>My Account</a>";
                myAccountNavItem.style.width = "auto";
                if (funnelLinks !== null) {
                  funnelLinks.appendChild(myAccountNavItem);
                }
              }
          }

          if (getCookie('pushDrSignedIn') === 'true') {
            addMyAccountNavItem();
          }
        })
      );
    })();
}