import { fullStory, events } from '../../../../lib/utils';


/**
 * {{AC038}} - {{Simple Candidate Journey}}
 */

const Run = () => {
  const $ = window.jQuery;
  // Used to prevent multiple clicks for animations
  let allowAnimation = true;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'AC038',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const headerText = bodyVar.querySelector('.navbar-strapline');
      // Reassigned when markup is rendered
      let AC038ContainerJQ;
      let findJobButton;
      let arrowJQ;
      let AC038CVLibraryLink;
      // Not polled for, only exists on mobile
      const AC018Refine = bodyVar.querySelector('.AC018_refine-mb');
      // Not polled for, only needed on desktop and tablet
      const searchBox = bodyVar.querySelector('.pane-search-bar-panel-pane .pane-content');
      const searchBoxJQ = $(searchBox);
      // Change render location based on mobile element
      let renderLocation = bodyVar.querySelector('#navbar > .container > .navbar-header');
      if (AC018Refine) {
        renderLocation = docVar.getElementById('navbar');
      }
      return {
        docVar,
        bodyVar,
        headerText,
        renderLocation,
        AC038ContainerJQ,
        arrowJQ,
        findJobButton,
        AC018Refine,
        searchBox,
        searchBoxJQ,
        AC038CVLibraryLink,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      // Default running event
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        Exp.render.headerButton();
        // Cache elements
        Exp.cache.arrowJQ = $('.AC038_Arrow');
        Exp.cache.AC038ContainerJQ = $('.AC038_Content_Container');
        Exp.cache.findJobButton = Exp.cache.bodyVar.querySelector('.AC038_Find_Job_Button');
        Exp.cache.AC038CVLibraryLink = Exp.cache.bodyVar.querySelector('.AC038_CV_Library_Link');
        // Add functionality
        Exp.bindExperimentEvents.handleHeaderButtonClick();
        Exp.bindExperimentEvents.handleFindRecruitmentAgency();
        Exp.bindExperimentEvents.trackCVLibraryClick();
        Exp.bindExperimentEvents.handleCloseButton();
      },
    },
    render: {
      headerButton() {
        Exp.cache.headerText.insertAdjacentHTML('afterend', `
          <div class="AC038_Find_Job_Container">
            <span class="AC038_Find_Job_Button">find<span class="AC038_Desktop_Display"> me </span> a job</span>
            <span class="AC038_Arrow"></span>
          </div>
        `);
        // Render test content
        this.speechBubble();
      },
      speechBubble() {
        const choiceOneMarkup = `
          <div class="AC038_Choice_Container">
            <span class="AC038_Choice_Header_Mobile AC038_Mobile_Display">Choice 1:</span>
            <img class="AC038_Choice_Image" src="//useruploads.visualwebsiteoptimizer.com/useruploads/328729/images/338d2a482fee18c9a51d38eaffbfbd70_ac038_recruiter.png" alt="Find a recruitment agency" />
            <span class="AC038_Choice_Text">Find a recruiter to source you the perfect job</span>
            <span class="AC038_Choice_Button AC038_Find_Agency_Button">Find a recruitment agency</span>
          </div>
        `;

        const choiceTwoMarkup = `
        <div class="AC038_Choice_Container">
          <span class="AC038_Choice_Header_Mobile AC038_Mobile_Display">Choice 2:</span>
          <img class="AC038_Choice_Image" src="//useruploads.visualwebsiteoptimizer.com/useruploads/328729/images/1990b8fdd05148e3c5fbcf1c146a86b6_ac038_cvlibrary.png" alt="CV Library" />
          <span class="AC038_Choice_Text">Upload your CV to our partner site and find a job yourself</span>
          <a href="https://www.cv-library.co.uk/register?id=103281" target="_blank" class="AC038_Choice_Button AC038_CV_Library_Link">Visit CV Library</a>
        </div>
      `;
        Exp.cache.renderLocation.insertAdjacentHTML('afterend', `
            <div class="AC038_Container">
              <div class="AC038_Content_Container">
                <span class="AC038_Header">As a Candidate, you have two choices:</span>
                <div class="AC038_Choice_Header_Container">
                  <span class="AC038_Choice_Heading AC038_Desktop_Display">Choice 1:</span>
                  <span class="AC038_Choice_Heading AC038_Desktop_Display">Choice 2:</span>
                </div>
                <div class="AC038_Options_Container">
                  ${choiceOneMarkup}
                    <span class="AC038_Mobile_Separator"></span>
                  ${choiceTwoMarkup}
                </div>
                <span class="AC038_Close">Close</span>
              </div>
            </div>
        `);
      },
    },
    bindExperimentEvents: {
      handleModalDisplay() {
        // Send event on first open, closed by default
        events.send(`${Exp.settings.ID}`, 'Clicked', 'Find me a job', { sendOnce: true });
        if (allowAnimation) {
          allowAnimation = false;
          Exp.cache.arrowJQ.fadeToggle('fast');
          Exp.cache.AC038ContainerJQ.fadeToggle('fast', () => {
            allowAnimation = true;
          });
        }
      },
      handleCloseButton() {
        Exp.cache.bodyVar.querySelector('.AC038_Close').addEventListener('click', this.handleModalDisplay);
      },
      handleHeaderButtonClick() {
        Exp.cache.findJobButton.addEventListener('click', this.handleModalDisplay);
      },
      handleFindRecruitmentAgency() {
        // Add an eventlistener which will either open the filters on mobile,
        // or scroll to search box
        Exp.cache.bodyVar.querySelector('.AC038_Find_Agency_Button').addEventListener('click', () => {
          // Send event
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Find a Recruitment Agency', { sendOnce: true });
          if (Exp.cache.AC018Refine) {
            // Click the header button to animate test content
            Exp.cache.findJobButton.click();
            Exp.cache.AC018Refine.click();
          } else if (allowAnimation) {
            this.scrollToRefine();
          }
        });
      },
      scrollToRefine() {
        // Click the header button to animate test content
        allowAnimation = false;
        Exp.cache.arrowJQ.fadeToggle('fast');
        Exp.cache.AC038ContainerJQ.fadeToggle('fast', () => {
          // Scroll to search box
          $('html, body').animate({ scrollTop: Exp.cache.searchBoxJQ.offset().top - 150 }, 1000);
          Exp.cache.searchBox.classList.add('AC038_Glow');
          // Remove class for animation after 8s
          setTimeout(() => {
            Exp.cache.searchBox.classList.remove('AC038_Glow');
          }, 8000);
          allowAnimation = true;
        });
      },
      trackCVLibraryClick() {
        Exp.cache.AC038CVLibraryLink.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Visit CV Library', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
