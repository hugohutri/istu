export type HighlightType = {
  color: string;
  scale?: number;
  opacity?: number;
  tooltip?: string;
  animateIn?: boolean;
};

export const Highlight: { [key: string]: HighlightType } = {
  FRIENDS: {
    color: '#FFD700',
    opacity: 0.8,
    animateIn: true,
  },
  COMPANION: {
    color: '#FF8800',
    opacity: 0.8,
    animateIn: true,
  },
  SELF: {
    color: '#AA33DD',
    opacity: 0.9,
    animateIn: true,
  },
  HAS_GUEST: {
    color: '#22AA22', //'#2222AA',
    opacity: 0.3,
  },
  HAS_GUEST_MUTED: {
    color: '#555',
    opacity: 0.3,
  },
  HOWER_WITH_JESSE: {
    color: '#22AA22',
    opacity: 0.5,
  },
  HOWER: {
    color: '#555',
    opacity: 0.3,
  },
  NONE: {
    color: 'white',
    opacity: 0.3,
  },
} as const;
