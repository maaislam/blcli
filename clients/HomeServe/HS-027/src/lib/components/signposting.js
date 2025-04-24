import { listItem } from './listItem';
import { listArray } from '../data/listArray';
import { desktopImage, mobileImage } from '../assets/icons';

export const signposting = (id) => {
  const html = `
        <div class="${id}__signposting row">
            <div class="${id}__signposting-box">
                <div class="hidden-xs hidden-sm hidden-ms col-md-1">&nbsp;</div>
                <div class="${id}__signposting-wrapper">
                    
                    <div class="${id}__signposting-content">
                        <h2>Manage your cover online 24/7</h2>
                        <p>HomeServe customers can do all of this in a matter of minutes...</p>
                        <ul>
                            ${listArray.map((item) => listItem(id, item)).join('\n')}
                        </ul>
                        <div class="${id}__buttons">
                            <a class="${id}__buttons-login" href="/uk/loggedin/my-homeserve">Log in to MyHomeServe</a>
                            <a class="${id}__buttons-account" href="/customer">Create an account</a>
                        </div>
                    </div>
                    
                </div>
                <div class="${id}__signposting-image">
                    <div class="${id}__signposting-image-desktop">
                        ${desktopImage}
                    </div>

                    <div class="${id}__signposting-image-mobile">
                        ${mobileImage}
                    </div>
                </div>
            </div>
        </div>
    `;
  return html;
};
