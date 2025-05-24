import  { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMyStore from '../../Store';
import homeStyles from '../../CSS_Modules/Home/home.module.css';
import Search from '../../assets/Images/Search.png';
import {Select, MenuItem, FormControl, InputLabel} from '@mui/material';

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
    const suggestionRef = useRef(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    

    useEffect(() => {
      
  const filteredStays = stays.filter((stay) => {
    const matchesSearch = searchQuery ? stay?.name?.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchesCountry = selectedCountry ? stay?.location?.country?.toLowerCase() === selectedCountry.toLowerCase() : true;
    return matchesSearch && matchesCountry;
  });



  onFilter(filteredStays);
}, [stays, searchQuery, selectedCountry]); 

useEffect(() => {
  if (!searchQuery) {
    setFilteredSuggestions([]); 
    setShowSuggestions(false);
    return;
  }

  const suggestions = stays.filter((stay) =>
    stay?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  setFilteredSuggestions(suggestions);
  setShowSuggestions(true);
}, [searchQuery, stays]);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [])

  
      

   const handleCountryChange = (event) => {

  setSelectedCountry(event.target.value);

};

 const handleCloseSuggestions = () => {
        setShowSuggestions(false);
    };

   const handleSearchChange = (event) => {

  setSearchQuery(event.target.value);

};
    
    const handleSuggestionClick = (event, stay) => {
        event.preventDefault();
        if (stay && stay.id) {
            setSelectedStay(stay);
          
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
               <FormControl className={homeStyles.selectBox} variant="outlined">
                            <InputLabel className={homeStyles.selectLabel}id="country-select-label">Select Country</InputLabel>
                          
                          <div className={homeStyles.selectOptionDiv}>
                           <Select
                                labelId="country-select-label"
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                className={homeStyles.selectOption}
                                
                                MenuProps={{ classes: { paper: homeStyles.customMenu } }}
                            >
                                <MenuItem  value="">All Countries</MenuItem>
                                {countries.map((country) => (
                                    <MenuItem className={homeStyles.selectDropDown} key={country} value={country}>{country}</MenuItem>
                                ))}
                            </Select>
                            </div>
                        </FormControl>
                    <div className={homeStyles.orDiv}>
<p className={homeStyles.orP}>OR</p>
</div>
<div className={homeStyles.searchDiv}>
<div className={homeStyles.searchInputIconDiv}> 
  <div>
                    <div className={homeStyles.searchInputDiv}>
                      <input className={homeStyles.optionAndInput}  type='text' value={searchQuery} onChange={handleSearchChange} placeholder='Search stays' />
                    </div>
                    </div>
                    <img className={homeStyles.searchIcon}src={Search} alt="" />
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>

                    {showSuggestions && filteredSuggestions.length >0 && (
                       <div ref={suggestionRef} className={homeStyles.suggestionContainer}>
                        <div className={homeStyles.closeButtonDiv}>
                    <button className={homeStyles.closeButton} onClick={handleCloseSuggestions}>✖ Close</button>
                      </div>
                        <ul className={homeStyles.suggestionList}>
                            {filteredSuggestions.map((stay) =>(
                            <li key={stay.id} onClick={(event) => handleSuggestionClick(event, stay)}>
                                {stay.name}

                        

                            </li> ))}
                        </ul>
                    </div>
                    )}
                        
        </div> )};
        

export default SelectionSearchBar;