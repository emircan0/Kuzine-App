import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28, // Başlık boyutu
    fontWeight: 'bold',
    color: '#333333',
  },
  categoryName: {
    fontSize: 22, // Kategori adı boyutu
    fontWeight: '500',
    color: '#555555',
    marginTop: 8,
    textAlign: 'center',
  },
  kitchenCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  kitchenInfo: {
    flex: 1,
  },
  kitchenName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  kitchenDescription: {
    fontSize: 14,
    color: '#777777',
    marginTop: 4,
  },
  noKitchens: {
    fontSize: 16,
    fontWeight: '500',
    color: '#888888',
    textAlign: 'center',
    marginTop: 20,
  },
});
