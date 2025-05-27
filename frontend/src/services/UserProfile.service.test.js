import UserProfileService from "./UserProfile.service";

describe('UserProfileService', () => {
    jest.spyOn(global, 'fetch');

    describe('fetchUserProfile', () => {
        it('fetchs user profile data', async () => {
            // Mocking fetch for unit testing
            fetch.mockResolvedValueOnce({ json: () => ({}) });

            // call static method
            expect(await UserProfileService.fetchUserProfile()).toEqual({});

            // Check if fetch has been called correctly
            expect(fetch).toBeCalledTimes(1);
            expect(fetch).toBeCalledWith('http://localhost:8080/user.json');
        });
    });
});