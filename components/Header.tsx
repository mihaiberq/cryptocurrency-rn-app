import * as React from "react";
import { View, Text } from "react-native";
import styled, { useTheme } from "styled-components";

const Container = styled(View)`
  height: 100px;
  padding-horizontal: ${(p) => p.theme.SIZES.radius}px;
  justify-content: flex-end;
`;

export default function Header({ text }: { text: string }): React.ReactElement {
  const theme = useTheme();
  return (
    <Container>
      <Text style={[theme.FONTS.largeTitle, { color: theme.COLORS.white }]}>
        {text}
      </Text>
    </Container>
  );
}
