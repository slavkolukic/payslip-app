import { FC } from "react";
import { Payslip } from "../types";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { useStyles } from "@/core/hooks";
import { Theme } from "@/core/types";
import { PayslipListItem } from "./PayslipListItem";

type Props = {
  payslips: Payslip[];
  onPayslipPress?: (payslipId: string) => void;
};

export const PayslipList: FC<Props> = ({ payslips, onPayslipPress }) => {
  const styles = useStyles(createStyles);

  const renderItem: ListRenderItem<Payslip> = ({ item, index }) => (
    <PayslipListItem
      fromDate={item.fromDate}
      toDate={item.toDate}
      index={index}
      onPress={() => onPayslipPress?.(item.id)}
    />
  );

  return (
    <FlatList
      data={payslips}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={View}
      ListHeaderComponentStyle={styles.listHeading}
    />
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    listHeading: {
      height: 16,
    },
    listContent: {
      paddingHorizontal: 12,
      paddingBottom: 46,
    },
    separator: {
      height: 12,
    },
  });
};
