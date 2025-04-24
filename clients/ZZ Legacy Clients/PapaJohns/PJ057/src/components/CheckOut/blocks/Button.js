import settings from '../../../lib/settings';

const { ID } = settings;

function Button(opts) {
  const {
    type,
    content,
    target,
    action,
  } = opts;
  switch (type) {
    case '1':
      return `
      <div class="actionButtonWrap">
        <label for="${target}" class="actionButton continueToAddressBut">${content}</label>
      </div>
      `;
    case '2':
      return `
      <div class="actionButtonWrap">
        <a class="actionButton continueToAddressBut" href="${action}">${content}</a>
      </div>  
      `;
    case '3':
      return `
      
      `;
    default:
      break;
  }
}

export default Button;
