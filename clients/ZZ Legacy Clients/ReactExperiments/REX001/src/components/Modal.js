import { h, render, Component } from 'preact';

const Modal = (props) => {
  return (
    <div class="modal">
      <div class="modal__inner">
        {props.children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  
};

export default Modal;
