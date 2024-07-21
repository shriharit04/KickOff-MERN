import React, { useState } from 'react'
import { Link,Navigate} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
function Signup() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {setUser} = useContext(UserContext)
  const [redirect,setRedirect] = useState('')



  const handleSignup = async (e)=>{
    e.preventDefault()
    try {
       const {data} = await axios.post('/user/signup',{
        name,email,password
    })
    console.log(data)
    setUser(data)
    setRedirect(true)

    } catch (error) {
      console.log(error.message)
      alert(error.message)
    }

  }
  if(redirect){
    return <Navigate to = '/view/turfs'/>
  }

  function addPhotoByLink(){
    
  }


  return (
    <div className='-mt-8 min-h-screen max-h-screen flex flex-col items-center justify-around border-solid '>
      <div className='border-spacing-1 border-black border-8 bg-gradient-to-tr from-black to-greene-900 backdrop-blur-lg rounded-3xl p-8'>
      <h1 className='text-4xl text-center mb-4'>Signup</h1>
      <form className='max-w-md mx-auto border-spacing-1' onSubmit={handleSignup} >
        <input type="text" placeholder='Your Name' onChange={(e)=>setName(e.target.value)} value={name} />
        <input type="email" placeholder='your@email.com' onChange={(e)=>setEmail(e.target.value)} value={email} />
        <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} value={password}  />
        <button className='mt-4 w-full primary' type='submit'>Signup</button>
      </form>
      <p className='text-white'>Have an account? , <Link className='underline'to="/login">Click to Login</Link></p>
      </div>
    </div>
  )
}


export default Signup
