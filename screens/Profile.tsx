import * as React from "react";
import { View, Text } from "react-native";

import { MainLayout } from "./";

export default function Profile(): React.ReactElement {
  return (
    <MainLayout>
      <View>
        <Text>Profile</Text>
      </View>
    </MainLayout>
  );
}
