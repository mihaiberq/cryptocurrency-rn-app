import * as React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import styled, { useTheme } from "styled-components";

import { constants } from "../constants";
const { marketTabs } = constants;

const Container = styled(View)`
  flex-direction: row;
`;

const TabBar = styled(View)`
  margin-top: ${(p) => p.theme.SIZES.radius}px;
  margin-horizontal: ${(p) => p.theme.SIZES.radius}px;
  border-radius: ${(p) => p.theme.SIZES.radius}px;
  background-color: ${(p) => p.theme.COLORS.gray};
`;

const TabButton = styled(TouchableOpacity)`
  flex: 1;
`;

const Tab = styled(View)`
  height: 40px;
  padding-horizontal: 15px;
  align-items: center;
  justify-content: center;
`;

const TabIndicator = styled(Animated.View)`
  position: absolute;
  left: 0;
  height: 100%;
  width: ${(p) => (p.theme.SIZES.width - p.theme.SIZES.radius * 2) / 2}px;
  border-radius: ${(p) => p.theme.SIZES.radius}px
  background-color: ${(p) => p.theme.COLORS.lightGray};
`;

export default function Tabs({
  scrollX,
  scrollViewRef,
}: {
  scrollX: Animated.Value;
}): React.ReactElement {
  const theme = useTheme();
  const [isLayoutReady, setIsReady] = React.useState(false);
  const measuredLayout = React.useRef<number[]>([]);
  const containerRef = React.useRef<React.Ref<View> | undefined>().current;

  const inputRange = marketTabs.map((_, i) => i * theme.SIZES.width);

  return (
    <TabBar>
      {isLayoutReady && (
        <TabIndicator
          style={{
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange,
                  outputRange: measuredLayout.current,
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        />
      )}
      <Container ref={containerRef}>
        {marketTabs.map((item, index) => {
          return (
            <TabButton
              key={`MarketTab-${index}`}
              onLayout={({
                nativeEvent: {
                  layout: { x },
                },
              }) => {
                measuredLayout.current[index] = x;
                if (index === marketTabs.length - 1 && !isLayoutReady) {
                  setIsReady(true);
                }
              }}
              onPress={() => {
                scrollViewRef?.current?.scrollToOffset({
                  offset: index * theme.SIZES.width,
                });
              }}
            >
              <Tab>
                <Text style={[theme.FONTS.h3, { color: theme.COLORS.white }]}>
                  {item.title}
                </Text>
              </Tab>
            </TabButton>
          );
        })}
      </Container>
    </TabBar>
  );
}
