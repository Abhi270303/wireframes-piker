// trade-components.jsx — Chart, order book, pair pill

function AreaChart({ theme, height = 180, seed = 1, watermark = true }) {
  const W = 358, H = height;
  const n = 60;
  const pts = React.useMemo(() => {
    let y = 50 + (seed * 7) % 20;
    const arr = [];
    for (let i = 0; i < n; i++) {
      y += (Math.sin(i * 0.4 + seed) + Math.cos(i * 0.17 + seed * 2)) * 2.5;
      y = Math.max(15, Math.min(85, y));
      arr.push(y);
    }
    arr[n - 1] = Math.max(20, arr[n - 1] - 10); // bias up-right
    return arr;
  }, [seed, n]);
  const path = pts.map((y, i) => `${i === 0 ? 'M' : 'L'}${(i / (n - 1)) * W},${(y / 100) * H}`).join(' ');
  const fillPath = `${path} L${W},${H} L0,${H} Z`;
  const last = pts[n - 1];
  return (
    <div style={{ position: 'relative', width: '100%', height }}>
      <svg width="100%" height={height} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`ag-${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.chartTint} stopOpacity="0.35"/>
            <stop offset="100%" stopColor={theme.chartTint} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={fillPath} fill={`url(#ag-${seed})`}/>
        <path d={path} stroke={theme.chartTint} strokeWidth="1.4" fill="none"/>
        <circle cx={W} cy={(last / 100) * H} r="3" fill={theme.chartTint}/>
        <circle cx={W} cy={(last / 100) * H} r="6" fill={theme.chartTint} opacity="0.25"/>
      </svg>
      {watermark && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
          transform: 'rotate(-18deg)',
        }}>
          <span style={{
            fontFamily: FONT_DISPLAY, fontSize: 54, fontWeight: 900,
            color: theme.watermarkColor, letterSpacing: 8, userSelect: 'none',
          }}>{theme.watermarkText}</span>
        </div>
      )}
    </div>
  );
}

function CandleChart({ theme, height = 200, seed = 1 }) {
  const W = 358, H = height;
  const n = 42;
  const candles = React.useMemo(() => {
    let price = 50 + (seed * 7) % 20;
    const arr = [];
    for (let i = 0; i < n; i++) {
      const open = price;
      const drift = (Math.sin(i * 0.3 + seed) + Math.cos(i * 0.13 + seed * 2)) * 3;
      const close = Math.max(15, Math.min(85, open + drift + (Math.random() - 0.5) * 2));
      const high = Math.max(open, close) + Math.random() * 2.5;
      const low = Math.min(open, close) - Math.random() * 2.5;
      arr.push({ o: open, c: close, h: high, l: low });
      price = close;
    }
    return arr;
  }, [seed, n]);
  const cw = (W / n) * 0.75;
  const last = candles[n - 1];
  return (
    <div style={{ position: 'relative', width: '100%', height, background: theme.surface }}>
      <svg width="100%" height={height} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {[20, 40, 60, 80].map(y => (
          <line key={y} x1="0" x2={W} y1={(y / 100) * H} y2={(y / 100) * H}
            stroke={theme.border} strokeWidth="0.5" strokeDasharray="2 4"/>
        ))}
        {candles.map((c, i) => {
          const up = c.c < c.o;
          const color = up ? '#4ADE80' : '#F87171';
          const x = (i / n) * W + (W / n - cw) / 2;
          const yO = (c.o / 100) * H;
          const yC = (c.c / 100) * H;
          const yH = (c.h / 100) * H;
          const yL = (c.l / 100) * H;
          const top = Math.min(yO, yC);
          const h = Math.max(1, Math.abs(yC - yO));
          const midX = x + cw / 2;
          return (
            <g key={i}>
              <line x1={midX} x2={midX} y1={yH} y2={yL} stroke={color} strokeWidth="1"/>
              <rect x={x} y={top} width={cw} height={h} fill={color}/>
            </g>
          );
        })}
      </svg>
      {/* price label right */}
      <div style={{
        position: 'absolute', top: (last.c / 100) * H - 8, right: 4,
        padding: '1px 5px', background: theme.accent, color: '#0A0A0D',
        fontFamily: FONT_MONO, fontSize: 10, fontWeight: 700, borderRadius: 3,
      }}>58,243</div>
      {/* price axis */}
      <div style={{
        position: 'absolute', top: 8, right: 6, fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
      }}>59,200</div>
      <div style={{
        position: 'absolute', bottom: 4, right: 6, fontFamily: FONT_MONO, fontSize: 9.5, color: theme.textMut,
      }}>57,100</div>
      {/* watermark */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
        transform: 'rotate(-18deg)',
      }}>
        <span style={{
          fontFamily: FONT_DISPLAY, fontSize: 64, fontWeight: 900,
          color: theme.watermarkColor, letterSpacing: 10, userSelect: 'none',
        }}>{theme.watermarkText}</span>
      </div>
    </div>
  );
}

function OrderBook({ theme }) {
  const asks = [
    { p: '58,251.40', q: 0.42 },
    { p: '58,249.80', q: 1.28 },
    { p: '58,247.20', q: 0.61 },
    { p: '58,245.10', q: 2.14 },
  ];
  const bids = [
    { p: '58,242.80', q: 1.85 },
    { p: '58,240.50', q: 0.97 },
    { p: '58,238.20', q: 3.12 },
    { p: '58,235.60', q: 0.54 },
  ];
  return (
    <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div>
          <div style={{
            fontFamily: FONT_DISPLAY, fontSize: 9.5, color: theme.textMut, letterSpacing: 0.8,
            marginBottom: 4, fontWeight: 600,
          }}>ASKS</div>
          {asks.map((a, i) => (
            <div key={i} style={{ position: 'relative', padding: '2px 4px', fontFamily: FONT_MONO, fontSize: 10.5 }}>
              <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0,
                width: `${a.q * 30}%`, background: '#F8717115', borderRadius: 2,
              }}/>
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#F87171' }}>{a.p}</span>
                <span style={{ color: theme.textSec }}>{a.q}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div style={{
            fontFamily: FONT_DISPLAY, fontSize: 9.5, color: theme.textMut, letterSpacing: 0.8,
            marginBottom: 4, fontWeight: 600, textAlign: 'right',
          }}>BIDS</div>
          {bids.map((b, i) => (
            <div key={i} style={{ position: 'relative', padding: '2px 4px', fontFamily: FONT_MONO, fontSize: 10.5 }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: `${b.q * 30}%`, background: '#4ADE8015', borderRadius: 2,
              }}/>
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: theme.textSec }}>{b.q}</span>
                <span style={{ color: '#4ADE80' }}>{b.p}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{
        marginTop: 8, padding: '4px', borderTop: `1px solid ${theme.border}`,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut,
      }}>
        <span>Spread <span style={{ color: theme.text }}>2.30</span></span>
        <span>0.004%</span>
      </div>
    </div>
  );
}

function PairPill({ theme, pair, change, active, onClick }) {
  const pos = change >= 0;
  return (
    <div onClick={onClick} style={{
      flexShrink: 0, padding: '6px 11px', borderRadius: 10,
      background: active ? theme.accentFaint : theme.surface,
      border: `1px solid ${active ? theme.accentDeep : theme.border}`,
      cursor: 'pointer', minWidth: 64, textAlign: 'center',
    }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 700, color: active ? theme.accent : theme.text }}>{pair}</div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 9.5, color: pos ? '#4ADE80' : '#F87171', marginTop: 1 }}>
        {pos ? '+' : ''}{change.toFixed(2)}%
      </div>
    </div>
  );
}

function BadgeTile({ theme, icon, name, earned, hint }) {
  return (
    <div style={{
      background: earned ? theme.surfaceElev : theme.surface,
      border: `1px solid ${earned ? theme.accentDeep : theme.border}`,
      borderRadius: 10, padding: '10px 6px', textAlign: 'center',
      opacity: earned ? 1 : 0.55,
      position: 'relative',
    }}>
      <div style={{
        fontSize: 22, marginBottom: 4,
        filter: earned ? 'none' : 'grayscale(100%)',
        animation: earned ? 'badgeShimmer 3s ease-in-out infinite' : 'none',
      }}>{icon}</div>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 9.5, color: earned ? theme.text : theme.textMut, fontWeight: 600, letterSpacing: 0.2, lineHeight: 1.15 }}>{name}</div>
      {!earned && hint && (
        <div style={{ fontFamily: FONT_MONO, fontSize: 8.5, color: theme.textMut, marginTop: 2 }}>{hint}</div>
      )}
    </div>
  );
}

function LbRow({ theme, row, pro = false, isLast = false, onClick }) {
  const r = row;
  const me = r.me;
  return (
    <div onClick={onClick} style={{
      display: 'grid',
      gridTemplateColumns: '36px 28px 1fr auto',
      alignItems: 'center', gap: 8,
      padding: '10px 12px',
      borderBottom: isLast ? 'none' : `1px solid ${theme.border}`,
      background: me ? theme.accentFaint : 'transparent',
      cursor: onClick ? 'pointer' : 'default',
    }}>
      <span style={{
        fontFamily: FONT_MONO, fontSize: 12, color: r.r <= 3 ? theme.accent : theme.textMut,
        fontWeight: 700,
      }}>#{r.r}</span>
      <Avatar name={r.n} size={24} tier={pro ? r.tier : undefined}/>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 12.5, fontWeight: 600, color: theme.text,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{r.n}{me && <span style={{ color: theme.accent, marginLeft: 4 }}>· you</span>}</div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: theme.textMut, marginTop: 1 }}>
          {pro ? <>
            <span style={{ color: TIER_COLORS[r.tier]?.a }}>{r.tier}</span>
            {r.fundMe && <span style={{ color: '#4ADE80', marginLeft: 6 }}>● fund me</span>}
          </> : <>◈ {r.streak || 0}d</>}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        {pro ? (
          <>
            <div style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 700, color: theme.accent }}>{r.score}</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10.5, color: '#4ADE80' }}>+{r.roi}%</div>
          </>
        ) : (
          <>
            <div style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 700, color: r.pl >= 0 ? '#4ADE80' : '#F87171' }}>
              {r.pl >= 0 ? '+' : ''}${Math.abs(r.pl).toFixed(2)}
            </div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10.5, color: theme.textMut }}>
              {r.pl >= 0 ? '+' : ''}{r.plPct}%
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { AreaChart, CandleChart, OrderBook, PairPill, BadgeTile, LbRow });
