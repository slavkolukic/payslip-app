import { RootStackParamList } from "@/core/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  PayslipDetailsScreen,
  PayslipsScreen,
  SettingsScreen,
} from "../screens";
import { useTheme } from "@/core/hooks";
import { AppHeader } from "@/core/components";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  const { theme } = useTheme();
  return (
    <RootStack.Navigator
      screenOptions={{
        header: (props) => <AppHeader {...props} />,
        contentStyle: { backgroundColor: theme.colors.bgDark },
      }}
    >
      <RootStack.Screen name="Payslips" component={PayslipsScreen} />
      <RootStack.Screen
        options={{ headerTitle: "Payslip Details" }}
        name="PayslipDetails"
        component={PayslipDetailsScreen}
      />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
    </RootStack.Navigator>
  );
};
