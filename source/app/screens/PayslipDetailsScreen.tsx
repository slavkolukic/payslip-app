import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Theme } from "@/core/types";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { usePayslip } from "@/features/payslip/hooks";
import { Text } from "@/core/components";
import { useStyles } from "@/core/hooks";
import { formatDate } from "@/core/utils/formatDate";

type Props = NativeStackScreenProps<RootStackParamList, "PayslipDetails">;

export const PayslipDetailsScreen: FC<Props> = ({ route }) => {
  const { payslipId } = route.params;
  const styles = useStyles(createStyles);
  const { payslip, loading } = usePayslip(payslipId);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingWrap}>
          <Text textColor="textMuted">Loading payslip…</Text>
        </View>
      </View>
    );
  }

  if (!payslip) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingWrap}>
          <Text textColor="textMuted">Payslip not found.</Text>
        </View>
      </View>
    );
  }

  const fromLabel = formatDate(payslip.fromDate, "long");
  const toLabel = formatDate(payslip.toDate, "long");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerBlock}>
          <Text variant="title">Payslip overview</Text>
          <Text variant="caption" textColor="textMuted">
            ID: {payslip.id}
          </Text>
        </View>

        <View style={styles.row}>
          <Text variant="caption" textColor="textMuted">
            From
          </Text>
          <Text variant="body">{fromLabel}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Text variant="caption" textColor="textMuted">
            To
          </Text>
          <Text variant="body">{toLabel}</Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.bgDark,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    loadingWrap: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      backgroundColor: theme.colors.bg,
      borderRadius: 16,
      paddingHorizontal: 20,
      paddingVertical: 18,
      shadowColor: "#000",
      shadowOpacity: theme.isDark ? 0.25 : 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 12,
      elevation: 2,
      gap: 12,
    },
    headerBlock: {
      marginBottom: 4,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.colors.border,
      opacity: 0.6,
    },
  });
