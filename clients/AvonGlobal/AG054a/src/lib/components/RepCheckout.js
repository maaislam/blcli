import { h, render, Component } from "preact";
import shared from "../shared";
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events } from '../../../../../../lib/utils';

export default class RepCheckout extends Component {
    constructor() {
        super();
        this.state = {
            repName: 'Karen',
            deliveryMethod: 'courier',
            firstName: '',
            lastName: '',
            totalPrice: 0,
            repEnabled: false,
        };

        this.setDeliveryMethodRep = this.setDeliveryMethodRep.bind(this);
        this.setDeliveryMethodCourier = this.setDeliveryMethodCourier.bind(this);
        this.toggleRepOverlay = this.toggleRepOverlay.bind(this);
        this.grabRepName = this.grabRepName.bind(this);
        this.grabTotalPrice = this.grabTotalPrice.bind(this);
        this.hideOldCheckout = this.hideOldCheckout.bind(this);
        this.isRepEnabled = this.isRepEnabled.bind(this);
        this.clickOldCheckout = this.clickOldCheckout.bind(this);
        this.addScrollTo = this.addScrollTo.bind(this);
    };

    componentDidMount() {
        this.isRepEnabled();
        this.grabRepName();
        this.grabTotalPrice();
        this.hideOldCheckout();
        // this.addScrollTo();
    }

    isRepEnabled() {
        const buttons = document.querySelectorAll('.checkout_shopping_with_section .btn-full');
        [].forEach.call(buttons, (btn) => {
            if(btn.innerText.trim().match(/send order to rep/im)) {
                this.setState({
                    repEnabled: true,
                })
            };
        })
    }

    setDeliveryMethodRep() {
        events.send(`${shared.ID}`, 'rep-click');
        dataLayer.push({
            event: 'AG054a-rep-click',
            category: 'basket'
          });
        this.setState({
            deliveryMethod: 'rep',
        })
    };

    setDeliveryMethodCourier() {
        events.send(`${shared.ID}`, 'courier-click');
        dataLayer.push({
            event: 'AG054a-courier-click',
            category: 'basket'
          });
        this.setState({
            deliveryMethod: 'courier',
        })
    };

    toggleRepOverlay() {
        const buttonWraps = document.querySelectorAll('.button_wrapper');
        if(buttonWraps) {
            buttonWraps[1].firstChild.click();
        }
    };

    grabRepName() {
       const checkoutContainer = document.querySelector('.checkout_shopping_with_section');
       if (checkoutContainer) {
           const titleSection = checkoutContainer.querySelector('.title');
           if (titleSection) {
               const repText = titleSection.querySelector('span').innerText;
               const nameString = repText.replace('You are shopping with ', '');
               const firstName = nameString.substr(0,nameString.indexOf(' '));
               const lastName = nameString.substr(nameString.indexOf(' ')+1);
               this.setState({
                   firstName,
                   lastName
               })
           }
       } 
    }

    grabTotalPrice() {
        pollerLite([
            '.value'
        ], () => {
            setTimeout( () => {
                const valueTag = document.querySelector('.value');
                const copyOfElm = valueTag.cloneNode(true);
                copyOfElm.querySelector('.currency').remove();
                const price = copyOfElm.innerText.trim();
                const parsedPrice = parseFloat(price);
                if(parsedPrice >= 20) {
                    events.send(`${shared.ID}`, 'qual-free-delivery-shown');
                    dataLayer.push({
                        event: 'AG054a-free-delivery-shown',
                        category: 'basket'
                      });
                }
                this.setState({
                    totalPrice: parsedPrice,
                })
            }, 1500)
        })
    }

    hideOldCheckout() {
        const oldCheckout = document.querySelector('#vue_basket_checkout_mobile');
        if (oldCheckout) {
            oldCheckout.style.display="none";
        }
    }

    clickOldCheckout() {
        const oldChekckoutBtn = document.querySelector('.btn-full');
        oldChekckoutBtn.click();
    }

    addScrollTo() {
        console.log('function running');
        const button = document.querySelector('.header_container');
        const newButton = document.querySelector(`.${shared.ID}__courier__cta`);
        console.log(newButton);
        if (button) {
           console.log(button);
           button.addEventListener('click', () => {
               console.log('hearing click');
                newButton.scrollIntoView({behaviour: "smooth", block: "end"});
           })
        }
    }

    render() {
        return (
            <div className={shared.ID + '__rep'}>
                <div className={shared.ID + '__rep__banner'}>
                    <img className={shared.ID + '__rep__banner__img'} src={'https://service.maxymiser.net/cm/images-eu/avon-mas/C5C15789EE5634E9D54E9B8BFF9AD8E46BA5A7086D48DCACF4BFB2D494B5CA76.png?meta=/AG054a---Delivery-Proposition-on-digital-brochure-basket/rep-icon.png'} />
                    <p className={shared.ID + '__rep__banner__text'}>You are shopping with <b>{this.state.firstName} {this.state.lastName}</b></p>
                </div>

                { this.state.repEnabled ? (
                    <div>
                        <h3>How would you like to receive this order?</h3>
                        <div className={shared.ID + `__rep__btn-wrap`}>
                            <div onClick={this.setDeliveryMethodCourier} value='courier' className={shared.ID + `__rep__btn-wrap__btn ${this.state.deliveryMethod === 'courier' ? "UC-delivery-active" : ''}`}>
                                <img className={shared.ID + '__rep__btn-wrap__btn__img'} src={'https://service.maxymiser.net/cm/images-eu/avon-mas/29238C2B6C09B051F073948A37C335F63F430960DF4CDB15A8FEBE52409304FD.png?meta=/AG054a---Delivery-Proposition-on-digital-brochure-basket/Union.png'} />
                                <p className={shared.ID + '__rep__btn-wrap__btn__text'}>Delivered by our trusted courier</p>
                            </div>
                            <div onClick={this.setDeliveryMethodRep} value='rep' className={shared.ID + `__rep__btn-wrap__btn  ${this.state.deliveryMethod === 'rep' ? "UC-delivery-active" : ''}`}>
                                <img className={shared.ID + '__rep__btn-wrap__btn__img'} src={'https://service.maxymiser.net/cm/images-eu/avon-mas/B464C7169DC61BD532F320BBE9FC18658676019B7CF7964FD065E5019514EC1A.png?meta=/AG054a---Delivery-Proposition-on-digital-brochure-basket/in_person_contact.png'} />
                                <p className={shared.ID + '__rep__btn-wrap__btn__text'}>Delivered by {this.state.firstName}</p>
                            </div>
                        </div>
                    </div>
                ) : ''}

                { this.state.deliveryMethod === 'courier' ? (
                    <div className={shared.ID + `__courier`}>
                        <div className={shared.ID + `__courier__delivery`}>
                            { this.state.totalPrice < 20 ? (
                                <p className={shared.ID + `__courier__delivery__text`}>Get <span className={shared.ID + `__courier__delivery__text--under`}>FREE DELIVERY</span> when you spend £20 or more</p>
                            ) : (
                                <p className={shared.ID + `__courier__delivery__text`}>You have qualified for <span className={shared.ID + `__courier__delivery__text--free`}>FREE DELIVERY</span></p>
                            ) }
                        </div>
                        <div className={shared.ID + `__courier__list`}>
                            <div className={shared.ID + `__courier__list__item`}>
                                <img className={shared.ID + `__courier__list__item__img__card`}  src={'https://service.maxymiser.net/cm/images-eu/avon-mas/8472E14325483293A8A87F86F8C767A0CD494569AD6B979581C098DE77F23503.png?meta=/AG054a---Delivery-Proposition-on-digital-brochure-basket/pay-now.png'} />
                                <p className={shared.ID + `__courier__list__item__text`}>Pay now, then sit back and relax</p>
                            </div>
                            <div className={shared.ID + `__courier__list__item`}>
                                <img className={shared.ID + `__courier__list__item__img__van`} src={'https://service.maxymiser.net/cm/images-eu/avon-mas/A8539820B00D1BB24CCE5ABCBD0821D41A59B81BD2B0D524794554E53F66F0B1.png?meta=/AG054a---Delivery-Proposition-on-digital-brochure-basket/truck.png'} />
                                <p className={shared.ID + `__courier__list__item__text`}>Standard and express delivery options</p>
                            </div>
                            {/* <div className={shared.ID + `__courier__list__item`}>
                                <img className={shared.ID + `__courier__list__item__img__clock`} src={'https://service.maxymiser.net/cm/images-eu/avon-mas/ECDB35828834EE9D75AF29D41F85CEC33814FD25306EF3031BB5CBA3D10E1494.png?meta=/AG054a---Delivery-Proposition-on-digital-brochure-basket/clock.png'} />
                                <p className={shared.ID + `__courier__list__item__text`}>Standard delivery typically arrives within 3 days</p>
                            </div> */}
                        </div>
                        <div className={shared.ID + `__courier__cta`}>
                            <a onClick={this.clickOldCheckout} className={shared.ID + `__courier__cta__btn`}>
                                Checkout online
                            </a>
                        </div>
                    </div>
                ) : ''}

                 { this.state.deliveryMethod === 'rep' ? (
                        <div className={shared.ID + `__courier`}>
                            <div className={shared.ID + `__courier__delivery`}>

                            </div>
                            <div className={shared.ID + `__courier__list`}>
                                <div className={shared.ID + `__courier__list__item`}>
                                    <img className={shared.ID + `__courier__list__item__img__money`}  src={'https://service.maxymiser.net/cm/images-eu/avon-mas/8E056C8915D532A05516361C96FEA814569138B16F452EB234A199B0FEB05C92.png?meta=/AG054a---Delivery-Proposition-on-digital-brochure-basket/pay-later.png'} />
                                    <p className={shared.ID + `__courier__list__item__text`}>Pay when you receive your order</p>
                                </div>
                                <div className={shared.ID + `__courier__list__item`}>
                                    <img className={shared.ID + `__courier__list__item__img__phone`} src={'https://service.maxymiser.net/cm/images-eu/avon-mas/509C78F8E6EE9784DD57642330282A3E63B3A003DB2377AB49EE00A6382A66F3.png?meta=/AG054a---Delivery-Proposition-on-digital-brochure-basket/avon-phone.png'} />
                                    <p className={shared.ID + `__courier__list__item__text`}>Arrange delivery with your rep</p>
                                </div>
                            </div>
                            <div className={shared.ID + `__courier__cta`}>
                                <a onClick={this.toggleRepOverlay} className={shared.ID + `__courier__cta__btn`}>
                                    Send order to rep
                                </a>
                            </div>
                        </div>
                    ) : ''}
                </div>
        )
    }
};