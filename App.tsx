import { NavigationContainer } from "@react-navigation/native";

import { CitiesProvider } from "./src/contexts/CitiesProvider";
import { StackRoutes } from "./src/routes/main";

export default function App() {
  return (
    <NavigationContainer>
      <CitiesProvider>
        <StackRoutes />
      </CitiesProvider>
    </NavigationContainer>
  );
}
