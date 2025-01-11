import React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import authenticatedScreenStyles from '../styles/authenticatedScreenStyles';

const AuthenticatedScreen = ({ user, handleLogout }) => {
  return (
    <SafeAreaView style={authenticatedScreenStyles.safeArea}>
      <View style={authenticatedScreenStyles.authContainer}>
        <Text style={authenticatedScreenStyles.title}>Hoş Geldiniz</Text>
        <Text style={authenticatedScreenStyles.emailText}>{user.email}</Text>
        <Button title="Çıkış Yap" onPress={handleLogout} color="#e74c3c" />
      </View>
    </SafeAreaView>
  );
};

export default AuthenticatedScreen;
