// This component contains implementation of Startup info and modal 

import React, { useEffect, useState } from "react";
import CustomTag from "./CustomeTag"; 
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteStartUp } from "../actions/startups";
const Startup = ({ startup }) => {
  const [showPopup, setShowPopup] = useState(false);
  const companyName = startup.StartupName;
  const dispatch = useDispatch();

  //handling the pop up when clicked on background
  useEffect(() => {
    const closePopup = (event) => {
      if (showPopup && !event.target.closest(".popup-content")) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", closePopup);

    return () => {
      document.removeEventListener("mousedown", closePopup);
    };
  }, [showPopup]);


  //indirectly, tried to create functionality of line clamp, like if there are more than two words in the startup name then will be not displayed
  const isMultiWord = companyName?.split(" ").length > 2;


  //Checkmark for the startups who have not be funded , if money field is empty than it will be displaying 0 for default
  const isZeroFunding = startup.AmountInUSD.length;


  //this is the addon functionality which i added to make application more interactive, it searches info about startup on google by extracting its name and including it into google search URL
  const handleGoogleSearch = () => {
    const query = `${companyName} Indian startup`;
    const searchURL = `https://www.google.com/search?q=${encodeURIComponent(
      query
    )}`;
    window.open(searchURL, "_blank");
  };


  //handling delete button, which is used to delete the startup from database and simultaneously updating the stating of our application
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteStartUp(id));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    alert("Deleted Successfully");
  };

  //to open the popup when clicked on view button
  const handleView = () => {
    setShowPopup(true); 
  };

  //for closing the pop up when clicked on cross sign
  const handleClosePopup = () => {
    setShowPopup(false); 
  };

  //handling the date to be displayed
  let startDate;
  if (startup.Date?.split("/")[2] !== undefined) {
    startDate = startup.Date?.split("/")[2];
  } else {
    startDate = 2000 + parseInt(startup.Date?.split("-")[2]);
  }

  return (
    <div className="relative bg-customColor text-white m-2 shadow-lg rounded-lg p-6 w-80">
      <div className="flex items-center mb-4">
        <h2
          className={`text-xl font-bold ${
            isMultiWord && companyName.length > 15 ? "line-clamp-2" : ""
          }`}
        >
          {startup.StartupName}
        </h2>
        <div className="ml-4">
          <CustomTag color="blue" text={`Since: ${startDate}`} />
        </div>
      </div>
      <div className="flex items-center mb-4">
        <div className="flex items-center mr-4">
          <i className="bx bx-map text-blue-500 w-5 h-5 mr-2"></i>
          <p className="font-semibold">{startup.CityLocation}</p>
        </div>
        <div title="Startup Funding" className="flex items-center">
          <i className="bx bx-dollar-circle text-green-500 w-5 h-5 mr-2"></i>
          <p className="font-semibold">
            $ {isZeroFunding === 0 ? 0 : startup.AmountInUSD}
          </p>
        </div>
      </div>
      <button
        onClick={handleView}
        className="bg-gray-200 ml-3  hover:bg-gray-300 text-gray-800 font-bold py-2 pb-1 pr-2 px-2 rounded-full shadow-md"
      >
        <i style={{ fontSize: "23px" }} className="bx bx-show"></i>
      </button>
      <button
        className="bg-gray-200 ml-3 hover:bg-gray-300 text-gray-800 font-bold py-2 pb-1 pr-2 px-2 rounded-full shadow-md"
        onClick={handleGoogleSearch}
      >
        <i style={{ fontSize: "23px" }} className="bx bxl-google"></i>
      </button>

      <div className="flex items-center crud">
        <NavLink to={`/update/${startup._id}`}>
          <i style={{ fontSize: "23px" }} className="bx bx-edit edit"></i>
        </NavLink>
        <i
          onClick={() => handleDelete(startup._id)}
          style={{ fontSize: "23px" }}
          className="bx bx-trash delete mb-2"
        ></i>
      </div>



      
      {showPopup && (
        // This is the modal which is created to pop and display info when view button is clicked
        <>
          <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50"></div>
          <div className="fixed  inset-0 flex items-center justify-center z-50">
            <div className="absolute bg-customColor text-white m-2 shadow-lg rounded-lg p-8 popup-content  bg-gray-800 bg-opacity-75">
              <button
                onClick={handleClosePopup}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <i className="bx bx-x-circle text-xl"></i>
              </button>
              <div className="flex items-center mb-4">
                <h2
                  className={`text-xl font-bold ${
                    isMultiWord && companyName.length > 15 ? "line-clamp-2" : ""
                  }`}
                >
                  {startup.StartupName}
                </h2>
                <div className="ml-4">
                  <CustomTag
                    color="blue"
                    text={startDate}
                  />
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <i className="bx bx-map text-blue-500 w-5 h-5 mr-2"></i>
                  <p className="font-semibold">{startup.CityLocation}</p>
                </div>
                <div title="Startup Funding" className="flex items-center">
                  <i className="bx bx-dollar-circle text-green-500 w-5 h-5 mr-2"></i>
                  <p className="font-semibold">
                    $ {isZeroFunding === 0 ? 0 : startup.AmountInUSD}
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <i className="bx bx-universal-access text-blue-500 w-5 h-5 mr-2"></i>
                  <p className="font-semibold zero-line-ellipsis">
                    {startup.InvestorsName}
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <i className="bx bx-category text-blue-500 w-5 h-5 mr-2"></i>
                  <p className="font-semibold zero-line-ellipsis">
                    {startup.SubVertical}
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <i className="bx bx-buildings text-blue-500 w-5 h-5 mr-2"></i>
                  <p className="font-semibold">{startup.IndustryVertical}</p>
                </div>
                <div className="flex items-center mr-4">
                  <i className="bx bxs-bank text-blue-500 w-5 h-5 mr-2"></i>
                  <p className="font-semibold">{startup.InvestmentType}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}



    </div>
  );
};

export default Startup;
