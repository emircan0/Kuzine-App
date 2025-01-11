import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  kitchenCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5, // Gölgeli görünüm için
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  coverImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    top: 130, // Kapak resmiyle uyumlu hale getirildi
    left: 16,
    borderWidth: 3,
    borderColor: '#ffffff', // Beyaz bir kenarlık
  },
  kitchenInfoContainer: {
    padding: 16,
    marginTop: 50, // Profil resmiyle uyumlu hale getirildi
    backgroundColor: '#ffffff',
  },
  kitchenName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  kitchenDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  kitchenRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  kitchenRating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700', // Altın rengi yıldızlar için
    marginLeft: 5,
  },
  favoriteIconContainer: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});

export default styles;
