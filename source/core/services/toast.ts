import Toast from "react-native-toast-message";
import { AppToastType } from "@/core/types";

type ShowToastParams = {
  text: string;
  type?: AppToastType;
  highlightText?: string;
  onPress?: () => void;
};

export const showToast = ({
  text,
  type = "default",
  highlightText,
  onPress,
}: ShowToastParams) => {
  Toast.show({
    type,
    text1: text,
    props: {
      highlightText,
      onPress,
    },
  });
};
