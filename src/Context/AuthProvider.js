import { Spin } from 'antd';
import { auth } from 'firebase/config';
import { isEmpty } from 'lodash';
import React, { createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    console.log("🚀 ~ file: AuthProvider.js ~ line 11 ~ AuthProvider ~ user", user)
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    // const

    useEffect(() => {

        let userLocal = JSON.parse(localStorage.getItem('user'));
        if(!isEmpty(userLocal)){
            const { displayName, email, uid, photoURL } = userLocal;
            setUser( { displayName, email, uid, photoURL });
            setIsLoading(false);
            history.push('/');
            // window.location.href = '/';
            return;
        }else{
            localStorage.removeItem('user');
            setIsLoading(false);
            history.push('/login');
        }

        const unsubscribed = auth.onAuthStateChanged((user) => {
            if(user){
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL });
                setIsLoading(false);

                localStorage.setItem("user", JSON.stringify(user))
                history.push('/');
                return;
                // window.location.href = '/chat';
            }
            localStorage.removeItem('user');
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
