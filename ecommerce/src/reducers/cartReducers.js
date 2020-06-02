import { ADD_TO_CART, REMOVE_TO_CART, INCREMENT_CART_ITEM, RESET_CART } from '../actions/types';

const initialState = {
    products: [],
    itemInCart: 0
};

export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_TO_CART:
        return {
          ...state,
          products: action.payload
        };
      case REMOVE_TO_CART:
        return {
          ...state,
          products: action.payload
        };
      case INCREMENT_CART_ITEM:
        return {
          ...state,
          itemInCart: action.payload
        };
      case RESET_CART:
        return{
          ...state,
          products: [],
          itemInCart: 0
        };
      default:
        return state;
    }
  }