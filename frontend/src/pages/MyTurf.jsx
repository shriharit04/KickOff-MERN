import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AccountNavbar from '../components/AccountNavbar';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Popup from '../components/PopupCard';


function MyTurf() {
  const { action } = useParams();

  const [loading, setLoading] = useState(true);

  const [turfExists, setTurfExists] = useState(false);
  const [editable, setEditable] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState(''); // future implementation
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [price, setPrice] = useState(''); // future
  const [photoLink, setPhotoLink] = useState('');

  const [open, setOpen] = useState('');
  const [close, setClose] = useState('');
  const [size, setSize] = useState('');

  const [redirectToProfile, setRedirectToProfile] = useState('');
  const [showPopup, setShowPopup] = useState(false)

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('/lister/turf/uploadPhoto', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      const { data: filenames } = response;
      setAddedPhotos(prev => [...prev, ...filenames]);
    });
  }

  async function addNewTurf(ev) {
    ev.preventDefault();
    const { data } = await axios.post('/lister/turf/new', { name, address, desc, addedPhotos, price, open, close, size });
    setShowPopup(true)
  }

  async function updateTurf(ev) {
    ev.preventDefault();
    const { data } = await axios.put(`/lister/turf/update/${turfExists}`, { name, address, desc, photos: addedPhotos, price, open, close, maxPlayers: size });
    setShowPopup(true)
  }

  function removePhoto(filename, ev) {
    ev.preventDefault(); // Prevent default behavior if needed
    setAddedPhotos(prevPhotos => prevPhotos.filter(photo => photo !== filename));
    axios.delete(`/lister/turf/deletePhoto/${filename}`).catch(error => {
      console.error('Error deleting photo:', error);
    });
  }

  function markMainPhoto(filename, ev) {
    ev.preventDefault();
    const index = addedPhotos.indexOf(filename);
    const newItems = [...addedPhotos];
    [newItems[0], newItems[index]] = [newItems[index], newItems[0]];
    setAddedPhotos(newItems);
  }

  useEffect(() => {
    const fetchTurf = async () => {
      try {
        const response = await axios.get(`/lister/hasTurf/`); // Replace with actual endpoint and ID
        if (response.status === 200 && response.data) {
          let data = response.data;
          setName(data.name);
          setAddress(data.address);
          setDesc(data.desc);
          setLocation(data.location); // future implementation
          setAddedPhotos(data.photos);
          setPrice(data.price);
          setOpen(data.open);
          setClose(data.close);
          setSize(data.maxPlayers);
          setTurfExists(data._id);
        } else {
          setTurfExists(false);
        }
        setLoading(false);
      } catch (error) {
        // console.error('Error fetching turf:', error);
        setTurfExists(false);
        setLoading(false)
      }
    };

    fetchTurf();
  }, []);


  const handleNewTurf = () => {
    setEditable(true);
  }

  if (loading) return (loading)

  if (turfExists) {
    return (
      <div>
        <AccountNavbar activeClass={"myTurf"} />
        {/* <h1 className="text-center text-2xl font-bold my-4"></h1> */}

        {showPopup && (
        <Popup
          title="Request Submitted"
          content={
            <div className="space-y-3">
              <p>Request has been submitted. It will take a few days for us to review the details and list the turf.</p>
              <p>During this time, we may reach out to you for additional information or clarification.</p>
              <p>We kindly request your patience throughout this process.</p>
            </div>
          }
          onClose={() => setShowPopup(false)}
        />
      )}

        {turfExists && !editable && (
          <button onClick={() => setEditable(!editable)} className='flex primary w-6xl m-auto p-8 primary mt-4'>
            Edit
          </button>
        )}

        <div className="text-center">
          <div className={!editable ? "pointer-events-none opacity-80" : ""}>
            <form className='p-8 w-full max-w-3xl mx-auto mt-8 flex flex-col border-gray-300 rounded-lg border-2 bg-white  shadow-gray-400-lg' onSubmit={turfExists ? updateTurf : addNewTurf}>
              <h2 className='text-xl mt-4'>Turf Details</h2>

              <div className="flex flex-col mb-4">
                <label className="text-left mb-1" htmlFor="name">Turf Name</label>
                <input
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-left mb-1" htmlFor="address">Turf Address</label>
                <input
                  id="address"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-left mb-1 text-black" htmlFor="desc">Description</label>
                <textarea
                  id="desc"
                  className="w-full  p-2 border border-gray-300 rounded-lg"
                  placeholder='Description'
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                />
              </div>

              <h2 className='text-xl mt-4'>Add Photos</h2>

              <div className="grid grid-cols-2 gap-2 mb-4 lg:grid-cols-3 md:grid-cols-2">
                {addedPhotos.length > 0 && addedPhotos.map((link, key) => (
                  <div key={key} className='flex relative'>
                    <img
                      key={link}
                      className='rounded-2xl w-full h-40 object-cover'
                      src={`${import.meta.env.VITE_BACKEND_URL}uploads/${link}`}
                      alt={link}
                    />
                    <button
                      className="absolute bottom-2 right-2 p-1 border-white bg-slate-600 rounded-xl"
                      onClick={(ev) => removePhoto(link, ev)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        {/* Original delete SVG */}
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.346-9Z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      className="absolute bottom-2 left-2 p-1 border-white bg-slate-600 rounded-xl"
                      onClick={(ev) => markMainPhoto(link, ev)}
                    >
                      {key === 0 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                      </svg>
                      
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          {/* Original SVG for marking other photos as main */}
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                ))}
                <label className='text-xl border cursor-pointer flex items-center justify-center gap-1 bg-transparent rounded-2xl px-8 py-8'>
                  <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                  </svg>
                  Upload
                </label>
              </div>


              <h2 className='text-xl mt-4'>Timings and Size</h2>
              <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
                <div className="flex flex-col">
                  <label className="text-left mb-1" htmlFor="open">Opens At</label>
                  <input
                    id="open"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="time"
                    value={open}
                    onChange={e => setOpen(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-left mb-1" htmlFor="close">Closes At</label>
                  <input
                    id="close"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="time"
                    value={close}
                    onChange={e => setClose(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-left mb-1" htmlFor="size">Turf Size</label>
                  <input
                    id="size"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="text"
                    value={size}
                    onChange={e => setSize(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-left mb-1" htmlFor="price">Turf Price</label>
                  <input
                    id="price"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="text"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <button type='submit' className='primary w-full mt-2'>{turfExists ? "Update" : "Create"}</button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <AccountNavbar />
        <div className="flex flex-col justify-center items-center gap-6">
          <h2 className='mt-8'>No turf Found. Create One?</h2>
          <button className='primary' onClick={handleNewTurf}>Create Turf</button>
        </div>
        <div className="text-center">
          <div className={!editable ? "pointer-events-none opacity-0" : ""}>
            <form className='p-8 w-full max-w-3xl mx-auto mt-8 flex flex-col border-gray-300 rounded-lg border-2 bg-white shadow-gray-400-lg' onSubmit={addNewTurf}>
              <h2 className='text-xl mt-4'>Turf Details</h2>

              <div className="flex flex-col mb-4">
                <label className="text-left mb-1" htmlFor="name">Turf Name</label>
                <input
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-left mb-1" htmlFor="address">Turf Address</label>
                <input
                  id="address"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-left mb-1 text-black" htmlFor="desc">Description</label>
                <textarea
                  id="desc"
                  className="w-full  p-2 border border-gray-300 rounded-lg"
                  placeholder='Description'
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                />
              </div>

              <h2 className='text-xl mt-4'>Add Photos</h2>

              <div className="grid grid-cols-2 gap-2 mb-4 lg:grid-cols-3 md:grid-cols-2">
                {addedPhotos.length > 0 && addedPhotos.map((link, key) => (
                  <div key={key} className='flex relative'>
                    <img
                      key={link}
                      className='rounded-2xl w-full h-40 object-cover'
                      src={`${import.meta.env.VITE_BACKEND_URL}uploads/${link}`}
                      alt={link}
                    />
                    <button
                      className="absolute bottom-2 right-2 p-1 border-white bg-slate-600 rounded-xl"
                      onClick={(ev) => removePhoto(link, ev)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.346-9Z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      className="absolute bottom-2 left-2 p-1 border-white bg-slate-600 rounded-xl"
                      onClick={(ev) => markMainPhoto(link, ev)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                      </svg>
                    </button>
                  </div>
                ))}
                <label className='text-xl border cursor-pointer flex items-center justify-center gap-1 bg-transparent rounded-2xl px-8 py-8'>
                  <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                  </svg>
                  Upload
                </label>
              </div>

              <h2 className='text-xl mt-4'>Timings and Size</h2>
              <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
                <div className="flex flex-col">
                  <label className="text-left mb-1" htmlFor="open">Opens At</label>
                  <input
                    id="open"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="time"
                    value={open}
                    onChange={e => setOpen(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-left mb-1" htmlFor="close">Closes At</label>
                  <input
                    id="close"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="time"
                    value={close}
                    onChange={e => setClose(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-left mb-1" htmlFor="size">Turf Size</label>
                  <input
                    id="size"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="text"
                    value={size}
                    onChange={e => setSize(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-left mb-1" htmlFor="price">Turf Price</label>
                  <input
                    id="price"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="text"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <button type='submit' className='primary w-full mt-2'>Create</button>
            </form>
          </div>
        </div>
      </div>
    )

  }


}

export default MyTurf;
