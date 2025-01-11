import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TextInput,
  Modal,
} from 'react-native';
import { collection, getDocs, query, where, addDoc, deleteDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { arrayRemove, getDoc} from 'firebase/firestore';
import styles from '../styles/ChefProfileStyles';
import CommentCard from './CommentCard';
import { useCart } from '../context/CartContext';
import BottomNav from '../components/BottomNav';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth } from 'firebase/auth';





const ChefProfileScreen = ({ route, navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Yemekler');
  const [dishes, setDishes] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const chef = route.params;
  const { addToCart, removeFromCart, cartItems, setCartItems } = useCart();
  const [selectedRating, setSelectedRating] = useState(0);
  const auth = getAuth();
const currentUser = auth.currentUser;

  const averageRating = comments.length > 0
    ? (comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length).toFixed(1)
    : '0';

  const commentsCount = comments.length;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Verileri paralel olarak çekmek için Promise.all kullanıyoruz
        const [dishesSnapshot, commentsSnapshot, userDoc] = await Promise.all([
          getDocs(collection(db, 'chefs', chef.id, 'foods')), // Yemekler
          getDocs(query(collection(db, 'comments'), where('chefId', '==', chef.id))), // Yorumlar
          getDoc(doc(db, 'users', getAuth().currentUser?.uid)) // Kullanıcı bilgisi
        ]);
  
        // Yemek verisini işliyoruz
        const dishesList = dishesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Yorum verisini işliyoruz
        const commentsList = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
        setDishes(dishesList);
        setComments(commentsList);
  
        // Eğer kullanıcı mevcutsa favori durumu kontrol ediyoruz
        if (getAuth().currentUser) {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsFavorite(userData.favoriteChefs?.includes(chef.id));
          }
        }
      } catch (error) {
        console.error('Veriler alınırken bir hata oluştu:', error);
      }
      setLoading(false);
    };

    fetchData();
    navigation.setOptions({
      headerShown: false
    });
  }, [chef.id, navigation]);

  const handleFavoriteToggle = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
  
      try {
        if (isFavorite) {
          // Favorilerden kaldırma
          await updateDoc(userRef, {
            favoriteChefs: arrayRemove(chef.id)
          });
          setIsFavorite(false); // UI'yi güncelle
        } else {
          // Favorilere ekleme
          await updateDoc(userRef, {
            favoriteChefs: arrayUnion(chef.id)
          });
          setIsFavorite(true); // UI'yi güncelle
        }
      } catch (error) {
        console.error("Favoriler güncellenirken hata oluştu:", error);
      }
    }
  };
  
  

  const updateQuantity = (item, newQuantity) => {
    const updatedCart = cartItems.map(cartItem => 
      cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
    );
    setCartItems(updatedCart);  // Update the state with the new cart items
  };


  const renderDishItem = ({ item }) => {
    const dishInCart = cartItems.find(cartItem => cartItem.id === item.id);
    const quantity = dishInCart ? dishInCart.quantity : 0;

    return (
      <View style={styles.dishCard}>
        <Image source={{ uri: item.image || 'default_image_url' }} style={styles.dishImage} />
        <Text style={styles.dishName}>{item.name}</Text>
        <Text style={styles.dishDescription}>{item.description}</Text>
        <Text style={styles.dishPrice}>{item.price ? `${item.price.toFixed(2)} ₺` : 'Fiyat yok'}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQuantity(item)} style={styles.quantityButton} accessible>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.quantityButton} accessible>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <CommentCard comment={item} />
      <TouchableOpacity onPress={() => handleDeleteComment(item.id)} style={styles.closeIcon}>
        <Icon name="close" size={20} color="#D91112" /> 
      </TouchableOpacity>
    </View>
  );

  const handleAddToCart = (item) => {
    const currentChefId = item.chefId;
    const cartChefId = cartItems.length > 0 ? cartItems[0].chefId : null;

    if (cartChefId && currentChefId !== cartChefId) {
      Alert.alert('Hata', 'Farklı bir şefin yemeği eklenemez. Sepetinizi boşaltın ve tekrar deneyin.');
      return;
    }

    addToCart(item);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item, item.quantity - 1);
    } else {
      removeFromCart(item);
    }
  };

  const handleCommentSubmit = async () => {
<<<<<<< HEAD
    if (!currentUser) {
      Alert.alert('Hata', 'Yorum yapmak için giriş yapmalısınız.');
      return;
    }

    if (commentText.trim() === '' || selectedRating === 0) {
      Alert.alert('Hata', 'Yorum alanı boş olamaz ve puan seçilmelidir!');
      return;
    }

    const newComment = {
      text: commentText,
      rating: selectedRating,
      chefId: chef.id,
      userId: currentUser.uid,
      userName: currentUser.displayName || 'Anonim',
      createdAt: new Date(),
    };

=======
    if (commentText.trim() === '' || selectedRating === 0) { // rating yerine selectedRating kullanıyoruz
      alert('Yorum alanı boş olamaz ve puan seçilmelidir!');
      return;
    }
  
    const newComment = {
      text: commentText,
      rating: selectedRating, // Burada selectedRating kullanıyoruz
      chefId: chef.id,
      createdAt: new Date(),
    };
  
>>>>>>> b07d740 (Initial commit)
    try {
      console.log('Yorum gönderiliyor...', newComment);
  
      // 1. Yorum, 'comments' koleksiyonuna kaydediliyor
      const docRef = await addDoc(collection(db, 'comments'), newComment);
      console.log('Yorum başarıyla gönderildi:', docRef.id);
  
      // 2. Yorum, 'chefs' koleksiyonundaki ilgili şefe ekleniyor
      const chefRef = doc(db, 'chefs', chef.id); // chef.id ile şefe ulaşılır
      await updateDoc(chefRef, {
        comments: arrayUnion({
          id: docRef.id,
          text: commentText,
          rating: selectedRating,
          createdAt: new Date(),
        }),
      });
  
      // 3. Yorum, state'e ekleniyor
      setComments([...comments, { ...newComment, id: docRef.id }]);
      setCommentText('');
      setSelectedRating(0); // selectedRating sıfırlanıyor
      setModalVisible(false);
  
    } catch (error) {
      console.error('Yorum gönderirken bir hata oluştu:', error);
<<<<<<< HEAD
      Alert.alert('Hata', 'Yorum gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
=======
      alert('Yorum gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
>>>>>>> b07d740 (Initial commit)
    }
  };
  
  
  

  const handleDeleteComment = async (commentId) => {
<<<<<<< HEAD
    if (!currentUser) {
      Alert.alert('Hata', 'Bu işlem için yetkiniz yok.');
      return;
    }

    try {
      const commentDoc = await getDoc(doc(db, 'comments', commentId));
      if (!commentDoc.exists()) {
        Alert.alert('Hata', 'Yorum bulunamadı.');
        return;
      }

      // Sadece yorum sahibi veya şef yorumu silebilir
      if (commentDoc.data().userId !== currentUser.uid && chef.id !== currentUser.uid) {
        Alert.alert('Hata', 'Bu yorumu silme yetkiniz yok.');
        return;
      }

      await deleteDoc(doc(db, 'comments', commentId));
      setComments(comments.filter(comment => comment.id !== commentId));
      Alert.alert('Başarılı', 'Yorum silindi.');
    } catch (error) {
      console.error('Yorum silinirken bir hata oluştu:', error);
      Alert.alert('Hata', 'Yorum silinirken bir hata oluştu.');
=======
    try {
      await deleteDoc(doc(db, 'comments', commentId));
      setComments(comments.filter(comment => comment.id !== commentId));
      Alert.alert('Başarılı!', 'Yorum silindi.');
    } catch (error) {
      console.error('Yorum silinirken bir hata oluştu:', error);
>>>>>>> b07d740 (Initial commit)
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  

  const renderContent = () => {
    switch (selectedTab) {
      case 'Yemekler':
        return (
          <FlatList
            data={dishes}
            renderItem={renderDishItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        );
      case 'Hakkında':
        return <Text style={styles.menuTitle}>Bu kısım hakkında bilgi içeriyor.</Text>;
      case 'Görseller':
        return <Text style={styles.menuTitle}>Bu kısım görseller içeriyor.</Text>;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <FlatList
          data={[chef]} // Chef bilgilerini bir diziye koyuyoruz
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Image source={{ uri: item.coverImage }} style={styles.coverImage} />
              <View style={styles.profileContainer}>
                <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.location}>{item.location}</Text>
                  <View style={styles.ratingContainer}>
                  <TouchableOpacity onPress={handleFavoriteToggle}>
                  <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={30}
                    color={isFavorite ? 'red' : 'gray'}
                  />
                </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.ratingContainer}>
                      <Ionicons name="star" size={20} color="#FFD700" style={styles.rating} />
                      <Text style={styles.rating}>{averageRating}</Text>
                      <MaterialIcons name="comment" size={20} color="gray" style={styles.commentsCount} />
                      <Text style={styles.commentsCount}>{`${commentsCount} yorum`}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.tabContainer}>
                {['Yemekler', 'Hakkında', 'Görseller'].map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={[styles.tab, selectedTab === tab && styles.tabSelected]}
                    onPress={() => setSelectedTab(tab)}
                  >
                    <Text style={styles.tabText}>{tab}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {renderContent()}
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        <BottomNav /> 
      </View>

      {/* + Butonu */}
      <TouchableOpacity
        style={styles.addButtonFloating}
        onPress={() => setModalVisible(true)}
      >
      </TouchableOpacity>

       {/* Yorum Modalı */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {/* X Butonu */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Yorum Yap</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Yorumunuzu buraya yazın"
              placeholderTextColor="#888"
              value={commentText}
              onChangeText={setCommentText}
              multiline
            />
            
            {/* Yıldız Puan Verme */}
            <View style={styles.ratingStarsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setSelectedRating(star)}>
                  <Ionicons
                    name="star"
                    size={30}
                    color={star <= selectedRating ? "#FFD700" : "#ddd"}
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity
              style={styles.modalSubmitButton}
              onPress={handleCommentSubmit}
            >
              <Text style={styles.modalButtonText}>Gönder</Text>
            </TouchableOpacity>

            {/* Önceki Yorumlar */}
            <Text style={styles.previousCommentsTitle}>Önceki Yorumlar</Text>
            <FlatList
              data={comments}
              renderItem={renderCommentItem}
              keyExtractor={(item) => item.id}
              style={styles.commentsList}
            />
          </View>
        </View>
      </Modal>


    </SafeAreaView>
  );
};
export default ChefProfileScreen;
