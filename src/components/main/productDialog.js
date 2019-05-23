import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as cartActions from '../../store/cart/actions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class ProductDialogComponent extends Component {

    state = {
        quantity: 0
    }

    componentDidMount() {
        if (this.props.orderItem) {
            this.setState({quantity: this.props.orderItem.order_item_quantity})
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
        const action = this.props.orderItem.order_item_id ? 'EDIT' : 'ADD';
        this.props.addOrderItem({
            ...this.props.orderItem,
            order_item_quantity: Number(this.state.quantity)
        }, action)
        this.setState({ quantity: 0 });
    }

    render() {
        const { open } = this.props;
        const { orderItem } = this.props;
        return (
            <div>
                {
                    orderItem ?
                        <Dialog onClose={this.handleClose} open={open}>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                className="product-dialog-content"
                            >
                                <DialogTitle>{orderItem.product.name}</DialogTitle>
                                <TextField
                                    id="outlined-name"
                                    label="Quantity"
                                    type="number"
                                    className=""
                                    value={this.state.quantity}
                                    onChange={this.handleChange('quantity')}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <Button style={{ width: '100%' }} variant="contained" onClick={() => this.addOrderItem()} size="large" color="primary">
                                    {orderItem.order_item_id ? 'edit item' : 'add item'}
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