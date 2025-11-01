import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '../../constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
type GradientTuple = readonly [string, string] | readonly [string, string, string];
type IoniconName = keyof typeof Ionicons.glyphMap;

interface NoteCardProps {
  title: string;
  date: string;
  duration: string;
  subject: string;
  status: 'completed' | 'processing' | 'failed';
}

export default function DashboardScreen() {
  const recentNotes: NoteCardProps[] = [
    {
      title: 'Introduction to Machine Learning',
      date: 'Oct 28, 2024',
      duration: '45 min',
      subject: 'Computer Science',
      status: 'completed',
    },
    {
      title: 'Quantum Physics Lecture 5',
      date: 'Oct 27, 2024',
      duration: '60 min',
      subject: 'Physics',
      status: 'completed',
    },
    {
      title: 'English Literature Analysis',
      date: 'Oct 26, 2024',
      duration: '30 min',
      subject: 'Literature',
      status: 'processing',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={Colors.background.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Hello, Student!</Text>
            <Text style={styles.subGreeting}>Ready to learn today?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color={Colors.text.white} />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatCard
            icon="document-text"
            title="Total Notes"
            value="24"
            color={Colors.primary.cyan}
          />
          <TouchableOpacity
            style={styles.statCardWrapper}
            onPress={() => router.push('/flashcards')}
            activeOpacity={0.8}
          >
            <StatCard
              icon="flash"
              title="Flashcards"
              value="156"
              color={Colors.secondary.pink}
            />
          </TouchableOpacity>
          <StatCard
            icon="git-network"
            title="Mind Maps"
            value="12"
            color={Colors.secondary.purple}
          />
          <StatCard
            icon="time"
            title="Hours Saved"
            value="38"
            color={Colors.accent.gold}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <ActionButton
              icon="mic"
              title="Record"
              gradient={[Colors.primary.cyan, Colors.primary.teal] as GradientTuple}
            />
            <ActionButton
              icon="cloud-upload"
              title="Upload"
              gradient={[Colors.secondary.pink, Colors.secondary.darkPink] as GradientTuple}
            />
            <ActionButton
              icon="folder-open"
              title="Library"
              gradient={[Colors.secondary.purple, Colors.secondary.darkPink] as GradientTuple}
            />
            <ActionButton
              icon="chatbubble"
              title="AI Chat"
              gradient={[Colors.accent.gold, Colors.accent.orange] as GradientTuple}
            />
          </View>
        </View>

        {/* Recent Notes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Notes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentNotes.map((note, index) => (
            <NoteCard key={index} {...note} />
          ))}
        </View>

        {/* Study Streak */}
        <View style={[styles.section, { marginBottom: 32 }]}>
          <LinearGradient
            colors={Colors.background.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.streakCard}
          >
            <Ionicons name="flame" size={48} color={Colors.text.white} />
            <View style={styles.streakContent}>
              <Text style={styles.streakNumber}>7 Days</Text>
              <Text style={styles.streakText}>Study Streak</Text>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
  color: string;
}) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIconCircle, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color={Colors.text.white} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

function ActionButton({
  icon,
  title,
  gradient,
}: {
  icon: IoniconName;
  title: string;
  gradient: GradientTuple;
}) {
  return (
    <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.actionGradient}
      >
        <Ionicons name={icon} size={28} color={Colors.text.white} />
      </LinearGradient>
      <Text style={styles.actionTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

function NoteCard({ title, date, duration, subject, status }: NoteCardProps) {
  const statusConfig: Record<NoteCardProps['status'], { color: string; icon: IoniconName; label: string }> = {
    completed: { color: Colors.status.success, icon: 'checkmark-circle', label: 'Ready' },
    processing: { color: Colors.status.warning, icon: 'time', label: 'Processing' },
    failed: { color: Colors.status.error, icon: 'close-circle', label: 'Failed' },
  };

  const config = statusConfig[status];

  return (
    <TouchableOpacity style={styles.noteCard} activeOpacity={0.8}>
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle} numberOfLines={1}>
          {title}
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: `${config.color}20` }]}>
          <Ionicons name={config.icon} size={14} color={config.color} />
          <Text style={[styles.statusText, { color: config.color }]}>{config.label}</Text>
        </View>
      </View>
      <View style={styles.noteDetails}>
        <View style={styles.noteDetail}>
          <Ionicons name="calendar-outline" size={16} color={Colors.text.light} />
          <Text style={styles.noteDetailText}>{date}</Text>
        </View>
        <View style={styles.noteDetail}>
          <Ionicons name="time-outline" size={16} color={Colors.text.light} />
          <Text style={styles.noteDetailText}>{duration}</Text>
        </View>
        <View style={styles.noteDetail}>
          <Ionicons name="book-outline" size={16} color={Colors.text.light} />
          <Text style={styles.noteDetailText}>{subject}</Text>
        </View>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text.white,
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: Colors.glass.white90,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.glass.white70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.status.error,
    borderWidth: 2,
    borderColor: Colors.text.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  statCardWrapper: {
    width: (SCREEN_WIDTH - 60) / 2,
  },
  statCard: {
    width: (SCREEN_WIDTH - 60) / 2,
    backgroundColor: Colors.card.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 13,
    color: Colors.text.light,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.cyan,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    gap: 12,
  },
  actionGradient: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  noteCard: {
    backgroundColor: Colors.card.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  noteTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  noteDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  noteDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  noteDetailText: {
    fontSize: 13,
    color: Colors.text.light,
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderRadius: 20,
    gap: 20,
  },
  streakContent: {
    flex: 1,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text.white,
    marginBottom: 4,
  },
  streakText: {
    fontSize: 16,
    color: Colors.glass.white90,
    fontWeight: '600',
  },
});
