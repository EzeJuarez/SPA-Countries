import { useEffect, useRef, useState } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Filters from './Filters';
import Pagination from './Pagination';
import Card from './Card';
import Modal from './Modal';
import { useFetch } from '../../hooks/useFetch';
import '../styles/Home.css';

const Home = () => {
  const { data, loading, error } = useFetch("allCountries");
  const [ listCountries, setListCountries] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ isOpen, setIsOpen ] = useState(false);
  const alphabeticalRef = useRef(null);
  const continentRef = useRef(null);
  const populationRef = useRef(null);
  const activityRef = useRef(null);

  useEffect(() => {
    setListCountries(data);
  }, [data]);

  const handleReload = e => {
    e.preventDefault();
    setListCountries(data);
    if (alphabeticalRef.current) alphabeticalRef.current.value = "defaultValue";
    if (continentRef.current) continentRef.current.value = "defaultValue";
    if (populationRef.current) populationRef.current.value = "defaultValue";
    if (activityRef.current) activityRef.current.value = "defaultValue";
  };

  const getCardsPaginated = () => {
    return currentPage === 1 ? (
      listCountries?.slice(0, 9)
    ) : (
      listCountries?.slice(((currentPage - 2) * 10) + 9, ((currentPage - 2) * 10) + 19)
    );
  };

  return (
    <>
      {
        loading ? (
          <p>LOADING</p>
        ) : (
          error ? (
            <p>{error}</p>
          ) : (
            <div className='home'>

              <div className='header-container'>
                <Header />
              </div>

              <div className='content'>
                <div className='filters'>
                  <Filters
                    allCountries={data}
                    listCountries={listCountries}
                    setListCountries={setListCountries}
                    selectRef={{ alphabeticalRef, continentRef, populationRef, activityRef }}
                  />
                </div>

                <div className='view'>
                  <div className='search-container'>
                    <SearchBar
                      allCountries={data}
                      setListCountries={setListCountries}
                      setIsOpen={setIsOpen}
                      selectRef={{ alphabeticalRef, continentRef, populationRef, activityRef }}
                    />
                  </div>
                  <Pagination
                    allCountries={listCountries}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    error={error}
                    />
                  {
                    listCountries?.length && (
                      <div className='view-card'>
                        { listCountries !== data && <button onClick={handleReload}>Reload all countries</button> }
                        <div className='card-container'>
                          { getCardsPaginated().map(country => <Card key={country.id} country={country} />) }
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>

              <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <span>Country not found</span>
              </Modal>

            </div>
          )
        )
      }
    </>
  );
};

export default Home;
