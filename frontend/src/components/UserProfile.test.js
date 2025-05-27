import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

describe('UserProfile', () => {
    global.fetch = jest.fn();

    it('renders user profile data', async () => {
        // Mocking fetch for unit testing
        fetch.mockResolvedValueOnce({ json: () => ({ name: 'Lucas', email: 'lucas@example.com' }) });

        // Render the component
        render(<UserProfile/>);

        // Check if the loading state is displayed initially
        expect(screen.getByText('Loading user data...')).toBeInTheDocument();

        // Wait for the component to render with fetched data
        const nameElement = await screen.findByText('Name: Lucas');
        const emailElement = await screen.findByText('Email: lucas@example.com');

        // Check if the user data is displayed correctly
        expect(nameElement).toBeInTheDocument();
        expect(emailElement).toBeInTheDocument();
    });
});