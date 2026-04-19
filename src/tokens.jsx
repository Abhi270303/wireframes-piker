// tokens.jsx — Piker design tokens (Rookie + Pro worlds)

const FONT_DISPLAY = "'Geist', -apple-system, system-ui, sans-serif";
const FONT_MONO    = "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const ROOKIE = {
  mode: 'rookie',
  label: 'ROOKIE MODE',
  bg:          '#0D0D12',
  bgDeep:      '#08080C',
  surface:     '#16161F',
  surfaceAlt:  '#1C1C28',
  surfaceElev: '#1E1E2C',
  border:      '#2A2A3A',
  borderStrong:'#3A3A50',
  text:        '#F0F0F5',
  textSec:     '#9090B8',
  textMut:     '#606085',
  textDim:     '#505070',
  accent:      '#B8B8E0',
  accentDeep:  '#8080B8',
  accentFaint: '#B8B8E018',
  accentGlow:  '#B8B8E030',
  pillBg:      '#B8B8E020',
  pillBorder:  '#8080B8',
  pos:         '#4ADE80',
  neg:         '#F87171',
  chartTint:   '#B8B8E0',
  watermarkColor: '#B8B8E018',
  watermarkText: 'ROOKIE',
  icon: '◈',
};

const PRO = {
  mode: 'pro',
  label: 'PRO MODE',
  bg:          '#0A0A0D',
  bgDeep:      '#050507',
  surface:     '#141418',
  surfaceAlt:  '#1A1A1F',
  surfaceElev: '#1E1E24',
  border:      '#2A2A20',
  borderStrong:'#3A3A30',
  text:        '#F5F5F0',
  textSec:     '#A09878',
  textMut:     '#807060',
  textDim:     '#605848',
  accent:      '#E8C858',
  accentDeep:  '#C8A840',
  accentFaint: '#E8C85815',
  accentGlow:  '#E8C85830',
  pillBg:      '#E8C85822',
  pillBorder:  '#C8A840',
  pos:         '#4ADE80',
  neg:         '#F87171',
  chartTint:   '#E8C858',
  watermarkColor: '#E8C85818',
  watermarkText: 'PRO',
  icon: '◆',
};

const THEMES = { rookie: ROOKIE, pro: PRO };

Object.assign(window, { FONT_DISPLAY, FONT_MONO, ROOKIE, PRO, THEMES });
