import { useState } from "react";
import { today } from "../constants";
import { C, PageCard, SectionTitle, Label, Input, Select, Btn, Table, Th, Td, TFoot, Badge, InfoBox } from "./UI";

const empty = () => ({ personId: "", description: "", amount: "", date: today(), type: "manager" });

export default function BazarTab({ data, update, showToast }) {
  const [form, setForm] = useState(empty());
  const [editId, setEditId] = useState(null);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const reset = () => { setForm(empty()); setEditId(null); };

  const save = () => {
    if (!form.personId) return showToast("Please select a person.", "error");
    if (!form.amount || Number(form.amount) <= 0) return showToast("Please enter a valid amount.", "error");
    const entry = { ...form, amount: Number(form.amount) };
    if (editId) {
      update(d => { d.bazarList = d.bazarList.map(b => b.id === editId ? { ...b, ...entry } : b); return d; });
      showToast("Entry updated.");
    } else {
      update(d => { d.bazarList = [...d.bazarList, { id: Date.now().toString(), ...entry }]; return d; });
      showToast("Bazar entry added.");
    }
    reset();
  };

  const startEdit = b => { setEditId(b.id); setForm({ personId: b.personId, description: b.description, amount: b.amount, date: b.date, type: b.type }); };
  const remove = id => { update(d => { d.bazarList = d.bazarList.filter(b => b.id !== id); return d; }); showToast("Entry removed."); };

  const total        = data.bazarList.reduce((s, b) => s + Number(b.amount || 0), 0);
  const managerTotal = data.bazarList.filter(b => b.type === "manager").reduce((s, b) => s + Number(b.amount || 0), 0);
  const memberTotal  = data.bazarList.filter(b => b.type === "member").reduce((s, b) => s + Number(b.amount || 0), 0);

  return (
    <div>
      <SectionTitle icon="🛒" title="Table 2 — Bazar List" sub="Record every purchase made for the group. Purchase type affects the final settlement." />
      <InfoBox color="amber">
        <strong>Manager Purchase</strong> → Counted in Bazar Total for meal rate only. Not added to member deposit in settlement.<br />
        <strong>Member Purchase</strong> → Counted in Bazar Total AND added to that member's personal deposit in settlement.
      </InfoBox>
      <PageCard>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <Label required>Person</Label>
            <Select value={form.personId} onChange={set("personId")}>
              <option value="">-- Select Person --</option>
              {data.members.map(m => <option key={m.id} value={m.id}>{m.name}{m.isManager ? " (Manager)" : ""}</option>)}
            </Select>
          </div>
          <div>
            <Label required>Purchase Type</Label>
            <Select value={form.type} onChange={set("type")}>
              <option value="manager">Manager Purchase — Group expense</option>
              <option value="member">Member Purchase — Added to deposit</option>
            </Select>
          </div>
          <div><Label>Description</Label><Input value={form.description} onChange={set("description")} placeholder="e.g. Rice, Fish, Vegetables" /></div>
          <div><Label required>Amount (৳)</Label><Input type="number" value={form.amount} onChange={set("amount")} placeholder="0" /></div>
          <div><Label>Date</Label><Input type="date" value={form.date} onChange={set("date")} /></div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <Btn onClick={save} fullWidth>{editId ? "Update Entry" : "Add Entry"}</Btn>
            {editId && <Btn color="ghost" onClick={reset}>Cancel</Btn>}
          </div>
        </div>
      </PageCard>
      <Table>
        <thead><tr>{["#", "Date", "Person", "Description", "Type", "Amount (৳)", "Actions"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>
          {data.bazarList.length === 0 && <tr><Td colSpan={7} style={{ textAlign: "center", color: C.textLight, padding: 32 }}>No bazar entries yet.</Td></tr>}
          {data.bazarList.map((b, i) => {
            const person = data.members.find(m => m.id === b.personId);
            return (
              <tr key={b.id} style={{ background: i % 2 === 0 ? C.surface : C.surfaceAlt }}>
                <Td style={{ color: C.textLight, width: 40 }}>{i + 1}</Td>
                <Td style={{ color: C.textMid }}>{b.date}</Td>
                <Td><strong>{person?.name || "—"}</strong></Td>
                <Td style={{ color: C.textMid }}>{b.description || "—"}</Td>
                <Td><Badge label={b.type === "manager" ? "Manager" : "Member"} color={b.type === "manager" ? "teal" : "green"} /></Td>
                <Td style={{ color: C.teal, fontWeight: 600 }}>৳ {Number(b.amount).toLocaleString()}</Td>
                <Td><div style={{ display: "flex", gap: 6 }}><Btn size="sm" color="ghost" onClick={() => startEdit(b)}>Edit</Btn><Btn size="sm" color="red" onClick={() => remove(b.id)}>Remove</Btn></div></Td>
              </tr>
            );
          })}
        </tbody>
        <TFoot>
          <tr>
            <Td colSpan={5} style={{ fontWeight: 700, color: C.textMid }}>Total Bazar Amount</Td>
            <Td style={{ fontWeight: 700, color: C.teal, fontSize: 15 }}>৳ {total.toLocaleString()}</Td>
            <Td />
          </tr>
        </TFoot>
      </Table>
      <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
        {[["Manager Purchases", managerTotal, C.teal], ["Member Purchases", memberTotal, C.green]].map(([l, v, c]) => (
          <div key={l} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 18px" }}>
            <div style={{ fontSize: 12, color: C.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4 }}>{l}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: c, marginTop: 3 }}>৳ {v.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
