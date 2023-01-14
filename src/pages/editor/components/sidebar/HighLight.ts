export type HighlightType = {
  color: string;
  scale?: number;
  opacity?: number;
  tooltip?: string;
  animateIn?: boolean;
  displayName?: string;
};

export const Highlight: { [key: string]: HighlightType } = {
  FRIENDS: {
    displayName: 'Friends',
    color: '#FFD700',
    opacity: 0.8,
    animateIn: true,
  },
  COMPANION: {
    displayName: 'Companion',
    color: '#FF8800',
    opacity: 0.8,
    animateIn: true,
  },
  SELF: {
    displayName: 'Current guest',
    color: '#AA33DD',
    opacity: 0.9,
    animateIn: true,
  },
  HAS_GUEST: {
    displayName: 'Seat taken',
    color: '#22AA22', //'#2222AA',
    opacity: 0.3,
  },
  HAS_GUEST_MUTED: {
    color: '#555',
    opacity: 0.3,
  },
  HOVER_WITH_JESSE: {
    color: '#22AA22',
    opacity: 0.5,
  },
  HOVER: {
    color: '#555',
    opacity: 0.3,
  },
  NONE: {
    color: 'white',
    opacity: 0.3,
  },
} as const;
