import * as React from "react";
import { View, Text, Image } from "react-native";
import styled, { useTheme } from "styled-components";
import { icons } from "../constants";

const Container = styled(View)`
  flex-direction: row;
  align-items: flex-end;
`;

const DisplayAmount = styled(Text)`
  color: ${(p) => p.theme.COLORS.white};
  margin-left: ${(p) => p.theme.SIZES.base}px;
`;

const ArrowIcon = styled(Image)`
  width: 10px;
  height: 10px;
  align-self: center;
  tint-color: ${(p) =>
    p.changePercentage >= 0 ? p.theme.COLORS.lightGreen : p.theme.COLORS.red};
  transform: ${(p) =>
    p.changePercentage >= 0 ? "rotate(45deg)" : "rotate(125deg)"};
`;

const PercentageText = styled(Text)`
  margin-left: ${(p) => p.theme.SIZES.base}px;
  align-self: center;
  color: ${(p) =>
    p.changePercentage >= 0 ? p.theme.COLORS.lightGreen : p.theme.COLORS.red};
`;

const DayChangeText = styled(Text)`
  margin-left: ${(p) => p.theme.SIZES.radius}px;
  align-self: flex-start;
  color: ${(p) => p.theme.COLORS.lightGray3};
`;

export default function BalanceInfo({
  title,
  displayAmount,
  changePercentage,
  containerStyle,
}): React.ReactElement {
  const theme = useTheme();
  return (
    <View style={[containerStyle]}>
      <Text style={[theme.FONTS.h3, { color: theme.COLORS.lightGray3 }]}>
        {title}
      </Text>
      <Container>
        <Text style={[theme.FONTS.h3, { color: theme.COLORS.lightGray3 }]}>
          $
        </Text>
        <DisplayAmount style={[theme.FONTS.h2]}>
          {displayAmount.toLocaleString()}
        </DisplayAmount>
        <Text style={[theme.FONTS.h3, { color: theme.COLORS.lightGray3 }]}>
          {" USD"}
        </Text>
      </Container>

      <Container>
        <ArrowIcon source={icons.upArrow} changePercentage={changePercentage} />
        <PercentageText changePercentage={changePercentage}>
          {changePercentage.toFixed(2)}%
        </PercentageText>
        <DayChangeText style={theme.FONTS.h5}>7d change</DayChangeText>
      </Container>
    </View>
  );
}
