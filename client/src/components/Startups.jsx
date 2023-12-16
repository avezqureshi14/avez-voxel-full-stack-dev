//This component supplies the data to the child component Startup and handles the pagination functionality

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStartupsPaginate, getTotalPages } from '../actions/startups';
import Startup from '../components/Startup';
import Loader from './Loader';

const Startups = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const startups = useSelector((state) => state.startups.results);
  const totalSize = useSelector((state) => state.startups.totalPages?.data?.len);
  const itemsPerPage = 12; // Number of items per page
  const totalPages = Math.ceil(totalSize / itemsPerPage);

  //handling pagination action
  useEffect(() => {
    setIsLoading(true);
    dispatch(getStartupsPaginate(page, itemsPerPage))
      .then((data) => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    dispatch(getTotalPages());
  }, [dispatch, page, itemsPerPage]);

  //handling pages to display data as per pages
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  //rendering the child component 
  const renderStartups = () => {
    return (
      <>
        {startups?.map((startup, index) => (
          <Startup key={index} startup={startup} />
        ))}
      </>
    );
  };


  //rendering pagination buttons along with list of few page no.
  const renderPaginationButtons = () => {
    const buttons = [];
    const displayedPages = 5; // Number of pages to display in pagination
    const startPage = Math.max(1, page - Math.floor(displayedPages / 2));
    const endPage = Math.min(totalPages, startPage + displayedPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`mx-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300 ${
            i === page ? 'font-bold' : ''
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex  justify-center items-center flex-wrap">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {renderStartups()}
          <div className="mt-4">
            <button
              disabled={page === 1}
              onClick={() => handlePageClick(page - 1)}
              className="mx-1 m-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            >
              Previous
            </button>
              {renderPaginationButtons()}
            <button
              disabled={page === totalPages}
              onClick={() => handlePageClick(page + 1)}
              className="mx-1 m-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Startups;
