import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';

type IoniconName = keyof typeof Ionicons.glyphMap;

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={Colors.background.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JS</Text>
          </View>
          <Text style={styles.name}>John Student</Text>
          <Text style={styles.email}>john.student@email.com</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <StatItem value="24" label="Notes" />
          <View style={styles.divider} />
          <StatItem value="156" label="Flashcards" />
          <View style={styles.divider} />
          <StatItem value="12" label="Mind Maps" />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Card */}
        <View style={styles.premiumCard}>
          <LinearGradient
            colors={Colors.background.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.premiumGradient}
          >
            <Ionicons name="star" size={32} color={Colors.text.white} />
            <View style={styles.premiumContent}>
              <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
              <Text style={styles.premiumText}>
                Unlimited recordings, advanced AI features, and more
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.text.white} />
          </LinearGradient>
        </View>

        {/* Settings Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingItem icon="person-outline" label="Edit Profile" />
          <SettingItem icon="notifications-outline" label="Notifications" />
          <SettingItem icon="shield-checkmark-outline" label="Privacy" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <SettingItem icon="color-palette-outline" label="Appearance" value="Light" />
          <SettingItem icon="language-outline" label="Language" value="English" />
          <SettingItem icon="download-outline" label="Download Settings" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingItem icon="help-circle-outline" label="Help Center" />
          <SettingItem icon="mail-outline" label="Contact Us" />
          <SettingItem icon="star-outline" label="Rate App" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <SettingItem icon="information-circle-outline" label="About TurboNotes" />
          <SettingItem icon="document-text-outline" label="Terms of Service" />
          <SettingItem icon="lock-closed-outline" label="Privacy Policy" />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace('/')}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={20} color={Colors.status.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function SettingItem({
  icon,
  label,
  value,
}: {
  icon: IoniconName;
  label: string;
  value?: string;
}) {
  return (
    <TouchableOpacity style={styles.settingItem} activeOpacity={0.8}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color={Colors.text.secondary} />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        <Ionicons name="chevron-forward" size={20} color={Colors.text.light} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.card.lightGray,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.glass.white70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: Colors.text.white,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.text.white,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text.white,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: Colors.glass.white90,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.glass.white70,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.glass.white90,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    backgroundColor: Colors.glass.white70,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  premiumCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  premiumGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  premiumContent: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.white,
    marginBottom: 4,
  },
  premiumText: {
    fontSize: 14,
    color: Colors.glass.white90,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 15,
    color: Colors.text.light,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: Colors.card.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.status.error,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.status.error,
  },
  version: {
    fontSize: 14,
    color: Colors.text.light,
    textAlign: 'center',
    marginBottom: 16,
  },
});
