import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ViewTurfs from './pages/ViewTurfs'
import ViewTurf from './pages/ViewTurf'
// import { useAuthContext } from './hooks/useAuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import axios from 'axios'
import { UserContextProvider } from './contexts/UserContext'
import AccountPage from './pages/AccountPage'
import MyTurf from './pages/MyTurf'
import MyProfile from './pages/MyProfile'
import MyBooking from './pages/MyBooking'
import GoogleLogin from './components/GoogleLogin'


import {GoogleOAuthProvider} from '@react-oauth/google'




axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true
function App() {
  // const {user} = useAuthContext()

  const GoogleAuthWrapper = () =>{
    return(
      <GoogleOAuthProvider clientId="179775887160-3mll2rerblsmu92a9174c66sfk51at84.apps.googleusercontent.com">
        <GoogleLogin/>
        </GoogleOAuthProvider>
    )
  }



  return (  
    <>
    <BrowserRouter>
    <UserContextProvider>
      <Navbar/>
      <div className="pages">
        <Routes>

          {/* temp paths */}
          <Route path= '/google/login' element={<GoogleAuthWrapper/>}/>

          <Route path = '/'  element={<Home/>} />
          <Route path='view/turfs' element={<ViewTurfs/>}/>
          <Route path='view/turf/:id' element={<ViewTurf/>}/>
          <Route path='/login' element={<Login/>}></Route>
          <Route path = '/signup' element={<Signup/>}></Route>
          <Route path = '/account/?' element = {<MyProfile/>}></Route>
          <Route path = '/account/turf/' element = {<MyTurf/>}></Route>
          <Route path = '/account/profile/' element = {<MyProfile/>}></Route>
          <Route path = '/account/bookings/' element = {<MyBooking/>}></Route>  

          <Route path='*' element={<Navigate to="/"/>}/>
          
          {/* <Route path = '/account/:subpage/:action' element = {<AccountPage/>}></Route> */}

          {/* <Route path = '/account/bookings' element = {<AccountPage/>}></Route>
          <Route path = '/account/turfs' element = {<AccountPage/>}></Route> */}
        </Routes>
      </div>
    </UserContextProvider>
    </BrowserRouter>
  </>
  )
}

export default App