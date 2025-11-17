import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Theme } from "@/core/types";
import { FC, useMemo, useState } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { usePayslip } from "@/features/payslip/hooks";
import { Button, LoadingIndicator, Text } from "@/core/components";
import { useStyles } from "@/core/hooks";
import { formatDate } from "@/core/utils/formatDate";
import { downloadFile, getBundledAssetUrl } from "@/core/services/files";

type Props = NativeStackScreenProps<RootStackParamList, "PayslipDetails">;

export const PayslipDetailsScreen: FC<Props> = ({ route }) => {
  const { payslipId } = route.params;
  const styles = useStyles(createStyles);
  const { payslip, loading } = usePayslip(payslipId);
  const [downloading, setDownloading] = useState(false);

  const file = payslip?.file;

  const fileTypeLabel = useMemo(() => {
    if (!file) return "Not available";
    if (file.mimeType === "application/pdf") return "PDF document";
    if (file.mimeType.startsWith("image/")) return "Image";
    return file.mimeType;
  }, [file]);

  const handleDownload = async () => {
    if (!file) return;
    const url = await getBundledAssetUrl(file.assetModuleId);

    downloadFile(url, file.filename, file.mimeType, {
      onBegin: () => setDownloading(true),
      onError: () => setDownloading(false),
      onComplete: () => setDownloading(false),
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
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
        <View style={styles.separator} />

        <View style={styles.row}>
          <Text variant="caption" textColor="textMuted">
            File name
          </Text>
          <Text variant="body" numberOfLines={1}>
            {file?.filename ?? "No file attached"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text variant="caption" textColor="textMuted">
            File type
          </Text>
          <Text variant="body">{fileTypeLabel}</Text>
        </View>
      </View>
      <Button
        style={styles.downloadButton}
        iconName="download-outline"
        label="Download payslip"
        variant="primary"
        loading={downloading}
        onPress={handleDownload}
        disabled={!file}
      />
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
    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
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
    fileHeaderRow: {
      marginTop: 4,
      marginBottom: 4,
    },
    downloadButton: {
      marginTop: 16,
      alignSelf: "flex-start",
    },
  });
