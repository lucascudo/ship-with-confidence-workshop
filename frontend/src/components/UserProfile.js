import { useState, useEffect, useRef } from 'react';
import UserProfileService from '../services/UserProfile.service';

function UserProfile() {
  const [user, setUser] = useState(null);
  const initialized = useRef(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await UserProfileService.fetchUserProfile();
        setUser(user);
      } catch (error) {
        console.error(`Error fetching user data: ${error}`);
      }
    };

    if (!initialized.current) {
      initialized.current = true;
      fetchUser();
    }
  });

  return (
    <section>
      {user ? (
        <div>
          <h2>Name: {user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </section>
  );
};

export default UserProfile;