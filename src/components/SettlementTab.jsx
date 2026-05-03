import { Badge, ResponsiveTable, SectionTitle } from "./UI";

export default function SettlementTab({
  settlement,
  mealRate,
  totalBazarAmount,
  totalMeals,
  totalFixedCost,
  fixedPerPerson,
}) {
  const totalReceive = settlement
    .filter((s) => s.balance > 0)
    .reduce((s, x) => s + x.balance, 0);
  const totalPay = settlement
    .filter((s) => s.balance < 0)
    .reduce((s, x) => s + Math.abs(x.balance), 0);

  const tableRows = settlement.map((s) => ({
    cells: [
      <div>
        <strong className="text-gray-100">{s.name}</strong>
        {s.isManager && (
          <span className="ml-1 text-xs text-teal-primary font-semibold">
            (Mgr)
          </span>
        )}
      </div>,
      <span className="text-gray-400">৳ {s.cashDeposit.toFixed(0)}</span>,
      <span className="text-gray-400">৳ {s.bazarPurchases.toFixed(0)}</span>,
      <strong className="text-teal-primary">
        ৳ {s.totalDeposit.toFixed(0)}
      </strong>,
      <span className="text-gray-400">৳ {s.mealCost.toFixed(2)}</span>,
      <span className="text-gray-400">৳ {fixedPerPerson.toFixed(2)}</span>,
      <span className="text-gray-400">৳ {s.totalExpense.toFixed(2)}</span>,
      <strong
        className={`text-base ${s.balance >= 0 ? "text-green-400" : "text-red-400"}`}
      >
        ৳ {Math.abs(s.balance).toFixed(2)}
      </strong>,
      <Badge
        label={s.balance >= 0 ? "✅ Receives" : "❌ Pays"}
        color={s.balance >= 0 ? "green" : "red"}
      />,
    ],
    highlight:
      s.balance >= 0
        ? "border-l-2 border-green-600"
        : "border-l-2 border-red-600",
    mobileContent: (
      <div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <strong className="text-gray-100 text-base">{s.name}</strong>
            {s.isManager && (
              <span className="ml-1 text-xs text-teal-primary">(Mgr)</span>
            )}
            <div className="text-xs text-gray-500 mt-0.5">
              {s.memberMeals.toFixed(1)} meals
            </div>
          </div>
          <div className="text-right">
            <div
              className={`text-xl font-bold ${s.balance >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              ৳ {Math.abs(s.balance).toFixed(2)}
            </div>
            <Badge
              label={s.balance >= 0 ? "✅ Receives" : "❌ Pays"}
              color={s.balance >= 0 ? "green" : "red"}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            ["Cash Deposit", `৳ ${s.cashDeposit.toFixed(0)}`],
            ["Bazar Purchase", `৳ ${s.bazarPurchases.toFixed(0)}`],
            ["Total Deposit", `৳ ${s.totalDeposit.toFixed(0)}`],
            ["Meal Cost", `৳ ${s.mealCost.toFixed(2)}`],
            ["Fixed Cost", `৳ ${fixedPerPerson.toFixed(2)}`],
            ["Total Expense", `৳ ${s.totalExpense.toFixed(2)}`],
          ].map(([l, v]) => (
            <div
              key={l}
              className="flex justify-between items-center bg-dark-raised rounded-lg px-2 py-1.5"
            >
              <span className="text-gray-500">{l}</span>
              <span className="text-gray-300 font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <div>
      <SectionTitle
        icon="💰"
        title="Table 4 — Final Settlement"
        sub="Auto-calculated. Shows who receives money back and who needs to pay."
      />

      {/* Calculation summary */}
      <div className="card mb-4">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
          Calculation Summary
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
          {[
            [
              "Bazar Total",
              `৳ ${totalBazarAmount.toFixed(2)}`,
              "text-teal-primary",
            ],
            ["Total Meals", `${totalMeals.toFixed(1)} meals`, "text-gray-300"],
            ["Meal Rate", `৳ ${mealRate.toFixed(2)}/meal`, "text-green-400"],
            [
              "Fixed Total",
              `৳ ${totalFixedCost.toFixed(2)}`,
              "text-yellow-400",
            ],
            ["Fixed/Person", `৳ ${fixedPerPerson.toFixed(2)}`, "text-red-400"],
          ].map(([l, v, c]) => (
            <div
              key={l}
              className="bg-dark-raised rounded-lg p-2.5 border border-dark-border"
            >
              <div className="text-[10px] text-gray-500 uppercase font-semibold">
                {l}
              </div>
              <div className={`font-bold text-sm mt-1 ${c}`}>{v}</div>
            </div>
          ))}
        </div>
        <div className="bg-dark-raised rounded-lg px-3 py-2.5 border border-dark-border text-xs text-gray-400 leading-relaxed">
          <strong className="text-teal-primary">Formula:</strong> Balance =
          (Cash Deposit + Member Bazar) − (Meal Rate × Meals + Fixed Per Person)
        </div>
      </div>

      {/* Table / Cards */}
      <ResponsiveTable
        headers={[
          "Name",
          "Cash Dep.",
          "Bazar",
          "Total Dep.",
          "Meal Cost",
          "Fixed",
          "Expense",
          "Balance",
          "Status",
        ]}
        rows={tableRows}
        emptyMsg="No members yet. Add members first."
      />

      {/* Summary totals */}
      {settlement.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="card border border-green-800 bg-green-900/20">
            <div className="text-[10px] text-gray-500 uppercase font-semibold">
              Total to Receive
            </div>
            <div className="text-green-400 font-bold text-xl mt-1">
              ৳ {totalReceive.toFixed(2)}
            </div>
          </div>
          <div className="card border border-red-800 bg-red-900/20">
            <div className="text-[10px] text-gray-500 uppercase font-semibold">
              Total to Pay
            </div>
            <div className="text-red-400 font-bold text-xl mt-1">
              ৳ {totalPay.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
