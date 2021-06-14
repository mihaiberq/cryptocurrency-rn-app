import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
  Switch,
} from "react-native";
import styled, { useTheme } from "styled-components";
import { icons } from "../../constants";

const Button = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  height: 50px;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const RightArrow = styled(Image)`
  height: 15px;
  width: 15px;
  tint-color: ${(p) => p.theme.COLORS.white};
`;

const SwitchContainer = styled(View)`
  flex-direction: row;
  height: 50px;
  align-items: center;
`;

export default function SettingsRow({
  title,
  value,
  type,
  onPress,
}: {
  title: string;
  value: string | boolean;
  type: "button" | "switch";
  onPress: (e: GestureResponderEvent | boolean) => void;
}): React.ReactElement {
  const theme = useTheme();
  if (type === "button") {
    return (
      <Button onPress={onPress}>
        <Text style={[theme.FONTS.h3, { color: theme.COLORS.white, flex: 1 }]}>
          {title}
        </Text>

        <Row>
          <Text
            style={[
              theme.FONTS.h3,
              {
                marginRight: theme.SIZES.radius,
                color: theme.COLORS.lightGray3,
              },
            ]}
          >
            {value}
          </Text>
          <RightArrow source={icons.rightArrow} />
        </Row>
      </Button>
    );
  } else {
    return (
      <SwitchContainer>
        <Text style={[theme.FONTS.h3, { color: theme.COLORS.white, flex: 1 }]}>
          {title}
        </Text>
        <Switch value={!!value} onValueChange={(status) => onPress(status)} />
      </SwitchContainer>
    );
  }
}
