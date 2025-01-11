<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  Alert, 
  ScrollView,
  ActivityIndicator,
  RefreshControl 
} from 'react-native';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'; 
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav'; 
import ProfileScreenStyles from '../styles/ProfileScreenStyles';
import { db } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [addressCount, setAddressCount] = useState(0);

  const navigation = useNavigation();
  const auth = getAuth();

  const loadUserData = useCallback(async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        
        // Firestore'dan kullanıcı verilerini al
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

        // Sipariş sayısını al
        const ordersSnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'orders'));
        setOrderCount(ordersSnapshot.size);

        // Adres sayısını al
        const addressesSnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'addresses'));
        setAddressCount(addressesSnapshot.size);
      }
    } catch (error) {
      console.error('Kullanıcı verileri yüklenirken hata:', error);
      Alert.alert('Hata', 'Kullanıcı bilgileri yüklenemedi.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [auth]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadUserData();
  }, [loadUserData]);

  const handleImagePicker = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Galeri erişim izni gerekiyor.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        await updateProfilePhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Hata', 'Fotoğraf seçilirken bir hata oluştu.');
    }
  };

  const updateProfilePhoto = async (uri) => {
    if (!user) return;
    
    setUploading(true);
    try {
      const storage = getStorage();
      const fileName = `profileImages/${user.uid}_${Date.now()}.jpg`;
      const storageRef = ref(storage, fileName);

      if (user.photoURL) {
        try {
          const oldImageRef = ref(storage, user.photoURL);
          await deleteObject(oldImageRef);
        } catch (error) {
          console.log('Eski fotoğraf silinirken hata:', error);
        }
      }

      const response = await fetch(uri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(user, { photoURL: downloadURL });
      await updateDoc(doc(db, 'users', user.uid), {
        photoURL: downloadURL,
        updatedAt: new Date()
      });

      setUser({ ...user, photoURL: downloadURL });
      Alert.alert('Başarılı', 'Profil fotoğrafınız güncellendi.');
    } catch (error) {
      Alert.alert('Hata', 'Fotoğraf yüklenirken bir hata oluştu.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async () => {
    if (!user?.photoURL) return;

    Alert.alert(
      'Fotoğrafı Sil',
      'Profil fotoğrafınızı silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            setUploading(true);
            try {
              const storage = getStorage();
              const imageRef = ref(storage, user.photoURL);
              await deleteObject(imageRef);
              await updateProfile(user, { photoURL: null });
              await updateDoc(doc(db, 'users', user.uid), {
                photoURL: null,
                updatedAt: new Date()
              });
              
              setUser({ ...user, photoURL: null });
              Alert.alert('Başarılı', 'Profil fotoğrafınız silindi.');
            } catch (error) {
              Alert.alert('Hata', 'Fotoğraf silinirken bir hata oluştu.');
            } finally {
              setUploading(false);
            }
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              navigation.replace('Auth');
            } catch (error) {
              Alert.alert('Hata', 'Çıkış yapılırken bir hata oluştu.');
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={ProfileScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#D91112" />
      </View>
    );
  }

  return (
    <SafeAreaView style={ProfileScreenStyles.safeArea}>
      <ScrollView 
        style={ProfileScreenStyles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={ProfileScreenStyles.header}>
          <Text style={ProfileScreenStyles.headerTitle}>Profil</Text>
        </View>

        <View style={ProfileScreenStyles.userInfoCard}>
          <TouchableOpacity 
            style={ProfileScreenStyles.imageContainer} 
            onPress={handleImagePicker}
            disabled={uploading}
          >
            {uploading ? (
              <View style={ProfileScreenStyles.uploadingContainer}>
                <ActivityIndicator color="#D91112" />
              </View>
            ) : (
              <>
                <Image
                  source={{ 
                    uri: user?.photoURL || 'https://via.placeholder.com/100'
                  }}
                  style={ProfileScreenStyles.profileImage}
                />
                <View style={ProfileScreenStyles.editIconContainer}>
                  <Ionicons name="camera" size={20} color="#fff" />
                </View>
              </>
            )}
          </TouchableOpacity>

          <Text style={ProfileScreenStyles.userName}>
            {user?.displayName || 'İsimsiz Kullanıcı'}
          </Text>
          <Text style={ProfileScreenStyles.userEmail}>{user?.email}</Text>
          
          {user?.photoURL && (
            <TouchableOpacity 
              style={ProfileScreenStyles.deletePhotoButton}
              onPress={handleDeletePhoto}
            >
              <Text style={ProfileScreenStyles.deletePhotoText}>
                Fotoğrafı Kaldır
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={ProfileScreenStyles.statsContainer}>
          <View style={ProfileScreenStyles.statItem}>
            <Text style={ProfileScreenStyles.statNumber}>{orderCount}</Text>
            <Text style={ProfileScreenStyles.statLabel}>Sipariş</Text>
          </View>
          <View style={ProfileScreenStyles.statItem}>
            <Text style={ProfileScreenStyles.statNumber}>{addressCount}</Text>
            <Text style={ProfileScreenStyles.statLabel}>Adres</Text>
          </View>
        </View>

        <View style={ProfileScreenStyles.optionsContainer}>
          <TouchableOpacity 
            style={ProfileScreenStyles.optionButton}
            onPress={() => navigation.navigate('Orders')}
          >
            <Ionicons name="receipt-outline" size={24} color="#333" />
            <Text style={ProfileScreenStyles.optionText}>Siparişlerim</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={ProfileScreenStyles.optionButton}
            onPress={() => navigation.navigate('Adreslerim')}
          >
            <Ionicons name="location-outline" size={24} color="#333" />
            <Text style={ProfileScreenStyles.optionText}>Adreslerim</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={ProfileScreenStyles.optionButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={24} color="#333" />
            <Text style={ProfileScreenStyles.optionText}>Ayarlar</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={ProfileScreenStyles.optionButton}
            onPress={() => navigation.navigate('Help')}
          >
            <Ionicons name="help-circle-outline" size={24} color="#333" />
            <Text style={ProfileScreenStyles.optionText}>Yardım</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={ProfileScreenStyles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <Text style={ProfileScreenStyles.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
=======
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, Alert, ScrollView } from 'react-native';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'; 
import BottomNav from '../components/BottomNav'; 
import ProfileScreenStyles from '../styles/ProfileScreenStyles';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100'); // Default image
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setProfileImage(currentUser.photoURL || 'https://via.placeholder.com/100'); // Ensure default image is used if no photoURL
    }
  }, [auth]);

  // Navigasyon ayarları
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('İzin Gerekli', 'Kütüphanenize erişim izni vermeniz gerekiyor.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      console.log('Kullanıcı fotoğraf seçimden vazgeçti');
      return;
    }

    const source = result.assets[0].uri;
    setProfileImage(source);
    updateProfilePhoto(source);
  };

  const updateProfilePhoto = async (uri) => {
    const storage = getStorage();
    const response = await fetch(uri);
    const blob = await response.blob();
    
    const storageRef = ref(storage, `profileImages/${user.uid}.jpg`);

    try {
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, { photoURL: downloadURL });
      Alert.alert('Başarı', 'Profil fotoğrafınız güncellendi.');
      setProfileImage(downloadURL); // Update the profileImage state with the new URL
    } catch (error) {
      Alert.alert('Hata', error.message);
    }
  };

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

  const handleDeletePhoto = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, `profileImages/${user.uid}.jpg`);

    try {
      await deleteObject(storageRef);
      await updateProfile(auth.currentUser, { photoURL: null });
      setProfileImage('https://via.placeholder.com/100'); // Reset to default image
      Alert.alert('Başarı', 'Profil fotoğrafınız silindi.');
    } catch (error) {
      Alert.alert('Hata', error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={ProfileScreenStyles.container}>  
        <View style={ProfileScreenStyles.userInfoCard}>
          <TouchableOpacity onPress={handleImagePicker}>
            <Image
              source={{ uri: profileImage }}
              style={ProfileScreenStyles.profileImage}
            />
          </TouchableOpacity>
          <Text style={[ProfileScreenStyles.userName, { fontFamily: 'quicksand-bold' }]}>{user?.displayName || 'Bilinmiyor'}</Text>
          <Text style={[ProfileScreenStyles.userEmail, { fontFamily: 'quicksand-regular' }]}>{user?.email}</Text>
          <Text style={[ProfileScreenStyles.userPhone, { fontFamily: 'quicksand-regular' }]}>{user?.phoneNumber || 'Bilinmiyor'}</Text>
          <TouchableOpacity style={ProfileScreenStyles.changeButton}>
            <Text style={ProfileScreenStyles.changeButtonText}>Değiştir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ProfileScreenStyles.deleteButton} onPress={handleDeletePhoto}>
            <Text style={ProfileScreenStyles.deleteButtonText}>Sil</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={ProfileScreenStyles.optionsContainer}>
          <TouchableOpacity style={ProfileScreenStyles.optionButton}>
            <Text style={[ProfileScreenStyles.optionText, { fontFamily: 'quicksand-regular' }]}>Siparişler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ProfileScreenStyles.optionButton}>
            <Text style={[ProfileScreenStyles.optionText, { fontFamily: 'quicksand-regular' }]}>Bekleyen İncelemeler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ProfileScreenStyles.optionButton}>
            <Text style={[ProfileScreenStyles.optionText, { fontFamily: 'quicksand-regular' }]}>Sıkça Sorulan Sorular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ProfileScreenStyles.optionButton}>
            <Text style={[ProfileScreenStyles.optionText, { fontFamily: 'quicksand-regular' }]}>Yardım</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity style={ProfileScreenStyles.updateButton} onPress={handleLogout}>
          <Text style={[ProfileScreenStyles.updateButtonText, { fontFamily: 'quicksand-bold' }]}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>

>>>>>>> b07d740 (Initial commit)
      <BottomNav />
    </SafeAreaView>
  );
};

<<<<<<< HEAD
export default ProfileScreen;
=======
export default ProfileScreen;
>>>>>>> b07d740 (Initial commit)
