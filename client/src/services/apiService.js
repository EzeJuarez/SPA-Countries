import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const apiService = axios.create({
  baseURL: API_URL,
});

export const getCountries = async () => {
  try {
    const countries = await apiService.get("/countries");
    return countries.data;
  } catch (error) {
    throw new Error(`Error fetching countries: ${error.message}`);
  };
};

export const getCountryById = async id => {
  try {
    const country = await apiService.get(`/countries/${id}`);
    return country.data;
  } catch (error) {
    throw new Error(`Error fetching country: ${error.message}`);
  }
};

export const getActivities = async () => {
  try {
    const activities = await apiService.get("/activity");
    return activities.data;
  } catch (error) {
    throw new Error(`Error fetching activities: ${error.message}`);
  };
};

export const createActivity = async body => {
  try {
    const newActivity = await apiService.post("/activity", body);
    return { message: `Activity created succesfully: ${newActivity.data}` }
  } catch (error) {
    throw new Error(`Error to create activity: ${error.message}`);
  }
};
