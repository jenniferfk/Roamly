import React, { useState } from 'react';
import styles from '../styles/home.module.css';
import { useDispatch } from 'react-redux';
import { clearAccessToken, clearRefreshToken } from '@/app/redux/slices/authSlice';
import LoginForm from '../molecules/LoginForm';
import SignupForm from '../molecules/SignUpForm';
import NewsContent from '../organisms/NewsContent';
import Destinations from '../organisms/Destinations';
import Footer from '../organisms/Footer';
import Header from '@/organisms/Header';
import Services from '@/organisms/Services';

const MobileContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('login');
  const dispatch = useDispatch();

  const handleLogout=()=>{
    dispatch(clearAccessToken())
    dispatch(clearRefreshToken())
    localStorage.removeItem('accessToken'); 
    localStorage.removeItem('refreshToken'); 
    localStorage.removeItem('isAuthenticated'); 
    setIsLoggedIn(false);
  }
  const openModal=()=>{
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleTabChange = (tab:any) => {
    setSelectedTab(tab);
  };
  return(
  <div className="overflow-y-hidden">
    <div className={` h-screen flex flex-col  ${styles.phonebg}`}>
    <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} openModal={openModal}/>
    <div className="md:w-1/2 text-white text-center relative px-4 md:px-0 md:py-16 top-1/4">
        <h1 className="animate-pulse custom-font text-3xl md:text-5xl font-bold mb-4">Welcome to ROAMLY!</h1>
        <p className="custom-font text-lg md:text-base mb-4 mx-auto md:w-96 lg:w-full">Discover new destinations and plan unforgettable journeys with ease!</p>
        <img src="/paperPlane.png" alt="Paper Plane" className=" inset-0 m-auto" />
        <a href="#services" className="arrow-down"></a>
    </div>
    <a href="#next" className="absolute  self-center  bottom-0 mx-auto mb-8">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white animate-bounce" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 17a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 14.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 17z" clipRule="evenodd" />
      </svg>
    </a>
    </div>
{isModalOpen && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
       <div className="bg-white p-4 md:p-8 rounded-lg w-full max-w-md"> 
         <h2 className="text-2xl font-bold mb-4">Login / Sign Up Form</h2>
         <div className={styles.login_register}>
           <a onClick={() => handleTabChange('login')} className={selectedTab === 'login' ? `${styles.login} ${styles.active}` : styles.login}>Login</a>
           <a onClick={() => handleTabChange('signup')} className={selectedTab === 'signup' ? `${styles.register} ${styles.active}` : styles.register}>Signup</a>
         </div>
         {selectedTab === 'login' ? <LoginForm /> : <SignupForm/>}
         <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-4">Close</button>
       </div>
     </div>
      )}
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
);
}
export default MobileContent;