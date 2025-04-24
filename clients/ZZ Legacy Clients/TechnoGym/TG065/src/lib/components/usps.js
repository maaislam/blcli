import settings from '../settings';
/*
* Features for the USPs
*/
export default () => {
  const ID = `${settings.ID}`;
  const usps = {
    'Running Rate': {
      image: '//cdn.optimizely.com/img/8355110909/c49a8942c223446cb382b6fe2532253b.png',
      text: 'The RUNNING RATE (patent pending) index developed by Technogym® will help you run better and reduce the risk of injury.',
    },
    'MY RUNNING LOGBOOK': {
      image: '//cdn.optimizely.com/img/8355110909/38c020c95b5742249acdda6177c60ef9.png',
      text: 'MYRUNNING LOGBOOK enables you to reproduce your favourite outdoor runs on MYRUN TECHNOGYM®.',
    },
    'TRAINING PROGRAMMES': {
      image: '//cdn.optimizely.com/img/8355110909/0da7231b81794a6e8b688f0771d1b99e.png',
      text: 'With MYRUN TECHNOGYM® your training is even more fun and effective: you can plan exercises, training sessions and routines shaped around your personal needs.',
    },
    'CONNECTED WITH ZWIFT': {
      image: '//cdn.optimizely.com/img/8355110909/620b05b14e76453590336803091deafe.png',
      text: 'Connect the MYRUN app to Zwift and get ready to challenge your friends directly from home.',
    },
  };

  /**
   * Bottom usps
   */
  const bottomUsps = {
    'RELIVE YOUR OUTDOOR <span>RUNS AT HOME</span>': {
      image: '//cdn.optimizely.com/img/8355110909/58890d22bb3644fb935196f50808f8e0.jpg',
      text: 'MYRUNNING LOGBOOK enables you to reproduce your favourite outdoor runs on MYRUN TECHNOGYM. Track your outdoor sessions using the technogym App or other compatible apps.',
    },
    'DESIGNED BY RUNNERS FOR THOSE WHO LOVE TO <span>STAY IN SHAPE</span>': {
      image: '//cdn.optimizely.com/img/8355110909/44dfbf3cc3a84f028e402cbe18746c92.jpg',
      text: 'The minimalist design, combined with the simplicity of timeless technology, gives you a running experience like no other. And with the single switch function, you are just one tap away from running.',
    },
    'READY TO RUN IN <span>5 MINUTES</span>': {
      image: '//cdn.optimizely.com/img/8355110909/c7ede64b67fd477cba27c73c968ea98b.jpg',
      text: 'Custom design and packaging make the DIY assembly process unbelievably  simple and fast. Thanks to this patent  pending Fast Installation solution, you only need 5 minutes to set up. ',
    },
  };

  /**
   * Add the usps to the page
   */
  Object.keys(usps).forEach((i) => {
    const data = usps[i];
    const productFeature = document.createElement('div');
    productFeature.classList.add('TG065-feature_block');
    if (window.innerWidth >= 1024) {
      productFeature.style = `background-image: url('${data.image}')`;
    }
    productFeature.innerHTML = `
    <div class="TG065-icon" style="background-image: url('${data.image}')"></div>
    <h3><span>${[i][0]}</span></h3>
    <p>${data.text}</p>`;
    document.querySelector(`.${ID}-features_section`).appendChild(productFeature);
  });

  /* bottom usps */
  Object.keys(bottomUsps).forEach((i) => {
    const data = bottomUsps[i];
    const productFeature = document.createElement('div');
    productFeature.classList.add('TG065-bottom_block');
    productFeature.innerHTML = `
    <div class="TG065-section_background" style="background-image: url('${data.image}')"></div>
    <div class="TG065-block_text">
      <h3>${[i][0]}</h3>
      <p>${data.text}</p>
    </div>`;
    document.querySelector(`.${ID}-large_blocks_section`).appendChild(productFeature);
  });
};
