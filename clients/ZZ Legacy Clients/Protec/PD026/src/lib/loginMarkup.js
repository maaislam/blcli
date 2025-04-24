const loginHTML = `
    <div class="PD009_login-wrap">
        <div class="PD026_password-message">If you have entered a registered email address, you will shortly receive an email with a link to change your password</div>
        <h2 class="PD026_title"></h2>
        <div class="PD009_login-input">
            <label>Email Address</label>
            <input type="email" />
        </div>
        <div class="PD009_log-in">
            <label>Password</label>
            <input type="password" />
        </div>
        <div class="PD009_signin-error">
            Oops! Incorrect Email Address or Password<br /> note: email addresses and passwords are case sensitive
            <a href="/login/pw/request" class="PD026_forgot-password">Forgot Password?</a>
        </div>
        <div class="PD026_extra-options">
            <div class="PD026_remember">
              <span></span>
              <span>Remember me</span>
            </div>
            <a href="/login/pw/request" class="PD026_forgot-password">Forgot Password?</a>
        </div>
        <div class="PD026_login-options">
          <a class="PD026_login">Login</a>
          <a href="/login/pw/request" class="PD026_forgot-password">Don't have a password?</a>
          <a class="PD026_register">Register</a>
        </div>
        <div class="PD009_register">
          <p class="PD026_tagline">To purchase from Protec Direct, we must ask you to register and complete the below for health and safety purposes</p>
        </div>
        <div class="PD009_contact">Need Help? Call us on 0870 333 3081 Monday to Friday between 8:30am and 5:30pm</div>
    </div>
`;

export default loginHTML;
