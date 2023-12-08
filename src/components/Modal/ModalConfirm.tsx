import React from "react";
import styles from "./ModalConfirm.module.scss";
import layoutStyles from "../Layout/Layout.module.scss";

interface ModalConfirmProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  show,
  onClose,
  onConfirm,
  children,
}) => {
  if (!show) {
    return null;
  }

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={stopPropagation}>
        {children}
        <div className={styles.buttonContainer}>
          <button
            onClick={onClose}
            className={`${layoutStyles.button} ${layoutStyles.secondary}`}
          >
            Cancelar
          </button>
          <button onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
