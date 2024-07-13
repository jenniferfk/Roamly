'use client'
import React, { useEffect, useState } from 'react';
import styles from '../styles/home.module.css';
import { useDispatch } from 'react-redux';
import { clearAccessToken, clearRefreshToken } from '@/app/redux/slices/authSlice';
import NewsContent from '../organisms/NewsContent';
import Destinations from '../organisms/Destinations';
import Footer from '../organisms/Footer';
import Header from '@/organisms/Header';
import LoginForm from '@/molecules/LoginForm';
import SignupForm from '@/molecules/SignUpForm';
import Services from '@/organisms/Services';

const DesktopContent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('login');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleTabChange = (tab:any) => {
    setSelectedTab(tab);
  };
  const handleLogout=()=>{
    dispatch(clearAccessToken())
    dispatch(clearRefreshToken())
    localStorage.removeItem('accessToken'); 
    localStorage.removeItem('refreshToken'); 
    localStorage.removeItem('isAuthenticated'); 
    setIsLoggedIn(false);
    window.location.reload();
  }
  
  const storedIsAuthenticated = typeof window !== 'undefined' ? localStorage.getItem('isAuthenticated') : null;

  useEffect(() => {
    if (storedIsAuthenticated) {
        closeModal(); 
        setIsLoggedIn(true);
    }
}, [storedIsAuthenticated]);
    return(
  <div>
    <div className={` relative flex flex-col h-screen ${styles.background}`}>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} openModal={openModal}/>
    <div id='home'className="md:w-1/2 text-white text-center relative px-4 md:px-0 md:py-16 top-1/4">
        <h1 className={`animate-pulse custom-font text-3xl md:text-5xl font-bold mb-4 ${styles.RegFont}`}>Welcome to ROAMLY!</h1>
        <p className={`custom-font text-lg md:text-base mb-4 mx-auto md:w-96 lg:w-full p-6 ${styles.RegFont}`}>Embark on a Journey of Discovery: Seamlessly Navigate Through Diverse Destinations, Secure Flights, and Stay Informed with the Latest Global News, Empowering Your Travel Plans with Unmatched Convenience and Insight!</p>
        <img src="/paperPlane.png" alt="Paper Plane" className=" inset-0 m-auto" />
    </div>
    
    <a href="#services" className="absolute bottom-0 left-1/2 justify-center bottom-0 mx-auto mb-8">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white animate-bounce" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 17a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 14.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 17z" clipRule="evenodd" />
      </svg>
    </a>
    {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Login / Sign Up Form</h2>
            <div className={styles.login_register}>
                <a onClick={() => handleTabChange('login')} className={selectedTab === 'login' ? `${styles.login} ${styles.active}` : styles.login}>Login</a>
                <a onClick={() => handleTabChange('signup')} className={selectedTab === 'signup' ? `${styles.register} ${styles.active}` : styles.register}>Signup</a>
            </div>
            {selectedTab === 'login' ? <LoginForm /> : <SignupForm />}
            <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-4">Close</button>
          </div>
        </div>
      )}
      </div>
      <div id='services'>
        <Services/>
      </div>
      <div id='packages'>
        <Destinations/>
      </div>
    <div id='news'>
      <NewsContent/>
    </div>
    <div>
      <Footer/>
    </div>
  </div>
  
    )
};

export default DesktopContent;
