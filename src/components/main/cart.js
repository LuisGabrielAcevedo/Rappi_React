import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import ProductDialogComponent from './productDialog';
import * as cartActions from '../../store/cart/actions';
import Icon from '@material-ui/core/Icon';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';


class CartComponent extends Component {

  state = {
    open: true
  }

  handleClose = value => {
    this.props.selectOrderItem(null);
  };

  editOrderItem(orderItem) {
    this.props.selectOrderItem(orderItem);
  }

  deleteOrderItem(orderItem) {
    this.props.deleteOrderItem(orderItem);
  }

  payOrder() {
    this.props.payOrder();
  }

  render() {
    const orderItem = this.props.cart.orderItem;
    const order = this.props.cart.order;
    const orderItemsReverse = [...order.orderItems].reverse();
    const open = orderItem ? true : false;


    const orderItems = order.id ?
      orderItemsReverse.map((orderItem, index) => (
        <Grid key={index}
          container
          direction="row"
          justify="space-around"
          spacing={24}
          alignItems="center"
          style={{ width: '100%' }}
        >
          <Grid item xs>{orderItem.order_item_quantity}</Grid>
          <Grid item xs={5}>{orderItem.product.name}</Grid>
          <Grid item xs>{`$${(orderItem.product.price * orderItem.order_item_quantity).toFixed(2)}`}</Grid>
          <Grid item xs={1} onClick={() => this.editOrderItem(orderItem)}><Icon color="primary"><EditIcon /></Icon></Grid>
          <Grid item xs={1} onClick={() => this.deleteOrderItem(orderItem)}><Icon style={{ color: '#d0021b' }}><CloseIcon /></Icon></Grid>
        </Grid>
      )) : <p></p>;
    return (
      <div className="cart-container">
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          className="cart-title"
        >
          <Grid item>Cart</Grid>

        </Grid>
        <div className="cart-content">
          {orderItems}
          {
            orderItems && orderItems.length ?
              <Grid container direction="row" alignItems="center" justify="center" className="total">
                <Grid item className="posSettingsLeft">Total: {order.total}</Grid>
              </Grid> : null
          }
        </div>
        <Button variant="contained" className="cartbutton"
          size="large" color="primary" onClick={() => this.payOrder()}>
          pay
        </Button>
        {
          orderItem ? <ProductDialogComponent open={open} onClose={this.handleClose} orderItem={orderItem}/> : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectOrderItem: (orderItem) => dispatch(cartActions.selectCartOrderItemAction(orderItem)),
    deleteOrderItem: (orderItem) => dispatch(cartActions.deleteOrderItemAction(orderItem)),
    payOrder: () => dispatch(cartActions.paidOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);