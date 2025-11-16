import { create } from "zustand";
import { Payslip } from "../types";

const MOCK_PAYSLIPS: Payslip[] = [
  {
    id: "ps_2025_01",
    fromDate: "2025-01-01",
    toDate: "2025-01-31",
    file: null,
  },
  {
    id: "ps_2024_12",
    fromDate: "2024-12-01",
    toDate: "2024-12-31",
    file: null,
  },
  {
    id: "ps_2024_11",
    fromDate: "2024-11-01",
    toDate: "2024-11-30",
    file: null,
  },
  {
    id: "ps_2024_10",
    fromDate: "2024-10-01",
    toDate: "2024-10-31",
    file: null,
  },
  {
    id: "ps_2024_09",
    fromDate: "2024-09-01",
    toDate: "2024-09-30",
    file: null,
  },
  {
    id: "ps_2024_08",
    fromDate: "2024-08-01",
    toDate: "2024-08-31",
    file: null,
  },
  {
    id: "ps_2024_07",
    fromDate: "2024-07-01",
    toDate: "2024-07-31",
    file: null,
  },
  {
    id: "ps_2024_06",
    fromDate: "2024-06-01",
    toDate: "2024-06-30",
    file: null,
  },
  {
    id: "ps_2024_05",
    fromDate: "2024-05-01",
    toDate: "2024-05-31",
    file: null,
  },
  {
    id: "ps_2024_04",
    fromDate: "2024-04-01",
    toDate: "2024-04-30",
    file: null,
  },
  {
    id: "ps_2024_03",
    fromDate: "2024-03-01",
    toDate: "2024-03-31",
    file: null,
  },
  {
    id: "ps_2024_02",
    fromDate: "2024-02-01",
    toDate: "2024-02-29",
    file: null,
  },
  {
    id: "ps_2024_01",
    fromDate: "2024-01-01",
    toDate: "2024-01-31",
    file: null,
  },
  {
    id: "ps_2023_12",
    fromDate: "2023-12-01",
    toDate: "2023-12-31",
    file: null,
  },
  {
    id: "ps_2023_11",
    fromDate: "2023-11-01",
    toDate: "2023-11-30",
    file: null,
  },
  {
    id: "ps_2023_10",
    fromDate: "2023-10-01",
    toDate: "2023-10-31",
    file: null,
  },
  {
    id: "ps_2023_09",
    fromDate: "2023-09-01",
    toDate: "2023-09-30",
    file: null,
  },
];

type PayslipStore = {
  payslips: Payslip[];
  setPayslips: (payslips: Payslip[]) => void;
};

export const usePayslipStore = create<PayslipStore>((set) => ({
  payslips: MOCK_PAYSLIPS,
  setPayslips: (payslips) => set({ payslips }),
}));
