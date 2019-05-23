import * as cartActions from './actions';
const order = JSON.parse(localStorage.getItem('rappi'));
const orderDefault = {
    _id: null,
    orderItems: []
}

const initialState = {
    orderItem: null,
    loading: false,
    order: order ? order : orderDefault
}

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case cartActions.SELECT_CART_ORDER_ITEM:
            return { ...state, orderItem: action.payload };
        case cartActions.SET_ORDER:
            localStorage.setItem('rappi', JSON.stringify(action.payload));
            return { ...state, order: action.payload };
        case cartActions.SET_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}

export default CartReducer;