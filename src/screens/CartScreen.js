<<<<<<< HEAD
import React, { useState, useMemo, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Alert, 
  ActivityIndicator,
  Animated,
  SafeAreaView
} from 'react-native';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, runTransaction, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import styles, { COLORS } from '../styles/CartScreenStyles';
import BottomNav from '../components/BottomNav';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice } from '../utils/formatters';

const OrderStatus = {
  PENDING: 'beklemede',
  PREPARING: 'hazırlanıyor',
  ON_WAY: 'yolda',
  DELIVERED: 'teslim_edildi',
  CANCELLED: 'iptal_edildi'
};

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const { currentUser } = useAuth();
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Toplam fiyat ve ürün sayısı hesaplama
  const cartSummary = useMemo(() => {
    return cartItems.reduce((acc, item) => ({
      totalPrice: acc.totalPrice + (item.price * item.quantity),
      totalItems: acc.totalItems + item.quantity
    }), { totalPrice: 0, totalItems: 0 });
  }, [cartItems]);

  // Animasyonlu görünüm geçişi
  const toggleSummary = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: summaryVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setSummaryVisible(!summaryVisible);
  }, [summaryVisible, fadeAnim]);

  const handleCheckout = async () => {
    try {
      if (!cartItems?.length) {
        throw new Error('Sepetiniz boş.');
      }

      const chefId = cartItems[0]?.chefId;
      if (!chefId) {
        throw new Error('Şef bilgisi bulunamadı.');
      }

      if (!currentUser?.uid) {
        throw new Error('Lütfen giriş yapın.');
      }

      if (!currentUser.emailVerified) {
        throw new Error('Lütfen önce email adresinizi doğrulayın.');
      }

      setLoading(true);

      // Transaction ile sipariş oluşturma
      await runTransaction(db, async (transaction) => {
        // Kullanıcı siparişi oluştur
        const userOrderRef = doc(collection(db, 'users', currentUser.uid, 'orders'));
        const orderData = {
          items: cartItems,
          createdAt: new Date(),
          totalAmount: cartSummary.totalPrice,
          totalItems: cartSummary.totalItems,
          chefId,
          status: OrderStatus.PENDING,
          orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
        };

        transaction.set(userOrderRef, orderData);

        // Şef siparişi oluştur
        const chefOrderRef = doc(collection(db, 'chefs', chefId, 'orders'));
        transaction.set(chefOrderRef, {
          ...orderData,
          userId: currentUser.uid,
          userEmail: currentUser.email
        });
      });

      Alert.alert(
        'Sipariş Başarılı', 
        'Siparişiniz başarıyla oluşturuldu.', 
        [
          {
            text: 'Siparişlerime Git',
            onPress: () => {
              clearCart();
              navigation.navigate('Orders');
            }
          },
          {
            text: 'Tamam',
            onPress: () => {
              clearCart();
              setSummaryVisible(false);
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Hata', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = useCallback((item, newQuantity) => {
    if (newQuantity < 1) {
      Alert.alert(
        'Ürünü Kaldır',
        'Bu ürünü sepetten kaldırmak istiyor musunuz?',
        [
          {
            text: 'İptal',
            style: 'cancel'
          },
          {
            text: 'Kaldır',
            onPress: () => removeFromCart(item),
            style: 'destructive'
          }
        ]
      );
    } else {
      updateQuantity(item, newQuantity);
    }
  }, [removeFromCart, updateQuantity]);

  const renderCartItem = useCallback(({ item }) => (
    <Animated.View 
      style={[styles.cartItem, { transform: [{ scale: fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.95, 1]
      }) }] }]}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.cartItemImage}
        
      />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemText} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>{formatPrice(item.price)} ₺</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity 
          onPress={() => handleQuantityChange(item, item.quantity - 1)} 
          style={styles.quantityButton}
          activeOpacity={0.7}
        >
          <Ionicons name="remove" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity 
          onPress={() => handleQuantityChange(item, item.quantity + 1)} 
          style={styles.quantityButton}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  ), [handleQuantityChange, fadeAnim]);

  const renderSummary = useCallback(() => (
    <Animated.View 
      style={[
        styles.summaryContainer,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0]
            })
          }]
        }
      ]}
    >
      <View style={styles.summaryDetails}>
        <Text style={styles.summaryTitle}>Sipariş Özeti</Text>
        {cartItems.map(item => (
          <View key={item.id} style={styles.summaryItem}>
            <Text style={styles.summaryItemText}>
              {item.name} x {item.quantity}
            </Text>
            <Text style={styles.summaryItemPrice}>
              {formatPrice(item.price * item.quantity)} ₺
            </Text>
          </View>
        ))}
        <View style={styles.summaryTotal}>
          <Text style={styles.summaryTotalText}>Toplam</Text>
          <Text style={styles.summaryTotalPrice}>
            {formatPrice(cartSummary.totalPrice)} ₺
          </Text>
        </View>
      </View>
    </Animated.View>
  ), [cartItems, cartSummary, fadeAnim]);

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={64} color={COLORS.text.light} />
          <Text style={styles.emptyText}>Sepetiniz boş</Text>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.7}
          >
            <Text style={styles.continueButtonText}>Alışverişe Başla</Text>
          </TouchableOpacity>
        </View>
        <BottomNav navigation={navigation} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sepetim</Text>
        {cartItems.length > 0 && (
          <TouchableOpacity 
            onPress={clearCart}
            style={styles.clearButton}
            activeOpacity={0.7}
          >
            <Text style={styles.clearButtonText}>Sepeti Temizle</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.contentContainer}>
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />

        <View style={styles.checkoutContainer}>
          {summaryVisible && renderSummary()}
          
          <View style={styles.totalAndCheckout}>
            <View style={styles.totalInfo}>
              <Text style={styles.totalItems}>{cartSummary.totalItems} Ürün</Text>
              <Text style={styles.totalPrice}>
                {formatPrice(cartSummary.totalPrice)} ₺
              </Text>
            </View>

            <View style={styles.checkoutButtons}>
              <TouchableOpacity 
                onPress={toggleSummary}
                style={styles.summaryButton}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={summaryVisible ? "chevron-down" : "chevron-up"} 
                  size={24} 
                  color={COLORS.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleCheckout}
                style={styles.checkoutButton}
                disabled={loading}
                activeOpacity={0.7}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text style={styles.checkoutButtonText}>Sipariş Ver</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
=======
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import styles from '../styles/CartScreenStyles';
import BottomNav from '../components/BottomNav'; 
import { Ionicons } from '@expo/vector-icons'; 

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const { currentUser } = useAuth(); 
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    const chefId = cartItems[0]?.chefId;

    if (!cartItems || cartItems.length === 0) {
      Alert.alert('Hata', 'Sepetiniz boş.');
      return;
    }

    if (!chefId) {
      Alert.alert('Hata', 'Şef ID bulunamadı.');
      return;
    }

    const userId = currentUser?.uid;
    if (!userId) {
      Alert.alert('Hata', 'Kullanıcı kimliği bulunamadı.');
      return;
    }

    setLoading(true); // Start loading

    try {
      // Create order for the user
      const ordersCollection = collection(db, 'users', userId, 'orders');
      await addDoc(ordersCollection, {
        items: cartItems,
        createdAt: new Date(),
        totalPrice: calculateTotalPrice(),
        chefId,
        status: 'sipariş hazırlanıyor',
      });

      // Create order for the chef
      const chefOrdersCollection = collection(db, 'chefs', chefId, 'orders');
      await addDoc(chefOrdersCollection, {
        items: cartItems,
        createdAt: new Date(),
        totalPrice: calculateTotalPrice(),
        userId, // Optional: store the user ID for reference
        status: 'sipariş hazırlanıyor',
      });

      Alert.alert('Sipariş Başarılı', 'Siparişiniz başarıyla oluşturuldu.', [
        {
          text: 'Tamam',
          onPress: () => {
            clearCart();
            setSummaryVisible(false); // Optionally collapse the summary after checkout
          }
        }
      ]);
    } catch (error) {
      console.error('Sipariş oluşturulurken bir hata oluştu:', error);
      Alert.alert('Hata', 'Sipariş oluşturulurken bir hata oluştu: ' + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const increaseQuantity = (item) => {
    updateQuantity(item, item.quantity + 1);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item);
    } else {
      updateQuantity(item, item.quantity - 1);
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemText}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>
          {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(item.price)}
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => decreaseQuantity(item)} style={styles.quantityButton} accessible>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity(item)} style={styles.quantityButton} accessible>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSummary = () => (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryDetails}>
        {cartItems.map(item => (
          <Text key={item.id} style={styles.summaryText}>
            {item.name} x {item.quantity} - {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(item.price * item.quantity)}
          </Text>
        ))}
        <Text style={styles.totalText}>Toplam: {calculateTotalPrice()} TL</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCartText}>Sepetiniz boş.</Text>
        ) : (
          <>
            <FlatList
              data={cartItems}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.id}
            />
            <View style={styles.totalContainer}>
              <View style={styles.summaryAndTotal}>
                {summaryVisible && renderSummary()}
                <View style={styles.checkoutContainer}>
                  <TouchableOpacity onPress={() => setSummaryVisible(!summaryVisible)} style={styles.summaryToggle}>
                    <Ionicons name={summaryVisible ? 'chevron-up' : 'chevron-down'} size={24} color="#D9112A" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton} disabled={loading} accessible>
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.checkoutButtonText}>Sepeti Onayla</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
      <BottomNav navigation={navigation} />
    </View>
>>>>>>> b07d740 (Initial commit)
  );
};

export default CartScreen;
