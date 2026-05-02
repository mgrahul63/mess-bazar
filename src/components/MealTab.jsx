import { C, font, InfoBox, SectionTitle } from "./UI";

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

  return (
    <div>
      <SectionTitle
        icon="🍽️"
        title="Table 3 — Meal Chart"
        sub="Enter number of meals per person per day. Use 0, 1, 2, 0.5 etc."
      />
      <InfoBox color="teal">
        Grand Total Meals:{" "}
        <strong style={{ fontSize: 15 }}>{grandTotal.toFixed(1)}</strong>
        &nbsp;&nbsp;|&nbsp;&nbsp;Meal Rate = Bazar Total ÷ Grand Total Meals
      </InfoBox>
      {data.members.length === 0 ? (
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: 40,
            textAlign: "center",
            color: C.textLight,
            fontSize: 14,
          }}
        >
          Please add members first in the Members tab.
        </div>
      ) : (
        <div
          style={{
            overflowX: "auto",
            borderRadius: 10,
            border: `1px solid ${C.border}`,
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              fontSize: 13,
              fontFamily: font,
              width: "100%",
            }}
          >
            <thead>
              <tr style={{ background: C.header }}>
                <th style={stickyTh}>Member Name</th>
                {Array.from({ length: days }, (_, i) => (
                  <th key={i + 1} style={dayTh}>
                    {i + 1}
                  </th>
                ))}
                <th style={{ ...dayTh, color: C.teal, background: C.tealBg }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {data.members.map((m, ri) => (
                <tr
                  key={m.id}
                  style={{
                    background: ri % 2 === 0 ? C.surface : C.surfaceAlt,
                  }}
                >
                  <td
                    style={{
                      ...stickyTd,
                      background: ri % 2 === 0 ? C.surface : C.surfaceAlt,
                    }}
                  >
                    <span style={{ fontWeight: 600, color: C.text }}>
                      {m.name}
                    </span>
                    {m.isManager && (
                      <span
                        style={{
                          marginLeft: 6,
                          fontSize: 10,
                          background: C.tealBg,
                          color: C.teal,
                          padding: "1px 6px",
                          borderRadius: 10,
                          fontWeight: 700,
                          border: `1px solid #1e5050`,
                        }}
                      >
                        MGR
                      </span>
                    )}
                  </td>
                  {Array.from({ length: days }, (_, i) => (
                    <td
                      key={i + 1}
                      style={{
                        padding: "3px 2px",
                        textAlign: "center",
                        borderBottom: `1px solid ${C.border}`,
                      }}
                    >
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={(data.mealChart[m.id] || {})[i + 1] ?? ""}
                        onChange={(e) => setMeal(m.id, i + 1, e.target.value)}
                        style={mealInput}
                      />
                    </td>
                  ))}
                  <td
                    style={{
                      padding: "6px 12px",
                      textAlign: "center",
                      fontWeight: 700,
                      color: C.teal,
                      background: C.tealBg,
                      borderBottom: `1px solid ${C.border}`,
                    }}
                  >
                    {getMemberTotal(m.id).toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: C.header }}>
                <td
                  style={{
                    ...stickyTd,
                    background: C.header,
                    color: C.textLight,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Day Total
                </td>
                {Array.from({ length: days }, (_, i) => (
                  <td
                    key={i + 1}
                    style={{
                      padding: "8px 2px",
                      textAlign: "center",
                      color: C.green,
                      fontSize: 12,
                      fontWeight: 600,
                      borderTop: `2px solid ${C.border}`,
                    }}
                  >
                    {getDayTotal(i + 1) > 0
                      ? getDayTotal(i + 1).toFixed(1)
                      : ""}
                  </td>
                ))}
                <td
                  style={{
                    padding: "8px 12px",
                    textAlign: "center",
                    fontWeight: 700,
                    color: C.teal,
                    background: C.tealBg,
                    borderTop: `2px solid ${C.border}`,
                  }}
                >
                  {grandTotal.toFixed(1)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}

const stickyTh = {
  padding: "11px 14px",
  textAlign: "left",
  position: "sticky",
  left: 0,
  zIndex: 2,
  background: C.header,
  borderBottom: `1px solid ${C.border}`,
  borderRight: `1px solid ${C.border}`,
  color: C.textLight,
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  minWidth: 120,
};
const stickyTd = {
  padding: "8px 14px",
  position: "sticky",
  left: 0,
  zIndex: 1,
  borderBottom: `1px solid ${C.border}`,
  borderRight: `1px solid ${C.border}`,
  whiteSpace: "nowrap",
  minWidth: 120,
};
const dayTh = {
  padding: "11px 4px",
  textAlign: "center",
  fontSize: 11,
  fontWeight: 700,
  color: C.textLight,
  borderBottom: `1px solid ${C.border}`,
  minWidth: 42,
};
const mealInput = {
  width: 38,
  padding: "4px 2px",
  textAlign: "center",
  border: `1px solid ${C.border}`,
  borderRadius: 5,
  fontSize: 12,
  color: C.text,
  background: C.raised,
  fontFamily: font,
  outline: "none",
};
