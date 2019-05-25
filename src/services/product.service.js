import Categories from '../data/categories';
import Products from '../data/products';

class ProductService {
    filters = {
        available: 'all_products',
        quantity: 'any',
        price: 'any',
        search: ''
    }

    

    getCategories() {
        return JSON.parse(JSON.stringify(Categories));
    }

    getProducts() {
        const products = JSON.parse(JSON.stringify(Products));
        return products.map(product => {
            const price = product.price.split('$')[1].replace(/[,]+/g, '.');
            return {
                ...product,
                price: Number(price)
            }
        });
    }

    setAvailableFilter(key ,value) {
        this.filters[key] = value;
    }

    clearFilters(){
        this.filters = {
            available: 'all_products',
            quantity: 'any',
            price: 'any',
            search: ''
        }
    }

    getProductsByCategories() {
        let products = this.getProducts();

        // Available filter
        products = this.filters.available === 'available'
            ? products.filter(product => product.available)
            : this.filters.available === 'no_available'
                ? products.filter(product => !product.available)
                : products;

        // Quantity filter 
        const quantityFilter = {
            any: (prod) => prod,
            to_0_100: (prod) => prod.filter(prodItem => prodItem.quantity <= 100),
            to_100_200: (prod) => prod.filter(prodItem => prodItem.quantity > 100 && prodItem.quantity <= 200),
            to_200_500: (prod) => prod.filter(prodItem => prodItem.quantity > 200 && prodItem.quantity <= 500),
            to_500_1000: (prod) => prod.filter(prodItem => prodItem.quantity > 500 && prodItem.quantity <= 1000),
            to_1000_0: (prod) => prod.filter(prodItem => prodItem.quantity > 100)
        }

        products = quantityFilter[this.filters.quantity](products);

        // Price filter
        const priceFilter = {
            any: (prod) => prod,
            to_0_5: (prod) => prod.filter(prodItem => prodItem.price <= 5.000),
            to_5_10: (prod) => prod.filter(prodItem => prodItem.price > 5.000 && prodItem.price <= 10.000),
            to_10_20: (prod) => prod.filter(prodItem => prodItem.price > 10.000 && prodItem.price <= 20.000),
            to_20_0: (prod) => prod.filter(prodItem => prodItem.price > 20.000)
        }

        products = priceFilter[this.filters.price](products);

        // Search

        products = products.filter(product => {
            const termRegular = new RegExp(this.filters.search, 'gi');
            return product.name.match(termRegular)
        })
        
        // Order by categories
        let categories = this.getCategories();
        products.forEach(product => {
            const subLevel = product.sublevel_id;
            categories.forEach(category => {
                category.sublevels.forEach(firstLevel => {
                    if (firstLevel.id === subLevel) {
                        firstLevel.products
                            ? firstLevel.products.push(product)
                            : firstLevel.products = [product];
                    } else {
                        if (firstLevel.sublevels) {
                            firstLevel.sublevels.forEach(secondLevel => {
                                if (secondLevel.id === subLevel) {
                                    secondLevel.products
                                        ? secondLevel.products.push(product)
                                        : secondLevel.products = [product];
                                } else {
                                    if (secondLevel.sublevels) {
                                        secondLevel.sublevels.forEach(lastLevel => {
                                            if (lastLevel.id === subLevel) {
                                                lastLevel.products
                                                    ? lastLevel.products.push(product)
                                                    : lastLevel.products = [product];
                                            } 
                                        })
                                    }
                                }
                            })
                        }
                    }

                })
            })
        })
        return !products.length ?  [] : categories;
    }
}

const productService = new ProductService();
export default productService;