// rookie-screens.jsx — S2–S6 · restrained rebuild matching onboarding.
// Hairline borders, generous whitespace, one accent (silver-purple),
// monogram-style numbers, no emoji.

// ─── S2 — Rookie Dashboard ───────────────────────────────────
function RookieDashboard({ theme, nav }) {
  const days = [1,1,0,1,-1,1,1, 0,1,1,-1,1,1,1];
  return (
    <RScreen theme={theme} navActive="home" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<>
          <span onClick={() => nav.go('notifications')} style={{
            fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 1.5,
            color: theme.textSec, cursor: 'pointer',
          }}>INBOX · 3</span>
        </>}/>

      {/* Hero capital — the $100 from S1a, scaled to dashboard */}
      <div style={{ padding: '18px 24px 28px' }}>
        <Kicker theme={theme}>01 · DAILY CAPITAL</Kicker>
        <div style={{ marginTop: 18, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <BigNum theme={theme} prefix="$" number="100" suffix=".00" size={120}/>
          <div style={{ textAlign: 'right', paddingBottom: 10 }}>
            <Micro theme={theme}>RESETS IN</Micro>
            <div style={{
              fontFamily: FONT_MONO, fontSize: 13, color: theme.accent,
              letterSpacing: 0.5, marginTop: 6, fontWeight: 500,
            }}>14H 23M</div>
          </div>
        </div>
        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10,
            fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5 }}>
            <span>$34.20 DEPLOYED</span>
            <span>$65.80 AVAILABLE</span>
          </div>
          <div style={{ height: 2, background: theme.border, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '34%', background: theme.accent }}/>
          </div>
        </div>
      </div>

      {/* Today's P&L — single bold number, quiet supporting text */}
      <div style={{ padding: '18px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut} style={{ color: theme.textMut }}>02 · TODAY · P&amp;L</Kicker>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <CountUp to={24.8} duration={1200} fmt={v => `+$${v.toFixed(2)}`} style={{
            fontFamily: FONT_DISPLAY, fontSize: 52, fontWeight: 400, color: '#4ADE80',
            letterSpacing: -2, lineHeight: 0.95,
          }}/>
          <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: '#4ADE80', letterSpacing: 0.5 }}>+24.8%</span>
        </div>
        <Body theme={theme} style={{ marginTop: 10, fontSize: 13 }}>
          Three trades · 67% win rate today
        </Body>
      </div>

      {/* Streak — same dot rail as ProgressRail */}
      <div style={{ padding: '20px 24px', borderTop: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Kicker theme={theme} color={theme.textMut}>03 · STREAK · DAY 07</Kicker>
          <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.accent, letterSpacing: 1.5 }}>PROFITABLE</span>
        </div>
        <div style={{ marginTop: 16 }}>
          <StreakStrip theme={theme} values={days}/>
        </div>
        <div style={{ marginTop: 14, fontFamily: FONT_DISPLAY, fontSize: 13, color: theme.textSec }}>
          Three more days to <span style={{ color: theme.accent, fontStyle: 'italic' }}>Voltage</span>.
        </div>
      </div>

      {/* Today's challenge — single line, hairline */}
      <div style={{ padding: '20px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>04 · TODAY'S CHALLENGE</Kicker>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{
            width: 40, height: 40, flexShrink: 0,
            border: `1px solid ${theme.accentDeep}`, borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: theme.accent, fontFamily: FONT_MONO, fontSize: 14,
          }}>◎</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 500,
              color: theme.text, letterSpacing: -0.2,
            }}>Make a profitable SOL/USDT trade</div>
            <div style={{ marginTop: 4, fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5 }}>
              REWARD · +50 XP &nbsp;·&nbsp; IN PROGRESS
            </div>
          </div>
          <span onClick={() => nav.go('trade')} style={{
            fontFamily: FONT_MONO, fontSize: 16, color: theme.accent, cursor: 'pointer',
            paddingLeft: 8,
          }}>→</span>
        </div>
      </div>

      {/* Open positions — hairline rows */}
      <div style={{ padding: '20px 24px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="OPEN POSITIONS · 02"
          right={<span style={{ fontFamily: FONT_MONO, fontSize: 9.5, color: '#4ADE80', letterSpacing: 1.5 }}>● LIVE</span>}/>
        <RHairPositions theme={theme} rows={[
          { pair: 'SOL/USDT', dir: 'L', entry: '142.40', pl: 8.42, pct: 8.4 },
          { pair: 'BTC/USDT', dir: 'S', entry: '58,240.20', pl: -2.10, pct: -2.1 },
        ]}/>
      </div>

      {/* Mini leaderboard — hairline ladder */}
      <div style={{ padding: '20px 24px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="TODAY'S BOARD"
          right={<span onClick={() => nav.go('leaderboard')} style={{
            fontFamily: FONT_MONO, fontSize: 10, color: theme.accent,
            letterSpacing: 1.5, cursor: 'pointer',
          }}>VIEW ALL →</span>}/>
        <RLeaderRows theme={theme} rows={[
          { r: '001', n: 'alpha.king', v: '+84.20' },
          { r: '002', n: 'moonshot',   v: '+62.10' },
          { r: '003', n: 'hodl.life',  v: '+48.90' },
        ]}/>
        <div style={{ marginTop: 0 }}>
          <RLeaderRows theme={theme} rows={[
            { r: '312', n: 'pikerkid', v: '+24.80', me: true },
          ]} firstBorder={false}/>
        </div>
      </div>

      {/* Go Pro — single hairline statement */}
      <div style={{ padding: '20px 24px 28px', borderTop: `1px solid ${theme.border}` }}>
        <div onClick={() => nav.go('pro-intro')} style={{
          display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
        }}>
          <TierMark theme={{ accent: PRO.accent }} size={36} accent={PRO.accent}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 500,
              color: PRO.accent, letterSpacing: -0.2,
            }}>Ready for real money?</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5, marginTop: 4 }}>
              GO PRO · KEEP 80% OF PROFITS
            </div>
          </div>
          <span style={{ fontFamily: FONT_MONO, fontSize: 16, color: PRO.accent }}>→</span>
        </div>
      </div>
    </RScreen>
  );
}

// ─── Hairline positions list ─────────────────────────────────
function RHairPositions({ theme, rows }) {
  return (
    <HairlineList theme={theme}>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '24px 1fr 1fr auto',
          alignItems: 'center', gap: 14, padding: '14px 4px',
        }}>
          <span style={{
            fontFamily: FONT_MONO, fontSize: 11, fontWeight: 600,
            color: r.dir === 'L' ? '#4ADE80' : '#F87171', letterSpacing: 1.5,
          }}>{r.dir}</span>
          <div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 500, color: theme.text, letterSpacing: -0.2 }}>{r.pair}</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1, marginTop: 3 }}>ENTRY {r.entry}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: FONT_MONO, fontSize: 14, fontWeight: 500,
              color: r.pl >= 0 ? '#4ADE80' : '#F87171',
            }}>{r.pl >= 0 ? '+' : ''}${Math.abs(r.pl).toFixed(2)}</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, marginTop: 3 }}>
              {r.pl >= 0 ? '+' : ''}{r.pct.toFixed(2)}%
            </div>
          </div>
          <span style={{ fontFamily: FONT_MONO, fontSize: 14, color: theme.textMut, paddingLeft: 4 }}>×</span>
        </div>
      ))}
    </HairlineList>
  );
}

// ─── Hairline leader rows (rookie style: just P&L) ──────────
function RLeaderRows({ theme, rows, firstBorder = true }) {
  return (
    <div>
      {rows.map((r, i) => (
        <div key={i} style={{
          position: 'relative',
          display: 'grid', gridTemplateColumns: '46px 1fr auto',
          alignItems: 'center', gap: 14,
          padding: '12px 4px',
          borderTop: firstBorder && i === 0 ? `1px solid ${theme.border}` : (i > 0 ? 'none' : 'none'),
          borderBottom: `1px solid ${r.me ? theme.accent : theme.border}`,
          background: r.me ? theme.accent + '08' : 'transparent',
        }}>
          {r.me && <span style={{
            position: 'absolute', left: -4, top: 0, bottom: 0, width: 2, background: theme.accent,
          }}/>}
          <span style={{
            fontFamily: FONT_MONO, fontSize: 11,
            color: r.me ? theme.accent : theme.textMut,
            letterSpacing: 0.5, fontWeight: r.me ? 700 : 500,
          }}>#{r.r}</span>
          <span style={{
            fontFamily: FONT_DISPLAY, fontSize: 14,
            color: r.me ? theme.text : theme.textSec,
            fontWeight: r.me ? 500 : 400, letterSpacing: -0.2,
            fontStyle: r.me ? 'italic' : 'normal',
          }}>{r.me ? 'you' : r.n}</span>
          <span style={{
            fontFamily: FONT_MONO, fontSize: 12.5,
            color: '#4ADE80', fontWeight: r.me ? 600 : 500,
          }}>{r.v}</span>
        </div>
      ))}
    </div>
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
    { p: 'BTC/USDT', c: 2.4 }, { p: 'ETH/USDT', c: 1.8 },
    { p: 'SOL/USDT', c: -0.9 }, { p: 'BNB/USDT', c: 0.4 },
    { p: 'DOGE/USDT', c: 5.2 }, { p: 'PEPE/USDT', c: 12.3 },
  ];
  return (
    <RScreen theme={theme} navActive="trade" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<RPill theme={theme} color={theme.accent}>● 14H 23M</RPill>}/>

      {/* Pair selector — hairline pills */}
      <div style={{ padding: '0 24px 18px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {pairs.map(x => <RPairPill key={x.p} theme={theme}
          pair={x.p.split('/')[0]} change={x.c}
          active={pair === x.p} onClick={() => setPair(x.p)}/>)}
      </div>

      {/* Price hero */}
      <div style={{ padding: '0 24px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <Kicker theme={theme} color={theme.textMut}>{pair}</Kicker>
            <div style={{ marginTop: 8 }}>
              <BigNum theme={theme} number="58,243" suffix=".20" size={56} suffixColor="#4ADE80"/>
            </div>
            <div style={{ marginTop: 6, fontFamily: FONT_MONO, fontSize: 11, color: '#4ADE80', letterSpacing: 0.5 }}>
              +2.40% &nbsp;·&nbsp; <span style={{ color: theme.textMut }}>H 58,892 · L 56,410</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeframe — hairline tabs */}
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

      {/* Chart — restrained, hairline frame */}
      <div style={{ padding: '0 24px 18px' }}>
        <div style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`, overflow: 'hidden' }}>
          <AreaChart theme={theme} height={180} seed={pair.length + 1}/>
        </div>
      </div>

      {/* Order book — condensed */}
      <OrderBook theme={theme} base={142.50}/>

      {/* Capital strip — same hairline treatment as dashboard */}
      <div style={{ padding: '0 24px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8,
          fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5 }}>
          <span>$65.80 / $100.00 AVAILABLE</span>
          <span>RESETS · 14H 23M</span>
        </div>
        <div style={{ height: 2, background: theme.border, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '34%', background: theme.accent }}/>
        </div>
      </div>

      {/* Order entry — same input style as username screen */}
      <div style={{ padding: '0 24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <div style={{ paddingTop: 20 }}>
          <Kicker theme={theme}>ORDER</Kicker>
        </div>

        {/* Long / Short toggle */}
        <div style={{ display: 'flex', gap: 0, marginTop: 14, borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}>
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

        {/* Order type segmented — hairline pills */}
        <div style={{ display: 'flex', gap: 18, marginTop: 18 }}>
          {['market','limit','stop'].map(o => (
            <div key={o} onClick={() => setOrderType(o)} style={{
              fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 1.8,
              color: orderType === o ? theme.accent : theme.textMut,
              fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase',
              paddingBottom: 6,
              borderBottom: orderType === o ? `1px solid ${theme.accent}` : '1px solid transparent',
            }}>{o}</div>
          ))}
        </div>

        {/* Size — same large-input pattern as username */}
        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6,
            fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut, letterSpacing: 2 }}>
            <span>SIZE</span>
            <span onClick={() => setSize('65.80')} style={{ color: theme.accent, cursor: 'pointer' }}>MAX</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, paddingBottom: 10, borderBottom: `1px solid ${theme.border}` }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 400, color: theme.textMut, letterSpacing: -0.5 }}>$</span>
            <input value={size} onChange={e => setSize(e.target.value)} style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 400,
              color: theme.text, letterSpacing: -0.5, padding: 0, caretColor: theme.accent,
            }}/>
            <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 2 }}>USDT</span>
          </div>
        </div>

        {/* Leverage */}
        <div style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8,
            fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut, letterSpacing: 2 }}>
            <span>LEVERAGE</span>
            <span style={{ color: theme.accent }}>{leverage}×</span>
          </div>
          <input type="range" min="1" max="20" value={leverage}
            onChange={e => setLeverage(+e.target.value)}
            style={{ width: '100%', accentColor: theme.accent }}/>
        </div>

        {/* TP / SL grid */}
        <TPSLFields theme={theme} basePrice={142.50}/>

        {/* Quiet helper line */}
        <div style={{
          marginTop: 16, fontFamily: FONT_MONO, fontSize: 10,
          color: theme.textMut, letterSpacing: 1.2,
        }}>USING <span style={{ color: theme.text }}>${size}</span> OF <span style={{ color: theme.text }}>$65.80</span> AVAILABLE</div>

        {/* CTA — same shape as Continue button in onboarding */}
        <div style={{ marginTop: 22 }}>
          <AccentCTA theme={theme} tone={side === 'long' ? 'long' : 'short'}>
            {side === 'long' ? 'Long' : 'Short'} {pair.split('/')[0]}
          </AccentCTA>
        </div>
      </div>

      {/* Positions list */}
      <div style={{ padding: '20px 24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="POSITIONS · 02"/>
        <RHairPositions theme={theme} rows={[
          { pair: 'SOL/USDT', dir: 'L', entry: '142.40', pl: 8.42, pct: 8.4 },
        ]}/>
      </div>
    </RScreen>
  );
}

function RPairPill({ theme, pair, change, active, onClick }) {
  const pos = change >= 0;
  return (
    <div onClick={onClick} style={{
      flexShrink: 0, padding: '6px 14px', borderRadius: 999,
      border: `1px solid ${active ? theme.accent : theme.border}`,
      background: active ? theme.accent + '10' : 'transparent',
      cursor: 'pointer',
    }}>
      <div style={{
        fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600,
        color: active ? theme.accent : theme.textSec,
        letterSpacing: 1.5, textAlign: 'center',
      }}>{pair} <span style={{ color: pos ? '#4ADE80' : '#F87171', marginLeft: 4 }}>{pos ? '+' : ''}{change.toFixed(1)}%</span></div>
    </div>
  );
}

// ─── S4 — Rookie Session Summary ─────────────────────────────
function RookieSummary({ theme, nav }) {
  return (
    <RScreen theme={theme} navActive="home" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<span onClick={() => nav.go('dashboard')} style={{
          fontFamily: FONT_MONO, fontSize: 18, color: theme.textSec, cursor: 'pointer',
          padding: '0 4px',
        }}>×</span>}/>

      <div style={{ padding: '8px 24px 28px' }}>
        <Kicker theme={theme}>SESSION · APRIL 18</Kicker>
        <div style={{ marginTop: 8, fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5 }}>
          CLOSED 23:59 UTC
        </div>
      </div>

      {/* Hero P&L — biggest number on screen, like the $100 from S1a */}
      <div style={{ padding: '0 24px 36px', textAlign: 'center' }}>
        <CountUp to={24.80} duration={1400} fmt={v => `+$${v.toFixed(2)}`} style={{
          fontFamily: FONT_DISPLAY, fontSize: 96, fontWeight: 300,
          color: '#4ADE80', letterSpacing: -4, lineHeight: 0.95,
          fontFeatureSettings: '"tnum"', display: 'block',
        }}/>
        <div style={{ marginTop: 18 }}>
          <Body theme={theme} style={{ textAlign: 'center', fontSize: 13 }}>
            on $100 virtual capital · <span style={{ color: '#4ADE80' }}>+24.8%</span>
          </Body>
        </div>
      </div>

      {/* Breakdown — hairline grid */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>BREAKDOWN</Kicker>
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', rowGap: 22, columnGap: 24 }}>
          <StatPair theme={theme} value="3" label="TRADES" valueSize={26}/>
          <StatPair theme={theme} value="67%" label="WIN RATE" valueSize={26}/>
          <StatPair theme={theme} value="+$14.20" label="BEST · SOL" valueSize={20} color="#4ADE80"/>
          <StatPair theme={theme} value="−$2.10" label="WORST · BTC" valueSize={20} color="#F87171"/>
        </div>
      </div>

      {/* Movement — single line statement */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>LEADERBOARD</Kicker>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 400, color: '#4ADE80', letterSpacing: -1.5, lineHeight: 1 }}>↑ 535</span>
          <Body theme={theme} style={{ fontSize: 13 }}>ranks today &nbsp;·&nbsp; #847 → #312</Body>
        </div>
      </div>

      {/* Streak */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>STREAK</Kicker>
        <div style={{ marginTop: 12, fontFamily: FONT_DISPLAY, fontSize: 19, color: theme.text, letterSpacing: -0.4, fontWeight: 500 }}>
          Day 8 — extended.
        </div>
        <Body theme={theme} style={{ marginTop: 6, fontSize: 13 }}>
          Two more days to <span style={{ color: theme.accent, fontStyle: 'italic' }}>Voltage</span>.
        </Body>
      </div>

      {/* Badge unlock — restrained, etched mark */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme}>BADGE · UNLOCKED</Kicker>
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 18 }}>
          <TierMark theme={theme} size={48} glyph="◎"/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 500, color: theme.text, letterSpacing: -0.5, lineHeight: 1 }}>Sniper</div>
            <Body theme={theme} style={{ marginTop: 6, fontSize: 12.5 }}>Top 10 on Rookie board today.</Body>
          </div>
        </div>
      </div>

      {/* Share card — restrained, hairline frame, watermark */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>SHARE</Kicker>
        <div style={{
          marginTop: 14, padding: 20,
          border: `1px solid ${theme.accentDeep}`, borderRadius: 14,
          background: theme.accent + '06',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5 }}>@PIKERKID</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: theme.accent, letterSpacing: 2, fontWeight: 600 }}>◈ ROOKIE</div>
          </div>
          <div style={{ marginTop: 16 }}>
            <BigNum theme={theme} prefix="+$" number="24" suffix=".80" size={64} color="#4ADE80" prefixColor="#4ADE80"/>
          </div>
          <div style={{ marginTop: 16, fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.8 }}>
            #312 &nbsp;·&nbsp; 8D STREAK &nbsp;·&nbsp; SNIPER
          </div>
          <div style={{
            position: 'absolute', bottom: -12, right: -8,
            fontFamily: FONT_DISPLAY, fontSize: 80, fontWeight: 800,
            color: theme.watermarkColor, letterSpacing: 6,
            transform: 'rotate(-12deg)', pointerEvents: 'none',
          }}>ROOKIE</div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          {['Twitter','Discord','Story'].map(s => (
            <div key={s} style={{ flex: 1 }}>
              <OutlineCTA theme={theme} arrow={false} style={{ justifyContent: 'center', padding: '10px' }}>{s}</OutlineCTA>
            </div>
          ))}
        </div>
      </div>

      {/* Reset countdown */}
      <div style={{ padding: '24px 24px 32px', borderTop: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Kicker theme={theme} color={theme.textMut}>NEXT RESET</Kicker>
          <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: theme.accent, letterSpacing: 0.5 }}>14H 23M</span>
        </div>
        <Body theme={theme} style={{ marginTop: 12, fontSize: 13 }}>
          Your $100 reloads tonight. Fresh start, new board.
        </Body>
      </div>
    </RScreen>
  );
}

// ─── S5 — Rookie Leaderboard ─────────────────────────────────
function RookieLeaderboard({ theme, nav }) {
  const [tab, setTab] = React.useState('today');
  const rows = [
    { r: '001', n: 'alpha.king',   s: 14, v: '+84.20' },
    { r: '002', n: 'moonshot',     s: 8,  v: '+62.10' },
    { r: '003', n: 'hodl.life',    s: 5,  v: '+48.90' },
    { r: '004', n: 'degen.labs',   s: 3,  v: '+42.30' },
    { r: '005', n: 'whale.eth',    s: 11, v: '+38.70' },
    { r: '006', n: 'ape.god',      s: 2,  v: '+34.10' },
    { r: '007', n: 'sol.army',     s: 6,  v: '+31.40' },
    { r: '008', n: 'candle.light', s: 4,  v: '+28.20' },
    { r: '009', n: 'fomo.free',    s: 9,  v: '+26.10' },
    { r: '010', n: 'btc.max',      s: 1,  v: '+25.50' },
  ];
  return (
    <RScreen theme={theme} navActive="leaderboard" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<span onClick={() => nav.goto('discover')} style={{ fontFamily: FONT_MONO, fontSize: 16, color: theme.textSec, cursor: 'pointer' }}>⌕</span>}/>

      <div style={{ padding: '0 24px 8px' }}>
        <Kicker theme={theme}>LEADERBOARD · LIVE</Kicker>
        <div style={{ marginTop: 12 }}>
          <Headline theme={theme} size={32}>Rookie Board</Headline>
        </div>
        <Body theme={theme} style={{ marginTop: 10, fontSize: 13 }}>
          Resets in <span style={{ color: theme.accent }}>14h 23m</span>. Top 20 stays.
        </Body>
      </div>

      <div style={{ padding: '20px 24px 0' }}>
        <HairTabs theme={theme} value={tab} onChange={setTab} options={[
          { value: 'today',    label: 'Today' },
          { value: 'all-time', label: 'All-time' },
          { value: 'streak',   label: 'My streak' },
        ]}/>
      </div>

      {tab === 'today' && (
        <>
          <div style={{ padding: '18px 24px 0' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '46px 1fr auto',
              gap: 14, padding: '0 4px 8px',
              fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
              letterSpacing: 2, textTransform: 'uppercase',
            }}>
              <span>RANK</span><span>TRADER · STREAK</span><span style={{ textAlign: 'right' }}>P&amp;L</span>
            </div>
            {rows.map((r, i) => (
              <div key={r.r} onClick={() => nav.goto('rookie-profile-other')} style={{
                display: 'grid', gridTemplateColumns: '46px 1fr auto',
                alignItems: 'center', gap: 14, padding: '14px 4px',
                borderTop: i === 0 ? `1px solid ${theme.border}` : 'none',
                borderBottom: `1px solid ${theme.border}`,
                cursor: 'pointer',
              }}>
                <span style={{
                  fontFamily: FONT_MONO, fontSize: 11,
                  color: parseInt(r.r) <= 3 ? theme.accent : theme.textMut,
                  fontWeight: parseInt(r.r) <= 3 ? 700 : 500, letterSpacing: 0.5,
                }}>#{r.r}</span>
                <div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.text, letterSpacing: -0.2, fontWeight: 500 }}>{r.n}</div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.2, marginTop: 3 }}>{String(r.s).padStart(2,'0')}D STREAK</div>
                </div>
                <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: '#4ADE80', fontWeight: 500 }}>{r.v}</span>
              </div>
            ))}
          </div>

          {/* Pinned "you" — same accent treatment as #312 in S1b */}
          <div style={{ padding: '24px 24px 32px' }}>
            <div style={{
              fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
              letterSpacing: 3, textAlign: 'center', marginBottom: 12,
            }}>— YOUR POSITION —</div>
            <div style={{
              position: 'relative',
              display: 'grid', gridTemplateColumns: '46px 1fr auto',
              alignItems: 'center', gap: 14,
              padding: '16px 14px',
              border: `1px solid ${theme.accent}`,
              background: theme.accent + '10',
              borderRadius: 12,
            }}>
              <span style={{
                position: 'absolute', left: -1, top: 0, bottom: 0, width: 2, background: theme.accent,
              }}/>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, color: theme.accent, letterSpacing: 0.5 }}>#312</span>
              <div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.text, letterSpacing: -0.2, fontWeight: 500, fontStyle: 'italic' }}>you</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.2, marginTop: 3 }}>07D STREAK</div>
              </div>
              <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: '#4ADE80', fontWeight: 700 }}>+24.80</span>
            </div>
          </div>
        </>
      )}

      {tab === 'all-time' && (
        <div style={{ padding: '18px 24px 32px' }}>
          {rows.map((r, i) => (
            <div key={r.r} onClick={() => nav.goto('rookie-profile-other')} style={{
              display: 'grid', gridTemplateColumns: '46px 1fr auto',
              alignItems: 'center', gap: 14, padding: '14px 4px',
              borderTop: i === 0 ? `1px solid ${theme.border}` : 'none',
              borderBottom: `1px solid ${theme.border}`,
              cursor: 'pointer',
            }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: theme.textMut, fontWeight: 500 }}>#{r.r}</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.textSec, letterSpacing: -0.2 }}>{r.n}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: '#4ADE80' }}>{'+' + (parseFloat(r.v) * 8).toFixed(0)}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'streak' && (
        <div style={{ padding: '20px 24px 32px' }}>
          <Kicker theme={theme} color={theme.textMut}>LAST 30 DAYS</Kicker>
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gap: 4 }}>
            {Array.from({ length: 30 }).map((_, i) => {
              const v = i % 7 === 3 ? -1 : (i % 4 === 0 ? 0 : 1);
              return <div key={i} style={{
                aspectRatio: '1', borderRadius: 2,
                background: v === 1 ? theme.accent : v === -1 ? '#F87171' : theme.border,
                opacity: v === 0 ? 0.4 : 1,
              }}/>;
            })}
          </div>
          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', rowGap: 22 }}>
            <StatPair theme={theme} value="07" label="CURRENT" valueSize={28}/>
            <StatPair theme={theme} value="14" label="LONGEST" valueSize={28}/>
            <StatPair theme={theme} value="21/30" label="PROFITABLE" valueSize={22} color="#4ADE80"/>
            <StatPair theme={theme} value="30" label="TOTAL" valueSize={28}/>
          </div>
        </div>
      )}
    </RScreen>
  );
}

// ─── S6 — Rookie Profile ─────────────────────────────────────
function RookieProfile({ theme, nav }) {
  return (
    <RScreen theme={theme} navActive="profile" onNavChange={nav.setTab}>
      <RTopBar theme={theme} onModeClick={nav.toModeSwitch}
        right={<span onClick={() => nav.goto('settings')} style={{ fontFamily: FONT_MONO, fontSize: 16, color: theme.textSec, cursor: 'pointer' }}>⚙</span>}/>

      {/* Identity zone — like the username + monogram from S1d/S1e */}
      <div style={{ padding: '8px 24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Monogram theme={theme} letter="P" size={64}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 500, color: theme.text, letterSpacing: -0.8, lineHeight: 1 }}>@pikerkid</div>
            <div style={{ marginTop: 8 }}>
              <RModePill theme={theme}/>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16, fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5 }}>
          48 FOLLOWERS &nbsp;·&nbsp; 32 FOLLOWING
        </div>
      </div>

      {/* Stats — hairline grid like the 80/15/5 split */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>OVERVIEW</Kicker>
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: 8 }}>
          <StatPair theme={theme} value="07" label="STREAK" valueSize={22}/>
          <StatPair theme={theme} value="+$48" label="BEST" valueSize={22}/>
          <StatPair theme={theme} value="21/30" label="PROFIT" valueSize={22}/>
          <StatPair theme={theme} value="54" label="TRADES" valueSize={22}/>
        </div>
      </div>

      {/* Streak strip */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <Kicker theme={theme} color={theme.textMut}>STREAK · LAST 30D</Kicker>
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gap: 4 }}>
          {Array.from({ length: 30 }).map((_, i) => {
            const v = i % 7 === 3 ? -1 : (i % 4 === 0 ? 0 : 1);
            return <div key={i} style={{
              aspectRatio: '1', borderRadius: 2,
              background: v === 1 ? theme.accent : v === -1 ? '#F87171' : theme.border,
              opacity: v === 0 ? 0.4 : 1,
            }}/>;
          })}
        </div>
      </div>

      {/* Badges — restrained, monogram glyphs not emoji */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="BADGES · 03 / 09"/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {[
            { g: '◈', n: 'First Blood', e: true },
            { g: '◉', n: 'On Fire',     e: true },
            { g: '◎', n: 'Sniper',      e: true },
            { g: '◇', n: 'Voltage',     h: '3D' },
            { g: '◆', n: 'Diamond' },
            { g: '★', n: 'Day King' },
            { g: '✕', n: 'No Mercy' },
            { g: '◌', n: 'Ice Veins' },
          ].map((b, i) => <RBadge key={i} theme={theme} {...b}/>)}
        </div>
      </div>

      {/* Fund Me eligibility — checklist like S1f mode card lines */}
      <div style={{ padding: '24px 24px', borderTop: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: PRO.accent, fontFamily: FONT_DISPLAY, fontSize: 14 }}>◆</span>
          <Kicker theme={{ accent: PRO.accent }}>YOU QUALIFY · FUND ME</Kicker>
        </div>
        <div style={{ marginTop: 18 }}>
          <HairlineList theme={theme}>
            {[
              ['14+ days traded',         true],
              ['Top 20% leaderboard',     true],
              ['60%+ profitable days',    true],
            ].map(([t, ok], i) => (
              <HairlineRow key={i} theme={theme} padding="14px 4px">
                <span style={{ width: 24, color: '#4ADE80', fontFamily: FONT_MONO, fontSize: 13 }}>✓</span>
                <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.text, letterSpacing: -0.2 }}>{t}</span>
              </HairlineRow>
            ))}
          </HairlineList>
        </div>
        <div style={{ marginTop: 18 }}>
          <PrimaryCTA theme={{ ...theme, text: PRO.accent, bg: theme.bg }}
            onClick={() => nav.go('pro-intro')}>Enable Fund Me</PrimaryCTA>
        </div>
      </div>

      {/* Recent trades — hairline list */}
      <div style={{ padding: '24px 24px 28px', borderTop: `1px solid ${theme.border}` }}>
        <SectionHead theme={theme} label="RECENT TRADES"/>
        <HairlineList theme={theme}>
          {[
            { p: 'SOL/USDT',  d: 'L', v: 14.20, t: '2H AGO' },
            { p: 'BTC/USDT',  d: 'S', v: -2.10, t: '3H AGO' },
            { p: 'ETH/USDT',  d: 'L', v: 12.70, t: '5H AGO' },
            { p: 'DOGE/USDT', d: 'L', v: 5.40,  t: 'YESTERDAY' },
          ].map((x, i) => (
            <HairlineRow key={i} theme={theme}>
              <span style={{ width: 24, fontFamily: FONT_MONO, fontSize: 11, color: x.d === 'L' ? '#4ADE80' : '#F87171', fontWeight: 600, letterSpacing: 1.5 }}>{x.d}</span>
              <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.text, letterSpacing: -0.2 }}>{x.p}</span>
              <span style={{ width: 80, fontFamily: FONT_MONO, fontSize: 13, color: x.v >= 0 ? '#4ADE80' : '#F87171', textAlign: 'right' }}>
                {x.v >= 0 ? '+' : ''}${x.v.toFixed(2)}
              </span>
              <span style={{ width: 80, fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut, textAlign: 'right', letterSpacing: 1.2 }}>{x.t}</span>
            </HairlineRow>
          ))}
        </HairlineList>
      </div>

      {/* Solana strip — quiet line, like the legal line in S1d */}
      <div style={{ padding: '0 24px 28px' }}>
        <div style={{ textAlign: 'center', fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut, letterSpacing: 2 }}>
          ⬡ &nbsp; ON-CHAIN ON SOLANA &nbsp; ·&nbsp; VERIFIABLE
        </div>
      </div>
    </RScreen>
  );
}

function RBadge({ theme, g, n, e, h }) {
  return (
    <div style={{
      padding: '14px 6px', textAlign: 'center',
      border: `1px solid ${e ? theme.accentDeep : theme.border}`,
      borderRadius: 10,
      background: e ? theme.accent + '06' : 'transparent',
      opacity: e ? 1 : 0.55,
    }}>
      <div style={{
        fontFamily: FONT_DISPLAY, fontSize: 22, color: e ? theme.accent : theme.textMut,
        fontWeight: 400, lineHeight: 1, marginBottom: 8,
      }}>{g}</div>
      <div style={{
        fontFamily: FONT_MONO, fontSize: 9, color: e ? theme.text : theme.textMut,
        letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 500,
      }}>{n}</div>
      {!e && h && (
        <div style={{ fontFamily: FONT_MONO, fontSize: 8.5, color: theme.textMut, marginTop: 4, letterSpacing: 1 }}>{h}</div>
      )}
    </div>
  );
}

Object.assign(window, { RookieDashboard, RookieTrade, RookieSummary, RookieLeaderboard, RookieProfile, RHairPositions, RLeaderRows, RPairPill, RBadge });
