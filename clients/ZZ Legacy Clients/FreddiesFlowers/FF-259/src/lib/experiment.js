import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getCookie } from '../../../../../lib/utils';
import { renderNpsWidget } from './render-nps-widget';

const { ID, VARIATION } = shared;

const cookieStorage = `${ID}_feedback`;

export default () => {
    setup();

    // if (window.location.pathname !== '/konto/instrumententafel') return;

    fireEvent('Conditions Met');

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (VARIATION == 'control') return;

    if (getCookie(cookieStorage))
        return fireEvent(`${ID} - User already finished NPS.`);

    // Remove storage score after 24h
    if (
        localStorage.getItem(cookieStorage) &&
        !getCookie(`${cookieStorage}_step-1`)
    )
        localStorage.removeItem(cookieStorage);

    // Check and uodated sessions cound on sessionStorage and localStorage
    if (!sessionStorage.getItem(`${ID}-sessions_count`)) {
        sessionStorage.setItem(`${ID}-sessions_count`, 1);
        localStorage.setItem(
            `${ID}-sessions_count`,
            (localStorage.getItem(`${ID}-sessions_count`) ?
                Number(localStorage.getItem(`${ID}-sessions_count`)) :
                0) + 1
        );
    }

    const storage = localStorage.getItem(`${ID}-sessions_count`) || 0;

    // Display on the second session or more
    if (Number(storage) > 1) {
        renderNpsWidget();
    } else {
        fireEvent(`${ID} - User's first session, NPS is not displayed.`);
    }
};