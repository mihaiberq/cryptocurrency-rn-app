import * as React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import styled, { useTheme } from "styled-components";

import { getHoldings, getCoinMarket } from "../store/market/marketActions";

import MainLayout from "./MainLayout";

import WalletInfo from "../components/Home/WalletInfo";
import Chart from "../components/Chart";

import { dummyData, icons } from "../constants";

const Container = styled(View)`
  flex: 1;
  background-color: ${(p) => p.theme.COLORS.black};
`;

const ArrowIcon = styled(Image)`
  width: 10px;
  height: 10px;
  tint-color: ${(p) =>
    p.changePercentage >= 0 ? p.theme.COLORS.lightGreen : p.theme.COLORS.red};
  transform: ${(p) =>
    p.changePercentage >= 0 ? "rotate(45deg)" : "rotate(125deg)"};
`;

export default function Home(): React.ReactElement {
  const theme = useTheme();
  const myHoldings = useSelector((state) => state.marketReducer.myHoldings);
  const coins = useSelector((state) => state.marketReducer.coins);

  const dispatch = useDispatch();

  const [selectedCoin, setSelectedCoin] = React.useState(coins[0]);

  const totalWallet = myHoldings.reduce(
    (total, holding) => total + (holding.total || 0),
    0
  );
  const valueChange = myHoldings.reduce(
    (total, holding) => total + (holding.holdingValueChange7d || 0),
    0
  );
  const changePercentage = (valueChange / (totalWallet - valueChange)) * 100;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getHoldings({ holdings: dummyData.holdings }));
      dispatch(getCoinMarket({ currency: "usd" }));
    }, [])
  );

  return (
    <MainLayout>
      <Container>
        {/** Header - Waller Info */}
        <WalletInfo
          displayAmount={totalWallet}
          changePercentage={changePercentage}
        />

        {/** Chart */}

        <Chart
          containerStyle={{
            marginTop: theme.SIZES.padding * 2,
          }}
          chartPrices={selectedCoin?.sparkline_in_7d.price}
        />

        {/** Top Cryptocurrencies */}
        <FlatList
          data={coins}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: theme.SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: theme.SIZES.radius }}>
              <Text
                style={[
                  theme.FONTS.h3,
                  { color: theme.COLORS.white, fontSize: 18 },
                ]}
              >
                Top Cryptocurrencies
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const color =
              item.price_change_percentage_7d_in_currency >= 0
                ? theme.COLORS.lightGreen
                : theme.COLORS.red;
            return (
              <TouchableOpacity
                onPress={() => setSelectedCoin(item)}
                style={{
                  height: 55,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/** Logo */}
                <View style={{ width: 25 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 20, height: 20 }}
                  />
                </View>

                {/** Name */}
                <View style={{ flex: 1 }}>
                  <Text style={[theme.FONTS.h3, { color: theme.COLORS.white }]}>
                    {item.name}
                  </Text>
                </View>
                {/** Figures */}
                <View>
                  <Text
                    style={[
                      theme.FONTS.h4,
                      { textAlign: "right", color: theme.COLORS.white },
                    ]}
                  >
                    $ {item.current_price}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <ArrowIcon
                      changePercentage={
                        item.price_change_percentage_7d_in_currency
                      }
                      source={icons.upArrow}
                    />

                    <Text
                      style={[theme.FONTS.body5, { color, lineHeight: 15 }]}
                    >
                      {" " +
                        item.price_change_percentage_7d_in_currency.toFixed(2)}
                      %
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={<View style={{ marginBottom: 50 }} />}
        />
      </Container>
    </MainLayout>
  );
}
