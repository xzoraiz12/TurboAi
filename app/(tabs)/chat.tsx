import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const quickActions: ReadonlyArray<{ icon: keyof typeof Ionicons.glyphMap; text: string }> = [
  { icon: 'bulb', text: 'Explain concept' },
  { icon: 'create', text: 'Summarize' },
  { icon: 'checkmark-circle', text: 'Quiz me' },
  { icon: 'refresh', text: 'Rephrase' },
  { icon: 'flash', text: 'Skill drill' },
  { icon: 'book', text: 'Cite sources' },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI study assistant. How can I help you today?',
      isUser: false,
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      text: 'Can you explain quantum entanglement?',
      isUser: true,
      timestamp: '10:31 AM',
    },
    {
      id: '3',
      text: 'Of course! Quantum entanglement is a physical phenomenon that occurs when pairs or groups of particles interact in ways such that the quantum state of each particle cannot be described independently...',
      isUser: false,
      timestamp: '10:31 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      // TODO: Implement AI response
    }
  };

  return (
    <LinearGradient
      colors={Colors.background.lightGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header */}
        <LinearGradient
          colors={Colors.background.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.aiAvatar}>
              <Ionicons name="sparkles" size={24} color={Colors.text.white} />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>AI Tutor</Text>
              <Text style={styles.headerStatus}>Online</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color={Colors.text.white} />
          </TouchableOpacity>
        </LinearGradient>

        {/* Messages */}
        <View style={styles.messagesWrapper}>
          <ScrollView
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.quickActionsTitle}>Smart prompts</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map(action => (
              <QuickActionButton key={action.text} {...action} />
            ))}
          </View>
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="attach" size={24} color={Colors.text.light} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Ask me anything..."
            placeholderTextColor={Colors.text.placeholder}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, inputText.trim() && styles.sendButtonActive]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={inputText.trim() ? Colors.text.white : Colors.text.light}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

function MessageBubble({ message }: { message: Message }) {
  return (
    <View style={[styles.messageBubble, message.isUser && styles.userMessage]}>
      {!message.isUser && (
        <View style={styles.aiAvatarSmall}>
          <Ionicons name="sparkles" size={16} color={Colors.text.white} />
        </View>
      )}
      <View style={styles.messageContent}>
        <View
          style={[
            styles.bubble,
            message.isUser ? styles.userBubble : styles.aiBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              message.isUser && styles.userMessageText,
            ]}
          >
            {message.text}
          </Text>
        </View>
        <Text style={[styles.timestamp, message.isUser && styles.userTimestamp]}>
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
}

function QuickActionButton({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  return (
    <TouchableOpacity style={styles.quickActionButton} activeOpacity={0.85}>
      <Ionicons name={icon} size={20} color={Colors.primary.cyan} />
      <Text style={styles.quickActionText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aiAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.glass.white70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    gap: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.white,
  },
  headerStatus: {
    fontSize: 14,
    color: Colors.glass.white90,
  },
  messagesWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  messagesContainer: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.85)',
    overflow: 'hidden',
  },
  messagesContent: {
    padding: 24,
    gap: 16,
  },
  messageBubble: {
    flexDirection: 'row',
    gap: 12,
  },
  userMessage: {
    flexDirection: 'row-reverse',
  },
  aiAvatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  messageContent: {
    flex: 1,
    gap: 6,
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    maxWidth: '85%',
  },
  aiBubble: {
    backgroundColor: Colors.card.white,
    borderTopLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: Colors.primary.cyan,
    borderTopRightRadius: 4,
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 15,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  userMessageText: {
    color: Colors.text.white,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.text.light,
    marginLeft: 12,
  },
  userTimestamp: {
    textAlign: 'right',
    marginRight: 12,
    marginLeft: 0,
  },
  quickActionsSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderTopWidth: 1,
    borderTopColor: Colors.card.border,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flexBasis: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: Colors.card.white,
    borderWidth: 1,
    borderColor: Colors.card.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.card.white,
    borderTopWidth: 1,
    borderTopColor: Colors.card.border,
    gap: 12,
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    fontSize: 16,
    color: Colors.text.primary,
    paddingVertical: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: Colors.primary.cyan,
  },
});
