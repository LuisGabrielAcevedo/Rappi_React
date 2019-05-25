import Customers from '../data/customers';

class CustomerService {
    getCustomer() {
        return JSON.parse(JSON.stringify(Customers))
    }

    loadCustomers() {
        let customers = this.getCustomer();
        return customers;
    }
}

const customerService = new CustomerService();
export default customerService;