const searchHTML = `
    <div class="AC018_search-wrap clearfix">
        <section class="AC018_search-refine">
            <h2>Refine</h2>
            <div class="AC018_refine-wrap">
                <h3 class="AC018_results-header"><span></span> Recruitment Agencies Found</h3>
                <div class="AC018_location-check">
                    <label><span></span> <a class="AC018_location-remove"></a></label>
                </div>
                <div class="AC018_refine-inner">
                    <h3>1. What are your looking for?</h3>
                    <div class="AC018_looking-for">
                        <div class="AC018_refine_radio-wrap AC018_all-option AC018_active">
                            <p>All</p>
                        </div>
                        <div class="AC018_refine_radio-wrap AC018_emp-option">
                            <p>Looking to hire staff</p>
                        </div>
                        <div class="AC018_refine_radio-wrap AC018_cnd-option">
                            <p>Looking for a job</p>
                        </div>
                    </div>
                    <h3>2. Select an industry</h3>
                    <div class="AC018_industry AC018_select">
                        <span></span>
                        <select>
                            <option>Please select an Industry</option>
                        </select>
                    </div>
                    <h3>3. Select an sub-industry</h3>
                    <div class="AC018_sub-industry AC018_select">
                        <span></span>
                        <select>
                            <option>Main Industry Only</option>
                        </select>
                    </div>
                    <a class="AC018_refine-cta">Refine</a>
                    <div class="AC018_refine-error">Please select a main industry to refine</div>
                </div>
            </div>
        </section>
        <section class="AC018_search-results clearfix">
            <div class="AC018_order-by">
                <h3>Order results by:</h3>
                <div class="AC018_order_radio-wrap">
                    <div class="AC018_order_radio AC018_special-option">
                        <p>Specialists <span>(Location not important Recommended)</span></p>
                    </div>
                    <div class="AC018_order_radio AC018_cover-option AC018_active">
                        <p>Location <span>(Agencies who cover this location)</span></p>
                    </div>
                </div>
            </div>
            <div class="AC018_results-wrap">
                <div class="AC018_pre-load">
                    <div class="AC018_loader-wrapper">
                        <div class="AC018_loader">
                            <div class="AC018_roller"></div>
                            <div class="AC018_roller"></div>
                        </div>
                        <div class="AC018_loader">
                            <div class="AC018_roller"></div>
                            <div class="AC018_roller"></div>
                        </div>
                        <div class="AC018_loader">
                            <div class="AC018_roller"></div>
                            <div class="AC018_roller"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
`;

export default searchHTML;