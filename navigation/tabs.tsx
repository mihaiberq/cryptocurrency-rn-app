import * as React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import { setTradeModalVisbility } from "../store/tab/tabActions";

import { Home, Portfolio, Market, Profile } from "../screens";
import { TabIcon } from "../components";
import { COLORS, icons } from "../constants";

type Screens = {
  Home: undefined;
  Portfolio: undefined;
  Trade: undefined;
  Market: undefined;
  Profile: undefined;
};

const Button = styled(TouchableOpacity)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

function TabBarCustomButton({
  children,
  onPress,
  ...rest
}: {
  children: React.ReactElement;
  onPress: Function;
}): React.ReactElement {
  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      {children}
    </TouchableOpacity>
  );
}

const { Navigator, Screen } = createBottomTabNavigator<Screens>();

const Tabs = () => {
  const isTradeModalVisible = useSelector(
    (state) => state.tabReducer.isTradeModalVisible
  );
  const dispatch = useDispatch();

  function tradeTabButtonOnClickHandler() {
    dispatch(setTradeModalVisbility(!isTradeModalVisible));
  }

  return (
    <Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 140,
          backgroundColor: COLORS.primary,
          borderTopColor: "transparent",
        },
      }}
    >
      <Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => {
            if (isTradeModalVisible) {
              return null;
            }
            return <TabIcon focused={focused} icon={icons.home} label="Home" />;
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
        component={Home}
      />
      <Screen
        name="Portfolio"
        options={{
          tabBarIcon: ({ focused }) => {
            if (isTradeModalVisible) {
              return null;
            }
            return (
              <TabIcon
                focused={focused}
                icon={icons.briefcase}
                label="Portfolio"
              />
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
        component={Portfolio}
      />
      <Screen
        name="Trade"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                isTrade
                focused={focused}
                icon={isTradeModalVisible ? icons.close : icons.trade}
                iconStyle={isTradeModalVisible ? { width: 15, height: 15 } : {}}
                label="Trade"
              />
            );
          },
          tabBarButton: (props) => {
            return (
              <TabBarCustomButton
                {...props}
                onPress={tradeTabButtonOnClickHandler}
              />
            );
          },
        }}
        component={Home}
      />
      <Screen
        name="Market"
        options={{
          tabBarIcon: ({ focused }) => {
            if (isTradeModalVisible) {
              return null;
            }
            return (
              <TabIcon focused={focused} icon={icons.market} label="Market" />
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
        component={Market}
      />
      <Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => {
            if (isTradeModalVisible) {
              return null;
            }
            return (
              <TabIcon focused={focused} icon={icons.profile} label="Profile" />
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
        component={Profile}
      />
    </Navigator>
  );
};

export default Tabs;
