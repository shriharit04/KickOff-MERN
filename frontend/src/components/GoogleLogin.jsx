import React, { useState } from 'react';
import { useGoogleLogin,GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios'
import { Navigate } from 'react-router-dom';

function GoogleLogin({ type }) {
  const [redirect, setRedirect] = useState(false);


  const responseGoogle = async (authResult) => {
    try {
      if(authResult['code']){
         const { data } = await axios.post('user/login/google', { code: authResult.code });
         setRedirect(true)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
  });

  if(redirect) 
    return <Navigate to="/view/turfs"/>


  return (
    <div className="flex justify-center mt-4 mb-4">
      <button
        className="flex items-center px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        onClick={googleLogin}
      >
        <div className="w-8 h-8 mr-2 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-full h-full"
          >
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
        </div>
        <span className="text-gray-700 font-semibold">
          {type === 'signup' ? 'Signup with Google' : 'Login with Google'}
        </span>
      </button>
    </div>
  );
}


const GoogleAuthWrapper = ({type}) =>{
    return(
      <GoogleOAuthProvider clientId= {import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin type={type}/>
        </GoogleOAuthProvider>
    )
  }

export default GoogleAuthWrapper;
