import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8800" });

//api call for add startup endpoint
export const createStartUp = (newStartup) => API.post("/startups/new",newStartup);

//api call for pagination endpoint
export const fetchStartupsPaginate = (page, limit) =>
  API.get(`/startups/paginate?page=${page}&limit=${limit}`);

//api call for fetching all startups endpoint
export const fetchStartups = () => API.get("/startups");

//api call for update startup endpoint
export const updateStartUp = (updatedStartup,id) => API.put(`/startups/update/${id}`,updatedStartup);

//api call to fetch startup by id endpoint
export const fetchStartupByID = (id) => API.get(`/startups/${id}`);

//api call to delete startup endpoint
export const deleteStartUpByID = (id) => API.delete(`/startups/${id}`);

//api call to fetch total entries used for undestanding totalpages for pagination
export const fetchTotalPages = () => API.get("/startups/len");

//api call to filter endpoint
export const filterByIndustry = (industry) =>
  API.post("/industry/filterByIndustry", industry);

//api call to search endpoint
export const searchStartUps = (searchTerm) =>
  API.get(`/startups/search?q=${searchTerm}`);

//api call for fetching investment types
export const fetchInv = () => API.get("/startups/invest");

//api call for fetching industry interval
export const fetchInds = () => API.get("/startups/inds");
