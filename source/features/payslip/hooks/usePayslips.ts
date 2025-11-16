import { useEffect, useState } from "react";
import { usePayslipStore } from "../store";

export const usePayslips = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  const payslips = usePayslipStore((store) => store.payslips);

  /**
   * Simulate a network request to fetch payslips
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus("success");
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return { payslips, status, loading: status === "loading" };
};
