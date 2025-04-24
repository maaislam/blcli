export default () => {
  if (document.querySelector('#ddlRegion').value === '') {
    document.body.classList.add('NH055-results');
    // allow the cookie message to be closed
    const cookieMessage = document.querySelector('#cookieMsgAlert');
    cookieMessage.querySelector('.close').addEventListener('click', () => {
      cookieMessage.remove();
    });
  }
};
