import { render, screen } from '@testing-library/react';
import Products from './Products';

describe('Fruits', () => {
    global.fetch = jest.fn();

    it('renders fruits data', async () => {
        // Mocking fetch for unit testing
        fetch.mockResolvedValueOnce({ json: () => [
            { "category": "Fruits", "price": "€4", "stocked": false, "name": "Passionfruit" },
            { "category": "Vegetables", "price": "€2", "stocked": true, "name": "Spinach" }
        ]});

        // Render the component
        render(<Products/>);

        // Check if the loading state is displayed initially
        expect(screen.getByText('Loading fruits...')).toBeInTheDocument();

        // Wait for the component to render with fetched data
        const passionfruitElement = await screen.findByText('Passionfruit');
        const spinachElement = await screen.findByText('Spinach');

        // Check if the products are displayed correctly
        expect(spinachElement).toBeInTheDocument();
        expect(spinachElement.style.color).toBe('');
        //expect(spinachElement.style.color).not.toBe('red');
        expect(spinachElement.nextSibling.innerHTML).toBe('€2');
        expect(passionfruitElement).toBeInTheDocument();
        expect(passionfruitElement.style.color).toBe('red');
        //expect(passionfruitElement.nextSibling.innerHTML).toBe('€4'); // will fail
        expect(passionfruitElement.closest('td').nextSibling.innerHTML).toBe('€4');
    });
});