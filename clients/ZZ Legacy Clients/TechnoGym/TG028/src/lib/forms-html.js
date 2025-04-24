import {__} from './helpers';

export default function(phoneNumber, __) {
    return `
        <div class="tg28-forms-container clearfix">
            <div class="tg28-mobile-only">
                <div class="tg28-section tg28-section--callus">
                    <div class="tg28-section__heading">
                        <h2>
                            <span>${__("We'll call you back")}</span>
                        </h2>
                    </div>
                    <div class="tg28-section__content">
                        <ul class="tg28-accordion">
                            <li data-id="m-arrange-callback" 
                                data-reasonfield="call"
                                data-phonerequired="1"
                                data-buttontext="${__('Call me back')}"
                                data-messagerequired="0"
                                data-showtogglemessage="1"
                                data-showtogglemessage="0"
                                data-logic="arrange-callback"
                            >
                                <h3 class="tg28-accordion__heading">${__('Arrange a Callback')}</h3>
                                <div class="tg28-accordion__content">
                                    <div class="tg28-form-target"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="tg28-section tg28-section--messageus">
                    <div class="tg28-section__heading">
                        <h2>
                            <span>${__('Message Us')}</span>
                        </h2>
                        <p>${__('How can we help you?')}</span>

                        <p class="text-left"><strong>${__('I would like to:')} *</strong></p>
                    </div>
                    <div class="tg28-section__content">
                        <ul class="tg28-accordion">
                            <li data-id="m-request-quote" 
                                data-reasonfield="quote"
                                data-buttontext="${__('Request a quote')}"
                                data-messagerequired="1"
                                data-phonerequired="1"
                                data-showtogglemessage="0"
                                data-logic="message-us"
                            >
                                <h3 class="tg28-accordion__heading">${__('Request a Quote')}</h3>
                                <div class="tg28-accordion__content">
                                    <div class="tg28-form-target"></div>
                                </div>
                            </li>
                            <li data-id="m-request-commercial-info" 
                                data-reasonfield="appointment"
                                data-buttontext="${__('Request Info')}"
                                data-messagerequired="1"
                                data-showtogglemessage="0"
                                data-logic="message-us"
                            >
                                <h3 class="tg28-accordion__heading">${__('Request Commercial Information')}</h3>
                                <div class="tg28-accordion__content">
                                    <div class="tg28-form-target"></div>
                                </div>
                            </li>
                            <li data-id="m-request-tech-assistance" 
                                data-reasonfield="assistance"
                                data-buttontext="${__('Request Assistance')}"
                                data-messagerequired="1"
                                data-showtogglemessage="0"
                                data-logic="message-us"
                            >
                                <h3 class="tg28-accordion__heading">${__('Request Technical Assistance')}</h3>
                                <div class="tg28-accordion__content">
                                    <div class="tg28-form-target"></div>
                                </div>
                            </li>
                            <li data-id="m-request-general-email" 
                                data-reasonfield="mail"
                                data-emailrequired="1"
                                data-buttontext="${__('Send Email')}"
                                data-messagerequired="1"
                                data-showtogglemessage="0"
                                data-logic="message-us"
                            >
                                <h3 class="tg28-accordion__heading">${__('Send a General Email')}</h3>
                                <div class="tg28-accordion__content">
                                    <div class="tg28-form-target"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="tg28-desktop-only">
                <div class="tg28-main col-sm-12 col-md-9">
                    <ul class="tg28-tabs">
                        <li 
                            data-reasonfield="call"
                            data-buttontext="${__('Call me back')}"
                            data-messagerequired="0"
                            data-showtogglemessage="1"
                            data-phonerequired="1"
                            data-logic="arrange-callback"
                            class="tg28-tab tg28-tab--active tg28-tab--callus" 
                            data-target="#tg28-call-us">
                            <span class="iconic icon-Callback"></span>
                            ${__("We'll call you back")}
                        </li>
                        <li 
                            data-reasonfield="quote"
                            data-buttontext="${__('Send request')}"
                            data-messagerequired="1"
                            data-showtogglemessage="0"
                            data-phonerequired="1"
                            data-logic="message-us"
                            class="tg28-tab tg28-tab--request-quote" 
                            data-target="#tg28-request-quote">
                            <i class="fa fa-file-text-o"></i>
                            ${__('Request a quote')}
                        </li>
                        <li 
                            data-reasonfield="mail"
                            data-buttontext="${__('Send message')}"
                            data-messagerequired="1"
                            data-emailrequired="1"
                            data-showtogglemessage="0"
                            data-logic="message-us"
                            class="tg28-tab tg28-tab--message-us" 
                            data-target="#tg28-message-us">
                            <i class="fa fa-envelope"></i>
                            ${__('Message us')}
                        </li>
                    </ul>

                    <div id="tg28-call-us" class="tg28-tab-content tg28-tab-content--active">
                        <div class="row">
                            <div class="col-sm-8">
                                <div class="text-center tg28-tab-content__lead">
                                    <h2>${__('Give our consultants a call on')}</h2>
                                    <p class="tg28-phone">${phoneNumber}</p>
                                    <p>${__('or arrange a callback:')}</p>
                                </div>

                                <div class="tg28-form-target">
                                </div>
                            </div>
                            <div class="col-sm-4 text-center tg28-imgwrap">
                                <img src="//www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_RUNNING.jpg">
                                <p class="required">* ${__('Required fields')}</p>
                            </div>
                        </div>
                    </div>
                    <div id="tg28-request-quote" class="tg28-tab-content">
                        <div class="row">
                            <div class="col-sm-8">
                                <div class="text-center tg28-tab-content__lead">
                                    <h2>${__('Request a quote')}</h2>
                                    <p>${__('Leave a message below for a quick response from one of our wellness consultants')}</p>
                                </div>

                                <div class="tg28-form-target">
                                </div>
                            </div>
                            <div class="col-sm-4 text-center tg28-imgwrap">
                                <img src="//www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_STRENGTH_TRAINING.jpg">
                                <p class="required">* ${__('Required fields')}</p>
                            </div>
                        </div>
                    </div>
                    <div id="tg28-message-us" class="tg28-tab-content">
                        <div class="row">
                            <div class="col-sm-8">
                                <div class="text-center tg28-tab-content__lead">
                                    <h2>${__('Send a message')}</h2>
                                    <p>${__('Leave a message below for a quick response from one of our wellness consultants')}</p>
                                </div>

                                <div class="tg28-form-target">
                                </div>
                            </div>

                            <div class="col-sm-4 text-center tg28-imgwrap">
                                <img src="//www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_CYCLING.jpg">
                                <p class="required">* ${__('Required fields')}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="tg28-sidebar col-sm-12 col-md-3">

                <div class="tg28-sidebar__box tg28-view-locations desktop-only">
                    <a class="button button-default">${__('View our locations')}</a>
                </div>

                <div class="tg28-sidebar__box tg23-no-padding">
                  <a class="tg28-sidebar__box-link" href=${__('https://www.technogym.com/gb/where-buy-technogym/')}>
                    ${__('How to Buy')}
                  </a>
                </div>

                <div class="tg28-newsletter-box">
                  <h2 class="text-center">${__(`Don't miss innovative training programmes`)}</h2>
                  <p class="text-center">${__(`News about products, exclusive special offers and top tips on developing a wellness lifestyle`)}.</p>

                  <form class="tg28-newsletter-form">
                      <input required type="email" 
                          placeholder="${__('Enter email address')}"
                          class="tg28-newsletter-email input-text">
                      <div class="text-center tg28-mt-15">
                          <button type="submit" class=" button button-default tg28-button-smaller">${__('Join our newsletter')}</button>
                      </div>
                  </form>
                </div>

            </div>
        </div>
    `;
}
