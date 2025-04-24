import renderbasket from '../components/basket';
import fetchBrochureSettings from './getBrochureSettings';
import fetchCart from './getCart';

const triggerVariantTrackings = (id, target, updateQuantity, fireEvent) => {
  const btnContainer =
    document.querySelector('.checkout_send_to_rep_section') || document.querySelector('.checkout_shopping_with_section');
  const buttons = btnContainer.querySelector('.actions').getElementsByTagName('button');
  const checkoutBtn = document.querySelector(`.${id}__has-rep--checkout-btn`);
  if (target.matches(`.${id}__plus-btn`) || target.closest(`.${id}__plus-btn`)) {
    updateQuantity(id, target, 'plus', fireEvent);
  } else if (target.matches(`.${id}__minus-btn`) || target.closest(`.${id}__minus-btn`)) {
    updateQuantity(id, target, 'minus', fireEvent);
  } else if (target.matches(`.${id}__cartline--products-deletebtn`) || target.closest(`.${id}__cartline--products-deletebtn`)) {
    updateQuantity(id, target, 'delete', fireEvent);
  } else if (target.matches(`.${id}__no-rep-Payonlinenow--btn`)) {
    fireEvent(`Unattached customer clicks share button - pay online`);
    document.querySelectorAll(`.${id}__no-rep-Payonlinenow--btn`)[1].click();
  } else if (target.matches(`.${id}__no-rep--paiddelivery-btn`)) {
    fireEvent(`Unattached customer clicks share button - paid delivery`);
    document.querySelectorAll(`.${id}__no-rep--paiddelivery-btn`)[1].click();
  } else if (target.matches(`.${id}__no-rep-SendwithWhatsApp--btn`)) {
    fireEvent(`Unattached customer clicks share button - whatsapp`);
    document.querySelectorAll(`.${id}__no-rep-SendwithWhatsApp--btn`)[1].click();
    document.querySelector('[data-item-id="wishlistContainer"]').classList.remove('AG084c__basketContainer');
    document.querySelector('.AG084c__basket--overlay')?.classList.remove('AG084c__basket--overlay');
  } else if (target.matches(`.${id}__no-rep-SendviaEmail--btn`)) {
    fireEvent(`Unattached customer clicks share button - email`);
    document.querySelectorAll(`.${id}__no-rep-SendviaEmail--btn`)[1].click();
  } else if (target.matches(`.${id}__no-rep-SendyourordertoAvonREP--btn`)) {
    fireEvent(`Unattached customer clicks share button - send to avon rep`);
    document.querySelectorAll(`.${id}__no-rep-SendyourordertoAvonREP--btn`)[1].click();
  } else if (target.matches(`.${id}__no-rep-Copylink--btn`)) {
    fireEvent(`Unattached customer clicks share button - copy`);
    document.querySelectorAll(`.${id}__no-rep-Copylink--btn`)[1].click();
    document.querySelector('[data-item-id="wishlistContainer"]').classList.remove('AG084c__basketContainer');
    document.querySelector('.AG084c__basket--overlay')?.classList.remove('AG084c__basket--overlay');
  } else if (target.matches(`.${id}__no-rep--sendtorep-btn`)) {
    fireEvent(`Unattached customer clicks share button - send to rep`);
    document.querySelectorAll(`.${id}__no-rep--sendtorep-btn`).click();
  } else if (target.matches(`.${id}__mobile--backbtn`) || target.closest(`.${id}__mobile--backbtn`)) {
    location.reload();
  } else if (target.matches(`label[for="online"]`) || target.closest(`label[for="online"]`)) {
    checkoutBtn.setAttribute('data-click', 'online');
    checkoutBtn.innerText = '${CHECKOUT}';
  } else if (target.matches(`label[for="rep"]`) || target.closest(`label[for="rep"]`)) {
    checkoutBtn.setAttribute('data-click', 'rep');
    checkoutBtn.innerText = '${SEND TO REP}';
  } else if (target.matches(`.${id}__has-rep--checkout-btn`) || target.closest(`.${id}__has-rep--checkout-btn`)) {
    const clickType = target.getAttribute('data-click');
    const buttons = btnContainer.querySelector('.actions').getElementsByTagName('button');

    clickType === 'online' ? buttons[0].click() : buttons[1] ? buttons[1].click() : buttons[0].click();
    const userIsAttched = !!PDP_MANAGER.API_DATA.rep_id;
    if (userIsAttched) {
      clickType === 'online'
        ? fireEvent('Attached customer clicks to checkout online')
        : fireEvent('Attached customer clicks to send to rep');
    }
  } else if (target.matches(`.${id}__has-rep--continue-btn`)) {
    fireEvent('Clicks “Continue Shopping”');
    location.reload();
  } else if (target.matches(`.${id}__delete--all`) || target.closest(`.${id}__delete--all`)) {
    target
      .closest(`.${id}__cartline`)
      .querySelectorAll(`.${id}__cartline--product-details`)
      .forEach((item, i) => {
        setTimeout(() => {
          item.querySelector(`.${id}__cartline--products-deletebtn`).click();
        }, i * 1000);
      });
  } else if (target.matches(`.coupon_section`) || target.closest(`.coupon_section`)) {
    const couponSection = document.querySelector('.coupon_section');
    const couponOldState = couponSection.innerText;
    let timer;
    timer = setInterval(() => {
      const couponNewState = couponSection.innerText;
      if (couponNewState != couponOldState) {
        clearInterval(timer);
        fetchBrochureSettings().then((broSettings) => {
          //console.log(broSettings);

          fetchCart().then((res) => {
            // console.log(res);

            renderbasket(id, res, broSettings, fireEvent);

            // get basket buttons
          });
        });
      }
    }, 25);
  } else if (target.matches(`.${id}__saveorder--btn`)) {
    document.querySelector(`[data-test-id="${id}__control-saveorder-btns"]`).click();
  }
};

export default triggerVariantTrackings;
