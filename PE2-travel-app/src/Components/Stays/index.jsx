import React, { useEffect } from 'react';
import DisplayStays from '../DisplayStays';
import useMyStore from '../../Store';


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