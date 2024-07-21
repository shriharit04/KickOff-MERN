import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Login from '../pages/Login'
import { UserContext } from '../contexts/UserContext'
function Navbar() {
  const {user} = useContext(UserContext)
  return (
    <div className='flex mt-1 items-center justify-between bg-secondary text-white p-4 w-auto rounded-xl mb-4'>
      <Link to='/'>
        <div className='flex items-center '>
          <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 rotate-180">
            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
          </svg>
        <h1 className='font-mono text-lg'>FiTiMe</h1>
      </div>
      </Link>
      <div className=''>
        <Link to="/view/turfs" className='mr-8 hover:bg-gray-800 hover:text-fgreen hover:underline p-2 border-stone-100 rounded-lg'>View Turfs</Link>
        {!user&& (<Link to="/login" className='mr-1 hover:bg-gray -800 hover:text-fgreen hover:underline p-2 border-stone-100 rounded-lg'>Login</Link>)}
        {user&& (<Link to="/account" className='mr-1 hover:bg-gray-950 hover:text-fgreen hover:underline p-2 border-stone-100 rounded-lg'>{user.name}</Link>)}
        
      </div>
    </div>
  )
}

export default Navbar
