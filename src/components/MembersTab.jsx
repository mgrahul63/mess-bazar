import { useState } from "react";
import ConfirmModal from "./DeleteConfirm";
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

export default function MembersTab({ data, update, showToast }) {
  const [name, setName] = useState("");
  const [deposit, setDeposit] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

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

  return (
    <div>
      <SectionTitle
        icon="👥"
        title="Table 1 — Members & Deposits"
        sub="Add all members and their initial cash deposit for this month."
      />

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
            <button
              onClick={save}
              className="flex-1 bg-teal-dim hover:bg-teal-primary text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {editId ? "Update" : "Add Member"}
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

      {/* Table — role & actions hidden on mobile to save space */}
      <h5 className="text-teal-200">Member List</h5>
      <Table>
        <thead>
          <tr>
            <Th className="w-8">#</Th>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Deposit (৳)</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {data.members.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="text-center text-gray-500 text-sm py-8"
              >
                No members added yet.
              </td>
            </tr>
          )}
          {data.members.map((m, i) => (
            <tr
              key={m.id}
              className={i % 2 === 0 ? "bg-dark-surface" : "bg-dark-alt"}
            >
              <Td className="text-gray-500 text-xs">{i + 1}</Td>
              <Td>
                <div className="font-semibold text-gray-100 truncate">
                  {m.name}
                </div>
              </Td>

              <Td>
                <Badge
                  label={m.isManager ? "Manager" : "Member"}
                  color={m.isManager ? "teal" : "gray"}
                />
              </Td>
              <Td className="text-teal-primary font-semibold">
                ৳{Number(m.deposit || 0).toLocaleString()}
              </Td>
              <Td>
                <div className="flex gap-1">
                  <button
                    onClick={() => startEdit(m)}
                    className="text-[8px] bg-dark-raised border border-dark-border text-gray-400 hover:text-gray-200 px-2 py-1 rounded-md transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(m.id)}
                    className="text-[8px] bg-red-900/40 border border-red-700/30 text-red-400 hover:bg-red-800/50 px-2 py-1 rounded-md"
                  >
                    Del
                  </button>

                  <ConfirmModal
                    isOpen={deleteId !== null}
                    onClose={() => setDeleteId(null)}
                    onConfirm={() => remove(m.id)}
                    message="Delete this record permanently?"
                  />
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
        <TFoot>
          <tr>
            <td
              colSpan={3}
              className="px-3 py-2.5 text-xs font-bold text-gray-400 hidden sm:table-cell"
            >
              Total Cash Deposits
            </td>
            <td
              colSpan={3}
              className="px-3 py-2.5 text-xs font-bold text-gray-400 sm:hidden"
            >
              Total
            </td>
            <td className="px-2 sm:px-3 py-2.5 text-teal-primary font-bold">
              ৳{totalDeposit.toLocaleString()}
            </td>
            <td />
          </tr>
        </TFoot>
      </Table>

      <InfoBox color="teal" className="mt-3">
        ℹ️ Cash deposit is money given directly to the group fund. Bazar
        purchases by members are tracked separately.
      </InfoBox>
    </div>
  );
}
