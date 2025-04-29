import {useNavigate} from 'react-router-dom';
import useMyStore from '../../Store';
import React from 'react';

/**
 * ViewAvailabilityButton component renders a button to navigate to an individual stay and 
 * view availability of a particular stay.
 * It uses the useMyStore hook to access the store and set the selected stay.
 * @param {Object} props - The component props.
 * @param {Object} props.stay - The stay object containing stay details.
 * * @returns {JSX.Element} The rendered component.
 * * @component
 * * @example
 * * return (
 * * * *  <ViewAvailabilityButton stay={stay} />);
 * * */

const ViewAvailabilityButton = ({stay}) => {
  if (!stay || !stay.id) return null;

  const navigate = useNavigate();
  const setSelectedStay = useMyStore((state) => state.setSelectedStay);
const handleClick = () => {
  setSelectedStay(stay);
  navigate(`/Stay/${stay.id}`);
};

return (
  <button onClick={handleClick} >
    View Availability
  </button>
)
}

export default ViewAvailabilityButton;

