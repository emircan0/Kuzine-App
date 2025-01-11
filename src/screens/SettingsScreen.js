import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Switch,
  StyleSheet,
  Platform,
  StatusBar
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

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const renderSettingItem = (title, value, onValueChange) => (
    <View style={styles.settingItem}>
      <Text style={styles.settingText}>{title}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#E5E5EA", true: COLORS.primary }}
        thumbColor={Platform.OS === 'ios' ? '#fff' : value ? '#fff' : '#f4f3f4'}
        ios_backgroundColor="#E5E5EA"
        style={Platform.OS === 'ios' && { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
      />
    </View>
  );

  const renderLinkItem = (title, rightText = null) => (
    <TouchableOpacity style={styles.linkItem} activeOpacity={0.7}>
      <Text style={styles.settingText}>{title}</Text>
      {rightText ? (
        <Text style={styles.rightText}>{rightText}</Text>
      ) : (
        <Ionicons name="chevron-forward" size={20} color={COLORS.text.light} />
      )}
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Ayarlar</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bildirimler</Text>
          {renderSettingItem('Uygulama Bildirimleri', notifications, setNotifications)}
          {renderSettingItem('E-posta Bildirimleri', emailNotifications, setEmailNotifications)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Görünüm</Text>
          {renderSettingItem('Karanlık Mod', darkMode, setDarkMode)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uygulama Hakkında</Text>
          {renderLinkItem('Gizlilik Politikası')}
          {renderLinkItem('Kullanım Koşulları')}
          {renderLinkItem('Sürüm', '1.0.0')}
        </View>

        <TouchableOpacity style={styles.deleteAccountButton} activeOpacity={0.7}>
          <Text style={styles.deleteAccountText}>Hesabı Sil</Text>
        </TouchableOpacity>
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
  section: {
    padding: 16,
    backgroundColor: COLORS.white,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  linkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingText: {
    fontSize: 16,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  rightText: {
    fontSize: 15,
    color: COLORS.text.light,
  },
  deleteAccountButton: {
    marginTop: 24,
    marginBottom: 32,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
  },
  deleteAccountText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen; 