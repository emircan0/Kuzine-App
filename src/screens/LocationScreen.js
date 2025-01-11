<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, doc, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import locationScreenStyles from '../styles/locationScreenStyles';

const LocationScreen = ({ navigation }) => {
  // State tanımlamaları
  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    district: '',
    neighborhood: '',
    streetNumber: '',
    title: '', // Adres başlığı eklendi (örn: Ev, İş)
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  // Konum izni ve mevcut konumu alma
  const getCurrentLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Konum izni verilmedi');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 15000
      });

      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setCurrentLocation(newLocation);
      setSelectedLocation(newLocation);

      // Reverse geocoding
      const reverseGeocode = await Location.reverseGeocodeAsync(newLocation);

      if (reverseGeocode?.[0]) {
        const { street, city, region, district, name } = reverseGeocode[0];
        setAddress(prev => ({
          ...prev,
          street: street || '',
          city: city || '',
          district: district || region || '',
          neighborhood: name || '',
        }));
      }
    } catch (err) {
      setError(err.message);
      Alert.alert('Hata', `Konum alınamadı: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const handleAddressChange = (field, value) => {
    setAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateAddress = () => {
    const requiredFields = ['title', 'street', 'city', 'district'];
    const missingFields = requiredFields.filter(field => !address[field]);
    
    if (missingFields.length > 0) {
      Alert.alert('Eksik Bilgi', 'Lütfen tüm zorunlu alanları doldurun.');
      return false;
    }
    return true;
  };

  const saveAddressToFirestore = async () => {
    if (!userId) {
      Alert.alert('Hata', 'Lütfen önce giriş yapın.');
      return;
    }

    if (!selectedLocation) {
      Alert.alert('Hata', 'Lütfen haritadan bir konum seçin.');
      return;
    }

    if (!validateAddress()) return;

    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', userId);
      const addressCollectionRef = collection(userDocRef, 'addresses');

      await addDoc(addressCollectionRef, {
        ...address,
        coordinates: selectedLocation,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      Alert.alert('Başarılı', 'Adres başarıyla kaydedildi.', [
        { text: 'Tamam', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Adres kaydetme hatası:', error);
      Alert.alert('Hata', `Adres kaydedilemedi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <View style={locationScreenStyles.errorContainer}>
        <Text style={locationScreenStyles.errorText}>{error}</Text>
        <TouchableOpacity
          style={locationScreenStyles.retryButton}
          onPress={getCurrentLocation}
        >
          <Text style={locationScreenStyles.retryText}>Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={locationScreenStyles.container}
    >
      <ScrollView 
        contentContainerStyle={locationScreenStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={locationScreenStyles.title}>Konum Seçin</Text>
        
        {loading && !currentLocation ? (
          <ActivityIndicator size="large" color="#d91112" />
        ) : (
          <>
            <View style={locationScreenStyles.mapContainer}>
              <MapView
                style={[
                  locationScreenStyles.map,
                  isMapExpanded && locationScreenStyles.expandedMap
                ]}
                initialRegion={{
                  latitude: currentLocation?.latitude || 41.0082,
                  longitude: currentLocation?.longitude || 28.9784,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onPress={(e) => setSelectedLocation(e.nativeEvent.coordinate)}
              >
                {selectedLocation && (
                  <Marker 
                    coordinate={selectedLocation}
                    draggable
                    onDragEnd={(e) => setSelectedLocation(e.nativeEvent.coordinate)}
                  />
                )}
              </MapView>
              
              <TouchableOpacity
                style={locationScreenStyles.refreshButton}
                onPress={getCurrentLocation}
              >
                <Ionicons name="refresh" size={24} color="#d91112" />
              </TouchableOpacity>

              <TouchableOpacity
                style={locationScreenStyles.expandButton}
                onPress={() => setIsMapExpanded(!isMapExpanded)}
              >
                <Text style={locationScreenStyles.expandText}>
                  {isMapExpanded ? 'Haritayı Küçült' : 'Haritayı Büyüt'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={locationScreenStyles.formContainer}>
              <TextInput
                style={locationScreenStyles.input}
                placeholder="Adres Başlığı (örn: Ev, İş)"
                value={address.title}
                onChangeText={(text) => handleAddressChange('title', text)}
              />

              <TextInput
                style={locationScreenStyles.input}
                placeholder="Sokak"
                value={address.street}
                onChangeText={(text) => handleAddressChange('street', text)}
              />

              <TextInput
                style={locationScreenStyles.input}
                placeholder="Mahalle"
                value={address.neighborhood}
                onChangeText={(text) => handleAddressChange('neighborhood', text)}
              />

              <TextInput
                style={locationScreenStyles.input}
                placeholder="İlçe"
                value={address.district}
                onChangeText={(text) => handleAddressChange('district', text)}
              />

              <TextInput
                style={locationScreenStyles.input}
                placeholder="Şehir"
                value={address.city}
                onChangeText={(text) => handleAddressChange('city', text)}
              />

              <TextInput
                style={locationScreenStyles.input}
                placeholder="Bina No"
                value={address.streetNumber}
                keyboardType="numeric"
                onChangeText={(text) => handleAddressChange('streetNumber', text)}
              />

              <TouchableOpacity
                style={[
                  locationScreenStyles.confirmButton,
                  loading && locationScreenStyles.disabledButton
                ]}
                onPress={saveAddressToFirestore}
                disabled={loading}
              >
                <Text style={locationScreenStyles.confirmText}>
                  {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LocationScreen;
=======
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import DropDownPicker from 'react-native-dropdown-picker';
import locationScreenStyles from '../styles/locationScreenStyles';
import { Ionicons } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const LocationScreen = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const [cityOpen, setCityOpen] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  const cities = [
    { label: 'İstanbul', value: 'İstanbul' },
    { label: 'Ankara', value: 'Ankara' },
    { label: 'İzmir', value: 'İzmir' },
  ];

  const districts = {
    'İstanbul': [
      { label: 'Kadıköy', value: 'Kadıköy' },
      { label: 'Beşiktaş', value: 'Beşiktaş' },
      { label: 'Beyoğlu', value: 'Beyoğlu' },
    ],
    'Ankara': [
      { label: 'Çankaya', value: 'Çankaya' },
      { label: 'Keçiören', value: 'Keçiören' },
      { label: 'Mamak', value: 'Mamak' },
    ],
    'İzmir': [
      { label: 'Konak', value: 'Konak' },
      { label: 'Karşıyaka', value: 'Karşıyaka' },
      { label: 'Bornova', value: 'Bornova' },
    ],
  };

  const [districtOptions, setDistrictOptions] = useState([]);

  useEffect(() => {
    const getCurrentLocation = async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Konum izni verilmedi');
        setLoading(false);
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setSelectedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
  
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
  
      if (reverseGeocode.length > 0) {
        const { street, city, region, name, streetNumber } = reverseGeocode[0];
        setAddress({
          street: street || '',
          city: city || '',
          district: region || '',
          neighborhood: name || '',
          streetNumber: streetNumber || ''
        });
      }
  
      setLoading(false);
    };
  
    getCurrentLocation();
  }, []);

  const saveAddressToFirestore = async () => {
    // Tüm alanlar dolu mu kontrol et
    if (!address.street || !address.city || !address.district) {
      Alert.alert('Hata', 'Lütfen tüm adres bilgilerini doldurun.');
      return;
    }

      setLoading(true);
  try {
    // users koleksiyonu altına adresi address alt koleksiyonu olarak kaydet
    const userDocRef = doc(db, 'users', userId);
    const addressCollectionRef = collection(userDocRef, 'address'); // address alt koleksiyonu oluştur

    await addDoc(addressCollectionRef, {
      street: address.street,
      city: address.district,
      district: address.city,
      neighborhood: address.neighborhood || 'Belirtilmedi',
      streetNumber: address.streetNumber || 'Belirtilmedi',
      coords: selectedLocation || { latitude: 0, longitude: 0 },
      timestamp: new Date().toISOString(),
    });

    Alert.alert('Başarılı', 'Adres başarıyla kaydedildi.');
  } catch (error) {
    console.error('Adres kaydedilirken hata oluştu:', error);
    Alert.alert('Hata', 'Adres kaydedilemedi, lütfen tekrar deneyin.');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (city) {
      setDistrictOptions(districts[city] || []);
      setDistrict(null);
    }
  }, [city]);

  const renderContent = () => (
    <View style={locationScreenStyles.scrollViewContent}>
      <MapView
        style={[locationScreenStyles.map, isMapExpanded && locationScreenStyles.expandedMap]}
        initialRegion={{
          latitude: currentLocation?.latitude || 37.78825,
          longitude: currentLocation?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => setSelectedLocation(e.nativeEvent.coordinate)}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>

      <TextInput
        style={locationScreenStyles.input}
        placeholder="Şehir"
        value={address.district}
        onChangeText={(text) => setAddress((prev) => ({ ...prev, city: text }))}
      />

      <TextInput
        style={locationScreenStyles.input}
        placeholder="Semt"
        value={address.city}
        onChangeText={(text) => setAddress((prev) => ({ ...prev, district: text }))}
      />

      <TextInput
        style={locationScreenStyles.input}
        placeholder="Sokak Adı"
        value={address.street}
        onChangeText={(text) => setAddress((prev) => ({ ...prev, street: text }))}
      />

      <TextInput
        style={locationScreenStyles.input}
        placeholder="No"
        value={address.streetNumber}
        onChangeText={(text) => setAddress((prev) => ({ ...prev, streetNumber: text }))}
      />

      <TouchableOpacity
        style={locationScreenStyles.confirmButton}
        onPress={saveAddressToFirestore}
      >
        <Text style={locationScreenStyles.confirmText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={locationScreenStyles.container}>
      <Text style={locationScreenStyles.title}>Konum Seçin</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#d91112" />
      ) : (
        <FlatList
          data={[{ key: 'content' }]} 
          renderItem={renderContent}
          keyExtractor={(item) => item.key}
        />
      )}
    </View>
  );
};

export default LocationScreen;
>>>>>>> b07d740 (Initial commit)
