import React from 'react';
import classes from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  className = '',
  overlayClassName = '',
}: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`${classes.overlay} ${overlayClassName}`} onClick={handleOverlayClick}>
      <div className={`${classes.modal} ${className}`}>{children}</div>
    </div>
  );
};

export default Modal;
