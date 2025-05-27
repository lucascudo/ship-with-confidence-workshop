import { render, screen } from '@testing-library/react';
import Products from './Products';
import ProductsService from '../services/Products.service';

describe('Products', () => {
    jest.spyOn(ProductsService, 'fetchProducts');
    jest.spyOn(console, 'error');

    it('renders fruits data', async () => {
        const products = [
            { "category": "Fruits", "price": "€1", "stocked": true, "name": "Dragonfruit" },
            { "category": "Fruits", "price": "€4", "stocked": false, "name": "Passionfruit" },
            { "category": "Vegetables", "price": "€2", "stocked": true, "name": "Spinach" },
            { "category": "Vegetables", "price": "€3", "stocked": false, "name": "Pumpkin" }
        ];
        // Mocking fetch for unit testing
        ProductsService.fetchProducts.mockResolvedValueOnce(products);

        // Render the component
        render(<Products/>);

        // Check if the loading state is displayed initially
        expect(screen.getByText('Loading products...')).toBeInTheDocument();

        for (const product of products) {
            // Wait for the component to render with fetched data
            const element = await screen.findByText(product.name);

            // Check if the product is displayed correctly
            expect(element).toBeInTheDocument();
            expect(element.style.color).toBe(product.stocked ? '' : 'red');
            const nextSibling = product.stocked ? element.nextSibling : element.closest('td').nextElementSibling;
            expect(nextSibling.innerHTML).toBe(product.price);
        }

        const table = screen.getByTestId('products-table');
        expect(table.children[0].children[0].children[0].innerHTML).toBe('Name');
        expect(table.children[0].children[0].children[1].innerHTML).toBe('Price');
        expect(table.children[1].children[0].children[0].innerHTML).toBe('Fruits');
        expect(table.children[1].children[3].children[0].innerHTML).toBe('Vegetables');

        // Check spies
        expect(ProductsService.fetchProducts).toBeCalledTimes(1);
        expect(console.error).toBeCalledTimes(0);
    });

    it('catch errors', async () => {
        // Mocking fetch error
        ProductsService.fetchProducts.mockImplementationOnce(() => {
            throw new Error('fake error');
        });

        // Render the component
        render(<Products/>);

        // Check if the loading state is displayed initially
        expect(screen.getByText('Loading products...')).toBeInTheDocument();

        // Check spies
        expect(ProductsService.fetchProducts).toBeCalledTimes(1);
        expect(console.error).toBeCalledTimes(1);
        expect(console.error).toBeCalledWith('Error fetching products: Error: fake error');
    });
});