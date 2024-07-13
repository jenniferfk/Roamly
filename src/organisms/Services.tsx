import React, { useEffect, useState } from 'react';
import styles from '../styles/home.module.css';
import PlaneIcon from '../../public/Icons/PlaneIcon';
import HotelServices from '../../public/Icons/HotelServies';
import NewsIcon from '../../public/Icons/NewsIcon';
const Services = () => {
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
    <>
      <div>
      <div className="flex flex-col items-center justify-center mx-4">
    <h1 className={`text-3xl font-bold mb-4 ${styles.ItaFont}`}>Our Services</h1>
    </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-md mr-4 text-center flex flex-col items-center justify-center">
        <PlaneIcon/>
        <h3 className="text-xl font-semibold mb-4">Flight Booking</h3>
        <p className="text-gray-700">We provide you with flight packages that you can choose from. Whether it's a domestic or international trip, we've got you covered with competitive prices and a wide range of options.</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-md mr-4 text-center flex flex-col items-center justify-center">
        <HotelServices/>
        <h3 className="text-xl font-semibold mb-4">Hotel Reservations</h3>
        <p className="text-gray-700">Find the perfect accommodation for your trip with our hotel reservation service. From budget-friendly options to luxury resorts, we have something for every traveler's needs and preferences.</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-md text-center flex flex-col items-center justify-center">
        <NewsIcon/>
        <h3 className="text-xl font-semibold mb-4">Global News and Safe Travel</h3>
        <p className="text-gray-700">Stay informed with the latest global news while planning your journey with us. Explore fascinating destinations, immerse yourself in local cultures, and rest assured that your safety is our top priority with our expertly crafted itineraries.</p>
    </div>

        </div>

      </div>
    </>
  );
};

export default Services;
