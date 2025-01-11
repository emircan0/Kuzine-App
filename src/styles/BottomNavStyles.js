import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Öğeleri eşit aralıklarla hizala
    paddingVertical: 8, // Yatayda boşluk bırak
    backgroundColor: '#D91112', // Arka plan rengi kırmızı
    borderTopWidth: 1,
    borderTopColor: '#fff', // İnce beyaz çizgi
    borderRadius: 20, // Köşe yuvarlama
    overflow: 'hidden', // Taşmaları engelle
  },
  navItem: {
    alignItems: 'center',
    flex: 1, // Her öğeyi eşit genişlikte yap
  },
  navLabel: {
    color: '#fff', // Yazı rengi beyaz
    fontSize: 10,
    marginTop: 5, // İkon ile yazı arası boşluk
  },
  iconStyle: {
    color: '#fff', // İkon rengi beyaz
  },
});

export default styles;
