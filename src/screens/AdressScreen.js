import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';

const AddressSelectionScreen = () => {
  const [addresses, setAddresses] = useState([]);
  const navigation = useNavigation();
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!userId) {
        Alert.alert('Hata', 'Kullanıcı oturumu bulunamadı.');
        return;
      }

      try {
        const addressesCollection = collection(db, 'users', userId, 'address');
        const querySnapshot = await getDocs(addressesCollection);
        const fetchedAddresses = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAddresses(fetchedAddresses);
      } catch (error) {
        console.error('Adresler alınırken hata oluştu:', error);
        Alert.alert('Hata', 'Adresler alınamadı, lütfen tekrar deneyin.');
      }
    };

    fetchAddresses();
  }, [userId]);

  const handleAddNewAddress = () => {
    navigation.navigate('LocationScreen');
  };

  const handleUpdateAddress = (addressId) => {
    navigation.navigate('LocationScreen', { addressId });
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteDoc(doc(db, 'users', userId, 'address', addressId));
      setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== addressId));
      Alert.alert('Başarılı', 'Adres başarıyla silindi.');
    } catch (error) {
      console.error('Adres silinirken hata oluştu:', error);
      Alert.alert('Hata', 'Adres silinemedi, lütfen tekrar deneyin.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.addressItem}>
      <TouchableOpacity onPress={() => handleUpdateAddress(item.id)}>
        <Text style={styles.addressText}>
          {item.street}, {item.district}, {item.city}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteAddress(item.id)}
      >
        <Text style={styles.deleteButtonText}>Sil</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teslimat Adresi Seç</Text>

      <TouchableOpacity style={styles.addButton} onPress={handleAddNewAddress}>
        <Text style={styles.addButtonText}>Yeni Adres Ekle</Text>
      </TouchableOpacity>

      {addresses.length > 0 ? (
        <FlatList
          data={addresses}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noAddressText}>Henüz adres eklenmemiş.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#d91112',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noAddressText: {
    fontSize: 16,
    color: '#888',
  },
});

export default AddressSelectionScreen;
