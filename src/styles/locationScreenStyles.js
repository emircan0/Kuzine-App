<<<<<<< HEAD
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: '#d91112',
  background: '#f8f8f8',
  white: '#fff',
  border: '#d91112',
  text: '#333',
  error: '#ff3b30',
};

const SPACING = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 30,
};

const SIZES = {
  title: 26,
  body: 16,
  button: 18,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingTop: Platform.OS === 'ios' ? SPACING.xl + 20 : SPACING.xl,
  },
  
  content: {
    flex: 1,
    paddingBottom: SPACING.xl,
  },

  title: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: SPACING.lg,
  },

  mapContainer: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  
  map: {
    width: '100%',
    height: height * 0.4,
    borderRadius: SPACING.sm,
    overflow: 'hidden',
  },

  expandedMap: {
    height: height * 0.6,
  },

  formContainer: {
    width: '100%',
    marginTop: SPACING.lg,
  },

  input: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    fontSize: SIZES.body,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  confirmButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    alignItems: 'center',
    marginTop: SPACING.lg,
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

  confirmText: {
    color: COLORS.white,
    fontSize: SIZES.button,
    fontWeight: '600',
  },

  refreshButton: {
    position: 'absolute',
    top: SPACING.lg,
    right: SPACING.lg,
    backgroundColor: COLORS.white,
    padding: SPACING.sm,
    borderRadius: 25,
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

  expandButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.sm,
    borderRadius: SPACING.sm,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },

  expandText: {
    color: COLORS.white,
    fontSize: SIZES.body,
    fontWeight: '500',
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },

  errorText: {
    color: COLORS.error,
    fontSize: SIZES.body,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },

  retryButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: SPACING.sm,
  },

  retryText: {
    color: COLORS.white,
    fontSize: SIZES.body,
    fontWeight: '500',
  },
});
=======
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const locationScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#d91112',
    marginVertical: 20,
  },
  map: {
    width: '100%',
    height: height * 0.4,
    borderRadius: 10,
    marginBottom: 20,
  },
  expandedMap: {
    height: height * 0.6,
  },
  expandButton: {
    backgroundColor: '#d91112',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  expandText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollViewContent: {
    width: '100%',
    paddingBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#d91112',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 10,
    height: 50,
  },
  pickerContainer: {
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#d91112',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  refreshButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  
});

export default locationScreenStyles;
>>>>>>> b07d740 (Initial commit)
