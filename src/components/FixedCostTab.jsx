import { useState } from "react";
import { C, PageCard, SectionTitle, Label, Input, Btn, Table, Th, Td, TFoot, InfoBox } from "./UI";

export default function FixedCostTab({ data, update, showToast, totalFixedCost, fixedPerPerson, activeMembers }) {
  const [name, setName]     = useState("");
  const [amount, setAmount] = useState("");
  const [editId, setEditId] = useState(null);

  const reset = () => { setName(""); setAmount(""); setEditId(null); };

  const save = () => {
    if (!name.trim()) return showToast("Please enter a cost name.", "error");
    if (!amount || Number(amount) <= 0) return showToast("Please enter a valid amount.", "error");
    if (editId) {
      update(d => { d.fixedCosts = d.fixedCosts.map(f => f.id === editId ? { ...f, name: name.trim(), amount: Number(amount) } : f); return d; });
      showToast("Fixed cost updated.");
    } else {
      update(d => { d.fixedCosts = [...(d.fixedCosts || []), { id: Date.now().toString(), name: name.trim(), amount: Number(amount) }]; return d; });
      showToast("Fixed cost added.");
    }
    reset();
  };

  const startEdit = f => { setEditId(f.id); setName(f.name); setAmount(f.amount); };
  const remove    = id => { update(d => { d.fixedCosts = d.fixedCosts.filter(f => f.id !== id); return d; }); showToast("Removed."); };

  return (
    <div>
      <SectionTitle icon="📦" title="Fixed Cost" sub="Shared monthly costs split equally among all members. These do NOT affect the meal rate." />
      <InfoBox color="amber">
        ⚠️ Fixed costs are <strong>separate from the Bazar Total</strong>. Adding them to the bazar would increase the meal rate incorrectly.
        Formula: <strong>Total Fixed Cost ÷ Number of Members = Per Person Share</strong>
      </InfoBox>
      <PageCard>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 12, alignItems: "flex-end" }}>
          <div><Label required>Cost Name</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Rent, Electricity, Water" /></div>
          <div><Label required>Amount (৳)</Label><Input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" /></div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn onClick={save}>{editId ? "Update" : "Add"}</Btn>
            {editId && <Btn color="ghost" onClick={reset}>Cancel</Btn>}
          </div>
        </div>
      </PageCard>
      <Table>
        <thead><tr>{["#", "Cost Name", "Amount (৳)", "Actions"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>
          {(data.fixedCosts || []).length === 0 && <tr><Td colSpan={4} style={{ textAlign: "center", color: C.textLight, padding: 32 }}>No fixed costs added.</Td></tr>}
          {(data.fixedCosts || []).map((f, i) => (
            <tr key={f.id} style={{ background: i % 2 === 0 ? C.surface : C.surfaceAlt }}>
              <Td style={{ color: C.textLight, width: 40 }}>{i + 1}</Td>
              <Td><strong>{f.name}</strong></Td>
              <Td style={{ color: C.amber, fontWeight: 600 }}>৳ {Number(f.amount).toLocaleString()}</Td>
              <Td><div style={{ display: "flex", gap: 6 }}><Btn size="sm" color="ghost" onClick={() => startEdit(f)}>Edit</Btn><Btn size="sm" color="red" onClick={() => remove(f.id)}>Remove</Btn></div></Td>
            </tr>
          ))}
        </tbody>
        <TFoot>
          <tr>
            <Td colSpan={2} style={{ fontWeight: 700, color: C.textMid }}>Total Fixed Cost</Td>
            <Td style={{ fontWeight: 700, color: C.amber, fontSize: 15 }}>৳ {totalFixedCost.toLocaleString()}</Td>
            <Td />
          </tr>
        </TFoot>
      </Table>
      <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
        {[["Total Members", activeMembers, C.teal], ["Total Fixed Cost", `৳ ${totalFixedCost.toFixed(2)}`, C.amber], ["Per Person Share", `৳ ${fixedPerPerson.toFixed(2)}`, C.red]].map(([l, v, c]) => (
          <div key={l} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 18px" }}>
            <div style={{ fontSize: 11, color: C.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4 }}>{l}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: c, marginTop: 3 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
