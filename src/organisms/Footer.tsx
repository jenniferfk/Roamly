import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/home.module.css';
import TwitterIcon from '../../public/Icons/TwitterIcon';
import InstagramIcon from '../../public/Icons/InstagramIcon';
import FacebookIcon from '../../public/Icons/FacebookIcon';

export default function Footer() {
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
    <footer className={`${styles.phonebg}`}>
      <div className={isMobile ? "" : "flex justify-between p-8"}>
        <div className='ml-10'>
          <div className="flex justify-center">
            <img src="/images/icons8-island-64.png" alt="Logo" className="h-8 mr-2" />
            <h1 className={`text-lg font-bold text-white ${styles.ItaFont}`}>ROAMLY</h1>
          </div>
          <div className="justify-center items-center">
          <div className='text-center'><Link href="#services" className="self-center text-white mr-4">Services</Link></div>
         <div className='text-center'><Link href="#packages" className="text-center text-white mr-4">Packages</Link></div>
         <div className='text-center'><Link href="#news" className="self-center text-white mr-4">News</Link></div>
        </div>
        </div>

        <div>
        <p className="text-center mb-2 text-white">Once you choose your package, you can contact us here:</p>
            <p className="text-center mb-2 text-white">123 Street, Keserwan, Lebanon</p>
            <p className=" text-center mb-2 text-white">Phone: +96112345678</p>
            <p className="text-center mb-4 text-white">Email: roamly@info.com</p>
          </div>

  <div className="items-center">
  <div className="flex justify-center ml-10">
    <Link href="https://twitter.com" className="mr-6">
      <TwitterIcon/>
    </Link>
    <Link href="https://facebook.com" className="mr-4">
      <FacebookIcon/>
    </Link>
    <Link href="https://instagram.com">
      <InstagramIcon/>
    </Link>
  </div>
</div>

</div>

    </footer>
  );
}
