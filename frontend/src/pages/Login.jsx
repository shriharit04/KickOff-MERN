import React, { useContext, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [redirect,setRedirect] = useState('')
  const {user,setUser} = useContext(UserContext)

  const handleLogin = async (e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post('/user/login',{email,password})
      console.log(data)
      setUser(data)
      console.log(user)
    alert("login success")
    setRedirect(true)
    } catch (error){
      alert("login failed")
    }
    
  }
  if(redirect){
    return <Navigate to = '/view/turfs'/>
  }

  return (
    <div className='-mt-8 min-h-screen max-h-screen flex flex-col items-center justify-around border-solid '>
      <div className='border-spacing-1 border-black border-8 bg-gradient-to-tr from-black to-green-900 backdrop-blur-lg rounded-3xl p-8'>
      <h1 className='text-4xl text-center mb-4'>Login</h1>
      <form className='max-w-md mx-auto border-spacing-1' onSubmit={handleLogin} >
        <input type="email" placeholder='your@email.com' onChange={(e)=>setEmail(e.target.value)} value={email} />
        <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} value={password}  />
        <button className='primary mt-4 w-full' type='submit'>Login</button>
      </form>
      <p className='text-white'>Dont have an account? , <Link className='underline'to="/signup">Click to Register</Link></p>
      </div>
    </div>
  )
}


export default Login
