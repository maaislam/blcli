import { closeIcon, loadingSpinner, searchIcon, editicon1 } from '../assets/icons';

const modal = (id, categoryData) => {
  const html = `
              <div class="${id}__modal" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="${id}__modal-title" aria-describedby="${id}__modal-desc">
                  <div class="${id}__modal-overlay"></div>
                  <div class="${id}__modal-container">
                      <div class="${id}__modal-header">
                          <div class="${id}__closeWrapper" role="button" tabindex="0" aria-label="Close modal">
                            <span class="${id}__text">Close</span> 
                            <span class="${id}__icon">
                                ${closeIcon}
                            </span>
                          </div>
                          <div class="${id}__selectedWrapper" id="${id}__modal-desc">
                            <p class="${id}__item item-one">Let’s help you find what you’re looking for</p>
                            <p class="${id}__item item-two">I’m <span></span><span class="${id}__iconEdit1">${editicon1}</span></p>
                            <p class="${id}__item item-three">I’m working on <span></span><span class="${id}__iconEdit1">${editicon1}</span></p>
                          </div> 
                           <div class="${id}__spinnerWrapper" style="display:none;">
                                <span class="${id}__spinner">
                                ${loadingSpinner}
                                </span>
                                <span class="${id}__spinner-text">Finding the best categories to explore</span>
                            </div>
                      </div>
                      <div class="${id}__modal-content">
                            <div class="${id}__step ${id}__step-one active">
                                <h2>Let’s help you find what you’re looking for</h2>
                                <h3>Are you looking to buy for</h3>
                                <div class="${id}__options-list">
                                    ${categoryData
                                      .map((item, index) => {
                                        return `<div class="${id}__option ${index === 0 ? 'active' : ''}" data-attr="${
                                          item.reason
                                        }" tabindex="0" role="button" aria-label="${item.reason}">${item.reason}</div>`;
                                      })
                                      .join('\n')}
                                </div>
                                <button class="${id}__next-btn" disabled>Next</button>
                            </div>
                            <div class="${id}__step ${id}__step-two">
                                <h3>Which trade do you work in?</h3>
                                <div class="${id}__options-list">
                                </div>
                            </div>
                            <div class="${id}__step ${id}__step-three">
                                <h3>What are you working on?</h3>
                                 <div class="${id}__options-list">
                                </div>
                            </div>
                             <div class="${id}__step ${id}__step-four">
                               
                                <h3>We recommend exploring</h3>
                                <div class="${id}__optionsWrapper">
                                    <div class="${id}__options-list">
                                    </div>
                                    <div class="${id}__search-container">
                                        <p class="search-label">Find something else?</p>
                                        <div class="search-bar">
                                            <input type="text" placeholder="Search products" class="search-input" aria-label="Search products" />
                                            <button class="search-button" aria-label="Search">
                                                ${searchIcon}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                      </div>
                  </div>
              </div>
          `;
  return html.trim();
};

export default modal;
