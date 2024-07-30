import React, { useContext, useState} from 'react'
import { UserContext } from '../contexts/UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import turfImg from '../assets/soccer-field-svgrepo-com.svg'
function AccountPage({activeClass}) {
  const {user,setUser,ready} = useContext(UserContext)
  const [redirect,setRedirect] = useState(null)
  
  

  if(!ready){
    return 'loading'
  }

  if(!user && ready && !redirect){
    <Navigate to="/login"/>
  }

  
 

  function linkClasses(type = null){
    let classes = 'py-2 px-2 inline-flex py-2 px-6 gap-2 items-center '
    if(type===activeClass){
      classes+= 'bg-secondary rounded-full'
    }else{
      classes += "bg-gray-800 rounded-full"
    }
    return classes
  }
  
  if(redirect){
    return <Navigate to={redirect}/>
  }


  return (  
    <div>
      account page for {user.name}
      <nav className='w-full flex justify-center mt-8 gap-4'>
        <Link className={linkClasses('profile')} to={'/account/profile'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
          My Profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          My bookings
        </Link>
        <Link className={linkClasses('myTurf')} to = {'/account/turf'}>
        <img src={turfImg} className="rotate-90" alt="" width="30px"/>My Turf</Link>
      </nav>
      


    </div>
  )
}

export default AccountPage
