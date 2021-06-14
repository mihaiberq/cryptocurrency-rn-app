import * as React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";

import MainLayout from "./MainLayout";
import { BalanceInfo, Chart } from "../components";
import { icons } from "../constants";

const Container = styled(View)`
  flex: 1;
  background-color: ${(p) => p.theme.COLORS.black};
`;

const CurrentBalanceContainer = styled(View)`
  padding-horizontal: ${(p) => p.theme.SIZES.padding}px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: ${(p) => p.theme.COLORS.gray};
`;

const ListHeaderContainer = styled(View)`
  flex-direction: row;
  margin-top: ${(p) => p.theme.SIZES.radius}px;
`;

const Button = styled(TouchableOpacity)`
  flex-direction: row;
  height: 55px;
  align-items: center;
`;

const ArrowIcon = styled(Image)`
  width: 10px;
  height: 10px;
  tint-color: ${(p) =>
    p.changePercentage >= 0 ? p.theme.COLORS.lightGreen : p.theme.COLORS.red};
  transform: ${(p) =>
    p.changePercentage >= 0 ? "rotate(45deg)" : "rotate(125deg)"};
`;

export default function Portfolio(): React.ReactElement {
  const theme = useTheme();
  const myHoldings = useSelector((state) => state.marketReducer.myHoldings);
  const [selectedCoin, setSelectedCoin] = React.useState(myHoldings[0]);

  const totalWallet = myHoldings.reduce(
    (total, holding) => total + (holding.total || 0),
    0
  );
  const valueChange = myHoldings.reduce(
    (total, holding) => total + (holding.holdingValueChange7d || 0),
    0
  );
  const changePercentage = (valueChange / (totalWallet - valueChange)) * 100;

  return (
    <MainLayout>
      <Container>
        {/** Header */}
        <CurrentBalanceContainer>
          <Text
            style={[
              theme.FONTS.largeTitle,
              { marginTop: 50, color: theme.COLORS.white },
            ]}
          >
            Portfolio
          </Text>

          <BalanceInfo
            title="Current Balance"
            displayAmount={totalWallet}
            changePercentage={changePercentage}
            containerStyle={{
              marginTop: theme.SIZES.radius,
              marginBottom: theme.SIZES.padding,
            }}
          />
        </CurrentBalanceContainer>

        {/** Chart */}
        <Chart
          containerStyle={{ marginTop: theme.SIZES.radius }}
          chartPrices={selectedCoin?.sparklineIn7d?.value}
        />
        {/** Assets */}

        <FlatList
          data={myHoldings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: theme.SIZES.padding,
            paddingHorizontal: theme.SIZES.padding,
          }}
          ListHeaderComponent={
            <View>
              <Text style={[theme.FONTS.h2, { color: theme.COLORS.white }]}>
                Your Assets
              </Text>
              <ListHeaderContainer>
                <Text style={{ flex: 1, color: theme.COLORS.lightGray3 }}>
                  Asset
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: theme.COLORS.lightGray3,
                    textAlign: "right",
                  }}
                >
                  Price
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: theme.COLORS.lightGray3,
                    textAlign: "right",
                  }}
                >
                  Holdings
                </Text>
              </ListHeaderContainer>
            </View>
          }
          renderItem={({ item }) => {
            const color =
              item.priceChangePercentage7dInCurrency >= 0
                ? theme.COLORS.lightGreen
                : theme.COLORS.red;
            return (
              <Button onPress={() => setSelectedCoin(item)}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
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
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={[
                      theme.FONTS.h4,
                      {
                        textAlign: "right",
                        color: theme.COLORS.white,
                        lineHeight: 15,
                      },
                    ]}
                  >
                    $ {item?.currentPrice?.toLocaleString()}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <ArrowIcon
                      changePercentage={item.priceChangePercentage7dInCurrency}
                      source={icons.upArrow}
                    />
                    <Text
                      style={[
                        theme.FONTS.body5,
                        { color, marginLeft: 5, lineHeight: 15 },
                      ]}
                    >
                      {item?.priceChangePercentage7dInCurrency?.toFixed(2)} %
                    </Text>
                  </View>
                </View>

                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={[
                      theme.FONTS.h4,
                      {
                        textAlign: "right",
                        color: theme.COLORS.white,
                        lineHeight: 15,
                      },
                    ]}
                  >
                    $ {item?.total?.toLocaleString()}
                  </Text>

                  <Text
                    style={[
                      theme.FONTS.body,
                      {
                        textAlign: "right",
                        color: theme.COLORS.lightGray3,
                        lineHeight: 15,
                      },
                    ]}
                  >
                    {item?.qty} {item?.symbol?.toUpperCase()}
                  </Text>
                </View>
              </Button>
            );
          }}
          ListFooterComponent={<View style={{ marginBottom: 50 }} />}
        />
      </Container>
    </MainLayout>
  );
}
