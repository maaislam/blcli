import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import { nthDay } from '../../../../../../lib/utils';

const Modal = ({ id, children, onClose, day }) => {
  const modalRoot = document.getElementById(`${id}-modal`);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  if (!modalRef.current) {
    modalRef.current = document.createElement('div');
  }

  useEffect(() => {
    modalRoot.appendChild(modalRef.current);
    return () => modalRoot.removeChild(modalRef.current);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        onClose(e);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  return createPortal(
    <div className={`${id}-modal`}>
      <div className={`${id}-modal-container`} ref={contentRef}>
        <div className={`${id}-modal-close-bar`}>
          <p>
            On the {day}
            {nthDay(day)} day of Christmas No7 gave to you - 10% Off
          </p>
          <button className={`${id}-modal-close`} onClick={onClose} type="button">
            <span>Close Modal</span>
          </button>
        </div>
        <div className={`${id}-modal-content`}>{children}</div>
      </div>
    </div>,
    modalRef.current
  );
};

export default Modal;
