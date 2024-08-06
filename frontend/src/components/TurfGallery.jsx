import { useState } from "react";
require('dotenv').config()


export default function TurfGallery({ turf }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen bg-opacity-75 backdrop-blur-lg p-8 z-20">
        <div className="mb-8">
          <h2 className="text-3xl mb-4">Photos of {turf.name}</h2>
          <button
            onClick={() => setShowAllPhotos(false)}
            className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
            Close photos
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {turf?.photos?.length > 0 &&
            turf.photos.map((photo, index) => (
              <div key={index} className="flex-grow flex-shrink-0 basis-[calc(33.333%-1rem)] max-w-[calc(33.333%-1rem)] md:basis-[calc(50%-1rem)] md:max-w-[calc(50%-1rem)]">
                <Image src={photo} alt="" className="w-full h-auto object-cover" />
              </div>
            ))}
        </div>  
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex gap-2 rounded-2xl overflow-hidden">
        <div className="flex-1">
          {turf.photos?.[0] && (
            <Image
              onClick={() => setShowAllPhotos(true)}
              className="w-full h-72 object-cover cursor-pointer"
              src={turf.photos[0]}
              alt=""
            />
          )}
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          {turf.photos?.[1] && (
            <Image
              onClick={() => setShowAllPhotos(true)}
              className="w-full h-36 object-cover cursor-pointer"
              src={turf.photos[1]}
              alt=""
            />
          )}
          {turf.photos?.[2] && (
            <Image
              onClick={() => setShowAllPhotos(true)}
              className="w-full h-36 object-cover cursor-pointer"
              src={turf.photos[2]}
              alt=""
            />
          )}
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-gray-900 rounded-2xl shadow shadow-md shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        Show more photos
      </button>
    </div>
  );
}

function Image({ src, ...rest }) {
  src = src && src.includes("https://")
    ? src
    : `${process.env.REACT_APP_BACKEND_URL}/uploads/` + src;
  return <img {...rest} src={src} alt="" />;
}
