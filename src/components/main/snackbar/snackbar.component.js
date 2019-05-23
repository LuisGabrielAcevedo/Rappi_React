import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from './my-snackbar-content-wrapper/my-snackbar-content-wrapper.component';
import { connect } from 'react-redux';
import * as snackbarActions from '../../../store/snackbar/snackbar.actions';

class SnackbarComponent extends Component {
    state = {
        open: !!this.props.snackbar.messageData,
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.stopMessage();
    };

    render() {
        const messageData = this.props.snackbar.messageData;
        const snackbar = messageData ? <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={!!messageData}
            autoHideDuration={4000}
            onClose={this.handleClose}
        >
            <MySnackbarContentWrapper
                onClose={this.handleClose}
                variant={messageData.action}
                message={messageData.message}
            />
        </Snackbar> : null;
        
        return (
            <div>
                {snackbar}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
      stopMessage: () => dispatch(snackbarActions.sentMessageAction(null))
    }
  }

const mapStateToProps = state => {
    return {
        snackbar: state.snackbar
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarComponent);