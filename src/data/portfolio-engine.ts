import type { Tier } from "./tiers";

export type EvidenceTone = Extract<Tier, "edge" | "services" | "security">;
export type FactTone = Extract<Tier, "edge" | "services">;
export type EvidencePanelKind = "correlation" | "allocation" | "sharpe";

export type EvidenceFact = {
  emphasis: string;
  text: string;
  tone: FactTone;
};

export type EvidenceCard = {
  id: string;
  index: string;
  eyebrow: string;
  tone: EvidenceTone;
  title: string;
  description: string;
  panel: EvidencePanelKind;
  facts: readonly EvidenceFact[];
};

export type CorrelationCell = "strong" | "medium" | "soft" | "cross";

export type CorrelationRow = {
  symbol: string;
  tier: Extract<Tier, "edge" | "services">;
  cells: readonly CorrelationCell[];
};

export type AllocationLegendItem = {
  tone: Extract<Tier, "edge" | "services">;
  label: string;
};

export type AllocationHolding = {
  symbol: string;
  weight: number;
  risk: number;
};

export type EvaluationTone = "edge" | "services" | "muted";

export type EvaluationStrategy = {
  name: string;
  value: number;
  tone: EvaluationTone;
};

export type PortfolioStackItem = {
  label: string;
  tier: Extract<Tier, "edge" | "services" | "data">;
};

export type PortfolioLink = {
  label: string;
  href: string;
  icon: string;
  variant: "primary" | "secondary";
};

export const portfolioEngine = {
  meta: {
    featured: "FEATURED PROJECT",
    name: "PORTFOLIO CONSTRUCTION ENGINE",
    projectIndex: 2,
    projectCount: 3,
    chips: ["Quantitative engine", "Hierarchical clustering", "HRP allocation"],
  },
  titleLines: [
    "Turning asset relationships",
    "into risk-aware portfolio allocations.",
  ],
  subtitle:
    "Rather than ranking stocks in isolation, the engine groups assets by how their returns move together, then uses those relationships to build a constrained portfolio. Its allocations are evaluated against simpler strategies on later market data.",
  cards: [
    {
      id: "asset-relationships",
      index: "01",
      eyebrow: "ASSET RELATIONSHIPS",
      tone: "edge",
      title: "How assets connect",
      description:
        "Groups stocks by how closely their returns move together, revealing relationships that guide portfolio construction.",
      panel: "correlation",
      facts: [
        { emphasis: "12 → 6", text: "stocks pass the screen", tone: "edge" },
        {
          emphasis: "Signed distance",
          text: "keeps hedges apart",
          tone: "services",
        },
      ],
    },
    {
      id: "portfolio-allocation",
      index: "02",
      eyebrow: "PORTFOLIO ALLOCATION",
      tone: "services",
      title: "From hierarchy to allocation",
      description:
        "The resulting structure guides how capital is distributed, while revealing how much risk each holding contributes.",
      panel: "allocation",
      facts: [
        {
          emphasis: "5–30%",
          text: "weight bounds per asset",
          tone: "edge",
        },
        {
          emphasis: "No inversion",
          text: "of the covariance matrix",
          tone: "services",
        },
      ],
    },
    {
      id: "out-of-sample",
      index: "03",
      eyebrow: "OUT-OF-SAMPLE EVALUATION",
      tone: "security",
      title: "Does the allocation hold up?",
      description:
        "Each portfolio is tested on later market data and compared with simpler allocation strategies across multiple historical periods.",
      panel: "sharpe",
      facts: [],
    },
  ] satisfies readonly EvidenceCard[],
  correlation: {
    matrixLabel: "CORRELATION",
    hierarchyLabel: "HIERARCHY",
    rows: [
      {
        symbol: "ABBV",
        tier: "edge",
        cells: ["strong", "medium", "soft", "cross", "cross", "cross"],
      },
      {
        symbol: "MRK",
        tier: "edge",
        cells: ["medium", "strong", "medium", "cross", "cross", "cross"],
      },
      {
        symbol: "JNJ",
        tier: "edge",
        cells: ["soft", "medium", "strong", "cross", "cross", "cross"],
      },
      {
        symbol: "CVX",
        tier: "services",
        cells: ["cross", "cross", "cross", "strong", "medium", "soft"],
      },
      {
        symbol: "JPM",
        tier: "services",
        cells: ["cross", "cross", "cross", "medium", "strong", "medium"],
      },
      {
        symbol: "WMT",
        tier: "services",
        cells: ["cross", "cross", "cross", "soft", "medium", "strong"],
      },
    ] satisfies readonly CorrelationRow[],
    note: "Schematic · illustrative structure",
    summary:
      "Schematic correlation matrix of ABBV, MRK, JNJ, CVX, JPM, and WMT. Two groups of three stocks show stronger within-group correlation, while relationships between the groups are weaker. The hierarchy joins each group before the final merge.",
  },
  allocation: {
    legend: [
      { tone: "edge", label: "Capital weight" },
      { tone: "services", label: "Risk contribution" },
    ] satisfies readonly AllocationLegendItem[],
    holdings: [
      { symbol: "JNJ", weight: 21.8, risk: 18.9 },
      { symbol: "WMT", weight: 17.9, risk: 16.4 },
      { symbol: "CVX", weight: 17.1, risk: 17.7 },
      { symbol: "MRK", weight: 15.7, risk: 18.0 },
      { symbol: "JPM", weight: 15.3, risk: 15.7 },
      { symbol: "ABBV", weight: 12.2, risk: 13.3 },
    ] satisfies readonly AllocationHolding[],
  },
  evaluation: {
    label: "MEDIAN OUT-OF-SAMPLE SHARPE",
    strategies: [
      { name: "HRP (this engine)", value: 0.502, tone: "edge" },
      { name: "Equal weight", value: 0.456, tone: "muted" },
      { name: "Inverse volatility", value: 0.521, tone: "services" },
    ] satisfies readonly EvaluationStrategy[],
    note: "16 folds · No transaction costs · Gap within noise",
  },
  stack: [
    { label: "Python 3.11–3.13", tier: "edge" },
    { label: "NumPy · SciPy", tier: "services" },
    { label: "Hypothesis", tier: "services" },
    { label: "Ruff · Pyright", tier: "data" },
    { label: "GitHub Actions", tier: "data" },
  ] satisfies readonly PortfolioStackItem[],
  links: [
    {
      label: "GitHub repository",
      href: "https://github.com/andresbetov/hierarchical-clustering-portfolio-selector",
      icon: "github",
      variant: "secondary",
    },
    {
      label: "Try in Codespaces",
      href: "https://codespaces.new/andresbetov/hierarchical-clustering-portfolio-selector",
      icon: "monitor",
      variant: "primary",
    },
  ] satisfies readonly PortfolioLink[],
  footnote:
    "Research and education instrument, not investment advice · All results belong to the 10 September 2026 historical snapshot · Survivorship bias and no transaction costs.",
} as const;
