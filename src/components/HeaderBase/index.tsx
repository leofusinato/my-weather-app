import React, { ReactNode } from "react";

import { View } from "react-native";
import { styles } from "./styles";

type Props = {
  prefix: ReactNode;
  action?: ReactNode;
};

export default function HeaderBase({ prefix, action }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>{prefix}</View>
        <View>{action}</View>
      </View>
    </View>
  );
}
