/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { bindLocSearch, getGoogleMaps } from './branch-finder';

const getIsOpeningSoon = () => {
  let branchAddress = '';
  const branchInfo = document.querySelector('.wpsl-location-address');
  if(branchInfo) {
    branchAddress = branchInfo.innerText.replace(/\n/g, '  ').replace(/,(\w)/g, ', $1').trim();
  }

  let isOpeningSoon = false
  if(branchAddress.match(/opening\s+soon/igm)) {
    isOpeningSoon = true;
  }

  return isOpeningSoon;
}

/**
 * Update new phone numbers on the page to match infinity numbers
 * Add to data-number-type="care" or data-number-type="job" to an element
 * for the number to be updated when infinity number runs
 */
const updateInfinityNumbers = () => {
  /**
   * Wait for the Infinity Number API to be available
   * @param {Funciton} cb
   */
  const waitForApi = (cb) => {
    pollerLite([
      () => window?._ictt?.push instanceof Function,
      () => window?._ictt?.hasIntegrationsRun,
      () => {
        const numbers = document.querySelectorAll('.branch-details .InfinityNumber');
        return numbers ? numbers.length >= 2 : false;
      },
    ], cb);
  };

  const callback = () => {
    ///* Add a callback which will run when the Infinity Numbers
    //have loaded in (or immediately if they already exist) */
    setTimeout(() => {
      /**
       * Replace a number element with a new number
       * @param {HTMLElement} element Element containing old number
       * @param {string} number New number
       */
      const replaceNumber = (element, number) => {
        const el = element;
        el.classList.remove('infinityNumber');
        el.href = `tel:${number.replace(/\s/g, '')}`;
        el.innerText = number;
      };

      const branchNumbers = [].map.call(document.querySelectorAll('#content .branch-details .InfinityNumber > a'), el => el.innerHTML.trim());
      const [careNumber, jobNumber] = branchNumbers;

      const careNumbersToReplace = document.querySelectorAll('[data-number-type="care"]');
      const jobNumbersToReplace = document.querySelectorAll('[data-number-type="job"]');
      
      // Replace care numbers
      [].forEach.call(careNumbersToReplace, (careNumberToReplace) => {
        replaceNumber(careNumberToReplace, careNumber);
      });

      // Replace job number
      [].forEach.call(jobNumbersToReplace, (jobNumberToReplace) => {
        replaceNumber(jobNumberToReplace, jobNumber);
      });
    }, 2500);
  };

  waitForApi(callback);
};

/**
 * Get all reviews url for location
 */
const getReviewsUrl = () => {
  return window.location.pathname + 'reviews/';
};

/**
 * Get Submit Reviews URL
 */
const getSubmitReviewUrl = () => {
  return '/leave-a-review/';
};

/**
 * Helper scrape accordion
 */
const scrapeAccordion = () => {
  const boxElms = [];
  boxElms.push(document.querySelector(`.HH024_Box1 .HH024_Box_Elements`));
  boxElms.push(document.querySelector(`.HH024_Box2 .HH024_Box_Elements`));

  let accordion = [];

  const scrapeKids = (cont) => {
    const kids = cont.children;

    let result = [];

    if(kids) {
      let activeArray = null;

      [].forEach.call(kids, (kid) => {
        if(kid.nodeName.toLowerCase() == 'hr' || kid.nodeName.toLowerCase() == 'a' || kid.nodeName.toLowerCase() == 'div') {
          return;
        }

        if(kid.id == 'intro' || kid.id == 'manager' || kid.id == 'team') {
          return;
        }

        if(kid.nodeName.toLowerCase() == 'h2') {
          if(activeArray) {
            result.push(activeArray); // previous one
          }

          activeArray = [kid];

          return;
        }

        if(activeArray) {
          activeArray.push(kid);
        }
      });

      if(activeArray) {
        // last one
        result.push(activeArray);
      }
    }

    return result;
  }

  if(!document.querySelector('.HH024_Box1 .HH024_Box_Elements') && document.documentElement.classList.contains('mobile')) {
    // Taken straight from HH024 which doesn't run on mobile
    const box1El = document.querySelector('#rest-of-page');


    accordion = scrapeKids(box1El) || [];
  } else {
    if(boxElms[0]) {
      // All of them for box1
      const scraped = scrapeKids(boxElms[0]);
      accordion = scraped;
    }

    if(boxElms[1]) {
      // All of them for box1
      const box2Kids = scrapeKids(boxElms[1]);
      if(box2Kids && box2Kids[0]) {
        accordion.push(box2Kids[0]);
      }
    }
  }

  return accordion;
};

/**
 * Get gmaps link
 */
const getGmapsLink = () => {
  const allBranchDetails = document.querySelectorAll('.branch-details');
  let addressText = allBranchDetails[0] ? allBranchDetails[0].querySelector('.wpsl-location-address').innerText.trim() : null;
  if(getIsOpeningSoon()) {
    const pageTitle = document.querySelector('#hero h1');
    if(pageTitle) {
      addressText = pageTitle.innerText.trim();
    }
  }

  let googleMapsSearchLink = false;
  if(addressText) {
    googleMapsSearchLink = `https://www.google.co.uk/maps/search/${addressText}`;
  }

  return googleMapsSearchLink;
};

/**
 * Scrape reviews info
 */
const scrapeReviews = () => {
  const reviews = {
    starsHtml: '',
    starsTextScore: '',
    starsTextNum: '',
    nhsChoicesHtml: '',
    googleHtml: '',
    percentagesHtml: '',
  };

  const stars = document.querySelector('.glsr-sidebar .glsr-summary-stars');
  if(stars) {
    reviews.starsHtml = `
      <div class="glsr-default">
        ${stars.outerHTML}
      </div>
    `;
  }
  const text = document.querySelector('.glsr-sidebar .glsr-summary-text');
  if(text) {
    var spl = text.innerText.trim().split(',');

    reviews.starsTextScore = (spl[0] || '').trim();
    reviews.starsTextNum = (spl[1] || '').trim();
  }

  const nhsChoicesReviews = document.querySelector('.glsr-sidebar .TftSiteReviewsSummary-nhs');
  if(nhsChoicesReviews) {
    reviews.nhsChoicesHtml = nhsChoicesReviews.outerHTML;
  }

  const googleReviews = document.querySelector('.glsr-sidebar .TftSiteReviewsSummary-google');
  if(googleReviews) {
    reviews.googleHtml = googleReviews.outerHTML;
  }

  const percentages = document.querySelector('.TftSiteReviewsSummary-percentages');
  if(percentages) {
    reviews.percentagesHtml = `<div class="TftSiteReviewsSummary">${percentages.outerHTML}</div>`;
  }

  return reviews;
};

/**
 * Entry point for experiment
 */
export default () => {
  setup();
  
  // ----------------------------------------------------
  // Default Number on load
  // ----------------------------------------------------
  let defaultNum = '';
  const num = document.querySelector('.contact .phone-number');
  if(num) {
    defaultNum = num.innerText.trim();
  }

  // ----------------------------------------------------
  // Header / Hero
  // ----------------------------------------------------
  const hero = document.querySelector('#hero');
  hero.insertAdjacentHTML('beforebegin', `
    <div class="${shared.ID}-hero">
      <div class="${shared.ID}-hero__quote">
        "We don't know what we would do without the carers. They are our
        stars, they are our saviours."
      </div>
      <div class="container">
        <div class="row"></div>
      </div>
    </div>
  `);

  const reviewsInfo = scrapeReviews();

  const newHero = document.querySelector(`.${shared.ID}-hero`);
  newHero.querySelector('.container .row').insertAdjacentHTML('beforeend', `
    <div class="${shared.ID}-hero__reviews">
      ${reviewsInfo.starsHtml}

      <span class="${shared.ID}-hero__reviews-score">
        ${reviewsInfo.starsTextScore.replace(/out\s/, '')}
      </span>

      <a href="#${shared.ID}-reviews" class="${shared.ID}-hero__reviews-num">
        ${reviewsInfo.starsTextNum}
      </a>

      <div class="${shared.ID}-hero__images">
        ${reviewsInfo.nhsChoicesHtml ? 
          '<img src="/wp-content/themes/helpinghands-bbchild/images/nhs-choices-logo-widget.png">' : ''
        }
        ${reviewsInfo.googleHtml ? 
          '<img src="/wp-content/themes/helpinghands-bbchild/images/google.png">' : ''
        }
      </div>
    </div>
  `);

  // ----------------------------------------------------
  // Page Title
  // ----------------------------------------------------
  const pageTitle = document.querySelector('#hero h1');
  newHero.insertAdjacentHTML('afterend', `<h2 class="${shared.ID}-page-title">${pageTitle.innerText.trim()}</h2>`);

  // ----------------------------------------------------
  // Branch Coverage
  // ----------------------------------------------------
  const newTitle = document.querySelector(`.${shared.ID}-page-title`);
  const lastSearchInfoStored = sessionStorage.getItem('HHLastSearch');
  let lastSearchInfo = '';
  let lastSearchInfoLength = 0;

  if(lastSearchInfoStored) {

    lastSearchInfoLength = lastSearchInfoStored.length;

    if(lastSearchInfoStored && lastSearchInfoLength >= 2) {
      lastSearchInfo = lastSearchInfoStored;
    }
  }

  newTitle.insertAdjacentHTML(`afterend`, `
    <div class="${shared.ID}-cov">
      <div class="${shared.ID}-cov--current" ${!lastSearchInfo ? ' style="display:none;"' : ''}>
        <p class="${shared.ID}-cov__title">
          This branch covers where you need care:
        </p>
        <div class="${shared.ID}-cov__result">
          <img src="//cdn-sitegainer.com/m900h3wd03048th.png">
          <span class="${lastSearchInfoLength >= 8 ? 'xsmaller' : ''}">${lastSearchInfo}</span>
          <a class="${shared.ID}-cov__change">Change Location?</a>
        </div>
      </div>

      <div class="${shared.ID}-cov--form" ${lastSearchInfo ? ' style="display:none;"' : ''}>
        <h2>Tell us where you need care</h2>
        <div class="${shared.ID}-cov__result">
          <form class="HH027_BranchFinder-form" id="locations-search" role="search" method="get" action="/locations-results/">
            <div class="row">
              <div class="col-xs-12">
                <div class="HH027_BranchFinder">
                  <input class="HH027_BranchFinder-input" type="text" placeholder="Enter postcode or town" value="" name="loc" id="s" autocomplete="off">
                  <button class="HH027_BranchFinder-cta" type="submit">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
                <div class="HH027_BranchFinder-error" style="display:none;"><p>Sorry, we didn't recognise that location. Please double check the information or <a href="/about-us/contact-us/free-home-care-consultation/ ">contact us.</a></p></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `);

  const changeLoc = document.querySelector(`.${shared.ID}-cov__change`);
  const locCurrent = document.querySelector(`.${shared.ID}-cov--current`);
  const locForm = document.querySelector(`.${shared.ID}-cov--form`);
  if(changeLoc) {
    changeLoc.addEventListener('click', () => {
      locCurrent.style.display = 'none';
      locForm.style.display = 'block';
    });

    if (window.google && window.google.maps) {
      bindLocSearch();
    } else {
      getGoogleMaps(bindLocSearch);
    }
  }

  // ----------------------------------------------------
  // CTAs
  // ----------------------------------------------------
  const cov = document.querySelector(`.${shared.ID}-cov`);
  let branchAddress = '';
  const branchInfo = document.querySelector('.wpsl-location-address');
  if(branchInfo) {
    branchAddress = branchInfo.innerText.replace(/\n/g, '  ').replace(/,(\w)/g, ', $1').trim();
  }

  let isOpeningSoon = getIsOpeningSoon();

  cov.insertAdjacentHTML('afterend', `
    <div class="${shared.ID}-ctas">
      <div class="container">
        <div class="row">
          <div class="col-md-6 ${shared.ID}-cta1">
            <div class="inner">
              <h3>Call us:</h3>
              <p>To learn more about how we can help call</p>
              <div class="${shared.ID}-cta1__num">
                <a href="" class="infinityNumber" data-number-type="care">${defaultNum}</a>
              </div>
            </div>
          </div>

          <div class="col-md-6 ${shared.ID}-cta2">
            <div class="inner">
              <h3>Branch address:</h3>
              <p>${branchAddress}</p>
              <div class="${shared.ID}-cta2__links">
                <a href="${getGmapsLink()}" target="_blank">
                  <span>See ${isOpeningSoon ? pageTitle.innerText.trim() : ''} on Maps</span>
                </a>
                <a href="#${shared.ID}-branch-details">
                  <span>Branch Opening Hours</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);

  if(isOpeningSoon) {
    document.body.classList.add(`${shared.ID}-opening-soon`);
  }

  // ----------------------------------------------------
  // Quality Care Section
  // ----------------------------------------------------
  const ctas = document.querySelector(`.${shared.ID}-ctas`);
  ctas.insertAdjacentHTML('afterend', `
    <div class="${shared.ID}-qcp">
      <div class="inner">
        <h2 class="${shared.ID}-section-title">Quality Care Provided in your Own Home</h2>
        <div class="container">
          <p class="${shared.ID}-qcp__text">For <strong>over 30 years</strong>, we've been supporting people with 
            <strong>care, nursing and companionship</strong> across England and
            Wales. As industry-leaders in home care, we know what it takes to provide
            the right level of care so that you can retain your independence in the
            comfort of your beloved home.
          </p>
          <div class="${shared.ID}-qcp__boxes">

            <div class="${shared.ID}-qcp__box">
              <img src="https://cdn-sitegainer.com/m61qin3hjogkz1h.png">
              Over <strong>100 branches</strong>
              across the UK means we're local to you
            </div>
            <div class="${shared.ID}-qcp__box">
              <img src="https://cdn-sitegainer.com/f5n5ef77o8xn8e6.png">
              We are not an agency - we employ every carer directly
            </div>
            <div class="${shared.ID}-qcp__box">
              <img src="https://cdn-sitegainer.com/0kdgtbsu8iu40dv.png">
              Get to know your carer before care starts
            </div>
            <div class="${shared.ID}-qcp__box">
              <img src="https://cdn-sitegainer.com/0f6md28nipry3ph.png">
              Family-run and experts in home care since 1989
            </div>
            <div class="${shared.ID}-qcp__box">
              <img src="https://cdn-sitegainer.com/9g2f4nycvdwuh91.png">
              Fully flexible care packages as your needs change
            </div>
          </div>
        </div>
      </div>

      <div class="commission-row">
        <div class="container">
        <div class="cqc-wrap col-md-6">
          <div class="inner">
            <div class="widget-target col-md-7">
            </div>
            <div class="col-md-5 txt">
              Our ${pageTitle.innerText.trim()} branch is fully regulated and
              accredited by the CQC and CIW.
            </div>
          </div>
        </div>
        <div class="cqc-wrap2 col-md-6">
          <div class="xdaa">
            <div class="row">
              <div class="col-md-6">
                <img src="https://cdn-sitegainer.com/7sg2d9khipxr6yk.jpg">
              </div>
              <div class="col-md-6">
                Every one of our carers is a dementia specialist
              </div>
            </div>
          </div>
          <div class="xdbs">
            <div class="row">
              <div class="col-md-6">
                <img src="https://cdn-sitegainer.com/xfb78mlthciz0m2.jpg">
              </div>
              <div class="col-md-6">
                All of our carers are expertly-trained and DBS checked
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  `);

  const commissionRow = document.querySelector('.commission-row');
  const widgetTarget = commissionRow.querySelector('.widget-target');
  const cqcWidget = document.querySelector('.cqc-widget');

  if(cqcWidget) {
    widgetTarget.insertAdjacentElement('afterbegin', cqcWidget);
  } else {
    commissionRow.parentNode.removeChild(commissionRow);
  }

  // ----------------------------------------------------
  // Two types of care
  // ----------------------------------------------------
  const qcp = document.querySelector(`.${shared.ID}-qcp`);
  qcp.insertAdjacentHTML('afterend', `
    <div class="${shared.ID}-tt ${shared.ID}-tt--lactive">
      <div class="container">
        <h2 class="${shared.ID}-section-title">We offer Two Types of Care</h2>

        <p class="${shared.ID}-tt__buttons">
          <a class="xxlivein-btn active">Live in home care</a>
          <a class="xxvisiting-btn">Visiting Home Care</a>
        </p>

        <div class="${shared.ID}-tt-i">
          <div class="${shared.ID}-tt-r">
            <div class="${shared.ID}-tt-l intro">
              <img src="https://cdn-sitegainer.com/qsvbiwwoat0yt91.jpg">
              <div class="xinner">
                <h3 class="xlivein"><span>Live-in home care</span></h3>
                <p>
                  <a href="/live-in-care/" class="btn btn-standard">Find out more</a> 
                </p>
              </div>
            </div>
            <div class="${shared.ID}-tt-v intro">
              <img src="https://cdn-sitegainer.com/vxjhgho2xz0tisv.jpg">
              <div class="xinner">
                <h3 class="xvisiting"><span>Visiting home care</span></h3>
                <p>
                  <a href="/visiting-care/" class="btn btn-standard">Find out more</a> 
                </p>
              </div>
            </div>
          </div>

          <div class="${shared.ID}-tt-r">
            <div class="${shared.ID}-tt-c">
              What is it?
            </div>
          </div>

          <div class="${shared.ID}-tt-r">
            <div class="${shared.ID}-tt-l">
              <p>
                One-to-one support in your home, 24/7. A fully qualified carer comes to live in your 
                home so you can remain in the place you know and love.
              </p>
            </div>
            <div class="${shared.ID}-tt-v">
              <p>
                Fully flexible care provided in your own home with a fully qualified carer. The 
                time and duration of the visits are completely up to the customer. Visits can be as 
                short as 30 minutes or can consist of several overnight stays, depending on your needs.
              </p>
            </div>
          </div>

          <div class="${shared.ID}-tt-r">
            <div class="${shared.ID}-tt-c">
              What type of conditions does this care cover?
            </div>
          </div>

          <div class="${shared.ID}-tt-r">
            <div class="${shared.ID}-tt-l">
              <p>
                All conditions covered, from companionship to tertraplegia. Includes personal care, 
                medication administration, feeding, meal preparation, household duties. Can take customers 
                out for the day, if wanted.
              </p>
            </div>
            <div class="${shared.ID}-tt-v">
              <p>
                All levels of care covered, can assist outside of the home too.
              </p>
            </div>
          </div>

          <div class="${shared.ID}-tt-r">
            <div class="${shared.ID}-tt-c">
              How frequent is this care?
            </div>
          </div>

          <div class="${shared.ID}-tt-r">
            <div class="${shared.ID}-tt-l">
              <p>
                Round-the-clock (24/7)
              </p>
            </div>
            <div class="${shared.ID}-tt-v">
              <p>
                Led by the customer, can be increased or decreased whenever needed.
              </p>
            </div>
          </div>

          <div class="${shared.ID}-tt-r">
            <div class="${shared.ID}-tt-c">
              Key features of care type
            </div>
          </div>

          <div class="${shared.ID}-tt-r">
            <div class="${shared.ID}-tt-l">
              <ul class="${shared.ID}-ticks">
                <li>
                  Round-the-clock (24/7)
                </li>
                <li>
                  In your own home
                </li>
                <li>
                  Personalised care plan
                </li>
                <li>
                  Carer to match your needs, personality and interests
                </li>
              </ul>
            </div>
            <div class="${shared.ID}-tt-v">
              <ul class="${shared.ID}-ticks">
                <li>
                  From 30 minutes a week depending on your needs
                </li>
                <li>
                  In your own home
                </li>
                <li>
                  All levels of care covered
                </li>
                <li>
                  Flexible care plan based on customer's needs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);

  const tt = document.querySelector(`.${shared.ID}-tt`);

  const ttBtns = document.querySelectorAll(`.${shared.ID}-tt__buttons a`);

  [].forEach.call(ttBtns, (btn) => {
    btn.addEventListener('click', (e) => {
      if(e.currentTarget.classList.contains('xxlivein-btn')) {
        tt.classList.add(`${shared.ID}-tt--lactive`);
        tt.classList.remove(`${shared.ID}-tt--vactive`);
      } else {
        tt.classList.remove(`${shared.ID}-tt--lactive`);
        tt.classList.add(`${shared.ID}-tt--vactive`);
      }

      [].forEach.call(ttBtns, (b) => {
        b.classList.remove('active');
      });

      e.currentTarget.classList.add('active');
    });
  });

  // ----------------------------------------------------
  // Other branch services
  // ----------------------------------------------------
  const accordionData = scrapeAccordion();

  let accordionHtml = '';

  accordionData.forEach((d) => {
    accordionHtml += `<div class="${shared.ID}-accordion__row">`;

    if(d[0]) {
      accordionHtml += `<h2 class="${shared.ID}-accordion__heading">${d[0].innerText.trim()}</h2>`;
    }

    accordionHtml += `<div class="${shared.ID}-accordion__content">`;
    accordionHtml += `<div class="${shared.ID}-accordion__content-inner">`;
    d.forEach((elm, idx) => {
      if(idx == 0) {
        return;
      } else {
        accordionHtml += elm.outerHTML.trim();
      }
    });
    accordionHtml += '</div>';
    accordionHtml += '</div>';

    accordionHtml += '</div>';
  });

  tt.insertAdjacentHTML('afterend', `
    <div class="${shared.ID}-serv">
      <div class="container">
        <h2 class="${shared.ID}-section-title">Other Services We Provide at this Branch</h2>

        <div class="${shared.ID}-accordion">
          ${accordionHtml}
        </div>
      </div>
    </div>

    <div class="${shared.ID}-serv-more">
      <div class="container">
        <h3>If you'd like to learn more, there are a few different ways you can contact us</h3>
        <p>
          <a class="btn btn-standard btn--seethrough xcall infinityNumber" data-number-type="care">${defaultNum}</a>
          <a class="btn btn-standard xlivechat">Talk to us on live chat</a>
          <a href="/request-a-callback/" class="btn btn-standard btn--seethrough xcallback">Request a call back</a>
        </p>
      </div>
    </div>
  `);

  [].forEach.call(document.querySelectorAll(`.${shared.ID}-accordion__heading`), (heading) => {
    if(heading) {
      heading.addEventListener('click', (e) => {
        if(e.currentTarget.classList.contains('active')) {
          heading.nextElementSibling.classList.remove(`${shared.ID}-accordion__content--active`);
          heading.classList.remove(`active`);
        } else {
          heading.nextElementSibling.classList.add(`${shared.ID}-accordion__content--active`);
          heading.classList.add(`active`);
        }
      });
    }
  });

  [].forEach.call(document.querySelectorAll('.xlivechat'), (elm) => {
    elm.addEventListener('click', () => LC_API && LC_API.open_chat_window());
  });

  // ----------------------------------------------------
  // Meet the TEam
  // ----------------------------------------------------
  const servMore = document.querySelector(`.${shared.ID}-serv-more`);
  servMore.insertAdjacentHTML('afterend', `
    <div class="${shared.ID}-mtt">
      <div class="container">
        <h2 class="${shared.ID}-section-title">Meet the Team</h2>

        <div class="row ${shared.ID}-mtt__boxes">
        </div>
      </div>
    </div>
  `);

  const existingTeam = document.querySelector('#meet-our-team');
  const mttBoxes = document.querySelector(`.${shared.ID}-mtt__boxes`);

  if(existingTeam && mttBoxes) {
    [].forEach.call(existingTeam.querySelectorAll('.col-xs-12'), (box) => {
      const pic = box.querySelector('img');
      const name = box.querySelector('p.reduced-margin-bottom');
      const title = box.querySelector('.caption p:last-of-type');
      const pdf = box.querySelector('a');

      if(pic && name && title && pdf) {
        mttBoxes.insertAdjacentHTML('beforeend', `
          <div class="col-md-3 col-xs-6 xmember">
            <img src="${pic.src}">
            <h3>${name.innerText.trim()}</h3>
            <p class="xsubtitle">${title.innerText.trim()}</p>
            <p class="xreadmore">
              <a target="_blank" class="btn btn-standard btn-seethrough" href="${pdf.href}">Read More</a>
            </p>
          </div>
        `);
      }
    });
  }

  if(mttBoxes) {
    mttBoxes.insertAdjacentHTML('beforeend', `
      <div class="col-md-3 col-xs-6 xglassdoor">
        <img src="/wp-content/uploads/People-Love-Working-Here_Circle-300x300.png">
      </div>
    `);
  }

  // ----------------------------------------------------
  // What's happening
  // ----------------------------------------------------
  const mtt = document.querySelector(`.${shared.ID}-mtt`);
  let branchName = '';
  const fb = document.querySelector('#facebook .cff-wrapper');
  if (fb) {
    mtt.insertAdjacentHTML('afterend', `
      <div class="${shared.ID}-wh">
        <div class="container">
          <h2 class="${shared.ID}-section-title">What's Happening in our ${pageTitle.innerText.trim()} Branch</h2>

          <div class="${shared.ID}-wh__inner">
            
          </div>
        </div>
      </div>
    `);
    const whInner = document.querySelector(`.${shared.ID}-wh__inner`);
    whInner.insertAdjacentElement('afterbegin', fb);

    setTimeout(() => {
      window['j' + ''.trim() + 'Query'](whInner).trigger('resize');
    }, 500);
  }

  // ----------------------------------------------------
  // Reviews
  // ----------------------------------------------------
  const wh = document.querySelector(`.${shared.ID}-wh`);
  const nextEl = wh || mtt;
  const reviewsScraped = scrapeReviews();
  nextEl.insertAdjacentHTML('afterend', `
    <div id="${shared.ID}-reviews" class="${shared.ID}-reviews">
      <div class="container">
        <h2 class="${shared.ID}-section-title">Reviews</h2>

        <p>We are actively collecting and monitoring our reviews and feedback for 
        ${pageTitle.innerText.trim()} to ensure our customers receive
        the best possible live-in and visiting care service.

        <div class="${shared.ID}-reviews-box">
          <div class="${shared.ID}-reviews-box__stars">
            ${reviewsInfo.starsHtml}
            <span>${reviewsInfo.starsTextScore}, ${reviewsInfo.starsTextNum}</span>
          </div>
          <div class="glsr-default">
            ${reviewsScraped.percentagesHtml}
          </div>

          <div class="${shared.ID}-reviews-box__buttons">
            <a href="${getSubmitReviewUrl()}" class="btn btn-standard ${shared.ID}-submitreview">Submit a Review</a>
            <a href="${getReviewsUrl()}" class="btn btn-standard ${shared.ID}-viewall">View all Reviews</a>
          </div>
        </div>

        <div class="${shared.ID}-boxesaft ${shared.ID}-reviews-box__nhs">
          <div class="${shared.ID}-boxaft ${shared.ID}-reviews-box__nhs">
            <div class="TftSiteReviewsSummary">
              ${reviewsScraped.nhsChoicesHtml}
            </div>
          </div>
          <div class="${shared.ID}-boxaft ${shared.ID}-reviews-box__google">
            <div class="TftSiteReviewsSummary">
              ${reviewsScraped.googleHtml}
            </div>
          </div>
        </div>
      </div>
    </div>
  `);

  // ----------------------------------------------------
  // Latest News
  // ----------------------------------------------------
  const rev = document.querySelector(`.${shared.ID}-reviews`);
  rev.insertAdjacentHTML('afterend', `
    <div class="${shared.ID}-news">
      <div class="container">
        <h2 class="${shared.ID}-section-title">Latest News</h2>
        <div class="${shared.ID}-news__inner">
        </div>
      </div>
    </div>
  `);
  const additionalReadingRow = document.querySelector(`.additional-reading .row`);
  const newsInner = document.querySelector(`.${shared.ID}-news__inner`);

  if(additionalReadingRow) {
    newsInner.insertAdjacentElement('afterbegin', additionalReadingRow);
  }

  // ----------------------------------------------------
  // Branch Details
  // ----------------------------------------------------
  const news = document.querySelector(`.${shared.ID}-news`);
  const addnDetails = document.querySelector(`.HH024_Box_Elements .additional-details .branch-hours`);
  if(news) {
    news.insertAdjacentHTML('afterend', `
      <div class="${shared.ID}-branch-details" id="${shared.ID}-branch-details">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="${shared.ID}-branch-details__left">
                <p class="ximg">
                  <img src="">
                </p>
                <h3>Book a home visit</h3>
                <p class="${shared.ID}-branch-details__subtitle">
                  Discuss your care options
                </p>

                <p class="${shared.ID}-select">
                  Select your preferred appointment date
                </p>

                <div class="${shared.ID}-calendar">
                  
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="${shared.ID}-branch-details__right">
                <p class="ximg">
                  <img src="">
                </p>
                <h3>Branch details</h3>
                <p class="${shared.ID}-branch-details__subtitle">
                  Opening hours and address details
                </p>

                <div class="${shared.ID}-branch-details__hours">
                  ${addnDetails ? addnDetails.innerHTML.trim() : ''}  
                </div>

                <div class="${shared.ID}-branch-details__address">
                  <h3>Branch address</h3>
                  <div class="${shared.ID}-branch-details__addressinfo">
                    ${branchAddress}

                    <a href="${getGmapsLink()}" target="_blank">
                      Show on Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="${shared.ID}-backtotop">
            <a class="${shared.ID}-backtotop__btn btn btn-standard">Take me back to the top</a>
          </div>
        </div>
      </div>
    `);

    // append calendar
    const calWrap = document.querySelector(`.${shared.ID}-calendar`);
    const calForm = document.querySelector('.bookhomevisit form');
    if(calWrap && calForm) {
      calWrap.insertAdjacentElement('afterbegin', calForm);
    }
  }

  // Back to top
  const bttBtn = document.querySelector(`.${shared.ID}-backtotop__btn`);
  if(bttBtn) {
    bttBtn.addEventListener('click', () => {
      window.scrollTo(0,0);
    });
  }

  // Update Infinity Numbers
  updateInfinityNumbers();

  // --------------------------
  // Mobile considerations
  // --------------------------
  if(window.innerWidth <= 991) {
    const heroRev = document.querySelector(`.${shared.ID}-hero__reviews`);
    newHero.insertAdjacentElement('afterend', heroRev);

    newHero.insertAdjacentElement('afterbegin', newTitle);

    const cqcWrap = document.querySelector('.cqc-wrap');
    if(cqcWrap && commissionRow) {
      mtt.insertAdjacentElement('afterend', cqcWrap);

      commissionRow.style.display = 'none';
    }

    var __runSlick = function __runSlick() {
      window['j' + ''.trim() + 'Query'](`.${shared.ID}-qcp__boxes`).slick({
        dots: true,
        infinite: false,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: false,
              dots: true
            }
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });

      window['j' + ''.trim() + 'Query'](`.${shared.ID}-news__inner .row .hidden-md.clearfix`).remove();

      window['j' + ''.trim() + 'Query'](`.${shared.ID}-news__inner .row`).slick({
        dots: true,
        infinite: false,
        autoplay: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: false,
              dots: true
            }
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    };

    if(window['j' + ''.trim() + 'Query'].fn.slick) {
      setTimeout(() => {
        __runSlick();
      }, 1000);
    } else {
      window['j' + ''.trim() + 'Query'].getScript(
        "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js",
        () => {
          __runSlick();
        }
      );
    }
  }

  // ----------------------------------------------------
  // Tidy up reviews
  // ----------------------------------------------------
  if(reviewsInfo.starsHtml === '') {
    const heroRev = document.querySelector(`.${shared.ID}-hero__reviews`);
    if(heroRev) {
      heroRev.style.display = 'none';
    }

    const reviewsSection = document.querySelector(`#${shared.ID}-reviews`);
    if(reviewsSection) {
      reviewsSection.style.display = 'none';
    }
  }


};
