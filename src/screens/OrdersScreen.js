<<<<<<< HEAD
import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  SafeAreaView, 
  Image, 
  TouchableOpacity, 
  RefreshControl,
  Alert
} from 'react-native';
import { collection, getDocs, doc, updateDoc, query, orderBy, limit, where, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import CommentModal from '../components/CommentModal';
import styles from '../styles/OrdersScreenStyles';
import { formatDate, formatPrice } from '../utils/formatters';
import { COLORS } from '../styles/OrdersScreenStyles';

const OrderStatus = {
  PENDING: 'beklemede',
  PREPARING: 'hazırlanıyor',
  ON_WAY: 'yolda',
  DELIVERED: 'teslim_edildi',
  CANCELLED: 'iptal_edildi'
};

function OrdersScreen({ navigation }) {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
=======
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, SafeAreaView, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/OrdersScreenStyles';
import BottomNav from '../components/BottomNav';

const OrdersScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
>>>>>>> b07d740 (Initial commit)
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedChef, setSelectedChef] = useState(null);
<<<<<<< HEAD
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getStatusColor = (status) => {
    switch (status) {
      case OrderStatus.PENDING:
        return '#FF9500';
      case OrderStatus.PREPARING:
        return '#007AFF';
      case OrderStatus.ON_WAY:
        return '#34C759';
      case OrderStatus.DELIVERED:
        return '#27ae60';
      case OrderStatus.CANCELLED:
        return '#FF3B30';
      default:
        return '#95a5a6';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'Beklemede';
      case OrderStatus.PREPARING:
        return 'Hazırlanıyor';
      case OrderStatus.ON_WAY:
        return 'Yolda';
      case OrderStatus.DELIVERED:
        return 'Teslim Edildi';
      case OrderStatus.CANCELLED:
        return 'İptal Edildi';
      default:
        return 'Bilinmiyor';
    }
  };

  const fetchOrders = useCallback(async (pageNum = 1) => {
    if (!currentUser) return;

    try {
      const ordersRef = collection(db, 'users', currentUser.uid, 'orders');
      const q = query(
        ordersRef,
        orderBy('createdAt', 'desc'),
        limit(10 * pageNum)
      );
      
      const orderSnapshot = await getDocs(q);
      const orderList = await Promise.all(orderSnapshot.docs.map(async (docSnapshot) => {
        const orderData = { id: docSnapshot.id, ...docSnapshot.data() };
        
        if (orderData.status === 'silindi') {
          return null;
        }
        
        if (orderData.chefId) {
          const chefDoc = await getDoc(doc(db, 'chefs', orderData.chefId));
          if (chefDoc.exists()) {
            orderData.chefInfo = chefDoc.data();
          }
        }

        return orderData;
      }));

      const filteredOrders = orderList.filter(order => order !== null);
      setOrders(filteredOrders);
      setHasMore(orderSnapshot.docs.length === 10 * pageNum);
    } catch (error) {
      console.error('Siparişler yüklenirken hata:', error);
      Alert.alert('Hata', 'Siparişler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentUser]);

  const handleSubmitComment = async (orderId, chefId) => {
    if (!orderId || !chefId || !commentText || rating === 0) {
      Alert.alert('Hata', 'Lütfen yorum ve puan girdiğinizden emin olun.');
      return;
    }

    try {
      const orderRef = doc(db, 'users', currentUser.uid, 'orders', orderId);
      const chefRef = doc(db, 'chefs', chefId);

      await updateDoc(orderRef, {
        [`comments.${currentUser.uid}`]: {
          text: commentText,
          rating: rating,
          createdAt: new Date()
        }
      });

      const chefDoc = await getDoc(chefRef);
      if (chefDoc.exists()) {
        const chefData = chefDoc.data();
        const totalRatings = (chefData.totalRatings || 0) + 1;
        const totalStars = (chefData.totalStars || 0) + rating;
        const averageRating = totalStars / totalRatings;

        await updateDoc(chefRef, {
          totalRatings,
          totalStars,
          averageRating
        });
      }

      setModalVisible(false);
      setCommentText('');
      setRating(0);
      fetchOrders();
      
      Alert.alert('Başarılı', 'Yorumunuz başarıyla gönderildi.');
    } catch (error) {
      console.error('Yorum gönderilirken hata:', error);
      Alert.alert('Hata', 'Yorum gönderilirken bir hata oluştu.');
    }
  };

  const renderOrderItem = ({ item }) => {
    const totalAmount = item.totalAmount || item.items?.reduce((sum, food) => sum + (food.price * (food.quantity || 1)), 0) || 0;
    const status = item.status || OrderStatus.PENDING;
    
    return (
      <TouchableOpacity 
        style={styles.orderItem}
        onPress={() => navigation.navigate('OrderDetail', { order: item })}
      >
        <View style={styles.orderHeader}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderNumber}>Sipariş #{item.orderNumber || item.id.slice(0, 6)}</Text>
            <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
          </View>
          <View style={[styles.orderStatus, { backgroundColor: getStatusColor(status) }]}>
            <Text style={styles.orderStatusText}>{getStatusText(status)}</Text>
          </View>
        </View>

        <View style={styles.orderContent}>
          <View style={styles.chefInfo}>
            <Image 
              source={{ 
                uri: item.chefInfo?.photoURL || 
                     item.chef?.photoURL || 
                     'https://firebasestorage.googleapis.com/v0/b/kuzine-app.appspot.com/o/defaults%2Fchef-avatar.png?alt=media' 
              }}
              style={styles.chefImage}
             
            />
            <View style={styles.chefDetails}>
              <Text style={styles.chefName}>
                {item.chefInfo?.name || item.chef?.name || 'Şef'}
              </Text>
              <Text style={styles.orderItemCount}>
                {item.items?.length || 0} Ürün
              </Text>
            </View>
          </View>

          <View style={styles.foodList}>
            {(item.items || []).slice(0, 2).map((food, index) => (
              <View key={index} style={styles.foodItem}>
                <Text style={styles.foodName} numberOfLines={1}>
                  {food.name}
                  {food.quantity > 1 ? ` x${food.quantity}` : ''}
                </Text>
                <Text style={styles.foodPrice}>
                  {formatPrice(food.price * (food.quantity || 1))} ₺
                </Text>
              </View>
            ))}
            {(item.items || []).length > 2 && (
              <Text style={styles.moreItems}>
                +{item.items.length - 2} ürün daha
              </Text>
            )}
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Toplam</Text>
            <Text style={styles.totalPrice}>{formatPrice(totalAmount)} ₺</Text>
          </View>

          {status === OrderStatus.DELIVERED && !item.comments?.[currentUser.uid] && (
            <TouchableOpacity 
              style={styles.rateButton}
              onPress={() => {
                setSelectedOrder(item.id);
                setSelectedChef(item.chefId || item.chef?.id);
                setModalVisible(true);
              }}
            >
              <Ionicons name="star-outline" size={20} color={COLORS.primary} />
              <Text style={styles.rateButtonText}>Değerlendir</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchOrders(1);
  }, [fetchOrders]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D91112" />
        </View>
      </SafeAreaView>
=======

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      try {
        const ordersCollection = collection(db, 'users', currentUser.uid, 'orders');
        const orderSnapshot = await getDocs(ordersCollection);

        // Get chefs information from 'chefs' collection
        const chefsCollection = collection(db, 'chefs');
        const chefSnapshot = await getDocs(chefsCollection);
        const chefs = {};
        chefSnapshot.forEach(doc => {
          const chefData = doc.data();
          chefs[doc.id] = chefData;
        });

        const orderList = await Promise.all(orderSnapshot.docs.map(async (doc) => {
          const orderData = { id: doc.id, ...doc.data() };

          // Fetch comments for this order
          const commentsCollection = collection(db, 'users', currentUser.uid, 'orders', doc.id, 'comments');
          const commentsSnapshot = await getDocs(commentsCollection);
          const comments = {};
          commentsSnapshot.forEach(commentDoc => {
            comments[commentDoc.id] = commentDoc.data();
          });
          orderData.comments = comments;

          return orderData;
        }));

        // Filter out deleted orders and sort by createdAt date
        const filteredOrders = orderList.filter(order => order.status !== 'silindi');
        filteredOrders.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)); // Sort in descending order

        setOrders(filteredOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const handleSubmitComment = async (orderId, chefId) => {
    if (commentText.trim() === '' || rating === 0) return;

    const comment = {
      text: commentText,
      rating: rating,
      createdAt: new Date(),
      userId: currentUser.uid,
    };

    try {
      // Siparişe yorum ekleyin
      await updateDoc(doc(db, 'users', currentUser.uid, 'orders', orderId), {
        [`comments.${currentUser.uid}`]: comment,
      });

      // Yorumun chef'a da eklenmesi
      if (chefId) {
        await updateDoc(doc(db, 'chefs', chefId), {
          [`comments.${orderId}.${currentUser.uid}`]: comment,
        });
      }

      setCommentText('');
      setRating(0);
      setModalVisible(false);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const openCommentModal = (orderId, chefId) => {
    setSelectedOrder(orderId);
    setSelectedChef(chefId);

    const order = orders.find(o => o.id === orderId);
    if (order && order.comments && order.comments[currentUser.uid]) {
      setCommentText(order.comments[currentUser.uid].text);
      setRating(order.comments[currentUser.uid].rating);
    } else {
      setCommentText('');
      setRating(0);
    }

    setModalVisible(true);
  };

  const renderFoodItem = ({ item }) => (
    <View style={styles.foodItem}>
      {item.image && <Image source={{ uri: item.image }} style={styles.foodImage} />}
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.foodPrice}>Fiyat: {item.price} TL</Text>
      <Text style={styles.counter}>Adet: {item.quantity || 1}</Text>
    </View>
  );

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.packageTitle}>Sipariş Paketi</Text>
      {item.chefInfo ? (
        <View style={styles.chefInfo}>
          <Text style={styles.chefName}>Şef: {item.chefInfo.firstName + ' ' + 'Şef'}</Text>
          <Text style={styles.chefLocation}>Konum: {item.chefInfo.city}</Text>
        </View>
      ) : (
        <Text style={styles.chefInfo}>Şef bilgisi mevcut değil</Text>
      )}

      <FlatList
        data={item.items}
        renderItem={renderFoodItem}
        keyExtractor={(foodItem) => foodItem.id}
      />
      <Text style={styles.totalPrice}>Toplam Fiyat: {item.totalPrice} TL</Text>
      <Text style={styles.orderDate}>
        Sipariş Tarihi: {item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleString() : 'Belirtilmemiş'}
      </Text>
      <Text style={styles.orderStatusText}>Durum: {item.status || 'Belirtilmemiş'}</Text>

      <TouchableOpacity
        style={styles.commentButton}
        onPress={() => openCommentModal(item.id, item.chefId)}
      >
        <Text style={styles.commentButtonText}>Yorum Yap</Text>
      </TouchableOpacity>

      {item.comments && Object.keys(item.comments).map(userId => (
        <View style={styles.commentsSection} key={userId}>
          <Text style={styles.commentText}>
            {item.comments[userId].text} (Puan: {item.comments[userId].rating})
          </Text>
          {userId === currentUser.uid && (
            <Text style={styles.myCommentText}>Bu sizin yorumunuz.</Text>
          )}
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
>>>>>>> b07d740 (Initial commit)
    );
  }

  return (
<<<<<<< HEAD
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Siparişlerim</Text>
      </View>

      <View style={styles.container}>
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Henüz siparişiniz bulunmuyor.</Text>
            <TouchableOpacity 
              style={styles.orderNowButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.orderNowText}>Hemen Sipariş Ver</Text>
            </TouchableOpacity>
          </View>
=======
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {orders.length === 0 ? (
          <Text style={styles.emptyOrdersText}>Henüz siparişiniz yok.</Text>
>>>>>>> b07d740 (Initial commit)
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrderItem}
<<<<<<< HEAD
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh}
                colors={['#D91112']}
              />
            }
            onEndReached={() => {
              if (hasMore && !loading) {
                setPage(prev => prev + 1);
                fetchOrders(page + 1);
              }
            }}
            onEndReachedThreshold={0.5}
=======
            keyExtractor={(item) => item.id}
>>>>>>> b07d740 (Initial commit)
          />
        )}
      </View>

<<<<<<< HEAD
      <CommentModal 
        visible={modalVisible}
        commentText={commentText}
        setCommentText={setCommentText}
        rating={rating}
        setRating={setRating}
        onSubmit={() => handleSubmitComment(selectedOrder, selectedChef)}
        onClose={() => {
          setModalVisible(false);
          setCommentText('');
          setRating(0);
        }}
      />

      <BottomNav />
    </SafeAreaView>
  );
}

export default OrdersScreen;
=======
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.commentInput}
              placeholder="Yorum yap..."
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity onPress={() => setRating(1)}>
              <Text style={rating === 1 ? styles.selectedRating : styles.rating}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRating(2)}>
              <Text style={rating === 2 ? styles.selectedRating : styles.rating}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRating(3)}>
              <Text style={rating === 3 ? styles.selectedRating : styles.rating}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRating(4)}>
              <Text style={rating === 4 ? styles.selectedRating : styles.rating}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRating(5)}>
              <Text style={rating === 5 ? styles.selectedRating : styles.rating}>5</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleSubmitComment(selectedOrder, selectedChef)}
            >
              <Text style={styles.submitButtonText}>Yorum Gönder</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
};

export default OrdersScreen;
>>>>>>> b07d740 (Initial commit)
