import react from "react";
import useMyStore from '../../Store';
import {useParams, useNavigate} from 'react-router-dom';


const DisplayAStay = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const selectedStay = useMyStore((state) => state.selectedStay);

    if (!selectedStay|| selectedStay.id !== parseInt(id)) {
        navigate('/');
        return null;
    }

    return (
        <div>
            <h1>{selectedStay.name}</h1>
            <p>{selectedStay.description}</p>
            <p>Price: {selectedStay.price}</p>
            <p>Location: {selectedStay.location}</p>
            <img src={selectedStay.media.url} alt={selectedStay.name} />
        </div>
    );
};

export default DisplayAStay;