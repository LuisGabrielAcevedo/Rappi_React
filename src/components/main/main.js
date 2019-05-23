import React, { Component } from 'react';
import AppBarComponent from './toolbar'
import './main.css';
import ProductsComponent from './products';
import CartComponent from './cart';
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from './snackbar/snackbar.component';

class MainComponent extends Component {
  render() {
    return (
      <div>
        <AppBarComponent />
        <Grid
          container
          direction="row"
        >
          <Grid item xs={12} md={5} style={{padding: '20px'}}>
            <CartComponent />
          </Grid>
          <Grid item xs={12} md={7}>
            <ProductsComponent/>
          </Grid>
        </Grid>
        <SnackbarComponent/>
      </div>
    );
  }
}

export default MainComponent;