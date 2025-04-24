import pubSub from './PublishSubscribe';
import settings from './settings';
import { checkCountryIsUk } from './helpers';

/**
 * Add 'required field' indicator label top of form
 */
export const addRequiredFieldsLabel = () => {
  const labelHtml = `
    <p class="${settings.ID}-required-label">* required field</p>
  `;

  const faithHeader = document.querySelector('.faithHeader__header___32vnj');
  if(faithHeader) {
    faithHeader.insertAdjacentHTML('beforeend', labelHtml);
    faithHeader.insertAdjacentHTML('afterend', labelHtml);
  }
};

/**
 * EH003 further amends label texts
 */
export const updateLabelTexts = () => {
  const firstName = document.querySelector('.registrationForm__firstName___YlLMK .EH001_label');
  if(firstName) {
    firstName.innerHTML = `
      Hi, what's your first name?<span>*</span> 
      <em class="${settings.ID}-titleplus">(as you'd like it on your profile)</em>
    `;
  }

  const email = document.querySelector('.registrationForm__emailInput___1sTIK');
  if(email && email.previousElementSibling && email.previousElementSibling.classList.contains('EH001_label')) {
    email.previousElementSibling.innerHTML = `
      What's your email?<span>*</span> 
    `;
  }

  const password = document.querySelector('.registrationForm__passwordInput___16GJp');
  if(password && password.previousElementSibling && password.previousElementSibling.classList.contains('EH001_label')) {
    password.previousElementSibling.innerHTML = `
      Create a password<span>*</span>
    `;
  }

  const termsTextSpan = document.querySelector('.AgreeTerms__checkbox___d8c0m > div > span');
  if(termsTextSpan) {
    termsTextSpan.insertAdjacentHTML('beforeend', '*');
  }

  pubSub.publish('did-update-label-texts');
};

/**
 * Helper mark step CTA inative
 */
export const markStepCtaInactive = () => {
  const stepCta = document.querySelectorAll('.registrationForm__submit___311-o');
  if(stepCta.length) {
    stepCta[stepCta.length - 1].classList.add(`${settings.ID}-cta--inactive`);

    pubSub.publish('did-mark-cta-inactive');
  }
};

/**
 * Helper mark step CTA active
 */
export const markStepCtaActive = () => {
  const stepCta = document.querySelectorAll('.registrationForm__submit___311-o');
  if(stepCta.length) {
    stepCta[stepCta.length - 1].classList.remove(`${settings.ID}-cta--inactive`);

    pubSub.publish('did-mark-cta-active');
  }
};

/**
 * zipCode field to have tooltip (focus = show, blur = hide)
 * giving more help
 */
export const initPostcodeTooltip = () => {
  const zipField = document.querySelector('.registrationForm__zipInput___3N-AB');

  const tooltipWrap = document.querySelector('.registrationForm__zipCol___ACqrO');

  if(tooltipWrap) {
    tooltipWrap.classList.add('uctooltip-wrap');

    const tooltip = document.createElement('div');
    tooltip.classList.add('uctooltip');
    tooltip.innerHTML = 'Add a space e.g. M15 5AY or M1 2FF';

    tooltipWrap.insertAdjacentElement('beforeend', tooltip);
  }

  // Toggle show / hide
  zipField.addEventListener('focus', () => {
    if(!checkCountryIsUk()) {
      tooltipWrap.classList.remove('uctooltip-wrap--active');
      return false;
    }
    tooltipWrap.classList.add('uctooltip-wrap--active');

    pubSub.publish('did-show-tooltip', 'postcode');
  });
  zipField.addEventListener('blur', () => {
    tooltipWrap.classList.remove('uctooltip-wrap--active');
  });
};

/**
 * Password tooltip
 */
export const initPasswordTooltip = () => {
  const passwordField = document.querySelector('.registrationForm__passwordInput___16GJp');

  if(passwordField) {
    const tooltipWrap = passwordField.parentNode;

    if(tooltipWrap) {
      tooltipWrap.classList.add('uctooltip-wrap');

      const tooltip = document.createElement('div');
      tooltip.classList.add('uctooltip');
      tooltip.classList.add('uctooltip--password');
      tooltip.innerHTML = '8 characters or more<br>No spaces or special characters';

      tooltipWrap.insertAdjacentElement('beforeend', tooltip);
    }

    // Toggle show / hide
    passwordField.addEventListener('focus', () => {
      tooltipWrap.classList.add('uctooltip-wrap--active');
      pubSub.publish('did-show-tooltip', 'password');
    });
    passwordField.addEventListener('blur', () => {
      tooltipWrap.classList.remove('uctooltip-wrap--active');
    });

    passwordField.classList.add(`${settings.ID}-initialised`)
  }
};

/**
 * Init password unmask (show password feature)
 */
export const initPasswordUnmask = () => {
  const passwordField = document.querySelector('.registrationForm__passwordInput___16GJp');
  if(passwordField) {
    passwordField.insertAdjacentHTML('afterend', `
      <img class="${settings.ID}-passreveal" src="${settings.IMAGES.EYE}">
    `);

    const reveal = document.querySelector(`.${settings.ID}-passreveal`);
    if(reveal) {
      reveal.addEventListener('click', (e) => {
        pubSub.publish('did-click-password-reveal');

        if(passwordField.type == 'text') {
          passwordField.type = 'password';
          e.currentTarget.classList.remove(`${settings.ID}-active`);
        } else {
          passwordField.type = 'text';
          e.currentTarget.classList.add(`${settings.ID}-active`);
        }
      });
    }
  }
};

