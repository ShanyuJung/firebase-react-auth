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
import {
  ref,
  getStorage,
  uploadBytes,
  getDownloadURL,
  list,
} from "firebase/storage";
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

  const uploadUserPhoto = async (userPhoto) => {
    if (!userPhoto) return;
    const authUID = auth.currentUser.uid;
    const storage = getStorage();
    const imageRef = ref(storage, `users/${authUID}/userPhoto`);

    return uploadBytes(imageRef, userPhoto);
  };

  const getUserPhoto = async () => {
    const authUID = auth.currentUser.uid;
    const storage = getStorage();
    const imageRef = ref(storage, `users/${authUID}/userPhoto`);
    const pathRef = ref(storage, `users/${authUID}`);
    const hasPhoto = await list(pathRef, { maxResults: 1 });
    if (hasPhoto.items.length === 0) return;

    return getDownloadURL(imageRef);
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
    uploadUserPhoto,
    getUserPhoto,
  };
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
