import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

type GradientTuple = readonly [string, string] | readonly [string, string, string];
type IoniconName = keyof typeof Ionicons.glyphMap;

export default function RecordScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState('00:00:00');
  const recordingGradient: GradientTuple = [Colors.status.error, '#C2185B'] as const;

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement actual recording logic
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Record Lecture</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Waveform Visualization Placeholder */}
        <View style={styles.waveformContainer}>
          <LinearGradient
            colors={Colors.background.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.waveformGradient}
          >
            <Ionicons name="pulse" size={80} color={Colors.text.white} />
          </LinearGradient>
        </View>

        {/* Duration */}
        <Text style={styles.duration}>{duration}</Text>

        {/* Record Button */}
        <TouchableOpacity
          style={styles.recordButtonContainer}
          onPress={toggleRecording}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={isRecording ? recordingGradient : Colors.background.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.recordButton}
          >
            <Ionicons
              name={isRecording ? 'stop' : 'mic'}
              size={48}
              color={Colors.text.white}
            />
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.recordText}>
          {isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
        </Text>

        {/* Controls */}
        <View style={styles.controls}>
          <ControlButton icon="pause" label="Pause" />
          <ControlButton icon="save" label="Save" />
          <ControlButton icon="trash" label="Delete" />
        </View>

        {/* Recording Tips */}
        <View style={styles.tipsCard}>
          <Ionicons name="bulb" size={24} color={Colors.accent.gold} />
          <View style={styles.tipsContent}>
            <Text style={styles.tipsTitle}>Recording Tips</Text>
            <Text style={styles.tipsText}>
              • Keep your device close to the speaker{'\n'}
              • Minimize background noise{'\n'}
              • Ensure good internet connection
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function ControlButton({ icon, label }: { icon: IoniconName; label: string }) {
  return (
    <TouchableOpacity style={styles.controlButton} activeOpacity={0.8}>
      <View style={styles.controlIcon}>
        <Ionicons name={icon} size={24} color={Colors.primary.cyan} />
      </View>
      <Text style={styles.controlLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.card.lightGray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: Colors.card.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.card.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  waveformContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  waveformGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  duration: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 32,
    fontVariant: ['tabular-nums'],
  },
  recordButtonContainer: {
    marginBottom: 16,
  },
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary.cyan,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  recordText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginBottom: 48,
  },
  controls: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 48,
  },
  controlButton: {
    alignItems: 'center',
    gap: 8,
  },
  controlIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.card.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.card.border,
  },
  controlLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  tipsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card.white,
    borderRadius: 16,
    padding: 20,
    gap: 16,
    alignSelf: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipsContent: {
    flex: 1,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});
