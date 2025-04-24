import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';

const { ID, VARIATION } = shared;

export const clickEvents = (loggedIn, adCard, el, elType) => {
  let userStatus = 'User is logged in';
  if (loggedIn == false) { userStatus = 'User is not logged in';}

  let userHasAdCard = 'User has Ad Card';
  if (adCard == false) { userHasAdCard = 'User does not have Ad Card';}
  
  el.addEventListener('click', (e) => {
    fireEvent(`Click - ${elType} - ${userStatus} - ${userHasAdCard}`);
  });
}