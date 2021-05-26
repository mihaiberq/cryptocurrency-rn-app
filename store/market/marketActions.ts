import axios from "axios";

export const GET_HOLDINGS_BEGIN = "GET_HOLDINGS_BEGIN";
export const GET_HOLDINGS_SUCCESS = "GET_HOLDINGS_SUCCESS";
export const GET_HOLDINGS_FAILURE = "GET_HOLDINGS_FAILURE";

export const GET_COIN_MARKET_BEGIN = "GET_COIN_MARKET_BEGIN";
export const GET_COIN_MARKET_SUCCESS = "GET_COIN_MARKET_SUCCESS";
export const GET_COIN_MARKET_FAILURE = "GET_COIN_MARKET_FAILURE";

// Holding / My Holdings

export const getHoldingsBegin = () => ({
  type: GET_HOLDINGS_BEGIN,
});

export const getHoldingsSuccess = (myHoldings) => ({
  type: GET_HOLDINGS_SUCCESS,
  payload: {
    myHoldings,
  },
});

export const getHoldingsFailure = (error) => ({
  type: GET_HOLDINGS_FAILURE,
  payload: {
    error,
  },
});

export function getHoldings({
  holdings = [],
  currency = "usd",
  orderBy = "market_cap_desc",
  sparkline = true,
  priceChangePerc = "7d",
  perPage = 10,
  page = 1,
}) {
  return async (dispatch) => {
    dispatch(getHoldingsBegin());
    let ids = holdings.map(({ id }) => id).join(",");
    let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;

    try {
      const response = await axios({
        url: apiUrl,
        method: "GET",
        header: {
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        const myHoldings = response.data.map((item) => {
          // retrieve current holdings
          const coin = holdings.find((a) => a.id === item.id);

          const price7d =
            item.current_price /
            (1 + item.price_change_percentage_7d_in_currency * 0.01);

          return {
            id: item.id,
            symbol: item.symbol,
            name: item.name,
            image: item.image,
            current_price: item.current_price,
            qty: coin.qty,
            total: coin.qty * item.current_price,
            priceChangePercentage7dInCurrency:
              item.price_change_percentage_7d_in_currency,
            holdingValueChange7d: (item.current_price - price7d) * coin.qty,
            sparklineIn7d: {
              value: item.sparkline_in_7d.price.map(
                (price) => price * coin.qty
              ),
            },
          };
        });
        return dispatch(getHoldingsSuccess(myHoldings));
      } else {
        return dispatch(getHoldingsFailure(response.data));
      }
    } catch (err) {
      return dispatch(getHoldingsFailure(err));
    }

    return;
  };
}

// Coin Market

export const getCoinMarketBegin = () => ({
  type: GET_COIN_MARKET_BEGIN,
});

export const getCoinMarketSuccess = (coins) => ({
  type: GET_COIN_MARKET_SUCCESS,
  payload: {
    coins,
  },
});

export const getCoinMarketFailure = (error) => ({
  type: GET_COIN_MARKET_FAILURE,
  payload: {
    error,
  },
});

export function getCoinMarket({
  currency = "usd",
  orderBy = "market_cap_desc",
  sparkline = true,
  priceChangePerc = "7d",
  perPage = 10,
  page = 1,
}) {
  return async (dispatch) => {
    dispatch(getCoinMarketBegin());

    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;

    try {
      const response = await axios({
        url: apiUrl,
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (response.status === 200) {
        return dispatch(getCoinMarketSuccess(response.data));
      } else {
        return dispatch(getCoinMarketFailure(response.data));
      }
    } catch (err) {
      dispatch(getCoinMarketFailure(err));
    }
  };
}
