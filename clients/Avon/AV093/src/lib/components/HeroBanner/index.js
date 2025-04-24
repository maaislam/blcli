/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */

import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { showOnMobileAndTablet } from '../../../../../../../lib/utils/mobileDetection';
import { fireEvent } from '../../../../../../../core-files/services';
import { slideUp, slideDown } from '../../utils/slideToggle';

import { ModalComponent } from '../../utils/Modal';
import { disableScroll } from '../../utils/disableScroll';

import { observerMutation } from '../../../../../../../lib/utils/observer';

export const HeroBanner = () => {
  const wordsArray = ['Business', 'Side-Hustle', 'Passion That Pays'];

  useEffect(() => {
    const checkForTop = setInterval(() => {
      const header = document.querySelector('#shopify-section-header');
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st === 0 && header.style.display === 'none') {
        header.style.display = 'block';
      }
    }, 100);

    return () => {
      clearInterval(checkForTop);
    };
  }, []);

  function textSequence(i) {
    if (wordsArray.length > i) {
      setTimeout(() => {
        document.querySelector('.js--title').innerHTML = wordsArray[i];
        textSequence(++i);
      }, 2000);
    } else if (wordsArray.length === i) {
      // Loop
      textSequence(0);
    }
  }

  const asyncRef = () => new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });

  const findElement = (selector) => {
    if (document.querySelector(selector) === null) {
      return asyncRef().then(() => findElement(selector));
    }
    return Promise.resolve(true);
  };

  useEffect(() => {
    findElement('.js--title')
      .then((element) => {
        console.info(element);
        textSequence(0);
      });
  });


  const sliderInput = () => {
    const spareTime = '<b>spare time</b>';
    const partTime = '<b>part-time</b>';
    const fullTime = '<b>full-time</b>';

    const elem = document.querySelector('input[type="range"]');

    const rangeValue = () => {
      const newValue = elem.value;
      const target = document.querySelector('.value');
      fireEvent('Interaction with slider');
      target.innerHTML = `£${newValue}`;
      if (newValue >= 0 && 250) {
        document.querySelector(
          '.body-text--text',
        ).innerHTML = `Sell Avon in your ${spareTime} & you could earn this much as a Rep.`;
      }
      if (newValue >= 251 && 1000) {
        document.querySelector(
          '.body-text--text',
        ).innerHTML = `Sell Avon ${partTime} & you could earn this much as a Rep in your first couple of years.`;
      }
      if (newValue >= 1001 && 4000) {
        document.querySelector(
          '.body-text--text',
        ).innerHTML = `Sell Avon ${fullTime}, build your own team over the next few years & you could earn this.`;
      }
    };
    elem.addEventListener('input', rangeValue);
  };


  if (showOnMobileAndTablet) {
    window.onscroll = () => {
      const header = document.querySelector('#shopify-section-header');
      const modal = document.querySelector('#modal-react');
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (!modal) {
        if (st >= 0 && window.pageYOffset >= 490) {
          // Scrolling Down with mouse
          slideUp(header, 200);
          document
            .querySelector('.AV093 #hero-banner .CTA')
            .classList.add('cta-fixed');
        } else if (
          window.pageYOffset < 400
                && header.style.display === 'none'
        ) {
          slideDown(header, 200);
        }
        if (window.pageYOffset <= 480) {
          document
            .querySelector('.AV093 #hero-banner .CTA')
            .classList.remove('cta-fixed');
        }
      } else {
        disableScroll();
      }
    };
  }

  if (!showOnMobileAndTablet) {
    window.onwheel = (e) => {
      const header = document.querySelector('#shopify-section-header');
      const modal = document.querySelector('#modal-react');
      if (!modal) {
        if (e.deltaY >= 0 && window.pageYOffset >= 490) {
          // Scrolling Down with mouse
          slideUp(header, 200);
          document
            .querySelector('.AV093 #hero-banner .CTA')
            .classList.add('cta-fixed');
        } else if (window.pageYOffset !== 0 && header.style.display === 'none') {
          slideDown(header, 200);
        }
        if (window.pageYOffset <= 480) {
          document
            .querySelector('.AV093 #hero-banner .CTA')
            .classList.remove('cta-fixed');
        }
      } else {
        disableScroll();
      }
    };
  }

  const DesktopDesign = (
    <div className="background-wrapper-top">
      <div className="background-wrapper--img">
        <div className="container">
          <div>Make Beauty Your</div>

          <div className="gradient--title">
            <span className="js--title" />
            <span className="gradient-underline" />
          </div>

          {/* <div className="font-weight--600">Here's What You Could Earn</div>
          <div className="value-wrapper">
            <div className="static-value--0">0</div>
            <div className="static-value--4000">£4,000</div>
          </div>
          <input type="range" min="0" max="4000" step="10" value="0" />
          <div className="value">£0</div>
          <div className="body-text--text">
            Sell Avon in your
            {' '}
            <b>spare time</b>
            {' '}
            & you could earn this much as a
            Rep.
          </div> */}
          <div className="body-text--text">
            It's time to start earning money doing what you love.
          </div>
          <span className="CTA">
            <ModalComponent />
          </span>
        </div>
      </div>
    </div>
  );

  const MobileDesign = (
    <div className="background-wrapper">
      <div className="container">
        <div>Make Beauty Your</div>
        <div className="gradient--title">
          <span className="js--title" />
          <span className="gradient-underline" />
        </div>
        {/* <h3 className="mt-5">Here's What You Could Earn</h3>
        <div className="value-wrapper">
          <div className="static-value--0">0</div>
          <div className="static-value--4000">£4,000</div>
        </div>
        <input
          id="slider"
          type="range"
          min="0"
          max="4000"
          step="10"
          value="0"
        />
        <div className="value">£0</div>
        <div className="body-text--text">
          Sell Avon in your
          {' '}
          <b>spare time</b>
          {' '}
          & you could earn this much as a
          Rep.
        </div> */}
        <img
          className="container__image"
          src="https://cdn.shopify.com/s/files/1/0327/1498/1421/files/Mask_Group.svg?v=1631125827"
          alt="Mask Group"
        />
        <div className="body-text--text">
          It's time to start earning money doing what you love.
        </div>
        <span className="CTA">
          <ModalComponent />
        </span>
      </div>
    </div>
  );

  observerMutation('#root', sliderInput);
  return (
    <div id="hero-banner">
      {showOnMobileAndTablet ? MobileDesign : DesktopDesign}
    </div>
  );
};
