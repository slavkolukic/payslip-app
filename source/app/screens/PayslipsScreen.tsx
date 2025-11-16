import { RootStackParamList, Theme } from "@/core/types";
import { Text } from "@/core/components";
import { useStyles } from "@/core/hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { usePayslips } from "@/features/payslip/hooks";
import { PayslipList } from "@/features/payslip/components";

type Props = NativeStackScreenProps<RootStackParamList, "Payslips">;

export const PayslipsScreen: FC<Props> = () => {
  const styles = useStyles(createStyles);

  const { payslips, loading } = usePayslips();

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingWrap}>
          <Text textColor="textMuted">Loading payslips…</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PayslipList payslips={payslips} />
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.bgDark,
    },
    loadingWrap: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
