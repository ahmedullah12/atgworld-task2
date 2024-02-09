import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get("https://atg-task2-server-production.up.railway.app/auth/verify")
            .then(res => {
                if (res.data.status) {
                    setUser(res.data.user);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const value = {
        user,
        loading,
        setUser
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;