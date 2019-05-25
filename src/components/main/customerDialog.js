import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as cartActions from '../../store/cart/actions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import customerService from '../../services/customer.service';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

class CustomerDialogComponent extends Component {

  state = {
    customers: []
  }

  componentDidMount() {
    this.loadCustomers();
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  loadCustomers() {
    const customers = customerService.loadCustomers();
    this.setState({ customers });
  }

  addCustomer(customer) {
    this.props.addCustomer(customer);
    this.props.onClose(this.props.selectedValue);
  }

  render() {
    const { open } = this.props;
    return (
      <div>
        <Dialog onClose={this.handleClose} open={open}>
          <DialogTitle style={{ textAlign: 'center' }}>Select a customer</DialogTitle>
          <div>
            <GridList cellHeight={160}>
              {this.state.customers.map(customer => (
                <GridListTile key={customer._id}>
                  <img src={customer.profileImage.url} alt={customer.firstName} />
                  <GridListTileBar
                    title={`${customer.firstName} ${customer.lastName}`}
                    actionIcon={
                      <IconButton style={{color: 'white'}} onClick={()=> this.addCustomer(customer)}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      addCustomer: (customer) => dispatch(cartActions.addCustomerToOrder(customer))
  }
}

export default connect(null, mapDispatchToProps)(CustomerDialogComponent);