const getUserStatus = () => {
  if (window.dataLayer[1] && window.dataLayer[1].visitorLoginState) {
    return window.dataLayer[1].visitorLoginState;
  }
};

export default getUserStatus;
