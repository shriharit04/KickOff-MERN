import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TurfGallery from '../components/TurfGallery';
import { BsPeople } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import BookingWidget from '../components/BookingWidget';

const ViewTurf = ({ turfs }) => {
  const { id } = useParams();
  const [turf, setTurf] = useState(null);

  useEffect(() => {
    const fetchTurfs = async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}guest/view/turf/${id}`);
      const json = await response.json();

      if (response.ok) {
        setTurf(json);
        console.log(json);
      }
    };

    fetchTurfs();
  }, [id]);

  if (!turf) {
    return <div className="text-white">Turf not found</div>;
  }

  return (
    <div className="mt-4 bg-gray-100 rounded-2xl border-blue-800 bottom-2 mx-4 md:mx-20 lg:mx-40 xl:mx-56 px-8 py-8 shadow-lg ">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-800 mb-2 font-mono ">{turf.name}</h1>
      <AddressLink>{turf.address}</AddressLink>

      <div className="flex flex-col md:flex-row justify-between gap-4 my-6">
        <TurfGallery turf={turf} className="w-full md:w-2/3 rounded-lg overflow-hidden shadow-lg z-10" />
        <div className="w-full md:w-1/3 flex flex-col justify-around p-4 rounded-lg shadow-md bg-gray-900 text-green-400 z-0 gap-3 relative">
          <div className="flex flex-col justify-top">
            <div className="text-base font-semibold flex items-center gap-2">
              <IoMdTime className="text-gray-400" /><span className="text-gray-400">{turf.open} - {turf.close}</span>
            </div>
            <div className="text-base font-semibold flex items-center text-gray-400 gap-2">
              <BsPeople /><span>{turf.maxPlayers}</span>
            </div>
            <div className="text-base font-semibold flex items-center text-gray-400 gap-2">
              <FaPhoneAlt /><span>{turf.contactNo}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 relative">
            <button className="justify-end px-4 py-2 right-0 left-0 w-fit rounded-lg shadow-md secondary max-w-sm mx-auto">Price: ₹{turf.price} /hour</button>
          </div>
        </div>
      </div>

      <div className="bg-blue-400 -mx-8 px-8 py-8 border-t border-gray-200 rounded-b-2xl flex flex-col md:flex-row md:flex-wrap">
        <div className="px-8 mr-2 w-full md:w-auto">
          <BookingWidget turf={turf} />
        </div>
        <p className="text-gray-700 mt-6 leading-relaxed font-serif md:flex-1">{turf.desc}</p>
      </div>
    </div>
  );
};

function AddressLink({ children, className = null }) {
  if (!className) {
    className = 'my-3 block';
  }
  className += ' flex gap-1 items-center font-semibold underline text-gray-900 hover:text-blue-900 transition-colors';
  return (
    <a className={className} target="_blank" rel="noopener noreferrer" href={'https://maps.google.com/?q=' + children}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
      {children}
    </a>
  );
}

export default ViewTurf;
