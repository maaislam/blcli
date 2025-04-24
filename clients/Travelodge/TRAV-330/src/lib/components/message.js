import { tickIcon } from '../assets/icons';

const message = (id, roomType) => {
  const html = `
        <div class="${id}__message">
            <h2>You’d be booking:</h2>
            <ul class="${id}__message-list">
                <li class="${id}__message-item">
                    <span class="${id}__icon">${tickIcon}</span>
                    <span class="${id}__text">${roomType}</span>
                </li>
                <li class="${id}__message-item">
                    <span class="${id}__icon">${tickIcon}</span>
                    <span class="${id}__text">Saver rate</span>
                </li>
                <li class="${id}__message-item ${id}__price">
                    <span class="${id}__icon">${tickIcon}</span>
                    <span class="${id}__text"></span>
                </li>
            </ul>
        </div>
    `;
  return html.trim();
};

export default message;
