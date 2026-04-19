// pro-screens.jsx — S7–S15 · restrained rebuild matching onboarding.
// Same rules as rookie. Gold accent. Piker Score is the hero number.

// ─── S7 — Pro Mode Intro ─────────────────────────────────────
function ProIntro({ theme, nav }) {
  return (
    <div style={{ width: '100%', height: '100%', background: theme.bg, position: 'relative', overflow: 'hidden' }}>
      <OnboardBG theme={theme}/>
      <StatusBar theme={theme}/>

      {/* Tiny serial label, like S1a */}
      <div style={{
        position: 'absolute', top: 56, left: 24, right: 24,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5,
      }}>
        <span>PIKER · MODE / 02</span>
        <span onClick={() => nav.setMode('rookie', 'rookie-dashboard')} style={{ color: theme.textSec, cursor: 'pointer' }}>← ROOKIE</span>
      </div>

      {/* Headline block */}
      <div style={{ padding: '120px 28px 0' }}>
        <Kicker theme={theme}>WELCOME · @PIKERKID</Kicker>
        <div style={{ marginTop: 12 }}>
          <Headline theme={theme}>You're entering<br/><span style={{ color: theme.accent }}>Pro Mode</span>.</Headline>
        </div>
        <Body theme={theme} style={{ marginTop: 14, maxWidth: 320 }}>
          Real capital. Real leaderboard. Real stakes. Same restraint, sharper teeth.
        </Body>
      </div>

      {/* The three single-line facts, just like S1f mode card */}
      <div style={{ padding: '36px 28px 0' }}>
        <Micro theme={theme}>WHAT THIS MEANS</Micro>
        <div style={{ marginTop: 14 }}>
          <HairlineList theme={theme}>
            {[
              'You trade with real or community-backed capital',
              'Your Piker Score determines your tier and vault eligibility',
              'Your trades are publicly verifiable on Solana',
            ].map((t, i) => (
              <HairlineRow key={i} theme={theme} padding="16px 4px">
                <span style={{ width: 28, color: theme.accent, fontFamily: FONT_MONO, fontSize: 13 }}>→</span>
                <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.textSec, lineHeight: 1.45 }}>{t}</span>
              </HairlineRow>
            ))}
          </HairlineList>
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: 'absolute', left: 28, right: 28, bottom: 44 }}>
        <PrimaryCTA theme={theme} onClick={() => nav.go('dashboard')}>Enter Pro Mode</PrimaryCTA>
      </div>
    </div>
  );
}

// ─── S8 — Pro Dashboard ──────────────────────────────────────
function ProDashboard({ theme, nav }) {
  return (
    <RScreen theme={theme} navActive="home" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<>
          <span onClick={() => nav.go('notifications')} style={{
            fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 1.5,
            color: theme.textSec, cursor: 'pointer',
          }}>INBOX · 3</span>
        </>}/>

      {/* Hero — Piker Score gets the $100 treatment */}
      <div style={{ padding: '18px 24px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Kicker theme={theme}>PIKER SCORE</Kicker>
          <RTierBadge tier="diamond" size="sm"/>
        </div>
        <div style={{ marginTop: 18, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <BigNum theme={theme} number="72" suffix=".4" size={120} suffixColor={theme.accent}/>
          <div style={{ textAlign: 'right', paddingBottom: 14 }}>
            <Micro theme={theme}>WEEKLY</Micro>
            <div style={{
              fontFamily: FONT_MONO, fontSize: 13, color: '#4ADE80',
              letterSpacing: 0.5, marginTop: 6, fontWeight: 500,
            }}>+2.1</div>
          </div>
        </div>
        {/* Component bars — hairline, like S1c split */}
        <div style={{ marginTop: 26 }}>
          {[
            ['ROI',         84],
            ['SHARPE',      71],
            ['DRAWDOWN',    58],
            ['CONSISTENCY', 77],
            ['ACTIVITY',    68],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 32px', alignItems: 'center', gap: 14, padding: '8px 0' }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut, letterSpacing: 1.8 }}>{l}</span>
              <div style={{ position: 'relative', height: 2, background: theme.border }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${v}%`, background: theme.accent }}/>
              </div>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: theme.text, textAlign: 'right' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio — secondary big number */}
      <div style={{ padding: '20px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>PORTFOLIO · ALL-TIME</Kicker>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'baseline', gap: 14, justifyContent: 'space-between' }}>
          <BigNum theme={theme} prefix="$" number="103,420" size={44}/>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: '#4ADE80', fontWeight: 500 }}>+$3,420</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: '#4ADE80', marginTop: 2 }}>+3.42%</div>
          </div>
        </div>
      </div>

      {/* Open positions */}
      <div style={{ padding: '20px 24px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="OPEN POSITIONS · 03"
          right={<span style={{ fontFamily: FONT_MONO, fontSize: 9.5, color: '#4ADE80', letterSpacing: 1.5 }}>● LIVE</span>}/>
        <RHairPositions theme={theme} rows={[
          { pair: 'BTC/USDT', dir: 'L', entry: '58,120.40', pl: 840.20, pct: 1.4 },
          { pair: 'ETH/USDT', dir: 'L', entry: '3,142.80',  pl: 320.10, pct: 1.8 },
          { pair: 'SOL/USDT', dir: 'S', entry: '142.80',    pl: -85.40, pct: -0.6 },
        ]}/>
      </div>

      {/* Pro rankings */}
      <div style={{ padding: '20px 24px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="PRO RANKINGS"
          right={<span onClick={() => nav.go('leaderboard')} style={{
            fontFamily: FONT_MONO, fontSize: 10, color: theme.accent,
            letterSpacing: 1.5, cursor: 'pointer',
          }}>VIEW ALL →</span>}/>
        <RProLeaderRows theme={theme} rows={[
          { r: '001', n: 'hyperliq.sol', t: 'elite',   s: 94.2, roi: 127.3, fund: true },
          { r: '002', n: 'alpha.king',   t: 'elite',   s: 91.7, roi: 98.1,  fund: true },
          { r: '003', n: 'glass.node',   t: 'diamond', s: 88.4, roi: 76.2 },
        ]}/>
        <div style={{ marginTop: 0 }}>
          <RProLeaderRows theme={theme} firstBorder={false} rows={[
            { r: '047', n: 'pikerkid', t: 'diamond', s: 72.4, roi: 34.2, me: true },
          ]}/>
        </div>
      </div>

      {/* Fund Me strip */}
      <div style={{ padding: '20px 24px 28px', borderTop: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: '#4ADE80' }}/>
          <Kicker theme={{ accent: '#4ADE80' }} color="#4ADE80">FUND ME · ACTIVE</Kicker>
          <span style={{ flex: 1 }}/>
          <span onClick={() => nav.go('fundme-trader')} style={{
            fontFamily: FONT_MONO, fontSize: 10, color: theme.accent,
            letterSpacing: 1.5, cursor: 'pointer',
          }}>MANAGE →</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: 12 }}>
          <StatPair theme={theme} value="12" label="BACKERS" valueSize={24}/>
          <StatPair theme={theme} value="$3,400" label="BACKED" valueSize={20}/>
          <StatPair theme={theme} value="+$287" label="WK EARN" valueSize={20} color="#4ADE80"/>
        </div>
      </div>
    </RScreen>
  );
}

function RProLeaderRows({ theme, rows, firstBorder = true, onRowClick }) {
  return (
    <div>
      {rows.map((r, i) => (
        <div key={i} onClick={onRowClick ? () => onRowClick(r) : undefined} style={{
          position: 'relative',
          display: 'grid', gridTemplateColumns: '46px 1fr auto',
          alignItems: 'center', gap: 14,
          padding: '14px 4px',
          borderTop: firstBorder && i === 0 ? `1px solid ${theme.border}` : 'none',
          borderBottom: `1px solid ${r.me ? theme.accent : theme.border}`,
          background: r.me ? theme.accent + '08' : 'transparent',
          cursor: onRowClick ? 'pointer' : 'default',
        }}>
          {r.me && <span style={{
            position: 'absolute', left: -4, top: 0, bottom: 0, width: 2, background: theme.accent,
          }}/>}
          <span style={{
            fontFamily: FONT_MONO, fontSize: 11,
            color: r.me ? theme.accent : (parseInt(r.r) <= 3 ? theme.accent : theme.textMut),
            fontWeight: r.me || parseInt(r.r) <= 3 ? 700 : 500, letterSpacing: 0.5,
          }}>#{r.r}</span>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 500,
              color: r.me ? theme.text : theme.textSec, letterSpacing: -0.2,
              fontStyle: r.me ? 'italic' : 'normal',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{r.me ? 'you' : r.n}</div>
            <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: FONT_MONO, fontSize: 9.5, letterSpacing: 1.5 }}>
              <span style={{ color: TIER_COLORS[r.t]?.a }}>{r.t.toUpperCase()}</span>
              {r.fund && <span style={{ color: '#4ADE80' }}>● FUND ME</span>}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 13.5, color: theme.accent, fontWeight: 600 }}>{r.s.toFixed(1)}</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: '#4ADE80', marginTop: 3 }}>+{r.roi.toFixed(1)}%</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── S9 — Pro Trade ──────────────────────────────────────────
function ProTrade({ theme, nav }) {
  const [pair, setPair] = React.useState('BTC/USDT');
  const [tf, setTf] = React.useState('1h');
  const [side, setSide] = React.useState('long');
  const [size, setSize] = React.useState('2500');
  const [leverage, setLeverage] = React.useState(10);
  const pairs = [
    { p: 'BTC/USDT', c: 2.4 }, { p: 'ETH/USDT', c: 1.8 }, { p: 'SOL/USDT', c: -0.9 },
    { p: 'BNB/USDT', c: 0.4 }, { p: 'DOGE/USDT', c: 5.2 }, { p: 'PEPE/USDT', c: 12.3 },
  ];
  return (
    <RScreen theme={theme} navActive="trade" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<RPill theme={theme}>$103,420</RPill>}/>

      <div style={{ padding: '0 24px 18px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {pairs.map(x => <RPairPill key={x.p} theme={theme}
          pair={x.p.split('/')[0]} change={x.c}
          active={pair === x.p} onClick={() => setPair(x.p)}/>)}
      </div>

      {/* Price hero */}
      <div style={{ padding: '0 24px 12px' }}>
        <Kicker theme={theme} color={theme.textMut}>{pair} · PERP</Kicker>
        <div style={{ marginTop: 8 }}>
          <BigNum theme={theme} number="58,243" suffix=".20" size={56} suffixColor="#4ADE80"/>
        </div>
        <div style={{ marginTop: 8, fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5 }}>
          +2.40% &nbsp;·&nbsp; OI <span style={{ color: theme.textSec }}>$4.1B</span>
          &nbsp;·&nbsp; VOL <span style={{ color: theme.textSec }}>$12.4B</span>
          &nbsp;·&nbsp; FUND <span style={{ color: '#4ADE80' }}>+0.012%</span>
        </div>
      </div>

      {/* Timeframe */}
      <div style={{ padding: '8px 24px 6px', display: 'flex', gap: 18 }}>
        {['1m','5m','15m','1h','4h','1D'].map(t => (
          <div key={t} onClick={() => setTf(t)} style={{
            fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 1.8,
            color: tf === t ? theme.accent : theme.textMut,
            fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase',
            paddingBottom: 6,
            borderBottom: tf === t ? `1px solid ${theme.accent}` : '1px solid transparent',
          }}>{t}</div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ padding: '0 24px 18px' }}>
        <div style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`, overflow: 'hidden' }}>
          <CandleChart theme={theme} height={200} seed={pair.length}/>
        </div>
      </div>

      {/* Order book — condensed */}
      <OrderBook theme={theme} base={142.50}/>

      {/* Leader strip — quiet line */}
      <div style={{ padding: '0 24px 18px' }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5, display: 'flex', gap: 12 }}>
          <span>#001 <span style={{ color: theme.accent }}>HYPERLIQ.SOL</span> <span style={{ color: '#4ADE80' }}>+127.3%</span></span>
          <span style={{ marginLeft: 'auto' }}>YOU #047 <span style={{ color: '#4ADE80' }}>+34.2%</span></span>
        </div>
      </div>

      {/* Order entry */}
      <div style={{ padding: '0 24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <div style={{ paddingTop: 20 }}><Kicker theme={theme}>ORDER</Kicker></div>
        <div style={{ display: 'flex', marginTop: 14, borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}>
          {['long', 'short'].map(s => {
            const a = side === s;
            const c = s === 'long' ? '#4ADE80' : '#F87171';
            return (
              <div key={s} onClick={() => setSide(s)} style={{
                flex: 1, padding: '14px 0', textAlign: 'center', cursor: 'pointer',
                background: a ? c + '10' : 'transparent',
                fontFamily: FONT_MONO, fontSize: 11, fontWeight: 600,
                color: a ? c : theme.textMut, letterSpacing: 2.5,
                borderRight: s === 'long' ? `1px solid ${theme.border}` : 'none',
              }}>{s.toUpperCase()}</div>
            );
          })}
        </div>

        {/* Size */}
        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6,
            fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut, letterSpacing: 2 }}>
            <span>SIZE</span><span style={{ color: theme.textMut }}>USDT</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, paddingBottom: 10, borderBottom: `1px solid ${theme.border}` }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 400, color: theme.textMut, letterSpacing: -0.5 }}>$</span>
            <input value={size} onChange={e => setSize(e.target.value)} style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 400,
              color: theme.text, letterSpacing: -0.5, padding: 0, caretColor: theme.accent,
            }}/>
          </div>
          <div style={{ marginTop: 8, fontFamily: FONT_MONO, fontSize: 9.5, color: theme.accent, letterSpacing: 1.5 }}>
            ⬡ LARGE SIZE MAY AFFECT YOUR SHARPE
          </div>
        </div>

        {/* Leverage */}
        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8,
            fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut, letterSpacing: 2 }}>
            <span>LEVERAGE · MAX 20×</span>
            <span style={{ color: theme.accent }}>{leverage}×</span>
          </div>
          <input type="range" min="1" max="20" value={leverage}
            onChange={e => setLeverage(+e.target.value)}
            style={{ width: '100%', accentColor: theme.accent }}/>
        </div>

        {/* Score impact (Pro only, > 10×) */}
        <ScoreImpact theme={theme} leverage={leverage}/>

        {/* TP / SL grid */}
        <TPSLFields theme={theme} basePrice={142.50}/>

        {/* Margin / liq line */}
        <div style={{
          marginTop: 18, display: 'flex', justifyContent: 'space-between',
          fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5,
        }}>
          <span>MARGIN <span style={{ color: theme.text }}>${(+size / leverage).toFixed(2)}</span></span>
          <span>LIQ <span style={{ color: '#F87171' }}>54,108</span></span>
        </div>

        <div style={{ marginTop: 22 }}>
          <AccentCTA theme={theme} tone={side === 'long' ? 'long' : 'short'}>
            {side === 'long' ? 'Long' : 'Short'} {pair.split('/')[0]} · ${(+size).toLocaleString()}
          </AccentCTA>
        </div>
      </div>
    </RScreen>
  );
}

// ─── S10 — Pro Leaderboard ───────────────────────────────────
function ProLeaderboard({ theme, nav }) {
  const [tab, setTab] = React.useState('rankings');
  const rows = [
    { r: '001', n: 'hyperliq.sol', t: 'elite',   s: 94.2, roi: 127.3, fund: true },
    { r: '002', n: 'alpha.king',   t: 'elite',   s: 91.7, roi: 98.1,  fund: true },
    { r: '003', n: 'glass.node',   t: 'diamond', s: 88.4, roi: 76.2 },
    { r: '004', n: 'delta.one',    t: 'diamond', s: 85.1, roi: 68.4,  fund: true },
    { r: '005', n: 'vwap.nasa',    t: 'diamond', s: 83.7, roi: 62.1 },
    { r: '006', n: 'funding.rate', t: 'diamond', s: 81.9, roi: 58.3 },
    { r: '007', n: 'orderflow',    t: 'gold',    s: 79.2, roi: 52.7 },
    { r: '008', n: 'long.only',    t: 'gold',    s: 77.8, roi: 49.1 },
    { r: '009', n: 'perp.god',     t: 'gold',    s: 76.4, roi: 46.2 },
    { r: '010', n: 'mm.maker',     t: 'gold',    s: 75.1, roi: 43.8 },
  ];
  return (
    <RScreen theme={theme} navActive="leaderboard" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<span onClick={() => nav.goto('discover')} style={{ fontFamily: FONT_MONO, fontSize: 16, color: theme.textSec, cursor: 'pointer' }}>⌕</span>}/>

      <div style={{ padding: '0 24px 8px' }}>
        <Kicker theme={theme}>RANKINGS · LIVE</Kicker>
        <div style={{ marginTop: 12 }}>
          <Headline theme={theme} size={32}>Pro Board</Headline>
        </div>
        <Body theme={theme} style={{ marginTop: 10, fontSize: 13 }}>
          Ongoing — no reset. Score, not luck.
        </Body>
      </div>

      <div style={{ padding: '20px 24px 0' }}>
        <HairTabs theme={theme} value={tab} onChange={setTab} options={[
          { value: 'rankings', label: 'Rankings' },
          { value: 'all-time', label: 'All-time' },
          { value: 'league',   label: 'My league' },
        ]}/>
      </div>

      {tab !== 'league' && (
        <div style={{ padding: '18px 24px 0' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '46px 1fr auto',
            gap: 14, padding: '0 4px 8px',
            fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
            letterSpacing: 2, textTransform: 'uppercase',
          }}>
            <span>RANK</span><span>TRADER · TIER</span><span style={{ textAlign: 'right' }}>SCORE · ROI</span>
          </div>
          <RProLeaderRows theme={theme} rows={rows} onRowClick={() => nav.goto('pro-profile-other')}/>
        </div>
      )}

      {/* Pinned you */}
      {tab !== 'league' && (
        <div style={{ padding: '24px 24px 32px' }}>
          <div style={{
            fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
            letterSpacing: 3, textAlign: 'center', marginBottom: 12,
          }}>— YOUR POSITION —</div>
          <div style={{
            border: `1px solid ${theme.accent}`, borderRadius: 12,
            background: theme.accent + '10', padding: '4px 12px',
          }}>
            <RProLeaderRows theme={theme} firstBorder={false} rows={[
              { r: '047', n: 'pikerkid', t: 'diamond', s: 72.4, roi: 34.2, me: true },
            ]}/>
          </div>
        </div>
      )}

      {tab === 'league' && <ProLeagueEmpty theme={theme}/>}
    </RScreen>
  );
}

function ProLeagueEmpty({ theme }) {
  const [code, setCode] = React.useState('');
  return (
    <div style={{ padding: '28px 24px 40px' }}>
      <Kicker theme={theme}>CREATE A LEAGUE</Kicker>
      <Body theme={theme} style={{ marginTop: 14, fontSize: 13 }}>
        No league yet. Start one and invite your crew via a share link.
      </Body>
      <div style={{ marginTop: 20 }}>
        <OutlineCTA theme={theme} arrow>Create a league</OutlineCTA>
      </div>
      <div style={{ marginTop: 28, textAlign: 'center', fontFamily: FONT_MONO,
        fontSize: 9.5, color: theme.textMut, letterSpacing: 2 }}>
        — OR JOIN WITH A CODE —
      </div>
      <div style={{ marginTop: 20, display: 'flex', alignItems: 'baseline', gap: 8,
        paddingBottom: 10, borderBottom: `1px solid ${theme.border}` }}>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 400,
          color: theme.textMut, letterSpacing: -0.5 }}>@</span>
        <input value={code} onChange={e => setCode(e.target.value)}
          placeholder="enter league code"
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 400,
            color: theme.text, letterSpacing: -0.4, padding: 0, caretColor: theme.accent,
          }}/>
      </div>
      <div style={{ marginTop: 20 }}>
        <AccentCTA theme={theme}>Join</AccentCTA>
      </div>
    </div>
  );
}

// ─── S11 — Pro Profile ───────────────────────────────────────
function ProProfile({ theme, nav }) {
  return (
    <RScreen theme={theme} navActive="profile" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<span onClick={() => nav.goto('settings')} style={{ fontFamily: FONT_MONO, fontSize: 16, color: theme.textSec, cursor: 'pointer' }}>⚙</span>}/>

      {/* Identity zone */}
      <div style={{ padding: '8px 24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Monogram theme={theme} letter="P" size={64}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 500, color: theme.text, letterSpacing: -0.8, lineHeight: 1 }}>@pikerkid</div>
            <div style={{ marginTop: 8 }}><RTierBadge tier="diamond" size="md"/></div>
          </div>
        </div>
        <div style={{ marginTop: 22, display: 'flex', alignItems: 'flex-end', gap: 12 }}>
          <BigNum theme={theme} number="72" suffix=".4" size={64} suffixColor={theme.accent}/>
          <div style={{ paddingBottom: 8, fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.8 }}>
            PIKER SCORE &nbsp;·&nbsp; #047 OVERALL
          </div>
        </div>
        <div style={{ marginTop: 12, fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5 }}>
          312 FOLLOWERS &nbsp;·&nbsp; 248 TRADES
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>OVERVIEW</Kicker>
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: 8 }}>
          <StatPair theme={theme} value="#47" label="BEST RANK" valueSize={22}/>
          <StatPair theme={theme} value="34%" label="BEST ROI" valueSize={22}/>
          <StatPair theme={theme} value="2.1" label="SHARPE" valueSize={22}/>
          <StatPair theme={theme} value="248" label="TRADES" valueSize={22}/>
        </div>
      </div>

      {/* Equity curve */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="EQUITY CURVE"
          right={<span style={{ fontFamily: FONT_MONO, fontSize: 11, color: '#4ADE80', letterSpacing: 0.5 }}>+34.2%</span>}/>
        <div style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`, overflow: 'hidden' }}>
          <AreaChart theme={theme} height={120} seed={8} watermark={false}/>
        </div>
      </div>

      {/* Performance — hairline meta rows */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>PERFORMANCE</Kicker>
        <div style={{ marginTop: 8 }}>
          <MetaRow theme={theme} label="Avg ROI"        value="+34.2%" valueColor="#4ADE80"/>
          <MetaRow theme={theme} label="Avg Sharpe"     value="2.14"/>
          <MetaRow theme={theme} label="Max Drawdown"   value="−12.4%" valueColor="#F87171"/>
          <MetaRow theme={theme} label="Consistency"    value="77%"/>
          <MetaRow theme={theme} label="Win Rate"       value="64%"/>
          <MetaRow theme={theme} label="Avg Hold"       value="4h 12m" last/>
        </div>
      </div>

      {/* Badges */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="BADGES · 02 / 08"/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {[
            { g: '◈', n: 'First Blood', e: true },
            { g: '◉', n: 'One Shot',    e: true },
            { g: '★', n: 'Untouchable', h: 'TOP 10' },
            { g: '◆', n: 'Perfect Wk' },
            { g: '✦', n: 'Comeback' },
            { g: '◎', n: 'Consistent' },
            { g: '◇', n: 'Clutch' },
            { g: '✕', n: 'Elite Killer' },
          ].map((b, i) => <RBadge key={i} theme={theme} {...b}/>)}
        </div>
      </div>

      {/* Fund Me — restrained, like Mode card lines */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="FUND ME · ACTIVE"
          right={<span onClick={() => nav.go('fundme-trader')} style={{
            fontFamily: FONT_MONO, fontSize: 10, color: theme.accent,
            letterSpacing: 1.5, cursor: 'pointer',
          }}>MANAGE →</span>}/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: 24, rowGap: 22 }}>
          <StatPair theme={theme} value="12" label="BACKERS" valueSize={26}/>
          <StatPair theme={theme} value="$3,400" label="BACKED" valueSize={22}/>
        </div>
      </div>

      {/* Solana strip — exactly like the legal line in S1d */}
      <div style={{ padding: '0 24px 28px' }}>
        <div style={{ textAlign: 'center', fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut, letterSpacing: 2 }}>
          ⬡ &nbsp; ON-CHAIN ON SOLANA &nbsp;·&nbsp; RANK SBT &nbsp;·&nbsp; 12 BADGE CNFTs
        </div>
      </div>
    </RScreen>
  );
}

// ─── S12 — Fund Me · Trader ──────────────────────────────────
function FundMeTrader({ theme, nav }) {
  const [cap, setCap] = React.useState(5000);
  return (
    <RScreen theme={theme} navActive="profile" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<span onClick={() => nav.go('profile')} style={{
          fontFamily: FONT_MONO, fontSize: 18, color: theme.textSec, cursor: 'pointer', padding: '0 4px',
        }}>×</span>}/>

      <div style={{ padding: '8px 24px 32px' }}>
        <Kicker theme={theme}>FUND ME · LIVE</Kicker>
        <div style={{ marginTop: 12 }}>
          <Headline theme={theme} size={32}>Managing<br/>twelve backers.</Headline>
        </div>
        <Body theme={theme} style={{ marginTop: 12, fontSize: 13 }}>
          Real capital from the community. You keep eighty percent of the profits.
        </Body>
      </div>

      {/* Active strip */}
      <div style={{ padding: '0 24px 28px' }}>
        <div style={{
          padding: '14px 18px',
          border: `1px solid ${theme.accentDeep}`, borderRadius: 12,
          background: theme.accent + '08',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: '#4ADE80' }}/>
          <span style={{ flex: 1, fontFamily: FONT_MONO, fontSize: 11, color: theme.accent, letterSpacing: 2, fontWeight: 600 }}>FUND ME ACTIVE</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textSec, letterSpacing: 1.5, cursor: 'pointer' }}>PAUSE</span>
        </div>
      </div>

      {/* Cap slider */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Kicker theme={theme} color={theme.textMut}>MAX BACKING CAP</Kicker>
          <span style={{ fontFamily: FONT_MONO, fontSize: 14, color: theme.accent, letterSpacing: 0.5 }}>${cap.toLocaleString()} USDC</span>
        </div>
        <input type="range" min="100" max="10000" step="100" value={cap}
          onChange={e => setCap(+e.target.value)}
          style={{ width: '100%', accentColor: theme.accent, marginTop: 18 }}/>
      </div>

      {/* Profit split — the 80/15/5 from S1c, exactly */}
      <div style={{ padding: '28px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>PROFIT SPLIT</Kicker>
        <div style={{ marginTop: 22, display: 'flex', gap: 24, alignItems: 'baseline', justifyContent: 'center' }}>
          {[
            { n: '80', l: 'YOU',      strong: true,  color: theme.accent },
            { n: '15', l: 'BACKERS',  color: '#4ADE80' },
            { n: '05', l: 'PLATFORM', color: theme.textSec },
          ].map((x, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span style={{ color: theme.border, fontFamily: FONT_MONO, fontSize: 18, fontWeight: 200 }}>/</span>}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: x.strong ? 600 : 400,
                  color: x.color, letterSpacing: -1, lineHeight: 1,
                  fontFeatureSettings: '"tnum"',
                }}>{x.n}<span style={{ fontSize: 14, fontWeight: 400, opacity: 0.6 }}>%</span></div>
                <div style={{
                  fontFamily: FONT_MONO, fontSize: 9, color: theme.textMut, letterSpacing: 1.5, marginTop: 6,
                }}>{x.l}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Active backers — hairline list */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="ACTIVE BACKERS · 12"/>
        <HairlineList theme={theme}>
          {[
            { n: 'whale.eth',  a: 800, e: 42.10 },
            { n: 'degen.labs', a: 500, e: 26.30 },
            { n: 'ape.god',    a: 400, e: 21.00 },
            { n: 'sol.army',   a: 300, e: 15.80 },
          ].map((b, i) => (
            <HairlineRow key={i} theme={theme}>
              <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.text, letterSpacing: -0.2 }}>{b.n}</span>
              <span style={{ width: 80, fontFamily: FONT_MONO, fontSize: 12, color: theme.textSec, textAlign: 'right' }}>${b.a}</span>
              <span style={{ width: 80, fontFamily: FONT_MONO, fontSize: 12, color: '#4ADE80', textAlign: 'right' }}>+${b.e.toFixed(2)}</span>
            </HairlineRow>
          ))}
        </HairlineList>
      </div>

      {/* Share */}
      <div style={{ padding: '24px 24px 32px', borderTop: `1px solid ${theme.border}` }}>
        <OutlineCTA theme={theme} arrow={true}>Share my Fund Me link</OutlineCTA>
      </div>
    </RScreen>
  );
}

// ─── S13 — Fund Me · Backer (confirmation) ───────────────────
function FundMeBacker({ theme, nav }) {
  const [amt, setAmt] = React.useState(250);
  return (
    <RScreen theme={theme} navActive="profile" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<span onClick={() => nav.go('leaderboard')} style={{
          fontFamily: FONT_MONO, fontSize: 18, color: theme.textSec, cursor: 'pointer', padding: '0 4px',
        }}>×</span>}/>

      <div style={{ padding: '8px 24px 28px' }}>
        <Kicker theme={theme}>BACK A TRADER</Kicker>
        <div style={{ marginTop: 12 }}>
          <Headline theme={theme} size={32}>One trader.<br/>One amount.</Headline>
        </div>
      </div>

      {/* Trader card — restrained, hairline */}
      <div style={{ padding: '0 24px 28px' }}>
        <div style={{
          padding: 20, border: `1px solid ${theme.border}`, borderRadius: 14,
          background: theme.accent + '04',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Monogram theme={theme} letter="H" size={48} accent/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 500, color: theme.text, letterSpacing: -0.4 }}>@hyperliq.sol</div>
              <div style={{ marginTop: 6 }}><RTierBadge tier="elite" size="sm"/></div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 400, color: theme.accent, letterSpacing: -1, lineHeight: 1 }}>94.2</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: theme.textMut, letterSpacing: 1.8, marginTop: 6 }}>PIKER SCORE</div>
            </div>
          </div>
          <div style={{
            marginTop: 16, fontFamily: FONT_DISPLAY, fontSize: 13, color: theme.textSec,
            fontStyle: 'italic', lineHeight: 1.5,
          }}>"Elite-tier. 127% ROI all-time, 2.4 Sharpe. Macro-driven BTC setups."</div>
        </div>
      </div>

      {/* Amount — same input pattern as username screen */}
      <div style={{ padding: '0 24px 28px' }}>
        <Micro theme={theme} style={{ marginBottom: 8 }}>AMOUNT</Micro>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, paddingBottom: 12, borderBottom: `1px solid ${theme.accent}` }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 38, fontWeight: 400, color: theme.textMut, letterSpacing: -1, lineHeight: 1 }}>$</span>
          <input value={amt} onChange={e => setAmt(+e.target.value.replace(/\D/g, '') || 0)} style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            fontFamily: FONT_DISPLAY, fontSize: 38, fontWeight: 400,
            color: theme.text, letterSpacing: -1, padding: 0, caretColor: theme.accent,
          }}/>
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: theme.textMut, letterSpacing: 2 }}>USDC</span>
        </div>
        <div style={{ display: 'flex', gap: 0, marginTop: 16 }}>
          {[100, 250, 500, 1000].map((v, i, a) => (
            <div key={v} onClick={() => setAmt(v)} style={{
              flex: 1, padding: '12px 0', textAlign: 'center', cursor: 'pointer',
              borderTop: `1px solid ${amt === v ? theme.accent : theme.border}`,
              borderBottom: `1px solid ${amt === v ? theme.accent : theme.border}`,
              borderLeft: i === 0 ? `1px solid ${amt === v ? theme.accent : theme.border}` : 'none',
              borderRight: `1px solid ${amt === v ? theme.accent : theme.border}`,
              background: amt === v ? theme.accent + '08' : 'transparent',
              fontFamily: FONT_MONO, fontSize: 11,
              color: amt === v ? theme.accent : theme.textSec,
              fontWeight: 600, letterSpacing: 1.5,
            }}>${v}</div>
          ))}
        </div>
      </div>

      {/* Estimate */}
      <div style={{ padding: '20px 24px', borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <Micro theme={theme}>EST. WEEKLY RETURN</Micro>
            <div style={{ marginTop: 8, fontFamily: FONT_DISPLAY, fontSize: 28, color: '#4ADE80', fontWeight: 400, letterSpacing: -1 }}>
              +${(amt * 0.012).toFixed(2)}
            </div>
          </div>
          <div style={{ textAlign: 'right', fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut, letterSpacing: 1.5, lineHeight: 1.6 }}>
            BASED ON AVG<br/>ROI · 1.2% / WK
          </div>
        </div>
      </div>

      {/* Solana note + CTA */}
      <div style={{ padding: '24px 24px 32px' }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5, marginBottom: 18 }}>
          ⬡ &nbsp;FUNDS HELD IN SOLANA SMART CONTRACT &nbsp;·&nbsp; WITHDRAW ENABLED AFTER WEEK ENDS
        </div>
        <PrimaryCTA theme={theme}>Confirm · Deploy ${amt} USDC</PrimaryCTA>
      </div>
    </RScreen>
  );
}

// ─── S14 — Notifications ─────────────────────────────────────
function Notifications({ theme, nav }) {
  const groups = [
    { label: 'TODAY', items: [
      { g: '◉', t: 'Streak extended to Day 8',     s: 'Keep it going.',                 unread: true,  to: 'rookie-dashboard' },
      { g: '↑',  t: 'Leaderboard move',             s: 'You moved from #847 → #312.',    unread: true,  to: 'rookie-leaderboard' },
      { g: '◎', t: 'Badge unlocked',                s: 'Sniper earned.',                 unread: true,  to: 'rookie-profile' },
      { g: '◇', t: 'Reset warning',                 s: '$100 resets in 30 minutes.',     unread: false, to: 'rookie-trade' },
    ]},
    { label: 'THIS WEEK', items: [
      { g: '◆', t: 'Fund Me · new backer',          s: '@whale.eth deposited $500.',     unread: false, to: 'fundme-trader' },
      { g: '↑',  t: 'Pro rank change',               s: 'You moved from #312 → #247.',    unread: false, to: 'pro-leaderboard' },
      { g: '!',  t: 'Position alert',                s: 'SOL approaching stop loss.',     unread: false, to: 'pro-trade' },
      { g: '●', t: 'Watch top traders',             s: 'See live moves from your follows.', unread: false, to: 'social-feed' },
    ]},
    { label: 'EARLIER', items: [
      { g: '◈', t: 'First Blood badge',             s: 'You earned First Blood.',        unread: false, to: 'pro-profile' },
      { g: '◆', t: 'Voltage badge',                 s: 'Streak reached 10 days.',        unread: false, to: 'rookie-profile' },
    ]},
  ];
  return (
    <RScreen theme={theme} navActive="home" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<span style={{
          fontFamily: FONT_MONO, fontSize: 10, color: theme.accent,
          letterSpacing: 1.5, cursor: 'pointer',
        }}>MARK READ</span>}/>

      <div style={{ padding: '0 24px 8px' }}>
        <Kicker theme={theme}>INBOX</Kicker>
        <div style={{ marginTop: 12 }}>
          <Headline theme={theme} size={32}>Notifications</Headline>
        </div>
      </div>

      {groups.map(g => (
        <div key={g.label} style={{ padding: '24px 24px 0' }}>
          <Micro theme={theme}>{g.label}</Micro>
          <div style={{ marginTop: 12 }}>
            <HairlineList theme={theme}>
              {g.items.map((it, i) => (
                <HairlineRow key={i} theme={theme} onClick={() => it.to && nav.goto(it.to)}>
                  <span style={{
                    width: 28, fontFamily: FONT_DISPLAY, fontSize: 16,
                    color: it.unread ? theme.accent : theme.textMut, lineHeight: 1,
                  }}>{it.g}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 500,
                      color: theme.text, letterSpacing: -0.2,
                    }}>{it.t}</div>
                    <div style={{
                      fontFamily: FONT_DISPLAY, fontSize: 12.5, color: theme.textSec,
                      marginTop: 4, lineHeight: 1.45,
                    }}>{it.s}</div>
                  </div>
                  {it.unread && <span style={{
                    width: 5, height: 5, borderRadius: 3,
                    background: theme.accent, marginLeft: 8,
                  }}/>}
                </HairlineRow>
              ))}
            </HairlineList>
          </div>
        </div>
      ))}

      <div style={{ height: 24 }}/>
    </RScreen>
  );
}

// ─── S15 — Pro Milestone (tier reveal) ───────────────────────
function Milestone({ theme, nav }) {
  return (
    <div style={{ width: '100%', height: '100%', background: theme.bg, position: 'relative', overflow: 'hidden' }}>
      <OnboardBG theme={theme}/>
      <StatusBar theme={theme}/>

      {/* Faint radial sunburst — restrained */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} viewBox="0 0 390 844">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return <line key={i}
            x1={195 + Math.cos(a) * 60} y1={340 + Math.sin(a) * 60}
            x2={195 + Math.cos(a) * 480} y2={340 + Math.sin(a) * 480}
            stroke={theme.accent} strokeWidth="0.4"/>;
        })}
      </svg>

      {/* Tiny serial label */}
      <div style={{
        position: 'absolute', top: 56, left: 24, right: 24,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5,
      }}>
        <span>PIKER · TIER UPGRADE</span>
        <span onClick={() => nav.go('dashboard')} style={{ color: theme.textSec, cursor: 'pointer' }}>SKIP</span>
      </div>

      {/* The mark */}
      <div style={{
        position: 'absolute', top: 150, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      }}>
        <Kicker theme={theme}>NEW TIER REACHED</Kicker>
        <div style={{ marginTop: 24 }}>
          <TierMark theme={theme} size={140} glyph="◈"/>
        </div>

        {/* The dramatic name — like the $100 from S1a */}
        <div style={{
          marginTop: 28,
          fontFamily: FONT_DISPLAY, fontSize: 76, fontWeight: 300,
          color: theme.text, letterSpacing: -2, lineHeight: 0.9,
        }}>DIAMOND</div>

        <div style={{ marginTop: 18, padding: '0 32px' }}>
          <Body theme={theme} style={{ textAlign: 'center', fontSize: 14 }}>
            You crossed <span style={{ color: theme.accent }}>70.0</span> Piker Score.<br/>
            Top 10% of Pro traders.
          </Body>
        </div>
      </div>

      {/* Unlocks — three single lines, like the mode card */}
      <div style={{ position: 'absolute', left: 28, right: 28, bottom: 130 }}>
        <Micro theme={theme}>DIAMOND UNLOCKS</Micro>
        <div style={{ marginTop: 10 }}>
          <HairlineList theme={theme}>
            {[
              'Prismatic profile frame',
              'Fund Me · expanded cap',
              'One step from Vault (Elite)',
            ].map((t, i) => (
              <HairlineRow key={i} theme={theme} padding="14px 4px">
                <span style={{ width: 24, color: theme.accent, fontFamily: FONT_MONO, fontSize: 13 }}>→</span>
                <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.textSec, letterSpacing: -0.2 }}>{t}</span>
              </HairlineRow>
            ))}
          </HairlineList>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 28, right: 28, bottom: 44 }}>
        <PrimaryCTA theme={theme} onClick={() => nav.go('dashboard')}>Continue Trading</PrimaryCTA>
      </div>
    </div>
  );
}

Object.assign(window, {
  ProIntro, ProDashboard, ProTrade, ProLeaderboard, ProProfile,
  FundMeTrader, FundMeBacker, Notifications, Milestone,
  RProLeaderRows,
});
