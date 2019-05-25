import CartReducer from "./cart/reducers";
import SnackbarReducer from "./snackbar/snackbar.reducers";
import AppReducer from './app/reducers';


const reducers = {
    app: AppReducer,
    cart: CartReducer,
    snackbar: SnackbarReducer
};

export default reducers;