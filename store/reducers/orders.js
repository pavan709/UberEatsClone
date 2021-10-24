import Order from "../../modals/order";
import { ADD_ORDER, SET_ORDERS } from "../actions/orders";

const initalState = {
    orders:[],
}

export default (state=initalState,action) => {
    switch(action.type)
    {
        case SET_ORDERS:
            return {
                orders:action.orders,
            }
        case ADD_ORDER:
            const order = new Order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date,
                action.orderData.restaurantName
            )
        state.orders.splice(0,0,order);
        return state;
            
    }
    return state;
}