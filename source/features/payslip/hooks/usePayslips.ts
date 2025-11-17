import { useEffect, useState } from "react";
import { usePayslipStore } from "../store";

/**
 * Would ideally be a react query or apollo client wrapper
 */
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
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  return { payslips, status, loading: status === "loading" };
};
