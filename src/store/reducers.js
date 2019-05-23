import CartReducer from "./cart/reducers";
import SnackbarReducer from "./snackbar/snackbar.reducers"


const reducers = {
    cart: CartReducer,
    snackbar: SnackbarReducer
};

export default reducers;