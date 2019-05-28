import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as cartActions from '../../store/cart/actions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class ProductDialogComponent extends Component {

    state = {
        quantity: 0,
        loading: false
    }

    componentDidMount() {
        if (this.props.orderItem) {
            this.setState({ quantity: this.props.orderItem.order_item_quantity })
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    addOrderItem() {
        this.setState({ loading: true });
        const action = this.props.orderItem.order_item_id ? 'EDIT' : 'ADD';
        setTimeout(() => {
            this.props.addOrderItem({
                ...this.props.orderItem,
                order_item_quantity: Number(this.state.quantity)
            }, action)
        }, 500);
        
    }

    render() {
        const { open } = this.props;
        const { orderItem } = this.props;
        const loading = this.state.loading ? <CircularProgress size={25}/> : <span>{orderItem.order_item_id ? 'edit item' : 'add item'}</span>;
        return (
            <div>
                {
                    orderItem ?
                        <Dialog onClose={this.handleClose} open={open}>
                            <Grid
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="center"
                                className="product-dialog-content"
                            >
                                <DialogTitle style={{padding:'5px'}}>{orderItem.product.name}</DialogTitle>
                                <TextField
                                    id="outlined-name"
                                    label="Quantity"
                                    type="number"
                                    style={{ marginBottom: '30px' }}
                                    value={this.state.quantity}
                                    onChange={this.handleChange('quantity')}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <Button
                                    disabled={!this.state.quantity || this.state.quantity === '0'}
                                    style={{ width: '100%' }} variant="contained" onClick={() => this.addOrderItem()}
                                    size="large"
                                    color="primary"
                                >
                                    {loading}
                                </Button>
                            </Grid>
                        </Dialog> : null
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addOrderItem: (orderItem, action) => dispatch(cartActions.addOrderItemAction(orderItem, action)),
    }
}

export default connect(null, mapDispatchToProps)(ProductDialogComponent);