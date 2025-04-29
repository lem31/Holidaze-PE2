import React, { useEffect } from 'react';
import DisplayStays from '../../DisplayStays';
import useMyStore from '../../../Store';

/**
 * Stays component fetches and displays a list of stays.
 * It uses the useMyStore hook to access the store and fetch stays.
 * @returns 
 */

function Stays() {
const {stays, fetchStays}= useMyStore();

useEffect(() => {
    fetchStays();
}, [fetchStays]);
   
    return(
        <div>
<DisplayStays stays={stays}/>
        </div>
    )
}

export default Stays;