import { StyleSheet } from 'react-native';

const authenticatedScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  emailText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default authenticatedScreenStyles;
