import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alerti, Image } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import styles from '../styles/authScreenStyles';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

const AuthScreen = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  handleAuthentication,
}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailVerificationPending, setEmailVerificationPending] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoginSelected, setIsLoginSelected] = useState(false); // Kullanıcının giriş mi kayıt mı seçtiğini kontrol etmek için

  // Google Login setup
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '', // Google API Console'dan alınan clientId
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (!currentUser.emailVerified) {
          setEmailVerificationPending(true);
        } else {
          handleAuthentication();
        }
      } else {
        setUser(null);
        setEmailVerificationPending(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          setUser(userCredential.user);
          handleAuthentication();
          Alert.alert('Giriş Başarılı', `Hoş geldin, ${userCredential.user.displayName}`);
        })
        .catch((error) => {
          console.error('Google ile giriş yapılamadı:', error);
          Alert.alert('Giriş Hatası', error.message);
        });
    }
  }, [response]);

  const handleSignUp = async () => {
    if (!isLogin) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const currentUser = userCredential.user;
        await updateProfile(currentUser, { displayName: name });

        // Kullanıcı bilgilerini Firestore'a kaydet
        const userDocRef = doc(db, 'users', currentUser.uid);
        await setDoc(userDocRef, {
          username: name,
          email: currentUser.email,
          phoneNumber: phoneNumber,
          usersId: currentUser.uid,
        });

        await sendEmailVerification(currentUser);
        setEmailVerificationPending(true);
        Alert.alert('Başarılı!', 'Kayıt işlemi tamamlandı. E-posta doğrulamanızı kontrol edin.');
      } catch (error) {
        Alert.alert('Kayıt Hatası', error.message.includes('email-already-in-use') ? 'Bu e-posta adresi zaten kullanımda.' : 'Kayıt işlemi başarısız. Lütfen tekrar deneyin.');
      }
    }
  };

  const handleLogin = async () => {
    if (isLogin) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const currentUser = userCredential.user;

        if (currentUser.emailVerified) {
          handleAuthentication(); 
        } else {
          setEmailVerificationPending(true);
          Alert.alert(
            'E-posta doğrulaması gerekli',
            'Giriş yapmak için e-posta adresinizi doğrulamanız gerekiyor.'
          );
          signOut(auth);
        }
      } catch (error) {
        console.error(error.message);
        Alert.alert('Hata', error.message);
      }
    }
  };

  const handleResendVerification = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        Alert.alert(
          'Doğrulama E-postası Gönderildi',
          'Doğrulama e-postası yeniden gönderildi. Lütfen e-posta kutunuzu kontrol edin.',
          [{ text: 'Tamam' }]
        );
      } catch (error) {
        console.error(error.message);
        Alert.alert('Hata', error.message);
      }
    }
  };

  if (emailVerificationPending) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationText}>
          E-posta adresinizi doğrulamanız gerekiyor. Lütfen e-posta kutunuzu kontrol edin.
        </Text>
        <TouchableOpacity style={styles.resendButton} onPress={handleResendVerification}>
          <Text style={styles.resendButtonText}>Doğrulama E-postasını Yeniden Gönder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signOutButton} onPress={() => {
          signOut(auth);
          setEmailVerificationPending(false);
          setUser(null);
        }}>
          <Text style={styles.signOutButtonText}>Oturumu Kapat</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!isLoginSelected) {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Hoş geldiniz!</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {
          setIsLogin(true);
          setIsLoginSelected(true);
        }}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {
          setIsLogin(false);
          setIsLoginSelected(true);
        }}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title2}>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</Text>

        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Ad Soyad"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Telefon Numarası"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={isLogin ? handleLogin : handleSignUp}>
          <Text style={styles.buttonText}>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()} disabled={!request}>
          <Text style={styles.buttonText}>Google ile Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin ? 'Kayıt Olmak İçin Buraya Tıklayın' : 'Giriş Yapmak İçin Buraya Tıklayın'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthScreen;
