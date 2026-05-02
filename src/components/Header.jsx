import { C, font, StatBox } from "./UI";

export default function Header({
  mealRate,
  totalBazarAmount,
  totalMeals,
  fixedPerPerson,
  activeMembers,
  monthLabel,
  onExport,
  onImport,
  onCloseMonth,
}) {
  return (
    <div
      style={{
        background: C.header,
        borderBottom: `1px solid ${C.border}`,
        padding: "16px 24px",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        {/* Title row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                color: C.teal,
                fontFamily: font,
                letterSpacing: 0.3,
              }}
            >
              🏠 Mess Bazar
            </h1>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 13,
                color: C.textLight,
                fontFamily: font,
              }}
            >
              Month: <strong style={{ color: C.textMid }}>{monthLabel}</strong>
            </p>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={onExport} style={hBtn(C.tealDim)}>
              ⬇ Export
            </button>
            <label style={{ ...hBtn("#1e4040"), cursor: "pointer" }}>
              ⬆ Import
              <input
                type="file"
                accept=".json"
                onChange={onImport}
                style={{ display: "none" }}
              />
            </label>
            <button onClick={onCloseMonth} style={hBtn("#7f1d1d", "#ef4444")}>
              🔒 Close Month & Reset
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div
          style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}
        >
          <StatBox label="Members" value={activeMembers} color={C.text} />
          <StatBox
            label="Bazar Total"
            value={`৳ ${totalBazarAmount.toFixed(0)}`}
            color={C.teal}
          />
          <StatBox
            label="Total Meals"
            value={totalMeals.toFixed(1)}
            color={C.text}
          />
          <StatBox
            label="Meal Rate"
            value={`৳ ${mealRate.toFixed(2)}`}
            color={C.green}
          />
          <StatBox
            label="Fixed/Person"
            value={`৳ ${fixedPerPerson.toFixed(0)}`}
            color={C.amber}
          />
        </div>
      </div>
    </div>
  );
}

function hBtn(bg, border) {
  return {
    background: bg,
    color: "#fff",
    border: `1px solid ${border || bg}`,
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 600,
    fontFamily: font,
    cursor: "pointer",
  };
}
