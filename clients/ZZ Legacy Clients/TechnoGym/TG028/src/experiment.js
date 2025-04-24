import {cacheDom} from '../../../../lib/cache-dom';
import getFormsHtml from './lib/forms-html';
import FormManager from './lib/form-manager';
import Accordion from './lib/accordion';
import {__, getLanguage} from './lib/helpers';
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

export const runner = () => {

// ---------------------------------------------------------
// Event sender
// ---------------------------------------------------------
const eventSender = utils.events.setDefaultCategory('TG028-contact-page');

/**
 * Entry point for experiment run
 */
const run = () => {
    document.body.classList.add('tg028');

    document.body.classList.add('tg028-lang--' + getLanguage());

    // Did run
    eventSender.send(null, 'did-show-redesigned-contact-form', '', {
        sendOnce: true    
    });

    // ---------------------------------------------
    // Grab items from existing content
    // ---------------------------------------------
    let phoneNumber = cacheDom.get('.forms .call-address .call-us p:last-of-type').innerText;
    phoneNumber = phoneNumber ? phoneNumber.trim() : '';

    // ---------------------------------------------
    // Remove any dom elements
    // ---------------------------------------------
    removeDomElements();

    // ---------------------------------------------
    // Build new content
    // ---------------------------------------------
    const formsWrapper = cacheDom.get('.post-content .forms');

    const formsHtml = getFormsHtml(phoneNumber, __);
    formsWrapper.insertAdjacentHTML('afterbegin', formsHtml);

    const pageTitleHtml = `
        <h2 class="tg28-page-title">
          ${__('Call our consultants on')}
          <span class="iconic icon-Callus"></span>
          ${__('0800 316 2496')}
          <br><span class="tg28-page-title__or">${__('or')}</span>
       </h2>
    `;

    document.querySelector('.tg28-mobile-only').insertAdjacentHTML('afterbegin', pageTitleHtml);
    document.querySelector('.tg28-desktop-only .tg28-main').insertAdjacentHTML('afterbegin', pageTitleHtml);
    
    // ---------------------------------------------
    // Form
    // ---------------------------------------------
    const mainForm = cacheDom.get('.forms .form-container');

    // Setup
    [].forEach.call(mainForm.querySelectorAll('.form-list li'), (item) => {
        const input = item.querySelector('textarea,input,select');
        if(input && input.name) {
            item.classList.add('tg28-input-row--' + input.name.trim());
        }
    });

    // Profile amend
    cacheDom.get('label[for=profile]').innerHTML = `
        ${__('Are you enquiring for Business or Home use?')}
        <em>*</em>
    `;

    // Profile labels
    const profileOptions = cacheDom.getAll('.select-profile .option');
    [].forEach.call(profileOptions, (item, idx) => {
        switch(idx) {
            case 0:
                item.querySelector('label').innerText = __('Home');
                break;
            case 1:
                item.querySelector('label').innerText = __('Business');
                break;
            case 2:
                item.querySelector('label').innerText = __('Freelance professional');
                break;
        }
    });

    // Message box Toggle
    const msgInputRow = cacheDom.get('.tg28-input-row--comment');
    if(msgInputRow) {
        msgInputRow.insertAdjacentHTML('afterbegin', `
            <div class="tg28-toggle-message tg28-toggle-message--hide">
                <a>${__('Add Message')}</a>
            </div>
        `);

        cacheDom.get('.tg28-toggle-message a').addEventListener('click', () => {
            cacheDom.get('.tg28-toggle-message').classList.add('tg28-toggle-message--hide');

            cacheDom.get('.tg28-input-row--comment label')
                .classList.remove('tg28-input-row--comment-hidden');
            cacheDom.get('.tg28-input-row--comment .input-box')
                .classList.remove('tg28-input-row--comment-hidden');

            eventSender.send(null, 'did-click-add-message-link-to-reveal-textarea', '', {
                sendOnce: true    
            });
        });
    }


    // ---------------------------------------------
    // Set up form manager and shift into relevant section
    // ---------------------------------------------
    if(mainForm) {
        mainForm.classList.add('tg28-main-form');

        const formManager = new FormManager(mainForm);

        let callusFormTargetElm = null, dataset = null;
        if(window.innerWidth <= 768) {
            // On page load move into arrange callback section
            callusFormTargetElm = cacheDom.get('[data-id="m-arrange-callback"] .tg28-form-target');
            dataset = cacheDom.get('[data-id="m-arrange-callback"]').dataset;
        } else {
            callusFormTargetElm = cacheDom.get('#tg28-call-us .tg28-form-target');
            dataset = cacheDom.get('.tg28-tab--callus').dataset;
        }

        if(callusFormTargetElm && dataset) {
            formManager.shiftTo(callusFormTargetElm, dataset);
        }
        
        // ---------------------------------------------
        // Tabs
        // ---------------------------------------------
        const tabs = cacheDom.getAll('.tg28-tab'),
            tabContent = cacheDom.getAll('.tg28-tab-content');
        [].forEach.call(tabs, (tab) => {
            if(tab) {
                tab.addEventListener('click', (e) => {
                    const target = e.currentTarget.dataset.target;

                    if(target) {
                        const targetElm = cacheDom.get(target);
                        if(targetElm) {
                            // Show selected tab
                            [].forEach.call(tabs, (item) => {
                                item.classList.remove('tg28-tab--active');
                            });

                            tab.classList.add('tg28-tab--active');

                            [].forEach.call(tabContent, (item) => {
                                item.classList.remove('tg28-tab-content--active');
                            });

                            targetElm.classList.add('tg28-tab-content--active');

                            // Add form to new tab
                            const formTarget = targetElm.querySelector('.tg28-form-target'),
                                dataset = e.currentTarget.dataset;

                            formManager.shiftTo(formTarget, dataset);
                        }
                    }

                    eventSender.send(null, 'did-interact-with-tabs', '', {
                        sendOnce: true    
                    });

                    return false;
                });
            }
        });

        // ---------------------------------------------
        // Accordion on mobile
        // ---------------------------------------------
        const accordion = new Accordion(cacheDom.getAll('.tg28-accordion > li'));
        accordion.addEventCallback('willShow', (accordionItem) => {
            const dataset = accordionItem.dataset;
            if(dataset) {
                formManager.shiftTo(accordionItem.querySelector('.tg28-form-target'), dataset);

                window.scrollTo(0, (
                    accordionItem.getBoundingClientRect().top + 
                    (window.pageYOffset || document.documentElement.scrollTop) - 15
                ));
            }

            eventSender.send(null, 'did-open-accordion-item', '', {
                sendOnce: true    
            });
        });
        accordion.init();
    }
    
    // ---------------------------------------------
    // Newsletter
    // ---------------------------------------------
    const viewLocsBtn = cacheDom.get('.tg28-view-locations .button'),
        locsElm = cacheDom.get('.block-store-locator');

    viewLocsBtn.addEventListener('click', () => {
        window.scrollTo(0, (
            locsElm.getBoundingClientRect().top + 
            (window.pageYOffset || document.documentElement.scrollTop) - 15
        ));

        eventSender.send(null, 'did-click-view-locations-button', '', {
            sendOnce: true    
        });
    });

    const newsletterForm = cacheDom.get('.tg28-newsletter-form'),
        emailInput = cacheDom.get('.tg28-newsletter-email'),
        existingNewsletterFormSubmit = cacheDom.get('#newsletter-validate-detail button'),
        existingNewsletterInput = cacheDom.get('.footer-container .footer-bottom input[name=pre-email]');

    if(newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if(!emailInput || !existingNewsletterInput || !existingNewsletterFormSubmit) {
                return;
            }

            eventSender.send(null, 'did-submit-newsletter-form', '', {
                sendOnce: true    
            });

            const email = emailInput.value;
            if(email) {
                existingNewsletterInput.value = email;
                existingNewsletterFormSubmit.click();
            }

            return false;
        });
    }
    
    // ---------------------------------------------
    // Phone label - may be required
    // ---------------------------------------------
    cacheDom.get('.field.telephone > label').innerHTML = `<em>*</em> ${__('Phone')}`;

    // ---------------------------------------------
    // Message label - may be required
    // ---------------------------------------------
    cacheDom.get('.wide.comment > label[for=comment]').innerHTML = `<em>*</em> ${__('Message')}`;
    
    // ---------------------------------------------
    // Email label - may be required
    // ---------------------------------------------
    cacheDom.get('.field.email > label').innerHTML = `<em>*</em> ${__('Email')}`;
    
    // ---------------------------------------------
    // Reason field
    // ---------------------------------------------
    cacheDom.get('.tg28-input-row--reason label').innerHTML = `<em>*</em> ${__('I would like to:')}`;
    [].forEach.call(cacheDom.getAll('#reason option'), (item) => {
        if(item.value == 'assistance') {
            item.innerText = __('Request technical assistance');
        } else if(item.value == 'mail') {
            item.innerText = __('Request commercial information');
        } else if(item.value == 'appointment') {
            item.innerText = __('Request other information');
        } else {
            item.classList.add('hide');
        }
    });

    // Move general email to 
    const mailOption = cacheDom.get('option[value=mail]');
    const select = cacheDom.get('#reason');
    select.insertAdjacentElement('afterbegin', mailOption);
    
    // ---------------------------------------------
    // Form button submitted
    // ---------------------------------------------
    const formTargets = cacheDom.getAll('.tg28-form-target');
    [].forEach.call(formTargets, (formTarget) => {
      formTarget.addEventListener('click', (e) => {
          if(e.target.classList.contains('tg28-button-added')) {
              // Submit blocked (will be on subsequent clicks)
              const blockedButtonExists = formTarget.querySelector('.submit-trigger.submit-blocked');
              if(blockedButtonExists) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }

              // Poll for when submit gets blocked (post-first click) and when it is
              // then reduce opacity...
              UC.poller([
                '.submit-trigger.submit-blocked',
              ], () => {
                e.target.style.opacity = '0.5';
              });

              // Send event
              eventSender.send(null, 'did-click-form-submitt-button', e.target.innerText.trim());
          }
      });
    });

    // ---------------------------------------------
    // Orientation change => refresh page
    // Workaround for DOM rebuliding
    // ---------------------------------------------
    window.addEventListener("orientationchange", function() {
        window.location.reload();
    }); 


    // ---------------------------------------------
    // Amends 25.04.18
    // Move <em> within the labels to after the text
    // ---------------------------------------------
    const moveEms = () => {
      const requiredEls = document.querySelectorAll('.tg28-desktop-only .tg28-main-form .fieldset .form-list > li label > em');
      [].forEach.call(requiredEls, (item) => {
        const ref = item.parentElement;
        ref.insertAdjacentElement('beforeend', item);
      });
    };
    moveEms();

    // ---------------------------------------------
    // Default values for elements
    // ---------------------------------------------
    const needBusiness = cacheDom.get('[name=need-business]');
    if(needBusiness) {
      needBusiness.value = 'community';
      needBusiness.style.display = 'none';
    }

    const company = cacheDom.get('[name=company]');
    if(company) {
      company.value = 'Auto-Filled-Field';
      company.style.display = 'none';
    }

    const needFreelance = cacheDom.get('[name=need-freelance]');
    if(needFreelance) {
      needFreelance.value = 'other';
      needFreelance.style.display = 'none';
    }

    const selectNeed = cacheDom.get('.select-need');
    if(selectNeed) {
      selectNeed.style.display = 'none';
    }

    const needPrivate = cacheDom.get('[name=need-private]');
    if(needPrivate) {
      needPrivate.value = 'tone_body';
      needPrivate.style.display = 'none';
    }

    /**
     * Amends 7/8/18 Add in phone numbers for UK version only.
     */
    const sidebarContact = () => {
      const html = `
        <div class="tg28-contact-numbers">
          <p>Spare parts and service contracts:</p>
          <a class="tg28-number-link" href="tel:01344300236">01344 300236</a>
          <p>Technical assistance:</p>
          <a class="tg28-number-link" href="tel:01344823700">01344 823700</a>
        </div>
      `;
      const country = () => {
        const url = window.location.pathname;
        const country = url.split('/')[1];
        return country
      };
      const addHtml = (ref) => {
        if (ref) {
          ref.insertAdjacentHTML('afterbegin', html);
        }
      };
      const countryCode = country();
      if (countryCode === 'gb') {
        const ref = document.querySelector('.tg28-sidebar .tg28-sidebar__box');
        addHtml(ref);
      }
    };
    sidebarContact();
    
};

/**
 * Remove DOM elements
 *
 * We remove these as they may impact performance of the page
 */
const removeDomElements = () => {
    const contactDetails = cacheDom.get('.forms > .contact-details'),
        contactSideTab = cacheDom.get('#contacts-us-fixed');
        
    if(contactDetails) {
      contactDetails.remove();
    }

    if(contactSideTab) {
      contactSideTab.remove();
    }
};


UC.poller([
    '.post-content .forms',
    '.forms .form-container',
    'label[for=profile]',
    '.select-profile .option',
], function() {
    utils.fullStory('TG028', 'Variation 1');

    run();
});

};

runner();
