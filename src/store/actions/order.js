import * as actionTypes from './actionTypes';
import axios from '../../burger-axios';

export const purchaseOrderSuccess = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS
    }
}

export const purchaseOrderFail = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL
    }
}

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}

export const purchaseOrder = (orderData) => {
    return dispatch => {
        axios.post("/orders.json", orderData).then(response => {
            dispatch(purchaseOrderSuccess());
        }).catch(error => {
            dispatch(purchaseOrderFail());
        })
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        err: err
    }
}

export const fetchOders = () => {
    return dispatch => {
        axios.get('/orders.json').then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        }).catch(err => {
            dispatch(fetchOrdersFail(err));
        })
    }
}