import { types } from "../types";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SAVE_INFO_CART: {
      localStorage.setItem('type', JSON.stringify(action.payload))
      return {
        ...state,
        type: action.payload,
      }
    }

    case types.SAVE_INFO_TOPPING: {
      localStorage.setItem('toppings', JSON.stringify(action.payload))
      return {
        ...state,
        toppings: action.payload,
      }
    }
    default: return state;
  }
}
