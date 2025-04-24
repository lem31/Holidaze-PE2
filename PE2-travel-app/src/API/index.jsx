
import { useEffect, useState } from "react";
import useMyStore from "../Store";
import DisplayStays from "../Components/DisplayStays";
import React from 'react';


const url = "https://v2.api.noroff.dev/holidaze/venues";

/**
 * FetchStays - fetches and displays venue (stays) data from an API.
 *
 * This component uses the Fetch API to retrieve venue (stays) data from a specified URL and
 * stores it in a local state. It also uses a custom store (useMyStore) to manage the
 * state of the stays data. The fetched data is then passed to the DisplayStays component
 *
 * @component
 * @returns {JSX.Element} The FetchStays component that displays the fetched stays data.
 */

function FetchStays() {

  const setStoreStays = useMyStore((state) => state.setStays);
  const [stays, setStays] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
      
        const fetchedStays = Array.isArray(json.data) ? json.data : [];
        localStorage.setItem("stays", JSON.stringify(fetchedStays));
        setStays(fetchedStays);
        setStoreStays(fetchedStays);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }
    getData();
  }, [setStoreStays]);

  if (isLoading) {
    return <div><p>Loading Stays...</p></div>;
  }
  if (isError) {
    return <div><p >Error loading data</p></div>;
  }
  return (
    <div >
      {stays.map((stay) => (
        <DisplayStays key={stay.id} stay={stay} />
      ))}
    </div>
  );
}


export default FetchStays;