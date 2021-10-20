import Order from "../../modals/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const addOrder = (cartItems, totalAmount, restaurantName) => {
    console.log("thisis add orders");
  return async (dispatch, getState) => {
    console.log(ADD_ORDER);
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    try {
      const response = await fetch(
        `https://ubereatsclone-dd0ff-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
        {
          method: "POST",
          header: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
            totalAmount,
            restaurantName,
            date: date.toISOString(),
          }),
        }
      );
    //   console.log('this is addorders',response);
      if (!response.ok) {
          console.log('response')
        throw new Error("something went wrong!");
      }
      const resData = await response.json();
      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: resData.name,
          items: cartItems,
          amount: totalAmount,
          restaurantName: restaurantName,
          date: date,
        },
      });
    } catch (error) {
      throw new Error("something went wrong!");
    }
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response =
        await (`https://ubereatsclone-dd0ff-default-rtdb.firebaseio.com/orders/${userId}.json`,
        { method: "GET" });
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const resData = await response.json();
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date),
            resData[key].restaurantName
          )
        );
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (error) {
      throw new Error("something went wrong!");
    }
  };
};
