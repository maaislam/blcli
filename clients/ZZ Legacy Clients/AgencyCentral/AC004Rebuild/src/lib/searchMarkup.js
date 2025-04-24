const searchMarkup = `
    <section class="AC004_search_wrap">
        <h2 class="AC004_header">Recruitment Agency Search <span>- Improve your results by refining your search</span> <i class="fa fa-search"></i></h2>
        <div class="AC004_col-wrap clearfix">
            <div class="AC004_inner-col">
                <div class="AC004_user-type clearfix">
                    <h3>I am:</h3>
                    <div class="AC004_cand-user" data-option="cnd">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 27" version="1.1">
                                <g id="Search-Bar-Update" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="1.1-Search-Bar-Update---Portrait-Tablet-(970-or-below)" transform="translate(-66.000000, -1119.000000)" fill="#136CAA">
                                        <g id="Group-Copy-3" transform="translate(29.000000, 986.000000)">
                                            <g id="Input-Background-Copy-5-+-profile-icon-+-arrow-icon" transform="translate(17.000000, 119.000000)">
                                                <path d="M29.2681605,14 C26.3668413,14 23.8471606,16.3739176 23.8471606,19.1073959 C23.8471606,21.8408742 26.3668413,24.2147918 29.2681605,24.2147918 C32.1694796,24.2147918 34.6891604,21.8408742 34.6891604,19.1073959 C34.6891604,16.3739176 32.1694796,14 29.2681605,14 Z M26.4770047,25.798871 C22.9622926,26.9805868 20.2331606,30.4943743 20.2331606,36.3402336 C20.2331606,41.3592126 38.3031603,41.3592126 38.3031603,36.3402336 C38.3031603,30.6112753 35.6820871,27.1220514 32.2692118,25.8725619 C32.0340916,26.1957456 31.6584976,26.5241926 31.2545669,26.8161213 C30.4830507,27.3737113 29.6081568,28.4196107 29.4112674,28.4196107 C29.0992795,28.4196107 27.0848861,26.9078499 26.4770047,25.798871 Z" id="candidate-icon"/>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>            
                        </span>
                        <p>Looking<br /> for a job</p>
                    </div>
                    <div class="AC004_emp-user" data-option="emp">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 46" version="1.1">
                                <g id="Search-Bar-Update" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="1.1-Search-Bar-Update---Portrait-Tablet-(970-or-below)" transform="translate(-93.000000, -2530.000000)" fill="#136CAA">
                                        <g id="Rectangle-185-Copy-+-I’m-an-employer-+-profile-icon-+-Rectangle-185-Copy-+-I’m-an-employer-+-profile-icon-Copy-+-Rectangle-185-Copy-+-I’m-an-employer-+-profile-icon-Copy-Copy" transform="translate(46.000000, 2510.000000)">
                                            <g id="Rectangle-185-Copy-+-I’m-an-employer-+-profile-icon">
                                                <path d="M61.2500195,39.9500273 C57.1745139,39.9329273 48.1243265,41.2311041 48.1243265,41.2311041 C48.1243265,41.2311041 47,51.5908683 47,58.0703522 C47,68.1109159 75.5000391,68.1109159 75.5000391,58.0703522 C75.5000391,51.4298431 73.971012,41.0871789 73.971012,41.0871789 C73.971012,41.0871789 64.7939994,39.9657024 61.2500195,39.9500273 M69.8000312,28.5500117 C69.8000312,23.9729054 65.8271258,20 61.2500195,20 C56.6729133,20 52.7000078,23.9729054 52.7000078,28.5500117 C52.7000078,33.127118 56.6729133,37.1000234 61.2500195,37.1000234 C65.8271258,37.1000234 69.8000312,33.127118 69.8000312,28.5500117 M61.6526019,38.3701953 C60.0231656,38.3701953 56.9750137,38.5809158 56.9750137,38.5809158 L60.4385189,42.6159617 L62.7745162,42.6159617 L65.9623738,38.5809158 C65.9623738,38.5809158 63.0189524,38.3701953 61.6526019,38.3701953 Z M60.3893073,43.2900459 L57.5783239,61.1355077 L61.5666499,64.5974556 L65.5549759,61.2678809 L62.8218591,43.2900459 L60.3893073,43.2900459 Z" id="employer-icon"/>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </span>
                        <p>Looking to<br /> hire staff</p>
                    </div>
                    <span class="AC004_error-text">Please select a user type.</span>
                </div>
                <div class="AC004_ind-wrap">
                    <h3>In Industry:</h3>
                    <span><img src="//useruploads.visualwebsiteoptimizer.com/useruploads/328729/images/a29ecd082b32e2a384bf9226bcb799bc_noun_1073288_cc_copy.png" /></span>
                    <span class="AC004_pre_selected_ind">Please select an industry</span> 
                    <span class="AC004_error-text">Please select a industry.</span>
                </div>
                <div class="AC004_location-wrap"> 
                    <h3>Location:</h3>
                </div>
            </div>
            <div class="AC004_inner-col">
                <div class="AC004_order-wrap">
                    <h3>Order Results By:</h3>
                    <div class="AC004_cover_location AC004_active" data-option="covers">Agencies who cover this location</div>
                    <div class="AC004_specialist" data-option="standard">Specialists (Location not important)</div>
                    <div class="AC004_cover-other_location" data-option="distance">Agencies nearest to your location</div>
                </div>
                <a class="AC004_search-btn">Search Agencies</a>
            </div>
        </div>
    </section>
`;

export default searchMarkup;
