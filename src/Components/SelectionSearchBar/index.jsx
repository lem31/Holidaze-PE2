import React, { useEffect, useCallback } from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useMyStore from '../../Store';
import homeStyles from '../../CSS_Modules/Home/home.module.css';
import Search from '../../assets/Images/search.png';

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
    const navigate = useNavigate();
    const countries = [...new Set(stays.filter(stay => stay?.location?.country).map(stay => stay.location.country))];

    

    useEffect(() => {
      
  const filteredStays = stays.filter((stay) => {
    const matchesSearch = searchQuery ? stay?.name?.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchesCountry = selectedCountry ? stay?.location?.country?.toLowerCase() === selectedCountry.toLowerCase() : true;
    return matchesSearch && matchesCountry;
  });

   console.log(" Filtered stays:", filteredStays);

  onFilter(filteredStays);
}, [stays, searchQuery, selectedCountry]); 

useEffect(() => {
  if (!searchQuery) {
    setFilteredSuggestions([]); 
    return;
  }

  const suggestions = stays.filter((stay) =>
    stay?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  setFilteredSuggestions(suggestions);
}, [searchQuery, stays]);

    
      

   const handleCountryChange = (event) => {

  setSelectedCountry(event.target.value);

};

   const handleSearchChange = (event) => {

  setSearchQuery(event.target.value);

};
    
    const handleSuggestionClick = (event, stay) => {
        event.preventDefault();
        if (stay && stay.id) {
            setSelectedStay(stay);
            console.log("Navigating to:", `/Stay/${stay.id}`);
            navigate(`/Stay/${stay.id}`);
        } else {
            console.error('Invalid stay object or missing stay.id:', stay);
        }
    };

    return (
        <div >
          <div className={homeStyles.searchSelectBar}>
            <div className={homeStyles.selectWrapper}>
          <div className={homeStyles.selectDiv} >
            <select className={homeStyles.optionAndInput} value={selectedCountry} onChange={handleCountryChange} name="" id="">
                <option  value="">All Countries</option>
                {countries.map((country) => ( <option  key={country} value={country}>{country}</option>))}
                    </select>
                    <div className={homeStyles.orDiv}>
<p className={homeStyles.orP}>OR</p>
</div>
                    <input className={homeStyles.optionAndInput}  type='text' value={searchQuery} onChange={handleSearchChange} placeholder='Search stays' />
                    </div>
                    <img className={homeStyles.searchIcon}src={Search} alt="" />
                    </div>
                    </div>

                    {searchQuery && filteredSuggestions.length >0 && (
                        <ul>
                            {filteredSuggestions.map((stay) =>(
                            <li key={stay.id} onClick={(event) => handleSuggestionClick(event, stay)}>
                                {stay.name}

                        

                            </li> ))}
                        </ul>)}
        </div> )};

export default SelectionSearchBar;