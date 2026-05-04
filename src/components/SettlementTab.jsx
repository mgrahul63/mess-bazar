import { Badge, SectionTitle, Table, Td, Th } from "./UI";

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

  return (
    <div>
      <SectionTitle
        icon="💰"
        title="Table 4 — Final Settlement"
        sub="Auto-calculated. Shows who receives money back and who needs to pay."
      />

      {/* Calculation summary */}
      <div className="bg-dark-surface border border-dark-border rounded-xl p-4 mb-4">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
          Calculation Summary
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
          {[
            [
              "Bazar Total",
              `৳${totalBazarAmount.toFixed(2)}`,
              "text-teal-primary",
            ],
            ["Total Meals", `${totalMeals.toFixed(1)}`, "text-gray-300"],
            ["Meal Rate", `৳${mealRate.toFixed(2)}/meal`, "text-green-400"],
            ["Fixed Total", `৳${totalFixedCost.toFixed(2)}`, "text-yellow-400"],
            ["Fixed/Person", `৳${fixedPerPerson.toFixed(2)}`, "text-red-400"],
          ].map(([l, v, c]) => (
            <div
              key={l}
              className="bg-dark-raised border border-dark-border rounded-lg p-2.5"
            >
              <div className="text-[10px] text-gray-500 uppercase font-semibold">
                {l}
              </div>
              <div className={`font-bold text-sm mt-1 ${c}`}>{v}</div>
            </div>
          ))}
        </div>
        <div className="bg-dark-raised border border-dark-border rounded-lg px-3 py-2 text-xs text-gray-400 leading-relaxed">
          <strong className="text-teal-primary">Formula:</strong> Balance =
          (Cash Deposit + Member Bazar) − (Meal Rate × Meals + Fixed Per Person)
        </div>
      </div>

      {/* Settlement table
          Mobile shows: Name, Deposit, Expense, Balance, Status
          Desktop shows all columns */}
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>
              <span className="hidden sm:inline">Cash Dep.</span>
              <span className="sm:hidden !text-[8px] capitalize">
                {" "}
                Cash Dep. & Bazar
              </span>
            </Th>
            <Th hiddenOnMobile>Bazar</Th>
            <Th hiddenOnMobile>Deposit</Th>
            <Th>
              <span className="hidden sm:inline">Meal Cost</span>
              <span className="sm:hidden !text-[8px] capitalize">
                {" "}
                Meal Cost & Fixed Cost
              </span>
            </Th>
            <Th hiddenOnMobile>Fixed</Th>
            <Th>Expense</Th>
            <Th>Balance</Th>
            <Th hiddenOnMobile>Status</Th>
          </tr>
        </thead>
        <tbody>
          {settlement.length === 0 && (
            <tr>
              <td
                colSpan={9}
                className="text-center text-gray-500 text-sm py-8"
              >
                No members yet. Add members first.
              </td>
            </tr>
          )}
          {settlement.map((s, i) => (
            <tr
              key={s.id}
              className={`${i % 2 === 0 ? "bg-dark-surface" : "bg-dark-alt"} ${s.balance >= 0 ? "border-l-2 border-green-600" : "border-l-2 border-red-600"}`}
            >
              <Td>
                <div className="font-semibold text-gray-100 text-xs sm:text-sm">
                  {s.name}
                </div>
                {s.isManager && (
                  <span className="text-[10px] text-teal-primary font-semibold">
                    (Mgr)
                  </span>
                )}
                {/* Show meal count on mobile */}
                <div className="sm:hidden text-[10px] text-gray-500 mt-0.5">
                  {s.memberMeals.toFixed(1)} meals
                </div>
              </Td>
              <Td className="text-gray-400 ">
                <div className="text-[8px] sm:text-sm">
                  ৳{s.cashDeposit.toFixed(0)}
                  <span className="sm:hidden">
                    {" + "}৳{s.bazarPurchases.toFixed(0)}
                  </span>
                </div>
                <span className="sm:hidden">= {s.totalDeposit.toFixed(0)}</span>
              </Td>
              <Td hiddenOnMobile className="text-gray-400">
                ৳{s.bazarPurchases.toFixed(0)}
              </Td>
              <Td className="text-teal-primary font-semibold">
                <div className="text-[8px] sm:text-sm">
                  <span className="sm:hidden">
                    {s.mealCost.toFixed(2)}
                    <p className="ps-2">+</p>
                    {fixedPerPerson.toFixed(2)}
                  </span>
                </div>
                <span className="hidden sm:inline">
                  ৳{s.totalDeposit.toFixed(0)}
                </span>
              </Td>
              <Td hiddenOnMobile className="text-gray-400">
                ৳{s.mealCost.toFixed(2)}
              </Td>
              <Td hiddenOnMobile className="text-gray-400">
                ৳{fixedPerPerson.toFixed(2)}
              </Td>
              <Td className="text-gray-300">৳{s.totalExpense.toFixed(2)}</Td>
              <Td>
                <span
                  className={`font-bold text-sm ${s.balance >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  ৳{Math.abs(s.balance).toFixed(2)}
                  <div className="sm:hidden">
                    <Badge
                      label={s.balance >= 0 ? "✅ Gets" : "❌ Pays"}
                      color={s.balance >= 0 ? "green" : "red"}
                    />
                  </div>
                </span>
              </Td>
              <Td hiddenOnMobile>
                <Badge
                  label={s.balance >= 0 ? "✅ Gets" : "❌ Pays"}
                  color={s.balance >= 0 ? "green" : "red"}
                />
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Total summary */}
      {settlement.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-4">
            <div className="text-[10px] text-gray-500 uppercase font-semibold mb-1">
              Total to Receive
            </div>
            <div className="text-green-400 font-bold text-xl">
              ৳{totalReceive.toFixed(2)}
            </div>
          </div>
          <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-4">
            <div className="text-[10px] text-gray-500 uppercase font-semibold mb-1">
              Total to Pay
            </div>
            <div className="text-red-400 font-bold text-xl">
              ৳{totalPay.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
