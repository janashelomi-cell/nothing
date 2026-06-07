import { useState, useEffect, useRef } from "react";
import {
  Zap, AlertTriangle, Trophy, Users, Swords, Crown,
  ChevronDown, ChevronUp, TrendingUp, Star, Eye, Flame,
  Shield, Clock, XCircle, CheckCircle, Radio, BarChart2
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const SENATORS = [
  { id: 1,  name: "WIN GATCHALIAN",      party: "NPC",    status: "PRESENT",        pts: 142, role: "Majority Floor Leader (Disputed)",  drama: 98 },
  { id: 2,  name: "ALAN PETER CAYETANO", party: "IND",    status: "WALKOUT",        pts: 88,  role: "Minority Leader / Coup Architect",   drama: 100 },
  { id: 3,  name: "TITO SOTTO",          party: "NPC",    status: "PRESENT",        pts: 119, role: "Senate President Emeritus",          drama: 71 },
  { id: 4,  name: "BATO DELA ROSA",      party: "PFP",    status: "PRESENT",        pts: 94,  role: "Committee on Public Order",          drama: 85 },
  { id: 5,  name: "KIKO PANGILINAN",     party: "LP",     status: "PRESENT",        pts: 110, role: "Opposition Stalwart",                drama: 62 },
  { id: 6,  name: "CHIZ ESCUDERO",       party: "IND",    status: "PRESENT",        pts: 131, role: "Senate President",                   drama: 88 },
  { id: 7,  name: "NANCY BINAY",         party: "UNA",    status: "PRESENT",        pts: 103, role: "Committee on Women",                 drama: 55 },
  { id: 8,  name: "MARK VILLAR",         party: "NP",     status: "PRESENT",        pts: 97,  role: "Committee on Public Works",          drama: 60 },
  { id: 9,  name: "CYNTHIA VILLAR",      party: "NP",     status: "PRESENT",        pts: 108, role: "Committee on Agriculture",           drama: 58 },
  { id: 10, name: "SHERWIN GATCHALIAN",  party: "NPC",    status: "PRESENT",        pts: 76,  role: "Committee on Basic Education",       drama: 44 },
  { id: 11, name: "ERWIN TULFO",         party: "PFP",    status: "WALKOUT",        pts: 61,  role: "Committee on Social Services",       drama: 92 },
  { id: 12, name: "RAFFY TULFO",         party: "IND",    status: "PRESENT",        pts: 79,  role: "Committee on Labor",                 drama: 89 },
  { id: 13, name: "LITO LAPID",          party: "NP",     status: "PRESENT",        pts: 55,  role: "Committee on Justice",               drama: 33 },
  { id: 14, name: "JV EJERCITO",         party: "NUP",    status: "PRESENT",        pts: 88,  role: "Committee on Health",                drama: 50 },
  { id: 15, name: "JINGGOY ESTRADA",     party: "PMP",    status: "EVADING ARREST", pts: 22,  role: "On Bail / Eternal Comeback",         drama: 97 },
  { id: 16, name: "LOREN LEGARDA",       party: "IND",    status: "PRESENT",        pts: 122, role: "Committee on Finance",               drama: 45 },
  { id: 17, name: "IMEE MARCOS",         party: "NP",     status: "PRESENT",        pts: 115, role: "Committee on Foreign Affairs",       drama: 80 },
  { id: 18, name: "RISA HONTIVEROS",     party: "LP",     status: "PRESENT",        pts: 138, role: "Opposition Conscience / Drama Queen", drama: 91 },
  { id: 19, name: "FRANCIS TOLENTINO",   party: "PFP",    status: "PRESENT",        pts: 84,  role: "Committee on Tourism",               drama: 55 },
  { id: 20, name: "AQUILINO PIMENTEL III", party: "PDP",  status: "WALKOUT",        pts: 47,  role: "Minority Bloc Coordinator",          drama: 68 },
  { id: 21, name: "SONNY ANGARA",        party: "LDP",    status: "PRESENT",        pts: 126, role: "Committee on Education",             drama: 40 },
  { id: 22, name: "RONALDO PUNO",        party: "NP",     status: "DETAINED",       pts: 0,   role: "PDEA Case / Sabbatical (Involuntary)", drama: 99 },
  { id: 23, name: "PING LACSON",         party: "IND",    status: "PRESENT",        pts: 109, role: "Committee on National Defense",      drama: 62 },
  { id: 24, name: "ROBINHOOD PADILLA",   party: "PFP",    status: "PRESENT",        pts: 71,  role: "Action Star / Committee on DICT",    drama: 74 },
];

const STATUS_CONFIG = {
  "PRESENT":        { label: "PRESENT",        color: "#E1FF00", bg: "#1a1f00", icon: CheckCircle },
  "WALKOUT":        { label: "LUMABAS NA",      color: "#FF6B00", bg: "#1f1100", icon: XCircle },
  "EVADING ARREST": { label: "NAGTATAKAS",      color: "#FF003C", bg: "#1f0010", icon: AlertTriangle },
  "DETAINED":       { label: "NASA KULUNGAN",   color: "#9CA3AF", bg: "#111111", icon: Shield },
};

const TICKER_ITEMS = [
  "🔴 BREAKING: Cayetano coalition claims 13 votes pero walang roll call — BARDAGULAN CONFIRMED",
  "⚡ Win Gatchalian nagpadala ng memo sa 12 committee chairs: 'Ikaw pa rin ang boss ko'",
  "🏆 Risa Hontiveros leads drama points sa Week 23 — #SabotageQueen",
  "🚨 Jinggoy Estrada spotted sa Duty Free — EVADING ARREST badge remains ACTIVE",
  "👑 Chiz Escudero: 'Hindi ako nag-resign. Nag-bakasyon lang.' — +15 drama pts",
  "💀 Erwin Tulfo walkout counter: 4 na ngayong taon. Personal record na.",
  "📊 Villar siblings combined committee control: 14% ng Senate budget",
  "🔥 Bato dela Rosa nagbanta ng contempt sa journalist — +22 pts sa drama board",
  "⚠️ QUORUM ALERT: 10 senators missing. Session suspended. Fantasy points FROZEN.",
  "🎭 Tulfos vs Cayetanos sa committee hearing — Resibo Battleground UPDATE: Tulfos leading 61–39",
];

const DYNASTIES = [
  {
    family: "VILLAR",
    members: ["CYNTHIA VILLAR", "MARK VILLAR"],
    committees: ["Agriculture", "Public Works", "Finance (observer)", "DPWH Oversight"],
    pct: 14,
    color: "#E1FF00",
    note: "Mother-son tandem. Combined budget influence: ₱1.2T per year.",
    ids: [8, 9],
  },
  {
    family: "CAYETANO",
    members: ["ALAN PETER CAYETANO"],
    exMembers: ["PIA CAYETANO (ex-senator)"],
    committees: ["Foreign Affairs (blocked)", "Rules Committee (disputed)"],
    pct: 8,
    color: "#FF6B00",
    note: "Alan Peter currently operating as lone wolf after Pia's exit. Still coordinating externally.",
    ids: [2],
  },
  {
    family: "TULFO",
    members: ["RAFFY TULFO", "ERWIN TULFO"],
    exMembers: ["BEN TULFO (ex-undersecretary)"],
    committees: ["Labor", "Social Services", "DSWD Oversight", "OFW Affairs"],
    pct: 11,
    color: "#FF003C",
    note: "Media empire + Senate seats. Combined: 4 shows, 2 seats, unlimited tsismis budget.",
    ids: [11, 12],
  },
  {
    family: "ESTRADA",
    members: ["JV EJERCITO", "JINGGOY ESTRADA"],
    exMembers: ["ERAP (ex-president, now dead, culturally immortal)"],
    committees: ["Health", "Justice (nominal)"],
    pct: 9,
    color: "#9C27B0",
    note: "Half-brothers. JV present, Jinggoy evading. Legacy brand still delivering votes.",
    ids: [14, 15],
  },
];

const RESIBO_MATCHUP = {
  left: {
    id: 6,
    name: "CHIZ ESCUDERO",
    title: "Senate President",
    subtitle: "Nagtatagal sa trono",
    image: "CE",
    color: "#E1FF00",
    stats: { votes: 14, committees: 12, drama: 88, days_in_power: 410 },
    quote: "Ang Senate ay para sa lahat — pero ang pwesto ko ay para sa akin.",
    chips: ["#Trabaho", "#LegitimateLeader", "#PalagayNa"],
  },
  right: {
    id: 2,
    name: "ALAN PETER CAYETANO",
    title: "Coup Architect",
    subtitle: "Nag-oorganisa sa labas",
    image: "APC",
    color: "#FF003C",
    stats: { votes: 11, committees: 3, drama: 100, days_plotting: 180 },
    quote: "May 13 na kaming boto. Ibibigay ko sa inyo bukas. O makalawa. O next week.",
    chips: ["#Drama", "#SaanAngBoto", "#HindiDasurb"],
  },
  context: "LEADERSHIP COUP WEEK 26 — Win Gatchalian vs Cayetano bloc: Sino ba talaga ang may hawak ng gavel?",
};

// ─── SUB-COMPONENTS ─────────────────────────────────────────────────────────

function Ticker({ items }) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % items.length);
        setFade(true);
      }, 300);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div style={{
      background: "#FF003C",
      borderBottom: "2px solid #E1FF00",
      padding: "8px 12px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      minHeight: "40px",
    }}>
      <div style={{
        background: "#000",
        color: "#E1FF00",
        fontSize: "9px",
        fontWeight: 900,
        letterSpacing: "0.15em",
        padding: "2px 6px",
        flexShrink: 0,
        border: "1px solid #E1FF00",
      }}>
        LIVE
      </div>
      <div style={{
        color: "#fff",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.05em",
        opacity: fade ? 1 : 0,
        transition: "opacity 0.3s",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}>
        {items[idx]}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["PRESENT"];
  const Icon = cfg.icon;
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "3px",
      background: cfg.bg,
      color: cfg.color,
      border: `1px solid ${cfg.color}`,
      fontSize: "8px",
      fontWeight: 900,
      letterSpacing: "0.1em",
      padding: "2px 5px",
    }}>
      <Icon size={8} />
      {cfg.label}
    </span>
  );
}

function DramaBar({ value }) {
  const color = value >= 90 ? "#FF003C" : value >= 70 ? "#FF6B00" : "#E1FF00";
  return (
    <div style={{ width: "100%", background: "#222", height: "4px", marginTop: "4px" }}>
      <div style={{
        width: `${value}%`,
        height: "100%",
        background: color,
        transition: "width 0.4s",
      }} />
    </div>
  );
}

function SenatorCard({ senator, inRoster, onToggle }) {
  const [localPts, setLocalPts] = useState(senator.pts);

  function bump(delta) {
    setLocalPts(p => Math.max(0, p + delta));
  }

  return (
    <div
      onClick={() => onToggle(senator)}
      style={{
        background: inRoster ? "#0d1a00" : "#121212",
        border: `2px solid ${inRoster ? "#E1FF00" : "#2a2a2a"}`,
        padding: "10px",
        cursor: "pointer",
        position: "relative",
        transition: "border-color 0.2s, background 0.2s",
      }}
    >
      {inRoster && (
        <div style={{
          position: "absolute",
          top: "6px",
          right: "6px",
          background: "#E1FF00",
          color: "#000",
          fontSize: "8px",
          fontWeight: 900,
          padding: "1px 4px",
          letterSpacing: "0.1em",
        }}>★ ROSTER</div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
        <div>
          <div style={{ color: "#F3F4F6", fontSize: "12px", fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {senator.name}
          </div>
          <div style={{ color: "#6B7280", fontSize: "9px", marginTop: "1px", letterSpacing: "0.05em" }}>
            {senator.party} · {senator.role}
          </div>
        </div>
        <div style={{
          color: "#E1FF00",
          fontSize: "22px",
          fontWeight: 900,
          fontFamily: "monospace",
          lineHeight: 1,
        }}>
          {localPts}
        </div>
      </div>

      <StatusBadge status={senator.status} />

      <div style={{ marginTop: "6px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#6B7280", fontSize: "8px", letterSpacing: "0.1em" }}>DRAMA INDEX</span>
          <span style={{ color: "#9CA3AF", fontSize: "8px", fontFamily: "monospace" }}>{senator.drama}/100</span>
        </div>
        <DramaBar value={senator.drama} />
      </div>

      <div
        style={{ display: "flex", gap: "4px", marginTop: "8px" }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => bump(5)}
          style={{
            flex: 1,
            background: "#0d1a00",
            border: "1px solid #E1FF00",
            color: "#E1FF00",
            fontSize: "10px",
            fontWeight: 900,
            padding: "3px 0",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >+5 TRABAHO</button>
        <button
          onClick={() => bump(-3)}
          style={{
            flex: 1,
            background: "#1a0005",
            border: "1px solid #FF003C",
            color: "#FF003C",
            fontSize: "10px",
            fontWeight: 900,
            padding: "3px 0",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}>-3 ABSENT</button>
        <button
          onClick={() => bump(10)}
          style={{
            flex: 1,
            background: "#1a0800",
            border: "1px solid #FF6B00",
            color: "#FF6B00",
            fontSize: "10px",
            fontWeight: 900,
            padding: "3px 0",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}>+10 DRAMA</button>
      </div>
    </div>
  );
}

function ResiboTab() {
  const m = RESIBO_MATCHUP;
  const [votes, setVotes] = useState({ left: 54, right: 46 });
  const [lastChip, setLastChip] = useState(null);
  const [chipAnim, setChipAnim] = useState(false);

  function castVote(side, chip) {
    setLastChip(chip);
    setChipAnim(true);
    setTimeout(() => setChipAnim(false), 600);
    setVotes(v => {
      const delta = side === "left" ? 2 : -2;
      const raw = Math.max(5, Math.min(95, v.left + delta));
      return { left: raw, right: 100 - raw };
    });
  }

  const leftColor = m.left.color;
  const rightColor = m.right.color;

  return (
    <div style={{ padding: "12px" }}>
      <div style={{
        background: "#1a0005",
        border: "2px solid #FF003C",
        padding: "8px 12px",
        marginBottom: "12px",
        textAlign: "center",
      }}>
        <div style={{ color: "#FF003C", fontSize: "9px", fontWeight: 900, letterSpacing: "0.15em" }}>
          RESIBO BATTLEGROUND — WEEK 26
        </div>
        <div style={{ color: "#F3F4F6", fontSize: "11px", fontWeight: 700, marginTop: "3px", lineHeight: 1.4 }}>
          {m.context}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr", gap: "6px", alignItems: "start" }}>
        {/* LEFT FIGHTER */}
        <FighterCard
          fighter={m.left}
          side="left"
          onChip={(chip) => castVote("left", chip)}
        />

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "40px",
          gap: "4px",
        }}>
          <Swords size={18} color="#FF003C" />
          <div style={{ color: "#FF003C", fontSize: "10px", fontWeight: 900 }}>VS</div>
        </div>

        {/* RIGHT FIGHTER */}
        <FighterCard
          fighter={m.right}
          side="right"
          onChip={(chip) => castVote("right", chip)}
        />
      </div>

      {/* VOTE BAR */}
      <div style={{ marginTop: "14px", background: "#121212", border: "2px solid #2a2a2a", padding: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
          <span style={{ color: leftColor, fontSize: "10px", fontWeight: 900, fontFamily: "monospace" }}>
            {votes.left}%
          </span>
          <span style={{ color: "#9CA3AF", fontSize: "9px", letterSpacing: "0.1em" }}>COMMUNITY VERDICT</span>
          <span style={{ color: rightColor, fontSize: "10px", fontWeight: 900, fontFamily: "monospace" }}>
            {votes.right}%
          </span>
        </div>
        <div style={{ height: "12px", background: "#000", display: "flex", border: "1px solid #2a2a2a" }}>
          <div style={{
            width: `${votes.left}%`,
            background: leftColor,
            transition: "width 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          }} />
          <div style={{ flex: 1, background: rightColor }} />
        </div>

        {lastChip && (
          <div style={{
            marginTop: "6px",
            textAlign: "center",
            color: "#E1FF00",
            fontSize: "10px",
            fontWeight: 900,
            opacity: chipAnim ? 1 : 0.3,
            transition: "opacity 0.3s",
            letterSpacing: "0.1em",
          }}>
            IBINOTO MO: {lastChip}
          </div>
        )}
      </div>

      {/* DRAMA SCORE LEGEND */}
      <div style={{
        marginTop: "10px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "6px",
      }}>
        {[
          { label: "TOTAL CHIPS CAST", value: "2,847", icon: BarChart2 },
          { label: "DRAMA INTENSITY", value: "GRABE", icon: Flame },
          { label: "WALKING WOUNDED", value: "Chiz, Win", icon: AlertTriangle },
          { label: "CURRENT VERDICT", value: votes.left > votes.right ? "CHIZ PANALO" : "APC PANALO", icon: Trophy },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} style={{
            background: "#121212",
            border: "1px solid #2a2a2a",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Icon size={9} color="#6B7280" />
              <span style={{ color: "#6B7280", fontSize: "8px", letterSpacing: "0.1em" }}>{label}</span>
            </div>
            <span style={{ color: "#E1FF00", fontSize: "13px", fontWeight: 900, fontFamily: "monospace" }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FighterCard({ fighter, side, onChip }) {
  return (
    <div style={{
      background: "#0a0a0a",
      border: `2px solid ${fighter.color}`,
      padding: "8px",
    }}>
      <div style={{
        width: "100%",
        aspectRatio: "1",
        background: `${fighter.color}22`,
        border: `1px solid ${fighter.color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "6px",
      }}>
        <span style={{
          color: fighter.color,
          fontSize: "22px",
          fontWeight: 900,
          fontFamily: "monospace",
          letterSpacing: "-0.05em",
        }}>{fighter.image}</span>
      </div>

      <div style={{ color: "#F3F4F6", fontSize: "10px", fontWeight: 900, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {fighter.name}
      </div>
      <div style={{ color: fighter.color, fontSize: "8px", fontWeight: 700, marginTop: "1px" }}>
        {fighter.title}
      </div>
      <div style={{ color: "#6B7280", fontSize: "8px", marginTop: "2px" }}>
        {fighter.subtitle}
      </div>

      <div style={{
        background: "#111",
        border: "1px solid #222",
        padding: "5px",
        marginTop: "6px",
        fontSize: "8px",
        color: "#9CA3AF",
        fontStyle: "italic",
        lineHeight: 1.4,
      }}>
        "{fighter.quote}"
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3px",
        marginTop: "6px",
      }}>
        {Object.entries(fighter.stats).map(([k, v]) => (
          <div key={k} style={{ background: "#111", padding: "3px 4px" }}>
            <div style={{ color: "#6B7280", fontSize: "7px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {k.replace(/_/g, " ")}
            </div>
            <div style={{ color: fighter.color, fontSize: "11px", fontWeight: 900, fontFamily: "monospace" }}>
              {v}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginTop: "6px" }}>
        {fighter.chips.map(chip => (
          <button
            key={chip}
            onClick={() => onChip(chip)}
            style={{
              background: "#000",
              border: `1px solid ${fighter.color}`,
              color: fighter.color,
              fontSize: "8px",
              fontWeight: 900,
              padding: "3px 4px",
              cursor: "pointer",
              letterSpacing: "0.08em",
              textAlign: "left",
              transition: "background 0.15s",
            }}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

function DynastyTab() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ padding: "12px" }}>
      <div style={{
        background: "#000",
        border: "2px solid #E1FF00",
        padding: "8px 12px",
        marginBottom: "12px",
      }}>
        <div style={{ color: "#E1FF00", fontSize: "9px", fontWeight: 900, letterSpacing: "0.15em" }}>
          DYNASTY MONOPOLY TRACKER
        </div>
        <div style={{ color: "#9CA3AF", fontSize: "10px", marginTop: "3px" }}>
          Sino ang nagmamay-ari ng Senado? Lahat ng kamag-anak, lahat ng komite.
        </div>
      </div>

      {/* TOTAL PIE VISUAL */}
      <div style={{
        background: "#121212",
        border: "2px solid #2a2a2a",
        padding: "12px",
        marginBottom: "12px",
      }}>
        <div style={{ color: "#9CA3AF", fontSize: "9px", letterSpacing: "0.1em", marginBottom: "8px" }}>
          COMBINED DYNASTY CONTROL
        </div>
        {DYNASTIES.map(d => (
          <div key={d.family} style={{ marginBottom: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
              <span style={{ color: d.color, fontSize: "10px", fontWeight: 900, letterSpacing: "0.1em" }}>
                {d.family}
              </span>
              <span style={{ color: d.color, fontSize: "10px", fontWeight: 900, fontFamily: "monospace" }}>
                {d.pct}%
              </span>
            </div>
            <div style={{ background: "#000", height: "8px", border: `1px solid ${d.color}33` }}>
              <div style={{
                width: `${d.pct}%`,
                height: "100%",
                background: d.color,
                transition: "width 0.6s",
              }} />
            </div>
          </div>
        ))}
        <div style={{
          marginTop: "8px",
          borderTop: "1px solid #2a2a2a",
          paddingTop: "6px",
          display: "flex",
          justifyContent: "space-between",
        }}>
          <span style={{ color: "#6B7280", fontSize: "9px", letterSpacing: "0.1em" }}>TOTAL DYNASTY GRIP</span>
          <span style={{ color: "#E1FF00", fontSize: "14px", fontWeight: 900, fontFamily: "monospace" }}>
            {DYNASTIES.reduce((a, d) => a + d.pct, 0)}%
          </span>
        </div>
      </div>

      {/* DYNASTY CARDS */}
      {DYNASTIES.map(dynasty => {
        const isOpen = expanded === dynasty.family;
        return (
          <div
            key={dynasty.family}
            style={{
              background: "#121212",
              border: `2px solid ${isOpen ? dynasty.color : "#2a2a2a"}`,
              marginBottom: "8px",
              transition: "border-color 0.2s",
            }}
          >
            <button
              onClick={() => setExpanded(isOpen ? null : dynasty.family)}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Crown size={14} color={dynasty.color} />
                <div style={{ textAlign: "left" }}>
                  <div style={{ color: dynasty.color, fontSize: "13px", fontWeight: 900, letterSpacing: "0.12em" }}>
                    PAMILYA {dynasty.family}
                  </div>
                  <div style={{ color: "#6B7280", fontSize: "9px", marginTop: "1px" }}>
                    {dynasty.members.length} aktibong miyembro · {dynasty.committees.length} komite
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  background: dynasty.color,
                  color: "#000",
                  fontSize: "12px",
                  fontWeight: 900,
                  fontFamily: "monospace",
                  padding: "2px 6px",
                }}>
                  {dynasty.pct}%
                </div>
                {isOpen ? <ChevronUp size={14} color={dynasty.color} /> : <ChevronDown size={14} color="#6B7280" />}
              </div>
            </button>

            {isOpen && (
              <div style={{
                borderTop: `1px solid ${dynasty.color}44`,
                padding: "10px 12px",
                background: "#0a0a0a",
              }}>
                <div style={{ marginBottom: "8px" }}>
                  <div style={{ color: "#9CA3AF", fontSize: "8px", letterSpacing: "0.1em", marginBottom: "4px" }}>
                    KASALUKUYANG MIYEMBRO
                  </div>
                  {dynasty.members.map(m => (
                    <div key={m} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "3px",
                    }}>
                      <div style={{ width: "6px", height: "6px", background: dynasty.color, flexShrink: 0 }} />
                      <span style={{ color: "#F3F4F6", fontSize: "10px", fontWeight: 700 }}>{m}</span>
                    </div>
                  ))}
                  {dynasty.exMembers && dynasty.exMembers.map(m => (
                    <div key={m} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "3px",
                    }}>
                      <div style={{ width: "6px", height: "6px", background: "#444", flexShrink: 0 }} />
                      <span style={{ color: "#6B7280", fontSize: "9px", fontStyle: "italic" }}>{m}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: "8px" }}>
                  <div style={{ color: "#9CA3AF", fontSize: "8px", letterSpacing: "0.1em", marginBottom: "4px" }}>
                    HAWAK NA KOMITE
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {dynasty.committees.map(c => (
                      <span key={c} style={{
                        background: `${dynasty.color}18`,
                        border: `1px solid ${dynasty.color}55`,
                        color: dynasty.color,
                        fontSize: "8px",
                        fontWeight: 700,
                        padding: "2px 5px",
                        letterSpacing: "0.05em",
                      }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  background: "#111",
                  border: `1px solid ${dynasty.color}33`,
                  padding: "6px 8px",
                }}>
                  <div style={{ color: "#9CA3AF", fontSize: "9px", lineHeight: 1.5 }}>
                    📌 {dynasty.note}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CoreFiveFooter({ roster }) {
  const sorted = [...roster].sort((a, b) => b.pts - a.pts);
  const total = sorted.reduce((s, r) => s + r.pts, 0);
  const maxPossible = SENATORS.slice().sort((a, b) => b.pts - a.pts).slice(0, 5).reduce((s, r) => s + r.pts, 0);
  const efficiency = total > 0 ? Math.round((total / maxPossible) * 100) : 0;

  return (
    <div style={{
      position: "sticky",
      bottom: 0,
      background: "#000",
      borderTop: "2px solid #E1FF00",
      zIndex: 100,
    }}>
      <div style={{
        background: "#E1FF00",
        padding: "4px 12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Star size={10} color="#000" />
          <span style={{ color: "#000", fontSize: "9px", fontWeight: 900, letterSpacing: "0.15em" }}>
            MY CORE 5
          </span>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#000", fontSize: "8px", fontWeight: 700, letterSpacing: "0.1em" }}>TOTAL PTS</div>
            <div style={{ color: "#000", fontSize: "16px", fontWeight: 900, fontFamily: "monospace", lineHeight: 1 }}>
              {total}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#000", fontSize: "8px", fontWeight: 700, letterSpacing: "0.1em" }}>EFFICIENCY</div>
            <div style={{ color: "#000", fontSize: "16px", fontWeight: 900, fontFamily: "monospace", lineHeight: 1 }}>
              {efficiency}%
            </div>
          </div>
        </div>
      </div>

      {roster.length === 0 ? (
        <div style={{ padding: "8px 12px", color: "#6B7280", fontSize: "9px", textAlign: "center", letterSpacing: "0.1em" }}>
          Wala pang napili — i-tap ang isang senator para idagdag sa Core 5
        </div>
      ) : (
        <div style={{
          display: "flex",
          gap: "4px",
          padding: "6px 8px",
          overflowX: "auto",
        }}>
          {sorted.map(s => (
            <div key={s.id} style={{
              background: "#121212",
              border: "1px solid #E1FF00",
              padding: "4px 6px",
              flexShrink: 0,
              minWidth: "70px",
            }}>
              <div style={{ color: "#E1FF00", fontSize: "8px", fontWeight: 900, letterSpacing: "0.05em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "80px" }}>
                {s.name.split(" ").pop()}
              </div>
              <div style={{ color: "#F3F4F6", fontSize: "13px", fontWeight: 900, fontFamily: "monospace" }}>
                {s.pts}
              </div>
            </div>
          ))}
          {roster.length < 5 && (
            <div style={{
              background: "#0a0a0a",
              border: "1px dashed #3a3a3a",
              padding: "4px 6px",
              flexShrink: 0,
              minWidth: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#3a3a3a",
              fontSize: "18px",
            }}>+</div>
          )}
        </div>
      )}

      {total > 0 && (
        <div style={{
          padding: "4px 12px",
          background: "#0a0a0a",
          borderTop: "1px solid #1a1a1a",
          fontSize: "8px",
          color: "#6B7280",
          letterSpacing: "0.05em",
        }}>
          {sorted.map((s, i) => `${s.name.split(" ").pop()} (${s.pts})`).join(" + ")} = {total} pts
          {roster.length === 5 && (
            <span style={{ color: efficiency >= 80 ? "#E1FF00" : efficiency >= 60 ? "#FF6B00" : "#FF003C", marginLeft: "6px", fontWeight: 900 }}>
              {efficiency >= 80 ? "🔥 SOLID LINEUP" : efficiency >= 60 ? "⚡ PWEDE NA" : "💀 KAILANGAN PA"}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function Bardagulan() {
  const [tab, setTab] = useState("grid");
  const [roster, setRoster] = useState([]);
  const [filter, setFilter] = useState("ALL");

  function toggleRoster(senator) {
    setRoster(prev => {
      const exists = prev.find(s => s.id === senator.id);
      if (exists) return prev.filter(s => s.id !== senator.id);
      if (prev.length >= 5) return prev;
      return [...prev, senator];
    });
  }

  const statusFilters = ["ALL", "PRESENT", "WALKOUT", "EVADING ARREST", "DETAINED"];
  const filtered = filter === "ALL" ? SENATORS : SENATORS.filter(s => s.status === filter);

  const TABS = [
    { id: "grid",    label: "LIVE GRID",   icon: Radio },
    { id: "resibo",  label: "RESIBO",      icon: Swords },
    { id: "dynasty", label: "DYNASTY",     icon: Crown },
  ];

  return (
    <div style={{
      background: "#000",
      minHeight: "100vh",
      maxWidth: "480px",
      margin: "0 auto",
      fontFamily: "'Arial Black', 'Impact', 'Helvetica Neue', sans-serif",
      color: "#F3F4F6",
      paddingBottom: "140px",
    }}>

      {/* MASTHEAD */}
      <div style={{
        background: "#000",
        borderBottom: "3px solid #E1FF00",
        padding: "12px 12px 8px",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{
              color: "#E1FF00",
              fontSize: "24px",
              fontWeight: 900,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}>
              BARDAGULAN
            </div>
            <div style={{
              color: "#FF003C",
              fontSize: "9px",
              fontWeight: 900,
              letterSpacing: "0.2em",
              marginTop: "2px",
            }}>
              SENATE FANTASY LEAGUE · SEASON 2026
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{
              background: "#FF003C",
              color: "#fff",
              fontSize: "8px",
              fontWeight: 900,
              padding: "2px 6px",
              letterSpacing: "0.15em",
              marginBottom: "2px",
              display: "inline-block",
            }}>
              LIVE
            </div>
            <div style={{ color: "#6B7280", fontSize: "8px", display: "block" }}>WK 26 / SY 2026</div>
          </div>
        </div>
      </div>

      {/* NEWS TICKER */}
      <Ticker items={TICKER_ITEMS} />

      {/* TAB NAVIGATION */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        borderBottom: "2px solid #1a1a1a",
        position: "sticky",
        top: 0,
        background: "#000",
        zIndex: 50,
      }}>
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              background: tab === id ? "#E1FF00" : "#000",
              border: "none",
              borderBottom: tab === id ? "none" : "none",
              borderRight: "1px solid #1a1a1a",
              color: tab === id ? "#000" : "#6B7280",
              padding: "10px 4px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              transition: "all 0.15s",
            }}
          >
            <Icon size={13} />
            <span style={{
              fontSize: "8px",
              fontWeight: 900,
              letterSpacing: "0.1em",
            }}>{label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {tab === "grid" && (
        <div>
          {/* STATUS FILTER */}
          <div style={{
            display: "flex",
            gap: "4px",
            padding: "8px 10px",
            overflowX: "auto",
            borderBottom: "1px solid #1a1a1a",
            background: "#0a0a0a",
          }}>
            {statusFilters.map(f => {
              const cfg = f === "ALL" ? { color: "#9CA3AF" } : STATUS_CONFIG[f];
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    background: active ? (cfg?.color || "#9CA3AF") : "#000",
                    border: `1px solid ${cfg?.color || "#9CA3AF"}`,
                    color: active ? "#000" : (cfg?.color || "#9CA3AF"),
                    fontSize: "7px",
                    fontWeight: 900,
                    padding: "3px 7px",
                    cursor: "pointer",
                    flexShrink: 0,
                    letterSpacing: "0.1em",
                    transition: "all 0.15s",
                  }}
                >
                  {f === "EVADING ARREST" ? "NAGTATAKAS" : f === "DETAINED" ? "KULUNGAN" : f}
                </button>
              );
            })}
          </div>

          {/* ROSTER SUMMARY STRIP */}
          <div style={{
            background: "#0d1a00",
            borderBottom: "1px solid #E1FF00",
            padding: "5px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Users size={10} color="#E1FF00" />
              <span style={{ color: "#E1FF00", fontSize: "9px", fontWeight: 900, letterSpacing: "0.1em" }}>
                {roster.length}/5 NAPILI
              </span>
            </div>
            <span style={{ color: "#6B7280", fontSize: "8px" }}>
              I-tap para i-add/remove sa Core 5
            </span>
          </div>

          {/* SENATOR CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2px", padding: "8px", paddingBottom: "4px" }}>
            {filtered.map(s => (
              <SenatorCard
                key={s.id}
                senator={s}
                inRoster={!!roster.find(r => r.id === s.id)}
                onToggle={toggleRoster}
              />
            ))}
          </div>
        </div>
      )}

      {tab === "resibo" && <ResiboTab />}
      {tab === "dynasty" && <DynastyTab />}

      {/* CORE 5 FOOTER */}
      <CoreFiveFooter roster={roster} />
    </div>
  );
}
