import { RootStackParamList } from "@/core/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PayslipsScreen, SettingsScreen } from "../screens";
import { RALEWAY } from "@/core/constants";
import { useTheme } from "@/core/hooks";
import { AppHeader } from "@/core/components";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const DefaultScreen = () => null;

export const RootStackNavigator = () => {
  const { theme } = useTheme();
  return (
    <RootStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: RALEWAY.SEMI_BOLD,
          fontSize: 18,
          color: theme.colors.text,
        },
        header: (props) => <AppHeader {...props} />,
      }}
    >
      <RootStack.Screen name="Payslips" component={PayslipsScreen} />
      <RootStack.Screen name="PayslipDetail" component={DefaultScreen} />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
    </RootStack.Navigator>
  );
};
