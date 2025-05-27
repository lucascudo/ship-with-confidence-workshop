class ProductsService {
    static async fetchProducts() {
        const response = await fetch('http://localhost:8080/products.json');
        const products = await response.json();
        return products;
    }
}

export default ProductsService;