//This component handles the functionality of add new startup to the database using the manual form

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInds, getInvestmentTypes, newStartup } from "../actions/startups";

const StartupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    Date: "",
    StartupName: "",
    IndustryVertical: "",
    SubVertical: "",
    CityLocation: "",
    InvestorsName: "",
    InvestmentType: "",
    AmountInUSD: "",
    Remarks: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newStartup(formData));
    setFormData({
      Date: "",
      StartupName: "",
      IndustryVertical: "",
      SubVertical: "",
      CityLocation: "",
      InvestorsName: "",
      InvestmentType: "",
      AmountInUSD: "",
      Remarks: "",
    });
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Date") {
      const formattedDate = new Date(value).toISOString().split("T")[0];
      formattedDate.split("-").join("/");
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      if (name === "StartupName" && value.length > 15) {
        setError("Startup name should be 15 characters or less. ");
      } else {
        setError("");
      }
      setFormData({ ...formData, [name]: value.slice(0, 15) }); // Limit input to 15 characters
    }
  };

  useEffect(() => {
    dispatch(getInvestmentTypes());
    dispatch(getInds());
  }, [dispatch]);

  const industries = useSelector((state) => state.startups.industries);
  const invstTypes = useSelector((state) => state.startups.investTypes);

  return (
    <>
      <h1
        className="m-5 text-center text-white font-extrabold"
        style={{ marginTop: "6rem" }}
      >
        Add Your Company
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-30 bg-customColor rounded-lg p-6 "
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            type="date"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
            placeholder="Date"
            style={{ background: "rgb(185 188 185 / 13%)" }}
            className="rounded-md p-2 text-white"
          />

          <input
            type="text"
            name="StartupName"
            value={formData.StartupName}
            onChange={handleChange}
            placeholder="Startup Name"
            style={{ background: "rgb(185 188 185 / 13%)" }}
            className="rounded-md p-2 text-white"
          />
          <p className="text-red">{error}</p>

          <input
            type="text"
            name="SubVertical"
            value={formData.SubVertical}
            onChange={handleChange}
            placeholder="Sub Vertical"
            style={{ background: "rgb(185 188 185 / 13%)" }}
            className="rounded-md p-2 text-white"
          />

          <input
            type="text"
            name="CityLocation"
            value={formData.CityLocation}
            onChange={handleChange}
            placeholder="City Location"
            style={{ background: "rgb(185 188 185 / 13%)" }}
            className="rounded-md p-2 text-white"
          />

          <input
            type="text"
            name="InvestorsName"
            value={formData.InvestorsName}
            onChange={handleChange}
            placeholder="Investors Name"
            style={{ background: "rgb(185 188 185 / 13%)" }}
            className="rounded-md p-2 text-white"
          />

          <select
            name="IndustryVertical"
            value={formData.IndustryVertical}
            onChange={handleChange}
            style={{ background: "rgb(185 188 185 / 13%)" }}
            className="rounded-md p-2 text-black"
          >
            <option value="">Select Industry Vertical</option>
            {industries?.map((industry, index) => (
              <option key={index} value={industry}>
                {industry /* Display the property representing the industry */}
              </option>
            ))}
          </select>

          <select
            name="InvestmentType"
            value={formData.InvestmentType}
            onChange={handleChange}
            style={{ background: "rgb(185 188 185 / 13%)" }}
            className="rounded-md p-2 text-black"
          >
            <option value="">Select Investment Type</option>
            {invstTypes?.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="AmountInUSD"
            value={formData.AmountInUSD}
            onChange={handleChange}
            placeholder="Amount In USD"
            style={{ background: "rgb(185 188 185 / 13%)" }}
            className="rounded-md p-2 text-white"
          />

          <input
            type="text"
            name="Remarks"
            value={formData.Remarks}
            onChange={handleChange}
            placeholder="Remarks"
            style={{ background: "rgb(185 188 185 / 13%)" }}
            className="rounded-md p-2 text-white"
          />
        </div>
        <button
          type="submit"
          className="btn mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default StartupForm;
