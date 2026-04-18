// rookie-screens.jsx — S2–S6

// ─── S2 — Rookie Dashboard ───────────────────────────────────
function RookieDashboard({ theme, nav }) {
  const days = [
    1,1,0,1,-1,1,1, 0,1,1,-1,1,1,1,
  ]; // 1=profit, -1=loss, 0=none
  return (
    <Screen theme={theme} navActive="home" onNavChange={nav.setTab}>
      <TopBar theme={theme} onModeClick={nav.toModeSwitch} right={
        <div style={{ display: 'flex', gap: 8 }}>
          <IconBtn theme={theme} icon="bell" onClick={() => nav.go('notifications')}/>
          <IconBtn theme={theme} icon="share"/>
        </div>
      }/>

      {/* Capital */}
      <Section theme={theme} pad="0 16px 0">
        <Card theme={theme} accent pad={18}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Label theme={theme}>Today's Capital</Label>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.accent, textAlign: 'right' }}>
              <div style={{ fontSize: 9, color: theme.textMut, letterSpacing: 0.6 }}>RESETS IN</div>
              <div style={{ fontWeight: 600 }}>14h 23m</div>
            </div>
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 40, fontWeight: 600, color: theme.text, letterSpacing: -1.8, lineHeight: 1, marginTop: 6 }}>
            $100.00
          </div>
          <div style={{ marginTop: 12 }}>
            <ProgressBar theme={theme} value={34} color={theme.accent}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontFamily: FONT_MONO, fontSize: 11, color: theme.textSec }}>
              <span>$34.20 deployed</span>
              <span>$65.80 available</span>
            </div>
          </div>
        </Card>
      </Section>

      {/* Today P&L */}
      <Section theme={theme} label="Today's P&L">
        <Card theme={theme}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <CountUp to={24.8} duration={1200} fmt={v => `+$${v.toFixed(2)}`} style={{
              fontFamily: FONT_MONO, fontSize: 32, fontWeight: 700, color: '#4ADE80', letterSpacing: -1,
            }}/>
            <span style={{ fontFamily: FONT_MONO, fontSize: 14, color: '#4ADE80' }}>+24.8%</span>
          </div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 12, color: theme.textSec, marginTop: 6 }}>
            Across 3 trades · 67% win rate today
          </div>
        </Card>
      </Section>

      {/* Streak */}
      <Section theme={theme}>
        <Card theme={theme}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>🔥</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 700, color: theme.text }}>Day 7 Streak</span>
            </div>
            <Chip theme={theme} color={theme.accent} bg={theme.accentFaint}>PROFITABLE</Chip>
          </div>
          <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
            {days.map((d, i) => (
              <div key={i} style={{
                flex: 1, height: 20, borderRadius: 3,
                background: d === 1 ? '#4ADE80' : d === -1 ? '#F87171' : theme.surfaceAlt,
                opacity: d === 0 ? 0.5 : 1,
              }}/>
            ))}
          </div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 11.5, color: theme.textSec }}>
            3 more days → <span style={{ color: theme.accent, fontWeight: 700 }}>⚡ Voltage</span> badge
          </div>
        </Card>
      </Section>

      {/* Daily challenge */}
      <Section theme={theme} label="Today's Challenge">
        <Card theme={theme}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: theme.accentFaint, border: `1px solid ${theme.accentDeep}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, fontSize: 20,
            }}>🎯</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13.5, color: theme.text, fontWeight: 600 }}>Make a profitable SOL/USDT trade</div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 5 }}>
                <Chip theme={theme} color={theme.accent} bg={theme.accentFaint} size="sm">+50 XP</Chip>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 11, color: theme.textMut }}>In progress</span>
              </div>
            </div>
            <Button theme={theme} variant="accent_outline" size="sm" full={false} onClick={() => nav.go('trade')}>Trade</Button>
          </div>
        </Card>
      </Section>

      {/* Open positions */}
      <Section theme={theme} label="Open Positions (2)" right={
        <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: '#4ADE80' }}>● LIVE</span>
      }>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <PositionRow theme={theme} pair="SOL/USDT" dir="LONG"  entry="142.40" pl={8.42}/>
          <PositionRow theme={theme} pair="BTC/USDT" dir="SHORT" entry="58,240.20" pl={-2.10}/>
        </div>
      </Section>

      {/* Mini leaderboard */}
      <Section theme={theme} label="Today's Leaderboard" right={
        <span onClick={() => nav.go('leaderboard')} style={{ fontFamily: FONT_DISPLAY, fontSize: 12, color: theme.accent, cursor: 'pointer' }}>View all →</span>
      }>
        <Card theme={theme} pad={0}>
          {[
            { r: 1, n: 'alpha.king', streak: 14, pl: 84.20, plPct: 84.2 },
            { r: 2, n: 'moonshot',   streak: 8,  pl: 62.10, plPct: 62.1 },
            { r: 3, n: 'hodl.life',  streak: 5,  pl: 48.90, plPct: 48.9 },
          ].map(r => <LbRow key={r.r} theme={theme} row={r}/>)}
          <div style={{ borderTop: `1px solid ${theme.border}`, background: theme.accentFaint, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
            <LbRow theme={theme} row={{ r: 312, n: '@pikerkid', streak: 7, pl: 24.80, plPct: 24.8, me: true }} isLast/>
          </div>
        </Card>
      </Section>

      {/* Go Pro CTA */}
      <Section theme={theme}>
        <div onClick={() => nav.go('pro-intro')} style={{
          padding: '14px 16px', borderRadius: 12,
          background: `${PRO.accent}15`,
          border: `1px solid ${PRO.accentDeep}`,
          display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
        }}>
          <span style={{ fontSize: 18, color: PRO.accent }}>◆</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 700, color: PRO.accent }}>Ready for real money?</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 11.5, color: theme.textSec, marginTop: 1 }}>Go Pro · keep 80% of profits</div>
          </div>
          <span style={{ color: PRO.accent, fontFamily: FONT_MONO }}>→</span>
        </div>
      </Section>
    </Screen>
  );
}

// ─── S3 — Rookie Trade View ──────────────────────────────────
function RookieTrade({ theme, nav }) {
  const [pair, setPair] = React.useState('BTC/USDT');
  const [tf, setTf] = React.useState('1h');
  const [side, setSide] = React.useState('long');
  const [orderType, setOrderType] = React.useState('limit');
  const [size, setSize] = React.useState('20');
  const [leverage, setLeverage] = React.useState(5);
  const pairs = [
    { p: 'BTC/USDT', c: 2.4  }, { p: 'ETH/USDT', c: 1.8  },
    { p: 'SOL/USDT', c: -0.9 }, { p: 'BNB/USDT', c: 0.4  },
    { p: 'DOGE/USDT', c: 5.2 }, { p: 'PEPE/USDT', c: 12.3 },
  ];
  return (
    <Screen theme={theme} navActive="trade" onNavChange={nav.setTab}>
      <TopBar theme={theme} onModeClick={nav.toModeSwitch} right={
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          fontFamily: FONT_MONO, fontSize: 10.5, color: theme.accent, fontWeight: 600,
          padding: '5px 9px', background: theme.surface,
          border: `1px solid ${theme.border}`, borderRadius: 999,
        }}>
          <span style={{ color: theme.textMut }}>●</span>14h 23m
        </div>
      }/>
      <div style={{
        padding: '0 16px 12px', display: 'flex', gap: 6, overflowX: 'auto',
      }}>
        {pairs.map(x => <PairPill key={x.p} theme={theme} pair={x.p.split('/')[0]} change={x.c} active={pair === x.p} onClick={() => setPair(x.p)}/>)}
      </div>
      <div style={{ padding: '0 16px 10px' }}>
        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12,
          padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 11, color: theme.textMut, fontWeight: 600, letterSpacing: 0.5 }}>{pair}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 22, fontWeight: 600, color: theme.text, letterSpacing: -0.5 }}>58,243.20</span>
              <Chip theme={theme} color="#4ADE80" bg="rgba(74,222,128,0.12)" size="sm">+2.40%</Chip>
            </div>
          </div>
          <div style={{ textAlign: 'right', fontFamily: FONT_MONO, fontSize: 10.5, color: theme.textMut, lineHeight: 1.5 }}>
            <div>H <span style={{ color: theme.textSec }}>58,892</span></div>
            <div>L <span style={{ color: theme.textSec }}>56,410</span></div>
            <div>Fund <span style={{ color: '#4ADE80' }}>0.012%</span></div>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 16px 6px', display: 'flex', gap: 4 }}>
        {['1m','5m','15m','1h','4h','1D'].map(t => (
          <div key={t} onClick={() => setTf(t)} style={{
            padding: '4px 8px', borderRadius: 6,
            background: tf === t ? theme.accentFaint : 'transparent',
            color: tf === t ? theme.accent : theme.textMut,
            fontFamily: FONT_MONO, fontSize: 10.5, fontWeight: 600, cursor: 'pointer',
          }}>{t}</div>
        ))}
      </div>
      <div style={{ padding: '0 16px 10px' }}>
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, overflow: 'hidden' }}>
          <AreaChart theme={theme} height={200} seed={pair.length + 1}/>
        </div>
      </div>
      <div style={{ padding: '0 16px 10px' }}><OrderBook theme={theme}/></div>

      {/* Capital status bar — unique to rookie */}
      <div style={{ padding: '0 16px 10px' }}>
        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: '10px 12px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: theme.textSec }}>$65.80 / $100.00</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 10.5, color: theme.textMut }}>14h 23m to reset</span>
          </div>
          <ProgressBar theme={theme} value={34} height={4} color={theme.accent}/>
        </div>
      </div>

      {/* Order entry */}
      <div style={{ padding: '0 16px 10px' }}>
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 14 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            {['long', 'short'].map(s => {
              const active = side === s;
              const c = s === 'long' ? '#4ADE80' : '#F87171';
              return (
                <div key={s} onClick={() => setSide(s)} style={{
                  flex: 1, padding: '10px', borderRadius: 8,
                  background: active ? `${c}25` : theme.surfaceAlt,
                  border: `1px solid ${active ? c : theme.border}`,
                  color: active ? c : theme.textSec,
                  fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 700,
                  textAlign: 'center', cursor: 'pointer', letterSpacing: 0.5,
                }}>{s.toUpperCase()}</div>
              );
            })}
          </div>
          <div style={{ marginBottom: 10 }}>
            <Segmented theme={theme} value={orderType} onChange={setOrderType} size="sm" options={[
              { value: 'market', label: 'Market' },
              { value: 'limit', label: 'Limit' },
              { value: 'stop', label: 'Stop' },
            ]}/>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10,
            background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 8, padding: '8px 10px',
          }}>
            <Label theme={theme} style={{ width: 40 }}>SIZE</Label>
            <input value={size} onChange={e => setSize(e.target.value)} style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: FONT_MONO, fontSize: 15, color: theme.text, textAlign: 'right',
            }}/>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: theme.textMut }}>USDT</span>
            <span onClick={() => setSize('65.80')} style={{ fontFamily: FONT_DISPLAY, fontSize: 10, color: theme.accent, cursor: 'pointer', fontWeight: 700 }}>MAX</span>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontFamily: FONT_DISPLAY, fontSize: 11 }}>
              <span style={{ color: theme.textMut }}>LEVERAGE</span>
              <span style={{ fontFamily: FONT_MONO, color: theme.accent, fontWeight: 700 }}>{leverage}×</span>
            </div>
            <input type="range" min="1" max="20" value={leverage} onChange={e => setLeverage(+e.target.value)}
              style={{ width: '100%', accentColor: theme.accent }}/>
          </div>
          <div style={{
            padding: '8px 10px', background: theme.surfaceAlt, borderRadius: 8,
            fontFamily: FONT_MONO, fontSize: 10.5, color: theme.textMut, marginBottom: 12,
          }}>Using <span style={{ color: theme.text }}>${size}</span> of <span style={{ color: theme.text }}>$65.80</span> available</div>
          <Button theme={theme} size="lg" variant={side === 'long' ? 'long' : 'short'}>
            {side === 'long' ? 'Long' : 'Short'} {pair.split('/')[0]}
          </Button>
        </div>
      </div>

      <div style={{ padding: '0 16px 10px' }}>
        <div style={{ display: 'flex', gap: 18, borderBottom: `1px solid ${theme.border}`, marginBottom: 8 }}>
          {['Positions (2)', 'Orders', 'History'].map((t, i) => (
            <div key={t} style={{
              padding: '8px 0', fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 600,
              color: i === 0 ? theme.accent : theme.textMut,
              borderBottom: i === 0 ? `2px solid ${theme.accent}` : 'none', marginBottom: -1,
            }}>{t}</div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <PositionRow theme={theme} pair="SOL/USDT" dir="LONG" entry="142.40" pl={8.42}/>
        </div>
      </div>
    </Screen>
  );
}

// ─── S4 — Rookie Session Summary ─────────────────────────────
function RookieSummary({ theme, nav }) {
  return (
    <Screen theme={theme} navActive="home" onNavChange={nav.setTab}>
      <TopBar theme={theme} onModeClick={nav.toModeSwitch} right={<IconBtn theme={theme} icon="close" onClick={() => nav.go('dashboard')}/>}/>
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 700, color: theme.text, letterSpacing: -0.5 }}>Today's Summary</div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: theme.textMut, marginTop: 2 }}>April 18 · closed at 23:59 UTC</div>
      </div>
      <Section theme={theme}>
        <Card theme={theme} accent pad={18}>
          <CountUp to={24.80} duration={1400} fmt={v => `+$${v.toFixed(2)}`} style={{
            fontFamily: FONT_MONO, fontSize: 44, fontWeight: 700, color: '#4ADE80', letterSpacing: -1.5, lineHeight: 1,
          }}/>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, color: theme.textSec, marginTop: 6 }}>
            on $100 virtual capital · <span style={{ color: '#4ADE80' }}>+24.8%</span>
          </div>
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px dashed ${theme.border}` }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10.5, color: theme.textMut }}>$34.20 of $100 deployed · 34% capital usage</div>
          </div>
        </Card>
      </Section>
      <Section theme={theme} label="Breakdown">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
          <StatCard theme={theme} label="Trades" value="3" mono={false}/>
          <StatCard theme={theme} label="Win Rate" value="67%" mono={false}/>
          <StatCard theme={theme} label="Best · SOL" value="+$14.20" sub="+62%"/>
          <StatCard theme={theme} label="Worst · BTC" value="-$2.10" sub="-12%"/>
        </div>
      </Section>
      <Section theme={theme}>
        <Card theme={theme}>
          <Label theme={theme}>Leaderboard Movement</Label>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 24, fontWeight: 700, color: '#4ADE80' }}>↑ 535</span>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12.5, color: theme.textSec }}>ranks today</span>
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: theme.text, marginTop: 4 }}>#847 → #312</div>
        </Card>
      </Section>
      <Section theme={theme}>
        <Card theme={theme}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>🔥</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 700, color: theme.text }}>Streak extended · Day 8</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 11.5, color: theme.textSec, marginTop: 2 }}>2 more days → ⚡ Voltage</div>
            </div>
          </div>
        </Card>
      </Section>
      <Section theme={theme}>
        <div style={{
          background: theme.surfaceElev, border: `1px solid ${theme.accentDeep}`, borderRadius: 12, padding: 14,
          boxShadow: `0 0 0 3px ${theme.accentFaint}`,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 12,
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDeep})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, color: '#0A0A0D',
          }}>🎯</div>
          <div style={{ flex: 1 }}>
            <Label theme={theme} style={{ color: theme.accent }}>BADGE UNLOCKED</Label>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 700, color: theme.text, marginTop: 2 }}>Sniper</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 11, color: theme.textSec, marginTop: 1 }}>Top 10 on Rookie board today</div>
          </div>
        </div>
      </Section>
      <Section theme={theme}>
        <Card theme={theme}>
          <Label theme={theme}>Share today's card</Label>
          <div style={{
            marginTop: 10, padding: 14, borderRadius: 10,
            background: `linear-gradient(135deg, ${theme.surfaceAlt}, ${theme.surface})`,
            border: `1.5px solid ${theme.accentDeep}`, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 10, right: 14,
              fontFamily: FONT_DISPLAY, fontSize: 9, fontWeight: 800,
              color: theme.accent, letterSpacing: 1.5, opacity: 0.8,
            }}>◈ ROOKIE MODE</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 11, color: theme.textMut }}>@pikerkid</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 28, color: '#4ADE80', fontWeight: 700, marginTop: 4, letterSpacing: -1 }}>+$24.80</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 11, color: theme.textSec, marginTop: 4 }}>Rank #312 · 8 day streak · 🎯 Sniper</div>
            <div style={{
              position: 'absolute', bottom: -20, right: -20, fontFamily: FONT_DISPLAY,
              fontSize: 80, fontWeight: 900, color: theme.watermarkColor, letterSpacing: 4,
              transform: 'rotate(-10deg)', pointerEvents: 'none',
            }}>ROOKIE</div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <Button theme={theme} variant="outline" size="sm">Twitter</Button>
            <Button theme={theme} variant="outline" size="sm">Discord</Button>
            <Button theme={theme} variant="outline" size="sm">Story</Button>
          </div>
        </Card>
      </Section>
      <Section theme={theme}>
        <Card theme={theme}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <Label theme={theme}>Next reset</Label>
            <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: theme.accent }}>14h 23m</span>
          </div>
          <ProgressBar theme={theme} value={40} color={theme.accent}/>
          <div style={{ marginTop: 8, fontFamily: FONT_DISPLAY, fontSize: 12, color: theme.textSec }}>
            Your $100 reloads tonight — fresh start, new board.
          </div>
        </Card>
      </Section>
    </Screen>
  );
}

// ─── S5 — Rookie Leaderboard ─────────────────────────────────
function RookieLeaderboard({ theme, nav }) {
  const [tab, setTab] = React.useState('today');
  const rows = [
    { r: 1, n: 'alpha.king',   streak: 14, pl: 84.20, plPct: 84.2 },
    { r: 2, n: 'moonshot',     streak: 8,  pl: 62.10, plPct: 62.1 },
    { r: 3, n: 'hodl.life',    streak: 5,  pl: 48.90, plPct: 48.9 },
    { r: 4, n: 'degen.labs',   streak: 3,  pl: 42.30, plPct: 42.3 },
    { r: 5, n: 'whale.eth',    streak: 11, pl: 38.70, plPct: 38.7 },
    { r: 6, n: 'ape.god',      streak: 2,  pl: 34.10, plPct: 34.1 },
    { r: 7, n: 'sol.army',     streak: 6,  pl: 31.40, plPct: 31.4 },
    { r: 8, n: 'candle.light', streak: 4,  pl: 28.20, plPct: 28.2 },
    { r: 9, n: 'fomo.free',    streak: 9,  pl: 26.10, plPct: 26.1 },
    { r: 10, n: 'btc.max',     streak: 1,  pl: 25.50, plPct: 25.5 },
  ];
  return (
    <Screen theme={theme} navActive="leaderboard" onNavChange={nav.setTab}>
      <TopBar theme={theme} onModeClick={nav.toModeSwitch} right={<IconBtn theme={theme} icon="search"/>}/>
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 700, color: theme.text, letterSpacing: -0.6 }}>Rookie Board</div>
      </div>
      <div style={{ padding: '0 16px 10px' }}>
        <Segmented theme={theme} value={tab} onChange={setTab} options={[
          { value: 'today',    label: 'Today' },
          { value: 'all-time', label: 'All-Time' },
          { value: 'streak',   label: 'My Streak' },
        ]}/>
      </div>
      {tab === 'today' && (
        <>
          <div style={{ padding: '0 16px 12px' }}>
            <div style={{
              background: theme.accentFaint, border: `1px solid ${theme.accentDeep}`, borderRadius: 10,
              padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: theme.accent, boxShadow: `0 0 6px ${theme.accent}` }}/>
              <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 12, color: theme.accent, fontWeight: 600 }}>Today's board resets in</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: theme.accent, fontWeight: 700 }}>14h 23m</span>
            </div>
          </div>
          <div style={{
            padding: '4px 22px 6px', display: 'grid', gridTemplateColumns: '36px 28px 1fr 80px',
            fontFamily: FONT_DISPLAY, fontSize: 9.5, color: theme.textMut, letterSpacing: 0.9, textTransform: 'uppercase', fontWeight: 600,
          }}>
            <span>Rank</span><span/><span>Trader · Streak</span>
            <span style={{ textAlign: 'right' }}>P&amp;L</span>
          </div>
          <div style={{ padding: '0 16px' }}>
            <Card theme={theme} pad={0}>
              {rows.map((r, i) => <LbRow key={r.r} theme={theme} row={r} isLast={i === rows.length - 1}/>)}
            </Card>
          </div>
          <div style={{ padding: '14px 16px 0' }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 9.5, color: theme.textMut, letterSpacing: 1.5, marginBottom: 6, textAlign: 'center' }}>— YOUR POSITION —</div>
            <div style={{ border: `1.5px solid ${theme.accentDeep}`, borderRadius: 12, background: theme.accentFaint, boxShadow: `0 0 0 3px ${theme.accentFaint}` }}>
              <LbRow theme={theme} row={{ r: 312, n: '@pikerkid', streak: 7, pl: 24.80, plPct: 24.8, me: true }} isLast/>
            </div>
          </div>
        </>
      )}
      {tab === 'all-time' && (
        <div style={{ padding: '0 16px' }}>
          <Card theme={theme} pad={0}>
            {rows.map((r, i) => <LbRow key={r.r} theme={theme} row={{...r, pl: r.pl * 8, plPct: (r.pl*4).toFixed(0) }} isLast={i === rows.length - 1}/>)}
          </Card>
        </div>
      )}
      {tab === 'streak' && (
        <div style={{ padding: '0 16px' }}>
          <Card theme={theme}>
            <Label theme={theme}>Last 30 days</Label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 4, marginTop: 10 }}>
              {Array.from({ length: 30 }).map((_, i) => {
                const v = i % 7 === 3 ? -1 : (i % 4 === 0 ? 0 : 1);
                return <div key={i} style={{
                  aspectRatio: '1', borderRadius: 4,
                  background: v === 1 ? '#4ADE80' : v === -1 ? '#F87171' : theme.surfaceAlt,
                  opacity: v === 0 ? 0.5 : 1,
                }}/>;
              })}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 14 }}>
              <div><Label theme={theme}>Current</Label><div style={{ fontFamily: FONT_MONO, fontSize: 20, fontWeight: 700, color: theme.text, marginTop: 2 }}>7 days 🔥</div></div>
              <div><Label theme={theme}>Longest</Label><div style={{ fontFamily: FONT_MONO, fontSize: 20, fontWeight: 700, color: theme.text, marginTop: 2 }}>14 days</div></div>
              <div><Label theme={theme}>Profitable</Label><div style={{ fontFamily: FONT_MONO, fontSize: 20, fontWeight: 700, color: '#4ADE80', marginTop: 2 }}>21/30</div></div>
              <div><Label theme={theme}>Total</Label><div style={{ fontFamily: FONT_MONO, fontSize: 20, fontWeight: 700, color: theme.text, marginTop: 2 }}>30</div></div>
            </div>
          </Card>
        </div>
      )}
    </Screen>
  );
}

// ─── S6 — Rookie Profile ─────────────────────────────────────
function RookieProfile({ theme, nav }) {
  return (
    <Screen theme={theme} navActive="profile" onNavChange={nav.setTab}>
      <TopBar theme={theme} onModeClick={nav.toModeSwitch} right={<IconBtn theme={theme} icon="settings"/>}/>
      <div style={{ padding: '0 16px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <Avatar name="pikerkid" size={72} tier="silver"/>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 19, fontWeight: 700, color: theme.text }}>@pikerkid</div>
          <div style={{ marginTop: 5, display: 'flex', gap: 6, alignItems: 'center' }}>
            <ModePill theme={theme}/>
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10.5, color: theme.textMut, marginTop: 6 }}>
            48 followers · 32 following
          </div>
        </div>
      </div>
      <Section theme={theme}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          <StatCard theme={theme} label="Streak" value="7d" compact mono={false}/>
          <StatCard theme={theme} label="Best Day" value="+$48" compact/>
          <StatCard theme={theme} label="Profit" value="21/30" compact mono={false}/>
          <StatCard theme={theme} label="Trades" value="54" compact/>
        </div>
      </Section>
      <Section theme={theme} label="Streak — last 30 days">
        <Card theme={theme}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 4 }}>
            {Array.from({ length: 30 }).map((_, i) => {
              const v = i % 7 === 3 ? -1 : (i % 4 === 0 ? 0 : 1);
              return <div key={i} style={{
                aspectRatio: '1', borderRadius: 4,
                background: v === 1 ? '#4ADE80' : v === -1 ? '#F87171' : theme.surfaceAlt,
                opacity: v === 0 ? 0.5 : 1,
              }}/>;
            })}
          </div>
        </Card>
      </Section>
      <Section theme={theme} label="Badges (3 / 9)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          <BadgeTile theme={theme} icon="🩸" name="First Blood" earned/>
          <BadgeTile theme={theme} icon="🔥" name="On Fire" earned/>
          <BadgeTile theme={theme} icon="🎯" name="Sniper" earned/>
          <BadgeTile theme={theme} icon="⚡" name="Voltage" hint="3d to go"/>
          <BadgeTile theme={theme} icon="💎" name="Diamond"/>
          <BadgeTile theme={theme} icon="👑" name="Day King"/>
          <BadgeTile theme={theme} icon="💀" name="No Mercy"/>
          <BadgeTile theme={theme} icon="🧊" name="Ice Veins"/>
        </div>
      </Section>
      <Section theme={theme}>
        <div style={{
          background: `${PRO.accent}15`, border: `1px solid ${PRO.accentDeep}`, borderRadius: 12, padding: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ color: PRO.accent, fontSize: 14 }}>◆</span>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 700, color: PRO.accent }}>You qualify for Fund Me</span>
          </div>
          {[
            '14+ days traded',
            'Top 20% leaderboard',
            '60%+ profitable days',
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4,
              fontFamily: FONT_DISPLAY, fontSize: 12, color: theme.textSec }}>
              <span style={{ color: '#4ADE80' }}>✓</span>{t}
            </div>
          ))}
          <div style={{ marginTop: 10 }}>
            <Button theme={PRO} size="md" onClick={() => nav.go('pro-intro')}>Enable Fund Me</Button>
          </div>
        </div>
      </Section>
      <Section theme={theme} label="Recent Trades">
        <Card theme={theme} pad={0}>
          {[
            { p: 'SOL/USDT', d: 'LONG',  v: 14.20,  t: '2h ago' },
            { p: 'BTC/USDT', d: 'SHORT', v: -2.10,  t: '3h ago' },
            { p: 'ETH/USDT', d: 'LONG',  v: 12.70,  t: '5h ago' },
            { p: 'DOGE/USDT',d: 'LONG',  v: 5.40,   t: 'Yesterday' },
          ].map((x, i, a) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
              borderBottom: i < a.length - 1 ? `1px solid ${theme.border}` : 'none',
            }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12.5, color: theme.text, fontWeight: 600, flex: 1 }}>{x.p}</span>
              <Chip theme={theme} color={x.d === 'LONG' ? '#4ADE80' : '#F87171'}
                bg={x.d === 'LONG' ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)'} size="sm">{x.d}</Chip>
              <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: x.v >= 0 ? '#4ADE80' : '#F87171', width: 70, textAlign: 'right' }}>
                {x.v >= 0 ? '+' : ''}${x.v.toFixed(2)}
              </span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, width: 70, textAlign: 'right' }}>{x.t}</span>
            </div>
          ))}
        </Card>
      </Section>
    </Screen>
  );
}

Object.assign(window, { RookieDashboard, RookieTrade, RookieSummary, RookieLeaderboard, RookieProfile });
