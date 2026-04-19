// new-screens.jsx — Additional screens + shared helpers.
// Strict adherence to restrained-kit: hairline borders, one accent,
// FONT_MONO uppercase kickers, no emoji, no shadows.

// ─── Shared: Order book strip ────────────────────────────────
function OrderBook({ theme, base = 142.50 }) {
  const asks = [
    { p: (base + 0.70).toFixed(2), q: 12.4 },
    { p: (base + 0.40).toFixed(2), q: 8.1 },
    { p: (base + 0.10).toFixed(2), q: 21.3 },
  ];
  const bids = [
    { p: (base - 0.12).toFixed(2), q: 34.2 },
    { p: (base - 0.40).toFixed(2), q: 15.8 },
    { p: (base - 0.60).toFixed(2), q: 9.4 },
  ];
  const spread = (parseFloat(asks[2].p) - parseFloat(bids[0].p)).toFixed(2);
  const Cell = ({ price, qty, color }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
      <span style={{ fontFamily: FONT_MONO, fontSize: 11, color, letterSpacing: 0.5 }}>${price}</span>
      <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 0.5 }}>{qty}</span>
    </div>
  );
  return (
    <div style={{ padding: '0 24px 18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8,
        fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut, letterSpacing: 2 }}>
        <span>ASKS</span><span>BIDS</span>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 18,
        borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`,
        padding: '6px 0',
      }}>
        <div>{asks.map((a, i) => <Cell key={i} price={a.p} qty={a.q} color="#F87171"/>)}</div>
        <div>{bids.map((b, i) => <Cell key={i} price={b.p} qty={b.q} color="#4ADE80"/>)}</div>
      </div>
      <div style={{ marginTop: 8, fontFamily: FONT_MONO, fontSize: 9.5,
        color: theme.textMut, letterSpacing: 1.5 }}>
        SPREAD · ${spread}
      </div>
    </div>
  );
}

// ─── Shared: TP / SL inputs ──────────────────────────────────
function TPSLFields({ theme, basePrice = 142.50 }) {
  const [tp, setTp] = React.useState((basePrice * 1.05).toFixed(2));
  const [sl, setSl] = React.useState((basePrice * 0.97).toFixed(2));
  const Field = ({ label, value, onChange, color }) => (
    <div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
        letterSpacing: 2, marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6,
        paddingBottom: 8, borderBottom: `1px solid ${color}` }}>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 400,
          color: theme.textMut, letterSpacing: -0.5 }}>$</span>
        <input value={value} onChange={e => onChange(e.target.value)} style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 400,
          color, letterSpacing: -0.5, padding: 0, caretColor: color, minWidth: 0,
        }}/>
      </div>
    </div>
  );
  return (
    <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 18 }}>
      <Field label="TAKE PROFIT" value={tp} onChange={setTp} color="#4ADE80"/>
      <Field label="STOP LOSS"   value={sl} onChange={setSl} color="#F87171"/>
    </div>
  );
}

// ─── Shared: Score impact line (Pro only, leverage > 10) ─────
function ScoreImpact({ theme, leverage }) {
  if (leverage <= 10) return null;
  return (
    <div style={{ marginTop: 14, fontFamily: FONT_MONO, fontSize: 9.5,
      color: theme.textMut, letterSpacing: 1.2 }}>
      SCORE IMPACT · LARGE POSITION MAY AFFECT YOUR SHARPE RATIO
    </div>
  );
}

// ─── Shared: Empty state ─────────────────────────────────────
function EmptyState({ theme, kicker, message, ctaLabel, onCta }) {
  return (
    <div style={{ padding: '32px 24px', textAlign: 'center' }}>
      <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut,
        letterSpacing: 2, marginBottom: 16 }}>{kicker}</div>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, color: theme.textSec,
        letterSpacing: -0.3, marginBottom: 20 }}>{message}</div>
      {ctaLabel && (
        <div style={{ display: 'inline-block' }}>
          <OutlineCTA theme={theme} arrow onClick={onCta}>{ctaLabel}</OutlineCTA>
        </div>
      )}
    </div>
  );
}

// ─── Shared: Text toggle (PUBLIC / PRIVATE / ON / OFF) ───────
function TextToggle({ theme, on, onLabel = 'ON', offLabel = 'OFF', onChange }) {
  return (
    <span onClick={() => onChange && onChange(!on)} style={{
      fontFamily: FONT_MONO, fontSize: 11, fontWeight: 600,
      color: on ? theme.accent : theme.textMut, letterSpacing: 1.8,
      cursor: 'pointer', textTransform: 'uppercase',
    }}>{on ? onLabel : offLabel}</span>
  );
}

// ─── Shared: Radio dot ──────────────────────────────────────
function RadioDot({ theme, on }) {
  return (
    <span style={{
      display: 'inline-block', width: 14, height: 14, borderRadius: 7,
      border: `1px solid ${on ? theme.accent : theme.border}`,
      position: 'relative',
    }}>
      {on && <span style={{
        position: 'absolute', inset: 3, borderRadius: 4, background: theme.accent,
      }}/>}
    </span>
  );
}

// ─── S-NEW-1 — Settings ──────────────────────────────────────
function Settings({ theme, nav }) {
  const [trades, setTrades]   = React.useState(true);
  const [profile, setProfile] = React.useState(true);
  const [board, setBoard]     = React.useState(true);
  const [streak, setStreak]   = React.useState(true);
  const [rank, setRank]       = React.useState(true);
  const [reset, setReset]     = React.useState(true);
  const [badge, setBadge]     = React.useState(true);
  const [fundme, setFundme]   = React.useState(true);
  const [posAlert, setPosAlert] = React.useState(false);
  const [defaultMode, setDefaultMode] = React.useState('rookie');

  const Row = ({ label, right }) => (
    <HairlineRow theme={theme}>
      <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14,
        color: theme.text, letterSpacing: -0.2 }}>{label}</span>
      {right}
    </HairlineRow>
  );
  const Arrow = ({ value }) => (
    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: theme.textSec,
        letterSpacing: 0.5 }}>{value}</span>
      <span style={{ fontFamily: FONT_MONO, fontSize: 14, color: theme.textMut }}>→</span>
    </span>
  );

  return (
    <RScreen theme={theme} navActive="profile" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<span onClick={() => nav.go('profile')} style={{
          fontFamily: FONT_MONO, fontSize: 18, color: theme.textSec,
          cursor: 'pointer', padding: '0 4px',
        }}>←</span>}/>

      <div style={{ padding: '8px 24px 24px' }}>
        <Kicker theme={theme}>SETTINGS</Kicker>
        <div style={{ marginTop: 12 }}>
          <Headline theme={theme} size={32}>Account &amp; preferences</Headline>
        </div>
      </div>

      {/* ACCOUNT */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut} style={{ marginBottom: 14 }}>ACCOUNT</Kicker>
        <HairlineList theme={theme}>
          <Row label="Username" right={<Arrow value="@pikerkid"/>}/>
          <Row label="Wallet"   right={<Arrow value="0x1a2b…3c4d"/>}/>
          <Row label="Email"    right={<Arrow value="user@email.com"/>}/>
        </HairlineList>
      </div>

      {/* PRIVACY */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut} style={{ marginBottom: 14 }}>PRIVACY</Kicker>
        <HairlineList theme={theme}>
          <Row label="Trade history"       right={<TextToggle theme={theme} on={trades}  onLabel="PUBLIC" offLabel="PRIVATE" onChange={setTrades}/>}/>
          <Row label="Profile visibility"  right={<TextToggle theme={theme} on={profile} onLabel="PUBLIC" offLabel="PRIVATE" onChange={setProfile}/>}/>
          <Row label="Show in leaderboard" right={<TextToggle theme={theme} on={board}   onLabel="PUBLIC" offLabel="PRIVATE" onChange={setBoard}/>}/>
        </HairlineList>
      </div>

      {/* NOTIFICATIONS */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut} style={{ marginBottom: 14 }}>NOTIFICATIONS</Kicker>
        <HairlineList theme={theme}>
          <Row label="Streak updates"   right={<TextToggle theme={theme} on={streak}   onChange={setStreak}/>}/>
          <Row label="Rank changes"     right={<TextToggle theme={theme} on={rank}     onChange={setRank}/>}/>
          <Row label="Reset warnings"   right={<TextToggle theme={theme} on={reset}    onChange={setReset}/>}/>
          <Row label="Badge unlocks"    right={<TextToggle theme={theme} on={badge}    onChange={setBadge}/>}/>
          <Row label="Fund Me activity" right={<TextToggle theme={theme} on={fundme}   onChange={setFundme}/>}/>
          <Row label="Position alerts"  right={<TextToggle theme={theme} on={posAlert} onChange={setPosAlert}/>}/>
        </HairlineList>
      </div>

      {/* MODE */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut} style={{ marginBottom: 14 }}>DEFAULT MODE</Kicker>
        <HairlineList theme={theme}>
          <HairlineRow theme={theme} onClick={() => setDefaultMode('rookie')}>
            <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.text }}>Rookie Mode</span>
            <RadioDot theme={theme} on={defaultMode === 'rookie'}/>
          </HairlineRow>
          <HairlineRow theme={theme} onClick={() => setDefaultMode('pro')}>
            <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.text }}>Pro Mode</span>
            <RadioDot theme={theme} on={defaultMode === 'pro'}/>
          </HairlineRow>
        </HairlineList>
        <div style={{ marginTop: 14, fontFamily: FONT_DISPLAY, fontSize: 12.5,
          color: theme.textSec, lineHeight: 1.5 }}>
          Controls which mode you land on when opening the app.
        </div>
      </div>

      {/* DANGER */}
      <div style={{ padding: '24px 24px 12px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={{ accent: '#F87171' }} color="#F87171" style={{ marginBottom: 14 }}>ACCOUNT</Kicker>
        <HairlineList theme={theme}>
          <HairlineRow theme={theme} onClick={() => {}}>
            <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14,
              color: '#F87171', letterSpacing: -0.2 }}>Delete account</span>
          </HairlineRow>
        </HairlineList>
      </div>

      {/* Footer */}
      <div style={{ padding: '20px 24px 28px' }}>
        <div style={{ textAlign: 'center', fontFamily: FONT_MONO, fontSize: 9.5,
          color: theme.textMut, letterSpacing: 2 }}>
          PIKER · v0.1.0 · SOLANA MAINNET
        </div>
      </div>
    </RScreen>
  );
}

// ─── S-NEW-2 — Discover / Search ─────────────────────────────
function Discover({ theme, nav }) {
  const [q, setQ] = React.useState('');
  const [follows, setFollows] = React.useState({});
  const all = [
    { n: 'hyperliq.sol', t: 'elite',   s: 94.2 },
    { n: 'alpha.king',   t: 'elite',   s: 91.7 },
    { n: 'glass.node',   t: 'diamond', s: 88.4 },
    { n: 'delta.one',    t: 'diamond', s: 85.1 },
    { n: 'orderflow',    t: 'gold',    s: 79.2 },
    { n: 'long.only',    t: 'gold',    s: 77.8 },
    { n: 'sol.army',     t: 'silver',  s: 64.3 },
    { n: 'btc.max',      t: 'silver',  s: 61.7 },
  ];
  const filtered = q
    ? all.filter(x => x.n.toLowerCase().includes(q.toLowerCase()))
    : all;

  const TraderRow = ({ x }) => {
    const isF = !!follows[x.n];
    return (
      <HairlineRow theme={theme} onClick={() => nav.goto(x.t === 'silver' ? 'rookie-profile-other' : 'pro-profile-other')}>
        <Monogram theme={theme} letter={x.n.charAt(0).toUpperCase()} size={40} accent={false}/>
        <div style={{ flex: 1, marginLeft: 14, minWidth: 0 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 500,
            color: theme.text, letterSpacing: -0.2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>@{x.n}</div>
          <div style={{ marginTop: 4, fontFamily: FONT_MONO, fontSize: 9.5,
            color: theme.textMut, letterSpacing: 1.5 }}>
            {x.t.toUpperCase()} · {x.s.toFixed(1)} SCORE
          </div>
        </div>
        <span onClick={(e) => { e.stopPropagation(); setFollows({ ...follows, [x.n]: !isF }); }}
          style={{
            fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600,
            color: isF ? theme.textMut : theme.accent, letterSpacing: 1.8, cursor: 'pointer',
          }}>{isF ? 'FOLLOWING' : 'FOLLOW →'}</span>
      </HairlineRow>
    );
  };

  return (
    <RScreen theme={theme} navActive="leaderboard" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}/>

      {/* Search input */}
      <div style={{ padding: '0 24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10,
          paddingBottom: 10, borderBottom: `1px solid ${theme.border}` }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 18, color: theme.textMut }}>⌕</span>
          <input value={q} onChange={e => setQ(e.target.value)}
            placeholder="search traders…"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 400,
              color: theme.text, letterSpacing: -0.4, padding: 0, caretColor: theme.accent,
            }}/>
        </div>
      </div>

      {/* Suggested */}
      <div style={{ padding: '0 24px 24px' }}>
        <SectionHead theme={theme} label="SUGGESTED · FOLLOW"/>
        <HairlineList theme={theme}>
          {filtered.map(x => <TraderRow key={x.n} x={x}/>)}
        </HairlineList>
        {filtered.length === 0 && (
          <EmptyState theme={theme} kicker="NO RESULTS"
            message="Try a different name."/>
        )}
      </div>

      {/* Top today rookie */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="TOP TODAY · ROOKIE"/>
        <HairlineList theme={theme}>
          {[
            { r: '001', n: 'alpha.king',  v: '+84.20' },
            { r: '002', n: 'moonshot',    v: '+62.10' },
            { r: '003', n: 'hodl.life',   v: '+48.90' },
          ].map(r => (
            <HairlineRow key={r.r} theme={theme} onClick={() => nav.goto('rookie-profile-other')}>
              <span style={{ width: 40, fontFamily: FONT_MONO, fontSize: 11,
                color: theme.accent, fontWeight: 700, letterSpacing: 0.5 }}>#{r.r}</span>
              <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14,
                color: theme.text, letterSpacing: -0.2 }}>@{r.n}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 12.5, color: '#4ADE80' }}>{r.v}</span>
            </HairlineRow>
          ))}
        </HairlineList>
      </div>

      {/* Top overall pro */}
      <div style={{ padding: '24px 24px 32px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="TOP OVERALL · PRO"/>
        <HairlineList theme={theme}>
          {[
            { r: '001', n: 'hyperliq.sol', t: 'elite',   s: 94.2 },
            { r: '002', n: 'alpha.king',   t: 'elite',   s: 91.7 },
            { r: '003', n: 'glass.node',   t: 'diamond', s: 88.4 },
          ].map(r => (
            <HairlineRow key={r.r} theme={theme} onClick={() => nav.goto('pro-profile-other')}>
              <span style={{ width: 40, fontFamily: FONT_MONO, fontSize: 11,
                color: '#E8C858', fontWeight: 700, letterSpacing: 0.5 }}>#{r.r}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.text, letterSpacing: -0.2 }}>@{r.n}</div>
                <div style={{ marginTop: 3, fontFamily: FONT_MONO, fontSize: 9.5,
                  color: TIER_COLORS[r.t]?.a, letterSpacing: 1.5 }}>{r.t.toUpperCase()}</div>
              </div>
              <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: '#E8C858', fontWeight: 600 }}>{r.s.toFixed(1)}</span>
            </HairlineRow>
          ))}
        </HairlineList>
      </div>
    </RScreen>
  );
}

// ─── S-NEW-3 — Other User's Profile (Rookie) ─────────────────
function RookieProfileOther({ theme, nav }) {
  const [following, setFollowing] = React.useState(false);
  return (
    <RScreen theme={theme} navActive="leaderboard" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<span onClick={() => setFollowing(!following)} style={{
          fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600,
          color: following ? theme.textMut : theme.accent, letterSpacing: 1.8,
          cursor: 'pointer',
        }}>{following ? 'FOLLOWING' : 'FOLLOW →'}</span>}/>

      <div style={{ padding: '8px 24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Monogram theme={theme} letter="A" size={64}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 500,
              color: theme.text, letterSpacing: -0.8, lineHeight: 1 }}>@alpha.king</div>
            <div style={{ marginTop: 8 }}><RModePill theme={theme}/></div>
          </div>
        </div>
        <div style={{ marginTop: 16, fontFamily: FONT_MONO, fontSize: 10,
          color: theme.textMut, letterSpacing: 1.5 }}>
          1,240 FOLLOWERS &nbsp;·&nbsp; 84 FOLLOWING
        </div>
      </div>

      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>OVERVIEW</Kicker>
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: 8 }}>
          <StatPair theme={theme} value="14"   label="STREAK"  valueSize={22}/>
          <StatPair theme={theme} value="+$84" label="BEST"    valueSize={22}/>
          <StatPair theme={theme} value="28/30" label="PROFIT" valueSize={22}/>
          <StatPair theme={theme} value="142"  label="TRADES"  valueSize={22}/>
        </div>
      </div>

      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>STREAK · LAST 30D</Kicker>
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gap: 4 }}>
          {Array.from({ length: 30 }).map((_, i) => {
            const v = i % 9 === 5 ? -1 : (i % 11 === 0 ? 0 : 1);
            return <div key={i} style={{
              aspectRatio: '1', borderRadius: 2,
              background: v === 1 ? theme.accent : v === -1 ? '#F87171' : theme.border,
              opacity: v === 0 ? 0.4 : 1,
            }}/>;
          })}
        </div>
      </div>

      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="BADGES · 06 / 09"/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {[
            { g: '◈', n: 'First Blood', e: true },
            { g: '◉', n: 'On Fire',     e: true },
            { g: '◎', n: 'Sniper',      e: true },
            { g: '◇', n: 'Voltage',     e: true },
            { g: '◆', n: 'Diamond',     e: true },
            { g: '★', n: 'Day King',    e: true },
            { g: '✕', n: 'No Mercy' },
            { g: '◌', n: 'Ice Veins' },
          ].map((b, i) => <RBadge key={i} theme={theme} {...b}/>)}
        </div>
      </div>

      {/* Fund Me · OPEN */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme}>FUND ME · OPEN</Kicker>
        <div style={{ marginTop: 14, fontFamily: FONT_DISPLAY, fontSize: 14,
          color: theme.textSec, lineHeight: 1.5 }}>
          @alpha.king is open to backing.<br/>Fifteen spots remaining.
        </div>
        <div style={{ marginTop: 18 }}>
          <AccentCTA theme={theme} onClick={() => nav.goto('fundme-backer')}>Back This Trader</AccentCTA>
        </div>
      </div>

      <div style={{ padding: '24px 24px 28px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="RECENT TRADES"/>
        <HairlineList theme={theme}>
          {[
            { p: 'BTC/USDT',  d: 'L', v: 24.20, t: '1H AGO' },
            { p: 'SOL/USDT',  d: 'L', v: 18.70, t: '3H AGO' },
            { p: 'ETH/USDT',  d: 'S', v: -4.10, t: '6H AGO' },
            { p: 'PEPE/USDT', d: 'L', v: 32.40, t: 'YESTERDAY' },
          ].map((x, i) => (
            <HairlineRow key={i} theme={theme}>
              <span style={{ width: 24, fontFamily: FONT_MONO, fontSize: 11,
                color: x.d === 'L' ? '#4ADE80' : '#F87171', fontWeight: 600, letterSpacing: 1.5 }}>{x.d}</span>
              <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14,
                color: theme.text, letterSpacing: -0.2 }}>{x.p}</span>
              <span style={{ width: 80, fontFamily: FONT_MONO, fontSize: 13,
                color: x.v >= 0 ? '#4ADE80' : '#F87171', textAlign: 'right' }}>
                {x.v >= 0 ? '+' : ''}${x.v.toFixed(2)}
              </span>
              <span style={{ width: 80, fontFamily: FONT_MONO, fontSize: 9.5,
                color: theme.textMut, textAlign: 'right', letterSpacing: 1.2 }}>{x.t}</span>
            </HairlineRow>
          ))}
        </HairlineList>
      </div>

      <div style={{ padding: '0 24px 28px' }}>
        <div style={{ textAlign: 'center', fontFamily: FONT_MONO, fontSize: 9.5,
          color: theme.textMut, letterSpacing: 2 }}>
          piker.io/@alpha.king
        </div>
      </div>
    </RScreen>
  );
}

// ─── S-NEW-4 — Other User's Profile (Pro) ────────────────────
function ProProfileOther({ theme, nav }) {
  const [following, setFollowing] = React.useState(false);
  return (
    <RScreen theme={theme} navActive="leaderboard" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<span onClick={() => setFollowing(!following)} style={{
          fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600,
          color: following ? theme.textMut : theme.accent, letterSpacing: 1.8,
          cursor: 'pointer',
        }}>{following ? 'FOLLOWING' : 'FOLLOW →'}</span>}/>

      <div style={{ padding: '8px 24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Monogram theme={theme} letter="H" size={64}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 500,
              color: theme.text, letterSpacing: -0.8, lineHeight: 1 }}>@hyperliq.sol</div>
            <div style={{ marginTop: 8 }}><RTierBadge tier="elite" size="md"/></div>
          </div>
        </div>
        <div style={{ marginTop: 22, display: 'flex', alignItems: 'flex-end', gap: 12 }}>
          <BigNum theme={theme} number="94" suffix=".2" size={64} suffixColor={theme.accent}/>
          <div style={{ paddingBottom: 8, fontFamily: FONT_MONO, fontSize: 10,
            color: theme.textMut, letterSpacing: 1.8 }}>
            PIKER SCORE &nbsp;·&nbsp; #001 OVERALL
          </div>
        </div>
        <div style={{ marginTop: 12, fontFamily: FONT_MONO, fontSize: 10,
          color: theme.textMut, letterSpacing: 1.5 }}>
          4,820 FOLLOWERS &nbsp;·&nbsp; 1,248 TRADES
        </div>
      </div>

      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>OVERVIEW</Kicker>
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: 8 }}>
          <StatPair theme={theme} value="#01"  label="BEST RANK" valueSize={22}/>
          <StatPair theme={theme} value="127%" label="ALL-TIME"  valueSize={22}/>
          <StatPair theme={theme} value="2.4"  label="SHARPE"    valueSize={22}/>
          <StatPair theme={theme} value="68%"  label="WIN RATE"  valueSize={22}/>
        </div>
      </div>

      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="EQUITY CURVE"
          right={<span style={{ fontFamily: FONT_MONO, fontSize: 11, color: '#4ADE80', letterSpacing: 0.5 }}>+127.3%</span>}/>
        <div style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`, overflow: 'hidden' }}>
          <AreaChart theme={theme} height={120} seed={12} watermark={false}/>
        </div>
      </div>

      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>PERFORMANCE</Kicker>
        <div style={{ marginTop: 8 }}>
          <MetaRow theme={theme} label="Avg ROI"      value="+127.3%" valueColor="#4ADE80"/>
          <MetaRow theme={theme} label="Avg Sharpe"   value="2.41"/>
          <MetaRow theme={theme} label="Max Drawdown" value="−8.2%"   valueColor="#F87171"/>
          <MetaRow theme={theme} label="Consistency"  value="89%"/>
          <MetaRow theme={theme} label="Win Rate"     value="68%"/>
          <MetaRow theme={theme} label="Avg Hold"     value="6h 04m"  last/>
        </div>
      </div>

      {/* Fund Me · OPEN */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme}>FUND ME · OPEN</Kicker>
        <div style={{ marginTop: 14, fontFamily: FONT_DISPLAY, fontSize: 14,
          color: theme.textSec, lineHeight: 1.5 }}>
          Twelve backers · $3,400 total backed.<br/>Eight spots remaining.
        </div>
        <div style={{ marginTop: 18 }}>
          <AccentCTA theme={theme} onClick={() => nav.goto('fundme-backer')}>Back This Trader</AccentCTA>
        </div>
      </div>

      <div style={{ padding: '24px 24px 28px', borderTop: `1px solid ${theme.border}` }}>
        <div style={{ textAlign: 'center', fontFamily: FONT_MONO, fontSize: 9.5,
          color: theme.textMut, letterSpacing: 2, cursor: 'pointer' }}>
          ⬡ &nbsp; SCORE VERIFIED ON SOLANA &nbsp;·&nbsp; VIEW PROOF →
        </div>
      </div>
    </RScreen>
  );
}

// ─── S-NEW-5 — Backer Dashboard ──────────────────────────────
function FundMeBackerDashboard({ theme, nav }) {
  return (
    <RScreen theme={theme} navActive="profile" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<span style={{ fontFamily: FONT_MONO, fontSize: 10,
          color: theme.textMut, letterSpacing: 1.5 }}>BACKER DASHBOARD</span>}/>

      <div style={{ padding: '8px 24px 24px' }}>
        <Kicker theme={theme}>BACKING</Kicker>
        <div style={{ marginTop: 12 }}>
          <Headline theme={theme} size={32}>@hyperliq.sol</Headline>
        </div>
        <Body theme={theme} style={{ marginTop: 14, fontSize: 13 }}>
          Your capital is deployed. You earn fifteen percent of their profits.
        </Body>
      </div>

      {/* YOUR POSITION */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut} style={{ marginBottom: 8 }}>YOUR POSITION</Kicker>
        <MetaRow theme={theme} label="Deployed"             value="$250.00 USDC"/>
        <MetaRow theme={theme} label="Current value"        value="$252.80" valueColor="#4ADE80"/>
        <MetaRow theme={theme} label="Your earnings · week" value="+$2.80"  valueColor="#4ADE80"/>
        <MetaRow theme={theme} label="Withdraw available"   value="AFTER WEEK ENDS" valueColor={theme.textMut} last/>
      </div>

      {/* TRADER ACTIVITY */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="TRADER ACTIVITY · LIVE"
          right={<span style={{ fontFamily: FONT_MONO, fontSize: 9.5,
            color: '#4ADE80', letterSpacing: 1.5 }}>● LIVE</span>}/>
        <HairlineList theme={theme}>
          {[
            { p: 'BTC/USDT', d: 'L', v: 840.20, t: '2H AGO' },
            { p: 'ETH/USDT', d: 'S', v: 320.10, t: '3H AGO' },
            { p: 'SOL/USDT', d: 'L', v: -85.40, t: '4H AGO' },
          ].map((x, i) => (
            <HairlineRow key={i} theme={theme}>
              <span style={{ width: 24, fontFamily: FONT_MONO, fontSize: 11,
                color: x.d === 'L' ? '#4ADE80' : '#F87171', fontWeight: 600, letterSpacing: 1.5 }}>{x.d}</span>
              <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14,
                color: theme.text, letterSpacing: -0.2 }}>{x.p}</span>
              <span style={{ width: 90, fontFamily: FONT_MONO, fontSize: 13,
                color: x.v >= 0 ? '#4ADE80' : '#F87171', textAlign: 'right' }}>
                {x.v >= 0 ? '+' : ''}${x.v.toFixed(2)}
              </span>
              <span style={{ width: 80, fontFamily: FONT_MONO, fontSize: 9.5,
                color: theme.textMut, textAlign: 'right', letterSpacing: 1.2 }}>{x.t}</span>
            </HairlineRow>
          ))}
        </HairlineList>
        <div style={{ marginTop: 14, fontFamily: FONT_MONO, fontSize: 11,
          color: theme.accent, letterSpacing: 1.5 }}>
          YOUR SHARE OF ABOVE · +$167.14
        </div>
      </div>

      {/* TRADER STATS */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>TRADER STATS</Kicker>
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          rowGap: 22, columnGap: 24 }}>
          <StatPair theme={theme} value="94.2"   label="PIKER SCORE"   valueSize={26}/>
          <StatPair theme={theme} value="+127.3%" label="ALL-TIME ROI" valueSize={22} color="#4ADE80"/>
          <StatPair theme={theme} value="2.41"   label="AVG SHARPE"    valueSize={22}/>
          <StatPair theme={theme} value="68%"    label="WIN RATE"      valueSize={22}/>
        </div>
      </div>

      {/* Withdraw */}
      <div style={{ padding: '24px 24px 12px', borderTop: `1px solid ${theme.border}` }}>
        <OutlineCTA theme={theme} arrow={false} color={theme.textMut}
          style={{ justifyContent: 'center', borderColor: theme.border, opacity: 0.7 }}>
          Withdraw · Available after week ends
        </OutlineCTA>
      </div>

      <div style={{ padding: '12px 24px 32px' }}>
        <div style={{ textAlign: 'center', fontFamily: FONT_MONO, fontSize: 9.5,
          color: theme.textMut, letterSpacing: 2 }}>
          ⬡ &nbsp; FUNDS IN SOLANA SMART CONTRACT &nbsp;·&nbsp; SECURED
        </div>
      </div>
    </RScreen>
  );
}

// ─── S-NEW-6 — Social Feed / Live Trades ─────────────────────
function SocialFeed({ theme, nav }) {
  const [scope, setScope] = React.useState('global');
  const items = [
    { n: 'hyperliq.sol', t: 'ELITE',   p: 'BTC/USDT',  d: 'LONG',  l: 10, e: '58,240', pl: 840,  ago: '2H AGO', live: true },
    { n: 'alpha.king',   t: 'ELITE',   p: 'ETH/USDT',  d: 'LONG',  l: 5,  e: '3,142',  pl: 320,  ago: '3H AGO', live: true },
    { n: 'glass.node',   t: 'DIAMOND', p: 'SOL/USDT',  d: 'SHORT', l: 8,  e: '142.80', pl: -85,  ago: '4H AGO' },
    { n: 'delta.one',    t: 'DIAMOND', p: 'BNB/USDT',  d: 'LONG',  l: 3,  e: '584.20', pl: 124,  ago: '5H AGO' },
    { n: 'orderflow',    t: 'GOLD',    p: 'DOGE/USDT', d: 'LONG',  l: 4,  e: '0.184',  pl: 48,   ago: '6H AGO' },
    { n: 'vwap.nasa',    t: 'DIAMOND', p: 'PEPE/USDT', d: 'LONG',  l: 6,  e: '0.0021', pl: 210,  ago: '8H AGO' },
    { n: 'long.only',    t: 'GOLD',    p: 'BTC/USDT',  d: 'LONG',  l: 2,  e: '57,420', pl: -45,  ago: '12H AGO' },
    { n: 'sol.army',     t: 'SILVER',  p: 'SOL/USDT',  d: 'LONG',  l: 5,  e: '141.20', pl: 18,   ago: 'YESTERDAY' },
  ];

  const showEmpty = scope === 'following';
  return (
    <RScreen theme={theme} navActive="home" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<div style={{ display: 'flex', gap: 14 }}>
          {['following','global'].map(s => (
            <span key={s} onClick={() => setScope(s)} style={{
              fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600,
              color: scope === s ? theme.accent : theme.textMut, letterSpacing: 1.8,
              cursor: 'pointer', textTransform: 'uppercase',
              borderBottom: scope === s ? `1px solid ${theme.accent}` : '1px solid transparent',
              paddingBottom: 3,
            }}>{s}</span>
          ))}
        </div>}/>

      <div style={{ padding: '0 24px 8px' }}>
        <Kicker theme={theme}>LIVE FEED</Kicker>
        <div style={{ marginTop: 12 }}>
          <Headline theme={theme} size={32}>Trades from traders<br/>you follow.</Headline>
        </div>
      </div>

      {showEmpty ? (
        <div style={{ padding: '40px 0' }}>
          <EmptyState theme={theme}
            kicker="FOLLOWING · 00"
            message="Follow traders to see their moves here."
            ctaLabel="Discover Traders"
            onCta={() => nav.goto('discover')}/>
        </div>
      ) : (
        <div style={{ padding: '24px 24px 32px' }}>
          <HairlineList theme={theme}>
            {items.map((x, i) => (
              <HairlineRow key={i} theme={theme} onClick={() => nav.goto(x.t === 'SILVER' ? 'rookie-profile-other' : 'pro-profile-other')}>
                <Monogram theme={theme} letter={x.n.charAt(0).toUpperCase()} size={32} accent={false}/>
                <div style={{ flex: 1, marginLeft: 14, minWidth: 0 }}>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 9.5,
                    color: theme.textMut, letterSpacing: 1.5,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    @{x.n} · {x.t}
                  </div>
                  <div style={{ marginTop: 4, fontFamily: FONT_DISPLAY, fontSize: 14,
                    color: theme.text, letterSpacing: -0.2 }}>
                    {x.p} · {x.d} · {x.l}×
                  </div>
                  <div style={{ marginTop: 4, fontFamily: FONT_MONO, fontSize: 11,
                    color: theme.textMut, letterSpacing: 0.5 }}>
                    Entry ${x.e} · <span style={{ color: x.pl >= 0 ? '#4ADE80' : '#F87171' }}>
                      {x.pl >= 0 ? '+' : ''}${Math.abs(x.pl)}
                    </span>
                    {x.live && <span style={{ color: theme.accent, marginLeft: 8 }}>● LIVE</span>}
                  </div>
                </div>
                <span style={{ fontFamily: FONT_MONO, fontSize: 9.5,
                  color: theme.textMut, letterSpacing: 1.2, alignSelf: 'flex-start' }}>{x.ago}</span>
              </HairlineRow>
            ))}
          </HairlineList>
        </div>
      )}
    </RScreen>
  );
}

Object.assign(window, {
  OrderBook, TPSLFields, ScoreImpact, EmptyState, TextToggle, RadioDot,
  Settings, Discover, RookieProfileOther, ProProfileOther,
  FundMeBackerDashboard, SocialFeed,
});
