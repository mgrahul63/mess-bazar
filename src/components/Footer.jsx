const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://web.facebook.com/mgrahul639/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },

  {
    name: "X / Twitter",
    href: "https://twitter.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },

  {
    name: "GitHub",
    href: "https://github.com/mgrahul63/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },

  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mgrahul639/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },

  {
    name: "WhatsApp",
    href: "https://wa.me/+8801733703448",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },

  {
    name: "Email",
    href: "mailto:mgrahul639@gmail.com",
    icon: (
      <svg
        width="16"
        height="16"
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

const QUICK_LINKS = [
  { label: "Members", tab: "members" },
  { label: "Bazar List", tab: "bazar" },
  { label: "Meal Chart", tab: "meal" },
  { label: "Fixed Cost", tab: "fixed" },
  { label: "Settlement", tab: "settlement" },
];

export default function Footer({ onNavigate }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-header border-t border-dark-border mt-auto font-sans">
      {/* Teal accent line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-teal-primary to-transparent" />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* ── ROW 1: 4 columns on desktop, stacked on mobile ──────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand + Social */}
          <div className="flex flex-col gap-3">
            <div className="text-lg font-bold text-teal-primary">
              🏠 Mess Bazar
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              A simple, reliable tool for tracking group meals, bazar expenses,
              and monthly settlements — built for mess members everywhere.
            </p>
            <div className="flex gap-2 flex-wrap mt-1">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.name}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-dark-border bg-dark-surface text-gray-400 hover:text-teal-primary hover:border-teal-border hover:bg-teal-bg transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
              Quick Navigation
            </p>
            <ul className="flex flex-col gap-1.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.tab}>
                  <button
                    onClick={() => onNavigate && onNavigate(l.tab)}
                    className="text-sm text-gray-400 hover:text-teal-primary transition-colors text-left"
                  >
                    · {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* How It Works */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
              How It Works
            </p>
            <ul className="flex flex-col gap-2">
              {[
                ["1", "Add members & deposits"],
                ["2", "Log all bazar purchases"],
                ["3", "Enter daily meal counts"],
                ["4", "Add fixed monthly costs"],
                ["5", "View auto settlement"],
              ].map(([n, t]) => (
                <li key={n} className="flex items-start gap-2">
                  <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full bg-teal-bg border border-teal-border text-teal-primary text-[10px] font-bold mt-0.5">
                    {n}
                  </span>
                  <span className="text-xs text-gray-400">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Data & Storage */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
              Data & Storage
            </p>
            <ul className="flex flex-col gap-2">
              {[
                ["💾", "Auto-saved to your browser"],
                ["🔒", "Data never leaves your device"],
                ["⬇️", "Export JSON backup anytime"],
                ["⬆️", "Import to restore any month"],
                ["🔄", "Close month for fresh reset"],
              ].map(([icon, text]) => (
                <li key={text} className="flex items-start gap-2">
                  <span className="text-sm flex-shrink-0">{icon}</span>
                  <span className="text-xs text-gray-400">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── DIVIDER ─────────────────────────────────────────────────────── */}
        <div className="border-t border-dark-border my-6" />

        {/* ── ROW 2: Formula strip ─────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 flex-wrap">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap pt-1">
            Formulas:
          </span>
          <div className="flex gap-2 flex-wrap">
            {[
              "Meal Rate = Bazar Total ÷ Total Meals",
              "Fixed / Person = Total Fixed ÷ Members",
              "Balance = Deposit − (Meal Cost + Fixed)",
            ].map((f, i) => (
              <span
                key={i}
                className="bg-teal-bg border border-teal-border text-teal-primary text-xs font-medium px-3 py-1 rounded-md"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* ── DIVIDER ─────────────────────────────────────────────────────── */}
        <div className="border-t border-dark-border my-6" />

        {/* ── ROW 3: Bottom bar ────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="text-xs text-gray-500">
            © {year} Mess Bazar. All rights reserved.
          </span>
          <span className="text-xs text-gray-500">
            Develop by{" "}
            <a
              href="https://github.com/mgrahul63/"
              target="_blank"
              className="text-green-500"
            >
              MG Rahul
            </a>
          </span>
          <span className="text-xs text-gray-500">
            Built with <span className="text-red-400">♥</span> for mess
            communities
          </span>
          <span className="text-[10px] text-gray-500 border border-dark-border bg-dark-surface rounded-full px-3 py-1 w-fit">
            Version 1.0.0
          </span>
        </div>
      </div>
    </footer>
  );
}
