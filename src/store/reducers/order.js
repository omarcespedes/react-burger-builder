import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../util';

const initialState = {
    orders: [],
    error: null,
    purchased: false
}

const purchaseBurgerSuccess = ( state, action ) => {
    return updateObject(state, {purchased: true})
}

const purchaseBurgerInit = ( state, action ) => {
    return updateObject(state, {purchased: false})
}

const fetchOrdersSuccess = ( state, action ) => {
    return updateObject(state, {orders: action.orders})
}

const fetchOrdersFail = ( state, action ) => {
    return updateObject(state, {error: action.error})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL: return updateObject(state, {})
        case actionTypes.PURCHASE_BURGER_INIT: return purchaseBurgerInit(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action)
        default: return state;
    }
}

export default reducer;