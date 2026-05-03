// ─── SHARED UI COMPONENTS (Tailwind CSS) ──────────────────────────────────────

export function SectionTitle({ icon, title, sub }) {
  return (
    <div className="mb-4">
      <h2 className="section-title flex items-center gap-2">
        <span>{icon}</span>
        <span>{title}</span>
      </h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  );
}

export function PageCard({ children, className = "" }) {
  return <div className={`card mb-4 ${className}`}>{children}</div>;
}

export function Label({ children, required }) {
  return (
    <label className="col-label">
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  );
}

export function Input({ className = "", ...props }) {
  return <input {...props} className={`field ${className}`} />;
}

export function Select({ children, className = "", ...props }) {
  return (
    <select {...props} className={`field ${className}`}>
      {children}
    </select>
  );
}

export function InfoBox({ children, color = "teal" }) {
  const map = {
    teal: "bg-teal-bg border border-teal-border text-teal-primary",
    amber: "bg-yellow-900/30 border border-yellow-700/40 text-yellow-400",
    red: "bg-red-900/30 border border-red-700/40 text-red-400",
    green: "bg-green-900/30 border border-green-700/40 text-green-400",
  };
  return (
    <div
      className={`${map[color] || map.teal} rounded-lg p-3 text-xs leading-relaxed mb-4`}
    >
      {children}
    </div>
  );
}

export function Badge({ label, color = "teal" }) {
  const map = {
    teal: "bg-teal-bg text-teal-primary border border-teal-border",
    green: "bg-green-900/40 text-green-400 border border-green-700/40",
    red: "bg-red-900/40 text-red-400 border border-red-700/40",
    amber: "bg-yellow-900/40 text-yellow-400 border border-yellow-700/40",
    gray: "bg-dark-raised text-gray-400 border border-dark-border",
  };
  return (
    <span
      className={`${map[color] || map.teal} text-xs font-semibold px-2 py-0.5 rounded-full`}
    >
      {label}
    </span>
  );
}

export function StatBox({ label, value, color = "text-teal-primary" }) {
  return (
    <div className="bg-dark-surface border border-dark-border rounded-xl p-3 min-w-[90px]">
      <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">
        {label}
      </div>
      <div className={`text-lg font-bold mt-1 ${color}`}>{value}</div>
    </div>
  );
}

export function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-2xl whitespace-nowrap border
      ${
        toast.type === "error"
          ? "bg-red-950 border-red-700 text-red-400"
          : "bg-green-950 border-green-700 text-green-400"
      }`}
    >
      {toast.type === "error" ? "⚠️ " : "✓ "}
      {toast.msg}
    </div>
  );
}

export function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  danger,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-dark-surface rounded-2xl p-6 w-full max-w-sm border ${danger ? "border-red-700" : "border-dark-border"} shadow-2xl`}
      >
        <h3
          className={`text-base font-bold mb-2 ${danger ? "text-red-400" : "text-teal-primary"}`}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="btn-ghost">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={danger ? "btn-red" : "btn-teal"}
          >
            Confirm & Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── RESPONSIVE TABLE ─────────────────────────────────────────────────────────
// On mobile: renders as cards. On desktop: renders as table.
export function ResponsiveTable({ headers, rows, emptyMsg = "No data yet." }) {
  if (rows.length === 0) {
    return (
      <div className="card text-center text-gray-500 text-sm py-10">
        {emptyMsg}
      </div>
    );
  }

  return (
    <>
      {/* Desktop table — hidden on mobile */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-dark-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide bg-dark-header border-b border-dark-border whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={ri % 2 === 0 ? "bg-dark-surface" : "bg-dark-alt"}
              >
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className="px-4 py-3 border-b border-dark-border text-gray-200"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards — shown only on mobile */}
      <div className="sm:hidden flex flex-col gap-3">
        {rows.map((row, ri) => (
          <div key={ri} className={`card ${row.highlight || ""}`}>
            {row.mobileContent}
          </div>
        ))}
      </div>
    </>
  );
}
