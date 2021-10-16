import { ADD_TO_CART } from "../actions/cart";
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
        // console.log(newState, "⭐");
        return newState;
      } else {
        console.log("inside else");
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.title !== action.mealsData.title
            ),
          ],
          restaurantName: action.mealsData.restaurantName,
        };
        console.log(newState.selectedItems.items.length);
        return newState;
      }
    }
  }
  return state;
};
