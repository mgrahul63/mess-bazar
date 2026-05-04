// ─── SHARED UI COMPONENTS (Tailwind CSS only) ─────────────────────────────────

export function SectionTitle({ icon, title, sub }) {
  return (
    <div className="mb-4">
      <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-gray-100">
        <span>{icon}</span>
        <span>{title}</span>
      </h2>
      {sub && <p className="text-xs text-gray-500 mt-1 ml-7">{sub}</p>}
    </div>
  );
}

export function PageCard({ children, className = "" }) {
  return (
    <div
      className={`bg-dark-surface border border-dark-border rounded-xl p-4 mb-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function Label({ children, required }) {
  return (
    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  );
}

export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full bg-dark-raised border border-dark-border rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-teal-primary transition-colors ${className}`}
    />
  );
}

export function Select({ children, className = "", ...props }) {
  return (
    <select
      {...props}
      className={`w-full bg-dark-raised border border-dark-border rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-teal-primary transition-colors ${className}`}
    >
      {children}
    </select>
  );
}

export function InfoBox({ children, color = "teal" }) {
  const map = {
    teal: "bg-teal-bg border-teal-border text-teal-primary",
    amber: "bg-yellow-900/20 border-yellow-700/30 text-yellow-400",
    red: "bg-red-900/20 border-red-700/30 text-red-400",
    green: "bg-green-900/20 border-green-700/30 text-green-400",
  };
  return (
    <div
      className={`border rounded-lg p-3 text-xs leading-relaxed mb-4 ${map[color] || map.teal}`}
    >
      {children}
    </div>
  );
}

export function Badge({ label, color = "teal" }) {
  const map = {
    teal: "bg-teal-bg text-teal-primary border-teal-border",
    green: "bg-green-900/30 text-green-400 border-green-700/30",
    red: "bg-red-900/30 text-red-400 border-red-700/30",
    amber: "bg-yellow-900/30 text-yellow-400 border-yellow-700/30",
    gray: "bg-dark-raised text-gray-400 border-dark-border",
  };
  return (
    <span
      className={`border text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${map[color] || map.teal}`}
    >
      {label}
    </span>
  );
}

export function StatBox({ label, value, color = "text-teal-primary" }) {
  return (
    <div className="bg-dark-surface border border-dark-border rounded-xl p-3 min-w-[88px] flex-shrink-0">
      <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">
        {label}
      </div>
      <div className={`text-base font-bold mt-1 ${color}`}>{value}</div>
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
        className={`bg-dark-surface rounded-2xl p-6 w-full max-w-sm border shadow-2xl
        ${danger ? "border-red-700" : "border-dark-border"}`}
      >
        <h3
          className={`text-base font-bold mb-2 ${danger ? "text-red-400" : "text-teal-primary"}`}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="border border-dark-border text-gray-400 text-sm font-semibold px-4 py-2 rounded-lg hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors
              ${danger ? "bg-red-700 hover:bg-red-600" : "bg-teal-dim hover:bg-teal-primary"}`}
          >
            Confirm & Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TABLE COMPONENTS ─────────────────────────────────────────────────────────
// hiddenOnMobile={true} hides that column on small screens using Tailwind

export function Table({ children }) {
  return (
    <div className="w-full rounded-xl border border-dark-border overflow-hidden">
      <table className="w-full border-collapse text-sm table-fixed">
        {children}
      </table>
    </div>
  );
}

export function Th({ children, hiddenOnMobile = false, className = "" }) {
  return (
    <th
      className={`px-2 sm:px-3 py-2 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide bg-dark-header border-b border-dark-border
      ${hiddenOnMobile ? "hidden sm:table-cell" : ""} ${className}`}
    >
      {children}
    </th>
  );
}

export function Td({ children, hiddenOnMobile = false, className = "" }) {
  return (
    <td
      className={`px-2 sm:px-3 py-2.5 border-b border-dark-border text-gray-200 text-xs sm:text-sm
      ${hiddenOnMobile ? "hidden sm:table-cell" : ""} ${className}`}
    >
      {children}
    </td>
  );
}

export function TFoot({ children }) {
  return <tfoot className="bg-dark-header">{children}</tfoot>;
}
