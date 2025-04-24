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

    disableScroll();
    document.addEventListener('keydown', onKeyDown);

    // Clear things up when unmounting this component
    return () => {
      enableScroll();
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  return (
    <div id="modal-react">
      <div
        onClick={onRequestClose}
        role="button"
        tabIndex="0"
        className="modal__backdrop"
      >
        <div className="modal__container">
          <div className="modal__header">
            <div
              className="close-btn"
              onClick={onRequestClose}
              role="button"
              tabIndex="0"
            >
              &times;
            </div>
            <div className="BlackFridayBanner--NotLoggedIn">
              <div className="Pointer--NotLoggedIn">
                <span className="BlackFridayBanner__Text-Container">
                  <span className="BlackFridayBanner_Icon" />
                  <span className="BlackFridayBanner__Text">
                    UP to 25% off this Black friday for travis perkins account
                    holders only
                  </span>
                </span>
              </div>
            </div>
            <div className="BlackFridayBanner__SecondText">
              Please login or sign up to create an online account to access this
              discount
            </div>
            <div className="button-area">
              <a href="/login"> Login</a>
              <a href="/create-account/cash">Sign up for online account</a>
            </div>
            <div
              className="cancel-button"
              onClick={onRequestClose}
              role="button"
              tabIndex="0"
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalComponent = (props) => {
  const { title } = props;
  const [isModalOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    fireEvent('CTA Clicked');
    setModalIsOpen(!isModalOpen);
  };

  return (
    <Fragment>
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      <div className="BlackFridayBanner-PDP--LoggedIn">
        <div className="Pointer-PDP--LoggedIn">
          <span className="BlackFridayBanner__Text-Container">
            <span className="BlackFridayBanner__Text">
              <button
                onClick={toggleModal}
                type="button"
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                }}
              >
                {title}
              </button>
            </span>
          </span>
        </div>
      </div>
    </Fragment>
  );
};
