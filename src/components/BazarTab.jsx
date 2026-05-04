import { useState } from "react";
import { today } from "../constants";
import {
  Badge,
  InfoBox,
  Input,
  Label,
  PageCard,
  SectionTitle,
  Select,
  Table,
  Td,
  TFoot,
  Th,
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

  return (
    <div>
      <SectionTitle
        icon="🛒"
        title="Table 2 — Bazar List"
        sub="Record every purchase. Purchase type affects the final settlement."
      />

      <InfoBox color="amber">
        <strong>Manager Purchase</strong> → Counted in Bazar Total for meal rate
        only. Not added to member deposit.
        <br />
        <strong>Member Purchase</strong> → Counted in Bazar Total AND added to
        that member's deposit in settlement.
      </InfoBox>

      <PageCard>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label required>Person</Label>
            <Select value={form.personId} onChange={set("personId")}>
              <option value="">-- Select Person --</option>
              {data.members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                  {m.isManager ? " (Mgr)" : ""}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label required>Purchase Type</Label>
            <Select value={form.type} onChange={set("type")}>
              <option value="manager">Manager Purchase</option>
              <option value="member">Member Purchase</option>
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
            <button
              onClick={save}
              className="flex-1 bg-teal-dim hover:bg-teal-primary text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {editId ? "Update" : "Add Entry"}
            </button>
            {editId && (
              <button
                onClick={reset}
                className="border border-dark-border text-gray-400 text-sm font-semibold py-2 px-4 rounded-lg hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </PageCard>

      {/* Table — description & date hidden on mobile */}
      <Table>
        <thead>
          <tr>
            <Th className="w-8">#</Th>
            <Th>Person</Th>
            <Th hiddenOnMobile>Date</Th>
            <Th hiddenOnMobile>Description</Th>
            <Th>Type</Th>
            <Th>Amount (৳)</Th>
            <Th>Act.</Th>
          </tr>
        </thead>
        <tbody>
          {data.bazarList.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="text-center text-gray-500 text-sm py-8"
              >
                No bazar entries yet.
              </td>
            </tr>
          )}
          {data.bazarList.map((b, i) => {
            const person = data.members.find((m) => m.id === b.personId);
            return (
              <tr
                key={b.id}
                className={i % 2 === 0 ? "bg-dark-surface" : "bg-dark-alt"}
              >
                <Td className="text-gray-500 text-xs">{i + 1}</Td>
                <Td>
                  <div className="font-semibold text-gray-100 truncate">
                    {person?.name || "—"}
                  </div>
                  {/* Show date & desc inline on mobile */}
                  <div className="sm:hidden text-xs text-gray-500 mt-0.5 truncate">
                    {b.date} {b.description ? `· ${b.description}` : ""}
                  </div>
                </Td>
                <Td hiddenOnMobile className="text-gray-400 text-xs">
                  {b.date}
                </Td>
                <Td
                  hiddenOnMobile
                  className="text-gray-400 truncate max-w-[120px]"
                >
                  {b.description || "—"}
                </Td>
                <Td>
                  <Badge
                    label={b.type === "manager" ? "Mgr" : "Mem"}
                    color={b.type === "manager" ? "teal" : "green"}
                  />
                </Td>
                <Td className="text-teal-primary font-semibold">
                  ৳{Number(b.amount).toLocaleString()}
                </Td>
                <Td>
                  <div className="flex gap-1">
                    <button
                      onClick={() => startEdit(b)}
                      className="text-xs bg-dark-raised border border-dark-border text-gray-400 hover:text-gray-200 px-2 py-1 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(b.id)}
                      className="text-xs bg-red-900/40 border border-red-700/30 text-red-400 hover:bg-red-800/50 px-2 py-1 rounded-md transition-colors"
                    >
                      Del
                    </button>
                  </div>
                </Td>
              </tr>
            );
          })}
        </tbody>
        <TFoot>
          <tr>
            <td
              colSpan={5}
              className="px-3 py-2.5 text-xs font-bold text-gray-400 hidden sm:table-cell"
            >
              Total Bazar Amount
            </td>
            <td
              colSpan={3}
              className="px-3 py-2.5 text-xs font-bold text-gray-400 sm:hidden"
            >
              Total
            </td>
            <td className="px-2 sm:px-3 py-2.5 text-teal-primary font-bold">
              ৳{total.toLocaleString()}
            </td>
            <td />
          </tr>
        </TFoot>
      </Table>

      {/* Summary row */}
      {data.bazarList.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-3">
          {[
            ["Manager Purchases", managerTotal, "text-blue-400"],
            ["Member Purchases", memberTotal, "text-green-400"],
          ].map(([l, v, c]) => (
            <div
              key={l}
              className="bg-dark-surface border border-dark-border rounded-xl p-3"
            >
              <div className="text-[10px] text-gray-500 uppercase font-semibold">
                {l}
              </div>
              <div className={`font-bold text-base mt-1 ${c}`}>
                ৳{v.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
