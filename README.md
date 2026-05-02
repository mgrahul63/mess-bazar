# 🏠 Mess Bazar

> A simple, modern web app for managing group mess expenses — track bazar purchases, daily meals, fixed costs, and get automatic monthly settlements.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-2dd4bf?style=for-the-badge&logo=vercel)](https://your-live-demo-link.vercel.app)
[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)](https://reactjs.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 📌 What is Mess Bazar?

**Mess Bazar** is built for people who live in a shared mess or house and need to track:

- Who deposited how much money
- What was bought from the bazar and by whom
- How many meals each person had each day
- What the fixed monthly costs are (rent, electricity, water etc.)
- Who owes money and who gets money back at the end of the month

Everything is calculated **automatically**. No spreadsheet needed.

---

## 🖥️ Live Demo

👉 **[https://mess-bazar.vercel.app/](https://mess-bazar.vercel.app/)**

---

## ✨ Features

| Feature              | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| 👥 Member Management | Add, edit, remove members with cash deposits and roles      |
| 🛒 Bazar List        | Log every purchase with type (Manager or Member)            |
| 🍽️ Meal Chart        | Enter daily meals per person for the full month (Day 1–30)  |
| 📦 Fixed Costs       | Track shared costs like rent, electricity, water separately |
| 💰 Auto Settlement   | Automatically calculates who pays and who receives          |
| 💾 Auto Save         | Data saves to browser storage instantly                     |
| ⬇️ Export Backup     | Download your data as a JSON file anytime                   |
| ⬆️ Import Data       | Restore data from any previous backup file                  |
| 🔒 Month Reset       | Close the month, auto-backup, and start fresh               |

---

## 📊 How the Calculation Works

### Step 1 — Meal Rate

```
Bazar Total ÷ Total Meals = Meal Rate per meal
```

### Step 2 — Fixed Cost Per Person

```
Total Fixed Cost ÷ Number of Members = Fixed Cost Per Person
```

> ⚠️ Fixed costs are kept **separate** from the Bazar Total so they do not affect the meal rate.

### Step 3 — Each Member's Total Expense

```
(Meal Rate × Their Meals) + Fixed Cost Per Person = Total Expense
```

### Step 4 — Final Balance

```
(Cash Deposit + Member Bazar Purchases) − Total Expense = Final Balance
```

- ✅ **Positive balance** → Member **receives** money back
- ❌ **Negative balance** → Member **needs to pay**

---

## 🛒 Bazar Purchase Types Explained

| Type                 | Used in Meal Rate | Added to Member Deposit |
| -------------------- | :---------------: | :---------------------: |
| **Manager Purchase** |      ✅ Yes       |          ❌ No          |
| **Member Purchase**  |      ✅ Yes       |         ✅ Yes          |

- **Manager Purchase** → The manager buys for the whole group. This goes into the bazar total for meal rate calculation only.
- **Member Purchase** → A member buys something and it counts as their personal deposit in the final settlement.

---

## 💾 Data Storage

Mess Bazar uses **browser localStorage** — your data never leaves your device.

| Method      | How it works                                                 |
| ----------- | ------------------------------------------------------------ |
| Auto Save   | Every entry is saved instantly in the background             |
| Export      | Click **Export** to download a `.json` backup file           |
| Import      | Click **Import** to load data from a backup file             |
| Month Reset | Click **Close Month & Reset** to auto-backup and start fresh |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mgrahul63//mess-bazar.git

# Go into the project folder
cd mess-bazar

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
mess-bazar/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx               # Main app — routing, calculations, month reset
│   ├── index.js              # React entry point
│   ├── constants.js          # Storage key, default data, helper functions
│   └── components/
│       ├── UI.jsx            # Full design system — dark teal theme
│       ├── Header.jsx        # Top bar with stats, export, import, close month
│       ├── Footer.jsx        # Footer with social links and app info
│       ├── MembersTab.jsx    # Table 1 — Members and cash deposits
│       ├── BazarTab.jsx      # Table 2 — Bazar purchase list
│       ├── MealTab.jsx       # Table 3 — Daily meal chart
│       ├── FixedCostTab.jsx  # Fixed monthly costs
│       └── SettlementTab.jsx # Table 4 — Final settlement
├── package.json
└── README.md
```

---

## 🔒 Month End Workflow

1. Go to the **Settlement** tab and review all balances
2. Collect payments from members who owe money
3. Pay back members who have a positive balance
4. Click **🔒 Close Month & Reset** in the header
5. A backup JSON file is automatically downloaded
6. App resets completely for the new month

---

## 🎨 Design

- **Theme:** Dark Teal — modern and easy on the eyes
- **Font:** Inter — clean and readable
- **Responsive:** Works on desktop, tablet, and mobile
- **Color coding:** 🟢 Green = receives money, 🔴 Red = pays money

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and share.

---

## 👨‍💻 Author

Built with ❤️ for mess communities everywhere.

> If this project helped you, give it a ⭐ on GitHub!
