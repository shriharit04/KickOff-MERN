import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewTurf = ({ turfs }) => {
  const { id } = useParams();
  const [turf,setTurf] = useState(null)

  useEffect(() => {

    const fetchTurfs = async () => {
      const response = await fetch(`http://localhost:4000/guest/view/turf/${id}`,{
        // headers: {
        //   'Authorization': `Bearer ${user.token}`
        // }
      })
      const json = await response.json()
    
      if (response.ok) {
        // dispatch({type: 'SET_WORKOUTS', payload: json})
        setTurf(json)
      }
    }
    if(1){
      fetchTurfs()
    }
  }, [])



  if (!turf) {
    return <div className="text-white">Turf not found</div>;
  }

  return (



    
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 m-6">
      <img className="w-full h-64 object-cover rounded-t-lg" src={turf.photos[0]} alt={turf.name} />
      <div className="p-6">
        <h2 className="text-3xl font-bold text-darkgreen mb-4">{turf.name}</h2>
        <p className="text-gray-700 text-base mb-4">{turf.desc}</p>
        <p className="text-gray-700 text-base"><strong>Contact:</strong> {turf.contactNo}, {turf.contactMail}</p>
        <p className="text-gray-700 text-base"><strong>Address:</strong> {turf.address}</p>
        <p className="text-gray-700 text-base"><strong>Geolocation:</strong> {turf.geolocation}</p>
        <p className="text-gray-700 text-base"><strong>Price:</strong> ${turf.price}</p>
        <p className="text-gray-700 text-base"><strong>Slots Busy:</strong> {turf.slotsBusy}</p>
      </div>
    </div>
  );
};

export default ViewTurf;
