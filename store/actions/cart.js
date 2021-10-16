export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = item => {
    console.log('this is cart action');
    return {type:ADD_TO_CART, mealsData: item}
}