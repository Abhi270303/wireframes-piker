// components.jsx — Piker shared UI kit

// ─── Phone frame ─────────────────────────────────────────────
function PhoneFrame({ width = 390, height = 844, label, children }) {
  return (
    <div style={{ position: 'relative' }}>
      {label && (
        <div style={{
          position: 'absolute', top: -26, left: 0,
          fontFamily: FONT_MONO, fontSize: 10, color: '#666', letterSpacing: 1,
        }}>{label}</div>
      )}
      <div style={{
        width, height,
        background: '#000', borderRadius: 44,
        padding: 10,
        boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 2px #1a1a22',
        position: 'relative',
      }}>
        <div style={{
          width: '100%', height: '100%',
          borderRadius: 34, overflow: 'hidden',
          position: 'relative', background: '#000',
        }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Status bar (iOS-ish notch row) ──────────────────────────
function StatusBar({ theme }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 44, zIndex: 5,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', pointerEvents: 'none',
    }}>
      <span style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 600, color: theme.text }}>9:41</span>
      <div style={{
        position: 'absolute', left: '50%', top: 10, transform: 'translateX(-50%)',
        width: 110, height: 30, background: '#000', borderRadius: 16,
      }}/>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: theme.text }}>
        <svg width="16" height="10" viewBox="0 0 16 10"><g fill={theme.text}>
          <rect x="0" y="6" width="2.5" height="4"/>
          <rect x="4" y="4" width="2.5" height="6"/>
          <rect x="8" y="2" width="2.5" height="8"/>
          <rect x="12" y="0" width="2.5" height="10"/>
        </g></svg>
        <svg width="22" height="10" viewBox="0 0 22 10">
          <rect x="0" y="0" width="18" height="10" rx="2" fill="none" stroke={theme.text} strokeWidth="1"/>
          <rect x="19" y="3" width="2" height="4" fill={theme.text}/>
          <rect x="2" y="2" width="14" height="6" fill={theme.text}/>
        </svg>
      </div>
    </div>
  );
}

// ─── Mode pill ───────────────────────────────────────────────
function ModePill({ theme, onClick }) {
  return (
    <div onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 11px 5px 9px',
      background: theme.pillBg,
      border: `1px solid ${theme.pillBorder}`,
      borderRadius: 999,
      fontFamily: FONT_DISPLAY, fontSize: 10, fontWeight: 700,
      letterSpacing: 1.5, color: theme.accent,
      cursor: onClick ? 'pointer' : 'default',
    }}>
      <span style={{ fontSize: 11 }}>{theme.icon}</span>
      {theme.label}
    </div>
  );
}

// ─── Top bar (mode pill + right content) ─────────────────────
function TopBar({ theme, onModeClick, right }) {
  return (
    <div style={{
      padding: '56px 16px 12px', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
      position: 'relative', zIndex: 2,
    }}>
      <ModePill theme={theme} onClick={onModeClick}/>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{right}</div>
    </div>
  );
}

// ─── Icon button ─────────────────────────────────────────────
function IconBtn({ theme, icon, onClick }) {
  const paths = {
    bell: <path d="M12 4a5 5 0 0 0-5 5v3l-2 3h14l-2-3V9a5 5 0 0 0-5-5zM10 19a2 2 0 0 0 4 0" stroke={theme.textSec} strokeWidth="1.4" fill="none" strokeLinecap="round"/>,
    share: <g stroke={theme.textSec} strokeWidth="1.4" fill="none" strokeLinecap="round"><circle cx="6" cy="12" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M8 11l8-4M8 13l8 4"/></g>,
    settings: <g stroke={theme.textSec} strokeWidth="1.4" fill="none" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/></g>,
    search: <g stroke={theme.textSec} strokeWidth="1.4" fill="none" strokeLinecap="round"><circle cx="11" cy="11" r="6"/><path d="M16 16l4 4"/></g>,
    close: <g stroke={theme.textSec} strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6l-12 12"/></g>,
  };
  return (
    <div onClick={onClick} style={{
      width: 36, height: 36, borderRadius: 10,
      background: theme.surface, border: `1px solid ${theme.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer',
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24">{paths[icon]}</svg>
    </div>
  );
}

// ─── Card / Section / Label ──────────────────────────────────
function Card({ theme, children, pad = 14, accent = false, style = {} }) {
  return (
    <div style={{
      background: theme.surface,
      border: `1px solid ${accent ? theme.accentDeep : theme.border}`,
      borderRadius: 12, padding: pad,
      boxShadow: accent ? `0 0 0 3px ${theme.accentFaint}` : 'none',
      ...style,
    }}>{children}</div>
  );
}
function Section({ theme, label, right, children, pad = '0 16px 16px' }) {
  return (
    <div style={{ padding: pad }}>
      {(label || right) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          {label && <div style={{
            fontFamily: FONT_DISPLAY, fontSize: 11, color: theme.textMut,
            fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase',
          }}>{label}</div>}
          {right}
        </div>
      )}
      {children}
    </div>
  );
}
function Label({ theme, children, style = {} }) {
  return <div style={{
    fontFamily: FONT_DISPLAY, fontSize: 10, color: theme.textMut,
    fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', ...style,
  }}>{children}</div>;
}

// ─── Chip / StatCard / Button ────────────────────────────────
function Chip({ theme, children, color, bg, size = 'md' }) {
  const s = size === 'sm' ? { p: '2px 7px', fs: 10 } : { p: '3px 9px', fs: 11 };
  return <span style={{
    display: 'inline-block', padding: s.p, borderRadius: 999,
    background: bg, color, fontFamily: FONT_MONO, fontSize: s.fs,
    fontWeight: 600, letterSpacing: 0.3,
  }}>{children}</span>;
}
function StatCard({ theme, label, value, sub, compact = false, mono = true }) {
  return (
    <div style={{
      background: theme.surface, border: `1px solid ${theme.border}`,
      borderRadius: 10, padding: compact ? '8px 10px' : '10px 12px',
    }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 9.5, color: theme.textMut, letterSpacing: 0.8, fontWeight: 600, textTransform: 'uppercase' }}>{label}</div>
      <div style={{
        fontFamily: mono ? FONT_MONO : FONT_DISPLAY, fontSize: compact ? 15 : 18,
        fontWeight: 700, color: theme.text, marginTop: 2, letterSpacing: -0.3,
      }}>{value}</div>
      {sub && <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, marginTop: 1 }}>{sub}</div>}
    </div>
  );
}
function Button({ theme, children, onClick, size = 'md', variant = 'accent', full = true }) {
  const sizes = { sm: { p: '7px 12px', fs: 11 }, md: { p: '10px 14px', fs: 13 }, lg: { p: '14px 16px', fs: 14 } };
  const s = sizes[size];
  const variants = {
    accent:  { bg: theme.accent,   color: '#0A0A0D', border: theme.accent },
    accent_outline: { bg: 'transparent', color: theme.accent, border: theme.accentDeep },
    outline: { bg: 'transparent', color: theme.text, border: theme.border },
    long:    { bg: '#4ADE80', color: '#0A0A0D', border: '#4ADE80' },
    short:   { bg: '#F87171', color: '#0A0A0D', border: '#F87171' },
  };
  const v = variants[variant];
  return (
    <div onClick={onClick} style={{
      display: full ? 'block' : 'inline-block',
      width: full ? '100%' : 'auto',
      padding: s.p, borderRadius: 10,
      background: v.bg, border: `1px solid ${v.border}`, color: v.color,
      fontFamily: FONT_DISPLAY, fontSize: s.fs, fontWeight: 700,
      textAlign: 'center', cursor: 'pointer', letterSpacing: 0.2,
    }}>{children}</div>
  );
}

// ─── Segmented control ───────────────────────────────────────
function Segmented({ theme, value, onChange, options, size = 'md' }) {
  const pad = size === 'sm' ? '5px 8px' : '7px 10px';
  const fs  = size === 'sm' ? 11 : 12.5;
  return (
    <div style={{
      display: 'flex', gap: 3, padding: 3,
      background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 9,
    }}>
      {options.map(o => (
        <div key={o.value} onClick={() => onChange(o.value)} style={{
          flex: 1, padding: pad, borderRadius: 7,
          background: value === o.value ? theme.surface : 'transparent',
          color: value === o.value ? theme.text : theme.textSec,
          fontFamily: FONT_DISPLAY, fontSize: fs, fontWeight: 600, textAlign: 'center',
          cursor: 'pointer',
          border: value === o.value ? `1px solid ${theme.border}` : '1px solid transparent',
        }}>{o.label}</div>
      ))}
    </div>
  );
}

// ─── Progress bar ────────────────────────────────────────────
function ProgressBar({ theme, value, height = 5, color }) {
  return (
    <div style={{
      width: '100%', height, background: theme.surfaceAlt,
      borderRadius: height / 2, overflow: 'hidden',
    }}>
      <div style={{
        width: `${Math.max(0, Math.min(100, value))}%`, height: '100%',
        background: color || theme.accent,
        borderRadius: height / 2,
        transition: 'width 400ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}/>
    </div>
  );
}

// ─── Avatar / Tier badge ─────────────────────────────────────
const TIER_COLORS = {
  bronze:  { a: '#CD7F32', b: '#8B5A2B' },
  silver:  { a: '#C0C0C8', b: '#8C8C94' },
  gold:    { a: '#E8C858', b: '#C8A840' },
  diamond: { a: '#8BDDFF', b: '#48A6CF' },
  elite:   { a: '#FF6AC4', b: '#6A6AFF' },
};
function Avatar({ name = 'user', size = 40, tier }) {
  const seed = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
  const hue = (seed * 37) % 360;
  const tc = tier && TIER_COLORS[tier];
  const letter = name.replace('@', '').charAt(0).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, hsl(${hue}, 50%, 55%), hsl(${(hue + 40) % 360}, 50%, 35%))`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: FONT_DISPLAY, fontSize: size * 0.42, fontWeight: 700, color: '#fff',
      border: tc ? `2px solid ${tc.a}` : 'none',
      boxShadow: tc ? `0 0 0 2px ${tc.b}, 0 0 12px ${tc.a}60` : 'none',
      flexShrink: 0,
    }}>{letter}</div>
  );
}
function TierBadge({ tier, size = 'md' }) {
  const t = TIER_COLORS[tier] || TIER_COLORS.bronze;
  const name = tier.toUpperCase();
  const icons = { bronze: '●', silver: '◆', gold: '◆', diamond: '◈', elite: '✦' };
  const pad = size === 'sm' ? '2px 7px' : size === 'lg' ? '4px 10px' : '3px 8px';
  const fs  = size === 'sm' ? 9.5 : size === 'lg' ? 11 : 10;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: pad, borderRadius: 999,
      background: `${t.a}22`, border: `1px solid ${t.b}`,
      fontFamily: FONT_DISPLAY, fontSize: fs, fontWeight: 700,
      color: t.a, letterSpacing: 1,
    }}><span>{icons[tier]}</span>{name}</span>
  );
}

// ─── Count-up number ─────────────────────────────────────────
function CountUp({ to, duration = 1200, fmt = v => v.toFixed(0), style = {} }) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span style={style}>{fmt(v)}</span>;
}

// ─── Live P&L (ticks + flashes on change) ────────────────────
function LivePL({ value, style = {}, flashKey }) {
  const [v, setV] = React.useState(value);
  const [flash, setFlash] = React.useState(null);
  React.useEffect(() => {
    const id = setInterval(() => {
      const drift = (Math.random() - 0.48) * Math.abs(value) * 0.01;
      setV(prev => {
        const next = value + drift;
        setFlash(next > prev ? 'up' : 'down');
        setTimeout(() => setFlash(null), 400);
        return next;
      });
    }, 2200);
    return () => clearInterval(id);
  }, [value, flashKey]);
  const pos = v >= 0;
  return (
    <span style={{
      fontFamily: FONT_MONO, fontWeight: 600,
      color: pos ? '#4ADE80' : '#F87171',
      background: flash === 'up' ? '#4ADE8025' : flash === 'down' ? '#F8717125' : 'transparent',
      padding: '1px 4px', borderRadius: 4,
      transition: 'background 200ms',
      ...style,
    }}>{pos ? '+' : ''}${v.toFixed(2)}</span>
  );
}

// ─── Position row ────────────────────────────────────────────
function PositionRow({ theme, pair, dir, entry, pl }) {
  const long = dir === 'LONG';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 12px',
      background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 700, color: theme.text }}>{pair}</span>
        <Chip theme={theme}
          color={long ? '#4ADE80' : '#F87171'}
          bg={long ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)'}
          size="sm">{dir}</Chip>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut }}>Entry</div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 11.5, color: theme.textSec }}>{entry}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <LivePL value={pl} style={{ fontSize: 14 }}/>
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, marginTop: 2 }}>
          {pl >= 0 ? '+' : ''}{((pl / 1000) * 100).toFixed(2)}%
        </div>
      </div>
      <div style={{
        padding: '5px 8px', borderRadius: 6,
        border: `1px solid ${theme.border}`, color: theme.textSec,
        fontFamily: FONT_DISPLAY, fontSize: 10, fontWeight: 600,
        cursor: 'pointer',
      }}>CLOSE</div>
    </div>
  );
}

// ─── Bottom nav ──────────────────────────────────────────────
function BottomNav({ theme, active = 'home', onChange }) {
  const tabs = [
    { k: 'home',        label: 'Home',  icon: <g><path d="M3 10l9-7 9 7v11a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10z" fill="none" strokeWidth="1.5"/></g> },
    { k: 'trade',       label: 'Trade', icon: <g strokeWidth="1.5" fill="none"><path d="M3 17l5-5 4 4 9-9M14 7h7v7"/></g> },
    { k: 'leaderboard', label: 'Board', icon: <g strokeWidth="1.5" fill="none"><path d="M6 9h4v11H6zM14 5h4v15h-4zM10 14h4v6h-4z"/></g> },
    { k: 'profile',     label: 'Profile', icon: <g strokeWidth="1.5" fill="none"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></g> },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: `${theme.bg}E0`, backdropFilter: 'blur(16px)',
      borderTop: `1px solid ${theme.border}`,
      padding: '10px 0 22px', display: 'flex', justifyContent: 'space-around',
      zIndex: 10,
    }}>
      {tabs.map(t => {
        const a = t.k === active;
        return (
          <div key={t.k} onClick={() => onChange && onChange(t.k)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '4px 14px', cursor: 'pointer',
            borderTop: a ? `2px solid ${theme.accent}` : '2px solid transparent',
            marginTop: -10, paddingTop: 8,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" stroke={a ? theme.accent : theme.textMut}>{t.icon}</svg>
            <span style={{
              fontFamily: FONT_DISPLAY, fontSize: 9.5, fontWeight: 600,
              color: a ? theme.accent : theme.textMut, letterSpacing: 0.5,
            }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Screen wrapper ──────────────────────────────────────────
function Screen({ theme, navActive, onNavChange, children }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: theme.bg, color: theme.text,
      position: 'relative', overflow: 'auto', paddingBottom: 86,
    }}>
      <StatusBar theme={theme}/>
      {children}
      <BottomNav theme={theme} active={navActive} onChange={onNavChange}/>
    </div>
  );
}

// ─── Mode compare card (two side-by-side) ────────────────────
function ModeCompareCard({ theme, items }) {
  return (
    <div style={{
      flex: 1, background: theme.surface,
      border: `1.5px solid ${theme.accentDeep}`, borderRadius: 14,
      padding: 14,
      boxShadow: `0 0 0 3px ${theme.accentFaint}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        <span style={{ color: theme.accent, fontSize: 14 }}>{theme.icon}</span>
        <span style={{
          fontFamily: FONT_DISPLAY, fontSize: 11, fontWeight: 800,
          color: theme.accent, letterSpacing: 1.5,
        }}>{theme.mode === 'rookie' ? 'ROOKIE' : 'PRO'}</span>
      </div>
      {items.map((t, i) => (
        <div key={i} style={{
          fontFamily: FONT_DISPLAY, fontSize: 11.5, color: theme.textSec,
          marginBottom: i < items.length - 1 ? 6 : 0, lineHeight: 1.35,
        }}>{t}</div>
      ))}
    </div>
  );
}

Object.assign(window, {
  PhoneFrame, StatusBar, ModePill, TopBar, IconBtn, Card, Section, Label,
  Chip, StatCard, Button, Segmented, ProgressBar, Avatar, TierBadge,
  CountUp, LivePL, PositionRow, BottomNav, Screen, ModeCompareCard,
  TIER_COLORS,
});
