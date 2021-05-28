import * as React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import styled, { useTheme } from "styled-components";

import { getHoldings, getCoinMarket } from "../store/market/marketActions";

import MainLayout from "./MainLayout";

import WalletInfo from "../components/Home/WalletInfo";

import { dummyData, icons } from "../constants";

const Container = styled(View)`
  flex: 1;
  background-color: ${(p) => p.theme.COLORS.black};
`;

export default function Home(): React.ReactElement {
  const myHoldings = useSelector((state) => state.marketReducer.myHoldings);
  const coins = useSelector((state) => state.marketReducer.coins);

  const dispatch = useDispatch();

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
      // dispatch(getHoldings({ holdings: dummyData.holdings }));
      // dispatch(getCoinMarket());
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

        {/** Top Cryptocurrencies */}
      </Container>
    </MainLayout>
  );
}
