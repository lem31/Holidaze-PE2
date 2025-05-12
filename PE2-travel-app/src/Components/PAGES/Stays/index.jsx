import React, { useEffect, useState } from 'react';
import DisplayStays from '../../DisplayStays';
import useMyStore from '../../../Store';
import fetchStays from '../../../API/index.jsx';


/**
 * Stays component fetches and displays a list of stays.
 * It uses the useMyStore hook to access the store and fetch stays.
 * @returns 
 */

function Stays() {


const [stays, setStays] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await fetchStays();
            setStays(data);
        } catch (error) {
            console.error('Error fetching stays:', error);
        }
    };

    fetchData();
}, []);




    return(
        <div>
<DisplayStays stays={stays}/>
        </div>
    )
}

export default Stays;