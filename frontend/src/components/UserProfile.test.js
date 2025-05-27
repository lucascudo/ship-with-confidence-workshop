import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';
import UserProfileService from '../services/UserProfile.service';

describe('UserProfile', () => {
    jest.spyOn(UserProfileService, 'fetchUserProfile');
    jest.spyOn(console, 'error');

    beforeEach(() => {
        UserProfileService.fetchUserProfile.mockClear();
        console.error.mockClear();
    });

    it('renders user profile data', async () => {
        // Mocking fetch for unit testing
        UserProfileService.fetchUserProfile.mockResolvedValueOnce({ name: 'Lucas', email: 'lucas@example.com' });

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
        
        // Check spies
        expect(UserProfileService.fetchUserProfile).toBeCalledTimes(1);
        expect(console.error).toBeCalledTimes(0);
    });

    it('catch errors', async () => {
        // Mocking fetch error
        UserProfileService.fetchUserProfile.mockImplementationOnce(() => {
            throw new Error('fake error');
        });

        // Render the component
        render(<UserProfile/>);

        // Check if the loading state is displayed initially
        expect(screen.getByText('Loading user data...')).toBeInTheDocument();

        // Check spies
        expect(UserProfileService.fetchUserProfile).toBeCalledTimes(1);
        expect(console.error).toBeCalledTimes(1);
        expect(console.error).toBeCalledWith('Error fetching user data: Error: fake error');
    });
});