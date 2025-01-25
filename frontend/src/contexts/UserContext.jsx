import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState(null); // Added state to handle errors
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        // Fetch user profile
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('/user/profile', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/login'); // Redirect to login if unauthorized
                } else {
                    setError('Failed to fetch user profile.'); // Handle other errors
                    console.error('Error fetching user profile:', error);
                }
            } finally {
                setReady(true); // Set ready to true regardless of success or failure
            }
        };

        fetchUserProfile();
    }, [navigate]);

    // Display a loading message or error message based on state
    if (!ready) {
        return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-center text-gray-600">
          The site is loading...
          <br />
          Please wait a moment as the backend may take a few seconds to wake up due to the free-tier server.
        </p>
      </div>
        )
    }

    if (error) {
        return <div>{error}</div>; // Display error message
    }

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
