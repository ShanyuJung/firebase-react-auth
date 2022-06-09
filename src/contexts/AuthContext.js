import React, { useContext, useEffect, useState } from "react";
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
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    //signInWithEmailAndPassword => firebase function
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    //signOut => firebase function
    return auth.signOut();
  };

  const resetPassword = (email) => {
    //sendPasswordResetEmail => firebase function
    return auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, signup, login, logout, resetPassword };
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
