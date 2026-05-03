import { useState } from "react";
import { today } from "../constants";
import {
  Badge,
  InfoBox,
  Input,
  Label,
  PageCard,
  ResponsiveTable,
  SectionTitle,
  Select,
} from "./UI";

const empty = () => ({
  personId: "",
  description: "",
  amount: "",
  date: today(),
  type: "manager",
});

export default function BazarTab({ data, update, showToast }) {
  const [form, setForm] = useState(empty());
  const [editId, setEditId] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const reset = () => {
    setForm(empty());
    setEditId(null);
  };

  const save = () => {
    if (!form.personId) return showToast("Please select a person.", "error");
    if (!form.amount || Number(form.amount) <= 0)
      return showToast("Please enter a valid amount.", "error");
    const entry = { ...form, amount: Number(form.amount) };
    if (editId) {
      update((d) => {
        d.bazarList = d.bazarList.map((b) =>
          b.id === editId ? { ...b, ...entry } : b,
        );
        return d;
      });
      showToast("Entry updated.");
    } else {
      update((d) => {
        d.bazarList = [...d.bazarList, { id: Date.now().toString(), ...entry }];
        return d;
      });
      showToast("Bazar entry added.");
    }
    reset();
  };

  const startEdit = (b) => {
    setEditId(b.id);
    setForm({
      personId: b.personId,
      description: b.description,
      amount: b.amount,
      date: b.date,
      type: b.type,
    });
  };
  const remove = (id) => {
    update((d) => {
      d.bazarList = d.bazarList.filter((b) => b.id !== id);
      return d;
    });
    showToast("Entry removed.");
  };

  const total = data.bazarList.reduce((s, b) => s + Number(b.amount || 0), 0);
  const managerTotal = data.bazarList
    .filter((b) => b.type === "manager")
    .reduce((s, b) => s + Number(b.amount || 0), 0);
  const memberTotal = data.bazarList
    .filter((b) => b.type === "member")
    .reduce((s, b) => s + Number(b.amount || 0), 0);

  const tableRows = data.bazarList.map((b, i) => {
    const person = data.members.find((m) => m.id === b.personId);
    return {
      cells: [
        <span className="text-gray-500">{i + 1}</span>,
        <span className="text-gray-400 text-xs">{b.date}</span>,
        <strong className="text-gray-100">{person?.name || "—"}</strong>,
        <span className="text-gray-400">{b.description || "—"}</span>,
        <Badge
          label={b.type === "manager" ? "Manager" : "Member"}
          color={b.type === "manager" ? "teal" : "green"}
        />,
        <span className="text-teal-primary font-semibold">
          ৳ {Number(b.amount).toLocaleString()}
        </span>,
        <div className="flex gap-2">
          <button onClick={() => startEdit(b)} className="btn-sm-ghost">
            Edit
          </button>
          <button onClick={() => remove(b.id)} className="btn-sm-red">
            Remove
          </button>
        </div>,
      ],
      mobileContent: (
        <div>
          <div className="flex items-start justify-between mb-1">
            <div>
              <strong className="text-gray-100">{person?.name || "—"}</strong>
              <span className="text-gray-500 text-xs ml-2">{b.date}</span>
            </div>
            <span className="text-teal-primary font-bold text-base">
              ৳ {Number(b.amount).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Badge
              label={b.type === "manager" ? "Manager" : "Member"}
              color={b.type === "manager" ? "teal" : "green"}
            />
            {b.description && (
              <span className="text-gray-400 text-xs">{b.description}</span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => startEdit(b)}
              className="btn-sm-ghost flex-1"
            >
              Edit
            </button>
            <button onClick={() => remove(b.id)} className="btn-sm-red flex-1">
              Remove
            </button>
          </div>
        </div>
      ),
    };
  });

  return (
    <div>
      <SectionTitle
        icon="🛒"
        title="Table 2 — Bazar List"
        sub="Record every purchase. Purchase type affects the final settlement."
      />

      <InfoBox color="amber">
        <strong>Manager Purchase</strong> → Bazar total only (meal rate). Not in
        member deposit.
        <br />
        <strong>Member Purchase</strong> → Bazar total AND added to member's
        deposit in settlement.
      </InfoBox>

      {/* Form */}
      <PageCard>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label required>Person</Label>
            <Select value={form.personId} onChange={set("personId")}>
              <option value="">-- Select Person --</option>
              {data.members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                  {m.isManager ? " (Manager)" : ""}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label required>Purchase Type</Label>
            <Select value={form.type} onChange={set("type")}>
              <option value="manager">Manager Purchase — Group expense</option>
              <option value="member">Member Purchase — Added to deposit</option>
            </Select>
          </div>
          <div>
            <Label>Description</Label>
            <Input
              value={form.description}
              onChange={set("description")}
              placeholder="e.g. Rice, Fish, Vegetables"
            />
          </div>
          <div>
            <Label required>Amount (৳)</Label>
            <Input
              type="number"
              value={form.amount}
              onChange={set("amount")}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Date</Label>
            <Input type="date" value={form.date} onChange={set("date")} />
          </div>
          <div className="flex items-end gap-2">
            <button onClick={save} className="btn-teal flex-1">
              {editId ? "Update" : "Add Entry"}
            </button>
            {editId && (
              <button onClick={reset} className="btn-ghost">
                Cancel
              </button>
            )}
          </div>
        </div>
      </PageCard>

      {/* Table / Cards */}
      <ResponsiveTable
        headers={[
          "#",
          "Date",
          "Person",
          "Description",
          "Type",
          "Amount (৳)",
          "Actions",
        ]}
        rows={tableRows}
        emptyMsg="No bazar entries yet."
      />

      {/* Totals */}
      {data.bazarList.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[
            ["Total", total, "text-teal-primary"],
            ["Manager", managerTotal, "text-blue-400"],
            ["Member", memberTotal, "text-green-400"],
          ].map(([l, v, c]) => (
            <div key={l} className="card text-center">
              <div className="text-[10px] text-gray-500 uppercase font-semibold">
                {l}
              </div>
              <div className={`font-bold text-sm mt-1 ${c}`}>
                ৳ {v.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
