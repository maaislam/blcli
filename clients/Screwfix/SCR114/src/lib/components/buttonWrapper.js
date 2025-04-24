import spinButton from './spinButton';
import videoButton from './videoButton';

const buttonWrapper = (ID, video, spin) => {
  const html = `
    <div class="${ID}__buttonWrapper">
      ${spin ? spinButton(ID) : ''}
      ${video ? videoButton(ID) : ''}
    </div>
    `;
  return html;
};

export default buttonWrapper;
