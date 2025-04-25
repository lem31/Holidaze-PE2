import React, { useEffect } from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useMyStore from '../../Store';

const SelectionSearchBar = ({ stays, onFilter }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const setSelectedStay = useMyStore((state) => state.setSelectedStay);
    const Navigate = useNavigate();
    const countries = [...new Set(stays.map(stay => stay.location.country))];
    

  useEffect(() => {
        const filteredStays = stays.filter((stay) => {
        const matchesCountry = selectedCountry 
        ? stay.location.country === selectedCountry : true;
        const matchesSearch = searchQuery 
        ? stay.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
        return matchesCountry && matchesSearch;
        });
        onFilter(filteredStays);  },
        [stays, selectedCountry, searchQuery, onFilter]);
    
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