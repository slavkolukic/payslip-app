import { ACTIVE_OPACITY } from "@/core/constants";
import { FC, memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "@/core/components";
import { useStyles } from "@/core/hooks";
import { Theme } from "@/core/types";
import { formatDate } from "@/core/utils";

type Props = {
  fromDate: string;
  toDate: string;
};

export const PayslipListItem: FC<Props> = memo(({ fromDate, toDate }) => {
  const styles = useStyles(createStyles);

  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY.default}
      style={styles.itemContainer}
    >
      <View style={styles.itemLeft}>
        <Icon iconName="document-text-outline" size={22} />
      </View>
      <View style={styles.itemContent}>
        <Text variant="body">{`${formatDate(fromDate)} - ${formatDate(
          toDate
        )}`}</Text>
      </View>
      <View style={styles.itemRight}>
        <Icon iconName="chevron-forward" size={20} />
      </View>
    </TouchableOpacity>
  );
});

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 14,
      borderRadius: 12,
      backgroundColor: theme.colors.bg,
      shadowColor: "#000",
      shadowOpacity: theme.isDark ? 0.25 : 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 2,
    },
    itemLeft: {
      marginRight: 12,
    },
    itemContent: {
      flex: 1,
      justifyContent: "center",
    },
    itemRight: {
      marginLeft: 8,
    },
  });
};
