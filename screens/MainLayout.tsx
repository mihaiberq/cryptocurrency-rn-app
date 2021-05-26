import * as React from "react";
import { View, Animated, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";

import { IconTextButton } from "../components";

import { icons } from "../constants";

const StyledContainer = styled(View)`
  flex: 1;
`;

const StyledAnimatedModal = styled(Animated.View)`
  position: absolute;
  left: 0;
  width: 100%;
  padding: ${(p) => p.theme.SIZES.padding}px;
  background-color: ${(p) => p.theme.COLORS.primary};
`;

export default function MainLayout({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement {
  const isTradeModalVisible = useSelector(
    (state) => state.tabReducer.isTradeModalVisible
  );
  const theme = useTheme();

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.SIZES.height, theme.SIZES.height - 280],
  });

  return (
    <StyledContainer>
      {children}

      {/* Dim Background */}
      {isTradeModalVisible && (
        <Animated.View
          opacity={modalAnimatedValue}
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: theme.COLORS.transparentBlack },
          ]}
        />
      )}
      {/* Modal */}
      <StyledAnimatedModal style={{ top: modalY }}>
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          onPress={() => console.log("Transfer")}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          containerStyle={{ marginTop: theme.SIZES.base }}
          onPress={() => console.log("Withdraw")}
        />
      </StyledAnimatedModal>
    </StyledContainer>
  );
}
