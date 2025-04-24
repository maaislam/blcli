import activeAccount from './activeAccount';
import noAccount from './noAccount';
import onlyAccount from './onlyAccount';

const advantageCardWrapper = (id) => {
    const { userStatus } = window;

    const html = `
        <div class="${id}__advantageCardWrapper ${id}__hide">
            <div class="${id}__advantageCardInfo">
                ${userStatus === 'logged-out' ? noAccount(id) :
                    userStatus === 'adcard-view' ? activeAccount(id) :
                    userStatus === 'account-view' ? onlyAccount(id) : ''
                }
            </div>
            <div class='${id}__overlay'></div>
        </div>
    `;
    return html.trim();
};

export default advantageCardWrapper;
