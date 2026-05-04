import { InfoBox, SectionTitle } from "./UI";

export default function MealTab({ data, update }) {
  const days = data.daysInMonth || 30;

  const setMeal = (memberId, day, val) => {
    update((d) => {
      if (!d.mealChart[memberId]) d.mealChart[memberId] = {};
      d.mealChart[memberId][day] = val === "" ? "" : Number(val);
      return d;
    });
  };

  const getMemberTotal = (id) =>
    Object.values(data.mealChart[id] || {}).reduce(
      (s, v) => s + Number(v || 0),
      0,
    );

  const getDayTotal = (day) =>
    data.members.reduce(
      (s, m) => s + Number((data.mealChart[m.id] || {})[day] || 0),
      0,
    );

  const grandTotal = data.members.reduce((s, m) => s + getMemberTotal(m.id), 0);

  if (data.members.length === 0) {
    return (
      <div>
        <SectionTitle
          icon="🍽️"
          title="Table 3 — Meal Chart"
          sub="Enter number of meals per person per day."
        />
        <div className="bg-dark-surface border border-dark-border rounded-xl text-center text-gray-500 text-sm py-10">
          Please add members first in the Members tab.
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionTitle
        icon="🍽️"
        title="Table 3 — Meal Chart"
        sub="Enter meals per person per day. Scroll left & right to see all days."
      />

      <InfoBox color="teal">
        Grand Total: <strong>{grandTotal.toFixed(1)} meals</strong>
        &nbsp;|&nbsp; Meal Rate = Bazar Total ÷ Grand Total Meals
      </InfoBox>

      {/* Swipe hint on mobile */}
      <p className="sm:hidden text-[10px] text-gray-500 text-center mb-2 italic">
        ← Swipe left / right to see all days →
      </p>

      {/* Scrollable wrapper — intentional x-scroll for meal chart */}
      <div className="w-full overflow-x-auto rounded-xl border border-dark-border">
        <table className="border-collapse" style={{ minWidth: "max-content" }}>
          {/* ── HEADER ROW ─────────────────────────────────────────────────── */}
          <thead>
            <tr className="bg-dark-header">
              {/* Sticky member name column */}
              <th className="sticky left-0 z-20 bg-dark-header px-3 py-2.5 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide border-b border-r border-dark-border whitespace-nowrap min-w-[110px]">
                Member
              </th>
              {/* Day number headers */}
              {Array.from({ length: days }, (_, i) => (
                <th
                  key={i + 1}
                  className="px-1 py-2.5 text-center text-[10px] font-bold text-gray-500 border-b border-dark-border min-w-[38px] whitespace-nowrap"
                >
                  {i + 1}
                </th>
              ))}
              {/* Total column */}
              <th className="sticky right-0 z-20 bg-teal-bg px-3 py-2.5 text-center text-[10px] font-bold text-teal-primary border-b border-l border-dark-border whitespace-nowrap min-w-[52px]">
                Total
              </th>
            </tr>
          </thead>

          {/* ── BODY ROWS ──────────────────────────────────────────────────── */}
          <tbody>
            {data.members.map((m, ri) => {
              const rowBg = ri % 2 === 0 ? "bg-dark-surface" : "bg-dark-alt";
              return (
                <tr key={m.id} className={rowBg}>
                  {/* Sticky member name */}
                  <td
                    className={`sticky left-0 z-10 ${rowBg} px-3 py-2 border-b border-r border-dark-border whitespace-nowrap`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm text-gray-100">
                        {m.name}
                      </span>
                      {m.isManager && (
                        <span className="text-[9px] bg-teal-bg text-teal-primary border border-teal-border px-1.5 py-0.5 rounded-full font-bold leading-none">
                          MGR
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Meal input per day */}
                  {Array.from({ length: days }, (_, i) => (
                    <td
                      key={i + 1}
                      className="px-0.5 py-1 text-center border-b border-dark-border"
                    >
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={(data.mealChart[m.id] || {})[i + 1] ?? ""}
                        onChange={(e) => setMeal(m.id, i + 1, e.target.value)}
                        className="w-9 text-center text-xs bg-dark-raised border border-dark-border rounded focus:outline-none focus:border-teal-primary text-gray-100 py-1"
                      />
                    </td>
                  ))}

                  {/* Sticky total column */}
                  <td className="sticky right-0 z-10 bg-teal-bg px-3 py-2 text-center font-bold text-teal-primary border-b border-l border-dark-border whitespace-nowrap">
                    {getMemberTotal(m.id).toFixed(1)}
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* ── FOOTER — Day totals ─────────────────────────────────────────── */}
          <tfoot>
            <tr className="bg-dark-header">
              {/* Sticky label */}
              <td className="sticky left-0 z-20 bg-dark-header px-3 py-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wide border-t-2 border-r border-dark-border whitespace-nowrap">
                Day Total
              </td>
              {/* Day totals */}
              {Array.from({ length: days }, (_, i) => (
                <td
                  key={i + 1}
                  className="px-1 py-2.5 text-center text-xs text-green-400 font-semibold border-t-2 border-dark-border whitespace-nowrap"
                >
                  {getDayTotal(i + 1) > 0 ? getDayTotal(i + 1).toFixed(1) : "—"}
                </td>
              ))}
              {/* Sticky grand total */}
              <td className="sticky right-0 z-20 bg-teal-bg px-3 py-2.5 text-center font-bold text-teal-primary border-t-2 border-l border-dark-border whitespace-nowrap">
                {grandTotal.toFixed(1)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Per member summary below table */}
      <div className="mt-3 bg-dark-surface border border-dark-border rounded-xl overflow-hidden">
        <div className="px-3 py-2 bg-dark-header border-b border-dark-border">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
            Member Meal Summary
          </p>
        </div>
        <div className="divide-y divide-dark-border">
          {data.members.map((m) => (
            <div
              key={m.id}
              className="flex justify-between items-center px-3 py-2.5"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-100">
                  {m.name}
                </span>
                {m.isManager && (
                  <span className="text-[9px] bg-teal-bg text-teal-primary border border-teal-border px-1.5 py-0.5 rounded-full font-bold">
                    MGR
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">
                  {getMemberTotal(m.id).toFixed(1)} meals
                </span>
                <span className="text-teal-primary font-bold text-sm">
                  {grandTotal > 0
                    ? ((getMemberTotal(m.id) / grandTotal) * 100).toFixed(1)
                    : "0.0"}
                  %
                </span>
              </div>
            </div>
          ))}
          {/* Grand total row */}
          <div className="flex justify-between items-center px-3 py-2.5 bg-teal-bg">
            <span className="text-sm font-bold text-teal-primary">
              Grand Total
            </span>
            <span className="text-teal-primary font-bold text-base">
              {grandTotal.toFixed(1)} meals
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
