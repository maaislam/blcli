import { __ } from '../../../../helpers';
/**
 * @desc Main content blocks & yellow Icons
 */
export default () => {
  const blockSectionContainer = document.querySelector('.TG103-blocks');
  const iconSection = document.querySelector('.TG103-yellowIcons');

  const blocks = {
    [`${__('Compact & Silent')}`]: {
      description: `${__('The perfect size for every home with professional grade comfort.')}<br></br>${__('You choose when and how you want to move. MYRUN is fluid and silent even at 20 km/h.')}`,
      background: '//cdn.optimizely.com/img/8355110909/3a4496c74ed74e6098b3744274e09af7.jpg',
    },
    [`${__('Designed for your health')}`]: {
      description: `${__('The running surface adapts to the way you run and absorbs impact efficiently, shielding your joints at lower speeds and offering more reactivity during sprints.')}`,
      background: '//cdn.optimizely.com/img/8355110909/468487e1b1cc401d94e33d8dc43b70ca.jpg',
    },
    [`${__('A friend that recognises you')}`]: {
      description: `${__('When you step on the platform, the wake-up sensor recognises you and turns on MYRUN automatically. You’re ready to start.')}`,
      background: '//cdn.optimizely.com/img/8355110909/30f0dcd3b0fc4b80b4aac35f8ae52a1a.jpg',
    },
    [`${__('MYRUN APP')}`]: {
      description: `${__('Download the MyRun App on your device, position it on the console and begin a running experience that will improve your lifestyle.')} <div class="TG103-secondary_button TG103-button TG103-app_button"><a target="_blank" href="https://www.technogym.com/gb/wellness/myrun-app/">${__('Discover the App')}</a></div>`,
      background: 'https://cdn.optimizely.com/img/8355110909/a5e52a06122a4f6ca7c409d4e26e5e85.png',
    },
    [`${__('Open Challenge')}`]: {
      description: `${__('Train and compete with other runners from around the world with Zwift* or run through epic landscapes and make your solo runs even more enjoyable.')} <p class="TG069_disclaimer">${__('*MyRun is compatible with Zwift only in the iPad version (third generation or more recent). Android versions are not currently supported.')}</p><div class="TG103-apps"><span class="TG103-logo_app TG103-swift_app"></span></div>`,
      background: '//cdn.optimizely.com/img/8355110909/e74c2ee084fa4426891e8740e669c5f6.jpg',
    },
    [`${__('Outdoor running indoors')}`]: {
      description: `${__('With MYRUNNING LOGBOOK, take outdoor running indoors. Track your outdoor sessions and relive them at home.')}<br></br> ${__('Compatible with Garmin and Strava apps.')}<div class="TG103-apps"><span class="TG103-logo_app TG103-garva_app"></span><span class="TG103-logo_app TG103-strava_app"></span></div>`,
      background: '//cdn.optimizely.com/img/8355110909/354c439ff5bb41f6b0f5a3ee7ed45791.jpg',
    },
  };

  // up to here on translations

  Object.keys(blocks).forEach((i) => {
    const element = blocks[i];
    const blockSection = document.createElement('div');
    blockSection.classList.add('TG103-block_row');
    blockSection.innerHTML = `
    <div class="TG103-block_text_wrap" style="background-image:url('${element.background}')">
      <div class="TG103-block_text">
        <h2>${[i][0]}</h2>
        <p>${element.description}</p>
      </div>
    </div>`;
    blockSectionContainer.appendChild(blockSection);
  });

  /**
  * @desc Yellow Icon USPs
  */
  const yellowContent = {
    [`${__('Optimise your')} <span>${__('workout')}</span>`]: {
      icon: '//cdn.optimizely.com/img/8355110909/41cc2172e5214b088ccdc61f172cdb9f.png',
      text: `${__('With Constant Pulse Rate, MYRUN adjusts the speed based on your heart rate to optimise your workout.')}`,
    },
    [`${__('See Improvements')} <span>${__('in real life')}</span>`]: {
      icon: '//cdn.optimizely.com/img/8355110909/59a6ec0764774fa3a1cead1bdebc1477.png',
      text: `${__('Control cadence, pace and displacement to improve your performance in real time.')}`,
    },
    'RUNNING <span>MUSIC</span>': {
      icon: '//cdn.optimizely.com/img/8355110909/a5bcad4311134732884826c70238ce78.png',
      text: `${__('It’s time for music to follow your rhythm: Running Music chooses from your playlist the songs that are best suited to your run. Your sound, outstanding performance, every time.')}`,
    },
  };

  Object.keys(yellowContent).forEach((i) => {
    const element = yellowContent[i];
    const iconContent = document.createElement('div');
    iconContent.classList.add('TG103-block_icons');
    iconContent.innerHTML = `
    <div class="TG103-yellow_icon" style="background-image: url('${element.icon}')"></div>
    <h3>${[i][0]}</h3>
    <p>${element.text}</p>`;
    iconSection.appendChild(iconContent);
  });
  document.querySelector('.TG103-block_row:nth-child(4)').setAttribute('id', 'TG103-app');
};
