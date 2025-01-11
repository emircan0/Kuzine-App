import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

const COLORS = {
  primary: '#D91112',
  background: '#F8F9FB',
  white: '#fff',
  text: {
    primary: '#1A1D1E',
    secondary: '#6A6A6A',
    light: '#999'
  },
  border: '#EEEEEE',
};

const HelpScreen = ({ navigation }) => {
  const faqItems = [
    {
      question: 'Sipariş nasıl verebilirim?',
      answer: 'Ana sayfada istediğiniz şefi seçip menüsünden sipariş verebilirsiniz. Seçtiğiniz yemekleri sepete ekleyip ödeme adımlarını takip ederek siparişinizi tamamlayabilirsiniz.'
    },
    {
      question: 'Ödeme seçenekleri nelerdir?',
      answer: 'Kredi kartı, banka kartı ve kapıda ödeme seçeneklerimiz mevcuttur. Tüm ödemeleriniz güvenli bir şekilde gerçekleştirilmektedir.'
    },
    {
      question: 'Siparişimi nasıl iptal edebilirim?',
      answer: 'Siparişler bölümünden ilgili siparişi seçip iptal edebilirsiniz. Sipariş hazırlanmaya başladıktan sonra iptal işlemi yapılamaz.'
    },
    {
      question: 'Teslimat süresi ne kadardır?',
      answer: 'Teslimat süresi seçtiğiniz şefin konumuna ve yoğunluğuna göre değişiklik gösterir. Ortalama teslimat süresi 45-60 dakika arasındadır.'
    }
  ];

  const handleContact = (type) => {
    if (type === 'email') {
      Linking.openURL('mailto:destek@kuzineapp.com');
    } else if (type === 'phone') {
      Linking.openURL('tel:08501234567');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yardım</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <Text style={styles.searchTitle}>Size nasıl yardımcı olabiliriz?</Text>
          <TouchableOpacity style={styles.searchButton} activeOpacity={0.7}>
            <Ionicons name="search" size={20} color={COLORS.text.secondary} />
            <Text style={styles.searchButtonText}>Yardım konusu ara</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sıkça Sorulan Sorular</Text>
          {faqItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.faqItem}
              activeOpacity={0.7}
            >
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.answer}>{item.answer}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>İletişim</Text>
          <TouchableOpacity 
            style={styles.contactItem} 
            onPress={() => handleContact('email')}
            activeOpacity={0.7}
          >
            <View style={styles.contactIconContainer}>
              <Ionicons name="mail-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>E-posta</Text>
              <Text style={styles.contactText}>destek@kuzineapp.com</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text.light} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleContact('phone')}
            activeOpacity={0.7}
          >
            <View style={styles.contactIconContainer}>
              <Ionicons name="call-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Telefon</Text>
              <Text style={styles.contactText}>0850 123 45 67</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text.light} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
  },
  searchSection: {
    padding: 16,
    backgroundColor: COLORS.white,
  },
  searchTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  searchButtonText: {
    marginLeft: 8,
    fontSize: 15,
    color: COLORS.text.secondary,
  },
  section: {
    padding: 16,
    backgroundColor: COLORS.white,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  faqItem: {
    marginBottom: 24,
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 2,
  },
  contactText: {
    fontSize: 16,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
});

export default HelpScreen; 