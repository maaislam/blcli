/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */
import { Fragment, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { fireEvent } from '../../../../../../../core-files/services';

import { disableScroll, enableScroll } from '../disableScroll';

export const Modal = ({ onRequestClose }) => {
  // Use useEffect to add an event listener to the document
  useEffect(() => {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        // Close the modal when the Escape key is pressed
        onRequestClose();
      }
    }

    //disableScroll();
    enableScroll();
    document.addEventListener('keydown', onKeyDown);

    // Clear things up when unmounting this component
    return () => {
      enableScroll();
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  return (
    <div id='modal-react'>
      <div className=''>
        <div className=''>
          <div className='modal__header'>
            <h3 className='modal__title'>Apply Today</h3>
            {/* <div
              className="close-btn"
              onClick={onRequestClose}
              role="button"
              tabIndex="0"
            >
              &times;
            </div> */}
          </div>
          <p className='modal__para'>
            It is illegal for a promoter or a participant in a trading scheme to persuade anyone to make a payment by promising
            benefits from getting others to join a scheme. Do not be misled by claims that high earnings are easily achieved
          </p>
          <iframe
            className='shopify-bar-wrapper'
            src='https://rep.avon.uk.com/REPSuite/becomeARepShopify.page?userName=nickibrian&prpRef=nbreppage&testvar=illustration'
            title='Become a rep form'
            // style={{ width: '100%', border: 'none',height: '1780px' }}
          />
        </div>
      </div>
    </div>
  );
};

export const ModalComponent = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    fireEvent('CTA Clicked');
    const elmnt = document.getElementById('modal-react');
    elmnt.scrollIntoView();
    //setModalIsOpen(!isModalOpen);
    //location.href = 'https://rep.avon.uk.com/REPSuite/becomeARepShopify.page?userName=nickibrian&prpRef=nbreppage&testvar=illustration'
  };

  return (
    <Fragment>
      {/* {isModalOpen && <Modal onRequestClose={toggleModal} />} */}

      <button onClick={toggleModal} type='submit' className='btn btn-primary'>
        Apply Now
      </button>
      {/* <Modal onRequestClose={toggleModal} /> */}
    </Fragment>
  );
};
export const ModalComponentExtra = () => {
  const toggleModal = () => {
    fireEvent('CTA Clicked');
    const elmnt = document.getElementById('modal-react');
    elmnt.scrollIntoView();
    //setModalIsOpen(!isModalOpen);
    //location.href = 'https://rep.avon.uk.com/REPSuite/becomeARepShopify.page?userName=nickibrian&prpRef=nbreppage&testvar=illustration'
  };
  return (
    <Fragment>
      {/* {isModalOpen && <Modal onRequestClose={toggleModal} />} */}
      <div className='AV093__sticky'>
        <button onClick={toggleModal} type='submit' className='btn btn-primary '>
          Apply Now
        </button>
      </div>
      {/* <Modal onRequestClose={toggleModal} /> */}
    </Fragment>
  );
};
