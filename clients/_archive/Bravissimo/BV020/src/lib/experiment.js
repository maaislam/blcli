/**
 * BV020 - Help Centre.
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { setCookie, getCookie } from '../../../../../lib/utils';
import { addEventListener, addObserver } from './winstack';

const activate = () => {
  setup();

  const { page } = universal_variable;
  const { category } = page;



  // Add Sticky Button only on PDP/PLP
  const menu = `
    <div class="BV020-menu">
      <div class="wrap">

        <div class="BV020-menu--toggle">

          <div class="close">
            <span class="close-icon">
              <img src="data:image/png;base64,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" alt="Close"/>
            </span>
            <span class="close-icon close-icon--mobile">
              <img src="data:image/png;base64,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" alt="Close"/>
            </span>
            <p>Exit Help Centre</p>
          </div>

          <div class="open">
            <p class="title">Can we help?</p>
            <p><span class="hasClosed-title">Bravissimo</span> Help &amp; Advice</p>

            <span class="BV020-chevDown"></span>
          </div>

          <ul class="BV020-menu--list">
            <li class="spread">
              <div class="after-hours">
                <p>We're currently closed, <a href="https://www.bravissimo.com/contact/">send us an email</a> and we'll get back to you as soon as possible</p>
              </div>
              <a id="BV020-phone" class="unit" href="#"><span><img src="data:image/png;base64,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" alt="Phone icon"/></span> Phone</a>
            </li>
            <li class="spread">
              <div class="after-hours">
                <p>We're currently closed, send us an email and we'll get back to you as soon as possible</p>
              </div>  
              <a id="BV020-chat" class="unit" href="#"> <span><img src="data:image/png;base64,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" alt="Live chat icon"/></span> Live Chat</a></li>
            <li class="spread"><a class="unit" href="https://www.bravissimo.com/shops/all/"> <span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA5CAYAAACBBvPCAAAABGdBTUEAALGPC/xhBQAABAJJREFUaAXtmj1oFEEUx+/UqIUaPxBURMFvEwQNAREtBAsLBUFQJAYLLTSF6WzsLWxNIYLaiDYqghaCYiloEEH8QKMEgoogWGj8IH6dv3fsHO/udnZ3bvfc2809eMzH+5j3nzc7O7N3xUIIlUqlg6icgWeGqLaS+AfBDBaLxStBQRWDhACfjfwxvCpIr0Vlb4irhwkYt8U3zSbw+vspDXCZhOch+q0g7iaIHljilvjPwm4kWYdHYKFv8Ho3D+loS5xevBTl+GX1uhGGA2Lt0QU363S1ifmiCZxywCkaDCTrrzwHkvUuJwcpKxNvNyxxC8nqjZ59lI+JlUeZyrqZd2J3zz5Gmc66Au+efcBnPutqAqJnH+Cz4Mw+6wa0KcESPft5yrqagPDs5y3rCnx49gF/FDY0ZIzzUAJqyACjrLz3y2d7OuYAchheC5fg8/AoHHj2R54FEjwr4SOw4HkN93Lm/2LAyxn4EjxZqB/wl6d4aBdNFtQar7nV/VXgT1KXRyBvtBlApzxQZbwGvAY6zJK4pzvyUGdfq9u/zLLX+KbrRo7qdbj8wOtHIEfYC3W4/JZ9J0tkQZ5Qe1g6azEZ8Pp5OIfSRK1iDtozFIYyXgP+uxLMVfW8VuXrbsGAv0p9E7xcOqHF8IZyrVB4SvnBq2epsGEYA8Q1KxCe+T7YUJ9VsYUFBB+KwW+3F0hTFS5dV90tX9Vx63olcBv4ikKeK23wec5uEDaz2wfpVMnYSORVuLSqs/HGW+4Rn7U5/mWXdj1kjeNHdnEncgLvBXaXEeSjRxL0DJ87CfyjOKPeS3ETXihtB/qK7SH83HKwqbzno9qsQ1F+CEyKNuJIgJbBU26BJfOuJKtxB9xU8PJJyNBDKo9Mo8HyPnYvlK2+fNymf1TJ/Koycfs9wR8/haA+p2Vf4+gGy+x0TV+SzSH8ywRYiaXehXAfrO8mVv1aQZxXXUets6htgu6A98LyjNtIX0RsOrH+LRIHvC2gKP2HUboO32EClkUxaIZOWuDXeGDmUab28TQt8GZzkg1Ub3LNSLDVZ1rgrQH9T0EbfIOz/atBOzGLYxtj2GrTOO/5PezUS6rdRW5tjazZREVX8PowIUdR4Tgk/rTPOL6cbV3BjzDCS3i180j+Bk/oDjvC+lsm0OsEnuPme5b6NsZN4korr7kxfFZdaRPAFNmFE3jxSrCfKIQzT+1XXeZT2CCAduYbnLjMm7Uzn/kUNgignfmQifsZIk9SrC88UcadUIP/VnWphtpHOeQc51S3q8Zxs5r694ATjHsgZKD5yM3dYDf6+rP3ihBb63d741Ds5QaWxi1suwzuQPIlV9iPNJ6K3Jb5B2jIJSaJM3xlsJQq7xhXfmOoo3/jRASjU0PndgAAAABJRU5ErkJggg==" alt="Store icon"/></span> Nearby Stores</a></li>
            <li class="spread"><a class="unit" href="https://www.bravissimo.com/fitting-guides-and-advice/"> <span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAwCAYAAACynDzrAAAABGdBTUEAALGPC/xhBQAABPlJREFUaAXtm39olVUYx3c3f1Qus+nyxx+pWAQhE3/EiCQcgyGaMpFASgwJCsUfbKhDixAkRTGCHCqi4A8oMQoRF4mIaEUWopWZTZku8QfinG6aU7d5/XyvMe49nr3n3eXuvfe964HP3T3Pec45z/Pw3vOec953kZw0SjQafYXh34EyGAX5EIVmqIUa+CoSiVzib88REtMPVsMtcMlVDCogr0dkiEAHwyHoqnxJg35ZnSQCfBaOdDUzcfZKUq+sTRLBfR4XrPm1HcU1uG5WGOVFWZkgghwDLUawKrbCJiiGQfACTILdYBMlcWjWJYmgNliivY9udmfBUlcFDy3tKjprE0o9AT4NtZZAP3MFRJtvLO00yUdcbUNTTzAvg/nz+ld6VxDYlIDmp3i5TOE5V9tU1OemohMffRRi85Rhd5nyRUNnK55B2WRU9Kc8wNB1SzGoBLVYvL+B7oFFb6q0shamBPITCypBp4lub1yECngzWwhb4HFmsa8v8WleLXfQmVeV2S5cZeYMLRIXwHqY7Nd7bHeCKUdRBHIF+fUzLXYk4UNoM7NDeXlaHEr3oAQegXzQonIjmHcvVNFGeDHdvgY6PgErMfPhVzgPWkB2JisCdS4TBiMTMzrLhqGvodw3E3wO1AeC1l7MJd9hUBCoYwwW1G3eFZfXEcZtGn8KM1kWNLo6SnW9l2OpHsurP9t6qJ4Ge2AHifnLq3F31mVKgmwxaiG51lYRpC5TfmIPLUHbdBaz7lWlPUFMvM8TojazpgyjLrvPoM2I48sEXwifQD3YDsW0gj4DC0GPg3qGEGx/WAwXwK+cwnAO9MnaLBFcX5gLpyFZ+ZmG5ZA9G1WCyYWZ8AukSg7SUWnoryaCKAOdH7vkAQbH4dh//OZqQL02st9CcegShdOvw16wTb6oE2QfpTeg447K914wBXTu45J7GGyH0RmfKJwsgl3gtRunOiaH+fQ8OKNeiZoFJ8AlzRh8ASMzLlE4NQqq4Ta4RD+lt8H3ywjY6rHRB/A3uERPZlfBkLQnCie0mFsNDeASrWneB/Pphu84aDsAlsBFcIlsloJ5nu17vKQNGbQAquASuOQfDCohZc+x6GsI6CpxPcfHJPbAUlffM0kH7Lchg+i9nnlwFlxyDYOVMNhv/121o++RoHmnGVyieUzzWeo36HTaG94FP7ffJuz0FseIrgacrD1jjQbdye6BS3RnnJrsWE+0o7Np8KNrVOpbYBu8+kQnASkYuxi0NrId9qNOkBpKbybtGo0nwfcJXdoL2lR+Da8lPViKG+JLKWi17ZJWDPSazTjfLmA8AfaA7XkU6gQ5QKnEd+cBGuKXnpSUg/ZvLrmLwRbQS6V2oXIEbAX9VFzyEwbTIeM3jfjYB3QS8Ae45CYG62BQQpZQjAfdjl3yOwazoXdCByEo4HM+LIA6cMlJDIbHwuKLGipwLzlH5XwI/QkfMQyEj+AKeMl+KvNy+HjLw0qr0WUQ/Gq0m69KYtIuYA00gE00B4/VRPYDvkw0/LlLeSdUQx3oJK9jt833bJB2gmiFIqiEGWCeWL6nVeV9MEXJ0L8HaEHle1NpdhKScht+6gmK7QKI3QqnUFkTkmCCdFNX2ARl7Sj8GeTIIRnrIH6eyuXppV5nmwd6Z/B/eZwBzbuLyU17x0KPyXoMyo9B+xO9RdpRx/eeIJqH9HLEAVhFcur5m/MISY8MTAuDfZsAAAAASUVORK5CYII=" alt="hanger icon"/></span> Fitting Advice</a></li>
          </ul>

        </div>

      </div>
    </div>
  `;

  const addEvents = (wrapperEl) => {

    // Toggle open/close
    const wrap = document.querySelector('.BV020-menu .wrap');
    const linkList = document.querySelector('.BV020-menu--list');
    let count = 0;
    if (wrapperEl) {
      addEventListener(wrapperEl, 'click', (e) => { 
        if (!linkList.contains(e.target)) {
          wrap.classList.toggle('active');
          count += 1;
  
          if (count === 2) {
            setCookie('BV020-closedMenu', 'true', 2);
            wrap.classList.add('hasClosed');
          } 
        }
      });
    }

    // Live chat
    const liveChat = document.querySelector('button.tcp-icon-btn.tcp-js-open-options');
    const phoneLink = document.querySelector('.c-footer__channels .l-grid__unit:first-of-type .c-channel__actions .c-button-link');
    const addedLiveChat = document.getElementById('BV020-chat');
    const addedPhone = document.getElementById('BV020-phone');

    // Is chat active
    const { liveHelp } = window.dataLayer[0]; 

    if (addedPhone && phoneLink) {
      addEventListener(addedPhone, 'click', (e) => {
        if (liveHelp && liveHelp.enabled !== true) {
          e.preventDefault();
          addedLiveChat.previousElementSibling ? addedLiveChat.previousElementSibling.classList.remove('active') : null;
          addedPhone.previousElementSibling ? addedPhone.previousElementSibling.classList.toggle('active') : null;
        } else {
          phoneLink.click();
        }
      });
    }

    if (addedLiveChat && liveChat) {
      addEventListener(addedLiveChat, 'click', (e) => {
        if (liveHelp && liveHelp.enabled !== true) {
          e.preventDefault();
          addedPhone.previousElementSibling ? addedPhone.previousElementSibling.classList.remove('active') : null;
          addedLiveChat.previousElementSibling ? addedLiveChat.previousElementSibling.classList.toggle('active') : null;
        } else {
          liveChat.click();
        }
      });
    }
  };

  const run = () => {
    document.body.insertAdjacentHTML('beforeend', menu);

    // Check cookies
    if (getCookie('BV020-closedMenu')) {
      const wrap = document.querySelector('.BV020-menu .wrap');
      wrap.classList.add('hasClosed');
    }

    // Attach events
    const toggleEl = document.querySelector('.BV020-menu .BV020-menu--toggle');
    addEvents(toggleEl);
  }


  // Run 
  if (category === 'productListing' || category === 'product') {
    run();
  }

  // Due to React, we need to add an observer to the doc body.
  addObserver(document.body, () => {
    if (!document.body.classList.contains(settings.ID)) {
      document.body.classList.add(settings.ID);
    }
  }, {
    config: {
      attributes: true,
      childList: false,
      subtree: false,
    },
  });


};

export default activate;
