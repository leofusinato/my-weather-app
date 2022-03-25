import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "../global/routes.types";

import { CityDetails } from "../screens/CityDetails";
import { Favorites } from "../screens/Favorites";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator<AppStackParamList>();

const defaultOptions = {
  headerShown: false,
};

export const StackRoutes = () => (
  <Stack.Navigator initialRouteName={"Home"}>
    <Stack.Screen name="Home" component={Home} options={defaultOptions} />
    <Stack.Screen
      name="CityDetails"
      component={CityDetails}
      options={defaultOptions}
    />
    <Stack.Screen
      name="Favorites"
      component={Favorites}
      options={defaultOptions}
    />
  </Stack.Navigator>
);
