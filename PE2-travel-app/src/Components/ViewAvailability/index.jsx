import {useNavigate} from 'react-router-dom';
import React, { useCallback} from 'react';


function ViewAvailabilityButton({id}){
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(`/stay/${id}`);
  }, [navigate, id]);
  return(
    <div>
    <button onClick={handleClick}>View Availability</button>
    </div>
  );
}

export default ViewAvailabilityButton;

