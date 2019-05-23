import Categories from '../data/categories';
import Products from '../data/products';

class ProductService {
    filters = {
        available: {
            key: 'available',
            value: false
        }
    }

    getCategories() {
        return Categories;
    }

    getProducts() {
        const products = Products;
        return products.map(product => {
            const price = product.price.split('$')[1].replace(/[,]+/g, '.');
            return {
                ...product,
                price: Number(price)
            }
        });
    }

    setAvailableFilter(available) {
        this.filters.available.value = available;
    }

    getProductsByCategories() {
        let products = this.getProducts();
        products = products.filter(product => product.available === this.filters.available.value);
        let categories = this.getCategories();
        console.log(this.filters);
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
        return categories;
    }
}

const productService = new ProductService();
export default productService;