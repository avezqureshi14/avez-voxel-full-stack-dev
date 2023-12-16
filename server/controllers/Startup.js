const Startup = require("../models/Startup");
const csv = require("csvtojson");
const path = require("path");

const importStartUps = async (req, res) => {
  const startupData = [];
  try {
    csv()
      .fromFile(req.file.path)
      .then(async (response) => {
        for (var x = 0; x < response.length; x++) {
          startupData.push({
            Date: response[x].Date,
            StartupName: response[x].StartupName,
            IndustryVertical: response[x].IndustryVertical,
            SubVertical: response[x].SubVertical,
            CityLocation: response[x].CityLocation,
            InvestorsName: response[x].InvestorsName,
            InvestmentType: response[x].InvestmentType,
            AmountInUSD: response[x].AmountInUSD,
            Remarks: response[x].Remarks,
          });
        }

        await Startup.insertMany(startupData);
      });
    res.send({ status: 200, success: true, message: "Startups Imported" });
  } catch (error) {
    res.send({ status: 200, success: true, message: error.message });
  }
};

const getLength = async (req, res) => {
  try {
    const data = await Startup.find();
    const len = data.length;
    res.status(200).json({ len: len });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getStartupsPaginate = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default page number is 1
  const limit = parseInt(req.query.limit) || 10; // Default limit is 10

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    const data = await Startup.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex)
      .exec();

    if (endIndex < (await Startup.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = data;
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const searchStartUps = async (req, res) => {
  const searchTerm = req.query.q;
  try {
    const results = await Startup.find({
      $or: [
        { StartupName: { $regex: searchTerm, $options: "i" } },
        { IndustryVertical: { $regex: searchTerm, $options: "i" } },
        { SubVertical: { $regex: searchTerm, $options: "i" } },
        { CityLocation: { $regex: searchTerm, $options: "i" } },
        { InvestorsName: { $regex: searchTerm, $options: "i" } },
        { InvestmentType: { $regex: searchTerm, $options: "i" } },
      ],
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStartups = async (req, res) => {
  try {
    const data = await Startup.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createStartup = async (req, res) => {
  const {
    Date: startupdate,
    StartupName,
    IndustryVertical,
    SubVertical,
    CityLocation,
    InvestorsName,
    InvestmentType,
    AmountInUSD,
    Remarks,
  } = req.body;
  const newStartup = new Startup({
    Date: startupdate,
    StartupName,
    IndustryVertical,
    SubVertical,
    CityLocation,
    InvestorsName,
    InvestmentType,
    AmountInUSD,
    Remarks,
    createdAt: new Date().toISOString(),
  });
  try {
    await newStartup.save();
    res.status(200).json(newStartup);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const updateStartup = async (req, res) => {
  const { id } = req.params;
  const {
    Date: startupdate,
    StartupName,
    IndustryVertical,
    SubVertical,
    CityLocation,
    InvestorsName,
    InvestmentType,
    AmountInUSD,
    Remarks,
  } = req.body;

  try {
    const updatedStartUp = await Startup.findByIdAndUpdate(
      id,
      {
        Date: startupdate,
        StartupName,
        IndustryVertical,
        SubVertical,
        CityLocation,
        InvestorsName,
        InvestmentType,
        AmountInUSD,
        Remarks,
      },
      { new: true }
    );

    if (!updatedStartUp) {
      return res.status(404).json({ message: "Startup not found" });
    }
    res.status(200).json(updateStartup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInvestmentType = async (req, res) => {
  try {
    const distinctInvestmentTypes = await Startup.distinct("InvestmentType");
    res.status(200).json(distinctInvestmentTypes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getIndustry = async (req, res) => {
  try {
    const distinctIndustryVertical = await Startup.distinct("IndustryVertical");
    res.status(200).json(distinctIndustryVertical);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getStartupById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Startup.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStartup = async (req, res) => {
  const { id } = req.params;
  try {
    await Startup.findByIdAndDelete(id);
    res.status(200).json({ message: "Startup deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  importStartUps,
  getStartupsPaginate,
  getLength,
  searchStartUps,
  getStartups,
  createStartup,
  getInvestmentType,
  getIndustry,
  updateStartup,
  getStartupById,
  deleteStartup
};
