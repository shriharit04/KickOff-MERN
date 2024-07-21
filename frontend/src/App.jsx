import { useState } from 'react'
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

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true //why??
function App() {
  // const {user} = useAuthContext()

  return (  
    <>
    <UserContextProvider>
    <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route path = '/'  element={<Home/>} />
          <Route path='view/turfs' element={<ViewTurfs/>}/>
          <Route path='view/turf/:id' element={<ViewTurf/>}/>
          <Route path='/login' element={<Login/>}></Route>
          <Route path = '/signup' element={<Signup/>}></Route>
          <Route path = '/account/:subpage?' element = {<AccountPage/>}></Route>
          <Route path = '/account/:subpage/:action' element = {<AccountPage/>}></Route>

          {/* <Route path = '/account/bookings' element = {<AccountPage/>}></Route>
          <Route path = '/account/turfs' element = {<AccountPage/>}></Route> */}
        </Routes>
      </div>
    </BrowserRouter>
    </UserContextProvider>
  </>
  )
}

export default App
