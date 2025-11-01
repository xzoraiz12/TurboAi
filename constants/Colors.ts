export const Colors = {
  primary: {
    cyan: '#00BCD4',
    lightCyan: '#4DD0E1',
    darkCyan: '#0097A7',
    teal: '#009688',
  },
  secondary: {
    pink: '#E91E63',
    lightPink: '#F48FB1',
    darkPink: '#C2185B',
    purple: '#9C27B0',
  },
  accent: {
    gold: '#FFD700',
    orange: '#FF9800',
    amber: '#FFC107',
  },
  background: {
    gradient: ['#00BCD4', '#E91E63'] as const, // Cyan to Pink
    lightGradient: ['#4DD0E1', '#F48FB1'] as const, // Light Cyan to Light Pink
    cardGradient: ['#00BCD4', '#9C27B0', '#E91E63'] as const, // Cyan to Purple to Pink
    goldGradient: ['#FFD700', '#FF9800'] as const, // Gold to Orange
  },
  blur: {
    cyan: 'rgba(0, 188, 212, 0.3)',
    pink: 'rgba(233, 30, 99, 0.3)',
    purple: 'rgba(156, 39, 176, 0.3)',
    yellow: 'rgba(255, 215, 0, 0.3)',
  },
  text: {
    primary: '#0D171C',
    secondary: '#4A5568',
    light: '#718096',
    white: '#FFFFFF',
    placeholder: '#A0AEC0',
  },
  card: {
    white: '#FFFFFF',
    lightGray: '#F7FAFC',
    border: '#E2E8F0',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  glass: {
    white70: 'rgba(255, 255, 255, 0.7)',
    white80: 'rgba(255, 255, 255, 0.8)',
    white90: 'rgba(255, 255, 255, 0.9)',
    black30: 'rgba(0, 0, 0, 0.3)',
    black50: 'rgba(0, 0, 0, 0.5)',
  },
};
