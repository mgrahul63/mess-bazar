import { useState } from "react";

// ─── DESIGN TOKENS (matches app dark teal theme) ───────────────────────────────
const C = {
  bg: "#091a1a",
  surface: "#0f2323",
  border: "#1e3d3d",
  borderBright: "#2a5555",
  teal: "#2dd4bf",
  tealDim: "#1a9e8e",
  tealBg: "#0f2e2c",
  text: "#e2f0ef",
  textMid: "#9bbfbe",
  textLight: "#5d8f8e",
  green: "#34d399",
  red: "#f87171",
};

const font = "'Inter', system-ui, sans-serif";

// ─── SOCIAL LINKS DATA ─────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/mgrahul639/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/mgrahul63/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mgrahul639/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto: mgrahul639@gmail.com",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

// ─── QUICK LINKS ───────────────────────────────────────────────────────────────
const QUICK_LINKS = [
  { label: "Members", tab: "members" },
  { label: "Bazar List", tab: "bazar" },
  { label: "Meal Chart", tab: "meal" },
  { label: "Fixed Cost", tab: "fixed" },
  { label: "Settlement", tab: "settlement" },
];

// ─── FOOTER COMPONENT ──────────────────────────────────────────────────────────
export default function Footer({ onNavigate }) {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      {/* Top divider line */}
      <div style={styles.topDivider} />

      <div style={styles.container}>
        {/* ── ROW 1: Brand + Social + Quick Links ──────────────────────────── */}
        <div style={styles.topRow} >
          {/* Brand block */}
          <div style={styles.brandBlock}>
            <div style={styles.brandName}>🏠 Mess Bazar</div>
            <p style={styles.brandTagline}>
              A simple, reliable tool for tracking group meals, bazar expenses,
              and monthly settlements — built for mess members everywhere.
            </p>

            {/* Social icons */}
            <div style={styles.socialRow}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s?.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.name}
                  onMouseEnter={() => setHoveredSocial(s.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    ...styles.socialIcon,
                    background: hoveredSocial === s.name ? C.tealBg : C.surface,
                    color: hoveredSocial === s.name ? C.teal : C.textMid,
                    borderColor:
                      hoveredSocial === s.name ? C.tealDim : C.border,
                    transform:
                      hoveredSocial === s.name ? "translateY(-2px)" : "none",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div style={styles.linksBlock}>
            <p style={styles.colHeader}>Quick Navigation</p>
            <ul style={styles.linkList}>
              {QUICK_LINKS.map((l) => (
                <li key={l.tab}>
                  <button
                    onClick={() => onNavigate && onNavigate(l.tab)}
                    onMouseEnter={() => setHoveredLink(l.tab)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      ...styles.linkBtn,
                      color: hoveredLink === l.tab ? C.teal : C.textMid,
                      paddingLeft: hoveredLink === l.tab ? 10 : 0,
                    }}
                  >
                    {hoveredLink === l.tab ? "→ " : "· "}
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* How it works */}
          <div style={styles.infoBlock}>
            <p style={styles.colHeader}>How It Works</p>
            <ul style={styles.infoList}>
              {[
                ["1", "Add members & deposits"],
                ["2", "Log all bazar purchases"],
                ["3", "Enter daily meal counts"],
                ["4", "Add fixed monthly costs"],
                ["5", "View auto settlement"],
              ].map(([n, t]) => (
                <li key={n} style={styles.infoItem}>
                  <span style={styles.infoNum}>{n}</span>
                  <span style={{ color: C.textMid, fontSize: 13 }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Data & Privacy */}
          <div style={styles.infoBlock}>
            <p style={styles.colHeader}>Data & Storage</p>
            <ul style={styles.infoList}>
              {[
                ["💾", "Auto-saved to your browser"],
                ["🔒", "Your data never leaves device"],
                ["⬇️", "Export anytime as JSON backup"],
                ["⬆️", "Import to restore any month"],
                ["🔄", "Close month for fresh reset"],
              ].map(([icon, text]) => (
                <li key={text} style={styles.infoItem}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ color: C.textMid, fontSize: 13 }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── DIVIDER ─────────────────────────────────────────────────────── */}
        <div style={styles.midDivider} />

        {/* ── ROW 2: Formula strip ────────────────────────────────────────── */}
        <div style={styles.formulaStrip}>
          <span style={styles.formulaLabel}>Calculation Formula:</span>
          <div style={styles.formulaItems}>
            {[
              "Meal Rate = Bazar Total ÷ Total Meals",
              "Fixed / Person = Total Fixed ÷ Members",
              "Balance = Deposit − (Meal Cost + Fixed)",
            ].map((f, i) => (
              <span key={i} style={styles.formulaChip}>
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* ── DIVIDER ─────────────────────────────────────────────────────── */}
        <div style={styles.midDivider} />

        {/* ── ROW 3: Bottom bar ───────────────────────────────────────────── */}
        <div style={styles.bottomRow}>
          <span style={styles.copyright}>
            © {year} Mess & Bazar Manager. All rights reserved.
          </span>
          <span style={styles.copyright}>
            Develop By{" "}
            <a href="https://github.com/mgrahul63" target="_blank">
              MG Rahul
            </a>{" "}
          </span>
          <span style={styles.builtWith}>
            Built with <span style={{ color: C.red }}>♥</span> for mess
            communities
          </span>
          <span style={styles.version}>Version 1.0.0</span>
        </div>
      </div>
    </footer>
  );
}

// ─── STYLES ────────────────────────────────────────────────────────────────────
const styles = {
  footer: {
    background: C.bg,
    borderTop: `1px solid ${C.border}`,
    marginTop: "auto",
    fontFamily: font,
  },
  topDivider: {
    height: 3,
    background: `linear-gradient(90deg, transparent, ${C.teal}, ${C.tealDim}, transparent)`,
  },
  container: {
    maxWidth: 980,
    margin: "0 auto",
    padding: "40px 20px 24px",
  },

  // Row 1
  topRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: 32,
    flexWrap: "wrap",
    // responsive handled via inline media trick below
  },

  // Brand
  brandBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 700,
    color: C.teal,
    letterSpacing: 0.3,
  },
  brandTagline: {
    fontSize: 13,
    color: C.textLight,
    lineHeight: 1.7,
    margin: 0,
    maxWidth: 280,
  },
  socialRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 4,
  },
  socialIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 8,
    border: `1px solid ${C.border}`,
    textDecoration: "none",
    transition: "all 0.2s ease",
    cursor: "pointer",
  },

  // Links
  linksBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  colHeader: {
    fontSize: 11,
    fontWeight: 700,
    color: C.textLight,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    margin: "0 0 4px",
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  linkBtn: {
    background: "none",
    border: "none",
    fontFamily: font,
    fontSize: 13,
    cursor: "pointer",
    padding: 0,
    textAlign: "left",
    transition: "all 0.15s ease",
  },

  // Info blocks
  infoBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  infoList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  infoItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    lineHeight: 1.4,
  },
  infoNum: {
    minWidth: 20,
    height: 20,
    background: C.tealBg,
    border: `1px solid #1e5050`,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 700,
    color: C.teal,
    flexShrink: 0,
    marginTop: 1,
  },

  // Divider
  midDivider: {
    height: 1,
    background: C.border,
    margin: "28px 0",
  },

  // Formula strip
  formulaStrip: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    flexWrap: "wrap",
  },
  formulaLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: C.textLight,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    whiteSpace: "nowrap",
    paddingTop: 4,
  },
  formulaItems: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  formulaChip: {
    background: C.tealBg,
    border: `1px solid #1e5050`,
    borderRadius: 6,
    padding: "4px 12px",
    fontSize: 12,
    color: C.teal,
    fontWeight: 500,
    whiteSpace: "nowrap",
  },

  // Bottom row
  bottomRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
  },
  copyright: {
    fontSize: 12,
    color: C.textLight,
  },
  builtWith: {
    fontSize: 12,
    color: C.textLight,
  },
  version: {
    fontSize: 11,
    color: C.textLight,
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 20,
    padding: "2px 10px",
  },
};
