import Toast from "react-native-toast-message";
import { AppToastType } from "@/core/types";

type ShowToastParams = {
  text: string;
  type?: AppToastType;
};

export const showToast = ({ text, type = "default" }: ShowToastParams) => {
  Toast.show({
    type,
    text1: text,
  });
};
