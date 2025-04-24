/* eslint-disable react/display-name */
import { h } from 'preact';
import { useEffect } from 'preact/hooks';

export const Modal = (WrappedComponent) => ({ onRequestClose, data }) => {

  useEffect(() => {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        onRequestClose();
      }
    }

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  return (
    <div className="modal__backdrop">
      <div className="modal__container">
        <div className="modal__content">
          <WrappedComponent schema={data} />
        </div>
        <span className="modal__content__close" onClick={onRequestClose}>
          &#x292B;
        </span>
      </div>
    </div>
  );
};
