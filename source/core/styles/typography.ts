import { RALEWAY } from "../constants";
import { StyleSheet } from "react-native";

export const typography = StyleSheet.create({
  title: {
    fontFamily: RALEWAY.BOLD,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.15,
  },
  subtitle: {
    fontFamily: RALEWAY.SEMI_BOLD,
    fontSize: 16,
    lineHeight: 22,
  },
  body: {
    fontFamily: RALEWAY.REGULAR,
    fontSize: 16,
    lineHeight: 22,
  },
  caption: {
    fontFamily: RALEWAY.MEDIUM,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  button: {
    fontFamily: RALEWAY.SEMI_BOLD,
    fontSize: 16,
    lineHeight: 20,
  },
});
