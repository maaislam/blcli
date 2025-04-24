import settings from '../settings';
import { pollerLite } from '../../../../../lib/uc-lib';

export default () => {
  const id = settings.ID;

  /* How it works section with slider */
  const howItWorks = () => {
    const steps = {
      1: {
        image: '//cdn.optimizely.com/img/8361134338/0c0c366ed92a4ab8b58b049a286d433d.png',
        title: 'Tell us about yourself',
        text: 'Answer the basics to help us narrow down people who meet your personal criteria.',
      },
      2: {
        image: '//cdn.optimizely.com/img/8361134338/6e8281c9c2634bd2bb4cf3651cc4ec7d.png',
        title: 'Answer compatibility questions',
        text: 'Complete compatibility questions to get quality connections based on key areas of personality.',
      },
      3: {
        image: '//cdn.optimizely.com/img/8361134338/dcc30a1c75de4a08a31e5fb7318a45f6.png',
        title: 'Review your matches',
        text: 'Review the profiles of everyone who we\'ve determined to be right for you, for FREE',
      },
      4: {
        image: '//cdn.optimizely.com/img/8361134338/35451b314df14b5a96ff4410d683b938.png',
        title: 'Unlock features',
        text: `
          Pick a plan that fits your needs and start communicating at your own pace. Get a great deal with our latest <a class="${id}-promo-link" href="/promotional-code/">promo code</a>.
        `,
      },
    };

    const slider = document.querySelector(`.${id}-howItWorks .${id}-slider`);
    Object.keys(steps).forEach((i) => {
      const data = steps[i];
      const newStep = document.createElement('div');
      newStep.classList.add(`${id}-slider_step`);
      newStep.innerHTML = `
      <div class="${id}-circle" style="background-image: url('${data.image}')">
        <span>${[i][0]}</span>
      </div>
      <p class="${id}-text-title">${data.title}</p>
      <p>${data.text}</p>
      <div class="${id}-video"><span></span>How it works video</div>`
      ;

      slider.appendChild(newStep);
    });


    const tinySlider = document.createElement('script');
    tinySlider.type = 'text/javascript';
    tinySlider.src = 'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.8.2/min/tiny-slider.js';
    tinySlider.async = true;
    document.getElementsByTagName('head')[0].appendChild(tinySlider);

    /* eslint-disable */
    pollerLite([
      () => {
        return window.tns;
      },
    ], () => {
      const slider = tns({
        container: `.${id}-slider`,
        items: 1,
        loop: false,
        mouseDrag: true,
        nav: false,
        disable: false,
      });

      const sliderButtons = document.querySelectorAll('.tns-controls button');
      for (let i = 0; i < sliderButtons.length; i += 1) {
        const element = sliderButtons[i];
        element.textContent = '';
      }
    });


    // add the video lightbox
    const videoOnPage = document.querySelector('.video.full').innerHTML;

    const newLightbox = document.createElement('div');
    newLightbox.classList.add(`${id}-videoLightbox`);     
    newLightbox.innerHTML = `<div class="${id}-overlay"></div><div class="${id}-exit">&times;</div><iframe width="100%" height="auto" src="https://www.youtube.com/embed/bpvycVYCbec" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

    document.body.appendChild(newLightbox);

    const lightbox =  document.querySelector(`.${id}-videoLightbox`);

    const allVideoButtons = document.querySelectorAll(`.${id}-video`);
    
    for (let index = 0; index < allVideoButtons.length; index += 1) {
      const element = allVideoButtons[index];
      element.addEventListener('click', () => {
        lightbox.classList.add(`${id}-lightboxShow`);
      }); 
    }

    document.querySelector(`.${id}-overlay`).addEventListener('click', () => {
      lightbox.classList.remove(`${id}-lightboxShow`);
    });

    document.querySelector(`.${id}-exit`).addEventListener('click', () => {
      lightbox.classList.remove(`${id}-lightboxShow`);
    });
  };
  howItWorks();


  const whySection = () => {
    const iconsWrapper = document.querySelector(`.${id}-icons`);
    const icons = ['compatibility matching system','higher levels of compatibility',
    'we are always here if you need to <a href="https://help-singles.eharmony.co.uk/app/answers/detail/a_id/2419/kw/call%20someone">get in touch</a>',
    `we offer the latest expert dating advice <a class="${id}-find_more" href="https://www.eharmony.co.uk/dating-advice/">find out more</a>`
    ];

    for (let j = 0; j < icons.length; j += 1) {
      const element = icons[j];
      const newIconsBlock = document.createElement('div');
      newIconsBlock.classList.add(`${id}-block`);
      newIconsBlock.innerHTML = `<div class="${id}-icon"></div><span>${element}</span>`;

      iconsWrapper.appendChild(newIconsBlock);
    }
  };
  whySection();

  const successStories = () => {
    const storiesWrapper = document.querySelector(`.${id}-more_section .${id}-content`);
    const storiesMarkup = document.createElement('div');
    storiesMarkup.classList.add(`${id}-stories_inner`);
    storiesMarkup.innerHTML = 
    `<div class="${id}-couple"><span>James and Laura</span></div>
    <div class="${id}-couple"><span>Max and Vic</span></div>
    <p><span>eharmony</span> has brought together millions of singles who have gone on to have happy relationships. If you have a success story of your own, we'd love to hear it! Share it with us or read through inspiring stories from some of our members.</p>`

    storiesWrapper.appendChild(storiesMarkup);
  }
  successStories();

  const safety = () => {
    const safetyWrapper = document.querySelector(`.${id}-safety`);
    const safetyMarkup = document.createElement('div');
    safetyMarkup.classList.add(`${id}-safety_inner`);
    safetyMarkup.innerHTML = 
    `<div class="${id}-safety_icon"><div class="${id}-safety_circle"><span>privacy</span></div></div>
    <div class="${id}-safety_icon"><div class="${id}-safety_circle"><span>security</span></div></div>
    <div class="${id}-safety_icon"><div class="${id}-safety_circle"><span>trust</span></div></div>
    <p>We take your privacy and security very seriously. Only your matches can see you and you be a member to see photos.</p>
    <p>This is unlike other sites that allow anyone to randomly search for people and contact them. Not in our house.</p>`

    safetyWrapper.appendChild(safetyMarkup);
  }
  safety();

  const people = () => {
    const peopleWrapper = document.querySelector(`.${id}-people`);
    const peopleMarkup = document.createElement('div');
    peopleMarkup.classList.add(`${id}-people_inner`);
    peopleMarkup.innerHTML = 
    `<div class="${id}-icons_line"></div>
    <p>Whatever your ethnicity or religion, we'll match you with singles who complement your personality and beliefs. We have members right across the UK - from Scotland to Cornwall and everywhere in between. The perfect match for you could be living round the corner - you just haven't had the chance to meet them yet.</p>
    <p>Online dating has helped introduce thousands of compatible singles. Read their success stories and discover how it could work for you, too.</p>
    <p class="${id}-subtitle"><span class="faith">dating</span> advice</p>
    <p>It would be great if there were one definitive guide to dating. Unfortunately, we can't hand you a manual - but we do have the next best thing. Our <a href="https://www.eharmony.co.uk/dating-advice/">Dating Advice</a> site is packed full of useful tips and articles about every aspect of dating and relationships. Worried about your first date? Or are you wondering when to contact an eharmony match? Ask our <a href="https://www.eharmony.co.uk/dating-advice/">relationship experts</a> and get your dating dilemmas solved.</p>`
  
    peopleWrapper.querySelector('p').insertAdjacentElement('afterend', peopleMarkup);

    // anchor back to top on cta button
    const signUp = peopleWrapper.querySelector(`.${id}-button`);
    signUp.addEventListener('click', () => {
     window.scrollTo(0,0); 
    });
  }
  pollerLite([`.${id}-people .${id}-button`], () => {
  },people());


};
