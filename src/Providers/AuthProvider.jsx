import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase.config';




export const AuthContext=createContext(null);
const auth = getAuth(app);

const googleAuthProvider= new GoogleAuthProvider;

const AuthProvider = ({children}) => {
  const [loading , setLoading]=useState(true);
  const [user , setUser]=useState(null);

  const createUser=(email , password)=>{
    return createUserWithEmailAndPassword(auth, email, password);
  }
// login
  const signedIn=(email, password)=>{
    return signInWithEmailAndPassword(auth, email, password)
  }
// sign with google
const signWithGoogle =()=>{
  return signInWithPopup(auth ,googleAuthProvider)
}


// signOut
   const logOut=()=>{
     signOut(auth);
   }

  
  // observe auth state change
    useEffect(()=>{
      const unsubscribe= onAuthStateChanged(auth , currentUser =>{
        console.log('auth state change',currentUser);
        setUser(currentUser);
        setLoading(false);
    
      });

      return()=>{
        unsubscribe();
      }
    },[]);


  const authInfo={
    user,
    loading,
    createUser,
    signedIn,
    logOut,
    signWithGoogle 
  

    
  }
    
    return (
        <AuthContext.Provider value={authInfo}>
             {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;