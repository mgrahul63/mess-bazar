import { useState } from "react";
import {
  Badge,
  Btn,
  C,
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
        title="Table 1 — Members & Cash Deposits"
        sub="Add all members and their initial cash deposit for this month."
      />
      <PageCard>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 160px auto",
            gap: 12,
            alignItems: "flex-end",
          }}
        >
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
          <div style={{ display: "flex", gap: 8 }}>
            <Btn onClick={save}>{editId ? "Update" : "Add"}</Btn>
            {editId && (
              <Btn color="ghost" onClick={reset}>
                Cancel
              </Btn>
            )}
          </div>
        </div>
      </PageCard>
      <Table>
        <thead>
          <tr>
            {["#", "Name", "Role", "Cash Deposit (৳)", "Actions"].map((h) => (
              <Th key={h}>{h}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.members.length === 0 && (
            <tr>
              <Td
                colSpan={5}
                style={{ textAlign: "center", color: C.textLight, padding: 32 }}
              >
                No members added yet.
              </Td>
            </tr>
          )}
          {data.members.map((m, i) => (
            <tr
              key={m.id}
              style={{ background: i % 2 === 0 ? C.surface : C.surfaceAlt }}
            >
              <Td style={{ color: C.textLight, width: 40 }}>{i + 1}</Td>
              <Td>
                <strong style={{ color: C.text }}>{m.name}</strong>
              </Td>
              <Td>
                <Badge
                  label={m.isManager ? "Manager" : "Member"}
                  color={m.isManager ? "teal" : "gray"}
                />
              </Td>
              <Td style={{ color: C.teal, fontWeight: 600 }}>
                ৳ {Number(m.deposit || 0).toLocaleString()}
              </Td>
              <Td>
                <div style={{ display: "flex", gap: 6 }}>
                  <Btn size="sm" color="ghost" onClick={() => startEdit(m)}>
                    Edit
                  </Btn>
                  <Btn size="sm" color="red" onClick={() => remove(m.id)}>
                    Remove
                  </Btn>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
        <TFoot>
          <tr>
            <Td colSpan={3} style={{ fontWeight: 700, color: C.textMid }}>
              Total Cash Deposits
            </Td>
            <Td style={{ fontWeight: 700, color: C.teal, fontSize: 15 }}>
              ৳ {totalDeposit.toLocaleString()}
            </Td>
            <Td />
          </tr>
        </TFoot>
      </Table>
      <InfoBox color="teal" style={{ marginTop: 14 }}>
        ℹ️ Cash deposit is money given directly to the group fund. Bazar
        purchases by members are tracked separately in the Bazar List tab.
      </InfoBox>
    </div>
  );
}
