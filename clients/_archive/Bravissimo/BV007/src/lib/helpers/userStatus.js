/**
 * @desc Returns true or false, .e.g Logged in or not.
 */
const userStatus = () => {
  // On PLP when logged in, the DL has 'user' only when logged in.
  if (window.dataLayer[0] && window.dataLayer[0].user) {
    return true;
  } else {
    return false;
  }
};

export default userStatus;
