import React , {useState} from 'react'
import { Link } from 'react-router-dom'



function TurfDetailsCard({turf}) {
  const [hovered, setHovered] = useState(false);

  // console.log(turf)
  const { name, address, location, price, photos } = turf;
  // console.log(name)
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 bg-white w-1/4">
      {photos?.[0] && (
      <img className="size-2/4 m-auto " src={`${import.meta.env.REACT_APP_BACKEND_URL}/uploads/${photos[0]}`} alt={name} />

      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900">{name}</div>
        <p className="text-gray-700 text-base">{address}</p>
        {/* <p className="text-gray-700 text-base">{location}</p> */}
      </div>
      <div className="px-6 pt-4 pb-2">
       <Link to={`/view/turf/${turf._id}`}><span
          className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer transform transition-transform duration-700"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? "Reserve Now" : `Rs.${price}`}
        </span></Link>
      </div>
    </div>
  );
}

export default TurfDetailsCard
