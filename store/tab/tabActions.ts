export const SET_TRADE_MODAL_VISIBILITY = "SET_TRADE_MODAL_VISIBILITY";

export const setTradeModalVisbilitySuccess = (isVisible) => ({
  type: SET_TRADE_MODAL_VISIBILITY,
  payload: { isVisible },
});

export function setTradeModalVisbility(isVisible) {
  return (dispatch) => {
    dispatch(setTradeModalVisbilitySuccess(isVisible));
  };
}
