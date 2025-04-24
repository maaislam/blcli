//import { fireEvent } from '../../../../../core-files/services';
import { changeFormFunction, changeFormFunctionTwo, changeFormFunctionThree } from './changeForm';
const giftJourneyModal = (ID, fireEvent) => {
    /*This submit url will generate value dynamically from gift Journey*/
    const sumbmitUrl = {
        shoppingFor: '',
        occasion: '',
        spendAmount: '',
        needTime: '',
    };
    let fromOneImage =
        'https://www.biscuiteers.com/tco-images/unsafe/605x650/filters:upscale():fill(white)/https://www.biscuiteers.com/static/cms/media/Engagement-desktop-.jpg';
    let fromTwoImage =
        'https://www.biscuiteers.com/tco-images/unsafe/605x650/filters:upscale():fill(white)/https://www.biscuiteers.com/static/cms/media/Birthday-treats%20desktop%20text%20on%20image.jpg';
    let fromThreeImage =
        'https://www.biscuiteers.com/tco-images/unsafe/605x650/filters:upscale():fill(white)/https://www.biscuiteers.com/static/media/catalog/product/2/0/2021_-_new_home_biscuit_tin_lifestyle_-_2_x_3.jpg';
    let fromFourImage =
        'https://www.biscuiteers.com/tco-images/unsafe/605x650/filters:upscale():fill(white)/https://www.biscuiteers.com/static/media/catalog/product/f/i/final_bouquet.jpg';

    let giftField = function() {
        const giftField = [{
                name: 'Him',
                url: 'him',
            },
            {
                name: 'Her',
                url: 'her',
            },
            {
                name: 'Children',
                url: 'children',
            },
            {
                name: 'Family',
                url: 'families',
            },
            {
                name: 'Couples',
                url: 'couples',
            },
            {
                name: 'Corporate',
                url: 'corporate clients',
            },
        ];

        let giftData = '';
        giftField.forEach((item) => {
            giftData += `<a href='javascript:void(0)' id="${item.url}" data-value='${item.name}'>${item.name}</a>`;
        });
        return giftData;
    };

    let himHer = function() {
        const himHer = [
            // { Commented out in case it needs to be used again
            //   name: 'christmas',
            //   url: 'christmas',
            // },
            {
                name: 'Birthday',
                url: 'birthday',
            },
            {
                name: 'Thank you',
                url: 'thank you',
            },
            {
                name: 'Get well soon',
                url: 'get well',
            },
            {
                name: 'New Home',
                url: 'new home',
            },
            {
                name: 'New Baby',
                url: 'new baby',
            },
            {
                name: 'Engagement/wedding',
                url: 'engagement,weddings',
            },
            {
                name: 'Congratulations',
                url: 'congratulations',
            },
        ];
        let himHerData = '';
        himHer.forEach((item) => {
            himHerData += `<a href='javascript:void(0)' id="${item.url}" data-value='${item.name}'>${item.name}</a>`;
        });
        return himHerData;
    };
    let children = function() {
        const children = [
            // { Commented out in case it needs to be used again
            //   name: 'christmas',
            //   url: 'christmas',
            // },
            {
                name: 'Birthday',
                url: 'birthday',
            },
            {
                name: 'Get well soon',
                url: 'get well',
            },
        ];
        let childrenData = '';
        children.forEach((item) => {
            childrenData += `<a href='javascript:void(0)' id="${item.url}" data-value='${item.name}'>${item.name}</a>`;
        });
        return childrenData;
    };
    let families = function() {
        const families = [
            // { Commented out in case it needs to be used again
            //   name: 'christmas',
            //   url: 'christmas',
            // },
            {
                name: 'Congratulations',
                url: 'congratulations',
            },
            {
                name: 'New Baby',
                url: 'new baby',
            },
            {
                name: 'Thank you',
                url: 'thank you',
            },
            {
                name: 'New Home',
                url: 'new home',
            },
        ];
        let familiesData = '';
        families.forEach((item) => {
            familiesData += `<a href='javascript:void(0)' id="${item.url}" data-value='${item.name}'>${item.name}</a>`;
        });
        return familiesData;
    };
    let couples = function() {
        const couples = [
            // { Commented out in case it needs to be used again
            //   name: 'christmas',
            //   url: 'christmas',
            // },
            {
                name: 'Congratulations',
                url: 'congratulations',
            },
            {
                name: 'New Baby',
                url: 'new baby',
            },
            {
                name: 'New Home',
                url: 'new home',
            },
            {
                name: 'Engagement/wedding',
                url: 'engagement,weddings',
            },
        ];
        let couplesData = '';
        couples.forEach((item) => {
            couplesData += `<a href='javascript:void(0)' id="${item.url}" data-value='${item.name}'>${item.name}</a>`;
        });
        return couplesData;
    };
    let corporate = function() {
        const corporate = [
            // { Commented out in case it needs to be used again
            //   name: 'christmas',
            //   url: 'christmas',
            // },
            {
                name: 'Birthday',
                url: 'birthday',
            },
            {
                name: 'Thank you',
                url: 'thank you',
            },
            {
                name: 'Get well soon',
                url: 'get well',
            },

            {
                name: 'New Home',
                url: 'new home',
            },
            {
                name: 'New Baby',
                url: 'new baby',
            },
            {
                name: 'Engagement/wedding',
                url: 'engagement,weddings',
            },
            {
                name: 'Congratulations',
                url: 'congratulations',
            },
        ];
        let corporateData = '';
        corporate.forEach((item) => {
            corporateData += `<a href='javascript:void(0)' id="${item.url}" data-value='${item.name}'>${item.name}</a>`;
        });
        return corporateData;
    };
    let spendAmount = function() {
        const spendAmount = ['a little something', 'enough to share', 'feeling generous'];
        let spendAmountData = '';
        for (let [item, key] of spendAmount.entries()) {
            spendAmountData += `<a href='javascript:void(0)' id="${key}" class='corporate' data-value='${key}'>${key}</a>`;
        }
        return spendAmountData;
    };
    let needTime = function() {
        const needTime = ['In the next few days', 'In the next few weeks', 'A couple of months'];
        let needTimeData = '';
        for (let [item, key] of needTime.entries()) {
            needTimeData += `<a href='javascript:void(0)' id="${key}" class='corporate' data-value='${key}'>${key}</a>`;
        }
        return needTimeData;
    };

    // active option inside of modal
    let activeBtnRemove = function(data) {
        data.querySelectorAll('a').forEach((item, i) => {
            item.classList.contains('btn-active') ? item.classList.remove('btn-active') : '';
        });
    };
    // image change when click option
    let giftJourneyImg = function(img) {
        let giftJourneyImg = `<img class='giftJourney-img' style="background-image:url('${img}')">`;

        return giftJourneyImg;
    };

    // from structure inside modal
    let giftJourneyFrom = function() {
        let giftJourneyFromField = `

    <div class="container">
      <div class="progress-bar">
        <div class="step">
          <div class="bullet bullet-1">
            <span class='progress-bar-number'>1</span>
            <span class='progress-bar-tick'>&#10004;</span>
          </div>
        </div>
        <div class="step">
          <div class="bullet bullet-2">
            <span class='progress-bar-number'>2</span>
           <span class='progress-bar-tick'>&#10004;</span>

          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <div class="bullet bullet-3">
            <span class='progress-bar-number'>3</span>
            <span class='progress-bar-tick'>&#10004;</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <div class="bullet bullet-4">
            <span class='progress-bar-number'>4</span>
            <span class='progress-bar-tick'>&#10004;</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
      </div>
      <div class="form-outer">
        <form action="#">
          <div class="page slide-page">
            <div class="title">Who are you shopping for ?</div>

            <div class="field">
            ${giftField()}
            </div>
            <div class="field">
            </div>

          </div>

          <div class="page page-2">
            <div class="title">What's the occasion ?</div>
            <div class="field">
              <!--- Data will be added dynamically from form one -->
            </div>

            <div class="field btns">
            </div>
          </div>

          <div class="page page-3">
            <div class="title">How much do you want to spend ?</div>
            <div class="field">
              ${spendAmount()}
            </div>

            <div class="field btns">
            </div>
          </div>

          <div class="page page-4">
            <div class="title">When do you need it by ?</div>
            <div class="field">
              ${needTime()}
            </div>

            <div class="field btns">
              <a href="javascript:void(0)" class='gift-final-url'>Show results</a>
            </div>
          </div>
        </form>
      </div>
    </div>


    `;
        return giftJourneyFromField;
    };

    let giftQuizButton = document.querySelector(`.giftJourney-banner .gift-quiz-start`);
    let giftQuizSection = document.querySelector('body');
    let modalSection = `

  <div class="giftJourney-modal">
  <button class="close-modal"><span class='spanX'>×</span></button>
   <div class='giftJourney-container'>

      <div class='giftJourney-image'>
        ${giftJourneyImg(fromOneImage)}
      </div>

      <div class='giftJourney-from'>
      ${giftJourneyFrom()}
      </div>

   </div>

  </div>

  `;
    let modalOverlay = `
  <div class="giftJourney-overlay giftJourney-hidden"></div>
  `;
    giftQuizSection.insertAdjacentHTML('beforeend', modalOverlay);

    /*After clicikng the quiz start Event*/
    window.waitForElem('.giftJourney-banner .gift-quiz-start', (element) => {
        console.log('giftJourney');
        document.querySelector(`.giftJourney-banner .gift-quiz-start`).addEventListener('click', function(e) {
            console.log('giftQuizButton');
            giftQuizSection.insertAdjacentHTML('beforeend', modalSection);

            // document.querySelector('.giftJourney-modal').classList.remove('giftJourney-hidden');
            document.querySelector('.giftJourney-overlay').classList.remove('giftJourney-hidden');

            /*progress bar design effect start*/
            let progressButtonOne = document.querySelector(`.giftJourney-from .progress-bar .step .bullet.bullet-1`);
            progressButtonOne.classList.add('active');
            const slidePage = document.querySelector('.slide-page');
            var progressButtonTwo = document.querySelector(`.giftJourney-from .progress-bar .step .bullet.bullet-2`);
            var progressButtonThree = document.querySelector(`.giftJourney-from .progress-bar .step .bullet.bullet-3`);
            var progressButtonFour = document.querySelector(`.giftJourney-from .progress-bar .step .bullet.bullet-4`);
            let giftJourneyImageSection = document.querySelector('.giftJourney-image img');
            let progressBarTick = document.querySelectorAll('.progress-bar-tick');
            let progressBarNumber = document.querySelectorAll('.progress-bar-number');
            let targetForm = document.querySelector('.slide-page .field');
            let targetFormTwo = document.querySelector('.page-2 .field');
            let targetFormThree = document.querySelector('.page-3 .field');
            let targetFormFour = document.querySelector('.page-4 .field');

            /*progress bar design effect end*/
            // modal closing options
            document.addEventListener('click', (e) => {
                if (e.target == document.querySelector('.giftJourney-overlay')) {
                    // giftJourneyModalSection.classList.add(`giftJourney-hidden`);
                    giftJourneyOverlaySection.classList.add('giftJourney-hidden');
                    giftJourneyModalSection.remove();
                    //giftJourneyOverlaySection.remove();

                    changeFormFunction(
                        slidePage,
                        progressButtonOne,
                        progressButtonTwo,
                        progressButtonThree,
                        progressButtonFour,
                        giftJourneyImageSection,
                        progressBarTick,
                        progressBarNumber,
                        fromOneImage,
                        sumbmitUrl
                    );
                    activeBtnRemove(targetForm);
                    activeBtnRemove(targetFormTwo);
                    activeBtnRemove(targetFormThree);
                    activeBtnRemove(targetFormFour);
                }
            });
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    //giftJourneyModalSection.classList.add(`giftJourney-hidden`);
                    giftJourneyOverlaySection.classList.add('giftJourney-hidden');
                    giftJourneyModalSection.remove();
                    //giftJourneyOverlaySection.remove();

                    changeFormFunction(
                        slidePage,
                        progressButtonOne,
                        progressButtonTwo,
                        progressButtonThree,
                        progressButtonFour,
                        giftJourneyImageSection,
                        progressBarTick,
                        progressBarNumber,
                        fromOneImage,
                        sumbmitUrl
                    );
                    activeBtnRemove(targetForm);
                    activeBtnRemove(targetFormTwo);
                    activeBtnRemove(targetFormThree);
                    activeBtnRemove(targetFormFour);
                }
            });
            document.querySelector('.close-modal').addEventListener('click', function() {
                //giftJourneyModalSection.classList.add('giftJourney-hidden');
                giftJourneyOverlaySection.classList.add('giftJourney-hidden');
                giftJourneyModalSection.remove();
                // giftJourneyOverlaySection.remove();
                changeFormFunction(
                    slidePage,
                    progressButtonOne,
                    progressButtonTwo,
                    progressButtonThree,
                    progressButtonFour,
                    giftJourneyImageSection,
                    progressBarTick,
                    progressBarNumber,
                    fromOneImage,
                    sumbmitUrl
                );
                activeBtnRemove(targetForm);
                activeBtnRemove(targetFormTwo);
                activeBtnRemove(targetFormThree);
                activeBtnRemove(targetFormFour);
            });

            let giftJourneyModalSection = document.querySelector('.giftJourney-modal');
            let giftJourneyOverlaySection = document.querySelector('.giftJourney-overlay');

            /*When from button are clicked and generate dynamic value*/
            let fromTwo = document.querySelector('.page-2 .field');

            targetForm.querySelectorAll('a').forEach((item, i) => {
                // clicking on first form
                item.addEventListener('click', (e) => {
                    progressButtonOne.classList.add('final-active');
                    progressBarTick[0].style.display = 'block';
                    progressBarNumber[0].style.display = 'none';

                    //giftJourneyImageSection.setAttribute('src', fromTwoImage);
                    giftJourneyImageSection.style.backgroundImage = `url('${fromTwoImage}')`;

                    /*sliding the form one to the second form*/
                    slidePage.style.marginLeft = '-25%';
                    progressButtonTwo.classList.add('active');

                    activeBtnRemove(targetForm);
                    item.classList.add('btn-active');

                    /*targeting the from one for dynamic field for second from*/
                    if (e.target.id == 'him' || e.target.id == 'her') {
                        sumbmitUrl.shoppingFor = e.target.id;
                        fireEvent(`step 1: ${sumbmitUrl.shoppingFor}`);
                        if (fromTwo.childElementCount == 0) {
                            fromTwo.insertAdjacentHTML('afterbegin', himHer());
                        } else {
                            fromTwo.querySelectorAll('a').forEach((item, i) => {
                                item.remove();
                            });
                            //remove();
                            fromTwo.insertAdjacentHTML('afterbegin', himHer());
                        }
                    } else if (e.target.id == 'children') {
                        sumbmitUrl.shoppingFor = e.target.id;
                        fireEvent(`step 1: ${sumbmitUrl.shoppingFor}`);
                        if (fromTwo.childElementCount == 0) {
                            fromTwo.insertAdjacentHTML('afterbegin', children());
                        } else {
                            fromTwo.querySelectorAll('a').forEach((item, i) => {
                                item.remove();
                            });
                            //remove();
                            fromTwo.insertAdjacentHTML('afterbegin', children());
                        }
                    } else if (e.target.id == 'families') {
                        sumbmitUrl.shoppingFor = e.target.id;
                        fireEvent(`step 1: ${sumbmitUrl.shoppingFor}`);
                        if (fromTwo.childElementCount == 0) {
                            fromTwo.insertAdjacentHTML('afterbegin', families());
                        } else {
                            fromTwo.querySelectorAll('a').forEach((item, i) => {
                                item.remove();
                            });
                            //remove();
                            fromTwo.insertAdjacentHTML('afterbegin', families());
                        }
                    } else if (e.target.id == 'couples') {
                        sumbmitUrl.shoppingFor = e.target.id;
                        fireEvent(`step 1: ${sumbmitUrl.shoppingFor}`);
                        if (fromTwo.childElementCount == 0) {
                            fromTwo.insertAdjacentHTML('afterbegin', couples());
                        } else {
                            fromTwo.querySelectorAll('a').forEach((item, i) => {
                                item.remove();
                            });
                            //remove();
                            fromTwo.insertAdjacentHTML('afterbegin', couples());
                        }
                    } else if (e.target.id == 'corporate clients') {
                        sumbmitUrl.shoppingFor = e.target.id;
                        fireEvent(`step 1: ${sumbmitUrl.shoppingFor}`);
                        if (fromTwo.childElementCount == 0) {
                            fromTwo.insertAdjacentHTML('afterbegin', corporate());
                        } else {
                            fromTwo.querySelectorAll('a').forEach((item, i) => {
                                item.remove();
                            });
                            //remove();
                            fromTwo.insertAdjacentHTML('afterbegin', corporate());
                        }
                    }

                    /*From two sliding to third one start*/

                    targetFormTwo.querySelectorAll('a').forEach((item, i) => {
                        item.addEventListener('click', (e) => {
                            sumbmitUrl.occasion = e.target.id;
                            //giftJourneyImageSection.setAttribute('src', fromThreeImage);
                            giftJourneyImageSection.style.backgroundImage = `url('${fromThreeImage}')`;

                            /*styling progress bar*/
                            activeBtnRemove(targetFormTwo);
                            item.classList.add('btn-active');
                            progressButtonThree.classList.add('active');
                            progressButtonTwo.classList.add('final-active');
                            // progressButtonThree.classList.add("active");

                            /*sliding the from*/
                            progressBarTick[1].style.display = 'block';
                            progressBarNumber[1].style.display = 'none';

                            slidePage.style.marginLeft = '-50%';
                            fireEvent(`step 2: ${sumbmitUrl.shoppingFor} , ${sumbmitUrl.occasion}`);
                        });
                    });

                    /*go previous step*/

                    progressButtonOne.addEventListener('click', (e) => {
                        if (progressButtonOne.classList.contains('active')) {
                            changeFormFunction(
                                slidePage,
                                progressButtonOne,
                                progressButtonTwo,
                                progressButtonThree,
                                progressButtonFour,
                                giftJourneyImageSection,
                                progressBarTick,
                                progressBarNumber,
                                fromOneImage,
                                sumbmitUrl
                            );
                            activeBtnRemove(targetFormTwo);
                            activeBtnRemove(targetFormThree);
                            activeBtnRemove(targetFormFour);
                        }
                    });

                    progressButtonTwo.addEventListener('click', (e) => {
                        if (progressButtonTwo.classList.contains('active')) {
                            changeFormFunctionTwo(
                                slidePage,
                                progressButtonTwo,
                                progressButtonThree,
                                progressButtonFour,
                                giftJourneyImageSection,
                                progressBarTick,
                                progressBarNumber,
                                fromTwoImage,
                                sumbmitUrl
                            );
                            activeBtnRemove(targetFormThree);
                            activeBtnRemove(targetFormFour);
                        }
                    });

                    progressButtonThree.addEventListener('click', (e) => {
                        if (progressButtonThree.classList.contains('active')) {
                            changeFormFunctionThree(
                                slidePage,
                                progressButtonThree,
                                progressButtonFour,
                                giftJourneyImageSection,
                                progressBarTick,
                                progressBarNumber,
                                fromThreeImage,
                                sumbmitUrl
                            );
                            activeBtnRemove(targetFormFour);
                        }
                    });
                });
            });

            // /*From two sliding to third end*/

            // /*From Three sliding to Foruth one start*/
            targetFormThree.querySelectorAll('a').forEach((item, i) => {
                item.addEventListener('click', (e) => {
                    sumbmitUrl.spendAmount = e.target.id;
                    //giftJourneyImageSection.setAttribute('src', fromFourImage);
                    giftJourneyImageSection.style.backgroundImage = `url('${fromFourImage}')`;

                    /*styling progress bar and button*/

                    progressButtonFour.classList.add('active');
                    activeBtnRemove(targetFormThree);
                    item.classList.add('btn-active');

                    /*sliding the from*/
                    progressButtonThree.classList.add('final-active');
                    progressBarTick[2].style.display = 'block';
                    progressBarNumber[2].style.display = 'none';
                    slidePage.style.marginLeft = '-75%';
                    fireEvent(`step 3: ${sumbmitUrl.shoppingFor}, ${sumbmitUrl.occasion}, ${sumbmitUrl.spendAmount}`);
                });
            });
            // /*From Three sliding to Foruth one end*/
            const giftFinalUrlEl = document.querySelector('.gift-final-url');

            /*From Four  data access start*/
            targetFormFour.querySelectorAll('a').forEach((item, i) => {
                item.addEventListener('click', (e) => {
                    activeBtnRemove(targetFormFour);
                    item.classList.add('btn-active');
                    giftFinalUrlEl.classList.remove('disableResults');
                    sumbmitUrl.needTime = e.target.id;
                    fireEvent(
                        `step 4: ${sumbmitUrl.shoppingFor}, ${sumbmitUrl.occasion}, ${sumbmitUrl.spendAmount},${sumbmitUrl.needTime}`
                    );
                });
            });
            /*From Four  data access end*/

            /*Generating Final url for send gift filter*/

            giftFinalUrlEl.addEventListener('click', (e) => {
                if (sumbmitUrl.needTime == '') {
                    giftFinalUrlEl.classList.add('disableResults');
                } else {
                    let giftFinalUrl =
                        `https://www.biscuiteers.com/send-a-gift` +
                        `#filters.occasion=${sumbmitUrl.occasion}` +
                        `&filters.recipient=for ${sumbmitUrl.shoppingFor}` +
                        `&filters.price_range=${sumbmitUrl.spendAmount}`;
                    const url = encodeURI(giftFinalUrl);
                    window.location.href = url;
                }
            });
        });
    });
};

export default giftJourneyModal;