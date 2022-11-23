import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import app from '../Firebase/Firebase.config';

export const AuthContext = createContext()
const auth =getAuth(app)
const AuthProvider = ({children}) => {
  const [user,setUser]=useState('')
  const [loading,setLoading]=useState(true)
  
  const createUser=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const updateUserProfile=(name,photoURL)=>{
    return updateProfile(auth.currentUser,{
        displayName: name,
        photoURL: photoURL
    })
  }

  const LoginUser=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
   
  const forgetUserPassword=(email)=>{
    return sendPasswordResetEmail(auth, email)
  }

  const LogOutUser=()=>{
    return signOut(auth)
  }

  useEffect(()=>{
   const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{
       setUser(currentUser)
       setLoading(false)
   })

   return ()=> unsubscribe()
  },[])
 
    const authInfo={
      user,
      createUser,
      LoginUser,
      LogOutUser
    
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;