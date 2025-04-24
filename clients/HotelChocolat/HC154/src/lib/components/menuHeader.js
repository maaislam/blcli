import { Close } from './icons';

export const Header = (id) => {
  return `
        <div class="${id}__menu-header">
            <div class="${id}__header-wrapper">
                <div class="${id}__title">menu</div>
                <div class="menu-close-icon">
                    ${Close()}
                </div>
            </div>
            
        </div> 
    `;
};
