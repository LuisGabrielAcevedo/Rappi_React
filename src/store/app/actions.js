export const SET_CUSTOMER_MODAL = '[App] Set customer modal';

const setCustomerModalAction = (status) => {
    return {
        type: SET_CUSTOMER_MODAL,
        payload: status
    };
}

export  {
    setCustomerModalAction
}