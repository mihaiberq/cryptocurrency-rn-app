import * as React from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  ViewStyle,
  ImageSourcePropType,
  GestureResponderEvent,
} from "react-native";
import styled, { useTheme } from "styled-components";

const Button = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: ${(p) => p.theme.SIZES.radius}px;
  background-color: ${(p) => p.theme.COLORS.white};
`;

const StyledImage = styled(Image)`
  width: 20px;
  height: 20px;
`;

const StyledText = styled(Text)`
  margin-left: ${(p) => p.theme.SIZES.base}px;
`;

export default function IconTextButton({
  label,
  icon,
  containerStyle,
  onPress,
}: {
  label: string;
  icon: ImageSourcePropType;
  onPress: (e: GestureResponderEvent) => void;
  containerStyle?: ViewStyle;
}): React.ReactElement {
  return (
    <Button style={containerStyle} onPress={onPress}>
      <StyledImage source={icon} resizeMode="contain" />
      <StyledText>{label}</StyledText>
    </Button>
  );
}
