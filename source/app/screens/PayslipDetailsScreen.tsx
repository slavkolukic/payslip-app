import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/core/types";
import { FC } from "react";
import { usePayslip } from "@/features/payslip/hooks";
import { Text } from "@/core/components";

type Props = NativeStackScreenProps<RootStackParamList, "PayslipDetails">;

export const PayslipDetailsScreen: FC<Props> = ({ route }) => {
  const { payslipId } = route.params;

  const { payslip, loading } = usePayslip(payslipId);

  if (loading) {
    return <Text>Loading payslip details…</Text>;
  }

  return <Text>Payslip Details {payslip?.toDate}</Text>;
};
