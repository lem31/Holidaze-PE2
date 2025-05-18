import { useEffect} from 'react';
import DisplayStays from '../../DisplayStays';
import useMyStore from '../../../Store/index';



/**
 * Stays component fetches and displays a list of stays.
 * It uses the useMyStore hook to access the store and fetch stays.
 * @returns 
 */

function Stays() {


const { fetchStays } = useMyStore();


useEffect(() => {
    fetchStays(); 
  }, []);

    return(
        <div>
            <h1>Stays</h1>
<DisplayStays />
        </div>
    )
}

export default Stays;