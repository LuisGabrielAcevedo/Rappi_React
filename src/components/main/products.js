import React, { Component } from 'react';
import productService from '../../services/product.service';
import CatogoriesListComponent from './categoriesList';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LoadingProductsComponent from './loadingProducts';

class ProductsComponent extends Component {

    state = {
        loading: true,
        categories: [],
        sortBy: 'available',
        sortOptions: [
            'price',
            'quantity',
            'available'
        ],
        availableFilter: false

    }

    componentDidMount() {
        this.loadCategories();
    }

    loadCategories() {
        this.setState({ loading: true })
        setTimeout(() => {
            const categories = productService.getProductsByCategories();
            this.setState({ categories, loading: false });
        }, 1000);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { categories } = this.state;
        const { loading } = this.state;
        return (
            <div className="products-container">
                <p className="title">Select products</p>
                <FormControl style={{ margin: '15px' }}>
                    <FormControlLabel control={
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Sort by"
                            className="textField"
                            value={this.state.sortBy}
                            onChange={this.handleChange('sortBy')}
                            SelectProps={{
                                native: true
                            }}
                            margin="normal"
                            variant="outlined"
                        >
                            {this.state.sortOptions.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                    }
                    ></FormControlLabel>
                    <FormControlLabel
                        control={
                            <Checkbox checked={this.setState.availableFilter} color="primary" onChange={this.handleChange('availableFilter')} value="availableFilter" />
                        }
                        label="Available products"
                    />
                </FormControl>
                {
                    loading ? <LoadingProductsComponent/> : <CatogoriesListComponent categories={categories} sortBy={this.state.sortBy} loading={this.state.loading} />
                }
            </div>
        );
    }
}

export default ProductsComponent;