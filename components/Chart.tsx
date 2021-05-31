import * as React from "react";
import { View, Text } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";
import styled, { useTheme } from "styled-components";
import dayjs from "dayjs";

const DotContainer = styled(View)`
  position: absolute;
  left: -35px;
  width: 80px;
  align-items: center;
  background-color: ${(p) => p.theme.COLORS.transparentBlack};
`;

const Dot = styled(View)`
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 15px;
  background-color: ${(p) => p.theme.COLORS.white};
`;

const GreenDot = styled(View)`
  width: 15px;
  height: 15px;
  border-radius: 10px;
  background-color: ${(p) => p.theme.COLORS.lightGreen};
`;

const YAxisLabelsContainer = styled(View)`
  position: absolute;
  left: ${(p) => p.theme.SIZES.padding / 2}px;
  top: 0;
  bottom: 0;
  justify-content: space-between;
`;

export default function Chart({
  containerStyle,
  chartPrices,
}): React.ReactElement {
  const theme = useTheme();

  const startUnixTimestamp = dayjs().subtract(7, "days").unix();
  const data = chartPrices
    ? chartPrices.map((item, ind) => {
        return {
          x: startUnixTimestamp + (ind + 1) * 3600,
          y: item,
        };
      })
    : [];

  let points = monotoneCubicInterpolation({ data, range: 40 });

  const formatUSD = (value: string) => {
    "worklet";

    if (value === "") {
      return "";
    }

    return `$${Number(value).toFixed(2)}`;
  };

  const formatDateTime = (value) => {
    "worklet";

    if (value === "") {
      return "";
    }
    // cant use dayjs due to worklets
    const date = new Date(value * 1000);
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    return `${day} / ${month}`;
  };

  const formatNumber = (value, roundingPoint) => {
    if (value > 1e9) {
      return `${(value / 1e9).toFixed(roundingPoint)}B`;
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(roundingPoint)}M`;
    } else if (value > 1e3) {
      return `${(value / 1e3).toFixed(roundingPoint)}K`;
    } else {
      return value.toFixed(roundingPoint);
    }
  };

  const getYAxisLabelValues = () => {
    if (!!chartPrices) {
      let minValue = Math.min(...chartPrices);
      let maxValue = Math.max(...chartPrices);

      let midValue = (minValue + maxValue) / 2;

      const lowerMidValue = (minValue + midValue) / 2;
      const higherMidValue = (midValue + maxValue) / 2;
      const roundingPoint = 2;
      return [
        formatNumber(maxValue, roundingPoint),
        formatNumber(higherMidValue, roundingPoint),
        formatNumber(midValue, roundingPoint),
        formatNumber(lowerMidValue, roundingPoint),
        formatNumber(minValue, roundingPoint),
      ];
    }
    return [];
  };

  return (
    <View style={containerStyle}>
      {/** Y Axis Labels */}

      <YAxisLabelsContainer>
        {getYAxisLabelValues().map((item) => (
          <Text
            key={item}
            style={[{ color: theme.COLORS.lightGray3 }, theme.FONTS.body4]}
          >
            {item}
          </Text>
        ))}
      </YAxisLabelsContainer>

      {data.length > 0 && (
        <ChartPathProvider
          style={{}}
          data={{ points, smoothingStrategy: "bezier" }}
        >
          <ChartPath
            height={150}
            width={theme.SIZES.width}
            stroke={theme.COLORS.lightGreen}
            strokeWidth={2}
          />
          <ChartDot>
            <DotContainer>
              <Dot>
                <GreenDot />
              </Dot>
              <ChartYLabel
                format={formatUSD}
                style={{
                  color: theme.COLORS.white,
                  ...theme.FONTS.body5,
                }}
              />
              <ChartXLabel
                format={formatDateTime}
                style={{
                  marginTop: 3,
                  color: theme.COLORS.white,
                  lineHeight: 15,
                  ...theme.FONTS.body5,
                }}
              />
            </DotContainer>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  );
}
