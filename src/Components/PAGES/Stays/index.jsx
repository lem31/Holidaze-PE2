/**
 * Stays component fetches and displays a list of stays.
 * It uses the useMyStore hook to access the store and fetch stays.
 * @returns
 */

import { useEffect } from "react";
import DisplayStays from "../../DisplayStays";
import useMyStore from "../../../Store/index";

function Stays() {
  const { fetchStays } = useMyStore();

  useEffect(() => {
    fetchStays();
  }, []);

  return (
    <div>
      <DisplayStays />
    </div>
  );
}

export default Stays;
