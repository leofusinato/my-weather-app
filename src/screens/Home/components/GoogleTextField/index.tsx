import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";

// import { useCities } from "../../../../contexts/CitiesProvider";

import { theme } from "../../../../global/styles";
import { styles } from "./styles";
import useCities from "../../../../stores/cities";

export function GoogleTextField() {
  const { findCity } = useCities((state) => state.actions);

  const inputRef = useRef<GooglePlacesAutocompleteRef>(null);

  return (
    <GooglePlacesAutocomplete
      ref={inputRef}
      placeholder="Digite o nome da cidade"
      fetchDetails
      minLength={3}
      enablePoweredByContainer={false}
      renderRightButton={() =>
        inputRef.current?.getAddressText().length ? (
          <TouchableOpacity
            onPress={() => {
              inputRef.current?.clear();
              inputRef.current?.focus();
            }}
          >
            <Feather
              name="x"
              size={22}
              color={theme.colors.gray}
              style={{ marginTop: 10, marginLeft: 8 }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )
      }
      styles={styles}
      onPress={async (data, details) => await findCity(data, details)}
      query={{
        key: process.env.GOOGLE_PLACES_API_KEY,
        language: "pt-BR",
      }}
    />
  );
}
