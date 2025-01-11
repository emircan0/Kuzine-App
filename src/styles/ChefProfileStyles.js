import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Hafif bir arka plan rengi
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  coverImage: {
    width: '100%',
    height: 220,
    borderRadius: 15,
    marginBottom: 12,
  },
  profileContainer: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 12,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 16,
    color: '#777',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
<<<<<<< HEAD
    padding: 10,
  },
  rating: {
    fontSize: 16,
    marginLeft: 5,
  },
  commentsCount: {
    fontSize: 16,
    marginLeft: 10,
    color: 'gray',
=======
    marginTop: 6,
  },
  commentsCount: {
    marginLeft: 5,
    color: '#777',
>>>>>>> b07d740 (Initial commit)
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  tabSelected: {
    borderBottomWidth: 3,
    borderBottomColor: '#D91112', // Seçili tab rengi
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  commentContainer: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  deleteButton: {
    backgroundColor: '#D91112', // Silme butonu
    padding: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dishCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    margin: 6,
    padding: 12,
    width: '45%', // İki sütun görünümü için genişlik
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dishImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  dishName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  dishDescription: {
    fontSize: 14,
    color: '#666',
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 6,
    color: '#D91112', // Fiyat rengi
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#D9112A',
    borderRadius: 25,
    padding: 5,
    justifyContent: 'center',
  },
  quantityButton: {
    backgroundColor: '#D91112',
    padding: 2,
    borderRadius: 25,
    minWidth: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 15,
  },
  quantityText: {
    color: '#fff',
    fontSize: 12,
    marginHorizontal: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  textInput: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    width: '100%',
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  starRatingContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#D91112', // Güncelleme için kırmızı
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 12,
  },
  closeButtonText: {
    color: '#D91112',
    fontWeight: 'bold',
  },
  commentButton: {
    backgroundColor: '#D91112', // Yorum ekleme butonu
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  commentContainer: {
    position: 'relative',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  slideButton: {
    position: 'absolute',
    right: 50,
    top: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  rating: {
    fontSize: 16,
    marginLeft: 5,
  },
  commentsCount: {
    fontSize: 16,
    marginLeft: 10,
    color: 'gray',
  },
<<<<<<< HEAD
=======
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  rating: {
    fontSize: 16,
    marginLeft: 5,
  },
  commentsCount: {
    fontSize: 16,
    marginLeft: 10,
    color: 'gray',
  },
>>>>>>> b07d740 (Initial commit)
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    height: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  ratingStarsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  modalSubmitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  previousCommentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  commentsList: {
    marginTop: 10,
  },
  commentItem: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  commentText: {
    fontSize: 16,
    color: '#555',
  },
  commentRatingContainer: {
    flexDirection: 'row',
  },
});

export default styles;
