const loginHTML = `
    <div class="PD009_login-wrap">
        <h2>Login or Register</h2>
        <div class="PD009_login-input">
            <label>Email Address</label>
            <input type="email" />
            <a href="/login/pw/request" class="password-forgotten">Forgotten your password?</a>
        </div>
        <div class="PD009_log-in">
            <label>Password</label>
            <input type="password" />
        </div>
        <div class="PD009_signin-error">Your email and password are incorrect <br /> please try again</div>
        <div class="PD009_prev-customer">
            <h3>Have you ordered from us before?</h3>
            <div class="PD009_chk-wrap">
                <input type="radio" name="custType" id="PD009-yes" />
                <label for="PD009-yes">Yes, I have a password</label>
            </div>
            <div class="PD009_chk-wrap">
                <input type="radio" name="custType" id="PD009-no" />
                <label for="PD009-no">No, I'm new here</label>
            </div>
        </div>
        <div class="PD009_register">
        </div>
        <div class="PD009_submit-error">Please select an option</div>
        <a class="PD009_submit-btn">Continue</a>
        <div class="PD009_contact">Need Help? Call us on 0870 333 3081 Monday to Friday between 8:30am and 5:30pm</div>
    </div>
`;

export default loginHTML;
