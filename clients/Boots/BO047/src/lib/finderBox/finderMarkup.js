import shared from "../shared"
import { getData, getDataFromNav, getOffersData, getPremiumBeautyData } from './getData';
import { createLoader, showLoader, removeLoader } from "./loader";
import { categoryOfferObj } from "./categoryOffers";

export default () => {

    const { ID } = shared;

    const selectBoxes = document.querySelectorAll(`.${ID}-selectBox`);
    const optionsWrapper = document.querySelector(`.${ID}-finderOptions_wrapper`);
    const backButton = document.querySelector(`.${ID}-mobile_back`);
    const closeFinder = optionsWrapper.querySelector(`.${ID}-closeFinder`); 

    const resultsRaw = getData(getDataFromNav);
    const offersData = getOffersData();
    const premiumBeautyData = getPremiumBeautyData();

    resultsRaw['offers'] = offersData['Offers'];
    resultsRaw['premium beauty'] = premiumBeautyData['premium beauty'];

    // Explciitly define which keys we want to keep and the order they should appear
    const dataKeysToUse = [
      'health & pharmacy',
      'wellness',
      'beauty & skincare',
      'fragrance',
      'premium beauty',
      'baby & child',
      'toiletries',
      'electrical',
      "men's",
      //"christmas",
      "gift",
      "offers",
    ];

    const results = {};

    dataKeysToUse.forEach((k) => {
      results[k] = resultsRaw[k];
    });

    // Journey ref
    let journey = [];

    /*
    * add icons to the main departments
    */
    const departmentIconMap = () => {

        let departmentIcons;

        const departments = {
            'wellness': 'https://service.maxymiser.net/cm/images-eu/1/1/1/4537093C2AA33DC49AAC2D7D15F135F6D2CBD1BB83F1FE75A53A077AF6EBF9A4/new-boots-com/BO001---Homepage-Product-Finder/wellness.png',
            'health & pharmacy': 'https://service.maxymiser.net/cm/images-eu/1/1/1/D8ADBD82FC42296F125816DA4296C62639EB9ECD61DDF97AC3F38E2058A4522C/new-boots-com/BO001---Homepage-Product-Finder/health.png',
            'beauty & skincare': 'https://service.maxymiser.net/cm/images-eu/1/1/1/16D1E4259EB2D94DEA0A206B1A38289291CB66F64880CD1F771491DF751D794D/new-boots-com/BO001---Homepage-Product-Finder/beauty.png',
            'premium beauty': 'https://service.maxymiser.net/cm/images-eu/1/1/1/16D1E4259EB2D94DEA0A206B1A38289291CB66F64880CD1F771491DF751D794D/new-boots-com/BO001---Homepage-Product-Finder/beauty.png',
            'fragrance': 'https://service.maxymiser.net/cm/images-eu/1/1/1/652BC025E088C1153D18595B72413F0B066716E87C8F77425B8EEDDF250FE4D8/new-boots-com/BO001---Homepage-Product-Finder/fragrance.png',
            'baby & child': 'https://service.maxymiser.net/cm/images-eu/1/1/1/500BA69AC3517A788BE14F017D59721544EC069B022CC771A7DAA3D53E60D0D8/new-boots-com/BO001---Homepage-Product-Finder/baby.png',
            'toiletries': 'https://service.maxymiser.net/cm/images-eu/1/1/1/12004F10F48DE5153F57A49E980360F78C20E9E346FF0E04567F0BCC426D8CA8/new-boots-com/BO001---Homepage-Product-Finder/toiletries.png',
            'electrical': 'https://service.maxymiser.net/cm/images-eu/1/1/1/A4A2EDCBBA0A53803E86CE3F4D67287A50C45C8A91D0E1F61E24AE12F7942338/new-boots-com/BO001---Homepage-Product-Finder/electrical.png',
            "men's": 'https://service.maxymiser.net/cm/images-eu/1/1/1/A950FED573D186D6F03CE1C5D8716A83CB84C16DCA4DB62B10B833EB4DF527F1/new-boots-com/BO001---Homepage-Product-Finder/mens.png',
            //'christmas': 'https://service.maxymiser.net/cm/images-eu/new-boots-com/07B5F53D96151B6C4AE0D636E480319BC4EB2298A309C766CEEF7A2D645D8997.png?meta=/BO047---Product-Finder-Iteration/noun_Christmas_2095648.png',
            'gift': 'https://service.maxymiser.net/cm/images-eu/1/1/1/BC3A92631C156B140F65FEEE24AD4C3921B0C0EB2CAC2AD3E9710ACE92276C3B/new-boots-com/BO001---Homepage-Product-Finder/noun_Gift_3107706.png',
            'offers': 'https://service.maxymiser.net/cm/images-eu/1/1/1/236E293A5DDC2A704D943256F84BA223E1BB6586033DDD45375BD127391A4DB1/new-boots-com/BO001---Homepage-Product-Finder/noun_offer_28042101.png',
        }

        const departmentsRoundels = {
            'wellness': 'https://service.maxymiser.net/cm/images-eu/new-boots-com/36C4A05877FB0F6696266155576EB390FF20988070D54598FF483B896D6F3345.png?meta=/BO047---Product-Finder-Iteration/wellness.png',
            'health & pharmacy': 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D067AEA03742DE8B14B24E1448DC2EFEE7A47CD900CC91D55E29896E33F59079.png?meta=/BO047---Product-Finder-Iteration/health.png',
            'beauty & skincare': 'https://service.maxymiser.net/cm/images-eu/new-boots-com/9B1D8A27D957299BD4C20F8FDA5C5A85AF756E2B560401B2CA2E1D3BA2DD21E7.png?meta=/BO047---Product-Finder-Iteration/beauty.png',
            'premium beauty': 'https://service.maxymiser.net/cm/images-eu/new-boots-com/E992203B2E3CEE97E389C687F02D5265679C8C6AD4E8A044F1D70193741CCFB2.png?meta=/BO047---Product-Finder-Iteration/premium.png',
            'fragrance': 'https://service.maxymiser.net/cm/images-eu/new-boots-com/645D9B876B4C8887AD232AB1C7794791B680F229FDDA59CD3785421B865E98AA.png?meta=/BO047---Product-Finder-Iteration/fragrance.png',
            'baby & child': 'https://service.maxymiser.net/cm/images-eu/new-boots-com/716CB12F4592218F3FB89C735727B01985A5A1B3516D094DA0035132E0C538BC.png?meta=/BO047---Product-Finder-Iteration/baby.png',
            'toiletries': 'https://service.maxymiser.net/cm/images-eu/new-boots-com/B8728937C7206D2E6BF82521F38452825FB7264857264B6C4EBF65DA662F8428.png?meta=/BO047b---Product-Finder-Iteration/toiletries.png',
            'electrical': 'https://service.maxymiser.net/cm/images-eu/new-boots-com/0C60C9F393B441BDB9FAF163EEDECBA0624DB1ED55302C366E9C9A6543851180.png?meta=/BO047---Product-Finder-Iteration/electircal.png',
            "men's": 'https://service.maxymiser.net/cm/images-eu/new-boots-com/01EDCEF3E9102C64826FF71E81780E1F34FEF712D3C0EF4C830B61494B21337E.png?meta=/BO047---Product-Finder-Iteration/mens.png',
            //'christmas': 'https://service.maxymiser.net/cm/images-eu/new-boots-com/2E67EF3C98CF661C2A2E305F650540199964B5ABE690EF5EC37D1031B02C87B9.png?meta=/BO047---Product-Finder-Iteration/christmas.png',
            'gift': 'https://service.maxymiser.net/cm/images-eu/new-boots-com/C26E57314B51E1B4D138F6D4858039F4A47859188A72731DE6E2FB909D6ABAA0.png?meta=/BO047---Product-Finder-Iteration/gifts.png',
            'offers': 'https://service.maxymiser.net/cm/images-eu/new-boots-com/41657DE5FBBAF7129D357587201D63F8FE4E16708F88506666E54640EC02E9A2.png?meta=/BO047---Product-Finder-Iteration/offers.png',
        }
        if(shared.VARIATION === '2') {
            departmentIcons = departmentsRoundels;
        } else {
            departmentIcons = departments;
        }

        const allDepartments = document.querySelectorAll(`.${ID}-option`);
        for (let index = 0; index < allDepartments.length; index += 1) {
            const element = allDepartments[index];
            const target = element.getAttribute('data-option');

            element.insertAdjacentHTML('afterbegin', `<span class="${ID}-icon" style="background-image:url(${departmentIcons[target]})"></span>`);
        }
    }

    // todo:loop through the supermenu_espot to add the adverts

    /**
     * Move the progress bar based on where in the journey the user is
     */
    const activeProgressStage = () => {
        const activeJourneyLength = journey.length;

        // remove all active steps
        const allSteps = document.querySelectorAll(`.${ID}-steps .${ID}-step`);
        for (let index = 0; index < allSteps.length; index += 1) {
            const element = allSteps[index];

            // if on the first one, remove any that say complete
            if(activeJourneyLength === 0) {
                element.classList.remove(`${ID}-step_complete`);
                element.classList.remove(`${ID}-step_active`);
            }

            // remove any that are active or complete
            if(element.classList.contains(`${ID}-step_active`)) {            
                element.classList.remove(`${ID}-step_active`);
            }
        }

        const stepToMakeActive = document.querySelectorAll(`.${ID}-steps .${ID}-step`)[activeJourneyLength];
        
        //if the user goes back, remove complete class
        if(stepToMakeActive) {
            if(stepToMakeActive.classList.contains(`${ID}-step_complete`)) {
                stepToMakeActive.classList.remove(`${ID}-step_complete`);
            }

            stepToMakeActive.classList.add(`${ID}-step_active`);

            // make the previous one complete
            if(stepToMakeActive.previousElementSibling) {
                stepToMakeActive.previousElementSibling.classList.add(`${ID}-step_complete`);
            }
        }
    }

    /* Change the title */
    const updateTitle = (name) => {
        return optionsWrapper.querySelector('h3 span').textContent = name;
    }

    let currentLevel = JSON.parse(JSON.stringify(results));

    /**
     * Load the next options in the data based on what is clicked
     */
    const loadStep = (option) => {
        if(option) { 
            currentLevel = currentLevel[option];

            //record what has been clicked 
            journey.push(option);

            updateTitle(`${option} category`);

            if(typeof currentLevel === 'string') {
                // change button to link
                // final step
                showLoader();
                document.querySelector(`.${ID}-finderOptions`).style.height = '200px';
                setTimeout(() => { 
                    window.location.href = currentLevel;
                }, 300);
               
            }
        }
       
        // replace current links with next ones
        optionsWrapper.querySelector(`.${ID}-finderOptions`).innerHTML = '';
        

        // loop through the data
        Object.keys(currentLevel).forEach((i) => {
            const option = document.createElement('a');
            option.classList.add(`${ID}-option`);
            option.setAttribute('data-option', [i][0]);
            option.innerHTML = `<span>${[i][0]}</span>`;
            optionsWrapper.querySelector(`.${ID}-finderOptions`).appendChild(option);


            option.addEventListener('click', (e) => {
                if(document.querySelector(`.${ID}_scrollPrompt`).style.display = 'block') {
                    document.querySelector(`.${ID}_scrollPrompt`).style.display = 'none';
                }
                const optionTarget = e.currentTarget.getAttribute('data-option');

                optionsWrapper.querySelector(`.${ID}-finderOptions`).scrollTop = 0;
                // create offers depending on category
                if(shared.VARIATION === '3') {
                    const matchingOffers = categoryOfferObj[optionTarget];

                    if(matchingOffers) {
                        optionsWrapper.querySelector(`.${ID}-optionsWrapper`).classList.add(`${ID}-hasOffers`);

                        const offerBlocks = 
                        `<div class="${ID}-catOffer ${!matchingOffers.offer2 ? `${ID}-One` : ''}">
                            <div class="${ID}__outer">
                                <div class="${ID}__inner">
                                    <div class="${ID}__inner-image">
                                        <div class="${ID}__image" style="background-image:url(${matchingOffers.offer1.image})"></div>
                                    </div>
                                    <div class="${ID}__inner-text">
                                        <h3 class="${ID}__h3">${matchingOffers.offer1.heading}</h3>
                                        <p class="${ID}__p">${matchingOffers.offer1.subText}</p>
                                        <a href="${matchingOffers.offer1.link}" class="${ID}__buttonLink">Shop now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ${matchingOffers.offer2 ? `<div class="${ID}-catOffer">
                            <div class="${ID}__outer">
                                <div class="${ID}__inner">
                                    <div class="${ID}__inner-image">
                                        <div class="${ID}__image" style="background-image:url(${matchingOffers.offer2.image})"></div>
                                    </div>
                                    <div class="${ID}__inner-text">
                                        <h3 class="${ID}__h3">${matchingOffers.offer2.heading}</h3>
                                        <p class="${ID}__p">${matchingOffers.offer2.subText}</p>
                                        <a href="${matchingOffers.offer2.link}" class="${ID}__buttonLink">Shop now</a>
                                    </div>
                                </div>
                            </div>
                        </div>` : ''}`;

                        optionsWrapper.querySelector(`.${ID}-catOffers`).innerHTML = offerBlocks;
  

                    } else {
                        optionsWrapper.querySelector(`.${ID}-optionsWrapper`).classList.remove(`${ID}-hasOffers`);
                        optionsWrapper.querySelector(`.${ID}-catOffers`).innerHTML = '';
         
                    }
                }

                updateTitle(`${optionTarget} category`);
                loadStep(optionTarget);  
                activeProgressStage();

                optionsWrapper.classList.remove(`${ID}-department_show`);

                /**
                 * Tracking
                 */
                if(journey && journey[1] && journey[2]){
                    const firstStep = journey[0].replace(/[\s|\&]+/, '');
                    const secondStep = journey[1].replace(/[\s|\&]+/, '');
                    const thirdStep = journey[2].replace(/[\s|\&]+/, '');
                  
                    cmCreateManualLinkClickTag(`/productfinder?cm_sp=Product Finder-_-${firstStep}-_-${secondStep}-${thirdStep}`);
                }
            });
        });
        /*if(journey && journey[1]){
            window.cX('onload');
        }*/

    }

    /**
     * reset the product finder
     */
    const resetProductFinder = () => {
        journey = [];
        currentLevel = JSON.parse(JSON.stringify(results));
        updateTitle('department');
        loadStep();
        activeProgressStage();

        // add icons to the first departments
        departmentIconMap();
        optionsWrapper.classList.add(`${ID}-department_show`);

        if(shared.VARIATION === '3' && optionsWrapper.querySelector(`.${ID}-catOffers`)) {
            optionsWrapper.querySelector(`.${ID}-catOffers`).innerHTML = '';
            optionsWrapper.querySelector(`.${ID}-finderOptions`).classList.remove(`${ID}-hasOffers`);
        }
    }

    /**
     * Go back to the previous step
     */
    const goBack = () => {
        const lastCategory = journey[journey.length -2];
        journey.pop(); // remove the last array item in the journey
        journey.pop();
       
        optionsWrapper.querySelector(`.${ID}-finderOptions`).scrollTop = 0;

        if(lastCategory) { // loads the second
            currentLevel = JSON.parse(JSON.stringify(results));
            loadStep(lastCategory);
            updateTitle(`${lastCategory} category`);
            activeProgressStage();

            // re-add the offers on back
            if(shared.VARIATION === '3') {
                const matchingOffers = categoryOfferObj[lastCategory];

                if(matchingOffers) {
                    optionsWrapper.querySelector(`.${ID}-optionsWrapper`).classList.add(`${ID}-hasOffers`);

                    const offerBlocks = 
                    `<div class="${ID}-catOffer">
                        <div class="${ID}__outer">
                            <div class="${ID}__inner">
                                <div class="${ID}__inner-image">
                                    <div class="${ID}__image" style="background-image:url(${matchingOffers.offer1.image})"></div>
                                </div>
                                <div class="${ID}__inner-text">
                                    <h3 class="${ID}__h3">${matchingOffers.offer1.heading}</h3>
                                    <p class="${ID}__p">${matchingOffers.offer1.subText}</p>
                                    <a href="${matchingOffers.offer1.link}" class="${ID}__buttonLink">Shop now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="${ID}-catOffer">
                        <div class="${ID}__outer">
                            <div class="${ID}__inner">
                                <div class="${ID}__inner-image">
                                    <div class="${ID}__image" style="background-image:url(${matchingOffers.offer2.image})"></div>
                                </div>
                                <div class="${ID}__inner-text">
                                    <h3 class="${ID}__h3">${matchingOffers.offer2.heading}</h3>
                                    <p class="${ID}__p">${matchingOffers.offer2.subText}</p>
                                    <a href="${matchingOffers.offer2.link}" class="${ID}__buttonLink">Shop now</a>
                                </div>
                            </div>
                        </div>
                    </div>`;

                    optionsWrapper.querySelector(`.${ID}-catOffers`).innerHTML = offerBlocks;
          

                } else {
                    optionsWrapper.querySelector(`.${ID}-optionsWrapper`).classList.remove(`${ID}-hasOffers`);
                    optionsWrapper.querySelector(`.${ID}-catOffers`).innerHTML = '';
               
                }
            }

        } else { 
            resetProductFinder();
        }
    }

    /**
     *  Go to the last step, 
     *  do this if you click a "select a category" dropdown
     */
    const goToStepTwo = () => {
        const lastCategory = journey[journey.length -2];
        journey.pop();
        journey.pop();
        if(lastCategory) { // loads the second
            currentLevel = JSON.parse(JSON.stringify(results));
            loadStep(lastCategory);
            updateTitle(`${lastCategory} category`);
        }
    }

    /* Create the first option box on click of departments */
   // for (let index = 0; index < selectBoxes.length; index += 1) {
     //   const element = selectBoxes[index];
        document.querySelector(`.${ID}-actions .${ID}-button`).addEventListener('click', () => {

            optionsWrapper.classList.add(`${ID}-options_active`);
    
            if(window.innerWidth < 1024) {
                document.body.classList.add(`${ID}-noScroll`);
            }
            // so it can be hidden on desktop
            //introBox.classList.add(`${ID}-finderBox_hide`); 
            document.querySelector(`.${ID}-productFinder`).classList.add(`${ID}-finderBox_hide`); 
            resetProductFinder();
            createLoader();
        });

        document.querySelector(`.${ID}-actions .${ID}-department`).addEventListener('click', () => {

            optionsWrapper.classList.add(`${ID}-options_active`);
    
            if(window.innerWidth < 1024) {
                document.body.classList.add(`${ID}-noScroll`);
            }
            // so it can be hidden on desktop
            //introBox.classList.add(`${ID}-finderBox_hide`); 
            document.querySelector(`.${ID}-productFinder`).classList.add(`${ID}-finderBox_hide`); 
            resetProductFinder();
            createLoader();
        });
   // }
    

    backButton.addEventListener('click', () => {
        goBack();
    });

    closeFinder.addEventListener('click', () => {
        document.body.classList.remove(`${ID}-noScroll`);
        optionsWrapper.classList.remove(`${ID}-options_active`);
        //introBox.classList.remove(`${ID}-finderBox_hide`);
        document.querySelector(`.${ID}-productFinder`).classList.remove(`${ID}-finderBox_hide`); 
        resetProductFinder();

        removeLoader();
    });

    /**
     * Tracking
     */
    /*pollerLite([`.${ID}-option`], () => {
        const allLinks = document.querySelectorAll(`.${ID}-option`);
        for (let index = 0; index < allLinks.length; index += 1) {
            const element = allLinks[index];
            if(element) {
                element.addEventListener('click', () => {
                    const elName = element.querySelector('span');
                    console.log(journey);

                    //if(elName) {
                    //  cmCreateManualLinkClickTag(`/productfinder?cm_sp=Product Finder-_-beautyskincare-_-makeup-${elName.textContent.trim()}`);
                // }
                });
            }
        }
    });*/
}
