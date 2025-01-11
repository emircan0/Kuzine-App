import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import styles from '../styles/BottomNavStyles.js';

const BottomNav = () => {
  const navigation = useNavigation();
  const { chefId } = useCart(); // Global state'den chefId'yi al
  const [navKey, setNavKey] = useState(0); // Ekranın key'ini yönetmek için state
  const [currentScreen, setCurrentScreen] = useState('Home'); // Geçerli ekranı takip et

<<<<<<< HEAD
  const handleNavigation = async (screen) => {
    try {
      setNavKey(prevKey => prevKey + 1);
      await navigation.navigate(screen, { chefId });
    } catch (error) {
      console.error('Navigation hatası:', error);
      Alert.alert('Hata', 'Sayfa geçişi sırasında bir hata oluştu.');
    }
=======
  const handleNavigation = (screen) => {
    setNavKey(prevKey => prevKey + 1); // Key'i güncelle
    navigation.navigate(screen, { chefId }); // Geçiş yap
>>>>>>> b07d740 (Initial commit)
  };

  useFocusEffect(
    React.useCallback(() => {
      const routeName = navigation.getState().routes[navigation.getState().index].name;
      setCurrentScreen(routeName);
    }, [navigation])
  );

  const getIconColor = (screen) => {
    return currentScreen === screen ? 'white' : 'white'; // Aktif ekran kırmızı, diğerleri gri
  };

  return (
    <View style={styles.bottomNav} key={navKey}>
      <TouchableOpacity onPress={() => handleNavigation('Home')} style={styles.navItem}>
        <MaterialIcons name="home" size={24} style={[styles.iconStyle, { color: getIconColor('Home') }]} />
        <Text style={styles.navLabel}>Anasayfa</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Fav')} style={styles.navItem}>
        <MaterialIcons name="favorite" size={24} style={[styles.iconStyle, { color: getIconColor('AddChef') }]} />
        <Text style={styles.navLabel}>Favorilerim</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Cart')} style={styles.navItem}>
        <MaterialIcons name="shopping-cart" size={24} style={[styles.iconStyle, { color: getIconColor('Cart') }]} />
        <Text style={styles.navLabel}>Sepetim</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Orders')} style={styles.navItem}>
        <MaterialIcons name="food-bank" size={24} style={[styles.iconStyle, { color: getIconColor('Orders') }]} />
        <Text style={styles.navLabel}>Siparişlerim</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Profile')} style={styles.navItem}>
        <MaterialIcons name="person" size={24} style={[styles.iconStyle, { color: getIconColor('Profile') }]} />
        <Text style={styles.navLabel}>Hesabım</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;
