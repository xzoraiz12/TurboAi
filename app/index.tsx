import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Colors } from '../constants/Colors';

type GradientTuple = readonly [string, string] | readonly [string, string, string];
const lightGradient: GradientTuple = ['#FFFFFF', '#F0F9FF'] as const;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={Colors.background.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Blurred Gradient Orbs */}
      <View style={styles.blurContainer}>
        <View style={[styles.blurOrb, styles.blurOrb1]} />
        <View style={[styles.blurOrb, styles.blurOrb2]} />
        <View style={[styles.blurOrb, styles.blurOrb3]} />
        <View style={[styles.blurOrb, styles.blurOrb4]} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Logo Area */}
        <View style={styles.logoContainer}>
          <LinearGradient colors={lightGradient} style={styles.logoCircle}>
            <Text style={styles.logoText}>TN</Text>
          </LinearGradient>
        </View>

        {/* Title */}
        <Text style={styles.title}>TurboNotes.AI</Text>
        <Text style={styles.subtitle}>
          Transform your lectures into smart study materials
        </Text>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <FeatureItem icon="🎙️" text="Record lectures easily" />
          <FeatureItem icon="📝" text="Generate smart notes" />
          <FeatureItem icon="🧠" text="Create flashcards & mindmaps" />
          <FeatureItem icon="💬" text="Chat with AI tutor" />
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => router.push('/signup')}
            activeOpacity={0.9}
          >
            <LinearGradient colors={lightGradient} style={styles.signupGradient}>
              <Text style={styles.signupText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push('/login')}
            activeOpacity={0.8}
          >
            <Text style={styles.loginText}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    left: -SCREEN_WIDTH * 0.2,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    backgroundColor: Colors.blur.cyan,
  },
  blurOrb2: {
    bottom: -SCREEN_HEIGHT * 0.1,
    right: -SCREEN_WIDTH * 0.2,
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    backgroundColor: Colors.blur.pink,
  },
  blurOrb3: {
    top: SCREEN_HEIGHT * 0.15,
    right: -SCREEN_WIDTH * 0.15,
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    backgroundColor: Colors.blur.purple,
  },
  blurOrb4: {
    bottom: SCREEN_HEIGHT * 0.2,
    left: -SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    backgroundColor: Colors.blur.yellow,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.primary.cyan,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: Colors.text.white,
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.glass.white90,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 26,
    paddingHorizontal: 16,
  },
  featuresContainer: {
    backgroundColor: Colors.glass.white70,
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureText: {
    fontSize: 16,
    color: Colors.text.primary,
    fontWeight: '600',
    flex: 1,
  },
  buttonsContainer: {
    gap: 16,
  },
  signupButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  signupGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary.cyan,
  },
  loginButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.white,
    textDecorationLine: 'underline',
  },
});
