import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import styles from '../styles/AllChefsStyles';
import { Ionicons } from '@expo/vector-icons';

const AllChefsScreen = ({ navigation }) => {
  const [kitchens, setKitchens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const kitchensCollection = collection(db, 'chefs');
        const kitchensSnapshot = await getDocs(kitchensCollection);
        const kitchensList = kitchensSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setKitchens(kitchensList);
      } catch (error) {
        console.error('Error fetching kitchens: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKitchens();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container}>
        {kitchens.map(kitchen => (
          <TouchableOpacity
            key={kitchen.id}
            onPress={() => navigation.navigate('ChiefProfile', { id: kitchen.id, ...kitchen })}
          >
            <View style={styles.kitchenCard}>
              <Image source={{ uri: kitchen.coverImage || 'https://via.placeholder.com/600x200' }} style={styles.coverImage} />
              <Image source={{ uri: kitchen.profileImage || 'https://via.placeholder.com/100x100' }} style={styles.profileImage} />
              <View style={styles.kitchenInfoContainer}>
                {/* Şefin adı ve soyadı */}
                <Text style={styles.kitchenName}>{`${kitchen.firstName} ${kitchen.lastName}`}</Text>
                
                {/* Şefin mesleği */}
                <Text style={styles.kitchenOccupation}>{kitchen.occupation || 'Meslek bilgisi yok'}</Text>
                
                {/* Şefin bulunduğu şehir */}
                <Text style={styles.kitchenLocation}>{kitchen.city || 'Lokasyon bilgisi yok'}</Text>
                
                {/* Şefin ortalama derecelendirmesi */}
                {kitchen.averageRating !== undefined && (
                  <Text style={styles.kitchenRating}>{`Rating: ${kitchen.averageRating.toFixed(1)}`}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllChefsScreen;
