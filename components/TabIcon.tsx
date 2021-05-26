import * as React from "react";
import styled, { useTheme } from "styled-components";
import {
  View,
  Text,
  Image,
  ImageStyle,
  ImageSourcePropType,
} from "react-native";

type Props = {
  focused: boolean;
  icon: ImageSourcePropType;
  label: string;
  isTrade?: boolean;
  iconStyle?: ImageStyle;
};

const Container = styled(View)`
  justify-content: center;
  align-items: center;
`;

const TradeContainer = styled(View)`
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 60px;
  height: 60px;
  background-color: ${(p) => p.theme.COLORS.black};
`;

const StyledText = styled(Text)`
  color: ${(p) =>
    p.focused ? p.theme.COLORS.white : p.theme.COLORS.secondary};
`;

const StyledImage = styled(Image)`
  width: 25px;
  height: 25px;
`;

export default function TabIcon({
  isTrade = false,
  focused,
  icon,
  label,
  iconStyle,
}: Props): React.ReactElement {
  const theme = useTheme();
  if (isTrade) {
    return (
      <TradeContainer>
        <StyledImage
          style={[
            iconStyle,
            {
              tintColor: theme.COLORS.white,
            },
          ]}
          source={icon}
          resizeMode="contain"
        />
        <StyledText style={[theme.FONTS.h4, { color: theme.COLORS.white }]}>
          {label}
        </StyledText>
      </TradeContainer>
    );
  }
  return (
    <Container>
      <StyledImage
        style={[
          iconStyle,
          { tintColor: focused ? theme.COLORS.white : theme.COLORS.secondary },
        ]}
        source={icon}
        resizeMode={"contain"}
      />
      <StyledText style={theme.FONTS.h4} focused={focused}>
        {label}
      </StyledText>
    </Container>
  );
}
