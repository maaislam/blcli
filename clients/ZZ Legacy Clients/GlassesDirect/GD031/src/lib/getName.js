export default (cb) => {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://www.glassesdirect.co.uk/account/my-details/', true);

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      const data = request.responseText;
      const div = document.createElement('div');
      div.innerHTML = data;
      const nameInput = div.querySelector('.details-sidebar.content-block input#id_signup-first_name');
      if (nameInput) {
        const name = nameInput.value;
        cb(name);
      }
    } else {
      // We reached our target server, but it returned an error
      console.error('could not retrieve name');
    }
  };

  request.onerror = () => {
    // There was a connection error of some sort
  };

  request.send();
};
