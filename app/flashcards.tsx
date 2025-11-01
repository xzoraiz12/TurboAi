import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.85;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.55;

type GradientTuple = readonly [string, string] | readonly [string, string, string];

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const flashcards: Flashcard[] = [
  {
    id: '1',
    question: 'What is the capital of France?',
    answer: 'Paris is the capital and most populous city of France.',
    category: 'Geography',
    difficulty: 'easy',
  },
  {
    id: '2',
    question: 'What is quantum entanglement?',
    answer: 'Quantum entanglement is a physical phenomenon that occurs when pairs of particles interact in ways such that the quantum state of each particle cannot be described independently.',
    category: 'Physics',
    difficulty: 'hard',
  },
  {
    id: '3',
    question: 'Who wrote "Romeo and Juliet"?',
    answer: 'William Shakespeare wrote this tragic play around 1594-1596.',
    category: 'Literature',
    difficulty: 'easy',
  },
  {
    id: '4',
    question: 'What is the derivative of x²?',
    answer: '2x - Using the power rule: d/dx(xⁿ) = n·xⁿ⁻¹',
    category: 'Mathematics',
    difficulty: 'medium',
  },
];

export default function FlashcardsScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnim] = useState(new Animated.Value(0));

  const currentCard = flashcards[currentIndex];

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(flipAnim, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnim, {
        toValue: 1,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      flipAnim.setValue(0);
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      flipAnim.setValue(0);
    }
  };

  const frontRotation = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backRotation = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const difficultyConfig: Record<Flashcard['difficulty'], { color: string; label: string; gradient: GradientTuple }> = {
    easy: { color: Colors.status.success, label: 'Easy', gradient: [Colors.status.success, '#059669'] as const },
    medium: { color: Colors.status.warning, label: 'Medium', gradient: [Colors.status.warning, '#d97706'] as const },
    hard: { color: Colors.status.error, label: 'Hard', gradient: [Colors.status.error, '#b91c1c'] as const },
  };

  return (
    <LinearGradient
      colors={Colors.background.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Flashcards</Text>
          <Text style={styles.headerSubtitle}>{currentCard.category}</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={Colors.text.white} />
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentIndex + 1) / flashcards.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {flashcards.length}
        </Text>
      </View>

      {/* Flashcard */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={flipCard}
          style={styles.cardTouchable}
        >
          {/* Front of Card */}
          <Animated.View
            style={[
              styles.card,
              styles.cardFront,
              {
                transform: [{ rotateY: frontRotation }],
                opacity: frontOpacity,
              },
            ]}
          >
            <LinearGradient
              colors={Colors.background.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={[styles.difficultyBadge, { backgroundColor: `${difficultyConfig[currentCard.difficulty].color}20` }]}>
                    <Text style={[styles.difficultyText, { color: difficultyConfig[currentCard.difficulty].color }]}>
                      {difficultyConfig[currentCard.difficulty].label}
                    </Text>
                  </View>
                  <Ionicons name="help-circle" size={32} color={Colors.text.white} />
                </View>
                <Text style={styles.questionText}>{currentCard.question}</Text>
                <View style={styles.tapHint}>
                  <Ionicons name="finger-print" size={20} color={Colors.glass.white80} />
                  <Text style={styles.tapHintText}>Tap to reveal answer</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Back of Card */}
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              {
                transform: [{ rotateY: backRotation }],
                opacity: backOpacity,
              },
            ]}
          >
            <LinearGradient
              colors={difficultyConfig[currentCard.difficulty].gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Ionicons name="checkmark-circle" size={32} color={Colors.text.white} />
                </View>
                <Text style={styles.answerText}>{currentCard.answer}</Text>
                <View style={styles.tapHint}>
                  <Ionicons name="finger-print" size={20} color={Colors.glass.white80} />
                  <Text style={styles.tapHintText}>Tap to see question</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
          onPress={previousCard}
          disabled={currentIndex === 0}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={currentIndex === 0 ? Colors.glass.white80 : Colors.text.white}
          />
        </TouchableOpacity>

        <View style={styles.actionButtons}>
          <ActionButton icon="close-circle" label="Hard" color={Colors.status.error} />
          <ActionButton icon="remove-circle" label="Medium" color={Colors.status.warning} />
          <ActionButton icon="checkmark-circle" label="Easy" color={Colors.status.success} />
        </View>

        <TouchableOpacity
          style={[
            styles.navButton,
            currentIndex === flashcards.length - 1 && styles.navButtonDisabled,
          ]}
          onPress={nextCard}
          disabled={currentIndex === flashcards.length - 1}
        >
          <Ionicons
            name="chevron-forward"
            size={28}
            color={
              currentIndex === flashcards.length - 1
                ? Colors.glass.white80
                : Colors.text.white
            }
          />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <StatBadge icon="checkmark-circle" value="12" label="Mastered" color={Colors.status.success} />
        <StatBadge icon="time" value="8" label="Learning" color={Colors.status.warning} />
        <StatBadge icon="refresh" value="4" label="Review" color={Colors.status.info} />
      </View>
    </LinearGradient>
  );
}

function ActionButton({
  icon,
  label,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
}) {
  return (
    <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
      <View style={[styles.actionIcon, { backgroundColor: `${color}30` }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.actionLabel, { color: Colors.text.white }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function StatBadge({
  icon,
  value,
  label,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <View style={styles.statBadge}>
      <Ionicons name={icon} size={20} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.glass.white70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.glass.white90,
    marginTop: 2,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.glass.white70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.glass.white70,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.text.white,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.white,
    textAlign: 'center',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTouchable: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backfaceVisibility: 'hidden',
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 20,
    overflow: 'hidden',
  },
  cardFront: {
    // Front-specific styles
  },
  cardBack: {
    // Back-specific styles
  },
  cardGradient: {
    flex: 1,
    padding: 32,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '700',
  },
  questionText: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text.white,
    lineHeight: 38,
    textAlign: 'center',
  },
  answerText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.white,
    lineHeight: 32,
    textAlign: 'center',
  },
  tapHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  tapHintText: {
    fontSize: 14,
    color: Colors.glass.white90,
    fontWeight: '600',
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 16,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.glass.white70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  actionButton: {
    alignItems: 'center',
    gap: 6,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: Colors.glass.white70,
    marginTop: 24,
    marginHorizontal: 24,
    borderRadius: 20,
    marginBottom: 24,
  },
  statBadge: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.white,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.glass.white90,
    fontWeight: '600',
  },
});
