import React from 'react';
import styles from './Header.module.scss';
import logoImage from '../../assets/logo.png';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src={logoImage} alt="Logo" className={styles.logo} />
      {/* Otros elementos del header */}
    </header>
  );
};

export default Header;