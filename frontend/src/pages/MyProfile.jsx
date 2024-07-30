import React,{useContext} from 'react'
import { UserContext } from '../contexts/UserContext'
import AccountNavbar from '../components/AccountNavbar'

const MyProfile = () => {

    const {user,setUser,ready} = useContext(UserContext)
    async function logout(){
        await axios.post('/user/logout')
        setRedirect('/')
        setUser(null)
    
      }

  return (
    <>
    <AccountNavbar activeClass={"profile"}/>
    <div className='text-center max-w-lg mx-auto'>
      {/* pending */}
          
          <form>
            <label>Name </label>
            {/* <input type="text" placeholder={user.email} disabled /> */}
            <label>Email</label>
            <input type="text" placeholder='Change Email' />
            <label>password</label>
            <input type="password" placeholder='Change Password' />
            <button type='submit'>Update</button>
          </form>
          Logged in as {user.name} ({user.email})<br/>
          <button className='primary mt-2 max-w-sm' onClick={logout}>Logout</button>
        </div>
    </>
  )
}

export default MyProfile
