import { RootStackParamList } from "@/core/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Payslips" component={() => null} />
      <RootStack.Screen name="PayslipDetail" component={() => null} />
      <RootStack.Screen name="Settings" component={() => null} />
    </RootStack.Navigator>
  );
};
