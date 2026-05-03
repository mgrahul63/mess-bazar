import { useState } from "react";
import {
  InfoBox,
  Input,
  Label,
  PageCard,
  ResponsiveTable,
  SectionTitle,
} from "./UI";

export default function FixedCostTab({
  data,
  update,
  showToast,
  totalFixedCost,
  fixedPerPerson,
  activeMembers,
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [editId, setEditId] = useState(null);

  const reset = () => {
    setName("");
    setAmount("");
    setEditId(null);
  };

  const save = () => {
    if (!name.trim()) return showToast("Please enter a cost name.", "error");
    if (!amount || Number(amount) <= 0)
      return showToast("Please enter a valid amount.", "error");
    if (editId) {
      update((d) => {
        d.fixedCosts = d.fixedCosts.map((f) =>
          f.id === editId
            ? { ...f, name: name.trim(), amount: Number(amount) }
            : f,
        );
        return d;
      });
      showToast("Fixed cost updated.");
    } else {
      update((d) => {
        d.fixedCosts = [
          ...(d.fixedCosts || []),
          {
            id: Date.now().toString(),
            name: name.trim(),
            amount: Number(amount),
          },
        ];
        return d;
      });
      showToast("Fixed cost added.");
    }
    reset();
  };

  const startEdit = (f) => {
    setEditId(f.id);
    setName(f.name);
    setAmount(f.amount);
  };
  const remove = (id) => {
    update((d) => {
      d.fixedCosts = d.fixedCosts.filter((f) => f.id !== id);
      return d;
    });
    showToast("Removed.");
  };

  const tableRows = (data.fixedCosts || []).map((f, i) => ({
    cells: [
      <span className="text-gray-500">{i + 1}</span>,
      <strong className="text-gray-100">{f.name}</strong>,
      <span className="text-yellow-400 font-semibold">
        ৳ {Number(f.amount).toLocaleString()}
      </span>,
      <div className="flex gap-2">
        <button onClick={() => startEdit(f)} className="btn-sm-ghost">
          Edit
        </button>
        <button onClick={() => remove(f.id)} className="btn-sm-red">
          Remove
        </button>
      </div>,
    ],
    mobileContent: (
      <div>
        <div className="flex justify-between items-center mb-2">
          <strong className="text-gray-100">{f.name}</strong>
          <span className="text-yellow-400 font-bold text-base">
            ৳ {Number(f.amount).toLocaleString()}
          </span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => startEdit(f)} className="btn-sm-ghost flex-1">
            Edit
          </button>
          <button onClick={() => remove(f.id)} className="btn-sm-red flex-1">
            Remove
          </button>
        </div>
      </div>
    ),
  }));

  return (
    <div>
      <SectionTitle
        icon="📦"
        title="Fixed Cost"
        sub="Shared monthly costs split equally among all members. These do NOT affect the meal rate."
      />

      <InfoBox color="amber">
        ⚠️ Fixed costs are <strong>separate from Bazar Total</strong> — they do
        not affect the meal rate.
        <br />
        Formula: <strong>Total Fixed ÷ Members = Per Person Share</strong>
      </InfoBox>

      {/* Form */}
      <PageCard>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label required>Cost Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rent, Electricity, Water"
            />
          </div>
          <div>
            <Label required>Amount (৳)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="sm:col-span-2 flex gap-2">
            <button onClick={save} className="btn-teal flex-1">
              {editId ? "Update" : "Add Cost"}
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
        headers={["#", "Cost Name", "Amount (৳)", "Actions"]}
        rows={tableRows}
        emptyMsg="No fixed costs added."
      />

      {/* Summary */}
      {(data.fixedCosts || []).length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[
            ["Members", activeMembers, "text-teal-primary"],
            [
              "Total Fixed",
              `৳ ${totalFixedCost.toFixed(0)}`,
              "text-yellow-400",
            ],
            ["Per Person", `৳ ${fixedPerPerson.toFixed(2)}`, "text-red-400"],
          ].map(([l, v, c]) => (
            <div key={l} className="card text-center">
              <div className="text-[10px] text-gray-500 uppercase font-semibold">
                {l}
              </div>
              <div className={`font-bold text-sm mt-1 ${c}`}>{v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
