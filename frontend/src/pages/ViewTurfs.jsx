import React, { useState,useEffect } from 'react'
import TurfDetailsCard from '../components/TurfDetailsCard'
require('dotenv').config()


function ViewTurfs() {
    const [turfs, setTurfs] = useState([])
    useEffect(() => {

        const fetchTurfs = async () => {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/guest/view/turfs`,{
            // headers: {
            //   'Authorization': `Bearer ${user.token}`
            // }
          })
          const json = await response.json()
        
          if (response.ok) {
            // dispatch({type: 'SET_WORKOUTS', payload: json})
            setTurfs(json)
          }
        }
        if(1){
          fetchTurfs()
        }
      }, [])


      return (
        <div className="flex justify-center gap-6 items-center h-screen">
          {turfs && turfs.map(turf => (
            <TurfDetailsCard  key={turf._id} turf={turf}/>
          ))}
        </div>
      );
      
}

export default ViewTurfs
