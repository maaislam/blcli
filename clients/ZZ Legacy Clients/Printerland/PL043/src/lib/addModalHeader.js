import elements from './elements';

const addModalHeader = () => {
    elements.modalHeader.insertAdjacentHTML('afterbegin', `<i class="icon fas fa-check-circle"></i>`);
};

export default addModalHeader;