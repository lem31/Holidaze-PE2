import React, {useEffect} from 'react';
import useMyStore from '../../Store/index';


const ProfileVenueManager= () =>{

    const {fetchUserProfile, userProfile} = useMyStore();

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

    return(
    <div>
            {userProfile ? (
         <div>
            <h1>{userProfile.name}</h1>
            <p>{userProfile.bio}</p> 
                </div>
                ) : (
                    <p>Loading profile...</p>
            )}
            </div>
    );
};

export default ProfileVenueManager;