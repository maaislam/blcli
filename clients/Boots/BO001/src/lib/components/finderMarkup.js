import shared from "../shared"
import { getData, getDataFromNav, getOffersData, getPremiumBeautyData } from '../components/getData';
import { createLoader, showLoader, removeLoader } from "./loader";
import { pollerLite } from "../../../../../../lib/utils";

export default () => {

    const { ID } = shared;

    const selectBoxes = document.querySelectorAll(`.${ID}-selectBox`);
    const introBox = document.querySelector(`.${ID}_finderBox`);
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
      "gift",
      "sun & holiday",
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
        const departments = {
            "mother's day": 'https://service.maxymiser.net/cm/images-eu/1/1/1/97636EAE085710AC87D5E3E93EF8AC9261D8AB979DF70C524F0FC414D67FBDCF/new-boots-com/BO001---Homepage-Product-Finder/noun_Image_1282375.png',
            'wellness': 'https://service.maxymiser.net/cm/images-eu/1/1/1/4537093C2AA33DC49AAC2D7D15F135F6D2CBD1BB83F1FE75A53A077AF6EBF9A4/new-boots-com/BO001---Homepage-Product-Finder/wellness.png',
            'health & pharmacy': 'https://service.maxymiser.net/cm/images-eu/1/1/1/D8ADBD82FC42296F125816DA4296C62639EB9ECD61DDF97AC3F38E2058A4522C/new-boots-com/BO001---Homepage-Product-Finder/health.png',
            'beauty & skincare': 'https://service.maxymiser.net/cm/images-eu/1/1/1/16D1E4259EB2D94DEA0A206B1A38289291CB66F64880CD1F771491DF751D794D/new-boots-com/BO001---Homepage-Product-Finder/beauty.png',
            'premium beauty': 'https://service.maxymiser.net/cm/images-eu/1/1/1/16D1E4259EB2D94DEA0A206B1A38289291CB66F64880CD1F771491DF751D794D/new-boots-com/BO001---Homepage-Product-Finder/beauty.png',
            'fragrance': 'https://service.maxymiser.net/cm/images-eu/1/1/1/652BC025E088C1153D18595B72413F0B066716E87C8F77425B8EEDDF250FE4D8/new-boots-com/BO001---Homepage-Product-Finder/fragrance.png',
            'baby & child': 'https://service.maxymiser.net/cm/images-eu/1/1/1/500BA69AC3517A788BE14F017D59721544EC069B022CC771A7DAA3D53E60D0D8/new-boots-com/BO001---Homepage-Product-Finder/baby.png',
            'toiletries': 'https://service.maxymiser.net/cm/images-eu/1/1/1/12004F10F48DE5153F57A49E980360F78C20E9E346FF0E04567F0BCC426D8CA8/new-boots-com/BO001---Homepage-Product-Finder/toiletries.png',
            'electrical': 'https://service.maxymiser.net/cm/images-eu/1/1/1/A4A2EDCBBA0A53803E86CE3F4D67287A50C45C8A91D0E1F61E24AE12F7942338/new-boots-com/BO001---Homepage-Product-Finder/electrical.png',
            "men's": 'https://service.maxymiser.net/cm/images-eu/1/1/1/A950FED573D186D6F03CE1C5D8716A83CB84C16DCA4DB62B10B833EB4DF527F1/new-boots-com/BO001---Homepage-Product-Finder/mens.png',
            'photo': 'https://service.maxymiser.net/cm/images-eu/1/1/1/67D5FED1C3E6E7CF2DBF12E939E35D666E2734CF90CA61ADD3E932BA9D365322/new-boots-com/BO001---Homepage-Product-Finder/noun_Camera_3145706.png',
            'opticians' : 'https://service.maxymiser.net/cm/images-eu/1/1/1/68910B1526A98F906692EF1F1A12D73551B9FC97C1574988FFD51A89CF62A1BB/new-boots-com/BO001---Homepage-Product-Finder/noun_eyeglasses_1510139.png',
            'sun & holiday': 'https://service.maxymiser.net/cm/images-eu/1/1/1/EA088C3C77C6C6AC78BCB93EC38F8FF0A42D815A4B141B9DD2703362CC8F4158/new-boots-com/BO001---Homepage-Product-Finder/holiday.png',
            'gift': 'https://service.maxymiser.net/cm/images-eu/1/1/1/BC3A92631C156B140F65FEEE24AD4C3921B0C0EB2CAC2AD3E9710ACE92276C3B/new-boots-com/BO001---Homepage-Product-Finder/noun_Gift_3107706.png',
            'offers': 'https://service.maxymiser.net/cm/images-eu/1/1/1/236E293A5DDC2A704D943256F84BA223E1BB6586033DDD45375BD127391A4DB1/new-boots-com/BO001---Homepage-Product-Finder/noun_offer_28042101.png',
        }

        const allDepartments = document.querySelectorAll(`.${ID}-option`);
        for (let index = 0; index < allDepartments.length; index += 1) {
            const element = allDepartments[index];
            const target = element.getAttribute('data-option');

            element.insertAdjacentHTML('afterbegin', `<span class="${ID}-icon" style="background-image:url(${departments[target]})"></span>`);
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
                updateTitle(`${optionTarget} category`);
                loadStep(optionTarget);  
                activeProgressStage();

                optionsWrapper.classList.remove(`${ID}-department_show`);

                /**
                 * Tracking
                 */
                if(journey && journey[1] && journey[2]){
                    cmCreateManualLinkClickTag(`/productfinder?cm_sp=Product Finder-_-${journey[0]}-_-${[journey[1]]}-${journey[2]}`);
                    // option.setAttribute('manual_cm_sp', `Product Finder-_-[${journey[0]}]-_-${[journey[1]]}-${[i][0]}`);
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
    }

    /**
     * Go back to the previous step
     */
    const goBack = () => {
        const lastCategory = journey[journey.length -2];
        journey.pop(); // remove the last array item in the journey
        journey.pop();
        if(lastCategory) { // loads the second
            currentLevel = JSON.parse(JSON.stringify(results));
            loadStep(lastCategory);
            updateTitle(`${lastCategory} category`);
            activeProgressStage();
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
    for (let index = 0; index < selectBoxes.length; index += 1) {
        const element = selectBoxes[index];
        element.addEventListener('click', () => {
            optionsWrapper.classList.add(`${ID}-options_active`);
    
            // so it can be hidden on desktop
            introBox.classList.add(`${ID}-finderBox_hide`); 
    
            resetProductFinder();
            createLoader();
        });
    }
    

    backButton.addEventListener('click', () => {
        goBack();
    });

    closeFinder.addEventListener('click', () => {
        optionsWrapper.classList.remove(`${ID}-options_active`);
        introBox.classList.remove(`${ID}-finderBox_hide`);
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
