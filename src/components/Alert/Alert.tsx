import React, { useEffect } from 'react';
import styles from './Alert.module.scss';

interface AlertProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className={`${styles.alert} ${styles[type]}`} onClick={onClose}>
      {message}
    </div>
  );
};

export default Alert;
