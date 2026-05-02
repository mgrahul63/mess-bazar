// ─── DARK TEAL DESIGN TOKENS ───────────────────────────────────────────────────
export const C = {
  bg:           "#0d1f1f",
  surface:      "#112828",
  surfaceAlt:   "#0f2323",
  raised:       "#163232",
  header:       "#091a1a",
  border:       "#1e3d3d",
  borderBright: "#2a5555",
  text:         "#e2f0ef",
  textMid:      "#9bbfbe",
  textLight:    "#5d8f8e",
  teal:         "#2dd4bf",
  tealDim:      "#1a9e8e",
  tealBg:       "#0f2e2c",
  green:        "#34d399",
  greenBg:      "#0a2e22",
  greenBorder:  "#14533a",
  red:          "#f87171",
  redBg:        "#2e0f0f",
  redBorder:    "#5a1a1a",
  amber:        "#fbbf24",
  amberBg:      "#2e220a",
  amberBorder:  "#5a3d0a",
  blue:         "#60a5fa",
  blueBg:       "#0a1a2e",
  blueBorder:   "#1a3a5a",
};

export const font = "'Inter', system-ui, sans-serif";

export function PageCard({ children, style }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 18, ...style }}>
      {children}
    </div>
  );
}

export function SectionTitle({ icon, title, sub }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.text, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 20 }}>{icon}</span><span>{title}</span>
      </h2>
      {sub && <p style={{ margin: "5px 0 0 28px", fontSize: 13, color: C.textLight, lineHeight: 1.5 }}>{sub}</p>}
    </div>
  );
}

export function Label({ children, required }) {
  return (
    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textMid, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
      {children}{required && <span style={{ color: C.red, marginLeft: 3 }}>*</span>}
    </label>
  );
}

const fieldBase = {
  width: "100%", boxSizing: "border-box",
  background: C.raised, border: `1px solid ${C.border}`,
  borderRadius: 8, padding: "9px 12px",
  fontSize: 14, color: C.text, fontFamily: font,
};

export function Input(props) {
  return <input {...props} style={fieldBase} />;
}

export function Select({ children, ...props }) {
  return <select {...props} style={{ ...fieldBase, appearance: "none", cursor: "pointer" }}>{children}</select>;
}

const btnColors = {
  teal:  { bg: "#0e9f8f", hover: "#0d8a7c", text: "#fff",    border: "transparent" },
  green: { bg: "#059669", hover: "#047857", text: "#fff",    border: "transparent" },
  red:   { bg: "#dc2626", hover: "#b91c1c", text: "#fff",    border: "transparent" },
  ghost: { bg: "transparent",               text: C.textMid, border: C.border      },
  amber: { bg: "#d97706", hover: "#b45309", text: "#fff",    border: "transparent" },
  dark:  { bg: C.raised,                    text: C.text,    border: C.border      },
};

export function Btn({ children, onClick, color = "teal", size = "md", fullWidth, style, type }) {
  const c  = btnColors[color] || btnColors.teal;
  const sz = size === "sm" ? { padding: "5px 12px", fontSize: 12 } : { padding: "9px 18px", fontSize: 14 };
  return (
    <button type={type || "button"} onClick={onClick} style={{ background: c.bg, color: c.text, border: `1px solid ${c.border || c.bg}`, borderRadius: 8, fontWeight: 600, fontFamily: font, cursor: "pointer", transition: "opacity 0.15s", width: fullWidth ? "100%" : "auto", ...sz, ...style }}
      onMouseEnter={e => { if (c.hover) e.currentTarget.style.background = c.hover; }}
      onMouseLeave={e => { e.currentTarget.style.background = c.bg; }}>
      {children}
    </button>
  );
}

export function Table({ children }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: 10, border: `1px solid ${C.border}` }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, fontFamily: font }}>{children}</table>
    </div>
  );
}

export function Th({ children, style }) {
  return (
    <th style={{ padding: "11px 14px", textAlign: "left", background: C.header, color: C.textLight, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", ...style }}>
      {children}
    </th>
  );
}

export function Td({ children, colSpan, style }) {
  return (
    <td colSpan={colSpan} style={{ padding: "10px 14px", color: C.text, borderBottom: `1px solid ${C.border}`, ...style }}>
      {children}
    </td>
  );
}

export function TFoot({ children }) {
  return <tfoot style={{ background: C.header }}>{children}</tfoot>;
}

export function Badge({ label, color = "teal" }) {
  const map = {
    teal:  { bg: C.tealBg,  text: C.teal,  border: "#1e5050"      },
    green: { bg: C.greenBg, text: C.green,  border: C.greenBorder  },
    red:   { bg: C.redBg,   text: C.red,    border: C.redBorder    },
    amber: { bg: C.amberBg, text: C.amber,  border: C.amberBorder  },
    blue:  { bg: C.blueBg,  text: C.blue,   border: C.blueBorder   },
    gray:  { bg: C.raised,  text: C.textMid,border: C.border       },
  };
  const c = map[color] || map.teal;
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

export function StatBox({ label, value, color }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", minWidth: 110 }}>
      <div style={{ fontSize: 11, color: C.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: color || C.teal, marginTop: 3 }}>{value}</div>
    </div>
  );
}

export function InfoBox({ children, color = "teal" }) {
  const map = {
    teal:  { bg: C.tealBg,  border: "#1e5050",      text: C.teal  },
    amber: { bg: C.amberBg, border: C.amberBorder,  text: C.amber },
    red:   { bg: C.redBg,   border: C.redBorder,    text: C.red   },
    green: { bg: C.greenBg, border: C.greenBorder,  text: C.green },
  };
  const c = map[color] || map.teal;
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "11px 15px", fontSize: 13, color: c.text, marginBottom: 16, lineHeight: 1.6 }}>
      {children}
    </div>
  );
}

export function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: toast.type === "error" ? "#7f1d1d" : "#064e3b", border: `1px solid ${toast.type === "error" ? C.redBorder : C.greenBorder}`, color: toast.type === "error" ? C.red : C.green, padding: "11px 24px", borderRadius: 10, fontSize: 14, fontWeight: 500, fontFamily: font, boxShadow: "0 8px 24px rgba(0,0,0,0.4)", zIndex: 9999, whiteSpace: "nowrap" }}>
      {toast.type === "error" ? "⚠️ " : "✓ "}{toast.msg}
    </div>
  );
}

export function ConfirmModal({ open, title, message, onConfirm, onCancel, danger }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000 }}>
      <div style={{ background: C.surface, border: `1px solid ${danger ? C.redBorder : C.border}`, borderRadius: 14, padding: 28, width: 400, maxWidth: "92vw", boxShadow: "0 20px 60px rgba(0,0,0,0.6)", fontFamily: font }}>
        <h3 style={{ margin: "0 0 10px", fontSize: 17, fontWeight: 700, color: danger ? C.red : C.teal }}>{title}</h3>
        <p style={{ margin: "0 0 24px", fontSize: 14, color: C.textMid, lineHeight: 1.7 }}>{message}</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Btn color="ghost" onClick={onCancel}>Cancel</Btn>
          <Btn color={danger ? "red" : "teal"} onClick={onConfirm}>Confirm & Reset</Btn>
        </div>
      </div>
    </div>
  );
}
