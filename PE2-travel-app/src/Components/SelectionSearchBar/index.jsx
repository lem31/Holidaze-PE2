import React, { useEffect, useCallback } from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useMyStore from '../../Store';

/**
 * SelectionSearchBar component provides a search bar and country filter
 * for filtering stays based on user input.
 * It uses the useMyStore hook to access the store and fetch stays.
 * @param {Object} props - The component props.
 * @param {Array} props.stays - The list of stays to filter.
 * @param {Function} props.onFilter - Callback function to handle filtered stays.
 * * @returns {JSX.Element} The rendered component.
 * * @component
 * * @example
 * * return (
 * * *  <SelectionSearchBar stays={stays} onFilter={setFilteredStays} />);
 */

const SelectionSearchBar = ({ stays, onFilter }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const setSelectedStay = useMyStore((state) => state.setSelectedStay);
    const Navigate = useNavigate();
    const countries = [...new Set(stays.map(stay => stay.location.country))];
    

    useEffect(() => {
        if (!searchQuery && !selectedCountry) {
          onFilter(stays); 
        } else {
          const filteredStays = stays.filter((stay) => {
            const matchesCountry = selectedCountry ? stay.location.country === selectedCountry : true;
            const matchesSearch = searchQuery ? stay.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
            return matchesCountry && matchesSearch;
          });
      
          onFilter(filteredStays);
        }
      }, [stays, selectedCountry, searchQuery]);
    
        useEffect(() => {
            const suggestions = stays.filter((stay) =>
                stay.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredSuggestions(suggestions);},
            [searchQuery, stays]);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
      
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
      
    };
    const handleSuggestionClick = (stay) => {
        setSelectedStay(stay);
        Navigate(`/Stay/${stay.id}`);
    };

    return (
        <div>
            <select value={selectedCountry} onChange={handleCountryChange} name="" id="">
                <option value="">All Countries</option>
                {countries.map((country) => ( <option key={country} value={country}>{country}</option>))}
                    </select>

                    <input type='text' value={searchQuery} onChange={handleSearchChange} placeholder='Search stays' />

                    {searchQuery && (
                        <ul>
                            {filteredSuggestions.map((stay) =>(
                            <li key={stay.id} onClick={() => handleSuggestionClick(stay)}>
                                {stay.name}

                        

                            </li> ))}
                        </ul>)}
        </div> )};

export default SelectionSearchBar;