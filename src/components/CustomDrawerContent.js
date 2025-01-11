import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import {getAuth, signOut } from 'firebase/auth';
const auth = getAuth();

const handleLogout = () => {
  signOut(auth)
    .then(() => {
      Alert.alert('Çıkış Yapıldı', 'Başarıyla çıkış yaptınız.');
      navigation.replace('Auth', { screen: 'Login' });
    }) 
    .catch((error) => {
      Alert.alert('Hata', error.message);
    });
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>


      <DrawerItemList {...props} />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default CustomDrawerContent;
