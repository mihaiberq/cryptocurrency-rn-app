import * as React from "react";
import { View, Text, Image, FlatList, Animated } from "react-native";
import { useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";
import { LineChart } from "react-native-chart-kit";

import MainLayout from "./MainLayout";
import { Header, Tabs, TextButton } from "../components";

import { constants, icons } from "../constants";

const { marketTabs } = constants;

const Container = styled(View)`
  flex: 1;
  background-color: ${(p) => p.theme.COLORS.black};
`;

const SortButtonContainer = styled(View)`
  flex-direction: row;
  margin-top: ${(p) => p.theme.SIZES.radius}px;
  margin-horizontal: ${(p) => p.theme.SIZES.radius}px;
`;

const FlatListItemContainer = styled(View)`
  flex: 1;
  width: ${(p) => p.theme.SIZES.width}px;
`;

const RowContainer = styled(View)`
  flex-direction: row;
  padding-horizontal: ${(p) => p.theme.SIZES.padding}px;
  margin-bottom: ${(p) => p.theme.SIZES.radius}px;
`;

const CoinContainer = styled(View)`
  flex: 1.5;
  flex-direction: row;
  align-items: center;
`;

const ChartContainer = styled(View)`
  flex: 1;
  align-items: center;
`;

const FiguresContainer = styled(View)`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
`;

const ArrowIcon = styled(Image)`
  width: 10px;
  height: 10px;
  tint-color: ${(p) =>
    p.changePercentage >= 0 ? p.theme.COLORS.lightGreen : p.theme.COLORS.red};
  transform: ${(p) =>
    p.changePercentage >= 0 ? "rotate(45deg)" : "rotate(125deg)"};
`;

export default function Market(): React.ReactElement {
  const theme = useTheme();
  const coins = useSelector((state) => state.marketReducer.coins);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const horizontalScrollViewRef = React.useRef();

  function renderSortButtons() {
    return (
      <SortButtonContainer>
        <TextButton label="USD" onPress={() => {}} />
        <TextButton
          containerStyle={{ marginLeft: theme.SIZES.base }}
          label="% (7d)"
          onPress={() => {}}
        />
        <TextButton
          containerStyle={{ marginLeft: theme.SIZES.base }}
          label="Top"
          onPress={() => {}}
        />
      </SortButtonContainer>
    );
  }

  function renderList() {
    return (
      <Animated.FlatList
        ref={horizontalScrollViewRef}
        data={marketTabs}
        horizontal
        contentContainerStyle={{ marginTop: theme.SIZES.padding }}
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.title}-${item.id}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={() => {
          return (
            <FlatListItemContainer>
              <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  const color =
                    item.price_change_percentage_7d_in_currency >= 0
                      ? theme.COLORS.lightGreen
                      : theme.COLORS.red;
                  return (
                    <RowContainer>
                      {/** Coins */}
                      <CoinContainer>
                        <Image
                          source={{ uri: item.image }}
                          style={{ width: 20, height: 20 }}
                        />
                        <Text
                          style={[
                            theme.FONTS.h3,
                            {
                              color: theme.COLORS.white,
                              marginLeft: theme.SIZES.radius,
                            },
                          ]}
                        >
                          {item.name}
                        </Text>
                      </CoinContainer>
                      {/** Chart */}
                      <ChartContainer>
                        <LineChart
                          withVerticalLabels={false}
                          withHorizontalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          data={{
                            datasets: [{ data: item.sparkline_in_7d.price }],
                          }}
                          width={100}
                          height={100}
                          chartConfig={{ color: () => color }}
                          bezier
                          style={{
                            paddingRight: 0,
                          }}
                        />
                      </ChartContainer>
                      {/** Figures */}

                      <FiguresContainer>
                        <Text
                          style={[
                            theme.FONTS.h4,
                            { color: theme.COLORS.white },
                          ]}
                        >
                          $ {item.current_price}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <ArrowIcon
                            changePercentage={
                              item.price_change_percentage_7d_in_currency
                            }
                            source={icons.upArrow}
                          />
                          <Text
                            style={[
                              theme.FONTS.body5,
                              { color, marginLeft: 5 },
                            ]}
                          >
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )}
                            %
                          </Text>
                        </View>
                      </FiguresContainer>
                    </RowContainer>
                  );
                }}
              />
            </FlatListItemContainer>
          );
        }}
      />
    );
  }

  return (
    <MainLayout>
      <Container>
        <Header text="Market" />
        <Tabs scrollX={scrollX} scrollViewRef={horizontalScrollViewRef} />
        {renderSortButtons()}
        {renderList()}
      </Container>
    </MainLayout>
  );
}
