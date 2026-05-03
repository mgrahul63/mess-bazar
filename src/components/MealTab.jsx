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
        <div className="card text-center text-gray-500 text-sm py-10">
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
        sub="Enter number of meals per person per day. Use 0, 1, 2, 0.5 etc."
      />

      <InfoBox color="teal">
        Grand Total Meals:{" "}
        <strong className="text-base">{grandTotal.toFixed(1)}</strong>
        &nbsp;|&nbsp; Meal Rate = Bazar Total ÷ Grand Total Meals
      </InfoBox>

      {/* ── MOBILE: member cards with day inputs ────────────────────────────── */}
      <div className="sm:hidden flex flex-col gap-4">
        {data.members.map((m) => (
          <div key={m.id} className="card">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <strong className="text-gray-100">{m.name}</strong>
                {m.isManager && (
                  <span className="text-[10px] bg-teal-bg text-teal-primary border border-teal-border px-2 py-0.5 rounded-full font-bold">
                    MGR
                  </span>
                )}
              </div>
              <span className="text-teal-primary font-bold text-base">
                {getMemberTotal(m.id).toFixed(1)} meals
              </span>
            </div>
            {/* Days grid — 6 per row on mobile */}
            <div className="grid grid-cols-6 gap-1.5">
              {Array.from({ length: days }, (_, i) => (
                <div key={i + 1} className="flex flex-col items-center gap-0.5">
                  <span className="text-[9px] text-gray-600 font-medium">
                    {i + 1}
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={(data.mealChart[m.id] || {})[i + 1] ?? ""}
                    onChange={(e) => setMeal(m.id, i + 1, e.target.value)}
                    className="w-full text-center text-xs bg-dark-raised border border-dark-border rounded focus:outline-none focus:border-teal-primary text-gray-100 py-1 px-0"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Grand total card */}
        <div className="card flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-400">
            Grand Total Meals
          </span>
          <span className="text-teal-primary font-bold text-xl">
            {grandTotal.toFixed(1)}
          </span>
        </div>
      </div>

      {/* ── DESKTOP: scrollable table ────────────────────────────────────────── */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-dark-border">
        <table className="border-collapse text-xs w-full min-w-max">
          <thead>
            <tr className="bg-dark-header">
              <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide border-b border-dark-border border-r sticky left-0 bg-dark-header z-10 min-w-[110px]">
                Member
              </th>
              {Array.from({ length: days }, (_, i) => (
                <th
                  key={i + 1}
                  className="px-1 py-2 text-center text-[10px] font-bold text-gray-500 border-b border-dark-border min-w-[38px]"
                >
                  {i + 1}
                </th>
              ))}
              <th className="px-3 py-2 text-center text-[10px] font-bold text-teal-primary border-b border-dark-border bg-teal-bg min-w-[50px]">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {data.members.map((m, ri) => (
              <tr
                key={m.id}
                className={ri % 2 === 0 ? "bg-dark-surface" : "bg-dark-alt"}
              >
                <td
                  className={`px-3 py-1.5 border-b border-dark-border border-r sticky left-0 z-10 ${ri % 2 === 0 ? "bg-dark-surface" : "bg-dark-alt"}`}
                >
                  <span className="font-semibold text-gray-100">{m.name}</span>
                  {m.isManager && (
                    <span className="ml-1 text-[9px] bg-teal-bg text-teal-primary border border-teal-border px-1.5 rounded-full font-bold">
                      MGR
                    </span>
                  )}
                </td>
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
                <td className="px-3 py-1.5 text-center font-bold text-teal-primary bg-teal-bg border-b border-dark-border">
                  {getMemberTotal(m.id).toFixed(1)}
                </td>
              </tr>
            ))}
            {/* Day totals row */}
            <tr className="bg-dark-header">
              <td className="px-3 py-2 text-[10px] font-bold text-gray-500 uppercase border-t-2 border-dark-border sticky left-0 bg-dark-header z-10">
                Day Total
              </td>
              {Array.from({ length: days }, (_, i) => (
                <td
                  key={i + 1}
                  className="px-1 py-2 text-center text-xs text-green-400 font-semibold border-t-2 border-dark-border"
                >
                  {getDayTotal(i + 1) > 0 ? getDayTotal(i + 1).toFixed(1) : ""}
                </td>
              ))}
              <td className="px-3 py-2 text-center font-bold text-teal-primary bg-teal-bg border-t-2 border-dark-border">
                {grandTotal.toFixed(1)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
