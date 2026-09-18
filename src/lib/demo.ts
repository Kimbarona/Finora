/**
 * The Finora demo workspace.
 *
 * Everything here is invented data for a fictional company, "Riverbend
 * Goods". It is written as one coherent set of books rather than as loose
 * decorative numbers: the account balances sum to the headline balance, the
 * category totals sum to the month's expenses, and every percentage change on
 * the page is derived from these figures rather than typed in by hand.
 *
 * That consistency is the whole point. A product mockup stops being
 * convincing the moment a visitor notices the totals do not add up.
 */

/* -------------------------------------------------------------------------- */
/* Formatting                                                                  */
/* -------------------------------------------------------------------------- */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const usdCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/** `$184,920` — the default for headline figures. */
export const money = (value: number) => usd.format(value);

/** `$184,920.40` — used in the transaction ledger, where cents matter. */
export const moneyCents = (value: number) => usdCents.format(value);

/** `$92.5K` — used on chart axes, where space does not allow more. */
export const moneyCompact = (value: number) => `$${compact.format(value)}`;

/** `+$8,400.00` / `-$2,480.00` — signed, for ledger amounts. */
export const moneySigned = (value: number) =>
  `${value > 0 ? "+" : value < 0 ? "-" : ""}${usdCents.format(Math.abs(value))}`;

/** `+7.2%` / `-4.8%` — signed percentage, one decimal. */
export const percentSigned = (value: number) =>
  `${value > 0 ? "+" : value < 0 ? "-" : ""}${Math.abs(value).toFixed(1)}%`;

/** `44.4%` — unsigned share of a total. */
export const percentShare = (part: number, total: number) =>
  `${((part / total) * 100).toFixed(1)}%`;

/** Percentage change between two periods. */
export const change = (current: number, previous: number) =>
  ((current - previous) / previous) * 100;

/* -------------------------------------------------------------------------- */
/* Workspace identity                                                          */
/* -------------------------------------------------------------------------- */

export const workspace = {
  company: "Riverbend Goods",
  plan: "Growth",
  user: { name: "Amara Whitfield", role: "Owner", initials: "AW" },
  period: "September 2026",
  periodShort: "Sep 2026",
  previousPeriod: "August 2026",
  updatedAt: "Updated 9:04 AM",
} as const;

/* -------------------------------------------------------------------------- */
/* Monthly series — twelve months to September 2026                            */
/* -------------------------------------------------------------------------- */

export type MonthPoint = {
  month: string;
  full: string;
  revenue: number;
  expenses: number;
};

export const monthly: MonthPoint[] = [
  { month: "Oct", full: "October 2025", revenue: 62_400, expenses: 48_100 },
  { month: "Nov", full: "November 2025", revenue: 68_900, expenses: 51_600 },
  { month: "Dec", full: "December 2025", revenue: 58_200, expenses: 46_900 },
  { month: "Jan", full: "January 2026", revenue: 54_700, expenses: 44_200 },
  { month: "Feb", full: "February 2026", revenue: 61_300, expenses: 47_800 },
  { month: "Mar", full: "March 2026", revenue: 71_800, expenses: 53_400 },
  { month: "Apr", full: "April 2026", revenue: 69_400, expenses: 52_100 },
  { month: "May", full: "May 2026", revenue: 76_200, expenses: 55_700 },
  { month: "Jun", full: "June 2026", revenue: 82_500, expenses: 58_900 },
  { month: "Jul", full: "July 2026", revenue: 78_900, expenses: 57_300 },
  { month: "Aug", full: "August 2026", revenue: 86_300, expenses: 61_200 },
  { month: "Sep", full: "September 2026", revenue: 92_480, expenses: 64_120 },
];

export const netByMonth = monthly.map((m) => ({
  ...m,
  net: m.revenue - m.expenses,
}));

const current = monthly[monthly.length - 1];
const previous = monthly[monthly.length - 2];

/* -------------------------------------------------------------------------- */
/* Accounts                                                                    */
/* -------------------------------------------------------------------------- */

export type Account = {
  name: string;
  institution: string;
  mask: string;
  kind: "checking" | "savings" | "credit" | "merchant";
  balance: number;
};

export const accounts: Account[] = [
  {
    name: "Operating account",
    institution: "Meridian Bank",
    mask: "4471",
    kind: "checking",
    balance: 184_920.4,
  },
  {
    name: "Reserve savings",
    institution: "Meridian Bank",
    mask: "8830",
    kind: "savings",
    balance: 92_500,
  },
  {
    name: "Merchant payouts",
    institution: "Ledgerline",
    mask: "5502",
    kind: "merchant",
    balance: 21_404.18,
  },
  {
    name: "Business card",
    institution: "Kestrel Card",
    mask: "2214",
    kind: "credit",
    balance: -14_286.35,
  },
];

/** Derived, so the headline can never drift from the account list. */
export const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

/** Same total one month earlier, used for the trend on the balance tile. */
export const previousTotalBalance = 269_180.11;

/* -------------------------------------------------------------------------- */
/* Headline metrics                                                            */
/* -------------------------------------------------------------------------- */

export type Metric = {
  key: string;
  label: string;
  value: string;
  delta: number;
  /** Whether a rise in this figure is good news, neutral, or bad. */
  polarity: "up-good" | "up-bad" | "neutral";
  note: string;
  series: number[];
};

const last6 = <T,>(arr: T[]) => arr.slice(-6);

export const metrics: Metric[] = [
  {
    key: "balance",
    label: "Total balance",
    value: money(totalBalance),
    delta: change(totalBalance, previousTotalBalance),
    polarity: "up-good",
    note: "Across 4 accounts",
    series: [248_300, 253_900, 259_400, 262_100, 269_180, totalBalance],
  },
  {
    key: "revenue",
    label: "Revenue",
    value: money(current.revenue),
    delta: change(current.revenue, previous.revenue),
    polarity: "up-good",
    note: "September, month to date",
    series: last6(monthly).map((m) => m.revenue),
  },
  {
    key: "expenses",
    label: "Expenses",
    value: money(current.expenses),
    delta: change(current.expenses, previous.expenses),
    polarity: "up-bad",
    note: "September, month to date",
    series: last6(monthly).map((m) => m.expenses),
  },
  {
    key: "net",
    label: "Net cash flow",
    value: money(current.revenue - current.expenses),
    delta: change(
      current.revenue - current.expenses,
      previous.revenue - previous.expenses,
    ),
    polarity: "up-good",
    note: "Revenue less expenses",
    series: last6(netByMonth).map((m) => m.net),
  },
];

/** Operating margin for the current month, shown in the cash flow view. */
export const operatingMargin =
  ((current.revenue - current.expenses) / current.revenue) * 100;

/* -------------------------------------------------------------------------- */
/* Spending categories — September, summing to the month's expenses            */
/* -------------------------------------------------------------------------- */

export type Category = {
  name: string;
  short: string;
  amount: number;
  delta: number;
  /** Position in the categorical ramp, 0 being the strongest. */
  tone: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

export const categories: Category[] = [
  {
    name: "Payroll & contractors",
    short: "Payroll",
    amount: 28_450,
    delta: 3.2,
    tone: 0,
  },
  {
    name: "Materials & inventory",
    short: "Materials",
    amount: 9_640,
    delta: 6.1,
    tone: 1,
  },
  {
    name: "Rent & utilities",
    short: "Rent",
    amount: 7_900,
    delta: 0,
    tone: 2,
  },
  {
    name: "Software & subscriptions",
    short: "Software",
    amount: 6_180,
    delta: 18.4,
    tone: 3,
  },
  { name: "Marketing", short: "Marketing", amount: 4_320, delta: -8.5, tone: 4 },
  {
    name: "Professional services",
    short: "Professional",
    amount: 2_850,
    delta: 12,
    tone: 5,
  },
  {
    name: "Travel & meals",
    short: "Travel",
    amount: 1_780,
    delta: -21.4,
    tone: 6,
  },
  { name: "Insurance", short: "Insurance", amount: 1_450, delta: 0, tone: 7 },
  { name: "Other", short: "Other", amount: 1_550, delta: 4.2, tone: 8 },
];

/** Derived total — equals the current month's expenses by construction. */
export const categoryTotal = categories.reduce((s, c) => s + c.amount, 0);

/* -------------------------------------------------------------------------- */
/* Transactions                                                                */
/* -------------------------------------------------------------------------- */

export type Transaction = {
  date: string;
  merchant: string;
  category: string;
  account: string;
  amount: number;
  status: "cleared" | "pending";
};

export const transactions: Transaction[] = [
  {
    date: "Sep 17",
    merchant: "Ashford Dental Group",
    category: "Client payment",
    account: "Operating ••4471",
    amount: 8_400,
    status: "cleared",
  },
  {
    date: "Sep 17",
    merchant: "Sabre Logistics",
    category: "Materials & inventory",
    account: "Card ••2214",
    amount: -2_480,
    status: "cleared",
  },
  {
    date: "Sep 16",
    merchant: "Northwind Cloud",
    category: "Software & subscriptions",
    account: "Card ••2214",
    amount: -489,
    status: "cleared",
  },
  {
    date: "Sep 16",
    merchant: "Kestrel Card payment",
    category: "Transfer",
    account: "Operating ••4471",
    amount: -6_000,
    status: "cleared",
  },
  {
    date: "Sep 15",
    merchant: "Brightfold Co.",
    category: "Client payment",
    account: "Operating ••4471",
    amount: 12_750,
    status: "cleared",
  },
  {
    date: "Sep 15",
    merchant: "Payroll run 09/15",
    category: "Payroll & contractors",
    account: "Operating ••4471",
    amount: -14_225,
    status: "cleared",
  },
  {
    date: "Sep 14",
    merchant: "Harbor Insurance",
    category: "Insurance",
    account: "Operating ••4471",
    amount: -725,
    status: "pending",
  },
  {
    date: "Sep 12",
    merchant: "Riverbend Rent, Unit 4",
    category: "Rent & utilities",
    account: "Operating ••4471",
    amount: -3_950,
    status: "cleared",
  },
  {
    date: "Sep 11",
    merchant: "Ledgerline payout",
    category: "Merchant payout",
    account: "Merchant ••5502",
    amount: 4_182.6,
    status: "cleared",
  },
  {
    date: "Sep 10",
    merchant: "Tessellate Design",
    category: "Professional services",
    account: "Card ••2214",
    amount: -1_400,
    status: "cleared",
  },
];

/* -------------------------------------------------------------------------- */
/* Alerts and written insights                                                 */
/* -------------------------------------------------------------------------- */

export type Alert = {
  tone: "watch" | "info" | "good";
  title: string;
  body: string;
  when: string;
};

export const alerts: Alert[] = [
  {
    tone: "watch",
    title: "Software spending up 18.4%",
    body: "Three subscriptions were added since August. Software is now 9.6% of monthly expenses.",
    when: "2h ago",
  },
  {
    tone: "info",
    title: "Possible duplicate charge",
    body: "Northwind Cloud charged $489.00 twice on Sep 16.",
    when: "Yesterday",
  },
  {
    tone: "good",
    title: "Sixth positive month in a row",
    body: "Net cash flow has stayed above zero since April.",
    when: "Sep 15",
  },
];

export const insights: string[] = [
  "Revenue is up 7.2% on August and is the strongest month in your last twelve.",
  "Software spending has risen three months running, from 7.4% to 9.6% of expenses.",
  "At the current run rate, the operating account covers roughly three months of expenses.",
];

/* -------------------------------------------------------------------------- */
/* Reports                                                                     */
/* -------------------------------------------------------------------------- */

export const reports = [
  { name: "Profit & loss", range: "Sep 1 – Sep 18, 2026", format: "PDF" },
  { name: "Cash flow summary", range: "Last 12 months", format: "PDF" },
  { name: "Expenses by category", range: "September 2026", format: "CSV" },
  { name: "Month-end overview", range: "August 2026", format: "PDF" },
  { name: "Budget vs actual", range: "Q3 2026", format: "CSV" },
  { name: "Tax summary", range: "2026 year to date", format: "PDF" },
] as const;
