import { fullStory, events } from '../../../../lib/utils';
import agency from './lib/agencyTemplate';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{TestID}} - {{Test Description}}
 */
const Run = () => {
  let $ = null;
  let slideQ = true;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'AC030',
      VARIATION: '1',
    },
    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;

      // Cached Selectors that already exist in the DOM
      const searchResults = doc.getElementById('search-results-container');
      const originalResults = searchResults.querySelectorAll('.agency-result.row');

      let newResults;
      let newAgencies;
      /* eslint-disable-next-line */
      let firstLoop = true;

      return {
        doc,
        bodyVar,
        searchResults,
        originalResults,
        newResults,
        newAgencies,
        firstLoop,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();

      poller([
        () => {
          let trigger = false;
          if (window.jQuery) trigger = true;
          return trigger;
        },
      ], () => {
        $ = window.jQuery;
        components.checkOverflow();
        components.windowResize();
        slideQ = false;
      });

      poller([
        '.AC027-Wrap .AC027-Content-Wrap .slick-list '
      ], () => {
        components.moveAC027();
      });
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      hideFlicker: () => {
        const hide = document.getElementById('AC030_flickerPrevention');
        hide.parentElement.removeChild(hide);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      moveAC027() {
        const ACWrap = Exp.cache.bodyVar.querySelector('.AC027-Wrap');
        const thirdAgency = Exp.cache.bodyVar.querySelector('.AC030_results-wrap .AC030_result:nth-child(3)');

        if (thirdAgency) {
          thirdAgency.insertAdjacentHTML('afterend', '<div class="AC030_AC027-target"></div>');

          Exp.cache.bodyVar.querySelector('.AC030_AC027-target').appendChild(ACWrap);
        }
      },
      contentBuilder() {
        Exp.cache.originalResults[0].insertAdjacentHTML('beforebegin', '<section class="AC030_results-wrap"></section>');
        Exp.cache.newResults = Exp.cache.searchResults.querySelector('.AC030_results-wrap');

        // name, jobTypes, contracts, coverage, officeLocations, salary, about, target
        // Paramaters to pass in

        [].forEach.call(Exp.cache.originalResults, (item, index) => {
          const agencyName = item.dataset.name;
          const agencyDesc = item.querySelector('.agency-description').textContent.trim();
          const jobInd = item.dataset.il.split(',');
          const contractType = item.dataset.types.split(',');
          const percentageData = item.dataset.sb.split(',');
          let jobIndContent = '';
          let contractTypeContent = Exp.components.contractType(contractType);
          let locationRecruiting = item.querySelector('.locations-recruited span');
          const location = item.querySelector('.location .address').textContent.trim();
          const otherLocations = item.querySelector('.location .other-addresses').innerHTML.trim();
          const href = item.dataset.agencyUrl;

          // Contact buttons
          let numBtn = '';
          let emailBtn = '';
          let webBtn = '';
          let freeAgency = false;

          if (locationRecruiting) {
            locationRecruiting = Exp.components.locationsToRecruit(locationRecruiting.textContent.replace('Covers ', ''));
          } else {
            locationRecruiting = '';
          }

          for (let i = 0; jobInd.length > i; i += 1) {
            jobIndContent += `<span>${jobInd[i]}</span>`;
          }

          if (jobInd[0] !== '') {
            jobIndContent = Exp.components.sectorMarkup(jobIndContent);
          } else {
            jobIndContent = '';
          }

          if (item.querySelector('.contact-option-container[data-action="website"]')) {
            webBtn = '<a class="AC030_contact-website">Visit Website</a>';
            // webBtn = '<a class="AC030_contact-website"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="44.471px" height="77.957px" viewBox="0 0 44.471 77.957" enable-background="new 0 0 44.471 77.957" xml:space="preserve"><path fill="#306ca9" d="M23.805,12.375V0h-3.14v12.375C9.147,13.197,0,22.729,0,34.452v21.27c0,12.263,9.974,22.235,22.235,22.235  c12.26,0,22.236-9.973,22.236-22.235v-21.27C44.471,22.729,35.323,13.197,23.805,12.375z M41.332,34.452v2.043H23.805V15.514  C33.59,16.328,41.332,24.462,41.332,34.452z M20.666,15.514v20.981H3.139v-2.043C3.139,24.462,10.88,16.328,20.666,15.514z   M22.235,74.819c-10.529,0-19.096-8.567-19.096-19.098V39.635h38.193v16.087C41.332,66.252,32.765,74.819,22.235,74.819z"></path></svg> Visit Website</a>';
          }

          if (item.querySelector('.contact-option-container[data-action="email"]')) {
            emailBtn = '<a class="AC030_contact-email">Email Agency</a>';
          }

          if (item.querySelector('.contact-option-container[data-action="telfax"]')) {
            numBtn = '<a class="AC030_contact-number">Show phone number</a>';
          }

          if (item.querySelector('.agency-description').textContent.indexOf('Industries covered:') > -1) {
            freeAgency = true;
            jobIndContent = '<h4 class="AC030_freeAgency">Not available</h4>';
            contractTypeContent = '';
          }

          agency(
            agencyName,
            jobIndContent,
            contractTypeContent,
            locationRecruiting,
            location,
            otherLocations,
            agencyDesc,
            Exp.cache.newResults,
            index,
            href,
            numBtn,
            emailBtn,
            webBtn,
            Exp.components.salaryMarkup(freeAgency, percentageData[0].replace('.00', ''), percentageData[1].replace('.00', ''), percentageData[2].replace('.00', ''), percentageData[3].replace('.00', ''), percentageData[4].replace('.00', ''), percentageData[5].replace('.00', '')),
          );

          item.classList.add(`AC030_target-${index}`);
        });

        Exp.cache.newAgencies = Exp.cache.bodyVar.querySelectorAll('.AC030_result');
        Exp.cache.newResults.classList.add('AC030_loaded');
        Exp.services.hideFlicker();
      },
      locationsToRecruit(content) {
        const string = `
          <div class="AC030_coverage">
            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 40 40" version="1.1">
              <g id="0-Style-Guide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Style-Guide" transform="translate(-204.000000, -3601.000000)" fill="#4F4F4F">
                  <path d="M224,3601 C212.954667,3601 204,3609.95467 204,3621 C204,3632.04533 212.954667,3641 224,3641 C235.045333,3641 244,3632.04533 244,3621 C244,3609.95467 235.045333,3601 224,3601 L224,3601 Z M238.584,3611.66667 L234.610667,3611.66667 C233.837333,3609.23467 232.776,3607.104 231.496,3605.39467 C234.397333,3606.79467 236.853333,3608.97333 238.584,3611.66667 L238.584,3611.66667 Z M225.333333,3611.66667 L225.333333,3603.88533 C227.853333,3604.62933 230.309333,3607.424 231.821333,3611.66667 L225.333333,3611.66667 L225.333333,3611.66667 Z M232.597333,3614.33333 C232.973333,3615.96533 233.216,3617.752 233.293333,3619.66667 L225.333333,3619.66667 L225.333333,3614.33333 L232.597333,3614.33333 L232.597333,3614.33333 Z M222.666667,3603.88533 L222.666667,3611.66667 L216.178667,3611.66667 C217.690667,3607.424 220.146667,3604.62933 222.666667,3603.88533 L222.666667,3603.88533 Z M222.666667,3614.33333 L222.666667,3619.66667 L214.706667,3619.66667 C214.784,3617.752 215.026667,3615.96533 215.402667,3614.33333 L222.666667,3614.33333 L222.666667,3614.33333 Z M212.04,3619.66667 L206.733333,3619.66667 C206.877333,3617.792 207.306667,3615.99467 208.002667,3614.33333 L212.696,3614.33333 C212.338667,3616.02133 212.114667,3617.80533 212.04,3619.66667 L212.04,3619.66667 Z M212.04,3622.33333 C212.114667,3624.19467 212.338667,3625.97867 212.696,3627.66667 L208.002667,3627.66667 C207.306667,3626.00533 206.877333,3624.208 206.733333,3622.33333 L212.04,3622.33333 L212.04,3622.33333 Z M214.706667,3622.33333 L222.666667,3622.33333 L222.666667,3627.66667 L215.402667,3627.66667 C215.026667,3626.03467 214.784,3624.248 214.706667,3622.33333 L214.706667,3622.33333 Z M222.666667,3630.33333 L222.666667,3638.11467 C220.146667,3637.37067 217.690667,3634.576 216.178667,3630.33333 L222.666667,3630.33333 L222.666667,3630.33333 Z M225.333333,3638.11467 L225.333333,3630.33333 L231.821333,3630.33333 C230.309333,3634.576 227.853333,3637.37067 225.333333,3638.11467 L225.333333,3638.11467 Z M225.333333,3627.66667 L225.333333,3622.33333 L233.293333,3622.33333 C233.216,3624.248 232.973333,3626.03467 232.597333,3627.66667 L225.333333,3627.66667 L225.333333,3627.66667 Z M235.96,3622.33333 L241.266667,3622.33333 C241.122667,3624.208 240.693333,3626.00533 239.997333,3627.66667 L235.304,3627.66667 C235.661333,3625.97867 235.885333,3624.19467 235.96,3622.33333 L235.96,3622.33333 Z M235.96,3619.66667 C235.885333,3617.80533 235.661333,3616.02133 235.304,3614.33333 L239.997333,3614.33333 C240.693333,3615.99467 241.122667,3617.792 241.266667,3619.66667 L235.96,3619.66667 L235.96,3619.66667 Z M216.504,3605.39467 C215.226667,3607.104 214.162667,3609.23467 213.389333,3611.66667 L209.416,3611.66667 C211.146667,3608.97333 213.602667,3606.79467 216.504,3605.39467 L216.504,3605.39467 Z M209.416,3630.33333 L213.389333,3630.33333 C214.162667,3632.76533 215.224,3634.896 216.504,3636.60533 C213.602667,3635.20533 211.146667,3633.02667 209.416,3630.33333 L209.416,3630.33333 Z M231.496,3636.60533 C232.773333,3634.896 233.837333,3632.76533 234.610667,3630.33333 L238.584,3630.33333 C236.853333,3633.02667 234.397333,3635.20533 231.496,3636.60533 L231.496,3636.60533 Z" id="globe-icon"></path>
                </g>
              </g>
            </svg>
            <p>Coverage: ${content}</p>
          </div>`;

        return string;
      },
      contractType(arr) {
        let string = '<h4>Contract types:</h4><div class="AC030_checkwrap clearfix">';
        if (arr[0] !== '') {
          if (arr.indexOf('temporary') > -1) {
            string += '<div class="AC030_contracts AC030_tick"><span></span>Temp</div>';
          } else {
            string += '<div class="AC030_contracts"><span></span>Temp</div>';
          }
          if (arr.indexOf('permanent') > -1) {
            string += '<div class="AC030_contracts AC030_tick"><span></span>Permanent</div>';
          } else {
            string += '<div class="AC030_contracts"><span></span>Permanent</div>';
          }
          if (arr.indexOf('parttimejobshare') > -1) {
            string += '<div class="AC030_contracts AC030_tick"><span></span>Part Time</div>';
          } else {
            string += '<div class="AC030_contracts"><span></span>Part Time</div>';
          }
          if (arr.indexOf('contract') > -1) {
            string += '<div class="AC030_contracts AC030_tick"><span></span>Contract</div>';
          } else {
            string += '<div class="AC030_contracts"><span></span>Contract</div>';
          }
          string += '</div>';
        } else {
          string = '';
        }

        return string;
      },
      sectorMarkup(content) {
        const string = `
          <div class="AC030_ul-wrap">
            <div class="AC030_ind-content">
              ${content}
              <a class="AC030_reveal-sectors"></a>
            </div>
          </div>
        `;
        return string;
      },
      salaryMarkup(checkContent, percent1, percent2, percent3, percent4, percent5, percent6) {
        let content = '';

        if (checkContent === false) {
          content = `
            <h4>Recruitment by salary bracket</h4>
            <div class="AC030_graph clearfix">
              <div class="AC030_graph-legend">
                <div>up to 17k</div>
                <div>£17k - 25k</div>
                <div>£25k - 35k</div>
                <div>£35k - 60k</div>
                <div>£60k - 100k</div>
                <div>£100k+</div>
              </div>
              <div class="AC030_graph-wrap">
                <div class="AC030_graph-row">
                  <span class="AC030_graph-bar" style="width: ${percent1}%;"></span>
                  <span class="AC030_graph-percent">${percent1}%</span>
                </div>
                <div class="AC030_graph-row">
                  <span class="AC030_graph-bar" style="width: ${percent2}%;"></span>
                  <span class="AC030_graph-percent">${percent2}%</span>
                </div>
                <div class="AC030_graph-row">
                  <span class="AC030_graph-bar" style="width: ${percent3}%;"></span>
                  <span class="AC030_graph-percent">${percent3}%</span>
                </div>
                <div class="AC030_graph-row">
                  <span class="AC030_graph-bar" style="width: ${percent4}%;"></span>
                  <span class="AC030_graph-percent">${percent4}%</span>
                </div>
                <div class="AC030_graph-row">
                  <span class="AC030_graph-bar" style="width: ${percent5}%;"></span>
                  <span class="AC030_graph-percent">${percent5}%</span>
                </div>
                <div class="AC030_graph-row">
                  <span class="AC030_graph-bar" style="width: ${percent6}%;"></span>
                  <span class="AC030_graph-percent">${percent6}%</span>
                </div>
              </div>
            </div>
          `;
        } else {
          content = '<h4>Not available</h4>';
        }

        return content;
      },
      checkOverflow() {
        const titleCheck = document.querySelector('.AC030_job-wrap .AC030_content-outer h4').offsetWidth;

        [].forEach.call(Exp.cache.newAgencies, (item) => {
          let contentHeight = item.querySelector('.AC030_ind-content');
          const descContent = item.querySelector('.AC030_about-inner p').offsetHeight;
          const headerCheck = item.querySelector('.AC030_salary-wrap .AC030_sal-content');
          const h3 = item.querySelector('.AC030_salary-wrap h3');

          if (titleCheck > 0) {
            if (headerCheck.classList.contains('AC030_reveal-anim')) {
              headerCheck.classList.remove('AC030_reveal-anim');
            }
            if (contentHeight) {
              contentHeight = contentHeight.offsetHeight;

              if (contentHeight > 135) {
                item.classList.add('AC030_overflow-content');
              } else {
                item.classList.remove('AC030_overflow-content');
              }
            }
          } else {
            if (contentHeight) {
              contentHeight = contentHeight.offsetHeight;

              if (contentHeight > 45) {
                item.classList.add('AC030_overflow-content');
              } else {
                item.classList.remove('AC030_overflow-content');
              }
            }

            if (descContent > 86) {
              item.classList.add('AC030_overflow-content-desc');
            } else {
              item.classList.remove('AC030_overflow-content-desc');
            }
          }

          if (Exp.cache.firstLoop === true) {
            const thisIndex = item.dataset.index;
            const oldAgency = Exp.cache.bodyVar.querySelector(`.AC030_target-${thisIndex}`);
            const websiteBtn = item.querySelector('.AC030_contact-website');
            const phoneBtn = item.querySelector('.AC030_contact-number');
            const emailBtn = item.querySelector('.AC030_contact-email');

            if (websiteBtn) {
              websiteBtn.addEventListener('click', () => {
                oldAgency.querySelector('.contact-option-container[data-action="website"]').click();
                events.send(`${Exp.settings.ID}`, 'Click', 'User clicked Visit Website', { sendOnce: true });
              });
            }

            if (phoneBtn) {
              phoneBtn.addEventListener('click', () => {
                oldAgency.querySelector('.contact-option-container[data-action="telfax"]').click();
                events.send(`${Exp.settings.ID}`, 'Click', 'User clicked Show Phone Number', { sendOnce: true });
              });
            }

            if (emailBtn) {
              emailBtn.addEventListener('click', () => {
                oldAgency.querySelector('.contact-option-container[data-action="email"]').click();
                events.send(`${Exp.settings.ID}`, 'Click', 'User clicked Email Agency', { sendOnce: true });
              });
            }

            if (contentHeight) {
              item.querySelector('.AC030_reveal-sectors').addEventListener('click', () => {
                if (titleCheck > 0) {
                  events.send(`${Exp.settings.ID}`, 'Click', 'User clicked Show More Job Types', { sendOnce: true });
                  if (item.classList.contains('AC030_more-sectors')) {
                    item.classList.remove('AC030_more-sectors');
                  } else {
                    item.classList.add('AC030_more-sectors');
                  }
                }
              });  
            }
            
            item.querySelector('.AC030_reveal_about').addEventListener('click', () => {
              events.send(`${Exp.settings.ID}`, 'Click', 'User clicked Show More about agency', { sendOnce: true });
              if (item.classList.contains('AC030_more-desc')) {
                item.classList.remove('AC030_more-desc');
              } else {
                item.classList.add('AC030_more-desc');
              }
            });

            const otherOffices = item.querySelector('.AC030_other-offices');
            if (otherOffices.innerText.trim() !== '') {
              item.querySelector('.AC030_reveal-offices').addEventListener('click', () => {
                events.send(`${Exp.settings.ID}`, 'Click', 'User clicked Show other locations', { sendOnce: true });
                if (item.classList.contains('AC030_more-offices')) {
                  item.classList.remove('AC030_more-offices');
                } else {
                  item.classList.add('AC030_more-offices');
                }
              });
            } else {
              otherOffices.classList.add('AC030_no-offices');
            }

            const locationBtn = item.querySelector('.AC030_location-wrap > h3');
            const locationContent = $(item.querySelector('.AC030_location-wrap .AC030_location-reveal'));
            const jobWrap = item.querySelector('.AC030_job-wrap > h3');
            const jobContent = $(item.querySelector('.AC030_job-wrap .AC030_content-outer'));

            locationBtn.addEventListener('click', () => {
              this.toggleContent(locationBtn, locationContent);
              events.send(`${Exp.settings.ID}`, 'Click', 'User clicked on location header', { sendOnce: true });
            });
            jobWrap.addEventListener('click', () => {
              this.toggleContent(jobWrap, jobContent);
              events.send(`${Exp.settings.ID}`, 'Click', 'User clicked on job types header', { sendOnce: true });
            });

            if (titleCheck === 0) {
              h3.addEventListener('click', () => {
                const contentWrap = item.querySelector('.AC030_salary-wrap .AC030_sal-content');
                const contentWrapJ = $(contentWrap);

                events.send(`${Exp.settings.ID}`, 'Click', 'User clicked Salary option', { sendOnce: true });

                if (slideQ === false) {
                  slideQ = true;
                  if (h3.classList.contains('AC030_active')) {
                    h3.classList.remove('AC030_active');
                    contentWrapJ.slideUp(() => {
                      slideQ = false;
                    });
                  } else {
                    h3.classList.add('AC030_active');
                    contentWrapJ.slideDown(() => {
                      if (contentWrap.classList.contains('AC030_reveal-anim')) {
                        contentWrap.classList.remove('AC030_reveal-anim');
                      }
                      slideQ = false;
                    });
                  }
                }
              });
            }
          }
        });
        Exp.cache.firstLoop = false;
      },
      windowResize() {
        window.addEventListener('resize', () => { Exp.components.checkOverflow(); });
      },
      toggleContent(revealBtn, contentBlock) {
        if (slideQ === false) {
          slideQ = true;
          if (revealBtn.classList.contains('AC030_active')) {
            revealBtn.classList.remove('AC030_active');
            contentBlock.slideUp(() => {
              slideQ = false;
            });
          } else {
            revealBtn.classList.add('AC030_active');
            contentBlock.slideDown(() => {
              slideQ = false;
            });
          }
        }
      },
      bindReveal() {
        const locationBtn = Exp.cache.bodyVar.querySelector('.AC030_location-wrap > h3');
        const locationContent = $('.AC030_location-wrap .AC030_location-reveal');
        const jobWrap = Exp.cache.bodyVar.querySelector('.AC030_job-wrap > h3');
        const jobContent = $('.AC030_job-wrap .AC030_content-outer');

        locationBtn.addEventListener('click', this.toggleContent(locationBtn, locationContent));
        jobWrap.addEventListener('click', this.toggleContent(jobWrap, jobContent));
      },
    },
  };

  Exp.init();
};

export default Run;
