// buttonStyles.js
import { StyleSheet } from 'react-native';

const buttonStyles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e74c3c', // Red color
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default buttonStyles;
