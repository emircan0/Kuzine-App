import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import styles from '../styles/CategoryScreenStyles';

const CategoryScreen = ({ route }) => {
  const navigation = useNavigation();
  const { categoryId, categoryTitle } = route.params; // categoryId ve categoryName alındı
  const [filteredKitchens, setFilteredKitchens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
<<<<<<< HEAD
    const fetchFilteredKitchens = async (lastDoc = null, limit = 10) => {
      try {
        let query = collection(db, 'chefs');
        
        if (lastDoc) {
          query = query.startAfter(lastDoc);
        }
        
        query = query.limit(limit);
        
        const snapshot = await getDocs(query);
        const kitchensList = [];
        
        // Şeflerin her birinin foods alt koleksiyonunda kategori ID'sine göre filtreleme
        for (const kitchenDoc of snapshot.docs) {
=======
    const fetchFilteredKitchens = async () => {
      try {
        const kitchensCollection = collection(db, 'chefs');
        const kitchensSnapshot = await getDocs(kitchensCollection);

        const kitchensList = [];

        // Şeflerin her birinin foods alt koleksiyonunda kategori ID'sine göre filtreleme
        for (const kitchenDoc of kitchensSnapshot.docs) {
>>>>>>> b07d740 (Initial commit)
          const foodsCollection = collection(db, `chefs/${kitchenDoc.id}/foods`);
          const foodsSnapshot = await getDocs(foodsCollection);

          // `categoryId` içeren bir yemek varsa kontrol et
          const hasCategory = foodsSnapshot.docs.some(foodDoc => {
            const foodData = foodDoc.data();

            // `categories` içinde kategori id'sine göre kontrol et
            return foodData.categories && foodData.categories.some(category => category.id === categoryId);
          });

          // Eğer şefin herhangi bir yemeği bu kategoriye sahipse listeye ekle
          if (hasCategory) {
            kitchensList.push({
              id: kitchenDoc.id,
              ...kitchenDoc.data(),
            });
          }
        }

        setFilteredKitchens(kitchensList);
<<<<<<< HEAD
        return {
          kitchens: kitchensList,
          lastDoc: snapshot.docs[snapshot.docs.length - 1]
        };
      } catch (error) {
        console.error('Veri çekme hatası:', error);
        throw error;
=======
      } catch (error) {
        console.error('Error fetching kitchens: ', error);
      } finally {
        setLoading(false);
>>>>>>> b07d740 (Initial commit)
      }
    };

    fetchFilteredKitchens();
  }, [categoryId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Şefler Kategorisi</Text> 
        <Text style={styles.categoryName}>{categoryTitle}</Text> 
      </View>

      {filteredKitchens.length > 0 ? (
        filteredKitchens.map((kitchen) => (
          <TouchableOpacity
            key={kitchen.id}
            onPress={() => navigation.navigate('ChiefProfile', { id: kitchen.id, name: kitchen.firstName })}
          >
            <View style={styles.kitchenCard}>
              <Image
                source={{ uri: kitchen.profileImage || 'https://via.placeholder.com/100x100' }}
                style={styles.profileImage}
              />
              <View style={styles.kitchenInfo}>
                <Text style={styles.kitchenName}>{kitchen.firstName} {kitchen.lastName}</Text>
                <Text style={styles.kitchenDescription}>{kitchen.occupation || 'Açıklama yok'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noKitchens}>Bu kategoriye ait şef bulunmamaktadır.</Text>
      )}
    </ScrollView>
  );
};

export default CategoryScreen;
