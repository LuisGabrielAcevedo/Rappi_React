import * as moment from 'moment';
import * as snackbarActions from '../snackbar/snackbar.actions'
export const SELECT_CART_ORDER_ITEM = '[Cart] Select Cart Order Item';
export const ADD_ORDER_ITEM = '[Cart] Add Order Item';
export const SET_ORDER = '[Cart] Set Order';
export const SET_LOADING = '[Cart] Set Loading';


const orderDefault = {
    orderItems: [],
    id: moment().unix(),
    status: 'PENDING',
    total: null
}

const selectCartOrderItemAction = (orderItem) => {
    return {
        type: SELECT_CART_ORDER_ITEM,
        payload: orderItem
    };
}

const setOrderAction = (order) => {
    return {
        type: SET_ORDER,
        payload: order
    };
}

const addOrderItemAction = (orderItem, action) => {
    return (dispatch) => {
        const order = JSON.parse(localStorage.getItem('rappi'));
        const currentOrder = order ? { ...order } : { ...orderDefault };
        const orderItemExist = currentOrder.orderItems.find(orderItemItem => orderItemItem.product.id === orderItem.product.id);
        if (action === 'EDIT') {
            currentOrder.orderItems = currentOrder.orderItems.map(orderItemItem => {
                return orderItemItem.product.id === orderItem.product.id
                    ? { ...orderItemItem, order_item_quantity: orderItem.order_item_quantity }
                    : orderItemItem;
            })
            dispatch(snackbarActions.sentMessageAction({action:'success', message: "Product edited"}));
        } else {
            if (orderItemExist) {
                currentOrder.orderItems = currentOrder.orderItems.map(orderItemItem => {
                    return orderItemItem.product.id === orderItem.product.id
                        ? { ...orderItemItem, order_item_quantity: orderItemItem.order_item_quantity + orderItem.order_item_quantity }
                        : orderItemItem;
                })
            } else {
                orderItem.order_item_id = moment().unix();
                currentOrder.orderItems.push(orderItem);
            }
            dispatch(snackbarActions.sentMessageAction({action:'success', message: "Product added"}));
        }
        let total = 0;
        currentOrder.orderItems.forEach(item => {
            total += (item.order_item_quantity * item.product.price);
        })
        currentOrder.total = total.toFixed(2);
        dispatch(setOrderAction(currentOrder));
        dispatch(selectCartOrderItemAction(null));
    }
}

const deleteOrderItemAction = (orderItem) => {
    return (dispatch) => {
        const order = JSON.parse(localStorage.getItem('rappi'));
        order.orderItems = order.orderItems.filter(orderItemItem => orderItemItem.order_item_id !== orderItem.order_item_id)
        dispatch(snackbarActions.sentMessageAction({action:'success', message: "Product deleted"}));
        dispatch(setOrderAction(order));
    }
}

const paidOrder = () => {
    return (dispatch) => {
        localStorage.removeItem('rappi');
        dispatch(setOrderAction({...orderDefault}));
        dispatch(snackbarActions.sentMessageAction({action:'success', message: "Order paid"}));
    }
}

export {
    selectCartOrderItemAction,
    addOrderItemAction,
    deleteOrderItemAction,
    paidOrder
}