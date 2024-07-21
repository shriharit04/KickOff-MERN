import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="relative bg-cover bg-center bg-no-repeat w-11/12 md:w-2/3 lg:w-1/2 h-64 rounded-lg shadow-lg overflow-hidden" style={{ backgroundImage: 'url("https://via.placeholder.com/800x400")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex flex-col items-center justify-center p-6">
          <Link to="/view/turfs">
            <h1 className="text-4xl font-bold text-green-500 hover:text-green-400 transition-colors duration-300">Its playtime</h1>
          </Link>
          <p className="mt-4">Scroll down to learn more</p>
        </div>
      </div>
      
      <div className='h-48 mt-8 mx-7 w-2/3 bg-stone-700 Features-List'>Add Features here</div>
      
      <div className="mt-8 flex flex-col items-center space-y-4">
        <Link to="/signup">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Get Started
          </button>
        </Link>
        <Link to="/lister-signup">
          <p className="text-green-500 hover:text-green-400 transition-colors duration-300">Want to list your turf?</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
