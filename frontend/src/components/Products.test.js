import { render, screen } from '@testing-library/react';
import Products from './Products';

describe('Fruits', () => {
    global.fetch = jest.fn();
    global.console.error = jest.fn();

    it('renders fruits data', async () => {
        const products = [
            { "category": "Fruits", "price": "€1", "stocked": true, "name": "Dragonfruit" },
            { "category": "Fruits", "price": "€4", "stocked": false, "name": "Passionfruit" },
            { "category": "Vegetables", "price": "€2", "stocked": true, "name": "Spinach" },
            { "category": "Vegetables", "price": "€3", "stocked": false, "name": "Pumpkin" }
        ];
        // Mocking fetch for unit testing
        fetch.mockResolvedValueOnce({ json: () => products });

        // Render the component
        render(<Products/>);

        // Check if the loading state is displayed initially
        expect(screen.getByText('Loading fruits...')).toBeInTheDocument();

        for (const product of products) {
            // Wait for the component to render with fetched data
            const element = await screen.findByText(product.name);

            // Check if the product is displayed correctly
            expect(element).toBeInTheDocument();
            expect(element.style.color).toBe(product.stocked ? '' : 'red');
            const nextSibling = element.stocked ? element.nextSibling : element.closest('td').nextElementSibling;
            expect(nextSibling.innerHTML).toBe(product.price);
        }
    });

    it('catch errors', async () => {
        // Mocking fetch error
        fetch.mockImplementationOnce(() => {
            throw new Error();
        });

        // Render the component
        render(<Products/>);

        // Check if the loading state is displayed initially
        expect(screen.getByText('Loading fruits...')).toBeInTheDocument();
    });
});