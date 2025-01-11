import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Alert, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';

import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import PhoneAuthScreen from './src/screens/PhoneAuthScreen';
import LocationScreen from './src/screens/LocationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ChiefProfileScreen from './src/screens/ChiefProfileScreen';
import FavScreen from './src/screens/FavScreen';
import CartScreen from './src/screens/CartScreen';
import AllChefsScreen from './src/screens/AllChefsScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
import CustomDrawerContent from './src/components/CustomDrawerContent';
import CategoryScreen from './src/screens/CategoryScreen';
import AdressScreen from './src/screens/AdressScreen';
<<<<<<< HEAD
import SettingsScreen from './src/screens/SettingsScreen';
import HelpScreen from './src/screens/HelpScreen';
=======
>>>>>>> b07d740 (Initial commit)



const Stack = createStackNavigator();
const googleClientId = 'YOUR_GOOGLE_CLIENT_ID_HERE';
const redirectUri = makeRedirectUri({ useProxy: true });

const Drawer = createDrawerNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Orders" component={OrdersScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} options={{ headerShown: false }} />
    <Stack.Screen name="LocationScreen" component={LocationScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ChiefProfile" component={ChiefProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Fav" component={FavScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Tüm Şefler" component={AllChefsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{ headerShown: false }} />
<<<<<<< HEAD
    <Stack.Screen name="Addresses" component={AdressScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Help" component={HelpScreen} options={{ headerShown: false }} />
=======
>>>>>>> b07d740 (Initial commit)
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator
  drawerContent={(props) => <CustomDrawerContent {...props} />}
  screenOptions={{
    drawerPosition: 'right', // Çekmece sağdan açılır
    headerShown: false, // Üst başlık gösterilmez
    drawerStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0)', // Daha açık bir arka plan rengi
      overlayColor: "rgba(0, 0, 0, 0.8)",
      width: 250,
    },
  }}
  >
    <Drawer.Screen name="Kuponlarım" component={MainStackNavigator} options={{ headerShown: false }} />
    <Drawer.Screen name="Siparişlerim" component={ProfileScreen} options={{ headerShown: false }} />
    <Drawer.Screen name="Hesabım" component={OrdersScreen} options={{ headerShown: false }} />
    <Drawer.Screen name="Adreslerim" component={AdressScreen} options={{ headerShown: false }} />
    <Drawer.Screen name="Yardım Merkezi" component={ProfileScreen} options={{ headerShown: false }} />
    <Drawer.Screen name="Arkadaşlarını Davet Et" component={OrdersScreen} options={{ headerShown: false }} />
    <Drawer.Screen name="KKVK" component={FavScreen} options={{ headerShown: false }} />
  </Drawer.Navigator>
);


export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [location, setLocation] = useState(null);

  const [request, response, promptAsync] = useAuthRequest({
    clientId: googleClientId,
    scopes: ['openid', 'profile', 'email'],
    redirectUri,
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(getAuth(), credential)
        .then(() => Alert.alert('Başarılı!', 'Google ile giriş yapıldı.'))
        .catch(() => Alert.alert('Giriş Hatası', 'Google ile giriş yapılamadı. Lütfen tekrar deneyin.'));
    }
  }, [response]);

  const handleAuthentication = async () => {
    try {
      const auth = getAuth();
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      Alert.alert('Kimlik Doğrulama Hatası', error.message || 'Giriş veya kayıt işlemi başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  const handleGoogleLogin = async () => {
    if (request) {
      await promptAsync();
    } else {
      Alert.alert('Hata', 'Google oturumu başlatılamadı.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      Alert.alert('Başarılı!', 'Başarıyla çıkış yapıldı.');
    } catch (error) {
      Alert.alert('Çıkış Hatası', 'Çıkış işlemi başarısız. Lütfen tekrar deneyin.');
    }
  };

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
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <CartProvider>
            <Stack.Navigator>
              {user ? (
                <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
              ) : (
                <Stack.Screen name="Auth" options={{ headerShown: false }}>
                  {() => (
                    <AuthScreen
                      email={email}
                      setEmail={setEmail}
                      password={password}
                      setPassword={setPassword}
                      isLogin={isLogin}
                      setIsLogin={setIsLogin}
                      handleAuthentication={handleAuthentication}
                      handleGoogleLogin={handleGoogleLogin}
                    />
                  )}
                </Stack.Screen>
              )}
            </Stack.Navigator>
          </CartProvider>
        </SafeAreaView>
      </NavigationContainer>
    </AuthProvider>
  );
}
