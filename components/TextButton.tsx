import * as React from "react";
import {
  Text,
  TouchableOpacity,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";
import styled, { useTheme } from "styled-components";

const Button = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  padding-vertical: 3px;
  padding-horizontal: 18px;
  border-radius: 15px;
  background-color: ${(p) => p.theme.COLORS.gray1};
`;

const StyledText = styled(Text)`
  color: ${(p) => p.theme.COLORS.white};
`;

export default function TextButton({
  label,
  containerStyle,
  onPress,
}: {
  label: string;
  onPress: (e: GestureResponderEvent) => void;
  containerStyle?: ViewStyle;
}): React.ReactElement {
  const theme = useTheme();
  return (
    <Button style={containerStyle} onPress={onPress}>
      <StyledText style={theme.FONTS.h3}>{label}</StyledText>
    </Button>
  );
}
