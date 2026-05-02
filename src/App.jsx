import { useCallback, useEffect, useState } from "react";
import BazarTab from "./components/BazarTab";
import FixedCostTab from "./components/FixedCostTab";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MealTab from "./components/MealTab";
import MembersTab from "./components/MembersTab";
import SettlementTab from "./components/SettlementTab";
import { C, ConfirmModal, font, Toast } from "./components/UI";
import { defaultData, loadData, saveData, STORAGE_KEY } from "./constants";

const TABS = [
  { id: "members", label: "Members", icon: "👥" },
  { id: "bazar", label: "Bazar List", icon: "🛒" },
  { id: "meal", label: "Meal Chart", icon: "🍽️" },
  { id: "fixed", label: "Fixed Cost", icon: "📦" },
  { id: "settlement", label: "Settlement", icon: "💰" },
];

export default function App() {
  const [data, setData] = useState(loadData);
  const [activeTab, setActiveTab] = useState("members");
  const [toast, setToast] = useState(null);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const update = useCallback((fn) => setData((prev) => fn({ ...prev })), []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Export ────────────────────────────────────────────────────────────────────
  const exportData = (label) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mess_bazar_${(label || data.monthLabel || "backup").replace(/\s/g, "_")}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Import ────────────────────────────────────────────────────────────────────
  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        setData(JSON.parse(ev.target.result));
        showToast("Data imported successfully.");
      } catch {
        showToast("Invalid file. Please use an exported backup.", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // ── Close Month & Full Reset ──────────────────────────────────────────────────
  const confirmReset = () => {
    exportData(data.monthLabel);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    const now = new Date();
    setData({
      ...defaultData,
      monthLabel: `${now.toLocaleString("default", { month: "long" })} ${now.getFullYear()}`,
      daysInMonth: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
    });
    setActiveTab("members");
    setShowReset(false);
    showToast("Month closed. Backup saved. Fresh data started.");
  };

  // ── Calculations ──────────────────────────────────────────────────────────────
  const totalBazarAmount = data.bazarList.reduce(
    (s, b) => s + Number(b.amount || 0),
    0,
  );
  const totalMeals = Object.values(data.mealChart).reduce(
    (s, days) =>
      s + Object.values(days).reduce((ss, v) => ss + Number(v || 0), 0),
    0,
  );
  const mealRate = totalMeals > 0 ? totalBazarAmount / totalMeals : 0;
  const totalFixedCost = (data.fixedCosts || []).reduce(
    (s, f) => s + Number(f.amount || 0),
    0,
  );
  const activeMembers = data.members.length;
  const fixedPerPerson = activeMembers > 0 ? totalFixedCost / activeMembers : 0;

  const settlement = data.members.map((m) => {
    const cashDeposit = Number(m.deposit || 0);
    const bazarPurchases = data.bazarList
      .filter((b) => b.type === "member" && b.personId === m.id)
      .reduce((s, b) => s + Number(b.amount || 0), 0);
    const totalDeposit = cashDeposit + bazarPurchases;
    const memberMeals = Object.values(data.mealChart[m.id] || {}).reduce(
      (s, v) => s + Number(v || 0),
      0,
    );
    const mealCost = mealRate * memberMeals;
    const totalExpense = mealCost + fixedPerPerson;
    const balance = totalDeposit - totalExpense;
    return {
      ...m,
      cashDeposit,
      bazarPurchases,
      totalDeposit,
      memberMeals,
      mealCost,
      totalExpense,
      balance,
    };
  });

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        fontFamily: font,
        color: C.text,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header
        mealRate={mealRate}
        totalBazarAmount={totalBazarAmount}
        totalMeals={totalMeals}
        fixedPerPerson={fixedPerPerson}
        activeMembers={activeMembers}
        monthLabel={data.monthLabel}
        onExport={() => exportData()}
        onImport={importData}
        onCloseMonth={() => setShowReset(true)}
      />

      {/* Tab bar */}
      <div
        style={{
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: 980,
            margin: "0 auto",
            display: "flex",
            overflowX: "auto",
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: "13px 20px",
                border: "none",
                background: "none",
                cursor: "pointer",
                color: activeTab === t.id ? C.teal : C.textMid,
                borderBottom:
                  activeTab === t.id
                    ? `2px solid ${C.teal}`
                    : "2px solid transparent",
                fontFamily: font,
                fontSize: 14,
                fontWeight: activeTab === t.id ? 700 : 500,
                whiteSpace: "nowrap",
                transition: "all 0.15s",
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Page content */}
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "24px 16px",
          flex: 1,
          width: "100%",
        }}
      >
        {activeTab === "members" && (
          <MembersTab data={data} update={update} showToast={showToast} />
        )}
        {activeTab === "bazar" && (
          <BazarTab data={data} update={update} showToast={showToast} />
        )}
        {activeTab === "meal" && <MealTab data={data} update={update} />}
        {activeTab === "fixed" && (
          <FixedCostTab
            data={data}
            update={update}
            showToast={showToast}
            totalFixedCost={totalFixedCost}
            fixedPerPerson={fixedPerPerson}
            activeMembers={activeMembers}
          />
        )}
        {activeTab === "settlement" && (
          <SettlementTab
            settlement={settlement}
            mealRate={mealRate}
            totalBazarAmount={totalBazarAmount}
            totalMeals={totalMeals}
            totalFixedCost={totalFixedCost}
            fixedPerPerson={fixedPerPerson}
          />
        )}
      </div>

      <Footer onNavigate={setActiveTab} />

      <ConfirmModal
        open={showReset}
        danger
        title="Close Month & Reset All Data"
        message={`This will auto-export a backup of "${data.monthLabel}", then permanently clear everything for a fresh new month. This cannot be undone.`}
        onConfirm={confirmReset}
        onCancel={() => setShowReset(false)}
      />

      <Toast toast={toast} />
    </div>
  );
}
