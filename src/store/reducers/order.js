import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    error: null,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:            
            return {
                ...state,
                purchased: true
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state
            }
        case actionTypes.PURCHASE_BURGER_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default reducer;