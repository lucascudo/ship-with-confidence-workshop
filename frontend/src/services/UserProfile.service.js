class UserProfileService {
    static async fetchUserProfile() {
        const response = await fetch('http://localhost:8080/user.json');
        const user = await response.json();
        return user;
    }
}

export default UserProfileService;