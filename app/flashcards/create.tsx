import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Colors } from '../../constants/Colors';

type Flashcard = {
  id: string;
  question: string;
  answer: string;
};

type GradientTuple = readonly [string, string] | readonly [string, string, string];

export default function CreateFlashcardsScreen() {
  const router = useRouter();
  const [deckName, setDeckName] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState<Flashcard[]>([
    { id: '1', question: '', answer: '' },
  ]);

  const handleCardChange = (id: string, key: 'question' | 'answer', value: string) => {
    setCards((prev) => prev.map((card) => (card.id === id ? { ...card, [key]: value } : card)));
  };

  const handleAddCard = () => {
    const nextId = (cards.length + 1).toString();
    setCards((prev) => [...prev, { id: nextId, question: '', answer: '' }]);
  };

  const handleRemoveCard = (id: string) => {
    setCards((prev) => (prev.length === 1 ? prev : prev.filter((card) => card.id !== id)));
  };

  const handleSaveDeck = () => {
    if (!deckName.trim()) {
      Alert.alert('Missing deck name', 'Please provide a name for your flashcard deck.');
      return;
    }

    if (cards.some((card) => !card.question.trim() || !card.answer.trim())) {
      Alert.alert('Incomplete cards', 'Every flashcard needs both a question and an answer.');
      return;
    }

    Alert.alert('Deck saved', `${deckName} is ready for study!`, [
      {
        text: 'View library',
        onPress: () => router.push('/(tabs)/library'),
      },
      { text: 'Add another deck', style: 'cancel' },
    ]);

    setDeckName('');
    setSubject('');
    setDescription('');
    setCards([{ id: '1', question: '', answer: '' }]);
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={Colors.background.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.white} />
        </TouchableOpacity>
        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>Create flashcards</Text>
          <Text style={styles.headerSubtitle}>Organise a deck tailor-made for your skill goals</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deck details</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Deck name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Neural networks fundamentals"
              placeholderTextColor={Colors.text.placeholder}
              value={deckName}
              onChangeText={setDeckName}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Subject or course</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Computer Science"
              placeholderTextColor={Colors.text.placeholder}
              value={subject}
              onChangeText={setSubject}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="What knowledge should these cards reinforce?"
              placeholderTextColor={Colors.text.placeholder}
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Flashcards</Text>
            <TouchableOpacity onPress={handleAddCard} activeOpacity={0.85} style={styles.addCardButton}>
              <Ionicons name="add" size={20} color={Colors.text.white} />
              <Text style={styles.addCardText}>Add card</Text>
            </TouchableOpacity>
          </View>

          {cards.map((card, index) => (
            <View key={card.id} style={styles.cardContainer}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Card {index + 1}</Text>
                <TouchableOpacity onPress={() => handleRemoveCard(card.id)} disabled={cards.length === 1}>
                  <Ionicons
                    name="trash"
                    size={18}
                    color={cards.length === 1 ? Colors.text.light : Colors.status.error}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.inputLabel}>Prompt</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="What is the main idea or question?"
                placeholderTextColor={Colors.text.placeholder}
                value={card.question}
                onChangeText={(value) => handleCardChange(card.id, 'question', value)}
                multiline
              />
              <Text style={styles.inputLabel}>Answer</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Provide a concise explanation or answer"
                placeholderTextColor={Colors.text.placeholder}
                value={card.answer}
                onChangeText={(value) => handleCardChange(card.id, 'answer', value)}
                multiline
              />
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} activeOpacity={0.9} onPress={handleSaveDeck}>
          <LinearGradient
            colors={[Colors.primary.cyan, Colors.primary.teal] as GradientTuple}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveGradient}
          >
            <Ionicons name="sparkles" size={20} color={Colors.text.white} />
            <Text style={styles.saveText}>Save deck</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.card.lightGray,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 24,
    paddingBottom: 28,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerCopy: {
    flex: 1,
    gap: 6,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.glass.white90,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 28,
    paddingHorizontal: 24,
    gap: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  input: {
    borderRadius: 16,
    backgroundColor: Colors.card.white,
    borderWidth: 1,
    borderColor: Colors.card.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.text.primary,
  },
  multilineInput: {
    minHeight: 84,
    textAlignVertical: 'top',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: Colors.primary.cyan,
  },
  addCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.white,
  },
  cardContainer: {
    backgroundColor: Colors.card.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.card.border,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  saveButton: {
    marginHorizontal: 24,
    marginTop: 12,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.primary.cyan,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.white,
  },
});
