import React, { useState } from 'react'
import { Link,Navigate} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
function Signup() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [phoneNo, setPhoneNo] = useState()
  const {setUser} = useContext(UserContext)
  const [redirect,setRedirect] = useState('')
  



  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.post('/user/signup', {
            name,
            email,
            password,
            phoneNo
        });
        console.log(data);
        setUser(data);
        setRedirect(true);

    } catch (error) {
        // Check if error.response is available and contains the expected error message
        if (error.response.data.error) {
            alert(error.response.data.error); // Show the backend error message
        } else {
            // Fallback to a generic error message if the specific one is not available
            alert('An error occurred. Please try again.');
        }
        console.error('Signup error:', error.message);
    }
}

  if(redirect){
    return <Navigate to = '/view/turfs'/>
  }



  return (
    <div className='-mt-8 min-h-screen max-h-screen flex flex-col items-center justify-around border-solid '>
      <div className='border-spacing-1 border-black border-8 bg-gradient-to-tr from-gray-200 to-indigo-600 backdrop-blur-lg rounded-3xl p-8'>
      <h1 className='text-4xl text-center mb-4'>Signup</h1>
      <form className='max-w-md mx-auto border-spacing-1' onSubmit={handleSignup} >
        <input type="text" placeholder='Your Name' onChange={(e)=>setName(e.target.value)} value={name} />
        <input type="email" placeholder='your@email.com' onChange={(e)=>setEmail(e.target.value)} value={email} />
        <input type="tel" placeholder='Phone Number' onChange={(e)=>setPhoneNo(e.target.value)} value={phoneNo}  />
        <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} value={password}  />

        <button className='mt-4 w-full primary' type='submit'>Signup</button>
      </form>
      <p className='text-white'>Have an account? , <Link className='underline'to="/login">Click to Login</Link></p>
      </div>
    </div>
  )
}


export default Signup
