import { StyleSheet } from 'react-native';

const authScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff', // Background color
  },
  innerContainer: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#fff',
  },
  title2: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#D91112',
  },
  input: {
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    color: '#333',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#D91112',
    paddingVertical: 12,
  },
  googleButton: {
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: '#D91112',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  googleIcon: {
    marginRight: 10, // Space between icon and text for Google login
  },
  switchText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  verificationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  verificationText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  resendButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  resendButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  signOutButton: {
    backgroundColor: '#9E9E9E',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  signOutButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  logo: {
    width: 300, // Genişlik ayarı
    height: 95, // Yükseklik ayarı
    alignSelf: 'center',
    marginBottom: 200, // "Hoş geldiniz" yazısıyla boşluk
    backgroundColor: 'transparent', // Arka plan rengini şeffaf yap
    borderRadius: 100,
  },

});

export default authScreenStyles;
