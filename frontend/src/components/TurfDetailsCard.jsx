import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TurfDetailsCard({ turf }) {
  const [hovered, setHovered] = useState(false);

  const { name, address, price, photos } = turf;

  return (
    <div className="max-w-xs w-full rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 bg-white">
      <Link to={`/view/turf/${turf._id}`}>
        <div className="h-36 bg-gray-200 flex items-center justify-center rounded-t-2xl">
          {photos?.[0] ? (
            <img
              className="h-full w-full object-cover rounded-t-2xl"
              src={`${import.meta.env.VITE_BACKEND_URL}uploads/${photos[0]}`}
              alt={name}
            />
          ) : (
            <div className="text-gray-500">No Image Available</div>
          )}
        </div>
        <div className="px-6 py-4 flex flex-col">
          <div className="font-bold text-xl mb-2 text-gray-900">{name}</div>
          <div className="flex-grow flex items-center justify-center md:justify-start">
            <p className="text-gray-700 text-base">{address}</p>
          </div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span
            className="inline-block bg-green-200 rounded-full px-6 py-3 text-base font-semibold text-gray-700 mr-2 mb-2 cursor-pointer transform transition-transform duration-700"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {hovered ? "Reserve Now" : `Rs.${price}`}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default TurfDetailsCard;
