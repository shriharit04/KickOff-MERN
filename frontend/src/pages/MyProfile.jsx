import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import AccountNavbar from '../components/AccountNavbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MyProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const [editable, setEditable] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [phoneNo, setPhoneNo] = useState(user.phoneNo);
  const [name, setName] = useState(user.name);
  console.log(user)

  async function logout() {
    try {
      await axios.post('/user/logout');
      setUser(null);
      navigate('/'); // Redirect to the home route
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  async function updateUser(ev) {
    ev.preventDefault();
    try {
      await axios.put('/user/update', { name, email, phoneNo });
      alert("Updated user details");
    } catch (error) {
      console.error('Update failed:', error);
    }
  }

  return (
    <>
      <AccountNavbar activeClass={"profile"} />
      
      <div className='mt-8 flex flex-col text-center max-w-lg mx-auto p-8 border-gray-300 rounded-lg border-2 shadow-gray-400-lg'>
        {!editable && (
          <button
            className='primary p-8 mt-2'
            type='button'
            onClick={() => setEditable(true)}
          >
            Edit
          </button>
        )}
        <form className={editable ? 'flex flex-col gap-4' : 'flex flex-col gap-4 pointer-events-none'} onSubmit={updateUser}>
          <div className="flex flex-col mb-4">
            <label className="text-left mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder='Change Name'
              className="w-full p-2 border border-gray-300 rounded-lg"
              autoComplete="off"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-left mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder='Change Email'
              className="w-full p-2 border border-gray-300 rounded-lg"
              autoComplete="off"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col mb-4 pointer-events-none hidden">
            <label className="text-left mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder='Change Password'
              className="w-full p-2 border border-gray-300 rounded-lg"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-left mb-1" htmlFor="contact">Contact Number</label>
            <input
              id="contact"
              type="text"
              placeholder='Enter Contact Number'
              className="w-full p-2 border border-gray-300 rounded-lg"
              autoComplete="off"
              value={phoneNo}
              onChange={e => setPhoneNo(e.target.value)}
            />
          </div>

          {editable && (
            <button
              type='submit'
              className='primary w-full mt-2 pointer-events-auto'
            >
              Update
            </button>
          )}
        </form>

        <div className='mt-4'>
          Logged in as {user.name} ({user.email})<br />
          <button
            className='primary mt-2 max-w-sm'
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
