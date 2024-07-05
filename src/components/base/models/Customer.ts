export class Customer {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public phone: string,
        public address: string
    ) {}

    updateCustomer(details: Partial<Customer>) {
        Object.assign(this, details);
    }
}
