import * as snackbarActions from './snackbar.actions';

const initialState = {
    messageData: null
}

const SnackbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case snackbarActions.SEND_MESSAGE:
            return {...state, messageData: action.payload};
        default:
            return state;
    }
}

export default SnackbarReducer;