import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';

// Components
import { Modal } from './Components/GLobal/Modal/index';
import { Button } from './Components/Global/Button/index';
import { ProductFinder } from './Components/ProductFinder/index';

// Utils

// Data
import { schema } from '../data';

export const App = () => {

  const [isModalOpen, setModalIsOpen] = useState(false);
  const WrappedModal = Modal(ProductFinder);

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };
  return (
    <Fragment>
      <Button className="product-finder__button" onClick={toggleModal}>
        Product Finder
      </Button>
      {isModalOpen && (
        <WrappedModal onRequestClose={toggleModal} data={schema} />
      )}
    </Fragment>
  );
};
