import { Spin } from 'antd';
import { auth } from 'firebase/config';
import React, { createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    // const

    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            if(user){
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL });
                setIsLoading(false);
                localStorage.setItem('login', true);
                history.push('/');
                return;
                // window.location.href = '/chat';
            }
            localStorage.removeItem('login');
            setIsLoading(false);
            history.push('/login');
        })

        return () => {
            unsubscribed();
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            { isLoading ? <Spin style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.5)' }}/> : children }
        </AuthContext.Provider>
    )
}
