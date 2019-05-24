import React, { Component } from 'react';
import productService from '../../services/product.service';
import CatogoriesListComponent from './categoriesList';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LoadingProductsComponent from './loadingProducts';
import Button from '@material-ui/core/Button';
import { sortData, availableData, priceData, quantityData } from '../../data/filters';
import Grid from '@material-ui/core/Grid';

class ProductsComponent extends Component {

    state = {
        loading: true,
        categories: [],
        sortBy: 'price',
        search: '',
        available: 'all_products',
        quantity: 'any',
        price: 'any',
        sortOptions: sortData,
        availableOptions: availableData,
        quantityOptions: quantityData,
        priceOptions: priceData
    }

    clear(){
        this.setState({
            search: '',
            available: 'all_products',
            quantity: 'any',
            price: 'any',
            sortBy: 'price'
        })
        productService.clearFilters();
        this.loadCategories();
    }

    componentDidMount() {
        this.loadCategories();
    }

    loadCategories() {
        this.setState({ loading: true })
        setTimeout(() => {
            const categories = productService.getProductsByCategories();
            this.setState({ categories, loading: false });
        }, 500);
    }

    sorBy = name => event => this.setState({ [name]: event.target.value });

    filters = name => event => {
        this.setState({ [name]: event.target.value });
        productService.setAvailableFilter(name, event.target.value);
        this.loadCategories();
    }

    render() {
        const { categories } = this.state;
        const { loading } = this.state;
        return (
            <div className="products-container">
                <h2 className="title">Products</h2>
                <FormControl className="filters-container">
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        style={{ width: '100%', paddingLeft: '30px' }}
                    >
                        <Grid item xs>
                            <FormControlLabel control={
                                <TextField
                                    label="Search"
                                    className="textField"
                                    value={this.state.search}
                                    onChange={this.filters('search')}
                                    SelectProps={{ native: true }}
                                    margin="normal"
                                    variant="outlined"
                                >
                                </TextField>
                            }
                            ></FormControlLabel>
                        </Grid>
                        <Grid item xs={4} >
                            <FormControlLabel control={
                                <TextField
                                    select
                                    label="Price"
                                    className="textField"
                                    value={this.state.price}
                                    onChange={this.filters('price')}
                                    SelectProps={{ native: true }}
                                    margin="normal"
                                    variant="outlined"
                                >
                                    {this.state.priceOptions.map(option => (
                                        <option key={option.key} value={option.value}>
                                            {option.key}
                                        </option>
                                    ))}
                                </TextField>
                            }
                            ></FormControlLabel>
                        </Grid>
                        <Grid item xs>
                            <FormControlLabel control={
                                <TextField
                                    select
                                    label="Quantity"
                                    className="textField"
                                    value={this.state.quantity}
                                    onChange={this.filters('quantity')}
                                    SelectProps={{ native: true }}
                                    margin="normal"
                                    variant="outlined"
                                >
                                    {this.state.quantityOptions.map(option => (
                                        <option key={option.key} value={option.value}>
                                            {option.key}
                                        </option>
                                    ))}
                                </TextField>
                            }
                            ></FormControlLabel>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        style={{ width: '100%', paddingLeft: '30px' }}
                    >
                        <Grid item xs>
                            <FormControlLabel control={
                                <TextField
                                    select
                                    label="Available"
                                    className="textField"
                                    value={this.state.available}
                                    onChange={this.filters('available')}
                                    SelectProps={{ native: true }}
                                    margin="normal"
                                    variant="outlined"
                                >
                                    {this.state.availableOptions.map(option => (
                                        <option key={option.key} value={option.value}>
                                            {option.key}
                                        </option>
                                    ))}
                                </TextField>
                            }
                            ></FormControlLabel>
                        </Grid>
                        <Grid item xs>
                            <FormControlLabel control={
                                <TextField
                                    select
                                    label="Sort by"
                                    className="textField"
                                    value={this.state.sortBy}
                                    onChange={this.sorBy('sortBy')}
                                    SelectProps={{ native: true }}
                                    margin="normal"
                                    variant="outlined"
                                >
                                    {this.state.sortOptions.map(option => (
                                        <option key={option.key} value={option.value}>
                                            {option.key}
                                        </option>
                                    ))}
                                </TextField>
                            }
                            ></FormControlLabel>
                        </Grid>
                        <Grid item xs>
                            <Button variant="contained" onClick={() => this.clear()}>
                                Clear filters
                            </Button>
                        </Grid>
                    </Grid>

                </FormControl>
                {
                    loading
                        ? <LoadingProductsComponent />
                        : categories.length
                            ? <CatogoriesListComponent
                                categories={categories}
                                sortBy={this.state.sortBy}
                                loading={this.state.loading} />
                            : <p>No products available</p>
                }
            </div>
        );
    }
}

export default ProductsComponent;