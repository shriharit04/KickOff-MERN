import React, { useState,useEffect } from 'react'
import TurfDetailsCard from '../components/TurfDetailsCard'

function ViewTurfs() {
    const [turfs, setTurfs] = useState([])
    useEffect(() => {

        const fetchTurfs = async () => {
          const response = await fetch('http://localhost:4000/guest/view/turfs',{
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
        <div className="flex justify-center items-center h-screen bg-green-400">
          {turfs && turfs.map(turf => (
            <TurfDetailsCard  key={turf._id} turf={turf}/>
          ))}
        </div>
      );
      
}

export default ViewTurfs
