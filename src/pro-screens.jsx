// pro-screens.jsx — S7–S13, S15

function ProIntro({ theme, nav }) {
  return (
    <div style={{ width: '100%', height: '100%', background: theme.bg, position: 'relative', overflow: 'auto' }}>
      <StatusBar theme={theme}/>
      <div style={{ padding: '68px 20px 60px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 56, left: 20 }}><ModePill theme={theme}/></div>
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 800,
          color: theme.text, letterSpacing: -0.6, marginTop: 42,
          marginBottom: 6, textWrap: 'balance', lineHeight: 1.1,
        }}>You're entering<br/><span style={{ color: theme.accent }}>Pro Mode</span></div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.textSec, marginBottom: 24, lineHeight: 1.5 }}>
          Real capital. Real leaderboard. Real stakes.
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <ModeCompareCard theme={ROOKIE} items={['$100 virtual daily','Daily reset','Practice board','Badges + streaks','No real money']}/>
          <ModeCompareCard theme={PRO} items={['Real capital','Ongoing — no reset','Competitive board','Piker Score + tiers','Fund Me · Vaults']}/>
        </div>
        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`,
          borderRadius: 12, padding: 14, marginBottom: 24,
        }}>
          <Label theme={theme} style={{ marginBottom: 10 }}>What this means</Label>
          {[
            'You trade with real or community-backed capital',
            'Your Piker Score determines your tier and vault eligibility',
            'Your trades are publicly verifiable on Solana',
          ].map((t, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: i ? 8 : 0,
              fontFamily: FONT_DISPLAY, fontSize: 13, color: theme.textSec, lineHeight: 1.5,
            }}>
              <span style={{ color: theme.accent, fontWeight: 700 }}>→</span><span>{t}</span>
            </div>
          ))}
        </div>
        <Button theme={theme} size="lg" onClick={() => nav.go('dashboard')}>Enter Pro Mode</Button>
        <div onClick={() => nav.setMode('rookie', 'rookie-dashboard')} style={{
          textAlign: 'center', marginTop: 14, fontFamily: FONT_DISPLAY, fontSize: 13,
          color: theme.textSec, cursor: 'pointer',
        }}>← Back to Rookie</div>
      </div>
    </div>
  );
}

function ProDashboard({ theme, nav }) {
  return (
    <Screen theme={theme} navActive="home" onNavChange={nav.setTab}>
      <TopBar theme={theme} onModeClick={nav.toModeSwitch} right={
        <div style={{ display: 'flex', gap: 8 }}>
          <IconBtn theme={theme} icon="bell" onClick={() => nav.go('notifications')}/>
          <IconBtn theme={theme} icon="share"/>
        </div>
      }/>
      <Section theme={theme} pad="0 16px 0">
        <Card theme={theme} accent pad={18}>
          <Label theme={theme}>Pro Portfolio</Label>
          <div style={{ fontFamily: FONT_MONO, fontSize: 40, fontWeight: 600, color: theme.text, letterSpacing: -1.8, lineHeight: 1, marginTop: 6 }}>
            $103,420.00
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginTop: 8 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 14, color: '#4ADE80', fontWeight: 600 }}>+$3,420.00</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: '#4ADE80' }}>+3.42%</span>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 11, color: theme.textMut, marginLeft: 'auto' }}>All-time</span>
          </div>
        </Card>
      </Section>
      <Section theme={theme}>
        <Card theme={theme}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <Label theme={theme}>Your Piker Score</Label>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
                <CountUp to={72.4} duration={1400} fmt={v => v.toFixed(1)} style={{
                  fontFamily: FONT_MONO, fontSize: 38, fontWeight: 700, color: theme.accent, letterSpacing: -1.5, lineHeight: 1,
                }}/>
                <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: '#4ADE80' }}>+2.1</span>
              </div>
            </div>
            <TierBadge tier="diamond" size="lg"/>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[{l:'ROI',v:84},{l:'Sharpe',v:71},{l:'Drawdown',v:58},{l:'Consistency',v:77},{l:'Activity',v:68}].map(b => (
              <div key={b.l} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 76, fontFamily: FONT_DISPLAY, fontSize: 10.5, color: theme.textSec, letterSpacing: 0.5 }}>{b.l}</span>
                <div style={{ flex: 1 }}><ProgressBar theme={theme} value={b.v} height={4} color={theme.accent}/></div>
                <span style={{ width: 24, textAlign: 'right', fontFamily: FONT_MONO, fontSize: 10.5, color: theme.text }}>{b.v}</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>
      <Section theme={theme} label="Open Positions (3)" right={<span style={{ fontFamily: FONT_MONO, fontSize: 10, color: '#4ADE80' }}>● LIVE</span>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <PositionRow theme={theme} pair="BTC/USDT" dir="LONG" entry="58,120.40" pl={840.20}/>
          <PositionRow theme={theme} pair="ETH/USDT" dir="LONG" entry="3,142.80" pl={320.10}/>
          <PositionRow theme={theme} pair="SOL/USDT" dir="SHORT" entry="142.80" pl={-85.40}/>
        </div>
      </Section>
      <Section theme={theme} label="Pro Rankings" right={
        <span onClick={() => nav.go('leaderboard')} style={{ fontFamily: FONT_DISPLAY, fontSize: 12, color: theme.accent, cursor: 'pointer' }}>View all →</span>
      }>
        <Card theme={theme} pad={0}>
          {[
            { r: 1, n: 'hyperliq.sol', tier: 'elite', score: 94.2, roi: 127.3, fundMe: true },
            { r: 2, n: 'alpha.king', tier: 'elite', score: 91.7, roi: 98.1, fundMe: true },
            { r: 3, n: 'glass.node', tier: 'diamond', score: 88.4, roi: 76.2 },
          ].map(r => <LbRow key={r.r} theme={theme} row={r} pro/>)}
          <div style={{ borderTop: `1px solid ${theme.border}`, background: theme.accentFaint, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
            <LbRow theme={theme} row={{ r: 47, n: '@pikerkid', tier: 'diamond', score: 72.4, roi: 34.2, me: true }} pro isLast/>
          </div>
        </Card>
      </Section>
      <Section theme={theme} label="Fund Me">
        <Card theme={theme}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: '#4ADE80', boxShadow: '0 0 8px #4ADE80' }}/>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 700, color: theme.text }}>Fund Me Active</span>
            <span style={{ flex: 1 }}/>
            <span onClick={() => nav.go('fundme-trader')} style={{ fontFamily: FONT_DISPLAY, fontSize: 12, color: theme.accent, cursor: 'pointer' }}>Manage →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            <StatCard theme={theme} label="Backers" value="12" compact mono={false}/>
            <StatCard theme={theme} label="Backed" value="$3,400" compact/>
            <StatCard theme={theme} label="Wk Earn" value="+$287" compact/>
          </div>
        </Card>
      </Section>
    </Screen>
  );
}

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
    <Screen theme={theme} navActive="trade" onNavChange={nav.setTab}>
      <TopBar theme={theme} onModeClick={nav.toModeSwitch} right={
        <div style={{
          fontFamily: FONT_MONO, fontSize: 10.5, color: theme.text, letterSpacing: 0.5,
          padding: '5px 10px', background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 999,
        }}><span style={{ color: theme.textMut }}>$</span>103,420.00</div>
      }/>
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {pairs.map(x => <PairPill key={x.p} theme={theme} pair={x.p.split('/')[0]} change={x.c} active={pair === x.p} onClick={() => setPair(x.p)}/>)}
      </div>
      <div style={{ padding: '0 16px 10px' }}>
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 11, color: theme.textMut, fontWeight: 600, letterSpacing: 0.5 }}>{pair} · PERP</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 22, fontWeight: 600, color: theme.text, letterSpacing: -0.5 }}>58,243.20</span>
              <Chip theme={theme} color="#4ADE80" bg="rgba(74,222,128,0.12)" size="sm">+2.40%</Chip>
            </div>
          </div>
          <div style={{ textAlign: 'right', fontFamily: FONT_MONO, fontSize: 10.5, color: theme.textMut, lineHeight: 1.55 }}>
            <div>OI <span style={{ color: theme.textSec }}>$4.1B</span></div>
            <div>Vol <span style={{ color: theme.textSec }}>$12.4B</span></div>
            <div>Fund <span style={{ color: '#4ADE80' }}>+0.012%</span></div>
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
          <CandleChart theme={theme} height={220} seed={pair.length}/>
        </div>
      </div>
      <div style={{ padding: '0 16px 10px' }}>
        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`,
          borderRadius: 10, padding: '8px 12px',
          display: 'flex', alignItems: 'center', gap: 10, fontFamily: FONT_MONO, fontSize: 11,
        }}>
          <span style={{ color: theme.textMut }}>#1</span>
          <span style={{ color: theme.accent, fontWeight: 700 }}>hyperliq.sol</span>
          <span style={{ color: '#4ADE80' }}>+127.3%</span>
          <span style={{ flex: 1 }}/>
          <span style={{ color: theme.textMut }}>You #47</span>
          <span style={{ color: '#4ADE80' }}>+34.2%</span>
        </div>
      </div>
      <div style={{ padding: '0 16px 10px' }}><OrderBook theme={theme}/></div>
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
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8,
            background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 8, padding: '8px 10px',
          }}>
            <Label theme={theme} style={{ width: 40 }}>SIZE</Label>
            <input value={size} onChange={e => setSize(e.target.value)} style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: FONT_MONO, fontSize: 15, color: theme.text, textAlign: 'right',
            }}/>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: theme.textMut }}>USDT</span>
          </div>
          <div style={{
            padding: '5px 10px', marginBottom: 10,
            background: 'rgba(232,200,88,0.06)', border: `1px solid ${theme.accentDeep}40`,
            borderRadius: 6, fontFamily: FONT_DISPLAY, fontSize: 10.5, color: theme.accent,
            display: 'flex', gap: 6, alignItems: 'center',
          }}><span>⚠</span><span>Large position may affect your Sharpe</span></div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontFamily: FONT_DISPLAY, fontSize: 11 }}>
              <span style={{ color: theme.textMut }}>LEVERAGE · max 20× BTC</span>
              <span style={{ fontFamily: FONT_MONO, color: theme.accent, fontWeight: 700 }}>{leverage}×</span>
            </div>
            <input type="range" min="1" max="20" value={leverage} onChange={e => setLeverage(+e.target.value)} style={{ width: '100%', accentColor: theme.accent }}/>
          </div>
          <div style={{
            padding: '8px 10px', background: theme.surfaceAlt, borderRadius: 8,
            fontFamily: FONT_MONO, fontSize: 10.5, color: theme.textMut, marginBottom: 12,
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>Margin: <span style={{ color: theme.text }}>${(+size / leverage).toFixed(2)}</span></span>
            <span>Liq: <span style={{ color: '#F87171' }}>54,108.20</span></span>
          </div>
          <Button theme={theme} size="lg" variant={side === 'long' ? 'long' : 'short'}>
            {side === 'long' ? 'Long' : 'Short'} {pair.split('/')[0]} · ${(+size).toLocaleString()}
          </Button>
        </div>
      </div>
    </Screen>
  );
}

function ProLeaderboard({ theme, nav }) {
  const [tab, setTab] = React.useState('rankings');
  const rows = [
    { r: 1, n: 'hyperliq.sol', tier: 'elite', score: 94.2, roi: 127.3, fundMe: true },
    { r: 2, n: 'alpha.king', tier: 'elite', score: 91.7, roi: 98.1, fundMe: true },
    { r: 3, n: 'glass.node', tier: 'diamond', score: 88.4, roi: 76.2 },
    { r: 4, n: 'delta.one', tier: 'diamond', score: 85.1, roi: 68.4, fundMe: true },
    { r: 5, n: 'vwap.nasa', tier: 'diamond', score: 83.7, roi: 62.1 },
    { r: 6, n: 'funding.rate', tier: 'diamond', score: 81.9, roi: 58.3 },
    { r: 7, n: 'orderflow', tier: 'gold', score: 79.2, roi: 52.7 },
    { r: 8, n: 'long.only', tier: 'gold', score: 77.8, roi: 49.1 },
    { r: 9, n: 'perp.god', tier: 'gold', score: 76.4, roi: 46.2 },
    { r: 10, n: 'mm.maker', tier: 'gold', score: 75.1, roi: 43.8 },
  ];
  return (
    <Screen theme={theme} navActive="leaderboard" onNavChange={nav.setTab}>
      <TopBar theme={theme} onModeClick={nav.toModeSwitch} right={<IconBtn theme={theme} icon="search"/>}/>
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 700, color: theme.text, letterSpacing: -0.6 }}>Pro Rankings</div>
      </div>
      <div style={{ padding: '0 16px 10px' }}>
        <Segmented theme={theme} value={tab} onChange={setTab} options={[
          { value: 'rankings', label: 'Rankings' },
          { value: 'all-time', label: 'All-Time' },
          { value: 'league', label: 'My League' },
        ]}/>
      </div>
      <div style={{
        padding: '4px 22px', display: 'grid', gridTemplateColumns: '36px 28px 1fr 80px',
        fontFamily: FONT_DISPLAY, fontSize: 9.5, color: theme.textMut, letterSpacing: 0.9, textTransform: 'uppercase', fontWeight: 600,
      }}>
        <span>Rank</span><span/><span>Trader · Tier</span>
        <span style={{ textAlign: 'right' }}>Score · ROI</span>
      </div>
      <div style={{ padding: '0 16px' }}>
        <Card theme={theme} pad={0}>
          {rows.map((r, i) => <LbRow key={r.r} theme={theme} row={r} pro isLast={i === rows.length - 1} onClick={() => nav.go('profile-other')}/>)}
        </Card>
      </div>
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 9.5, color: theme.textMut, letterSpacing: 1.5, marginBottom: 6, textAlign: 'center' }}>— YOUR POSITION —</div>
        <div style={{ border: `1.5px solid ${theme.accentDeep}`, borderRadius: 12, background: theme.accentFaint, boxShadow: `0 0 0 3px ${theme.accentFaint}` }}>
          <LbRow theme={theme} row={{ r: 47, n: '@pikerkid', tier: 'diamond', score: 72.4, roi: 34.2, me: true }} pro isLast/>
        </div>
      </div>
    </Screen>
  );
}

function ProProfile({ theme, nav }) {
  return (
    <Screen theme={theme} navActive="profile" onNavChange={nav.setTab}>
      <TopBar theme={theme} onModeClick={nav.toModeSwitch} right={<IconBtn theme={theme} icon="settings"/>}/>
      <div style={{ padding: '0 16px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <Avatar name="pikerkid" size={76} tier="diamond"/>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 19, fontWeight: 700, color: theme.text }}>@pikerkid</div>
          <div style={{ marginTop: 5 }}><TierBadge tier="diamond" size="lg"/></div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 22, fontWeight: 700, color: theme.accent, letterSpacing: -0.5 }}>72.4</span>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 10.5, color: theme.textMut, letterSpacing: 0.8 }}>PIKER SCORE</span>
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10.5, color: theme.textMut, marginTop: 4 }}>312 followers · #47 overall</div>
        </div>
      </div>
      <Section theme={theme}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          <StatCard theme={theme} label="Best Rank" value="#47" compact/>
          <StatCard theme={theme} label="Best ROI" value="34%" compact/>
          <StatCard theme={theme} label="Sharpe" value="2.1" compact/>
          <StatCard theme={theme} label="Trades" value="248" compact/>
        </div>
      </Section>
      <Section theme={theme} label="Equity Curve">
        <Card theme={theme} pad={0}>
          <div style={{ padding: '12px 14px 0', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: theme.text, fontWeight: 600 }}>$103,420</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: '#4ADE80' }}>+34.2%</div>
          </div>
          <AreaChart theme={theme} height={120} seed={8} watermark={false}/>
        </Card>
      </Section>
      <Section theme={theme} label="Performance">
        <Card theme={theme}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 10, columnGap: 16 }}>
            {[['Avg ROI','+34.2%','#4ADE80'],['Avg Sharpe','2.14',theme.text],['Max Drawdown','−12.4%','#F87171'],['Consistency','77%',theme.text],['Win Rate','64%',theme.text],['Avg Hold','4h 12m',theme.text]].map(([l,v,c],i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 11.5, color: theme.textMut }}>{l}</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: c, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>
      <Section theme={theme} label="Badges (2 / 8)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          <BadgeTile theme={theme} icon="🩸" name="First Blood" earned/>
          <BadgeTile theme={theme} icon="⚡" name="One Shot" earned/>
          <BadgeTile theme={theme} icon="🏆" name="Untouchable" hint="Top 10"/>
          <BadgeTile theme={theme} icon="💎" name="Perfect Wk"/>
          <BadgeTile theme={theme} icon="👑" name="Comeback"/>
          <BadgeTile theme={theme} icon="⚡" name="Consistent"/>
          <BadgeTile theme={theme} icon="🔥" name="Clutch"/>
          <BadgeTile theme={theme} icon="💀" name="Elite Killer"/>
        </div>
      </Section>
      <Section theme={theme}>
        <Card theme={theme}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(135deg, #9945FF, #14F195)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT_MONO, fontSize: 14, fontWeight: 700, color: '#000',
            }}>⬡</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 700, color: theme.text }}>On-chain verified</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10.5, color: theme.textMut, marginTop: 1 }}>Rank SBT · 12 badge cNFTs</div>
            </div>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 11, color: '#9945FF', fontWeight: 600 }}>Solscan →</span>
          </div>
        </Card>
      </Section>
      <Section theme={theme}>
        <Card theme={theme}>
          <Label theme={theme} style={{ marginBottom: 6 }}>Fund Me Active</Label>
          <div style={{ display: 'flex', gap: 16, marginTop: 4, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 20, fontWeight: 700, color: theme.accent }}>12</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 10, color: theme.textMut, letterSpacing: 0.5 }}>BACKERS</div>
            </div>
            <div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 20, fontWeight: 700, color: theme.text }}>$3,400</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 10, color: theme.textMut, letterSpacing: 0.5 }}>BACKED</div>
            </div>
            <div style={{ flex: 1 }}/>
            <Button theme={theme} variant="accent_outline" size="sm" full={false} onClick={() => nav.go('fundme-trader')}>Manage</Button>
          </div>
        </Card>
      </Section>
    </Screen>
  );
}

function FundMeTrader({ theme, nav }) {
  const [cap, setCap] = React.useState(5000);
  return (
    <Screen theme={theme} navActive="profile" onNavChange={nav.setTab}>
      <TopBar theme={theme} onModeClick={nav.toModeSwitch} right={<IconBtn theme={theme} icon="close" onClick={() => nav.go('profile')}/>}/>
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 700, color: theme.text, letterSpacing: -0.6 }}>Fund Me</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, color: theme.textSec, marginTop: 2 }}>Live · managing</div>
      </div>
      <Section theme={theme}>
        <div style={{
          background: theme.accentFaint, border: `1px solid ${theme.accentDeep}`, borderRadius: 12, padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: '#4ADE80', boxShadow: '0 0 8px #4ADE80' }}/>
          <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 13, color: theme.accent, fontWeight: 700 }}>Fund Me Active</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 11, color: theme.textSec, cursor: 'pointer' }}>Pause</span>
        </div>
      </Section>
      <Section theme={theme} label="Your terms">
        <Card theme={theme}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: FONT_DISPLAY, fontSize: 11.5 }}>
            <span style={{ color: theme.textMut }}>MAX BACKING CAP</span>
            <span style={{ fontFamily: FONT_MONO, color: theme.accent, fontWeight: 700 }}>${cap.toLocaleString()} USDC</span>
          </div>
          <input type="range" min="100" max="10000" step="100" value={cap} onChange={e => setCap(+e.target.value)} style={{ width: '100%', accentColor: theme.accent }}/>
        </Card>
      </Section>
      <Section theme={theme}>
        <Card theme={theme}>
          <Label theme={theme} style={{ marginBottom: 10 }}>Profit split</Label>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8, height: 8, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ flex: 80, background: theme.accent }}/>
            <div style={{ flex: 15, background: '#4ADE80' }}/>
            <div style={{ flex: 5, background: theme.textMut }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT_MONO, fontSize: 11 }}>
            <span style={{ color: theme.accent }}>You 80%</span>
            <span style={{ color: '#4ADE80' }}>Backers 15%</span>
            <span style={{ color: theme.textMut }}>Platform 5%</span>
          </div>
        </Card>
      </Section>
      <Section theme={theme} label="Active Backers (12)">
        <Card theme={theme} pad={0}>
          {[{n:'whale.eth',a:800,e:42.10},{n:'degen.labs',a:500,e:26.30},{n:'ape.god',a:400,e:21.00},{n:'sol.army',a:300,e:15.80}].map((b,i,a) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
              borderBottom: i < a.length - 1 ? `1px solid ${theme.border}` : 'none',
            }}>
              <Avatar name={b.n} size={28}/>
              <span style={{ flex: 1, fontFamily: FONT_DISPLAY, fontSize: 13, color: theme.text }}>{b.n}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: theme.textSec }}>${b.a}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: '#4ADE80', width: 64, textAlign: 'right' }}>+${b.e}</span>
            </div>
          ))}
        </Card>
      </Section>
      <Section theme={theme}><Button theme={theme} size="lg" variant="outline">Share my Fund Me link</Button></Section>
    </Screen>
  );
}

function FundMeBacker({ theme, nav }) {
  const [amt, setAmt] = React.useState(250);
  return (
    <Screen theme={theme} navActive="profile" onNavChange={nav.setTab}>
      <TopBar theme={theme} onModeClick={nav.toModeSwitch} right={<IconBtn theme={theme} icon="close" onClick={() => nav.go('leaderboard')}/>}/>
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 700, color: theme.text, letterSpacing: -0.6 }}>Back This Trader</div>
      </div>
      <Section theme={theme}>
        <Card theme={theme}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <Avatar name="hyperliq.sol" size={56} tier="elite"/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 700, color: theme.text }}>@hyperliq.sol</div>
              <div style={{ marginTop: 4 }}><TierBadge tier="elite" size="sm"/></div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 20, fontWeight: 700, color: theme.accent }}>94.2</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 9.5, color: theme.textMut, letterSpacing: 0.6 }}>PIKER SCORE</div>
            </div>
          </div>
          <div style={{
            padding: '10px 12px', background: theme.surfaceAlt, borderRadius: 8,
            fontFamily: FONT_DISPLAY, fontSize: 12, color: theme.textSec, fontStyle: 'italic', lineHeight: 1.45,
          }}>"Elite-tier. 127% ROI all-time, 2.4 Sharpe. Focus on macro-driven BTC setups."</div>
        </Card>
      </Section>
      <Section theme={theme} label="Amount to back">
        <Card theme={theme}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: theme.surfaceAlt, border: `1.5px solid ${theme.accentDeep}`,
            borderRadius: 10, padding: '14px 16px', marginBottom: 10,
          }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 28, color: theme.textMut }}>$</span>
            <input value={amt} onChange={e => setAmt(+e.target.value.replace(/\D/g, '') || 0)} style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: FONT_MONO, fontSize: 28, color: theme.text, letterSpacing: -0.5, fontWeight: 600,
            }}/>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 11, color: theme.textMut, fontWeight: 600, letterSpacing: 1 }}>USDC</span>
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            {[100, 250, 500, 1000].map(v => (
              <div key={v} onClick={() => setAmt(v)} style={{
                flex: 1, padding: '6px', textAlign: 'center',
                background: amt === v ? theme.accentFaint : theme.surfaceAlt,
                border: `1px solid ${amt === v ? theme.accentDeep : theme.border}`,
                borderRadius: 8, fontFamily: FONT_MONO, fontSize: 12,
                color: amt === v ? theme.accent : theme.textSec, fontWeight: 600, cursor: 'pointer',
              }}>${v}</div>
            ))}
          </div>
          <div style={{
            padding: '10px 12px', background: theme.surfaceAlt, borderRadius: 8,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 11, color: theme.textMut }}>Est. weekly return</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 15, color: '#4ADE80', fontWeight: 700, marginTop: 1 }}>+${(amt * 0.012).toFixed(2)}</div>
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 10, color: theme.textMut, textAlign: 'right' }}>
              Based on avg<br/>ROI · 1.2%/wk
            </div>
          </div>
        </Card>
      </Section>
      <Section theme={theme}>
        <div style={{
          padding: '10px 12px', background: theme.surfaceAlt, borderRadius: 8,
          fontFamily: FONT_DISPLAY, fontSize: 11, color: theme.textMut, lineHeight: 1.5, marginBottom: 12,
          display: 'flex', gap: 8, alignItems: 'flex-start',
        }}>
          <span style={{ color: '#9945FF', fontSize: 14, fontWeight: 700 }}>⬡</span>
          <span>Funds held in Solana smart contract. Withdrawal enabled after current week ends. Returns not guaranteed.</span>
        </div>
        <Button theme={theme} size="lg">Confirm · Deploy ${amt} USDC</Button>
      </Section>
    </Screen>
  );
}

function Notifications({ theme, nav }) {
  const groups = [
    { label: 'Today', items: [
      { i: '🔥', t: 'Streak extended to Day 8', s: 'Keep it going!', unread: true },
      { i: '📊', t: 'Leaderboard move', s: 'You moved from #847 → #312', unread: true },
      { i: '🏅', t: 'Badge unlocked', s: '🎯 Sniper earned', unread: true },
      { i: '⏰', t: 'Reset warning', s: '$100 resets in 30 mins', unread: false },
    ]},
    { label: 'This Week', items: [
      { i: '💰', t: 'Fund Me · New backer', s: '@whale.eth deposited $500', unread: false },
      { i: '📈', t: 'Pro rank change', s: 'You moved from #312 → #247', unread: false },
      { i: '⚠️', t: 'Position alert', s: 'SOL approaching stop loss', unread: false },
    ]},
  ];
  return (
    <Screen theme={theme} navActive="home" onNavChange={nav.setTab}>
      <TopBar theme={theme} onModeClick={nav.toModeSwitch} right={
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12, color: theme.accent, cursor: 'pointer', fontWeight: 600 }}>Mark read</span>
      }/>
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 700, color: theme.text, letterSpacing: -0.6 }}>Notifications</div>
      </div>
      {groups.map(g => (
        <Section key={g.label} label={g.label}>
          <Card theme={theme} pad={0}>
            {g.items.map((it, i, a) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px',
                background: it.unread ? theme.surfaceElev : 'transparent',
                borderBottom: i < a.length - 1 ? `1px solid ${theme.border}` : 'none',
                position: 'relative',
              }}>
                {it.unread && <div style={{
                  position: 'absolute', left: 5, top: '50%', transform: 'translateY(-50%)',
                  width: 4, height: 4, borderRadius: 2, background: theme.accent,
                  boxShadow: `0 0 6px ${theme.accent}`,
                }}/>}
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: theme.surfaceAlt, border: `1px solid ${theme.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, flexShrink: 0,
                }}>{it.i}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 600, color: theme.text }}>{it.t}</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 12, color: theme.textSec, marginTop: 2 }}>{it.s}</div>
                </div>
              </div>
            ))}
          </Card>
        </Section>
      ))}
    </Screen>
  );
}

function Milestone({ theme, nav }) {
  return (
    <div style={{ width: '100%', height: '100%', background: theme.bg, position: 'relative', overflow: 'hidden' }}>
      <StatusBar theme={theme}/>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(600px 400px at 50% 40%, ${theme.accentFaint}, transparent 70%)`,
        pointerEvents: 'none',
      }}/>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} viewBox="0 0 390 844">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return <line key={i} x1={195 + Math.cos(a) * 80} y1={340 + Math.sin(a) * 80}
            x2={195 + Math.cos(a) * 500} y2={340 + Math.sin(a) * 500}
            stroke={theme.accent} strokeWidth="0.5"/>;
        })}
      </svg>
      <div style={{ position: 'absolute', top: 56, left: 20 }}><ModePill theme={theme}/></div>
      <div onClick={() => nav.go('dashboard')} style={{ position: 'absolute', top: 62, right: 20, padding: 8, cursor: 'pointer' }}>
        <svg width="18" height="18" viewBox="0 0 18 18"><path d="M4 4l10 10M14 4l-10 10" stroke={theme.textSec} strokeWidth="1.6" strokeLinecap="round"/></svg>
      </div>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center',
      }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 11, fontWeight: 700, color: theme.accent, letterSpacing: 3, marginBottom: 18 }}>NEW TIER REACHED</div>
        <div style={{
          width: 160, height: 160, borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.accentFaint}, transparent 70%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
        }}>
          <div style={{
            width: 110, height: 110, borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDeep})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 60px ${theme.accent}, 0 0 20px ${theme.accent}`,
            border: '2px solid #fff4',
          }}><span style={{ fontSize: 54, color: '#0A0A0D' }}>◈</span></div>
        </div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 44, fontWeight: 900, color: theme.text, letterSpacing: 4, marginBottom: 8 }}>DIAMOND</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: theme.textSec, marginBottom: 36, textWrap: 'balance' }}>
          You've crossed 70.0 Piker Score.<br/>Top 10% of Pro traders.
        </div>
        <div style={{
          background: theme.surface, border: `1px solid ${theme.accentDeep}`, borderRadius: 14,
          padding: 16, width: '100%', boxShadow: `0 0 0 3px ${theme.accentFaint}`,
        }}>
          <Label theme={theme} style={{ color: theme.accent, marginBottom: 10 }}>DIAMOND TIER UNLOCKS</Label>
          {['Prismatic profile frame','Fund Me — expanded cap','Diamond leaderboard badge','One step from Vault (Elite)'].map((t,i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, alignItems: 'center', marginBottom: i < 3 ? 6 : 0,
              fontFamily: FONT_DISPLAY, fontSize: 12.5, color: theme.textSec,
            }}><span style={{ color: '#4ADE80' }}>✓</span>{t}</div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 40, left: 20, right: 20 }}>
        <Button theme={theme} size="lg" onClick={() => nav.go('dashboard')}>Continue Trading</Button>
      </div>
    </div>
  );
}

Object.assign(window, { ProIntro, ProDashboard, ProTrade, ProLeaderboard, ProProfile, FundMeTrader, FundMeBacker, Notifications, Milestone });
