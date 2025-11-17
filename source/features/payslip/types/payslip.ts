import { PayslipFile } from "./payslipFile";

export type Payslip = {
  id: string;
  fromDate: string;
  toDate: string;
  file: PayslipFile;
};
