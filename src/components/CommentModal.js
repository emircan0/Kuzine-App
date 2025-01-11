import React, { memo, useCallback } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TextInput, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/OrdersScreenStyles';

const CommentModal = memo(({ 
  visible, 
  commentText, 
  setCommentText, 
  rating, 
  setRating, 
  onSubmit, 
  onClose 
}) => {
  const renderStars = useCallback(() => {
    return [...Array(5)].map((_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => setRating(index + 1)}
        style={styles.starButton}
      >
        <Ionicons
          name={index < rating ? "star" : "star-outline"}
          size={32}
          color="#FFD700"
        />
      </TouchableOpacity>
    ));
  }, [rating, setRating]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        onClose();
      }}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Siparişinizi Değerlendirin</Text>
              
              <View style={styles.ratingContainer}>
                {renderStars()}
              </View>
              
              <TextInput
                style={styles.commentInput}
                placeholder="Deneyiminizi paylaşın (isteğe bağlı)"
                value={commentText}
                onChangeText={setCommentText}
                multiline
                numberOfLines={4}
                maxLength={500}
                placeholderTextColor="#999"
              />
              
              <TouchableOpacity 
                style={[
                  styles.submitButton,
                  !rating && styles.disabledButton
                ]}
                onPress={onSubmit}
                disabled={!rating}
              >
                <Text style={styles.submitButtonText}>
                  Değerlendirmeyi Gönder
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={onClose}
              >
                <Text style={styles.closeButtonText}>Vazgeç</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});

export default CommentModal;