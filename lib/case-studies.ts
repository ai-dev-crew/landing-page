export type CaseStudy = {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
};

export const CASE_STUDY_NOTE =
  "Illustrative, anonymized examples. Client names are withheld.";

export const caseStudies: CaseStudy[] = [
  {
    id: "retail-support",
    client: "A Fortune 500 retailer",
    industry: "Retail",
    challenge:
      "Customer support queues spiked every holiday season and response times slipped past 24 hours.",
    solution:
      "A multi-agent team: a triage agent routes tickets, a resolution agent drafts answers from order data, and a QA agent checks tone and policy before anything is sent.",
    results: [
      "68% of tickets resolved without a human",
      "First response time cut from 24 hours to 4 minutes",
    ],
  },
  {
    id: "bank-compliance",
    client: "A Fortune 500 financial services firm",
    industry: "Financial services",
    challenge:
      "Analysts spent most of their week gathering documents for KYC and compliance reviews.",
    solution:
      "An AI employee collects and cross-checks documents, flags gaps, and hands analysts a review-ready file with sources cited.",
    results: [
      "Review preparation time down 55%",
      "Zero missed filing deadlines in the first two quarters",
    ],
  },
  {
    id: "logistics-ops",
    client: "A Fortune 500 logistics company",
    industry: "Logistics",
    challenge:
      "Dispatchers reconciled carrier updates, invoices and exceptions across five systems by hand.",
    solution:
      "Orchestrated agents monitor carrier feeds, match invoices to shipments, and escalate only true exceptions to a dispatcher.",
    results: [
      "40 hours of manual reconciliation saved per week",
      "Invoice disputes down 30%",
    ],
  },
];
