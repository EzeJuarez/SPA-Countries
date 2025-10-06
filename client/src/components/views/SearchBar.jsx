import { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ allCountries, setListCountries, setIsOpen, selectRef }) => {
  const [ query, setQuery ] = useState("");

  const handleOnChange = e => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const searchedCountries = allCountries.filter(country => country.name.toLowerCase().includes(query.toLowerCase()));
    if(searchedCountries.length > 0) {
      setListCountries(searchedCountries);
      selectRef.alphabeticalRef.current.value = "defaultValue";
      selectRef.continentRef.current.value = "defaultValue";
      selectRef.populationRef.current.value = "defaultValue";
      selectRef.activityRef.current.value = "defaultValue";
      e.target[0].value = "";
    } else {
      setIsOpen(true);
    };
  };

  return (
    <div className='search-bar'>
      <form action="submit" onSubmit={handleSubmit}>
        <input type="text" placeholder="Search" onChange={handleOnChange} />
        <button><i className="ti ti-search"></i></button>
      </form>
    </div>
  );
};

export default SearchBar;
