import AppLoading from "expo-app-loading";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { NavigationContainer } from "@react-navigation/native";

import { CitiesProvider } from "./src/contexts/CitiesProvider";
import { StackRoutes } from "./src/routes/main";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <CitiesProvider>
        <StackRoutes />
      </CitiesProvider>
    </NavigationContainer>
  );
}
