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
import { StyleSheet, Dimensions } from 'react-native';


const { width } = Dimensions.get('window');
>>>>>>> b07d740 (Initial commit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: COLORS.background,
  },

  // Header Styles
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === 'ios' ? 45 : 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow.dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 8,
  },

  logoContainer: {
    width: 85,
    height: 32,
    justifyContent: 'center',
  },

  logo: {
    width: '130%',
    height: '130%',
    resizeMode: 'contain',
  },

  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 10,
    maxWidth: width * 0.45,
    height: 34,
  },

  locationIcon: {
    marginRight: 6,
  },

  locationText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },

  menuButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },

  // Search Bar Styles
  searchContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow.dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.text.primary,
    fontWeight: '400',
  },

  // Campaign Styles
  campaignsContainer: {
    marginTop: 16,
    marginBottom: 20,
    height: 160,
  },

  campaignCard: {
    width: width - 48,
    height: 160,
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow.dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },

=======
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5, 
    paddingVertical: 10,   
    backgroundColor: '#D91112',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, 
    shadowRadius: 8,   
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  logo: {
    width: 80,  
    height: 40, 
    resizeMode: 'contain',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
    justifyContent: 'center', 
  },
  locationIcon: {
    marginRight: 5,
  },
  locationText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
  },
  icon: {
    marginLeft: 'auto', 
    marginRight: 10,
    color: '#fff'
  },
  searchContainer: {
    padding: 4,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    marginHorizontal: 10,
    width: width * 0.95,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    paddingVertical: 5,
  },
  campaignsContainer: {
    height: 150,
    marginVertical: 10,
  },
  campaignCard: {
    width: 300,
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    marginLeft: 8,
  },
>>>>>>> b07d740 (Initial commit)
  campaignImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
<<<<<<< HEAD

  // Category Styles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text.primary,
    letterSpacing: -0.3,
  },

  viewAll: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },

  categoriesContainer: {
    paddingLeft: 16,
    marginBottom: 24,
    height: 110,
  },

  categoryCard: {
    width: 85,
    marginRight: 12,
    alignItems: 'center',
  },

  categoryImageContainer: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow.medium,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  categoryImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },

  categoryName: {
    fontSize: 12,
    color: COLORS.text.primary,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 4,
  },

  // Chef Styles
  chefsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  chefCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow.dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  chefCoverImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },

  chefProfileContainer: {
    flexDirection: 'row',
    padding: 12,
  },

  chefProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: COLORS.white,
    marginTop: -35,
    backgroundColor: COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow.dark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  chefInfo: {
    flex: 1,
    marginLeft: 12,
  },

  chefName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 2,
  },

  chefSpecialty: {
    fontSize: 13,
    color: COLORS.text.secondary,
    marginBottom: 6,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 4,
  },

  chefLocation: {
    fontSize: 12,
    color: COLORS.text.light,
  },

  divider: {
    height: 6,
    backgroundColor: COLORS.background,
    marginVertical: 8,
  },

  // Loading Container
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
=======
  categoriesContainer: {
    height: 120,
    marginVertical: 5,
  },
  categoryCard: {
    width: 87,
    height: 110,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    marginLeft: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '70%',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  categoryTextContainer: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  categoryText: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  kitchensContainer: {
    paddingHorizontal: 10,
  },
  kitchenCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  coverImage: {
    width: 365,
    height: 175,
    resizeMode: 'cover',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    position: 'absolute',
    top: 135,
    left: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  kitchenInfoContainer: {
    flexDirection: 'column',
    marginLeft: 80,
    marginBottom: 10,
  },
  kitchenName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  kitchenDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  kitchenDescription: {
    fontSize: 14,
    color: 'gray',
  },
  kitchenRating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    left: 50,
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 10, 
    right: 10, 
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  kitchensHeaderContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row', // Yan yana dizilme
    justifyContent: 'space-between', // İki metin arasında boşluk bırakır
    alignItems: 'center', // Dikey ortalama
    width: '100%',
  },
  mutfakBaslik: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  kategoriBaslik: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 10,
  },
  tumunuGor: {
    fontSize: 12,
    color: '#ff0000',
    textAlign: 'right', // Yazıyı sağa yaslar
    marginRight: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    
  },
  line: {
    width: '25%',      // Çizginin tüm genişliği kaplaması
    height: 6,
    backgroundColor: '#D91112',
    marginVertical: 10,
    borderRadius: 10,
>>>>>>> b07d740 (Initial commit)
  },
});

export default styles;
