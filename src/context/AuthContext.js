// src/context/AuthContext.js
<<<<<<< HEAD
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { auth, db } from '../../firebaseConfig';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
=======
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig'; // Firebase yapılandırmanızı içe aktarın
import { onAuthStateChanged } from 'firebase/auth';
>>>>>>> b07d740 (Initial commit)

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  // Kullanıcı profili güncelleme fonksiyonu
  const updateUserProfile = useCallback(async (userData) => {
    if (!currentUser) throw new Error('Kullanıcı oturumu bulunamadı');
    
    try {
      setError(null);
      const userRef = doc(db, 'users', currentUser.uid);
      
      // Firestore ve Auth güncellemelerini paralel yap
      await Promise.all([
        updateDoc(userRef, {
          ...userData,
          updatedAt: serverTimestamp()
        }),
        updateProfile(currentUser, {
          displayName: userData.displayName,
          photoURL: userData.photoURL
        })
      ]);

      setUserProfile(prev => ({...prev, ...userData}));
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, [currentUser]);

  // Oturum açma işlemi
  const login = useCallback(async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Son giriş zamanını güncelle
      const userRef = doc(db, 'users', result.user.uid);
      await updateDoc(userRef, {
        lastLogin: serverTimestamp(),
        lastLoginDevice: {
          platform: Platform.OS,
          version: Platform.Version
        }
      });

      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, []);

  // Şifre sıfırlama işlemi
  const resetPassword = useCallback(async (email) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email, {
        url: 'https://kuzineapp.com/login',
        handleCodeInApp: true
      });
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, []);

  // Çıkış işlemi
  const logout = useCallback(async () => {
    try {
      setError(null);
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
          lastLogout: serverTimestamp()
        });
      }
      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
            await updateDoc(doc(db, 'users', user.uid), {
              lastActive: serverTimestamp()
            });
          }
        } catch (error) {
          console.error('Profil yüklenirken hata:', error);
          setError(error.message);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
=======

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
>>>>>>> b07d740 (Initial commit)
    });

    return () => unsubscribe();
  }, []);

<<<<<<< HEAD
  const value = {
    currentUser,
    userProfile,
    loading,
    error,
    login,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
=======
  const login = async (email, password) => {
    // Kullanıcı giriş işlemi
    return await auth.signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    // Kullanıcı çıkış işlemi
    return await auth.signOut(auth);
  };

  const signUp = async (email, password) => {
    // Kullanıcı kaydı
    return await auth.createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, signUp }}>
      {children}
>>>>>>> b07d740 (Initial commit)
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
<<<<<<< HEAD
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
=======
  return useContext(AuthContext);
>>>>>>> b07d740 (Initial commit)
};
