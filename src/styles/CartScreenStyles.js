<<<<<<< HEAD
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

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
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(0, 0, 0, 0.15)'
  }
};
=======
import { StyleSheet } from 'react-native';
>>>>>>> b07d740 (Initial commit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow.medium,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text.primary,
    letterSpacing: -0.5,
  },

  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  clearButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },

  contentContainer: {
    flex: 1,
    paddingTop: 12,
  },

  listContainer: {
    padding: 20,
    paddingBottom: 100, // Alt kısımda boşluk bırak
  },

  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow.dark,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  cartItemImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    marginRight: 16,
  },

  cartItemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },

  cartItemText: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 6,
    lineHeight: 22,
  },

  cartItemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    padding: 4,
    position: 'absolute',
    bottom: 16,
    right: 16,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },

  quantityText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 24,
    textAlign: 'center',
  },

  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow.dark,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 16,
      },
    }),
  },

  totalAndCheckout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  totalInfo: {
    flex: 1,
  },

  totalItems: {
    fontSize: 15,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },

  totalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text.primary,
    letterSpacing: -0.5,
  },

  checkoutButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  summaryButton: {
    padding: 12,
    marginRight: 16,
    backgroundColor: COLORS.background,
    borderRadius: 20,
  },

  checkoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  checkoutButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    marginRight: 12,
  },

  summaryContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 16,
    letterSpacing: -0.5,
  },

  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 4,
  },

  summaryItemText: {
    fontSize: 15,
    color: COLORS.text.secondary,
    flex: 1,
    marginRight: 12,
  },

  summaryItemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text.primary,
  },

  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  summaryTotalText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },

  summaryTotalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: COLORS.white,
  },

  emptyText: {
    fontSize: 20,
    color: COLORS.text.secondary,
    marginTop: 20,
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 28,
  },

  continueButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  continueButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // Yeni eklenen stiller
  cartItemBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },

  cartItemBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },

  itemCategory: {
    fontSize: 13,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },

  checkoutProgress: {
    height: 3,
    backgroundColor: COLORS.border,
    borderRadius: 1.5,
    marginBottom: 20,
  },

  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 1.5,
=======
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cartItemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  cartItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  cartItemPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#D9112A',
    marginBottom: 6,
  },
  totalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 5, // Reduce margin top
    padding: 5, // Reduce padding
    borderRadius: 20, // Decrease border radius for a more compact look
    borderWidth: 1,
    borderColor: '#D91112',
  },
  checkoutContainer: {
    flexDirection: 'row', // İkon ve butonu yan yana yerleştirir
    alignItems: 'center', // Dikey olarak ortalar
    justifyContent: 'flex-start', // Sol hizalar
    marginTop: 10,
  },
  checkoutIcon: {
    marginRight: 10, // İkon ve buton arasında boşluk bırakır
  },
  checkoutButton: {
    paddingVertical: 10, // Dikey alanı artırarak butonun görünümünü iyileştir
    paddingHorizontal: 20, // Yatay alan ekleyerek butonu genişlet
    backgroundColor: '#D9112A',
    borderRadius: 20,
    alignItems: 'center',
    flex: 1,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 5,
    backgroundColor: '#D9112A',
    borderRadius: 25,
    padding: 5,
    justifyContent: 'center',
  },
  quantityButton: {
    backgroundColor: '#D9112A',
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
  summaryContainer: {
    padding: 7,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderWidth: 1,
    borderColor: '#D9112A',
    borderRadius: 20,
    marginTop: 5,
    width: '100%', // Tam genişlik
  },
  summaryToggle: {
    padding: 10,
    alignItems: 'center',
  },
  summaryDetails: {
    marginTop: 5,
  },
  summaryText: {
    fontSize: 12,
    color: '#333',
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D9112A',
    marginTop: 10,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
>>>>>>> b07d740 (Initial commit)
  },
});

export default styles;
