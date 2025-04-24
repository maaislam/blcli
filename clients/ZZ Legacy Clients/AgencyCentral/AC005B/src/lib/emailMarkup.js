var emailModalMarkup = `
    <div class="AC005B_pop-up_modal">
        <div class="AC005B_body_click"></div>
        <div class="AC005B_inner_div">
            <a href="#" class="AC005B_close_btn">X</a>
            <div class="AC005B_loader-wrapper">
                <div class="AC005B_loader">
                    <div class="AC005B_roller"></div>
                    <div class="AC005B_roller"></div>
                </div>
                <div id="AC005B_loader2" class="AC005B_loader">
                    <div class="AC005B_roller"></div>
                    <div class="AC005B_roller"></div>
                </div>
                <div id="AC005B_loader3" class="AC005B_loader">
                    <div class="AC005B_roller"></div>
                    <div class="AC005B_roller"></div>
                </div>
            </div>
            <div class="AC005B_loaded-wrapper">
                <div class="AC005B_overflow_fix">
                    <div class="AC005B_logo"></div>
                    <h2>Contact <span class="AC005B_recruitment-name"></span></h2>
                    <div>Branch: <span class="AC005B_branch-name"></span></div>
                    <div class="AC005B_email-form">
                        <h3>1. Are you looking to hire or for a job?</h3>
                        <div class="AC005B_radio-wrap">
                            <div class="AC005B_input_radio">
                                <input type="radio" id="hireRadio" name="jobhire" value="hire">
                                <label for="hireRadio">Looking to hire staff</label>
                            </div>
                            <div class="AC005B_input_radio">
                                <input type="radio" id="findRadio" name="jobhire" value="find">
                                <label for="findRadio">Looking for a job</label>
                            </div>
                        </div>
                        <div class="AC005B_form-wrap clearfix">
                            <div>
                                <h3>2. Your Details</h3>
                                <div class="AC005B_input-outer">
                                    <input class="AC005B_email-input" type="email" placeholder="Email Address" />
                                    <span class="AC005B_error-msg">Please make sure your Email is correct</span>
                                </div>
                                <div class="AC005B_input-outer">
                                    <input class="AC005B_company-input" type="text" placeholder="Company Name" />
                                    <span class="AC005B_error-msg">Please enter a Company Name</span>
                                </div>
                                <div class="AC005B_input-outer">
                                    <input class="AC005B_name-input" type="text" placeholder="Contact Name" />
                                    <span class="AC005B_error-msg">Please enter a Contact Name</span>
                                </div>
                                <div class="AC005B_input-outer">
                                    <input class="AC005B_tele-input" type="tel" placeholder="Telephone Number" />
                                    <span class="AC005B_error-msg">Please make sure your Number is correct</span>
                                </div>
                                <div class="AC005B_input-outer">
                                    <select class="AC005B_employ">
                                        <option value="" disabled="" selected="selected">Employment type</option>
                                        <option value="permanent">Permanent</option>
                                        <option value="temp">Temp</option>
                                        <option value="contract">Contract</option>
                                        <option value="temp-to-perm">Temp to Perm</option>
                                    </select>
                                    <span class="AC005B_error-msg">Please select an option</span>
                                </div>
                            </div>
                            <div>
                                <h3>3. Your Enquiry</h3>
                                <div class="AC005B_input-outer">
                                    <textarea rows="5" placeholder="Enquiry" />
                                    <span class="AC005B_error-msg">Please enter an Enquiry</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="AC005B_submit-form">Send Email</a>
                    <div class="AC005B_input_chk AC005B_email-sent">
                        <label>Receive confirmation that this email has been sent.</label>
                        <input type="checkbox" />
                    </div>
                    <div class="AC005B_input_chk AC005B_newsletter">
                        <label>Subscribe to our newsletter to keep abreast of the latest news from Agency Central</label>
                        <input type="checkbox" />
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

export default emailModalMarkup