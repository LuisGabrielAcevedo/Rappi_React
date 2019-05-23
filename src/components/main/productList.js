import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as cartActions from '../../store/cart/actions';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


class ProductsListComponent extends Component {
    selectOrderItem(product) {
        this.props.selectOrderItem({
          order_item_id: null,
          product,
          order_item_quantity: 0
        });
    }
    sort() {
        let { products } = this.props;
        let { sortBy } = this.props;
        products = products.sort(function (a, b) {
            if (Number(a[sortBy]) > Number(b[sortBy])) return -1;
            if (Number(a[sortBy]) < Number(b[sortBy])) return 1;
            return 0;
        });
        return products
    }
    render() {
        const products = this.sort();
        return (
            <div className="product-list-container">
                {
                    products.map((product, i) => (
                        <div className="card" key={i}>
                            <p className="card-title">{product.name}</p>
                            <p><span>Price:</span>${product.price}</p>
                            <p><span>Quantity:</span>{product.quantity}</p>
                            {product.available ? <p className="available">available</p> : null}
                            <IconButton className="button" onClick={() => this.selectOrderItem(product)}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </div>
                    ))
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectOrderItem: (orderItem) => dispatch(cartActions.selectCartOrderItemAction(orderItem))
    }
}

export default connect(null, mapDispatchToProps)(ProductsListComponent);