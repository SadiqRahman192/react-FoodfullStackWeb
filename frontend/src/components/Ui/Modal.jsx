import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose, open, className = "" }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open && modal) {
      modal.showModal();
    } else if (modal) {
      modal.close();
    }
    return () => {
      if (modal) modal.close();
    };
  }, [open]);

  const handleBackdropClick = (event) => {
    if (event.target === dialog.current) {
      onClose();
    }
  };

  return createPortal(
    <dialog
      ref={dialog}
      className={`modal ${className}`}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}