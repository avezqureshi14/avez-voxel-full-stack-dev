const Industry = require("../models/Industry");
const Startup = require("../models/Startup");

const extractUniqueIndustryAndInsert = async (req, res) => {
  try {
    // Retrieve unique IndustryVertical values from the Startup model
    const uniqueIndustries = await Startup.distinct("IndustryVertical");
    console.log(uniqueIndustries);
    // Create Industry documents from unique IndustryVertical values
    const industryDocs = uniqueIndustries.map((industry) => ({
      IndustryVertical: industry,
    }));

    // Insert the unique IndustryVertical values into the Industry model
    await Industry.insertMany(industryDocs);
    return res
      .status(200)
      .json("Successfully Data Imported from Startup Model");
  } catch (error) {
    console.error(
      "Error extracting and inserting unique IndustryVertical values:",
      error
    );
  }
};


const filterStartupsByIndustry = async (req, res) => {
  const industryObject = req.body;
  
  // Extracting the industry name from the object's key
  const industryName = Object.keys(industryObject)[0];
  
  console.log(industryName);
  
  try {
    const filteredStartups = await Startup.find({
      IndustryVertical: { $regex: new RegExp(`^${industryName}$`, 'i') },
    });
    res.status(200).json(filteredStartups)
  } catch (error) {
    res.status(401).json({message:error.message});
  }
};



module.exports = {
  extractUniqueIndustryAndInsert,
  filterStartupsByIndustry,
};
