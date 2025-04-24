/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import shared from '../../../../../core-files/shared';
import { h, render, Component } from "preact";
import ReactComponent from './components/ReactComponent';
import { setup, fireEvent } from '../../../../../core-files/services';

const runChanges = () => {
  // Declare container markup for Component to sit inside
  const markup = `
    <div class="${shared.ID}__wrapper ${shared.ID}__mobile-wrapper">
      <div class="${shared.ID}__component container">
        <div class="${shared.ID}__mobile-wrapper__title">Quick Links</div>
        <div class="${shared.ID}__content">
          <p class="${shared.ID}__content__text">Quick links, jump to:</p>
          <p class="${shared.ID}__content__text--mobile">Jump to:</p>
          <div class="${shared.ID}__content__cta">Select a section</div>
        </div>
      </div>
    </div>
  `;

  // Get element from page where the component will sit
  const elementOnPage = document.querySelector('#hero');
  if(elementOnPage) {
    // Insert wrapper markup
    elementOnPage.insertAdjacentHTML('afterend', markup);
    // Grab wrapper element
    const reactWrapper = document.querySelector(`.${shared.ID}__component`);
    // Render Component to wrapper
    if(reactWrapper) {
      // render(<ReactComponent />, reactWrapper);
    }

    // Grab CTA
    const cta = document.querySelector(`.${shared.ID}__content__cta`);
    cta ? (
      cta.addEventListener('click', () => {
        // console.log('hearing click');
        // const overlay = `
        //   <div class="${shared.ID}__overlay">
        //     <div class="${shared.ID}__overlay__componentWrap">
        //     </div>
        //   </div>
        // `;
        // const body = document.querySelector('body');
        // body ? (
        //   body.insertAdjacentHTML('afterbegin', overlay)
        // ) : null;

        // Grab wrapper and add component
        const componentWrap = document.querySelector(`.${shared.ID}__overlay`);
        componentWrap ? (
          // render(<ReactComponent />, componentWrap)
          componentWrap.style.top = "0"
        ) : null;
      })
    ) : null;

    const overlay = `
      <div class="${shared.ID}__overlay">
        <div class="${shared.ID}__overlay__componentWrap">
        </div>
      </div>
    `;
    const body = document.querySelector('body');
    body ? (
      body.insertAdjacentHTML('afterbegin', overlay)
    ) : null;

    // Grab wrapper and add component
    const componentWrap = document.querySelector(`.${shared.ID}__overlay__componentWrap`);
    componentWrap ? (
      render(<ReactComponent />, componentWrap)
    ) : null;

    const background = document.querySelector(`.${shared.ID}__overlay`);
    if (background) {
      background.addEventListener('click', (e) => {
        if(e.target !== e.currentTarget) return;
        background.style.top = "100%";
      })
    }

    // $(window).scroll(function() {
    //   console.log('hello')
    //   var scroll = $(window).scrollTop();
    //   if (scroll >= 618) {
    //     const stickyHeader = document.querySelector(`.${shared.ID}__wrapper`);
    //     // const mobileTitle = document.querySelector(`.${shared.ID}__mobile-wrapper__title`);
    //     // console.log(mobileTitle);
    //     if (stickyHeader && mobileTitle) {
    //       stickyHeader.classList.add('HH072__scrolled');
    //       // mobileTitle.classList.add('HH072__mobTitle--hidden');
    //     }
    //   } else {
    //     const stickyHeader = document.querySelector(`.${shared.ID}__wrapper`);

    //     if (stickyHeader) {
    //       stickyHeader.classList.remove('HH072__scrolled');
    //       // mobileTitle.classList.remove('HH072__mobTitle--hidden');
    //     }
    //   }
    // })

    $('body').scroll(function() {
      var scroll = $('body').scrollTop();
      const stickyHeader = document.querySelector(`.${shared.ID}__wrapper`);
      const mobileTitle = document.querySelector(`.${shared.ID}__mobile-wrapper__title`);
      if (scroll >= 618) {
        if (stickyHeader) {
          stickyHeader.classList.add('HH072__scrolled');
          mobileTitle.classList.add('HH072__mobTitle--hidden');
        }
      } else {
        if (stickyHeader) {
          stickyHeader.classList.remove('HH072__scrolled');
          mobileTitle.classList.remove('HH072__mobTitle--hidden');
        }
      }
    })
  }
}

export default () => {
  setup();

  fireEvent('Conditions Met');

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    runChanges();
  };

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  init();
};
