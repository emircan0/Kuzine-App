<<<<<<< HEAD
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

// Tema renkleri
const COLORS = {
  primary: '#D91112',
  background: '#f8f8f8',
  white: '#fff',
  text: {
    primary: '#333',
    secondary: '#666',
    light: '#999'
  },
  border: '#eee',
  error: '#ff3b30'
};

// Boşluk değerleri
const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};

// Font boyutları
const FONT = {
  h1: 24,
  h2: 20,
  body: 16,
  caption: 14,
  small: 12
};

const ProfileScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  header: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  headerTitle: {
    fontSize: FONT.h1,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },

  userInfoCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SPACING.md,
    position: 'relative',
  },

  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },

  editIconContainer: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  uploadingContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
  },

  userName: {
    fontSize: FONT.h2,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },

  userEmail: {
    fontSize: FONT.body,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
  },

  deletePhotoButton: {
    marginTop: SPACING.sm,
    padding: SPACING.sm,
  },

  deletePhotoText: {
    color: COLORS.primary,
    fontSize: FONT.caption,
    fontWeight: '500',
  },

  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    marginTop: SPACING.md,
    borderRadius: 12,
    marginHorizontal: SPACING.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: FONT.h2,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },

  statLabel: {
    fontSize: FONT.caption,
    color: COLORS.text.secondary,
  },

  optionsContainer: {
    backgroundColor: COLORS.white,
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: 12,
    marginHorizontal: SPACING.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  optionText: {
    flex: 1,
    fontSize: FONT.body,
    color: COLORS.text.primary,
    marginLeft: SPACING.md,
  },

  logoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xl,
    padding: SPACING.md,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  logoutButtonText: {
    color: COLORS.white,
    fontSize: FONT.body,
    fontWeight: 'bold',
    marginLeft: SPACING.sm,
  },

  // Yeni eklenen refresh control stili
  refreshControl: {
    tintColor: COLORS.primary,
  },

  // Son option butonu için özel stil
  lastOptionButton: {
    borderBottomWidth: 0,
  },
});

export default ProfileScreenStyles;
=======
import { StyleSheet } from 'react-native';

const ProfileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Açık gri arka plan
    padding: 20,
  },
  subHeader: {
    fontSize: 16,
    color: '#D91112',
    textAlign: 'center',
    marginBottom: 20,
  },
  userInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#D91112', // Kırmızı kenar
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#333',
  },
  userPhone: {
    fontSize: 16,
    color: '#333',
  },
  userAddress: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  changeButton: {
    backgroundColor: 'transparent',
  },
  changeButtonText: {
    color: '#D91112',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    alignItems: 'flex-start',
    elevation: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#D91112', // Kırmızı buton
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});

export default ProfileScreenStyles;
>>>>>>> b07d740 (Initial commit)
