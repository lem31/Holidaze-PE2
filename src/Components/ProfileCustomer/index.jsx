/**
 * ProfileCustomer component renders the customer's profile view,
 * including global profile information and a list of customer bookings.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.setIsEditProfileVisible - Function to toggle the profile edit modal visibility.
 * @param {Function} props.setSelectedView - Function to set the currently selected profile view.
 * @param {string} props.selectedView - The currently selected profile view.
 * @param {Object} props.userProfile - The user's profile data.
 * @returns {JSX.Element} The rendered ProfileCustomer component.
 */

import ProfileGlobal from "../ProfileGlobal";
import DisplayCustomerBookings from "../DisplayCustomerBookings";

const ProfileCustomer = ({
  setIsEditProfileVisible,
  setSelectedView,
  selectedView,
  userProfile,
}) => {
  return (
    <div>
      <ProfileGlobal
        setIsEditProfileVisible={setIsEditProfileVisible}
        setSelectedView={setSelectedView}
        selectedView={selectedView}
        userProfile={userProfile}
      />

      <DisplayCustomerBookings />
    </div>
  );
};

export default ProfileCustomer;
