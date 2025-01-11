// HomeScreen.js

<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  StatusBar, 
  ActivityIndicator,
  RefreshControl
} from 'react-native';
=======
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Dimensions, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
>>>>>>> b07d740 (Initial commit)
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
<<<<<<< HEAD
import styles, { COLORS } from '../styles/HomeScreenStyles';
import { useCart } from '../context/CartContext';
import BottomNav from '../components/BottomNav';

const categoryImages = {
  'hot-pot': require('../../assets/hot-pot.png'),
  'oven': require('../../assets/oven.png'),
  'sweets': require('../../assets/sweets.png'),
  'buffet': require('../../assets/buffet.png'),
  'vegetarian': require('../../assets/vegetarian.png'),
  'chicken-leg': require('../../assets/chicken-leg.png'),
  'doner-kebab': require('../../assets/doner-kebab.png'),
  'meal': require('../../assets/meal.png'),
  'tea': require('../../assets/tea.png'),
};

const categories = [
  { id: '1', title: 'Tencere Yemekleri', icon: 'hot-pot' },
  { id: '2', title: 'Fırın Yemekleri', icon: 'oven' },
  { id: '3', title: 'Tatlılar', icon: 'sweets' },
  { id: '4', title: 'Davet Yemekleri', icon: 'buffet' },
  { id: '5', title: 'Vejetaryen', icon: 'vegetarian' },
  { id: '6', title: 'Tavuklu Yemekler', icon: 'chicken-leg' },
  { id: '7', title: 'Kebaplar', icon: 'doner-kebab' },
  { id: '8', title: 'Çocuk Yemekleri', icon: 'meal' },
  { id: '9', title: 'Yöresel Yemekler', icon: 'tea' }
];

const campaigns = [
  { id: 1, image: require('../../assets/campaign-0.png') },
  { id: 2, image: require('../../assets/campaign-1.png') },
  { id: 3, image: require('../../assets/campaign-2.png') }
];
=======
import styles from '../styles/HomeScreenStyles';
import { useCart } from '../context/CartContext';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');
>>>>>>> b07d740 (Initial commit)

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState('Konum Seç');
  const [searchQuery, setSearchQuery] = useState('');
<<<<<<< HEAD
  const [chefs, setChefs] = useState([]);
  const [filteredChefs, setFilteredChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { addToCart } = useCart();
=======
  const [kitchens, setKitchens] = useState([]);
  const [filteredKitchens, setFilteredKitchens] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [favoriteKitchens, setFavoriteKitchens] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [rating, setRating] = useState(0);

  const categories = [
    { id: '1', title: 'Tencere Yemekleri' },
    { id: '2', title: 'Fırın Yemekleri' },
    { id: '3', title: 'Tatlılar' },
    { id: '4', title: 'Davet Yemekleri' },
    { id: '5', title: 'Vejetaryen' },
    { id: '6', title: 'Tavuklu Yemekler' },
    { id: '7', title: 'Kebaplar' },
    { id: '8', title: 'Çocuk Yemekleri' },
    { id: '9', title: 'Yöresel Yemekler' }
  ];

  const campaigns = [
    { title: 'Kampanya 1' },
    { title: 'Kampanya 2' },
    { title: 'Kampanya 3' }
  ];

  const campaignImages = [
    require('../../assets/campaign-0.png'),
    require('../../assets/campaign-1.png'),
    require('../../assets/campaign-2.png'),
  ];

  const categoryImages = [
    require('../../assets/hot-pot.png'),
    require('../../assets/oven.png'),
    require('../../assets/sweets.png'),
    require('../../assets/buffet.png'),
    require('../../assets/vegetarian.png'),
    require('../../assets/chicken-leg.png'),
    require('../../assets/doner-kebab.png'),
    require('../../assets/meal.png'),
    require('../../assets/tea.png'),
  ];
>>>>>>> b07d740 (Initial commit)

  useEffect(() => {
    if (route.params?.location) {
      setLocation(route.params.location);
    }
  }, [route.params?.location]);

<<<<<<< HEAD
  const fetchChefs = useCallback(async () => {
    try {
      const chefsCollection = collection(db, 'chefs');
      const chefsSnapshot = await getDocs(chefsCollection);
      const chefsList = await Promise.all(chefsSnapshot.docs.map(async (doc) => {
        const chefData = {
          id: doc.id,
          ...doc.data()
        };

        const comments = chefData.comments ? Object.values(chefData.comments) : [];
        const ratings = comments.map(comment => comment.rating).filter(rating => rating !== undefined);
        const averageRating = ratings.length > 0
          ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
          : '0';

        return { ...chefData, averageRating, ratings };
      }));

      setChefs(chefsList);
      setFilteredChefs(chefsList);
    } catch (error) {
      console.error('Error fetching chefs: ', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchChefs();
  }, [fetchChefs]);

  useEffect(() => {
    const result = chefs.filter(chef =>
      chef.firstName && chef.lastName &&
      `${chef.firstName} ${chef.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredChefs(result);
  }, [searchQuery, chefs]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchChefs();
  }, [fetchChefs]);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/giris.png')} style={styles.logo} />
        </View>
        <TouchableOpacity 
          style={styles.locationButton} 
          onPress={() => navigation.navigate('Adreslerim')}
        >
          <Ionicons name="location-outline" size={20} color={COLORS.white} style={styles.locationIcon} />
          <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color={COLORS.text.secondary} />
      <TextInput
        style={styles.searchInput}
        placeholder="Şef veya yemek ara..."
        placeholderTextColor={COLORS.text.light}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );

  const renderCampaigns = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.campaignsContainer}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {campaigns.map((campaign) => (
        <View key={campaign.id} style={styles.campaignCard}>
          <Image source={campaign.image} style={styles.campaignImage} />
        </View>
      ))}
    </ScrollView>
  );

  const renderCategories = () => (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Kategoriler</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>Tümünü Gör</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => navigation.navigate('CategoryScreen', { 
              categoryId: category.id, 
              categoryTitle: category.title 
            })}
          >
            <View style={styles.categoryImageContainer}>
              <Image 
                source={categoryImages[category.icon]} 
                style={styles.categoryImage} 
              />
            </View>
            <Text style={styles.categoryName}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderChefs = () => (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Yıldızlı Şefler</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Tüm Şefler')}>
          <Text style={styles.viewAll}>Tümünü Gör</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chefsContainer}>
        {filteredChefs.map((chef) => (
          <TouchableOpacity
            key={chef.id}
            onPress={() => navigation.navigate('ChiefProfile', {
              id: chef.id,
              name: `${chef.firstName} Şef`,
              description: chef.occupation || 'Açıklama yok',
              profileImage: chef.profileImage || 'https://via.placeholder.com/100x100',
              coverImage: chef.coverImage || 'https://via.placeholder.com/600x200',
              location: chef.city || 'Şehir bilgisi yok',
              averageRating: chef.averageRating,
            })}
          >
            <View style={styles.chefCard}>
              <Image
                source={{ uri: chef.coverImage || 'https://via.placeholder.com/600x200' }}
                style={styles.chefCoverImage}
              />
              <View style={styles.chefProfileContainer}>
                <Image
                  source={{ uri: chef.profileImage || 'https://via.placeholder.com/100x100' }}
                  style={styles.chefProfileImage}
                />
                <View style={styles.chefInfo}>
                  <Text style={styles.chefName}>{`${chef.firstName} Şef`}</Text>
                  <Text style={styles.chefSpecialty}>
                    {chef.occupation || 'Açıklama yok'}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color={COLORS.primary} />
                    <Text style={styles.rating}>{chef.averageRating}</Text>
                  </View>
                  <Text style={styles.chefLocation}>
                    <Ionicons name="location" size={12} color={COLORS.text.light} />
                    {' '}{chef.city || 'Şehir bilgisi yok'}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
=======
  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const kitchensCollection = collection(db, 'chefs');
        const kitchensSnapshot = await getDocs(kitchensCollection);
        const kitchensList = await Promise.all(kitchensSnapshot.docs.map(async (doc) => {
          const chefData = {
            id: doc.id,
            ...doc.data()
          };
  
          const comments = chefData.comments ? Object.values(chefData.comments) : [];

          const ratings = comments.map(comment => comment.rating).filter(rating => rating !== undefined);

          const averageRating = ratings.length > 0
            ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
            : '0'; 
  
          return { ...chefData, averageRating, ratings };
        }));
  
        setKitchens(kitchensList);
        setFilteredKitchens(kitchensList);
      } catch (error) {
        console.error('Error fetching kitchens: ', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchKitchens();
  }, []);
  

  useEffect(() => {
    const result = kitchens.filter(kitchen =>
      kitchen.firstName && kitchen.lastName &&
      `${kitchen.firstName} ${kitchen.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredKitchens(result);
  }, [searchQuery, kitchens]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
>>>>>>> b07d740 (Initial commit)
        </View>
      </SafeAreaView>
    );
  }
<<<<<<< HEAD

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderHeader()}
      {renderSearchBar()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderCampaigns()}
        {renderCategories()}
        <View style={styles.divider} />
        {renderChefs()}
      </ScrollView>
      <BottomNav />
=======
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/giris.png')} style={styles.logo} />
          </View>
          <TouchableOpacity style={styles.locationButton} onPress={() => navigation.navigate('Adreslerim')}>
            <Ionicons name="location-outline" size={20} color="#fff" style={styles.locationIcon} />
            <Text style={styles.locationText}>{location}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} style={styles.icon} />
        </TouchableOpacity>

        </View>

        <ScrollView>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Ara..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.campaignsContainer}>
            {campaigns.map((campaign, index) => (
              <View key={index} style={styles.campaignCard}>
                <Image source={campaignImages[index]} style={styles.campaignImage} />
              </View>
            ))}
          </ScrollView>

          <View style={styles.container}>
      <Text style={styles.kategoriBaslik}>Kategoriler</Text>
   
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
  {categories.map((category, index) => (
    <TouchableOpacity
    key={category.id}
    style={styles.categoryCard}
    onPress={() => navigation.navigate('CategoryScreen', { categoryId: category.id, categoryTitle: category.title })}
  >
    <View style={styles.imageContainer}>
      <Image source={categoryImages[index]} style={styles.categoryImage} />
    </View>
    <View style={styles.categoryTextContainer}>
      <Text style={styles.categoryText}>{category.title}</Text>
    </View>
  </TouchableOpacity>
  
  ))}
</ScrollView>

    </View>

          <View style={styles.kitchensHeaderContainer}>
            <View style={styles.header}>
              <Text style={styles.mutfakBaslik}>Yıldızlı Şefler</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Tüm Şefler')}>
                <Text style={styles.tumunuGor}>Tümünü Gör</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
          </View>

          <View style={styles.kitchensContainer}>
            {filteredKitchens.map((kitchen) => (
              <TouchableOpacity
                key={kitchen.id}
                onPress={() => navigation.navigate('ChiefProfile', {
                  id: kitchen.id,
                  name: `${kitchen.firstName} Şef`,
                  description: kitchen.occupation || 'Açıklama yok',
                  profileImage: kitchen.profileImage || 'https://via.placeholder.com/100x100',
                  coverImage: kitchen.coverImage || 'https://via.placeholder.com/600x200',
                  location: kitchen.city || 'Şehir bilgisi yok',
                  distance: kitchen.distance || 'Uzaklık bilgisi yok',
                  averageRating: kitchen.averageRating,
                })}
                onLongPress={() => addToCart(kitchen)}
              >
                <View style={styles.kitchenCard}>
                  <Image
                    source={{ uri: kitchen.coverImage || 'https://via.placeholder.com/600x200' }}
                    style={styles.coverImage}
                  />
                  <Image
                    source={{ uri: kitchen.profileImage || 'https://via.placeholder.com/100x100' }}
                    style={styles.profileImage}
                  />

                  <View style={styles.kitchenInfoContainer}>
                    <View style={styles.kitchenNameContainer}>
                      <View style={styles.kitchenDetails}>
                        <Text style={styles.kitchenName}>{`${kitchen.firstName} Şef`}</Text>
                        <Text style={styles.kitchenRating}>
                          {`Rating: ${Number(kitchen.averageRating || 0).toFixed(1)}`}
                        </Text>
                        </View>
                    </View>
                    <Text style={styles.kitchenDescription}>
                      {kitchen.occupation || 'Açıklama yok'}
                    </Text>
                    <Text style={styles.kitchenLocation}>
                      {kitchen.city || 'Şehir bilgisi yok'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>
        <BottomNav />
      </View>
>>>>>>> b07d740 (Initial commit)
    </SafeAreaView>
  );
};

export default HomeScreen;
