import * as React from "react";
import { View, Text } from "react-native";
import styled, { useTheme } from "styled-components";

const Row = styled(View)`
  margin-top: ${(p) => p.theme.SIZES.padding}px;
`;

export default function SectionTitle({
  title,
}: {
  title: string;
}): React.ReactElement {
  const theme = useTheme();
  return (
    <Row>
      <Text style={[theme.FONTS.h4, { color: theme.COLORS.lightGray3 }]}>
        {title}
      </Text>
    </Row>
  );
}
