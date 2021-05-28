import * as React from "react";
import { View } from "react-native";
import styled from "styled-components";

import BalanceInfo from "../BalanceInfo";
import IconTextButton from "../IconTextButton";

import { icons } from "../../constants";

const Container = styled(View)`
  padding-horizontal: ${(p) => p.theme.SIZES.padding}px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: ${(p) => p.theme.COLORS.gray};
`;

const ButtonsContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  margin-bottom: -15px;
  padding-horizontal: ${(p) => p.theme.SIZES.radius}px;
`;

export default function WalletInfo({
  displayAmount,
  changePercentage,
}): React.ReactElement {
  return (
    <Container>
      <BalanceInfo
        containerStyle={{ marginTop: 50 }}
        title="Your Wallet"
        displayAmount={displayAmount}
        changePercentage={changePercentage}
      />
      <ButtonsContainer>
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          containerStyle={{ flex: 1 }}
          onPress={() => console.log("Transfer")}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          containerStyle={{ marginLeft: 10, flex: 1 }}
          onPress={() => console.log("Withdraw")}
        />
      </ButtonsContainer>
    </Container>
  );
}
