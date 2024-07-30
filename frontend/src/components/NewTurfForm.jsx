import axios from 'axios'
import React, { useState } from 'react'
import { Link, useParams ,Navigate} from 'react-router-dom'


function NewTurfForm() {
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
    
        setRedirect(true)
      }
      
  return (
    <div>
          <form className='p-4 w-3/4 mx-auto' onSubmit={addNewTurf}>
            <h2 className='text-xl mt-4'>Turf Details</h2>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Turf Name' />
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder='Address' />
            <textarea className="w-full rounded-lg text-black p-2 mt-2" placeholder='Description' value={desc} onChange={e => setDesc(e.target.value)}></textarea>
            
            <h2 className='text-xl mt-4'>Photos</h2>
            <div className="flex justify-around">
              <input type="text" className='!w-3/4' placeholder='Add photos using link' value={photoLink} onChange={e => setPhotoLink(e.target.value)} />
              <button className='primary px-4 !w-1/5'>Add Photo</button>
            </div>


            <div className="grid grid-cols-3  gap-2lg:grid-cols-6 md:grid-cols-4">
              {addedPhotos.length>0 && addedPhotos.map(link=>(
                <div className='h-32 flex'>
                  <img key={link} className='rounded-2xl w-full object-cover' src={`http://localhost:4000/uploads/${link}`} alt={link} />
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
            
            <button type='submit' className='primary w-full mt-2'>Save</button>

          </form>
        </div>
  )
}

export default NewTurfForm
