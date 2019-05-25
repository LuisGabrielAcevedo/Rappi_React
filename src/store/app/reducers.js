import * as appActions from './actions';

const initialState = {
    customerModalStatus: false
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case appActions.SET_CUSTOMER_MODAL:
            return {...state, customerModalStatus: action.payload};
        default:
            return state;
    }
}

export default AppReducer;