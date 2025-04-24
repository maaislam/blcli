import container from '../components/deliveryModal';
import gifitingModal from '../components/gifitingModal';
import paymentModal from '../components/paymentModal';

const renderFeatureDetails = (ID) => {
  const modalContainers = `
        <div class="${ID}__modalContainers">
            <div class="${ID}__modal-overlay"></div>
            <div class="${ID}__modalWrapper">
                ${container}
                ${gifitingModal(ID)}
                ${paymentModal(ID)}
            </div>
        </div>`;

  if (!document.querySelector(`.${ID}__modalContainers`)) {
    document.body.insertAdjacentHTML('beforeend', modalContainers);
  }
};
export default renderFeatureDetails;
