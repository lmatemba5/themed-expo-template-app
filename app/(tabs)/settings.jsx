import * as V from '@/app.json';
import { useFont, useTheme } from '@/context/ThemeContext';
import {
  NunitoSans_400Regular,
  NunitoSans_500Medium,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito-sans';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

const Settings = () => {
  const { theme, themeMode, currentTheme, updateTheme } = useTheme();
  const { fontSize, fontSizeMultiplier, updateFontSize } = useFont();

  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showFontModal, setShowFontModal] = useState(false);
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_500Medium,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
  });

  const handleThemeChange = async (newTheme) => {
    setShowThemeModal(false);
    await updateTheme(newTheme);
  };

  const handleFontSizeChange = async (newSize) => {
    await updateFontSize(newSize);
    setShowFontModal(false);
  };

  const handleClearCache = async () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data. The app may need to reload content. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: async () => {
          try {
            await AsyncStorage.clear();
            Alert.alert('Success', 'Cache cleared successfully!');
          } catch (error) {
            console.error('Error clearing cache:', error);
            Alert.alert('Error', 'Failed to clear cache');
          }
        }},
      ]
    );
  };

  const styles = createStyles(theme, currentTheme, fontsLoaded, fontSizeMultiplier, insets);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const SettingItem = ({ icon, title, subtitle, onPress, rightComponent, showArrow = false }) => (
    <Pressable
      style={styles.settingItem}
      onPress={onPress}
      android_ripple={{ color: currentTheme === 'dark' ? '#2C2C2E' : '#F2F2F7' }}
    >
      <View style={styles.settingItemLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingItemRight}>
        {rightComponent}
        {showArrow && <Text style={styles.settingArrow}>›</Text>}
      </View>
    </Pressable>
  );

  const ThemeModal = () => (
    <Modal
      transparent
      visible={showThemeModal}
      animationType="fade"
      onRequestClose={() => setShowThemeModal(false)}
    >
      <TouchableWithoutFeedback onPress={() => setShowThemeModal(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Choose Theme</Text>

              {[
                { key: 'light', label: 'Light', icon: '☀️' },
                { key: 'dark', label: 'Dark', icon: '🌙' },
                { key: 'system', label: 'System Default', icon: '📱' },
              ].map((option) => (
                <Pressable
                  key={option.key}
                  style={[
                    styles.modalOption,
                    themeMode === option.key && styles.modalOptionSelected
                  ]}
                  onPress={() => handleThemeChange(option.key)}
                >
                  <Text style={styles.modalOptionIcon}>{option.icon}</Text>
                  <Text style={[
                    styles.modalOptionText,
                    themeMode === option.key && styles.modalOptionTextSelected
                  ]}>
                    {option.label}
                  </Text>
                  {themeMode === option.key && (
                    <Text style={styles.modalOptionCheck}>✓</Text>
                  )}
                </Pressable>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const FontModal = () => (
    <Modal
      transparent
      visible={showFontModal}
      animationType="fade"
      onRequestClose={() => setShowFontModal(false)}
    >
      <TouchableWithoutFeedback onPress={() => setShowFontModal(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Font Size</Text>

              {[
                { key: 'small', label: 'Small', preview: 'Aa' },
                { key: 'medium', label: 'Medium', preview: 'Aa' },
                { key: 'large', label: 'Large', preview: 'Aa' },
              ].map((option) => (
                <Pressable
                  key={option.key}
                  style={[
                    styles.modalOption,
                    fontSize === option.key && styles.modalOptionSelected
                  ]}
                  onPress={() => handleFontSizeChange(option.key)}
                >
                  <Text style={[
                    styles.fontPreview,
                    { fontSize: (option.key === 'small' ? 14 : option.key === 'large' ? 22 : 18) }
                  ]}>
                    {option.preview}
                  </Text>
                  <Text style={[
                    styles.modalOptionText,
                    fontSize === option.key && styles.modalOptionTextSelected
                  ]}>
                    {option.label}
                  </Text>
                  {fontSize === option.key && (
                    <Text style={styles.modalOptionCheck}>✓</Text>
                  )}
                </Pressable>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>

          <SettingItem
            icon="🎨"
            title="Theme"
            subtitle={`Current: ${themeMode === 'system' ? 'System Default' : themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}`}
            onPress={() => setShowThemeModal(true)}
            showArrow
          />

          <SettingItem
            icon="🔤"
            title="Font Size"
            subtitle={`Current: ${fontSize.charAt(0).toUpperCase() + fontSize.slice(1)}`}
            onPress={() => setShowFontModal(true)}
            showArrow
          />
        </View>

        {/* Data & Sync Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          <SettingItem
            icon="🗑️"
            title="Clear Cache"
            subtitle="Free up storage space"
            onPress={handleClearCache}
            showArrow
          />
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appCopyright}>© {new Date().getFullYear()} Dawah App v{V.expo.version}</Text>
        </View>
      </ScrollView>

      {/* Modals */}
      <ThemeModal />
      <FontModal />
    </View>
  );
};

const createStyles = (theme, colorScheme, fontsLoaded, fontSizeMultiplier, insets) => {
  const baseFontSize = 16 * fontSizeMultiplier;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
      paddingBottom: insets.bottom
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    loadingText: {
      color: theme.text,
      fontSize: baseFontSize,
      fontFamily: fontsLoaded ? 'NunitoSans_400Regular' : undefined,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 40,
    },
    
    sectionTitle: {
      fontSize: baseFontSize + 2,
      color: theme.text,
      fontFamily: fontsLoaded ? 'NunitoSans_600SemiBold' : undefined,
      fontWeight: fontsLoaded ? undefined : '600',
      marginBottom: 16,
      marginLeft: 4,
    },
    settingItem: {
      backgroundColor: theme.cardBackground,
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: 1,
      borderColor: theme.cardBorder,
    },
    settingItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingIcon: {
      fontSize: 24 * fontSizeMultiplier,
      marginRight: 16,
    },
    settingTextContainer: {
      flex: 1,
    },
    settingTitle: {
      fontSize: baseFontSize,
      color: theme.text,
      fontFamily: fontsLoaded ? 'NunitoSans_500Medium' : undefined,
      fontWeight: fontsLoaded ? undefined : '500',
      marginBottom: 2,
    },
    settingSubtitle: {
      fontSize: baseFontSize - 2,
      color: theme.textSecondary,
      fontFamily: fontsLoaded ? 'NunitoSans_400Regular' : undefined,
    },
    settingItemRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingArrow: {
      fontSize: 20 * fontSizeMultiplier,
      color: theme.textSecondary,
      marginLeft: 8,
    },
    appInfo: {
      alignItems: 'center',
      paddingVertical: 32,
      paddingHorizontal: 20,
    },
    appName: {
      fontSize: baseFontSize + 4,
      color: theme.text,
      fontFamily: fontsLoaded ? 'NunitoSans_700Bold' : undefined,
      fontWeight: fontsLoaded ? undefined : 'bold',
      marginBottom: 8,
    },
    appVersion: {
      fontSize: baseFontSize,
      color: theme.textSecondary,
      fontFamily: fontsLoaded ? 'NunitoSans_500Medium' : undefined,
      fontWeight: fontsLoaded ? undefined : '500',
      marginBottom: 4,
    },
    appCopyright: {
      fontSize: baseFontSize - 2,
      color: theme.textSecondary,
      fontFamily: fontsLoaded ? 'NunitoSans_400Regular' : undefined,
      textAlign: 'center',
    },
    // Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    modalContent: {
      backgroundColor: theme.cardBackground,
      borderRadius: 20,
      padding: 24,
      width: screenWidth - 40,
      maxWidth: 400,
    },
    modalTitle: {
      fontSize: baseFontSize + 4,
      color: theme.text,
      fontFamily: fontsLoaded ? 'NunitoSans_700Bold' : undefined,
      fontWeight: fontsLoaded ? undefined : 'bold',
      textAlign: 'center',
      marginBottom: 24,
    },
    modalOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 12,
      marginBottom: 8,
    },
    modalOptionSelected: {
      backgroundColor: colorScheme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)',
    },
    modalOptionIcon: {
      fontSize: 24 * fontSizeMultiplier,
      marginRight: 16,
    },
    modalOptionText: {
      flex: 1,
      fontSize: baseFontSize,
      color: theme.text,
      fontFamily: fontsLoaded ? 'NunitoSans_500Medium' : undefined,
      fontWeight: fontsLoaded ? undefined : '500',
    },
    modalOptionTextSelected: {
      color: theme.tint,
    },
    modalOptionCheck: {
      fontSize: 20 * fontSizeMultiplier,
      color: theme.tint,
      fontWeight: 'bold',
    },
    fontPreview: {
      color: theme.text,
      fontFamily: fontsLoaded ? 'NunitoSans_600SemiBold' : undefined,
      fontWeight: fontsLoaded ? undefined : '600',
      marginRight: 16,
      minWidth: 30,
    },
  });
};

export default Settings;
