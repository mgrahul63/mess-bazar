import { useState } from "react";
import {
  InfoBox,
  Input,
  Label,
  PageCard,
  SectionTitle,
  Table,
  Td,
  TFoot,
  Th,
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
        Formula:{" "}
        <strong>Total Fixed Cost ÷ Number of Members = Per Person Share</strong>
      </InfoBox>

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
            <button
              onClick={save}
              className="flex-1 bg-teal-dim hover:bg-teal-primary text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {editId ? "Update" : "Add Cost"}
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

      <Table>
        <thead>
          <tr>
            <Th className="w-8">#</Th>
            <Th>Cost Name</Th>
            <Th>Amount (৳)</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {(data.fixedCosts || []).length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="text-center text-gray-500 text-sm py-8"
              >
                No fixed costs added.
              </td>
            </tr>
          )}
          {(data.fixedCosts || []).map((f, i) => (
            <tr
              key={f.id}
              className={i % 2 === 0 ? "bg-dark-surface" : "bg-dark-alt"}
            >
              <Td className="text-gray-500 text-xs">{i + 1}</Td>
              <Td className="font-semibold text-gray-100">{f.name}</Td>
              <Td className="text-yellow-400 font-semibold">
                ৳{Number(f.amount).toLocaleString()}
              </Td>
              <Td>
                <div className="flex gap-1">
                  <button
                    onClick={() => startEdit(f)}
                    className="text-xs bg-dark-raised border border-dark-border text-gray-400 hover:text-gray-200 px-2 py-1 rounded-md transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(f.id)}
                    className="text-xs bg-red-900/40 border border-red-700/30 text-red-400 hover:bg-red-800/50 px-2 py-1 rounded-md transition-colors"
                  >
                    Del
                  </button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
        <TFoot>
          <tr>
            <td
              colSpan={2}
              className="px-3 py-2.5 text-xs font-bold text-gray-400"
            >
              Total Fixed Cost
            </td>
            <td className="px-2 sm:px-3 py-2.5 text-yellow-400 font-bold">
              ৳{totalFixedCost.toLocaleString()}
            </td>
            <td />
          </tr>
        </TFoot>
      </Table>

      {(data.fixedCosts || []).length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[
            ["Members", activeMembers, "text-teal-primary"],
            ["Total Fixed", `৳${totalFixedCost.toFixed(0)}`, "text-yellow-400"],
            ["Per Person", `৳${fixedPerPerson.toFixed(2)}`, "text-red-400"],
          ].map(([l, v, c]) => (
            <div
              key={l}
              className="bg-dark-surface border border-dark-border rounded-xl p-3 text-center"
            >
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
