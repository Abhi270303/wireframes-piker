// desktop-screens.jsx — Desktop (1440×900) versions of every Piker screen.
// Same tokens, same primitives. Wider arrangements only.

// ─── Sidebar ────────────────────────────────────────────────
function DSidebar({ theme, active, onNav, onModeToggle, mode = 'rookie' }) {
  const items = [
    { k: 'home',        g: '◎', label: 'Home' },
    { k: 'trade',       g: '◈', label: 'Trade' },
    { k: 'leaderboard', g: '↑', label: 'Leaderboard' },
    { k: 'profile',     g: '◌', label: 'Profile' },
  ];
  const Item = ({ it }) => {
    const on = it.k === active;
    return (
      <div onClick={() => onNav && onNav(it.k)} style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        gap: 14, padding: '14px 18px 14px 22px', cursor: 'pointer',
        borderLeft: `2px solid ${on ? theme.accent : 'transparent'}`,
        color: on ? theme.accent : theme.textSec,
        fontFamily: FONT_MONO, fontSize: 11, letterSpacing: 1.5,
        textTransform: 'uppercase',
      }}>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 14,
          color: on ? theme.accent : theme.textMut, width: 16 }}>{it.g}</span>
        <span style={{ fontWeight: on ? 700 : 500 }}>{it.label}</span>
      </div>
    );
  };
  return (
    <div style={{
      width: 220, minHeight: '100vh',
      background: theme.bg, borderRight: `1px solid ${theme.border}`,
      display: 'flex', flexDirection: 'column',
      position: 'sticky', top: 0, alignSelf: 'flex-start',
    }}>
      {/* Wordmark + mode pill */}
      <div style={{ padding: '28px 22px 24px', borderBottom: `1px solid ${theme.border}` }}>
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 700,
          color: theme.accent, letterSpacing: -0.4, marginBottom: 14,
        }}>PIKER</div>
        <div onClick={() => onModeToggle && onModeToggle()} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 10px', border: `1px solid ${theme.pillBorder}`,
          borderRadius: 999, background: theme.pillBg,
          fontFamily: FONT_MONO, fontSize: 9.5, color: theme.accent,
          letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer',
          transition: 'opacity 150ms',
        }} title="Switch mode">
          <span style={{ width: 5, height: 5, borderRadius: 3, background: theme.accent }}/>
          {mode === 'pro' ? 'PRO MODE' : 'ROOKIE MODE'}
          <span style={{ marginLeft: 4, opacity: 0.7 }}>⇄</span>
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: '12px 0', flex: 1 }}>
        {items.map(it => <Item key={it.k} it={it}/>)}
      </div>

      {/* Footer */}
      <div style={{ padding: '14px 22px 24px', borderTop: `1px solid ${theme.border}` }}>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 11, color: theme.textSec,
          letterSpacing: 1.5, marginBottom: 10, cursor: 'pointer',
        }} onClick={() => onNav && onNav('settings')}>⚙  SETTINGS</div>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 11, color: theme.textSec,
          letterSpacing: 1.5, marginBottom: 14, cursor: 'pointer',
        }} onClick={() => onNav && onNav('notifications')}>◉  INBOX · 3</div>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 9, color: theme.textMut,
          letterSpacing: 1.2,
        }}>PIKER · v0.1.0</div>
      </div>
    </div>
  );
}

// ─── Screen wrapper ─────────────────────────────────────────
function DScreenWrapper({ theme, mode, active, nav, children, padding = '40px 48px' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch', minHeight: '100vh',
      background: theme.bg, color: theme.text,
    }}>
      <DSidebar theme={theme} mode={mode} active={active}
        onNav={(k) => nav && (nav.setTab ? nav.setTab(k) : nav.goto(k))}
        onModeToggle={() => nav && nav.toModeSwitch && nav.toModeSwitch()}/>
      <div style={{ flex: 1, padding, maxWidth: 1220, width: '100%' }}>
        {children}
      </div>
    </div>
  );
}

// ─── Right panel (340px column on dashboards) ───────────────
function DRightPanel({ theme, children, width = 340 }) {
  return (
    <div style={{
      width, flexShrink: 0,
      background: theme.surface, borderLeft: `1px solid ${theme.border}`,
      padding: '32px 24px',
    }}>
      {children}
    </div>
  );
}

// ─── Onboarding split layout ────────────────────────────────
function DOnboardSplit({ theme, left, right }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh',
      background: theme.bg, color: theme.text, position: 'relative',
    }}>
      <div style={{
        position: 'relative', padding: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRight: `1px solid ${theme.border}`, overflow: 'hidden',
      }}>
        <OnboardBG theme={theme}/>
        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 480 }}>
          {left}
        </div>
      </div>
      <div style={{
        background: theme.surface, padding: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: '100%', maxWidth: 460 }}>{right}</div>
      </div>
    </div>
  );
}

// ─── Table primitive ────────────────────────────────────────
function DTable({ theme, headers, rows, onRowClick, accent }) {
  const cols = headers.length;
  const tmpl = `repeat(${cols}, 1fr)`;
  return (
    <div>
      <div style={{
        display: 'grid', gridTemplateColumns: tmpl,
        padding: '10px 14px', borderBottom: `1px solid ${theme.border}`,
        fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
        letterSpacing: 2, textTransform: 'uppercase',
      }}>
        {headers.map((h, i) => (
          <span key={i} style={{ textAlign: i === cols - 1 ? 'right' : 'left' }}>{h}</span>
        ))}
      </div>
      {rows.map((r, ri) => (
        <div key={ri} onClick={() => onRowClick && onRowClick(r, ri)} style={{
          display: 'grid', gridTemplateColumns: tmpl,
          padding: '14px 14px', borderBottom: `1px solid ${theme.border}`,
          fontFamily: FONT_MONO, fontSize: 12, color: theme.textSec,
          cursor: onRowClick ? 'pointer' : 'default',
        }}>
          {r.map((c, ci) => (
            <span key={ci} style={{
              textAlign: ci === cols - 1 ? 'right' : 'left',
              color: ci === 0 ? (accent || theme.text) : theme.textSec,
            }}>{c}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Order panel (320px right column for trade views) ───────
function DOrderPanel({ theme, mode = 'rookie' }) {
  const [side, setSide]   = React.useState('long');
  const [type, setType]   = React.useState('market');
  const [size, setSize]   = React.useState('25');
  const [lev, setLev]     = React.useState(mode === 'pro' ? 5 : 3);
  const [tp, setTp]       = React.useState((142.50 * 1.05).toFixed(2));
  const [sl, setSl]       = React.useState((142.50 * 0.97).toFixed(2));
  return (
    <div style={{
      width: 300, flexShrink: 0,
      background: theme.surface, borderLeft: `1px solid ${theme.border}`,
      padding: '24px 20px',
    }}>
      {/* Capital / portfolio status */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
          letterSpacing: 2, marginBottom: 6 }}>
          {mode === 'pro' ? 'PORTFOLIO' : 'CAPITAL · TODAY'}
        </div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: theme.text,
          letterSpacing: -0.4, fontWeight: 400 }}>
          {mode === 'pro' ? '$103,420' : '$65.80 / $100.00'}
          {mode === 'pro' && <span style={{ color: '#4ADE80', fontSize: 14, marginLeft: 8 }}>+3.42%</span>}
        </div>
        {mode !== 'pro' && (
          <div style={{
            marginTop: 8, height: 2, background: theme.border, position: 'relative',
          }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0,
              width: '34.2%', background: theme.accent }}/>
          </div>
        )}
        <div style={{ marginTop: 6, fontFamily: FONT_MONO, fontSize: 9.5,
          color: theme.textMut, letterSpacing: 1.5 }}>
          {mode === 'pro' ? 'NO RESET · ONGOING' : 'RESETS · 14H 23M'}
        </div>
      </div>

      {/* Long / short */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
        {['long','short'].map(s => (
          <div key={s} onClick={() => setSide(s)} style={{
            padding: '12px 0', textAlign: 'center', cursor: 'pointer',
            border: `1px solid ${side === s ? (s === 'long' ? '#4ADE80' : '#F87171') : theme.border}`,
            background: side === s ? (s === 'long' ? '#4ADE8014' : '#F8717114') : 'transparent',
            fontFamily: FONT_MONO, fontSize: 11, letterSpacing: 1.8,
            color: side === s ? (s === 'long' ? '#4ADE80' : '#F87171') : theme.textSec,
            textTransform: 'uppercase',
          }}>{s}</div>
        ))}
      </div>

      {/* Order type */}
      <HairTabs theme={theme} value={type} onChange={setType} options={[
        { value: 'market', label: 'Market' },
        { value: 'limit',  label: 'Limit' },
        { value: 'stop',   label: 'Stop' },
      ]}/>

      {/* Size */}
      <div style={{ marginTop: 22 }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
          letterSpacing: 2, marginBottom: 6 }}>SIZE · USDT</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6,
          paddingBottom: 8, borderBottom: `1px solid ${theme.border}` }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: theme.textMut,
            fontWeight: 400 }}>$</span>
          <input value={size} onChange={e => setSize(e.target.value)} style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 400,
            color: theme.text, letterSpacing: -0.5, padding: 0, caretColor: theme.accent, minWidth: 0,
          }}/>
        </div>
      </div>

      {/* Leverage */}
      <div style={{ marginTop: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8,
          fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut, letterSpacing: 2 }}>
          <span>LEVERAGE{mode === 'pro' ? ' · MAX 20×' : ''}</span>
          <span style={{ color: theme.accent }}>{lev}×</span>
        </div>
        <input type="range" min="1" max="20" value={lev}
          onChange={e => setLev(+e.target.value)}
          style={{ width: '100%', accentColor: theme.accent }}/>
      </div>

      {/* Score impact (Pro only) */}
      {mode === 'pro' && lev > 10 && (
        <div style={{ marginTop: 12, fontFamily: FONT_MONO, fontSize: 9.5,
          color: theme.textMut, letterSpacing: 1.2 }}>
          SCORE IMPACT · LARGE POSITION MAY AFFECT SHARPE
        </div>
      )}

      {/* TP / SL — stacked for tight panel widths */}
      <div style={{ marginTop: 18 }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
          letterSpacing: 2, marginBottom: 6 }}>TAKE PROFIT</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4,
          paddingBottom: 6, borderBottom: `1px solid #4ADE80` }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: theme.textMut, fontWeight: 400 }}>$</span>
          <input value={tp} onChange={e => setTp(e.target.value)} style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 400,
            color: '#4ADE80', padding: 0, caretColor: '#4ADE80', minWidth: 0,
          }}/>
        </div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
          letterSpacing: 2, marginBottom: 6, marginTop: 14 }}>STOP LOSS</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4,
          paddingBottom: 6, borderBottom: `1px solid #F87171` }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: theme.textMut, fontWeight: 400 }}>$</span>
          <input value={sl} onChange={e => setSl(e.target.value)} style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 400,
            color: '#F87171', padding: 0, caretColor: '#F87171', minWidth: 0,
          }}/>
        </div>
      </div>

      {/* Margin summary */}
      <div style={{
        marginTop: 18, paddingTop: 14, borderTop: `1px solid ${theme.border}`,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut, letterSpacing: 1.5,
      }}>
        <span>MARGIN ${(parseFloat(size||0) / lev).toFixed(2)}</span>
        <span>LIQ <span style={{ color: '#F87171' }}>$138.20</span></span>
      </div>

      {/* Place order */}
      <div style={{ marginTop: 22 }}>
        <AccentCTA theme={theme}>
          {side === 'long' ? 'Long BTC' : 'Short BTC'}
        </AccentCTA>
      </div>
    </div>
  );
}

// ─── Order book — desktop (8 rows per side) ─────────────────
function DOrderBook({ theme, base = 142.50, rows = 8 }) {
  const asks = Array.from({ length: rows }, (_, i) => ({
    p: (base + 0.10 + i * 0.30).toFixed(2),
    q: (5 + i * 2.4).toFixed(1),
    pct: 30 + i * 6,
  })).reverse();
  const bids = Array.from({ length: rows }, (_, i) => ({
    p: (base - 0.10 - i * 0.30).toFixed(2),
    q: (5 + i * 2.4).toFixed(1),
    pct: 30 + i * 6,
  }));
  const Cell = ({ side, r }) => (
    <div style={{
      position: 'relative', display: 'flex', justifyContent: 'space-between',
      padding: '4px 12px',
    }}>
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        [side === 'ask' ? 'left' : 'right']: 0, width: r.pct + '%',
        background: side === 'ask' ? '#F8717114' : '#4ADE8014',
      }}/>
      <span style={{ fontFamily: FONT_MONO, fontSize: 11,
        color: side === 'ask' ? '#F87171' : '#4ADE80', position: 'relative', letterSpacing: 0.3 }}>${r.p}</span>
      <span style={{ fontFamily: FONT_MONO, fontSize: 10,
        color: theme.textMut, position: 'relative' }}>{r.q}</span>
    </div>
  );
  return (
    <div style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between',
        padding: '10px 14px', borderBottom: `1px solid ${theme.border}`,
        fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut, letterSpacing: 2 }}>
        <span>ORDER BOOK · ASKS</span><span>BIDS</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ borderRight: `1px solid ${theme.border}` }}>
          {asks.map((r, i) => <Cell key={i} side="ask" r={r}/>)}
        </div>
        <div>
          {bids.map((r, i) => <Cell key={i} side="bid" r={r}/>)}
        </div>
      </div>
      <div style={{
        textAlign: 'center', padding: '10px 0', borderTop: `1px solid ${theme.border}`,
        fontFamily: FONT_MONO, fontSize: 10, color: theme.accent, letterSpacing: 2,
      }}>SPREAD · $0.20 · 0.014%</div>
    </div>
  );
}

// ─── Section header used widely ─────────────────────────────
function DSection({ theme, kicker, children, right, style = {} }) {
  return (
    <div style={{ marginBottom: 28, ...style }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${theme.border}` }}>
        <Kicker theme={theme}>{kicker}</Kicker>
        {right}
      </div>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//   ONBOARDING — D-S1a … D-S1f
// ═══════════════════════════════════════════════════════════

function DOnboardA({ theme, onNext }) {
  return <DOnboardSplit theme={theme}
    left={<>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 110, fontWeight: 200,
        color: theme.text, letterSpacing: -3, lineHeight: 1 }}>Piker</div>
      <div style={{ marginTop: 18, fontFamily: FONT_MONO, fontSize: 12,
        color: theme.textMut, letterSpacing: 3, textTransform: 'uppercase' }}>
        THE TRADING ARENA · FOR SERIOUS PLAYERS
      </div>
    </>}
    right={<>
      <Kicker theme={theme}>01 · DAILY CAPITAL</Kicker>
      <Headline theme={theme} size={42} style={{ marginTop: 16 }}>
        $100 a day. Reset every midnight.
      </Headline>
      <Body theme={theme} style={{ marginTop: 18, fontSize: 14 }}>
        No real money. No real risk. Just the discipline of trading
        with a fixed bankroll, every single day.
      </Body>
      <div style={{ marginTop: 36 }}>
        <PrimaryCTA theme={theme} onClick={onNext}>Continue</PrimaryCTA>
      </div>
      <div style={{ marginTop: 28, display: 'flex', gap: 6 }}>
        {[0,1,2].map(i => (
          <span key={i} style={{ width: 24, height: 2,
            background: i === 0 ? theme.accent : theme.border }}/>
        ))}
      </div>
    </>}/>;
}

function DOnboardB({ theme, onNext }) {
  return <DOnboardSplit theme={theme}
    left={<>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 96, fontWeight: 200,
        color: theme.text, letterSpacing: -2, lineHeight: 1 }}>↑ #1</div>
      <div style={{ marginTop: 18, fontFamily: FONT_MONO, fontSize: 12,
        color: theme.textMut, letterSpacing: 3 }}>LIVE LEADERBOARD · 24H</div>
    </>}
    right={<>
      <Kicker theme={theme}>02 · COMPETE LIVE</Kicker>
      <Headline theme={theme} size={42} style={{ marginTop: 16 }}>
        Climb the global leaderboard.
      </Headline>
      <Body theme={theme} style={{ marginTop: 18, fontSize: 14 }}>
        Every trade scored. Every streak counted. Public ranks.
        Your name next to the best.
      </Body>
      <div style={{ marginTop: 36 }}>
        <PrimaryCTA theme={theme} onClick={onNext}>Continue</PrimaryCTA>
      </div>
      <div style={{ marginTop: 28, display: 'flex', gap: 6 }}>
        {[0,1,2].map(i => (
          <span key={i} style={{ width: 24, height: 2,
            background: i === 1 ? theme.accent : theme.border }}/>
        ))}
      </div>
    </>}/>;
}

function DOnboardC({ theme, onNext }) {
  return <DOnboardSplit theme={theme}
    left={<>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 110, fontWeight: 200,
        color: theme.text, letterSpacing: -3, lineHeight: 1 }}>◆</div>
      <div style={{ marginTop: 18, fontFamily: FONT_MONO, fontSize: 12,
        color: theme.textMut, letterSpacing: 3 }}>PRO · WHERE IT GETS REAL</div>
    </>}
    right={<>
      <Kicker theme={theme}>03 · GO PRO</Kicker>
      <Headline theme={theme} size={42} style={{ marginTop: 16 }}>
        Unlock real capital. Real ranks.
      </Headline>
      <Body theme={theme} style={{ marginTop: 18, fontSize: 14 }}>
        Your Rookie performance becomes your résumé. Earn the right
        to trade with real funds and a real audience.
      </Body>
      <div style={{ marginTop: 36 }}>
        <PrimaryCTA theme={theme} onClick={onNext}>Continue</PrimaryCTA>
      </div>
      <div style={{ marginTop: 28, display: 'flex', gap: 6 }}>
        {[0,1,2].map(i => (
          <span key={i} style={{ width: 24, height: 2,
            background: i === 2 ? theme.accent : theme.border }}/>
        ))}
      </div>
    </>}/>;
}

function DSignup({ theme, nav }) {
  const Btn = ({ children }) => (
    <div style={{
      padding: '16px 18px', border: `1px solid ${theme.border}`,
      borderRadius: 10, marginBottom: 12, cursor: 'pointer',
      fontFamily: FONT_DISPLAY, fontSize: 15, color: theme.text, fontWeight: 500,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>{children}<span style={{ color: theme.textMut }}>→</span></div>
  );
  return <DOnboardSplit theme={theme}
    left={<>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 84, fontWeight: 200,
        color: theme.text, letterSpacing: -2, lineHeight: 1.05 }}>Piker</div>
      <div style={{ marginTop: 24, fontFamily: FONT_DISPLAY, fontSize: 22,
        fontStyle: 'italic', color: theme.textSec, letterSpacing: -0.4 }}>
        The trading arena<br/>for serious players.
      </div>
    </>}
    right={<>
      <Kicker theme={theme}>SIGN UP</Kicker>
      <Headline theme={theme} size={32} style={{ marginTop: 14, marginBottom: 28 }}>
        Create your account.
      </Headline>
      <Btn>Continue with Apple</Btn>
      <Btn>Continue with Google</Btn>
      <Btn>Continue with email</Btn>
      <div style={{ marginTop: 24, fontFamily: FONT_MONO, fontSize: 10,
        color: theme.textMut, letterSpacing: 1.2, lineHeight: 1.6 }}>
        BY SIGNING UP YOU AGREE TO PIKER'S TERMS OF SERVICE
        AND PRIVACY POLICY.
      </div>
      <div style={{ marginTop: 28 }}>
        <PrimaryCTA theme={theme} onClick={() => nav.goto('username')}>Continue</PrimaryCTA>
      </div>
    </>}/>;
}

function DUsername({ theme, nav }) {
  const [v, setV] = React.useState('');
  return <DOnboardSplit theme={theme}
    left={<div style={{ position: 'relative' }}>
      <div style={{
        fontFamily: FONT_DISPLAY, fontSize: 280, fontWeight: 200,
        color: theme.accent + '28', letterSpacing: -10, lineHeight: 1,
      }}>@</div>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT_DISPLAY, fontSize: 28, color: theme.text, letterSpacing: -0.5,
      }}>Your identity on Piker.</div>
    </div>}
    right={<>
      <Kicker theme={theme}>CHOOSE A USERNAME</Kicker>
      <Headline theme={theme} size={32} style={{ marginTop: 14 }}>Pick your handle.</Headline>
      <Body theme={theme} style={{ marginTop: 14, fontSize: 13 }}>
        This is the name on every leaderboard, every profile.
        Choose well.
      </Body>
      <div style={{ marginTop: 28, display: 'flex', alignItems: 'baseline', gap: 8,
        paddingBottom: 10, borderBottom: `1px solid ${theme.accent}` }}>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 32,
          color: theme.textMut, fontWeight: 300, letterSpacing: -0.5 }}>@</span>
        <input value={v} onChange={e => setV(e.target.value)} placeholder="username"
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 300,
            color: theme.text, letterSpacing: -0.5, padding: 0, caretColor: theme.accent, minWidth: 0,
          }}/>
      </div>
      <div style={{ marginTop: 36 }}>
        <PrimaryCTA theme={theme} onClick={() => nav.goto('mode-intro')}>Continue</PrimaryCTA>
      </div>
    </>}/>;
}

function DModeIntro({ theme, nav, onRookie, onPro }) {
  // Fall through props from app.jsx ScreenHost
  const goRookie = onRookie || (() => nav && nav.goto('rookie-dashboard'));
  const goPro    = onPro    || (() => nav && nav.goto('pro-intro'));
  const Card = ({ mode, title, lines, onClick }) => {
    const c = mode === 'pro' ? '#E8C858' : '#B8B8E0';
    return (
      <div style={{
        flex: 1, padding: 64, background: theme.surface,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative',
      }}>
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11,
            color: c, letterSpacing: 3, marginBottom: 24 }}>
            {mode === 'pro' ? '◆ TIER · PRO' : '◈ TIER · ROOKIE'}
          </div>
          <div style={{
            fontFamily: FONT_DISPLAY, fontSize: 96, fontWeight: 200,
            color: c, letterSpacing: -2, lineHeight: 1, marginBottom: 36,
          }}>{title}</div>
          {lines.map((l, i) => (
            <div key={i} style={{
              padding: '14px 0', borderBottom: i < lines.length - 1 ? `1px solid ${theme.border}` : 'none',
              fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.textSec, letterSpacing: -0.2,
            }}>{l}</div>
          ))}
        </div>
        <div style={{ marginTop: 40 }}>
          <div onClick={onClick} style={{
            padding: '14px 18px', border: `1px solid ${c}`,
            borderRadius: 10, textAlign: 'center', cursor: 'pointer',
            fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 600,
            color: c, background: c + '12',
          }}>{mode === 'pro' ? 'Enter Pro Mode' : 'Enter Rookie Mode'}</div>
        </div>
      </div>
    );
  };
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: theme.bg }}>
      <Card mode="rookie" title="ROOKIE" onClick={goRookie}
        lines={[
          '$100 daily virtual capital · resets nightly.',
          'Compete on the global leaderboard.',
          'Practice without risk · build a track record.',
        ]}/>
      <div style={{ width: 1, background: theme.border }}/>
      <Card mode="pro" title="PRO" onClick={goPro}
        lines={[
          'Real capital · real ranks · real audience.',
          'Earn through Fund Me from real backers.',
          'Tier badges that mean something.',
        ]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//   ROOKIE DASHBOARD — D-S2
// ═══════════════════════════════════════════════════════════

function DRookieDashboard({ theme, nav }) {
  return (
    <DScreenWrapper theme={theme} mode="rookie" active="home" nav={nav} padding="0">
      <div style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
        <div style={{ flex: 1, padding: '40px 48px' }}>
          <DSection theme={theme} kicker="01 · DAILY CAPITAL"
            right={<span style={{ fontFamily: FONT_MONO, fontSize: 10,
              color: theme.textMut, letterSpacing: 1.5 }}>RESETS · 14H 23M</span>}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
              <BigNum theme={theme} prefix="$" number="100" suffix=".00" size={88}/>
            </div>
            <div style={{ marginTop: 18, height: 3, background: theme.border, position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0,
                width: '34.2%', background: theme.accent }}/>
            </div>
            <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between',
              fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5 }}>
              <span>$34.20 DEPLOYED</span><span>$65.80 AVAILABLE</span>
            </div>
          </DSection>

          <DSection theme={theme} kicker="02 · TODAY · P&L">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
              <CountUp to={24.8} duration={1200} fmt={v => `+$${v.toFixed(2)}`} style={{
                fontFamily: FONT_DISPLAY, fontSize: 68, fontWeight: 400, color: '#4ADE80',
                letterSpacing: -2, lineHeight: 0.95, fontFeatureSettings: '"tnum"',
              }}/>
              <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: '#4ADE80', letterSpacing: 0.5 }}>+24.8%</span>
            </div>
            <div style={{ marginTop: 8, fontFamily: FONT_DISPLAY, fontSize: 13,
              color: theme.textSec }}>Three trades · 67% win rate today</div>
          </DSection>

          <DSection theme={theme} kicker="03 · STREAK · DAY 07">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(30, 1fr)', gap: 4 }}>
              {Array.from({ length: 30 }).map((_, i) => {
                const v = i < 7 ? (i % 5 === 3 ? -1 : 1) : 0;
                return <div key={i} style={{
                  height: 28,
                  background: v === 0 ? theme.border : v > 0 ? theme.accent : '#F87171',
                  opacity: i < 7 ? 1 : 0.35,
                }}/>;
              })}
            </div>
            <div style={{ marginTop: 10, fontFamily: FONT_DISPLAY, fontSize: 13,
              color: theme.textSec }}>Three more days to <em>Voltage</em>.</div>
          </DSection>

          <DSection theme={theme} kicker="05 · OPEN POSITIONS">
            <DTable theme={theme}
              headers={['PAIR','DIR','ENTRY','LIQ','P&L','CLOSE']}
              rows={[
                ['BTC/USDT', 'LONG · 3×',  '$58,243', '$57,810', '+$12.40', '✕'],
                ['ETH/USDT', 'LONG · 2×',  '$3,142',  '$3,098',  '+$8.20',  '✕'],
              ]}/>
          </DSection>
        </div>

        <DRightPanel theme={theme}>
          <Kicker theme={theme}>TODAY'S BOARD</Kicker>
          <div style={{ marginTop: 14 }}>
            {[
              ['001','hyperliq.sol','+$98'],['002','alpha.king','+$84'],
              ['003','sol.army','+$72'],['004','quietfeet','+$68'],
              ['005','glass.node','+$60'],
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: `1px solid ${theme.border}`,
                fontFamily: FONT_MONO, fontSize: 11, color: theme.textSec }}>
                <span>#{r[0]}  <span style={{ color: theme.text }}>{r[1]}</span></span>
                <span style={{ color: '#4ADE80' }}>{r[2]}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <Kicker theme={theme}>04 · TODAY'S CHALLENGE</Kicker>
            <div style={{ marginTop: 12, padding: 14,
              border: `1px solid ${theme.border}`, borderRadius: 10 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.text }}>
                Make a profitable SOL/USDT trade
              </div>
              <div style={{ marginTop: 8, fontFamily: FONT_MONO, fontSize: 9.5,
                color: theme.textMut, letterSpacing: 1.5 }}>
                REWARD · +50 XP · IN PROGRESS
              </div>
            </div>
          </div>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${theme.border}` }}>
            <Kicker theme={theme} color="#E8C858">UNLOCK PRO</Kicker>
            <div style={{ marginTop: 10, fontFamily: FONT_DISPLAY, fontSize: 14,
              color: theme.textSec, lineHeight: 1.5 }}>
              Three more profitable days at 60%+ win rate
              and you earn the right to trade real capital.
            </div>
            <div style={{ marginTop: 14 }}>
              <OutlineCTA theme={theme} arrow color="#E8C858"
                onClick={() => nav.goto('pro-intro')}>See Pro mode</OutlineCTA>
            </div>
          </div>
        </DRightPanel>
      </div>
    </DScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════
//   ROOKIE TRADE — D-S3 (3-column Binance layout)
// ═══════════════════════════════════════════════════════════

function DRookieTrade({ theme, nav, mode = 'rookie' }) {
  const [pair, setPair] = React.useState('BTC/USDT');
  const [tf, setTf]     = React.useState('1H');
  const [posTab, setPosTab] = React.useState('positions');
  const pairs = [
    { p: 'BTC/USDT', c: '+2.4%' },
    { p: 'ETH/USDT', c: '+1.8%' },
    { p: 'SOL/USDT', c: '-0.9%' },
    { p: 'BNB/USDT', c: '+0.4%' },
    { p: 'AVAX/USDT', c: '+3.1%' },
    { p: 'DOGE/USDT', c: '-1.2%' },
  ];
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: theme.bg, color: theme.text }}>
      <DSidebar theme={theme} mode={mode} active="trade"
        onNav={(k) => nav && nav.setTab(k)}
        onModeToggle={() => nav && nav.toModeSwitch && nav.toModeSwitch()}/>
      {/* Center column */}
      <div style={{ flex: 1, padding: '20px 24px', minWidth: 0 }}>
        {/* Pair tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 18, overflowX: 'auto' }}>
          {pairs.map(x => {
            const on = pair === x.p;
            return (
              <div key={x.p} onClick={() => setPair(x.p)} style={{
                padding: '8px 14px', cursor: 'pointer', flexShrink: 0,
                border: `1px solid ${on ? theme.accent : theme.border}`,
                borderRadius: 999, fontFamily: FONT_MONO, fontSize: 11,
                letterSpacing: 1, color: on ? theme.accent : theme.textSec,
              }}>{x.p}  <span style={{ color: x.c.startsWith('-') ? '#F87171' : '#4ADE80' }}>{x.c}</span></div>
            );
          })}
        </div>

        {/* Price ticker */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10,
            color: theme.textMut, letterSpacing: 2 }}>{pair}{mode === 'pro' ? ' · PERP' : ''}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 6, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 40, fontWeight: 300,
              color: theme.text, letterSpacing: -1.2, lineHeight: 1 }}>58,243<span style={{ color: theme.textMut, fontSize: 20 }}>.20</span></span>
            <span style={{ color: '#4ADE80', fontFamily: FONT_MONO, fontSize: 13 }}>+2.40%</span>
            <span style={{ color: theme.textMut, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: 1 }}>
              H 58,892 · L 56,410
            </span>
          </div>
          {mode === 'pro' && (
            <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 14,
              fontFamily: FONT_MONO, fontSize: 10.5, color: theme.textMut, letterSpacing: 1.2 }}>
              <span>OI <span style={{ color: theme.textSec }}>$4.1B</span></span>
              <span>VOL <span style={{ color: theme.textSec }}>$12.4B</span></span>
              <span>FUND <span style={{ color: '#4ADE80' }}>+0.012%</span></span>
            </div>
          )}
        </div>

        {/* TF tabs */}
        <div style={{ display: 'flex', gap: 18, marginBottom: 12 }}>
          {['1M','5M','15M','1H','4H','1D'].map(t => (
            <div key={t} onClick={() => setTf(t)} style={{
              cursor: 'pointer', padding: '6px 0',
              borderBottom: tf === t ? `1px solid ${theme.accent}` : '1px solid transparent',
              fontFamily: FONT_MONO, fontSize: 11,
              color: tf === t ? theme.accent : theme.textMut, letterSpacing: 1.5,
            }}>{t}</div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ borderTop: `1px solid ${theme.border}`,
          borderBottom: `1px solid ${theme.border}`, marginBottom: 0 }}>
          {mode === 'pro'
            ? <CandleChart theme={theme} height={340} seed={pair.length}/>
            : <AreaChart theme={theme} height={340} seed={pair.length + 1}/>}
        </div>

        {/* Order book */}
        <div style={{ marginTop: 18 }}>
          <DOrderBook theme={theme} rows={mode === 'pro' ? 10 : 8}/>
        </div>

        {/* Positions panel */}
        <div style={{ marginTop: 22 }}>
          <HairTabs theme={theme} value={posTab} onChange={setPosTab} options={[
            { value: 'positions', label: 'Positions (2)' },
            { value: 'orders',    label: 'Orders' },
            { value: 'history',   label: 'History' },
          ]}/>
          <div style={{ marginTop: 14 }}>
            {posTab === 'positions' && (
              <DTable theme={theme}
                headers={['PAIR','DIR','SIZE','ENTRY','LIQ','P&L','CLOSE']}
                rows={[
                  ['BTC/USDT','LONG 3×','$25.00','$58,243','$57,810','+$12.40','✕'],
                  ['ETH/USDT','LONG 2×','$15.00','$3,142', '$3,098', '+$8.20','✕'],
                ]}/>
            )}
            {posTab === 'orders' && (
              <div style={{ padding: 32, textAlign: 'center',
                fontFamily: FONT_MONO, fontSize: 11, color: theme.textMut, letterSpacing: 1.5 }}>
                NO OPEN ORDERS
              </div>
            )}
            {posTab === 'history' && (
              <DTable theme={theme}
                headers={['DATE','PAIR','DIR','P&L']}
                rows={[
                  ['APR 18','SOL/USDT','LONG 3×','+$8.40'],
                  ['APR 17','BTC/USDT','SHORT 2×','-$3.20'],
                  ['APR 16','ETH/USDT','LONG 2×','+$12.80'],
                ]}/>
            )}
          </div>
        </div>
      </div>

      <DOrderPanel theme={theme} mode={mode}/>
    </div>
  );
}

function DProTrade(props) { return <DRookieTrade {...props} mode="pro"/>; }

// ═══════════════════════════════════════════════════════════
//   ROOKIE SUMMARY — D-S4
// ═══════════════════════════════════════════════════════════

function DRookieSummary({ theme, nav }) {
  return (
    <DScreenWrapper theme={theme} mode="rookie" active="home" nav={nav} padding="0">
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '56px 64px',
          borderRight: `1px solid ${theme.border}` }}>
          <Kicker theme={theme}>SESSION · APRIL 18</Kicker>
          <CountUp to={24.80} duration={1400} fmt={v => `+$${v.toFixed(2)}`} style={{
            display: 'block', marginTop: 24, fontFamily: FONT_DISPLAY, fontSize: 120,
            fontWeight: 200, color: '#4ADE80', letterSpacing: -3, lineHeight: 1,
            fontFeatureSettings: '"tnum"',
          }}/>
          <Body theme={theme} style={{ marginTop: 18, fontSize: 16 }}>
            on $100 virtual capital · <span style={{ color: '#4ADE80' }}>+24.8%</span>
          </Body>

          <div style={{ marginTop: 56 }}>
            <Kicker theme={theme}>BADGE · UNLOCKED</Kicker>
            <div style={{
              marginTop: 18, padding: 32,
              border: `1px solid ${theme.accent}`, borderRadius: 14,
              background: theme.accent + '10',
              display: 'flex', alignItems: 'center', gap: 24,
            }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 56,
                color: theme.accent, fontWeight: 200 }}>◈</div>
              <div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22,
                  color: theme.text, fontWeight: 600 }}>Sniper</div>
                <div style={{ marginTop: 6, fontFamily: FONT_MONO, fontSize: 11,
                  color: theme.textMut, letterSpacing: 1.5 }}>
                  THREE WINS IN A ROW · UNDER 30 MIN EACH
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: 380, padding: '56px 32px', background: theme.surface }}>
          <Kicker theme={theme}>BREAKDOWN</Kicker>
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <StatPair theme={theme} value="3" label="TRADES"/>
            <StatPair theme={theme} value="67%" label="WIN RATE"/>
            <StatPair theme={theme} value="2.4×" label="AVG R/R"/>
            <StatPair theme={theme} value="38m" label="AVG HOLD"/>
          </div>

          <div style={{ marginTop: 36, paddingTop: 24, borderTop: `1px solid ${theme.border}` }}>
            <Kicker theme={theme}>LEADERBOARD</Kicker>
            <div style={{ marginTop: 10, fontFamily: FONT_DISPLAY, fontSize: 22,
              color: theme.text }}>↑ 535 ranks</div>
            <Body theme={theme} style={{ marginTop: 6, fontSize: 13 }}>
              From #847 to #312
            </Body>
          </div>

          <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${theme.border}` }}>
            <Kicker theme={theme}>STREAK</Kicker>
            <div style={{ marginTop: 10, fontFamily: FONT_DISPLAY, fontSize: 22,
              color: theme.text }}>Day 8 extended</div>
            <Body theme={theme} style={{ marginTop: 6, fontSize: 13 }}>
              Two more days to <em>Voltage</em>.
            </Body>
          </div>

          <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${theme.border}` }}>
            <Kicker theme={theme}>SHARE</Kicker>
            <div style={{ marginTop: 12, padding: 18,
              border: `1px solid ${theme.border}`, borderRadius: 10,
              fontFamily: FONT_DISPLAY, fontSize: 13, color: theme.textSec }}>
              Card preview · @pikerkid +24.8% · Day 8
            </div>
            <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}><OutlineCTA theme={theme}>Copy</OutlineCTA></div>
              <div style={{ flex: 1 }}><AccentCTA theme={theme}>Share</AccentCTA></div>
            </div>
          </div>

          <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${theme.border}`,
            display: 'flex', justifyContent: 'space-between',
            fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5 }}>
            <span>NEXT RESET</span><span style={{ color: theme.accent }}>14H 23M</span>
          </div>
        </div>
      </div>
    </DScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════
//   ROOKIE LEADERBOARD — D-S5
// ═══════════════════════════════════════════════════════════

function DRookieLeaderboard({ theme, nav, mode = 'rookie' }) {
  const [tab, setTab] = React.useState('today');
  const rows = Array.from({ length: 20 }).map((_, i) => {
    const r = String(i + 1).padStart(3, '0');
    const names = ['hyperliq.sol','alpha.king','glass.node','delta.one','vwap.nasa',
      'funding.rate','orderflow','long.only','perp.god','mm.maker','sniper.eth',
      'silentbid','quietfeet','daykeeper','voltage','sigma.male','momentum',
      'rebreak','tradertank','btc.max'];
    const pl = (98 - i * 4.2).toFixed(2);
    const pct = (24.8 - i * 1.1).toFixed(1);
    return [
      `#${r}`, names[i], `${i + 7}d`, `+$${pl}`, `+${pct}%`,
    ];
  });
  return (
    <DScreenWrapper theme={theme} mode={mode} active="leaderboard" nav={nav} padding="0">
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '40px 48px' }}>
          <Kicker theme={theme}>{mode === 'pro' ? 'RANKINGS · LIVE' : 'LEADERBOARD · LIVE'}</Kicker>
          <Headline theme={theme} size={36} style={{ marginTop: 12 }}>
            {mode === 'pro' ? 'Pro Board' : 'Today\u2019s Board'}
          </Headline>
          <Body theme={theme} style={{ marginTop: 8, fontSize: 13 }}>
            {mode === 'pro' ? 'Ongoing — no reset. Score, not luck.' : 'Resets at midnight. Win the day, not the week.'}
          </Body>

          <div style={{ marginTop: 24 }}>
            <HairTabs theme={theme} value={tab} onChange={setTab} options={[
              { value: 'today',    label: 'Today' },
              { value: 'all-time', label: 'All-time' },
              { value: 'streak',   label: 'My streak' },
            ]}/>
          </div>

          <div style={{ marginTop: 18 }}>
            {tab !== 'streak' ? (
              <DTable theme={theme}
                onRowClick={() => nav.goto(mode === 'pro' ? 'pro-profile-other' : 'rookie-profile-other')}
                accent={theme.accent}
                headers={['RANK','TRADER','STREAK','P&L TODAY','%']}
                rows={rows}/>
            ) : (
              <div>
                <Kicker theme={theme}>LAST 30 DAYS</Kicker>
                <div style={{ marginTop: 14, display: 'grid',
                  gridTemplateColumns: 'repeat(10, 1fr)', gap: 6 }}>
                  {Array.from({ length: 30 }).map((_, i) => {
                    const v = i % 5 === 3 ? -1 : 1;
                    return <div key={i} style={{
                      aspectRatio: '1',
                      background: v > 0 ? theme.accent : '#F87171',
                    }}/>;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <DRightPanel theme={theme} width={300}>
          <Kicker theme={theme}>YOUR POSITION</Kicker>
          <div style={{ marginTop: 12, padding: 14,
            border: `1px solid ${theme.accent}`, borderRadius: 10,
            background: theme.accent + '10' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: theme.accent,
              letterSpacing: 1.2, marginBottom: 6 }}>#047 · YOU</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: theme.text }}>
              @pikerkid
            </div>
            <div style={{ marginTop: 6, fontFamily: FONT_MONO, fontSize: 11,
              color: '#4ADE80', letterSpacing: 0.5 }}>+$34.20 · +34.2%</div>
          </div>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${theme.border}` }}>
            <Kicker theme={theme}>STREAK STATS</Kicker>
            <div style={{ marginTop: 14, display: 'grid',
              gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <StatPair theme={theme} value="7" label="CURRENT"/>
              <StatPair theme={theme} value="14" label="BEST"/>
              <StatPair theme={theme} value="142" label="TRADES"/>
              <StatPair theme={theme} value="63%" label="WIN RATE"/>
            </div>
          </div>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${theme.border}` }}>
            <Kicker theme={theme}>RESET IN</Kicker>
            <div style={{ marginTop: 10, fontFamily: FONT_DISPLAY, fontSize: 36,
              color: theme.accent, fontWeight: 200, letterSpacing: -1 }}>14H 23M</div>
          </div>
        </DRightPanel>
      </div>
    </DScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════
//   ROOKIE PROFILE — D-S6 (3-column)
// ═══════════════════════════════════════════════════════════

function DRookieProfile({ theme, nav, mode = 'rookie' }) {
  return (
    <DScreenWrapper theme={theme} mode={mode} active="profile" nav={nav} padding="0">
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Identity column */}
        <div style={{ width: 280, padding: '40px 28px',
          borderRight: `1px solid ${theme.border}` }}>
          <Monogram theme={theme} letter="P" size={72}/>
          <div style={{ marginTop: 18, fontFamily: FONT_DISPLAY, fontSize: 22,
            color: theme.text, letterSpacing: -0.4 }}>@pikerkid</div>
          <div style={{ marginTop: 10, display: 'inline-flex',
            padding: '4px 10px', border: `1px solid ${theme.pillBorder}`,
            background: theme.pillBg, borderRadius: 999,
            fontFamily: FONT_MONO, fontSize: 9.5, color: theme.accent,
            letterSpacing: 1.5 }}>
            ◈ {mode === 'pro' ? 'PRO · DIAMOND' : 'ROOKIE'}
          </div>
          <div style={{ marginTop: 18, fontFamily: FONT_MONO, fontSize: 11,
            color: theme.textMut, letterSpacing: 1.5 }}>
            240 FOLLOWERS · 84 FOLLOWING
          </div>

          <div style={{ marginTop: 32, paddingTop: 20, borderTop: `1px solid ${theme.border}` }}>
            <Kicker theme={theme}>STREAK · LAST 30D</Kicker>
            <div style={{ marginTop: 12, display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
              {Array.from({ length: 30 }).map((_, i) => {
                const v = i % 5 === 3 ? -1 : 1;
                return <div key={i} style={{
                  aspectRatio: '1',
                  background: v > 0 ? theme.accent : '#F87171',
                }}/>;
              })}
            </div>
          </div>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${theme.border}` }}>
            <Kicker theme={theme}>FUND ME · ELIGIBLE</Kicker>
            <Body theme={theme} style={{ marginTop: 8, fontSize: 12 }}>
              Open Fund Me to accept real backers.
            </Body>
            <div style={{ marginTop: 12 }}>
              <OutlineCTA theme={theme} arrow
                onClick={() => nav.goto('fundme-trader')}>Open Fund Me</OutlineCTA>
            </div>
          </div>
        </div>

        {/* Stats column */}
        <div style={{ flex: 1, padding: '40px 48px' }}>
          <DSection theme={theme} kicker="OVERVIEW">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              <StatPair theme={theme} value="14"     label="STREAK"/>
              <StatPair theme={theme} value="+$84"   label="BEST DAY"/>
              <StatPair theme={theme} value="28/30"  label="PROFIT DAYS"/>
              <StatPair theme={theme} value="142"    label="TRADES"/>
            </div>
          </DSection>

          <DSection theme={theme} kicker="BADGES · 06 / 09">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {[
                { i: '◆', n: 'FIRST BLOOD', earned: true },
                { i: '◉', n: 'ON FIRE',     earned: true },
                { i: '◎', n: 'SNIPER',      earned: true },
                { i: '◇', n: 'VOLTAGE',     earned: true },
                { i: '◆', n: 'DIAMOND',     earned: true },
                { i: '★', n: 'DAY KING',    earned: true },
                { i: '✕', n: 'NO MERCY',    earned: false },
                { i: '◌', n: 'ICE',         earned: false },
              ].map((b, i) => (
                <div key={i} style={{
                  padding: 18, border: `1px solid ${theme.border}`,
                  textAlign: 'center', opacity: b.earned ? 1 : 0.35,
                }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22,
                    color: b.earned ? theme.accent : theme.textMut }}>{b.i}</div>
                  <div style={{ marginTop: 8, fontFamily: FONT_MONO, fontSize: 9.5,
                    color: theme.textSec, letterSpacing: 1.5 }}>{b.n}</div>
                </div>
              ))}
            </div>
          </DSection>
        </div>

        {/* Activity column */}
        <div style={{ width: 320, padding: '40px 28px',
          background: theme.surface, borderLeft: `1px solid ${theme.border}` }}>
          <Kicker theme={theme}>RECENT TRADES</Kicker>
          <div style={{ marginTop: 14 }}>
            {[
              ['BTC/USDT','LONG 3×','+$12.40'],
              ['ETH/USDT','LONG 2×','+$8.20'],
              ['SOL/USDT','SHORT 2×','-$3.10'],
              ['BNB/USDT','LONG 3×','+$6.40'],
              ['DOGE/USDT','LONG 4×','+$2.20'],
            ].map((r, i) => (
              <div key={i} style={{
                padding: '12px 0', borderBottom: `1px solid ${theme.border}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between',
                  fontFamily: FONT_DISPLAY, fontSize: 13, color: theme.text }}>
                  <span>{r[0]}</span>
                  <span style={{ color: r[2].startsWith('-') ? '#F87171' : '#4ADE80' }}>{r[2]}</span>
                </div>
                <div style={{ marginTop: 4, fontFamily: FONT_MONO, fontSize: 9.5,
                  color: theme.textMut, letterSpacing: 1.2 }}>{r[1]}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${theme.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 2 }}>
            <span>SOLANA · CONNECTED</span>
            <span style={{ color: '#4ADE80' }}>● LIVE</span>
          </div>
        </div>
      </div>
    </DScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════
//   PRO INTRO — D-S7
// ═══════════════════════════════════════════════════════════

function DProIntro({ theme, nav }) {
  return <DOnboardSplit theme={theme}
    left={<>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 64, fontWeight: 200,
        color: theme.text, letterSpacing: -1.2, lineHeight: 1.05 }}>
        You're entering<br/>Pro Mode.
      </div>
      <div style={{ marginTop: 24, fontFamily: FONT_DISPLAY, fontSize: 22,
        fontStyle: 'italic', color: theme.textSec, letterSpacing: -0.4 }}>
        Real capital. Real leaderboard.
      </div>
    </>}
    right={<>
      <Kicker theme={theme}>WHAT CHANGES</Kicker>
      {[
        ['◆', 'Trade with real funds', 'Connect your wallet · earn real returns.'],
        ['↑', 'A new global leaderboard', 'Piker Score replaces daily P&L. Built over weeks.'],
        ['◉', 'Fund Me unlocks', 'Real backers can stake your trades. You earn 15%.'],
      ].map((row, i) => (
        <div key={i} style={{
          padding: '18px 0', borderBottom: `1px solid ${theme.border}`,
          display: 'flex', gap: 16, alignItems: 'flex-start',
        }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22,
            color: theme.accent, width: 24, lineHeight: 1 }}>{row[0]}</div>
          <div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: theme.text }}>{row[1]}</div>
            <Body theme={theme} style={{ marginTop: 6, fontSize: 12.5 }}>{row[2]}</Body>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 32 }}>
        <PrimaryCTA theme={theme} onClick={() => nav.goto('pro-dashboard')}>Enter Pro Mode</PrimaryCTA>
      </div>
      <div onClick={() => nav.goto('rookie-dashboard')} style={{
        marginTop: 14, textAlign: 'center', cursor: 'pointer',
        fontFamily: FONT_MONO, fontSize: 11, color: theme.textMut, letterSpacing: 1.5,
      }}>← BACK TO ROOKIE</div>
    </>}/>;
}

// ═══════════════════════════════════════════════════════════
//   PRO DASHBOARD — D-S8
// ═══════════════════════════════════════════════════════════

function DProDashboard({ theme, nav }) {
  return (
    <DScreenWrapper theme={theme} mode="pro" active="home" nav={nav} padding="0">
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '40px 48px' }}>
          <DSection theme={theme} kicker="01 · PIKER SCORE">
            <BigNum theme={theme} number="72.4" size={88}/>
            <div style={{ marginTop: 18 }}>
              {[
                { label: 'WIN RATE',  pct: 67 },
                { label: 'SHARPE',    pct: 78 },
                { label: 'CONSISTENCY', pct: 82 },
                { label: 'RISK',      pct: 64 },
              ].map((b, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between',
                    fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut, letterSpacing: 1.5,
                    marginBottom: 4 }}>
                    <span>{b.label}</span><span style={{ color: theme.accent }}>{b.pct}</span>
                  </div>
                  <div style={{ height: 2, background: theme.border, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0,
                      width: b.pct + '%', background: theme.accent }}/>
                  </div>
                </div>
              ))}
            </div>
          </DSection>

          <DSection theme={theme} kicker="02 · PORTFOLIO">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <BigNum theme={theme} prefix="$" number="103,420" size={56}/>
              <span style={{ color: '#4ADE80', fontFamily: FONT_MONO, fontSize: 14 }}>+3.42%</span>
            </div>
            <Body theme={theme} style={{ marginTop: 10, fontSize: 13 }}>
              7 trades this week · 71% win rate
            </Body>
          </DSection>

          <DSection theme={theme} kicker="03 · OPEN POSITIONS">
            <DTable theme={theme}
              headers={['PAIR','DIR','SIZE','ENTRY','LIQ','P&L']}
              rows={[
                ['BTC/USDT','LONG 5×','$8,400','$58,243','$56,200','+$840.20'],
                ['ETH/USDT','SHORT 3×','$4,200','$3,142','$3,310','+$320.10'],
                ['SOL/USDT','LONG 8×','$2,800','$142.80','$138.20','-$85.40'],
              ]}/>
          </DSection>
        </div>

        <DRightPanel theme={theme}>
          <Kicker theme={theme}>PRO RANKINGS</Kicker>
          <div style={{ marginTop: 14 }}>
            {[
              ['001','hyperliq.sol','94.2'],['002','alpha.king','91.7'],
              ['003','glass.node','88.4'],['004','delta.one','85.1'],
              ['005','vwap.nasa','83.7'],
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: `1px solid ${theme.border}`,
                fontFamily: FONT_MONO, fontSize: 11, color: theme.textSec }}>
                <span>#{r[0]}  <span style={{ color: theme.text }}>{r[1]}</span></span>
                <span style={{ color: theme.accent }}>{r[2]}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <Kicker theme={theme}>WEEKLY CHALLENGE</Kicker>
            <div style={{ marginTop: 12, padding: 14,
              border: `1px solid ${theme.border}`, borderRadius: 10 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.text }}>
                Reach 75 Piker Score
              </div>
              <div style={{ marginTop: 8, fontFamily: FONT_MONO, fontSize: 9.5,
                color: theme.textMut, letterSpacing: 1.5 }}>
                CURRENT 72.4 · 4 DAYS LEFT
              </div>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <Kicker theme={theme}>FUND ME</Kicker>
            <div style={{ marginTop: 12, padding: 14,
              border: `1px solid ${theme.accent}`, borderRadius: 10,
              background: theme.accent + '10' }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.text }}>
                12 backers · $24,800
              </div>
              <div style={{ marginTop: 6, fontFamily: FONT_MONO, fontSize: 9.5,
                color: theme.accent, letterSpacing: 1.5 }}>
                YOU EARN $375 / WEEK
              </div>
            </div>
          </div>
        </DRightPanel>
      </div>
    </DScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════
//   PRO LEADERBOARD — D-S10
// ═══════════════════════════════════════════════════════════

function DProLeaderboard({ theme, nav }) {
  const [tab, setTab] = React.useState('rankings');
  const rows = Array.from({ length: 20 }).map((_, i) => {
    const r = String(i + 1).padStart(3, '0');
    const names = ['hyperliq.sol','alpha.king','glass.node','delta.one','vwap.nasa',
      'funding.rate','orderflow','long.only','perp.god','mm.maker','sniper.eth',
      'silentbid','quietfeet','daykeeper','voltage','sigma.male','momentum',
      'rebreak','tradertank','btc.max'];
    const tiers = ['ELITE','ELITE','DIAMOND','DIAMOND','DIAMOND','DIAMOND',
      'GOLD','GOLD','GOLD','GOLD','GOLD','SILVER','SILVER','SILVER','SILVER',
      'SILVER','BRONZE','BRONZE','BRONZE','BRONZE'];
    const score = (94.2 - i * 1.4).toFixed(1);
    const roi = (127.3 - i * 4.4).toFixed(1);
    return [`#${r}`, tiers[i], names[i], score, `+${roi}%`, i % 4 === 0 ? '●' : ''];
  });
  return (
    <DScreenWrapper theme={theme} mode="pro" active="leaderboard" nav={nav} padding="0">
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '40px 48px' }}>
          <Kicker theme={theme}>RANKINGS · LIVE</Kicker>
          <Headline theme={theme} size={36} style={{ marginTop: 12 }}>Pro Board</Headline>
          <Body theme={theme} style={{ marginTop: 8, fontSize: 13 }}>
            Ongoing — no reset. Score, not luck.
          </Body>

          <div style={{ marginTop: 24 }}>
            <HairTabs theme={theme} value={tab} onChange={setTab} options={[
              { value: 'rankings', label: 'Rankings' },
              { value: 'all-time', label: 'All-time' },
              { value: 'league',   label: 'My league' },
            ]}/>
          </div>

          {tab !== 'league' ? (
            <div style={{ marginTop: 18 }}>
              <DTable theme={theme} accent={theme.accent}
                onRowClick={() => nav.goto('pro-profile-other')}
                headers={['RANK','TIER','TRADER','PIKER SCORE','ROI','FUND ME']}
                rows={rows}/>
            </div>
          ) : (
            <div style={{ marginTop: 28, maxWidth: 520 }}>
              <Kicker theme={theme}>CREATE A LEAGUE</Kicker>
              <Body theme={theme} style={{ marginTop: 14, fontSize: 13 }}>
                No league yet. Start one and invite your crew via a share link.
              </Body>
              <div style={{ marginTop: 18 }}>
                <OutlineCTA theme={theme} arrow>Create a league</OutlineCTA>
              </div>
              <div style={{ marginTop: 28, fontFamily: FONT_MONO, fontSize: 9.5,
                color: theme.textMut, letterSpacing: 2, textAlign: 'center' }}>
                — OR JOIN WITH A CODE —
              </div>
              <div style={{ marginTop: 18, display: 'flex', alignItems: 'baseline', gap: 8,
                paddingBottom: 10, borderBottom: `1px solid ${theme.border}` }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 24,
                  color: theme.textMut, letterSpacing: -0.5 }}>@</span>
                <input placeholder="enter league code" style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  fontFamily: FONT_DISPLAY, fontSize: 22, color: theme.text,
                  letterSpacing: -0.4, padding: 0, caretColor: theme.accent,
                }}/>
              </div>
              <div style={{ marginTop: 18 }}>
                <AccentCTA theme={theme}>Join</AccentCTA>
              </div>
            </div>
          )}
        </div>

        <DRightPanel theme={theme} width={300}>
          <Kicker theme={theme}>YOUR STATS</Kicker>
          <div style={{ marginTop: 14, padding: 14,
            border: `1px solid ${theme.accent}`, borderRadius: 10,
            background: theme.accent + '10' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: theme.accent,
              letterSpacing: 1.2, marginBottom: 6 }}>#047 · DIAMOND</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: theme.text }}>
              @pikerkid
            </div>
            <div style={{ marginTop: 6, fontFamily: FONT_MONO, fontSize: 11,
              color: theme.accent, letterSpacing: 0.5 }}>SCORE 72.4 · ROI +34.2%</div>
          </div>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${theme.border}` }}>
            <Kicker theme={theme}>SCORE BREAKDOWN</Kicker>
            <div style={{ marginTop: 14, display: 'grid',
              gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <StatPair theme={theme} value="67%" label="WIN RATE"/>
              <StatPair theme={theme} value="2.4" label="SHARPE"/>
              <StatPair theme={theme} value="82" label="CONSISTENCY"/>
              <StatPair theme={theme} value="64" label="RISK"/>
            </div>
          </div>
        </DRightPanel>
      </div>
    </DScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════
//   PRO PROFILE — D-S11 (3-column with equity curve)
// ═══════════════════════════════════════════════════════════

function DProProfile({ theme, nav }) {
  return (
    <DScreenWrapper theme={theme} mode="pro" active="profile" nav={nav} padding="0">
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: 280, padding: '40px 28px',
          borderRight: `1px solid ${theme.border}` }}>
          <Monogram theme={theme} letter="P" size={72}/>
          <div style={{ marginTop: 18, fontFamily: FONT_DISPLAY, fontSize: 22,
            color: theme.text, letterSpacing: -0.4 }}>@pikerkid</div>
          <BigNum theme={theme} number="72.4" size={56} style={{ marginTop: 14 }}/>
          <div style={{ marginTop: 6, fontFamily: FONT_MONO, fontSize: 10,
            color: theme.textMut, letterSpacing: 2 }}>PIKER SCORE</div>
          <div style={{ marginTop: 14, display: 'inline-flex',
            padding: '4px 10px', border: `1px solid ${theme.pillBorder}`,
            background: theme.pillBg, borderRadius: 999,
            fontFamily: FONT_MONO, fontSize: 9.5, color: theme.accent,
            letterSpacing: 1.5 }}>◆ DIAMOND · #047</div>
          <div style={{ marginTop: 24, fontFamily: FONT_MONO, fontSize: 11,
            color: theme.textMut, letterSpacing: 1.5 }}>
            1.2K FOLLOWERS · 84 FOLLOWING
          </div>
        </div>

        <div style={{ flex: 1, padding: '40px 48px' }}>
          <DSection theme={theme} kicker="EQUITY CURVE · 30D">
            <CandleChart theme={theme} height={240} seed={5}/>
          </DSection>

          <DSection theme={theme} kicker="BADGES · 08 / 12">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {['◆','◉','◎','◇','◆','★','✕','◌'].map((g, i) => (
                <div key={i} style={{
                  padding: 18, border: `1px solid ${theme.border}`, textAlign: 'center',
                  opacity: i < 6 ? 1 : 0.35,
                }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22,
                    color: i < 6 ? theme.accent : theme.textMut }}>{g}</div>
                </div>
              ))}
            </div>
          </DSection>
        </div>

        <div style={{ width: 320, padding: '40px 28px',
          background: theme.surface, borderLeft: `1px solid ${theme.border}` }}>
          <Kicker theme={theme}>PERFORMANCE</Kicker>
          <div style={{ marginTop: 14, display: 'grid',
            gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <StatPair theme={theme} value="67%"  label="WIN RATE"/>
            <StatPair theme={theme} value="2.4"  label="SHARPE"/>
            <StatPair theme={theme} value="+34.2%" label="ROI"/>
            <StatPair theme={theme} value="142"  label="TRADES"/>
          </div>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${theme.border}` }}>
            <Kicker theme={theme}>FUND ME</Kicker>
            <div style={{ marginTop: 12, padding: 14,
              border: `1px solid ${theme.accent}`, borderRadius: 10,
              background: theme.accent + '10' }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.text }}>
                12 backers · $24,800
              </div>
              <div style={{ marginTop: 6, fontFamily: FONT_MONO, fontSize: 9.5,
                color: theme.accent, letterSpacing: 1.5 }}>
                YOU EARN $375 / WEEK
              </div>
            </div>
          </div>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${theme.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 2 }}>
            <span>SOLANA · CONNECTED</span>
            <span style={{ color: '#4ADE80' }}>● LIVE</span>
          </div>
        </div>
      </div>
    </DScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════
//   FUND ME · TRADER — D-S12
// ═══════════════════════════════════════════════════════════

function DFundMeTrader({ theme, nav }) {
  return (
    <DScreenWrapper theme={theme} mode="pro" active="profile" nav={nav} padding="0">
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: 480, padding: '48px 40px',
          borderRight: `1px solid ${theme.border}` }}>
          <Kicker theme={theme}>FUND ME · TRADER</Kicker>
          <Headline theme={theme} size={32} style={{ marginTop: 14 }}>
            Managing twelve backers.
          </Headline>
          <Body theme={theme} style={{ marginTop: 14, fontSize: 14 }}>
            Total deposited: $24,800. Profits split automatically each Friday at 00:00 UTC.
          </Body>

          <div style={{ marginTop: 36 }}>
            <Kicker theme={theme}>PROFIT SPLIT · 80 / 15 / 5</Kicker>
            <div style={{ marginTop: 14, display: 'flex', height: 56,
              border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
              <div style={{ width: '80%', background: '#4ADE8020',
                borderRight: `1px solid ${theme.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FONT_DISPLAY, fontSize: 14, color: '#4ADE80' }}>BACKERS · 80%</div>
              <div style={{ width: '15%', background: theme.accent + '22',
                borderRight: `1px solid ${theme.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FONT_MONO, fontSize: 10, color: theme.accent, letterSpacing: 1 }}>YOU 15%</div>
              <div style={{ width: '5%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FONT_MONO, fontSize: 9, color: theme.textMut }}>5%</div>
            </div>
          </div>

          <div style={{ marginTop: 36 }}>
            <Kicker theme={theme}>CONTROLS</Kicker>
            <div style={{ marginTop: 14 }}>
              <OutlineCTA theme={theme}>Pause new deposits</OutlineCTA>
            </div>
            <div style={{ marginTop: 12 }}>
              <OutlineCTA theme={theme}>Adjust split</OutlineCTA>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: '48px 40px' }}>
          <Kicker theme={theme}>BACKERS · 12</Kicker>
          <div style={{ marginTop: 18 }}>
            <DTable theme={theme} accent={theme.text}
              headers={['NAME','AMOUNT','EARNINGS','JOIN DATE']}
              rows={[
                ['@whale.eth',    '$5,000', '+$420.30', 'MAR 12'],
                ['@vault.sol',    '$3,500', '+$294.10', 'MAR 14'],
                ['@longterm',     '$3,000', '+$251.20', 'MAR 18'],
                ['@quietmoney',   '$2,500', '+$209.80', 'MAR 20'],
                ['@sigma',        '$2,200', '+$183.40', 'MAR 22'],
                ['@dca.bot',      '$2,000', '+$168.10', 'MAR 24'],
                ['@silenthand',   '$1,800', '+$151.20', 'MAR 26'],
                ['@compound',     '$1,500', '+$126.40', 'MAR 28'],
                ['@hodlbro',      '$1,200', '+$100.80', 'APR 02'],
                ['@curiouscash',  '$900',   '+$75.40',  'APR 06'],
                ['@first.timer',  '$700',   '+$58.20',  'APR 09'],
                ['@new.backer',   '$500',   '+$41.80',  'APR 14'],
              ]}/>
          </div>
        </div>
      </div>
    </DScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════
//   FUND ME · BACKER — D-S13
// ═══════════════════════════════════════════════════════════

function DFundMeBacker({ theme, nav }) {
  const [amt, setAmt] = React.useState('500');
  const Quick = ({ v }) => (
    <div onClick={() => setAmt(v)} style={{
      padding: '10px 0', textAlign: 'center', cursor: 'pointer',
      border: `1px solid ${amt === v ? theme.accent : theme.border}`,
      borderRadius: 8, fontFamily: FONT_MONO, fontSize: 11,
      color: amt === v ? theme.accent : theme.textSec, letterSpacing: 1.2,
    }}>${v}</div>
  );
  return (
    <DScreenWrapper theme={theme} mode="pro" active="profile" nav={nav} padding="0">
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '48px 56px',
          borderRight: `1px solid ${theme.border}` }}>
          <Kicker theme={theme}>FUND ME · BACK A TRADER</Kicker>
          <div style={{
            marginTop: 24, padding: 28, border: `1px solid ${theme.border}`,
            borderRadius: 14, display: 'flex', gap: 22, alignItems: 'center',
          }}>
            <Monogram theme={theme} letter="H" size={64}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24,
                color: theme.text, letterSpacing: -0.4 }}>@hyperliq.sol</div>
              <div style={{ marginTop: 6, fontFamily: FONT_MONO, fontSize: 10,
                color: theme.accent, letterSpacing: 1.5 }}>ELITE · #001 · SCORE 94.2</div>
              <div style={{ marginTop: 8, fontFamily: FONT_DISPLAY, fontSize: 13,
                color: theme.textSec, fontStyle: 'italic' }}>
                "Disciplined SOL perp scalping. 14-day rolling Sharpe 2.8."
              </div>
            </div>
          </div>

          <div style={{ marginTop: 36 }}>
            <Kicker theme={theme}>HOW MUCH</Kicker>
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 8,
              paddingBottom: 12, borderBottom: `1px solid ${theme.accent}` }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 36,
                color: theme.textMut, fontWeight: 300 }}>$</span>
              <input value={amt} onChange={e => setAmt(e.target.value)} style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 300,
                color: theme.text, padding: 0, caretColor: theme.accent, minWidth: 0,
              }}/>
              <span style={{ fontFamily: FONT_MONO, fontSize: 12,
                color: theme.textMut, letterSpacing: 2 }}>USDC</span>
            </div>
            <div style={{ marginTop: 14, display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              <Quick v="100"/><Quick v="500"/><Quick v="1000"/><Quick v="5000"/>
            </div>
          </div>

          <div style={{ marginTop: 28, fontFamily: FONT_MONO, fontSize: 10,
            color: theme.textMut, letterSpacing: 1.5 }}>
            ESTIMATED RETURN · WEEKLY <span style={{ color: '#4ADE80' }}>+$5.60</span> · 1.12%
          </div>
        </div>

        <div style={{ width: 380, padding: '48px 32px', background: theme.surface }}>
          <Kicker theme={theme}>PROFIT SPLIT</Kicker>
          <div style={{ marginTop: 14, display: 'flex', height: 48,
            border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
            <div style={{ width: '80%', background: '#4ADE8020',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT_DISPLAY, fontSize: 12, color: '#4ADE80' }}>YOU 80%</div>
            <div style={{ width: '15%', background: theme.accent + '22',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT_MONO, fontSize: 9, color: theme.accent }}>15%</div>
            <div style={{ width: '5%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT_MONO, fontSize: 8, color: theme.textMut }}>5%</div>
          </div>
          <Body theme={theme} style={{ marginTop: 12, fontSize: 12 }}>
            You keep 80%. Trader earns 15%. Piker takes 5% protocol fee.
          </Body>

          <div style={{ marginTop: 32, paddingTop: 22, borderTop: `1px solid ${theme.border}` }}>
            <Kicker theme={theme}>SOLANA · USDC</Kicker>
            <Body theme={theme} style={{ marginTop: 8, fontSize: 12 }}>
              Funds held in escrow on Solana. Withdraw on Friday at 00:00 UTC.
            </Body>
          </div>

          <div style={{ marginTop: 32 }}>
            <AccentCTA theme={theme}>Confirm · ${amt} USDC</AccentCTA>
          </div>
        </div>
      </div>
    </DScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════
//   BACKER DASHBOARD — D-S-NEW-5
// ═══════════════════════════════════════════════════════════

function DBackerDashboard({ theme, nav }) {
  return (
    <DScreenWrapper theme={theme} mode="pro" active="profile" nav={nav} padding="0">
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: 480, padding: '48px 40px',
          borderRight: `1px solid ${theme.border}` }}>
          <Kicker theme={theme}>BACKING</Kicker>
          <Headline theme={theme} size={32} style={{ marginTop: 14 }}>@hyperliq.sol</Headline>
          <Body theme={theme} style={{ marginTop: 12, fontSize: 13 }}>
            Your capital is deployed. You earn fifteen percent of their profits.
          </Body>

          <div style={{ marginTop: 32 }}>
            <Kicker theme={theme}>YOUR POSITION</Kicker>
            <div style={{ marginTop: 14 }}>
              <HairlineList theme={theme}>
                <HairlineRow theme={theme}>
                  <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.textSec }}>Deployed</span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: theme.text }}>$250.00 USDC</span>
                </HairlineRow>
                <HairlineRow theme={theme}>
                  <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.textSec }}>Current value</span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: '#4ADE80' }}>$252.80</span>
                </HairlineRow>
                <HairlineRow theme={theme}>
                  <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.textSec }}>Earnings · week</span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: '#4ADE80' }}>+$2.80</span>
                </HairlineRow>
                <HairlineRow theme={theme}>
                  <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.textSec }}>Withdraw</span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5 }}>AFTER WEEK ENDS</span>
                </HairlineRow>
              </HairlineList>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <OutlineCTA theme={theme}>Withdraw queue</OutlineCTA>
          </div>

          <div style={{ marginTop: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 2 }}>
            <span>SOLANA · ESCROW LOCKED</span>
            <span style={{ color: '#4ADE80' }}>● LIVE</span>
          </div>
        </div>

        <div style={{ flex: 1, padding: '48px 40px' }}>
          <Kicker theme={theme}>TRADER ACTIVITY · LIVE</Kicker>
          <div style={{ marginTop: 18 }}>
            <DTable theme={theme} accent={theme.text}
              headers={['PAIR','DIR','P&L','TIME']}
              rows={[
                ['BTC/USDT','LONG 5×','+$840.20','2H AGO'],
                ['ETH/USDT','SHORT 3×','+$320.10','3H AGO'],
                ['SOL/USDT','LONG 8×','-$85.40','4H AGO'],
                ['BNB/USDT','LONG 4×','+$124.80','6H AGO'],
                ['DOGE/USDT','LONG 6×','+$48.20','8H AGO'],
                ['AVAX/USDT','SHORT 4×','+$78.40','12H AGO'],
              ]}/>
          </div>

          <div style={{ marginTop: 32 }}>
            <Kicker theme={theme}>TRADER STATS</Kicker>
            <div style={{ marginTop: 14, display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
              <StatPair theme={theme} value="94.2" label="SCORE"/>
              <StatPair theme={theme} value="71%" label="WIN RATE"/>
              <StatPair theme={theme} value="2.8" label="SHARPE"/>
              <StatPair theme={theme} value="+127%" label="YTD"/>
            </div>
          </div>
        </div>
      </div>
    </DScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════
//   SETTINGS — D-S-NEW-1
// ═══════════════════════════════════════════════════════════

function DSettings({ theme, nav }) {
  const Section = ({ kicker, children }) => (
    <div style={{ marginBottom: 36 }}>
      <Kicker theme={theme}>{kicker}</Kicker>
      <div style={{ marginTop: 14 }}>
        <HairlineList theme={theme}>{children}</HairlineList>
      </div>
    </div>
  );
  const Row = ({ label, value, on }) => (
    <HairlineRow theme={theme} padding="18px 4px">
      <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 15, color: theme.text }}>{label}</span>
      <span style={{ fontFamily: FONT_MONO, fontSize: 11,
        color: on === undefined ? theme.accent : (on ? theme.accent : theme.textMut),
        letterSpacing: 1.8, fontWeight: 600 }}>{value} {on === undefined && '→'}</span>
    </HairlineRow>
  );
  return (
    <DScreenWrapper theme={theme} mode="rookie" active="profile" nav={nav}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 0 80px' }}>
        <Kicker theme={theme}>SETTINGS</Kicker>
        <Headline theme={theme} size={36} style={{ marginTop: 14, marginBottom: 36 }}>
          Account &amp; preferences
        </Headline>

        <Section kicker="ACCOUNT">
          <Row label="Username" value="@pikerkid"/>
          <Row label="Wallet"   value="0x1a2b…3c4d"/>
          <Row label="Email"    value="user@email.com"/>
        </Section>

        <Section kicker="PRIVACY">
          <Row label="Trade history"     value="PUBLIC" on={true}/>
          <Row label="Profile visibility" value="PUBLIC" on={true}/>
          <Row label="Show in leaderboard" value="PUBLIC" on={true}/>
        </Section>

        <Section kicker="NOTIFICATIONS">
          <Row label="Trade alerts" value="ON"  on={true}/>
          <Row label="Daily reset"  value="ON"  on={true}/>
          <Row label="Leaderboard moves" value="ON" on={true}/>
          <Row label="Backer activity"   value="OFF" on={false}/>
        </Section>

        <Section kicker="DANGER ZONE">
          <Row label="Reset account" value="→"/>
          <Row label="Delete account" value="→"/>
        </Section>
      </div>
    </DScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════
//   DISCOVER — D-S-NEW-2
// ═══════════════════════════════════════════════════════════

function DDiscover({ theme, nav }) {
  const traders = [
    ['H','@hyperliq.sol','ELITE','94.2'],
    ['A','@alpha.king','ELITE','91.7'],
    ['G','@glass.node','DIAMOND','88.4'],
    ['D','@delta.one','DIAMOND','85.1'],
    ['V','@vwap.nasa','DIAMOND','83.7'],
    ['F','@funding.rate','DIAMOND','81.9'],
    ['O','@orderflow','GOLD','79.2'],
    ['L','@long.only','GOLD','77.8'],
    ['P','@perp.god','GOLD','76.4'],
    ['M','@mm.maker','GOLD','75.1'],
    ['S','@sniper.eth','SILVER','71.3'],
    ['Q','@quietfeet','SILVER','68.4'],
  ];
  return (
    <DScreenWrapper theme={theme} mode="rookie" active="leaderboard" nav={nav} padding="0">
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '40px 48px' }}>
          <Kicker theme={theme}>DISCOVER</Kicker>
          <Headline theme={theme} size={36} style={{ marginTop: 12 }}>Find traders.</Headline>
          <div style={{ marginTop: 24, display: 'flex', gap: 10, alignItems: 'baseline',
            paddingBottom: 12, borderBottom: `1px solid ${theme.border}` }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 18,
              color: theme.textMut }}>⌕</span>
            <input placeholder="search traders…" style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: FONT_DISPLAY, fontSize: 18, color: theme.text,
              caretColor: theme.accent, padding: 0, letterSpacing: -0.3,
            }}/>
          </div>

          <div style={{ marginTop: 32 }}>
            <Kicker theme={theme}>SUGGESTED · FOLLOW</Kicker>
            <div style={{ marginTop: 14 }}>
              {traders.map((t, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '14px 0', borderBottom: `1px solid ${theme.border}`,
                }}>
                  <div style={{
                    width: 40, height: 40, border: `1px solid ${theme.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: FONT_DISPLAY, fontSize: 16, color: theme.text,
                  }}>{t[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.text }}>{t[1]}</div>
                    <div style={{ marginTop: 4, fontFamily: FONT_MONO, fontSize: 9.5,
                      color: theme.textMut, letterSpacing: 1.5 }}>{t[2]} · {t[3]} SCORE</div>
                  </div>
                  <div style={{
                    fontFamily: FONT_MONO, fontSize: 10.5, color: theme.accent,
                    letterSpacing: 1.5, cursor: 'pointer',
                  }}>FOLLOW →</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DRightPanel theme={theme} width={320}>
          <Kicker theme={theme}>TOP TODAY · ROOKIE</Kicker>
          <div style={{ marginTop: 12 }}>
            {[
              ['001','hyperliq.sol','+$98'],
              ['002','alpha.king','+$84'],
              ['003','sol.army','+$72'],
              ['004','quietfeet','+$68'],
              ['005','glass.node','+$60'],
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                padding: '8px 0', borderBottom: `1px solid ${theme.border}`,
                fontFamily: FONT_MONO, fontSize: 11, color: theme.textSec }}>
                <span>#{r[0]}  <span style={{ color: theme.text }}>{r[1]}</span></span>
                <span style={{ color: '#4ADE80' }}>{r[2]}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${theme.border}` }}>
            <Kicker theme={theme} color="#E8C858">TOP OVERALL · PRO</Kicker>
            <div style={{ marginTop: 12 }}>
              {[
                ['001','hyperliq.sol','94.2'],
                ['002','alpha.king','91.7'],
                ['003','glass.node','88.4'],
                ['004','delta.one','85.1'],
                ['005','vwap.nasa','83.7'],
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                  padding: '8px 0', borderBottom: `1px solid ${theme.border}`,
                  fontFamily: FONT_MONO, fontSize: 11, color: theme.textSec }}>
                  <span>#{r[0]}  <span style={{ color: theme.text }}>{r[1]}</span></span>
                  <span style={{ color: '#E8C858' }}>{r[2]}</span>
                </div>
              ))}
            </div>
          </div>
        </DRightPanel>
      </div>
    </DScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════
//   NOTIFICATIONS — D-S14
// ═══════════════════════════════════════════════════════════

function DNotifications({ theme, nav }) {
  const groups = [
    { label: 'TODAY · APR 19', items: [
      { g: '◉', t: 'Streak extended to Day 8', s: 'Keep it going.', time: '14:42', to: 'rookie-dashboard' },
      { g: '↑', t: 'Leaderboard move', s: 'You moved from #847 → #312.', time: '12:08', to: 'rookie-leaderboard' },
      { g: '◎', t: 'Badge unlocked · Sniper', s: 'Three wins in a row under 30 min each.', time: '11:24', to: 'rookie-profile' },
    ]},
    { label: 'YESTERDAY · APR 18', items: [
      { g: '◇', t: 'Reset warning', s: '$100 resets in 30 minutes.', time: '23:30', to: 'rookie-trade' },
      { g: '◆', t: 'Fund Me · new backer', s: '@whale.eth deposited $500.', time: '18:14', to: 'fundme-trader' },
    ]},
    { label: 'EARLIER · APR 17', items: [
      { g: '◈', t: 'First Blood badge', s: 'You earned First Blood.', time: '09:42', to: 'pro-profile' },
    ]},
  ];
  return (
    <DScreenWrapper theme={theme} mode="rookie" active="home" nav={nav}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 0 80px' }}>
        <Kicker theme={theme}>INBOX · 3 UNREAD</Kicker>
        <Headline theme={theme} size={36} style={{ marginTop: 12, marginBottom: 32 }}>Notifications</Headline>

        {groups.map((g, gi) => (
          <div key={gi} style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 9.5,
              color: theme.textMut, letterSpacing: 2, marginBottom: 12 }}>{g.label}</div>
            <HairlineList theme={theme}>
              {g.items.map((it, i) => (
                <HairlineRow key={i} theme={theme} onClick={() => nav.goto(it.to)} padding="18px 4px">
                  <span style={{
                    width: 28, fontFamily: FONT_DISPLAY, fontSize: 18,
                    color: theme.accent,
                  }}>{it.g}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: theme.text }}>{it.t}</div>
                    <div style={{ marginTop: 4, fontFamily: FONT_DISPLAY, fontSize: 13, color: theme.textSec }}>{it.s}</div>
                  </div>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 10,
                    color: theme.textMut, letterSpacing: 1.2 }}>APR 19 · {it.time}</span>
                </HairlineRow>
              ))}
            </HairlineList>
          </div>
        ))}
      </div>
    </DScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════
//   SOCIAL FEED — D-S-NEW-6
// ═══════════════════════════════════════════════════════════

function DSocialFeed({ theme, nav }) {
  const items = Array.from({ length: 12 }).map((_, i) => {
    const names = ['hyperliq.sol','alpha.king','glass.node','delta.one','vwap.nasa',
      'orderflow','long.only','perp.god','sniper.eth','silentbid','quietfeet','daykeeper'];
    const tiers = ['ELITE','ELITE','DIAMOND','DIAMOND','DIAMOND','GOLD','GOLD','GOLD',
      'SILVER','SILVER','SILVER','BRONZE'];
    const pairs = ['BTC/USDT','ETH/USDT','SOL/USDT','BNB/USDT','DOGE/USDT','AVAX/USDT'];
    const dirs = ['LONG · 10×','LONG · 5×','SHORT · 8×','LONG · 3×','LONG · 4×','SHORT · 2×'];
    const pl = ['+$840','+$320','-$85','+$124','+$48','+$78','+$210','+$66','-$22','+$54','+$140','+$28'];
    return {
      l: names[i][0].toUpperCase(),
      n: names[i], t: tiers[i],
      pair: pairs[i % pairs.length], dir: dirs[i % dirs.length],
      pl: pl[i], time: `${i + 1}H AGO`, live: i < 2,
    };
  });
  return (
    <DScreenWrapper theme={theme} mode="rookie" active="home" nav={nav} padding="0">
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '40px 48px' }}>
          <Kicker theme={theme}>LIVE FEED</Kicker>
          <Headline theme={theme} size={36} style={{ marginTop: 12 }}>Trades from traders you follow.</Headline>
          <div style={{ marginTop: 24 }}>
            {items.map((x, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                padding: '18px 4px', borderBottom: `1px solid ${theme.border}`,
              }}>
                <div style={{
                  width: 40, height: 40, border: `1px solid ${theme.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONT_DISPLAY, fontSize: 16, color: theme.text,
                }}>{x.l}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 10,
                    color: theme.textMut, letterSpacing: 1.5 }}>
                    @{x.n} · {x.t}
                  </div>
                  <div style={{ marginTop: 4, fontFamily: FONT_DISPLAY, fontSize: 16,
                    color: theme.text, letterSpacing: -0.2 }}>
                    {x.pair} · {x.dir}
                  </div>
                  <div style={{ marginTop: 4, fontFamily: FONT_MONO, fontSize: 11,
                    color: theme.textMut, letterSpacing: 0.8 }}>
                    Entry $58,240 · <span style={{ color: x.pl.startsWith('-') ? '#F87171' : '#4ADE80' }}>{x.pl}</span>
                    {x.live && <span style={{ marginLeft: 8, color: theme.accent }}>● LIVE</span>}
                  </div>
                </div>
                <span style={{ fontFamily: FONT_MONO, fontSize: 10,
                  color: theme.textMut, letterSpacing: 1.2 }}>{x.time}</span>
              </div>
            ))}
          </div>
        </div>

        <DRightPanel theme={theme} width={300}>
          <Kicker theme={theme}>WHO TO FOLLOW</Kicker>
          <div style={{ marginTop: 14 }}>
            {[
              ['S','@sniper.eth','SILVER'],
              ['Q','@quietfeet','SILVER'],
              ['D','@daykeeper','BRONZE'],
              ['V','@voltage','SILVER'],
              ['M','@momentum','BRONZE'],
            ].map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 0', borderBottom: `1px solid ${theme.border}`,
              }}>
                <div style={{
                  width: 32, height: 32, border: `1px solid ${theme.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONT_DISPLAY, fontSize: 13, color: theme.text,
                }}>{t[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, color: theme.text }}>{t[1]}</div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: theme.textMut, letterSpacing: 1.2 }}>{t[2]}</div>
                </div>
                <span style={{ fontFamily: FONT_MONO, fontSize: 10,
                  color: theme.accent, letterSpacing: 1.5, cursor: 'pointer' }}>FOLLOW</span>
              </div>
            ))}
          </div>
        </DRightPanel>
      </div>
    </DScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════
//   OTHER PROFILES — D-Rookie-Other / D-Pro-Other
// ═══════════════════════════════════════════════════════════

function DRookieProfileOther({ theme, nav }) {
  return <DProfileOther theme={theme} nav={nav} mode="rookie"/>;
}
function DProProfileOther({ theme, nav }) {
  return <DProfileOther theme={theme} nav={nav} mode="pro"/>;
}
function DProfileOther({ theme, nav, mode }) {
  return (
    <DScreenWrapper theme={theme} mode={mode} active="leaderboard" nav={nav} padding="0">
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: 320, padding: '48px 32px',
          borderRight: `1px solid ${theme.border}` }}>
          <Monogram theme={theme} letter="A" size={72}/>
          <div style={{ marginTop: 18, fontFamily: FONT_DISPLAY, fontSize: 24,
            color: theme.text, letterSpacing: -0.4 }}>@alpha.king</div>
          <div style={{ marginTop: 10, display: 'inline-flex',
            padding: '4px 10px', border: `1px solid ${theme.pillBorder}`,
            background: theme.pillBg, borderRadius: 999,
            fontFamily: FONT_MONO, fontSize: 9.5, color: theme.accent,
            letterSpacing: 1.5 }}>
            ◈ {mode === 'pro' ? 'ELITE · #002' : 'ROOKIE · #002'}
          </div>
          <div style={{ marginTop: 18, fontFamily: FONT_MONO, fontSize: 11,
            color: theme.textMut, letterSpacing: 1.5 }}>
            1.2K FOLLOWERS · 84 FOLLOWING
          </div>
          <div style={{ marginTop: 24 }}>
            <AccentCTA theme={theme}>Follow</AccentCTA>
          </div>
          {mode === 'pro' && (
            <div style={{ marginTop: 14 }}>
              <OutlineCTA theme={theme} arrow
                onClick={() => nav.goto('fundme-backer')}>Back this trader</OutlineCTA>
            </div>
          )}
        </div>

        <div style={{ flex: 1, padding: '48px 40px' }}>
          <DSection theme={theme} kicker="OVERVIEW">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              <StatPair theme={theme} value="14"     label="STREAK"/>
              <StatPair theme={theme} value="+$84"   label="BEST DAY"/>
              <StatPair theme={theme} value="28/30"  label="PROFIT DAYS"/>
              <StatPair theme={theme} value="142"    label="TRADES"/>
            </div>
          </DSection>

          <DSection theme={theme} kicker="STREAK · LAST 30D">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gap: 4 }}>
              {Array.from({ length: 30 }).map((_, i) => {
                const v = i % 5 === 3 ? -1 : 1;
                return <div key={i} style={{
                  aspectRatio: '1',
                  background: v > 0 ? theme.accent : '#F87171',
                }}/>;
              })}
            </div>
          </DSection>

          <DSection theme={theme} kicker="BADGES · 06 / 09">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 12 }}>
              {['◆','◉','◎','◇','◆','★','✕','◌'].map((g, i) => (
                <div key={i} style={{
                  padding: 14, border: `1px solid ${theme.border}`, textAlign: 'center',
                  opacity: i < 6 ? 1 : 0.35,
                }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18,
                    color: i < 6 ? theme.accent : theme.textMut }}>{g}</div>
                </div>
              ))}
            </div>
          </DSection>
        </div>
      </div>
    </DScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════
//   MILESTONE — D-S15
// ═══════════════════════════════════════════════════════════

function DMilestone({ theme, nav }) {
  return (
    <DScreenWrapper theme={theme} mode="pro" active="profile" nav={nav} padding="0">
      <div style={{
        flex: 1, minHeight: '100vh', position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48,
      }}>
        {/* Sunburst */}
        <svg viewBox="-100 -100 200 200" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          opacity: 0.08,
        }}>
          {Array.from({ length: 36 }).map((_, i) => (
            <line key={i} x1="0" y1="0"
              x2={120 * Math.cos(i * Math.PI / 18)}
              y2={120 * Math.sin(i * Math.PI / 18)}
              stroke={theme.accent} strokeWidth="0.4"/>
          ))}
        </svg>

        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 560 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11,
            color: theme.accent, letterSpacing: 4, marginBottom: 32 }}>
            TIER · UNLOCKED
          </div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 220, fontWeight: 200,
            color: theme.accent, letterSpacing: -8, lineHeight: 1 }}>◆</div>
          <div style={{ marginTop: 20, fontFamily: FONT_DISPLAY, fontSize: 80,
            color: theme.text, fontWeight: 200, letterSpacing: -2 }}>DIAMOND</div>
          <Body theme={theme} style={{ marginTop: 20, fontSize: 16 }}>
            You moved up a tier. Diamond traders see new things.
          </Body>

          <div style={{ marginTop: 48, display: 'grid',
            gridTemplateColumns: '1fr 1fr', gap: 14, textAlign: 'left' }}>
            {[
              ['◆', 'Higher leverage caps · 25×'],
              ['◉', 'Featured on Pro Board'],
              ['◎', 'Custom league creation'],
              ['◇', 'Early access · new pairs'],
            ].map((row, i) => (
              <div key={i} style={{
                padding: 18, border: `1px solid ${theme.border}`, borderRadius: 10,
                display: 'flex', gap: 12, alignItems: 'center',
              }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 20,
                  color: theme.accent }}>{row[0]}</span>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 14,
                  color: theme.textSec }}>{row[1]}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, display: 'inline-block', minWidth: 280 }}>
            <PrimaryCTA theme={theme}
              onClick={() => nav.goto('pro-trade')}>Continue Trading</PrimaryCTA>
          </div>
        </div>
      </div>
    </DScreenWrapper>
  );
}

// ─── Register everything ────────────────────────────────────
Object.assign(window, {
  DSidebar, DScreenWrapper, DRightPanel, DOnboardSplit, DTable, DOrderPanel,
  DOrderBook, DSection,
  // onboarding
  DOnboardA, DOnboardB, DOnboardC, DSignup, DUsername, DModeIntro,
  // rookie
  DRookieDashboard, DRookieTrade, DRookieSummary, DRookieLeaderboard, DRookieProfile,
  // pro
  DProIntro, DProDashboard, DProTrade, DProLeaderboard, DProProfile,
  // fund me
  DFundMeTrader, DFundMeBacker, DBackerDashboard,
  // shared / new
  DSettings, DDiscover, DNotifications, DSocialFeed,
  DRookieProfileOther, DProProfileOther,
  // milestone
  DMilestone,
});
