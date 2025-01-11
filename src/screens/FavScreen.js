<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Animated
} from 'react-native';
import { db, auth } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/FavScreenStyles';


const FavScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const fetchFavorites = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const favoriteChefs = userData?.favoriteChefs || [];

        if (favoriteChefs.length === 0) {
          setFavorites([]);
          setLoading(false);
          return;
        }

        const chefDetails = await Promise.all(
          favoriteChefs.map(async (chefId) => {
            try {
              const chefRef = doc(db, 'chefs', chefId);
              const chefDoc = await getDoc(chefRef);
              
              if (chefDoc.exists()) {
                const chefData = chefDoc.data();
                return { 
                  id: chefDoc.id,
                  firstName: chefData.firstName || '',
                  lastName: chefData.lastName || '',
                  specialty: chefData.specialty || 'Şef',
                  profileImage: chefData.profileImage || 'https://firebasestorage.googleapis.com/v0/b/kuzine-app.appspot.com/o/defaults%2Fchef-avatar.png?alt=media',
                  coverImage: chefData.coverImage,
                  city: chefData.city || '',
                  description: chefData.description || '',
                  totalRatings: chefData.totalRatings || 0,
                  totalStars: chefData.totalStars || 0,
                  averageRating: chefData.averageRating || 0,
                  menu: chefData.menu || [],
                  categories: chefData.categories || [],
                  minOrderAmount: chefData.minOrderAmount || 0,
                  deliveryFee: chefData.deliveryFee || 0,
                  preparationTime: chefData.preparationTime || '30-45',
                  isActive: chefData.isActive ?? true,
                };
              }
              return null;
            } catch (error) {
              console.error(`Şef verileri alınırken hata (${chefId}):`, error);
              return null;
            }
          })
        );

        const validChefs = chefDetails.filter(Boolean);
        setFavorites(validChefs);
      }
    } catch (error) {
      setError(error.message);
      console.error("Favori şefler yüklenirken hata:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFavorites();
  }, [fetchFavorites]);
=======
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { db, auth } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import BottomNav from '../components/BottomNav';
import { Swipeable } from 'react-native-gesture-handler';

const FavScreen = () => {
  const [favorites, setFavorites] = useState([]); // Favori şefleri tutacak state
  const [loading, setLoading] = useState(true); // Veriler yüklenirken gösterilecek loading durumu

  // Firestore'dan favori şefleri çekme
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            const favoriteChefs = data.favoriteChefs || []; // Favori şefler dizisini al

            // Favori şeflerin detaylarını almak için bir sorgu yapılabilir
            const chefDetails = await Promise.all(
              favoriteChefs.map(async (chefId) => {
                const chefRef = doc(db, 'chefs', chefId); // Chefler koleksiyonuna sorgu gönder
                const chefDoc = await getDoc(chefRef);
                if (chefDoc.exists()) {
                  return { ...chefDoc.data(), id: chefDoc.id }; // Şef detaylarını döndür
                }
              })
            );

            setFavorites(chefDetails.filter(Boolean)); // Yalnızca geçerli verileri set et
          }
        }
      } catch (error) {
        console.error("Favori şefler çekilirken hata oluştu:", error);
      } finally {
        setLoading(false); // Veri çekildikten sonra loading durumunu kapat
      }
    };

    fetchFavorites();
  }, []);
>>>>>>> b07d740 (Initial commit)

  const removeFromFavorites = async (chefId) => {
    try {
      const currentUser = auth.currentUser;
<<<<<<< HEAD
      if (!currentUser) return;

      await updateDoc(doc(db, 'users', currentUser.uid), {
        favoriteChefs: arrayRemove(chefId)
      });

      setFavorites((prev) => prev.filter(chef => chef.id !== chefId));
      Alert.alert("Başarılı", "Şef favorilerden kaldırıldı.");
    } catch (error) {
      console.error("Favorilerden çıkarma işlemi sırasında hata:", error);
      Alert.alert(
        "Hata",
        "Şef favorilerden kaldırılırken bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  };

  const renderRightActions = (chef, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.removeButton, { transform: [{ scale }] }]}>
        <TouchableOpacity 
          onPress={() => removeFromFavorites(chef.id)}
          style={styles.removeButtonContent}
        >
          <Ionicons name="trash-outline" size={24} color="#fff" />
          <Text style={styles.removeButtonText}>Kaldır</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const navigateToChefProfile = (chef) => {
    navigation.navigate('ChiefProfile', { 
      chefId: chef.id,
      chefData: {
        ...chef,
        rating: chef.averageRating,
        reviewCount: chef.totalRatings,
      }
    });
  };

  const renderChefCard = (chef) => {
    const rating = chef.averageRating || 0;
    const reviewCount = chef.totalRatings || 0;

    return (
      <TouchableOpacity
        style={styles.chefCard}
        onPress={() => navigateToChefProfile(chef)}
        activeOpacity={0.7}
      >
        <Image 
          source={{ uri: chef.profileImage }} 
          style={styles.chefImage}
        />
        <View style={styles.chefInfo}>
          <Text style={styles.chefName}>
            {chef.firstName} {chef.lastName}
          </Text>
          <Text style={styles.chefSpecialty}>
            {chef.specialty}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>
              {rating.toFixed(1)} ({reviewCount} değerlendirme)
            </Text>
          </View>
        </View>
        <Ionicons 
          name="chevron-forward" 
          size={24} 
          color="#666" 
          style={styles.chevron}
        />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D91112" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchFavorites}
          >
            <Text style={styles.retryButtonText}>Tekrar Dene</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favori Şeflerim</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#D91112"]}
          />
        }
      >
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={64} color="#ccc" />
            <Text style={styles.emptyMessage}>
              Henüz favori şefiniz bulunmuyor.
            </Text>
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => navigation.navigate('AllChefs')}
            >
              <Text style={styles.exploreButtonText}>Şefleri Keşfet</Text>
            </TouchableOpacity>
          </View>
=======
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        favoriteChefs: arrayRemove(chefId) // Firestore'dan favorilerden çıkarma işlemi
      });

      // Favori şefler listesini UI'da güncelle
      setFavorites((prevFavorites) => prevFavorites.filter(chef => chef.id !== chefId));
    } catch (error) {
      console.error("Favorilerden çıkarma işlemi sırasında hata:", error);
    }
  };

  const renderRightActions = (chef) => {
    return (
      <View style={styles.removeButton}>
        <TouchableOpacity onPress={() => removeFromFavorites(chef.id)} style={styles.removeButtonContent}>
          <Text style={styles.removeButtonTitle}>Favorilerden Kaldır</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favori Şefler</Text>
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <Text style={styles.emptyMessage}>Yükleniyor...</Text>
        ) : favorites.length === 0 ? (
          <Text style={styles.emptyMessage}>Henüz favori şefiniz yok.</Text>
>>>>>>> b07d740 (Initial commit)
        ) : (
          favorites.map((chef) => (
            <Swipeable
              key={chef.id}
<<<<<<< HEAD
              renderRightActions={(_, dragX) => renderRightActions(chef, dragX)}
              rightThreshold={40}
            >
              {renderChefCard(chef)}
=======
              renderRightActions={() => renderRightActions(chef)} // Sola kaydırınca görünecek buton
            >
              <View style={styles.chefCard}>
                <Image source={{ uri: chef.profileImage || 'default_image_url' }} style={styles.chefImage} />
                <Text style={styles.chefName}>{chef.firstName} {chef.lastName}</Text>
                <Text style={styles.chefDescription}>{chef.occupation || 'Açıklama yok'}</Text>
              </View>
>>>>>>> b07d740 (Initial commit)
            </Swipeable>
          ))
        )}
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
};

<<<<<<< HEAD
=======
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chefCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    elevation: 2,
    flexDirection: 'row', // Şef kartını yatayda yerleştirmek için
  },
  chefImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  chefName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chefDescription: {
    color: 'gray',
    marginTop: 4,
    flex: 1,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#ff4d4d',
    borderRadius: 10,
    padding: 10,
  },
  removeButtonContent: {
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

>>>>>>> b07d740 (Initial commit)
export default FavScreen;
