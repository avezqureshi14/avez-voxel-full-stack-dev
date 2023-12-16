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

export default (startups = [], action) => {
  switch (action.type) {
    
    //reducer to add new startup
    case CREATE_STARTUP:
      return [...startups, action.payload];

    //reducer for pagination
    case FETCH_STARTUPS_PAGINATE:
      return action.payload;

    //reducer to fetch all startups
    case FETCH_STARTUPS:
      return {
        ...startups,
        allstartups: action.payload,
      };

    //reducer to update startup
    case UPDATE_STARTUP:
      return startups.map((startup) =>
        startup._id === action.payload._id ? action.payload : startup
      );

    //reducer to delete startup
    case DELETE_STARTUP:
      return startups.filter((startup) => startup._id !== action.payload._id);

    //reducer for search
    case SEARCH_STARTUPS:
      return {
        ...startups,
        allstartups: action.payload,
      };

    //reducer to fecth startup by id
    case FETCH_STARTUPS_BY_ID:
      return [action.payload];

    //reducer for filter
    case FILTER:
      return {
        ...startups,
        allstartups: action.payload,
      };

    //reducer for getting totalpages ,used in process of pagination
    case FETCH_TOTAL_PAGES:
      return {
        ...startups,
        totalPages: action.payload,
      };

    //reducer for investmentTyes fetching
    case FETCH_INVST:
      return {
        ...startups,
        investTypes: action.payload,
      };

    //reducer for industryInterval fetching
    case FETCH_INDS:
      return {
        ...startups,
        industries: action.payload,
      };

    default:
      return startups;
  }
};
