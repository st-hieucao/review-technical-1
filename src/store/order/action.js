import { types } from "../types"

export const saveInfoCart = (payload) => {
  console.log(payload)
  return {
    type: types.SAVE_INFO_PIZZA,
    payload
  }
}

export const saveInfoToppings = (payload) => {
  console.log(payload)
  return {
    type: types.SAVE_INFO_TOPPING,
    payload
  }
}
