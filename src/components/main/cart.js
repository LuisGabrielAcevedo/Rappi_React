import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import ProductDialogComponent from './productDialog';
import * as cartActions from '../../store/cart/actions';
import * as appActions from '../../store/app/actions';
import Icon from '@material-ui/core/Icon';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import CustomerDialogComponent from './customerDialog';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

class CartComponent extends Component {

  handleClose = value => {
    this.props.selectOrderItem(null);
  };

  handleCustomersClose = value => {
    this.props.customerModal(false);
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
    const customerModal = this.props.app.customerModalStatus;


    const orderItems = orderItemsReverse.length ?
      orderItemsReverse.map((orderItem, index) => (
        <Grid key={index}
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          className="cart-order-item"
        >
          <Grid item xs={1} className="quantity">{orderItem.order_item_quantity}</Grid>
          <Grid item xs={4}>{orderItem.product.name}</Grid>
          <Grid item xs={3}>{`$${(orderItem.product.price * orderItem.order_item_quantity).toFixed(2)}`}</Grid>
          <Grid item xs={1} onClick={() => this.editOrderItem(orderItem)}><Icon color="primary"><EditIcon /></Icon></Grid>
          <Grid item xs={1} onClick={() => this.deleteOrderItem(orderItem)}><Icon style={{ color: '#d0021b' }}><CloseIcon /></Icon></Grid>
        </Grid>
      )) : <img className="cart-image" src={require(`../../assets/EmptyCart.svg`)} alt={require(`../../assets/EmptyCart.svg`)} />;
    return (
      <div className="cart-container">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className="cart-title"
          style={{ padding: '0 10px' }}
        >
          <Grid item>Cart</Grid>
          <Grid item>
            {
              order.customer ? <span>{`${order.customer.firstName} ${order.customer.lastName}`}</span> : <span>Select a customer</span>
            }
          </Grid>
          <Grid item onClick={() => this.props.customerModal(true)}>
            {
              order.customer ? <Avatar
                alt={order.customer.profileImage.url}
                src={order.customer.profileImage.url}></Avatar>
                : <IconButton style={{ color: 'white' }}>
                  <PersonIcon />
                </IconButton>
            }
          </Grid>
        </Grid>
        <div className="cart-content">
          {orderItems}
          {
            orderItems && orderItems.length ?
              <Grid container direction="row" alignItems="center" justify="space-between" className="total">
                <Grid item>Total:</Grid>
                <Grid item>${order.total}</Grid>
              </Grid> : null
          }
        </div>
        {
          order && order.status === 'PENDING' ? <Button variant="contained" className="cartbutton"
            size="large" color="primary" onClick={() => this.payOrder()}>
            pay
        </Button> : null
        }
        {
          orderItem ? <ProductDialogComponent open={open} onClose={this.handleClose} orderItem={orderItem} /> : null
        }
        {
          customerModal ? <CustomerDialogComponent open={customerModal} onClose={this.handleCustomersClose} /> : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    app: state.app
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectOrderItem: (orderItem) => dispatch(cartActions.selectCartOrderItemAction(orderItem)),
    deleteOrderItem: (orderItem) => dispatch(cartActions.deleteOrderItemAction(orderItem)),
    payOrder: () => dispatch(cartActions.paidOrder()),
    customerModal: (status) => dispatch(appActions.setCustomerModalAction(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);