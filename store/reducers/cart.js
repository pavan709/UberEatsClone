import { ADD_TO_CART, CLEAR_CART } from "../actions/cart";
const intialState = {
  selectedItems: { items: [], restaurantName: "" },
};

export default (state = intialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let newState = { ...state };
      if (action.mealsData.checkboxValue) {
        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.mealsData],
          restaurantName: action.mealsData.restaurantName,
        };
        return newState;
      } else {
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.title !== action.mealsData.title
            ),
          ],
          restaurantName: action.mealsData.restaurantName,
        };
        return newState;
      }
    }
    case CLEAR_CART:
      return intialState;
  }
  return state;
};
