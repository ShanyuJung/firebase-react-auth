import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const signup = (email, password) => {
    //createUserWithEmailAndPassword => firebase function
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    //signInWithEmailAndPassword => firebase function
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    //signOut => firebase function
    return signOut(auth);
  };

  const resetPassword = (email) => {
    //sendPasswordResetEmail => firebase function
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserPassword = async (password) => {
    //updatePassword => firebase function
    return updatePassword(auth.currentUser, password).catch((e) => {
      console.log(e);
    });
  };

  const updateUserProfile = async (nickname, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: nickname,
      photoURL: photoURL,
    }).catch((e) => {
      console.log(e);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserPassword,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
