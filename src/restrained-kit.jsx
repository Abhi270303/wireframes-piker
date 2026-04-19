// restrained-kit.jsx — Onboarding-language primitives for app screens.
// Hairline borders. One accent. Generous whitespace. Big typography.
// Match the bar set by the onboarding swipe cards exactly.

// ─── Kicker (small mono uppercase, accent) ───────────────────
function Kicker({ theme, children, color, style = {} }) {
  return (
    <div style={{
      fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600,
      color: color || theme.accent, letterSpacing: 2.5,
      textTransform: 'uppercase', ...style,
    }}>{children}</div>
  );
}

// ─── Micro (the tiny mono caption used everywhere) ──────────
function Micro({ theme, children, color, style = {} }) {
  return (
    <div style={{
      fontFamily: FONT_MONO, fontSize: 9.5, color: color || theme.textMut,
      letterSpacing: 3, textTransform: 'uppercase', ...style,
    }}>{children}</div>
  );
}

// ─── Headline (the 30/500/-0.8 onboarding headline) ─────────
function Headline({ theme, children, size = 30, style = {} }) {
  return (
    <div style={{
      fontFamily: FONT_DISPLAY, fontSize: size, fontWeight: 500,
      color: theme.text, letterSpacing: -0.8, lineHeight: 1.1,
      textWrap: 'balance', ...style,
    }}>{children}</div>
  );
}

// ─── Body (the 14/textSec/lineHeight 1.5 onboarding sub) ────
function Body({ theme, children, style = {} }) {
  return (
    <div style={{
      fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.textSec,
      lineHeight: 1.5, textWrap: 'pretty', ...style,
    }}>{children}</div>
  );
}

// ─── Big numeric monogram (like $100 from S1a) ──────────────
// Renders: prefix (small) + number (huge thin) + suffix (small mono accent)
function BigNum({ theme, prefix, number, suffix, color, prefixColor, suffixColor, size = 120, style = {} }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'flex-start', ...style }}>
      {prefix !== undefined && prefix !== null && (
        <span style={{
          fontFamily: FONT_DISPLAY, fontSize: Math.round(size * 0.18),
          fontWeight: 500, color: prefixColor || theme.textSec,
          marginTop: Math.round(size * 0.10),
          letterSpacing: -0.5, lineHeight: 1,
        }}>{prefix}</span>
      )}
      <span style={{
        fontFamily: FONT_DISPLAY, fontSize: size, fontWeight: 300,
        color: color || theme.text,
        letterSpacing: -size * 0.055, lineHeight: 0.9,
        fontFeatureSettings: '"tnum"',
      }}>{number}</span>
      {suffix !== undefined && suffix !== null && (
        <span style={{
          fontFamily: FONT_MONO, fontSize: Math.round(size * 0.07),
          color: suffixColor || theme.accent, letterSpacing: 1.5,
          marginTop: Math.round(size * 0.085), marginLeft: 6,
        }}>{suffix}</span>
      )}
    </div>
  );
}

// ─── Status pill (the "RESETS 23:59 UTC" pill from S1a) ─────
function StatusPill({ theme, dot = true, dotColor, color, children, style = {} }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '5px 12px',
      border: `1px solid ${theme.border}`, borderRadius: 999,
      fontFamily: FONT_MONO, fontSize: 10, color: color || theme.textSec,
      letterSpacing: 1, ...style,
    }}>
      {dot && <span style={{
        width: 5, height: 5, borderRadius: 3,
        background: dotColor || theme.accent,
      }}/>}
      {children}
    </div>
  );
}

// ─── Hairline list (border-top + border-bottom rows) ────────
// Used for leaderboard, trades, notifications, options. Same row style
// as the auth options on the sign-up screen and the leaderboard ladder.
function HairlineList({ theme, children, style = {} }) {
  const items = React.Children.toArray(children);
  return (
    <div style={style}>
      {items.map((child, i) => (
        <div key={i} style={{
          borderTop: i === 0 ? `1px solid ${theme.border}` : 'none',
          borderBottom: `1px solid ${theme.border}`,
        }}>{child}</div>
      ))}
    </div>
  );
}

function HairlineRow({ theme, onClick, padding = '14px 4px', accent = false, children, style = {} }) {
  return (
    <div onClick={onClick} style={{
      position: 'relative',
      display: 'flex', alignItems: 'center',
      padding,
      background: accent ? theme.accent + '08' : 'transparent',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>
      {accent && (
        <span style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 2, background: theme.accent,
        }}/>
      )}
      {children}
    </div>
  );
}

// ─── Primary CTA (the white-on-bg pill from onboarding) ─────
function PrimaryCTA({ theme, children, onClick, disabled, arrow = true, style = {} }) {
  return (
    <div onClick={disabled ? undefined : onClick} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 18px',
      background: disabled ? 'transparent' : theme.text,
      color: disabled ? theme.textMut : theme.bg,
      border: disabled ? `1px solid ${theme.border}` : 'none',
      borderRadius: 10, cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 600, letterSpacing: 0.2,
      transition: 'background 200ms, color 200ms',
      ...style,
    }}>
      <span>{children}</span>
      {arrow && <span style={{ fontFamily: FONT_MONO, fontSize: 16 }}>→</span>}
    </div>
  );
}

// ─── Outline CTA (hairline, secondary action) ───────────────
function OutlineCTA({ theme, children, onClick, color, arrow = false, style = {} }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 16px',
      background: 'transparent', color: color || theme.text,
      border: `1px solid ${theme.border}`,
      borderRadius: 10, cursor: 'pointer',
      fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 500, letterSpacing: 0.2,
      ...style,
    }}>
      <span>{children}</span>
      {arrow && <span style={{ fontFamily: FONT_MONO, fontSize: 15, color: color || theme.textMut }}>→</span>}
    </div>
  );
}

// ─── Accent CTA (long/short coloured action) ────────────────
function AccentCTA({ theme, children, onClick, tone = 'accent', style = {} }) {
  // tone: 'accent', 'long', 'short'
  const tones = {
    accent: { bg: theme.accent + '12', border: theme.accentDeep, color: theme.accent },
    long:   { bg: '#4ADE8012', border: '#4ADE80',  color: '#4ADE80' },
    short:  { bg: '#F8717112', border: '#F87171',  color: '#F87171' },
  };
  const t = tones[tone] || tones.accent;
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 18px',
      background: t.bg, color: t.color, border: `1px solid ${t.border}`,
      borderRadius: 10, cursor: 'pointer',
      fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 600, letterSpacing: 0.4,
      textTransform: 'uppercase',
      ...style,
    }}>
      <span>{children}</span>
      <span style={{ fontFamily: FONT_MONO, fontSize: 14 }}>→</span>
    </div>
  );
}

// ─── Restrained card (hairline, sometimes accent ring) ──────
function RCard({ theme, children, accent = false, padding = 18, style = {} }) {
  return (
    <div style={{
      background: accent ? theme.accent + '08' : 'transparent',
      border: `1px solid ${accent ? theme.accentDeep : theme.border}`,
      borderRadius: 14, padding,
      ...style,
    }}>{children}</div>
  );
}

// ─── Monogram square (the etched P from sign-up) ────────────
function Monogram({ theme, letter = 'P', size = 56, accent = true }) {
  const inset = Math.round(size * 0.085);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <rect x="2" y="2" width={size - 4} height={size - 4}
          fill="none" stroke={theme.border} strokeWidth="0.5"/>
        <rect x={inset} y={inset} width={size - inset * 2} height={size - inset * 2}
          fill="none" stroke={accent ? theme.accent : theme.borderStrong} strokeWidth="0.8"/>
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT_DISPLAY, fontSize: Math.round(size * 0.5),
        fontWeight: 500, color: theme.text, letterSpacing: -1,
      }}>{letter}</div>
    </div>
  );
}

// ─── Streak strip (the same hairline progress dots logic) ───
// values: array of -1 | 0 | 1
function StreakStrip({ theme, values, height = 3 }) {
  return (
    <div style={{ display: 'flex', gap: 4, width: '100%' }}>
      {values.map((v, i) => (
        <div key={i} style={{
          flex: 1, height, borderRadius: height / 2,
          background: v === 1 ? theme.accent : v === -1 ? '#F87171' : theme.border,
          opacity: v === 0 ? 0.5 : 1,
        }}/>
      ))}
    </div>
  );
}

// ─── Restrained pill (the small chip used on top bars) ──────
function RPill({ theme, children, color, style = {} }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999,
      border: `1px solid ${theme.border}`,
      fontFamily: FONT_MONO, fontSize: 10, fontWeight: 500,
      color: color || theme.textSec, letterSpacing: 1.2,
      textTransform: 'uppercase', ...style,
    }}>{children}</span>
  );
}

// ─── Stat pair (number above, micro label below) ────────────
// Inline atomic stat unit. Used in grids on summary, profile, dashboard.
function StatPair({ theme, value, label, color, valueSize = 22, mono = true, style = {} }) {
  return (
    <div style={style}>
      <div style={{
        fontFamily: mono ? FONT_MONO : FONT_DISPLAY, fontSize: valueSize,
        fontWeight: 500, color: color || theme.text,
        letterSpacing: -0.5, lineHeight: 1,
        fontFeatureSettings: '"tnum"',
      }}>{value}</div>
      <div style={{
        fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
        letterSpacing: 1.5, marginTop: 6, textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  );
}

// ─── Inline label/value row with a hairline divider rhythm ──
function MetaRow({ theme, label, value, valueColor, last = false }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '12px 0',
      borderBottom: last ? 'none' : `1px solid ${theme.border}`,
    }}>
      <span style={{
        fontFamily: FONT_DISPLAY, fontSize: 13, color: theme.textSec, letterSpacing: -0.1,
      }}>{label}</span>
      <span style={{
        fontFamily: FONT_MONO, fontSize: 12.5,
        color: valueColor || theme.text, fontWeight: 500,
        fontFeatureSettings: '"tnum"',
      }}>{value}</span>
    </div>
  );
}

// ─── Section header (Kicker label, optional right) ──────────
function SectionHead({ theme, label, right, style = {} }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      marginBottom: 14, ...style,
    }}>
      <Micro theme={theme}>{label}</Micro>
      {right}
    </div>
  );
}

// ─── App-screen frame: bg + atmospheric grid + status bar ───
// Replaces the heavy Screen wrapper for restrained app screens.
function RScreen({ theme, navActive, onNavChange, withBG = true, children, padBottom = 96 }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: theme.bg, color: theme.text,
      position: 'relative', overflow: 'hidden',
    }}>
      {withBG && <OnboardBG theme={theme}/>}
      <StatusBar theme={theme}/>
      <div style={{
        position: 'absolute', inset: 0, overflow: 'auto',
        paddingBottom: navActive ? padBottom : 0,
      }}>
        {children}
      </div>
      {navActive && <RBottomNav theme={theme} active={navActive} onChange={onNavChange}/>}
    </div>
  );
}

// ─── Restrained top bar (mode pill + minimal right slot) ────
function RTopBar({ theme, onModeClick, right, padTop = 56, padX = 24 }) {
  return (
    <div style={{
      padding: `${padTop}px ${padX}px 16px`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'relative', zIndex: 2,
    }}>
      <RModePill theme={theme} onClick={onModeClick}/>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{right}</div>
    </div>
  );
}

// Restrained mode pill — same shape as the kicker word in onboarding
function RModePill({ theme, onClick, small = false }) {
  return (
    <div onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 7,
      padding: small ? '3px 9px' : '4px 11px',
      border: `1px solid ${theme.accentDeep}`, borderRadius: 999,
      background: theme.accent + '10',
      fontFamily: FONT_MONO, fontSize: small ? 9 : 9.5, fontWeight: 600,
      color: theme.accent, letterSpacing: 2, textTransform: 'uppercase',
      cursor: onClick ? 'pointer' : 'default',
    }}>
      <span style={{ width: 4, height: 4, borderRadius: 2, background: theme.accent }}/>
      {theme.label}
    </div>
  );
}

// ─── Restrained bottom nav (hairline, no icon fills) ────────
function RBottomNav({ theme, active = 'home', onChange }) {
  const tabs = [
    { k: 'home',        label: 'Home' },
    { k: 'trade',       label: 'Trade' },
    { k: 'leaderboard', label: 'Board' },
    { k: 'profile',     label: 'Profile' },
  ];
  const icons = {
    home:        <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1V11z" fill="none" strokeWidth="1.2"/>,
    trade:       <g strokeWidth="1.2" fill="none"><path d="M3 17l5-5 4 4 9-9"/><path d="M14 7h7v7"/></g>,
    leaderboard: <g strokeWidth="1.2" fill="none"><path d="M6 9h4v11H6zM14 5h4v15h-4zM10 14h4v6h-4z"/></g>,
    profile:     <g strokeWidth="1.2" fill="none"><circle cx="12" cy="9" r="3.6"/><path d="M5 21c0-3.5 3.2-6.4 7-6.4s7 2.9 7 6.4"/></g>,
  };
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: theme.bg + 'D8', backdropFilter: 'blur(16px)',
      borderTop: `1px solid ${theme.border}`,
      padding: '12px 0 24px', display: 'flex', justifyContent: 'space-around',
      zIndex: 10,
    }}>
      {tabs.map(t => {
        const a = t.k === active;
        return (
          <div key={t.k} onClick={() => onChange && onChange(t.k)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
            padding: '0 14px', cursor: 'pointer',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" stroke={a ? theme.accent : theme.textMut}>{icons[t.k]}</svg>
            <span style={{
              fontFamily: FONT_MONO, fontSize: 9, fontWeight: 600,
              color: a ? theme.accent : theme.textMut, letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Tier mark (etched diamond, like S1c ProTier mark) ──────
function TierMark({ theme, size = 56, glyph = '◆', accent }) {
  const c = accent || theme.accent;
  return (
    <div style={{
      width: size, height: size, position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <path d={`M${size/2} ${size*0.10} L${size*0.90} ${size/2} L${size/2} ${size*0.90} L${size*0.10} ${size/2} Z`}
          fill="none" stroke={c} strokeWidth="0.8"/>
        <path d={`M${size/2} ${size*0.22} L${size*0.78} ${size/2} L${size/2} ${size*0.78} L${size*0.22} ${size/2} Z`}
          fill={c} fillOpacity="0.10" stroke={c} strokeWidth="0.5"/>
      </svg>
      <span style={{
        position: 'absolute', fontFamily: FONT_DISPLAY, fontSize: size * 0.32,
        fontWeight: 500, color: c, letterSpacing: -1,
      }}>{glyph}</span>
    </div>
  );
}

// ─── Restrained tier badge (hairline pill) ──────────────────
function RTierBadge({ tier, theme, size = 'md' }) {
  const t = TIER_COLORS[tier] || TIER_COLORS.bronze;
  const pad = size === 'sm' ? '2px 8px' : size === 'lg' ? '4px 12px' : '3px 10px';
  const fs  = size === 'sm' ? 9 : size === 'lg' ? 10 : 9.5;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: pad, borderRadius: 999,
      border: `1px solid ${t.b}`,
      fontFamily: FONT_MONO, fontSize: fs, fontWeight: 600,
      color: t.a, letterSpacing: 2, textTransform: 'uppercase',
    }}>
      <span style={{ width: 4, height: 4, borderRadius: 2, background: t.a }}/>
      {tier}
    </span>
  );
}

// ─── Restrained avatar (hairline ring, no gradient) ─────────
function RAvatar({ name = 'user', size = 40, tier, theme }) {
  const tc = tier && TIER_COLORS[tier];
  const letter = name.replace('@', '').charAt(0).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      border: `1px solid ${tc ? tc.a : (theme?.border || '#2A2A3A')}`,
      background: 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: FONT_DISPLAY, fontSize: size * 0.42, fontWeight: 500,
      color: tc ? tc.a : (theme?.text || '#F0F0F5'),
      letterSpacing: -0.5, flexShrink: 0,
    }}>{letter}</div>
  );
}

// ─── Hairline tab strip (same logic as ProgressRail) ────────
function HairTabs({ theme, value, onChange, options }) {
  return (
    <div style={{ display: 'flex', gap: 24, borderBottom: `1px solid ${theme.border}` }}>
      {options.map(o => {
        const a = value === o.value;
        return (
          <div key={o.value} onClick={() => onChange(o.value)} style={{
            padding: '10px 0', cursor: 'pointer',
            borderBottom: a ? `1px solid ${theme.accent}` : '1px solid transparent',
            marginBottom: -1,
            fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 1.8,
            color: a ? theme.accent : theme.textMut, fontWeight: 600,
            textTransform: 'uppercase',
          }}>{o.label}</div>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  Kicker, Micro, Headline, Body, BigNum, StatusPill,
  HairlineList, HairlineRow, PrimaryCTA, OutlineCTA, AccentCTA,
  RCard, Monogram, StreakStrip, RPill, StatPair, MetaRow,
  SectionHead, RScreen, RTopBar, RModePill, RBottomNav,
  TierMark, RTierBadge, RAvatar, HairTabs,
});
