import * as api from "../api";
import {
  CREATE_STARTUP,
  DELETE_STARTUP,
  FETCH_INDS,
  FETCH_INVST,
  FETCH_STARTUPS,
  FETCH_STARTUPS_BY_ID,
  FETCH_STARTUPS_PAGINATE,
  FETCH_TOTAL_PAGES,
  FILTER,
  SEARCH_STARTUPS,
  UPDATE_STARTUP,
} from "../constants/actionTypes";


//action to add new startup
export const newStartup = (newStartup) => async (dispatch) => {
  try {
    const { data } = await api.createStartUp(newStartup);
    dispatch({ type: CREATE_STARTUP, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//action to get all startups for pagination 
export const getStartupsPaginate = (page, limit) => async (dispatch) => {
  try {
    const { data } = await api.fetchStartupsPaginate(page, limit);
    dispatch({ type: FETCH_STARTUPS_PAGINATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//action to get all startups
export const getStartups = () => async (dispatch) => {
  try {
    const { data } = await api.fetchStartups();
    dispatch({ type: FETCH_STARTUPS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//action to update startups
export const updateStartup = (updatedStartUp, id) => async (dispatch) => {
  try {
    const { data } = await api.updateStartUp(updatedStartUp, id);
    dispatch({ type: UPDATE_STARTUP, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//action to get startup by id 
export const getStartupById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchStartupByID(id);
    dispatch({ type: FETCH_STARTUPS_BY_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//action to delete startup
export const deleteStartUp = (id) => async (dispatch) => {
  try {
    await api.deleteStartUpByID(id);
    dispatch({ type: DELETE_STARTUP, payload: id });
  } catch (error) {
    console.log(error);
  }
};

//action to get total enteries used for undestanding totalpages for pagination
export const getTotalPages = () => async (dispatch) => {
  try {
    const data = await api.fetchTotalPages();
    dispatch({ type: FETCH_TOTAL_PAGES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//action to filter based on IndustryVertical
export const getStartupsByInds = (industry) => async (dispatch) => {
  try {
    const { data } = await api.filterByIndustry(industry);
    dispatch({ type: FILTER, payload: data });
  } catch (error) {}
};

//action for search functionality
export const searchStartUps = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await api.searchStartUps(searchTerm);
    dispatch({ type: SEARCH_STARTUPS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//action to get IndustryVertical
export const getInds = () => async (dispatch) => {
  try {
    const { data } = await api.fetchInds();
    dispatch({ type: FETCH_INDS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//action to get investment Types
export const getInvestmentTypes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchInv();
    dispatch({ type: FETCH_INVST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
