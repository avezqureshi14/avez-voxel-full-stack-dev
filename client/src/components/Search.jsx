// This component contains implementation of two features
// 1] Search Bar
// 2] Filter
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStartups,
  searchStartUps,
  getStartupsByInds,
  getTotalPages,
} from "../actions/startups";
import { NavLink } from "react-router-dom";

const Search = ({ isLoading, setIsLoading }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const dispatch = useDispatch();
  //this are the industryInterval of startup which are provided in a list in filter
  const industries = useSelector((state) => state.startups.industries);

  //handling search functionality
  const handleSearch = () => {
    setIsLoading(true);
    if (searchQuery.trim() !== "") {
      dispatch(searchStartUps(searchQuery))
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      dispatch(getStartups())
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  //used to handle the filter functionality
  const handleFilterByIndustry = (industry) => {
    setIsLoading(true);
    if (industry === selectedIndustry) {
      setSelectedIndustry("");
      dispatch(getStartups())
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setSelectedIndustry(industry);
      dispatch(getStartupsByInds(industry))
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  //working on case when user query is empty and also nothing is selected in filter
  useEffect(() => {
    if (searchQuery.trim() === "" && selectedIndustry === "") {
      dispatch(getStartups());
      setIsLoading(false);
    }
  }, [searchQuery, selectedIndustry, dispatch]);

  //disabling filter functionality when using search functionality to avoid conflicts
  const disableFilter = () => {
    setSelectedIndustry("");
  };

  //disabling search functionality when using filter functionality to avoid conflicts
  const disableSearch = () => {
    setSearchQuery("");
  };

  //getting total entries of startups present in database , to show in total results
  useEffect(() => {
    dispatch(getTotalPages());
  }, [dispatch]);
  const tresults = useSelector((state) => state.startups.totalPages?.data?.len);

  return (
    <>
      <div>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onClick={disableFilter}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 smSearch py-2 border-gray rounded-l-md focus:outline-none bg-customColor text-white hover:text-white"
          />
          <button
            onClick={handleSearch}
            className="bg-customColor text-white font-bold py-2 px-4 rounded-r-md hover:bg-gray-300 hover:text-black"
          >
            Search
          </button>
          <select
            value={selectedIndustry}
            onChange={(e) => handleFilterByIndustry(e.target.value)}
            className="ml-2 px-3 py-2 rounded-md focus:outline-none noneFilter bg-customColor text-white hover:text-white"
          >
            <option value="">Filter by Industry</option>
            {industries?.map((industry, index) => (
              <option key={index} value={industry.IndustryVertical}>
                {industry.IndustryVertical}
              </option>
            ))}
          </select>
          <NavLink to="/new">
            <input
              type="button"
              value="Add Company"
              onClick={disableFilter}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 noneAdd py-2 ml-2 border-gray cursor-pointer rounded-md focus:outline-none bg-customColor text-white hover:bg-white hover:text-black"
            />
          </NavLink>
        </div>
        <h6 className="text-white font-bold">Total results : {tresults}+</h6>
      </div>
    </>
  );
};

export default Search;
