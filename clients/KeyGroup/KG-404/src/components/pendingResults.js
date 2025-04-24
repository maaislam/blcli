import { star, trustpilotLogo } from '../assets/svg';

const pendingResults = (id) => {
  const htmlStr = `<div class="${id}__pendingResults-form ${id}__pendingResults">
        <div class="${id}__loaderWrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="none" color="#0B6027">
                <defs>
                    <linearGradient id="spinner-secondHalf">
                    <stop offset="0%" stop-opacity="0" stop-color="currentColor"></stop>
                    <stop offset="100%" stop-opacity="0.5" stop-color="currentColor"></stop>
                    </linearGradient>
                    <linearGradient id="spinner-firstHalf">
                    <stop offset="0%" stop-opacity="1" stop-color="currentColor"></stop>
                    <stop offset="100%" stop-opacity="0.5" stop-color="currentColor"></stop>
                    </linearGradient>
                </defs>

                <g stroke-width="8">
                    <path stroke="url(#spinner-secondHalf)" d="M 4 100 A 96 96 0 0 1 196 100"></path>
                    <path stroke="url(#spinner-firstHalf)" d="M 196 100 A 96 96 0 0 1 4 100"></path>

                    <!-- highlight-start -->
                    <!-- 1deg extra path to have the round end cap -->
                    <path stroke="currentColor" stroke-linecap="round" d="M 4 100 A 96 96 0 0 1 4 98"></path>
                    <!-- highlight-end -->
                </g>

                <!-- highlight-start -->
                <animateTransform from="0 0 0" to="360 0 0" attributeName="transform" type="rotate" repeatCount="indefinite" dur="1300ms"></animateTransform>
                <!-- highlight-end -->
            </svg>
        </div>

        <div class="${id}__loading-message">
            Your results will be here in a few seconds.<br>
            <b>Please don't refresh the page.</b>
        </div>

        <div class="${id}__progressBars">
            <div class="progressBar-item">
                <div class="progressBar-item-title">Checking details</div>
                <div class="${id}__progress">
                    <div class="progress-bar-container">
                        <div class="${id}__progress-bar"></div>
                    </div>
                    <span class="form__field-icon   form__field-icon--success"></span>
                </div>
            </div>
            <div class="progressBar-item ${id}__calculating-release">
                <div class="progressBar-item-title">Calculating release</div>
                <div class="${id}__progress">
                    <div class="progress-bar-container">
                        <div class="${id}__progress-bar"></div>
                    </div>
                    <span class="form__field-icon   form__field-icon--success"></span>
                </div>
            </div>
            <div class="progressBar-item">
                <div class="progressBar-item-title">Getting results</div>
                <div class="${id}__progress">
                    <div class="progress-bar-container">
                        <div class="${id}__progress-bar"></div>
                    </div>
                    <span class="form__field-icon   form__field-icon--success"></span>
                </div>
            </div>
        </div>

        <div class="${id}__pendingResults-footer">
            <div class="${id}__pendingResults-footer-text">
                <b>Did you know?</b><br>
                <span>Equity release can only be taken out following specialist advice. Our advice is unique to you and if equity release isn't right for you, we'll tell you.</span>
            </div>
            <div class="${id}__footer-trustpilot">
                <div class="${id}__trustpilot-logo">
                    ${trustpilotLogo}
                </div>
                <div class="${id}__trustpilot-rating-star">
                    <span>${star}</span>
                    <span>${star}</span>
                    <span>${star}</span>
                    <span>${star}</span>
                    <span>${star}</span>
                </div>
                <div class="${id}__trustpilot-score">
                    <span id="reviews-summary" class="tp-widget-businessinfo">
                        <span aria-hidden="true" class="tp-widget-businessinfo__trustscore">TrustScore 
                        <strong id="trust-score">4.8</strong> |
                        </span>
                        <span class="tp-widget-businessinfo__total">
                        <strong id="businessEntity-numberOfReviews-total">17,514</strong>
                        <span id="translations-reviews">reviews</span></span>
                    </span>
                </div>
            </div>
            
        </div>
    </div>`;

  return htmlStr;
};
export default pendingResults;
