export const STORAGE_KEY = "mess_bazar_v4";

const now = new Date();
export const defaultData = {
  members: [],
  bazarList: [],
  mealChart: {},
  fixedCosts: [],
  monthLabel: `${now.toLocaleString("default", { month: "long" })} ${now.getFullYear()}`,
  daysInMonth: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
};

export function today() {
  return new Date().toISOString().split("T")[0];
}

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { ...defaultData };
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}
