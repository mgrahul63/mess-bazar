import { StatBox } from "./UI";

export default function Header({
  mealRate,
  totalBazarAmount,
  totalMeals,
  fixedPerPerson,
  activeMembers,
  monthLabel,
  onExport,
  onImport,
  onCloseMonth,
}) {
  return (
    <div className="bg-dark-header border-b border-dark-border px-4 py-4">
      <div className="max-w-5xl mx-auto">
        {/* Title + buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-teal-primary tracking-tight">
              🏠 Mess Bazar
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Month: <strong className="text-gray-400">{monthLabel}</strong>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onExport}
              className="flex-1 sm:flex-none text-xs font-semibold px-3 py-2 rounded-lg bg-teal-dim hover:bg-teal-primary text-white transition-colors"
            >
              ⬇ Export
            </button>
            <label className="flex-1 sm:flex-none text-xs font-semibold px-3 py-2 rounded-lg bg-dark-raised border border-dark-border text-gray-300 cursor-pointer hover:border-teal-border transition-colors text-center">
              ⬆ Import
              <input
                type="file"
                accept=".json"
                onChange={onImport}
                className="hidden"
              />
            </label>
            <button
              onClick={onCloseMonth}
              className="flex-1 sm:flex-none text-xs font-semibold px-3 py-2 rounded-lg bg-red-900 hover:bg-red-700 text-red-300 border border-red-800 transition-colors"
            >
              🔒 Close Month
            </button>
          </div>
        </div>

        {/* Stats — horizontal scroll on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <StatBox
            label="Members"
            value={activeMembers}
            color="text-gray-100"
          />
          <StatBox
            label="Bazar Total"
            value={`৳${totalBazarAmount.toFixed(0)}`}
            color="text-teal-primary"
          />
          <StatBox
            label="Total Meals"
            value={totalMeals.toFixed(1)}
            color="text-gray-100"
          />
          <StatBox
            label="Meal Rate"
            value={`৳${mealRate.toFixed(2)}`}
            color="text-green-400"
          />
          <StatBox
            label="Fixed/Person"
            value={`৳${fixedPerPerson.toFixed(0)}`}
            color="text-yellow-400"
          />
        </div>
      </div>
    </div>
  );
}
