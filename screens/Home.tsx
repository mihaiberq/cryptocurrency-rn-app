import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { State } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import styled, { useTheme } from "styled-components";

import { getHoldings, getCoinMarket } from "../store/market/marketActions";

import { dummyData, icons } from "../constants";

import { MainLayout } from "./";

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(p) => p.theme.COLORS.black};
`;

export default function Home(): React.ReactElement {
  const myHoldings = useSelector((state) => state.marketReducer.myHoldings);
  const coins = useSelector((state) => state.marketReducer.coins);

  useFocusEffect(
    React.useCallback(() => {
      // getHoldings({ holdings: dummyData.holdings });
      // getCoinMarket();
    }, [])
  );

  return (
    <MainLayout>
      <Container>
        {/** Header - Waller Info */}

        {/** Chart */}

        {/** Top Cryptocurrencies */}
        <Text style={{ color: "#fff" }}>Home</Text>
      </Container>
    </MainLayout>
  );
}
