import settings from '../../settings';
import { events } from '../../../../../../../lib/utils';

export default () => {
  // const { ID } = settings;

  const fileUpload = document.querySelector('#logo_uploadz');
  const imageDiv = document.createElement('div');
  imageDiv.classList.add(`${settings.ID}-image_uploaded`);

  document.querySelector('.WW006-file_icon').insertAdjacentElement('afterend', imageDiv);

  function handleFileSelect(evt) {
    const files = evt.target.files[0]; // FileList object
    const reader = new FileReader();
    // it’s onload event and you forgot (parameters)
    reader.onload = function (e) {
      const imageTitle = document.createElement('p');
      const image = document.createElement('img');
      const imageName = document.createElement('span');

      // add the image and the name
      image.src = e.target.result;
      imageName.textContent = files.name;
      imageTitle.textContent = 'Your upload:';

      imageDiv.innerHTML = '';
      imageDiv.appendChild(imageTitle);
      imageDiv.appendChild(image);
      imageDiv.appendChild(imageName);
      events.send('WW006', 'Click', 'Upload a new logo', { sendOnce: true });
    };
    // you have to declare the file loading
    reader.readAsDataURL(files);
  }
  fileUpload.addEventListener('change', handleFileSelect, false);
};
