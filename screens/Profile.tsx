import * as React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import styled, { useTheme } from "styled-components";

import MainLayout from "./MainLayout";

import {
  Header,
  PreferencesSectionTitle,
  PreferenceSettingsRow,
} from "../components";
import { dummyData, icons } from "../constants";

const Container = styled(View)`
  flex: 1;
  padding-horizontal: ${(p) => p.theme.SIZES.padding}px;
  background-color: ${(p) => p.theme.COLORS.black};
`;

const HeaderContainer = styled(View)`
  flex-direction: row;
  margin-top: ${(p) => p.theme.SIZES.radius}px;
`;

const EmailContainer = styled(View)`
  flex: 1;
`;

const StatusContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const VerifiedImage = styled(Image)`
  width: 25px;
  height: 25px;
`;

export default function Profile(): React.ReactElement {
  const [useFaceId, setUseFaceId] = React.useState<boolean>(true);
  const theme = useTheme();

  return (
    <MainLayout>
      <Container>
        <Header text="Profile" />
        <ScrollView>
          <HeaderContainer>
            {/* Email & Id */}
            <EmailContainer>
              <Text style={[theme.FONTS.h3, { color: theme.COLORS.white }]}>
                {dummyData.profile.email}
              </Text>
              <Text
                style={[theme.FONTS.body4, { color: theme.COLORS.lightGray3 }]}
              >
                {dummyData.profile.id}
              </Text>
            </EmailContainer>
            <StatusContainer>
              <VerifiedImage source={icons.verified} />
              <Text
                style={[
                  theme.FONTS.body4,
                  {
                    marginLeft: theme.SIZES.base,
                    color: theme.COLORS.lightGreen,
                  },
                ]}
              >
                Verified
              </Text>
            </StatusContainer>
          </HeaderContainer>
          {dummyData.settings.map((entry) => {
            if (entry.prefType === "header") {
              return <PreferencesSectionTitle key={entry.title} {...entry} />;
            } else {
              if (entry.type === "switch") {
                return (
                  <PreferenceSettingsRow
                    key={entry.title}
                    {...entry}
                    value={useFaceId}
                    onPress={(status) => setUseFaceId(!!status)}
                  />
                );
              } else if (entry.type === "button") {
                return <PreferenceSettingsRow key={entry.title} {...entry} />;
              }
            }
          })}
        </ScrollView>
      </Container>
    </MainLayout>
  );
}
