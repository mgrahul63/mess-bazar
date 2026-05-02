import { C, font, SectionTitle, Table, Th, Td, Badge } from "./UI";

export default function SettlementTab({ settlement, mealRate, totalBazarAmount, totalMeals, totalFixedCost, fixedPerPerson }) {
  const totalReceive = settlement.filter(s => s.balance > 0).reduce((s, x) => s + x.balance, 0);
  const totalPay     = settlement.filter(s => s.balance < 0).reduce((s, x) => s + Math.abs(x.balance), 0);

  return (
    <div>
      <SectionTitle icon="💰" title="Table 4 — Final Settlement" sub="Auto-calculated from all tables. Shows who receives money back and who needs to pay." />

      {/* Calculation summary */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <p style={{ margin: "0 0 14px", fontSize: 12, fontWeight: 700, color: C.textLight, textTransform: "uppercase", letterSpacing: 0.6 }}>How It Is Calculated</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 16 }}>
          {[["Bazar Total", `৳ ${totalBazarAmount.toFixed(2)}`, C.teal], ["Total Meals", `${totalMeals.toFixed(1)} meals`, C.text], ["Meal Rate", `৳ ${mealRate.toFixed(2)} / meal`, C.green], ["Fixed Total", `৳ ${totalFixedCost.toFixed(2)}`, C.amber], ["Fixed / Person", `৳ ${fixedPerPerson.toFixed(2)}`, C.red]].map(([l, v, c]) => (
            <div key={l} style={{ background: C.raised, borderRadius: 8, padding: "10px 14px", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 11, color: C.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4 }}>{l}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: c, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ background: C.raised, borderRadius: 8, padding: "11px 15px", border: `1px solid ${C.border}`, fontSize: 13, color: C.textMid, lineHeight: 1.7 }}>
          <strong style={{ color: C.teal }}>Formula:</strong> &nbsp;
          Final Balance = (Cash Deposit + Member Bazar Purchases) − (Meal Rate × Meals + Fixed Per Person)
        </div>
      </div>

      {/* Main table */}
      <Table>
        <thead>
          <tr>{["Name", "Cash Deposit", "Bazar Purchase", "Total Deposit", "Meal Cost", "Fixed Cost", "Total Expense", "Balance", "Status"].map(h => <Th key={h}>{h}</Th>)}</tr>
        </thead>
        <tbody>
          {settlement.length === 0 && <tr><Td colSpan={9} style={{ textAlign: "center", color: C.textLight, padding: 32 }}>No members yet.</Td></tr>}
          {settlement.map(s => (
            <tr key={s.id} style={{ background: s.balance >= 0 ? C.greenBg : C.redBg }}>
              <Td><strong style={{ color: C.text }}>{s.name}</strong>{s.isManager && <span style={{ marginLeft: 6, fontSize: 11, color: C.teal, fontWeight: 600 }}>(Mgr)</span>}</Td>
              <Td style={{ color: C.textMid }}>৳ {s.cashDeposit.toFixed(0)}</Td>
              <Td style={{ color: C.textMid }}>৳ {s.bazarPurchases.toFixed(0)}</Td>
              <Td><strong style={{ color: C.teal }}>৳ {s.totalDeposit.toFixed(0)}</strong></Td>
              <Td style={{ color: C.textMid }}>৳ {s.mealCost.toFixed(2)}</Td>
              <Td style={{ color: C.textMid }}>৳ {fixedPerPerson.toFixed(2)}</Td>
              <Td style={{ color: C.textMid }}>৳ {s.totalExpense.toFixed(2)}</Td>
              <Td><strong style={{ color: s.balance >= 0 ? C.green : C.red, fontSize: 15 }}>৳ {Math.abs(s.balance).toFixed(2)}</strong></Td>
              <Td><Badge label={s.balance >= 0 ? "✅ Receives" : "❌ Pays"} color={s.balance >= 0 ? "green" : "red"} /></Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Summary cards */}
      {settlement.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700, color: C.textMid, textTransform: "uppercase", letterSpacing: 0.5 }}>Settlement Summary</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            {settlement.map(s => (
              <div key={s.id} style={{ background: C.surface, border: `1px solid ${s.balance >= 0 ? C.greenBorder : C.redBorder}`, borderLeft: `4px solid ${s.balance >= 0 ? C.green : C.red}`, borderRadius: 10, padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: C.textLight, marginTop: 3 }}>{s.memberMeals.toFixed(1)} meals · Deposit: ৳{s.totalDeposit.toFixed(0)}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: s.balance >= 0 ? C.green : C.red }}>৳ {Math.abs(s.balance).toFixed(2)}</div>
                  <div style={{ fontSize: 12, color: s.balance >= 0 ? C.green : C.red, fontWeight: 600, marginTop: 2 }}>{s.balance >= 0 ? "Receives" : "Pays"}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            {[["Total to Receive", `৳ ${totalReceive.toFixed(2)}`, C.green, C.greenBg, C.greenBorder], ["Total to Pay", `৳ ${totalPay.toFixed(2)}`, C.red, C.redBg, C.redBorder]].map(([l, v, c, bg, border]) => (
              <div key={l} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: "10px 18px" }}>
                <div style={{ fontSize: 11, color: C.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4 }}>{l}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: c, marginTop: 3 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
