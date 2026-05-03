import { useState } from "react";
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

export default function MembersTab({ data, update, showToast }) {
  const [name, setName] = useState("");
  const [deposit, setDeposit] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [editId, setEditId] = useState(null);

  const reset = () => {
    setName("");
    setDeposit("");
    setIsManager(false);
    setEditId(null);
  };

  const save = () => {
    if (!name.trim()) return showToast("Please enter a member name.", "error");
    if (editId) {
      update((d) => {
        d.members = d.members.map((m) =>
          m.id === editId
            ? {
                ...m,
                name: name.trim(),
                deposit: Number(deposit || 0),
                isManager,
              }
            : m,
        );
        return d;
      });
      showToast("Member updated.");
    } else {
      const id = Date.now().toString();
      update((d) => {
        d.members = [
          ...d.members,
          { id, name: name.trim(), deposit: Number(deposit || 0), isManager },
        ];
        d.mealChart[id] = {};
        return d;
      });
      showToast("Member added.");
    }
    reset();
  };

  const startEdit = (m) => {
    setEditId(m.id);
    setName(m.name);
    setDeposit(m.deposit);
    setIsManager(m.isManager);
  };
  const remove = (id) => {
    update((d) => {
      d.members = d.members.filter((m) => m.id !== id);
      delete d.mealChart[id];
      return d;
    });
    showToast("Member removed.");
  };

  const totalDeposit = data.members.reduce(
    (s, m) => s + Number(m.deposit || 0),
    0,
  );

  const tableRows = data.members.map((m, i) => ({
    cells: [
      <span className="text-gray-500">{i + 1}</span>,
      <strong className="text-gray-100">{m.name}</strong>,
      <Badge
        label={m.isManager ? "Manager" : "Member"}
        color={m.isManager ? "teal" : "gray"}
      />,
      <span className="text-teal-primary font-semibold">
        ৳ {Number(m.deposit || 0).toLocaleString()}
      </span>,
      <div className="flex gap-2">
        <button onClick={() => startEdit(m)} className="btn-sm-ghost">
          Edit
        </button>
        <button onClick={() => remove(m.id)} className="btn-sm-red">
          Remove
        </button>
      </div>,
    ],
    mobileContent: (
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <strong className="text-gray-100">{m.name}</strong>
            <Badge
              label={m.isManager ? "Manager" : "Member"}
              color={m.isManager ? "teal" : "gray"}
            />
          </div>
          <span className="text-teal-primary font-bold text-base">
            ৳ {Number(m.deposit || 0).toLocaleString()}
          </span>
        </div>
        <div className="flex gap-2 mt-2">
          <button onClick={() => startEdit(m)} className="btn-sm-ghost flex-1">
            Edit
          </button>
          <button onClick={() => remove(m.id)} className="btn-sm-red flex-1">
            Remove
          </button>
        </div>
      </div>
    ),
  }));

  return (
    <div>
      <SectionTitle
        icon="👥"
        title="Table 1 — Members & Deposits"
        sub="Add all members and their initial cash deposit for this month."
      />

      {/* Form */}
      <PageCard>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label required>Member Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul"
            />
          </div>
          <div>
            <Label>Cash Deposit (৳)</Label>
            <Input
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Role</Label>
            <Select
              value={isManager ? "manager" : "member"}
              onChange={(e) => setIsManager(e.target.value === "manager")}
            >
              <option value="member">Member</option>
              <option value="manager">Manager</option>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <button onClick={save} className="btn-teal flex-1">
              {editId ? "Update" : "Add Member"}
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
        headers={["#", "Name", "Role", "Cash Deposit (৳)", "Actions"]}
        rows={tableRows}
        emptyMsg="No members added yet."
      />

      {/* Total */}
      {data.members.length > 0 && (
        <div className="card mt-3 flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-400">
            Total Cash Deposits
          </span>
          <span className="text-teal-primary font-bold text-lg">
            ৳ {totalDeposit.toLocaleString()}
          </span>
        </div>
      )}

      <InfoBox color="teal" className="mt-3">
        ℹ️ Cash deposit is money given directly to the group fund. Bazar
        purchases by members are tracked separately in the Bazar List tab.
      </InfoBox>
    </div>
  );
}
