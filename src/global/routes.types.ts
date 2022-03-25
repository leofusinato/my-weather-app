import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { CityProps } from "./models/city";

export type AppStackParamList = {
  Home: undefined;
  CityDetails: { city: CityProps };
  Favorites: undefined;
};

export type HomeNavigationProps = {
  navigation: NativeStackNavigationProp<AppStackParamList, "Home">;
};

export type CityDetailsNavigationProps = {
  route: RouteProp<AppStackParamList, "CityDetails">;
  navigation: NativeStackNavigationProp<AppStackParamList, "CityDetails">;
};

export type FavoritesNavigationProps = {
  navigation: NativeStackNavigationProp<AppStackParamList, "Favorites">;
};
