import { useFetch } from '../../hooks/useFetch';
import '../styles/Filters.css';

const Filters = ({ allCountries, listCountries, setListCountries, selectRef, setShow }) => {
  const { data, loading, error } = useFetch("activities");

  const handleFilterByAlphabetical = e => {
    const filterByAlphabetical = [...listCountries]
    if (e.target.value === "Ascendent") filterByAlphabetical.sort((a, b) => a.name.localeCompare(b.name));
    if (e.target.value === "Descendent") filterByAlphabetical.sort((a, b) => b.name.localeCompare(a.name));
    setListCountries(filterByAlphabetical);
    if (selectRef.populationRef.current) selectRef.populationRef.current.value = "defaultValue";
  };

  const handleFilterByContinent = e => {
    const filterByContinent = allCountries.filter(country => country.continents.includes(e.target.value));
    setListCountries(filterByContinent);
    if (selectRef.alphabeticalRef.current) selectRef.alphabeticalRef.current.value = "defaultValue";
    if (selectRef.populationRef.current) selectRef.populationRef.current.value = "defaultValue";
    if (selectRef.activityRef.current) selectRef.activityRef.current.value = "defaultValue";
  };

  const handleFilterByPopulation = e => {
    const filterByPopulation = [...listCountries]
    if (e.target.value === "Ascendent") filterByPopulation.sort((a, b) => a.population - b.population);
    if (e.target.value === "Descendent") filterByPopulation.sort((a, b) => b.population - a.population);
    setListCountries(filterByPopulation);
    if (selectRef.alphabeticalRef.current) selectRef.alphabeticalRef.current.value = "defaultValue";
  };

  const handleFilterByActivity = e => {
    const activity = data?.filter(activity => activity.name === e.target.value);
    const countriesFiltered = activity.map(activity => activity.Countries);
    setListCountries(...countriesFiltered);
    if (selectRef.alphabeticalRef.current) selectRef.alphabeticalRef.current.value = "defaultValue";
    if (selectRef.continentRef.current) selectRef.continentRef.current.value = "defaultValue";
    if (selectRef.populationRef.current) selectRef.populationRef.current.value = "defaultValue";
  };

  return (
    <div className="filters-container">
      <span>Filter Options</span>

      <div className='container-filter'>
        <span className='text-filter'>Alphabetical</span>
        <select defaultValue="defaultValue" ref={selectRef.alphabeticalRef} onChange={handleFilterByAlphabetical}>
          <option value="defaultValue" disabled>None</option>
          <option value="Ascendent">Ascendent (A-Z)</option>
          <option value="Descendent">Descendent (Z-A)</option>
        </select>
      </div>

      <div className='container-filter'>
        <span className='text-filter'>Continent</span>
        <select defaultValue="defaultValue" ref={selectRef.continentRef} onChange={handleFilterByContinent}>
          <option value="defaultValue" disabled>All</option>
          <option value="South America">South America</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctica">Antarctica</option>
        </select>
      </div>

      <div className='container-filter'>
        <span className='text-filter'>Population</span>
        <select defaultValue="defaultValue" ref={selectRef.populationRef} onChange={handleFilterByPopulation}>
          <option value="defaultValue" disabled>None</option>
          <option value="Ascendent">Ascendent</option>
          <option value="Descendent">Descendent</option>
        </select>
      </div>

      <div className='container-filter'>
        <span className='text-filter'>Activity</span>
        <select defaultValue="defaultValue" ref={selectRef.activityRef} onChange={handleFilterByActivity}>
          <option value="defaultValue" disabled>All</option>
          {
            loading ? (
              <option disabled>Loading...</option>
            ) : (
              error ? (
                <option disabled>{error}</option>
              ) : (
                data?.length ? (
                  data?.map(activity => <option key={activity.id} value={activity.name}>{activity.name}</option>)
                ) : (
                  <option disabled>{data?.msg}</option>
                )
              )
            )
          }
        </select>
      </div>

      <button className='on-close' onClick={() => setShow(false)}>Close filters</button>

    </div>
  );
};

export default Filters;
