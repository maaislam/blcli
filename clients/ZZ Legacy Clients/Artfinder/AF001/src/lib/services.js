import { fullStory } from '../../../../../lib/utils';
import shared from './shared';
import { events, setCookie } from '../../../../../lib/utils';
import data from './data';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

export const generateLightbox = () => {
  const { ID, VARIATION } = shared;

  if(!!( document.cookie && document.cookie.match(/af-dismissed-fullscreen-register/i) )
    || (window && window.AF && window.AF.uType != 'anonymous')
    || sessionStorage.getItem(`${ID}-lightboxShown`) != null
  ) {
    return false;
  }

  const mainContainer = document.querySelector(`.${shared.ID}`);
  const lightboxContainer = `<div class="${shared.ID}-lightbox__wrapper ">
    <div class="${shared.ID}-lightbox__container">
      <div  class="${shared.ID}-lightbox__header">
        <div  class="${shared.ID}-lightbox__title">Let us help you</br>discover art you'll love</div>
        <span class="${shared.ID}-lightbox__close"><a aria-label="Close" class="close">×</a></span>
      </div>
      <div class="${shared.ID}-lightbox__content">
        <div class="${shared.ID}-dropdown" id="${shared.ID}-first">
          <p>I am here because</p>
          <button class="dropbtn" style="text-align: center;">Select option <div class="arrow down"></div></button>
          <ul class="dropdown-content">
            <li data-next-question="${shared.ID}-second__one">I am looking to buy art</li>
            <li data-next-question="${shared.ID}-second__two">I currently sell on Artfinder</li>
            <li data-next-question="${shared.ID}-second__three">Other</li>
          </ul>
        </div>


        <div class="${shared.ID}-dropdown" id="${shared.ID}-second">
          <p>And</p>
          <button class="dropbtn" style="text-align: center;">Select option <div class="arrow down"></div></button>
          <ul class="dropdown-content" id="${shared.ID}-second__one" style="display: none; width: 100%;">
            <li class="${shared.ID}-second__one hide">I am looking for myself</li>
            <li class="${shared.ID}-second__one hide">I am looking for a gift</li>
            <li class="${shared.ID}-second__one hide">I am looking in a professional capacity</li>
        
            <li class="${shared.ID}-second__three hide">I am an artist</li>
            <li class="${shared.ID}-second__three hide">I am browsing</li>
            <li class="${shared.ID}-second__three hide">Other</li>
          </ul>
        </div>
        
        <div class="${shared.ID}-submit"><div>Submit</div></div>
        <div class="${shared.ID}-skip-step"><p>No thanks, maybe later!</p></div>
      </div>
    </div>
  </div>`;
  mainContainer.insertAdjacentHTML('afterbegin', lightboxContainer);


  const lightboxEl = document.querySelector(`.${shared.ID}-lightbox__wrapper`);
  closeLightbox(lightboxEl);
  submitForm(lightboxEl);

  optionSelectionEvents();
  
};

export const submitForm = (lightboxEl) => {
  const { ID, VARIATION } = shared;

  const submitCTA = document.querySelector(`.${shared.ID}-submit`);
  submitCTA.addEventListener('click', () => {
    if ( (data.firstSelect !== '' && data.secondSelect !== '') || data.firstSelect == 'I currently sell on Artfinder' ) {
      // lightboxEl.classList.add('hide');
      document.querySelector(`.${shared.ID}-lightbox__content`).innerHTML = '<b class="xthanks af-green-text">Thanks!</b>';
      // setTimeout(() => {
      //   lightboxEl.classList.add('hide');
      // }, 10000);

      events.send(`${shared.ID}`, `${shared.ID} - Lightbox Completion`, `${data.firstSelect} & ${data.secondSelect}`, { sendOnce: true });
    } else {
      // alert('cannot submit');
      const dropdowns = document.querySelectorAll(`.${shared.ID}-dropdown .dropbtn`);
      [].forEach.call(dropdowns, (dropdown) => {
        dropdown.classList.add('error');

        setTimeout(() => {
          dropdown.classList.remove('error');
        }, 2000);
      });
    }
  });
};

export const optionSelectionEvents = () => {
  const { ID, VARIATION } = shared;

  const firstSelection = document.querySelector(`.${shared.ID}-dropdown#${shared.ID}-first`);
  const secondSelection = document.querySelector(`.${shared.ID}-dropdown#${shared.ID}-second`);
  const firstOptions = firstSelection.querySelectorAll(`ul.dropdown-content li`);
  const secondOptions = secondSelection.querySelectorAll(`.dropdown-content li`);
  const secondDropdown = secondSelection.querySelector('ul.dropdown-content');

  // --- Step 1 -- SHOW First Options
  document.querySelector(`.${shared.ID}-dropdown#${shared.ID}-first`).addEventListener('click', (e) => {
    e.stopPropagation();

    const dropdownItems = document.querySelectorAll(`.${shared.ID}-dropdown .dropbtn`);
    [].forEach.call(dropdownItems, (dropdown) => {
      dropdown.classList.remove('error');
    });
    
    // document.querySelector(`#${shared.ID}-first ul`).classList.toggle("show");
    if (document.querySelector(`#${shared.ID}-first ul`).classList.contains("show")) {
      document.querySelector(`#${shared.ID}-first ul`).classList.remove("show");
      document.querySelector(`#${shared.ID}-first .dropbtn .arrow`).classList.add('down');
    } else {
      document.querySelector(`#${shared.ID}-first ul`).classList.add("show");
      document.querySelector(`#${shared.ID}-first .dropbtn .arrow`).classList.remove('down');
    }

    // document.querySelector(`#${shared.ID}-first .dropbtn .arrow`).classList.toggle("down");

    document.querySelector(`#${shared.ID}-second ul`).classList.remove("show");
    document.querySelector(`#${shared.ID}-second ul`).setAttribute('style', 'display: none;');
    // document.querySelector(`#${shared.ID}-second .dropbtn .arrow`).classList.remove("down");

     if (!e.target.matches('.dropbtn')) {
       var dropdowns = document.getElementsByClassName("dropdown-content");
       var i;
       for (i = 0; i < dropdowns.length; i++) {
         var openDropdown = dropdowns[i];
         if (openDropdown.classList.contains('show')) {
           openDropdown.classList.remove('show');
           document.querySelector(`#${shared.ID}-first .dropbtn .arrow`).classList.add('down');
         }
       }
     }

  });
  
  // --- OPEN Second Options based on first selection
  [].forEach.call(firstOptions, (option) => {
    option.addEventListener('click', () => {
      const nextOptions = option.getAttribute('data-next-question');
      const optionSelectedText = option.innerText;
      // -- Change placeholder to selected option value
      firstSelection.querySelector('button.dropbtn').innerHTML = `${optionSelectedText} <div class="arrow down"></div>`;
      setTimeout(() => {
        firstSelection.querySelector('button.dropbtn .arrow').classList.add('down');
      }, 200);
      firstSelection.querySelector('button.dropbtn').setAttribute('style', 'text-align: left;');
      secondSelection.querySelector('button.dropbtn').innerHTML = `Select option <div class="arrow down"></div>`;
      secondSelection.querySelector('button.dropbtn').setAttribute('style', 'text-align: center;');
      data.firstSelect = optionSelectedText;
      events.send(`${shared.ID}`, `${shared.ID} - Dropdown Selection - 1`, `${data.firstSelect}`, { sendOnce: true });

      // -- Second Options
      [].forEach.call(secondOptions, (opt) => {
        if (nextOptions !== `${shared.ID}-second__two`) {
          if (opt.classList.contains(`${nextOptions}`)) {
            opt.classList.remove('hide');
            
          } else {
            opt.classList.add('hide');
          }
          secondSelection.classList.remove('hide');
        } else {
          secondSelection.classList.add('hide');
          data.secondSelect = '';
        }
        

        opt.addEventListener('click', () => {
          let secondOptionSelectedText = opt.innerText;
          data.secondSelect = secondOptionSelectedText;
          if (secondOptionSelectedText === "I am looking in a professional capacity"
          && window.innerWidth < 377) {
            secondOptionSelectedText = "in a professional capacity";
          }
          secondSelection.querySelector('button.dropbtn').innerHTML = `${secondOptionSelectedText} <div class="arrow down"></div>`;
          setTimeout(() => {
            secondSelection.querySelector('button.dropbtn .arrow').classList.add('down');
          }, 200);
          secondSelection.querySelector('button.dropbtn').setAttribute('style', 'text-align: left;');

          events.send(`${shared.ID}`, `${shared.ID} - Dropdown Selection - 2`, `${data.secondSelect}`, { sendOnce: true });
          document.querySelector(`#${shared.ID}-second ul`).classList.remove("show");
          document.querySelector(`#${shared.ID}-second ul`).setAttribute('style', 'display: none; width: 100%;');
        });
      });
      
      // secondDropdown.classList.add('show');
      // setTimeout(() => {
      //   firstSelection.querySelector('.arrow').classList.add('down');
      //   secondSelection.querySelector('.arrow').classList.remove('down');
      //   secondDropdown.setAttribute('style', 'display: block; width: 100%;');
      // }, 500);
    });
  });



  // --- SECOND OPTION - BTN
  document.querySelector(`.${shared.ID}-dropdown#${shared.ID}-second`).addEventListener('click', (e) => {
    // document.querySelector(`#${shared.ID}-second ul`).classList.toggle("show");
    const firstChoice = document.querySelector(`#${shared.ID}-first .dropbtn`);
    if(firstChoice && firstChoice.textContent.match(/select option/i)) {
      return;
    }

    if(e.target.matches('.dropbtn')) {
      if (document.querySelector(`#${shared.ID}-second ul`).getAttribute("style").indexOf("display: none;") > -1) {
        document.querySelector(`#${shared.ID}-second ul`).setAttribute('style', 'display: block; width: 100%;');
        document.querySelector(`#${shared.ID}-second .dropbtn .arrow`).classList.remove("down");
      } else {
        document.querySelector(`#${shared.ID}-second ul`).setAttribute('style', 'display: none; width: 100%;');
        document.querySelector(`#${shared.ID}-second .dropbtn .arrow`).classList.add("down");
      }
    }
    // document.querySelector(`#${shared.ID}-second .dropbtn .arrow`).classList.toggle("down");

    if (!e.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
          document.querySelector(`#${shared.ID}-second .dropbtn .arrow`).classList.add('down');
        }
      }
    }
  });

  // Close Boxes
  // Helpers more touch points for closing
  const closeDropdowns = () => {
    document.querySelector(`#${shared.ID}-first ul`).classList.remove("show");
    document.querySelector(`#${shared.ID}-second ul`).setAttribute('style', 'display: none; width: 100%;');
  };

  const header = document.querySelector(`.${shared.ID}-lightbox__header`);

  if(header) {
    header.addEventListener('click', (e) => {
      closeDropdowns();
    });
  }

  const content = document.querySelector(`.${shared.ID}-lightbox__content`);
  if(content) {
    content.addEventListener('click', (e) => {
      if(e.target == content) {
        closeDropdowns();
      }
    });
  }

};

export const closeLightbox = (lightboxEl) => {
  const { ID, VARIATION } = shared;

  // --- Close Icon
  const closeIcon = document.querySelector(`.${shared.ID}-lightbox__close`);
  
  closeIcon.addEventListener('click', () => {
    // alert('close icon');
    lightboxEl.classList.add('hide');

    document.body.classList.remove(`${shared.ID}`);

    events.send(`${shared.ID}`, `${shared.ID} - Close Lightbox`, 'V1 - Activated', { sendOnce: true });
  });

  // --- Skip CTA
  const skipCTA = document.querySelector(`.${shared.ID}-skip-step`);

  skipCTA.addEventListener('click', () => {
    // alert('skip cta');
    lightboxEl.classList.add('hide');

    document.body.classList.remove(`${shared.ID}`);

    events.send(`${shared.ID}`, `${shared.ID} - Close Lightbox`, 'V1 - Activated', { sendOnce: true });
  });
  
  // --- Clicked outside Lightbox
  document.querySelector(`.${shared.ID}-lightbox__wrapper`).addEventListener('click', (e) => {
    if (document.querySelector(`.${shared.ID}-lightbox__container`) && !document.querySelector(`.${shared.ID}-lightbox__container`).classList.contains('hide')) {
      if (!document.querySelector(`.${shared.ID}-lightbox__container`).contains(e.target)) {
        lightboxEl.classList.add('hide');

        document.body.classList.remove(`${shared.ID}`);

        events.send(`${shared.ID}`, `${shared.ID} - Close Lightbox`, 'V1 - Activated', { sendOnce: true });
      }
    }
  });

  // --- Set Up Local Storage Item once lightbox has closed
  sessionStorage.setItem(`${shared.ID}-lightboxShown`, true);
  setCookie('af-dismissed-fullscreen-register', 'true');

};
