import settings from '../settings';
import { __ } from '../helpers';
/**
 * @desc when the form is finished
*/

export const finderLoader = () => {
  const loader = document.createElement('div');
  loader.classList.add(`${settings.ID}-form_loader`);
  loader.innerHTML = `<p><span class="${settings.ID}-loader"></span>${__('Loading your recommended products...')}</p>`;
  const finder = document.querySelector(`.${settings.ID}_productFinder`);
  finder.appendChild(loader);
};
export const getAnswers = () => {
  return JSON.parse(localStorage.getItem('TG072-questions'));
};

const redirect = () => {
  let goTo;

  if(window.location.href.indexOf('gb') > -1){
    goTo = {
    'business/fitness/cardio': `/${__('gb')}/products/cardio/shopby/line_internal-artis-excite.html`,
    'business/performance/cardio': `/${__('gb')}/products/cardio/shopby/line_internal-skill_line.html`,
    'business/prevention and rehab/cardio': `/${__('gb')}/products/cardio/shopby/line_internal-excite_med.html`,
    
    'business/fitness/strength': `/${__('gb')}/products/strength/shopby/line_internal-artis-cable_stations-plurima-selection.html`,
    'business/performance/strength': `/${__('gb')}/products/strength/shopby/line_internal-pure.html`,
    'business/prevention and rehab/strength': `/${__('gb')}/products/strength/shopby/line_internal-selection_med.html`,
    
    // fix group activities
    'business/fitness/group activites': `/${__('gb')}/products/shopby/product_type-group_cycling.html`,
    'business/performance/group activites': `/${__('gb')}/products/cardio/shopby/line_internal-skill_line/product_type-exercise_bikes.html`,
    'business/prevention and rehab/group activites': `/${__('gb')}/products/cardio/shopby/line_internal-skill_line/product_type-exercise_bikes.html`,
   
    'business/fitness/functional & flexibility': `/${__('gb')}/products/functional-flexibility/shopby/line_internal-flexability-kinesis-omnia.html`,
    'business/performance/functional & flexibility': `/${__('gb')}/products/functional-flexibility/shopby/line_internal-skilltools.html`,
    'business/prevention and rehab/functional & flexibility': `/${__('gb')}/products/functional-flexibility/shopby/line_internal-kinesis.html`,
    
    'home/fitness/cardio': `/${__('gb')}/products/cardio/shopby/line_internal-myrun-personal-forma-artis.html`,
    'home/performance/cardio': `/${__('gb')}/products/cardio/shopby/line_internal-excite-skill_line-mycycling.html`,
    'home/prevention and rehab/cardio': `/${__('gb')}/products/cardio/shopby/line_internal-excite_med.html`,

    'home/fitness/strength': `/${__('gb')}/products/strength/shopby/line_internal-personal-artis-wellness_tools-unica.html`,
    'home/performance/strength': `/${__('gb')}/products/strength/shopby/line_internal-pure.html`,
    'home/prevention and rehab/strength': `/${__('gb')}/products/strength/shopby/line_internal-selection_med.html`,

    'home/fitness/functional & flexibility': `/${__('gb')}/products/functional-flexibility/shopby/line_internal-kinesis_personal-wellness_tools-flexability.html`,
    'home/performance/functional & flexibility': `/${__('gb')}/products/functional-flexibility/shopby/line_internal-skilltools.html`,
    'home/prevention and rehab/functional & flexibility': `/${__('gb')}/products/functional-flexibility/shopby/line_internal-kinesis_personal.html`,

    };
  } else {
    goTo = {
      'business/fitness/cardio': `/${__('gb')}/products/cardio/shopby/line_internal-artis-excite.html`,
      'business/performance/cardio': `/${__('gb')}/products/cardio/shopby/line_internal-skill_line.html`,
      'business/prevenzione e riabilitazione/cardio': `/${__('gb')}/products/cardio/shopby/line_internal-excite_med.html`,
      
      'business/fitness/forza': `/${__('gb')}/products/strength/shopby/line_internal-artis-cable_stations-plurima-selection.html`,
      'business/performance/forza': `/${__('gb')}/products/strength/shopby/line_internal-pure.html`,
      'business/prevenzione e riabilitazione/forza': `/${__('gb')}/products/strength/shopby/line_internal-selection_med.html`,
      
      // fix group activities
      'business/fitness/attivita’ di gruppo': `/${__('gb')}/products/shopby/product_type-group_cycling.html`,
      'business/performance/attivita’ di gruppo': `/${__('gb')}/products/cardio/shopby/line_internal-skill_line/product_type-bike.html`,
      'business/prevenzione e riabilitazione/attivita’ di gruppo': `/${__('gb')}/products/cardio/shopby/line_internal-skill_line/product_type-bike.html`,
     
      'business/fitness/funzionale & flessibilita’': `/${__('gb')}/products/functional-flexibility/shopby/line_internal-flexability-kinesis-omnia.html`,
      'business/performance/funzionale & flessibilita’': `/${__('gb')}/products/functional-flexibility/shopby/line_internal-skilltools.html`,
      'business/prevenzione e riabilitazione/funzionale & flessibilita’': `/${__('gb')}/products/functional-flexibility/shopby/line_internal-kinesis.html`,
      
      'casa/fitness/cardio': `/${__('gb')}/products/cardio/shopby/line_internal-myrun-personal-forma-artis.html`,
      'casa/performance/cardio': `/${__('gb')}/products/cardio/shopby/line_internal-excite-skill_line-mycycling.html`,
      'casa/prevenzione e riabilitazione/cardio': `/${__('gb')}/products/cardio/shopby/line_internal-excite_med.html`,
  
      'casa/fitness/forza': `/${__('gb')}/products/strength/shopby/line_internal-personal-artis-wellness_tools-unica.html`,
      'casa/performance/forza': `/${__('gb')}/products/strength/shopby/line_internal-pure.html`,
      'casa/prevenzione e riabilitazione/forza': `/${__('gb')}/products/strength/shopby/line_internal-selection_med.html`,
  
      'casa/fitness/funzionale & flessibilita’': `/${__('gb')}/products/functional-flexibility/shopby/line_internal-kinesis_personal-wellness_tools-flexability.html`,
      'casa/performance/funzionale & flessibilita’': `/${__('gb')}/products/functional-flexibility/shopby/line_internal-skilltools.html`,
      'casa/prevenzione e riabilitazione/funzionale & flessibilita’': `/${__('gb')}/products/functional-flexibility/shopby/line_internal-kinesis_personal.html`,
  
      };
  }
  const theKey = [];
  const answers = getAnswers();

  Object.keys(answers).forEach((i) => {
    const data = answers[i];
    theKey.push(data.toLowerCase());
  });
  const loc = goTo[theKey.join('/')];
  window.location.href = loc;
};

export const showLoader = () => {
  finderLoader();
  redirect();
};
