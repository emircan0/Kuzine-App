import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './DrawerNavigator'; // Assuming this is your Drawer component
import AuthScreen from '../screens/AuthScreen'; // Your auth screen
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { Alert } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const googleClientId = '457398453268-ibbboft8nsupdti2cfv18ogftvon87nk.apps.googleusercontent.com';
const redirectUri = makeRedirectUri({ useProxy: true });

const AppNavigator = ({ user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const [request, response, promptAsync] = useAuthRequest({
    clientId: googleClientId,
    scopes: ['openid', 'profile', 'email'],
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      
      signInWithCredential(getAuth(), credential)
        .then(() => {
          Alert.alert('Başarılı!', 'Google ile giriş yapıldı.');
        })
        .catch((error) => {
          Alert.alert('Giriş Hatası', 'Google ile giriş yapılamadı. Lütfen tekrar deneyin.');
        });
    }
  }, [response]);

  const handleGoogleLogin = async () => {
    try {
      if (request) {
        await promptAsync();
      } else {
        Alert.alert('Hata', 'Google oturumu başlatılamadı.');
      }
    } catch (error) {
      Alert.alert('Google Giriş Hatası', 'Google ile giriş yapılamadı. Lütfen tekrar deneyin.');
    }
  };

  if (user) {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={DrawerNavigator} />

      </Drawer.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          options={{ headerShown: false }}
        >
          {() => (
            <AuthScreen
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              handleGoogleLogin={handleGoogleLogin}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
};

export default AppNavigator;
