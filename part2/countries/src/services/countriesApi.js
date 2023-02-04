import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1/all";

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const countriesApi = { getAll: getAll };
export default countriesApi;
