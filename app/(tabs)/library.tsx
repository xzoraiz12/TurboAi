import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

type IoniconName = keyof typeof Ionicons.glyphMap;
type GradientTuple = readonly [string, string] | readonly [string, string, string];

type LibraryType = 'note' | 'flashcard' | 'mindmap';

interface LibraryItem {
  id: string;
  title: string;
  subject: string;
  date: string;
  type: LibraryType;
}

const filters: ReadonlyArray<{ key: LibraryType | 'all'; label: string; icon: IoniconName }> = [
  { key: 'all', label: 'All', icon: 'grid' },
  { key: 'note', label: 'Notes', icon: 'document-text' },
  { key: 'flashcard', label: 'Flashcards', icon: 'flash' },
  { key: 'mindmap', label: 'Mind Maps', icon: 'git-network' },
];

const libraryItems: LibraryItem[] = [
  { id: '1', title: 'Machine Learning Basics', subject: 'Computer Science', date: 'Oct 28', type: 'note' },
  { id: '2', title: 'Physics Formula Deck', subject: 'Physics', date: 'Oct 27', type: 'flashcard' },
  { id: '3', title: 'Biology Concepts Map', subject: 'Biology', date: 'Oct 26', type: 'mindmap' },
  { id: '4', title: 'Calculus Notes', subject: 'Mathematics', date: 'Oct 25', type: 'note' },
  { id: '5', title: 'Global History Timeline', subject: 'History', date: 'Oct 24', type: 'mindmap' },
  { id: '6', title: 'Spanish Verb Deck', subject: 'Languages', date: 'Oct 22', type: 'flashcard' },
];

export default function LibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<LibraryType | 'all'>('all');

  const { width } = Dimensions.get('window');
  const isCompact = width < 420;
  const router = useRouter();

  const typeCounts = useMemo(() => {
    return libraryItems.reduce(
      (acc, item) => {
        acc[item.type] += 1;
        return acc;
      },
      { note: 0, flashcard: 0, mindmap: 0 } as Record<LibraryType, number>
    );
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return libraryItems.filter((item) => {
      const matchesType = selectedFilter === 'all' || item.type === selectedFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.subject.toLowerCase().includes(normalizedQuery);
      return matchesType && matchesQuery;
    });
  }, [searchQuery, selectedFilter]);

  const collectionCards = useMemo(
    () => [
      {
        key: 'note',
        label: 'Notes',
        count: typeCounts.note,
        icon: 'document-text' as IoniconName,
        gradient: [Colors.primary.cyan, Colors.primary.teal] as GradientTuple,
      },
      {
        key: 'flashcard',
        label: 'Flashcards decks',
        count: typeCounts.flashcard,
        icon: 'flash' as IoniconName,
        gradient: [Colors.secondary.pink, Colors.secondary.darkPink] as GradientTuple,
      },
      {
        key: 'mindmap',
        label: 'Mind maps',
        count: typeCounts.mindmap,
        icon: 'git-network' as IoniconName,
        gradient: [Colors.secondary.purple, Colors.secondary.darkPink] as GradientTuple,
      },
      {
        key: 'recent',
        label: 'Recent additions',
        count: libraryItems.length,
        icon: 'time' as IoniconName,
        gradient: [Colors.accent.gold, Colors.accent.orange] as GradientTuple,
      },
    ],
    [typeCounts]
  );
  const quickActions = useMemo(
    () => [
      {
        icon: 'document-text' as IoniconName,
        title: 'New note',
        description: 'Capture fresh lecture insights in seconds.',
        accent: Colors.primary.cyan,
        onPress: () => router.push('/(tabs)/record'),
      },
      {
        icon: 'flash' as IoniconName,
        title: 'Create flashcards',
        description: 'Turn concepts into study decks instantly.',
        accent: Colors.secondary.pink,
        onPress: () => router.push('/flashcards/create'),
      },
      {
        icon: 'git-network' as IoniconName,
        title: 'Build mind map',
        description: 'Filter to your saved mind maps.',
        accent: Colors.secondary.purple,
        onPress: () => {
          setSelectedFilter('mindmap');
          setSearchQuery('');
        },
      },
      {
        icon: 'share-social' as IoniconName,
        title: 'Share bundle',
        description: 'Send notes and decks to your study group.',
        accent: Colors.accent.orange,
        onPress: () => Alert.alert('Share bundles', 'Sharing is coming soon.'),
      },
    ],
    [router, setSelectedFilter, setSearchQuery]
  );
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={Colors.background.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Library workspace</Text>
            <Text style={styles.headerSubtitle}>Browse notes, decks, and mind maps</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.syncButton}>
            <Ionicons name="cloud-download" size={18} color={Colors.text.white} />
            <Text style={styles.syncButtonText}>Sync</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchCard}>
          <Ionicons name="search" size={20} color={Colors.text.light} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search notes, flashcards, mind maps..."
            placeholderTextColor={Colors.text.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearch}>
              <Ionicons name="close" size={18} color={Colors.text.light} />
            </TouchableOpacity>
          )}
        </View>

        {/* Collections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Collections overview</Text>
          <View style={styles.collectionGrid}>
            {collectionCards.map(({ key: collectionKey, ...card }) => (
              <CollectionCard key={collectionKey} {...card} isCompact={isCompact} />
            ))}
          </View>
        </View>

        {/* Quick actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <QuickActionCard key={action.title} {...action} isCompact={isCompact} />
            ))}
          </View>
        </View>

        {/* Filters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filter by type</Text>
          <View style={styles.filterWrap}>
            {filters.map((filter) => {
              const active = selectedFilter === filter.key;
              return (
                <TouchableOpacity
                  key={filter.key}
                  style={[styles.filterChip, active && styles.filterChipActive]}
                  onPress={() => setSelectedFilter(filter.key)}
                  activeOpacity={0.85}
                >
                  <Ionicons
                    name={filter.icon}
                    size={16}
                    color={active ? Colors.text.white : Colors.text.secondary}
                  />
                  <Text style={[styles.filterText, active && styles.filterTextActive]}>{filter.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Library items */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Library items</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.link}>View all</Text>
            </TouchableOpacity>
          </View>

          {filteredItems.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="sparkles" size={32} color={Colors.primary.cyan} />
              <Text style={styles.emptyTitle}>Nothing to show yet</Text>
              <Text style={styles.emptySubtitle}>
                Try switching filters or start by creating a new flashcard deck.
              </Text>
            </View>
          ) : (
            <View style={styles.itemGrid}>
              {filteredItems.map((item) => (
                <LibraryItemCard key={item.id} item={item} isCompact={isCompact} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function CollectionCard({
  icon,
  label,
  count,
  gradient,
  isCompact,
}: {
  icon: IoniconName;
  label: string;
  count: number;
  gradient: GradientTuple;
  isCompact: boolean;
}) {
  return (
    <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.collectionCard, isCompact && styles.collectionCardCompact]}>
      <Ionicons name={icon} size={24} color={Colors.text.white} />
      <Text style={styles.collectionCount}>{count}</Text>
      <Text style={styles.collectionLabel}>{label}</Text>
    </LinearGradient>
  );
}

function QuickActionCard({ icon, title, description, accent, isCompact, onPress }: { icon: IoniconName; title: string; description: string; accent: string; isCompact: boolean; onPress: () => void; }) {
  return (
    <TouchableOpacity
      style={[styles.quickActionCard, isCompact && styles.quickActionCardCompact]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: `${accent}1A` }]}> 
        <Ionicons name={icon} size={20} color={accent} />
      </View>
      <View style={styles.quickActionCopy}>
        <Text style={styles.quickActionTitle}>{title}</Text>
        <Text style={styles.quickActionDescription}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={Colors.text.light} />
    </TouchableOpacity>
  );
}

function LibraryItemCard({ item, isCompact }: { item: LibraryItem; isCompact: boolean }) {
  const typeConfig: Record<LibraryType, { icon: IoniconName; color: string }> = {
    note: { icon: 'document-text', color: Colors.primary.cyan },
    flashcard: { icon: 'flash', color: Colors.secondary.pink },
    mindmap: { icon: 'git-network', color: Colors.secondary.purple },
  };

  const config = typeConfig[item.type];

  return (
    <TouchableOpacity style={[styles.itemCard, isCompact ? styles.itemCardCompact : styles.itemCardWide]} activeOpacity={0.85}>
      <View style={[styles.itemIcon, { backgroundColor: `${config.color}1A` }]}>{/* 10% opacity */}
        <Ionicons name={config.icon} size={26} color={config.color} />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.itemMeta}>
          <View style={styles.itemMetaItem}>
            <Ionicons name="book" size={14} color={Colors.text.light} />
            <Text style={styles.itemMetaText}>{item.subject}</Text>
          </View>
          <View style={styles.itemMetaItem}>
            <Ionicons name="time" size={14} color={Colors.text.light} />
            <Text style={styles.itemMetaText}>{item.date}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="ellipsis-horizontal" size={18} color={Colors.text.light} style={styles.itemMenu} />
    </TouchableOpacity>
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
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.glass.white90,
    marginTop: 6,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  syncButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.white,
  },
  content: {
    flex: 1,
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: -32,
    marginBottom: 20,
    paddingHorizontal: 18,
    backgroundColor: Colors.card.white,
    borderRadius: 20,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.card.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  clearSearch: {
    padding: 4,
  },
  section: {
    marginBottom: 28,
    paddingHorizontal: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.cyan,
  },
  collectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  collectionCard: {
    flexBasis: '48%',
    minHeight: 120,
    borderRadius: 18,
    padding: 16,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  collectionCardCompact: {
    flexBasis: '100%',
  },
  collectionCount: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text.white,
  },
  collectionLabel: {
    fontSize: 14,
    color: Colors.glass.white90,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    flexBasis: '48%',
    backgroundColor: Colors.card.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.card.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  quickActionCardCompact: {
    flexBasis: '100%',
  },
  quickActionIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionCopy: {
    flex: 1,
    gap: 4,
  },
  quickActionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  quickActionDescription: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  filterWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: Colors.card.white,
    borderWidth: 1,
    borderColor: Colors.card.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary.cyan,
    borderColor: Colors.primary.cyan,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.secondary,
    textTransform: 'capitalize',
  },
  filterTextActive: {
    color: Colors.text.white,
  },
  itemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  itemCard: {
    backgroundColor: Colors.card.white,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.card.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  itemCardWide: {
    flexBasis: '48%',
  },
  itemCardCompact: {
    flexBasis: '100%',
  },
  itemIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContent: {
    flex: 1,
    gap: 6,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  itemMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  itemMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  itemMetaText: {
    fontSize: 12,
    color: Colors.text.light,
  },
  itemMenu: {
    paddingLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 12,
    backgroundColor: Colors.card.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.card.border,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 18,
  },
});


