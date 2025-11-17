import { useEffect, useMemo, useState } from "react";
import { usePayslipStore } from "../store";

export const usePayslip = (payslipId: string) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const payslips = usePayslipStore((state) => state.payslips);

  /**
   * Simulate a network request to fetch payslip details
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus("success");
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  const payslip = useMemo(() => {
    return payslips.find((payslip) => payslip.id === payslipId);
  }, [payslips, payslipId]);

  return { payslip, status, loading: status === "loading" };
};
