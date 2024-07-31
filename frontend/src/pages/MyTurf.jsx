import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams ,Navigate} from 'react-router-dom'
import AccountNavbar from '../components/AccountNavbar'
import { FaRegStar ,FaStar} from "react-icons/fa";


function MyTurf() {

  const {action} = useParams()


  const [turfExists,setTurfExists] = useState(false)
  const [editable,setEditable] = useState(false);


  const [name, setName] = useState('')
  const [address,setAddress] = useState('')
  const [desc, setDesc] = useState('')
  const [location, setLocation] = useState('') //future implementation
  const [addedPhotos, setAddedPhotos] = useState([])
  const [price, setPrice] = useState('') //future
  const [photoLink,setPhotoLink] = useState('')
  
  const [open,setOpen] = useState('')
  const [close ,setClose] = useState('')
  const [size,setSize] = useState('')

  const [redirectToProfile,setRedirectToProfile] = useState('')
  function uploadPhoto(ev){
    const files =ev.target.files
    const data = new FormData() 
    for(let i = 0; i<files.length;i++){
      data.append('photos',files[i])
    }
    axios.post('/lister/turf/uploadPhoto',data,{
      headers:{'Content-Type':'multipart/form-data'}
    }).then(response => {
      const {data:filenames} = response  
      setAddedPhotos(prev =>{
        return [...prev,...filenames]
      })
    })
  }

  async function addNewTurf(ev){
    ev.preventDefault();
    const {data} = await axios.post('/lister/turf/new',{name,address,desc,addedPhotos,price,open,close,size});
    console.log(data);

    alert("New Turf added")
  }

  async function updateTurf(ev){
    ev.preventDefault();
    console.log(turfExists)
    const {data} = await axios.put(`/lister/turf/update/${turfExists}`,{name,address,desc,photos:addedPhotos,price,open,close,maxPlayers:size});
    alert("Turf details updated");
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
        const response = await axios.get(`http://localhost:4000/lister/hasTurf/`); // Replace with actual endpoint and ID
        if (response.status === 200 && response.data) {
          let data= response.data;
          setName(data.name)
          setAddress(data.address)
          setDesc(data.desc)
          setLocation(data.location) //future implementation
          setAddedPhotos(data.photos)
          setPrice(data.price) 
          // setPhotoLink(data)
          setOpen(data.open)
          setClose(data.close)
          setSize(data.maxPlayers)
          setTurfExists(data._id);
        } else {
          setTurfExists(false);
        }
      } catch (error) {
        console.error('Error fetching turf:', error);
        setTurfExists(false);
      }
    };

    fetchTurf();
  }, []);
  

 

  return (
    <div>
      <AccountNavbar activeClass={"myTurf"}/>
      <h1>Places Page</h1>

      {turfExists && !editable && (
        <button onClick={() => setEditable(!editable)} className='flex primary w-6xl  m-auto p-8 primary' >Edit</button>)}
      
      
      <div className="text-center">
        <div className={!editable ? "pointer-events-none opacity-80" : ""}>
          
          <form className='p-4 w-2/3 mx-auto' onSubmit={turfExists ? updateTurf : addNewTurf}>
            <h2 className='text-xl mt-4'>Turf Details</h2>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Turf Name' />
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder='Address' />
            <textarea className="w-full rounded-lg text-black p-2 mt-2" placeholder='Description' value={desc} onChange={e => setDesc(e.target.value)}></textarea>
            
            <h2 className='text-xl mt-4'>Add Photos</h2>
            



            <div className="grid grid-cols-3  gap-2 lg:grid-cols-6 md:grid-cols-4">
              {addedPhotos.length>0 && addedPhotos.map((link,key)=>(
                <div key={key} className='h-32 flex relative'>
                  <img key={link} className='rounded-2xl w-full object-cover' src={`http://localhost:4000/uploads/${link}`} alt={link} />
                  <button className="absolute bottom-2 right-2 p-1 border-white bg-slate-600 rounded-xl" onClick={(ev)=>removePhoto(link,ev)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                  </svg>
                  </button>
                  {/* <button className="absolute bottom-2 left-2 p-1 border-white bg-slate-600 rounded-xl" onClick={(ev)=>removePhoto(link,ev)}>
                  <FaStar/>
                  </button> */}
                  {key==0 ? <FaStar className="absolute bottom-2 left-2 p-1 border-white bg-slate-600 rounded-xl size-8" /> :
                  <FaRegStar className="absolute bottom-2 left-2 p-1 border-white bg-slate-600 rounded-xl size-8" onClick={(ev)=>markMainPhoto(link,ev)}/>}


                  
                </div>
              ))}
            <label className='text-xl border cursor-pointer flex items-center justify-center gap-1 bg-transparent rounded-2xl px-8 py-8' >
            <input type="file" multiple className='hidden' onChange={uploadPhoto}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
              </svg>
              Upload
            </label>
            </div>

            <h2 className='text-xl mt-4'>Timings and Size</h2>
            <div className="flex gap-2">
              <input type="text" placeholder='Opens At (24hr)'  value={open} onChange={e => setOpen(e.target.value)}/>
              <input type="text" placeholder='Closes At (24hr)'  value={close} onChange={e => setClose(e.target.value)}/>
              <input type="text" placeholder='Turf Size (5v5, 7v7)' value={size} onChange={e => setSize(e.target.value)} />
              <input type="text" placeholder='Turf Price(per hour)'  value={price} onChange={e => setPrice(e.target.value)}/>
            </div>
            
            <button type='submit' className='primary w-full mt-2'>{turfExists ? "Update" : "Create"}</button>

          </form>
        </div>

      </div>
    </div>
  )
}   

export default MyTurf
