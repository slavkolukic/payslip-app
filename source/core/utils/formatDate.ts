import dayjs from "dayjs";

/**
 * Formats a date into a human-friendly string.
 * - short: "1 Jan 2024"
 * - long: "July 8 2011"
 * Returns empty string for invalid inputs.
 */
export const formatDate = (
  input: string | number | Date,
  style: "short" | "long" = "short"
): string => {
  const d = dayjs(input);
  if (!d.isValid()) return "";
  const pattern = style === "long" ? "MMMM D YYYY" : "D MMM YYYY";
  return d.format(pattern);
};
