import addModalProduct from './addModalProduct';
import buildConsumablesMarkup from './buildConsumablesMarkup';

const handleModalChange = () => {
    addModalProduct();
    const consumablesMarkup = buildConsumablesMarkup();
    const modalConsumables = document.querySelector('.modal #pnlConsumables');
    modalConsumables.insertAdjacentHTML('afterbegin', consumablesMarkup);
};

export default handleModalChange;