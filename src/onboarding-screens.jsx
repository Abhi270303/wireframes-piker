// onboarding-screens.jsx — S1a–S1f · Restrained premium rebuild
// Design language: hairline grid, numeric monograms, serif accents, precise
// geometric marks. No emoji, no gradients beyond atmospheric wash.

// ─── Shared atmospheric background ───────────────────────────
function OnboardBG({ theme }) {
  return (
    <>
      {/* subtle vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 600px 500px at 50% 40%, ${theme.accent}08, transparent 70%)`,
      }}/>
      {/* hairline grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25, pointerEvents: 'none' }}
        preserveAspectRatio="none" viewBox="0 0 390 844">
        <defs>
          <pattern id="og" width="32.5" height="32.5" patternUnits="userSpaceOnUse">
            <path d="M32.5 0 L0 0 0 32.5" fill="none" stroke={theme.border} strokeWidth="0.4"/>
          </pattern>
        </defs>
        <rect width="390" height="844" fill="url(#og)"/>
      </svg>
    </>
  );
}

// ─── Chrome: tiny serial label (top) + progress rail + brand ──
function OnboardChrome({ theme, step, total = 3, onSkip }) {
  return (
    <>
      <div style={{
        position: 'absolute', top: 56, left: 24, right: 24,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, letterSpacing: 1.5,
      }}>
        <span>PIKER · {String(step).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>
        <span onClick={onSkip} style={{ cursor: onSkip ? 'pointer' : 'default', color: onSkip ? theme.textSec : 'transparent' }}>
          {onSkip ? 'SKIP' : ''}
        </span>
      </div>
    </>
  );
}

// ─── Progress rail (thin segmented) ──────────────────────────
function ProgressRail({ theme, step, total = 3 }) {
  return (
    <div style={{ display: 'flex', gap: 4, width: '100%' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 2, borderRadius: 1,
          background: i <= step ? theme.accent : theme.border,
          opacity: i === step ? 1 : (i < step ? 0.7 : 1),
          transition: 'background 300ms',
        }}/>
      ))}
    </div>
  );
}

// ─── S1a · Daily $100 — numeric monogram ─────────────────────
function MarkDailyHundred({ theme }) {
  // Huge "100" with a single hairline chart above, label below.
  return (
    <div style={{
      width: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 18,
    }}>
      <div style={{
        fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
        letterSpacing: 3, textTransform: 'uppercase',
      }}>DAILY CAPITAL</div>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start' }}>
        <span style={{
          fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 500,
          color: theme.textSec, marginTop: 16, letterSpacing: -0.5,
        }}>$</span>
        <span style={{
          fontFamily: FONT_DISPLAY, fontSize: 180, fontWeight: 300,
          color: theme.text, letterSpacing: -10, lineHeight: 0.9,
          fontFeatureSettings: '"tnum"',
        }}>100</span>
        <span style={{
          fontFamily: FONT_MONO, fontSize: 10, color: theme.accent, letterSpacing: 1.5,
          marginTop: 12, marginLeft: 6, transform: 'rotate(0deg)',
        }}>.00</span>
      </div>
      {/* resets indicator */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '5px 12px',
        border: `1px solid ${theme.border}`, borderRadius: 999,
        fontFamily: FONT_MONO, fontSize: 10, color: theme.textSec, letterSpacing: 1,
      }}>
        <span style={{ width: 5, height: 5, borderRadius: 3, background: theme.accent }}/>
        RESETS 23:59 UTC
      </div>
    </div>
  );
}

// ─── S1b · Climb — a hairline leaderboard ladder ─────────────
function MarkLeaderboard({ theme }) {
  const rows = [
    { r: '001', v: '+84.20', me: false },
    { r: '002', v: '+62.10', me: false },
    { r: '003', v: '+48.90', me: false },
    { r: '···', v: '',       me: false, sep: true },
    { r: '312', v: '+24.80', me: true  },
  ];
  return (
    <div style={{ width: '100%', maxWidth: 260, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{
        fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
        letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14, textAlign: 'center',
      }}>LEADERBOARD · LIVE</div>
      {rows.map((x, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '42px 1fr 68px',
          alignItems: 'center', gap: 12,
          padding: '10px 14px',
          borderTop: i === 0 ? `1px solid ${theme.border}` : 'none',
          borderBottom: `1px solid ${theme.border}`,
          background: x.me ? theme.accent + '10' : 'transparent',
          position: 'relative',
        }}>
          {x.me && <span style={{
            position: 'absolute', left: -1, top: 0, bottom: 0, width: 2, background: theme.accent,
          }}/>}
          <span style={{
            fontFamily: FONT_MONO, fontSize: 11,
            color: x.me ? theme.accent : theme.textMut, letterSpacing: 0.5, fontWeight: x.me ? 700 : 400,
          }}>#{x.r}</span>
          <span style={{
            fontFamily: FONT_DISPLAY, fontSize: 12.5,
            color: x.me ? theme.text : theme.textSec,
            fontStyle: x.sep ? 'italic' : 'normal',
            fontWeight: x.me ? 600 : 400,
          }}>{x.sep ? '' : (x.me ? 'you' : ['alpha.king','moonshot','hodl.life'][i])}</span>
          <span style={{
            fontFamily: FONT_MONO, fontSize: 11.5,
            color: x.v ? '#4ADE80' : 'transparent', textAlign: 'right',
            fontWeight: x.me ? 700 : 500,
          }}>{x.v || '—'}</span>
        </div>
      ))}
    </div>
  );
}

// ─── S1c · Go Pro — single ◆ tier mark ───────────────────────
function MarkProTier({ theme }) {
  return (
    <div style={{
      width: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 32,
    }}>
      <div style={{
        fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
        letterSpacing: 3, textTransform: 'uppercase',
      }}>PROFIT SPLIT</div>
      {/* Large etched diamond mark */}
      <div style={{ position: 'relative', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="140" height="140" viewBox="0 0 140 140">
          {/* concentric hairline rings */}
          <circle cx="70" cy="70" r="68" fill="none" stroke={theme.border} strokeWidth="0.5"/>
          <circle cx="70" cy="70" r="54" fill="none" stroke={theme.border} strokeWidth="0.5"/>
          {/* the mark */}
          <path d="M70 28 L112 70 L70 112 L28 70 Z" fill="none" stroke={theme.accent} strokeWidth="1"/>
          <path d="M70 44 L96 70 L70 96 L44 70 Z" fill={theme.accent} fillOpacity="0.08" stroke={theme.accent} strokeWidth="0.5"/>
        </svg>
      </div>
      {/* split readout: 80 / 15 / 5 */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'baseline' }}>
        {[
          { n: '80', l: 'YOU',      strong: true },
          { n: '15', l: 'BACKERS' },
          { n: '05', l: 'PLATFORM' },
        ].map((x, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ color: theme.border, fontFamily: FONT_MONO, fontSize: 18, fontWeight: 200 }}>/</span>}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: x.strong ? 600 : 400,
                color: x.strong ? theme.accent : theme.textSec, letterSpacing: -1, lineHeight: 1,
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
  );
}

// ─── Swipe shell ─────────────────────────────────────────────
function OnboardSwipe({ theme, step, total, kicker, headline, sub, cta, onNext, onSkip, mark }) {
  return (
    <div style={{ width: '100%', height: '100%', background: theme.bg, position: 'relative', overflow: 'hidden' }}>
      <StatusBar theme={theme}/>
      <OnboardBG theme={theme}/>
      <OnboardChrome theme={theme} step={step + 1} total={total} onSkip={onSkip}/>

      {/* Mark — centered in upper zone */}
      <div style={{
        position: 'absolute', top: 120, left: 0, right: 0, height: 360,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px',
      }}>{mark}</div>

      {/* Copy block — lower third */}
      <div style={{
        position: 'absolute', left: 28, right: 28, bottom: 160, textAlign: 'left',
      }}>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 10, color: theme.accent,
          letterSpacing: 2.5, marginBottom: 12, textTransform: 'uppercase', fontWeight: 600,
        }}>{kicker}</div>
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 30, fontWeight: 500,
          color: theme.text, letterSpacing: -0.8, lineHeight: 1.1, marginBottom: 14,
          textWrap: 'balance',
        }}>{headline}</div>
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.textSec,
          lineHeight: 1.5, maxWidth: 320, textWrap: 'pretty',
        }}>{sub}</div>
      </div>

      {/* Footer — rail + continue */}
      <div style={{ position: 'absolute', left: 28, right: 28, bottom: 48 }}>
        <div style={{ marginBottom: 20 }}>
          <ProgressRail theme={theme} step={step} total={total}/>
        </div>
        <div onClick={onNext} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px',
          background: theme.text, color: theme.bg,
          borderRadius: 10, cursor: 'pointer',
          fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 600, letterSpacing: 0.2,
        }}>
          <span>{cta}</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 16 }}>→</span>
        </div>
      </div>
    </div>
  );
}

const OnboardS1a = ({ theme, onNext, onSkip }) => (
  <OnboardSwipe theme={theme} step={0} total={3}
    kicker="01 · PRACTICE"
    headline={<>One hundred dollars.<br/>Every day. No risk.</>}
    sub="Trade crypto with virtual capital. Reset at midnight UTC. Build the instinct before you build the position."
    cta="Continue"
    mark={<MarkDailyHundred theme={theme}/>}
    onNext={onNext} onSkip={onSkip}
  />
);
const OnboardS1b = ({ theme, onNext, onSkip }) => (
  <OnboardSwipe theme={theme} step={1} total={3}
    kicker="02 · COMPETE"
    headline={<>A leaderboard<br/>worth showing up for.</>}
    sub="Every trader, ranked every day. Streaks, badges, and a permanent record of how you perform."
    cta="Continue"
    mark={<MarkLeaderboard theme={theme}/>}
    onNext={onNext} onSkip={onSkip}
  />
);
const OnboardS1c = ({ theme, onNext, onSkip }) => (
  <OnboardSwipe theme={theme} step={2} total={3}
    kicker="03 · EARN"
    headline={<>When you're ready,<br/>trade real capital.</>}
    sub="Get funded by the community when you prove your edge. Keep eighty percent of what you make."
    cta="Get started"
    mark={<MarkProTier theme={theme}/>}
    onNext={onNext} onSkip={onSkip}
  />
);

// ─── S1d · Sign up — monogram + minimal auth ─────────────────
function OnboardSignup({ theme, onNext }) {
  return (
    <div style={{ width: '100%', height: '100%', background: theme.bg, position: 'relative', overflow: 'hidden' }}>
      <StatusBar theme={theme}/>
      <OnboardBG theme={theme}/>

      {/* Monogram: etched square with single letter, serif treatment */}
      <div style={{
        position: 'absolute', top: 120, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{ position: 'relative', width: 72, height: 72, marginBottom: 28 }}>
          <svg width="72" height="72" viewBox="0 0 72 72">
            <rect x="4" y="4" width="64" height="64" fill="none" stroke={theme.border} strokeWidth="0.5"/>
            <rect x="10" y="10" width="52" height="52" fill="none" stroke={theme.accent} strokeWidth="0.8"/>
          </svg>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: FONT_DISPLAY, fontSize: 34, fontWeight: 500, color: theme.text, letterSpacing: -1,
          }}>P</div>
        </div>
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 500, color: theme.text,
          letterSpacing: -1, lineHeight: 1,
        }}>Piker</div>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
          letterSpacing: 4, marginTop: 14, textTransform: 'uppercase',
        }}>PREDICT · INVEST · KNOW · EARN</div>
      </div>

      {/* Auth options — hairline rows, no pill-style buttons */}
      <div style={{
        position: 'absolute', left: 28, right: 28, bottom: 110,
      }}>
        {[
          { label: 'Continue with Google',  sub: 'g.oauth', primary: false },
          { label: 'Continue with Email',   sub: 'magic link', primary: true, onClick: onNext },
          { label: 'Connect Wallet',        sub: 'Phantom · Backpack', primary: false },
        ].map((o, i, a) => (
          <div key={i} onClick={o.onClick} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 4px',
            borderTop: i === 0 ? `1px solid ${theme.border}` : 'none',
            borderBottom: `1px solid ${theme.border}`,
            cursor: 'pointer',
          }}>
            <div>
              <div style={{
                fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: o.primary ? 600 : 500,
                color: o.primary ? theme.accent : theme.text, letterSpacing: -0.2,
              }}>{o.label}</div>
              <div style={{
                fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
                letterSpacing: 1.2, marginTop: 3, textTransform: 'uppercase',
              }}>{o.sub}</div>
            </div>
            <span style={{
              fontFamily: FONT_MONO, fontSize: 18,
              color: o.primary ? theme.accent : theme.textMut,
            }}>→</span>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', left: 28, right: 28, bottom: 44, textAlign: 'center',
        fontFamily: FONT_DISPLAY, fontSize: 11, color: theme.textMut, lineHeight: 1.6,
      }}>
        By continuing you agree to the{' '}
        <span style={{ color: theme.textSec, textDecoration: 'underline', textUnderlineOffset: 3 }}>Terms</span>
        {' '}&amp;{' '}
        <span style={{ color: theme.textSec, textDecoration: 'underline', textUnderlineOffset: 3 }}>Privacy Policy</span>
      </div>
    </div>
  );
}

// ─── S1e · Username — typographic focal point ────────────────
function OnboardUsername({ theme, onNext }) {
  const [name, setName] = React.useState('pikerkid');
  const taken = ['crypto.king','alpha','satoshi','admin'].includes(name.toLowerCase());
  const valid = name.length >= 3 && !taken && /^[a-z0-9._]+$/.test(name);
  const status = name.length === 0 ? 'idle'
    : name.length < 3 ? 'short'
    : !/^[a-z0-9._]+$/.test(name) ? 'invalid'
    : taken ? 'taken' : 'ok';
  const statusText = {
    idle: '',
    short: 'Too short — minimum 3 characters',
    invalid: 'Lowercase, numbers, dots, underscores only',
    taken: 'Taken — try another',
    ok: 'Available',
  }[status];
  const statusColor = status === 'ok' ? '#4ADE80' : status === 'idle' ? theme.textMut : status === 'short' ? theme.textMut : '#F87171';

  return (
    <div style={{ width: '100%', height: '100%', background: theme.bg, position: 'relative', overflow: 'hidden' }}>
      <StatusBar theme={theme}/>
      <OnboardBG theme={theme}/>
      <OnboardChrome theme={theme} step={4} total={5}/>

      <div style={{
        position: 'absolute', top: 130, left: 28, right: 28,
      }}>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 10, color: theme.accent,
          letterSpacing: 2.5, marginBottom: 14, textTransform: 'uppercase', fontWeight: 600,
        }}>IDENTITY</div>
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 30, fontWeight: 500,
          color: theme.text, letterSpacing: -0.8, lineHeight: 1.1,
        }}>Choose your<br/>permanent handle.</div>
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 14, color: theme.textSec,
          marginTop: 14, lineHeight: 1.5, maxWidth: 300,
        }}>This appears on the leaderboard, your profile, and every share card. It cannot be changed.</div>
      </div>

      {/* The input — giant type, hairline underline, no chrome */}
      <div style={{
        position: 'absolute', top: 370, left: 28, right: 28,
      }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 2,
          paddingBottom: 12,
          borderBottom: `1px solid ${status === 'ok' ? theme.accent : status === 'idle' || status === 'short' ? theme.border : '#F87171'}`,
          transition: 'border-color 200ms',
        }}>
          <span style={{
            fontFamily: FONT_DISPLAY, fontSize: 38, fontWeight: 400,
            color: theme.textMut, letterSpacing: -1, lineHeight: 1,
          }}>@</span>
          <input value={name}
            onChange={e => setName(e.target.value.toLowerCase().slice(0, 20))}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: FONT_DISPLAY, fontSize: 38, fontWeight: 400,
              color: theme.text, letterSpacing: -1, lineHeight: 1, padding: 0,
              caretColor: theme.accent,
            }}/>
          {status === 'ok' && <span style={{ color: '#4ADE80', fontFamily: FONT_MONO, fontSize: 22 }}>✓</span>}
          {(status === 'taken' || status === 'invalid') && <span style={{ color: '#F87171', fontFamily: FONT_MONO, fontSize: 22 }}>✕</span>}
        </div>
        <div style={{
          marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: FONT_MONO, fontSize: 10.5, letterSpacing: 0.5,
        }}>
          <span style={{ color: statusColor }}>{statusText}</span>
          <span style={{ color: theme.textMut }}>{name.length} / 20</span>
        </div>

        {/* URL preview */}
        {valid && (
          <div style={{
            marginTop: 28, padding: '12px 14px',
            border: `1px solid ${theme.border}`, borderRadius: 8,
            fontFamily: FONT_MONO, fontSize: 11, color: theme.textSec, letterSpacing: 0.3,
          }}>
            <span style={{ color: theme.textMut }}>piker.io/</span>
            <span style={{ color: theme.text }}>@{name}</span>
          </div>
        )}
      </div>

      <div style={{ position: 'absolute', left: 28, right: 28, bottom: 44 }}>
        <div onClick={valid ? onNext : undefined} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px',
          background: valid ? theme.text : 'transparent', color: valid ? theme.bg : theme.textMut,
          border: valid ? 'none' : `1px solid ${theme.border}`,
          borderRadius: 10,
          cursor: valid ? 'pointer' : 'not-allowed',
          fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 600, letterSpacing: 0.2,
          transition: 'background 200ms, color 200ms',
        }}>
          <span>Claim handle</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 16 }}>→</span>
        </div>
      </div>
    </div>
  );
}

// ─── S1f · Mode intro — premium comparison, serif treatment ──
function ModeIntro({ theme, onRookie, onPro }) {
  return (
    <div style={{ width: '100%', height: '100%', background: theme.bg, position: 'relative', overflow: 'hidden' }}>
      <StatusBar theme={theme}/>
      <OnboardBG theme={theme}/>
      <OnboardChrome theme={theme} step={5} total={5}/>

      <div style={{ padding: '120px 28px 0' }}>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 10, color: theme.accent,
          letterSpacing: 2.5, marginBottom: 12, textTransform: 'uppercase', fontWeight: 600,
        }}>WELCOME, @PIKERKID</div>
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 30, fontWeight: 500,
          color: theme.text, letterSpacing: -0.8, lineHeight: 1.1,
        }}>Two worlds.<br/>Choose where to begin.</div>
      </div>

      {/* Mode cards — typography forward, not chip-heavy */}
      <div style={{ padding: '36px 28px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <ModeChoiceCard themeLocal={ROOKIE} title="Rookie" subtitle="Practice mode"
          lines={['$100 daily · virtual','Resets at midnight','No real money at risk']}
          kicker="START HERE"
          onClick={onRookie}
          emphasized
        />
        <ModeChoiceCard themeLocal={PRO} title="Pro" subtitle="Live capital"
          lines={['Real money · ongoing','Piker Score & tiers','Fund Me eligible']}
          kicker="WHEN READY"
          onClick={onPro}
        />
      </div>

      <div style={{
        position: 'absolute', bottom: 44, left: 28, right: 28, textAlign: 'center',
        fontFamily: FONT_DISPLAY, fontSize: 12, color: theme.textMut, letterSpacing: 0.2,
      }}>You can switch between modes at any time.</div>
    </div>
  );
}

function ModeChoiceCard({ themeLocal, title, subtitle, lines, kicker, onClick, emphasized }) {
  return (
    <div onClick={onClick} style={{
      position: 'relative', cursor: 'pointer',
      padding: '18px 20px',
      background: emphasized ? themeLocal.accent + '08' : 'transparent',
      border: `1px solid ${emphasized ? themeLocal.accentDeep : themeLocal.border}`,
      borderRadius: 14,
      display: 'flex', alignItems: 'center', gap: 16,
      overflow: 'hidden',
    }}>
      {/* Left marker — tier glyph */}
      <div style={{
        width: 44, height: 44, flexShrink: 0,
        border: `1px solid ${themeLocal.accentDeep}`, borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: themeLocal.accent, fontSize: 20,
      }}>{themeLocal.icon}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
          <span style={{
            fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 500,
            color: '#F5F5F0', letterSpacing: -0.5, lineHeight: 1,
          }}>{title}</span>
          <span style={{
            fontFamily: FONT_MONO, fontSize: 9.5, color: themeLocal.accent,
            letterSpacing: 1.8, fontWeight: 600,
          }}>{kicker}</span>
        </div>
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 12, color: '#888', marginBottom: 8, letterSpacing: 0.1,
        }}>{subtitle}</div>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 10.5, color: '#a0a0a0',
          lineHeight: 1.6, letterSpacing: 0.2,
        }}>
          {lines.map((l, i) => (
            <div key={i}>
              <span style={{ color: '#555', marginRight: 6 }}>·</span>{l}
            </div>
          ))}
        </div>
      </div>

      <span style={{ fontFamily: FONT_MONO, fontSize: 20, color: themeLocal.accent, flexShrink: 0 }}>→</span>
    </div>
  );
}

Object.assign(window, {
  OnboardS1a, OnboardS1b, OnboardS1c, OnboardSignup, OnboardUsername, ModeIntro,
  OnboardBG, ProgressRail, ModeChoiceCard,
});
