import AuthButton from '@/atoms/AuthButton';
import React, { useEffect, useState } from 'react';
import styles from '../styles/home.module.css';
import Link from 'next/link';

interface HeaderProps {
  isLoggedIn: boolean;
  openModal: () => void;
  handleLogout: () => void;
}

const Header= ({ isLoggedIn, openModal, handleLogout }:HeaderProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (

    <nav className="relative top-0 left-0 flex justify-between items-center sticky px-4 py-2 text-white">
      <div className="flex items-center">
        <img src="/images/icons8-island-64.png" alt="Logo" className="h-8 mr-2" />
        <h1 className={`text-lg font-bold ${styles.ItaFont}`}>ROAMLY</h1>
      </div>
      {isMobile ? (
          <></>
        ) : (
          <div className="hidden md:flex space-x-4">
            <Link href="#services">
              Services
            </Link>
            <Link href="#packages">
              Packages
            </Link>
            <Link href="#news">
              News
            </Link>
          </div>
        )}

        <div>
        {isLoggedIn ? (
          <AuthButton onClick={handleLogout} text="Sign out" />
        ) : (
          <AuthButton onClick={openModal} text="Login" />
        )}
      </div>
    </nav>
  );
};

export default Header;
