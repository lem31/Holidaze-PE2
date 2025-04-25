import {useNavigate} from 'react-router-dom';
import useMyStore from '../../Store';
import React from 'react';

const ViewAvailabilityButton = ({stay}) => {
  if (!stay || !stay.id) return null;

  const navigate = useNavigate();
  const setSelectedStay = useMyStore((state) => state.setSelectedStay);
const handleClick = () => {
  setSelectedStay(stay);
  navigate(`/stay/${stay.id}`);
};

return (
  <button onClick={handleClick} >
    View Availability
  </button>
)
}

export default ViewAvailabilityButton;

