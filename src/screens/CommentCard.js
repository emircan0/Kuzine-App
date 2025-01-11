import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Expo'dan ikonlar

const StarRating = ({ rating }) => {
  const stars = Array(5).fill(false).map((_, index) => index < rating);
  
  return (
    <View style={styles.starContainer}>
      {stars.map((filled, index) => (
        <MaterialCommunityIcons
          key={index}
          name={filled ? 'star' : 'star-outline'}
          size={24}
          color={filled ? 'gold' : '#bbb'}
        />
      ))}
    </View>
  );
};

const CommentCard = ({ comment }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.username}>{comment.username}</Text>
      <StarRating rating={comment.rating} />
      <Text style={styles.commentText}>{comment.text}</Text>
      <Text style={styles.date}>{comment.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  date: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default CommentCard;
