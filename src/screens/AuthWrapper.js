// src/screens/AuthWrapper.js
import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, View, Alert } from 'react-native';
import AuthScreen from './AuthScreen';
import AuthenticatedScreen from './AuthenticatedScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import appStyles from '../styles/appStyles';

const AuthWrapper = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#e74c3c" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <ScrollView contentContainerStyle={appStyles.container}>
      {user ? (
        <AuthenticatedScreen user={user} handleLogout={() => auth.signOut()} />
      ) : (
        <AuthScreen
          navigation={navigation}
          // Pass all necessary props here
        />
      )}
    </ScrollView>
  );
};

export default AuthWrapper;
