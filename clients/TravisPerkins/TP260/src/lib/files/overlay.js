import { padlockIcon } from './data';

export const overlay = (id, page_name) => {

    const htmlStr = `
    <div class="${id}__trade-overlay-wrapper ${page_name}">
        <div class="${id}__trade-overlay">
            <div class="padlock-image">${padlockIcon()}</div>
            <div class="trade-copy line01">Continue with an account to see prices</div>
            <div class="log-in-btn custom-btn">
                <a href="https://www.travisperkins.co.uk/login">Login</a>
            </div>
            <div class="trade-copy line02">or</div>
            <div class="create-account-btn custom-btn">
                <a href="https://www.travisperkins.co.uk/content/create-account">Create an Account</a>
            </div>
            <div class="trade-copy line03">Creating an account only takes a minute, and will let you access trade rates.
            </div>
            <div class="DIY-user-btn">See prices as a DIY user</div>
        </div>
    </div>`;

    return htmlStr.trim();
};