//This component is parent of all search and filter functionality it combines all the search and filter components and is available at /search route
import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { useDispatch, useSelector } from "react-redux";
import Startup from "../components/Startup";
import Loader from "../components/Loader";
import { getInds, getStartups } from "../actions/startups";
const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStartups());
    dispatch(getInds());
  }, [dispatch]);
  const startups = useSelector((state) => state.startups.allstartups);
  console.log(useSelector((state) => state.startups));
  return (
    <>
      <div className="flex justify-center m-5 mt-32">
        <Search isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
      <div className="flex justify-center items-center flex-wrap">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {startups?.map((startup, index) => (
              <Startup key={index} startup={startup} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default SearchPage;
