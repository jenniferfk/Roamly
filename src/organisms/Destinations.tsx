import React, { useState, useEffect } from 'react';
import { Destination } from '../../pages/api/destinations';
import HotelIcon from '../../public/Icons/HotelIcon';
import StarIcon from '../../public/Icons/StarIcon';
import styles from '../styles/home.module.css';

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const openModal = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const closeModal = () => {
    setSelectedDestination(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/destinations');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDestinations(data.destinations);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='p-6'>
   <div className="flex flex-col items-center justify-center mx-4">
    <h1 className={`text-3xl font-bold mb-4 ${styles.ItaFont}`}>Choose Your Package</h1>
    </div>
    <ul className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      {destinations.map((destination) => (
        <li key={destination.id} className="relative">
        <button onClick={() => openModal(destination)}>
          <div className="relative">
          <img src={destination.image} alt={destination.country} className='cover w-72 h-52' />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-xl font-semibold mb-1">{destination.country}</h2>
              <p className="text-sm">${destination.price_per_person} per person</p>
            </div>
          </div>
          </button>
        </li>
      ))}
    </ul>
    {selectedDestination && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <h2 className="text-2xl font-bold mb-4">{selectedDestination.country}</h2>
            <img src={selectedDestination.image} alt={selectedDestination.country}/>
            <div className="flex items-center mb-4">
            <div className="w-6 h-6 mr-2">
                    <HotelIcon />
                </div> 
              <p className="text-sm"> {selectedDestination.hotel.name}</p>
            </div>
            <div className="flex items-center mb-4">
              {[...Array(selectedDestination.hotel.stars)].map((_, index) => (
                <StarIcon key={index} /> 
              ))}
            </div>
            <p className="text-sm mb-4">Duration: {selectedDestination.duration}</p>
            <p className="text-sm">{selectedDestination.description}</p>
            <button onClick={closeModal} className={` ${styles.closebttn} mt-4 text-white py-2 px-4 rounded`}>Close</button>
          </div>
        </div>
      )}
  </div>
  
  );
}
