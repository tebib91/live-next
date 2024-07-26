'use client';
import styles from '@/assets/styles/Modal.module.css';

const Modal = ({ onClose, children, title }: any) => {
  const handleCloseClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <div className={styles.modal_overlay}>
      {/* Wrap the whole Modal inside the newly created StyledModalWrapper
            and use the ref */}
      <div className={styles.modal_wrapper}>
        <div className={styles.modal}>
          <div className={styles.modal_header}>
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div>
          {title && <h1>{title}</h1>}
          <div className={styles.modal_body}>{children}</div>
        </div>
      </div>
    </div>
  );
  return modalContent;
};
export default Modal;
