// app.jsx — Piker prototype shell with gallery + tweaks

const DEFAULT_TWEAKS = /*EDITMODE-BEGIN*/{
  "rookieAccent": "silver",
  "proAccent": "gold",
  "watermarkIntensity": 1,
  "showGallery": false,
  "startScreen": "rookie-dashboard"
}/*EDITMODE-END*/;

const ROOKIE_ACCENTS = {
  silver: { accent: '#B8B8E0', accentDeep: '#8080B8' },
  purple: { accent: '#C8A8FF', accentDeep: '#9060D8' },
  blue:   { accent: '#8CB4FF', accentDeep: '#5080D8' },
};
const PRO_ACCENTS = {
  gold:   { accent: '#E8C858', accentDeep: '#C8A840' },
  amber:  { accent: '#FFB347', accentDeep: '#D88820' },
  bronze: { accent: '#D4A373', accentDeep: '#A87645' },
};

function useThemes(tweaks) {
  const r = ROOKIE_ACCENTS[tweaks.rookieAccent] || ROOKIE_ACCENTS.silver;
  const p = PRO_ACCENTS[tweaks.proAccent] || PRO_ACCENTS.gold;
  const wmBase = tweaks.watermarkIntensity || 1;
  return {
    rookie: { ...ROOKIE, ...r,
      accentFaint: r.accent + '18',
      accentGlow:  r.accent + '30',
      pillBg:      r.accent + '20',
      pillBorder:  r.accentDeep,
      chartTint:   r.accent,
      watermarkColor: r.accent + Math.round(24 * wmBase).toString(16).padStart(2,'0'),
    },
    pro: { ...PRO, ...p,
      accentFaint: p.accent + '15',
      accentGlow:  p.accent + '30',
      pillBg:      p.accent + '22',
      pillBorder:  p.accentDeep,
      chartTint:   p.accent,
      watermarkColor: p.accent + Math.round(24 * wmBase).toString(16).padStart(2,'0'),
    },
  };
}

// ─── Nav state ───────────────────────────────────────────────
const SCREENS = {
  // onboarding
  'onboard-a': { label: 'Onboard 1', mode: 'rookie', comp: 'OnboardS1a' },
  'onboard-b': { label: 'Onboard 2', mode: 'rookie', comp: 'OnboardS1b' },
  'onboard-c': { label: 'Onboard 3', mode: 'pro',    comp: 'OnboardS1c' },
  'signup':    { label: 'Sign up',   mode: 'rookie', comp: 'OnboardSignup' },
  'username':  { label: 'Username',  mode: 'rookie', comp: 'OnboardUsername' },
  'mode-intro':{ label: 'Mode Intro',mode: 'rookie', comp: 'ModeIntro' },
  // rookie
  'rookie-dashboard':   { label: 'Rookie Dash',    mode: 'rookie', comp: 'RookieDashboard' },
  'rookie-trade':       { label: 'Rookie Trade',   mode: 'rookie', comp: 'RookieTrade' },
  'rookie-summary':     { label: 'Rookie Summary', mode: 'rookie', comp: 'RookieSummary' },
  'rookie-leaderboard': { label: 'Rookie Board',   mode: 'rookie', comp: 'RookieLeaderboard' },
  'rookie-profile':     { label: 'Rookie Profile', mode: 'rookie', comp: 'RookieProfile' },
  // pro
  'pro-intro':          { label: 'Pro Intro',      mode: 'pro', comp: 'ProIntro' },
  'pro-dashboard':      { label: 'Pro Dash',       mode: 'pro', comp: 'ProDashboard' },
  'pro-trade':          { label: 'Pro Trade',      mode: 'pro', comp: 'ProTrade' },
  'pro-leaderboard':    { label: 'Pro Board',      mode: 'pro', comp: 'ProLeaderboard' },
  'pro-profile':        { label: 'Pro Profile',    mode: 'pro', comp: 'ProProfile' },
  'fundme-trader':      { label: 'Fund Me · Trader', mode: 'pro', comp: 'FundMeTrader' },
  'fundme-backer':      { label: 'Fund Me · Backer', mode: 'pro', comp: 'FundMeBacker' },
  'notifications':      { label: 'Notifications', mode: 'rookie', comp: 'Notifications' },
  'milestone':          { label: 'Tier Upgrade',  mode: 'pro', comp: 'Milestone' },
};

const GALLERY_GROUPS = [
  { label: 'Onboarding', keys: ['onboard-a','onboard-b','onboard-c','signup','username','mode-intro'] },
  { label: 'Rookie Mode · Silver/Purple',   keys: ['rookie-dashboard','rookie-trade','rookie-summary','rookie-leaderboard','rookie-profile'] },
  { label: 'Pro Mode · Gold/Purple',        keys: ['pro-intro','pro-dashboard','pro-trade','pro-leaderboard','pro-profile'] },
  { label: 'Fund Me · Solana',              keys: ['fundme-trader','fundme-backer'] },
  { label: 'Shared',                        keys: ['notifications','milestone'] },
];

function ScreenHost({ screenKey, themes, nav }) {
  const s = SCREENS[screenKey];
  if (!s) return null;
  const theme = themes[s.mode];
  const Comp = window[s.comp];
  if (!Comp) return <div style={{ color:'red', padding:20 }}>Missing: {s.comp}</div>;
  // Props per screen type
  if (s.comp.startsWith('Onboard') && s.comp !== 'OnboardSignup' && s.comp !== 'OnboardUsername') {
    const next = { 'onboard-a':'onboard-b','onboard-b':'onboard-c','onboard-c':'signup' }[screenKey];
    return <Comp theme={theme} onNext={() => nav.goto(next)}/>;
  }
  if (s.comp === 'OnboardSignup')  return <Comp theme={theme} onNext={() => nav.goto('username')}/>;
  if (s.comp === 'OnboardUsername')return <Comp theme={theme} onNext={() => nav.goto('mode-intro')}/>;
  if (s.comp === 'ModeIntro') return <Comp theme={theme}
    onRookie={() => nav.goto('rookie-dashboard')} onPro={() => nav.goto('pro-intro')}/>;
  return <Comp theme={theme} nav={nav}/>;
}

// ─── Phone viewer (single) ───────────────────────────────────
function PhoneViewer({ screenKey, themes, setScreen }) {
  const nav = React.useMemo(() => ({
    go: (k) => {
      // semantic shortcuts from screens
      const mode = SCREENS[screenKey]?.mode;
      const map = {
        dashboard:    mode === 'pro' ? 'pro-dashboard' : 'rookie-dashboard',
        trade:        mode === 'pro' ? 'pro-trade' : 'rookie-trade',
        leaderboard:  mode === 'pro' ? 'pro-leaderboard' : 'rookie-leaderboard',
        profile:      mode === 'pro' ? 'pro-profile' : 'rookie-profile',
        'profile-other': mode === 'pro' ? 'pro-profile' : 'rookie-profile',
        notifications:'notifications',
        'pro-intro':  'pro-intro',
        'fundme-trader':'fundme-trader',
        'fundme-backer':'fundme-backer',
      };
      setScreen(map[k] || k);
    },
    goto: setScreen,
    setTab: (tab) => {
      const mode = SCREENS[screenKey]?.mode || 'rookie';
      const m = {
        home:        mode === 'pro' ? 'pro-dashboard' : 'rookie-dashboard',
        trade:       mode === 'pro' ? 'pro-trade' : 'rookie-trade',
        leaderboard: mode === 'pro' ? 'pro-leaderboard' : 'rookie-leaderboard',
        profile:     mode === 'pro' ? 'pro-profile' : 'rookie-profile',
      };
      setScreen(m[tab]);
    },
    setMode: (mode, targetKey) => setScreen(targetKey),
    toModeSwitch: () => {
      const mode = SCREENS[screenKey]?.mode;
      if (mode === 'rookie') setScreen('pro-intro');
      else setScreen('rookie-dashboard');
    },
  }), [screenKey, setScreen]);

  return (
    <PhoneFrame>
      <ScreenHost screenKey={screenKey} themes={themes} nav={nav}/>
    </PhoneFrame>
  );
}

// ─── Gallery ─────────────────────────────────────────────────
function Gallery({ themes, onPick }) {
  return (
    <div style={{
      minHeight: '100vh', background: '#07070A', padding: '48px 32px 80px',
      overflow: 'auto',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 34, fontWeight: 800, color: '#F5F5F0', letterSpacing: -0.8 }}>Piker · 15 Screens</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: '#666', letterSpacing: 1.5, marginTop: 6 }}>TAP ANY SCREEN TO ENTER PROTOTYPE</div>
        </div>
        {GALLERY_GROUPS.map(g => (
          <div key={g.label} style={{ marginBottom: 44 }}>
            <div style={{
              fontFamily: FONT_DISPLAY, fontSize: 13, color: '#888', letterSpacing: 1.5,
              textTransform: 'uppercase', fontWeight: 700, marginBottom: 20,
              paddingBottom: 10, borderBottom: '1px solid #1a1a1a',
            }}>{g.label}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 28 }}>
              {g.keys.map(k => {
                const s = SCREENS[k];
                return (
                  <div key={k} onClick={() => onPick(k)} style={{ cursor: 'pointer' }}>
                    <div style={{
                      width: '100%', aspectRatio: '390/844',
                      borderRadius: 20, overflow: 'hidden',
                      background: '#000', border: '1px solid #1a1a1a',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                      position: 'relative', transform: 'scale(1)',
                      transition: 'transform 200ms, border-color 200ms',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform='scale(1.02)'; e.currentTarget.style.borderColor=themes[s.mode].accentDeep; }}
                    onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.borderColor='#1a1a1a'; }}
                    >
                      <div style={{
                        position: 'absolute', inset: 0,
                        transform: 'scale(0.615)', transformOrigin: '0 0',
                        width: 390, height: 844, pointerEvents: 'none',
                      }}>
                        <ScreenHost screenKey={k} themes={themes} nav={{ go:()=>{}, goto:()=>{}, setTab:()=>{}, setMode:()=>{}, toModeSwitch:()=>{} }}/>
                      </div>
                    </div>
                    <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: 3,
                        background: themes[s.mode].accent,
                      }}/>
                      <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12.5, color: '#d0d0d0', fontWeight: 600 }}>{s.label}</span>
                      <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: '#555', marginLeft: 'auto', letterSpacing: 0.5 }}>{k}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tweaks panel ────────────────────────────────────────────
function TweaksPanel({ tweaks, setTweaks, visible }) {
  if (!visible) return null;
  const Row = ({ label, children }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: FONT_MONO, fontSize: 9.5, color: '#888', letterSpacing: 1.2, marginBottom: 6, textTransform: 'uppercase' }}>{label}</div>
      {children}
    </div>
  );
  const Pills = ({ value, onChange, options, colorMap }) => (
    <div style={{ display: 'flex', gap: 4 }}>
      {options.map(o => (
        <div key={o} onClick={() => onChange(o)} style={{
          flex: 1, padding: '7px 4px', borderRadius: 7,
          background: value === o ? '#222' : '#111',
          border: `1px solid ${value === o ? (colorMap?.[o] || '#444') : '#222'}`,
          textAlign: 'center', cursor: 'pointer',
          fontFamily: FONT_DISPLAY, fontSize: 10.5, fontWeight: 600,
          color: value === o ? (colorMap?.[o] || '#fff') : '#888',
          textTransform: 'capitalize',
        }}>{o}</div>
      ))}
    </div>
  );
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, width: 256, zIndex: 100,
      background: '#0A0A0D', border: '1px solid #2a2a2a', borderRadius: 14,
      padding: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
    }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 800, color: '#F5F5F0', letterSpacing: 0.4, marginBottom: 14 }}>Tweaks</div>
      <Row label="Rookie accent">
        <Pills value={tweaks.rookieAccent} onChange={v => setTweaks({ rookieAccent: v })}
          options={['silver','purple','blue']}
          colorMap={{ silver: ROOKIE_ACCENTS.silver.accent, purple: ROOKIE_ACCENTS.purple.accent, blue: ROOKIE_ACCENTS.blue.accent }}/>
      </Row>
      <Row label="Pro accent">
        <Pills value={tweaks.proAccent} onChange={v => setTweaks({ proAccent: v })}
          options={['gold','amber','bronze']}
          colorMap={{ gold: PRO_ACCENTS.gold.accent, amber: PRO_ACCENTS.amber.accent, bronze: PRO_ACCENTS.bronze.accent }}/>
      </Row>
      <Row label={`Watermark intensity · ${tweaks.watermarkIntensity.toFixed(1)}x`}>
        <input type="range" min="0" max="2" step="0.1" value={tweaks.watermarkIntensity}
          onChange={e => setTweaks({ watermarkIntensity: +e.target.value })}
          style={{ width: '100%', accentColor: '#E8C858' }}/>
      </Row>
      <Row label="View">
        <Pills value={tweaks.showGallery ? 'gallery' : 'prototype'}
          onChange={v => setTweaks({ showGallery: v === 'gallery' })}
          options={['prototype','gallery']}/>
      </Row>
    </div>
  );
}

// ─── App shell ───────────────────────────────────────────────
function App() {
  const [tweaks, setTweaksState] = React.useState(() => {
    try { return { ...DEFAULT_TWEAKS, ...JSON.parse(localStorage.getItem('piker-tweaks') || '{}') }; }
    catch { return DEFAULT_TWEAKS; }
  });
  const [screen, setScreen] = React.useState(() => {
    return localStorage.getItem('piker-screen') || tweaks.startScreen || 'rookie-dashboard';
  });
  const [tweaksVisible, setTweaksVisible] = React.useState(false);

  React.useEffect(() => { localStorage.setItem('piker-screen', screen); }, [screen]);
  React.useEffect(() => { localStorage.setItem('piker-tweaks', JSON.stringify(tweaks)); }, [tweaks]);

  const setTweaks = (edits) => {
    const next = { ...tweaks, ...edits };
    setTweaksState(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
  };

  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode')   setTweaksVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const themes = useThemes(tweaks);

  if (tweaks.showGallery) {
    return (
      <>
        <Gallery themes={themes} onPick={(k) => { setScreen(k); setTweaks({ showGallery: false }); }}/>
        <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} visible={tweaksVisible}/>
      </>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse 900px 700px at 50% 30%, #151520, #07070A 70%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 40, position: 'relative',
    }}>
      <PhoneViewer screenKey={screen} themes={themes} setScreen={setScreen}/>
      {/* Navigator chips */}
      <div style={{
        position: 'fixed', left: 24, top: 24, bottom: 24, width: 180,
        overflow: 'auto', padding: '4px 8px 4px 0',
      }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 9.5, color: '#666', letterSpacing: 1.3, marginBottom: 10 }}>SCREENS</div>
        {GALLERY_GROUPS.map(g => (
          <div key={g.label} style={{ marginBottom: 14 }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 10, color: '#888', letterSpacing: 0.8, marginBottom: 5, fontWeight: 700, textTransform: 'uppercase' }}>{g.label}</div>
            {g.keys.map(k => {
              const active = screen === k;
              const s = SCREENS[k];
              const c = themes[s.mode].accent;
              return (
                <div key={k} onClick={() => setScreen(k)} style={{
                  padding: '5px 8px', borderRadius: 6, cursor: 'pointer',
                  background: active ? c + '20' : 'transparent',
                  border: `1px solid ${active ? c : 'transparent'}`,
                  fontFamily: FONT_DISPLAY, fontSize: 11,
                  color: active ? c : '#999',
                  marginBottom: 2, fontWeight: active ? 700 : 500,
                }}>{s.label}</div>
              );
            })}
          </div>
        ))}
        <div onClick={() => setTweaks({ showGallery: true })} style={{
          marginTop: 14, padding: '8px 10px', borderRadius: 8,
          background: '#111', border: '1px solid #2a2a2a',
          fontFamily: FONT_DISPLAY, fontSize: 11, color: '#ccc', cursor: 'pointer',
          textAlign: 'center', fontWeight: 600,
        }}>⊞ All screens</div>
      </div>
      <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} visible={tweaksVisible}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
