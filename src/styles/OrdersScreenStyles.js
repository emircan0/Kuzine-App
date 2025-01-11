<<<<<<< HEAD
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export const COLORS = {
  primary: '#D91112',
  secondary: '#27ae60',
  background: '#F8F9FB',
  white: '#fff',
  text: {
    primary: '#1A1D1E',
    secondary: '#6A6A6A',
    light: '#999'
  },
  border: '#EEEEEE',
  status: {
    pending: '#FF9500',
    preparing: '#007AFF',
    onWay: '#34C759',
    delivered: '#27ae60',
    cancelled: '#FF3B30'
  }
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  header: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text.primary,
    letterSpacing: 0.3,
  },

  container: {
    flex: 1,
    paddingHorizontal: 12,
  },

  orderItem: {
    marginVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },

  orderInfo: {
    flex: 1,
  },

  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4,
  },

  orderDate: {
    fontSize: 13,
    color: COLORS.text.secondary,
  },

  orderStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 12,
  },

  orderStatusText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
  },

  orderContent: {
    padding: 16,
  },

  chefInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 12,
  },

  chefImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 2,
    borderColor: COLORS.white,
  },

  chefDetails: {
    flex: 1,
  },

  chefName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 2,
  },

  orderItemCount: {
    fontSize: 13,
    color: COLORS.text.secondary,
  },

  foodList: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },

  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  foodName: {
    fontSize: 14,
    color: COLORS.text.primary,
    flex: 1,
    marginRight: 8,
  },

  foodQuantity: {
    fontSize: 14,
    color: COLORS.text.secondary,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },

  foodPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },

  moreItems: {
    fontSize: 13,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginTop: 12,
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: 20,
  },

  totalContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },

  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },

  rateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 16,
  },

  rateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 8,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },

  emptyText: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },

  orderNowButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  orderNowText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

=======
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
>>>>>>> b07d740 (Initial commit)
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
<<<<<<< HEAD
    backgroundColor: COLORS.white,
  },

  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },

  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: COLORS.background,
  },

  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },

  filterButtonText: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },

  filterButtonTextActive: {
    color: COLORS.white,
  },
});

export default styles;
=======
  },
  emptyOrdersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888',
  },
  orderItem: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  packageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#27ae60',
  },
  orderDate: {
    fontSize: 14,
    color: '#999',
  },
  orderStatusText: {
    fontSize: 14,
    color: '#e74c3c',
    marginTop: 5,
  },
  foodItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  foodPrice: {
    fontSize: 14,
    color: '#555',
  },
  counter: {
    fontSize: 14,
    color: '#777',
  },
  chefInfo: {
    marginBottom: 10,
  },
  chefName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  chefLocation: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  foodList: {
    paddingBottom: 12,
  },
  orderList: {
    paddingBottom: 24,
  },
  deleteButtonContainer: {
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: '60%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  deleteButton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f3f3f3',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  star: {
    fontSize: 28,
    color: '#ffcc00',
    marginHorizontal: 4,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentsSection: {
    marginTop: 14,
  },
  commentText: {
    fontSize: 15,
    marginTop: 6,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#ff4d4d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentButton: {
    backgroundColor: '#d91112',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
>>>>>>> b07d740 (Initial commit)
