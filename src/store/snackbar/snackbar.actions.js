export const SEND_MESSAGE = '[Snackbar] Send Message';

const sentMessageStartAction = (message) => {
    return {
        type: SEND_MESSAGE,
        payload: message
    };
}

const sentMessageAction = (message) => {
    return (dispatch) => {
        dispatch(sentMessageStartAction(message));
    }
}

export { sentMessageAction };