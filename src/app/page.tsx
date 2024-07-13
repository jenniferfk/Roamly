'use client'
import { useEffect, useState } from 'react';
import MobileContent from '../components/MobileContent';
import DesktopContent from '../components/DesktopContent';
import store from './redux/store';
import { Provider } from 'react-redux';
import Head from 'next/head';


export default function Home() {
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
    
      <Provider store={store}>
        {isMobile ? (
          <MobileContent />
        ) : (
          <DesktopContent />
        )}
      </Provider>
  );
}
