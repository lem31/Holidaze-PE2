import React, {useEffect, useState} from 'react';
import useMyStore from '../../Store/index';



const ProfileVenueManager= () =>{

    const {fetchUserProfile, userProfile} = useMyStore();
    const [selectedView, setSelectedView] = useState(''); // Define selectedView state
   

    useEffect(() => {
    const getProfile = async () => {
try{
  const profileData= await fetchUserProfile();
    console.log(profileData);
} catch(error){
    console.error("Failed to fetch user profile:", error);
}

};

getProfile();}, [fetchUserProfile]);

    return (
        <div>
            {userProfile ? (
                <div>
                    <h1>{selectedView}</h1>
                    <h2>{userProfile.data.name}</h2>
                    <p>{userProfile.data.bio}</p>
                    <img src={userProfile.data.banner.url} alt="banner" />
                    <img src={userProfile.data.avatar.url} alt="avatar" />
                    <button onClick={() => setSelectedView('Edit Profile')}>Edit Profile</button>
                    <button onClick={() => setSelectedView('Venues')}>Venues</button>
                    <button onClick={() => setSelectedView('Bookings')}>Bookings</button>
                    <button onClick={() => setSelectedView('Create Venue')}>Create Venue</button>
                    {selectedView === 'Venues' && <div>Venues Component Placeholder</div>}
                    {selectedView === 'Bookings' && <div>Bookings Component Placeholder</div>}
                    {selectedView === 'Edit Profile' && <div>Edit Profile Component Placeholder</div>}
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default ProfileVenueManager;