import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [skillMode, setSkillMode] = useState(false);

  const handleSignUp = () => {
    // TODO: Implement sign up logic
    console.log('Sign Up:', { fullName, email, password, skillDevelopment: skillMode });
    router.push('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={Colors.background.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Blurred Gradient Orbs */}
        <View style={styles.blurContainer}>
          <View style={[styles.blurOrb, styles.blurOrb1]} />
          <View style={[styles.blurOrb, styles.blurOrb2]} />
          <View style={[styles.blurOrb, styles.blurOrb3]} />
          <View style={[styles.blurOrb, styles.blurOrb4]} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Glass Card */}
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Create Your Account</Text>
              <Text style={styles.subtitle}>Welcome to TurboNotes.AI</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Full Name */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person"
                  size={22}
                  color={Colors.status.success}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={Colors.text.placeholder}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail"
                  size={22}
                  color={Colors.primary.cyan}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor={Colors.text.placeholder}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed"
                  size={22}
                  color={Colors.secondary.purple}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, styles.inputWithIcon]}
                  placeholder="Password"
                  placeholderTextColor={Colors.text.placeholder}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color={Colors.text.light}
                  />
                </TouchableOpacity>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed"
                  size={22}
                  color={Colors.secondary.pink}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, styles.inputWithIcon]}
                  placeholder="Confirm Password"
                  placeholderTextColor={Colors.text.placeholder}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color={Colors.text.light}
                  />
                </TouchableOpacity>
              </View>

              {/* Checkboxes */}
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setAgreeToTerms(!agreeToTerms)}
                >
                  <View style={[styles.checkboxBox, agreeToTerms && styles.checkboxChecked]}>
                    {agreeToTerms && (
                      <Ionicons name="checkmark" size={16} color={Colors.text.white} />
                    )}
                  </View>
                  <Text style={styles.checkboxText}>
                    I agree to the{' '}
                    <Text style={styles.link}>Terms</Text> and{' '}
                    <Text style={styles.link}>Privacy Policy</Text>
                  </Text>
                </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setNewsletter(!newsletter)}
              >
                <View style={[styles.checkboxBox, newsletter && styles.checkboxChecked]}>
                    {newsletter && (
                      <Ionicons name="checkmark" size={16} color={Colors.text.white} />
                    )}
                  </View>
                  <Text style={styles.checkboxText}>
                    Sign up for our newsletter for tips and updates
                </Text>
              </TouchableOpacity>
            </View>

            {/* Skill Development Mode */}
            <TouchableOpacity
              style={[styles.skillModeToggle, skillMode && styles.skillModeToggleActive]}
              onPress={() => setSkillMode(!skillMode)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={skillMode ? 'planet' : 'planet-outline'}
                size={20}
                color={skillMode ? Colors.text.white : Colors.primary.cyan}
              />
              <View style={styles.skillModeCopy}>
                <Text
                  style={[
                    styles.skillModeTitle,
                    skillMode && styles.skillModeTitleActive,
                  ]}
                >
                  Skill Development Mode
                </Text>
                <Text
                  style={[
                    styles.skillModeSubtitle,
                    skillMode && styles.skillModeSubtitleActive,
                  ]}
                >
                  Customize onboarding for building new competencies
                </Text>
              </View>
              <View style={[styles.skillModeSwitch, skillMode && styles.skillModeSwitchActive]}>
                <View style={[styles.skillModeThumb, skillMode && styles.skillModeThumbActive]} />
              </View>
            </TouchableOpacity>

              {/* Sign Up Button */}
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={Colors.background.cardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.signUpGradient}
                >
                  <Text style={styles.signUpText}>Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginPrompt}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                  <Text style={styles.loginLink}>Log In</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressDot, styles.progressDotActive]} />
              <View style={styles.progressDot} />
              <View style={styles.progressDot} />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  blurOrb: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.3,
  },
  blurOrb1: {
    top: -SCREEN_HEIGHT * 0.1,
    left: -SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    backgroundColor: Colors.blur.cyan,
  },
  blurOrb2: {
    bottom: -SCREEN_HEIGHT * 0.1,
    right: -SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_WIDTH * 0.6,
    backgroundColor: Colors.blur.pink,
  },
  blurOrb3: {
    top: SCREEN_HEIGHT * 0.1,
    right: -SCREEN_WIDTH * 0.2,
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_WIDTH * 0.4,
    backgroundColor: Colors.blur.purple,
  },
  blurOrb4: {
    bottom: SCREEN_HEIGHT * 0.05,
    left: -SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    backgroundColor: Colors.blur.yellow,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: Platform.OS === 'ios' ? 60 : 40,
  },
  card: {
    backgroundColor: Colors.glass.white70,
    borderRadius: 32,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.glass.white80,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.card.border,
    height: 56,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  inputWithIcon: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  checkboxContainer: {
    gap: 16,
    marginTop: 4,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.card.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card.white,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary.cyan,
    borderColor: Colors.primary.cyan,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  link: {
    color: Colors.primary.cyan,
    fontWeight: '600',
  },
  skillModeToggle: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.card.border,
    backgroundColor: Colors.card.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  skillModeToggleActive: {
    backgroundColor: Colors.primary.cyan,
    borderColor: Colors.primary.cyan,
  },
  skillModeCopy: {
    flex: 1,
    gap: 4,
  },
  skillModeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  skillModeTitleActive: {
    color: Colors.text.white,
  },
  skillModeSubtitle: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  skillModeSubtitleActive: {
    color: Colors.glass.white90,
  },
  skillModeSwitch: {
    width: 46,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.card.border,
    padding: 3,
    justifyContent: 'center',
  },
  skillModeSwitchActive: {
    backgroundColor: Colors.glass.white80,
  },
  skillModeThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.text.secondary,
    alignSelf: 'flex-start',
  },
  skillModeThumbActive: {
    backgroundColor: Colors.primary.cyan,
    alignSelf: 'flex-end',
  },
  signUpButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
    shadowColor: Colors.primary.cyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  signUpGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.white,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPrompt: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  loginLink: {
    fontSize: 14,
    color: Colors.primary.cyan,
    fontWeight: '700',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.card.border,
  },
  progressDotActive: {
    width: 24,
    backgroundColor: Colors.primary.cyan,
  },
});
