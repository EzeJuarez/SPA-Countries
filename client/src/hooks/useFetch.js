import { useState, useEffect } from 'react';
import { getCountries, getActivities, getCountryById } from '../services/apiService';

export const useFetch = (endpoint, id = null) => {
  const [ data, setData ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (endpoint === "allCountries") return setData(await getCountries());
        if (endpoint === "activities") return setData(await getActivities());
        if (endpoint === "countryById") return setData(await getCountryById(id));
        return setError(`Error fetching countries. Invalid endpoint: ${endpoint}`);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      };
    };

    fetchData();
  }, [endpoint, id]);

  return { data, loading, error };
};
