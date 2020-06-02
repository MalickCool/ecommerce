import { ADD_TO_CART, REMOVE_TO_CART, INCREMENT_CART_ITEM, RESET_CART } from './types';

export const addToCart = products => dispatch =>{
    localStorage.setItem("cartProducts", JSON.stringify(products));
    dispatch({
        type: ADD_TO_CART,
        payload: products
    })
}

export const incrementCartItem = data => dispatch =>{
    localStorage.setItem("itemsInCart", data);
    dispatch({
        type: INCREMENT_CART_ITEM,
        payload: data
    })
}

export const removeToCart = products => dispatch =>{
    localStorage.setItem("cartProducts", JSON.stringify(products));
    dispatch({
        type: REMOVE_TO_CART,
        payload: products
    })
}

export const resetCart = () => dispatch =>{
    localStorage.removeItem("cartProducts");
    localStorage.setItem("itemsInCart", 0);

    dispatch({
        type: RESET_CART
    })
}