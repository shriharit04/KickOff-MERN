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
        return <div>Loading...</div>; // Loading indicator
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
